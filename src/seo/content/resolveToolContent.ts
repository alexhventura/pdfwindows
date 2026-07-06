import type { LanguageType } from '../../types';
import type { ToolRichContent } from './types';
import { getRichContent } from './registry';
import { HOME_COPY, TOOL_PAGES } from '../toolCatalog';
import { defaultCta } from './helpers';

export function resolveToolContent(path: string, lang: LanguageType): ToolRichContent {
  const rich = getRichContent(path, lang);
  if (rich) return rich;

  const normalized = path.startsWith('/') ? path : `/${path}`;

  if (normalized === '/') {
    return legacyToRich(HOME_COPY[lang], lang, 'PDFWINDOWS');
  }

  if (normalized === '/conversor') {
    const base = HOME_COPY[lang];
    return legacyToRich(
      {
        ...base,
        title:
          lang === 'pt'
            ? 'Conversor PDF e Imagem Completo | PDFWINDOWS'
            : lang === 'es'
              ? 'Conversor PDF e Imagen Completo | PDFWINDOWS'
              : 'Full PDF & Image Converter | PDFWINDOWS',
        h1:
          lang === 'pt'
            ? 'Conversor PDF e Imagem Completo'
            : lang === 'es'
              ? 'Conversor PDF e Imagen Completo'
              : 'Full PDF & Image Converter',
      },
      lang,
      lang === 'pt' ? 'Conversor Completo' : lang === 'es' ? 'Conversor Completo' : 'Full Converter'
    );
  }

  const tool = TOOL_PAGES.find((p) => p.path === normalized);
  if (!tool) {
    throw new Error(`No content for path: ${path}`);
  }

  const legacy = tool.copy[lang];
  const name = legacy.h1.split('—')[0]?.trim() ?? legacy.h1;
  return legacyToRich(legacy, lang, name);
}

function legacyToRich(
  legacy: import('../toolCatalog').ToolPageCopy,
  lang: LanguageType,
  toolName: string
): ToolRichContent {
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
