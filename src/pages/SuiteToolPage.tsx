import { lazy, Suspense } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { SEO } from '../seo/SEO';
import { getToolPageByPath } from '../seo/toolCatalog';
import { ToolPageSeoBlocks, resolveToolContent, toolBreadcrumbs } from '../components/ToolPageLayout';
import { useLocalizedPath } from '../hooks/useLocalizedPath';

const SuiteToolEmbed = lazy(() =>
  import('../components/ProductivityTools').then((m) => ({ default: m.SuiteToolEmbed }))
);

export function SuiteToolPage() {
  const { lang } = useLanguage();
  const { pathname } = useLocation();
  const lp = useLocalizedPath();
  const tool = getToolPageByPath(pathname);

  if (!tool || !tool.suiteId) {
    return <Navigate to={lp('/')} replace />;
  }

  const content = resolveToolContent(tool.path, lang);
  const crumbs = toolBreadcrumbs(lang, content.toolName, tool.path);

  return (
    <>
      <SEO
        title={content.title}
        description={content.description}
        keywords={content.keywords}
        path={tool.path}
        lang={lang}
        toolName={content.toolName}
        faq={content.faq}
        breadcrumbs={crumbs}
      />
      <ToolPageSeoBlocks toolPath={tool.path} lang={lang}>
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
          <div className={tool.suiteId === 'color-picker' ? 'max-w-5xl mx-auto' : ''}>
            <SuiteToolEmbed toolId={tool.suiteId} lang={lang} />
          </div>
        </Suspense>
      </ToolPageSeoBlocks>
    </>
  );
}
