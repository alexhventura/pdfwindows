import { useCallback, useState, type ReactNode } from 'react';
import { Check, Copy, RefreshCw } from 'lucide-react';
import type { LanguageType } from '../../../types';
import { ModalHeader } from '../shared';

export interface GeneratorLabels {
  generate: string;
  copy: string;
  copied: string;
  close: string;
  disclaimer?: string;
}

export function baseLabels(lang: LanguageType): Pick<GeneratorLabels, 'generate' | 'copy' | 'copied' | 'close'> {
  if (lang === 'pt') return { generate: 'Gerar', copy: 'Copiar', copied: 'Copiado!', close: 'Fechar' };
  if (lang === 'es') return { generate: 'Generar', copy: 'Copiar', copied: '¡Copiado!', close: 'Cerrar' };
  return { generate: 'Generate', copy: 'Copy', copied: 'Copied!', close: 'Close' };
}

export function GeneratorPanel({
  title,
  onClose,
  value,
  placeholder,
  labels,
  onGenerate,
  options,
  extra,
  valueClassName,
}: {
  title: string;
  onClose: () => void;
  value: string;
  placeholder: string;
  labels: GeneratorLabels;
  onGenerate: () => void;
  options?: ReactNode;
  extra?: ReactNode;
  valueClassName?: string;
}) {
  const [copied, setCopied] = useState(false);
  const copy = useCallback(async () => {
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable */
    }
  }, [value]);

  return (
    <>
      <ModalHeader title={title} onClose={onClose} closeLabel={labels.close} />
      <div className="p-8 flex flex-col items-center gap-6">
        {options && <div className="w-full max-w-md">{options}</div>}
        <div
          className={`w-full text-center break-all select-all font-mono font-black text-slate-800 bg-slate-50 px-6 py-5 rounded-2xl border border-slate-100 shadow-inner ${
            valueClassName ?? 'text-2xl md:text-3xl tracking-tight'
          }`}
        >
          {value || placeholder}
        </div>
        {extra && <div className="w-full max-w-md">{extra}</div>}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <button type="button" onClick={onGenerate} className="btn-primary px-8 py-3 text-xs inline-flex items-center gap-2">
            <RefreshCw size={14} /> {labels.generate}
          </button>
          <button
            type="button"
            onClick={() => void copy()}
            disabled={!value}
            className="btn-secondary px-6 py-3 text-xs inline-flex items-center gap-2 disabled:opacity-40"
          >
            {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? labels.copied : labels.copy}
          </button>
        </div>
        {labels.disclaimer && (
          <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-widest text-center max-w-sm">
            {labels.disclaimer}
          </p>
        )}
      </div>
    </>
  );
}
