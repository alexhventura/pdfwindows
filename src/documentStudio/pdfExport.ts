import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import type { LanguageType } from '../types';
import { sanitizePdfText } from '../utils/pdfTextSanitizer';
import { drawPdfWindowsFooter } from '../utils/pdfFooter';
import { drawHtmlToPdf, htmlToPlainText } from '../utils/richTextToPdf';
import type { DocFormValues, DocTemplateId } from './types';
import { DOCUMENT_TEMPLATES, getTemplateTitle } from './templates';

const PAGE_WIDTH = 595;
const PAGE_HEIGHT = 842;
const MARGIN_X = 50;
const MARGIN_TOP = 56;
const MARGIN_BOTTOM = 52;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN_X * 2;
const LINE_HEIGHT = 16;

function wrapText(text: string, maxChars: number): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let current = '';
  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length > maxChars && current) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  }
  if (current) lines.push(current);
  return lines.length ? lines : [''];
}

function looksLikeHtml(text: string): boolean {
  return /<[a-z][\s\S]*>/i.test(text);
}

export async function exportDocumentPdf(
  templateId: DocTemplateId,
  values: DocFormValues,
  lang: LanguageType
): Promise<Uint8Array> {
  const template = DOCUMENT_TEMPLATES[templateId];
  const title = getTemplateTitle(templateId, values, lang);
  const paragraphs = template.buildParagraphs(values, lang);

  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.TimesRoman);
  const fontBold = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);
  const fontItalic = await pdfDoc.embedFont(StandardFonts.TimesRomanItalic);

  const pages: ReturnType<PDFDocument['addPage']>[] = [];
  let page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  pages.push(page);
  let y = PAGE_HEIGHT - MARGIN_TOP;

  const ensureSpace = (needed: number) => {
    if (y - needed < MARGIN_BOTTOM) {
      page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
      pages.push(page);
      y = PAGE_HEIGHT - MARGIN_TOP;
    }
  };

  const drawPlainLine = (text: string, size: number, bold = false, indent = 0) => {
    const maxChars = Math.floor((CONTENT_WIDTH - indent) / (size * 0.5));
    const lines = wrapText(text, Math.max(20, maxChars));
    for (const line of lines) {
      ensureSpace(LINE_HEIGHT);
      page.drawText(sanitizePdfText(line), {
        x: MARGIN_X + indent,
        y,
        size,
        font: bold ? fontBold : font,
        maxWidth: CONTENT_WIDTH - indent,
        color: rgb(0.12, 0.14, 0.18),
      });
      y -= LINE_HEIGHT;
    }
  };

  drawPlainLine(title, 16, true);
  y -= 10;

  for (const paragraph of paragraphs) {
    if (!paragraph.trim()) continue;
    if (looksLikeHtml(paragraph)) {
      const ctx = {
        pdfDoc,
        page,
        y,
        pageWidth: PAGE_WIDTH,
        pageHeight: PAGE_HEIGHT,
        marginX: MARGIN_X,
        marginBottom: MARGIN_BOTTOM,
        contentWidth: CONTENT_WIDTH,
        lineHeight: LINE_HEIGHT,
        font,
        fontBold,
        fontItalic,
        pages,
      };
      y = drawHtmlToPdf(ctx, paragraph);
      page = ctx.page;
      y -= 8;
    } else {
      drawPlainLine(paragraph, 11, false);
      y -= 6;
    }
  }

  pages.forEach((p) => drawPdfWindowsFooter(p, font, PAGE_WIDTH, 28));

  return pdfDoc.save();
}

export function downloadPdfBytes(bytes: Uint8Array, fileName: string): void {
  const blob = new Blob([bytes], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
