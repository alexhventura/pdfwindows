import { describe, expect, it } from 'vitest';
import { detectFormat } from '../../fileXray/detectFormat';
import { computeHashes, formatBytes } from '../../fileXray/hash';
import { analyzeCsv, analyzeTxt, analyzeGeneric } from '../../fileXray/analyzers/textZipGeneric';
import { analyzeZip } from '../../fileXray/analyzers/textZipGeneric';
import JSZip from 'jszip';

function enc(s: string): ArrayBuffer {
  return new TextEncoder().encode(s).buffer;
}

describe('fileXray detectFormat', () => {
  it('detects PDF magic', () => {
    const buf = enc('%PDF-1.7\n%âãÏÓ\n');
    const d = detectFormat(buf, 'doc.pdf', 'application/pdf');
    expect(d.format).toBe('pdf');
  });

  it('detects JPEG magic even with wrong extension', () => {
    const bytes = new Uint8Array([0xff, 0xd8, 0xff, 0xe0, 0x00, 0x10, 0x4a, 0x46, 0x49, 0x46]);
    const d = detectFormat(bytes.buffer, 'foto.pdf', 'application/pdf');
    expect(d.format).toBe('jpeg');
  });

  it('detects PNG', () => {
    const bytes = new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0, 0, 0, 0]);
    expect(detectFormat(bytes.buffer, 'a.png', '').format).toBe('png');
  });

  it('detects CSV heuristically', () => {
    const csv = 'a,b,c\n1,2,3\n4,5,6\n';
    expect(detectFormat(enc(csv), 'data.csv', 'text/csv').format).toBe('csv');
  });
});

describe('fileXray hash', () => {
  it('computes sha256/sha1', async () => {
    const h = await computeHashes(enc('hello'));
    expect(h.sha256).toHaveLength(64);
    expect(h.sha1).toHaveLength(40);
  });

  it('formats bytes', () => {
    expect(formatBytes(500)).toContain('B');
    expect(formatBytes(2048)).toContain('KB');
  });
});

describe('fileXray text/csv/zip analyzers', () => {
  const id = {
    name: 't.csv',
    extension: 'csv',
    browserMime: 'text/csv',
    detectedFormat: 'csv' as const,
    detectedMime: 'text/csv',
    magicSignature: '00',
    inconsistency: false,
  };
  const hashes = { sha256: 'a'.repeat(64), sha1: 'b'.repeat(40) };

  it('analyzes CSV structure', async () => {
    const csv = 'name;age\nAlice;30\nBob;25\n';
    const r = await analyzeCsv(enc(csv), { ...id, name: 't.csv' }, hashes);
    expect(r.statistics.columns?.value).toBe(2);
    expect(r.supportLevel).toBe('full');
  });

  it('analyzes TXT', async () => {
    const r = await analyzeTxt(enc('hello world\nline two'), { ...id, detectedFormat: 'txt', name: 'a.txt' }, hashes);
    expect(r.statistics.words?.value).toBeGreaterThan(0);
  });

  it('analyzes ZIP listing without executing contents', async () => {
    const zip = new JSZip();
    zip.file('readme.txt', 'hi');
    zip.folder('secret')?.file('.hidden', 'x');
    const buf = await zip.generateAsync({ type: 'arraybuffer' });
    const r = await analyzeZip(buf, { ...id, detectedFormat: 'zip', name: 'a.zip' }, hashes);
    expect(r.statistics.entries?.value).toBeGreaterThanOrEqual(1);
    expect(r.embedded.length).toBeGreaterThan(0);
  });

  it('generic analyzer does not invent authorship', async () => {
    const r = await analyzeGeneric(enc('xxxx'), { ...id, detectedFormat: 'unknown', name: 'x.bin' }, hashes);
    expect(r.authorship.author).toBeUndefined();
    expect(r.supportLevel).toBe('basic');
  });
});

describe('fileXray PDF/DOCX/XLSX smoke', () => {
  it('analyzes minimal PDF metadata via pdf-lib', async () => {
    // pdf.js needs browser DOM APIs; unit-test the pdf-lib metadata path only.
    const { PDFDocument } = await import('pdf-lib');
    const doc = await PDFDocument.create();
    doc.addPage();
    doc.setTitle('Test Title');
    doc.setAuthor('Test Author');
    const bytes = await doc.save();
    const loaded = await PDFDocument.load(bytes, { ignoreEncryption: true, updateMetadata: false });
    expect(loaded.getPageCount()).toBe(1);
    expect(loaded.getAuthor()).toBe('Test Author');
    expect(loaded.getTitle()).toBe('Test Title');
    const head = new TextDecoder('latin1').decode(bytes.slice(0, 8));
    expect(head.startsWith('%PDF-')).toBe(true);
  });

  it('analyzes minimal DOCX zip', async () => {
    const { analyzeDocx } = await import('../../fileXray/analyzers/docxAnalyzer');
    const zip = new JSZip();
    zip.file(
      '[Content_Types].xml',
      '<?xml version="1.0"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"></Types>',
    );
    zip.file(
      'docProps/core.xml',
      `<?xml version="1.0"?>
      <cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties"
        xmlns:dc="http://purl.org/dc/elements/1.1/"
        xmlns:dcterms="http://purl.org/dc/terms/"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
        <dc:creator>Alice</dc:creator>
        <dcterms:created xsi:type="dcterms:W3CDTF">2024-01-02T03:04:05Z</dcterms:created>
      </cp:coreProperties>`,
    );
    zip.file(
      'docProps/app.xml',
      `<?xml version="1.0"?><Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties">
        <Application>Microsoft Office Word</Application><Words>12</Words><Pages>1</Pages>
      </Properties>`,
    );
    zip.file(
      'word/document.xml',
      `<?xml version="1.0"?><w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
        <w:body><w:p><w:r><w:rPr><w:rFonts w:ascii="Calibri"/></w:rPr><w:t>Hello world</w:t></w:r></w:p></w:body>
      </w:document>`,
    );
    const buf = await zip.generateAsync({ type: 'arraybuffer' });
    const r = await analyzeDocx(buf, {
      name: 't.docx',
      extension: 'docx',
      browserMime: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      detectedFormat: 'docx',
      detectedMime: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      magicSignature: '50 4B',
      inconsistency: false,
      container: 'ZIP/OOXML',
    }, { sha256: 'd'.repeat(64) });
    expect(r.authorship.author?.value).toBe('Alice');
    expect(r.authorship.application?.value).toContain('Word');
    expect(r.fonts.some((f) => f.name === 'Calibri')).toBe(true);
  });

  it('detects hidden sheets in XLSX', async () => {
    const { analyzeXlsx } = await import('../../fileXray/analyzers/xlsxAnalyzer');
    const zip = new JSZip();
    zip.file(
      'xl/workbook.xml',
      `<?xml version="1.0"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"
        xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
        <sheets>
          <sheet name="Visible" sheetId="1" r:id="rId1"/>
          <sheet name="Secret" sheetId="2" state="hidden" r:id="rId2"/>
        </sheets>
      </workbook>`,
    );
    zip.file(
      'xl/_rels/workbook.xml.rels',
      `<?xml version="1.0"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
        <Relationship Id="rId1" Target="worksheets/sheet1.xml"/>
        <Relationship Id="rId2" Target="worksheets/sheet2.xml"/>
      </Relationships>`,
    );
    zip.file(
      'xl/worksheets/sheet1.xml',
      `<?xml version="1.0"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
        <dimension ref="A1:B2"/><sheetData>
          <row r="1"><c r="A1"><v>1</v></c><c r="B1"><f>SUM(A1)</f><v>1</v></c></row>
        </sheetData>
      </worksheet>`,
    );
    zip.file(
      'xl/worksheets/sheet2.xml',
      `<?xml version="1.0"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><sheetData/></worksheet>`,
    );
    zip.file('docProps/core.xml', `<?xml version="1.0"?><cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/"><dc:creator>Bob</dc:creator></cp:coreProperties>`);
    const buf = await zip.generateAsync({ type: 'arraybuffer' });
    const r = await analyzeXlsx(buf, {
      name: 't.xlsx',
      extension: 'xlsx',
      browserMime: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      detectedFormat: 'xlsx',
      detectedMime: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      magicSignature: '50 4B',
      inconsistency: false,
    }, { sha256: 'e'.repeat(64) });
    expect(r.statistics.sheets?.value).toBe(2);
    expect(r.hidden.some((h) => /oculta|hidden/i.test(h.label))).toBe(true);
    expect(r.statistics.formulas?.value).toBeGreaterThanOrEqual(1);
  });
});
