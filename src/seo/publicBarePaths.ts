import { TOOL_PAGES } from './toolCatalog';

/** Routes that redirect elsewhere — not included in sitemap or indexable path registry. */
export const NON_INDEXABLE_BARE_PATHS = ['/gerador-recibos', '/capturador-cores'] as const;

/** Static public pages declared in AppRouter (excluding tool pages and redirects). */
export const PUBLIC_STATIC_BARE_PATHS = ['/', '/ferramentas', '/conversor'] as const;

/** All indexable bare paths (no locale prefix). Single source of truth for sitemap + SEO registry. */
export function getPublicBarePaths(): string[] {
  return [...PUBLIC_STATIC_BARE_PATHS, ...TOOL_PAGES.map((tool) => tool.path)];
}

export const PUBLIC_LOCALES = ['en', 'pt', 'es'] as const;

export type PublicLocale = (typeof PUBLIC_LOCALES)[number];
