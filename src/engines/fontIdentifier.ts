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

  type Agg = {
    family: string;
    weightStyle?: string;
    count: number;
    pages: Set<number>;
    sizes: number[];
    sample: string;
  };
  const usage = new Map<string, Agg>();
  const SAMPLE_MAX = 120;

  const pageLimit = Math.min(pdf.numPages, 40);
  for (let i = 1; i <= pageLimit; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    for (const item of content.items) {
      if (!('str' in item) || !item.str?.trim()) continue;
      const fontName = normalizeFontName(String((item as { fontName?: string }).fontName || 'Unknown'));
      const { family, weightStyle } = splitWeight(fontName);
      if (!family || family.toLowerCase() === 'unknown') continue;
      const size = Array.isArray((item as { transform?: number[] }).transform)
        ? Math.abs((item as { transform: number[] }).transform[0] || 0)
        : 0;
      const key = `${family.toLowerCase()}|${(weightStyle || '').toLowerCase()}`;
      const prev = usage.get(key) || {
        family,
        weightStyle,
        count: 0,
        pages: new Set<number>(),
        sizes: [],
        sample: '',
      };
      prev.count += item.str.length;
      prev.pages.add(i);
      if (size) prev.sizes.push(size);
      if (prev.sample.length < SAMPLE_MAX) {
        const piece = String(item.str).replace(/\s+/g, ' ').trim();
        if (piece && !prev.sample.includes(piece)) {
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

  if (usage.size > 0) {
    for (const agg of usage.values()) {
      const sampleText = agg.sample.trim() || undefined;
      if (!sampleText) continue;
      const avgSize = agg.sizes.length ? agg.sizes.reduce((a, b) => a + b, 0) / agg.sizes.length : undefined;
      const element = classifyElement(agg.family, avgSize);
      const exactEmbedded = embedded.some(
        (e) => splitWeight(normalizeFontName(e)).family.toLowerCase() === agg.family.toLowerCase()
      );
      const exactKnown = isKnownExact(agg.family) || exactEmbedded;

      if (exactKnown) {
        findings.push({
          element,
          primary: { name: agg.family, weightStyle: agg.weightStyle },
          alternatives: [],
          method: 'document',
          confidenceLabel: 'high',
          confidencePercent: 100,
          occurrences: agg.count,
          pages: [...agg.pages].sort((a, b) => a - b),
          sampleText,
        });
      } else {
        const alts = estimateAlternatives(agg.family);
        const best = alts[0];
        const primaryName = best && best.similarity! >= 70 ? best.name : agg.family;
        const sim =
          best && best.similarity! >= 70 ? best.similarity! : Math.max(55, similarityScore(agg.family, primaryName));
        findings.push({
          element,
          primary: { name: primaryName, weightStyle: agg.weightStyle, similarity: sim },
          alternatives: alts.filter((a) => a.name !== primaryName).slice(0, 3),
          method: 'similarity',
          confidenceLabel: 'estimated',
          confidencePercent: sim,
          occurrences: agg.count,
          pages: [...agg.pages].sort((a, b) => a - b),
          sampleText,
        });
      }
    }
  } else {
    // Embedded fonts only (no extractable text — e.g. scanned PDF)
    for (const name of embedded) {
      const { family, weightStyle } = splitWeight(name);
      findings.push({
        element: classifyElement(name),
        primary: { name: family, weightStyle },
        alternatives: [],
        method: 'document',
        confidenceLabel: 'high',
        confidencePercent: 100,
      });
    }
  }

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

function decodeXmlEntities(text: string): string {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, h) => String.fromCharCode(parseInt(h, 16)));
}

function isThemeOrJunkFont(name: string): boolean {
  const n = name.trim();
  if (!n || n.length < 2) return true;
  if (n.startsWith('+')) return true;
  if (/^(major|minor)(HAnsi|Ascii|Bidi|EastAsia)?$/i.test(n)) return true;
  if (/^theme/i.test(n)) return true;
  return false;
}

function appendSample(prev: string, piece: string, max = 120): string {
  const clean = decodeXmlEntities(piece).replace(/\s+/g, ' ').trim();
  if (!clean) return prev;
  if (prev.includes(clean)) return prev;
  return `${prev}${prev ? ' ' : ''}${clean}`.slice(0, max);
}

async function identifyDocxFonts(file: File): Promise<FontIdentifierResult> {
  const zip = await openDocxZip(file);
  const styles = (await readZipText(zip, 'word/styles.xml')) || '';
  const document = (await readZipText(zip, 'word/document.xml')) || '';

  if (!document) throw new Error('INVALID_DOCX');

  // Default run font from docDefaults / Normal style
  let defaultFont = 'Calibri';
  const defAscii = styles.match(
    /w:docDefaults[\s\S]*?w:rFonts[^>]*w:ascii="([^"]+)"/i
  );
  if (defAscii?.[1] && !isThemeOrJunkFont(defAscii[1])) {
    defaultFont = normalizeFontName(defAscii[1]);
  } else {
    const normal = styles.match(
      /w:style[^>]*w:styleId="Normal"[^>]*>[\s\S]*?w:rFonts[^>]*w:ascii="([^"]+)"/i
    );
    if (normal?.[1] && !isThemeOrJunkFont(normal[1])) {
      defaultFont = normalizeFontName(normal[1]);
    }
  }

  const styleFont = new Map<string, string>();
  const styleBlocks = styles.matchAll(/<w:style\b([^>]*)>([\s\S]*?)<\/w:style>/gi);
  for (const block of styleBlocks) {
    const id = block[1].match(/w:styleId="([^"]+)"/i)?.[1];
    const ascii = block[2].match(/w:rFonts[^>]*w:ascii="([^"]+)"/i)?.[1];
    if (!id || !ascii || isThemeOrJunkFont(ascii)) continue;
    styleFont.set(id, normalizeFontName(ascii));
  }

  type Agg = { count: number; sample: string; weightStyle?: string; rawName: string };
  const usage = new Map<string, Agg>();

  const paraRe = /<w:p\b[\s\S]*?<\/w:p>/gi;
  let paraMatch: RegExpExecArray | null;
  while ((paraMatch = paraRe.exec(document))) {
    const para = paraMatch[0];
    const styleId = para.match(/w:pStyle[^>]*w:val="([^"]+)"/i)?.[1];
    const paraFont = (styleId && styleFont.get(styleId)) || defaultFont;

    const runRe = /<w:r\b[\s\S]*?<\/w:r>/gi;
    let runMatch: RegExpExecArray | null;
    while ((runMatch = runRe.exec(para))) {
      const run = runMatch[0];
      const texts = [...run.matchAll(/<w:t\b[^>]*>([\s\S]*?)<\/w:t>/gi)].map((m) => m[1]);
      const text = texts.join('');
      if (!text.replace(/\s+/g, '').length) continue;

      const ascii = run.match(/w:rFonts[^>]*w:ascii="([^"]+)"/i)?.[1];
      const hAnsi = run.match(/w:rFonts[^>]*w:hAnsi="([^"]+)"/i)?.[1];
      const rawFont = ascii || hAnsi || paraFont;
      if (isThemeOrJunkFont(rawFont)) continue;

      const normalized = normalizeFontName(rawFont);
      const { family, weightStyle } = splitWeight(normalized);
      if (isThemeOrJunkFont(family)) continue;

      const key = `${family.toLowerCase()}|${(weightStyle || '').toLowerCase()}`;
      const prev = usage.get(key) || { count: 0, sample: '', weightStyle, rawName: family };
      prev.count += text.replace(/\s+/g, '').length || text.length;
      prev.sample = appendSample(prev.sample, text);
      if (weightStyle && !prev.weightStyle) prev.weightStyle = weightStyle;
      usage.set(key, prev);
    }
  }

  // Fallback: if no runs resolved, scrape any rFonts+nearby text once
  if (usage.size === 0) {
    const runRe = /<w:r\b[\s\S]*?<\/w:r>/gi;
    let runMatch: RegExpExecArray | null;
    while ((runMatch = runRe.exec(document))) {
      const run = runMatch[0];
      const fontM = run.match(/w:(?:ascii|hAnsi)="([^"]+)"/i);
      const texts = [...run.matchAll(/<w:t\b[^>]*>([\s\S]*?)<\/w:t>/gi)].map((m) => m[1]);
      const text = texts.join('');
      if (!text.trim()) continue;
      const raw = fontM?.[1] || defaultFont;
      if (isThemeOrJunkFont(raw)) continue;
      const { family, weightStyle } = splitWeight(normalizeFontName(raw));
      const key = `${family.toLowerCase()}|${(weightStyle || '').toLowerCase()}`;
      const prev = usage.get(key) || { count: 0, sample: '', weightStyle, rawName: family };
      prev.count += text.length;
      prev.sample = appendSample(prev.sample, text);
      usage.set(key, prev);
    }
  }

  const findings: FontFinding[] = [];
  for (const [, agg] of usage) {
    const family = agg.rawName;
    const sampleText = agg.sample.trim() || undefined;
    if (!sampleText) continue;

    const element = classifyElement(family);
    if (isKnownExact(family)) {
      findings.push({
        element,
        primary: { name: family, weightStyle: agg.weightStyle },
        alternatives: [],
        method: 'document',
        confidenceLabel: 'high',
        confidencePercent: 100,
        occurrences: agg.count,
        sampleText,
      });
    } else {
      const alts = estimateAlternatives(family);
      const best = alts[0];
      const sim = best?.similarity ?? 60;
      findings.push({
        element,
        primary: {
          name: best && sim >= 70 ? best.name : family,
          weightStyle: agg.weightStyle,
          similarity: sim,
        },
        alternatives: alts.filter((a) => a.name !== (best && sim >= 70 ? best.name : family)).slice(0, 3),
        method: best && sim >= 70 ? 'similarity' : 'document',
        confidenceLabel: best && sim >= 70 ? 'estimated' : 'high',
        confidencePercent: best && sim >= 70 ? sim : 100,
        occurrences: agg.count,
        sampleText,
      });
    }
  }

  // Prefer known families as document-identified when we have real samples
  for (const f of findings) {
    if (f.sampleText && isKnownExact(f.primary.name)) {
      f.method = 'document';
      f.confidenceLabel = 'high';
      f.confidencePercent = 100;
      f.alternatives = [];
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
