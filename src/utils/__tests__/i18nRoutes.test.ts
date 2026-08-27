import { describe, expect, it } from 'vitest';
import { localizedPath, parseLocaleFromPath, stripLocalePrefix } from '../../i18n/routes';
import { getLocalizedPublicPath, resolveCanonicalPath } from '../../seo/pathLocalization';

describe('i18n routes', () => {
  it('builds localized paths with per-locale slugs', () => {
    expect(localizedPath('en', '/')).toBe('/en');
    expect(localizedPath('pt', '/conversor')).toBe('/pt/conversor');
    expect(localizedPath('en', '/pdf-merge')).toBe('/en/merge-pdf');
    expect(localizedPath('pt', '/pdf-merge')).toBe('/pt/juntar-pdf');
    expect(localizedPath('es', '/pdf-merge')).toBe('/es/unir-pdf');
  });

  it('resolves localized URL segments back to canonical paths', () => {
    expect(resolveCanonicalPath('/en/merge-pdf', 'en')).toBe('/pdf-merge');
    expect(resolveCanonicalPath('/pt/juntar-pdf', 'pt')).toBe('/pdf-merge');
    expect(resolveCanonicalPath('/es/unir-pdf', 'es')).toBe('/pdf-merge');
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

  it('maps canonical paths to localized public URLs', () => {
    expect(getLocalizedPublicPath('en', '/pdf-watermark')).toBe('/en/watermark-pdf');
    expect(getLocalizedPublicPath('pt', '/pdf-watermark')).toBe('/pt/marca-dagua-pdf');
    expect(getLocalizedPublicPath('es', '/pdf-watermark')).toBe('/es/marca-de-agua-pdf');
    expect(getLocalizedPublicPath('pt', '/ajuste-de-margem')).toBe('/pt/ajuste-de-margem');
    expect(getLocalizedPublicPath('en', '/ajuste-de-margem')).toBe('/en/margin-adjust');
    expect(getLocalizedPublicPath('es', '/ajuste-de-margem')).toBe('/es/ajuste-de-margen');
    expect(getLocalizedPublicPath('pt', '/assinatura-pdf')).toBe('/pt/assinatura-pdf');
    expect(getLocalizedPublicPath('en', '/assinatura-pdf')).toBe('/en/sign-pdf');
    expect(getLocalizedPublicPath('es', '/assinatura-pdf')).toBe('/es/firma-pdf');
    expect(getLocalizedPublicPath('pt', '/numerador-de-paginas')).toBe('/pt/numerador-de-paginas');
    expect(getLocalizedPublicPath('en', '/pdf-para-word')).toBe('/en/pdf-to-word');
    expect(getLocalizedPublicPath('es', '/html-para-pdf')).toBe('/es/html-a-pdf');
  });
});
