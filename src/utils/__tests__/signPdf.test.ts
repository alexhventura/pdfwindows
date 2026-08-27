import { describe, expect, it } from 'vitest';
import { PDFDocument } from 'pdf-lib';
import {
  applySignatureStamps,
  defaultStampBox,
  formatStampDate,
  inkBoundsFromRgba,
  placementFromPointer,
  signatureMetaLines,
  todayIsoDate,
} from '../../engines/signPdf';

const PNG_1X1 = Uint8Array.from(
  atob('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=='),
  (char) => char.charCodeAt(0)
);

async function blankPdf(pages = 2): Promise<File> {
  const doc = await PDFDocument.create();
  for (let i = 0; i < pages; i++) doc.addPage([400, 300]);
  const bytes = await doc.save();
  return new File([bytes.slice().buffer], 'blank.pdf', { type: 'application/pdf' });
}

describe('signPdf', () => {
  it('builds meta lines only for filled, enabled fields', () => {
    const labels = { name: 'Nome', location: 'Local', date: 'Data' };
    expect(
      signatureMetaLines(
        {
          name: '  Ana  ',
          location: '',
          date: '27/08/2026',
          includeName: true,
          includeLocation: true,
          includeDate: true,
        },
        labels
      )
    ).toEqual(['Nome: Ana', 'Data: 27/08/2026']);

    expect(
      signatureMetaLines(
        {
          name: 'Ana',
          location: 'Recife',
          date: '27/08/2026',
          includeName: false,
          includeLocation: true,
          includeDate: false,
        },
        labels
      )
    ).toEqual(['Local: Recife']);
  });

  it('formats ISO dates per locale', () => {
    expect(formatStampDate('2026-08-27', 'pt')).toMatch(/27/);
    expect(formatStampDate('2026-08-27', 'en')).toMatch(/2026/);
    expect(formatStampDate('not-a-date', 'pt')).toBe('not-a-date');
  });

  it('prints today as ISO calendar date', () => {
    expect(todayIsoDate(new Date(2026, 7, 27))).toBe('2026-08-27');
  });

  it('detects ink bounds from RGBA pixels', () => {
    const width = 10;
    const height = 8;
    const data = new Uint8ClampedArray(width * height * 4);
    const paint = (x: number, y: number) => {
      const i = (y * width + x) * 4;
      data[i] = 15;
      data[i + 1] = 23;
      data[i + 2] = 42;
      data[i + 3] = 255;
    };
    paint(3, 2);
    paint(6, 5);
    expect(inkBoundsFromRgba(data, width, height)).toEqual({ x: 3, y: 2, w: 4, h: 4 });
    expect(inkBoundsFromRgba(new Uint8ClampedArray(16), 2, 2)).toBeNull();
  });

  it('drops a default field on click and keeps a drag rect', () => {
    const clicked = placementFromPointer(100, 80, 102, 81, 400, 300, 1, 2);
    expect(clicked.pageIndex).toBe(1);
    expect(clicked.w).toBeGreaterThan(0.2);
    expect(clicked.x).toBeGreaterThanOrEqual(0);
    expect(clicked.x + clicked.w).toBeLessThanOrEqual(1);

    const dragged = placementFromPointer(40, 30, 200, 120, 400, 300, 0, 2);
    expect(dragged).toMatchObject({ pageIndex: 0, x: 0.1, y: 0.1, w: 0.4, h: 0.3 });
  });

  it('keeps the default stamp inside the page', () => {
    const corner = defaultStampBox(0, 0, 2);
    expect(corner.x).toBe(0);
    expect(corner.y).toBe(0);
    const far = defaultStampBox(1, 1, 2);
    expect(far.x + far.w).toBeLessThanOrEqual(1);
    expect(far.y + far.h).toBeLessThanOrEqual(1);
  });

  it('stamps a PNG onto selected PDF pages', async () => {
    const file = await blankPdf(2);
    const result = await applySignatureStamps(file, PNG_1X1, [
      { pageIndex: 0, x: 0.1, y: 0.7, w: 0.3, h: 0.15 },
      { pageIndex: 1, x: 0.6, y: 0.7, w: 0.3, h: 0.15 },
    ]);
    expect(result.fileName).toBe('blank_assinado.pdf');
    expect(result.stampCount).toBe(2);
    expect(result.pageCount).toBe(2);
    expect(result.blob.size).toBeGreaterThan(file.size);

    const signed = await PDFDocument.load(await result.blob.arrayBuffer());
    expect(signed.getPageCount()).toBe(2);
  });

  it('rejects an empty placement list', async () => {
    const file = await blankPdf(1);
    await expect(applySignatureStamps(file, PNG_1X1, [])).rejects.toThrow('NO_PLACEMENT');
  });
});
