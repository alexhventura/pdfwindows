import { useEffect, useState } from 'react';
import type { LanguageType } from '../../../types';
import { GeneratorPanel, baseLabels } from './generatorKit';
import { generateCnpj } from '../../../utils/generators';

export default function CnpjSuiteTool({ onClose, lang }: { onClose: () => void; lang: LanguageType }) {
  const [value, setValue] = useState('');
  useEffect(() => setValue(generateCnpj()), []);
  const title = lang === 'pt' ? 'Gerador de CNPJ' : lang === 'es' ? 'Generador de CNPJ' : 'CNPJ Generator';
  const disclaimer =
    lang === 'pt'
      ? 'Apenas para testes. Não representa empresas reais.'
      : lang === 'es'
        ? 'Solo para pruebas. No representa empresas reales.'
        : 'For testing only. Not associated with real companies.';
  return (
    <GeneratorPanel
      title={title}
      onClose={onClose}
      value={value}
      placeholder="00.000.000/0000-00"
      labels={{ ...baseLabels(lang), disclaimer }}
      onGenerate={() => setValue(generateCnpj())}
    />
  );
}
