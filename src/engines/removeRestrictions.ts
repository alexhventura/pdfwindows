import { PDFDocument } from 'pdf-lib';
import {
  looksLikePdf,
  openDocxZip,
  readZipText,
  zipToDocxBlob,
} from '../utils/docxZip';

export interface RestrictionFlags {
  editing: 'blocked' | 'allowed' | 'unknown';
  printing: 'blocked' | 'allowed' | 'unknown';
  copying: 'blocked' | 'allowed' | 'unknown';
  annotating: 'blocked' | 'allowed' | 'unknown';
  openPassword: boolean;
  hasEncryptDict: boolean;
  docxProtection: boolean;
  details: string[];
}

export interface RestrictionsAnalysis {
  format: 'pdf' | 'docx';
  restrictions: RestrictionFlags;
  removable: boolean;
  reason?: string;
}

export interface RestrictionsResult {
  analysis: RestrictionsAnalysis;
  output?: Blob;
  outputName?: string;
}

function parsePdfPermissionFlags(pValue: number): Pick<
  RestrictionFlags,
  'printing' | 'copying' | 'editing' | 'annotating'
> {
  // PDF permission bits (when present). Bit meanings (1 = allowed when set in positive form;
  // many files store as two's complement). We treat missing bits conservatively.
  const printing = (pValue & 0x04) !== 0 ? 'allowed' : 'blocked';
  const modifying = (pValue & 0x08) !== 0 ? 'allowed' : 'blocked';
  const copying = (pValue & 0x10) !== 0 ? 'allowed' : 'blocked';
  const annotating = (pValue & 0x20) !== 0 ? 'allowed' : 'blocked';
  return {
    printing,
    editing: modifying,
    copying,
    annotating,
  };
}

export async function analyzePdfRestrictions(file: File): Promise<RestrictionsAnalysis> {
  const buffer = await file.arrayBuffer();
  if (!looksLikePdf(buffer)) throw new Error('INVALID_PDF');

  const raw = new TextDecoder('latin1').decode(new Uint8Array(buffer));
  const hasEncryptDict = /\/Encrypt\b/.test(raw);
  const details: string[] = [];

  let openPassword = false;
  let loadOk = false;
  try {
    await PDFDocument.load(buffer);
    loadOk = true;
  } catch {
    openPassword = hasEncryptDict;
    details.push('encrypted-load-failed');
  }

  if (!loadOk && hasEncryptDict) {
    try {
      await PDFDocument.load(buffer, { ignoreEncryption: true });
      details.push('owner-or-partial-encryption');
    } catch {
      details.push('strong-encryption');
    }
  }

  let printing: RestrictionFlags['printing'] = 'unknown';
  let copying: RestrictionFlags['copying'] = 'unknown';
  let editing: RestrictionFlags['editing'] = 'unknown';
  let annotating: RestrictionFlags['annotating'] = 'unknown';

  const pMatch = raw.match(/\/P\s+(-?\d+)/);
  if (pMatch) {
    const parsed = parsePdfPermissionFlags(parseInt(pMatch[1], 10));
    printing = parsed.printing;
    copying = parsed.copying;
    editing = parsed.editing;
    annotating = parsed.annotating;
    details.push(`P=${pMatch[1]}`);
  } else if (!hasEncryptDict) {
    printing = copying = editing = annotating = 'allowed';
  }

  const anyBlocked =
    printing === 'blocked' ||
    copying === 'blocked' ||
    editing === 'blocked' ||
    annotating === 'blocked' ||
    (hasEncryptDict && !openPassword);

  const removable = anyBlocked && !openPassword;

  return {
    format: 'pdf',
    restrictions: {
      editing,
      printing,
      copying,
      annotating,
      openPassword,
      hasEncryptDict,
      docxProtection: false,
      details,
    },
    removable,
    reason: openPassword
      ? 'needs-open-password'
      : !anyBlocked
        ? 'no-restrictions'
        : undefined,
  };
}

export async function analyzeDocxRestrictions(file: File): Promise<RestrictionsAnalysis> {
  const zip = await openDocxZip(file);
  const settings = (await readZipText(zip, 'word/settings.xml')) || '';
  const hasProtection =
    /<w:documentProtection\b/i.test(settings) ||
    /<w:writeProtection\b/i.test(settings) ||
    /<w:readOnlyRecommended\b/i.test(settings);

  const editing: RestrictionFlags['editing'] = hasProtection ? 'blocked' : 'allowed';

  return {
    format: 'docx',
    restrictions: {
      editing,
      printing: 'unknown',
      copying: 'unknown',
      annotating: 'unknown',
      openPassword: /w:cryptAlgorithmClass|w:hashValue|w:saltValue/i.test(settings),
      hasEncryptDict: false,
      docxProtection: hasProtection,
      details: hasProtection ? ['documentProtection'] : [],
    },
    removable: hasProtection && !/<w:documentProtection[^>]*w:cryptProviderType=/i.test(settings),
    reason: !hasProtection
      ? 'no-restrictions'
      : /w:cryptProviderType|w:hashValue/i.test(settings)
        ? 'password-protected-structure'
        : undefined,
  };
}

export async function analyzeRestrictions(file: File): Promise<RestrictionsAnalysis> {
  const ext = file.name.split('.').pop()?.toLowerCase();
  if (ext === 'pdf' || file.type === 'application/pdf') return analyzePdfRestrictions(file);
  if (ext === 'docx' || file.type.includes('wordprocessingml')) return analyzeDocxRestrictions(file);
  const head = await file.slice(0, 8).arrayBuffer();
  if (looksLikePdf(head)) return analyzePdfRestrictions(file);
  return analyzeDocxRestrictions(file);
}

async function stripPdfRestrictions(file: File): Promise<Blob> {
  const buffer = await file.arrayBuffer();
  const src = await PDFDocument.load(buffer, { ignoreEncryption: true });
  const out = await PDFDocument.create();
  const pages = await out.copyPages(src, src.getPageIndices());
  pages.forEach((p) => out.addPage(p));
  const bytes = await out.save();
  return new Blob([bytes], { type: 'application/pdf' });
}

async function stripDocxRestrictions(file: File): Promise<Blob> {
  const zip = await openDocxZip(file);
  const settingsPath = 'word/settings.xml';
  const settings = await readZipText(zip, settingsPath);
  if (!settings) throw new Error('NO_SETTINGS');

  let next = settings
    .replace(/<w:documentProtection\b[^/]*\/>/gi, '')
    .replace(/<w:documentProtection\b[\s\S]*?<\/w:documentProtection>/gi, '')
    .replace(/<w:writeProtection\b[^/]*\/>/gi, '')
    .replace(/<w:writeProtection\b[\s\S]*?<\/w:writeProtection>/gi, '')
    .replace(/<w:readOnlyRecommended\b[^/]*\/>/gi, '');

  if (next === settings) {
    throw new Error('NOT_REMOVABLE');
  }

  zip.file(settingsPath, next);
  return zipToDocxBlob(zip);
}

export async function removeDocumentRestrictions(file: File): Promise<RestrictionsResult> {
  const analysis = await analyzeRestrictions(file);

  if (analysis.reason === 'no-restrictions' || !analysis.removable) {
    return { analysis };
  }

  if (analysis.format === 'pdf') {
    if (analysis.restrictions.openPassword) {
      return {
        analysis: { ...analysis, removable: false, reason: 'needs-open-password' },
      };
    }
    try {
      const output = await stripPdfRestrictions(file);
      const base = file.name.replace(/\.pdf$/i, '');
      return {
        analysis,
        output,
        outputName: `${base}_unlocked.pdf`,
      };
    } catch {
      return {
        analysis: { ...analysis, removable: false, reason: 'not-supported' },
      };
    }
  }

  try {
    const output = await stripDocxRestrictions(file);
    const base = file.name.replace(/\.docx$/i, '');
    return {
      analysis,
      output,
      outputName: `${base}_unlocked.docx`,
    };
  } catch (e) {
    const msg = e instanceof Error ? e.message : '';
    return {
      analysis: {
        ...analysis,
        removable: false,
        reason: msg === 'NOT_REMOVABLE' ? 'not-supported' : analysis.reason || 'not-supported',
      },
    };
  }
}
