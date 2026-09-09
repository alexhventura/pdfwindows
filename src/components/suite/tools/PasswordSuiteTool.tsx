import { useCallback, useEffect, useState } from 'react';
import type { LanguageType } from '../../../types';
import { GeneratorPanel, baseLabels } from './generatorKit';
import { generatePassword, passwordStrength, type PasswordOptions } from '../../../utils/generators';

export default function PasswordSuiteTool({ onClose, lang }: { onClose: () => void; lang: LanguageType }) {
  const [opts, setOpts] = useState<PasswordOptions>({ length: 16, lower: true, upper: true, digits: true, symbols: true });
  const [value, setValue] = useState('');
  const run = useCallback((o: PasswordOptions) => setValue(generatePassword(o)), []);
  useEffect(() => run(opts), [run]); // eslint-disable-line react-hooks/exhaustive-deps

  const title = lang === 'pt' ? 'Gerador de Senha' : lang === 'es' ? 'Generador de Contraseña' : 'Password Generator';
  const strengthWord = {
    pt: { weak: 'Fraca', medium: 'Média', strong: 'Forte' },
    en: { weak: 'Weak', medium: 'Medium', strong: 'Strong' },
    es: { weak: 'Débil', medium: 'Media', strong: 'Fuerte' },
  }[lang];
  const lengthLabel = lang === 'pt' ? 'Tamanho' : lang === 'es' ? 'Longitud' : 'Length';
  const classes: Array<{ key: keyof PasswordOptions; label: string }> = [
    { key: 'lower', label: 'a-z' },
    { key: 'upper', label: 'A-Z' },
    { key: 'digits', label: '0-9' },
    { key: 'symbols', label: '!@#' },
  ];
  const strength = value ? passwordStrength(value) : 'weak';
  const strengthColor =
    strength === 'strong' ? 'text-emerald-600' : strength === 'medium' ? 'text-amber-600' : 'text-rose-600';

  const update = (patch: Partial<PasswordOptions>) => {
    const next = { ...opts, ...patch };
    setOpts(next);
    run(next);
  };

  return (
    <GeneratorPanel
      title={title}
      onClose={onClose}
      value={value}
      placeholder="••••••••••••••••"
      valueClassName="text-xl md:text-2xl tracking-tight"
      labels={baseLabels(lang)}
      onGenerate={() => run(opts)}
      options={
        <div className="space-y-3">
          <label className="flex items-center gap-3 text-xs font-semibold text-slate-600">
            {lengthLabel}: <span className="tabular-nums w-6">{opts.length}</span>
            <input
              type="range"
              min={6}
              max={48}
              value={opts.length}
              onChange={(e) => update({ length: Number(e.target.value) })}
              className="flex-1 accent-blue-600"
            />
          </label>
          <div className="flex flex-wrap gap-2 justify-center">
            {classes.map(({ key, label }) => (
              <button
                key={key}
                type="button"
                onClick={() => update({ [key]: !opts[key] } as Partial<PasswordOptions>)}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-mono font-semibold border ${
                  opts[key] ? 'bg-blue-50 border-blue-300 text-blue-700' : 'bg-white border-slate-200 text-slate-400'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      }
      extra={
        <p className={`text-center text-[11px] font-bold uppercase tracking-widest ${strengthColor}`}>
          {strengthWord[strength]}
        </p>
      }
    />
  );
}
