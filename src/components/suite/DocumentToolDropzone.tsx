import { useCallback, useRef, useState, type DragEvent, type ReactNode } from 'react';
import { Upload, Loader2, AlertCircle, X, Plus } from 'lucide-react';
import type { LanguageType } from '../../types';
import { ModalHeader } from './shared';

export type DocToolAccept = 'pdf' | 'pdf-docx' | 'file-xray' | 'documents' | 'image';

interface Labels {
  dropTitle: string;
  orText: string;
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

/** Shared page/modal chrome matching ConverterWorkbench workspace title + padding. */
export function SuiteWorkspaceShell({
  title,
  subtitle,
  showHeader = false,
  onClose,
  closeLabel,
  children,
}: {
  title: string;
  subtitle: string;
  showHeader?: boolean;
  onClose: () => void;
  closeLabel: string;
  children: ReactNode;
}) {
  return (
    <>
      {showHeader ? <ModalHeader title={title} onClose={onClose} closeLabel={closeLabel} /> : null}
      <div className="p-6 md:p-8 xl:p-10">
        {!showHeader ? (
          <div className="text-center mb-8 select-none">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 mb-2">{title}</h2>
            <p className="text-sm text-slate-500 max-w-lg mx-auto leading-relaxed font-medium">{subtitle}</p>
          </div>
        ) : null}
        {children}
      </div>
    </>
  );
}

export const SUITE_UPLOAD_SUBTITLE: Record<LanguageType, string> = {
  pt: 'Envie seus arquivos e processe localmente.',
  en: 'Upload your files and process locally.',
  es: 'Suba sus archivos y procese localmente.',
};

const DOCUMENT_EXTS = new Set([
  'pdf',
  'txt',
  'docx',
  'dotx',
  'docm',
  'dotm',
  'doc',
  'dot',
  'rtf',
  'odt',
  'html',
  'htm',
  'xlsx',
  'xlsm',
  'csv',
]);

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

const IMAGE_EXTS = new Set(['jpg', 'jpeg', 'png', 'webp', 'gif', 'bmp']);

function isAllowed(file: File, accept: DocToolAccept): boolean {
  const ext = file.name.split('.').pop()?.toLowerCase() || '';
  if (accept === 'pdf') return ext === 'pdf' || file.type === 'application/pdf';
  if (accept === 'file-xray') return XRAY_EXTS.has(ext);
  if (accept === 'documents') return DOCUMENT_EXTS.has(ext);
  if (accept === 'image') {
    return IMAGE_EXTS.has(ext) || file.type.startsWith('image/');
  }
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
        : accept === 'documents'
          ? '.pdf,.txt,.docx,.dotx,.docm,.dotm,.doc,.dot,.rtf,.odt,.html,.htm,.xlsx,.xlsm,.csv'
          : accept === 'image'
            ? 'image/jpeg,image/png,image/webp,image/gif,image/bmp,.jpg,.jpeg,.png,.webp,.gif,.bmp'
        : '.pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document';

  const chips = labels.formats
    .split(/[•·|,]/)
    .map((s) => s.trim())
    .filter(Boolean);

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
        className={`premium-dropzone ${dragActive ? 'premium-dropzone-active' : ''} ${
          disabled ? 'opacity-50 pointer-events-none' : ''
        }`}
        data-tool-upload="upload"
      >
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          accept={acceptAttr}
          disabled={disabled}
          onChange={(e) => handleFiles(e.target.files)}
        />
        <div className="premium-dropzone-icon" aria-hidden>
          <Upload size={26} strokeWidth={1.75} />
        </div>
        <p className="text-base font-semibold text-slate-800 mb-1">
          {dragActive ? labels.dropActive : labels.dropTitle}
        </p>
        <p className="text-sm text-slate-500 font-medium mb-6">{labels.orText}</p>
        <button type="button" className="btn-secondary text-xs pointer-events-none">
          {labels.browse}
          <Plus size={14} className="pointer-events-none" aria-hidden />
        </button>
        {chips.length > 0 ? (
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {chips.map((label) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/70 border border-slate-200/80 text-[10px] font-medium text-slate-500"
              >
                {label}
              </span>
            ))}
          </div>
        ) : null}
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
      <span className="sr-only">{lang}</span>
    </div>
  );
}

export function ToolBusyState({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12" role="status" aria-live="polite">
      <Loader2 className="animate-spin text-win-blue" size={28} aria-hidden />
      <p className="text-xs font-semibold text-slate-600">{label}</p>
    </div>
  );
}
