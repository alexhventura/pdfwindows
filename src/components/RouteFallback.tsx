import { LogoImage } from './LogoImage';

/** Visible route/workspace loading state — fills the viewport so SPA nav never looks blank. */
export function RouteFallback({ message = 'PDFWINDOWS' }: { message?: string }) {
  return (
    <div
      className="flex-1 flex items-center justify-center py-28 min-h-[50vh]"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="flex flex-col items-center gap-4 premium-surface !py-8 !px-10">
        <LogoImage size={56} className="w-14 h-14 rounded-2xl shadow-md" pulse />
        <p className="text-xs font-semibold text-slate-500">{message}</p>
      </div>
    </div>
  );
}

/** Compact loader inside tool pages while lazy workbenches resolve. */
export function WorkspaceFallback({ message = 'PDFWINDOWS' }: { message?: string }) {
  return (
    <div
      className="workspace-panel py-10 min-h-[12rem] flex flex-col items-center justify-center text-center"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <LogoImage size={48} className="w-12 h-12 mx-auto rounded-2xl mb-3 opacity-80" pulse />
      <p className="text-xs font-medium text-slate-500">{message}</p>
    </div>
  );
}
