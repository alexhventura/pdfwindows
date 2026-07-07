import type { LanguageType } from '../../types';
import type { FaqItem } from '../toolCatalog';
import { localizedPath } from '../../i18n/routes';

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export interface ToolSchemaInput {
  lang: LanguageType;
  canonicalPath: string;
  title: string;
  description: string;
  toolName: string;
  faq: FaqItem[];
  breadcrumbs: BreadcrumbItem[];
  siteOrigin: string;
}

export interface HomeSchemaInput {
  lang: LanguageType;
  canonicalPath: string;
  title: string;
  description: string;
  siteOrigin: string;
}

const FEATURE_LIST: Record<LanguageType, string> = {
  pt: 'Ferramentas de PDF e imagem no navegador, conversão rápida, sem cadastro',
  en: 'Browser-based PDF and image tools, fast conversion, no account required',
  es: 'Herramientas de PDF e imagen en el navegador, conversión rápida, sin registro',
};

function inLanguage(lang: LanguageType): string {
  return lang === 'pt' ? 'pt-BR' : lang === 'es' ? 'es' : 'en';
}

function buildOrganization(siteOrigin: string) {
  return {
    '@type': 'Organization',
    '@id': `${siteOrigin}/#organization`,
    name: 'PDFWINDOWS',
    url: siteOrigin,
    logo: `${siteOrigin}/logo.png`,
  };
}

function buildWebsite(siteOrigin: string) {
  return {
    '@type': 'WebSite',
    '@id': `${siteOrigin}/#website`,
    url: siteOrigin,
    name: 'PDFWINDOWS',
    publisher: { '@id': `${siteOrigin}/#organization` },
    inLanguage: ['en', 'pt-BR', 'es'],
  };
}

export function buildHomePageJsonLd(input: HomeSchemaInput): Record<string, unknown> {
  const { lang, canonicalPath, title, description, siteOrigin } = input;
  const pageUrl = `${siteOrigin}${localizedPath(lang, canonicalPath)}`;

  const organization = buildOrganization(siteOrigin);
  const website = buildWebsite(siteOrigin);

  const webPage = {
    '@type': 'WebPage',
    '@id': `${pageUrl}#webpage`,
    url: pageUrl,
    name: title,
    description,
    inLanguage: inLanguage(lang),
    isPartOf: { '@id': `${siteOrigin}/#website` },
    about: { '@id': `${siteOrigin}/#webapp` },
  };

  const webApp = {
    '@type': 'WebApplication',
    '@id': `${siteOrigin}/#webapp`,
    name: 'PDFWINDOWS',
    url: siteOrigin,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Web Browser',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    description: FEATURE_LIST[lang],
    image: `${siteOrigin}/logo.png`,
    provider: { '@id': `${siteOrigin}/#organization` },
  };

  return {
    '@context': 'https://schema.org',
    '@graph': [organization, website, webPage, webApp],
  };
}

export function buildToolPageJsonLd(input: ToolSchemaInput): Record<string, unknown> {
  const { lang, canonicalPath, title, description, toolName, faq, breadcrumbs, siteOrigin } = input;
  const pageUrl = `${siteOrigin}${localizedPath(lang, canonicalPath)}`;

  const breadcrumbList = {
    '@type': 'BreadcrumbList',
    '@id': `${pageUrl}#breadcrumb`,
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: `${siteOrigin}${localizedPath(lang, crumb.path)}`,
    })),
  };

  const webPage = {
    '@type': 'WebPage',
    '@id': `${pageUrl}#webpage`,
    url: pageUrl,
    name: title,
    description,
    inLanguage: inLanguage(lang),
    isPartOf: { '@id': `${siteOrigin}/#website` },
    breadcrumb: { '@id': `${pageUrl}#breadcrumb` },
    about: { '@id': `${pageUrl}#software` },
  };

  const software = {
    '@type': 'SoftwareApplication',
    '@id': `${pageUrl}#software`,
    name: toolName,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Web Browser',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    description,
    url: pageUrl,
    image: `${siteOrigin}/logo.png`,
    featureList: FEATURE_LIST[lang],
    provider: { '@id': `${siteOrigin}/#organization` },
  };

  const faqPage =
    faq.length > 0
      ? {
          '@type': 'FAQPage',
          '@id': `${pageUrl}#faq`,
          mainEntity: faq.map((item) => ({
            '@type': 'Question',
            name: item.q,
            acceptedAnswer: { '@type': 'Answer', text: item.a },
          })),
        }
      : null;

  const organization = buildOrganization(siteOrigin);
  const website = buildWebsite(siteOrigin);

  const graph = [organization, website, webPage, breadcrumbList, software, ...(faqPage ? [faqPage] : [])];

  return { '@context': 'https://schema.org', '@graph': graph };
}
