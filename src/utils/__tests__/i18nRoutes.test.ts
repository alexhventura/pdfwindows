import { describe, expect, it } from 'vitest';
import { localizedPath, parseLocaleFromPath, stripLocalePrefix } from '../../i18n/routes';

describe('i18n routes', () => {
  it('builds localized paths', () => {
    expect(localizedPath('en', '/')).toBe('/en');
    expect(localizedPath('pt', '/conversor')).toBe('/pt/conversor');
    expect(localizedPath('es', '/pdf-merge')).toBe('/es/pdf-merge');
  });

  it('strips locale prefix', () => {
    expect(stripLocalePrefix('/en/conversor')).toBe('/conversor');
    expect(stripLocalePrefix('/pt')).toBe('/');
    expect(stripLocalePrefix('/legacy')).toBe('/legacy');
  });

  it('parses locale from path', () => {
    expect(parseLocaleFromPath('/en/conversor')).toBe('en');
    expect(parseLocaleFromPath('/pt')).toBe('pt');
    expect(parseLocaleFromPath('/conversor')).toBeNull();
  });
});
