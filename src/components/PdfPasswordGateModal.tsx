import React, { useState } from 'react';
import { X, Lock } from 'lucide-react';
import type { LanguageType } from '../types';
import { validateProtectionPassword } from '../utils/pdfPasswordProtection';

const copy: Record<
  LanguageType,
  {
    title: string;
    subtitle: string;
    password: string;
    confirm: string;
    cancel: string;
    confirmBtn: string;
    empty: string;
    tooShort: string;
    mismatch: string;
  }
> = {
  pt: {
    title: 'Proteger PDF antes da exportação',
    subtitle:
      'A senha fica apenas na memória do navegador. O PDF final usa criptografia padrão (AES-256) e pedirá senha ao abrir no Chrome, Adobe ou Edge.',
    password: 'Senha de proteção',
    confirm: 'Confirmar senha',
    cancel: 'Cancelar',
    confirmBtn: 'Confirmar e processar',
    empty: 'Informe uma senha.',
    tooShort: 'Use pelo menos 4 caracteres.',
    mismatch: 'As senhas não coincidem.',
  },
  en: {
    title: 'Protect PDF before export',
    subtitle:
      'Password stays in browser memory only. The final PDF uses standard encryption (AES-256) and will prompt for a password in Chrome, Adobe, or Edge.',
    password: 'Protection password',
    confirm: 'Confirm password',
    cancel: 'Cancel',
    confirmBtn: 'Confirm & process',
    empty: 'Enter a password.',
    tooShort: 'Use at least 4 characters.',
    mismatch: 'Passwords do not match.',
  },
  es: {
    title: 'Proteger PDF antes de exportar',
    subtitle:
      'La contraseña permanece solo en memoria del navegador. El PDF final usa cifrado estándar (AES-256) y pedirá contraseña al abrir en Chrome, Adobe o Edge.',
    password: 'Contraseña de protección',
    confirm: 'Confirmar contraseña',
    cancel: 'Cancelar',
    confirmBtn: 'Confirmar y procesar',
    empty: 'Ingrese una contraseña.',
    tooShort: 'Use al menos 4 caracteres.',
    mismatch: 'Las contraseñas no coinciden.',
  },
};

interface PdfPasswordGateModalProps {
  lang: LanguageType;
  onCancel: () => void;
  onConfirm: (password: string) => void;
}

export function PdfPasswordGateModal({ lang, onCancel, onConfirm }: PdfPasswordGateModalProps) {
  const t = copy[lang];
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = validateProtectionPassword(password, confirm);
    if (code === 'EMPTY') return setError(t.empty);
    if (code === 'TOO_SHORT') return setError(t.tooShort);
    if (code === 'MISMATCH') return setError(t.mismatch);
    setError(null);
    onConfirm(password.trim());
    setPassword('');
    setConfirm('');
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-md overflow-hidden"
      >
        <div className="bg-slate-900 text-white px-5 py-4 flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Lock size={16} className="text-emerald-400" />
              <h3 className="text-sm font-black uppercase tracking-tight">{t.title}</h3>
            </div>
            <p className="text-[10px] text-slate-300 leading-relaxed">{t.subtitle}</p>
          </div>
          <button type="button" onClick={onCancel} className="p-1.5 hover:bg-white/10 rounded-lg text-slate-300">
            <X size={16} />
          </button>
        </div>

        <div className="p-5 space-y-3">
          <div>
            <label className="block text-[10px] font-bold text-slate-600 mb-1 uppercase tracking-wide">{t.password}</label>
            <input
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(null);
              }}
              className="w-full p-2.5 border border-slate-200 rounded-xl text-xs font-bold focus:ring-2 focus:ring-win-blue/20 focus:border-win-blue outline-none"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-slate-600 mb-1 uppercase tracking-wide">{t.confirm}</label>
            <input
              type="password"
              autoComplete="new-password"
              value={confirm}
              onChange={(e) => {
                setConfirm(e.target.value);
                setError(null);
              }}
              className="w-full p-2.5 border border-slate-200 rounded-xl text-xs font-bold focus:ring-2 focus:ring-win-blue/20 focus:border-win-blue outline-none"
            />
          </div>
          {error && <p className="text-[10px] font-bold text-rose-600">{error}</p>}
        </div>

        <div className="px-5 py-4 border-t border-slate-100 flex gap-2 justify-end bg-slate-50">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-200 rounded-xl transition-colors"
          >
            {t.cancel}
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-xs font-black uppercase tracking-wider bg-win-blue hover:bg-win-blue/90 text-white rounded-xl shadow-md"
          >
            {t.confirmBtn}
          </button>
        </div>
      </form>
    </div>
  );
}
