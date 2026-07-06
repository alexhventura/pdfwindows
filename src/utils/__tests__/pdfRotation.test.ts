import { describe, it, expect } from 'vitest';
import { PDFDocument, degrees } from 'pdf-lib';

describe('pdf-lib page rotation', () => {
  it('accepts degrees() helper (not { angle } object)', async () => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([200, 300]);
    page.setRotation(degrees(90));
    expect(page.getRotation().angle).toBe(90);

    page.setRotation(degrees((page.getRotation().angle + 90) % 360));
    expect(page.getRotation().angle).toBe(180);
  });
});
