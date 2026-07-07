import type { LanguageType } from '../types';
import localizedPathsData from './localizedPaths.json';

export type CanonicalPath = keyof typeof localizedPathsData;

const localizedPaths = localizedPathsData as Record<
  string,
  Record<LanguageType, string>
>;

const LOCALES: LanguageType[] = ['en', 'pt', 'es'];

/** Canonical internal paths used by content registry and tool definitions. */
export const CANONICAL_PUBLIC_PATHS = Object.keys(localizedPaths) as CanonicalPath[];

/** Indexable canonical paths (excludes redirect-only catalog hub). */
export const INDEXABLE_CANONICAL_PATHS = CANONICAL_PUBLIC_PATHS.filter(
  (path) => path !== '/ferramentas'
);

/** Slug segment used in the router (no leading slash). */
export function getLocalizedSlug(lang: LanguageType, canonicalPath: string): string {
  const normalized = normalizeCanonicalPath(canonicalPath);
  const entry = localizedPaths[normalized];
  if (!entry) return normalized === '/' ? '' : normalized.replace(/^\//, '');
  const localized = entry[lang] ?? normalized;
  return localized === '/' ? '' : localized.replace(/^\//, '');
}

/** Full localized public path, e.g. /en/merge-pdf */
export function getLocalizedPublicPath(lang: LanguageType, canonicalPath: string): string {
  const normalized = normalizeCanonicalPath(canonicalPath);
  if (normalized === '/') return `/${lang}`;
  const entry = localizedPaths[normalized];
  const localized = entry?.[lang] ?? normalized;
  return `/${lang}${localized}`;
}

/** Resolve a pathname (with or without locale prefix) to canonical internal path. */
export function resolveCanonicalPath(pathname: string, lang?: LanguageType): string | null {
  const bare = stripBarePath(pathname);
  if (bare === '/') return '/';

  const withSlash = bare.startsWith('/') ? bare : `/${bare}`;
  if (localizedPaths[withSlash]) return withSlash;

  const detectedLang = lang ?? parseLangFromPath(pathname);
  if (detectedLang) {
    for (const [canonical, slugs] of Object.entries(localizedPaths)) {
      if (canonical === '/') continue;
      if (slugs[detectedLang] === withSlash) return canonical;
    }
  }

  for (const [canonical, slugs] of Object.entries(localizedPaths)) {
    if (canonical === '/') continue;
    if (Object.values(slugs).includes(withSlash)) return canonical;
  }

  return null;
}

function stripBarePath(pathname: string): string {
  const match = pathname.match(/^\/(en|pt|es)(\/.*)?$/);
  const rest = match ? match[2] || '/' : pathname;
  return rest.startsWith('/') ? rest : `/${rest}`;
}

function parseLangFromPath(pathname: string): LanguageType | null {
  const match = pathname.match(/^\/(en|pt|es)(\/|$)/);
  const candidate = match?.[1];
  return candidate === 'en' || candidate === 'pt' || candidate === 'es' ? candidate : null;
}

function normalizeCanonicalPath(path: string): string {
  const trimmed = path.startsWith('/') ? path : `/${path}`;
  return trimmed.length > 1 && trimmed.endsWith('/') ? trimmed.slice(0, -1) : trimmed;
}

/** Legacy shared slugs that should 301/redirect to localized slug for the active locale. */
export function getLegacySlugSegments(): Array<{ segment: string; canonical: string }> {
  const redirects: Array<{ segment: string; canonical: string }> = [];

  for (const [canonical, slugs] of Object.entries(localizedPaths)) {
    if (canonical === '/') continue;
    const legacySegment = canonical.replace(/^\//, '');
    const localizedSegments = new Set(
      LOCALES.map((lang) => getLocalizedSlug(lang, canonical)).filter(Boolean)
    );
    if (!localizedSegments.has(legacySegment)) {
      redirects.push({ segment: legacySegment, canonical });
    }
  }

  return redirects;
}

/** All unique router segments for localized public pages (excluding home index). */
export function getAllLocalizedRouteSegments(): string[] {
  const segments = new Set<string>();

  for (const canonical of CANONICAL_PUBLIC_PATHS) {
    if (canonical === '/') continue;
    for (const lang of LOCALES) {
      const segment = getLocalizedSlug(lang, canonical);
      if (segment) segments.add(segment);
    }
  }

  return [...segments];
}

export function buildHreflangPublicPaths(canonicalPath: string): Array<{ lang: LanguageType; hreflang: string; path: string }> {
  const hreflangMap: Record<LanguageType, string> = {
    en: 'en',
    pt: 'pt-BR',
    es: 'es',
  };

  return LOCALES.map((lang) => ({
    lang,
    hreflang: hreflangMap[lang],
    path: getLocalizedPublicPath(lang, canonicalPath),
  }));
}
