import { lazy, Suspense, type ComponentType, type LazyExoticComponent } from 'react';
import type { LanguageType } from '../../types';
import { ColorPickerTool } from '../ColorPickerTool';
import { WorkspaceFallback } from '../RouteFallback';

interface SuiteToolProps {
  onClose: () => void;
  lang: LanguageType;
  showHeader?: boolean;
}

type SuiteLazyTool = LazyExoticComponent<ComponentType<SuiteToolProps>>;

/** Lazy components created once at module scope — never call lazy() during render. */
const SUITE_LAZY_TOOLS: Record<string, SuiteLazyTool> = {
  'qr-gen': lazy(() => import('./tools/QrCodeSuiteTool')),
  'cpf-gen': lazy(() => import('./tools/CpfSuiteTool')),
  'code-clean': lazy(() => import('./tools/CodeCleanerSuiteTool')),
  'report-gen': lazy(() => import('./tools/ReportSuiteTool')),
  'font-identifier': lazy(() => import('./tools/FontIdentifierSuiteTool')),
  'remove-restrictions': lazy(() => import('./tools/RemoveRestrictionsSuiteTool')),
  'unlock-pdf': lazy(() => import('./tools/UnlockPdfSuiteTool')),
  'file-xray': lazy(() => import('./tools/FileXraySuiteTool')),
  'organize-pdf': lazy(() => import('./tools/OrganizePdfSuiteTool')),
  'redact-pdf': lazy(() => import('./tools/RedactPdfSuiteTool')),
  'document-converter': lazy(() => import('./tools/DocumentConverterSuiteTool')),
  'margin-adjust': lazy(() => import('./tools/MarginAdjustSuiteTool')),
  'document-studio': lazy(() =>
    import('../../documentStudio/DocumentStudioModal').then((m) => ({
      default: ({ onClose, lang }: SuiteToolProps) => (
        <m.DocumentStudioModal lang={lang} onClose={onClose} />
      ),
    }))
  ),
};

export function SuiteModalContent({
  toolId,
  lang,
  onClose,
  inModal = false,
}: {
  toolId: string;
  lang: LanguageType;
  onClose: () => void;
  inModal?: boolean;
}) {
  if (toolId === 'color-picker') {
    return <ColorPickerTool lang={lang} onClose={onClose} showHeader={inModal} />;
  }

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
      <LazyTool lang={lang} onClose={onClose} showHeader={inModal} />
    </Suspense>
  );
}
