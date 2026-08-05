import localizedPaths from '../src/seo/localizedPaths.json' with { type: 'json' };

const LOCALES = ['en', 'pt', 'es'];

/** Paths that must not emit legacy-slug→localized-slug redirects. */
const NON_REDIRECT_PATHS = new Set(['/', '/ferramentas']);

/** Catalog hub segments — redirect straight to locale home (not indexable). */
const CATALOG_SEGMENTS = ['tools', 'ferramentas', 'herramientas'];

/**
 * Structural redirects that eliminate soft (client-only) redirects for crawlers.
 * Keep single-hop 301s to the official www host paths (no trailing slash).
 */
export function buildStructuralRedirects() {
  const redirects = [
    {
      source: '/',
      destination: '/en',
      permanent: true,
    },
  ];

  for (const locale of LOCALES) {
    for (const segment of CATALOG_SEGMENTS) {
      redirects.push({
        source: `/${locale}/${segment}`,
        destination: `/${locale}`,
        permanent: true,
      });
    }
  }

  return redirects;
}

/**
 * Build Vercel 301 redirects from legacy shared slugs to locale-specific slugs.
 */
export function buildLegacySlugRedirects() {
  const redirects = [...buildStructuralRedirects()];

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

  // Cross-locale slug mistakes (e.g. /en/juntar-pdf → /en/merge-pdf)
  for (const [canonical, slugs] of Object.entries(localizedPaths)) {
    if (canonical === '/' || NON_REDIRECT_PATHS.has(canonical)) continue;
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

  const seenSources = new Set();
  return redirects.filter((rule) => {
    if (rule.source === rule.destination) return false;
    // First rule for a source wins (structural catalog → home beats cross-locale hops).
    if (seenSources.has(rule.source)) return false;
    seenSources.add(rule.source);
    return true;
  });
}
