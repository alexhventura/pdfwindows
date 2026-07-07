import { useId, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import type { FaqItem } from '../seo/toolCatalog';

interface PremiumFaqProps {
  title: string;
  items: FaqItem[];
  className?: string;
}

function FaqAccordionItem({
  item,
  index,
  isOpen,
  onToggle,
}: {
  item: FaqItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const baseId = useId();
  const triggerId = `${baseId}-trigger-${index}`;
  const panelId = `${baseId}-panel-${index}`;

  return (
    <div className={`faq-accordion-item ${isOpen ? 'faq-accordion-item-open' : ''}`}>
      <button
        type="button"
        id={triggerId}
        className="faq-accordion-trigger"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
      >
        <span className="faq-accordion-question">{item.q}</span>
        <span className="faq-accordion-icon" aria-hidden>
          <ChevronDown size={18} strokeWidth={2} />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={triggerId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="faq-accordion-answer">
              <p>{item.a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/** Premium collapsible FAQ — accordion style, one panel open at a time */
export function PremiumFaq({ title, items, className = '' }: PremiumFaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const titleId = useId();

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      className={`w-full max-w-3xl mx-auto ${className}`}
      aria-labelledby={titleId}
    >
      <div className="faq-premium-panel">
        <header className="faq-premium-header">
          <h2 id={titleId} className="faq-premium-title">
            {title}
          </h2>
        </header>

        <div className="faq-accordion-list">
          {items.map((item, index) => (
            <div key={item.q}>
              <FaqAccordionItem
                item={item}
                index={index}
                isOpen={openIndex === index}
                onToggle={() => toggle(index)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
