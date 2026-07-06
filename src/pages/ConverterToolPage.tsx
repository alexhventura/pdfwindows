import { lazy, Suspense } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { SEO } from '../seo/SEO';
import { getToolPageByPath } from '../seo/toolCatalog';
import { ToolSeoArticle } from '../components/ToolSeoArticle';
import { ToolBackNav } from '../components/ToolBackNav';

const ConverterWorkbench = lazy(() =>
  import('../components/ConverterWorkbench').then((m) => ({ default: m.ConverterWorkbench }))
);

export function ConverterToolPage() {
  const { lang } = useLanguage();
  const { pathname } = useLocation();
  const tool = getToolPageByPath(pathname);

  if (!tool || !tool.operation) {
    return <Navigate to="/" replace />;
  }

  const copy = tool.copy[lang];

  return (
    <>
      <SEO title={copy.title} description={copy.description} keywords={copy.keywords} path={tool.path} lang={lang} />
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 pt-6 pb-2">
        <ToolBackNav className="mb-5" />
        <ToolSeoArticle copy={copy} soft />
      </div>
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 pb-12">
        <Suspense
          fallback={
            <div className="workspace-panel py-20 text-center">
              <img src="/logo.png" alt="" className="w-12 h-12 mx-auto rounded-2xl animate-pulse mb-3 opacity-80" />
              <p className="text-xs font-medium text-slate-500">
                {lang === 'pt' ? 'Abrindo workspace...' : lang === 'es' ? 'Abriendo workspace...' : 'Opening workspace...'}
              </p>
            </div>
          }
        >
          <ConverterWorkbench
            fixedOperation={tool.operation}
            showSuiteSection={false}
            showGuarantees={false}
            showSideAds={false}
            pageHeading={copy.h1}
            pageSubheading={
              lang === 'pt'
                ? 'Envie seus arquivos e processe localmente.'
                : lang === 'es'
                  ? 'Suba sus archivos y procese localmente.'
                  : 'Upload your files and process locally.'
            }
          />
        </Suspense>
      </div>
    </>
  );
}
