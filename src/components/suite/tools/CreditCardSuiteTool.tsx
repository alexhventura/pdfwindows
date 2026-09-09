import { useEffect, useState } from 'react';
import type { LanguageType } from '../../../types';
import { GeneratorPanel, baseLabels } from './generatorKit';
import { generateCreditCard, type CardBrand, type TestCard } from '../../../utils/generators';

const BRANDS: CardBrand[] = ['visa', 'mastercard', 'amex'];

export default function CreditCardSuiteTool({ onClose, lang }: { onClose: () => void; lang: LanguageType }) {
  const [brand, setBrand] = useState<CardBrand>('visa');
  const [card, setCard] = useState<TestCard | null>(null);
  const run = (b: CardBrand) => setCard(generateCreditCard(b));
  useEffect(() => run('visa'), []);

  const title =
    lang === 'pt' ? 'Gerador de Cartão (Teste)' : lang === 'es' ? 'Generador de Tarjeta (Prueba)' : 'Test Credit Card Generator';
  const disclaimer =
    lang === 'pt'
      ? 'Números válidos pelo algoritmo de Luhn, apenas para testar formulários de pagamento. Não são cartões reais e não têm fundos.'
      : lang === 'es'
        ? 'Números válidos por el algoritmo de Luhn, solo para probar formularios de pago. No son tarjetas reales.'
        : 'Luhn-valid numbers for testing payment forms only. These are not real cards and hold no funds.';

  return (
    <GeneratorPanel
      title={title}
      onClose={onClose}
      value={card?.number ?? ''}
      placeholder="0000 0000 0000 0000"
      valueClassName="text-xl md:text-2xl tracking-widest"
      labels={{ ...baseLabels(lang), disclaimer }}
      onGenerate={() => run(brand)}
      options={
        <div className="flex flex-wrap justify-center gap-2">
          {BRANDS.map((b) => (
            <button
              key={b}
              type="button"
              onClick={() => {
                setBrand(b);
                run(b);
              }}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold border capitalize ${
                brand === b ? 'bg-blue-50 border-blue-300 text-blue-700' : 'bg-white border-slate-200 text-slate-400'
              }`}
            >
              {b}
            </button>
          ))}
        </div>
      }
      extra={
        card && (
          <div className="flex justify-center gap-6 text-xs font-mono font-semibold text-slate-600">
            <span>CVV: {card.cvv}</span>
            <span>
              {lang === 'pt' ? 'Validade' : lang === 'es' ? 'Vence' : 'Expiry'}: {card.expiry}
            </span>
          </div>
        )
      }
    />
  );
}
