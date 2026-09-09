import { useMemo, useState } from 'react';
import { CheckCircle2, XCircle, HelpCircle } from 'lucide-react';
import type { LanguageType } from '../../../types';
import { ModalHeader } from '../shared';
import { validateDocument, type DocKind } from '../../../utils/generators';

function closeLbl(lang: LanguageType) {
  return lang === 'pt' ? 'Fechar' : lang === 'es' ? 'Cerrar' : 'Close';
}

const KIND_LABEL: Record<DocKind, string> = {
  cpf: 'CPF',
  cnpj: 'CNPJ',
  pis: 'PIS/PASEP',
  card: 'Card',
  unknown: '—',
};

export default function DocValidatorSuiteTool({ onClose, lang }: { onClose: () => void; lang: LanguageType }) {
  const [input, setInput] = useState('');
  const result = useMemo(() => (input.trim() ? validateDocument(input) : null), [input]);

  const t = {
    pt: {
      title: 'Validador de CPF / CNPJ',
      placeholder: 'Digite ou cole um CPF, CNPJ, PIS ou cartão',
      valid: 'Válido',
      invalid: 'Inválido',
      unknown: 'Formato não reconhecido',
      detected: 'Tipo detectado',
      hint: 'Detecta o tipo pelo número de dígitos e confere o dígito verificador (ou Luhn, para cartões). Tudo local, nada é enviado.',
    },
    en: {
      title: 'CPF / CNPJ Validator',
      placeholder: 'Type or paste a CPF, CNPJ, PIS or card number',
      valid: 'Valid',
      invalid: 'Invalid',
      unknown: 'Unrecognized format',
      detected: 'Detected type',
      hint: 'Detects the type by digit count and checks the verification digit (or Luhn, for cards). All local — nothing is sent.',
    },
    es: {
      title: 'Validador de CPF / CNPJ',
      placeholder: 'Escribe o pega un CPF, CNPJ, PIS o tarjeta',
      valid: 'Válido',
      invalid: 'Inválido',
      unknown: 'Formato no reconocido',
      detected: 'Tipo detectado',
      hint: 'Detecta el tipo por la cantidad de dígitos y verifica el dígito verificador (o Luhn, para tarjetas). Todo local — nada se envía.',
    },
  }[lang];

  const status =
    result === null ? 'idle' : result.kind === 'unknown' ? 'unknown' : result.valid ? 'valid' : 'invalid';
  const statusStyles =
    status === 'valid'
      ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
      : status === 'invalid'
        ? 'bg-rose-50 border-rose-200 text-rose-700'
        : 'bg-slate-50 border-slate-200 text-slate-500';

  return (
    <>
      <ModalHeader title={t.title} onClose={onClose} closeLabel={closeLbl(lang)} />
      <div className="p-8 flex flex-col items-center gap-5">
        <input
          autoFocus
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t.placeholder}
          className="premium-input text-sm w-full max-w-md text-center font-mono"
        />
        <div
          className={`w-full max-w-md rounded-2xl border px-6 py-5 flex items-center justify-center gap-3 ${statusStyles}`}
        >
          {status === 'valid' && <CheckCircle2 size={22} />}
          {status === 'invalid' && <XCircle size={22} />}
          {status !== 'valid' && status !== 'invalid' && <HelpCircle size={22} />}
          <span className="text-lg font-black">
            {status === 'idle'
              ? '—'
              : status === 'unknown'
                ? t.unknown
                : status === 'valid'
                  ? t.valid
                  : t.invalid}
          </span>
        </div>
        {result && result.kind !== 'unknown' && (
          <p className="text-[11px] font-semibold text-slate-500">
            {t.detected}: <span className="font-mono">{KIND_LABEL[result.kind]}</span>
          </p>
        )}
        <p className="text-[10px] text-slate-400 text-center max-w-sm">{t.hint}</p>
      </div>
    </>
  );
}
