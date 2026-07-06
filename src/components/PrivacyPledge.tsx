import { ShieldCheck } from 'lucide-react';
import type { LanguageType } from '../types';
import { translations } from '../utils/translations';

interface PrivacyPledgeProps {
  lang: LanguageType;
  variant?: 'card' | 'banner';
}

export function PrivacyPledge({ lang, variant = 'card' }: PrivacyPledgeProps) {
  const t = translations[lang];

  if (variant === 'banner') {
    return (
      <div className="privacy-banner w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-center gap-2.5 text-center">
          <ShieldCheck size={16} className="text-emerald-600 shrink-0 opacity-90" />
          <p className="text-[11px] sm:text-xs text-slate-600 font-medium leading-relaxed max-w-3xl">
            {t.privacyPledgeBody}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="premium-surface border-emerald-100/50 !bg-emerald-50/30">
      <div className="flex items-center gap-2 mb-2">
        <ShieldCheck size={16} className="text-emerald-600" />
        <h3 className="text-xs font-semibold text-emerald-900">{t.privacyPledgeTitle}</h3>
      </div>
      <p className="text-xs text-emerald-800/90 font-medium leading-relaxed">{t.privacyPledgeBody}</p>
    </div>
  );
}
