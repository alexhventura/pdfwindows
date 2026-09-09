import { useEffect, useState } from 'react';
import type { LanguageType } from '../../../types';
import { GeneratorPanel, baseLabels } from './generatorKit';
import { generateProductKey } from '../../../utils/generators';

export default function ProductKeySuiteTool({ onClose, lang }: { onClose: () => void; lang: LanguageType }) {
  const [value, setValue] = useState('');
  useEffect(() => setValue(generateProductKey()), []);
  const title =
    lang === 'pt' ? 'Gerador de Chave de Produto' : lang === 'es' ? 'Generador de Clave de Producto' : 'Product Key Generator';
  const disclaimer =
    lang === 'pt'
      ? 'Chave aleatória no formato 5×5, para mockups e testes. NÃO é uma licença válida de nenhum software.'
      : lang === 'es'
        ? 'Clave aleatoria en formato 5×5, para maquetas y pruebas. NO es una licencia válida de ningún software.'
        : 'Random 5×5-format key for mockups and testing. It is NOT a valid license for any software.';
  return (
    <GeneratorPanel
      title={title}
      onClose={onClose}
      value={value}
      placeholder="XXXXX-XXXXX-XXXXX-XXXXX-XXXXX"
      valueClassName="text-lg md:text-2xl tracking-widest"
      labels={{ ...baseLabels(lang), disclaimer }}
      onGenerate={() => setValue(generateProductKey())}
    />
  );
}
