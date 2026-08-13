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
  'Calibri Light',
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

type ThemeFontMap = {
  major: string;
  minor: string;
};

function parseThemeFonts(themeXml: string): ThemeFontMap {
  const major =
    themeXml.match(/<a:majorFont\b[\s\S]*?<a:latin\b[^>]*typeface="([^"]+)"/i)?.[1] || 'Calibri Light';
  const minor =
    themeXml.match(/<a:minorFont\b[\s\S]*?<a:latin\b[^>]*typeface="([^"]+)"/i)?.[1] || 'Calibri';
  return {
    major: normalizeFontName(major),
    minor: normalizeFontName(minor),
  };
}

function resolveThemeSlot(slot: string | undefined, theme: ThemeFontMap): string | null {
  if (!slot) return null;
  const s = slot.toLowerCase();
  if (s.startsWith('major')) return theme.major;
  if (s.startsWith('minor')) return theme.minor;
  return null;
}

/** Resolve a concrete font from a w:rFonts opening tag (self-closing or not). */
function fontFromRFontsTag(tag: string, theme: ThemeFontMap): string | null {
  const ascii = tag.match(/\bw:ascii="([^"]+)"/i)?.[1];
  if (ascii && !isThemeOrJunkFont(ascii)) return normalizeFontName(ascii);
  const hAnsi = tag.match(/\bw:hAnsi="([^"]+)"/i)?.[1];
  if (hAnsi && !isThemeOrJunkFont(hAnsi)) return normalizeFontName(hAnsi);
  const asciiTheme = tag.match(/\bw:asciiTheme="([^"]+)"/i)?.[1];
  const fromAsciiTheme = resolveThemeSlot(asciiTheme, theme);
  if (fromAsciiTheme) return fromAsciiTheme;
  const hAnsiTheme = tag.match(/\bw:hAnsiTheme="([^"]+)"/i)?.[1];
  return resolveThemeSlot(hAnsiTheme, theme);
}

function firstRFontsIn(xml: string, theme: ThemeFontMap): string | null {
  const m = xml.match(/<w:rFonts\b[^>]*\/?>/i);
  return m ? fontFromRFontsTag(m[0], theme) : null;
}

type StyleNode = {
  basedOn?: string;
  font?: string;
  name?: string;
};

function parseStyleGraph(stylesXml: string, theme: ThemeFontMap): {
  styles: Map<string, StyleNode>;
  defaultFont: string;
} {
  const styles = new Map<string, StyleNode>();
  const styleBlocks = stylesXml.matchAll(/<w:style\b([^>]*)>([\s\S]*?)<\/w:style>/gi);
  for (const block of styleBlocks) {
    const id = block[1].match(/w:styleId="([^"]+)"/i)?.[1];
    if (!id) continue;
    const basedOn = block[2].match(/<w:basedOn\b[^>]*w:val="([^"]+)"/i)?.[1];
    const name = block[2].match(/<w:name\b[^>]*w:val="([^"]+)"/i)?.[1];
    const font = firstRFontsIn(block[2], theme) || undefined;
    styles.set(id, { basedOn, font, name });
  }

  let defaultFont =
    firstRFontsIn(stylesXml.match(/<w:docDefaults\b[\s\S]*?<\/w:docDefaults>/i)?.[0] || '', theme) ||
    null;
  if (!defaultFont) {
    defaultFont = resolveStyleFont('Normal', styles, theme, new Set()) || theme.minor;
  }

  return { styles, defaultFont };
}

function resolveStyleFont(
  styleId: string | undefined,
  styles: Map<string, StyleNode>,
  theme: ThemeFontMap,
  seen: Set<string>
): string | null {
  if (!styleId || seen.has(styleId)) return null;
  seen.add(styleId);
  const node = styles.get(styleId);
  if (!node) return null;
  if (node.font) return node.font;
  return resolveStyleFont(node.basedOn, styles, theme, seen);
}

function classifyDocxElement(styleId: string | undefined, styleName: string | undefined): string {
  const blob = `${styleId || ''} ${styleName || ''}`.toLowerCase();
  if (/title|heading\s*1|t[ií]tulo/.test(blob)) return 'title';
  if (/heading|subtitle|subt[ií]tulo/.test(blob)) return 'subtitle';
  if (/header|cabe[cç]alho/.test(blob)) return 'header';
  if (/footer|rodap[eé]/.test(blob)) return 'footer';
  if (/caption|legenda/.test(blob)) return 'caption';
  return 'body';
}

function recordUsage(
  usage: Map<string, { count: number; sample: string; weightStyle?: string; rawName: string; element: string; elementCounts: Record<string, number> }>,
  rawFont: string,
  text: string,
  element: string
) {
  if (isThemeOrJunkFont(rawFont)) return;
  const normalized = normalizeFontName(rawFont);
  // Keep "Calibri Light" as its own family — it is a distinct face, not a weight of Calibri.
  let family = normalized;
  let weightStyle: string | undefined;
  if (!/^calibri light$/i.test(normalized)) {
    ({ family, weightStyle } = splitWeight(normalized));
  }
  if (isThemeOrJunkFont(family)) return;

  const key = `${family.toLowerCase()}|${(weightStyle || '').toLowerCase()}`;
  const chars = text.replace(/\s+/g, '').length || text.length;
  const prev = usage.get(key) || {
    count: 0,
    sample: '',
    weightStyle,
    rawName: family,
    element,
    elementCounts: {},
  };
  prev.count += chars;
  prev.sample = appendSample(prev.sample, text);
  if (weightStyle && !prev.weightStyle) prev.weightStyle = weightStyle;
  prev.elementCounts[element] = (prev.elementCounts[element] || 0) + chars;
  prev.element = Object.entries(prev.elementCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || element;
  usage.set(key, prev);
}

function collectFontsFromXml(
  xml: string,
  styles: Map<string, StyleNode>,
  theme: ThemeFontMap,
  defaultFont: string,
  usage: Map<
    string,
    { count: number; sample: string; weightStyle?: string; rawName: string; element: string; elementCounts: Record<string, number> }
  >
) {
  const paraRe = /<w:p\b[\s\S]*?<\/w:p>/gi;
  let paraMatch: RegExpExecArray | null;
  while ((paraMatch = paraRe.exec(xml))) {
    const para = paraMatch[0];
    const pPr = para.match(/<w:pPr\b[\s\S]*?<\/w:pPr>/i)?.[0] || '';
    const styleId = pPr.match(/w:pStyle[^>]*w:val="([^"]+)"/i)?.[1];
    const styleName = styleId ? styles.get(styleId)?.name : undefined;
    const element = classifyDocxElement(styleId, styleName);

    const paraMarkFont = firstRFontsIn(pPr, theme);
    const styleFont = resolveStyleFont(styleId, styles, theme, new Set());
    const paraFont = paraMarkFont || styleFont || defaultFont;

    const runRe = /<w:r\b[\s\S]*?<\/w:r>/gi;
    let runMatch: RegExpExecArray | null;
    while ((runMatch = runRe.exec(para))) {
      const run = runMatch[0];
      const texts = [...run.matchAll(/<w:t\b[^>]*>([\s\S]*?)<\/w:t>/gi)].map((m) => m[1]);
      const text = texts.join('');
      if (!text.replace(/\s+/g, '').length) continue;

      const rPr = run.match(/<w:rPr\b[\s\S]*?<\/w:rPr>/i)?.[0] || '';
      const runFont = firstRFontsIn(rPr, theme);
      const rStyleId = rPr.match(/w:rStyle[^>]*w:val="([^"]+)"/i)?.[1];
      const charStyleFont = resolveStyleFont(rStyleId, styles, theme, new Set());
      const rawFont = runFont || charStyleFont || paraFont;
      recordUsage(usage, rawFont, text, element);
    }
  }
}

async function identifyDocxFonts(file: File): Promise<FontIdentifierResult> {
  const zip = await openDocxZip(file);
  const stylesXml = (await readZipText(zip, 'word/styles.xml')) || '';
  const document = (await readZipText(zip, 'word/document.xml')) || '';
  const themeXml =
    (await readZipText(zip, 'word/theme/theme1.xml')) ||
    (await readZipText(zip, 'word/theme/theme.xml')) ||
    '';

  if (!document) throw new Error('INVALID_DOCX');

  const theme = parseThemeFonts(themeXml);
  const { styles, defaultFont } = parseStyleGraph(stylesXml, theme);

  type Agg = {
    count: number;
    sample: string;
    weightStyle?: string;
    rawName: string;
    element: string;
    elementCounts: Record<string, number>;
  };
  const usage = new Map<string, Agg>();

  collectFontsFromXml(document, styles, theme, defaultFont, usage);

  // Headers / footers often use distinct faces (and were previously missed).
  for (const path of Object.keys(zip.files)) {
    if (!/^word\/(header|footer)\d*\.xml$/i.test(path)) continue;
    const part = await readZipText(zip, path);
    if (part) collectFontsFromXml(part, styles, theme, defaultFont, usage);
  }

  const findings: FontFinding[] = [];
  for (const agg of usage.values()) {
    const family = agg.rawName;
    const sampleText = agg.sample.trim() || undefined;
    if (!sampleText) continue;

    const alts = isKnownExact(family) ? [] : estimateAlternatives(family);
    findings.push({
      element: agg.element,
      primary: { name: family, weightStyle: agg.weightStyle },
      alternatives: alts.slice(0, 3),
      method: 'document',
      confidenceLabel: 'high',
      confidencePercent: 100,
      occurrences: agg.count,
      sampleText,
    });
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
