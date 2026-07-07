import { ToolCardGrid } from './ToolCardGrid';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../utils/translations';

export function CatalogDashboard() {
  const { lang } = useLanguage();
  const t = translations[lang];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-10">
      <header className="mb-8 md:mb-10 text-center max-w-3xl mx-auto">
        <h1 className="sr-only">PDFWINDOWS</h1>
        <img
          src="/logo-banner.png"
          alt={t.catalogBannerAlt}
          className="w-full max-w-2xl mx-auto h-auto object-contain drop-shadow-sm"
          width={640}
          height={160}
          loading="eager"
          decoding="async"
        />
      </header>

      <ToolCardGrid />
    </div>
  );
}
