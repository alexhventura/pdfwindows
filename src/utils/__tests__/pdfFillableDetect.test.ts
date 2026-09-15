import { describe, expect, it } from 'vitest';
import { PDFDocument, PDFTextField, StandardFonts } from 'pdf-lib';
import { detectFillableSlots, type FillableTextRun } from '../pdfFillableDetect';
import { writeFillablePdf } from '../../engines/makeFillablePdf';

describe('detectFillableSlots', () => {
  const pageW = 612;
  const pageH = 792;

  it('turns underscore leaders into text fields', () => {
    const runs: FillableTextRun[] = [
      { str: 'Nome:', x: 50, y: 700, w: 40, h: 12 },
      { str: '_______________', x: 96, y: 700, w: 180, h: 12 },
    ];
    const slots = detectFillableSlots(runs, pageW, pageH, 0);
    expect(slots.some((slot) => slot.kind === 'text' && slot.w > 80 && slot.x > 80)).toBe(true);
  });

  it('adds a field after a colon label', () => {
    const runs: FillableTextRun[] = [{ str: 'CPF:', x: 50, y: 640, w: 36, h: 11 }];
    const slots = detectFillableSlots(runs, pageW, pageH, 0);
    const field = slots.find((slot) => slot.x > 80 && slot.kind === 'text');
    expect(field).toBeTruthy();
    expect(field!.w).toBeGreaterThan(100);
  });

  it('fills a wide gap between two runs on the same line', () => {
    const runs: FillableTextRun[] = [
      { str: 'Cidade', x: 50, y: 580, w: 48, h: 11 },
      { str: 'UF', x: 420, y: 580, w: 20, h: 11 },
    ];
    const slots = detectFillableSlots(runs, pageW, pageH, 0);
    expect(slots.some((slot) => slot.x > 90 && slot.x < 400 && slot.w > 200)).toBe(true);
  });

  it('detects checkbox glyphs', () => {
    const runs: FillableTextRun[] = [{ str: '☐', x: 50, y: 520, w: 12, h: 12 }];
    const slots = detectFillableSlots(runs, pageW, pageH, 0);
    expect(slots.some((slot) => slot.kind === 'checkbox')).toBe(true);
  });

  it('adds a notes field when the page has no blanks', () => {
    const runs: FillableTextRun[] = [
      { str: 'Contrato de prestacao de servicos entre as partes abaixo.', x: 50, y: 700, w: 420, h: 11 },
      { str: 'Clausula primeira. O objeto deste instrumento e o seguinte.', x: 50, y: 680, w: 400, h: 11 },
    ];
    const slots = detectFillableSlots(runs, pageW, pageH, 0);
    expect(slots.length).toBeGreaterThanOrEqual(1);
    expect(slots.some((slot) => slot.h >= 40)).toBe(true);
  });

  it('turns printed AMG-style blanks into fillable fields', () => {
    const pageW = 596;
    const pageH = 842;
    const runs: FillableTextRun[] = [
      { str: 'NOME:', x: 25.1, y: 627, w: 30.5, h: 10 },
      { str: 'CNS:', x: 25.1, y: 613.7, w: 21.8, h: 10 },
      { str: 'DATA DE NASC:', x: 349.1, y: 613.7, w: 67.2, h: 10 },
      { str: ' ', x: 416.4, y: 613.7, w: 29.4, h: 10 },
      { str: '/', x: 445.8, y: 613.7, w: 3.8, h: 10 },
      { str: ' ', x: 449.6, y: 613.7, w: 27.3, h: 10 },
      { str: '/', x: 476.9, y: 613.7, w: 3.8, h: 10 },
      { str: 'Nº', x: 25.1, y: 560.6, w: 11.5, h: 10 },
      { str: ' ', x: 36.6, y: 560.6, w: 149.8, h: 10 },
      { str: 'COMPLEMENTO', x: 186.4, y: 560.6, w: 69.6, h: 10 },
      { str: 'DIABETES MELLITUS: (', x: 25.1, y: 520.8, w: 100.9, h: 10 },
      { str: ' ', x: 126, y: 520.8, w: 14.5, h: 10 },
      { str: ') TIPO I', x: 140.5, y: 520.8, w: 33.2, h: 10 },
      { str: ' ', x: 173.8, y: 520.8, w: 11.6, h: 10 },
      { str: '(', x: 185.3, y: 520.8, w: 3.8, h: 10 },
      { str: ' ', x: 189.1, y: 520.8, w: 14.4, h: 10 },
      { str: ') TIPO II', x: 203.6, y: 520.8, w: 37, h: 10 },
      { str: '( ) SERVIÇO PÚBLICO MUNICIPAL', x: 25.1, y: 162.3, w: 150.9, h: 10 },
      { str: 'Quantidade:', x: 32.4, y: 268.5, w: 54.1, h: 10 },
      { str: ' ', x: 86.5, y: 268.5, w: 102.2, h: 10 },
    ];
    const slots = detectFillableSlots(runs, pageW, pageH, 0);
    const names = slots.filter((slot) => slot.kind === 'text' && slot.y > 610 && slot.x < 80);
    expect(names.length).toBeGreaterThanOrEqual(1);
    expect(slots.filter((slot) => slot.kind === 'checkbox').length).toBeGreaterThanOrEqual(3);
    expect(slots.some((slot) => slot.kind === 'text' && slot.x > 30 && slot.x < 50 && slot.w > 100 && slot.y > 545 && slot.y < 575)).toBe(true);
    expect(slots.some((slot) => slot.kind === 'text' && slot.x > 80 && slot.w > 80 && slot.y > 255 && slot.y < 280)).toBe(true);
    expect(slots.some((slot) => slot.kind === 'text' && slot.x > 40 && slot.x < 120 && slot.w > 200 && slot.y > 600)).toBe(true);
  });
});

describe('writeFillablePdf', () => {
  it('writes an AcroForm copy that can be filled and saved again', async () => {
    const doc = await PDFDocument.create();
    const page = doc.addPage([612, 792]);
    const font = await doc.embedFont(StandardFonts.Helvetica);
    page.drawText('Nome:', { x: 50, y: 700, size: 12, font });
    const bytes = await doc.save();
    const file = new File([bytes], 'ficha.pdf', { type: 'application/pdf' });

    const result = await writeFillablePdf(file, [
      { pageIndex: 0, kind: 'text', x: 100, y: 696, w: 220, h: 16 },
    ]);
    expect(result.fileName).toBe('ficha_editavel.pdf');
    expect(result.fieldCount).toBeGreaterThan(0);

    const filled = await PDFDocument.load(await result.blob.arrayBuffer());
    const form = filled.getForm();
    const fields = form.getFields();
    expect(fields.length).toBeGreaterThan(0);
    const firstText = fields.find((field): field is PDFTextField => field instanceof PDFTextField);
    expect(firstText).toBeTruthy();
    firstText!.setText('Maria Silva');
    const saved = await filled.save();
    const again = await PDFDocument.load(saved);
    const readBack = again.getForm().getFields().find((field): field is PDFTextField => field instanceof PDFTextField);
    expect(readBack?.getText()).toBe('Maria Silva');
  });
});
