import type { LanguageType } from '../../types';
import type { ToolPageCopy } from '../toolCatalog';
import { HOME_COPY, TOOL_PAGES } from '../toolCatalog';
import { getRichContent } from './registry';
import { applyMetaDescriptionOverride } from '../metaDescriptions';

function richToPageCopy(
  path: string,
  lang: LanguageType,
  rich: NonNullable<ReturnType<typeof getRichContent>>
): ToolPageCopy {
  return {
    title: rich.title,
    description: applyMetaDescriptionOverride(path, lang, rich.description),
    keywords: rich.keywords,
    h1: rich.h1,
    intro: rich.intro,
    benefits: rich.benefits,
    howItWorks: rich.howItWorks,
    faq: rich.faq,
  };
}

/** Lightweight sync copy for SEO meta, hero, and schema — prefers rich localized content. */
export function getPageCopy(path: string, lang: LanguageType): ToolPageCopy {
  const normalized = path.startsWith('/') ? path : `/${path}`;

  const rich = getRichContent(normalized, lang);
  if (rich) return richToPageCopy(normalized, lang, rich);

  if (normalized === '/') {
    return HOME_COPY[lang];
  }

  if (normalized === '/conversor') {
    const base = HOME_COPY[lang];
    return {
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
    };
  }

  const tool = TOOL_PAGES.find((p) => p.path === normalized);
  if (!tool) {
    throw new Error(`No page copy for path: ${path}`);
  }

  return tool.copy[lang];
}

export function getPageToolName(path: string, lang: LanguageType): string {
  const rich = getRichContent(path.startsWith('/') ? path : `/${path}`, lang);
  if (rich?.toolName) return rich.toolName;
  return getPageCopy(path, lang).h1.split('—')[0]?.trim() ?? getPageCopy(path, lang).h1;
}
