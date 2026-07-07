import { lazy, Suspense } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../utils/translations';
import { SEO } from '../seo/SEO';
import { ToolPageSeoBlocks, toolBreadcrumbs } from '../components/ToolPageLayout';
import { getPageCopy, getPageToolName } from '../seo/content/getPageCopy';

const ConverterWorkbench = lazy(() =>
  import('../components/ConverterWorkbench').then((m) => ({ default: m.ConverterWorkbench }))
);

export function FullConverterPage() {
  const { lang } = useLanguage();
  const copy = getPageCopy('/conversor', lang);
  const toolName = getPageToolName('/conversor', lang);
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
        <Suspense
          fallback={
            <div className="py-20 text-center text-xs font-bold text-slate-500 uppercase tracking-widest">
              {translations[lang].loadingConverter}
            </div>
          }
        >
          <ConverterWorkbench showSuiteSection linkMode />
        </Suspense>
      </ToolPageSeoBlocks>
    </>
  );
}
