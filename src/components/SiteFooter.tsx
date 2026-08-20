import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, X, Lock, HardDrive, Scale } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useLocalizedPath } from '../hooks/useLocalizedPath';
import { translations } from '../utils/translations';
import { conversionDirectory } from '../utils/conversionDirectory';

type FooterModalId = 'manual' | 'directory' | 'cookies';

export function SiteFooter() {
  const { lang } = useLanguage();
  const lp = useLocalizedPath();
  const t = translations[lang];
  const [activeModal, setActiveModal] = useState<FooterModalId | null>(null);

  const modalLinks: { id: FooterModalId; label: string }[] = [
    { id: 'manual', label: t.footerManual },
    { id: 'directory', label: t.directoryButton },
    { id: 'cookies', label: t.footerCookies },
  ];

  const modalTitle =
    activeModal === 'manual'
      ? t.manualTitle
      : activeModal === 'cookies'
        ? t.cookiesTitle
        : t.directoryButton;

  const trustItems = [
    {
      icon: Lock,
      title: t.footerTrustHttpsTitle,
      desc: t.footerTrustHttpsDesc,
    },
    {
      icon: HardDrive,
      title: t.footerTrustLocalTitle,
      desc: t.footerTrustLocalDesc,
    },
    {
      icon: Scale,
      title: t.footerTrustLgpdTitle,
      desc: t.footerTrustLgpdDesc,
    },
  ];

  return (
    <>
      <footer className="footer-premium w-full text-slate-400 mt-auto">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
          <section aria-labelledby="footer-trust-heading" className="space-y-4">
            <h2 id="footer-trust-heading" className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 text-center md:text-left">
              {t.footerTrustTitle}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {trustItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="rounded-xl border border-slate-700/80 bg-slate-900/40 px-4 py-3.5"
                  >
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        <Icon size={15} aria-hidden />
                      </span>
                      <div className="min-w-0 space-y-1">
                        <p className="text-[12px] font-semibold text-slate-200 leading-snug">{item.title}</p>
                        <p className="text-[10px] leading-relaxed text-slate-500">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="text-[10px] leading-relaxed text-slate-600 text-center md:text-left max-w-3xl">
              {t.footerTrustNote}{' '}
              <Link to={lp('/privacy')} className="text-slate-400 hover:text-white underline-offset-2 hover:underline">
                {t.footerPrivacy}
              </Link>
              .
            </p>
          </section>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 border-t border-slate-700/60 pt-6">
            <div className="text-center md:text-left text-[11px] leading-relaxed space-y-1.5">
              <div>
                <span className="font-bold text-slate-200 tracking-wide block sm:inline">PDFWINDOWS</span>
                <span className="hidden sm:inline text-slate-600 mx-2">·</span>
                <span className="text-slate-500 block sm:inline mt-1 sm:mt-0">{t.footerCopyright}</span>
              </div>
              <p className="text-slate-500 tracking-wide">
                Desenvolvido por{' '}
                <a
                  href="https://hervenhub.com.br"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold hover:underline"
                  style={{ color: '#F5C400' }}
                >
                  Herven Hub
                </a>
              </p>
            </div>

            <nav
              className="flex flex-wrap items-center justify-center md:justify-end gap-x-4 gap-y-2 text-xs font-medium"
              aria-label="Footer"
            >
              <Link to={lp('/terms')} className="text-slate-400 hover:text-white transition-colors whitespace-nowrap">
                {t.footerTerms}
              </Link>
              <Link to={lp('/privacy')} className="text-slate-400 hover:text-white transition-colors whitespace-nowrap">
                {t.footerPrivacy}
              </Link>
              {modalLinks.map((link) => (
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
                </div>
              )}
              {activeModal === 'directory' && (
                <div className="space-y-3">
                  <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
                    {conversionDirectory[lang].intro}
                  </p>
                  {conversionDirectory[lang].sections.map((section) => (
                    <div key={section.title} className="rounded-xl border border-slate-100 bg-slate-50/80 px-3 py-2 space-y-2">
                      <p className="font-semibold text-slate-800 text-[11px] uppercase tracking-wide">{section.title}</p>
                      {section.items.map((item) => (
                        <div key={item.name}>
                          <p className="font-semibold text-slate-800 text-[11px]">{item.name}</p>
                          <p className="text-slate-500 mt-0.5 text-[10px] leading-relaxed">{item.description}</p>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
