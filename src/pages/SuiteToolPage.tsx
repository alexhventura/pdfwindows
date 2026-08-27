import { lazy, Suspense } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../utils/translations';
import { SEO } from '../seo/SEO';
import { getToolPageByPath } from '../seo/toolCatalog';
import { ToolPageSeoBlocks, toolBreadcrumbs } from '../components/ToolPageLayout';
import { getPageCopy, getPageToolName } from '../seo/content/getPageCopy';
import { useLocalizedPath } from '../hooks/useLocalizedPath';
import { WorkspaceFallback } from '../components/RouteFallback';

const SuiteToolEmbed = lazy(() =>
  import('../components/suite/SuiteToolEmbed').then((m) => ({ default: m.SuiteToolEmbed }))
);

export function SuiteToolPage() {
  const { lang } = useLanguage();
  const { pathname } = useLocation();
  const lp = useLocalizedPath();
  const tool = getToolPageByPath(pathname);
  const t = translations[lang];

  if (!tool) {
    return (
      <div className="flex-1 flex items-center justify-center py-28 px-4" role="status">
        <p className="text-sm text-slate-500">{t.toolUnavailable}</p>
      </div>
    );
  }

  if (!tool.suiteId) {
    return <Navigate to={lp('/')} replace />;
  }

  let copy;
  let toolName: string;
  try {
    copy = getPageCopy(tool.path, lang);
    toolName = getPageToolName(tool.path, lang);
  } catch {
    return (
      <div className="flex-1 flex items-center justify-center py-28 px-4" role="alert">
        <p className="text-sm text-slate-500">{t.toolUnavailable}</p>
      </div>
    );
  }

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
        <Suspense fallback={<WorkspaceFallback message={t.openingWorkspace} />}>
          <SuiteToolEmbed toolId={tool.suiteId} lang={lang} />
        </Suspense>
      </ToolPageSeoBlocks>
    </>
  );
}
