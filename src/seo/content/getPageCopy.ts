import type { LanguageType } from '../../types';
import type { ToolPageCopy } from '../toolCatalog';
import { HOME_COPY, TOOL_PAGES } from '../toolCatalog';

/** Lightweight sync copy for SEO meta, hero, and schema — no rich article bundle. */
export function getPageCopy(path: string, lang: LanguageType): ToolPageCopy {
  const normalized = path.startsWith('/') ? path : `/${path}`;

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
  const copy = getPageCopy(path, lang);
  return copy.h1.split('—')[0]?.trim() ?? copy.h1;
}
