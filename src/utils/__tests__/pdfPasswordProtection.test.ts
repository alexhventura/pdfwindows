import { describe, expect, it } from 'vitest';
import { PDFDocument } from 'pdf-lib';
import { encryptPdfWithPassword, validateProtectionPassword } from '../pdfPasswordProtection';

describe('pdfPasswordProtection', () => {
  it('validates password rules', () => {
    expect(validateProtectionPassword('', 'x')).toBe('EMPTY');
    expect(validateProtectionPassword('abc', 'abc')).toBe('TOO_SHORT');
    expect(validateProtectionPassword('secret', 'other')).toBe('MISMATCH');
    expect(validateProtectionPassword('secret', 'secret')).toBeNull();
  });

  it('produces a standard encrypted PDF that requires a password to load', async () => {
    const pdfDoc = await PDFDocument.create();
    pdfDoc.addPage();
    const plain = await pdfDoc.save();

    const blob = await encryptPdfWithPassword(plain.buffer, 'my-pass-1234');
    const encrypted = new Uint8Array(await blob.arrayBuffer());

    expect(new TextDecoder().decode(encrypted.slice(0, 5))).toBe('%PDF-');
    await expect(PDFDocument.load(encrypted)).rejects.toThrow(/encrypt/i);
  });
});
