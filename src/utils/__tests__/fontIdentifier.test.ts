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

async function makeDocx(documentXml: string, stylesXml?: string): Promise<File> {
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
    stylesXml ||
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
  const blob = await zip.generateAsync({ type: 'blob' });
  return new File([blob], 'sample.docx', {
    type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  });
}

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

  it('does not invent hundreds of unused fontTable entries', async () => {
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
      styles
    );

    const result = await identifyDocumentFonts(file);
    expect(result.findings.length).toBe(1);
    expect(result.findings[0].primary.name).toBe('Calibri');
    expect(result.findings[0].sampleText).toMatch(/padrão|padrao/i);
  });
});
