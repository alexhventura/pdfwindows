import routeMeta from './src/seo/routeMeta.generated.json';

type RouteMetaEntry = {
  lang: string;
  title: string;
  description: string;
  canonical: string;
};

const META = routeMeta as Record<string, RouteMetaEntry>;

function normalizePathname(pathname: string): string {
  const trimmed = pathname.replace(/\/$/, '');
  if (/^\/(en|pt|es)$/.test(trimmed)) return trimmed;
  if (/^\/(en|pt|es)\//.test(trimmed)) return trimmed;
  return trimmed;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function injectRouteMeta(html: string, meta: RouteMetaEntry): string {
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
    .replace(
      /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i,
      `<meta property="og:title" content="${title}" />`
    )
    .replace(
      /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i,
      `<meta property="og:description" content="${description}" />`
    )
    .replace(
      /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/i,
      `<meta property="og:url" content="${canonical}" />`
    )
    .replace(
      /<meta\s+property="og:locale"\s+content="[^"]*"\s*\/?>/i,
      `<meta property="og:locale" content="${ogLocale}" />`
    )
    .replace(
      /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/i,
      `<meta name="twitter:title" content="${title}" />`
    )
    .replace(
      /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/i,
      `<meta name="twitter:description" content="${description}" />`
    );
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
  headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');

  return new Response(html, { status: 200, headers });
}
