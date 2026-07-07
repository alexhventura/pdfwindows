import { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { SEO } from '../seo/SEO';
import { CatalogDashboard } from '../components/CatalogDashboard';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { LazyToolLandingBody } from '../components/LazyToolLandingBody';
import { getPageCopy, getPageToolName } from '../seo/content/getPageCopy';
import { scrollToAnchor, TOOL_CATALOG_ID, TOOL_START_ID } from '../utils/scrollToToolStart';

export function HomePage() {
  const { lang } = useLanguage();
  const copy = getPageCopy('/', lang);
  const toolName = getPageToolName('/', lang);

  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, '');
    if (hash !== TOOL_CATALOG_ID && hash !== TOOL_START_ID) return;

    const timer = window.setTimeout(() => {
      scrollToAnchor(TOOL_CATALOG_ID, { behavior: 'smooth' });
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

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
