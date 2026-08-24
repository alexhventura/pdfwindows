import { PDFDocument } from 'pdf-lib';
import { loadPdfJS } from '../utils/pdfjsLoader';
import { looksLikePdf, openDocxZip, readZipText } from '../utils/docxZip';
import {
  analyzeFontTechnicalName,
  classifyElement,
  estimateFamilyAlternatives,
  formatPageRanges,
  isInternalFontId,
  isKnownExact,
  isUnreliableSampleText,
} from './fontNameNormalize';
import { describePdfFontType, parsePdfFontDictionaries, type PdfFontDict } from './pdfFontScan';

export type FontMethod = 'document' | 'similarity' | 'unknown';
export type FontConfidenceLabel = 'confirmed' | 'high' | 'good' | 'possible' | 'low' | 'none' | 'estimated';

export interface FontMatch {
  name: string;
  weightStyle?: string;
  similarity?: number;
}

export interface FontTechnicalInfo {
  internalName?: string;
  postScriptName?: string;
  baseFont?: string;
  fontName?: string;
  pdfType?: string;
  subtype?: string;
  encoding?: string;
  embedded?: boolean | null;
  subset?: boolean | null;
  hasToUnicode?: boolean | null;
  cidSystemInfo?: string;
  objectRef?: string;
}

export interface FontFinding {
  element: string;
  primary: FontMatch;
  /** False when we only have an internal PDF/pdf.js id — never treat that as a family. */
  familyIdentified: boolean;
  alternatives: FontMatch[];
  method: FontMethod;
  confidenceLabel: FontConfidenceLabel;
  /** Identification confidence. 100 only when the file names a known family unambiguously. */
  confidencePercent: number;
  /** Visual/name similarity only — never presented as identification certainty. */
  visualSimilarityPercent?: number;
  identificationNote?: string;
  occurrences?: number;
  pages?: number[];
  pageRangeLabel?: string;
  sampleText?: string;
  sampleUnreliable?: boolean;
  sampleUnreliableReason?: string;
  technical?: FontTechnicalInfo;
}

export interface FontIdentifierResult {
  format: 'pdf' | 'docx';
  findings: FontFinding[];
  notes: string[];
}

function splitWeight(name: string): { family: string; weightStyle?: string } {
  const a = analyzeFontTechnicalName(name);
  return { family: a.family || a.technicalName || name, weightStyle: a.weightStyle };
}

function normalizeFontName(raw: string): string {
  const a = analyzeFontTechnicalName(raw);
  return a.family || a.technicalName || raw.trim();
}

async function resolvePdfJsFont(
  page: { commonObjs?: { get: (id: string, cb?: (v: unknown) => void) => unknown } },
  loadedName: string
): Promise<{ name?: string; type?: string }> {
  const objs = page.commonObjs;
  if (!objs?.get) return {};
  const pick = (v: unknown): { name?: string; type?: string } => {
    if (!v || typeof v !== 'object') return {};
    const o = v as Record<string, unknown>;
    const name =
      (typeof o.name === 'string' && o.name) ||
      (typeof o.fontName === 'string' && o.fontName) ||
      undefined;
    const type =
      (typeof o.type === 'string' && o.type) ||
      (typeof o.mimetype === 'string' && o.mimetype) ||
      undefined;
    return { name, type };
  };
  try {
    const immediate = objs.get(loadedName);
    if (immediate && typeof immediate === 'object') return pick(immediate);
  } catch {
    /* callback API */
  }
  return await new Promise((resolve) => {
    let settled = false;
    const finish = (v: unknown) => {
      if (settled) return;
      settled = true;
      resolve(pick(v));
    };
    try {
      objs.get(loadedName, finish);
    } catch {
      finish(null);
      return;
    }
    setTimeout(() => finish(null), 80);
  });
}

function matchFontDict(dicts: PdfFontDict[], ...candidates: Array<string | undefined>): PdfFontDict | undefined {
  const analyzed = candidates
    .filter((c): c is string => Boolean(c))
    .map((c) => analyzeFontTechnicalName(c));
  for (const d of dicts) {
    const dNames = [d.baseFont, d.fontName].filter((x): x is string => Boolean(x));
    for (const dn of dNames) {
      const da = analyzeFontTechnicalName(dn);
      for (const a of analyzed) {
        if (da.family && a.family && da.family.toLowerCase() === a.family.toLowerCase()) return d;
        if (
          !da.internal &&
          !a.internal &&
          da.technicalName &&
          a.technicalName &&
          da.technicalName.toLowerCase() === a.technicalName.toLowerCase()
        ) {
          return d;
        }
      }
      const raw = dn.replace(/^\/+/, '');
      if (candidates.some((c) => c && c.replace(/^\/+/, '') === raw)) return d;
    }
  }
  return undefined;
}

function notInformed(value: string | undefined): string | undefined {
  return value?.trim() || undefined;
}

function buildPdfFinding(args: {
  analyzed: ReturnType<typeof analyzeFontTechnicalName>;
  dict?: PdfFontDict;
  jsType?: string;
  loadedName?: string;
  element: string;
  count: number;
  pages: number[];
  sample?: string;
  avgSize?: number;
}): FontFinding {
  const { analyzed, dict, jsType, loadedName, element, count, pages, sample } = args;
  const family = analyzed.family;
  const known = Boolean(family && isKnownExact(family));
  const explicitName = Boolean(
    (dict?.baseFont && !isInternalFontId(dict.baseFont)) ||
      (dict?.fontName && !isInternalFontId(dict.fontName)) ||
      (analyzed.technicalName && !analyzed.internal)
  );
  const subset = analyzed.subset || dict?.subset || null;
  const technical: FontTechnicalInfo = {
    internalName: loadedName && isInternalFontId(loadedName) ? loadedName : analyzed.internal ? analyzed.raw : undefined,
    postScriptName: notInformed(analyzed.postScriptName || analyzed.technicalName),
    baseFont: notInformed(dict?.baseFont),
    fontName: notInformed(dict?.fontName),
    pdfType: describePdfFontType(dict, jsType),
    subtype: notInformed(dict?.subtype),
    encoding: notInformed(dict?.encoding),
    embedded: dict?.embedded ?? null,
    subset,
    hasToUnicode: dict?.hasToUnicode ?? null,
    cidSystemInfo: notInformed(dict?.cidSystemInfo),
    objectRef: notInformed(dict?.objectRef),
  };

  const sampleText = sample?.trim() || undefined;
  const sampleUnreliable = Boolean(sampleText && (isUnreliableSampleText(sampleText) || dict?.hasToUnicode === false));
  const pageRangeLabel = pages.length ? formatPageRanges(pages) : undefined;

  if (!family || analyzed.internal) {
    return {
      element,
      primary: { name: '' },
      familyIdentified: false,
      alternatives: [],
      method: 'unknown',
      confidenceLabel: 'none',
      confidencePercent: 0,
      identificationNote: 'unidentified-internal',
      occurrences: count || undefined,
      pages: pages.length ? pages : undefined,
      pageRangeLabel,
      sampleText,
      sampleUnreliable,
      sampleUnreliableReason: sampleUnreliable ? 'encoding-or-tounicode' : undefined,
      technical,
    };
  }

  if (explicitName && (known || analyzed.mappedFromPostScript || dict?.baseFont)) {
    const confirmed = known && explicitName && !analyzed.internal;
    return {
      element,
      primary: { name: family, weightStyle: analyzed.weightStyle },
      familyIdentified: true,
      alternatives: [],
      method: 'document',
      confidenceLabel: confirmed ? 'confirmed' : 'high',
      confidencePercent: confirmed ? 100 : 90,
      identificationNote: subset ? 'subset-embedded' : 'document-name',
      occurrences: count || undefined,
      pages: pages.length ? pages : undefined,
      pageRangeLabel,
      sampleText,
      sampleUnreliable,
      sampleUnreliableReason: sampleUnreliable ? 'encoding-or-tounicode' : undefined,
      technical,
    };
  }

  const alts = estimateFamilyAlternatives(family);
  const best = alts[0];
  if (best && best.similarity >= 70 && !known) {
    const band = best.similarity >= 85 ? 'good' : best.similarity >= 75 ? 'possible' : 'low';
    return {
      element,
      primary: { name: best.name, weightStyle: analyzed.weightStyle, similarity: best.similarity },
      familyIdentified: false,
      alternatives: alts.filter((a) => a.name !== best.name).slice(0, 3),
      method: 'similarity',
      confidenceLabel: band,
      confidencePercent: 0,
      visualSimilarityPercent: best.similarity,
      identificationNote: 'visual-similarity',
      occurrences: count || undefined,
      pages: pages.length ? pages : undefined,
      pageRangeLabel,
      sampleText,
      sampleUnreliable,
      sampleUnreliableReason: sampleUnreliable ? 'encoding-or-tounicode' : undefined,
      technical,
    };
  }

  // PDF-declared name that is not in the known list — still what the file says.
  return {
    element,
    primary: { name: family, weightStyle: analyzed.weightStyle },
    familyIdentified: true,
    alternatives: alts.slice(0, 3),
    method: 'document',
    confidenceLabel: 'high',
    confidencePercent: 85,
    identificationNote: 'document-name',
    occurrences: count || undefined,
    pages: pages.length ? pages : undefined,
    pageRangeLabel,
    sampleText,
    sampleUnreliable,
    sampleUnreliableReason: sampleUnreliable ? 'encoding-or-tounicode' : undefined,
    technical,
  };
}

async function identifyPdfFonts(file: File): Promise<FontIdentifierResult> {
  const buffer = await file.arrayBuffer();
  if (!looksLikePdf(buffer)) throw new Error('INVALID_PDF');

  const slice = new Uint8Array(buffer).slice(0, Math.min(buffer.byteLength, 3_500_000));
  const raw = new TextDecoder('latin1').decode(slice);
  const dicts = parsePdfFontDictionaries(raw);

  const pdfjs = await loadPdfJS();
  const pdf = await pdfjs.getDocument({ data: buffer.slice(0) }).promise;

  type Agg = {
    loadedName: string;
    resolvedName?: string;
    jsType?: string;
    count: number;
    pages: Set<number>;
    sizes: number[];
    sample: string;
  };
  const usage = new Map<string, Agg>();
  const SAMPLE_MAX = 120;
  const notes: string[] = [];

  const pageLimit = Math.min(pdf.numPages, 80);
  if (pdf.numPages > 80) notes.push('page-limit');

  for (let i = 1; i <= pageLimit; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const resolvedCache = new Map<string, { name?: string; type?: string }>();
    for (const item of content.items) {
      if (!('str' in item) || !item.str?.trim()) continue;
      const loadedName = String((item as { fontName?: string }).fontName || '');
      if (!loadedName) continue;
      if (!resolvedCache.has(loadedName)) {
        resolvedCache.set(loadedName, await resolvePdfJsFont(page, loadedName));
      }
      const resolved = resolvedCache.get(loadedName);
      const size = Array.isArray((item as { transform?: number[] }).transform)
        ? Math.abs((item as { transform: number[] }).transform[0] || 0)
        : 0;
      const prev = usage.get(loadedName) || {
        loadedName,
        resolvedName: resolved?.name,
        jsType: resolved?.type,
        count: 0,
        pages: new Set<number>(),
        sizes: [],
        sample: '',
      };
      if (resolved?.name && !prev.resolvedName) prev.resolvedName = resolved.name;
      if (resolved?.type && !prev.jsType) prev.jsType = resolved.type;
      prev.count += item.str.length;
      prev.pages.add(i);
      if (size) prev.sizes.push(size);
      if (prev.sample.length < SAMPLE_MAX) {
        const piece = String(item.str).replace(/\s+/g, ' ').trim();
        if (piece && !prev.sample.includes(piece)) {
          prev.sample = `${prev.sample}${prev.sample ? ' ' : ''}${piece}`.slice(0, SAMPLE_MAX);
        }
      }
      usage.set(loadedName, prev);
    }
  }

  const findings: FontFinding[] = [];
  const usedDicts = new Set<PdfFontDict>();

  if (usage.size > 0) {
    const unresolved: Agg[] = [];
    for (const agg of usage.values()) {
      const dict = matchFontDict(dicts, agg.resolvedName, agg.loadedName);
      const sourceName = agg.resolvedName || dict?.baseFont || dict?.fontName || agg.loadedName;
      const analyzed = analyzeFontTechnicalName(sourceName);
      if (analyzed.internal && !agg.resolvedName && !dict) {
        unresolved.push(agg);
        continue;
      }
      if (dict) usedDicts.add(dict);
      const avgSize = agg.sizes.length ? agg.sizes.reduce((a, b) => a + b, 0) / agg.sizes.length : undefined;
      findings.push(
        buildPdfFinding({
          analyzed,
          dict,
          jsType: agg.jsType,
          loadedName: agg.loadedName,
          element: classifyElement(analyzed.family || analyzed.technicalName, avgSize),
          count: agg.count,
          pages: [...agg.pages].sort((a, b) => a - b),
          sample: agg.sample,
          avgSize,
        })
      );
    }

    if (unresolved.length && dicts.length === 1) {
      const dict = dicts[0];
      usedDicts.add(dict);
      const merged = unresolved.reduce(
        (acc, u) => {
          acc.count += u.count;
          u.pages.forEach((p) => acc.pages.add(p));
          acc.sample = `${acc.sample}${acc.sample && u.sample ? ' ' : ''}${u.sample}`.slice(0, SAMPLE_MAX);
          acc.loadedName = acc.loadedName || u.loadedName;
          return acc;
        },
        { count: 0, pages: new Set<number>(), sample: '', loadedName: unresolved[0].loadedName }
      );
      const analyzed = analyzeFontTechnicalName(dict.baseFont || dict.fontName || merged.loadedName);
      findings.push(
        buildPdfFinding({
          analyzed,
          dict,
          loadedName: merged.loadedName,
          element: classifyElement(analyzed.family || analyzed.technicalName),
          count: merged.count,
          pages: [...merged.pages].sort((a, b) => a - b),
          sample: merged.sample,
        })
      );
    } else {
      for (const agg of unresolved) {
        findings.push(
          buildPdfFinding({
            analyzed: analyzeFontTechnicalName(agg.loadedName),
            loadedName: agg.loadedName,
            jsType: agg.jsType,
            element: 'body',
            count: agg.count,
            pages: [...agg.pages].sort((a, b) => a - b),
            sample: agg.sample,
          })
        );
      }
    }
  }

  for (const dict of dicts) {
    if (usedDicts.has(dict)) continue;
    const analyzed = analyzeFontTechnicalName(dict.baseFont || dict.fontName || '');
    if (!analyzed.family && analyzed.internal) continue;
    findings.push(
      buildPdfFinding({
        analyzed,
        dict,
        element: classifyElement(analyzed.family || analyzed.technicalName),
        count: 0,
        pages: [],
      })
    );
  }

  if (findings.length === 0) {
    notes.push(pdf.numPages > 0 && usage.size === 0 && dicts.length === 0 ? 'scanned-or-image' : 'no-fonts');
    return { format: 'pdf', findings: [], notes };
  }

  const dedup = new Map<string, FontFinding>();
  for (const f of findings) {
    const key = f.familyIdentified
      ? `fam:${f.element}|${f.primary.name}|${f.primary.weightStyle || ''}`
      : `int:${f.technical?.internalName || f.technical?.objectRef || f.technical?.baseFont || 'unknown'}`;
    const prev = dedup.get(key);
    if (!prev) {
      dedup.set(key, f);
      continue;
    }
    const merged: FontFinding = {
      ...prev,
      occurrences: (prev.occurrences || 0) + (f.occurrences || 0),
      pages: [...new Set([...(prev.pages || []), ...(f.pages || [])])].sort((a, b) => a - b),
      sampleText: prev.sampleText || f.sampleText,
      technical: { ...f.technical, ...prev.technical },
    };
    merged.pageRangeLabel = merged.pages?.length ? formatPageRanges(merged.pages) : prev.pageRangeLabel;
    if (f.confidencePercent > prev.confidencePercent) {
      merged.confidencePercent = f.confidencePercent;
      merged.confidenceLabel = f.confidenceLabel;
      merged.method = f.method;
    }
    dedup.set(key, merged);
  }

  const sorted = [...dedup.values()].sort((a, b) => {
    if (Boolean(b.familyIdentified) !== Boolean(a.familyIdentified)) return a.familyIdentified ? -1 : 1;
    if (b.confidencePercent !== a.confidencePercent) return b.confidencePercent - a.confidencePercent;
    return (b.occurrences || 0) - (a.occurrences || 0);
  });

  if (sorted.some((f) => !f.familyIdentified)) notes.push('some-unidentified');

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

    const alts = isKnownExact(family) ? [] : estimateFamilyAlternatives(family);
    findings.push({
      element: agg.element,
      primary: { name: family, weightStyle: agg.weightStyle },
      familyIdentified: true,
      alternatives: alts.slice(0, 3),
      method: 'document',
      confidenceLabel: 'confirmed',
      confidencePercent: 100,
      identificationNote: 'document-name',
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
