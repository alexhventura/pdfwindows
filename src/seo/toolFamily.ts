import type { LanguageType } from '../types';

export type ToolFamily = 'pdf' | 'image' | 'document' | 'data' | 'utility';

export const TOOL_FAMILY_ORDER: ToolFamily[] = ['pdf', 'image', 'document', 'data', 'utility'];

export const TOOL_FAMILY_LABELS: Record<LanguageType, Record<ToolFamily, string>> = {
  pt: {
    pdf: 'PDF',
    image: 'Imagem',
    document: 'Documento',
    data: 'Dados',
    utility: 'Utilitários',
  },
  en: {
    pdf: 'PDF',
    image: 'Image',
    document: 'Document',
    data: 'Data',
    utility: 'Utilities',
  },
  es: {
    pdf: 'PDF',
    image: 'Imagen',
    document: 'Documento',
    data: 'Datos',
    utility: 'Utilidades',
  },
};

const SUITE_FAMILY: Record<string, ToolFamily> = {
  'unlock-pdf': 'pdf',
  'remove-restrictions': 'pdf',
  'organize-pdf': 'pdf',
  'redact-pdf': 'pdf',
  'sign-pdf': 'pdf',
  'page-numbers': 'pdf',
  'crop-pdf': 'pdf',
  'compare-pdf': 'pdf',
  'edit-pdf': 'pdf',
  'repair-pdf': 'pdf',
  'pdf-to-pdfa': 'pdf',
  'pdf-forms': 'pdf',
  'scan-to-pdf': 'image',
  'margin-adjust': 'image',
  'color-picker': 'image',
  'font-identifier': 'document',
  'document-converter': 'document',
  'document-studio': 'document',
  'report-gen': 'document',
  'pdf-to-word': 'document',
  'word-to-pdf': 'document',
  'excel-to-pdf': 'document',
  'html-to-pdf': 'document',
  'pptx-to-pdf': 'document',
  'pdf-to-excel': 'document',
  'pdf-to-pptx': 'document',
  'qr-gen': 'utility',
  'cpf-gen': 'utility',
  'code-clean': 'utility',
  'file-xray': 'utility',
};

export function getToolFamily(tool: {
  operation?: string;
  suiteId?: string;
}): ToolFamily {
  if (tool.suiteId && SUITE_FAMILY[tool.suiteId]) {
    return SUITE_FAMILY[tool.suiteId];
  }

  const op = tool.operation ?? '';
  if (op.startsWith('pdf-')) return 'pdf';
  if (op.startsWith('img-')) return 'image';
  if (op === 'csv-json' || op === 'json-to-csv' || op === 'xml-json') return 'data';
  if (op === 'txt-to-pdf') return 'document';
  return 'utility';
}

export function getSuiteFamily(suiteId: string): ToolFamily {
  return SUITE_FAMILY[suiteId] ?? 'utility';
}

export function toolCardFamilyClass(family: ToolFamily): string {
  return `tool-card-family-${family}`;
}

export function groupToolsByFamily<T extends { operation?: string; suiteId?: string }>(
  tools: T[]
): { family: ToolFamily; tools: T[] }[] {
  return TOOL_FAMILY_ORDER.map((family) => ({
    family,
    tools: tools.filter((tool) => getToolFamily(tool) === family),
  })).filter((group) => group.tools.length > 0);
}
