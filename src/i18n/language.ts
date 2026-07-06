import type { LanguageType } from '../types';

export const SUPPORTED_LOCALES: readonly LanguageType[] = ['en', 'pt', 'es'] as const;
export const DEFAULT_LOCALE: LanguageType = 'en';
export const LOCALE_STORAGE_KEY = 'pdfwindows.lang';

export function isValidLocale(value: string | undefined): value is LanguageType {
  return value === 'en' || value === 'pt' || value === 'es';
}

/**
 * Detect language from browser preferences.
 * Priority: navigator.languages → navigator.language → English.
 */
export function detectBrowserLanguage(
  languages?: readonly string[] | null,
  language?: string | null
): LanguageType {
  if (languages?.length) {
    for (const tag of languages) {
      const lower = tag.toLowerCase();
      if (lower.startsWith('pt')) return 'pt';
      if (lower.startsWith('es')) return 'es';
    }
    return DEFAULT_LOCALE;
  }

  const fallback = (language || '').toLowerCase();
  if (fallback.startsWith('pt')) return 'pt';
  if (fallback.startsWith('es')) return 'es';
  return DEFAULT_LOCALE;
}

export function getStoredLanguage(): LanguageType | null {
  if (typeof localStorage === 'undefined') return null;
  try {
    const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
    return isValidLocale(stored ?? undefined) ? (stored as LanguageType) : null;
  } catch {
    return null;
  }
}

export function saveStoredLanguage(lang: LanguageType): void {
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.setItem(LOCALE_STORAGE_KEY, lang);
  } catch {
    // Ignore quota / private mode errors.
  }
}

/**
 * Resolve locale for first visit (no URL prefix yet).
 * Order: saved preference → browser → English.
 */
export function getInitialLocale(
  languages?: readonly string[] | null,
  language?: string | null
): LanguageType {
  return getStoredLanguage() ?? detectBrowserLanguage(languages, language);
}

/** @deprecated Use detectBrowserLanguage from this module. */
export function getBrowserLanguage(): LanguageType {
  if (typeof navigator === 'undefined') return DEFAULT_LOCALE;
  return detectBrowserLanguage(navigator.languages, navigator.language);
}
