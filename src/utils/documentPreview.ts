import {
  readDocumentPreviewSource,
  type IdentifiedDocument,
} from '../engines/documentConverter';
import { renderPdfThumbnailUrl } from './pdfThumbnail';

const PAGE_W = 420;
const PAGE_H = 560;
const MARGIN = 36;

function wrapLine(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  if (!text) return [''];
  if (ctx.measureText(text).width <= maxWidth) return [text];
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let current = '';
  const pushChunk = (chunk: string) => {
    if (!chunk) return;
    if (ctx.measureText(chunk).width <= maxWidth) {
      lines.push(chunk);
      return;
    }
    let piece = '';
    for (const ch of chunk) {
      const trial = piece + ch;
      if (piece && ctx.measureText(trial).width > maxWidth) {
        lines.push(piece);
        piece = ch;
      } else {
        piece = trial;
      }
    }
    if (piece) lines.push(piece);
  };
  for (const word of words) {
    const trial = current ? `${current} ${word}` : word;
    if (ctx.measureText(trial).width <= maxWidth) {
      current = trial;
      continue;
    }
    if (current) lines.push(current);
    current = '';
    if (ctx.measureText(word).width <= maxWidth) {
      current = word;
    } else {
      pushChunk(word);
    }
  }
  if (current) lines.push(current);
  return lines.length > 0 ? lines : [''];
}

function canvasToPreviewUrl(canvas: HTMLCanvasElement): Promise<string> {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error('PREVIEW_FAIL'));
        return;
      }
      resolve(URL.createObjectURL(blob));
    }, 'image/jpeg', 0.86);
  });
}

function createPaper(): { canvas: HTMLCanvasElement; ctx: CanvasRenderingContext2D } {
  const dpr = Math.min(2, typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1);
  const canvas = document.createElement('canvas');
  canvas.width = Math.floor(PAGE_W * dpr);
  canvas.height = Math.floor(PAGE_H * dpr);
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('NO_CANVAS');
  ctx.scale(dpr, dpr);
  ctx.fillStyle = '#e8eef5';
  ctx.fillRect(0, 0, PAGE_W, PAGE_H);
  ctx.fillStyle = '#ffffff';
  ctx.strokeStyle = '#d6dee8';
  ctx.lineWidth = 1;
  ctx.fillRect(14, 14, PAGE_W - 28, PAGE_H - 28);
  ctx.strokeRect(14.5, 14.5, PAGE_W - 29, PAGE_H - 29);
  return { canvas, ctx };
}

async function renderIconPreview(extension: string): Promise<string> {
  const { canvas, ctx } = createPaper();
  ctx.fillStyle = '#64748b';
  ctx.font = '600 13px system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('DOCUMENTO', PAGE_W / 2, PAGE_H / 2 - 18);
  ctx.fillStyle = '#0f172a';
  ctx.font = '700 28px system-ui, sans-serif';
  ctx.fillText(`.${extension.toUpperCase() || 'FILE'}`, PAGE_W / 2, PAGE_H / 2 + 16);
  return canvasToPreviewUrl(canvas);
}

async function renderTextPreview(fileName: string, text: string): Promise<string> {
  const { canvas, ctx } = createPaper();
  const maxWidth = PAGE_W - MARGIN * 2;
  ctx.fillStyle = '#64748b';
  ctx.font = '600 12px system-ui, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText(fileName.slice(0, 36), MARGIN, 42);
  ctx.fillStyle = '#0f172a';
  ctx.font = '16px ui-serif, Georgia, serif';
  let y = 70;
  const lineHeight = 22;
  for (const source of text.split(/\r?\n/).slice(0, 28)) {
    const wrapped = wrapLine(ctx, source, maxWidth);
    for (const line of wrapped) {
      if (y > PAGE_H - 28) break;
      ctx.fillText(line, MARGIN, y);
      y += lineHeight;
    }
    if (y > PAGE_H - 28) break;
  }
  return canvasToPreviewUrl(canvas);
}

async function renderTablePreview(fileName: string, rows: string[][]): Promise<string> {
  const { canvas, ctx } = createPaper();
  ctx.fillStyle = '#94a3b8';
  ctx.font = '600 11px system-ui, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText(fileName.slice(0, 42), MARGIN, 40);

  const cols = Math.max(1, ...rows.map((row) => row.length));
  const tableX = MARGIN;
  const tableY = 54;
  const tableW = PAGE_W - MARGIN * 2;
  const colW = tableW / cols;
  const rowH = 22;
  ctx.font = '11px system-ui, sans-serif';
  rows.slice(0, 16).forEach((row, r) => {
    const y = tableY + r * rowH;
    ctx.fillStyle = r === 0 ? '#f1f5f9' : '#ffffff';
    ctx.fillRect(tableX, y, tableW, rowH);
    ctx.strokeStyle = '#e2e8f0';
    ctx.strokeRect(tableX, y, tableW, rowH);
    ctx.fillStyle = r === 0 ? '#0f172a' : '#334155';
    for (let c = 0; c < cols; c++) {
      const cell = (row[c] || '').slice(0, 18);
      ctx.fillText(cell, tableX + 6 + c * colW, y + 15, colW - 10);
    }
  });
  return canvasToPreviewUrl(canvas);
}

export async function renderDocumentPreviewUrl(
  file: File,
  identified: IdentifiedDocument
): Promise<string> {
  const source = await readDocumentPreviewSource(file, identified);
  try {
    if (source.kind === 'pdf') return await renderPdfThumbnailUrl(file, 420);
    if (source.kind === 'text') return await renderTextPreview(file.name, source.text);
    if (source.kind === 'table') return await renderTablePreview(file.name, source.rows);
  } catch {
    /* fall through to icon */
  }
  return renderIconPreview(identified.extension);
}
