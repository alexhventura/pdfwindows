import { PDFDocument } from 'pdf-lib';
import { looksLikePdf } from '../utils/docxZip';

export const ORGANIZE_MAX_PAGES = 200;

export interface OrganizePdfResult {
  blob: Blob;
  fileName: string;
  pageCount: number;
}

function outputName(original: string, suffix: string): string {
  const base = original.replace(/\.pdf$/i, '') || 'document';
  return `${base}_${suffix}.pdf`;
}

export async function getPdfPageCount(file: File): Promise<number> {
  const buffer = await file.arrayBuffer();
  if (!looksLikePdf(buffer)) throw new Error('INVALID_PDF');
  const doc = await PDFDocument.load(buffer, { ignoreEncryption: true, updateMetadata: false });
  return doc.getPageCount();
}

/**
 * Rebuild PDF keeping pages in `pageOrder` (0-based indices into the source).
 * Deleted pages are simply omitted; duplicates are allowed if the user duplicates an entry.
 */
export async function organizePdfPages(
  file: File,
  pageOrder: number[]
): Promise<OrganizePdfResult> {
  if (pageOrder.length < 1) throw new Error('NO_PAGES');

  const buffer = await file.arrayBuffer();
  if (!looksLikePdf(buffer)) throw new Error('INVALID_PDF');

  const src = await PDFDocument.load(buffer, { ignoreEncryption: true, updateMetadata: false });
  const total = src.getPageCount();
  if (total < 1) throw new Error('EMPTY');
  if (total > ORGANIZE_MAX_PAGES) throw new Error('TOO_MANY_PAGES');

  for (const idx of pageOrder) {
    if (!Number.isInteger(idx) || idx < 0 || idx >= total) throw new Error('BAD_INDEX');
  }

  const out = await PDFDocument.create();
  const copied = await out.copyPages(src, pageOrder);
  for (const page of copied) out.addPage(page);

  const bytes = await out.save({ useObjectStreams: false });
  const keptAll = pageOrder.length === total && pageOrder.every((v, i) => v === i);
  return {
    blob: new Blob([bytes], { type: 'application/pdf' }),
    fileName: outputName(file.name, keptAll ? 'organized' : 'pages'),
    pageCount: pageOrder.length,
  };
}
