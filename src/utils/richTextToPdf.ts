import type { PDFDocument, PDFPage, PDFFont } from 'pdf-lib';
import { rgb } from 'pdf-lib';
import { sanitizePdfText } from './pdfTextSanitizer';

export interface RichTextPdfContext {
  pdfDoc: PDFDocument;
  page: PDFPage;
  y: number;
  pageWidth: number;
  pageHeight: number;
  marginX: number;
  marginBottom: number;
  contentWidth: number;
  lineHeight: number;
  font: PDFFont;
  fontBold: PDFFont;
  fontItalic: PDFFont;
  pages: PDFPage[];
}

function wrapText(text: string, maxChars: number): string[] {
  const words = text.split(/\s+/).filter(Boolean);
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

function pickFont(
  ctx: RichTextPdfContext,
  bold: boolean,
  italic: boolean
): PDFFont {
  if (bold && italic) return ctx.fontBold;
  if (bold) return ctx.fontBold;
  if (italic) return ctx.fontItalic;
  return ctx.font;
}

function parseAlign(el: Element): 'left' | 'center' | 'right' | 'justify' {
  const style = (el.getAttribute('style') ?? '').toLowerCase();
  if (style.includes('text-align: center')) return 'center';
  if (style.includes('text-align: right')) return 'right';
  if (style.includes('text-align: justify')) return 'justify';
  const align = el.getAttribute('align');
  if (align === 'center') return 'center';
  if (align === 'right') return 'right';
  return 'left';
}

function collectInlineText(node: Node, bold: boolean, italic: boolean): Array<{ text: string; bold: boolean; italic: boolean }> {
  if (node.nodeType === Node.TEXT_NODE) {
    const t = node.textContent ?? '';
    return t ? [{ text: t, bold, italic }] : [];
  }
  if (node.nodeType !== Node.ELEMENT_NODE) return [];
  const el = node as HTMLElement;
  const tag = el.tagName.toLowerCase();
  const nextBold = bold || tag === 'b' || tag === 'strong';
  const nextItalic = italic || tag === 'i' || tag === 'em';
  const parts: Array<{ text: string; bold: boolean; italic: boolean }> = [];
  el.childNodes.forEach((child) => {
    parts.push(...collectInlineText(child, nextBold, nextItalic));
  });
  return parts;
}

function drawTextLine(
  ctx: RichTextPdfContext,
  parts: Array<{ text: string; bold: boolean; italic: boolean }>,
  size: number,
  align: 'left' | 'center' | 'right' | 'justify'
): void {
  const fullText = sanitizePdfText(parts.map((p) => p.text).join(''));
  if (!fullText.trim()) return;

  if (ctx.y - ctx.lineHeight < ctx.marginBottom) {
    const page = ctx.pdfDoc.addPage([ctx.pageWidth, ctx.pageHeight]);
    ctx.pages.push(page);
    ctx.page = page;
    ctx.y = ctx.pageHeight - 56;
  }

  const maxChars = Math.floor(ctx.contentWidth / (size * 0.48));
  const lines = wrapText(fullText, Math.max(16, maxChars));

  for (const line of lines) {
    if (ctx.y - ctx.lineHeight < ctx.marginBottom) {
      const page = ctx.pdfDoc.addPage([ctx.pageWidth, ctx.pageHeight]);
      ctx.pages.push(page);
      ctx.page = page;
      ctx.y = ctx.pageHeight - 56;
    }

    const font = pickFont(ctx, parts.some((p) => p.bold), parts.some((p) => p.italic));
    const lineWidth = font.widthOfTextAtSize(line, size);
    let x = ctx.marginX;
    if (align === 'center') x = ctx.marginX + (ctx.contentWidth - lineWidth) / 2;
    if (align === 'right') x = ctx.marginX + ctx.contentWidth - lineWidth;

    ctx.page.drawText(line, {
      x,
      y: ctx.y,
      size,
      font,
      maxWidth: ctx.contentWidth,
      color: rgb(0.12, 0.14, 0.18),
    });
    ctx.y -= ctx.lineHeight + (align === 'justify' ? 2 : 0);
  }
}

function walkBlock(ctx: RichTextPdfContext, el: Element): void {
  const tag = el.tagName.toLowerCase();
  const align = parseAlign(el);

  if (tag === 'ul' || tag === 'ol') {
    let idx = 0;
    el.querySelectorAll(':scope > li').forEach((li) => {
      idx += 1;
      const prefix = tag === 'ol' ? `${idx}. ` : '• ';
      const parts = collectInlineText(li, false, false);
      const merged = [{ text: prefix, bold: false, italic: false }, ...parts];
      drawTextLine(ctx, merged, 11, align);
      ctx.y -= 4;
    });
    return;
  }

  if (['h1', 'h2', 'h3', 'p', 'div'].includes(tag)) {
    const size = tag === 'h1' ? 16 : tag === 'h2' ? 14 : tag === 'h3' ? 12 : 11;
    const parts = collectInlineText(el, tag.startsWith('h'), false);
    drawTextLine(ctx, parts, size, align);
    ctx.y -= tag.startsWith('h') ? 6 : 4;
    return;
  }

  if (tag === 'br') {
    ctx.y -= ctx.lineHeight;
    return;
  }

  el.childNodes.forEach((child) => {
    if (child.nodeType === Node.ELEMENT_NODE) walkBlock(ctx, child as Element);
    else if (child.nodeType === Node.TEXT_NODE) {
      const parts = collectInlineText(child, false, false);
      drawTextLine(ctx, parts, 11, align);
    }
  });
}

/** Render HTML from rich editor into pdf-lib pages; returns final Y. */
export function drawHtmlToPdf(ctx: RichTextPdfContext, html: string): number {
  const trimmed = html?.trim();
  if (!trimmed) return ctx.y;

  const doc = new DOMParser().parseFromString(
    trimmed.startsWith('<') ? trimmed : `<p>${trimmed}</p>`,
    'text/html'
  );
  const body = doc.body;

  if (!body.children.length) {
    const parts = collectInlineText(body, false, false);
    drawTextLine(ctx, parts, 11, 'left');
    return ctx.y;
  }

  body.childNodes.forEach((node) => {
    if (node.nodeType === Node.ELEMENT_NODE) {
      walkBlock(ctx, node as Element);
    } else if (node.nodeType === Node.TEXT_NODE) {
      const parts = collectInlineText(node, false, false);
      drawTextLine(ctx, parts, 11, 'left');
    }
  });

  return ctx.y;
}

export function htmlToPlainText(html: string): string {
  const doc = new DOMParser().parseFromString(html || '', 'text/html');
  return (doc.body.textContent ?? '').replace(/\s+/g, ' ').trim();
}
