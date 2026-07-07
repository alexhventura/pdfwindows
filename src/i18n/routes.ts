import type { LanguageType } from '../types';
import { getLocalizedPublicPath, resolveCanonicalPath } from '../seo/pathLocalization';
import { isValidLocale } from './language';

/** Strip `/en`, `/pt`, or `/es` prefix and return the bare app path (always starts with `/`). */
export function stripLocalePrefix(pathname: string): string {
  const match = pathname.match(/^\/(en|pt|es)(\/.*)?$/);
  if (match) return match[2] || '/';
  return pathname.startsWith('/') ? pathname : `/${pathname}`;
}

export function parseLocaleFromPath(pathname: string): LanguageType | null {
  const match = pathname.match(/^\/(en|pt|es)(\/|$)/);
  const candidate = match?.[1];
  return isValidLocale(candidate) ? candidate : null;
}

/** Build a localized path, e.g. localizedPath('pt', '/pdf-merge') → '/pt/juntar-pdf'. */
export function localizedPath(lang: LanguageType, path: string = '/'): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  const bare = stripLocalePrefix(normalized);
  const canonical = resolveCanonicalPath(bare, lang) ?? bare;
  return getLocalizedPublicPath(lang, canonical);
}

export function getAllLocalizedPublicPaths(): string[] {
  return [];
}
