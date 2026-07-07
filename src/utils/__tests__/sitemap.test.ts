import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { discoverPublicBarePaths, NON_INDEXABLE_ROUTER_SEGMENTS } from '../../../scripts/extract-public-paths.mjs';
import { CANONICAL_ORIGIN, resolveSiteOrigin } from '../../../scripts/resolve-site-origin.mjs';
import {
  buildHreflangAlternates,
  buildSitemapUrlEntries,
  parseSitemapHreflangLinks,
  parseSitemapLocs,
  validateRobotsTxt,
  validateSitemapXml,
} from '../../../scripts/sitemap-lib.mjs';
import { getAllPublicPaths } from '../../seo/toolCatalog';
import { getPublicBarePaths, NON_INDEXABLE_BARE_PATHS } from '../../seo/publicBarePaths';

function localizedPathFromBare(locale: string, bare: string): string {
  return bare === '/' ? `/${locale}` : `/${locale}${bare}`;
}

describe('sitemap generation', () => {
  it('discovers the same bare paths as the TypeScript registry', () => {
    const discovered = discoverPublicBarePaths();
    const registry = getPublicBarePaths();

    expect(discovered.sort()).toEqual(registry.sort());
    expect(discovered.length).toBeGreaterThanOrEqual(27);
  });

  it('lists the same localized paths as the app registry', () => {
    const barePaths = discoverPublicBarePaths();
    const registryPaths = getAllPublicPaths();
    const locales = ['en', 'pt', 'es'];

    const expected = locales.flatMap((locale) => barePaths.map((bare) => localizedPathFromBare(locale, bare)));

    expect(registryPaths.sort()).toEqual(expected.sort());
  });

  it('excludes redirect-only routes from discovery', () => {
    const barePaths = discoverPublicBarePaths();

    for (const segment of NON_INDEXABLE_ROUTER_SEGMENTS) {
      expect(barePaths).not.toContain(`/${segment}`);
    }

    for (const path of NON_INDEXABLE_BARE_PATHS) {
      expect(barePaths).not.toContain(path);
    }
  });

  it('public/sitemap.xml is valid XML with canonical HTTPS host', () => {
    const xml = readFileSync('public/sitemap.xml', 'utf8');
    const robots = readFileSync('public/robots.txt', 'utf8');
    const validation = validateSitemapXml(xml, CANONICAL_ORIGIN);
    const robotsValidation = validateRobotsTxt(robots, CANONICAL_ORIGIN);

    expect(validation.valid, validation.errors.join('; ')).toBe(true);
    expect(robotsValidation.valid, robotsValidation.errors.join('; ')).toBe(true);

    const locs = parseSitemapLocs(xml);
    expect(locs.length).toBe(81);

    for (const loc of locs) {
      expect(loc).not.toMatch(/pdfwindows\.app/i);
      expect(loc).not.toMatch(/vercel\.app/i);
      expect(loc.startsWith(`${CANONICAL_ORIGIN}/`)).toBe(true);
    }
  });

  it('includes lastmod and hreflang alternates for every URL', () => {
    const xml = readFileSync('public/sitemap.xml', 'utf8');
    const locs = parseSitemapLocs(xml);
    const hreflangLinks = parseSitemapHreflangLinks(xml);

    expect(hreflangLinks.length).toBe(locs.length * 4);

    const urlBlocks = [...xml.matchAll(/<url>[\s\S]*?<\/url>/g)].map((match) => match[0]);
    expect(urlBlocks.length).toBe(locs.length);

    for (const block of urlBlocks) {
      expect(block).toMatch(/<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/);
      expect(block).toContain('hreflang="en"');
      expect(block).toContain('hreflang="pt-BR"');
      expect(block).toContain('hreflang="es"');
      expect(block).toContain('hreflang="x-default"');
    }
  });

  it('hreflang alternates point to matching locale paths', () => {
    const barePaths = discoverPublicBarePaths().filter((path) => path === '/pdf-merge');
    const alternates = buildHreflangAlternates(CANONICAL_ORIGIN, barePaths[0]);

    expect(alternates).toEqual([
      { hreflang: 'en', href: `${CANONICAL_ORIGIN}/en/pdf-merge` },
      { hreflang: 'pt-BR', href: `${CANONICAL_ORIGIN}/pt/pdf-merge` },
      { hreflang: 'es', href: `${CANONICAL_ORIGIN}/es/pdf-merge` },
      { hreflang: 'x-default', href: `${CANONICAL_ORIGIN}/en/pdf-merge` },
    ]);
  });

  it('has no duplicate URLs', () => {
    const xml = readFileSync('public/sitemap.xml', 'utf8');
    const locs = parseSitemapLocs(xml);
    expect(new Set(locs).size).toBe(locs.length);
  });

  it('generates 27 pages per locale (81 total)', () => {
    const xml = readFileSync('public/sitemap.xml', 'utf8');
    const locs = parseSitemapLocs(xml);

    const localeSegment = (loc: string, locale: string) => {
      const pathname = new URL(loc).pathname;
      return pathname === `/${locale}` || pathname.startsWith(`/${locale}/`);
    };

    const byLocale = {
      en: locs.filter((loc) => localeSegment(loc, 'en')),
      pt: locs.filter((loc) => localeSegment(loc, 'pt')),
      es: locs.filter((loc) => localeSegment(loc, 'es')),
    };

    expect(byLocale.en.length).toBe(27);
    expect(byLocale.pt.length).toBe(27);
    expect(byLocale.es.length).toBe(27);
    expect(locs.length).toBe(81);
  });

  it('build entries use git or build date for lastmod', () => {
    const barePaths = discoverPublicBarePaths().slice(0, 3);
    const entries = buildSitemapUrlEntries(barePaths, CANONICAL_ORIGIN);

    for (const entry of entries) {
      expect(entry.lastmod).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });

  it('normalizes any pdfwindows origin to www canonical', () => {
    const fromStaleApp = resolveSiteOrigin({
      VITE_SITE_ORIGIN: 'https://pdfwindows.app',
      VERCEL_ENV: 'production',
      VERCEL_PROJECT_PRODUCTION_URL: 'www.pdfwindows.com',
    });

    const fromBareCom = resolveSiteOrigin({
      VITE_SITE_ORIGIN: 'https://pdfwindows.com',
    });

    expect(fromStaleApp).toBe(CANONICAL_ORIGIN);
    expect(fromBareCom).toBe(CANONICAL_ORIGIN);
  });
});
