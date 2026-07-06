import { useLanguage } from '../context/LanguageContext';
import { SEO } from '../seo/SEO';
import { CatalogDashboard } from '../components/CatalogDashboard';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ToolLandingBody } from '../components/ToolLandingPage';
import { resolveToolContent } from '../seo/content/resolveToolContent';

export function HomePage() {
  const { lang } = useLanguage();
  const content = resolveToolContent('/', lang);

  return (
    <>
      <SEO
        title={content.title}
        description={content.description}
        keywords={content.keywords}
        path="/"
        lang={lang}
        toolName="PDFWINDOWS"
        faq={content.faq}
        breadcrumbs={[{ label: content.toolName, path: '/' }]}
      />
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 pt-6">
        <Breadcrumbs items={[{ label: content.h1 }]} className="mb-4" />
        <header className="text-center mb-8">
          <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-gradient-brand mb-3">{content.h1}</h1>
          <p className="text-sm md:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">{content.intro}</p>
        </header>
        <CatalogDashboard />
        <div className="mt-10">
          <ToolLandingBody content={content} />
        </div>
      </div>
    </>
  );
}
