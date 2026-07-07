import { useLanguage } from '../context/LanguageContext';
import { HOME_COPY } from '../seo/toolCatalog';
import { translations } from '../utils/translations';
import { PremiumFaq } from './PremiumFaq';

/** Site-wide FAQ — above footer on every page */
export function GlobalFaq() {
  const { lang } = useLanguage();

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-10 md:py-14 mt-auto">
      <PremiumFaq title={translations[lang].faqSectionTitle} items={HOME_COPY[lang].faq} />
    </div>
  );
}
