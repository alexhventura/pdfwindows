import { useState } from 'react';
import { Download, RefreshCw, ShieldCheck, AlertCircle, Lock, Eye, EyeOff } from 'lucide-react';
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
    decrypting: 'Removendo proteção…',
    unlockingPage: 'Gerando cópia desbloqueada… página {page} de {total}',
    finalizing: 'Finalizando PDF desbloqueado…',
    success: 'Cópia desbloqueada pronta',
    successHint: 'Baixe o novo arquivo. O PDF original no seu dispositivo não foi alterado.',
    download: 'Baixar PDF desbloqueado',
    again: 'Desbloquear outro PDF',
    needPassword:
      'Este PDF exige senha de abertura. Informe a senha para gerar a cópia desbloqueada no seu navegador.',
    password: 'Senha do PDF',
    showPassword: 'Mostrar senha',
    hidePassword: 'Ocultar senha',
    unlock: 'Criar cópia desbloqueada',
    wrongPassword: 'Senha incorreta. Tente novamente.',
    corrupt: 'Não foi possível ler este PDF. O arquivo pode estar corrompido.',
    unsupported: 'Não foi possível remover esta proteção com as bibliotecas disponíveis no navegador.',
    privacy:
      '100% no navegador. A senha e o arquivo não saem do seu dispositivo. Geramos uma cópia nova; o original permanece intacto.',
    howTitle: 'Como funciona',
    how1: 'Restrições de permissão (imprimir/copiar) são removidas automaticamente — sem pedir senha — com cópia preservando texto e vetores.',
    how2: 'Com senha de abertura, use a senha do documento; descriptografamos localmente e geramos um PDF novo sem proteção.',
    how3: 'Processamento local e imediato sempre que a remoção automática for possível.',
    methodStrip: 'Cópia estrutural (texto/vetores preservados)',
    methodBinary: 'Cópia descriptografada (texto/vetores preservados)',
    methodRaster: 'Cópia reconstruída (páginas + texto pesquisável quando disponível)',
    pageCap: `Documentos com mais de ${UNLOCK_MAX_PAGES} páginas são processados até o limite para manter o navegador responsivo.`,
    encAes: 'Proteção AES-256',
    encRc4: 'Proteção RC4',
    pagesLabel: '{n} páginas',
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
    decrypting: 'Removing protection…',
    unlockingPage: 'Building unlocked copy… page {page} of {total}',
    finalizing: 'Finalizing unlocked PDF…',
    success: 'Unlocked copy ready',
    successHint: 'Download the new file. Your original PDF on disk was not modified.',
    download: 'Download unlocked PDF',
    again: 'Unlock another PDF',
    needPassword:
      'This PDF requires an open password. Enter it to generate an unlocked copy in your browser.',
    password: 'PDF password',
    showPassword: 'Show password',
    hidePassword: 'Hide password',
    unlock: 'Create unlocked copy',
    wrongPassword: 'Incorrect password. Try again.',
    corrupt: 'Could not read this PDF. The file may be corrupted.',
    unsupported: 'This protection could not be removed with the libraries available in the browser.',
    privacy:
      '100% in-browser. Password and file never leave your device. We generate a new copy; your original stays intact.',
    howTitle: 'How it works',
    how1: 'Permission restrictions (print/copy) are removed automatically — no password prompt — with a copy that keeps text and vectors.',
    how2: 'With an open password, enter the document password; we decrypt locally and write a new unprotected PDF.',
    how3: 'Local processing runs immediately whenever automatic removal is possible.',
    methodStrip: 'Structural copy (text/vectors preserved)',
    methodBinary: 'Decrypted copy (text/vectors preserved)',
    methodRaster: 'Rebuilt copy (pages + searchable text when available)',
    pageCap: `Documents over ${UNLOCK_MAX_PAGES} pages are processed up to that limit to keep the browser responsive.`,
    encAes: 'AES-256 protection',
    encRc4: 'RC4 protection',
    pagesLabel: '{n} pages',
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
    decrypting: 'Quitando protección…',
    unlockingPage: 'Generando copia desbloqueada… página {page} de {total}',
    finalizing: 'Finalizando PDF desbloqueado…',
    success: 'Copia desbloqueada lista',
    successHint: 'Descargue el archivo nuevo. El PDF original en su dispositivo no se modificó.',
    download: 'Descargar PDF desbloqueado',
    again: 'Desbloquear otro PDF',
    needPassword:
      'Este PDF exige contraseña de apertura. Indíquela para generar la copia desbloqueada en su navegador.',
    password: 'Contraseña del PDF',
    showPassword: 'Mostrar contraseña',
    hidePassword: 'Ocultar contraseña',
    unlock: 'Crear copia desbloqueada',
    wrongPassword: 'Contraseña incorrecta. Inténtelo de nuevo.',
    corrupt: 'No se pudo leer este PDF. El archivo puede estar corrupto.',
    unsupported: 'No fue posible quitar esta protección con las bibliotecas disponibles en el navegador.',
    privacy:
      '100% en el navegador. La contraseña y el archivo no salen de su dispositivo. Generamos una copia nueva; el original permanece intacto.',
    howTitle: 'Cómo funciona',
    how1: 'Las restricciones de permiso (imprimir/copiar) se quitan automáticamente — sin pedir clave — con una copia que conserva texto y vectores.',
    how2: 'Con contraseña de apertura, indique la clave del documento; desciframos en local y generamos un PDF nuevo sin protección.',
    how3: 'Procesamiento local e inmediato siempre que la eliminación automática sea posible.',
    methodStrip: 'Copia estructural (texto/vectores preservados)',
    methodBinary: 'Copia descifrada (texto/vectores preservados)',
    methodRaster: 'Copia reconstruida (páginas + texto buscable cuando hay)',
    pageCap: `Los documentos de más de ${UNLOCK_MAX_PAGES} páginas se procesan hasta ese límite para mantener el navegador responsivo.`,
    encAes: 'Protección AES-256',
    encRc4: 'Protección RC4',
    pagesLabel: '{n} páginas',
  },
};

function busyLabel(t: Record<string, string>, progress: UnlockProgress | null, unlocking: boolean): string {
  if (!progress) return unlocking ? t.unlocking : t.analyzing;
  if (progress.phase === 'finalizing') return t.finalizing;
  if (progress.phase === 'decrypting') return t.decrypting;
  if (progress.phase === 'rebuilding' && progress.total > 0) {
    return t.unlockingPage.replace('{page}', String(progress.page)).replace('{total}', String(progress.total));
  }
  return t.unlocking;
}

function progressPercent(progress: UnlockProgress | null): number | null {
  if (!progress || progress.phase !== 'rebuilding' || progress.total < 1) return null;
  return Math.min(100, Math.round((progress.page / progress.total) * 100));
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
  const [showPassword, setShowPassword] = useState(false);
  const [needPassword, setNeedPassword] = useState(false);
  const [result, setResult] = useState<UnlockPdfResult | null>(null);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const startOver = () => {
    if (outputUrl) URL.revokeObjectURL(outputUrl);
    setFile(null);
    setPassword('');
    setShowPassword(false);
    setNeedPassword(false);
    setResult(null);
    setOutputUrl(null);
    setError(null);
    setProgress(null);
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
    setPassword('');
    setShowPassword(false);
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

  const pct = progressPercent(progress);
  const encLabel =
    result?.encryption?.algorithm === 'AES-256'
      ? t.encAes
      : result?.encryption?.algorithm === 'RC4'
        ? t.encRc4
        : null;

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

        {busy && (
          <div className="space-y-3">
            <ToolBusyState label={busyLabel(t, progress, Boolean(needPassword || password))} />
            {pct != null && (
              <div className="max-w-xs mx-auto" aria-hidden>
                <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full bg-win-blue transition-[width] duration-200" style={{ width: `${pct}%` }} />
                </div>
                <p className="text-[10px] font-semibold text-slate-400 text-center mt-1.5">{pct}%</p>
              </div>
            )}
          </div>
        )}

        {needPassword && !busy && !outputUrl && (
          <form
            className="space-y-4 p-4 border border-slate-200/80 rounded-2xl bg-white/60"
            onSubmit={(e) => {
              e.preventDefault();
              if (file && password.trim()) run(file, password);
            }}
          >
            <div className="flex items-start gap-2 text-xs font-semibold text-slate-700">
              <Lock size={16} className="text-rose-500 shrink-0 mt-0.5" />
              <p>{t.needPassword}</p>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold text-slate-400">
              {file && <span className="truncate max-w-[220px]">{file.name}</span>}
              {encLabel && (
                <span className="rounded-md bg-slate-100 px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-slate-500">
                  {encLabel}
                </span>
              )}
            </div>
            <label className="block">
              <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">{t.password}</span>
              <div className="relative mt-1">
                <input
                  type={showPassword ? 'text' : 'password'}
                  autoFocus
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError(null);
                  }}
                  className={inputClass + ' w-full pr-10'}
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-slate-600"
                  aria-label={showPassword ? t.hidePassword : t.showPassword}
                  onClick={() => setShowPassword((v) => !v)}
                >
                  {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </label>
            {error && (
              <p role="alert" className="text-[11px] font-semibold text-rose-600 flex items-center gap-1.5">
                <AlertCircle size={12} /> {error}
              </p>
            )}
            <button type="submit" disabled={!password.trim()} className="w-full btn-primary py-3.5 disabled:opacity-50">
              {t.unlock}
            </button>
            <button type="button" onClick={startOver} className="w-full text-xs font-semibold text-slate-500">
              {t.again}
            </button>
          </form>
        )}

        {error && !needPassword && !outputUrl && !busy && (
          <div role="alert" className="bg-rose-50 border border-rose-100 text-rose-700 rounded-xl px-4 py-3 text-xs font-semibold">
            {error}
            <button type="button" onClick={startOver} className="block mt-2 text-win-blue font-semibold">
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
                {result.method === 'decrypt-binary'
                  ? t.methodBinary
                  : result.method === 'permissions-strip'
                    ? t.methodStrip
                    : t.methodRaster}
              </p>
            )}
            {typeof result.pagesProcessed === 'number' && result.pagesProcessed > 0 && (
              <p className="text-[10px] font-semibold text-slate-400">
                {t.pagesLabel.replace('{n}', String(result.pagesProcessed))}
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
            <button
              type="button"
              onClick={startOver}
              className="text-xs font-semibold text-win-blue flex items-center justify-center gap-1.5 mx-auto"
            >
              <RefreshCw size={12} /> {t.again}
            </button>
          </div>
        )}

        {!busy && !outputUrl && !needPassword && (
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
