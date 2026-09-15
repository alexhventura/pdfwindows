import { PDFDocument, PDFName, PDFBool, StandardFonts, rgb } from 'pdf-lib';
import { looksLikePdf } from '../utils/docxZip';
import { detectFillableSlots, type FillableSlot, type FillableTextRun } from '../utils/pdfFillableDetect';

const MAX_PAGES = 40;

function stem(name: string): string {
  return name.replace(/\.[^.]+$/, '') || 'document';
}

function multiply(m1: number[], m2: number[]): number[] {
  return [
    m1[0] * m2[0] + m1[2] * m2[1],
    m1[1] * m2[0] + m1[3] * m2[1],
    m1[0] * m2[2] + m1[2] * m2[3],
    m1[1] * m2[2] + m1[3] * m2[3],
    m1[0] * m2[4] + m1[2] * m2[5] + m1[4],
    m1[1] * m2[4] + m1[3] * m2[5] + m1[5],
  ];
}

interface PdfTextItem {
  str?: string;
  width?: number;
  transform?: number[];
}

async function extractPageRuns(file: File): Promise<Array<{ pageIndex: number; width: number; height: number; runs: FillableTextRun[] }>> {
  const { loadPdfJS } = await import('../utils/pdfjsLoader');
  const pdfjs = await loadPdfJS();
  const data = new Uint8Array(await file.arrayBuffer()).slice();
  const pdf = await pdfjs.getDocument({ data }).promise;
  const pages: Array<{ pageIndex: number; width: number; height: number; runs: FillableTextRun[] }> = [];
  try {
    const limit = Math.min(pdf.numPages, MAX_PAGES);
    for (let p = 1; p <= limit; p++) {
      const page = await pdf.getPage(p);
      const viewport = page.getViewport({ scale: 1 });
      const vt = viewport.transform as number[];
      const content = await page.getTextContent();
      const runs: FillableTextRun[] = [];
      for (const raw of content.items as PdfTextItem[]) {
        if (typeof raw.str !== 'string' || !raw.str || !raw.transform) continue;
        const t = multiply(vt, raw.transform);
        const rotated = Math.abs(t[1]!) > 0.5 || Math.abs(t[2]!) > 0.5;
        const fontHeight = Math.hypot(t[2]!, t[3]!);
        if (rotated || fontHeight <= 0.5) continue;
        const width = raw.width && raw.width > 0 ? raw.width : fontHeight * 0.5 * raw.str.length;
        const left = t[4]!;
        const baselineCanvas = t[5]!;
        const pdfX = left;
        const pdfBaseline = viewport.height - baselineCanvas;
        runs.push({ str: raw.str, x: pdfX, y: pdfBaseline, w: width, h: fontHeight });
      }
      pages.push({ pageIndex: p - 1, width: viewport.width, height: viewport.height, runs });
      page.cleanup();
    }
  } finally {
    await pdf.destroy();
  }
  return pages;
}

function slotOverlapsExisting(slot: FillableSlot, existing: Array<{ x: number; y: number; w: number; h: number }>): boolean {
  for (const box of existing) {
    const ix = Math.max(0, Math.min(slot.x + slot.w, box.x + box.w) - Math.max(slot.x, box.x));
    const iy = Math.max(0, Math.min(slot.y + slot.h, box.y + box.h) - Math.max(slot.y, box.y));
    if (ix > 3 && iy > 3) return true;
  }
  return false;
}

function existingWidgetBoxes(doc: PDFDocument): Map<number, Array<{ x: number; y: number; w: number; h: number }>> {
  const byPage = new Map<number, Array<{ x: number; y: number; w: number; h: number }>>();
  const pages = doc.getPages();
  const form = doc.getForm();
  for (const field of form.getFields()) {
    try {
      for (const widget of field.acroField.getWidgets()) {
        const rect = widget.getRectangle();
        const pageRef = widget.P();
        const pageIndex = pageRef
          ? pages.findIndex((page) => page.ref.objectNumber === pageRef.objectNumber)
          : -1;
        if (pageIndex < 0) continue;
        const list = byPage.get(pageIndex) ?? [];
        list.push({ x: rect.x, y: rect.y, w: rect.width, h: rect.height });
        byPage.set(pageIndex, list);
      }
    } catch {
      /* skip unreadable widget */
    }
  }
  return byPage;
}

export async function writeFillablePdf(
  file: File,
  slots: FillableSlot[]
): Promise<{ blob: Blob; fileName: string; fieldCount: number }> {
  const buffer = await file.arrayBuffer();
  if (!looksLikePdf(buffer)) throw new Error('INVALID_PDF');

  const doc = await PDFDocument.load(buffer.slice(0), { ignoreEncryption: true, updateMetadata: false });
  const form = doc.getForm();
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const existing = existingWidgetBoxes(doc);
  const usedNames = new Set(form.getFields().map((field) => field.getName()));

  let added = 0;
  for (const slot of slots) {
    const pageBoxes = existing.get(slot.pageIndex) ?? [];
    if (slotOverlapsExisting(slot, pageBoxes)) continue;
    const page = doc.getPage(slot.pageIndex);
    let name = `fill_${slot.pageIndex + 1}_${added + 1}`;
    while (usedNames.has(name)) name = `fill_${slot.pageIndex + 1}_${added + 1}_${usedNames.size}`;
    usedNames.add(name);
    if (slot.kind === 'checkbox') {
      const box = form.createCheckBox(name);
      box.addToPage(page, {
        x: slot.x,
        y: slot.y,
        width: Math.min(slot.w, slot.h),
        height: Math.min(slot.w, slot.h),
        borderWidth: 0.8,
        borderColor: rgb(0.23, 0.51, 0.96),
        backgroundColor: rgb(0.93, 0.96, 1),
      });
    } else {
      const text = form.createTextField(name);
      if (slot.h >= 40) text.enableMultiline();
      text.addToPage(page, {
        x: slot.x,
        y: slot.y,
        width: slot.w,
        height: slot.h,
        borderWidth: 0.7,
        borderColor: rgb(0.23, 0.51, 0.96),
        backgroundColor: rgb(0.93, 0.96, 1),
        textColor: rgb(0.12, 0.16, 0.23),
        font,
      });
    }
    added += 1;
  }

  try {
    form.acroForm.dict.set(PDFName.of('NeedAppearances'), PDFBool.True);
  } catch {
    /* older viewers still get appearance streams below */
  }
  try {
    form.updateFieldAppearances(font);
  } catch {
    /* appearances are best-effort */
  }

  const fieldCount = form.getFields().length;
  const bytes = await doc.save({ useObjectStreams: false });
  return {
    blob: new Blob([bytes], { type: 'application/pdf' }),
    fileName: `${stem(file.name)}_editavel.pdf`,
    fieldCount,
  };
}

export async function makePdfFillable(file: File): Promise<{ blob: Blob; fileName: string; fieldCount: number }> {
  const pages = await extractPageRuns(file);
  const slots: FillableSlot[] = [];
  for (const page of pages) {
    slots.push(...detectFillableSlots(page.runs, page.width, page.height, page.pageIndex));
  }
  return writeFillablePdf(file, slots);
}
