/**
 * Googlebot-style validation of sitemap URLs:
 * status, redirects, HTML canonical vs sitemap/routeMeta expected.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { parseSitemapLocs } from './sitemap-lib.mjs';
import { CANONICAL_ORIGIN } from './resolve-site-origin.mjs';

const UA =
  'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)';

const routeMeta = JSON.parse(
  readFileSync(new URL('../src/seo/routeMeta.generated.json', import.meta.url), 'utf8')
);

function pathnameFromUrl(absolute) {
  return new URL(absolute).pathname.replace(/\/$/, '') || '/';
}

async function fetchChain(url, { maxRedirects = 5 } = {}) {
  const chain = [];
  let current = url;

  for (let i = 0; i <= maxRedirects; i++) {
    const res = await fetch(current, {
      method: 'GET',
      redirect: 'manual',
      headers: {
        'User-Agent': UA,
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      },
    });

    const location = res.headers.get('location');
    chain.push({
      url: current,
      status: res.status,
      location: location ?? null,
    });

    if (res.status >= 300 && res.status < 400 && location) {
      current = new URL(location, current).href;
      continue;
    }

    const html = await res.text();
    return { chain, finalUrl: current, status: res.status, html };
  }

  return { chain, finalUrl: current, status: 0, html: '' };
}

function extractCanonical(html) {
  const match = html.match(
    /<link[^>]+rel=["']canonical["'][^>]*href=["']([^"']+)["'][^>]*>/i
  ) || html.match(
    /<link[^>]+href=["']([^"']+)["'][^>]*rel=["']canonical["'][^>]*>/i
  );
  return match?.[1] ?? null;
}

function extractTitle(html) {
  return html.match(/<title>([^<]*)<\/title>/i)?.[1] ?? null;
}

const sitemapLocs = parseSitemapLocs(readFileSync('public/sitemap.xml', 'utf8'));

/** Extra probes for trailing-slash / apex conflicts */
const probes = [
  ...sitemapLocs,
  `${CANONICAL_ORIGIN}/en/`,
  `${CANONICAL_ORIGIN}/pt/`,
  `${CANONICAL_ORIGIN}/es/`,
  'https://pdfwindows.com/en',
  'https://pdfwindows.com/',
];

const unique = [...new Set(probes)];
const rows = [];

for (const url of unique) {
  process.stdout.write(`fetch ${url}\n`);
  try {
    const result = await fetchChain(url);
    const htmlCanonical = result.html ? extractCanonical(result.html) : null;
    const path = pathnameFromUrl(result.finalUrl);
    const meta = routeMeta[path];
    const expectedFromMeta = meta?.canonical ?? null;
    const inSitemap = sitemapLocs.includes(url);
    const expected =
      expectedFromMeta ??
      (inSitemap ? url : null);

    const redirected = result.chain.length > 1 || result.chain[0]?.status >= 300;
    const match =
      htmlCanonical &&
      expected &&
      htmlCanonical.replace(/\/$/, '') === expected.replace(/\/$/, '');

    rows.push({
      url,
      inSitemap,
      status: result.status,
      redirect: redirected ? 'Sim' : 'Não',
      redirectChain: result.chain.map((c) => `${c.status} ${c.url}`).join(' → '),
      finalUrl: result.finalUrl,
      htmlCanonical,
      expectedCanonical: expected,
      match: match ? 'OK' : 'DIVERGENCE',
      title: result.html ? extractTitle(result.html)?.slice(0, 60) : null,
    });
  } catch (err) {
    rows.push({
      url,
      inSitemap: sitemapLocs.includes(url),
      status: 0,
      redirect: 'Erro',
      redirectChain: String(err),
      finalUrl: null,
      htmlCanonical: null,
      expectedCanonical: routeMeta[pathnameFromUrl(url)]?.canonical ?? null,
      match: 'ERROR',
      title: null,
    });
  }
}

const divergences = rows.filter((r) => r.match !== 'OK' && r.inSitemap);
const slashConflicts = rows.filter((r) => r.url.endsWith('/') && r.url.includes(CANONICAL_ORIGIN));

writeFileSync(
  'scripts/gsc-url-validation-report.json',
  JSON.stringify({ generatedAt: new Date().toISOString(), rows, divergences }, null, 2)
);

console.log('\n=== SUMMARY ===');
console.log('total_checked', rows.length);
console.log('sitemap_urls', sitemapLocs.length);
console.log('sitemap_ok', rows.filter((r) => r.inSitemap && r.match === 'OK').length);
console.log('sitemap_divergence', divergences.length);
console.log('trailing_slash_probes', slashConflicts.map((r) => `${r.url} => ${r.status} ${r.finalUrl} can=${r.htmlCanonical}`).join('\n'));

console.log('\n=== TABLE (sitemap URLs) ===');
console.log('URL\tStatus\tCanonical HTML\tCanonical esperada\tRedirect');
for (const r of rows.filter((x) => x.inSitemap)) {
  console.log(
    [r.url, r.status, r.htmlCanonical ?? '-', r.expectedCanonical ?? '-', r.redirect].join('\t')
  );
}

console.log('\n=== DIVERGENCES ===');
for (const r of divergences) {
  console.log(JSON.stringify(r, null, 2));
}

if (divergences.length) process.exitCode = 2;
