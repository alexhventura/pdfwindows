import { useEffect } from 'react';
import type { LanguageType } from '../types';
import { localizedPath, stripLocalePrefix } from '../i18n/routes';
import type { FaqItem } from './toolCatalog';
import type { BreadcrumbItem } from '../components/Breadcrumbs';
import { buildToolPageJsonLd } from './schema/buildJsonLd';

const SITE_ORIGIN = 'https://pdfwindows.app';

export interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  path?: string;
  lang: LanguageType;
  ogType?: string;
  noindex?: boolean;
  /** Tool landing page structured data */
  toolName?: string;
  faq?: FaqItem[];
  breadcrumbs?: BreadcrumbItem[];
}

function upsertMeta(name: string, content: string, attr: 'name' | 'property' = 'name') {
  let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertCanonical(href: string) {
  let el = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.rel = 'canonical';
    document.head.appendChild(el);
  }
  el.href = href;
}

const JSON_LD_ID = 'pdfwindows-jsonld';

function upsertJsonLd(data: Record<string, unknown>) {
  let el = document.getElementById(JSON_LD_ID) as HTMLScriptElement | null;
  if (!el) {
    el = document.createElement('script');
    el.id = JSON_LD_ID;
    el.type = 'application/ld+json';
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

function upsertHreflang(hreflang: string, href: string) {
  const id = `pdfwindows-hreflang-${hreflang}`;
  let el = document.getElementById(id) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.id = id;
    el.rel = 'alternate';
    document.head.appendChild(el);
  }
  el.hreflang = hreflang;
  el.href = href;
}

export function SEO({
  title,
  description,
  keywords,
  path = '/',
  lang,
  ogType = 'website',
  noindex = false,
  toolName,
  faq = [],
  breadcrumbs = [],
}: SEOProps) {
  const barePath = stripLocalePrefix(path.startsWith('/') ? path : `/${path}`);
  const canonical = `${SITE_ORIGIN}${localizedPath(lang, barePath)}`;
  const locale = lang === 'pt' ? 'pt_BR' : lang === 'es' ? 'es_ES' : 'en_US';

  useEffect(() => {
    document.title = title;
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : lang === 'es' ? 'es' : 'en';

    upsertMeta('description', description);
    if (keywords) upsertMeta('keywords', keywords);
    upsertMeta('robots', noindex ? 'noindex, nofollow' : 'index, follow');
    upsertMeta('og:title', title, 'property');
    upsertMeta('og:description', description, 'property');
    upsertMeta('og:type', ogType, 'property');
    upsertMeta('og:url', canonical, 'property');
    upsertMeta('og:locale', locale, 'property');
    upsertMeta('og:site_name', 'PDFWINDOWS', 'property');
    upsertMeta('og:image', `${SITE_ORIGIN}/logo.png`, 'property');
    upsertMeta('og:image:alt', 'PDFWINDOWS logo', 'property');
    upsertMeta('twitter:card', 'summary_large_image');
    upsertMeta('twitter:title', title);
    upsertMeta('twitter:description', description);
    upsertMeta('twitter:image', `${SITE_ORIGIN}/logo.png`);
    upsertCanonical(canonical);

    upsertHreflang('en', `${SITE_ORIGIN}${localizedPath('en', barePath)}`);
    upsertHreflang('pt-BR', `${SITE_ORIGIN}${localizedPath('pt', barePath)}`);
    upsertHreflang('es', `${SITE_ORIGIN}${localizedPath('es', barePath)}`);
    upsertHreflang('x-default', `${SITE_ORIGIN}${localizedPath('en', barePath)}`);

    const schemaBreadcrumbs = breadcrumbs.map((b) => ({
      name: b.label,
      path: b.path ?? barePath,
    }));

    if (toolName && breadcrumbs.length > 0) {
      upsertJsonLd(
        buildToolPageJsonLd({
          lang,
          barePath,
          title,
          description,
          toolName,
          faq,
          breadcrumbs: schemaBreadcrumbs,
        })
      );
    } else {
      upsertJsonLd({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'WebSite',
            '@id': `${SITE_ORIGIN}/#website`,
            url: SITE_ORIGIN,
            name: 'PDFWINDOWS',
          },
          {
            '@type': 'WebPage',
            '@id': `${canonical}#webpage`,
            url: canonical,
            name: title,
            description,
            inLanguage: lang === 'pt' ? 'pt-BR' : lang === 'es' ? 'es' : 'en',
            isPartOf: { '@id': `${SITE_ORIGIN}/#website` },
          },
        ],
      });
    }
  }, [
    title,
    description,
    keywords,
    canonical,
    locale,
    ogType,
    noindex,
    lang,
    barePath,
    toolName,
    faq,
    breadcrumbs,
  ]);

  return null;
}

export { SITE_ORIGIN };
