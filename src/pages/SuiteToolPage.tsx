import { lazy, Suspense } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { SEO } from '../seo/SEO';
import { getToolPageByPath } from '../seo/toolCatalog';
import { ToolSeoArticle } from '../components/ToolSeoArticle';
import { ToolBackNav } from '../components/ToolBackNav';

const SuiteToolEmbed = lazy(() =>
  import('../components/ProductivityTools').then((m) => ({ default: m.SuiteToolEmbed }))
);

export function SuiteToolPage() {
  const { lang } = useLanguage();
  const { pathname } = useLocation();
  const tool = getToolPageByPath(pathname);

  if (!tool || !tool.suiteId) {
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
      <div
        className={`w-full mx-auto px-4 sm:px-6 pb-12 ${
          tool.suiteId === 'color-picker' ? 'max-w-5xl' : 'max-w-4xl'
        }`}
      >
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
          <SuiteToolEmbed toolId={tool.suiteId} lang={lang} />
        </Suspense>
      </div>
    </>
  );
}
