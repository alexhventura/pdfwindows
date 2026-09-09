import { useEffect, useState } from 'react';
import type { LanguageType } from '../../../types';
import { GeneratorPanel, baseLabels } from './generatorKit';
import { generateUuidV4 } from '../../../utils/generators';

export default function UuidSuiteTool({ onClose, lang }: { onClose: () => void; lang: LanguageType }) {
  const [count, setCount] = useState(1);
  const [value, setValue] = useState('');
  const run = (n: number) => setValue(Array.from({ length: n }, () => generateUuidV4()).join('\n'));
  useEffect(() => run(1), []);
  const title = lang === 'pt' ? 'Gerador de UUID' : lang === 'es' ? 'Generador de UUID' : 'UUID Generator';
  const label = lang === 'pt' ? 'Quantidade' : lang === 'es' ? 'Cantidad' : 'How many';
  return (
    <GeneratorPanel
      title={title}
      onClose={onClose}
      value={value}
      placeholder="00000000-0000-4000-8000-000000000000"
      valueClassName="text-sm md:text-base tracking-tight whitespace-pre-line leading-relaxed"
      labels={baseLabels(lang)}
      onGenerate={() => run(count)}
      options={
        <label className="flex items-center justify-between gap-3 text-xs font-semibold text-slate-600">
          {label}
          <select
            className="premium-input text-xs w-24"
            value={count}
            onChange={(e) => {
              const n = Number(e.target.value);
              setCount(n);
              run(n);
            }}
          >
            {[1, 5, 10, 25].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </label>
      }
    />
  );
}
