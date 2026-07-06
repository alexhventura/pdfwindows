import { ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import type { ToolPageCopy } from '../seo/toolCatalog';

interface ToolSeoArticleProps {
  copy: ToolPageCopy;
  compact?: boolean;
  soft?: boolean;
}

export function ToolSeoArticle({ copy, compact = false, soft = false }: ToolSeoArticleProps) {
  const { lang } = useLanguage();

  const labels =
    lang === 'pt'
      ? { benefits: 'Benefícios', how: 'Como funciona', faq: 'FAQ' }
      : lang === 'es'
        ? { benefits: 'Beneficios', how: 'Cómo funciona', faq: 'FAQ' }
        : { benefits: 'Benefits', how: 'How it works', faq: 'FAQ' };

  if (soft) {
    return (
      <article className="w-full max-w-3xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gradient-brand mb-2">{copy.h1}</h1>
          <p className="text-sm text-slate-500 font-medium max-w-xl mx-auto line-clamp-2">{copy.intro}</p>
        </header>
        <div className="premium-surface space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {copy.benefits.map((item) => (
              <p key={item} className="flex items-start gap-2 text-sm text-slate-600 font-medium">
                <ShieldCheck size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                <span>{item}</span>
              </p>
            ))}
          </div>
        </div>
      </article>
    );
  }

  const sectionClass = soft ? 'premium-surface mb-4' : 'premium-card p-6 mb-4';
  const headingClass = soft
    ? 'text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4'
    : 'text-xs font-semibold uppercase tracking-wider text-blue-800/80 mb-4';

  return (
    <article className="w-full max-w-3xl mx-auto mb-8">
      {!compact && (
        <header className="text-center mb-10">
          <h1 className="text-2xl md:text-4xl font-bold tracking-tight mb-3 text-gradient-brand">{copy.h1}</h1>
          <p className="text-sm md:text-base text-slate-500 leading-relaxed max-w-2xl mx-auto font-medium">{copy.intro}</p>
        </header>
      )}

      <section className={sectionClass} aria-labelledby="benefits-heading">
        <h2 id="benefits-heading" className={headingClass}>
          {labels.benefits}
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {copy.benefits.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-slate-600 font-medium">
              <ShieldCheck size={15} className="text-emerald-500 shrink-0 mt-0.5" />
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className={sectionClass} aria-labelledby="how-heading">
        <h2 id="how-heading" className={headingClass}>
          {labels.how}
        </h2>
        <ol className="space-y-3">
          {copy.howItWorks.map((step, idx) => (
            <li key={step} className="flex gap-3 text-sm text-slate-600 font-medium">
              <span className="w-7 h-7 rounded-full text-xs font-semibold flex items-center justify-center shrink-0 text-white bg-gradient-to-br from-blue-600 to-blue-500 shadow-sm">
                {idx + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
      </section>

    </article>
  );
}
