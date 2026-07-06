/** Text items shape returned by PDF.js getTextContent() — kept dependency-free for tests. */
export interface PdfTextContentItem {
  str?: string;
  transform?: number[];
  hasEOL?: boolean;
}

const LINE_BREAK_Y_THRESHOLD = 4;

/** Monta texto legível a partir de getTextContent() respeitando quebras de linha do PDF. */
export function buildTextFromPdfContentItems(items: PdfTextContentItem[]): string {
  const parts: string[] = [];
  let lastY: number | null = null;

  for (const item of items) {
    if (typeof item.str !== 'string' || !item.str) continue;

    const y =
      item.transform && item.transform.length >= 6 ? item.transform[5]! : null;

    if (y !== null && lastY !== null && Math.abs(y - lastY) > LINE_BREAK_Y_THRESHOLD) {
      parts.push('\n');
    } else if (
      parts.length > 0 &&
      !parts[parts.length - 1]!.endsWith('\n') &&
      !parts[parts.length - 1]!.endsWith(' ')
    ) {
      parts.push(' ');
    }

    parts.push(item.str);
    if (y !== null) lastY = y;

    if (item.hasEOL) {
      parts.push('\n');
      lastY = null;
    }
  }

  return parts.join('').replace(/[ \t]+\n/g, '\n').replace(/\n{3,}/g, '\n\n').trim();
}

export function countMeaningfulChars(text: string): number {
  return (text.match(/[\p{L}\p{N}]/gu) ?? []).length;
}

/** Limiar mínimo de caracteres alfanuméricos para considerar camada de texto válida */
export const MIN_MEANINGFUL_TEXT_CHARS = 32;
