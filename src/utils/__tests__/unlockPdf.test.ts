import { beforeEach, describe, expect, it, vi } from 'vitest';
import { PDFDocument, StandardFonts } from 'pdf-lib';
import { encryptPdfWithPassword } from '../pdfPasswordProtection';

type PdfJsOpts = { data?: ArrayBuffer; password?: string };

let pdfJsMode: 'open' | 'locked' = 'open';
const VALID_PASSWORD = 'correct-pass';

vi.mock('../pdfjsLoader', () => ({
  loadPdfJS: async () => ({
    getDocument: (opts: PdfJsOpts) => ({
      promise: (async () => {
        if (pdfJsMode === 'locked') {
          const pwd = opts.password?.trim();
          if (!pwd || pwd !== VALID_PASSWORD) {
            const err = new Error(pwd ? 'Incorrect password' : 'Password required');
            (err as Error & { name: string }).name = 'PasswordException';
            throw err;
          }
        }
        return {
          numPages: 1,
          destroy: async () => undefined,
          getPage: async () => {
            throw new Error('GET_PAGE_NOT_USED_IN_UNIT_TEST');
          },
        };
      })(),
    }),
  }),
}));

async function makePlainPdf(text = 'Hello unlock'): Promise<File> {
  const doc = await PDFDocument.create();
  const page = doc.addPage([400, 300]);
  const font = await doc.embedFont(StandardFonts.Helvetica);
  page.drawText(text, { x: 40, y: 200, size: 14, font });
  const bytes = await doc.save();
  return new File([bytes], 'sample.pdf', { type: 'application/pdf' });
}

describe('unlockPdf', () => {
  beforeEach(() => {
    pdfJsMode = 'open';
  });

  it('analyzes plain PDF as openable without password', async () => {
    const { analyzePdfLock } = await import('../../engines/unlockPdf');
    const file = await makePlainPdf();
    const info = await analyzePdfLock(file);
    expect(info.corrupt).toBe(false);
    expect(info.needsPassword).toBe(false);
  });

  it('creates an unlocked structural copy from an unprotected PDF', async () => {
    const { unlockPdfFile } = await import('../../engines/unlockPdf');
    const file = await makePlainPdf();
    const res = await unlockPdfFile(file);
    expect(res.status).toBe('unlocked');
    expect(res.method).toBe('permissions-strip');
    expect(res.fileName).toBe('sample_unlocked.pdf');
    expect(res.blob).toBeTruthy();

    const out = await PDFDocument.load(await res.blob!.arrayBuffer());
    expect(out.getPageCount()).toBe(1);
  });

  it('requires password for AES-protected PDFs and rejects wrong password', async () => {
    const { analyzePdfLock, unlockPdfFile } = await import('../../engines/unlockPdf');
    pdfJsMode = 'locked';

    const plain = await makePlainPdf();
    const encryptedBlob = await encryptPdfWithPassword(await plain.arrayBuffer(), VALID_PASSWORD);
    const locked = new File([encryptedBlob], 'locked.pdf', { type: 'application/pdf' });

    const analysis = await analyzePdfLock(locked);
    expect(analysis.needsPassword).toBe(true);
    expect(analysis.hasEncrypt).toBe(true);

    const need = await unlockPdfFile(locked);
    expect(need.status).toBe('need-password');

    const wrong = await unlockPdfFile(locked, 'wrong-pass');
    expect(wrong.status).toBe('wrong-password');
  });
});
