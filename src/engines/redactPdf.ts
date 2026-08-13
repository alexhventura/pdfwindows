import { PDFDocument, rgb } from 'pdf-lib';
import { looksLikePdf } from '../utils/docxZip';

/** Normalized rect in page space: origin top-left, values 0–1 relative to page size. */
export interface RedactionRect {
  pageIndex: number;
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface RedactPdfResult {
  blob: Blob;
  fileName: string;
  redactionCount: number;
  pageCount: number;
}

function outputName(original: string): string {
  const base = original.replace(/\.pdf$/i, '') || 'document';
  return `${base}_redacted.pdf`;
}

function clamp01(n: number): number {
  return Math.min(1, Math.max(0, n));
}

/**
 * Apply opaque black rectangles over the selected regions.
 * Covers content visually for sharing; does not claim forensic scrub of embedded text objects.
 */
export async function applyPdfRedactions(
  file: File,
  rects: RedactionRect[]
): Promise<RedactPdfResult> {
  if (rects.length < 1) throw new Error('NO_REDACTIONS');

  const buffer = await file.arrayBuffer();
  if (!looksLikePdf(buffer)) throw new Error('INVALID_PDF');

  const doc = await PDFDocument.load(buffer, { ignoreEncryption: true, updateMetadata: false });
  const pageCount = doc.getPageCount();
  if (pageCount < 1) throw new Error('EMPTY');

  let applied = 0;
  for (const r of rects) {
    if (!Number.isInteger(r.pageIndex) || r.pageIndex < 0 || r.pageIndex >= pageCount) continue;
    const w = clamp01(r.w);
    const h = clamp01(r.h);
    if (w < 0.004 || h < 0.004) continue;

    const x = clamp01(r.x);
    const y = clamp01(r.y);
    const page = doc.getPage(r.pageIndex);
    const { width, height } = page.getSize();

    const pdfW = w * width;
    const pdfH = h * height;
    const pdfX = x * width;
    const pdfY = height - (y + h) * height;

    page.drawRectangle({
      x: pdfX,
      y: pdfY,
      width: pdfW,
      height: pdfH,
      color: rgb(0, 0, 0),
      borderWidth: 0,
    });
    applied += 1;
  }

  if (applied < 1) throw new Error('NO_REDACTIONS');

  const bytes = await doc.save({ useObjectStreams: false });
  return {
    blob: new Blob([bytes], { type: 'application/pdf' }),
    fileName: outputName(file.name),
    redactionCount: applied,
    pageCount,
  };
}
