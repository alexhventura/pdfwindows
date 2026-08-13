import { describe, expect, it, vi } from 'vitest';
import JSZip from 'jszip';

vi.mock('../../utils/pdfjsLoader', () => ({
  loadPdfJS: async () => ({
    getDocument: () => ({
      promise: Promise.resolve({
        numPages: 0,
        destroy: async () => undefined,
        getPage: async () => ({ getTextContent: async () => ({ items: [] }) }),
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
