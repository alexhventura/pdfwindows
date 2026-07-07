import { lazy, Suspense } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { SEO } from '../seo/SEO';
import { getToolPageByPath } from '../seo/toolCatalog';
import { ToolPageSeoBlocks, toolBreadcrumbs } from '../components/ToolPageLayout';
import { getPageCopy, getPageToolName } from '../seo/content/getPageCopy';
import { useLocalizedPath } from '../hooks/useLocalizedPath';
import { LogoImage } from '../components/LogoImage';

const SuiteToolEmbed = lazy(() =>
  import('../components/suite/SuiteToolEmbed').then((m) => ({ default: m.SuiteToolEmbed }))
);

export function SuiteToolPage() {
  const { lang } = useLanguage();
  const { pathname } = useLocation();
  const lp = useLocalizedPath();
  const tool = getToolPageByPath(pathname);

  if (!tool || !tool.suiteId) {
    return <Navigate to={lp('/')} replace />;
  }

  const copy = getPageCopy(tool.path, lang);
  const toolName = getPageToolName(tool.path, lang);
  const crumbs = toolBreadcrumbs(lang, toolName, tool.path);

  return (
    <>
      <SEO
        title={copy.title}
        description={copy.description}
        keywords={copy.keywords}
        path={tool.path}
        lang={lang}
        toolName={toolName}
        faq={copy.faq}
        breadcrumbs={crumbs}
      />
      <ToolPageSeoBlocks toolPath={tool.path} lang={lang}>
        <Suspense
          fallback={
            <div className="workspace-panel py-20 text-center">
              <LogoImage size={48} className="w-12 h-12 mx-auto rounded-2xl mb-3 opacity-80" pulse />
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
