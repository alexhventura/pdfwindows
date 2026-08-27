import { describe, expect, it } from 'vitest';
import { PDFDocument } from 'pdf-lib';
import {
  addPageNumbers,
  addPdfFormFields,
  appendPdf,
  applyPdfEdits,
  cropPdfPages,
  diffLines,
  fillPdfForm,
  formatPageLabel,
  listPdfFormFields,
  pageNumberWords,
  repairPdf,
  toArchivalPdf,
  visiblePageNumber,
} from '../../engines/pdfToolkit';
import { buildPptxFromImages, rowsToXlsxBlob } from '../../engines/officeBridge';

async function blankPdf(pages = 2, title?: string): Promise<File> {
  const doc = await PDFDocument.create();
  if (title) doc.setTitle(title);
  for (let i = 0; i < pages; i++) doc.addPage([400, 300]);
  const bytes = await doc.save();
  return new File([bytes], 'blank.pdf', { type: 'application/pdf' });
}

const PNG_1X1 = Uint8Array.from(
  atob('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=='),
  (char) => char.charCodeAt(0)
);

describe('pdfToolkit', () => {
  it('formats and skips cover page numbers', () => {
    expect(formatPageLabel(1, 10, 'n', 'Pagina', 'de')).toBe('1');
    expect(formatPageLabel(2, 10, 'n-total', 'Pagina', 'de')).toBe('2 / 10');
    expect(formatPageLabel(3, 10, 'page-n', 'Pagina', 'de')).toBe('Pagina 3');
    expect(formatPageLabel(4, 10, 'page-n-total', 'Page', 'of')).toBe('Page 4 of 10');
    expect(visiblePageNumber(0, true, 1)).toBeNull();
    expect(visiblePageNumber(1, true, 1)).toBe(1);
    expect(visiblePageNumber(0, false, 5)).toBe(5);
    expect(pageNumberWords('pt')).toEqual({ pageWord: 'Pagina', ofWord: 'de' });
  });

  it('stamps page numbers onto a copy', async () => {
    const file = await blankPdf(3);
    const result = await addPageNumbers(file, {
      band: 'footer',
      align: 'center',
      format: 'n-total',
      startAt: 1,
      skipFirst: true,
      fontSize: 11,
      margin: 20,
      color: '#334155',
      pageWord: 'Pagina',
      ofWord: 'de',
    });
    expect(result.fileName).toBe('blank_paginas.pdf');
    const numbered = await PDFDocument.load(await result.blob.arrayBuffer());
    expect(numbered.getPageCount()).toBe(3);
  });

  it('crops pages and rejects a tiny rect', async () => {
    const file = await blankPdf(2);
    await expect(cropPdfPages(file, { x: 0.1, y: 0.1, w: 0.01, h: 0.01 }, 'all')).rejects.toThrow('CROP_TOO_SMALL');
    const cropped = await cropPdfPages(file, { x: 0.1, y: 0.1, w: 0.5, h: 0.5 }, 0);
    expect(cropped.fileName).toBe('blank_recortado.pdf');
  });

  it('repairs, archives, and appends PDFs', async () => {
    const a = await blankPdf(2, 'Memo');
    const b = await blankPdf(1);
    const repaired = await repairPdf(a);
    expect(repaired.pageCount).toBe(2);
    const archival = await toArchivalPdf(a);
    expect(archival.fileName).toBe('blank_arquivo.pdf');
    const combined = await appendPdf(a, b);
    const doc = await PDFDocument.load(await combined.arrayBuffer());
    expect(doc.getPageCount()).toBe(3);
  });

  it('diffs lines from two texts', () => {
    const rows = diffLines('alpha\nshared', 'beta\nshared');
    expect(rows.some((row) => row.side === 'left' && row.text === 'alpha')).toBe(true);
    expect(rows.some((row) => row.side === 'right' && row.text === 'beta')).toBe(true);
    expect(rows.some((row) => row.side === 'same' && row.text === 'shared')).toBe(true);
  });

  it('applies text edits and form fields', async () => {
    const file = await blankPdf(1);
    const edited = await applyPdfEdits(file, [
      { kind: 'text', pageIndex: 0, x: 0.1, y: 0.1, w: 0.4, h: 0.1, text: 'Hello' },
      { kind: 'rect', pageIndex: 0, x: 0.2, y: 0.2, w: 0.2, h: 0.2 },
    ]);
    expect(edited.fileName).toBe('blank_editado.pdf');

    const withFields = await addPdfFormFields(file, [
      { name: 'nome', type: 'text', rect: { pageIndex: 0, x: 0.1, y: 0.3, w: 0.4, h: 0.08 } },
      { name: 'ok', type: 'checkbox', rect: { pageIndex: 0, x: 0.1, y: 0.5, w: 0.05, h: 0.05 } },
    ]);
    const listed = await listPdfFormFields(new File([withFields.blob], 'f.pdf', { type: 'application/pdf' }));
    expect(listed.map((field) => field.name)).toEqual(expect.arrayContaining(['nome', 'ok']));
    const filled = await fillPdfForm(new File([withFields.blob], 'f.pdf', { type: 'application/pdf' }), [
      { name: 'nome', value: 'Ana' },
      { name: 'ok', value: 'true', checked: true },
    ], false);
    expect(filled.fileName).toBe('f_formulario.pdf');
  });
});

describe('officeBridge', () => {
  it('builds an xlsx blob from rows', async () => {
    const blob = await rowsToXlsxBlob([['a', 'b'], ['1', '2']], 'Sheet');
    const bytes = new Uint8Array(await blob.arrayBuffer());
    expect(bytes[0]).toBe(0x50);
    expect(bytes[1]).toBe(0x4b);
  });

  it('builds a pptx from png slides', async () => {
    const blob = await buildPptxFromImages([{ name: 'slide1.png', bytes: PNG_1X1 }], 'Deck');
    const bytes = new Uint8Array(await blob.arrayBuffer());
    expect(bytes[0]).toBe(0x50);
    expect(bytes[1]).toBe(0x4b);
  });
});
