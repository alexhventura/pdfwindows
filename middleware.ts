import routeMeta from './src/seo/routeMeta.generated.json';

type RouteMetaAlternate = {
  hreflang: string;
  href: string;
};

type RouteMetaEntry = {
  lang: string;
  title: string;
  description: string;
  keywords?: string;
  canonical: string;
  alternates?: RouteMetaAlternate[];
};

const META = routeMeta as Record<string, RouteMetaEntry>;

function normalizePathname(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith('/')) {
    return pathname.slice(0, -1);
  }
  return pathname;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function upsertOrReplace(
  html: string,
  pattern: RegExp,
  replacement: string,
  insertBefore: string = '</head>'
): string {
  if (pattern.test(html)) {
    return html.replace(pattern, replacement);
  }
  return html.replace(insertBefore, `    ${replacement}\n${insertBefore}`);
}

function injectHreflang(html: string, alternates: RouteMetaAlternate[]): string {
  // Remove prior injected hreflang links (edge or stale shell).
  let next = html.replace(
    /<link\s+rel="alternate"\s+hreflang="[^"]*"\s+href="[^"]*"\s*\/?>\s*/gi,
    ''
  );

  const tags = alternates
    .map(
      (alt) =>
        `<link rel="alternate" hreflang="${escapeHtml(alt.hreflang)}" href="${escapeHtml(alt.href)}" />`
    )
    .join('\n    ');

  return next.replace('</head>', `    ${tags}\n  </head>`);
}

function injectRouteMeta(html: string, meta: RouteMetaEntry): string {
  const title = escapeHtml(meta.title);
  const description = escapeHtml(meta.description);
  const canonical = escapeHtml(meta.canonical);
  const keywords = escapeHtml(meta.keywords ?? '');
  const ogLocale = meta.lang === 'pt-BR' ? 'pt_BR' : meta.lang === 'es' ? 'es_ES' : 'en_US';

  let next = html
    .replace(/<html\s+lang="[^"]*"/i, `<html lang="${meta.lang}"`)
    .replace(/<title>[^<]*<\/title>/i, `<title>${title}</title>`);

  next = upsertOrReplace(
    next,
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="description" content="${description}" />`
  );
  next = upsertOrReplace(
    next,
    /<meta\s+name="robots"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="robots" content="index, follow" />`
  );
  if (keywords) {
    next = upsertOrReplace(
      next,
      /<meta\s+name="keywords"\s+content="[^"]*"\s*\/?>/i,
      `<meta name="keywords" content="${keywords}" />`
    );
  }
  next = upsertOrReplace(
    next,
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i,
    `<link rel="canonical" href="${canonical}" />`
  );
  next = upsertOrReplace(
    next,
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:title" content="${title}" />`
  );
  next = upsertOrReplace(
    next,
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:description" content="${description}" />`
  );
  next = upsertOrReplace(
    next,
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:url" content="${canonical}" />`
  );
  next = upsertOrReplace(
    next,
    /<meta\s+property="og:locale"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:locale" content="${ogLocale}" />`
  );
  next = upsertOrReplace(
    next,
    /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:title" content="${title}" />`
  );
  next = upsertOrReplace(
    next,
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:description" content="${description}" />`
  );

  if (meta.alternates?.length) {
    next = injectHreflang(next, meta.alternates);
  }

  // Align static JSON-LD url with the page canonical when present.
  next = next.replace(
    /("url"\s*:\s*")https:\/\/www\.pdfwindows\.com\/[^"]*(")/,
    `$1${canonical}$2`
  );

  return next;
}

export const config = {
  matcher: ['/((?!assets/|logo|icon|manifest|sw\\.js|sitemap\\.xml|robots\\.txt|.*\\.[a-zA-Z0-9]+$).*)'],
};

export default async function middleware(request: Request) {
  const accept = request.headers.get('accept') ?? '';
  if (!accept.includes('text/html')) {
    return;
  }

  const url = new URL(request.url);
  const pathname = normalizePathname(url.pathname);
  const meta = META[pathname];
  if (!meta) {
    return;
  }

  const indexUrl = new URL('/index.html', request.url);
  const response = await fetch(indexUrl.toString());
  if (!response.ok) {
    return;
  }

  const html = injectRouteMeta(await response.text(), meta);
  const headers = new Headers(response.headers);
  headers.set('Content-Type', 'text/html; charset=utf-8');
  headers.set('Cache-Control', 'public, max-age=0, must-revalidate');
  headers.set('X-Robots-Tag', 'index, follow');

  return new Response(html, { status: 200, headers });
}
