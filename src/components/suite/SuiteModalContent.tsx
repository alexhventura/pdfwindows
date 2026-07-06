import { lazy, Suspense, type ComponentType } from 'react';
import type { LanguageType } from '../../types';
import { ColorPickerTool } from '../ColorPickerTool';

const SUITE_TOOL_LOADERS: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void; lang: LanguageType; showHeader?: boolean }> }>
> = {
  'qr-gen': () => import('./tools/QrCodeSuiteTool'),
  'cpf-gen': () => import('./tools/CpfSuiteTool'),
  'code-clean': () => import('./tools/CodeCleanerSuiteTool'),
  'report-gen': () => import('./tools/ReportSuiteTool'),
  'document-studio': () =>
    import('../../documentStudio/DocumentStudioModal').then((m) => ({
      default: ({ onClose, lang }) => <m.DocumentStudioModal lang={lang} onClose={onClose} />,
    })),
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
      <LazyTool lang={lang} onClose={onClose} showHeader={inModal} />
    </Suspense>
  );
}
