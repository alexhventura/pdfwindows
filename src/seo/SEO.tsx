import { useEffect } from 'react';
import type { LanguageType } from '../types';

const SITE_ORIGIN = 'https://pdfwindows.app';

export interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  path?: string;
  lang: LanguageType;
  ogType?: string;
  noindex?: boolean;
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

function upsertLink(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
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

export function SEO({
  title,
  description,
  keywords,
  path = '/',
  lang,
  ogType = 'website',
  noindex = false,
}: SEOProps) {
  const canonical = `${SITE_ORIGIN}${path.startsWith('/') ? path : `/${path}`}`;
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
    upsertMeta('og:image', `${SITE_ORIGIN}/logo.png`, 'property');
    upsertMeta('twitter:card', 'summary_large_image');
    upsertMeta('twitter:title', title);
    upsertMeta('twitter:description', description);
    upsertMeta('twitter:image', `${SITE_ORIGIN}/logo.png`);
    upsertLink('canonical', canonical);

    upsertJsonLd({
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'PDFWINDOWS',
      url: canonical,
      description,
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Any',
      inLanguage: lang === 'pt' ? 'pt-BR' : lang === 'es' ? 'es' : 'en',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      image: `${SITE_ORIGIN}/logo.png`,
    });
  }, [title, description, keywords, canonical, locale, ogType, noindex, lang]);

  return null;
}

export { SITE_ORIGIN };
