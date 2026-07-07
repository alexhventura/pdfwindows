import { lazy, Suspense } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../utils/translations';
import { SEO } from '../seo/SEO';
import { getToolPageByPath } from '../seo/toolCatalog';
import { ToolPageSeoBlocks, toolBreadcrumbs } from '../components/ToolPageLayout';
import { getPageCopy, getPageToolName } from '../seo/content/getPageCopy';
import { useLocalizedPath } from '../hooks/useLocalizedPath';
import { LogoImage } from '../components/LogoImage';

const ConverterWorkbench = lazy(() =>
  import('../components/ConverterWorkbench').then((m) => ({ default: m.ConverterWorkbench }))
);

export function ConverterToolPage() {
  const { lang } = useLanguage();
  const { pathname } = useLocation();
  const lp = useLocalizedPath();
  const tool = getToolPageByPath(pathname);

  if (!tool || !tool.operation) {
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
                {translations[lang].openingWorkspace}
              </p>
            </div>
          }
        >
          <ConverterWorkbench
            fixedOperation={tool.operation}
            showSuiteSection={false}
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
      </ToolPageSeoBlocks>
    </>
  );
}
