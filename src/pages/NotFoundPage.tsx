import { Link } from 'react-router-dom';
import { Home, Search } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { SEO } from '../seo/SEO';

const COPY = {
  pt: {
    title: 'Página não encontrada | PDFWINDOWS',
    description: 'A página que você procura não existe ou foi movida.',
    h1: 'Página não encontrada',
    body: 'Verifique o endereço ou volte ao início para encontrar a ferramenta certa.',
    home: 'Ir para o início',
    tools: 'Ver ferramentas',
  },
  en: {
    title: 'Page not found | PDFWINDOWS',
    description: 'The page you are looking for does not exist or was moved.',
    h1: 'Page not found',
    body: 'Check the URL or return home to find the right tool.',
    home: 'Go to home',
    tools: 'Browse tools',
  },
  es: {
    title: 'Página no encontrada | PDFWINDOWS',
    description: 'La página que busca no existe o fue movida.',
    h1: 'Página no encontrada',
    body: 'Verifique la dirección o vuelva al inicio para encontrar la herramienta correcta.',
    home: 'Ir al inicio',
    tools: 'Ver herramientas',
  },
} as const;

export function NotFoundPage() {
  const { lang } = useLanguage();
  const t = COPY[lang];

  return (
    <>
      <SEO title={t.title} description={t.description} path="/404" lang={lang} noindex />
      <div className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="premium-surface max-w-md w-full text-center !py-10 !px-8">
          <p className="text-6xl font-black text-slate-200 mb-2">404</p>
          <h1 className="text-xl font-bold text-slate-900 mb-3">{t.h1}</h1>
          <p className="text-sm text-slate-500 mb-8 leading-relaxed">{t.body}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-blue-700 text-white text-sm font-semibold hover:bg-blue-800 transition-colors"
            >
              <Home size={16} />
              {t.home}
            </Link>
            <Link
              to="/ferramentas"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-sm font-semibold hover:bg-slate-50 transition-colors"
            >
              <Search size={16} />
              {t.tools}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
