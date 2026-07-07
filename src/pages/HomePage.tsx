import { useLanguage } from '../context/LanguageContext';
import { SEO } from '../seo/SEO';
import { CatalogDashboard } from '../components/CatalogDashboard';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { LazyToolLandingBody } from '../components/LazyToolLandingBody';
import { getPageCopy, getPageToolName } from '../seo/content/getPageCopy';

export function HomePage() {
  const { lang } = useLanguage();
  const copy = getPageCopy('/', lang);
  const toolName = getPageToolName('/', lang);

  return (
    <>
      <SEO
        title={copy.title}
        description={copy.intro}
        keywords={copy.keywords}
        path="/"
        lang={lang}
        toolName="PDFWINDOWS"
        faq={copy.faq}
        breadcrumbs={[{ label: toolName, path: '/' }]}
      />
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 pt-6">
        <Breadcrumbs items={[{ label: copy.h1 }]} className="mb-4" />
        <CatalogDashboard heading={copy.h1} intro={copy.intro} />
        <LazyToolLandingBody path="/" lang={lang} />
      </div>
    </>
  );
}
