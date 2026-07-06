import { PDFDocument, StandardFonts, rgb, type PDFPage, type PDFFont } from 'pdf-lib';
import { sanitizePdfText } from '../utils/pdfTextSanitizer';
import { createWorker, type Worker } from 'tesseract.js';
import type { PDFPageProxy } from 'pdfjs-dist';
import { loadPdfJS } from '../utils/pdfjsLoader';
import { drawPdfWindowsFooter } from '../utils/pdfFooter';

export const PDF_OCR_MAX_PAGES = 30;
/** Render scale for OCR input (paired with user_defined_dpi below) */
export const PDF_RENDER_SCALE = 2;

export interface PdfOcrProgress {
  page: number;
  total: number;
}

interface OcrWord {
  text: string;
  bbox: { x0: number; y0: number; x1: number; y1: number };
}

function extractWords(data: {
  words?: OcrWord[];
  blocks?: Array<{
    paragraphs: Array<{
      lines: Array<{
        text: string;
        bbox: { x0: number; y0: number; x1: number; y1: number };
        words?: OcrWord[];
      }>;
    }>;
  }>;
}): OcrWord[] {
  if (data.words?.length) {
    return data.words.filter((w) => w.text?.trim());
  }
  const out: OcrWord[] = [];
  for (const block of data.blocks ?? []) {
    for (const para of block.paragraphs) {
      for (const line of para.lines) {
        if (line.words?.length) {
          out.push(...line.words.filter((w) => w.text?.trim()));
        } else if (line.text?.trim()) {
          out.push({ text: line.text, bbox: line.bbox });
        }
      }
    }
  }
  return out;
}

async function renderPageToCanvas(
  pdfjsPage: PDFPageProxy
): Promise<{ canvas: HTMLCanvasElement; viewport: { width: number; height: number } }> {
  const viewport = pdfjsPage.getViewport({ scale: PDF_RENDER_SCALE });
  const canvas = document.createElement('canvas');
  canvas.width = Math.floor(viewport.width);
  canvas.height = Math.floor(viewport.height);
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas 2D unavailable');
  await pdfjsPage.render({ canvasContext: ctx, viewport, canvas }).promise;
  return { canvas, viewport: { width: viewport.width, height: viewport.height } };
}

/**
 * Tesseract TessPDFRenderer — background image + invisible text layer
 * (Ctrl+F, word selection, copy/paste in Adobe/Chrome).
 */
async function recognizeCanvasToSearchablePdf(
  worker: Worker,
  canvas: HTMLCanvasElement,
  pageLabel: string
): Promise<Uint8Array> {
  const { data } = await worker.recognize(
    canvas.toDataURL('image/png'),
    {
      pdfTitle: pageLabel,
      pdfTextOnly: false,
    },
    { pdf: true }
  );

  if (!data.pdf?.length) {
    throw new Error('TESSERACT_PDF_UNAVAILABLE');
  }
  return new Uint8Array(data.pdf);
}

/**
 * Fallback: original page via copyPages + OCR words scaled to PDF points.
 */
function drawSearchableTextLayer(
  page: PDFPage,
  font: PDFFont,
  words: OcrWord[],
  pageWidth: number,
  pageHeight: number,
  canvasWidth: number,
  canvasHeight: number
): void {
  const scaleX = pageWidth / canvasWidth;
  const scaleY = pageHeight / canvasHeight;

  for (const word of words) {
    const text = sanitizePdfText(word.text.trim());
    if (!text) continue;

    const { x0, y0, x1, y1 } = word.bbox;
    const boxW = Math.max(1, (x1 - x0) * scaleX);
    const boxH = Math.max(1, (y1 - y0) * scaleY);
    const fontSize = Math.max(5, Math.min(48, boxH * 0.85));
    const pdfX = x0 * scaleX;
    const pdfY = pageHeight - y1 * scaleY;

    const naturalWidth = font.widthOfTextAtSize(text, fontSize);
    const xScale = naturalWidth > 0 ? Math.min(1.2, Math.max(0.5, boxW / naturalWidth)) : 1;

    page.drawText(text, {
      x: pdfX,
      y: pdfY,
      size: fontSize * xScale,
      font,
      color: rgb(0, 0, 0),
      opacity: 0.02,
    });
  }
}

async function addFallbackPage(
  worker: Worker,
  outDoc: PDFDocument,
  srcDoc: PDFDocument,
  overlayFont: PDFFont,
  pageIndex: number,
  canvas: HTMLCanvasElement,
  viewport: { width: number; height: number }
): Promise<void> {
  const [copied] = await outDoc.copyPages(srcDoc, [pageIndex]);
  const page = outDoc.addPage(copied);
  const { width: pageWidth, height: pageHeight } = page.getSize();

  const { data } = await worker.recognize(canvas.toDataURL('image/png'), {}, { blocks: true, pdf: false });
  drawSearchableTextLayer(
    page,
    overlayFont,
    extractWords(data),
    pageWidth,
    pageHeight,
    viewport.width,
    viewport.height
  );
}

/**
 * Hybrid searchable PDF: original appearance + invisible text layer.
 */
export async function buildSearchablePdfFromFile(
  file: File,
  language: string,
  onProgress?: (p: PdfOcrProgress) => void,
  signal?: AbortSignal
): Promise<Blob> {
  const arrayBuffer = await file.arrayBuffer();
  const srcDoc = await PDFDocument.load(arrayBuffer.slice(0), { ignoreEncryption: true });
  const pdfjsLib = await loadPdfJS();
  const pdfBytes = new Uint8Array(arrayBuffer).slice();
  const pdfjsDoc = await pdfjsLib.getDocument({ data: pdfBytes }).promise;
  const total = Math.min(pdfjsDoc.numPages, PDF_OCR_MAX_PAGES, srcDoc.getPageCount());

  const outDoc = await PDFDocument.create();
  const worker: Worker = await createWorker(language);
  const overlayFont = await outDoc.embedFont(StandardFonts.Helvetica);

  await worker.setParameters({
    preserve_interword_spaces: '1',
    user_defined_dpi: String(Math.round(72 * PDF_RENDER_SCALE)),
  });

  let tessPdfAvailable = true;

  try {
    for (let i = 1; i <= total; i++) {
      if (signal?.aborted) {
        throw new DOMException('Aborted', 'AbortError');
      }
      onProgress?.({ page: i, total });

      const pdfjsPage = await pdfjsDoc.getPage(i);
      const { canvas, viewport } = await renderPageToCanvas(pdfjsPage);

      let added = false;

      if (tessPdfAvailable) {
        try {
          const pagePdfBytes = await recognizeCanvasToSearchablePdf(
            worker,
            canvas,
            `PDFWINDOWS OCR ${i}/${total}`
          );
          const tessDoc = await PDFDocument.load(pagePdfBytes);
          const [copied] = await outDoc.copyPages(tessDoc, [0]);
          outDoc.addPage(copied);
          added = true;
        } catch (err) {
          console.warn('Tesseract PDF renderer unavailable, using copyPages fallback:', err);
          tessPdfAvailable = false;
        }
      }

      if (!added) {
        await addFallbackPage(worker, outDoc, srcDoc, overlayFont, i - 1, canvas, viewport);
      }
    }
  } finally {
    await worker.terminate();
  }

  const footerFont = await outDoc.embedFont(StandardFonts.Helvetica);
  outDoc.getPages().forEach((p) => {
    const { width } = p.getSize();
    drawPdfWindowsFooter(p, footerFont, width, 22);
  });

  return new Blob([await outDoc.save()], { type: 'application/pdf' });
}
