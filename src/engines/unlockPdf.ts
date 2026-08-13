import { decryptPDF, isEncrypted } from '@pdfsmaller/pdf-decrypt';
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

export type UnlockMethod = 'decrypt-binary' | 'permissions-strip' | 'decrypt-rebuild';

export interface UnlockProgress {
  phase: 'opening' | 'decrypting' | 'rebuilding' | 'finalizing';
  page: number;
  total: number;
}

export interface UnlockEncryptionInfo {
  algorithm?: 'AES-256' | 'RC4';
  revision?: number;
  keyLength?: number;
}

export interface UnlockPdfResult {
  status: UnlockStatus;
  blob?: Blob;
  fileName?: string;
  method?: UnlockMethod;
  pagesProcessed?: number;
  encryption?: UnlockEncryptionInfo;
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

async function readEncryptionInfo(bytes: Uint8Array): Promise<{
  encrypted: boolean;
  info?: UnlockEncryptionInfo;
}> {
  try {
    const meta = await isEncrypted(bytes);
    if (!meta.encrypted) return { encrypted: false };
    return {
      encrypted: true,
      info: {
        algorithm: meta.algorithm,
        revision: meta.revision,
        keyLength: meta.keyLength,
      },
    };
  } catch {
    const raw = new TextDecoder('latin1').decode(bytes.subarray(0, Math.min(bytes.byteLength, 1_000_000)));
    return { encrypted: /\/Encrypt\b/.test(raw) };
  }
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

async function assertHasPageOps(blob: Blob): Promise<boolean> {
  const pdfjs = await loadPdfJS();
  try {
    const buf = await blob.arrayBuffer();
    const pdf = await pdfjs.getDocument({ data: buf.slice(0) }).promise;
    if (pdf.numPages < 1) {
      await pdf.destroy?.();
      return false;
    }
    const page = await pdf.getPage(1);
    const ops = await page.getOperatorList();
    await pdf.destroy?.();
    return ops.fnArray.length > 0;
  } catch {
    return false;
  }
}

/**
 * True binary decrypt (RC4 / AES) via @pdfsmaller/pdf-decrypt.
 * Empty password unlocks owner/permission locks (empty user password) — no prompt needed.
 * Rejects "unlocked" outputs that still have blank pages (failed stream decrypt).
 */
async function tryBinaryDecrypt(
  bytes: Uint8Array,
  password: string
): Promise<{ blob: Blob; pages: number } | null> {
  try {
    const out = await decryptPDF(bytes, password);
    const stillLocked = await isEncrypted(out).catch(() => ({ encrypted: true }));
    if (stillLocked.encrypted) return null;

    const blob = new Blob([out], { type: 'application/pdf' });
    if (!(await assertNoOpenPassword(blob))) return null;
    if (!(await assertHasPageOps(blob))) return null;

    const doc = await PDFDocument.load(out, { updateMetadata: false });
    const pages = doc.getPageCount();
    if (pages < 1) return null;
    return { blob, pages };
  } catch {
    return null;
  }
}

/** Fast path for already-unencrypted PDFs. */
async function cleanCopyUnencrypted(buffer: ArrayBuffer): Promise<Blob> {
  const src = await PDFDocument.load(buffer, { updateMetadata: false });
  if (src.getPageCount() < 1) throw new Error('EMPTY_SRC');
  const bytes = await src.save({ useObjectStreams: false });
  return new Blob([bytes], { type: 'application/pdf' });
}

/**
 * Fallback rewrite when binary decrypt is unavailable but streams are copyable.
 * Rejects blank copies (ignoreEncryption without decrypt leaves encrypted streams).
 */
async function stripPermissionsCopy(buffer: ArrayBuffer): Promise<Blob> {
  const src = await PDFDocument.load(buffer, { ignoreEncryption: true, updateMetadata: false });
  if (src.getPageCount() < 1) throw new Error('EMPTY_SRC');

  const out = await PDFDocument.create();
  const pages = await out.copyPages(src, src.getPageIndices());
  for (const p of pages) out.addPage(p);

  const bytes = await out.save({ useObjectStreams: false });
  const still = await isEncrypted(new Uint8Array(bytes)).catch(() => ({ encrypted: true }));
  if (still.encrypted) throw new Error('STILL_LOCKED');

  const blob = new Blob([bytes], { type: 'application/pdf' });
  if (!(await assertHasPageOps(blob))) throw new Error('BLANK_COPY');
  return blob;
}

function drawInvisibleTextFromPdfJs(page: PDFPage, font: PDFFont, items: PdfTextItem[]): void {
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

async function rebuildUnlockedFromPdfJs(
  pdf: PDFDocumentProxy,
  onProgress?: (p: UnlockProgress) => void
): Promise<{ blob: Blob; pagesProcessed: number }> {
  const totalPages = pdf.numPages;
  const processCount = Math.min(totalPages, UNLOCK_MAX_PAGES);
  const scale = adaptiveUnlockScale(processCount);
  const out = await PDFDocument.create();
  const font = await out.embedFont(StandardFonts.Helvetica);

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d', { alpha: false });
  if (!ctx) throw new Error('CANVAS');

  for (let i = 1; i <= processCount; i++) {
    onProgress?.({ phase: 'rebuilding', page: i, total: processCount });
    if (i === 1 || i % 2 === 0 || i === processCount) await yieldToUi();

    const page = (await pdf.getPage(i)) as PDFPageProxy;
    const base = page.getViewport({ scale: 1 });
    const longest = Math.max(base.width, base.height);
    const scaleUsed = Math.max(0.9, Math.min(scale, UNLOCK_MAX_CANVAS_EDGE / Math.max(1, longest)));
    const viewport = page.getViewport({ scale: scaleUsed });

    canvas.width = Math.max(1, Math.floor(viewport.width));
    canvas.height = Math.max(1, Math.floor(viewport.height));
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    await page.render({ canvasContext: ctx, viewport, canvas }).promise;

    const jpeg = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('JPEG'))), 'image/jpeg', 0.88);
    });
    const imgBytes = new Uint8Array(await jpeg.arrayBuffer());
    const embedded = await out.embedJpg(imgBytes);

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
  }

  canvas.width = 0;
  canvas.height = 0;

  onProgress?.({ phase: 'finalizing', page: processCount, total: processCount });
  const bytes = await out.save({ useObjectStreams: false });
  const blob = new Blob([bytes], { type: 'application/pdf' });
  if (!(await assertNoOpenPassword(blob))) {
    throw new Error('REBUILD_STILL_LOCKED');
  }
  return { blob, pagesProcessed: processCount };
}

async function openWithPdfJs(buffer: ArrayBuffer, password?: string): Promise<PDFDocumentProxy> {
  const pdfjs = await loadPdfJS();
  return pdfjs.getDocument({
    data: buffer.slice(0),
    ...(password ? { password } : {}),
  }).promise;
}

export async function analyzePdfLock(file: File): Promise<{
  needsPassword: boolean;
  hasEncrypt: boolean;
  corrupt: boolean;
  encryption?: UnlockEncryptionInfo;
}> {
  const buffer = await file.arrayBuffer();
  if (!looksLikePdf(buffer)) return { needsPassword: false, hasEncrypt: false, corrupt: true };

  const bytes = new Uint8Array(buffer);
  const { encrypted, info } = await readEncryptionInfo(bytes);
  if (!encrypted) return { needsPassword: false, hasEncrypt: false, corrupt: false };

  const auto = await tryBinaryDecrypt(bytes, '');
  if (auto) return { needsPassword: false, hasEncrypt: true, corrupt: false, encryption: info };

  return { needsPassword: true, hasEncrypt: true, corrupt: false, encryption: info };
}

/**
 * Produce a NEW unlocked PDF copy (original file is never modified).
 *
 * Order (local-only):
 * 1. Binary decrypt with empty password (permission / empty-user locks) — no prompt
 * 2. Binary decrypt with typed password
 * 3. pdf.js open (with or without password) → rebuild when binary path is unavailable
 * 4. Clean copy for unencrypted files
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
  const bytes = new Uint8Array(buffer);
  onProgress?.({ phase: 'opening', page: 0, total: 0 });

  const { encrypted, info: encryption } = await readEncryptionInfo(bytes);
  const trimmed = password?.trim();

  // 1) Auto: empty password (permission locks)
  onProgress?.({ phase: 'decrypting', page: 0, total: 0 });
  const autoUnlock = await tryBinaryDecrypt(bytes, '');
  if (autoUnlock) {
    return {
      status: 'unlocked',
      blob: autoUnlock.blob,
      fileName,
      method: 'decrypt-binary',
      pagesProcessed: autoUnlock.pages,
      encryption,
    };
  }

  // 2) Typed password → binary decrypt first; if streams stay blank, rebuild via pdf.js
  if (trimmed) {
    onProgress?.({ phase: 'decrypting', page: 0, total: 0 });
    const withPwd = await tryBinaryDecrypt(bytes, trimmed);
    if (withPwd) {
      return {
        status: 'unlocked',
        blob: withPwd.blob,
        fileName,
        method: 'decrypt-binary',
        pagesProcessed: withPwd.pages,
        encryption,
      };
    }

    // Fallback: pdf.js decrypts correctly even when binary strip leaves empty pages (AES quirks)
    try {
      const pdf = await openWithPdfJs(buffer, trimmed);
      try {
        const { blob, pagesProcessed } = await rebuildUnlockedFromPdfJs(pdf, onProgress);
        await pdf.destroy?.();
        if (!(await assertHasPageOps(blob))) {
          return { status: 'unsupported', messageKey: 'unsupported', encryption };
        }
        return {
          status: 'unlocked',
          blob,
          fileName,
          method: 'decrypt-rebuild',
          pagesProcessed,
          encryption,
        };
      } catch {
        await pdf.destroy?.();
        return { status: 'unsupported', messageKey: 'unsupported', encryption };
      }
    } catch (e) {
      if (isPasswordException(e)) {
        return { status: 'wrong-password', messageKey: 'wrong-password', encryption };
      }
      return { status: 'wrong-password', messageKey: 'wrong-password', encryption };
    }
  }

  // 3) Encrypted, no password: open in viewer if possible → rebuild; else ask
  if (encrypted) {
    try {
      const pdf = await openWithPdfJs(buffer);
      try {
        const { blob, pagesProcessed } = await rebuildUnlockedFromPdfJs(pdf, onProgress);
        await pdf.destroy?.();
        return {
          status: 'unlocked',
          blob,
          fileName,
          method: 'decrypt-rebuild',
          pagesProcessed,
          encryption,
        };
      } catch {
        try {
          const blob = await stripPermissionsCopy(buffer);
          await pdf.destroy?.();
          return {
            status: 'unlocked',
            blob,
            fileName,
            method: 'permissions-strip',
            pagesProcessed: pdf.numPages,
            encryption,
          };
        } catch {
          await pdf.destroy?.();
          return { status: 'unsupported', messageKey: 'unsupported', encryption };
        }
      }
    } catch (e) {
      if (isPasswordException(e)) {
        return { status: 'need-password', messageKey: 'need-password', encryption };
      }
      return { status: 'unsupported', messageKey: 'unsupported', encryption };
    }
  }

  // 4) Not encrypted — clean copy
  try {
    const blob = await cleanCopyUnencrypted(buffer);
    return {
      status: 'unlocked',
      blob,
      fileName,
      method: 'permissions-strip',
    };
  } catch {
    try {
      const blob = await stripPermissionsCopy(buffer);
      return {
        status: 'unlocked',
        blob,
        fileName,
        method: 'permissions-strip',
      };
    } catch {
      return { status: 'corrupt', messageKey: 'corrupt' };
    }
  }
}
