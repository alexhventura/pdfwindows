import JSZip from 'jszip';
import { PDFDocument, StandardFonts } from 'pdf-lib';
import { textToDocxBlob } from '../utils/textToDocx';
import { zipToDocxBlob } from '../utils/docxZip';
import { sanitizePdfText } from '../utils/pdfTextSanitizer';
import { sanitizeCsvCell } from '../utils/csvSecurity';

export type DocumentFamily =
  | 'word'
  | 'word-legacy'
  | 'pdf'
  | 'text'
  | 'spreadsheet'
  | 'web'
  | 'rtf'
  | 'opendocument'
  | 'unknown';

export type ConversionTargetId =
  | 'docx'
  | 'pdf'
  | 'rtf'
  | 'txt'
  | 'odt'
  | 'html'
  | 'htm'
  | 'xml'
  | 'jpeg'
  | 'png'
  | 'csv'
  | 'json';

export type ConversionGroupId = 'word' | 'universal' | 'web' | 'image' | 'data';

export interface ConversionTarget {
  id: ConversionTargetId;
  extension: string;
  group: ConversionGroupId;
}

export interface IdentifiedDocument {
  fileName: string;
  extension: string;
  family: DocumentFamily;
  convertible: boolean;
  unsupportedReason?: 'legacy-binary' | 'unknown';
}

export interface ConversionResult {
  blob: Blob;
  fileName: string;
}

const WORD_OOXML = new Set(['docx', 'dotx', 'docm', 'dotm']);
const WORD_LEGACY = new Set(['doc', 'dot']);
const SHEETS = new Set(['xlsx', 'xlsm', 'csv']);
const WEB = new Set(['html', 'htm']);

const MIME: Record<ConversionTargetId, string> = {
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  pdf: 'application/pdf',
  rtf: 'application/rtf',
  txt: 'text/plain;charset=utf-8',
  odt: 'application/vnd.oasis.opendocument.text',
  html: 'text/html;charset=utf-8',
  htm: 'text/html;charset=utf-8',
  xml: 'application/xml;charset=utf-8',
  jpeg: 'image/jpeg',
  png: 'image/png',
  csv: 'text/csv;charset=utf-8',
  json: 'application/json;charset=utf-8',
};

export const DOCUMENT_CONVERTER_EXTENSIONS = [
  'pdf',
  'txt',
  'docx',
  'dotx',
  'docm',
  'dotm',
  'doc',
  'dot',
  'rtf',
  'odt',
  'html',
  'htm',
  'xlsx',
  'xlsm',
  'csv',
] as const;

export function getFileExtension(name: string): string {
  return name.split('.').pop()?.toLowerCase() || '';
}

export function identifyDocument(file: File): IdentifiedDocument {
  const extension = getFileExtension(file.name);
  const fileName = file.name;
  if (WORD_OOXML.has(extension)) {
    return { fileName, extension, family: 'word', convertible: true };
  }
  if (WORD_LEGACY.has(extension)) {
    return { fileName, extension, family: 'word-legacy', convertible: false, unsupportedReason: 'legacy-binary' };
  }
  if (extension === 'pdf') return { fileName, extension, family: 'pdf', convertible: true };
  if (extension === 'txt') return { fileName, extension, family: 'text', convertible: true };
  if (SHEETS.has(extension)) return { fileName, extension, family: 'spreadsheet', convertible: true };
  if (WEB.has(extension)) return { fileName, extension, family: 'web', convertible: true };
  if (extension === 'rtf') return { fileName, extension, family: 'rtf', convertible: true };
  if (extension === 'odt') return { fileName, extension, family: 'opendocument', convertible: true };
  return { fileName, extension, family: 'unknown', convertible: false, unsupportedReason: 'unknown' };
}

export function listConversionTargets(identified: IdentifiedDocument): ConversionTarget[] {
  if (!identified.convertible) return [];
  const ext = identified.extension;
  const ids = new Set<ConversionTargetId>();

  const add = (...items: ConversionTargetId[]) => {
    for (const id of items) ids.add(id);
  };

  if (identified.family === 'word') {
    add('pdf', 'rtf', 'txt', 'odt', 'html', 'htm', 'xml', 'jpeg', 'png');
    if (ext !== 'docx') add('docx');
  } else if (identified.family === 'pdf') {
    add('txt', 'docx', 'rtf', 'odt', 'html', 'htm', 'xml', 'jpeg', 'png');
  } else if (identified.family === 'text') {
    add('pdf', 'docx', 'rtf', 'odt', 'html', 'htm', 'xml', 'jpeg', 'png');
  } else if (identified.family === 'spreadsheet') {
    add('json', 'html', 'htm', 'txt', 'pdf', 'xml', 'jpeg', 'png');
    if (ext !== 'csv') add('csv');
  } else if (identified.family === 'web') {
    add('txt', 'pdf', 'docx', 'rtf', 'odt', 'xml', 'jpeg', 'png');
    if (ext !== 'html') add('html');
    if (ext !== 'htm') add('htm');
  } else if (identified.family === 'rtf') {
    add('txt', 'pdf', 'docx', 'html', 'htm', 'odt', 'xml', 'jpeg', 'png');
  } else if (identified.family === 'opendocument') {
    add('txt', 'pdf', 'docx', 'rtf', 'html', 'htm', 'xml', 'jpeg', 'png');
  }

  ids.delete(ext as ConversionTargetId);

  const order: ConversionTargetId[] = [
    'docx',
    'pdf',
    'rtf',
    'txt',
    'odt',
    'html',
    'htm',
    'xml',
    'csv',
    'json',
    'jpeg',
    'png',
  ];
  const groupOf: Record<ConversionTargetId, ConversionGroupId> = {
    docx: 'word',
    pdf: 'universal',
    rtf: 'universal',
    txt: 'universal',
    odt: 'universal',
    html: 'web',
    htm: 'web',
    xml: 'image',
    jpeg: 'image',
    png: 'image',
    csv: 'data',
    json: 'data',
  };

  return order
    .filter((id) => ids.has(id))
    .map((id) => ({ id, extension: id, group: groupOf[id] }));
}

type TextPayload = { kind: 'text'; text: string; pdfFile?: File };
type TablePayload = { kind: 'table'; sheets: Array<{ name: string; rows: string[][] }>; pdfFile?: File };
type Payload = TextPayload | TablePayload;

function baseName(fileName: string): string {
  return fileName.replace(/\.[^.]+$/, '') || 'documento';
}

function decodeXmlEntities(xml: string): string {
  return xml
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, n) => String.fromCharCode(parseInt(n, 16)));
}

function stripXml(xml: string): string {
  return decodeXmlEntities(
    xml
      .replace(/<w:tab\s*\/>/g, '\t')
      .replace(/<w:br\s*\/>/g, '\n')
      .replace(/<\/w:p>/g, '\n')
      .replace(/<text:line-break\s*\/>/g, '\n')
      .replace(/<\/text:p>/g, '\n')
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<\/p>/gi, '\n')
      .replace(/<[^>]+>/g, '')
  )
    .replace(/\u00a0/g, ' ')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function escapeHtml(text: string): string {
  return escapeXml(text).replace(/'/g, '&#39;');
}

function htmlToText(html: string): string {
  return stripXml(
    html.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<style[\s\S]*?<\/style>/gi, '')
  );
}

function rtfToText(rtf: string): string {
  const withChars = rtf
    .replace(/\\'([0-9a-fA-F]{2})/g, (_, h) => String.fromCharCode(parseInt(h, 16)))
    .replace(/\\u(-?\d+)\??/g, (_, n) => {
      const code = Number(n);
      return String.fromCharCode(code < 0 ? code + 65536 : code);
    })
    .replace(/\\par[d]?/g, '\n')
    .replace(/\\tab/g, '\t')
    .replace(/\\[a-z]+-?\d* ?/gi, '')
    .replace(/[{}]/g, '');
  return withChars.replace(/[^\S\n]+/g, ' ').replace(/\n{3,}/g, '\n\n').trim();
}

function toRtf(text: string): string {
  let body = '';
  for (const ch of text) {
    const code = ch.codePointAt(0) ?? 0;
    if (ch === '\n') body += '\\par\n';
    else if (ch === '\\' || ch === '{' || ch === '}') body += `\\${ch}`;
    else if (code < 128) body += ch;
    else body += `\\u${code}?`;
  }
  return `{\\rtf1\\ansi\\deff0{\\fonttbl{\\f0 Times New Roman;}}\\f0\\fs22\n${body}\n}`;
}

function toHtmlDocument(title: string, bodyHtml: string): string {
  return `<!DOCTYPE html>
<html lang="pt">
<head>
<meta charset="utf-8"/>
<title>${escapeHtml(title)}</title>
</head>
<body>
${bodyHtml}
</body>
</html>
`;
}

function textToHtml(title: string, text: string): string {
  const paras = text
    .split(/\n/)
    .map((line) => `<p>${escapeHtml(line) || '&nbsp;'}</p>`)
    .join('\n');
  return toHtmlDocument(title, paras);
}

function tableToHtml(title: string, sheets: Array<{ name: string; rows: string[][] }>): string {
  const parts = sheets.map((sheet) => {
    const rows = sheet.rows
      .map(
        (row) =>
          `<tr>${row.map((cell) => `<td>${escapeHtml(cell)}</td>`).join('')}</tr>`
      )
      .join('\n');
    return `<h2>${escapeHtml(sheet.name)}</h2><table border="1" cellpadding="4" cellspacing="0">${rows}</table>`;
  });
  return toHtmlDocument(title, parts.join('\n'));
}

function tableToText(sheets: Array<{ name: string; rows: string[][] }>): string {
  return sheets
    .map((sheet) => {
      const body = sheet.rows.map((row) => row.join('\t')).join('\n');
      return sheets.length > 1 ? `${sheet.name}\n${body}` : body;
    })
    .join('\n\n');
}

function tableToCsv(sheets: Array<{ name: string; rows: string[][] }>): string {
  const sheet = sheets[0] ?? { name: 'Sheet1', rows: [] };
  return sheet.rows.map((row) => row.map((cell) => sanitizeCsvCell(cell)).join(',')).join('\n');
}

function tableToJson(sheets: Array<{ name: string; rows: string[][] }>): string {
  const payload = sheets.map((sheet) => {
    const [header, ...rest] = sheet.rows;
    if (!header || header.length === 0) return { name: sheet.name, rows: sheet.rows };
    const rows = rest.map((row) => {
      const obj: Record<string, string> = {};
      header.forEach((key, i) => {
        obj[key || `col${i + 1}`] = row[i] ?? '';
      });
      return obj;
    });
    return { name: sheet.name, rows };
  });
  return JSON.stringify(payload.length === 1 ? payload[0].rows : payload, null, 2);
}

function toXmlDocument(title: string, text: string): string {
  return `<?xml version="1.0" encoding="UTF-8"?>\n<document title="${escapeXml(title)}">\n<text>${escapeXml(text)}</text>\n</document>\n`;
}

async function textToPdfBlob(text: string): Promise<Blob> {
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const pageSize: [number, number] = [595, 842];
  const margin = 50;
  const size = 10;
  const lineHeight = 14;
  let page = pdfDoc.addPage(pageSize);
  let y = pageSize[1] - margin;

  const pushLine = (raw: string) => {
    const line = sanitizePdfText(raw).slice(0, 200);
    if (y < margin + lineHeight) {
      page = pdfDoc.addPage(pageSize);
      y = pageSize[1] - margin;
    }
    page.drawText(line || ' ', { x: margin, y, size, font });
    y -= lineHeight;
  };

  for (const sourceLine of text.split(/\r?\n/)) {
    if (!sourceLine) {
      pushLine(' ');
      continue;
    }
    const wrapped: string[] = [];
    let rest = sourceLine;
    while (rest.length > 90) {
      wrapped.push(rest.slice(0, 90));
      rest = rest.slice(90);
    }
    wrapped.push(rest);
    wrapped.forEach(pushLine);
  }

  const bytes = await pdfDoc.save();
  return new Blob([bytes], { type: MIME.pdf });
}

async function textToOdtBlob(text: string): Promise<Blob> {
  const paragraphs = text
    .split(/\n/)
    .map((line) => `<text:p>${escapeXml(line)}</text:p>`)
    .join('');
  const content = `<?xml version="1.0" encoding="UTF-8"?>
<office:document-content xmlns:office="urn:oasis:names:tc:opendocument:xmlns:office:1.0" xmlns:text="urn:oasis:names:tc:opendocument:xmlns:text:1.0" office:version="1.2">
  <office:body><office:text>${paragraphs}</office:text></office:body>
</office:document-content>`;
  const manifest = `<?xml version="1.0" encoding="UTF-8"?>
<manifest:manifest xmlns:manifest="urn:oasis:names:tc:opendocument:xmlns:manifest:1.0" manifest:version="1.2">
  <manifest:file-entry manifest:full-path="/" manifest:version="1.2" manifest:media-type="application/vnd.oasis.opendocument.text"/>
  <manifest:file-entry manifest:full-path="content.xml" manifest:media-type="text/xml"/>
</manifest:manifest>`;
  const zip = new JSZip();
  zip.file('mimetype', 'application/vnd.oasis.opendocument.text', { compression: 'STORE' });
  zip.file('content.xml', content);
  zip.file('META-INF/manifest.xml', manifest);
  return zip.generateAsync({
    type: 'blob',
    mimeType: MIME.odt,
    compression: 'DEFLATE',
  });
}

async function extractDocxText(file: File): Promise<string> {
  const zip = await JSZip.loadAsync(await file.arrayBuffer());
  const xml = await zip.file('word/document.xml')?.async('string');
  if (!xml) throw new Error('INVALID_DOCX');
  return stripXml(xml);
}

async function extractOdtText(file: File): Promise<string> {
  const zip = await JSZip.loadAsync(await file.arrayBuffer());
  const xml = await zip.file('content.xml')?.async('string');
  if (!xml) throw new Error('INVALID_ODT');
  return stripXml(xml);
}

async function extractPdfText(file: File): Promise<string> {
  const { loadPdfJS } = await import('../utils/pdfjsLoader');
  const {
    buildTextFromPdfContentItems,
  } = await import('../utils/pdfTextLayerParse');
  const pdfjsLib = await loadPdfJS();
  const data = new Uint8Array(await file.arrayBuffer()).slice();
  const pdf = await pdfjsLib.getDocument({ data }).promise;
  const blocks: string[] = [];
  try {
    const pages = Math.min(pdf.numPages, 80);
    for (let i = 1; i <= pages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const text = buildTextFromPdfContentItems(
        content.items as Parameters<typeof buildTextFromPdfContentItems>[0]
      );
      if (text.trim()) blocks.push(text.trim());
    }
  } finally {
    await pdf.destroy?.();
  }
  const joined = blocks.join('\n\n').trim();
  if (!joined) {
    throw new Error('PDF_NO_TEXT');
  }
  return joined;
}

function colLettersToIndex(letters: string): number {
  let n = 0;
  for (const ch of letters.toUpperCase()) {
    n = n * 26 + (ch.charCodeAt(0) - 64);
  }
  return n;
}

function parseSharedStrings(xml: string): string[] {
  const items = xml.match(/<si[\s\S]*?<\/si>/gi) || [];
  return items.map((si) =>
    decodeXmlEntities(
      [...si.matchAll(/<t[^>]*>([\s\S]*?)<\/t>/gi)].map((m) => m[1]).join('')
    )
  );
}

function parseSheetRows(xml: string, strings: string[]): string[][] {
  const grid = new Map<string, string>();
  let maxRow = 0;
  let maxCol = 0;
  const cellRe = /<c\b([^>]*)>([\s\S]*?)<\/c>|<c\b([^/][^>]*)\/>/gi;
  let m: RegExpExecArray | null;
  while ((m = cellRe.exec(xml))) {
    const attrs = m[1] || m[3] || '';
    const inner = m[2] || '';
    const ref = attrs.match(/\br="([A-Z]+\d+)"/i)?.[1];
    if (!ref) continue;
    const col = ref.match(/^[A-Z]+/i)?.[0] || 'A';
    const row = Number(ref.match(/\d+$/)?.[0] || '0');
    const type = attrs.match(/\bt="([^"]+)"/i)?.[1];
    let value = '';
    if (type === 's') {
      const idx = Number(inner.match(/<v[^>]*>([\s\S]*?)<\/v>/i)?.[1] ?? '');
      value = Number.isFinite(idx) ? strings[idx] ?? '' : '';
    } else if (type === 'inlineStr') {
      value = decodeXmlEntities(
        [...inner.matchAll(/<t[^>]*>([\s\S]*?)<\/t>/gi)].map((t) => t[1]).join('')
      );
    } else {
      value = decodeXmlEntities(inner.match(/<v[^>]*>([\s\S]*?)<\/v>/i)?.[1] ?? '');
    }
    grid.set(`${row}:${colLettersToIndex(col)}`, value);
    maxRow = Math.max(maxRow, row);
    maxCol = Math.max(maxCol, colLettersToIndex(col));
  }
  const rows: string[][] = [];
  for (let r = 1; r <= maxRow; r++) {
    const row: string[] = [];
    for (let c = 1; c <= maxCol; c++) {
      row.push(grid.get(`${r}:${c}`) ?? '');
    }
    rows.push(row);
  }
  return rows;
}

async function extractXlsxSheets(file: File): Promise<Array<{ name: string; rows: string[][] }>> {
  const zip = await JSZip.loadAsync(await file.arrayBuffer());
  const ssXml = (await zip.file('xl/sharedStrings.xml')?.async('string')) || '';
  const strings = ssXml ? parseSharedStrings(ssXml) : [];
  const workbook = (await zip.file('xl/workbook.xml')?.async('string')) || '';
  const rels = (await zip.file('xl/_rels/workbook.xml.rels')?.async('string')) || '';
  const ridToPath = new Map<string, string>();
  const relRe = /Id="([^"]+)"[^>]*Target="([^"]+)"|Target="([^"]+)"[^>]*Id="([^"]+)"/gi;
  let rm: RegExpExecArray | null;
  while ((rm = relRe.exec(rels))) {
    const id = rm[1] || rm[4];
    const target = rm[2] || rm[3];
    if (id && target) {
      const path = target.startsWith('/') ? target.slice(1) : `xl/${target.replace(/^\.\//, '')}`;
      ridToPath.set(id, path.replace(/\\/g, '/'));
    }
  }
  const sheets: Array<{ name: string; rows: string[][] }> = [];
  const sheetRe = /<sheet\b[^>]*>/gi;
  let sm: RegExpExecArray | null;
  while ((sm = sheetRe.exec(workbook))) {
    const tag = sm[0];
    const name = tag.match(/\bname="([^"]+)"/i)?.[1] || `Sheet${sheets.length + 1}`;
    const rId = tag.match(/\br:id="([^"]+)"/i)?.[1] || tag.match(/\bid="([^"]+)"/i)?.[1];
    const path = rId ? ridToPath.get(rId) : `xl/worksheets/sheet${sheets.length + 1}.xml`;
    const xml = path ? (await zip.file(path)?.async('string')) || '' : '';
    sheets.push({ name, rows: xml ? parseSheetRows(xml, strings) : [] });
  }
  if (sheets.length === 0) {
    const xml = (await zip.file('xl/worksheets/sheet1.xml')?.async('string')) || '';
    sheets.push({ name: 'Sheet1', rows: xml ? parseSheetRows(xml, strings) : [] });
  }
  return sheets;
}

function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = '';
  let quoted = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (quoted) {
      if (ch === '"') {
        if (text[i + 1] === '"') {
          cell += '"';
          i += 1;
        } else {
          quoted = false;
        }
      } else {
        cell += ch;
      }
      continue;
    }
    if (ch === '"') {
      quoted = true;
      continue;
    }
    if (ch === ',') {
      row.push(cell);
      cell = '';
      continue;
    }
    if (ch === '\n') {
      if (cell.endsWith('\r')) cell = cell.slice(0, -1);
      row.push(cell);
      rows.push(row);
      row = [];
      cell = '';
      continue;
    }
    cell += ch;
  }
  if (cell.length || row.length) {
    row.push(cell);
    rows.push(row);
  }
  return rows.filter((r) => r.some((c) => c.trim()));
}

async function ooxmlToStandardDocx(file: File): Promise<Blob> {
  const zip = await JSZip.loadAsync(await file.arrayBuffer());
  const remove = Object.keys(zip.files).filter((n) => /vbaProject|vbaData|macros/i.test(n));
  for (const path of remove) zip.remove(path);
  return zipToDocxBlob(zip);
}

async function parsePayload(file: File, identified: IdentifiedDocument): Promise<Payload> {
  if (identified.family === 'text') {
    return { kind: 'text', text: await file.text() };
  }
  if (identified.family === 'web') {
    return { kind: 'text', text: htmlToText(await file.text()) };
  }
  if (identified.family === 'rtf') {
    return { kind: 'text', text: rtfToText(await file.text()) };
  }
  if (identified.family === 'word') {
    return { kind: 'text', text: await extractDocxText(file) };
  }
  if (identified.family === 'opendocument') {
    return { kind: 'text', text: await extractOdtText(file) };
  }
  if (identified.family === 'pdf') {
    return { kind: 'text', text: await extractPdfText(file), pdfFile: file };
  }
  if (identified.family === 'spreadsheet') {
    if (identified.extension === 'csv') {
      return { kind: 'table', sheets: [{ name: 'Sheet1', rows: parseCsv(await file.text()) }] };
    }
    return { kind: 'table', sheets: await extractXlsxSheets(file) };
  }
  throw new Error('UNSUPPORTED');
}

async function pngBlobsToJpeg(blobs: Blob[]): Promise<Blob[]> {
  const out: Blob[] = [];
  for (const blob of blobs) {
    const url = URL.createObjectURL(blob);
    try {
      const bmp = await createImageBitmap(await blob);
      const canvas = new OffscreenCanvas(bmp.width, bmp.height);
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('NO_CANVAS');
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, bmp.width, bmp.height);
      ctx.drawImage(bmp, 0, 0);
      out.push(await canvas.convertToBlob({ type: 'image/jpeg', quality: 0.9 }));
      bmp.close();
    } catch {
      const imgBlob = await new Promise<Blob>((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.naturalWidth;
          canvas.height = img.naturalHeight;
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            reject(new Error('NO_CANVAS'));
            return;
          }
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0);
          canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('JPEG_FAIL'))), 'image/jpeg', 0.9);
        };
        img.onerror = () => reject(new Error('JPEG_FAIL'));
        img.src = url;
      });
      out.push(imgBlob);
    } finally {
      URL.revokeObjectURL(url);
    }
  }
  return out;
}

async function rasterizePdf(file: File, asJpeg: boolean): Promise<Blob[]> {
  const { renderPdfPagesToImages } = await import('../utils/converterEngine');
  const pngs = await renderPdfPagesToImages(file);
  if (!asJpeg) return pngs;
  return pngBlobsToJpeg(pngs);
}

async function zipBlobs(files: Array<{ name: string; blob: Blob }>): Promise<Blob> {
  const zip = new JSZip();
  for (const item of files) zip.file(item.name, item.blob);
  return zip.generateAsync({ type: 'blob', mimeType: 'application/zip' });
}

async function payloadToImages(payload: Payload, asJpeg: boolean, stem: string): Promise<ConversionResult> {
  const pdfBlob =
    payload.pdfFile ??
    (await textToPdfBlob(payload.kind === 'text' ? payload.text : tableToText(payload.sheets)));
  const pdfFile =
    payload.pdfFile ?? new File([pdfBlob], `${stem}.pdf`, { type: MIME.pdf });
  const images = await rasterizePdf(pdfFile, asJpeg);
  const ext = asJpeg ? 'jpg' : 'png';
  if (images.length === 1) {
    return { blob: images[0], fileName: `${stem}_page_1.${ext}` };
  }
  const zipped = await zipBlobs(
    images.map((blob, i) => ({ name: `${stem}_page_${i + 1}.${ext}`, blob }))
  );
  return { blob: zipped, fileName: `${stem}_pages.zip` };
}

export async function convertDocument(
  file: File,
  targetId: ConversionTargetId
): Promise<ConversionResult> {
  const identified = identifyDocument(file);
  if (!identified.convertible) {
    throw new Error(identified.unsupportedReason === 'legacy-binary' ? 'LEGACY_BINARY' : 'UNSUPPORTED');
  }
  const allowed = listConversionTargets(identified).some((t) => t.id === targetId);
  if (!allowed) throw new Error('INVALID_TARGET');

  const stem = baseName(file.name);

  if (targetId === 'docx' && identified.family === 'word' && identified.extension !== 'docx') {
    return { blob: await ooxmlToStandardDocx(file), fileName: `${stem}.docx` };
  }

  const payload = await parsePayload(file, identified);

  if (targetId === 'jpeg' || targetId === 'png') {
    return payloadToImages(payload, targetId === 'jpeg', stem);
  }

  if (payload.kind === 'table') {
    if (targetId === 'csv') {
      return { blob: new Blob([tableToCsv(payload.sheets)], { type: MIME.csv }), fileName: `${stem}.csv` };
    }
    if (targetId === 'json') {
      return { blob: new Blob([tableToJson(payload.sheets)], { type: MIME.json }), fileName: `${stem}.json` };
    }
    if (targetId === 'html' || targetId === 'htm') {
      return {
        blob: new Blob([tableToHtml(stem, payload.sheets)], { type: MIME[targetId] }),
        fileName: `${stem}.${targetId}`,
      };
    }
    const text = tableToText(payload.sheets);
    if (targetId === 'txt') return { blob: new Blob([text], { type: MIME.txt }), fileName: `${stem}.txt` };
    if (targetId === 'xml') return { blob: new Blob([toXmlDocument(stem, text)], { type: MIME.xml }), fileName: `${stem}.xml` };
    if (targetId === 'pdf') return { blob: await textToPdfBlob(text), fileName: `${stem}.pdf` };
    if (targetId === 'rtf') return { blob: new Blob([toRtf(text)], { type: MIME.rtf }), fileName: `${stem}.rtf` };
    if (targetId === 'odt') return { blob: await textToOdtBlob(text), fileName: `${stem}.odt` };
    if (targetId === 'docx') return { blob: await textToDocxBlob(text, stem), fileName: `${stem}.docx` };
  }

  const text = payload.kind === 'text' ? payload.text : tableToText(payload.sheets);
  if (targetId === 'txt') return { blob: new Blob([text], { type: MIME.txt }), fileName: `${stem}.txt` };
  if (targetId === 'xml') return { blob: new Blob([toXmlDocument(stem, text)], { type: MIME.xml }), fileName: `${stem}.xml` };
  if (targetId === 'html' || targetId === 'htm') {
    return {
      blob: new Blob([textToHtml(stem, text)], { type: MIME[targetId] }),
      fileName: `${stem}.${targetId}`,
    };
  }
  if (targetId === 'rtf') return { blob: new Blob([toRtf(text)], { type: MIME.rtf }), fileName: `${stem}.rtf` };
  if (targetId === 'pdf') return { blob: await textToPdfBlob(text), fileName: `${stem}.pdf` };
  if (targetId === 'odt') return { blob: await textToOdtBlob(text), fileName: `${stem}.odt` };
  if (targetId === 'docx') return { blob: await textToDocxBlob(text, stem), fileName: `${stem}.docx` };

  throw new Error('INVALID_TARGET');
}
