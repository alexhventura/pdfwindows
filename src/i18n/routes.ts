import type { LanguageType } from '../types';
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

/** Build a localized path, e.g. localizedPath('pt', '/conversor') → '/pt/conversor'. */
export function localizedPath(lang: LanguageType, path: string = '/'): string {
  const bare = stripLocalePrefix(path.startsWith('/') ? path : `/${path}`);
  if (bare === '/') return `/${lang}`;
  return `/${lang}${bare}`;
}

export function getAllLocalizedPublicPaths(): string[] {
  const barePaths = ['/', '/ferramentas', '/conversor'];
  const locales: LanguageType[] = ['en', 'pt', 'es'];
  const paths: string[] = [];

  for (const locale of locales) {
    for (const bare of barePaths) {
      paths.push(localizedPath(locale, bare));
    }
  }

  return paths;
}
