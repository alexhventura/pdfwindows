/** Canonical public origin (no trailing slash). Baked at build via VITE_SITE_ORIGIN. */
const CANONICAL_ORIGIN = 'https://www.pdfwindows.com';

function toCanonicalOrigin(origin: string): string {
  try {
    const host = new URL(origin).host;
    if (host === 'pdfwindows.com' || host === 'www.pdfwindows.com' || host === 'pdfwindows.app' || host.endsWith('.vercel.app')) {
      return CANONICAL_ORIGIN;
    }
  } catch {
    // fall through
  }
  return origin.replace(/\/$/, '');
}

export function getSiteOrigin(): string {
  const baked = import.meta.env.VITE_SITE_ORIGIN as string | undefined;
  if (baked) {
    return toCanonicalOrigin(baked);
  }

  if (typeof window !== 'undefined' && window.location?.origin) {
    return toCanonicalOrigin(window.location.origin);
  }

  return CANONICAL_ORIGIN;
}

/** @deprecated Prefer getSiteOrigin() so runtime host matches canonical on the live domain. */
export const SITE_ORIGIN = getSiteOrigin();
