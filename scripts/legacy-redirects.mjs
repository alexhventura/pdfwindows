import localizedPaths from '../src/seo/localizedPaths.json' with { type: 'json' };

const LOCALES = ['en', 'pt', 'es'];

const NON_REDIRECT_PATHS = new Set(['/', '/ferramentas']);

/**
 * Build Vercel 301 redirects from legacy shared slugs to locale-specific slugs.
 */
export function buildLegacySlugRedirects() {
  const redirects = [];

  for (const [canonical, slugs] of Object.entries(localizedPaths)) {
    if (NON_REDIRECT_PATHS.has(canonical)) continue;

    const legacySegment = canonical.replace(/^\//, '');

    for (const locale of LOCALES) {
      const newSegment = slugs[locale].replace(/^\//, '');
      if (legacySegment !== newSegment) {
        redirects.push({
          source: `/${locale}/${legacySegment}`,
          destination: `/${locale}/${newSegment}`,
          permanent: true,
        });
      }
    }
  }

  // Cross-locale slug mistakes (e.g. /en/ferramentas → /en/tools)
  for (const [canonical, slugs] of Object.entries(localizedPaths)) {
    if (canonical === '/') continue;
    for (const locale of LOCALES) {
      const correctSegment = slugs[locale].replace(/^\//, '');
      for (const otherLocale of LOCALES) {
        if (otherLocale === locale) continue;
        const foreignSegment = slugs[otherLocale].replace(/^\//, '');
        if (foreignSegment !== correctSegment) {
          redirects.push({
            source: `/${locale}/${foreignSegment}`,
            destination: `/${locale}/${correctSegment}`,
            permanent: true,
          });
        }
      }
    }
  }

  const seen = new Set();
  return redirects.filter((rule) => {
    const key = `${rule.source}→${rule.destination}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return rule.source !== rule.destination;
  });
}
