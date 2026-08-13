import { lazy, Suspense, useState, type ComponentType, type LazyExoticComponent } from 'react';
import type { LanguageType } from '../../types';
import { WorkspaceFallback } from '../RouteFallback';

interface SuiteToolProps {
  lang: LanguageType;
  onClose: () => void;
  showHeader?: boolean;
}

type SuiteLazyTool = LazyExoticComponent<ComponentType<SuiteToolProps>>;

/** Lazy components created once at module scope — never call lazy() during render. */
const SUITE_LAZY_TOOLS: Record<string, SuiteLazyTool> = {
  'color-picker': lazy(() =>
    import('../ColorPickerTool').then((m) => ({
      default: ({ lang, onClose, showHeader }: SuiteToolProps) => (
        <m.ColorPickerTool lang={lang} onClose={onClose} showHeader={showHeader} />
      ),
    }))
  ),
  'document-studio': lazy(() =>
    import('../../documentStudio/DocumentStudioModal').then((m) => ({
      default: ({ lang, onClose }: SuiteToolProps) => (
        <m.DocumentStudioModal lang={lang} onClose={onClose} />
      ),
    }))
  ),
  'qr-gen': lazy(() => import('./tools/QrCodeSuiteTool')),
  'cpf-gen': lazy(() => import('./tools/CpfSuiteTool')),
  'code-clean': lazy(() => import('./tools/CodeCleanerSuiteTool')),
  'report-gen': lazy(() => import('./tools/ReportSuiteTool')),
  'font-identifier': lazy(() => import('./tools/FontIdentifierSuiteTool')),
  'remove-restrictions': lazy(() => import('./tools/RemoveRestrictionsSuiteTool')),
  'unlock-pdf': lazy(() => import('./tools/UnlockPdfSuiteTool')),
  'file-xray': lazy(() => import('./tools/FileXraySuiteTool')),
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
  const LazyTool = SUITE_LAZY_TOOLS[toolId];

  if (!LazyTool) {
    return (
      <div className="py-16 text-center text-xs font-medium text-slate-500" role="status">
        Tool unavailable
      </div>
    );
  }

  return (
    <Suspense fallback={<WorkspaceFallback />}>
      <LazyTool lang={lang} onClose={onClose} showHeader={false} />
    </Suspense>
  );
}

export function SuiteToolEmbed({ toolId, lang }: { toolId: string; lang: LanguageType }) {
  const [resetKey, setResetKey] = useState(0);

  if (!toolId) {
    return (
      <section className="workspace-panel">
        <div className="py-16 text-center text-xs font-medium text-slate-500" role="status">
          Tool unavailable
        </div>
      </section>
    );
  }

  return (
    <section className="workspace-panel">
      <div key={resetKey}>
        <SuiteToolLoader toolId={toolId} lang={lang} onClose={() => setResetKey((k) => k + 1)} />
      </div>
    </section>
  );
}
