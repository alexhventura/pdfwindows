import { lazy, Suspense, useState, type ComponentType } from 'react';
import type { LanguageType } from '../../types';

interface SuiteToolProps {
  lang: LanguageType;
  onClose: () => void;
  showHeader?: boolean;
}

const SUITE_TOOL_LOADERS: Record<string, () => Promise<{ default: ComponentType<SuiteToolProps> }>> = {
  'color-picker': () =>
    import('../ColorPickerTool').then((m) => ({
      default: ({ lang, onClose, showHeader }: SuiteToolProps) => (
        <m.ColorPickerTool lang={lang} onClose={onClose} showHeader={showHeader} />
      ),
    })),
  'document-studio': () =>
    import('../../documentStudio/DocumentStudioModal').then((m) => ({
      default: ({ lang, onClose }: SuiteToolProps) => <m.DocumentStudioModal lang={lang} onClose={onClose} />,
    })),
  'qr-gen': () => import('./tools/QrCodeSuiteTool'),
  'cpf-gen': () => import('./tools/CpfSuiteTool'),
  'code-clean': () => import('./tools/CodeCleanerSuiteTool'),
  'report-gen': () => import('./tools/ReportSuiteTool'),
};

function SuiteToolLoader({
  toolId,
  lang,
  onClose,
}: {
  toolId: string;
  lang: LanguageType;
  onClose: () => void;
}) {
  const loader = SUITE_TOOL_LOADERS[toolId];
  if (!loader) return null;

  const LazyTool = lazy(loader);

  return (
    <Suspense
      fallback={
        <div className="py-16 text-center text-xs font-medium text-slate-500" role="status">
          PDFWINDOWS
        </div>
      }
    >
      <LazyTool lang={lang} onClose={onClose} showHeader={false} />
    </Suspense>
  );
}

export function SuiteToolEmbed({ toolId, lang }: { toolId: string; lang: LanguageType }) {
  const [resetKey, setResetKey] = useState(0);

  return (
    <section className="workspace-panel">
      <div key={resetKey}>
        <SuiteToolLoader toolId={toolId} lang={lang} onClose={() => setResetKey((k) => k + 1)} />
      </div>
    </section>
  );
}
