import { lazy, Suspense } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../utils/translations';
import { SEO } from '../seo/SEO';
import { ToolPageSeoBlocks, toolBreadcrumbs } from '../components/ToolPageLayout';
import { getPageCopy, getPageToolName } from '../seo/content/getPageCopy';
import { WorkspaceFallback } from '../components/RouteFallback';

const ConverterWorkbench = lazy(() =>
  import('../components/ConverterWorkbench').then((m) => ({ default: m.ConverterWorkbench }))
);

export function FullConverterPage() {
  const { lang } = useLanguage();
  const t = translations[lang];

  let copy;
  let toolName: string;
  try {
    copy = getPageCopy('/conversor', lang);
    toolName = getPageToolName('/conversor', lang);
  } catch {
    return (
      <div className="flex-1 flex items-center justify-center py-28 px-4" role="alert">
        <p className="text-sm text-slate-500">{t.toolUnavailable}</p>
      </div>
    );
  }

  const crumbs = toolBreadcrumbs(lang, toolName, '/conversor');

  return (
    <>
      <SEO
        title={copy.title}
        description={copy.description}
        keywords={copy.keywords}
        path="/conversor"
        lang={lang}
        toolName={toolName}
        faq={copy.faq}
        breadcrumbs={crumbs}
      />
      <ToolPageSeoBlocks toolPath="/conversor" lang={lang}>
        <Suspense fallback={<WorkspaceFallback message={t.loadingConverter} />}>
          <ConverterWorkbench showSuiteSection linkMode />
        </Suspense>
      </ToolPageSeoBlocks>
    </>
  );
}
