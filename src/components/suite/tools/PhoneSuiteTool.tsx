import { useEffect, useState } from 'react';
import type { LanguageType } from '../../../types';
import { GeneratorPanel, baseLabels } from './generatorKit';
import { generatePhoneBR } from '../../../utils/generators';

export default function PhoneSuiteTool({ onClose, lang }: { onClose: () => void; lang: LanguageType }) {
  const [value, setValue] = useState('');
  useEffect(() => setValue(generatePhoneBR()), []);
  const title =
    lang === 'pt' ? 'Gerador de Telefone' : lang === 'es' ? 'Generador de Teléfono' : 'Phone Number Generator';
  const disclaimer =
    lang === 'pt'
      ? 'Celular com DDD válido. Apenas para testes; número fictício.'
      : lang === 'es'
        ? 'Móvil con DDD válido. Solo para pruebas; número ficticio.'
        : 'Mobile with a valid area code. For testing only; fictitious number.';
  return (
    <GeneratorPanel
      title={title}
      onClose={onClose}
      value={value}
      placeholder="(11) 90000-0000"
      labels={{ ...baseLabels(lang), disclaimer }}
      onGenerate={() => setValue(generatePhoneBR())}
    />
  );
}
