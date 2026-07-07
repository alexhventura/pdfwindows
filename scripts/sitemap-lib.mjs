import { execSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { CANONICAL_HOST, CANONICAL_ORIGIN } from './resolve-site-origin.mjs';
import localizedPaths from '../src/seo/localizedPaths.json' with { type: 'json' };

export const LOCALES = ['en', 'pt', 'es'];

export const HREFLANG_BY_LOCALE = {
  en: 'en',
  pt: 'pt-BR',
  es: 'es',
};

const NON_INDEXABLE_CANONICAL_PATHS = new Set(['/ferramentas', '/gerador-recibos', '/capturador-cores']);

const STATIC_PAGE_SOURCES = {
  '/': ['src/pages/HomePage.tsx', 'src/seo/content/home.ts'],
  '/ferramentas': ['src/pages/ToolsCatalogPage.tsx'],
  '/conversor': ['src/pages/FullConverterPage.tsx', 'src/seo/content/home.ts'],
};

const gitLastModCache = new Map();

/** Build localized public path from canonical internal path. */
export function buildLocalizedPath(locale, canonicalPath) {
  if (canonicalPath === '/') return `/${locale}`;
  const entry = localizedPaths[canonicalPath];
  const localized = entry?.[locale] ?? canonicalPath;
  return `/${locale}${localized}`;
}

export function buildAbsoluteUrl(origin, locale, canonicalPath) {
  return `${origin}${buildLocalizedPath(locale, canonicalPath)}`;
}

export function escapeXml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function getGitLastModDate(filePath, env = process.env) {
  if (gitLastModCache.has(filePath)) {
    return gitLastModCache.get(filePath);
  }

  if (!existsSync(filePath)) {
    gitLastModCache.set(filePath, null);
    return null;
  }

  try {
    const iso = execSync(`git log -1 --format=%cI -- "${filePath}"`, {
      encoding: 'utf8',
      env,
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();

    const date = iso ? iso.split('T')[0] : null;
    gitLastModCache.set(filePath, date);
    return date;
  } catch {
    gitLastModCache.set(filePath, null);
    return null;
  }
}

export function pathToSourceFiles(barePath) {
  if (STATIC_PAGE_SOURCES[barePath]) {
    return STATIC_PAGE_SOURCES[barePath];
  }

  const segment = barePath.replace(/^\//, '');
  const files = ['src/seo/toolCatalog.ts', `src/seo/content/tools/${segment}.ts`];
  return files.filter((file) => existsSync(file));
}

export function getLastModForBarePath(barePath, options = {}) {
  const { env = process.env, buildDate = new Date() } = options;
  const dates = pathToSourceFiles(barePath)
    .map((file) => getGitLastModDate(file, env))
    .filter(Boolean);

  if (dates.length > 0) {
    return dates.sort().at(-1);
  }

  return buildDate.toISOString().split('T')[0];
}

export function buildHreflangAlternates(origin, barePath) {
  return LOCALES.map((locale) => ({
    hreflang: HREFLANG_BY_LOCALE[locale],
    href: buildAbsoluteUrl(origin, locale, barePath),
  })).concat({
    hreflang: 'x-default',
    href: buildAbsoluteUrl(origin, 'en', barePath),
  });
}

export function buildSitemapUrlEntries(barePaths, origin, options = {}) {
  const entries = [];

  for (const barePath of barePaths) {
    const lastmod = getLastModForBarePath(barePath, options);
    const alternates = buildHreflangAlternates(origin, barePath);

    for (const locale of LOCALES) {
      const loc = buildAbsoluteUrl(origin, locale, barePath);
      entries.push({ loc, lastmod, alternates, barePath, locale });
    }
  }

  return entries;
}

export function renderSitemapXml(entries) {
  const lines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
  ];

  for (const entry of entries) {
    lines.push('  <url>');
    lines.push(`    <loc>${escapeXml(entry.loc)}</loc>`);
    lines.push(`    <lastmod>${entry.lastmod}</lastmod>`);
    for (const alternate of entry.alternates) {
      lines.push(
        `    <xhtml:link rel="alternate" hreflang="${escapeXml(alternate.hreflang)}" href="${escapeXml(alternate.href)}"/>`
      );
    }
    lines.push('  </url>');
  }

  lines.push('</urlset>', '');
  return lines.join('\n');
}

export function renderRobotsTxt(origin) {
  return `User-agent: *
Allow: /

Sitemap: ${origin}/sitemap.xml
`;
}

export function parseSitemapLocs(xml) {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
}

export function parseSitemapHreflangLinks(xml) {
  return [...xml.matchAll(/<xhtml:link[^>]+hreflang="([^"]+)"[^>]+href="([^"]+)"/g)].map((match) => ({
    hreflang: match[1],
    href: match[2],
  }));
}

const FORBIDDEN_HOST_PATTERNS = [/\.app$/i, /\.vercel\.app$/i];

export function validateSitemapXml(xml, origin = CANONICAL_ORIGIN) {
  const errors = [];

  if (!xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>')) {
    errors.push('Missing UTF-8 XML declaration');
  }

  if (!xml.includes('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"')) {
    errors.push('Missing sitemap xmlns');
  }

  if (!xml.includes('xmlns:xhtml="http://www.w3.org/1999/xhtml"')) {
    errors.push('Missing xhtml xmlns for hreflang alternates');
  }

  if (/<html[\s>]/i.test(xml)) {
    errors.push('Sitemap must not contain HTML');
  }

  if (/<changefreq>|<priority>/i.test(xml)) {
    errors.push('changefreq and priority should be omitted');
  }

  const locs = parseSitemapLocs(xml);
  if (locs.length === 0) {
    errors.push('Sitemap has no URLs');
  }

  const uniqueLocs = new Set(locs);
  if (uniqueLocs.size !== locs.length) {
    errors.push('Duplicate <loc> entries found');
  }

  const expectedHost = new URL(origin).host;

  for (const loc of locs) {
    let parsed;
    try {
      parsed = new URL(loc);
    } catch {
      errors.push(`Invalid URL: ${loc}`);
      continue;
    }

    if (parsed.protocol !== 'https:') {
      errors.push(`URL must use HTTPS: ${loc}`);
    }

    if (parsed.host !== expectedHost) {
      errors.push(`URL host must be ${expectedHost}: ${loc}`);
    }

    for (const pattern of FORBIDDEN_HOST_PATTERNS) {
      if (pattern.test(parsed.host) || loc.includes('pdfwindows.app') || loc.includes('vercel.app')) {
        errors.push(`Forbidden host in URL: ${loc}`);
      }
    }
  }

  const urlBlocks = [...xml.matchAll(/<url>[\s\S]*?<\/url>/g)].map((match) => match[0]);
  if (urlBlocks.length !== locs.length) {
    errors.push('Malformed <url> blocks');
  }

  for (const block of urlBlocks) {
    if (!/<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/.test(block)) {
      errors.push('Each <url> must include <lastmod> in YYYY-MM-DD format');
      break;
    }

    for (const hreflang of ['en', 'pt-BR', 'es', 'x-default']) {
      if (!block.includes(`hreflang="${hreflang}"`)) {
        errors.push(`Missing hreflang="${hreflang}" alternate in a <url> block`);
        break;
      }
    }
  }

  return { valid: errors.length === 0, errors, locCount: locs.length };
}

export function validateRobotsTxt(robots, origin = CANONICAL_ORIGIN) {
  const errors = [];

  if (!/^User-agent:\s*\*/m.test(robots)) {
    errors.push('robots.txt must include User-agent: *');
  }

  if (!/^Allow:\s*\/$/m.test(robots)) {
    errors.push('robots.txt must allow /');
  }

  const sitemapLines = robots.match(/^Sitemap:\s*.+$/gm) ?? [];
  if (sitemapLines.length !== 1) {
    errors.push('robots.txt must declare exactly one Sitemap');
  } else if (!sitemapLines[0].includes(`${origin}/sitemap.xml`)) {
    errors.push(`robots.txt Sitemap must be ${origin}/sitemap.xml`);
  }

  return { valid: errors.length === 0, errors };
}

export function assertCanonicalHost(origin) {
  if (originHostFromOrigin(origin) !== CANONICAL_HOST) {
    throw new Error(`Sitemap origin must be ${CANONICAL_ORIGIN}, received ${origin}`);
  }
}

function originHostFromOrigin(origin) {
  return new URL(origin).host;
}
