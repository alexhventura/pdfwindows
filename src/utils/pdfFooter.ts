import type { PDFPage, PDFFont } from 'pdf-lib';
import { rgb } from 'pdf-lib';

export const PDFWINDOWS_FOOTER_TEXT = 'feito com PDFWINDOWS.com';

const FOOTER_COLOR = rgb(0.12, 0.25, 0.45);

/** Discrete brand footer — bottom center of each page */
export function drawPdfWindowsFooter(
  page: PDFPage,
  font: PDFFont,
  pageWidth: number,
  marginBottom = 36
): void {
  const size = 8;
  const text = PDFWINDOWS_FOOTER_TEXT;
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
