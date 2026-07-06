import type { LanguageType, OperationType, TranslationDict } from './types';
import { translations } from './utils/translations';

// ---------------------------------------------------------------------------
// Core registry types (catalog + runtime metadata, no business logic)
// ---------------------------------------------------------------------------

/** Whether the offline handler is wired and safe to invoke. */
export type ToolStatus = 'ready' | 'stub' | 'planned';

export type ToolCategory = 'image' | 'pdf' | 'document' | 'data';

export interface ToolConstraints {
  minFiles: number;
  maxFiles?: number;
  allExtensions?: readonly string[];
  singleExtension?: string;
}

export interface ToolDefinition {
  id: OperationType;
  category: ToolCategory;
  status: ToolStatus;
  constraints: ToolConstraints;
  stubMessage?: Record<LanguageType, string>;
}

export interface OperationOption {
  value: OperationType;
  label: string;
}

// ---------------------------------------------------------------------------
// Catalog
// ---------------------------------------------------------------------------

const IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'bmp', 'tiff', 'ico'] as const;

const stubPdfOcrMessage: Record<LanguageType, string> = {
  pt: 'OCR de PDF indisponível neste momento. Use OCR de imagem ou importe páginas como imagens.',
  en: 'PDF OCR is unavailable right now. Use image OCR or import pages as images.',
  es: 'El OCR de PDF no está disponible ahora. Use OCR de imagen o importe páginas como imágenes.',
};

export const TOOL_REGISTRY: Record<OperationType, ToolDefinition> = {
  'img-to-img': {
    id: 'img-to-img',
    category: 'image',
    status: 'ready',
    constraints: { minFiles: 1, allExtensions: [...IMAGE_EXTENSIONS] },
  },
  'img-to-pdf': {
    id: 'img-to-pdf',
    category: 'image',
    status: 'ready',
    constraints: { minFiles: 1, allExtensions: [...IMAGE_EXTENSIONS] },
  },
  'img-resize': {
    id: 'img-resize',
    category: 'image',
    status: 'ready',
    constraints: { minFiles: 1, allExtensions: [...IMAGE_EXTENSIONS] },
  },
  'img-ocr': {
    id: 'img-ocr',
    category: 'image',
    status: 'ready',
    constraints: { minFiles: 1, allExtensions: [...IMAGE_EXTENSIONS] },
  },
  'img-filter': {
    id: 'img-filter',
    category: 'image',
    status: 'ready',
    constraints: { minFiles: 1, allExtensions: [...IMAGE_EXTENSIONS] },
  },
  'img-upscale': {
    id: 'img-upscale',
    category: 'image',
    status: 'planned',
    constraints: { minFiles: 1, allExtensions: [...IMAGE_EXTENSIONS] },
  },
  'pdf-to-img': {
    id: 'pdf-to-img',
    category: 'pdf',
    status: 'ready',
    constraints: { minFiles: 1, maxFiles: 1, singleExtension: 'pdf' },
  },
  'pdf-txt': {
    id: 'pdf-txt',
    category: 'pdf',
    status: 'ready',
    constraints: { minFiles: 1, maxFiles: 1, singleExtension: 'pdf' },
  },
  'pdf-split': {
    id: 'pdf-split',
    category: 'pdf',
    status: 'ready',
    constraints: { minFiles: 1, maxFiles: 1, singleExtension: 'pdf' },
  },
  'pdf-password': {
    id: 'pdf-password',
    category: 'pdf',
    status: 'ready',
    constraints: { minFiles: 1, maxFiles: 1, singleExtension: 'pdf' },
  },
  'pdf-rotate': {
    id: 'pdf-rotate',
    category: 'pdf',
    status: 'ready',
    constraints: { minFiles: 1, maxFiles: 1, singleExtension: 'pdf' },
  },
  'pdf-watermark': {
    id: 'pdf-watermark',
    category: 'pdf',
    status: 'ready',
    constraints: { minFiles: 1, singleExtension: 'pdf' },
  },
  'pdf-compress': {
    id: 'pdf-compress',
    category: 'pdf',
    status: 'ready',
    constraints: { minFiles: 1, singleExtension: 'pdf' },
  },
  'pdf-merge': {
    id: 'pdf-merge',
    category: 'pdf',
    status: 'ready',
    constraints: { minFiles: 2, allExtensions: ['pdf'] },
  },
  'pdf-ocr': {
    id: 'pdf-ocr',
    category: 'pdf',
    status: 'ready',
    constraints: { minFiles: 1, maxFiles: 1, singleExtension: 'pdf' },
    stubMessage: stubPdfOcrMessage,
  },
  'pdf-to-word': {
    id: 'pdf-to-word',
    category: 'pdf',
    status: 'planned',
    constraints: { minFiles: 1, maxFiles: 1, singleExtension: 'pdf' },
  },
  'csv-json': {
    id: 'csv-json',
    category: 'data',
    status: 'ready',
    constraints: { minFiles: 1, maxFiles: 1, singleExtension: 'csv' },
  },
  'json-to-csv': {
    id: 'json-to-csv',
    category: 'data',
    status: 'ready',
    constraints: { minFiles: 1, maxFiles: 1, singleExtension: 'json' },
  },
  'xml-json': {
    id: 'xml-json',
    category: 'data',
    status: 'ready',
    constraints: { minFiles: 1, maxFiles: 1, singleExtension: 'xml' },
  },
  'txt-to-pdf': {
    id: 'txt-to-pdf',
    category: 'document',
    status: 'ready',
    constraints: { minFiles: 1, maxFiles: 1, singleExtension: 'txt' },
  },
};

// ---------------------------------------------------------------------------
// UI operation groups (preserves existing picker behavior)
// ---------------------------------------------------------------------------

const IMAGE_OPERATION_ORDER: OperationType[] = [
  'img-to-img',
  'img-to-pdf',
  'img-resize',
  'img-ocr',
  'img-filter',
];

const SINGLE_PDF_OPERATION_ORDER: OperationType[] = [
  'pdf-to-img',
  'pdf-txt',
  'pdf-split',
  'pdf-password',
  'pdf-rotate',
  'pdf-watermark',
  'pdf-compress',
  'pdf-ocr',
];

type OperationLabelKey = keyof Pick<
  TranslationDict,
  | 'imgToImgLabel'
  | 'convertToPDF'
  | 'imgResizeLabel'
  | 'ocrImageLabel'
  | 'imageFilterLabel'
  | 'pdfToImgLabel'
  | 'extractText'
  | 'splitPDF'
  | 'addPassword'
  | 'rotatePDFLabel'
  | 'watermarkPdfLabel'
  | 'compressPdfLabel'
  | 'ocrPdfLabel'
  | 'mergePDFLabel'
  | 'convertToJSON'
  | 'jsonToCsvLabel'
  | 'xmlToJsonLabel'
  | 'txtToPdfLabel'
>;

const OPERATION_LABEL_KEYS: Record<OperationType, OperationLabelKey | null> = {
  'img-to-img': 'imgToImgLabel',
  'img-to-pdf': 'convertToPDF',
  'img-resize': 'imgResizeLabel',
  'img-ocr': 'ocrImageLabel',
  'img-filter': 'imageFilterLabel',
  'img-upscale': null,
  'pdf-to-img': 'pdfToImgLabel',
  'pdf-txt': 'extractText',
  'pdf-split': 'splitPDF',
  'pdf-password': 'addPassword',
  'pdf-rotate': 'rotatePDFLabel',
  'pdf-watermark': 'watermarkPdfLabel',
  'pdf-compress': 'compressPdfLabel',
  'pdf-merge': 'mergePDFLabel',
  'pdf-ocr': 'ocrPdfLabel',
  'pdf-to-word': null,
  'csv-json': 'convertToJSON',
  'json-to-csv': 'jsonToCsvLabel',
  'xml-json': 'xmlToJsonLabel',
  'txt-to-pdf': 'txtToPdfLabel',
};

function isOperationExposed(op: OperationType): boolean {
  return TOOL_REGISTRY[op].status !== 'planned';
}

function toOperationOptions(ops: OperationType[], lang: LanguageType): OperationOption[] {
  const dict = translations[lang];
  return ops
    .filter(isOperationExposed)
    .map((op) => {
      const labelKey = OPERATION_LABEL_KEYS[op];
      if (!labelKey) return null;
      return { value: op, label: dict[labelKey] };
    })
    .filter((item): item is OperationOption => item !== null);
}

// ---------------------------------------------------------------------------
// Registry helpers
// ---------------------------------------------------------------------------

export function getToolDefinition(id: OperationType): ToolDefinition {
  return TOOL_REGISTRY[id];
}

export function isToolReady(id: OperationType): boolean {
  return TOOL_REGISTRY[id].status === 'ready';
}

export function isToolStub(id: OperationType): boolean {
  return TOOL_REGISTRY[id].status === 'stub';
}

export function getToolStubMessage(id: OperationType, lang: LanguageType): string {
  const def = TOOL_REGISTRY[id];
  return (
    def.stubMessage?.[lang] ??
    def.stubMessage?.en ??
    translations[lang].conversionError
  );
}

export const IMPLEMENTED_OPERATIONS = new Set<OperationType>(
  (Object.keys(TOOL_REGISTRY) as OperationType[]).filter(isToolReady)
);

// ---------------------------------------------------------------------------
// UI discovery (same rules as before, driven by registry-exposed ops)
// ---------------------------------------------------------------------------

export function getAllowedOperations(
  fileCount: number,
  extensions: string[],
  lang: LanguageType
): OperationOption[] {
  if (fileCount === 0) return [];

  const areAllImages = extensions.every((ext) =>
    IMAGE_EXTENSIONS.includes(ext as (typeof IMAGE_EXTENSIONS)[number])
  );
  const areAllPDFs = extensions.every((ext) => ext === 'pdf');

  if (areAllImages) {
    return toOperationOptions(IMAGE_OPERATION_ORDER, lang);
  }

  if (fileCount === 1 && extensions[0] === 'pdf') {
    return toOperationOptions(SINGLE_PDF_OPERATION_ORDER, lang);
  }

  if (fileCount > 1 && areAllPDFs) {
    return toOperationOptions(['pdf-merge'], lang);
  }

  if (fileCount === 1 && extensions[0] === 'csv') {
    return toOperationOptions(['csv-json'], lang);
  }

  if (fileCount === 1 && extensions[0] === 'json') {
    return toOperationOptions(['json-to-csv'], lang);
  }

  if (fileCount === 1 && extensions[0] === 'xml') {
    return toOperationOptions(['xml-json'], lang);
  }

  if (fileCount === 1 && extensions[0] === 'txt') {
    return toOperationOptions(['txt-to-pdf'], lang);
  }

  return [];
}
