import { describe, expect, it } from 'vitest';
import JSZip from 'jszip';
import { analyzeDocxRestrictions, removeDocumentRestrictions } from '../../engines/removeRestrictions';
import { looksLikePdf, looksLikeZip } from '../docxZip';

async function makeSimpleDocx(withProtection: boolean): Promise<File> {
  const zip = new JSZip();
  zip.file(
    '[Content_Types].xml',
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
  <Override PartName="/word/settings.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml"/>
</Types>`
  );
  zip.file(
    'word/document.xml',
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:body><w:p><w:r><w:rPr><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/></w:rPr><w:t>Test</w:t></w:r></w:p></w:body>
</w:document>`
  );
  zip.file(
    'word/settings.xml',
    withProtection
      ? `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:settings xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:documentProtection w:edit="readOnly" w:enforcement="1"/>
</w:settings>`
      : `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:settings xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"></w:settings>`
  );
  const blob = await zip.generateAsync({ type: 'blob' });
  return new File([blob], 'sample.docx', {
    type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  });
}

describe('docx restriction engines', () => {
  it('detects magic bytes helpers', async () => {
    const docx = await makeSimpleDocx(false);
    const buf = await docx.arrayBuffer();
    expect(looksLikeZip(buf)).toBe(true);
    expect(looksLikePdf(buf)).toBe(false);
    expect(looksLikePdf(new TextEncoder().encode('%PDF-1.7'))).toBe(true);
  });

  it('detects and removes DOCX documentProtection', async () => {
    const file = await makeSimpleDocx(true);
    const analysis = await analyzeDocxRestrictions(file);
    expect(analysis.restrictions.docxProtection).toBe(true);
    expect(analysis.removable).toBe(true);

    const removed = await removeDocumentRestrictions(file);
    expect(removed.output).toBeTruthy();
    expect(removed.outputName?.endsWith('.docx')).toBe(true);

    const unlocked = new File([removed.output!], 'out.docx', { type: file.type });
    const after = await analyzeDocxRestrictions(unlocked);
    expect(after.restrictions.docxProtection).toBe(false);
  });

  it('reports no restrictions for unprotected DOCX', async () => {
    const file = await makeSimpleDocx(false);
    const analysis = await analyzeDocxRestrictions(file);
    expect(analysis.reason).toBe('no-restrictions');
  });
});
