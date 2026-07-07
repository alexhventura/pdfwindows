import { INDEXABLE_CANONICAL_PATHS } from './pathLocalization';

/** Routes that redirect elsewhere — not included in sitemap or indexable path registry. */
export const NON_INDEXABLE_BARE_PATHS = [
  '/ferramentas',
  '/gerador-recibos',
  '/capturador-cores',
] as const;

/** All indexable canonical paths (no locale prefix). Single source of truth for sitemap + SEO registry. */
export function getPublicBarePaths(): string[] {
  return [...INDEXABLE_CANONICAL_PATHS];
}

export const PUBLIC_LOCALES = ['en', 'pt', 'es'] as const;

export type PublicLocale = (typeof PUBLIC_LOCALES)[number];
