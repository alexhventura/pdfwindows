import type { RgbColor } from './colorFormat';

/** Keep captures small so drawImage / compositing never block the UI thread. */
const MAX_PICK_DIM = 800;
const CAPTURE_TIMEOUT_MS = 18_000;
const OVERALL_TIMEOUT_MS = 90_000;
const BODY_LOCK_CLASS = 'screen-color-picking';

/**
 * Screen-share options for color picking.
 * Uses getDisplayMedia only — never getUserMedia / webcam.
 * displaySurface restricts the picker to monitor/window surfaces (not camera).
 */
const DISPLAY_MEDIA_OPTIONS = {
  video: {
    displaySurface: 'monitor',
  },
  audio: false,
  preferCurrentTab: false,
  selfBrowserSurface: 'exclude',
  monitorTypeSurfaces: 'include',
  windowTypeSurfaces: 'include',
} as DisplayMediaStreamOptions;

export class ScreenColorPickError extends Error {
  constructor(
    message: string,
    readonly code: 'unsupported' | 'denied' | 'cancelled' | 'capture_failed' | 'timeout'
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

/** Request screen share via getDisplayMedia — the only media API used for screen color pick. */
export async function requestDisplayMediaForColorPick(): Promise<MediaStream> {
  if (!isScreenColorPickSupported()) {
    throw new ScreenColorPickError('unsupported', 'unsupported');
  }

  const { mediaDevices } = navigator;
  const getDisplayMedia = mediaDevices.getDisplayMedia.bind(mediaDevices);

  // Hard block: never allow getUserMedia during screen pick (no camera / webcam fallback).
  const originalGetUserMedia = mediaDevices.getUserMedia?.bind(mediaDevices);
  if (originalGetUserMedia) {
    mediaDevices.getUserMedia = () =>
      Promise.reject(new DOMException('Camera is disabled for PDFWINDOWS color pick.', 'NotAllowedError'));
  }

  try {
    return await getDisplayMedia(DISPLAY_MEDIA_OPTIONS);
  } finally {
    if (originalGetUserMedia) {
      mediaDevices.getUserMedia = originalGetUserMedia;
    }
  }
}

function yieldToMain(): Promise<void> {
  return new Promise((resolve) => {
    requestAnimationFrame(() => resolve());
  });
}

function yieldTwice(): Promise<void> {
  return new Promise((resolve) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => resolve());
    });
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

function lockPageForPick() {
  document.body.classList.add(BODY_LOCK_CLASS);
}

function unlockPageForPick() {
  document.body.classList.remove(BODY_LOCK_CLASS);
}

function withOverallTimeout<T>(promise: Promise<T>, signal?: AbortSignal): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const onAbort = () => {
      cleanup();
      reject(new ScreenColorPickError('cancelled', 'cancelled'));
    };

    const timer = window.setTimeout(() => {
      cleanup();
      reject(new ScreenColorPickError('timeout', 'timeout'));
    }, OVERALL_TIMEOUT_MS);

    const cleanup = () => {
      window.clearTimeout(timer);
      signal?.removeEventListener('abort', onAbort);
    };

    signal?.addEventListener('abort', onAbort, { once: true });

    promise.then(
      (value) => {
        cleanup();
        resolve(value);
      },
      (err) => {
        cleanup();
        reject(err);
      }
    );
  });
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

function readPixelFromCanvas(canvas: HTMLCanvasElement, x: number, y: number): RgbColor {
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) return { r: 0, g: 0, b: 0 };
  const [r, g, b] = ctx.getImageData(x, y, 1, 1).data;
  return { r, g, b };
}

async function resizeBitmap(bitmap: ImageBitmap): Promise<ImageBitmap> {
  const maxSide = Math.max(bitmap.width, bitmap.height);
  if (maxSide <= MAX_PICK_DIM) return bitmap;

  const scale = MAX_PICK_DIM / maxSide;
  const w = Math.max(1, Math.round(bitmap.width * scale));
  const h = Math.max(1, Math.round(bitmap.height * scale));

  if (typeof createImageBitmap !== 'function') {
    return bitmap;
  }

  const resized = await createImageBitmap(bitmap, {
    resizeWidth: w,
    resizeHeight: h,
    resizeQuality: 'high',
  });
  bitmap.close();
  return resized;
}

async function bitmapToPickCanvas(bitmap: ImageBitmap): Promise<HTMLCanvasElement> {
  await yieldTwice();
  const canvas = document.createElement('canvas');
  canvas.width = bitmap.width;
  canvas.height = bitmap.height;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) {
    bitmap.close();
    throw new ScreenColorPickError('capture_failed', 'capture_failed');
  }
  ctx.drawImage(bitmap, 0, 0);
  bitmap.close();
  await yieldToMain();
  return canvas;
}

async function waitForVideoDimensions(
  video: HTMLVideoElement,
  signal?: AbortSignal
): Promise<void> {
  if (video.videoWidth > 0 && video.videoHeight > 0) return;

  await new Promise<void>((resolve, reject) => {
    const timeout = window.setTimeout(() => {
      cleanup();
      reject(new ScreenColorPickError('capture_failed', 'capture_failed'));
    }, CAPTURE_TIMEOUT_MS);

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

async function waitForVideoPaint(video: HTMLVideoElement): Promise<void> {
  if (typeof video.requestVideoFrameCallback === 'function') {
    await new Promise<void>((resolve) => {
      video.requestVideoFrameCallback(() => resolve());
    });
    return;
  }
  await yieldTwice();
}

async function grabBitmapFromStream(
  stream: MediaStream,
  signal?: AbortSignal
): Promise<ImageBitmap> {
  const track = stream.getVideoTracks()[0];
  if (!track) {
    throw new ScreenColorPickError('capture_failed', 'capture_failed');
  }

  const ImageCaptureCtor = (
    window as unknown as {
      ImageCapture?: new (t: MediaStreamTrack) => { grabFrame: () => Promise<ImageBitmap> };
    }
  ).ImageCapture;

  if (ImageCaptureCtor) {
    try {
      const capturer = new ImageCaptureCtor(track);
      const bitmap = await Promise.race([
        capturer.grabFrame(),
        new Promise<never>((_, reject) => {
          window.setTimeout(
            () => reject(new ScreenColorPickError('capture_failed', 'capture_failed')),
            CAPTURE_TIMEOUT_MS
          );
        }),
      ]);
      stopStream(stream);
      await yieldToMain();
      return bitmap;
    } catch {
      /* fall through to video element path */
    }
  }

  const video = document.createElement('video');
  video.muted = true;
  video.playsInline = true;
  video.srcObject = stream;

  try {
    await Promise.race([
      (async () => {
        await video.play();
        await waitForVideoDimensions(video, signal);
        await waitForVideoPaint(video);
      })(),
      new Promise<never>((_, reject) => {
        window.setTimeout(
          () => reject(new ScreenColorPickError('capture_failed', 'capture_failed')),
          CAPTURE_TIMEOUT_MS
        );
      }),
    ]);

    if (signal?.aborted) {
      throw new ScreenColorPickError('cancelled', 'cancelled');
    }

    if (typeof createImageBitmap === 'function') {
      const bitmap = await createImageBitmap(video);
      stopStream(stream);
      video.srcObject = null;
      await yieldToMain();
      return bitmap;
    }

    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx || canvas.width < 1 || canvas.height < 1) {
      throw new ScreenColorPickError('capture_failed', 'capture_failed');
    }
    ctx.drawImage(video, 0, 0);
    stopStream(stream);
    video.srcObject = null;
    await yieldToMain();
    if (typeof createImageBitmap !== 'function') {
      throw new ScreenColorPickError('capture_failed', 'capture_failed');
    }
    return createImageBitmap(canvas);
  } finally {
    video.srcObject = null;
    stopStream(stream);
  }
}

async function capturePickCanvas(signal?: AbortSignal): Promise<HTMLCanvasElement> {
  if (!isScreenColorPickSupported()) {
    throw new ScreenColorPickError('unsupported', 'unsupported');
  }
  if (signal?.aborted) {
    throw new ScreenColorPickError('cancelled', 'cancelled');
  }

  let stream: MediaStream | null = null;
  try {
    stream = await Promise.race([
      requestDisplayMediaForColorPick(),
      new Promise<never>((_, reject) => {
        window.setTimeout(() => reject(new ScreenColorPickError('timeout', 'timeout')), CAPTURE_TIMEOUT_MS);
      }),
    ]);

    if (signal?.aborted) {
      throw new ScreenColorPickError('cancelled', 'cancelled');
    }

    const frame = await grabBitmapFromStream(stream, signal);
    stream = null;
    const resized = await resizeBitmap(frame);
    return bitmapToPickCanvas(resized);
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
    stopStream(stream);
    await yieldToMain();
  }
}

function showBusyOverlay(labels: { busy: string; cancel: string }, onCancel: () => void): () => void {
  const overlay = document.createElement('div');
  overlay.className = 'screen-color-pick-overlay screen-color-pick-overlay--busy';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-busy', 'true');

  const spinner = document.createElement('div');
  spinner.className = 'screen-color-pick-spinner';
  spinner.setAttribute('aria-hidden', 'true');

  const hint = document.createElement('p');
  hint.className = 'screen-color-pick-hint';
  hint.textContent = labels.busy;

  const cancelBtn = document.createElement('button');
  cancelBtn.type = 'button';
  cancelBtn.className = 'screen-color-pick-cancel';
  cancelBtn.textContent = labels.cancel;
  cancelBtn.addEventListener('click', (e) => {
    e.preventDefault();
    onCancel();
  });

  overlay.appendChild(spinner);
  overlay.appendChild(hint);
  overlay.appendChild(cancelBtn);
  document.body.appendChild(overlay);
  lockPageForPick();

  return () => {
    overlay.remove();
    unlockPageForPick();
  };
}

async function canvasToPreviewImage(
  canvas: HTMLCanvasElement
): Promise<{ img: HTMLImageElement; revoke: () => void }> {
  const blob = await new Promise<Blob | null>((resolve) => {
    canvas.toBlob(resolve, 'image/jpeg', 0.86);
  });
  if (!blob) {
    throw new ScreenColorPickError('capture_failed', 'capture_failed');
  }

  const url = URL.createObjectURL(blob);
  const img = document.createElement('img');
  img.draggable = false;
  img.alt = '';
  img.decoding = 'async';
  img.className = 'screen-color-pick-canvas';
  img.src = url;

  await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new ScreenColorPickError('capture_failed', 'capture_failed'));
    };
  });

  await yieldToMain();
  return { img, revoke: () => URL.revokeObjectURL(url) };
}

function pickColorFromCaptureOverlay(
  sampleCanvas: HTMLCanvasElement,
  previewImg: HTMLImageElement,
  revokePreview: () => void,
  signal?: AbortSignal,
  labels?: { hint: string; cancel: string }
): Promise<RgbColor> {
  return new Promise((resolve, reject) => {
    let settled = false;

    const overlay = document.createElement('div');
    overlay.className = 'screen-color-pick-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');

    previewImg.style.cursor = 'crosshair';

    const hint = document.createElement('p');
    hint.className = 'screen-color-pick-hint';
    hint.textContent = labels?.hint ?? 'Click a pixel to capture its color · Esc to cancel';

    const cancelBtn = document.createElement('button');
    cancelBtn.type = 'button';
    cancelBtn.className = 'screen-color-pick-cancel';
    cancelBtn.textContent = labels?.cancel ?? 'Cancel';

    const cleanup = () => {
      document.removeEventListener('keydown', onKeyDown, true);
      previewImg.removeEventListener('click', onPick);
      cancelBtn.removeEventListener('click', onCancelClick);
      overlay.remove();
      revokePreview();
      unlockPageForPick();
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

    const onCancelClick = (e: Event) => {
      e.preventDefault();
      onAbort();
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
      const rect = previewImg.getBoundingClientRect();
      const mapped = mapClickToCanvasPixel(
        sampleCanvas.width,
        sampleCanvas.height,
        rect,
        e.clientX,
        e.clientY
      );
      if (!mapped) return;

      const color = readPixelFromCanvas(sampleCanvas, mapped.x, mapped.y);
      requestAnimationFrame(() => {
        finish(() => resolve(color));
      });
    };

    cancelBtn.addEventListener('click', onCancelClick);
    signal?.addEventListener('abort', onAbort, { once: true });

    overlay.appendChild(previewImg);
    overlay.appendChild(hint);
    overlay.appendChild(cancelBtn);
    document.body.appendChild(overlay);
    lockPageForPick();
    document.addEventListener('keydown', onKeyDown, true);
    previewImg.addEventListener('click', onPick);
  });
}

export async function pickColorFromScreen(
  signal?: AbortSignal,
  labels?: { hint: string; cancel: string; busy: string }
): Promise<RgbColor> {
  const linked = new AbortController();
  const forwardAbort = () => linked.abort();
  signal?.addEventListener('abort', forwardAbort, { once: true });
  const runSignal = linked.signal;

  return withOverallTimeout(
    (async () => {
      let hideBusy: (() => void) | null = null;
      try {
        hideBusy = showBusyOverlay(
          {
            busy: labels?.busy ?? 'Capturing screen…',
            cancel: labels?.cancel ?? 'Cancel',
          },
          () => linked.abort()
        );

        if (runSignal.aborted) {
          throw new ScreenColorPickError('cancelled', 'cancelled');
        }

        const sampleCanvas = await capturePickCanvas(runSignal);
        hideBusy();
        hideBusy = null;

        if (runSignal.aborted) {
          throw new ScreenColorPickError('cancelled', 'cancelled');
        }

        const { img, revoke } = await canvasToPreviewImage(sampleCanvas);
        return pickColorFromCaptureOverlay(sampleCanvas, img, revoke, runSignal, labels);
      } finally {
        hideBusy?.();
        signal?.removeEventListener('abort', forwardAbort);
      }
    })(),
    runSignal
  );
}
