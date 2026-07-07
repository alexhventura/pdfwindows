/**
 * Canonical site origin for sitemap, robots.txt, and build-time SEO.
 * This project uses exactly https://www.pdfwindows.com in production.
 */
export const CANONICAL_ORIGIN = 'https://www.pdfwindows.com';
export const CANONICAL_HOST = 'www.pdfwindows.com';

const ALLOWED_HOSTS = new Set(['www.pdfwindows.com', 'pdfwindows.com']);

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

function toCanonicalOrigin(origin) {
  const normalized = normalizeOrigin(origin);
  const host = originHost(normalized);

  if (host === 'pdfwindows.app' || ALLOWED_HOSTS.has(host) || host.endsWith('.vercel.app')) {
    return CANONICAL_ORIGIN;
  }

  throw new Error(`Refusing non-canonical site origin "${normalized}". Expected ${CANONICAL_ORIGIN}.`);
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
  const explicit = env.VITE_SITE_ORIGIN || env.SITE_ORIGIN;
  if (explicit) {
    return toCanonicalOrigin(explicit);
  }

  const productionOrigin = productionOriginFromVercel(env);
  if (productionOrigin) {
    return toCanonicalOrigin(productionOrigin);
  }

  return CANONICAL_ORIGIN;
}
