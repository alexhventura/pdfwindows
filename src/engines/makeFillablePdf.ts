import { PDFDocument, PDFName, PDFBool, PDFString, StandardFonts, rgb } from 'pdf-lib';
import { looksLikePdf } from '../utils/docxZip';
import { detectFillableSlots, type DrawnRule, type FillableSlot, type FillableTextRun } from '../utils/pdfFillableDetect';

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

function pathNumbers(raw: unknown): number[] {
  if (!raw) return [];
  if (ArrayBuffer.isView(raw)) return Array.from(raw as unknown as ArrayLike<number>);
  if (Array.isArray(raw) && typeof raw[0] === 'number') return raw as number[];
  if (Array.isArray(raw)) return raw.flatMap(pathNumbers);
  if (typeof raw === 'object') {
    return Object.keys(raw as object)
      .filter((key) => /^\d+$/.test(key))
      .sort((a, b) => Number(a) - Number(b))
      .map((key) => Number((raw as Record<string, number>)[key]));
  }
  return [];
}

function rulesFromPathData(data: number[]): DrawnRule[] {
  const rules: DrawnRule[] = [];
  const pts: Array<{ x: number; y: number }> = [];
  let i = 0;
  let cx = 0;
  let cy = 0;
  let sx = 0;
  let sy = 0;

  const horiz = (x1: number, y1: number, x2: number, y2: number) => {
    if (Math.abs(y1 - y2) > 1.25) return;
    const w = Math.abs(x2 - x1);
    if (w < 22) return;
    rules.push({ x: Math.min(x1, x2), y: Math.min(y1, y2), w });
  };

  while (i < data.length) {
    const op = data[i++]!;
    if (op === 0) {
      pts.length = 0;
      cx = data[i++]!;
      cy = data[i++]!;
      sx = cx;
      sy = cy;
      pts.push({ x: cx, y: cy });
    } else if (op === 1) {
      const nx = data[i++]!;
      const ny = data[i++]!;
      horiz(cx, cy, nx, ny);
      cx = nx;
      cy = ny;
      pts.push({ x: cx, y: cy });
    } else if (op === 2) {
      i += 4;
      cx = data[i++]!;
      cy = data[i++]!;
      pts.push({ x: cx, y: cy });
    } else if (op === 3) {
      i += 2;
      cx = data[i++]!;
      cy = data[i++]!;
      pts.push({ x: cx, y: cy });
    } else if (op === 4) {
      horiz(cx, cy, sx, sy);
      if (pts.length >= 4) {
        const xs = pts.map((pt) => pt.x);
        const ys = pts.map((pt) => pt.y);
        const minX = Math.min(...xs);
        const maxX = Math.max(...xs);
        const minY = Math.min(...ys);
        const maxY = Math.max(...ys);
        if (maxY - minY <= 2.6 && maxX - minX >= 22) {
          rules.push({ x: minX, y: minY, w: maxX - minX });
        }
      }
      pts.length = 0;
    } else {
      break;
    }
  }
  return rules;
}

async function extractPageRuns(
  file: File
): Promise<Array<{ pageIndex: number; width: number; height: number; runs: FillableTextRun[]; rules: DrawnRule[] }>> {
  const { loadPdfJS } = await import('../utils/pdfjsLoader');
  const pdfjs = await loadPdfJS();
  const data = new Uint8Array(await file.arrayBuffer()).slice();
  const pdf = await pdfjs.getDocument({ data }).promise;
  const pages: Array<{ pageIndex: number; width: number; height: number; runs: FillableTextRun[]; rules: DrawnRule[] }> = [];
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

      const rules: DrawnRule[] = [];
      try {
        const ops = await page.getOperatorList();
        const constructPath = pdfjs.OPS.constructPath as number;
        for (let i = 0; i < ops.fnArray.length; i++) {
          if (ops.fnArray[i] !== constructPath) continue;
          const args = ops.argsArray[i] as unknown[];
          rules.push(...rulesFromPathData(pathNumbers(args?.[1])));
        }
      } catch {
        /* some pages have no drawable path list */
      }

      pages.push({ pageIndex: p - 1, width: viewport.width, height: viewport.height, runs, rules });
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

function fieldFontSize(height: number): number {
  return Math.max(7, Math.min(11, Math.floor(height) - 6));
}

async function writableCopy(src: PDFDocument): Promise<PDFDocument> {
  const dest = await PDFDocument.create();
  const copied = await dest.copyPages(
    src,
    Array.from({ length: src.getPageCount() }, (_, i) => i)
  );
  for (const page of copied) dest.addPage(page);
  return dest;
}

export async function writeFillablePdf(
  file: File,
  slots: FillableSlot[],
  values: Record<string, string> = {}
): Promise<{ blob: Blob; fileName: string; fieldCount: number }> {
  const buffer = await file.arrayBuffer();
  if (!looksLikePdf(buffer)) throw new Error('INVALID_PDF');

  const src = await PDFDocument.load(buffer.slice(0), { ignoreEncryption: true, updateMetadata: false });
  let doc: PDFDocument;
  try {
    doc = await writableCopy(src);
  } catch {
    doc = src;
  }

  const form = doc.getForm();
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const existing = existingWidgetBoxes(doc);
  const usedNames = new Set(form.getFields().map((field) => field.getName()));

  let added = 0;
  for (const slot of slots) {
    const pageBoxes = existing.get(slot.pageIndex) ?? [];
    if (slotOverlapsExisting(slot, pageBoxes)) continue;
    const page = doc.getPage(slot.pageIndex);
    let name = slot.name || `fill_${slot.pageIndex + 1}_${added + 1}`;
    while (usedNames.has(name)) name = `${name}_${usedNames.size}`;
    usedNames.add(name);
    const value = values[name] ?? values[slot.name ?? ''] ?? '';
    if (slot.kind === 'checkbox') {
      const box = form.createCheckBox(name);
      box.disableReadOnly();
      box.addToPage(page, {
        x: slot.x,
        y: slot.y,
        width: Math.min(slot.w, slot.h),
        height: Math.min(slot.w, slot.h),
        borderWidth: 0.9,
        borderColor: rgb(0.12, 0.42, 0.86),
        backgroundColor: rgb(0.93, 0.96, 1),
      });
      if (value === 'true' || value === '1' || value === 'on') box.check();
    } else {
      const text = form.createTextField(name);
      text.disableReadOnly();
      text.enableScrolling();
      if (slot.h >= 40) text.enableMultiline();
      try {
        text.setFontSize(fieldFontSize(slot.h));
      } catch {
        try {
          text.setFontSize(8);
        } catch {
          /* viewer will use AcroForm DA */
        }
      }
      text.addToPage(page, {
        x: slot.x,
        y: slot.y,
        width: slot.w,
        height: slot.h,
        borderWidth: 0.8,
        borderColor: rgb(0.12, 0.42, 0.86),
        backgroundColor: rgb(0.93, 0.96, 1),
        textColor: rgb(0.08, 0.12, 0.2),
        font,
      });
      if (value) {
        try {
          text.setText(value);
        } catch {
          /* skip incompatible value */
        }
      }
    }
    added += 1;
  }

  try {
    form.acroForm.dict.set(PDFName.of('DA'), PDFString.of('/Helv 10 Tf 0 g'));
  } catch {
    /* DA is best-effort */
  }
  try {
    form.updateFieldAppearances(font);
  } catch {
    /* appearances are best-effort */
  }
  try {
    form.acroForm.dict.set(PDFName.of('NeedAppearances'), PDFBool.False);
  } catch {
    /* Chrome prefers generated appearance streams over NeedAppearances */
  }

  const fieldCount = form.getFields().length;
  const bytes = await doc.save({ useObjectStreams: false });
  return {
    blob: new Blob([bytes], { type: 'application/pdf' }),
    fileName: `${stem(file.name)}_editavel.pdf`,
    fieldCount,
  };
}

export async function extractFillableLayout(file: File): Promise<{
  pages: Array<{ pageIndex: number; width: number; height: number }>;
  slots: FillableSlot[];
}> {
  const pages = await extractPageRuns(file);
  const slots: FillableSlot[] = [];
  for (const page of pages) {
    slots.push(...detectFillableSlots(page.runs, page.width, page.height, page.pageIndex, page.rules));
  }
  return {
    pages: pages.map((page) => ({ pageIndex: page.pageIndex, width: page.width, height: page.height })),
    slots,
  };
}

export async function makePdfFillable(
  file: File,
  values: Record<string, string> = {}
): Promise<{ blob: Blob; fileName: string; fieldCount: number }> {
  const layout = await extractFillableLayout(file);
  return writeFillablePdf(file, layout.slots, values);
}
