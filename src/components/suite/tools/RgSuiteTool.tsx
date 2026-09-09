import { useEffect, useState } from 'react';
import type { LanguageType } from '../../../types';
import { GeneratorPanel, baseLabels } from './generatorKit';
import { generateRg } from '../../../utils/generators';

export default function RgSuiteTool({ onClose, lang }: { onClose: () => void; lang: LanguageType }) {
  const [value, setValue] = useState('');
  useEffect(() => setValue(generateRg()), []);
  const title = lang === 'pt' ? 'Gerador de RG' : lang === 'es' ? 'Generador de RG' : 'RG Generator';
  const disclaimer =
    lang === 'pt'
      ? 'Formato SSP-SP. Apenas para testes; não representa pessoas reais.'
      : lang === 'es'
        ? 'Formato SSP-SP. Solo para pruebas; no representa personas reales.'
        : 'SSP-SP format. For testing only; not associated with real people.';
  return (
    <GeneratorPanel
      title={title}
      onClose={onClose}
      value={value}
      placeholder="00.000.000-0"
      labels={{ ...baseLabels(lang), disclaimer }}
      onGenerate={() => setValue(generateRg())}
    />
  );
}
