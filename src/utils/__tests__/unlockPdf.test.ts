import { describe, expect, it, vi, beforeEach } from 'vitest';
import { PDFDocument, StandardFonts } from 'pdf-lib';
import { encryptPDF } from '@pdfsmaller/pdf-encrypt';
import { encryptPdfWithPassword } from '../pdfPasswordProtection';

function bufferHasEncrypt(data: unknown): boolean {
  try {
    let bytes: Uint8Array | null = null;
    if (data instanceof Uint8Array) bytes = data;
    else if (data instanceof ArrayBuffer) bytes = new Uint8Array(data);
    else if (ArrayBuffer.isView(data)) bytes = new Uint8Array(data.buffer);
    if (!bytes) return false;
    const head = new TextDecoder('latin1').decode(bytes.subarray(0, Math.min(bytes.byteLength, 200_000)));
    return /\/Encrypt\b/.test(head);
  } catch {
    return false;
  }
}

vi.mock('../pdfjsLoader', () => ({
  loadPdfJS: async () => ({
    getDocument: (opts: { data?: unknown; password?: string }) => ({
      promise: (async () => {
        const locked = bufferHasEncrypt(opts.data);
        const pwd = opts.password?.trim();
        if (locked && !pwd) {
          const err = new Error('No password given');
          (err as Error & { name: string }).name = 'PasswordException';
          throw err;
        }
        if (locked && pwd && pwd !== 'correct-pass') {
          const err = new Error('Incorrect password');
          (err as Error & { name: string }).name = 'PasswordException';
          throw err;
        }
        return {
          numPages: 1,
          destroy: async () => undefined,
          getPage: async () => ({
            getOperatorList: async () => ({ fnArray: [1, 2, 3] }),
            getViewport: () => ({ width: 100, height: 100 }),
            render: () => ({ promise: Promise.resolve() }),
            getTextContent: async () => ({ items: [] }),
          }),
        };
      })(),
    }),
  }),
}));

async function makePlainPdf(text = 'Hello unlock'): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  const page = doc.addPage([400, 300]);
  const font = await doc.embedFont(StandardFonts.Helvetica);
  page.drawText(text, { x: 40, y: 200, size: 14, font });
  return doc.save();
}

describe('unlockPdf', () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it('auto-unlocks permission-only PDFs without asking for a password', async () => {
    const { unlockPdfFile } = await import('../../engines/unlockPdf');
    const plain = await makePlainPdf();
    const restricted = await encryptPDF(plain, '', {
      ownerPassword: 'owner-only-secret',
      algorithm: 'RC4',
      allowPrinting: false,
      allowCopying: false,
      allowModifying: false,
    });
    const file = new File([restricted], 'perm.pdf', { type: 'application/pdf' });

    const res = await unlockPdfFile(file);
    expect(res.status).toBe('unlocked');
    expect(res.method).toBe('decrypt-binary');
    expect(res.fileName).toBe('perm_unlocked.pdf');
    expect(res.blob).toBeTruthy();

    const out = await PDFDocument.load(await res.blob!.arrayBuffer());
    expect(out.getPageCount()).toBe(1);
  });

  it('requires password for AES open-password PDFs and unlocks with the correct one', async () => {
    const { analyzePdfLock, unlockPdfFile } = await import('../../engines/unlockPdf');
    const plain = await makePlainPdf();
    const encryptedBlob = await encryptPdfWithPassword(plain.buffer, 'correct-pass');
    const locked = new File([encryptedBlob], 'locked.pdf', { type: 'application/pdf' });

    const analysis = await analyzePdfLock(locked);
    expect(analysis.needsPassword).toBe(true);

    const need = await unlockPdfFile(locked);
    expect(need.status).toBe('need-password');

    const wrong = await unlockPdfFile(locked, 'wrong-pass');
    expect(wrong.status).toBe('wrong-password');

    const ok = await unlockPdfFile(locked, 'correct-pass');
    expect(ok.status).toBe('unlocked');
    expect(ok.method).toBe('decrypt-binary');
  });
});
