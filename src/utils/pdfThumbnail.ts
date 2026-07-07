import { loadPdfJS } from './pdfjsLoader';

async function readFileAsArrayBuffer(file: File | Blob): Promise<ArrayBuffer> {
  return file.arrayBuffer();
}

/** Render the first page of a PDF to a blob URL suitable for UI thumbnails. */
export async function renderPdfThumbnailUrl(
  source: File | Blob,
  maxWidth = 480
): Promise<string> {
  const pdfjsLib = await loadPdfJS();
  const arrayBuffer = await readFileAsArrayBuffer(source);
  const data = new Uint8Array(arrayBuffer).slice();
  const pdf = await pdfjsLib.getDocument({ data }).promise;
  const page = await pdf.getPage(1);
  const baseViewport = page.getViewport({ scale: 1 });
  const scale = maxWidth / baseViewport.width;
  const viewport = page.getViewport({ scale });

  const canvas = document.createElement('canvas');
  canvas.width = viewport.width;
  canvas.height = viewport.height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas unavailable');

  await page.render({ canvasContext: ctx, viewport, canvas }).promise;

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('Thumbnail encode failed'))), 'image/jpeg', 0.88);
  });

  return URL.createObjectURL(blob);
}
