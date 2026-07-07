import type { LanguageType } from '../../types';
import type { FaqItem } from '../toolCatalog';
import { localizedPath } from '../../i18n/routes';

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export interface ToolSchemaInput {
  lang: LanguageType;
  barePath: string;
  title: string;
  description: string;
  toolName: string;
  faq: FaqItem[];
  breadcrumbs: BreadcrumbItem[];
  siteOrigin: string;
}

const FEATURE_LIST: Record<LanguageType, string> = {
  pt: 'Ferramentas de PDF e imagem no navegador, conversão rápida, sem cadastro',
  en: 'Browser-based PDF and image tools, fast conversion, no account required',
  es: 'Herramientas de PDF e imagen en el navegador, conversión rápida, sin registro',
};

export function buildToolPageJsonLd(input: ToolSchemaInput): Record<string, unknown> {
  const { lang, barePath, title, description, toolName, faq, breadcrumbs, siteOrigin } = input;
  const pageUrl = `${siteOrigin}${localizedPath(lang, barePath)}`;
  const inLanguage = lang === 'pt' ? 'pt-BR' : lang === 'es' ? 'es' : 'en';

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
    inLanguage,
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
    provider: {
      '@type': 'Organization',
      name: 'PDFWINDOWS',
      url: siteOrigin,
    },
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

  const website = {
    '@type': 'WebSite',
    '@id': `${siteOrigin}/#website`,
    url: siteOrigin,
    name: 'PDFWINDOWS',
    publisher: { '@type': 'Organization', name: 'PDFWINDOWS' },
  };

  const graph = [website, webPage, breadcrumbList, software, ...(faqPage ? [faqPage] : [])];

  return { '@context': 'https://schema.org', '@graph': graph };
}
