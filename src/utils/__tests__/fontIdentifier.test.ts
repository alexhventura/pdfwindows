import { describe, expect, it, vi, beforeEach } from 'vitest';
import JSZip from 'jszip';
import { PDFDocument, StandardFonts } from 'pdf-lib';

type MockPage = {
  items: Array<{ str: string; fontName: string; transform?: number[] }>;
  fonts?: Record<string, { name?: string; type?: string }>;
};

const pdfJsState = vi.hoisted(() => ({ pages: [] as MockPage[] }));

vi.mock('../../utils/pdfjsLoader', () => ({
  loadPdfJS: async () => ({
    getDocument: () => ({
      promise: Promise.resolve({
        get numPages() {
          return Math.max(pdfJsState.pages.length, 0);
        },
        destroy: async () => undefined,
        getPage: async (i: number) => {
          const page = pdfJsState.pages[i - 1] || { items: [] };
          return {
            getTextContent: async () => ({ items: page.items }),
            commonObjs: {
              get: (id: string, cb?: (v: unknown) => void) => {
                const val = page.fonts?.[id] || null;
                if (cb) cb(val);
                return val;
              },
            },
          };
        },
      }),
    }),
  }),
}));

import { identifyDocumentFonts } from '../../engines/fontIdentifier';

async function makeDocx(
  documentXml: string,
  options?: { stylesXml?: string; themeXml?: string }
): Promise<File> {
  const zip = new JSZip();
  zip.file(
    '[Content_Types].xml',
    `<?xml version="1.0" encoding="UTF-8"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
</Types>`
  );
  zip.file('word/document.xml', documentXml);
  zip.file(
    'word/styles.xml',
    options?.stylesXml ||
      `<?xml version="1.0" encoding="UTF-8"?>
<w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:docDefaults>
    <w:rPrDefault>
      <w:rPr>
        <w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/>
      </w:rPr>
    </w:rPrDefault>
  </w:docDefaults>
</w:styles>`
  );
  if (options?.themeXml) {
    zip.file('word/theme/theme1.xml', options.themeXml);
  }
  const blob = await zip.generateAsync({ type: 'blob' });
  return new File([blob], 'sample.docx', {
    type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  });
}

const OFFICE_THEME = `<?xml version="1.0" encoding="UTF-8"?>
<a:theme xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main">
  <a:themeElements>
    <a:fontScheme name="Office">
      <a:majorFont><a:latin typeface="Calibri Light"/></a:majorFont>
      <a:minorFont><a:latin typeface="Calibri"/></a:minorFont>
    </a:fontScheme>
  </a:themeElements>
</a:theme>`;

describe('identifyDocumentFonts (docx)', () => {
  it('attaches sample text to 100% identified fonts from document runs', async () => {
    const file = await makeDocx(`<?xml version="1.0" encoding="UTF-8"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:body>
    <w:p>
      <w:r>
        <w:rPr><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/></w:rPr>
        <w:t>Olá mundo em Calibri</w:t>
      </w:r>
    </w:p>
    <w:p>
      <w:r>
        <w:rPr><w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman"/></w:rPr>
        <w:t>Texto serifado de exemplo</w:t>
      </w:r>
    </w:p>
  </w:body>
</w:document>`);

    const result = await identifyDocumentFonts(file);
    expect(result.format).toBe('docx');
    expect(result.findings.length).toBeGreaterThanOrEqual(2);

    const calibri = result.findings.find((f) => f.primary.name === 'Calibri');
    const times = result.findings.find((f) => f.primary.name === 'Times New Roman');

    expect(calibri?.method).toBe('document');
    expect(calibri?.confidencePercent).toBe(100);
    expect(calibri?.sampleText).toMatch(/Calibri/i);

    expect(times?.method).toBe('document');
    expect(times?.confidencePercent).toBe(100);
    expect(times?.sampleText).toMatch(/serifado/i);
  });

  it('resolves theme major/minor fonts so headings are not collapsed into body', async () => {
    const styles = `<?xml version="1.0" encoding="UTF-8"?>
<w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:docDefaults>
    <w:rPrDefault>
      <w:rPr>
        <w:rFonts w:asciiTheme="minorHAnsi" w:hAnsiTheme="minorHAnsi"/>
      </w:rPr>
    </w:rPrDefault>
  </w:docDefaults>
  <w:style w:type="paragraph" w:styleId="Normal">
    <w:name w:val="Normal"/>
    <w:rPr><w:rFonts w:asciiTheme="minorHAnsi" w:hAnsiTheme="minorHAnsi"/></w:rPr>
  </w:style>
  <w:style w:type="paragraph" w:styleId="Heading1">
    <w:name w:val="heading 1"/>
    <w:basedOn w:val="Normal"/>
    <w:rPr><w:rFonts w:asciiTheme="majorHAnsi" w:hAnsiTheme="majorHAnsi"/></w:rPr>
  </w:style>
</w:styles>`;

    const file = await makeDocx(
      `<?xml version="1.0" encoding="UTF-8"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:body>
    <w:p>
      <w:pPr><w:pStyle w:val="Heading1"/></w:pPr>
      <w:r><w:t>Título em tema major</w:t></w:r>
    </w:p>
    <w:p>
      <w:r><w:t>Corpo em tema minor Calibri</w:t></w:r>
    </w:p>
    <w:p>
      <w:r>
        <w:rPr><w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman"/></w:rPr>
        <w:t>Trecho em Times New Roman</w:t>
      </w:r>
    </w:p>
  </w:body>
</w:document>`,
      { stylesXml: styles, themeXml: OFFICE_THEME }
    );

    const result = await identifyDocumentFonts(file);
    const names = result.findings.map((f) => f.primary.name).sort();
    expect(names).toEqual(['Calibri', 'Calibri Light', 'Times New Roman']);

    const light = result.findings.find((f) => f.primary.name === 'Calibri Light');
    expect(light?.sampleText).toMatch(/Título|Titulo/i);
    expect(light?.confidencePercent).toBe(100);
  });

  it('does not invent unused style fonts that never appear in text', async () => {
    const styles = `<?xml version="1.0" encoding="UTF-8"?>
<w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:docDefaults>
    <w:rPrDefault>
      <w:rPr>
        <w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/>
      </w:rPr>
    </w:rPrDefault>
  </w:docDefaults>
  <w:style w:type="paragraph" w:styleId="Heading1">
    <w:rPr><w:rFonts w:ascii="Arial" w:hAnsi="Arial"/></w:rPr>
  </w:style>
</w:styles>`;

    const file = await makeDocx(
      `<?xml version="1.0" encoding="UTF-8"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:body>
    <w:p>
      <w:r>
        <w:t>Só o padrão do documento</w:t>
      </w:r>
    </w:p>
  </w:body>
</w:document>`,
      { stylesXml: styles }
    );

    const result = await identifyDocumentFonts(file);
    expect(result.findings.length).toBe(1);
    expect(result.findings[0].primary.name).toBe('Calibri');
    expect(result.findings[0].sampleText).toMatch(/padrão|padrao/i);
  });
});

async function pdfFile(bytes: Uint8Array, name = 'doc.pdf'): Promise<File> {
  return new File([bytes as BlobPart], name, { type: 'application/pdf' });
}

describe('identifyDocumentFonts (pdf)', () => {
  beforeEach(() => {
    pdfJsState.pages = [];
  });

  it('identifies embedded-declared Helvetica without treating it as a guess', async () => {
    const doc = await PDFDocument.create();
    const font = await doc.embedFont(StandardFonts.Helvetica);
    const page = doc.addPage([400, 200]);
    page.drawText('Hello Helvetica', { x: 40, y: 100, size: 14, font });
    const file = await pdfFile(await doc.save(), 'helvetica.pdf');
    pdfJsState.pages = [
      {
        items: [{ str: 'Hello Helvetica', fontName: 'g_d0_f1', transform: [14, 0, 0, 14, 0, 0] }],
        fonts: { g_d0_f1: { name: 'Helvetica', type: 'Type1' } },
      },
    ];

    const result = await identifyDocumentFonts(file);
    const hit = result.findings.find((f) => f.primary.name === 'Helvetica');
    expect(hit).toBeTruthy();
    expect(hit?.familyIdentified).toBe(true);
    expect(hit?.method).toBe('document');
    expect(hit?.confidencePercent).toBe(100);
    expect(hit?.primary.name).not.toMatch(/g[_ ]d\d/i);
  });

  it('identifies Times and Helvetica together in one file', async () => {
    const doc = await PDFDocument.create();
    const helv = await doc.embedFont(StandardFonts.Helvetica);
    const times = await doc.embedFont(StandardFonts.TimesRoman);
    const page = doc.addPage([400, 300]);
    page.drawText('Title', { x: 40, y: 220, size: 22, font: times });
    page.drawText('Body copy', { x: 40, y: 160, size: 12, font: helv });
    const file = await pdfFile(await doc.save(), 'multi.pdf');
    pdfJsState.pages = [
      {
        items: [
          { str: 'Title', fontName: 'g_d0_f1', transform: [22, 0, 0, 22, 0, 0] },
          { str: 'Body copy', fontName: 'g_d0_f2', transform: [12, 0, 0, 12, 0, 0] },
        ],
        fonts: {
          g_d0_f1: { name: 'Times-Roman', type: 'Type1' },
          g_d0_f2: { name: 'Helvetica', type: 'Type1' },
        },
      },
    ];

    const result = await identifyDocumentFonts(file);
    const names = result.findings.map((f) => f.primary.name).sort();
    expect(names).toEqual(expect.arrayContaining(['Helvetica', 'Times']));
  });

  it('marks standard fonts as not embedded', async () => {
    const doc = await PDFDocument.create();
    const font = await doc.embedFont(StandardFonts.Courier);
    const page = doc.addPage([300, 200]);
    page.drawText('Mono', { x: 20, y: 100, size: 12, font });
    const file = await pdfFile(await doc.save(), 'courier.pdf');
    pdfJsState.pages = [
      {
        items: [{ str: 'Mono', fontName: 'F1', transform: [12, 0, 0, 12, 0, 0] }],
        fonts: { F1: { name: 'Courier', type: 'Type1' } },
      },
    ];
    const result = await identifyDocumentFonts(file);
    const courier = result.findings.find((f) => f.primary.name === 'Courier');
    expect(courier?.familyIdentified).toBe(true);
    expect(courier?.technical?.pdfType).toMatch(/Type 1/i);
  });

  it('does not present pdf.js loadedName as the font family, even at 100% self-match', async () => {
    const doc = await PDFDocument.create();
    doc.addPage([200, 200]);
    const file = await pdfFile(await doc.save(), 'blank-usage.pdf');
    pdfJsState.pages = [
      {
        items: [{ str: 'abc', fontName: 'g_d0_f1946', transform: [12, 0, 0, 12, 0, 0] }],
      },
    ];

    const result = await identifyDocumentFonts(file);
    expect(result.findings.some((f) => /g[_ ]d0[_ ]f1946/i.test(f.primary.name))).toBe(false);
    const unknown = result.findings.find((f) => !f.familyIdentified);
    expect(unknown).toBeTruthy();
    expect(unknown?.method).toBe('unknown');
    expect(unknown?.confidencePercent).toBe(0);
    expect(unknown?.technical?.internalName).toMatch(/g_d0_f1946/);
  });

  it('resolves loadedName via pdf.js translated name ABCDEE+ArialMT', async () => {
    const doc = await PDFDocument.create();
    doc.addPage([200, 200]);
    const file = await pdfFile(await doc.save(), 'subset.pdf');
    pdfJsState.pages = [
      {
        items: [{ str: 'Hello Arial body', fontName: 'g_d0_f12', transform: [11, 0, 0, 11, 0, 0] }],
        fonts: { g_d0_f12: { name: 'ABCDEE+ArialMT', type: 'CIDFontType2' } },
      },
    ];

    const result = await identifyDocumentFonts(file);
    const arial = result.findings.find((f) => f.primary.name === 'Arial');
    expect(arial?.familyIdentified).toBe(true);
    expect(arial?.method).toBe('document');
    expect(arial?.technical?.subset).toBe(true);
    expect(arial?.sampleText).toMatch(/Hello Arial/i);
    expect(arial?.confidencePercent).toBe(100);
  });

  it('flags garbled glyph text as low-reliability', async () => {
    const doc = await PDFDocument.create();
    const font = await doc.embedFont(StandardFonts.Helvetica);
    const page = doc.addPage([200, 200]);
    page.drawText('ok', { x: 10, y: 100, size: 12, font });
    const file = await pdfFile(await doc.save(), 'garbled.pdf');
    pdfJsState.pages = [
      {
        items: [{ str: "t 1 I l 1' 11lil I l 0 t", fontName: 'g_d0_f1', transform: [10, 0, 0, 10, 0, 0] }],
        fonts: { g_d0_f1: { name: 'Helvetica', type: 'Type1' } },
      },
    ];

    const result = await identifyDocumentFonts(file);
    const helv = result.findings.find((f) => f.primary.name === 'Helvetica');
    expect(helv?.sampleUnreliable).toBe(true);
  });

  it('labels image-only PDFs as scanned rather than inventing a font', async () => {
    const doc = await PDFDocument.create();
    doc.addPage([200, 200]);
    const file = await pdfFile(await doc.save(), 'scan.pdf');
    pdfJsState.pages = [{ items: [] }];

    const result = await identifyDocumentFonts(file);
    expect(result.findings.filter((f) => f.familyIdentified)).toHaveLength(0);
    expect(result.notes.some((n) => n === 'scanned-or-image' || n === 'no-fonts' || n === 'some-unidentified')).toBe(
      true
    );
  });
});

