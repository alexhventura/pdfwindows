import JSZip from 'jszip';
import { convertDocument, extractPdfPages, extractPdfText, extractPptxText } from './documentConverter';
import { textToDocxBlob } from '../utils/textToDocx';
import { sanitizeCsvCell } from '../utils/csvSecurity';

function stem(name: string): string {
  return name.replace(/\.[^.]+$/, '') || 'document';
}

function xmlEscape(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export async function pdfToWord(file: File): Promise<{ blob: Blob; fileName: string }> {
  const pages = await extractPdfPages(file);
  const text = pages
    .map((page, i) => `--- Página ${i + 1} ---\n${page || ''}`)
    .join('\n\n');
  return { blob: await textToDocxBlob(text, stem(file.name)), fileName: `${stem(file.name)}.docx` };
}

export async function pdfToExcel(file: File): Promise<{ blob: Blob; fileName: string }> {
  const pages = await extractPdfPages(file);
  const rows: string[][] = [];
  pages.forEach((page, index) => {
    rows.push([`Pagina ${index + 1}`, '']);
    for (const line of page.split(/\n/)) {
      const cells = line.split(/\s{2,}|\t/).map((cell) => cell.trim()).filter(Boolean);
      rows.push(cells.length ? cells : [line]);
    }
    rows.push(['']);
  });
  return { blob: await rowsToXlsxBlob(rows, stem(file.name)), fileName: `${stem(file.name)}.xlsx` };
}

export async function rowsToXlsxBlob(rows: string[][], sheetName: string): Promise<Blob> {
  const maxCols = Math.max(1, ...rows.map((row) => row.length));
  const sheetRows = rows
    .map((row, r) => {
      const cells = Array.from({ length: maxCols }, (_, c) => {
        const value = sanitizeCsvCell(row[c] ?? '');
        const ref = `${colLetter(c + 1)}${r + 1}`;
        return `<c r="${ref}" t="inlineStr"><is><t xml:space="preserve">${xmlEscape(value)}</t></is></c>`;
      }).join('');
      return `<row r="${r + 1}">${cells}</row>`;
    })
    .join('');

  const zip = new JSZip();
  zip.file(
    '[Content_Types].xml',
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>
  <Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>
</Types>`
  );
  zip.file(
    '_rels/.rels',
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>
</Relationships>`
  );
  zip.file(
    'xl/workbook.xml',
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <sheets><sheet name="${xmlEscape(sheetName.slice(0, 31) || 'PDF')}" sheetId="1" r:id="rId1"/></sheets>
</workbook>`
  );
  zip.file(
    'xl/_rels/workbook.xml.rels',
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/>
</Relationships>`
  );
  zip.file(
    'xl/worksheets/sheet1.xml',
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><sheetData>${sheetRows}</sheetData></worksheet>`
  );
  return zip.generateAsync({
    type: 'blob',
    mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });
}

function colLetter(n: number): string {
  let out = '';
  let x = n;
  while (x > 0) {
    const rem = (x - 1) % 26;
    out = String.fromCharCode(65 + rem) + out;
    x = Math.floor((x - 1) / 26);
  }
  return out;
}

export async function buildPptxFromImages(
  images: Array<{ name: string; bytes: Uint8Array }>,
  title: string
): Promise<Blob> {
  if (images.length < 1) throw new Error('NO_PAGES');
  const zip = new JSZip();
  const slideOverrides = images
    .map(
      (_, i) =>
        `<Override PartName="/ppt/slides/slide${i + 1}.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slide+xml"/>`
    )
    .join('');
  const mediaDefaults = `<Default Extension="png" ContentType="image/png"/>`;
  zip.file(
    '[Content_Types].xml',
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  ${mediaDefaults}
  <Override PartName="/ppt/presentation.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml"/>
  ${slideOverrides}
</Types>`
  );
  zip.file(
    '_rels/.rels',
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="ppt/presentation.xml"/>
</Relationships>`
  );
  const slideIds = images
    .map((_, i) => `<p:sldId id="${256 + i}" r:id="rId${i + 1}"/>`)
    .join('');
  zip.file(
    'ppt/presentation.xml',
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:presentation xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main">
  <p:sldIdLst>${slideIds}</p:sldIdLst>
  <p:sldSz cx="12192000" cy="6858000"/>
</p:presentation>`
  );
  zip.file(
    'ppt/_rels/presentation.xml.rels',
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
${images.map((_, i) => `  <Relationship Id="rId${i + 1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide" Target="slides/slide${i + 1}.xml"/>`).join('\n')}
</Relationships>`
  );

  images.forEach((image, i) => {
    const n = i + 1;
    zip.file(`ppt/media/${image.name}`, image.bytes);
    zip.file(
      `ppt/slides/_rels/slide${n}.xml.rels`,
      `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="../media/${image.name}"/>
</Relationships>`
    );
    zip.file(
      `ppt/slides/slide${n}.xml`,
      `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:sld xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main">
  <p:cSld>
    <p:spTree>
      <p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr>
      <p:grpSpPr/>
      <p:pic>
        <p:nvPicPr><p:cNvPr id="2" name="${xmlEscape(title)}"/><p:cNvPicPr/><p:nvPr/></p:nvPicPr>
        <p:blipFill><a:blip r:embed="rId1"/><a:stretch><a:fillRect/></a:stretch></p:blipFill>
        <p:spPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="12192000" cy="6858000"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom></p:spPr>
      </p:pic>
    </p:spTree>
  </p:cSld>
</p:sld>`
    );
  });

  return zip.generateAsync({
    type: 'blob',
    mimeType: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  });
}

export async function pptxToPdf(file: File): Promise<{ blob: Blob; fileName: string }> {
  const text = await extractPptxText(file);
  const result = await convertDocument(new File([text], `${stem(file.name)}.txt`, { type: 'text/plain' }), 'pdf');
  return { blob: result.blob, fileName: `${stem(file.name)}.pdf` };
}

export async function officeToPdf(file: File): Promise<{ blob: Blob; fileName: string }> {
  const result = await convertDocument(file, 'pdf');
  return { blob: result.blob, fileName: result.fileName };
}

export async function htmlFileToPdf(file: File): Promise<{ blob: Blob; fileName: string }> {
  return officeToPdf(file);
}

export { extractPdfText, extractPptxText };
