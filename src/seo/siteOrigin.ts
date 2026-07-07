/** Canonical public origin (no trailing slash). Override with VITE_SITE_ORIGIN at build time. */
export const SITE_ORIGIN = (
  (import.meta.env.VITE_SITE_ORIGIN as string | undefined) || 'https://www.pdfwindows.com'
).replace(/\/$/, '');
