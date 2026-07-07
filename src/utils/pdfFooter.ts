import type { PDFPage, PDFFont } from 'pdf-lib';
import { rgb } from 'pdf-lib';
import type { LanguageType } from '../types';

export const PDF_FOOTER_TEXT: Record<LanguageType, string> = {
  pt: 'feito com PDFWINDOWS.com',
  en: 'made with PDFWINDOWS.com',
  es: 'hecho con PDFWINDOWS.com',
};

const FOOTER_COLOR = rgb(0.12, 0.25, 0.45);

/** Discrete brand footer — bottom center of each page */
export function drawPdfWindowsFooter(
  page: PDFPage,
  font: PDFFont,
  pageWidth: number,
  marginBottom = 36,
  lang: LanguageType = 'en'
): void {
  const size = 8;
  const text = PDF_FOOTER_TEXT[lang];
  const textWidth = font.widthOfTextAtSize(text, size);
  page.drawText(text, {
    x: (pageWidth - textWidth) / 2,
    y: marginBottom,
    size,
    font,
    color: FOOTER_COLOR,
    opacity: 0.85,
  });
}
