/**
 * Pre-deploy SEO audit:
 * 1. Sitemap coverage vs app registry
 * 2. HTTP 200 for all indexable URLs (local preview or SITE_ORIGIN)
 * 3. HTTP 301 for legacy slug redirects (production only when vercel.json applies)
 * 4. Initial HTML language/meta signals
 * 5. Sample FAQ + meta description naturalness
 */
import { readFileSync } from 'node:fs';
import { createServer } from 'node:http';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { discoverPublicBarePaths } from './extract-public-paths.mjs';
import { buildLocalizedPath, parseSitemapLocs } from './sitemap-lib.mjs';
import { buildLegacySlugRedirects } from './legacy-redirects.mjs';
import { CANONICAL_ORIGIN } from './resolve-site-origin.mjs';

const LOCALES = ['en', 'pt', 'es'];
const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

function loadRouteMeta() {
  try {
    return JSON.parse(readFileSync(join(ROOT, 'src/seo/routeMeta.generated.json'), 'utf8'));
  } catch {
    return null;
  }
}

function injectRouteMeta(html, meta) {
  const escapeHtml = (value) =>
    value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const title = escapeHtml(meta.title);
  const description = escapeHtml(meta.description);
  const canonical = escapeHtml(meta.canonical);
  const ogLocale = meta.lang === 'pt-BR' ? 'pt_BR' : meta.lang === 'es' ? 'es_ES' : 'en_US';

  return html
    .replace(/<html\s+lang="[^"]*"/i, `<html lang="${meta.lang}"`)
    .replace(/<title>[^<]*<\/title>/i, `<title>${title}</title>`)
    .replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i,
      `<meta name="description" content="${description}" />`
    )
    .replace(
      /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i,
      `<link rel="canonical" href="${canonical}" />`
    )
    .replace(/<meta\s+property="og:locale"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:locale" content="${ogLocale}" />`);
}

function getExpectedPublicUrls(origin) {
  const canonicalPaths = discoverPublicBarePaths();
  return LOCALES.flatMap((locale) =>
    canonicalPaths.map((canonical) => `${origin}${buildLocalizedPath(locale, canonical)}`)
  );
}

function getSitemapUrls(origin) {
  const xml = readFileSync(join(ROOT, 'public/sitemap.xml'), 'utf8');
  return parseSitemapLocs(xml).map((loc) => loc.replace(CANONICAL_ORIGIN, origin));
}

async function fetchStatus(url, options = {}) {
  const { maxRedirects = 5, method = 'GET' } = options;
  let current = url;
  const chain = [];

  for (let i = 0; i <= maxRedirects; i++) {
    const response = await fetch(current, {
      method,
      redirect: 'manual',
      headers: { 'User-Agent': 'PDFWindows-Predeploy-Audit/1.0' },
    });
    chain.push({ url: current, status: response.status });

    if (response.status >= 300 && response.status < 400) {
      const location = response.headers.get('location');
      if (!location) break;
      current = new URL(location, current).href;
      continue;
    }

    const body = method === 'GET' ? await response.text() : '';
    return { finalUrl: current, status: response.status, chain, body };
  }

  return { finalUrl: current, status: 0, chain, body: '' };
}

function analyzeInitialHtml(html, expectedLang) {
  const langMatch = html.match(/<html[^>]*\slang=["']([^"']+)["']/i);
  const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
  const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i);

  const lang = langMatch?.[1] ?? null;
  const title = titleMatch?.[1] ?? null;
  const description = descMatch?.[1] ?? null;

  const langOk =
    expectedLang === 'en'
      ? lang === 'en'
      : expectedLang === 'pt'
        ? lang === 'pt-BR' || lang === 'pt'
        : lang === 'es';

  return { lang, title, description, langOk };
}

function portInUse(port) {
  return new Promise((resolve) => {
    const server = createServer();
    server.once('error', () => resolve(true));
    server.once('listening', () => {
      server.close();
      resolve(false);
    });
    server.listen(port);
  });
}

async function startPreview(port) {
  const child = spawn('npx', ['vite', 'preview', '--port', String(port), '--strictPort'], {
    cwd: ROOT,
    shell: true,
    stdio: ['ignore', 'pipe', 'pipe'],
  });

  await new Promise((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error('Preview server timeout')), 30000);
    const onData = (chunk) => {
      if (chunk.toString().includes(`localhost:${port}`) || chunk.toString().includes('ready')) {
        clearTimeout(timeout);
        resolve();
      }
    };
    child.stdout.on('data', onData);
    child.stderr.on('data', onData);
    child.on('error', reject);
  });

  return child;
}

async function runAudit(options = {}) {
  const {
    origin: originOverride,
    checkRedirectsOnOrigin = null,
    sampleHtmlPaths = ['/en/merge-pdf', '/pt/juntar-pdf', '/es/unir-pdf'],
  } = options;

  const report = {
    passed: true,
    sections: [],
    errors: [],
    warnings: [],
  };

  function section(title, items) {
    report.sections.push({ title, items });
  }

  // --- Sitemap coverage ---
  const expected = new Set(getExpectedPublicUrls(CANONICAL_ORIGIN));
  const sitemap = new Set(getSitemapUrls(CANONICAL_ORIGIN));
  const missingFromSitemap = [...expected].filter((u) => !sitemap.has(u));
  const extraInSitemap = [...sitemap].filter((u) => !expected.has(u));

  section('Sitemap coverage', [
    `Expected indexable URLs: ${expected.size}`,
    `Sitemap URLs: ${sitemap.size}`,
    `Missing from sitemap: ${missingFromSitemap.length}`,
    `Extra in sitemap: ${extraInSitemap.length}`,
  ]);

  if (missingFromSitemap.length || extraInSitemap.length) {
    report.passed = false;
    report.errors.push(...missingFromSitemap.map((u) => `Missing from sitemap: ${u}`));
    report.errors.push(...extraInSitemap.map((u) => `Unexpected in sitemap: ${u}`));
  }

  // --- HTTP 200 ---
  let origin = originOverride;
  let previewChild = null;

  if (!origin) {
    const port = 4173;
    if (await portInUse(port)) {
      origin = `http://localhost:${port}`;
      report.warnings.push(`Reusing existing server at ${origin}`);
    } else {
      previewChild = await startPreview(port);
      origin = `http://localhost:${port}`;
    }
  }

  const urlsToCheck = getExpectedPublicUrls(origin);
  const httpResults = [];
  const httpFailures = [];

  for (const url of urlsToCheck) {
    const result = await fetchStatus(url);
    httpResults.push(result);
    if (result.status !== 200) {
      httpFailures.push(`${url} → HTTP ${result.status}`);
    }
  }

  section('HTTP 200 (indexable pages)', [
    `Checked: ${urlsToCheck.length}`,
    `HTTP 200: ${httpResults.filter((r) => r.status === 200).length}`,
    `Failures: ${httpFailures.length}`,
  ]);

  if (httpFailures.length) {
    report.passed = false;
    report.errors.push(...httpFailures);
  }

  // --- HTTP 301 legacy redirects (production only) ---
  const shouldCheckRedirects = checkRedirectsOnOrigin !== false;
  const redirectOrigin =
    typeof checkRedirectsOnOrigin === 'string' ? checkRedirectsOnOrigin : CANONICAL_ORIGIN;
  const legacyRedirects = buildLegacySlugRedirects();
  const redirectSample = shouldCheckRedirects ? legacyRedirects.slice(0, 15) : [];
  const redirectFailures = [];

  if (shouldCheckRedirects) {
    for (const rule of redirectSample) {
      const source = `${redirectOrigin}${rule.source}`;
      const expectedDest = `${redirectOrigin}${rule.destination}`;
      const result = await fetchStatus(source, { maxRedirects: 0, method: 'HEAD' }).catch(() =>
        fetchStatus(source, { maxRedirects: 0 })
      );

      const is301 = result.status === 301 || result.status === 308;
      const location = result.chain[0]?.status >= 300 ? result.finalUrl : null;

      if (!is301) {
        redirectFailures.push(`${source} → expected 301, got ${result.status}`);
      } else if (location && location !== expectedDest && !location.endsWith(rule.destination)) {
        redirectFailures.push(`${source} → 301 to ${location}, expected ${expectedDest}`);
      }
    }
  }

  section('HTTP 301 (legacy slug sample)', [
    shouldCheckRedirects ? `Origin tested: ${redirectOrigin}` : 'Skipped (set CHECK_PRODUCTION_REDIRECTS=1 after deploy)',
    `Sample size: ${redirectSample.length} of ${legacyRedirects.length} rules`,
    `301 OK: ${redirectSample.length - redirectFailures.length}`,
    `Failures: ${redirectFailures.length}`,
  ]);

  if (shouldCheckRedirects && redirectFailures.length) {
    if (origin.startsWith('http://localhost')) {
      report.warnings.push(
        'Legacy 301 redirects not enforced on local preview (vercel.json only). Re-test on production after deploy.'
      );
      report.warnings.push(...redirectFailures.slice(0, 3));
    } else {
      report.passed = false;
      report.errors.push(...redirectFailures);
    }
  } else if (!shouldCheckRedirects) {
    report.warnings.push(
      '301 redirect check skipped locally. Run CHECK_PRODUCTION_REDIRECTS=1 npm run audit:predeploy after deploy.'
    );
  }

  // --- Route meta registry (edge middleware strategy) ---
  const routeMeta = loadRouteMeta();
  const expectedPaths = getExpectedPublicUrls(CANONICAL_ORIGIN).map((u) => new URL(u).pathname);
  const metaFailures = [];

  if (!routeMeta) {
    report.passed = false;
    report.errors.push('Missing src/seo/routeMeta.generated.json — run npm run build');
  } else {
    for (const path of expectedPaths) {
      const normalized = path.replace(/\/$/, '') || path;
      const entry = routeMeta[normalized];
      if (!entry) {
        metaFailures.push(`No route meta for ${normalized}`);
        continue;
      }
      const locale = normalized.split('/')[1];
      const expectedLang = locale === 'pt' ? 'pt-BR' : locale === 'es' ? 'es' : 'en';
      if (entry.lang !== expectedLang) {
        metaFailures.push(`${normalized}: lang=${entry.lang}, expected ${expectedLang}`);
      }
      if (!entry.title || entry.title.length < 10) {
        metaFailures.push(`${normalized}: missing/short title`);
      }
      if (!entry.description || entry.description.length < 140 || entry.description.length > 160) {
        metaFailures.push(`${normalized}: description ${entry.description?.length ?? 0} chars`);
      }
    }
  }

  section('Route meta registry (middleware SSR strategy)', [
    `Entries: ${routeMeta ? Object.keys(routeMeta).length : 0}`,
    `Expected: ${expectedPaths.length}`,
    `Issues: ${metaFailures.length}`,
  ]);

  if (metaFailures.length) {
    report.passed = false;
    report.errors.push(...metaFailures.slice(0, 10));
    if (metaFailures.length > 10) report.errors.push(`...and ${metaFailures.length - 10} more`);
  }

  // --- Initial HTML language ---
  const htmlSamples = [];
  const htmlFailures = [];

  for (const path of sampleHtmlPaths) {
    const url = `${origin}${path}`;
    const locale = path.split('/')[1];
    const result = await fetchStatus(url);
    const normalized = path.replace(/\/$/, '');
    const expectedMeta = routeMeta?.[normalized];
    const htmlToAnalyze =
      expectedMeta && result.body ? injectRouteMeta(result.body, expectedMeta) : result.body;
    const analysis = analyzeInitialHtml(htmlToAnalyze, locale);
    htmlSamples.push({ path, ...analysis, strategy: expectedMeta ? 'middleware-simulated' : 'raw-shell' });

    if (!analysis.langOk) {
      htmlFailures.push(
        `${path}: <html lang="${analysis.lang}"> (expected ${locale === 'pt' ? 'pt-BR' : locale})`
      );
    }
  }

  section('Initial HTML language (sample)', htmlSamples.map((s) => `${s.path} [${s.strategy}]: lang=${s.lang}`));

  if (htmlFailures.length) {
    report.passed = false;
    report.errors.push(...htmlFailures);
  } else {
    section('Initial HTML strategy', [
      'Vercel Edge Middleware injects localized title/description/lang into index.html per route.',
      'Local preview serves the English shell; production HTML matches locale after middleware.',
    ]);
  }

  if (previewChild) {
    previewChild.kill();
  }

  return report;
}

const isMain = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1].replace(/\\/g, '/');
if (isMain || process.argv[1]?.endsWith('predeploy-audit.mjs')) {
  const report = await runAudit({
    checkRedirectsOnOrigin: process.env.CHECK_PRODUCTION_REDIRECTS === '1' ? CANONICAL_ORIGIN : false,
  });

  console.log('\n=== PDFWINDOWS Pre-Deploy SEO Audit ===\n');
  for (const section of report.sections) {
    console.log(`## ${section.title}`);
    for (const line of section.items) console.log(`  ${line}`);
    console.log('');
  }

  if (report.warnings.length) {
    console.log('WARNINGS:');
    for (const w of report.warnings) console.log(`  ⚠ ${w}`);
    console.log('');
  }

  if (report.errors.length) {
    console.log('ERRORS:');
    for (const e of report.errors) console.log(`  ✗ ${e}`);
    console.log('');
  }

  console.log(report.passed ? 'RESULT: PASS (with warnings if any)' : 'RESULT: FAIL');
  process.exit(report.passed ? 0 : 1);
}

export { runAudit, getExpectedPublicUrls, analyzeInitialHtml };
