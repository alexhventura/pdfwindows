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
        description={copy.description}
        keywords={copy.keywords}
        path="/"
        lang={lang}
        toolName="PDFWINDOWS"
        faq={copy.faq}
        breadcrumbs={[{ label: toolName, path: '/' }]}
      />
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 pt-6">
        <Breadcrumbs items={[{ label: copy.h1 }]} className="mb-4" />
        <header className="text-center mb-8">
          <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-gradient-brand mb-3">{copy.h1}</h1>
          <p className="text-sm md:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">{copy.intro}</p>
        </header>
        <CatalogDashboard />
        <div className="mt-10">
          <LazyToolLandingBody path="/" lang={lang} />
        </div>
      </div>
    </>
  );
}
