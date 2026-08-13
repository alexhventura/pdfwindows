import { useState } from 'react';
import { Download, RefreshCw, ShieldCheck, AlertCircle, Lock } from 'lucide-react';
import type { LanguageType } from '../../../types';
import {
  unlockPdfFile,
  UNLOCK_MAX_PAGES,
  type UnlockPdfResult,
  type UnlockProgress,
} from '../../../engines/unlockPdf';
import {
  DocumentToolDropzone,
  ToolBusyState,
  SuiteWorkspaceShell,
  SUITE_UPLOAD_SUBTITLE,
} from '../DocumentToolDropzone';
import { inputClass } from '../shared';

const copy: Record<LanguageType, Record<string, string>> = {
  pt: {
    title: 'Desbloquear PDF',
    hero: 'Remova a proteção do seu PDF e gere uma nova cópia desbloqueada.',
    dropTitle: 'Solte seus arquivos aqui',
    orText: 'ou',
    browse: 'Escolher arquivos',
    formats: 'PDF',
    dropActive: 'Solte o arquivo aqui',
    invalidFile: 'Envie um arquivo PDF válido.',
    emptyFile: 'O arquivo está vazio.',
    tooLarge: 'Arquivo acima do limite de 100 MB.',
    analyzing: 'Analisando PDF...',
    unlocking: 'Desbloqueando PDF...',
    unlockingPage: 'Gerando cópia desbloqueada… página {page} de {total}',
    finalizing: 'Finalizando PDF desbloqueado…',
    success: 'Cópia desbloqueada pronta',
    successHint: 'Baixe o novo arquivo. O PDF original no seu dispositivo não foi alterado.',
    download: 'Baixar PDF desbloqueado',
    again: 'Desbloquear outro PDF',
    needPassword:
      'Este PDF exige senha de abertura. Informe a senha legítima para criar uma cópia nova sem proteção.',
    password: 'Senha do PDF',
    unlock: 'Criar cópia desbloqueada',
    wrongPassword: 'Senha incorreta. Tente novamente.',
    corrupt: 'Não foi possível ler este PDF. O arquivo pode estar corrompido.',
    unsupported: 'Não foi possível remover esta proteção com as bibliotecas disponíveis no navegador.',
    privacy:
      '100% no navegador. A senha e o arquivo não saem do seu dispositivo. Geramos uma cópia nova; o original permanece intacto.',
    howTitle: 'Como funciona',
    how1: 'PDFs com restrições de permissão (que abrem sem senha) são regravados em uma cópia sem o dicionário de restrições — texto e vetores preservados.',
    how2: 'PDFs com senha de abertura pedem a senha; com ela, descriptografamos localmente e gravamos um PDF novo sem /Encrypt.',
    how3:
      'Quando a criptografia impede a regravação binária, reconstruímos páginas com qualidade adaptativa e camada de texto pesquisável (quando o PDF já tem texto). Avisamos o método usado.',
    methodStrip: 'Cópia estrutural (texto/vetores preservados)',
    methodRaster: 'Cópia reconstruída (páginas + texto pesquisável quando disponível)',
    pageCap: `Documentos com mais de ${UNLOCK_MAX_PAGES} páginas são processados até o limite para manter o navegador responsivo.`,
  },
  en: {
    title: 'Unlock PDF',
    hero: 'Remove PDF protection and generate a new unlocked copy.',
    dropTitle: 'Drop your files here',
    orText: 'or',
    browse: 'Choose files',
    formats: 'PDF',
    dropActive: 'Drop the file here',
    invalidFile: 'Please upload a valid PDF file.',
    emptyFile: 'The file is empty.',
    tooLarge: 'File exceeds the 100 MB limit.',
    analyzing: 'Analyzing PDF...',
    unlocking: 'Unlocking PDF...',
    unlockingPage: 'Building unlocked copy… page {page} of {total}',
    finalizing: 'Finalizing unlocked PDF…',
    success: 'Unlocked copy ready',
    successHint: 'Download the new file. Your original PDF on disk was not modified.',
    download: 'Download unlocked PDF',
    again: 'Unlock another PDF',
    needPassword:
      'This PDF requires an open password. Enter the legitimate password to create a new unprotected copy.',
    password: 'PDF password',
    unlock: 'Create unlocked copy',
    wrongPassword: 'Incorrect password. Try again.',
    corrupt: 'Could not read this PDF. The file may be corrupted.',
    unsupported: 'This protection could not be removed with the libraries available in the browser.',
    privacy:
      '100% in-browser. Password and file never leave your device. We generate a new copy; your original stays intact.',
    howTitle: 'How it works',
    how1: 'PDFs with permission restrictions (that open without a password) are rewritten into a copy without the restriction dictionary — text and vectors preserved.',
    how2: 'PDFs with an open password ask for it; with the password we decrypt locally and write a new PDF without /Encrypt.',
    how3:
      'When encryption blocks a binary rewrite, we rebuild pages at adaptive quality with a searchable text layer when the PDF already has text. We disclose the method used.',
    methodStrip: 'Structural copy (text/vectors preserved)',
    methodRaster: 'Rebuilt copy (pages + searchable text when available)',
    pageCap: `Documents over ${UNLOCK_MAX_PAGES} pages are processed up to that limit to keep the browser responsive.`,
  },
  es: {
    title: 'Desbloquear PDF',
    hero: 'Quite la protección de su PDF y genere una nueva copia desbloqueada.',
    dropTitle: 'Suelta tus archivos aquí',
    orText: 'o',
    browse: 'Elegir archivos',
    formats: 'PDF',
    dropActive: 'Suelte el archivo aquí',
    invalidFile: 'Envíe un archivo PDF válido.',
    emptyFile: 'El archivo está vacío.',
    tooLarge: 'El archivo supera el límite de 100 MB.',
    analyzing: 'Analizando PDF...',
    unlocking: 'Desbloqueando PDF...',
    unlockingPage: 'Generando copia desbloqueada… página {page} de {total}',
    finalizing: 'Finalizando PDF desbloqueado…',
    success: 'Copia desbloqueada lista',
    successHint: 'Descargue el archivo nuevo. El PDF original en su dispositivo no se modificó.',
    download: 'Descargar PDF desbloqueado',
    again: 'Desbloquear otro PDF',
    needPassword:
      'Este PDF exige contraseña de apertura. Indique la clave legítima para crear una copia nueva sin protección.',
    password: 'Contraseña del PDF',
    unlock: 'Crear copia desbloqueada',
    wrongPassword: 'Contraseña incorrecta. Inténtelo de nuevo.',
    corrupt: 'No se pudo leer este PDF. El archivo puede estar corrupto.',
    unsupported: 'No fue posible quitar esta protección con las bibliotecas disponibles en el navegador.',
    privacy:
      '100% en el navegador. La contraseña y el archivo no salen de su dispositivo. Generamos una copia nueva; el original permanece intacto.',
    howTitle: 'Cómo funciona',
    how1: 'Los PDF con restricciones de permiso (que se abren sin contraseña) se reescriben en una copia sin el diccionario de restricciones — texto y vectores preservados.',
    how2: 'Los PDF con contraseña de apertura la piden; con ella desciframos en local y grabamos un PDF nuevo sin /Encrypt.',
    how3:
      'Cuando el cifrado impide la reescritura binaria, reconstruimos páginas con calidad adaptativa y capa de texto buscable si el PDF ya tiene texto. Indicamos el método usado.',
    methodStrip: 'Copia estructural (texto/vectores preservados)',
    methodRaster: 'Copia reconstruida (páginas + texto buscable cuando hay)',
    pageCap: `Los documentos de más de ${UNLOCK_MAX_PAGES} páginas se procesan hasta ese límite para mantener el navegador responsivo.`,
  },
};

function busyLabel(t: Record<string, string>, progress: UnlockProgress | null, unlocking: boolean): string {
  if (!progress) return unlocking ? t.unlocking : t.analyzing;
  if (progress.phase === 'finalizing') return t.finalizing;
  if (progress.phase === 'rebuilding' && progress.total > 0) {
    return t.unlockingPage.replace('{page}', String(progress.page)).replace('{total}', String(progress.total));
  }
  return t.unlocking;
}

export default function UnlockPdfSuiteTool({
  lang,
  onClose,
  showHeader = false,
}: {
  lang: LanguageType;
  onClose: () => void;
  showHeader?: boolean;
}) {
  const t = copy[lang];
  const closeLabel = lang === 'pt' ? 'Fechar' : lang === 'es' ? 'Cerrar' : 'Close';
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState<UnlockProgress | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState('');
  const [needPassword, setNeedPassword] = useState(false);
  const [result, setResult] = useState<UnlockPdfResult | null>(null);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const reset = () => {
    if (outputUrl) URL.revokeObjectURL(outputUrl);
    setFile(null);
    setPassword('');
    setNeedPassword(false);
    setResult(null);
    setOutputUrl(null);
    setError(null);
    setProgress(null);
    onClose();
  };

  const applyResult = (res: UnlockPdfResult) => {
    setResult(res);
    if (res.status === 'need-password') {
      setNeedPassword(true);
      return;
    }
    if (res.status === 'wrong-password') {
      setError(t.wrongPassword);
      setNeedPassword(true);
      return;
    }
    if (res.status === 'corrupt') {
      setError(t.corrupt);
      return;
    }
    if (res.status === 'unsupported' || !res.blob) {
      setError(t.unsupported);
      return;
    }
    if (outputUrl) URL.revokeObjectURL(outputUrl);
    setOutputUrl(URL.createObjectURL(res.blob));
    setNeedPassword(false);
    setError(null);
  };

  const run = async (f: File, pwd?: string) => {
    setBusy(true);
    setError(null);
    setProgress(null);
    setFile(f);
    try {
      const res = await unlockPdfFile(f, pwd, setProgress);
      applyResult(res);
    } catch {
      setError(t.corrupt);
    } finally {
      setBusy(false);
      setProgress(null);
    }
  };

  const download = () => {
    if (!outputUrl || !result?.fileName) return;
    const a = document.createElement('a');
    a.href = outputUrl;
    a.download = result.fileName;
    a.click();
  };

  return (
    <SuiteWorkspaceShell
      title={t.title}
      subtitle={SUITE_UPLOAD_SUBTITLE[lang]}
      showHeader={showHeader}
      onClose={onClose}
      closeLabel={closeLabel}
    >
      <div className="space-y-6">
        {!outputUrl && !needPassword && !busy && (
          <DocumentToolDropzone
            lang={lang}
            accept="pdf"
            onFile={(f) => run(f)}
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

        {busy && <ToolBusyState label={busyLabel(t, progress, Boolean(needPassword || password))} />}

        {needPassword && !busy && !outputUrl && (
          <form
            className="space-y-4 p-4 border border-slate-200/80 rounded-2xl bg-white/60"
            onSubmit={(e) => {
              e.preventDefault();
              if (file) run(file, password);
            }}
          >
            <div className="flex items-start gap-2 text-xs font-semibold text-slate-700">
              <Lock size={16} className="text-rose-500 shrink-0 mt-0.5" />
              <p>{t.needPassword}</p>
            </div>
            {file && <p className="text-[11px] font-semibold text-slate-400 truncate">{file.name}</p>}
            <label className="block">
              <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">{t.password}</span>
              <input
                type="password"
                autoFocus
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputClass + ' mt-1 w-full'}
              />
            </label>
            {error && (
              <p role="alert" className="text-[11px] font-semibold text-rose-600 flex items-center gap-1.5">
                <AlertCircle size={12} /> {error}
              </p>
            )}
            <button type="submit" disabled={!password.trim()} className="w-full btn-primary py-3.5 disabled:opacity-50">
              {t.unlock}
            </button>
            <button type="button" onClick={reset} className="w-full text-xs font-semibold text-slate-500">
              {t.again}
            </button>
          </form>
        )}

        {error && !needPassword && !outputUrl && !busy && (
          <div role="alert" className="bg-rose-50 border border-rose-100 text-rose-700 rounded-xl px-4 py-3 text-xs font-semibold">
            {error}
            <button type="button" onClick={reset} className="block mt-2 text-win-blue font-semibold">
              {t.again}
            </button>
          </div>
        )}

        {outputUrl && result?.status === 'unlocked' && (
          <div className="space-y-4 text-center py-4">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <ShieldCheck size={28} />
            </div>
            <h3 className="text-base font-semibold text-slate-900">{t.success}</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">{t.successHint}</p>
            {result.method && (
              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                {result.method === 'permissions-strip' ? t.methodStrip : t.methodRaster}
              </p>
            )}
            {result.method === 'decrypt-rebuild' &&
              typeof result.pagesProcessed === 'number' &&
              result.pagesProcessed >= UNLOCK_MAX_PAGES && (
                <p className="text-[10px] text-slate-400 max-w-sm mx-auto">{t.pageCap}</p>
              )}
            <button type="button" onClick={download} className="w-full btn-primary py-3.5 flex items-center justify-center gap-2">
              <Download size={16} /> {t.download}
            </button>
            {result.fileName && (
              <p className="text-[10px] font-semibold text-slate-400 truncate">{result.fileName}</p>
            )}
            <button type="button" onClick={reset} className="text-xs font-semibold text-win-blue flex items-center justify-center gap-1.5 mx-auto">
              <RefreshCw size={12} /> {t.again}
            </button>
          </div>
        )}

        {!busy && !outputUrl && (
          <div className="rounded-2xl border border-slate-100 bg-slate-50/80 px-4 py-3 space-y-2">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">{t.howTitle}</p>
            <ul className="text-[11px] text-slate-600 space-y-1.5 list-disc pl-4">
              <li>{t.how1}</li>
              <li>{t.how2}</li>
              <li>{t.how3}</li>
            </ul>
            <p className="text-[10px] font-semibold text-emerald-700/80 pt-1">{t.privacy}</p>
          </div>
        )}
      </div>
    </SuiteWorkspaceShell>
  );
}
