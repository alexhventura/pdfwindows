import { writeFileSync } from 'node:fs';
import { extractPublicBarePaths } from './extract-public-paths.mjs';
import { normalizeOrigin, originHost, resolveSiteOrigin } from './resolve-site-origin.mjs';

const SITE_ORIGIN = resolveSiteOrigin();
const SITEMAP_HOST = originHost(SITE_ORIGIN);
const locales = ['en', 'pt', 'es'];
const barePaths = extractPublicBarePaths();

function buildLocalizedPath(locale, barePath) {
  if (barePath === '/') return `/${locale}`;
  return `/${locale}${barePath}`;
}

function buildAbsoluteUrl(locale, barePath) {
  return `${SITE_ORIGIN}${buildLocalizedPath(locale, barePath)}`;
}

function escapeXml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

const urls = [];
for (const locale of locales) {
  for (const barePath of barePaths) {
    const loc = buildAbsoluteUrl(locale, barePath);
    const parsed = new URL(loc);

    if (parsed.protocol !== 'https:') {
      throw new Error(`Sitemap URL must use HTTPS: ${loc}`);
    }
    if (parsed.host !== SITEMAP_HOST) {
      throw new Error(
        `Sitemap host mismatch: <loc> host "${parsed.host}" does not match sitemap origin host "${SITEMAP_HOST}" (${loc})`
      );
    }

    const priority = barePath === '/' ? '1.0' : barePath === '/ferramentas' || barePath === '/conversor' ? '0.9' : '0.8';
    const changefreq = barePath === '/' || barePath === '/ferramentas' || barePath === '/conversor' ? 'weekly' : 'monthly';
    urls.push({ loc, priority, changefreq });
  }
}

const lines = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...urls.map(
    ({ loc, changefreq, priority }) =>
      `  <url><loc>${escapeXml(loc)}</loc><changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>`
  ),
  '</urlset>',
  '',
];

writeFileSync('public/sitemap.xml', lines.join('\n'));

writeFileSync(
  'public/robots.txt',
  `User-agent: *
Allow: /

Sitemap: ${SITE_ORIGIN}/sitemap.xml
`
);

console.log(`Generated sitemap.xml and robots.txt`);
console.log(`  Origin: ${SITE_ORIGIN}`);
console.log(`  Sitemap: ${SITE_ORIGIN}/sitemap.xml`);
console.log(`  URLs: ${urls.length} (${locales.length} locales × ${barePaths.length} pages)`);
