import { describe, expect, it } from 'vitest';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { organizePdfPages, getPdfPageCount } from '../../engines/organizePdf';
import { applyPdfRedactions } from '../../engines/redactPdf';

async function makeMultiPagePdf(pageCount = 3): Promise<File> {
  const doc = await PDFDocument.create();
  const font = await doc.embedFont(StandardFonts.Helvetica);
  for (let i = 0; i < pageCount; i++) {
    const page = doc.addPage([400, 300]);
    page.drawText(`Page ${i + 1}`, { x: 40, y: 200, size: 18, font });
  }
  const bytes = await doc.save();
  return new File([bytes], 'multi.pdf', { type: 'application/pdf' });
}

describe('organizePdf', () => {
  it('reports page count', async () => {
    const file = await makeMultiPagePdf(4);
    expect(await getPdfPageCount(file)).toBe(4);
  });

  it('reorders and drops pages', async () => {
    const file = await makeMultiPagePdf(3);
    const res = await organizePdfPages(file, [2, 0]);
    expect(res.pageCount).toBe(2);
    expect(res.fileName).toBe('multi_pages.pdf');

    const out = await PDFDocument.load(await res.blob.arrayBuffer());
    expect(out.getPageCount()).toBe(2);
  });
});

describe('redactPdf', () => {
  it('applies black rectangles and returns a new PDF', async () => {
    const file = await makeMultiPagePdf(2);
    const res = await applyPdfRedactions(file, [
      { pageIndex: 0, x: 0.1, y: 0.1, w: 0.4, h: 0.2 },
      { pageIndex: 1, x: 0.2, y: 0.3, w: 0.3, h: 0.1 },
    ]);
    expect(res.redactionCount).toBe(2);
    expect(res.fileName).toBe('multi_redacted.pdf');

    const out = await PDFDocument.load(await res.blob.arrayBuffer());
    expect(out.getPageCount()).toBe(2);
  });

  it('rejects empty redaction lists', async () => {
    const file = await makeMultiPagePdf(1);
    await expect(applyPdfRedactions(file, [])).rejects.toThrow(/NO_REDACTIONS/);
  });
});

describe('redact geometry', () => {
  it('draws opaque cover without throwing on edge clamps', async () => {
    const doc = await PDFDocument.create();
    const page = doc.addPage([200, 200]);
    page.drawRectangle({ x: 0, y: 0, width: 200, height: 200, color: rgb(1, 1, 1) });
    const bytes = await doc.save();
    const file = new File([bytes], 'box.pdf', { type: 'application/pdf' });
    const res = await applyPdfRedactions(file, [{ pageIndex: 0, x: -0.1, y: 0.9, w: 1.5, h: 0.2 }]);
    expect(res.redactionCount).toBe(1);
  });
});
