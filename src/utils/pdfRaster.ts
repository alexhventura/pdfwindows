import { loadPdfJS } from './pdfjsLoader';

export async function rasterizePdfPagesPng(
  file: File,
  options?: { scale?: number; maxPages?: number }
): Promise<Uint8Array[]> {
  const pdfjs = await loadPdfJS();
  const data = new Uint8Array(await file.arrayBuffer()).slice();
  const pdf = await pdfjs.getDocument({ data }).promise;
  const scale = options?.scale ?? 1.4;
  const maxPages = Math.min(pdf.numPages, options?.maxPages ?? 40);
  const out: Uint8Array[] = [];
  try {
    for (let i = 1; i <= maxPages; i++) {
      const page = await pdf.getPage(i);
      const viewport = page.getViewport({ scale });
      const canvas = document.createElement('canvas');
      canvas.width = Math.max(1, Math.floor(viewport.width));
      canvas.height = Math.max(1, Math.floor(viewport.height));
      const ctx = canvas.getContext('2d', { alpha: false });
      if (!ctx) continue;
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      await page.render({ canvasContext: ctx, viewport, canvas }).promise;
      const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/png'));
      if (blob) out.push(new Uint8Array(await blob.arrayBuffer()));
    }
  } finally {
    await pdf.destroy?.();
  }
  if (!out.length) throw new Error('NO_PAGES');
  return out;
}
