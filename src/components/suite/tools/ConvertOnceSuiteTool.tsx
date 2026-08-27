import { useState, type ReactNode } from 'react';
import { Download, RefreshCw, AlertCircle } from 'lucide-react';
import type { LanguageType } from '../../../types';
import {
  DocumentToolDropzone,
  ToolBusyState,
  SuiteWorkspaceShell,
  SUITE_UPLOAD_SUBTITLE,
  type DocToolAccept,
} from '../DocumentToolDropzone';

export type ConvertOnceCopy = Record<
  LanguageType,
  {
    title: string;
    dropTitle: string;
    orText: string;
    browse: string;
    formats: string;
    dropActive: string;
    invalidFile: string;
    emptyFile: string;
    tooLarge: string;
    run: string;
    running: string;
    success: string;
    download: string;
    again: string;
    privacy: string;
    note: string;
    corrupt: string;
  }
>;

export function ConvertOnceSuiteTool({
  lang,
  onClose,
  showHeader = false,
  accept,
  copy,
  convert,
  extras,
}: {
  lang: LanguageType;
  onClose: () => void;
  showHeader?: boolean;
  accept: DocToolAccept;
  copy: ConvertOnceCopy;
  convert: (file: File) => Promise<{ blob: Blob; fileName: string }>;
  extras?: ReactNode;
}) {
  const t = copy[lang];
  const closeLabel = lang === 'pt' ? 'Fechar' : lang === 'es' ? 'Cerrar' : 'Close';
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [output, setOutput] = useState<{ url: string; name: string } | null>(null);

  const startOver = () => {
    if (output) URL.revokeObjectURL(output.url);
    setFile(null);
    setBusy(false);
    setError(null);
    setOutput(null);
  };

  const run = async () => {
    if (!file) return;
    setBusy(true);
    setError(null);
    try {
      const result = await convert(file);
      if (output) URL.revokeObjectURL(output.url);
      const url = URL.createObjectURL(result.blob);
      setOutput({ url, name: result.fileName });
      const a = document.createElement('a');
      a.href = url;
      a.download = result.fileName;
      a.click();
    } catch (err) {
      const message = err instanceof Error ? err.message : '';
      setError(
        message === 'PDF_NO_TEXT' || message === 'NO_TEXT'
          ? lang === 'pt'
            ? 'Este arquivo não tem texto extraível. Use OCR de PDF para digitalizações.'
            : lang === 'es'
              ? 'Este archivo no tiene texto extraíble. Use OCR de PDF para escaneos.'
              : 'This file has no extractable text. Use PDF OCR for scans.'
          : t.corrupt
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <SuiteWorkspaceShell
      title={t.title}
      subtitle={SUITE_UPLOAD_SUBTITLE[lang]}
      showHeader={showHeader}
      onClose={onClose}
      closeLabel={closeLabel}
    >
      <div className="space-y-5">
        {!file && !busy && !output && (
          <DocumentToolDropzone
            lang={lang}
            accept={accept}
            onFile={setFile}
            labels={{
              dropTitle: t.dropTitle,
              orText: t.orText,
              browse: t.browse,
              formats: t.formats,
              dropActive: t.dropActive,
              invalidFile: t.invalidFile,
              emptyFile: t.emptyFile,
              tooLarge: t.tooLarge,
            }}
          />
        )}
        {busy && <ToolBusyState label={t.running} />}
        {error && !busy && (
          <div role="alert" className="bg-rose-50 border border-rose-100 text-rose-700 rounded-xl px-4 py-3 text-xs font-semibold flex items-start gap-2">
            <AlertCircle size={14} className="mt-0.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}
        {file && !busy && !output && (
          <div className="space-y-4">
            <p className="text-xs font-semibold text-slate-700 truncate">{file.name}</p>
            {extras}
            <p className="text-[11px] text-slate-500 leading-relaxed">{t.note}</p>
            <button type="button" className="w-full btn-primary py-3.5" onClick={() => void run()}>
              {t.run}
            </button>
            <button type="button" className="w-full text-xs font-semibold text-slate-500" onClick={startOver}>
              {t.again}
            </button>
          </div>
        )}
        {output && (
          <div className="space-y-4 text-center">
            <h3 className="text-base font-semibold text-slate-900">{t.success}</h3>
            <button
              type="button"
              className="w-full btn-primary py-3.5 inline-flex items-center justify-center gap-2"
              onClick={() => {
                const a = document.createElement('a');
                a.href = output.url;
                a.download = output.name;
                a.click();
              }}
            >
              <Download size={16} /> {t.download}
            </button>
            <p className="text-[10px] font-semibold text-slate-400 truncate">{output.name}</p>
            <button type="button" className="text-xs font-semibold text-win-blue inline-flex items-center gap-1" onClick={startOver}>
              <RefreshCw size={12} /> {t.again}
            </button>
          </div>
        )}
        <p className="text-[10px] font-semibold text-emerald-700/80 text-center">{t.privacy}</p>
      </div>
    </SuiteWorkspaceShell>
  );
}

function trilingual(
  title: [string, string, string],
  formats: string,
  invalid: [string, string, string],
  run: [string, string, string],
  note: [string, string, string]
): ConvertOnceCopy {
  const privacy: [string, string, string] = [
    'Processamento 100% local. O original não é enviado nem sobrescrito.',
    '100% local processing. The original is not uploaded or overwritten.',
    'Procesamiento 100% local. El original no se envía ni se sobrescribe.',
  ];
  return {
    pt: {
      title: title[0],
      dropTitle: 'Solte o arquivo aqui',
      orText: 'ou',
      browse: 'Escolher arquivo',
      formats,
      dropActive: 'Solte o arquivo aqui',
      invalidFile: invalid[0],
      emptyFile: 'O arquivo está vazio.',
      tooLarge: 'Arquivo acima do limite de 100 MB.',
      run: run[0],
      running: 'Processando…',
      success: 'Arquivo pronto',
      download: 'Baixar de novo',
      again: 'Outro arquivo',
      privacy: privacy[0],
      note: note[0],
      corrupt: 'Não foi possível processar este arquivo.',
    },
    en: {
      title: title[1],
      dropTitle: 'Drop the file here',
      orText: 'or',
      browse: 'Choose file',
      formats,
      dropActive: 'Drop the file here',
      invalidFile: invalid[1],
      emptyFile: 'The file is empty.',
      tooLarge: 'File exceeds the 100 MB limit.',
      run: run[1],
      running: 'Processing…',
      success: 'File ready',
      download: 'Download again',
      again: 'Another file',
      privacy: privacy[1],
      note: note[1],
      corrupt: 'Could not process this file.',
    },
    es: {
      title: title[2],
      dropTitle: 'Suelte el archivo aquí',
      orText: 'o',
      browse: 'Elegir archivo',
      formats,
      dropActive: 'Suelte el archivo aquí',
      invalidFile: invalid[2],
      emptyFile: 'El archivo está vacío.',
      tooLarge: 'El archivo supera el límite de 100 MB.',
      run: run[2],
      running: 'Procesando…',
      success: 'Archivo listo',
      download: 'Descargar de nuevo',
      again: 'Otro archivo',
      privacy: privacy[2],
      note: note[2],
      corrupt: 'No se pudo procesar este archivo.',
    },
  };
}

export { trilingual };
