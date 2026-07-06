import { lazy, Suspense } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { SEO } from '../seo/SEO';
import { ToolPageSeoBlocks } from '../components/ToolPageLayout';
import { resolveToolContent, toolBreadcrumbs } from '../components/ToolPageLayout';

const ConverterWorkbench = lazy(() =>
  import('../components/ConverterWorkbench').then((m) => ({ default: m.ConverterWorkbench }))
);

export function FullConverterPage() {
  const { lang } = useLanguage();
  const content = resolveToolContent('/conversor', lang);
  const crumbs = toolBreadcrumbs(lang, content.toolName, '/conversor');

  return (
    <>
      <SEO
        title={content.title}
        description={content.description}
        keywords={content.keywords}
        path="/conversor"
        lang={lang}
        toolName={content.toolName}
        faq={content.faq}
        breadcrumbs={crumbs}
      />
      <ToolPageSeoBlocks toolPath="/conversor" lang={lang}>
        <Suspense
          fallback={
            <div className="py-20 text-center text-xs font-bold text-slate-500 uppercase tracking-widest">
              {lang === 'pt' ? 'Carregando conversor...' : lang === 'es' ? 'Cargando conversor...' : 'Loading converter...'}
            </div>
          }
        >
          <ConverterWorkbench showSuiteSection linkMode />
        </Suspense>
      </ToolPageSeoBlocks>
    </>
  );
}
