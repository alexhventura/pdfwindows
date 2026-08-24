import { decodePdfName } from './fontNameNormalize';

const STANDARD_14 = new Set([
  'Times-Roman',
  'Times-Bold',
  'Times-Italic',
  'Times-BoldItalic',
  'Helvetica',
  'Helvetica-Bold',
  'Helvetica-Oblique',
  'Helvetica-BoldOblique',
  'Courier',
  'Courier-Bold',
  'Courier-Oblique',
  'Courier-BoldOblique',
  'Symbol',
  'ZapfDingbats',
]);

export interface PdfFontDict {
  objectRef?: string;
  subtype?: string;
  baseFont?: string;
  fontName?: string;
  encoding?: string;
  embedded: boolean | null;
  subset: boolean | null;
  hasToUnicode: boolean | null;
  cidSystemInfo?: string;
  descendantSubtype?: string;
}

function field(body: string, names: string[]): string | undefined {
  for (const name of names) {
    const re = new RegExp(`/${name}\\s*/([^\\s/\\[\\]<>()]+)`, 'i');
    const m = body.match(re);
    if (m?.[1]) return decodePdfName(m[1]);
  }
  return undefined;
}

function hasToken(body: string, token: string): boolean {
  return new RegExp(`/${token}\\b`).test(body);
}

/**
 * Extract font dictionaries from uncompressed PDF objects.
 * Object streams are left to pdf.js; this scan never invents names.
 */
export function parsePdfFontDictionaries(raw: string): PdfFontDict[] {
  const found: PdfFontDict[] = [];
  const seen = new Set<string>();
  const re = /(\d+)\s+(\d+)\s+obj\b([\s\S]*?)\bendobj\b/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(raw))) {
    const body = m[3];
    if (!/\/Type\s*\/Font\b/.test(body)) continue;
    if (/\/Type\s*\/FontDescriptor\b/.test(body)) continue;

    const baseFont = field(body, ['BaseFont']);
    const fontName = field(body, ['FontName']);
    const subtype = field(body, ['Subtype']);
    const encoding = field(body, ['Encoding']);
    const objectRef = `${m[1]} ${m[2]} R`;
    const subset = Boolean(
      (baseFont && /^[A-Z]{6}\+/.test(baseFont)) || (fontName && /^[A-Z]{6}\+/.test(fontName))
    );
    const hasFile = hasToken(body, 'FontFile') || hasToken(body, 'FontFile2') || hasToken(body, 'FontFile3');
    const hasToUnicode = hasToken(body, 'ToUnicode');
    const cid =
      body.match(/\/Registry\s*\(([^)]+)\)/)?.[1] ||
      body.match(/\/Ordering\s*\(([^)]+)\)/)?.[1] ||
      undefined;
    const descendantSubtype = /CIDFontType/i.test(body) ? body.match(/\/Subtype\s*\/(CIDFontType\d)/i)?.[1] : undefined;

    const key = `${objectRef}|${baseFont || ''}|${fontName || ''}|${subtype || ''}`;
    if (seen.has(key)) continue;
    seen.add(key);

    const standard14 = Boolean(baseFont && STANDARD_14.has(baseFont));
    found.push({
      objectRef,
      subtype,
      baseFont,
      fontName,
      encoding,
      embedded: hasFile ? true : standard14 ? false : null,
      subset: subset || null,
      hasToUnicode: hasToUnicode ? true : null,
      cidSystemInfo: cid,
      descendantSubtype,
    });
  }
  return found;
}

export function describePdfFontType(dict: PdfFontDict | undefined, jsType?: string): string | undefined {
  const raw = (jsType || dict?.descendantSubtype || dict?.subtype || '').trim();
  if (!raw) return undefined;
  const n = raw.replace(/\s+/g, '');
  if (/^Type0$/i.test(n)) return 'Type 0';
  if (/^Type1$/i.test(n) || /Type1C/i.test(n)) return 'Type 1';
  if (/^TrueType$/i.test(n) || /^CIDFontType2$/i.test(n)) return /CID/i.test(n) ? 'CIDFontType2' : 'TrueType';
  if (/^CIDFontType0$/i.test(n)) return 'CIDFontType0';
  if (/OpenType|OTTO/i.test(n)) return 'OpenType';
  if (/^Type3$/i.test(n)) return 'Type 3';
  if (/^MMType1$/i.test(n)) return 'Multiple Master Type 1';
  return raw;
}
