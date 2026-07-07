import { useState } from 'react';
import type { LanguageType } from '../../../types';
import { ModalHeader, modalT } from '../shared';

export default function CpfSuiteTool({ onClose, lang }: { onClose: () => void; lang: LanguageType }) {
  const t = modalT[lang];
  const [cpf, setCpf] = useState('');

  const generateCPF = () => {
    const n = Array.from({ length: 9 }, () => Math.floor(Math.random() * 10));
    const calcDigit = (arr: number[]) => {
      const sum = arr.reduce((acc, cur, i) => acc + cur * (arr.length + 1 - i), 0);
      const res = sum % 11;
      return res < 2 ? 0 : 11 - res;
    };
    n.push(calcDigit(n));
    n.push(calcDigit(n));
    const s = n.join('');
    setCpf(s.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4'));
  };

  return (
    <>
      <ModalHeader title={t.cpfTitle} onClose={onClose} closeLabel={t.close} />
      <div className="p-12 flex flex-col items-center gap-8">
        <div className="text-4xl font-black text-slate-800 font-mono tracking-tighter bg-slate-50 px-8 py-4 rounded-3xl border border-slate-100 shadow-inner">
          {cpf || '000.000.000-00'}
        </div>
        <button type="button" onClick={generateCPF} className="btn-primary px-10 py-3 text-xs">
          {t.cpfGenerate}
        </button>
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest text-center max-w-xs">
          {t.cpfDisclaimer}
        </p>
      </div>
    </>
  );
}
