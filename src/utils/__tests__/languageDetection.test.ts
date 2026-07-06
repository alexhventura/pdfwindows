import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  DEFAULT_LOCALE,
  LOCALE_STORAGE_KEY,
  detectBrowserLanguage,
  getInitialLocale,
  getStoredLanguage,
  saveStoredLanguage,
} from '../../i18n/language';

const storage = new Map<string, string>();

beforeEach(() => {
  storage.clear();
  vi.stubGlobal('localStorage', {
    getItem: (key: string) => storage.get(key) ?? null,
    setItem: (key: string, value: string) => {
      storage.set(key, value);
    },
    removeItem: (key: string) => {
      storage.delete(key);
    },
    clear: () => storage.clear(),
    key: () => null,
    length: 0,
  });
});

describe('detectBrowserLanguage', () => {
  it('prefers Portuguese when any navigator.languages entry starts with pt', () => {
    expect(detectBrowserLanguage(['pt-BR', 'en-US'])).toBe('pt');
    expect(detectBrowserLanguage(['pt'])).toBe('pt');
    expect(detectBrowserLanguage(['pt-PT'])).toBe('pt');
    expect(detectBrowserLanguage(['pt-AO'])).toBe('pt');
  });

  it('prefers Spanish when any navigator.languages entry starts with es', () => {
    expect(detectBrowserLanguage(['es-MX', 'en-US'])).toBe('es');
    expect(detectBrowserLanguage(['es'])).toBe('es');
    expect(detectBrowserLanguage(['es-ES'])).toBe('es');
    expect(detectBrowserLanguage(['es-AR'])).toBe('es');
    expect(detectBrowserLanguage(['es-CO'])).toBe('es');
  });

  it('falls back to English for other languages', () => {
    expect(detectBrowserLanguage(['fr-FR', 'de-DE'])).toBe('en');
    expect(detectBrowserLanguage(['ja-JP'])).toBe('en');
    expect(detectBrowserLanguage(['en-US'])).toBe('en');
    expect(detectBrowserLanguage([])).toBe('en');
  });

  it('uses navigator.language as fallback when languages list is empty', () => {
    expect(detectBrowserLanguage([], 'pt-BR')).toBe('pt');
    expect(detectBrowserLanguage([], 'es-AR')).toBe('es');
    expect(detectBrowserLanguage([], 'fr-FR')).toBe('en');
  });

  it('prioritizes navigator.languages over navigator.language', () => {
    expect(detectBrowserLanguage(['en-US'], 'pt-BR')).toBe('en');
    expect(detectBrowserLanguage(['pt-BR'], 'en-US')).toBe('pt');
  });
});

describe('getInitialLocale', () => {
  it('uses stored language before browser detection', () => {
    saveStoredLanguage('es');
    expect(getInitialLocale(['pt-BR', 'en-US'])).toBe('es');
  });

  it('detects browser when nothing is stored', () => {
    expect(getInitialLocale(['pt-BR', 'en-US'])).toBe('pt');
    expect(getInitialLocale(['fr-FR'])).toBe(DEFAULT_LOCALE);
  });
});

describe('getStoredLanguage', () => {
  it('returns null for invalid stored values', () => {
    storage.set(LOCALE_STORAGE_KEY, 'fr');
    expect(getStoredLanguage()).toBeNull();
  });

  it('returns valid stored locale', () => {
    saveStoredLanguage('pt');
    expect(getStoredLanguage()).toBe('pt');
  });
});
