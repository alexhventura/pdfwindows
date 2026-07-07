/**
 * Canonical site origin for sitemap, robots.txt, and build-time SEO.
 * Must match the Google Search Console property host exactly (scheme + host).
 */
export function normalizeOrigin(origin) {
  const trimmed = origin.trim().replace(/\/+$/, '');
  if (!/^https:\/\//i.test(trimmed)) {
    throw new Error(`Site origin must use HTTPS: ${origin}`);
  }
  return trimmed;
}

export function originHost(origin) {
  return new URL(origin).host;
}

function productionOriginFromVercel(env) {
  const vercelProduction = env.VERCEL_PROJECT_PRODUCTION_URL;
  if (!vercelProduction || env.VERCEL_ENV !== 'production') {
    return null;
  }

  const host = vercelProduction.replace(/^https?:\/\//, '').replace(/\/$/, '');
  if (host.endsWith('.vercel.app')) {
    return null;
  }

  return normalizeOrigin(`https://${host}`);
}

export function resolveSiteOrigin(env = process.env) {
  const productionOrigin = productionOriginFromVercel(env);
  const explicit = env.VITE_SITE_ORIGIN || env.SITE_ORIGIN;

  if (explicit) {
    const normalizedExplicit = normalizeOrigin(explicit);
    if (productionOrigin && originHost(normalizedExplicit) !== originHost(productionOrigin)) {
      console.warn(
        `[sitemap] VITE_SITE_ORIGIN (${normalizedExplicit}) differs from Vercel production domain (${productionOrigin}). Using production domain.`
      );
      return productionOrigin;
    }
    return normalizedExplicit;
  }

  if (productionOrigin) {
    return productionOrigin;
  }

  return 'https://www.pdfwindows.com';
}
