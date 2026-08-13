import { useCallback, useRef, useState, type DragEvent, type ReactNode } from 'react';
import { Upload, Loader2, AlertCircle, X } from 'lucide-react';
import type { LanguageType } from '../../types';

export type DocToolAccept = 'pdf' | 'pdf-docx' | 'file-xray';

interface Labels {
  dropTitle: string;
  dropHint: string;
  browse: string;
  formats: string;
  dropActive: string;
  invalidFile: string;
  emptyFile: string;
  tooLarge: string;
}

interface DocumentToolDropzoneProps {
  lang: LanguageType;
  accept: DocToolAccept;
  labels: Labels;
  disabled?: boolean;
  maxBytes?: number;
  onFile: (file: File) => void;
  children?: ReactNode;
}

const XRAY_EXTS = new Set([
  'pdf',
  'docx',
  'xlsx',
  'pptx',
  'jpg',
  'jpeg',
  'png',
  'webp',
  'gif',
  'csv',
  'txt',
  'zip',
]);

function isAllowed(file: File, accept: DocToolAccept): boolean {
  const ext = file.name.split('.').pop()?.toLowerCase() || '';
  if (accept === 'pdf') return ext === 'pdf' || file.type === 'application/pdf';
  if (accept === 'file-xray') return XRAY_EXTS.has(ext);
  return (
    ext === 'pdf' ||
    ext === 'docx' ||
    file.type === 'application/pdf' ||
    file.type.includes('wordprocessingml')
  );
}

export function DocumentToolDropzone({
  lang,
  accept,
  labels,
  disabled,
  maxBytes = 100 * 1024 * 1024,
  onFile,
  children,
}: DocumentToolDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFiles = useCallback(
    (list: FileList | null) => {
      setError(null);
      const file = list?.[0];
      if (!file) return;
      if (file.size === 0) {
        setError(labels.emptyFile);
        return;
      }
      if (file.size > maxBytes) {
        setError(labels.tooLarge);
        return;
      }
      if (!isAllowed(file, accept)) {
        setError(labels.invalidFile);
        return;
      }
      onFile(file);
    },
    [accept, labels, maxBytes, onFile]
  );

  const onDrag = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled) return;
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
    if (e.type === 'dragleave') setDragActive(false);
  };

  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (disabled) return;
    handleFiles(e.dataTransfer.files);
  };

  const acceptAttr =
    accept === 'pdf'
      ? '.pdf,application/pdf'
      : accept === 'file-xray'
        ? '.pdf,.docx,.xlsx,.pptx,.jpg,.jpeg,.png,.webp,.gif,.csv,.txt,.zip'
        : '.pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document';

  return (
    <div className="space-y-3">
      <div
        role="button"
        tabIndex={0}
        aria-label={labels.browse}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            inputRef.current?.click();
          }
        }}
        onDragEnter={onDrag}
        onDragOver={onDrag}
        onDragLeave={onDrag}
        onDrop={onDrop}
        onClick={() => !disabled && inputRef.current?.click()}
        className={`border-2 border-dashed rounded-2xl p-8 md:p-10 text-center cursor-pointer transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-win-blue ${
          dragActive
            ? 'border-win-blue bg-blue-50/50'
            : 'border-slate-200 hover:border-slate-300 bg-slate-50/60'
        } ${disabled ? 'opacity-50 pointer-events-none' : ''}`}
      >
        <input
          ref={inputRef}
          type="file"
          className="sr-only"
          accept={acceptAttr}
          disabled={disabled}
          onChange={(e) => handleFiles(e.target.files)}
        />
        <div className="mx-auto w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-win-blue mb-4 shadow-sm">
          <Upload size={20} aria-hidden />
        </div>
        <p className="text-sm font-bold text-slate-800 mb-1">
          {dragActive ? labels.dropActive : labels.dropTitle}
        </p>
        <p className="text-[11px] text-slate-500 font-medium mb-4">{labels.dropHint}</p>
        <span className="inline-flex px-5 py-2.5 bg-win-blue text-white rounded-xl text-xs font-bold">
          {labels.browse}
        </span>
        <p className="mt-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">{labels.formats}</p>
      </div>

      {error && (
        <div
          role="alert"
          className="flex items-start gap-2 bg-rose-50 border border-rose-100 text-rose-700 px-3 py-2.5 rounded-xl text-[11px] font-semibold"
        >
          <AlertCircle size={14} className="shrink-0 mt-0.5" />
          <span className="flex-1">{error}</span>
          <button type="button" className="p-0.5 hover:bg-rose-100 rounded" onClick={() => setError(null)} aria-label="Close">
            <X size={12} />
          </button>
        </div>
      )}

      {children}
      {/* keep lang for future a11y announcements */}
      <span className="sr-only">{lang}</span>
    </div>
  );
}

export function ToolBusyState({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12" role="status" aria-live="polite">
      <Loader2 className="animate-spin text-win-blue" size={28} aria-hidden />
      <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">{label}</p>
    </div>
  );
}
