import { PDFDocument } from 'pdf-lib';
import { loadPdfJS } from '../utils/pdfjsLoader';
import { looksLikePdf, openDocxZip, readZipText } from '../utils/docxZip';

export type FontMethod = 'document' | 'similarity';
export type FontConfidenceLabel = 'high' | 'estimated';

export interface FontMatch {
  name: string;
  weightStyle?: string;
  similarity?: number;
}

export interface FontFinding {
  element: string;
  primary: FontMatch;
  alternatives: FontMatch[];
  method: FontMethod;
  confidenceLabel: FontConfidenceLabel;
  confidencePercent: number;
  occurrences?: number;
  pages?: number[];
  /** Short text excerpt from the document that used this font. */
  sampleText?: string;
}

export interface FontIdentifierResult {
  format: 'pdf' | 'docx';
  findings: FontFinding[];
  notes: string[];
}

const KNOWN_FAMILIES = [
  'Arial',
  'Helvetica',
  'Times New Roman',
  'Times',
  'Courier New',
  'Courier',
  'Verdana',
  'Georgia',
  'Tahoma',
  'Calibri',
  'Cambria',
  'Garamond',
  'Palatino',
  'Trebuchet MS',
  'Comic Sans MS',
  'Impact',
  'Montserrat',
  'Poppins',
  'Open Sans',
  'Roboto',
  'Lato',
  'Nunito',
  'Inter',
  'Source Sans Pro',
  'Ubuntu',
  'Noto Sans',
  'Segoe UI',
  'Candara',
  'Constantia',
  'Corbel',
  'Book Antiqua',
  'Century Gothic',
  'Franklin Gothic',
  'Lucida Sans',
  'Lucida Console',
  'MS Gothic',
  'SimSun',
  'DejaVu Sans',
  'Liberation Sans',
  'Carlito',
  'FreeSans',
] as const;

function stripSubsetPrefix(name: string): string {
  return name.replace(/^[A-Z]{6}\+/, '').trim();
}

function normalizeFontName(raw: string): string {
  let n = stripSubsetPrefix(raw);
  n = n.replace(/[,].*$/, '').replace(/#20/gi, ' ').replace(/_/g, ' ');
  n = n.replace(/(Bold|Italic|Oblique|Regular|Medium|Light|SemiBold|Black|Thin)/gi, ' $1');
  return n.replace(/\s+/g, ' ').trim();
}

function splitWeight(name: string): { family: string; weightStyle?: string } {
  const m = name.match(
    /^(.*?)\s+(Thin|Light|Regular|Medium|SemiBold|Semi Bold|Bold|Black|Italic|Oblique|BoldItalic|Bold Oblique)$/i
  );
  if (m) return { family: m[1].trim(), weightStyle: m[2].replace(/\s+/g, '') };
  if (/bold/i.test(name) && /italic|oblique/i.test(name)) {
    return { family: name.replace(/\s*(bold|italic|oblique)/gi, '').trim() || name, weightStyle: 'BoldItalic' };
  }
  if (/bold/i.test(name)) {
    return { family: name.replace(/\s*bold/gi, '').trim() || name, weightStyle: 'Bold' };
  }
  if (/italic|oblique/i.test(name)) {
    return { family: name.replace(/\s*(italic|oblique)/gi, '').trim() || name, weightStyle: 'Italic' };
  }
  return { family: name };
}

function levenshtein(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  const dp = Array.from({ length: m + 1 }, () => new Array<number>(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost);
    }
  }
  return dp[m][n];
}

function similarityScore(a: string, b: string): number {
  const x = a.toLowerCase();
  const y = b.toLowerCase();
  if (x === y) return 100;
  if (x.includes(y) || y.includes(x)) return 92;
  const maxLen = Math.max(x.length, y.length) || 1;
  const dist = levenshtein(x, y);
  return Math.max(0, Math.round((1 - dist / maxLen) * 100));
}

function estimateAlternatives(family: string): FontMatch[] {
  const scored = KNOWN_FAMILIES.map((f) => ({
    name: f,
    similarity: similarityScore(family, f),
  }))
    .filter((s) => s.similarity < 100)
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, 4);
  return scored;
}

function isKnownExact(family: string): boolean {
  const lower = family.toLowerCase();
  return KNOWN_FAMILIES.some((f) => f.toLowerCase() === lower);
}

function classifyElement(fontName: string, sizeHint?: number): string {
  const n = fontName.toLowerCase();
  if (sizeHint && sizeHint >= 18) return 'title';
  if (sizeHint && sizeHint >= 13) return 'subtitle';
  if (/header|heading|title|titulo/i.test(n)) return 'title';
  if (/footer|rodape|rodapé/i.test(n)) return 'footer';
  if (/caption|legenda/i.test(n)) return 'caption';
  return 'body';
}

function extractPdfBaseFonts(raw: string): string[] {
  const names = new Set<string>();
  const re = /\/(?:BaseFont|FontName)\s*\/([^\s[/]+)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(raw))) {
    const cleaned = normalizeFontName(decodePdfName(m[1]));
    if (cleaned && cleaned.length > 1) names.add(cleaned);
  }
  return [...names];
}

function decodePdfName(name: string): string {
  return name.replace(/#([0-9A-Fa-f]{2})/g, (_, h) => String.fromCharCode(parseInt(h, 16)));
}

async function identifyPdfFonts(file: File): Promise<FontIdentifierResult> {
  const buffer = await file.arrayBuffer();
  if (!looksLikePdf(buffer)) throw new Error('INVALID_PDF');

  const raw = new TextDecoder('latin1').decode(new Uint8Array(buffer).slice(0, Math.min(buffer.byteLength, 2_500_000)));
  const embedded = extractPdfBaseFonts(raw);

  const pdfjs = await loadPdfJS();
  const pdf = await pdfjs.getDocument({ data: buffer.slice(0) }).promise;

  type Agg = { count: number; pages: Set<number>; sizes: number[]; sample: string };
  const usage = new Map<string, Agg>();
  const SAMPLE_MAX = 96;

  const pageLimit = Math.min(pdf.numPages, 40);
  for (let i = 1; i <= pageLimit; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    for (const item of content.items) {
      if (!('str' in item) || !item.str?.trim()) continue;
      const fontName = normalizeFontName(String((item as { fontName?: string }).fontName || 'Unknown'));
      const size = Array.isArray((item as { transform?: number[] }).transform)
        ? Math.abs((item as { transform: number[] }).transform[0] || 0)
        : 0;
      const key = fontName;
      const prev = usage.get(key) || { count: 0, pages: new Set<number>(), sizes: [], sample: '' };
      prev.count += item.str.length;
      prev.pages.add(i);
      if (size) prev.sizes.push(size);
      if (prev.sample.length < SAMPLE_MAX) {
        const piece = String(item.str).replace(/\s+/g, ' ').trim();
        if (piece) {
          prev.sample = `${prev.sample}${prev.sample ? ' ' : ''}${piece}`.slice(0, SAMPLE_MAX);
        }
      }
      usage.set(key, prev);
    }
  }

  const findings: FontFinding[] = [];
  const notes: string[] = [];

  if (embedded.length === 0 && usage.size === 0) {
    notes.push('no-fonts');
    return { format: 'pdf', findings: [], notes };
  }

  const usedNames = usage.size > 0 ? [...usage.keys()] : embedded;

  for (const name of usedNames) {
    const { family, weightStyle } = splitWeight(name);
    const agg = usage.get(name);
    const avgSize =
      agg && agg.sizes.length ? agg.sizes.reduce((a, b) => a + b, 0) / agg.sizes.length : undefined;
    const element = classifyElement(name, avgSize);

    const exactEmbedded = embedded.some(
      (e) => normalizeFontName(e).toLowerCase() === name.toLowerCase() || splitWeight(e).family.toLowerCase() === family.toLowerCase()
    );
    const exactKnown = isKnownExact(family) || exactEmbedded;

    if (exactKnown || exactEmbedded) {
      findings.push({
        element,
        primary: { name: family, weightStyle },
        alternatives: [],
        method: 'document',
        confidenceLabel: 'high',
        confidencePercent: 100,
        occurrences: agg?.count,
        pages: agg ? [...agg.pages].sort((a, b) => a - b) : undefined,
        sampleText: agg?.sample?.trim() || undefined,
      });
    } else {
      const alts = estimateAlternatives(family);
      const best = alts[0];
      const primaryName = best && best.similarity! >= 70 ? best.name : family;
      const sim = best && best.similarity! >= 70 ? best.similarity! : Math.max(55, similarityScore(family, primaryName));
      findings.push({
        element,
        primary: {
          name: primaryName,
          weightStyle,
          similarity: sim,
        },
        alternatives: alts.filter((a) => a.name !== primaryName).slice(0, 3),
        method: 'similarity',
        confidenceLabel: 'estimated',
        confidencePercent: sim,
        occurrences: agg?.count,
        pages: agg ? [...agg.pages].sort((a, b) => a - b) : undefined,
        sampleText: agg?.sample?.trim() || undefined,
      });
    }
  }

  // Deduplicate by element+family keeping highest confidence
  const dedup = new Map<string, FontFinding>();
  for (const f of findings) {
    const key = `${f.element}|${f.primary.name}|${f.primary.weightStyle || ''}`;
    const prev = dedup.get(key);
    if (!prev || f.confidencePercent > prev.confidencePercent) dedup.set(key, f);
    else if (prev && !prev.sampleText && f.sampleText) dedup.set(key, { ...prev, sampleText: f.sampleText });
  }

  const sorted = [...dedup.values()].sort((a, b) => {
    if (b.confidencePercent !== a.confidencePercent) return b.confidencePercent - a.confidencePercent;
    return (b.occurrences || 0) - (a.occurrences || 0);
  });

  return { format: 'pdf', findings: sorted, notes };
}

function extractXmlAttrFonts(xml: string): string[] {
  const names = new Set<string>();
  const re = /w:(?:ascii|hAnsi|eastAsia|cs)="([^"]+)"/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(xml))) {
    const cleaned = normalizeFontName(m[1]);
    if (cleaned) names.add(cleaned);
  }
  const nameRe = /w:name="([^"]+)"/g;
  while ((m = nameRe.exec(xml))) {
    const cleaned = normalizeFontName(m[1]);
    if (cleaned && !cleaned.includes('/')) names.add(cleaned);
  }
  return [...names];
}

async function identifyDocxFonts(file: File): Promise<FontIdentifierResult> {
  const zip = await openDocxZip(file);
  const fontTable = (await readZipText(zip, 'word/fontTable.xml')) || '';
  const styles = (await readZipText(zip, 'word/styles.xml')) || '';
  const document = (await readZipText(zip, 'word/document.xml')) || '';

  if (!document) throw new Error('INVALID_DOCX');

  const tableFonts = extractXmlAttrFonts(fontTable);
  const styleFonts = extractXmlAttrFonts(styles);
  const bodyFonts = extractXmlAttrFonts(document);
  const all = [...new Set([...tableFonts, ...styleFonts, ...bodyFonts])];

  const samples = new Map<string, string>();
  const runRe = /<w:r\b[\s\S]*?<\/w:r>/gi;
  let runMatch: RegExpExecArray | null;
  while ((runMatch = runRe.exec(document))) {
    const run = runMatch[0];
    const fontM = run.match(/w:(?:ascii|hAnsi)="([^"]+)"/i);
    const texts = [...run.matchAll(/<w:t\b[^>]*>([^<]*)<\/w:t>/gi)].map((m) => m[1]);
    const text = texts.join('').replace(/\s+/g, ' ').trim();
    if (!fontM || !text) continue;
    const family = splitWeight(normalizeFontName(fontM[1])).family.toLowerCase();
    const prev = samples.get(family) || '';
    if (prev.length < 96) samples.set(family, `${prev}${prev ? ' ' : ''}${text}`.slice(0, 96));
  }

  const findings: FontFinding[] = [];
  for (const name of all) {
    const { family, weightStyle } = splitWeight(name);
    const fromTable = tableFonts.some((t) => splitWeight(t).family.toLowerCase() === family.toLowerCase());
    const element =
      /heading|titulo|title|heading/i.test(name) || (styleFonts.includes(name) && /Heading/i.test(styles))
        ? classifyElement(name, 16)
        : 'body';
    const sampleText = samples.get(family.toLowerCase());

    if (fromTable || isKnownExact(family)) {
      findings.push({
        element: fromTable && styleFonts.length ? element : classifyElement(name),
        primary: { name: family, weightStyle },
        alternatives: [],
        method: 'document',
        confidenceLabel: 'high',
        confidencePercent: 100,
        sampleText,
      });
    } else {
      const alts = estimateAlternatives(family);
      const best = alts[0];
      const sim = best?.similarity ?? 60;
      findings.push({
        element: classifyElement(name),
        primary: { name: best && sim >= 70 ? best.name : family, weightStyle, similarity: sim },
        alternatives: alts.slice(1, 4),
        method: 'similarity',
        confidenceLabel: 'estimated',
        confidencePercent: sim,
        sampleText,
      });
    }
  }

  findings.sort((a, b) => {
    if (b.confidencePercent !== a.confidencePercent) return b.confidencePercent - a.confidencePercent;
    return (b.occurrences || 0) - (a.occurrences || 0);
  });

  return {
    format: 'docx',
    findings,
    notes: findings.length === 0 ? ['no-fonts'] : [],
  };
}

export async function identifyDocumentFonts(file: File): Promise<FontIdentifierResult> {
  const ext = file.name.split('.').pop()?.toLowerCase();
  if (ext === 'pdf' || file.type === 'application/pdf') {
    return identifyPdfFonts(file);
  }
  if (ext === 'docx' || file.type.includes('wordprocessingml')) {
    return identifyDocxFonts(file);
  }
  // sniff
  const buf = await file.slice(0, 8).arrayBuffer();
  if (looksLikePdf(buf)) return identifyPdfFonts(file);
  return identifyDocxFonts(file);
}

/** Soft check used by UI; does not mutate files. */
export async function assertPdfReadable(file: File): Promise<void> {
  const buf = await file.arrayBuffer();
  if (!looksLikePdf(buf)) throw new Error('INVALID_PDF');
  try {
    await PDFDocument.load(buf, { ignoreEncryption: true });
  } catch {
    // may still be readable by pdf.js
  }
}
