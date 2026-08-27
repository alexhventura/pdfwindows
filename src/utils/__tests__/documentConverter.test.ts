import { describe, expect, it } from 'vitest';
import JSZip from 'jszip';
import {
  convertDocument,
  identifyDocument,
  listConversionTargets,
  readDocumentPreviewSource,
} from '../../engines/documentConverter';

async function makeSimpleDocx(body = 'Hello Word'): Promise<File> {
  const zip = new JSZip();
  zip.file(
    '[Content_Types].xml',
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
</Types>`
  );
  zip.file(
    'word/document.xml',
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:body><w:p><w:r><w:t>${body}</w:t></w:r></w:p></w:body>
</w:document>`
  );
  const blob = await zip.generateAsync({ type: 'blob' });
  return new File([blob], 'sample.docx', {
    type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  });
}

describe('documentConverter', () => {
  it('identifies extensions and lists other formats only', () => {
    const txt = identifyDocument(new File(['hello'], 'notes.txt', { type: 'text/plain' }));
    expect(txt.family).toBe('text');
    expect(txt.convertible).toBe(true);
    const txtTargets = listConversionTargets(txt).map((t) => t.id);
    expect(txtTargets).toContain('pdf');
    expect(txtTargets).toContain('docx');
    expect(txtTargets).not.toContain('txt');

    const word = identifyDocument(new File(['x'], 'file.docx'));
    const wordTargets = listConversionTargets(word).map((t) => t.id);
    expect(wordTargets).toContain('pdf');
    expect(wordTargets).toContain('html');
    expect(wordTargets).not.toContain('docx');

    const pdf = identifyDocument(new File(['%PDF'], 'a.pdf'));
    expect(listConversionTargets(pdf).map((t) => t.id)).toContain('txt');
    expect(listConversionTargets(pdf).map((t) => t.id)).not.toContain('pdf');

    const xlsx = identifyDocument(new File(['x'], 'sheet.xlsx'));
    expect(xlsx.family).toBe('spreadsheet');
    expect(listConversionTargets(xlsx).map((t) => t.id)).toContain('csv');
  });

  it('rejects legacy binary Word as non-convertible', () => {
    const ole = new Uint8Array([0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1]);
    const identified = identifyDocument(new File([ole], 'old.doc'));
    expect(identified.family).toBe('word-legacy');
    expect(identified.convertible).toBe(false);
    expect(listConversionTargets(identified)).toEqual([]);
  });

  it('converts TXT to PDF, HTML and RTF', async () => {
    const file = new File(['Linha 1\nLinha 2'], 'ata.txt', { type: 'text/plain' });
    const pdf = await convertDocument(file, 'pdf');
    expect(pdf.fileName).toBe('ata.pdf');
    expect(pdf.blob.type).toContain('pdf');
    expect(pdf.blob.size).toBeGreaterThan(100);

    const html = await convertDocument(file, 'html');
    const htmlText = await html.blob.text();
    expect(htmlText).toContain('<p>Linha 1</p>');
    expect(html.fileName).toBe('ata.html');

    const rtf = await convertDocument(file, 'rtf');
    expect((await rtf.blob.text()).startsWith('{\\rtf1')).toBe(true);
  });

  it('extracts DOCX text and converts to TXT', async () => {
    const file = await makeSimpleDocx('Contrato local');
    const out = await convertDocument(file, 'txt');
    expect(await out.blob.text()).toContain('Contrato local');
    expect(out.fileName).toBe('sample.txt');
  });

  it('converts CSV to JSON and HTML', async () => {
    const file = new File(['nome,valor\nAna,10\nBia,20\n'], 'dados.csv', { type: 'text/csv' });
    const json = await convertDocument(file, 'json');
    const parsed = JSON.parse(await json.blob.text()) as Array<Record<string, string>>;
    expect(parsed[0]).toEqual({ nome: 'Ana', valor: '10' });
    expect(json.fileName).toBe('dados.json');

    const html = await convertDocument(file, 'htm');
    expect(await html.blob.text()).toContain('<td>Ana</td>');
    expect(html.fileName).toBe('dados.htm');
  });

  it('reads preview source without converting', async () => {
    const txt = new File(['Ata da reunião\nPauta 1'], 'ata.txt', { type: 'text/plain' });
    const txtSource = await readDocumentPreviewSource(txt, identifyDocument(txt));
    expect(txtSource).toEqual({ kind: 'text', text: 'Ata da reunião\nPauta 1' });

    const csv = new File(['nome,valor\nAna,10\n'], 'dados.csv', { type: 'text/csv' });
    const csvSource = await readDocumentPreviewSource(csv, identifyDocument(csv));
    expect(csvSource.kind).toBe('table');
    if (csvSource.kind === 'table') {
      expect(csvSource.rows[0]).toEqual(['nome', 'valor']);
    }

    const pdf = new File(['%PDF'], 'scan.pdf');
    expect(await readDocumentPreviewSource(pdf, identifyDocument(pdf))).toEqual({ kind: 'pdf' });

    const legacy = new File([new Uint8Array([0xd0, 0xcf])], 'old.doc');
    expect(await readDocumentPreviewSource(legacy, identifyDocument(legacy))).toEqual({ kind: 'icon' });
  });

  it('builds DOCX from plain text', async () => {
    const file = new File(['Hello'], 'n.txt', { type: 'text/plain' });
    const out = await convertDocument(file, 'docx');
    const bytes = new Uint8Array(await out.blob.arrayBuffer());
    expect(bytes[0]).toBe(0x50);
    expect(bytes[1]).toBe(0x4b);
    expect(out.fileName).toBe('n.docx');
  });
});
