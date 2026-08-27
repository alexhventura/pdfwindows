import { PDFDocument } from 'pdf-lib';
import { looksLikePdf } from '../utils/docxZip';
import type { LanguageType } from '../types';

/** Normalized rect in page space: origin top-left, values 0–1. */
export interface SignaturePlacement {
  pageIndex: number;
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface SignatureMetaInput {
  name: string;
  location: string;
  date: string;
  includeName: boolean;
  includeLocation: boolean;
  includeDate: boolean;
}

export interface SignatureMetaLabels {
  name: string;
  location: string;
  date: string;
}

export interface SignPdfResult {
  blob: Blob;
  fileName: string;
  stampCount: number;
  pageCount: number;
}

function clamp01(n: number): number {
  return Math.min(1, Math.max(0, n));
}

function outputName(original: string): string {
  const base = original.replace(/\.pdf$/i, '') || 'document';
  return `${base}_assinado.pdf`;
}

export function todayIsoDate(now = new Date()): string {
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function formatStampDate(iso: string, lang: LanguageType): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso.trim());
  if (!match) return iso.trim();
  const date = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  const locale = lang === 'pt' ? 'pt-BR' : lang === 'es' ? 'es-ES' : 'en-US';
  return date.toLocaleDateString(locale);
}

export function signatureMetaLines(meta: SignatureMetaInput, labels: SignatureMetaLabels): string[] {
  const lines: string[] = [];
  const name = meta.name.trim();
  const location = meta.location.trim();
  const date = meta.date.trim();
  if (meta.includeName && name) lines.push(`${labels.name}: ${name}`);
  if (meta.includeLocation && location) lines.push(`${labels.location}: ${location}`);
  if (meta.includeDate && date) lines.push(`${labels.date}: ${date}`);
  return lines;
}

export function inkBoundsFromRgba(
  data: ArrayLike<number>,
  width: number,
  height: number,
  alphaMin = 24
): { x: number; y: number; w: number; h: number } | null {
  let minX = width;
  let minY = height;
  let maxX = 0;
  let maxY = 0;
  let found = false;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const alpha = data[(y * width + x) * 4 + 3];
      if (alpha < alphaMin) continue;
      found = true;
      if (x < minX) minX = x;
      if (y < minY) minY = y;
      if (x > maxX) maxX = x;
      if (y > maxY) maxY = y;
    }
  }

  if (!found) return null;
  return { x: minX, y: minY, w: maxX - minX + 1, h: maxY - minY + 1 };
}

export function defaultStampBox(
  cx: number,
  cy: number,
  aspectWidthOverHeight: number
): Pick<SignaturePlacement, 'x' | 'y' | 'w' | 'h'> {
  const aspect = Math.max(0.6, Math.min(4, aspectWidthOverHeight || 2.2));
  const w = 0.34;
  const h = Math.min(0.22, Math.max(0.09, w / aspect));
  const x = Math.min(1 - w, Math.max(0, cx - w / 2));
  const y = Math.min(1 - h, Math.max(0, cy - h / 2));
  return { x, y, w, h };
}

export function placementFromPointer(
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  canvasW: number,
  canvasH: number,
  pageIndex: number,
  aspectWidthOverHeight: number
): SignaturePlacement {
  const width = Math.max(1, canvasW);
  const height = Math.max(1, canvasH);
  const x = Math.min(x0, x1) / width;
  const y = Math.min(y0, y1) / height;
  const w = Math.abs(x1 - x0) / width;
  const h = Math.abs(y1 - y0) / height;
  if (w < 0.02 || h < 0.02) {
    return {
      pageIndex,
      ...defaultStampBox((x0 + x1) / 2 / width, (y0 + y1) / 2 / height, aspectWidthOverHeight),
    };
  }
  return {
    pageIndex,
    x: clamp01(x),
    y: clamp01(y),
    w: clamp01(w),
    h: clamp01(h),
  };
}

function roundRectPath(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  const radius = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + w, y, x + w, y + h, radius);
  ctx.arcTo(x + w, y + h, x, y + h, radius);
  ctx.arcTo(x, y + h, x, y, radius);
  ctx.arcTo(x, y, x + w, y, radius);
  ctx.closePath();
}

export function cropInkCanvas(source: HTMLCanvasElement, padding = 10): HTMLCanvasElement {
  const ctx = source.getContext('2d', { willReadFrequently: true });
  if (!ctx) throw new Error('CANVAS');
  const { width, height } = source;
  const image = ctx.getImageData(0, 0, width, height);
  const bounds = inkBoundsFromRgba(image.data, width, height);
  if (!bounds) throw new Error('NO_INK');

  const x = Math.max(0, bounds.x - padding);
  const y = Math.max(0, bounds.y - padding);
  const w = Math.min(width - x, bounds.w + padding * 2);
  const h = Math.min(height - y, bounds.h + padding * 2);

  const out = document.createElement('canvas');
  out.width = Math.max(1, w);
  out.height = Math.max(1, h);
  const outCtx = out.getContext('2d');
  if (!outCtx) throw new Error('CANVAS');
  outCtx.drawImage(source, x, y, w, h, 0, 0, w, h);
  return out;
}

export function composeSignatureStamp(ink: HTMLCanvasElement, lines: string[]): HTMLCanvasElement {
  const cropped = cropInkCanvas(ink);
  const pad = 22;
  const lineSize = 20;
  const lineGap = 8;
  const metaBlock = lines.length ? 14 + lines.length * (lineSize + lineGap) : 4;
  const width = Math.max(360, cropped.width + pad * 2);
  const height = cropped.height + pad * 2 + metaBlock;
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(width);
  canvas.height = Math.round(height);
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('CANVAS');

  roundRectPath(ctx, 1, 1, canvas.width - 2, canvas.height - 2, 10);
  ctx.fillStyle = '#ffffff';
  ctx.fill();
  ctx.strokeStyle = '#cbd5e1';
  ctx.lineWidth = 2;
  ctx.stroke();

  const inkX = Math.round((canvas.width - cropped.width) / 2);
  ctx.drawImage(cropped, inkX, pad);

  const ruleY = pad + cropped.height + 6;
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(pad, ruleY);
  ctx.lineTo(canvas.width - pad, ruleY);
  ctx.stroke();

  ctx.fillStyle = '#0f172a';
  ctx.font = `600 ${lineSize}px "Segoe UI", "Noto Sans", sans-serif`;
  ctx.textBaseline = 'top';
  lines.forEach((line, index) => {
    ctx.fillText(line, pad, ruleY + 12 + index * (lineSize + lineGap), canvas.width - pad * 2);
  });

  return canvas;
}

export function canvasToPngBytes(canvas: HTMLCanvasElement): Promise<Uint8Array> {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error('blob'));
        return;
      }
      void blob.arrayBuffer().then((buffer) => resolve(new Uint8Array(buffer)), reject);
    }, 'image/png');
  });
}

export async function applySignatureStamps(
  file: File,
  stampPng: Uint8Array,
  placements: SignaturePlacement[]
): Promise<SignPdfResult> {
  if (placements.length < 1) throw new Error('NO_PLACEMENT');

  const buffer = await file.arrayBuffer();
  if (!looksLikePdf(buffer)) throw new Error('INVALID_PDF');

  const doc = await PDFDocument.load(buffer, { ignoreEncryption: true, updateMetadata: false });
  const pageCount = doc.getPageCount();
  if (pageCount < 1) throw new Error('EMPTY');

  const image = await doc.embedPng(stampPng);
  let applied = 0;

  for (const placement of placements) {
    if (!Number.isInteger(placement.pageIndex) || placement.pageIndex < 0 || placement.pageIndex >= pageCount) {
      continue;
    }
    const w = clamp01(placement.w);
    const h = clamp01(placement.h);
    if (w < 0.02 || h < 0.02) continue;

    const page = doc.getPage(placement.pageIndex);
    const { width, height } = page.getSize();
    const pdfW = w * width;
    const pdfH = h * height;
    const pdfX = clamp01(placement.x) * width;
    const pdfY = height - (clamp01(placement.y) + h) * height;

    page.drawImage(image, {
      x: pdfX,
      y: pdfY,
      width: pdfW,
      height: pdfH,
    });
    applied += 1;
  }

  if (applied < 1) throw new Error('NO_PLACEMENT');

  const bytes = await doc.save({ useObjectStreams: false });
  return {
    blob: new Blob([bytes], { type: 'application/pdf' }),
    fileName: outputName(file.name),
    stampCount: applied,
    pageCount,
  };
}
