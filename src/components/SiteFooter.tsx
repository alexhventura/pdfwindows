import { useState } from 'react';
import { BookOpen, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../utils/translations';
import { conversionDirectory } from '../utils/conversionDirectory';

type FooterModalId = 'terms' | 'privacy' | 'manual' | 'directory' | 'cookies';

export function SiteFooter() {
  const { lang } = useLanguage();
  const t = translations[lang];
  const [activeModal, setActiveModal] = useState<FooterModalId | null>(null);

  const links: { id: FooterModalId; label: string }[] = [
    { id: 'terms', label: t.footerTerms },
    { id: 'privacy', label: t.footerPrivacy },
    { id: 'manual', label: t.footerManual },
    { id: 'directory', label: t.directoryButton },
    { id: 'cookies', label: t.footerCookies },
  ];

  const modalTitle =
    activeModal === 'terms'
      ? t.termsTitle
      : activeModal === 'privacy'
        ? t.privacyTitle
        : activeModal === 'manual'
          ? t.manualTitle
          : activeModal === 'cookies'
            ? t.cookiesTitle
            : t.directoryButton;

  return (
    <>
      <footer className="footer-premium w-full text-slate-400 mt-auto">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="text-center md:text-left text-[11px] leading-relaxed">
              <span className="font-bold text-slate-200 tracking-wide block sm:inline">PDFWINDOWS</span>
              <span className="hidden sm:inline text-slate-600 mx-2">·</span>
              <span className="text-slate-500 block sm:inline mt-1 sm:mt-0">{t.footerCopyright}</span>
            </div>

            <nav
              className="flex flex-wrap items-center justify-center md:justify-end gap-x-4 gap-y-2 text-xs font-medium"
              aria-label="Footer"
            >
              {links.map((link) => (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => setActiveModal(link.id)}
                  className="text-slate-400 hover:text-white transition-colors whitespace-nowrap"
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </footer>

      {activeModal && (
        <div className="modal-backdrop">
          <div className="modal-panel max-w-xl w-full relative">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200/80">
              <span className="font-semibold text-slate-800 text-sm flex items-center gap-2">
                <BookOpen size={15} className="text-blue-600" />
                {modalTitle}
              </span>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[60vh] text-xs leading-relaxed text-slate-600 space-y-4 custom-scrollbar">
              {activeModal === 'terms' && (
                <div className="space-y-4">
                  {t.termsBody.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>
              )}
              {activeModal === 'privacy' && (
                <div className="space-y-4">
                  {t.privacyBody.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>
              )}
              {activeModal === 'manual' && (
                <div className="space-y-4">
                  {t.manualBody.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>
              )}
              {activeModal === 'cookies' && (
                <div className="space-y-5">
                  <p className="text-[13px] text-slate-700">{t.cookiesIntro}</p>
                  {t.cookiesSections.map((section) => (
                    <div key={section.heading} className="space-y-2">
                      <h3 className="font-semibold text-slate-800 text-xs">{section.heading}</h3>
                      {section.paragraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                      {section.listIntro && (
                        <p className="font-medium text-slate-700">{section.listIntro}</p>
                      )}
                      {section.list && (
                        <ul className="list-disc pl-4 space-y-1 text-slate-600">
                          {section.list.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                  <p className="font-semibold text-slate-800 text-[13px] pt-2 border-t border-slate-100">
                    {t.cookiesClosing}
                  </p>
                </div>
              )}
              {activeModal === 'directory' && (
                <div className="space-y-5 text-slate-700">
                  <p className="text-[13px] text-slate-600 border-b border-slate-100 pb-3">{conversionDirectory[lang].intro}</p>
                  {conversionDirectory[lang].sections.map((section) => (
                    <div key={section.title} className="premium-surface !p-4">
                      <h3 className="font-semibold text-slate-800 text-xs mb-3">{section.title}</h3>
                      <ul className="space-y-2">
                        {section.items.map((item) => (
                          <li key={item.name} className="text-[11px]">
                            <p className="font-semibold text-slate-800">{item.name}</p>
                            <p className="text-slate-500 mt-0.5">{item.description}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="px-6 py-3 border-t border-slate-200/80 flex justify-end">
              <button type="button" onClick={() => setActiveModal(null)} className="btn-primary text-xs py-2 px-4">
                {t.modalClose}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
