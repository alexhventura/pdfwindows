import type { PDFPageProxy } from 'pdfjs-dist';

/** Default OCR render scale — lower than 2× for faster recognition on long PDFs. */
export const OCR_RENDER_SCALE_DEFAULT = 1.35;
/** Cap longest canvas edge to keep Tesseract input manageable. */
export const OCR_MAX_CANVAS_EDGE = 1600;
/** Soft ceiling for OCR / extract tools (browser memory still applies). */
export const OCR_MAX_PAGES = 100;

export function adaptiveOcrScale(pageCount: number): number {
  if (pageCount > 50) return 1.1;
  if (pageCount > 30) return 1.2;
  if (pageCount > 15) return 1.3;
  return OCR_RENDER_SCALE_DEFAULT;
}

/** Yield so the UI can paint progress between heavy OCR pages. */
export function yieldToUi(): Promise<void> {
  return new Promise((resolve) => {
    if (typeof requestAnimationFrame === 'function') {
      requestAnimationFrame(() => resolve());
    } else {
      setTimeout(resolve, 0);
    }
  });
}

/**
 * Render a PDF.js page to a canvas sized for OCR (adaptive scale + max edge).
 */
export async function renderPdfPageForOcr(
  pdfjsPage: PDFPageProxy,
  scale: number = OCR_RENDER_SCALE_DEFAULT
): Promise<{ canvas: HTMLCanvasElement; scaleUsed: number }> {
  const base = pdfjsPage.getViewport({ scale: 1 });
  const longest = Math.max(base.width, base.height);
  const capped = Math.min(scale, OCR_MAX_CANVAS_EDGE / Math.max(1, longest));
  const scaleUsed = Math.max(0.75, capped);
  const viewport = pdfjsPage.getViewport({ scale: scaleUsed });
  const canvas = document.createElement('canvas');
  canvas.width = Math.max(1, Math.floor(viewport.width));
  canvas.height = Math.max(1, Math.floor(viewport.height));
  const ctx = canvas.getContext('2d', { alpha: false });
  if (!ctx) throw new Error('Canvas 2D unavailable');
  await pdfjsPage.render({ canvasContext: ctx, viewport, canvas }).promise;
  return { canvas, scaleUsed };
}

/** JPEG blob is much cheaper than PNG data-URLs for Tesseract input. */
export function canvasToOcrJpegBlob(canvas: HTMLCanvasElement, quality = 0.72): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) reject(new Error('Failed to encode OCR JPEG'));
        else resolve(blob);
      },
      'image/jpeg',
      quality
    );
  });
}
