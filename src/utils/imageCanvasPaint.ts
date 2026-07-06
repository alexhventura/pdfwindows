const DEFAULT_MAX_DIM = 1920;

function yieldToMain(): Promise<void> {
  return new Promise((resolve) => {
    requestAnimationFrame(() => resolve());
  });
}

export interface PaintImageOptions {
  maxDim?: number;
  signal?: AbortSignal;
}

/**
 * Paints an image onto a canvas asynchronously so the main thread stays responsive.
 * Returns false when aborted or the canvas is unavailable.
 */
export async function paintImageOnCanvas(
  canvas: HTMLCanvasElement,
  img: HTMLImageElement,
  options: PaintImageOptions = {}
): Promise<boolean> {
  const { maxDim = DEFAULT_MAX_DIM, signal } = options;

  if (signal?.aborted || img.naturalWidth < 1 || img.naturalHeight < 1) {
    return false;
  }

  await yieldToMain();
  if (signal?.aborted) return false;

  let w = img.naturalWidth;
  let h = img.naturalHeight;
  const scale = Math.min(1, maxDim / Math.max(w, h));
  w = Math.round(w * scale);
  h = Math.round(h * scale);

  await yieldToMain();
  if (signal?.aborted) return false;

  let source: CanvasImageSource = img;
  let bitmap: ImageBitmap | null = null;

  if (typeof createImageBitmap === 'function') {
    try {
      bitmap = await createImageBitmap(img, {
        resizeWidth: w,
        resizeHeight: h,
        resizeQuality: 'high',
      });
      source = bitmap;
    } catch {
      bitmap = null;
      source = img;
    }
  }

  await yieldToMain();
  if (signal?.aborted) {
    bitmap?.close();
    return false;
  }

  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) {
    bitmap?.close();
    return false;
  }

  ctx.clearRect(0, 0, w, h);
  ctx.drawImage(source, 0, 0, w, h);
  bitmap?.close();

  return true;
}
