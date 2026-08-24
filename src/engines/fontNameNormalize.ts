/** Known commercial families used for exact match and cautious similarity. */
export const KNOWN_FAMILIES = [
  'Arial',
  'Helvetica',
  'Helvetica Neue',
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
  'Liberation Serif',
  'Carlito',
  'FreeSans',
  'Symbol',
  'ZapfDingbats',
  'Wingdings',
] as const;

const PS_FAMILY: Record<string, string> = {
  arial: 'Arial',
  arialmt: 'Arial',
  arialunicodems: 'Arial',
  arialnarrow: 'Arial',
  arialblack: 'Arial',
  helvetica: 'Helvetica',
  helveticaneue: 'Helvetica Neue',
  times: 'Times',
  timesnewroman: 'Times New Roman',
  timesnewromanps: 'Times New Roman',
  timesnewromanpsmt: 'Times New Roman',
  timesnewromanpsboldmt: 'Times New Roman',
  timesnewromanpsitalicmt: 'Times New Roman',
  timesnewromanpsbolditalicmt: 'Times New Roman',
  timesroman: 'Times',
  timesbold: 'Times',
  timesitalic: 'Times',
  timesbolditalic: 'Times',
  courier: 'Courier',
  couriernew: 'Courier New',
  couriernewpsmt: 'Courier New',
  verdana: 'Verdana',
  georgia: 'Georgia',
  tahoma: 'Tahoma',
  calibri: 'Calibri',
  calibrilight: 'Calibri Light',
  cambria: 'Cambria',
  garamond: 'Garamond',
  palatino: 'Palatino',
  palatinolinotype: 'Palatino',
  trebuchetms: 'Trebuchet MS',
  comicsansms: 'Comic Sans MS',
  impact: 'Impact',
  segoeui: 'Segoe UI',
  opensans: 'Open Sans',
  sourcesanspro: 'Source Sans Pro',
  notosans: 'Noto Sans',
  liberationsans: 'Liberation Sans',
  liberationserif: 'Liberation Serif',
  dejavusans: 'DejaVu Sans',
  carlito: 'Carlito',
  symbol: 'Symbol',
  zapfdingbats: 'ZapfDingbats',
};

export function decodePdfName(name: string): string {
  return name.replace(/#([0-9A-Fa-f]{2})/g, (_, h) => String.fromCharCode(parseInt(h, 16)));
}

export function stripSubsetPrefix(name: string): { subset: boolean; rest: string; prefix?: string } {
  const m = name.match(/^([A-Z]{6})\+(.*)$/);
  if (m) return { subset: true, prefix: m[1], rest: m[2] };
  return { subset: false, rest: name };
}

/**
 * pdf.js loadedName (g_d0_f1946), resource ids (/F1), and other generated tokens.
 * These must never be shown as a commercial font family.
 */
export function isInternalFontId(raw: string): boolean {
  const n = decodePdfName(raw).replace(/^\/+/, '').trim();
  if (!n) return true;
  const compact = n.replace(/[\s_-]+/g, '_');
  if (/^g_d\d+_f\d+$/i.test(compact)) return true;
  if (/^g_[a-z0-9]+_f\d+$/i.test(compact)) return true;
  if (/^f_\d+$/i.test(compact)) return true;
  if (/^font\d+$/i.test(compact)) return true;
  if (/^t\d+$/i.test(compact) && compact.length <= 5) return true;
  if (/^f\d+$/i.test(compact)) return true;
  if (/^g\d+$/i.test(compact) && compact.length <= 6) return true;
  if (/^[0-9]+\s+[0-9]+\s+r$/i.test(n)) return true;
  if (/^[0-9]+$/.test(n)) return true;
  if (n === 'Unknown' || n === 'unknown') return true;
  return false;
}

export function isKnownExact(family: string): boolean {
  const lower = family.trim().toLowerCase();
  return KNOWN_FAMILIES.some((f) => f.toLowerCase() === lower);
}

function compactKey(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]/g, '');
}

function splitWeightStyle(name: string): { family: string; weightStyle?: string } {
  const trimmed = name.replace(/[-_]/g, ' ').replace(/\s+/g, ' ').trim();
  if (/^calibri light$/i.test(trimmed)) return { family: 'Calibri Light' };

  const m = trimmed.match(
    /^(.*?)\s+(Thin|Light|Regular|Medium|SemiBold|Semi Bold|Bold|Black|Italic|Oblique|BoldItalic|Bold Oblique)$/i
  );
  if (m && m[1].trim()) return { family: m[1].trim(), weightStyle: m[2].replace(/\s+/g, '') };

  if (/bold/i.test(trimmed) && /italic|oblique/i.test(trimmed)) {
    const family = trimmed.replace(/\s*(bold|italic|oblique)/gi, '').trim();
    return { family: family || trimmed, weightStyle: 'BoldItalic' };
  }
  if (/\bbold\b/i.test(trimmed)) {
    const family = trimmed.replace(/\s*bold\b/gi, '').trim();
    return { family: family || trimmed, weightStyle: 'Bold' };
  }
  if (/\b(italic|oblique)\b/i.test(trimmed)) {
    const family = trimmed.replace(/\s*(italic|oblique)\b/gi, '').trim();
    return { family: family || trimmed, weightStyle: 'Italic' };
  }
  return { family: trimmed };
}

function expandCamel(s: string): string {
  return s
    .replace(/PS-?BoldItalicMT$/i, '')
    .replace(/PS-?BoldMT$/i, '')
    .replace(/PS-?ItalicMT$/i, '')
    .replace(/PSMT$/i, '')
    .replace(/-?BoldItalicMT$/i, '')
    .replace(/-?BoldMT$/i, '')
    .replace(/-?ItalicMT$/i, '')
    .replace(/MT$/i, '')
    .replace(/PS$/i, '')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2');
}

function lookupPsFamily(token: string): string | null {
  const key = compactKey(token);
  if (PS_FAMILY[key]) return PS_FAMILY[key];
  for (const [k, fam] of Object.entries(PS_FAMILY)) {
    if (key.startsWith(k) && key.length - k.length <= 12) {
      const extra = key.slice(k.length);
      if (!extra || /^(bold|italic|oblique|regular|medium|light|black|narrow|mt|ps|psmt)+$/.test(extra)) {
        return fam;
      }
    }
  }
  return null;
}

export interface NormalizedFontName {
  raw: string;
  technicalName: string;
  subset: boolean;
  subsetPrefix?: string;
  family: string | null;
  weightStyle?: string;
  postScriptName?: string;
  mappedFromPostScript: boolean;
  internal: boolean;
}

/**
 * Turn a PDF/pdf.js font name into a display family when — and only when — the
 * mapping is unambiguous. Internal ids yield family = null.
 */
export function analyzeFontTechnicalName(rawInput: string): NormalizedFontName {
  const raw = decodePdfName(String(rawInput || '')).replace(/^\/+/, '').trim();
  const { subset, rest, prefix } = stripSubsetPrefix(raw);
  const technicalName = rest.trim() || raw;
  const internal = isInternalFontId(raw) || isInternalFontId(technicalName);

  if (internal) {
    return {
      raw,
      technicalName: raw,
      subset,
      subsetPrefix: prefix,
      family: null,
      mappedFromPostScript: false,
      internal: true,
    };
  }

  const spaced = expandCamel(technicalName.replace(/[,_]/g, ' ')).replace(/\s+/g, ' ').trim();
  const split = splitWeightStyle(spaced || technicalName);
  const ps = lookupPsFamily(technicalName.replace(/,/g, '-')) || lookupPsFamily(split.family);
  let family = ps || split.family || null;

  if (family && isInternalFontId(family)) family = null;
  if (family && family.length < 2) family = null;

  if (family && !isKnownExact(family) && !ps) {
    const again = lookupPsFamily(family);
    if (again) family = again;
  }

  if (family && !isKnownExact(family) && !ps) {
    const knownHit = KNOWN_FAMILIES.find((f) => compactKey(f) === compactKey(family!));
    if (knownHit) family = knownHit;
  }

  return {
    raw,
    technicalName,
    subset,
    subsetPrefix: prefix,
    family,
    weightStyle: split.weightStyle,
    postScriptName: /[A-Z][a-z]+[A-Z]/.test(technicalName) || /MT$/i.test(technicalName) ? technicalName : undefined,
    mappedFromPostScript: Boolean(ps),
    internal: false,
  };
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
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i][j - 1][j] + cost);
    }
  }
  return dp[m][n];
}

export function similarityScore(a: string, b: string): number {
  const x = a.toLowerCase().trim();
  const y = b.toLowerCase().trim();
  if (!x || !y) return 0;
  if (x === y) return 100;
  if (compactKey(x) === compactKey(y)) return 98;
  if (x.includes(y) || y.includes(x)) return 88;
  const maxLen = Math.max(x.length, y.length) || 1;
  const dist = levenshtein(x, y);
  return Math.max(0, Math.round((1 - dist / maxLen) * 100));
}

export function estimateFamilyAlternatives(family: string): { name: string; similarity: number }[] {
  if (!family || isInternalFontId(family)) return [];
  return KNOWN_FAMILIES.map((f) => ({ name: f, similarity: similarityScore(family, f) }))
    .filter((s) => s.similarity < 100 && s.similarity >= 55)
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, 4);
}

/** True when extracted PDF text looks like glyph noise rather than readable copy. */
export function isUnreliableSampleText(text: string): boolean {
  const t = text.replace(/\s+/g, ' ').trim();
  if (t.length < 8) return false;
  const tokens = t.split(' ');
  const isolated = tokens.filter((x) => x.length === 1).length;
  if (tokens.length >= 8 && isolated / tokens.length >= 0.55) return true;
  const junk = tokens.filter((x) => /^[Il1|0Oo`'´]{1,4}$/.test(x) || /^\d+$/.test(x)).length;
  if (tokens.length >= 6 && junk / tokens.length >= 0.5) return true;
  const letters = t.replace(/[^A-Za-zÀ-ÿ]/g, '');
  const alnum = t.replace(/[^A-Za-z0-9À-ÿ]/g, '');
  if (alnum.length >= 12 && letters.length / alnum.length < 0.35) return true;
  return false;
}

export function formatPageRanges(pages: number[]): string {
  if (!pages.length) return '';
  const s = [...new Set(pages)].sort((a, b) => a - b);
  const parts: string[] = [];
  let start = s[0];
  let prev = s[0];
  for (let i = 1; i <= s.length; i++) {
    const n = s[i];
    if (n === prev + 1) {
      prev = n;
      continue;
    }
    parts.push(start === prev ? String(start) : `${start}–${prev}`);
    start = prev = n as number;
  }
  return parts.join(', ');
}

export function classifyElement(fontName: string, sizeHint?: number): string {
  const n = fontName.toLowerCase();
  if (sizeHint && sizeHint >= 18) return 'title';
  if (sizeHint && sizeHint >= 13) return 'subtitle';
  if (/header|heading|title|titulo/i.test(n)) return 'title';
  if (/footer|rodape|rodapé/i.test(n)) return 'footer';
  if (/caption|legenda/i.test(n)) return 'caption';
  return 'body';
}
