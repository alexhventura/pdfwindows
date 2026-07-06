import { useLanguage } from '../context/LanguageContext';
import { ToolCardGrid } from './ToolCardGrid';

const PRIVACY_NOTICE: Record<'pt' | 'en' | 'es', string> = {
  pt: 'Privacidade absoluta: processamento local, sem custos e sem armazenamento de arquivos. Para sua conveniência, salve esta página no seu navegador (Ctrl + S) e utilize-a offline a qualquer momento.',
  en: 'Absolute privacy: local processing, no cost, and no file storage. For your convenience, bookmark this page (Ctrl + S) and use it offline anytime.',
  es: 'Privacidad absoluta: procesamiento local, sin costos y sin almacenamiento de archivos. Para su comodidad, guarde esta página en el navegador (Ctrl + S) y utilícela sin conexión cuando quiera.',
};

export function CatalogDashboard() {
  const { lang } = useLanguage();

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-10">
      <header className="mb-8 md:mb-10 text-center max-w-3xl mx-auto">
        <h1 className="sr-only">PDFWINDOWS</h1>
        <img
          src="/logo-banner.png"
          alt="PDF WINDOWS — ferramentas PDF e imagem offline"
          className="w-full max-w-2xl mx-auto h-auto object-contain drop-shadow-sm"
          width={640}
          height={160}
          loading="eager"
          decoding="async"
        />
        <p className="mt-6 text-sm md:text-[15px] text-slate-500 leading-relaxed font-medium max-w-2xl mx-auto">
          {PRIVACY_NOTICE[lang]}
        </p>
      </header>

      <ToolCardGrid />
    </div>
  );
}
