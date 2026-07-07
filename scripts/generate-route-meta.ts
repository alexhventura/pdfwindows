import { writeFileSync } from 'node:fs';
import type { LanguageType } from '../src/types';
import { getPublicBarePaths } from '../src/seo/publicBarePaths';
import { getLocalizedPublicPath } from '../src/seo/pathLocalization';
import { getPageCopy } from '../src/seo/content/getPageCopy';
import { CANONICAL_ORIGIN } from './resolve-site-origin.mjs';

const LOCALES: LanguageType[] = ['en', 'pt', 'es'];

export interface RouteMetaEntry {
  lang: string;
  title: string;
  description: string;
  canonical: string;
}

const meta: Record<string, RouteMetaEntry> = {};

for (const canonicalPath of getPublicBarePaths()) {
  for (const lang of LOCALES) {
    const copy = getPageCopy(canonicalPath, lang);
    const publicPath = getLocalizedPublicPath(lang, canonicalPath);
    const htmlLang = lang === 'pt' ? 'pt-BR' : lang === 'es' ? 'es' : 'en';

    meta[publicPath] = {
      lang: htmlLang,
      title: copy.title,
      description: copy.description,
      canonical: `${CANONICAL_ORIGIN}${publicPath}`,
    };
  }
}

writeFileSync('src/seo/routeMeta.generated.json', `${JSON.stringify(meta, null, 2)}\n`, 'utf8');
console.log(`Generated route meta for ${Object.keys(meta).length} localized URLs.`);
