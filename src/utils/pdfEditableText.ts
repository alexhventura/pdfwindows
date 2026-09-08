/**
 * Extracts positioned text spans from a digital PDF so the "Edit PDF" tool can
 * offer in-place editing (change or delete existing text). Everything runs in
 * the browser via the bundled PDF.js — no upload.
 *
 * Coordinates are normalized (0..1) with the origin at the top-left of the page,
 * matching the convention used by applyPdfEdits (which flips Y internally).
 */
import type { PdfEditOp } from '../engines/pdfToolkit';

export interface EditableSpan {
  id: string;
  pageIndex: number;
  /** Original text of the span. */
  str: string;
  /** Normalized rectangle of the glyph box, Y measured from the top. */
  x: number;
  y: number;
  w: number;
  h: number;
  /** Font size in PDF points (== device px at scale 1). */
  fontSize: number;
}

export interface EditableExtract {
  spans: EditableSpan[];
  pageCount: number;
  /** Pages actually scanned (capped for very large files). */
  pagesScanned: number;
}

/** Max pages we scan for editable text to keep the UI responsive. */
export const EDITABLE_TEXT_MAX_PAGES = 50;

/** Combine two 2D affine matrices [a,b,c,d,e,f] the same way PDF.js Util.transform does. */
function multiply(m1: number[], m2: number[]): number[] {
  return [
    m1[0] * m2[0] + m1[2] * m2[1],
    m1[1] * m2[0] + m1[3] * m2[1],
    m1[0] * m2[2] + m1[2] * m2[3],
    m1[1] * m2[2] + m1[3] * m2[3],
    m1[0] * m2[4] + m1[2] * m2[5] + m1[4],
    m1[1] * m2[4] + m1[3] * m2[5] + m1[5],
  ];
}

interface PdfTextItem {
  str: string;
  width: number;
  height: number;
  transform: number[];
}

export async function extractEditableSpans(
  file: File,
  maxPages: number = EDITABLE_TEXT_MAX_PAGES
): Promise<EditableExtract> {
  const { loadPdfJS } = await import('./pdfjsLoader');
  const pdfjs = await loadPdfJS();
  const data = new Uint8Array(await file.arrayBuffer()).slice();
  const pdf = await pdfjs.getDocument({ data }).promise;
  try {
    const pageCount = pdf.numPages;
    const pagesScanned = Math.min(pageCount, Math.max(1, maxPages));
    const spans: EditableSpan[] = [];

    for (let p = 1; p <= pagesScanned; p++) {
      const page = await pdf.getPage(p);
      const viewport = page.getViewport({ scale: 1 });
      const vt = viewport.transform as number[];
      const W = viewport.width;
      const H = viewport.height;
      const content = await page.getTextContent();
      let index = 0;

      for (const raw of content.items as PdfTextItem[]) {
        if (typeof raw.str !== 'string') continue;
        const str = raw.str;
        if (!str.trim()) {
          index++;
          continue;
        }
        const t = multiply(vt, raw.transform);
        // Skip rotated / vertical text — leave it untouched in the document.
        const rotated = Math.abs(t[1]) > 0.5 || Math.abs(t[2]) > 0.5;
        const fontHeight = Math.hypot(t[2], t[3]);
        if (rotated || fontHeight <= 0.5) {
          index++;
          continue;
        }
        const widthPx = raw.width > 0 ? raw.width : fontHeight * 0.5 * str.length;
        const left = t[4];
        const baseline = t[5];
        const top = baseline - fontHeight;

        const nx = left / W;
        const ny = top / H;
        const nw = widthPx / W;
        const nh = fontHeight / H;
        if (nw <= 0 || nh <= 0 || nx < -0.05 || ny < -0.05 || nx > 1.05 || ny > 1.05) {
          index++;
          continue;
        }

        spans.push({
          id: `${p - 1}:${index}`,
          pageIndex: p - 1,
          str,
          x: nx,
          y: ny,
          w: nw,
          h: nh,
          fontSize: fontHeight,
        });
        index++;
      }
      page.cleanup();
    }

    return { spans, pageCount, pagesScanned };
  } finally {
    await pdf.destroy();
  }
}

/**
 * Turns an edited span into the low-level ops needed to replace it in the PDF:
 * an opaque white box that hides the original glyphs, plus the new text drawn on
 * the original baseline. An empty replacement just erases (i.e. deletes the text).
 */
export function spanEditOps(span: EditableSpan, newText: string): PdfEditOp[] {
  const padY = span.h * 0.22;
  const padX = span.h * 0.08;
  const ops: PdfEditOp[] = [
    {
      kind: 'erase',
      pageIndex: span.pageIndex,
      x: Math.max(0, span.x - padX),
      y: Math.max(0, span.y - padY),
      w: span.w + padX * 2,
      h: span.h + padY * 2,
      color: '#ffffff',
    },
  ];
  if (newText.trim()) {
    ops.push({
      kind: 'text',
      pageIndex: span.pageIndex,
      x: span.x,
      y: span.y,
      w: span.w,
      h: span.h,
      text: newText,
      fontSize: span.fontSize,
      color: '#0f172a',
      atBaseline: true,
    });
  }
  return ops;
}
