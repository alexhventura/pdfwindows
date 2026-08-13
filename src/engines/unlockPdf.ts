import { PDFDocument, StandardFonts, rgb, type PDFFont, type PDFPage } from 'pdf-lib';
import type { PDFDocumentProxy, PDFPageProxy } from 'pdfjs-dist';
import { loadPdfJS } from '../utils/pdfjsLoader';
import { looksLikePdf } from '../utils/docxZip';
import { sanitizePdfText } from '../utils/pdfTextSanitizer';
import { yieldToUi } from '../utils/ocrPageRender';

type PdfTextItem = { str?: string; transform?: number[] };

export type UnlockStatus =
  | 'unlocked'
  | 'need-password'
  | 'wrong-password'
  | 'unsupported'
  | 'corrupt';

export type UnlockMethod = 'permissions-strip' | 'decrypt-rebuild';

export interface UnlockProgress {
  phase: 'opening' | 'rebuilding' | 'finalizing';
  page: number;
  total: number;
}

export interface UnlockPdfResult {
  status: UnlockStatus;
  blob?: Blob;
  fileName?: string;
  method?: UnlockMethod;
  pagesProcessed?: number;
  messageKey?: string;
}

/** Soft ceiling — keeps browser memory stable while covering typical documents. */
export const UNLOCK_MAX_PAGES = 120;
const UNLOCK_MAX_CANVAS_EDGE = 1800;

function isPasswordException(err: unknown): boolean {
  const name = err && typeof err === 'object' && 'name' in err ? String((err as { name: string }).name) : '';
  const msg = err instanceof Error ? err.message : String(err);
  return (
    name === 'PasswordException' ||
    /password/i.test(msg) ||
    /NeedPassword|IncorrectPassword/i.test(msg)
  );
}

function unlockedName(original: string): string {
  const base = original.replace(/\.pdf$/i, '') || 'document';
  return `${base}_unlocked.pdf`;
}

function adaptiveUnlockScale(pageCount: number): number {
  if (pageCount > 60) return 1.15;
  if (pageCount > 30) return 1.35;
  if (pageCount > 15) return 1.5;
  return 1.75;
}

async function assertNoOpenPassword(blob: Blob): Promise<boolean> {
  const pdfjs = await loadPdfJS();
  try {
    const buf = await blob.arrayBuffer();
    const pdf = await pdfjs.getDocument({ data: buf.slice(0) }).promise;
    const pages = pdf.numPages;
    await pdf.destroy?.();
    return pages > 0;
  } catch (e) {
    if (isPasswordException(e)) return false;
    return false;
  }
}

/**
 * Binary rewrite for PDFs that open without a user password
 * (permission / owner locks). Produces a new unencrypted copy.
 */
async function stripPermissionsCopy(buffer: ArrayBuffer): Promise<Blob> {
  const src = await PDFDocument.load(buffer, { ignoreEncryption: true, updateMetadata: false });
  if (src.getPageCount() < 1) throw new Error('EMPTY_SRC');

  const out = await PDFDocument.create();
  const pages = await out.copyPages(src, src.getPageIndices());
  for (const p of pages) out.addPage(p);

  // Drop leftover encryption metadata by saving a fresh document
  const bytes = await out.save({ useObjectStreams: false });
  const blob = new Blob([bytes], { type: 'application/pdf' });
  if (!(await assertNoOpenPassword(blob))) {
    throw new Error('STILL_LOCKED');
  }
  return blob;
}

function drawInvisibleTextFromPdfJs(page: PDFPage, font: PDFFont, items: PdfTextItem[]): void {
  // pdf.js TextItem.transform is already in PDF user space (origin bottom-left).
  for (const item of items) {
    if (!item.str?.trim()) continue;
    const text = sanitizePdfText(String(item.str));
    if (!text) continue;

    const tr = Array.isArray(item.transform) ? item.transform : null;
    if (!tr || tr.length < 6) continue;

    const size = Math.max(4, Math.min(72, Math.abs(tr[0]) || Math.abs(tr[3]) || 12));
    try {
      page.drawText(text, {
        x: tr[4],
        y: tr[5],
        size,
        font,
        color: rgb(0, 0, 0),
        opacity: 0.01,
      });
    } catch {
      /* skip glyphs StandardFonts cannot encode */
    }
  }
}

/**
 * After pdf.js decrypts the document in memory, rebuild a new unprotected PDF:
 * page appearance (JPEG) + near-invisible text layer for search/copy when text exists.
 */
async function rebuildUnlockedFromPdfJs(
  pdf: PDFDocumentProxy,
  onProgress?: (p: UnlockProgress) => void
): Promise<{ blob: Blob; pagesProcessed: number }> {
  const totalPages = pdf.numPages;
  const processCount = Math.min(totalPages, UNLOCK_MAX_PAGES);
  const scale = adaptiveUnlockScale(processCount);
  const out = await PDFDocument.create();
  const font = await out.embedFont(StandardFonts.Helvetica);

  for (let i = 1; i <= processCount; i++) {
    onProgress?.({ phase: 'rebuilding', page: i, total: processCount });
    await yieldToUi();

    const page = (await pdf.getPage(i)) as PDFPageProxy;
    const base = page.getViewport({ scale: 1 });
    const longest = Math.max(base.width, base.height);
    const scaleUsed = Math.max(0.9, Math.min(scale, UNLOCK_MAX_CANVAS_EDGE / Math.max(1, longest)));
    const viewport = page.getViewport({ scale: scaleUsed });

    const canvas = document.createElement('canvas');
    canvas.width = Math.max(1, Math.floor(viewport.width));
    canvas.height = Math.max(1, Math.floor(viewport.height));
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) throw new Error('CANVAS');

    await page.render({ canvasContext: ctx, viewport, canvas }).promise;

    const jpeg = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('JPEG'))), 'image/jpeg', 0.9);
    });
    const imgBytes = new Uint8Array(await jpeg.arrayBuffer());
    const embedded = await out.embedJpg(imgBytes);

    // Keep PDF page size in points (1pt ≈ CSS px at scale 1)
    const pageWidth = base.width;
    const pageHeight = base.height;
    const pdfPage = out.addPage([pageWidth, pageHeight]);
    pdfPage.drawImage(embedded, {
      x: 0,
      y: 0,
      width: pageWidth,
      height: pageHeight,
    });

    try {
      const textContent = await page.getTextContent();
      drawInvisibleTextFromPdfJs(pdfPage, font, textContent.items as PdfTextItem[]);
    } catch {
      /* text layer optional */
    }

    canvas.width = 0;
    canvas.height = 0;
  }

  onProgress?.({ phase: 'finalizing', page: processCount, total: processCount });
  const bytes = await out.save({ useObjectStreams: false });
  const blob = new Blob([bytes], { type: 'application/pdf' });
  if (!(await assertNoOpenPassword(blob))) {
    throw new Error('REBUILD_STILL_LOCKED');
  }
  return { blob, pagesProcessed: processCount };
}

export async function analyzePdfLock(file: File): Promise<{
  needsPassword: boolean;
  hasEncrypt: boolean;
  corrupt: boolean;
}> {
  const buffer = await file.arrayBuffer();
  if (!looksLikePdf(buffer)) return { needsPassword: false, hasEncrypt: false, corrupt: true };

  const raw = new TextDecoder('latin1').decode(
    new Uint8Array(buffer).slice(0, Math.min(buffer.byteLength, 1_000_000))
  );
  const hasEncrypt = /\/Encrypt\b/.test(raw);

  const pdfjs = await loadPdfJS();
  try {
    const pdf = await pdfjs.getDocument({ data: buffer.slice(0) }).promise;
    await pdf.destroy?.();
    return { needsPassword: false, hasEncrypt, corrupt: false };
  } catch (e) {
    if (isPasswordException(e)) return { needsPassword: true, hasEncrypt: true, corrupt: false };
    return { needsPassword: false, hasEncrypt, corrupt: true };
  }
}

/**
 * Produce a NEW unlocked PDF copy (original file is never modified).
 *
 * - No open password: strip permission encryption via structural copy when possible.
 * - Open password: requires the legitimate password; decrypts in-browser with pdf.js,
 *   then writes a fresh PDF without encryption (appearance + searchable text when available).
 */
export async function unlockPdfFile(
  file: File,
  password?: string,
  onProgress?: (p: UnlockProgress) => void
): Promise<UnlockPdfResult> {
  const buffer = await file.arrayBuffer();
  if (!looksLikePdf(buffer)) {
    return { status: 'corrupt', messageKey: 'corrupt' };
  }

  const fileName = unlockedName(file.name);
  const pdfjs = await loadPdfJS();
  onProgress?.({ phase: 'opening', page: 0, total: 0 });

  // Path A — opens without password (permission locks or unprotected)
  try {
    const pdf = await pdfjs.getDocument({ data: buffer.slice(0) }).promise;
    const pageCount = pdf.numPages;
    try {
      const blob = await stripPermissionsCopy(buffer);
      await pdf.destroy?.();
      return {
        status: 'unlocked',
        blob,
        fileName,
        method: 'permissions-strip',
        pagesProcessed: pageCount,
      };
    } catch {
      const { blob, pagesProcessed } = await rebuildUnlockedFromPdfJs(pdf, onProgress);
      await pdf.destroy?.();
      return {
        status: 'unlocked',
        blob,
        fileName,
        method: 'decrypt-rebuild',
        pagesProcessed,
      };
    }
  } catch (e) {
    if (!isPasswordException(e)) {
      return { status: 'corrupt', messageKey: 'corrupt' };
    }
    if (!password?.trim()) {
      return { status: 'need-password', messageKey: 'need-password' };
    }
  }

  // Path B — open password required (never try pdf-lib on still-encrypted bytes)
  try {
    onProgress?.({ phase: 'opening', page: 0, total: 0 });
    const pdf = await pdfjs.getDocument({
      data: buffer.slice(0),
      password: password!.trim(),
    }).promise;

    const { blob, pagesProcessed } = await rebuildUnlockedFromPdfJs(pdf, onProgress);
    await pdf.destroy?.();

    return {
      status: 'unlocked',
      blob,
      fileName,
      method: 'decrypt-rebuild',
      pagesProcessed,
    };
  } catch (e) {
    if (isPasswordException(e)) {
      return { status: 'wrong-password', messageKey: 'wrong-password' };
    }
    return { status: 'unsupported', messageKey: 'unsupported' };
  }
}
