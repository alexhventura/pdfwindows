import { useLanguage } from '../context/LanguageContext';
import { SEO } from '../seo/SEO';
import { HOME_COPY } from '../seo/toolCatalog';
import { CatalogDashboard } from '../components/CatalogDashboard';

export function HomePage() {
  const { lang } = useLanguage();
  const copy = HOME_COPY[lang];

  return (
    <>
      <SEO title={copy.title} description={copy.description} keywords={copy.keywords} path="/" lang={lang} />
      <CatalogDashboard />
    </>
  );
}
