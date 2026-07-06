import type { ReactNode } from 'react';
import { Check, CheckCircle2, Download } from 'lucide-react';
import { motion } from 'motion/react';

interface CompletionPanelProps {
  title: string;
  subtitle: string;
  downloadLabel: string;
  closeLabel: string;
  closeHint?: string;
  onDownload: () => void;
  onClose: () => void;
  children?: ReactNode;
}

/** Premium post-processing panel — download result or close back to empty workspace */
export function CompletionPanel({
  title,
  subtitle,
  downloadLabel,
  closeLabel,
  closeHint,
  onDownload,
  onClose,
  children,
}: CompletionPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="completion-panel"
      role="status"
      aria-live="polite"
    >
      <div className="completion-panel-glow" aria-hidden />

      <div className="relative z-[1] flex flex-col items-center text-center">
        <div className="completion-panel-icon">
          <CheckCircle2 size={28} strokeWidth={1.75} />
        </div>

        <h3 className="text-lg font-semibold text-slate-900 tracking-tight mt-4">{title}</h3>
        <p className="text-sm text-slate-500 max-w-md mx-auto mt-1.5 leading-relaxed font-medium">{subtitle}</p>

        {children && <div className="w-full mt-6 space-y-3">{children}</div>}

        <div className="w-full max-w-sm mx-auto mt-7 space-y-3">
          <div className="flex flex-col sm:flex-row gap-2.5">
            <button type="button" onClick={onDownload} className="btn-primary flex-1 text-sm py-3">
              <Download size={16} />
              {downloadLabel}
            </button>
            <button type="button" onClick={onClose} className="btn-secondary flex-1 text-sm py-3">
              <Check size={16} />
              {closeLabel}
            </button>
          </div>
          {closeHint && (
            <p className="text-[11px] text-slate-400 font-medium leading-relaxed">{closeHint}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
