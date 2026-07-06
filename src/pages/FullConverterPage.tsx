import { lazy, Suspense } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { SEO } from '../seo/SEO';
import { HOME_COPY } from '../seo/toolCatalog';
import { ToolBackNav } from '../components/ToolBackNav';

const ConverterWorkbench = lazy(() =>
  import('../components/ConverterWorkbench').then((m) => ({ default: m.ConverterWorkbench }))
);

export function FullConverterPage() {
  const { lang } = useLanguage();
  const copy = HOME_COPY[lang];
  const title =
    lang === 'pt'
      ? 'Conversor PDF e Imagem Completo | PDFWINDOWS'
      : lang === 'es'
        ? 'Conversor PDF e Imagen Completo | PDFWINDOWS'
        : 'Full PDF & Image Converter | PDFWINDOWS';

  return (
    <>
      <SEO title={title} description={copy.description} keywords={copy.keywords} path="/conversor" lang={lang} />
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        <ToolBackNav className="mb-4" />
      </div>
      <Suspense
        fallback={
          <div className="py-20 text-center text-xs font-bold text-slate-500 uppercase tracking-widest">
            {lang === 'pt' ? 'Carregando conversor...' : lang === 'es' ? 'Cargando conversor...' : 'Loading converter...'}
          </div>
        }
      >
        <ConverterWorkbench showSuiteSection linkMode />
      </Suspense>
    </>
  );
}
