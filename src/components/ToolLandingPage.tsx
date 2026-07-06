import { ShieldCheck, Lightbulb, Target, Wrench } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { PremiumFaq } from './PremiumFaq';
import { RelatedTools } from './RelatedTools';
import type { ToolRichContent } from '../seo/content/types';

const LABELS = {
  en: {
    benefits: 'Key benefits',
    useCases: 'Common use cases',
    how: 'How to use this tool',
    tips: 'Pro tips',
    faq: 'Frequently asked questions',
  },
  pt: {
    benefits: 'Principais benefícios',
    useCases: 'Casos de uso comuns',
    how: 'Como usar esta ferramenta',
    tips: 'Dicas profissionais',
    faq: 'Perguntas frequentes',
  },
  es: {
    benefits: 'Beneficios clave',
    useCases: 'Casos de uso comunes',
    how: 'Cómo usar esta herramienta',
    tips: 'Consejos profesionales',
    faq: 'Preguntas frecuentes',
  },
} as const;

/** Compact hero above the interactive tool — H1, intro, benefits */
export function ToolLandingHero({ content }: { content: ToolRichContent }) {
  const { lang } = useLanguage();
  const t = LABELS[lang];

  return (
    <header className="w-full max-w-3xl mx-auto text-center mb-6">
      <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gradient-brand mb-3">{content.h1}</h1>
      <p className="text-sm md:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto font-medium mb-6">
        {content.intro}
      </p>
      <section aria-labelledby="hero-benefits">
        <h2 id="hero-benefits" className="sr-only">
          {t.benefits}
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-left">
          {content.benefits.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2 text-xs sm:text-sm text-slate-600 font-medium premium-surface !py-3 !px-4"
            >
              <ShieldCheck size={14} className="text-emerald-500 shrink-0 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>
    </header>
  );
}

/** Full SEO body below the tool workspace */
export function ToolLandingBody({ content }: { content: ToolRichContent }) {
  const { lang } = useLanguage();
  const t = LABELS[lang];

  return (
    <article className="w-full max-w-3xl mx-auto space-y-6 mt-10 pb-4">
      {content.sections.map((section) => (
        <section key={section.id} className="premium-surface" aria-labelledby={section.id}>
          {section.level === 2 ? (
            <h2 id={section.id} className="landing-h2">
              {section.heading}
            </h2>
          ) : (
            <h3 id={section.id} className="landing-h3">
              {section.heading}
            </h3>
          )}
          <div className="space-y-3 text-sm text-slate-600 leading-relaxed">
            {section.paragraphs.map((p) => (
              <p key={p.slice(0, 48)}>{p}</p>
            ))}
            {section.bullets && section.bullets.length > 0 && (
              <ul className="list-disc pl-5 space-y-1.5">
                {section.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            )}
          </div>
        </section>
      ))}

      <section className="premium-surface" aria-labelledby="use-cases-heading">
        <h2 id="use-cases-heading" className="landing-section-title">
          <Target size={16} className="text-blue-600" />
          {t.useCases}
        </h2>
        <div className="grid grid-cols-1 gap-4">
          {content.useCases.map((uc) => (
            <div key={uc.title} className="rounded-xl border border-slate-100 p-4 bg-white/60">
              <h3 className="text-sm font-bold text-slate-900 mb-1.5">{uc.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{uc.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="premium-surface" aria-labelledby="how-heading">
        <h2 id="how-heading" className="landing-section-title">
          <Wrench size={16} className="text-blue-600" />
          {t.how}
        </h2>
        <ol className="space-y-3">
          {content.howItWorks.map((step, idx) => (
            <li key={step} className="flex gap-3 text-sm text-slate-600 font-medium">
              <span className="w-7 h-7 rounded-full text-xs font-semibold flex items-center justify-center shrink-0 text-white bg-gradient-to-br from-blue-600 to-blue-500 shadow-sm">
                {idx + 1}
              </span>
              <span className="pt-1 leading-relaxed">{step}</span>
            </li>
          ))}
        </ol>
      </section>

      {content.tips.length > 0 && (
        <section className="premium-surface" aria-labelledby="tips-heading">
          <h2 id="tips-heading" className="landing-section-title">
            <Lightbulb size={16} className="text-amber-500" />
            {t.tips}
          </h2>
          <ul className="space-y-2">
            {content.tips.map((tip) => (
              <li key={tip} className="flex items-start gap-2 text-sm text-slate-600">
                <span className="text-amber-500 font-bold mt-0.5">•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <PremiumFaq title={t.faq} items={content.faq} />
      {content.relatedTools.length > 0 && <RelatedTools paths={content.relatedTools} />}

      <section className="premium-surface text-center !py-8 bg-gradient-to-br from-blue-50/80 to-orange-50/40 border-blue-100/60">
        <h2 className="text-lg font-bold text-slate-900 mb-2">{content.cta.heading}</h2>
        <p className="text-sm text-slate-600 max-w-lg mx-auto mb-4 leading-relaxed">{content.cta.body}</p>
        <a
          href="#tool-start"
          className="inline-flex items-center justify-center px-6 py-2.5 rounded-xl bg-blue-700 text-white text-sm font-semibold hover:bg-blue-800 transition-colors shadow-sm"
        >
          {content.cta.buttonLabel}
        </a>
      </section>
    </article>
  );
}
