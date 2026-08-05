import { writeFileSync } from 'node:fs';
import type { LanguageType } from '../src/types';
import { getPublicBarePaths } from '../src/seo/publicBarePaths';
import { getLocalizedPublicPath } from '../src/seo/pathLocalization';
import { getPageCopy } from '../src/seo/content/getPageCopy';
import { CANONICAL_ORIGIN } from './resolve-site-origin.mjs';

const LOCALES: LanguageType[] = ['en', 'pt', 'es'];

const HREFLANG: Record<LanguageType, string> = {
  en: 'en',
  pt: 'pt-BR',
  es: 'es',
};

export interface RouteMetaAlternate {
  hreflang: string;
  href: string;
}

export interface RouteMetaEntry {
  lang: string;
  title: string;
  description: string;
  keywords: string;
  canonical: string;
  alternates: RouteMetaAlternate[];
}

const meta: Record<string, RouteMetaEntry> = {};

for (const canonicalPath of getPublicBarePaths()) {
  const alternates: RouteMetaAlternate[] = LOCALES.map((locale) => ({
    hreflang: HREFLANG[locale],
    href: `${CANONICAL_ORIGIN}${getLocalizedPublicPath(locale, canonicalPath)}`,
  }));
  alternates.push({
    hreflang: 'x-default',
    href: `${CANONICAL_ORIGIN}${getLocalizedPublicPath('en', canonicalPath)}`,
  });

  for (const lang of LOCALES) {
    const copy = getPageCopy(canonicalPath, lang);
    const publicPath = getLocalizedPublicPath(lang, canonicalPath);
    const htmlLang = lang === 'pt' ? 'pt-BR' : lang === 'es' ? 'es' : 'en';

    meta[publicPath] = {
      lang: htmlLang,
      title: copy.title,
      description: copy.description,
      keywords: copy.keywords,
      canonical: `${CANONICAL_ORIGIN}${publicPath}`,
      alternates,
    };
  }
}

writeFileSync('src/seo/routeMeta.generated.json', `${JSON.stringify(meta, null, 2)}\n`, 'utf8');
console.log(`Generated route meta for ${Object.keys(meta).length} localized URLs.`);
