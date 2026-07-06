import { encryptPDF } from '@pdfsmaller/pdf-encrypt';

/**
 * Standard PDF password protection (AES-256 / PDF 2.0) via @pdfsmaller/pdf-encrypt.
 * Produces a normal .pdf file that prompts for a password in Chrome, Adobe, Edge, etc.
 * Password is used only in-memory during local encryption — never sent to a server.
 */
export const PROTECTED_PDF_EXTENSION = 'pdf';
export const PROTECTED_PDF_MIME = 'application/pdf';

export interface PdfEncryptionOptions {
  /** RC4 improves compatibility with very old readers; AES-256 is the default. */
  algorithm?: 'AES-256' | 'RC4';
}

export async function encryptPdfWithPassword(
  pdfBytes: ArrayBuffer,
  password: string,
  options: PdfEncryptionOptions = {}
): Promise<Blob> {
  const trimmed = password.trim();
  if (!trimmed) throw new Error('PASSWORD_REQUIRED');

  const encrypted = await encryptPDF(new Uint8Array(pdfBytes), trimmed, {
    ownerPassword: trimmed,
    algorithm: options.algorithm ?? 'AES-256',
    allowPrinting: true,
    allowCopying: true,
    allowModifying: false,
    allowAnnotating: true,
    allowFillingForms: true,
    allowExtraction: true,
    allowAssembly: false,
    allowHighQualityPrint: true,
  });

  return new Blob([encrypted], { type: PROTECTED_PDF_MIME });
}

export function validateProtectionPassword(password: string, confirm: string): string | null {
  const trimmed = password.trim();
  if (!trimmed) return 'EMPTY';
  if (trimmed.length < 4) return 'TOO_SHORT';
  if (trimmed !== confirm.trim()) return 'MISMATCH';
  return null;
}
