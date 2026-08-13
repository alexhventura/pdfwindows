import { PDFDocument } from 'pdf-lib';
import { loadPdfJS } from '../utils/pdfjsLoader';
import { looksLikePdf } from '../utils/docxZip';

export type UnlockStatus =
  | 'unlocked'
  | 'already-open'
  | 'need-password'
  | 'wrong-password'
  | 'unsupported'
  | 'corrupt';

export interface UnlockPdfResult {
  status: UnlockStatus;
  blob?: Blob;
  fileName?: string;
  method?: 'permissions-strip' | 'raster-rebuild';
  messageKey?: string;
}

function isPasswordException(err: unknown): boolean {
  const name = err && typeof err === 'object' && 'name' in err ? String((err as { name: string }).name) : '';
  const msg = err instanceof Error ? err.message : String(err);
  return (
    name === 'PasswordException' ||
    /password/i.test(msg) ||
    /NeedPassword|IncorrectPassword/i.test(msg)
  );
}

async function stripPermissionsCopy(buffer: ArrayBuffer): Promise<Blob> {
  const src = await PDFDocument.load(buffer, { ignoreEncryption: true });
  const out = await PDFDocument.create();
  const pages = await out.copyPages(src, src.getPageIndices());
  pages.forEach((p) => out.addPage(p));
  const bytes = await out.save();
  return new Blob([bytes], { type: 'application/pdf' });
}

async function rebuildFromPdfJs(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pdf: any,
  maxPages = 60
): Promise<Blob> {
  const out = await PDFDocument.create();
  const total = Math.min(pdf.numPages, maxPages);

  for (let i = 1; i <= total; i++) {
    const page = await pdf.getPage(i);
    const viewport = page.getViewport({ scale: 1.5 });
    const canvas = document.createElement('canvas');
    canvas.width = Math.floor(viewport.width);
    canvas.height = Math.floor(viewport.height);
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('CANVAS');
    await page.render({ canvasContext: ctx, viewport, canvas }).promise;
    const jpeg = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('JPEG'))), 'image/jpeg', 0.88);
    });
    const imgBytes = new Uint8Array(await jpeg.arrayBuffer());
    const embedded = await out.embedJpg(imgBytes);
    const pdfPage = out.addPage([embedded.width, embedded.height]);
    pdfPage.drawImage(embedded, { x: 0, y: 0, width: embedded.width, height: embedded.height });
    canvas.width = 0;
    canvas.height = 0;
  }

  const bytes = await out.save();
  return new Blob([bytes], { type: 'application/pdf' });
}

export async function analyzePdfLock(file: File): Promise<{
  needsPassword: boolean;
  hasEncrypt: boolean;
  corrupt: boolean;
}> {
  const buffer = await file.arrayBuffer();
  if (!looksLikePdf(buffer)) return { needsPassword: false, hasEncrypt: false, corrupt: true };

  const raw = new TextDecoder('latin1').decode(new Uint8Array(buffer).slice(0, Math.min(buffer.byteLength, 1_000_000)));
  const hasEncrypt = /\/Encrypt\b/.test(raw);

  const pdfjs = await loadPdfJS();
  try {
    await pdfjs.getDocument({ data: buffer.slice(0) }).promise;
    return { needsPassword: false, hasEncrypt, corrupt: false };
  } catch (e) {
    if (isPasswordException(e)) return { needsPassword: true, hasEncrypt: true, corrupt: false };
    return { needsPassword: false, hasEncrypt, corrupt: true };
  }
}

/**
 * Produce a new unlocked PDF copy.
 * - Owner/permission locks: binary page copy via pdf-lib (preserves vectors/text).
 * - User-password encryption: requires password; rebuilds pages visually when binary rewrite is not possible.
 */
export async function unlockPdfFile(file: File, password?: string): Promise<UnlockPdfResult> {
  const buffer = await file.arrayBuffer();
  if (!looksLikePdf(buffer)) {
    return { status: 'corrupt', messageKey: 'corrupt' };
  }

  const base = file.name.replace(/\.pdf$/i, '') || 'document';
  const pdfjs = await loadPdfJS();

  try {
    const pdf = await pdfjs.getDocument({ data: buffer.slice(0) }).promise;
    // Opened without password — strip permission encryption if present
    try {
      const blob = await stripPermissionsCopy(buffer);
      await pdf.destroy?.();
      return {
        status: 'unlocked',
        blob,
        fileName: `${base}_unlocked.pdf`,
        method: 'permissions-strip',
      };
    } catch {
      const blob = await rebuildFromPdfJs(pdf);
      await pdf.destroy?.();
      return {
        status: 'unlocked',
        blob,
        fileName: `${base}_unlocked.pdf`,
        method: 'raster-rebuild',
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

  try {
    const pdf = await pdfjs.getDocument({
      data: buffer.slice(0),
      password: password!.trim(),
    }).promise;

    // Prefer binary strip after successful auth when pdf-lib can read structure
    try {
      const blob = await stripPermissionsCopy(buffer);
      // If still encrypted content, strip may produce empty/broken — validate page count
      const check = await PDFDocument.load(await blob.arrayBuffer());
      if (check.getPageCount() > 0 && pdf.numPages > 0) {
        await pdf.destroy?.();
        return {
          status: 'unlocked',
          blob,
          fileName: `${base}_unlocked.pdf`,
          method: 'permissions-strip',
        };
      }
    } catch {
      // fall through to raster
    }

    const blob = await rebuildFromPdfJs(pdf);
    await pdf.destroy?.();
    return {
      status: 'unlocked',
      blob,
      fileName: `${base}_unlocked.pdf`,
      method: 'raster-rebuild',
    };
  } catch (e) {
    if (isPasswordException(e)) {
      return { status: 'wrong-password', messageKey: 'wrong-password' };
    }
    return { status: 'unsupported', messageKey: 'unsupported' };
  }
}
