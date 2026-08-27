import { PDFDocument, StandardFonts, rgb, type PDFFont, type RGB } from 'pdf-lib';
import { looksLikePdf } from '../utils/docxZip';
import { sanitizePdfText } from '../utils/pdfTextSanitizer';
import type { LanguageType } from '../types';

export type PageNumberBand = 'header' | 'footer';
export type PageNumberAlign = 'left' | 'center' | 'right';
export type PageNumberFormatId = 'n' | 'n-total' | 'page-n' | 'page-n-total';

export interface PageNumberOptions {
  band: PageNumberBand;
  align: PageNumberAlign;
  format: PageNumberFormatId;
  startAt: number;
  skipFirst: boolean;
  fontSize: number;
  margin: number;
  color: string;
  pageWord: string;
  ofWord: string;
}

export interface NormalizedRect {
  pageIndex: number;
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface PdfEditOp {
  kind: 'text' | 'rect' | 'image';
  pageIndex: number;
  x: number;
  y: number;
  w: number;
  h: number;
  text?: string;
  color?: string;
  fontSize?: number;
  png?: Uint8Array;
}

export interface FormFillValue {
  name: string;
  value: string;
  checked?: boolean;
}

function clamp01(n: number): number {
  return Math.min(1, Math.max(0, n));
}

function stem(name: string): string {
  return name.replace(/\.[^.]+$/, '') || 'document';
}

function hexRgb(hex: string): RGB {
  const raw = hex.replace('#', '');
  const n = raw.length === 3 ? raw.split('').map((c) => c + c).join('') : raw;
  const v = Number.parseInt(n.padEnd(6, '0').slice(0, 6), 16);
  return rgb(((v >> 16) & 255) / 255, ((v >> 8) & 255) / 255, (v & 255) / 255);
}

async function loadPdf(file: File) {
  const buffer = await file.arrayBuffer();
  if (!looksLikePdf(buffer)) throw new Error('INVALID_PDF');
  return PDFDocument.load(buffer, { ignoreEncryption: true, updateMetadata: false });
}

function pageIndices(doc: PDFDocument): number[] {
  return Array.from({ length: doc.getPageCount() }, (_, i) => i);
}

export function formatPageLabel(
  n: number,
  total: number,
  format: PageNumberFormatId,
  pageWord: string,
  ofWord: string
): string {
  if (format === 'n') return String(n);
  if (format === 'n-total') return `${n} / ${total}`;
  if (format === 'page-n') return `${pageWord} ${n}`;
  return `${pageWord} ${n} ${ofWord} ${total}`;
}

export function visiblePageNumber(pageIndex: number, skipFirst: boolean, startAt: number): number | null {
  if (skipFirst && pageIndex === 0) return null;
  const offset = skipFirst ? pageIndex - 1 : pageIndex;
  return Math.max(1, startAt) + offset;
}

export async function addPageNumbers(file: File, options: PageNumberOptions): Promise<{ blob: Blob; fileName: string }> {
  const doc = await loadPdf(file);
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const pages = doc.getPages();
  const total = pages.length;
  const numbered = options.skipFirst ? Math.max(0, total - 1) : total;
  const last = Math.max(1, options.startAt) + Math.max(0, numbered - 1);

  for (let i = 0; i < pages.length; i++) {
    const n = visiblePageNumber(i, options.skipFirst, options.startAt);
    if (n === null) continue;
    const page = pages[i];
    const { width, height } = page.getSize();
    const label = sanitizePdfText(formatPageLabel(n, last, options.format, options.pageWord, options.ofWord));
    const size = Math.max(8, Math.min(24, options.fontSize));
    const textWidth = font.widthOfTextAtSize(label, size);
    const margin = Math.max(12, options.margin);
    const x =
      options.align === 'left'
        ? margin
        : options.align === 'right'
          ? Math.max(margin, width - margin - textWidth)
          : (width - textWidth) / 2;
    const y = options.band === 'header' ? height - margin - size : margin;
    page.drawText(label || String(n), { x, y, size, font, color: hexRgb(options.color) });
  }

  const bytes = await doc.save({ useObjectStreams: false });
  return { blob: new Blob([bytes], { type: 'application/pdf' }), fileName: `${stem(file.name)}_paginas.pdf` };
}

export async function cropPdfPages(
  file: File,
  rect: Omit<NormalizedRect, 'pageIndex'>,
  applyTo: 'all' | number
): Promise<{ blob: Blob; fileName: string }> {
  const doc = await loadPdf(file);
  const pages = doc.getPages();
  const w = clamp01(rect.w);
  const h = clamp01(rect.h);
  if (w < 0.04 || h < 0.04) throw new Error('CROP_TOO_SMALL');

  const indices = applyTo === 'all' ? pages.map((_, i) => i) : [applyTo];
  for (const i of indices) {
    const page = pages[i];
    if (!page) continue;
    const { width, height } = page.getSize();
    const pdfW = w * width;
    const pdfH = h * height;
    const pdfX = clamp01(rect.x) * width;
    const pdfY = height - (clamp01(rect.y) + h) * height;
    page.setCropBox(pdfX, pdfY, pdfW, pdfH);
  }

  const bytes = await doc.save({ useObjectStreams: false });
  return { blob: new Blob([bytes], { type: 'application/pdf' }), fileName: `${stem(file.name)}_recortado.pdf` };
}

export async function repairPdf(file: File): Promise<{ blob: Blob; fileName: string; pageCount: number }> {
  const src = await loadPdf(file);
  const out = await PDFDocument.create();
  const count = src.getPageCount();
  if (count < 1) throw new Error('EMPTY');
  const copied = await out.copyPages(src, pageIndices(src));
  copied.forEach((page) => out.addPage(page));
  out.setTitle(src.getTitle() || stem(file.name));
  const bytes = await out.save({ useObjectStreams: false });
  return {
    blob: new Blob([bytes], { type: 'application/pdf' }),
    fileName: `${stem(file.name)}_reparado.pdf`,
    pageCount: count,
  };
}

export async function toArchivalPdf(file: File): Promise<{ blob: Blob; fileName: string }> {
  const src = await loadPdf(file);
  const out = await PDFDocument.create();
  const copied = await out.copyPages(src, pageIndices(src));
  copied.forEach((page) => out.addPage(page));
  out.setTitle(src.getTitle() || stem(file.name));
  out.setProducer('PDFWINDOWS archival copy');
  out.setCreator('PDFWINDOWS');
  const bytes = await out.save({ useObjectStreams: false });
  return { blob: new Blob([bytes], { type: 'application/pdf' }), fileName: `${stem(file.name)}_arquivo.pdf` };
}

export async function appendPdf(base: File, extra: File): Promise<File> {
  const a = await loadPdf(base);
  const b = await loadPdf(extra);
  const copied = await a.copyPages(b, pageIndices(b));
  copied.forEach((page) => a.addPage(page));
  const bytes = await a.save({ useObjectStreams: false });
  return new File([bytes], base.name, { type: 'application/pdf' });
}

export function diffLines(left: string, right: string): Array<{ side: 'same' | 'left' | 'right'; text: string }> {
  const a = left.split(/\r?\n/);
  const b = right.split(/\r?\n/);
  const out: Array<{ side: 'same' | 'left' | 'right'; text: string }> = [];
  const bset = new Set(b);
  const aset = new Set(a);
  const max = Math.max(a.length, b.length);
  for (let i = 0; i < max; i++) {
    const la = a[i];
    const lb = b[i];
    if (la === lb) {
      if (la !== undefined) out.push({ side: 'same', text: la });
      continue;
    }
    if (la !== undefined && !bset.has(la)) out.push({ side: 'left', text: la });
    if (lb !== undefined && !aset.has(lb)) out.push({ side: 'right', text: lb });
    if (la !== undefined && bset.has(la) && lb !== undefined && aset.has(lb) && la !== lb) {
      out.push({ side: 'left', text: la });
      out.push({ side: 'right', text: lb });
    }
  }
  return out;
}

export async function applyPdfEdits(
  file: File,
  ops: PdfEditOp[]
): Promise<{ blob: Blob; fileName: string }> {
  if (ops.length < 1) throw new Error('NO_EDITS');
  const doc = await loadPdf(file);
  const font = await doc.embedFont(StandardFonts.Helvetica);
  for (const op of ops) {
    const page = doc.getPage(op.pageIndex);
    const { width, height } = page.getSize();
    const w = clamp01(op.w) * width;
    const h = clamp01(op.h) * height;
    const x = clamp01(op.x) * width;
    const y = height - (clamp01(op.y) + clamp01(op.h)) * height;
    const color = hexRgb(op.color || '#0f172a');
    if (op.kind === 'rect') {
      page.drawRectangle({ x, y, width: w, height: h, borderColor: color, borderWidth: 1.5, color: undefined });
    } else if (op.kind === 'text') {
      page.drawText(sanitizePdfText(op.text || ''), {
        x: x + 4,
        y: y + Math.max(4, h - (op.fontSize || 12) - 2),
        size: Math.max(8, op.fontSize || 12),
        font,
        color,
      });
    } else if (op.kind === 'image' && op.png) {
      const bytes = op.png;
      const image = bytes[0] === 0x89 ? await doc.embedPng(bytes) : await doc.embedJpg(bytes);
      page.drawImage(image, { x, y, width: w, height: h });
    }
  }
  const bytes = await doc.save({ useObjectStreams: false });
  return { blob: new Blob([bytes], { type: 'application/pdf' }), fileName: `${stem(file.name)}_editado.pdf` };
}

export function describeFormField(field: {
  constructor: { name: string };
  getName: () => string;
}): { name: string; type: string } {
  const type = field.constructor.name.replace(/^PDF/, '');
  return { name: field.getName(), type };
}

export async function listPdfFormFields(file: File): Promise<Array<{ name: string; type: string; value: string }>> {
  const doc = await loadPdf(file);
  const form = doc.getForm();
  return form.getFields().map((field) => {
    const info = describeFormField(field);
    let value = '';
    try {
      const maybe = field as { getText?: () => string | undefined; isChecked?: () => boolean; getSelected?: () => string[] };
      if (typeof maybe.getText === 'function') value = maybe.getText() || '';
      else if (typeof maybe.isChecked === 'function') value = maybe.isChecked() ? 'true' : 'false';
      else if (typeof maybe.getSelected === 'function') value = (maybe.getSelected() || []).join(', ');
    } catch {
      value = '';
    }
    return { ...info, value };
  });
}

export async function fillPdfForm(
  file: File,
  values: FormFillValue[],
  flatten: boolean
): Promise<{ blob: Blob; fileName: string }> {
  const doc = await loadPdf(file);
  const form = doc.getForm();
  for (const item of values) {
    const field = form.getFieldMaybe(item.name);
    if (!field) continue;
    try {
      const asText = field as { setText?: (v: string) => void };
      const asCheck = field as { check?: () => void; uncheck?: () => void };
      const asSelect = field as { select?: (v: string) => void };
      if (typeof asText.setText === 'function') asText.setText(sanitizePdfText(item.value));
      else if (typeof asCheck.check === 'function') {
        if (item.checked || item.value === 'true') asCheck.check?.();
        else asCheck.uncheck?.();
      } else if (typeof asSelect.select === 'function' && item.value) asSelect.select(item.value);
    } catch {
      /* skip incompatible value */
    }
  }
  if (flatten) form.flatten();
  const bytes = await doc.save({ useObjectStreams: false });
  return { blob: new Blob([bytes], { type: 'application/pdf' }), fileName: `${stem(file.name)}_formulario.pdf` };
}

export async function addPdfFormFields(
  file: File,
  fields: Array<{ name: string; type: 'text' | 'checkbox'; rect: NormalizedRect }>
): Promise<{ blob: Blob; fileName: string }> {
  const doc = await loadPdf(file);
  const form = doc.getForm();
  const font = await doc.embedFont(StandardFonts.Helvetica);
  void font;
  for (const item of fields) {
    const page = doc.getPage(item.rect.pageIndex);
    const { width, height } = page.getSize();
    const w = clamp01(item.rect.w) * width;
    const h = clamp01(item.rect.h) * height;
    const x = clamp01(item.rect.x) * width;
    const y = height - (clamp01(item.rect.y) + clamp01(item.rect.h)) * height;
    if (item.type === 'checkbox') {
      const box = form.createCheckBox(item.name);
      box.addToPage(page, { x, y, width: Math.min(w, h), height: Math.min(w, h) });
    } else {
      const text = form.createTextField(item.name);
      text.addToPage(page, { x, y, width: w, height: h });
    }
  }
  const bytes = await doc.save({ useObjectStreams: false });
  return { blob: new Blob([bytes], { type: 'application/pdf' }), fileName: `${stem(file.name)}_campos.pdf` };
}

export function pageNumberWords(lang: LanguageType): { pageWord: string; ofWord: string } {
  if (lang === 'pt') return { pageWord: 'Pagina', ofWord: 'de' };
  if (lang === 'es') return { pageWord: 'Pagina', ofWord: 'de' };
  return { pageWord: 'Page', ofWord: 'of' };
}

export type { PDFFont };
