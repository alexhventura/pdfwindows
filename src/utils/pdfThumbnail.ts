import { loadPdfJS } from './pdfjsLoader';

async function readFileAsArrayBuffer(file: File | Blob): Promise<ArrayBuffer> {
  return file.arrayBuffer();
}

/** Render a PDF page (1-based) to a blob URL suitable for UI thumbnails. */
export async function renderPdfPageThumbnailUrl(
  source: File | Blob,
  pageNumber = 1,
  maxWidth = 480
): Promise<string> {
  const pdfjsLib = await loadPdfJS();
  const arrayBuffer = await readFileAsArrayBuffer(source);
  const data = new Uint8Array(arrayBuffer).slice();
  const pdf = await pdfjsLib.getDocument({ data }).promise;
  try {
    const page = await pdf.getPage(Math.max(1, Math.min(pageNumber, pdf.numPages)));
    const baseViewport = page.getViewport({ scale: 1 });
    const scale = maxWidth / baseViewport.width;
    const viewport = page.getViewport({ scale });

    const canvas = document.createElement('canvas');
    canvas.width = Math.max(1, Math.floor(viewport.width));
    canvas.height = Math.max(1, Math.floor(viewport.height));
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas unavailable');

    await page.render({ canvasContext: ctx, viewport, canvas }).promise;

    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('Thumbnail encode failed'))), 'image/jpeg', 0.82);
    });
    return URL.createObjectURL(blob);
  } finally {
    await pdf.destroy?.();
  }
}

/** Render the first page of a PDF to a blob URL suitable for UI thumbnails. */
export async function renderPdfThumbnailUrl(
  source: File | Blob,
  maxWidth = 480
): Promise<string> {
  return renderPdfPageThumbnailUrl(source, 1, maxWidth);
}
