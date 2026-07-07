/** Canonical public origin (no trailing slash). Baked at build via VITE_SITE_ORIGIN. */
export function getSiteOrigin(): string {
  const baked = import.meta.env.VITE_SITE_ORIGIN as string | undefined;
  if (baked) {
    return baked.replace(/\/$/, '');
  }

  if (typeof window !== 'undefined' && window.location?.origin) {
    return window.location.origin.replace(/\/$/, '');
  }

  return 'https://www.pdfwindows.com';
}

/** @deprecated Prefer getSiteOrigin() so runtime host matches canonical on the live domain. */
export const SITE_ORIGIN = getSiteOrigin();
