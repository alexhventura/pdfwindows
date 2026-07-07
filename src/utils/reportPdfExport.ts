import { PDFDocument, StandardFonts } from 'pdf-lib';
import type { LanguageType } from '../types';
import { modalT } from '../components/suite/shared';
import { sanitizePdfText } from './pdfTextSanitizer';
import { drawPdfWindowsFooter } from './pdfFooter';
import { drawHtmlToPdf, htmlToPlainText } from './richTextToPdf';

const PAGE_WIDTH = 595;
const PAGE_HEIGHT = 842;
const MARGIN_X = 50;
const MARGIN_BOTTOM = 52;

export interface ReportExportInput {
  title: string;
  subtitle: string;
  author: string;
  introHtml: string;
  sections: Array<{ title: string; bodyHtml: string }>;
  lang: LanguageType;
}

export async function exportReportPdf(input: ReportExportInput): Promise<Uint8Array> {
  const { title, subtitle, author, introHtml, sections, lang } = input;
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontItalic = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

  let page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  const pages = [page];
  let y = PAGE_HEIGHT - 56;

  const ctx = {
    pdfDoc,
    page,
    y,
    pageWidth: PAGE_WIDTH,
    pageHeight: PAGE_HEIGHT,
    marginX: MARGIN_X,
    marginBottom: MARGIN_BOTTOM,
    contentWidth: PAGE_WIDTH - MARGIN_X * 2,
    lineHeight: 15,
    font,
    fontBold,
    fontItalic,
    pages,
  };

  const labels = modalT[lang];

  page.drawText(sanitizePdfText(labels.reportDocHeading), {
    x: MARGIN_X,
    y,
    size: 10,
    font: fontBold,
  });
  y -= 22;
  ctx.y = y;

  if (title) {
    page.drawText(sanitizePdfText(title), {
      x: MARGIN_X,
      y,
      size: 18,
      font: fontBold,
      maxWidth: ctx.contentWidth,
    });
    y -= 28;
    ctx.y = y;
  }

  if (subtitle) {
    page.drawText(sanitizePdfText(subtitle), { x: MARGIN_X, y, size: 12, font });
    y -= 20;
    ctx.y = y;
  }

  if (author) {
    page.drawText(sanitizePdfText(`${labels.reportAuthor}: ${author}`), { x: MARGIN_X, y, size: 10, font });
    y -= 16;
    ctx.y = y;
  }

  const dateStr = new Date().toLocaleDateString(
    lang === 'pt' ? 'pt-BR' : lang === 'es' ? 'es-ES' : 'en-US'
  );
  page.drawText(sanitizePdfText(dateStr), { x: MARGIN_X, y, size: 10, font });
  y -= 24;
  ctx.y = y;

  if (htmlToPlainText(introHtml)) {
    page.drawText(sanitizePdfText(labels.reportIntroHeading), { x: MARGIN_X, y, size: 11, font: fontBold });
    y -= 18;
    ctx.y = y;
    ctx.page = page;
    ctx.y = drawHtmlToPdf(ctx, introHtml);
    page = ctx.page;
    y = ctx.y - 8;
    ctx.y = y;
  }

  sections.forEach((section, idx) => {
    if (!htmlToPlainText(section.title) && !htmlToPlainText(section.bodyHtml)) return;

    if (ctx.y < MARGIN_BOTTOM + 80) {
      page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
      pages.push(page);
      ctx.page = page;
      ctx.y = PAGE_HEIGHT - 56;
    }

    const sectionTitle = section.title.trim() || '—';
    page.drawText(sanitizePdfText(`${idx + 1}. ${sectionTitle}`), {
      x: MARGIN_X,
      y: ctx.y,
      size: 13,
      font: fontBold,
      maxWidth: ctx.contentWidth,
    });
    ctx.y -= 20;
    ctx.page = page;
    ctx.y = drawHtmlToPdf(ctx, section.bodyHtml);
    page = ctx.page;
    ctx.y -= 6;
  });

  pages.forEach((p) => drawPdfWindowsFooter(p, font, PAGE_WIDTH, 28, lang));

  return pdfDoc.save();
}
