import type { LanguageType } from '../../types';
import type { ToolRichContent } from './types';
import { getPageCopy, getPageToolName } from './getPageCopy';
import { defaultCta } from './helpers';

type RichLoader = (lang: LanguageType) => Promise<ToolRichContent>;

const RICH_LOADERS: Record<string, RichLoader> = {
  '/': async (lang) => (await import('./home')).HOME_RICH_CONTENT['/'][lang],
  '/conversor': async (lang) => (await import('./home')).HOME_RICH_CONTENT['/conversor'][lang],
  '/pdf-merge': async (lang) => (await import('./tools/pdf-merge')).PDF_MERGE_CONTENT[lang],
  '/pdf-compress': async (lang) => (await import('./tools/pdf-compress')).PDF_COMPRESS_CONTENT[lang],
  '/pdf-password': async (lang) => (await import('./tools/pdf-password')).PDF_PASSWORD_CONTENT[lang],
  '/pdf-ocr': async (lang) => (await import('./tools/pdf-ocr')).PDF_OCR_CONTENT[lang],
  '/pdf-split': async (lang) => (await import('./tools/pdf-split')).PDF_SPLIT_CONTENT[lang],
  '/pdf-rotate': async (lang) => (await import('./tools/pdf-rotate')).PDF_ROTATE_CONTENT[lang],
  '/pdf-watermark': async (lang) => (await import('./tools/pdf-watermark')).PDF_WATERMARK_CONTENT[lang],
  '/pdf-to-image': async (lang) => (await import('./tools/pdf-to-image')).PDF_TO_IMAGE_CONTENT[lang],
  '/pdf-extract-text': async (lang) => (await import('./tools/pdf-extract-text')).PDF_EXTRACT_TEXT_CONTENT[lang],
  '/image-converter': async (lang) => (await import('./tools/image-converter')).IMAGE_CONVERTER_CONTENT[lang],
  '/image-to-pdf': async (lang) => (await import('./tools/image-to-pdf')).IMAGE_TO_PDF_CONTENT[lang],
  '/image-resize': async (lang) => (await import('./tools/image-resize')).IMAGE_RESIZE_CONTENT[lang],
  '/image-ocr': async (lang) => (await import('./tools/image-ocr')).IMAGE_OCR_CONTENT[lang],
  '/image-filters': async (lang) => (await import('./tools/image-filters')).IMAGE_FILTERS_CONTENT[lang],
  '/csv-to-json': async (lang) => (await import('./tools/csv-to-json')).CSV_TO_JSON_CONTENT[lang],
  '/json-to-csv': async (lang) => (await import('./tools/json-to-csv')).JSON_TO_CSV_CONTENT[lang],
  '/xml-to-json': async (lang) => (await import('./tools/xml-to-json')).XML_TO_JSON_CONTENT[lang],
  '/txt-to-pdf': async (lang) => (await import('./tools/txt-to-pdf')).TXT_TO_PDF_CONTENT[lang],
  '/estudio-documentos': async (lang) => (await import('./tools/estudio-documentos')).ESTUDIO_DOCUMENTOS_CONTENT[lang],
  '/capturador-de-cores': async (lang) => (await import('./tools/capturador-de-cores')).CAPTURADOR_CORES_CONTENT[lang],
  '/gerador-relatorios': async (lang) => (await import('./tools/gerador-relatorios')).GERADOR_RELATORIOS_CONTENT[lang],
  '/gerador-qr-code': async (lang) => (await import('./tools/gerador-qr-code')).GERADOR_QR_CODE_CONTENT[lang],
  '/gerador-cpf': async (lang) => (await import('./tools/gerador-cpf')).GERADOR_CPF_CONTENT[lang],
  '/limpador-codigo': async (lang) => (await import('./tools/limpador-codigo')).LIMPADOR_CODIGO_CONTENT[lang],
};

function legacyToRich(path: string, lang: LanguageType): ToolRichContent {
  const legacy = getPageCopy(path, lang);
  const toolName = getPageToolName(path, lang);
  return {
    ...legacy,
    toolName,
    useCases: legacy.benefits.map((b, i) => ({
      title: lang === 'pt' ? `Caso de uso ${i + 1}` : lang === 'es' ? `Caso de uso ${i + 1}` : `Use case ${i + 1}`,
      body: b,
    })),
    tips: [],
    sections: [
      {
        id: 'overview',
        heading: lang === 'pt' ? 'Visão geral' : lang === 'es' ? 'Descripción general' : 'Overview',
        level: 2,
        paragraphs: [legacy.intro],
      },
    ],
    relatedTools: [],
    cta: defaultCta(lang, toolName),
  };
}

/** Loads full SEO article content on demand (code-split per tool). */
export async function loadRichContent(path: string, lang: LanguageType): Promise<ToolRichContent> {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  const loader = RICH_LOADERS[normalized];
  if (loader) {
    return loader(lang);
  }
  return legacyToRich(normalized, lang);
}
