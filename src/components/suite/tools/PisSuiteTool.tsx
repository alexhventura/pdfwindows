import { useEffect, useState } from 'react';
import type { LanguageType } from '../../../types';
import { GeneratorPanel, baseLabels } from './generatorKit';
import { generatePisPasep } from '../../../utils/generators';

export default function PisSuiteTool({ onClose, lang }: { onClose: () => void; lang: LanguageType }) {
  const [value, setValue] = useState('');
  useEffect(() => setValue(generatePisPasep()), []);
  const title =
    lang === 'pt' ? 'Gerador de PIS/PASEP' : lang === 'es' ? 'Generador de PIS/PASEP' : 'PIS/PASEP Generator';
  const disclaimer =
    lang === 'pt'
      ? 'Apenas para testes. Não representa cadastros reais.'
      : lang === 'es'
        ? 'Solo para pruebas. No representa registros reales.'
        : 'For testing only. Not associated with real records.';
  return (
    <GeneratorPanel
      title={title}
      onClose={onClose}
      value={value}
      placeholder="000.00000.00-0"
      labels={{ ...baseLabels(lang), disclaimer }}
      onGenerate={() => setValue(generatePisPasep())}
    />
  );
}
