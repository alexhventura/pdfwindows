import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { discoverPublicBarePaths } from '../../../scripts/extract-public-paths.mjs';
import { buildLocalizedPath } from '../../../scripts/sitemap-lib.mjs';
import { CANONICAL_ORIGIN } from '../../../scripts/resolve-site-origin.mjs';

const LOCALES = ['en', 'pt', 'es'];

describe('route meta registry', () => {
  it('covers every indexable localized URL with valid meta', () => {
    const routeMeta = JSON.parse(readFileSync('src/seo/routeMeta.generated.json', 'utf8'));
    const canonicalPaths = discoverPublicBarePaths();
    const paths = LOCALES.flatMap((locale) =>
      canonicalPaths.map((canonical) => buildLocalizedPath(locale, canonical))
    );

    expect(Object.keys(routeMeta).length).toBe(paths.length);

    for (const path of paths) {
      const entry = routeMeta[path];
      expect(entry, `missing meta for ${path}`).toBeDefined();
      expect(entry.title.length).toBeGreaterThanOrEqual(10);
      expect(entry.description.length).toBeGreaterThanOrEqual(140);
      expect(entry.description.length).toBeLessThanOrEqual(160);
      expect(entry.canonical).toBe(`${CANONICAL_ORIGIN}${path}`);

      const locale = path.split('/')[1];
      const expectedLang = locale === 'pt' ? 'pt-BR' : locale === 'es' ? 'es' : 'en';
      expect(entry.lang).toBe(expectedLang);
    }
  });
});
