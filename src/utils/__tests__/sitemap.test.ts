import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { extractPublicBarePaths } from '../../../scripts/extract-public-paths.mjs';
import { originHost, resolveSiteOrigin } from '../../../scripts/resolve-site-origin.mjs';
import { getAllPublicPaths } from '../../seo/toolCatalog';

function parseSitemapLocs(xml: string): string[] {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
}

describe('sitemap generation', () => {
  it('lists the same localized paths as the app registry', () => {
    const barePaths = extractPublicBarePaths();
    const registryPaths = getAllPublicPaths();
    const locales = ['en', 'pt', 'es'];

    const expected = locales.flatMap((locale) =>
      barePaths.map((bare) => (bare === '/' ? `/${locale}` : `/${locale}${bare}`))
    );

    expect(barePaths.length).toBeGreaterThanOrEqual(27);
    expect(registryPaths.sort()).toEqual(expected.sort());
  });

  it('public/sitemap.xml uses one HTTPS origin that matches robots.txt', () => {
    const xml = readFileSync('public/sitemap.xml', 'utf8');
    const robots = readFileSync('public/robots.txt', 'utf8');
    const locs = parseSitemapLocs(xml);

    expect(xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>')).toBe(true);
    expect(locs.length).toBe(81);

    const hosts = new Set(locs.map((loc) => new URL(loc).host));
    expect(hosts.size).toBe(1);

    const [host] = hosts;
    const origin = `https://${host}`;
    expect(robots).toContain(`Sitemap: ${origin}/sitemap.xml`);

    for (const loc of locs) {
      const parsed = new URL(loc);
      expect(parsed.protocol).toBe('https:');
      expect(parsed.host).toBe(host);
      expect(loc.startsWith(`${origin}/`)).toBe(true);
    }
  });

  it('prefers Vercel production domain over stale VITE_SITE_ORIGIN', () => {
    const origin = resolveSiteOrigin({
      VITE_SITE_ORIGIN: 'https://pdfwindows.app',
      VERCEL_ENV: 'production',
      VERCEL_PROJECT_PRODUCTION_URL: 'www.pdfwindows.com',
    });

    expect(origin).toBe('https://www.pdfwindows.com');
  });
});
