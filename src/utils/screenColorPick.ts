import type { RgbColor } from './colorFormat';

const MAX_CAPTURE_DIM = 1920;
const OVERLAY_CLASS = 'screen-color-pick-overlay';

export class ScreenColorPickError extends Error {
  constructor(
    message: string,
    readonly code: 'unsupported' | 'denied' | 'cancelled' | 'capture_failed'
  ) {
    super(message);
    this.name = 'ScreenColorPickError';
  }
}

export function isScreenColorPickSupported(): boolean {
  return (
    typeof navigator !== 'undefined' &&
    !!navigator.mediaDevices &&
    typeof navigator.mediaDevices.getDisplayMedia === 'function'
  );
}

function yieldToMain(): Promise<void> {
  return new Promise((resolve) => {
    requestAnimationFrame(() => resolve());
  });
}

function stopStream(stream: MediaStream | null) {
  stream?.getTracks().forEach((track) => {
    try {
      track.stop();
    } catch {
      /* ignore */
    }
  });
}

function scaleCanvas(source: HTMLCanvasElement, maxDim: number): HTMLCanvasElement {
  const maxSide = Math.max(source.width, source.height);
  if (maxSide <= maxDim) return source;

  const scale = maxDim / maxSide;
  const w = Math.round(source.width * scale);
  const h = Math.round(source.height * scale);
  const out = document.createElement('canvas');
  out.width = w;
  out.height = h;
  const ctx = out.getContext('2d');
  if (!ctx) return source;
  ctx.drawImage(source, 0, 0, w, h);
  return out;
}

/** Map a viewport click to canvas pixel coords (object-fit: contain). Returns null if outside image. */
export function mapClickToCanvasPixel(
  canvasWidth: number,
  canvasHeight: number,
  rect: { left: number; top: number; width: number; height: number },
  clientX: number,
  clientY: number
): { x: number; y: number } | null {
  if (rect.width < 1 || rect.height < 1 || canvasWidth < 1 || canvasHeight < 1) {
    return null;
  }

  const imageAspect = canvasWidth / canvasHeight;
  const rectAspect = rect.width / rect.height;

  let drawW = rect.width;
  let drawH = rect.height;
  let offsetX = 0;
  let offsetY = 0;

  if (imageAspect > rectAspect) {
    drawH = rect.width / imageAspect;
    offsetY = (rect.height - drawH) / 2;
  } else {
    drawW = rect.height * imageAspect;
    offsetX = (rect.width - drawW) / 2;
  }

  const relX = clientX - rect.left - offsetX;
  const relY = clientY - rect.top - offsetY;

  if (relX < 0 || relY < 0 || relX > drawW || relY > drawH) {
    return null;
  }

  return {
    x: Math.min(canvasWidth - 1, Math.max(0, Math.floor((relX / drawW) * canvasWidth))),
    y: Math.min(canvasHeight - 1, Math.max(0, Math.floor((relY / drawH) * canvasHeight))),
  };
}

/** Map a viewport click to a pixel on the backing canvas (object-fit: contain). */
export function readPixelFromDisplayedCanvas(
  canvas: HTMLCanvasElement,
  clientX: number,
  clientY: number
): RgbColor {
  const rect = canvas.getBoundingClientRect();
  const mapped = mapClickToCanvasPixel(canvas.width, canvas.height, rect, clientX, clientY);
  if (!mapped) {
    return { r: 0, g: 0, b: 0 };
  }

  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) return { r: 0, g: 0, b: 0 };

  const [r, g, b] = ctx.getImageData(mapped.x, mapped.y, 1, 1).data;
  return { r, g, b };
}

async function waitForVideoFrame(video: HTMLVideoElement, signal?: AbortSignal): Promise<void> {
  if (video.videoWidth > 0 && video.videoHeight > 0) return;

  await new Promise<void>((resolve, reject) => {
    const timeout = window.setTimeout(() => {
      cleanup();
      reject(new ScreenColorPickError('capture_failed', 'capture_failed'));
    }, 8_000);

    const onAbort = () => {
      cleanup();
      reject(new ScreenColorPickError('cancelled', 'cancelled'));
    };

    const onMeta = () => {
      cleanup();
      resolve();
    };

    const cleanup = () => {
      window.clearTimeout(timeout);
      video.removeEventListener('loadedmetadata', onMeta);
      signal?.removeEventListener('abort', onAbort);
    };

    video.addEventListener('loadedmetadata', onMeta, { once: true });
    signal?.addEventListener('abort', onAbort, { once: true });
  });
}

async function captureScreenFrame(signal?: AbortSignal): Promise<HTMLCanvasElement> {
  if (!isScreenColorPickSupported()) {
    throw new ScreenColorPickError('unsupported', 'unsupported');
  }
  if (signal?.aborted) {
    throw new ScreenColorPickError('cancelled', 'cancelled');
  }

  let stream: MediaStream | null = null;
  const video = document.createElement('video');
  video.muted = true;
  video.playsInline = true;

  try {
    stream = await navigator.mediaDevices.getDisplayMedia({
      video: { frameRate: 1 },
      audio: false,
    });

    if (signal?.aborted) {
      throw new ScreenColorPickError('cancelled', 'cancelled');
    }

    video.srcObject = stream;
    await video.play();
    await yieldToMain();
    await waitForVideoFrame(video, signal);
    await yieldToMain();

    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext('2d');
    if (!ctx || canvas.width < 1 || canvas.height < 1) {
      throw new ScreenColorPickError('capture_failed', 'capture_failed');
    }

    ctx.drawImage(video, 0, 0);
    await yieldToMain();

    return scaleCanvas(canvas, MAX_CAPTURE_DIM);
  } catch (err) {
    if (err instanceof ScreenColorPickError) throw err;
    const name = err instanceof DOMException ? err.name : '';
    if (name === 'NotAllowedError' || name === 'PermissionDeniedError') {
      throw new ScreenColorPickError('denied', 'denied');
    }
    if (signal?.aborted) {
      throw new ScreenColorPickError('cancelled', 'cancelled');
    }
    throw new ScreenColorPickError('capture_failed', 'capture_failed');
  } finally {
    video.srcObject = null;
    stopStream(stream);
    await yieldToMain();
  }
}

function pickColorFromCaptureOverlay(
  canvas: HTMLCanvasElement,
  signal?: AbortSignal,
  labels?: { hint: string; cancel: string }
): Promise<RgbColor> {
  return new Promise((resolve, reject) => {
    let settled = false;

    const overlay = document.createElement('div');
    overlay.className = OVERLAY_CLASS;
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');

    const display = canvas;
    display.className = 'screen-color-pick-canvas';
    display.style.cursor = 'crosshair';

    const hint = document.createElement('p');
    hint.className = 'screen-color-pick-hint';
    hint.textContent = labels?.hint ?? 'Click a pixel to capture its color · Esc to cancel';

    const cancelBtn = document.createElement('button');
    cancelBtn.type = 'button';
    cancelBtn.className = 'screen-color-pick-cancel';
    cancelBtn.textContent = labels?.cancel ?? 'Cancel';

    const cleanup = () => {
      document.removeEventListener('keydown', onKeyDown, true);
      overlay.remove();
    };

    const finish = (fn: () => void) => {
      if (settled) return;
      settled = true;
      cleanup();
      fn();
    };

    const onAbort = () => {
      finish(() => reject(new ScreenColorPickError('cancelled', 'cancelled')));
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onAbort();
      }
    };

    const onPick = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const color = readPixelFromDisplayedCanvas(display, e.clientX, e.clientY);
      finish(() => resolve(color));
    };

    cancelBtn.addEventListener('click', (e) => {
      e.preventDefault();
      onAbort();
    });

    signal?.addEventListener('abort', onAbort, { once: true });

    overlay.appendChild(display);
    overlay.appendChild(hint);
    overlay.appendChild(cancelBtn);
    document.body.appendChild(overlay);
    document.addEventListener('keydown', onKeyDown, true);
    display.addEventListener('click', onPick);
  });
}

/**
 * Captures the screen once (user shares display), then lets the user click a pixel
 * on a fullscreen overlay. Avoids the native EyeDropper API, which can hang tabs.
 */
export async function pickColorFromScreen(
  signal?: AbortSignal,
  labels?: { hint: string; cancel: string }
): Promise<RgbColor> {
  const frame = await captureScreenFrame(signal);
  if (signal?.aborted) {
    throw new ScreenColorPickError('cancelled', 'cancelled');
  }
  return pickColorFromCaptureOverlay(frame, signal, labels);
}
