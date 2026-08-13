import { useState } from 'react';
import { Download, RefreshCw, FileKey2, ShieldCheck, AlertCircle, Lock } from 'lucide-react';
import type { LanguageType } from '../../../types';
import { unlockPdfFile, type UnlockPdfResult } from '../../../engines/unlockPdf';
import { DocumentToolDropzone, ToolBusyState } from '../DocumentToolDropzone';

const copy: Record<LanguageType, Record<string, string>> = {
  pt: {
    title: 'Desbloquear PDF',
    hero: 'Remova a proteção do seu PDF e gere uma nova cópia desbloqueada.',
    dropTitle: 'Arraste e solte o PDF aqui',
    dropHint: 'ou selecione um arquivo PDF do seu dispositivo',
    browse: 'Selecionar arquivo PDF',
    formats: 'PDF',
    dropActive: 'Solte o PDF aqui',
    invalidFile: 'Envie um arquivo PDF válido.',
    emptyFile: 'O arquivo está vazio.',
    tooLarge: 'Arquivo acima do limite de 100 MB.',
    analyzing: 'Analisando PDF...',
    unlocking: 'Desbloqueando PDF...',
    success: 'PDF desbloqueado com sucesso',
    download: 'Baixar PDF desbloqueado',
    again: 'Desbloquear outro PDF',
    needPassword: 'Este PDF está protegido por senha de abertura. Informe a senha para gerar uma cópia desbloqueada.',
    password: 'Senha do PDF',
    unlock: 'Desbloquear',
    wrongPassword: 'Senha incorreta. Tente novamente.',
    corrupt: 'Não foi possível ler este PDF. O arquivo pode estar corrompido.',
    unsupported: 'Não foi possível remover esta proteção com as bibliotecas disponíveis no navegador.',
    privacy: 'Processamento local. Geramos uma nova cópia; o original permanece intacto no seu dispositivo.',
    howTitle: 'Como funciona',
    how1: 'PDFs com restrições de permissão (mas que abrem sem senha) são regravados sem o dicionário de restrições.',
    how2: 'PDFs com senha de abertura exigem a senha legítima; então geramos uma nova cópia sem proteção.',
    how3: 'Se a criptografia impedir a regravação binária, a cópia pode ser reconstruída visualmente página a página — avisamos quando isso ocorre.',
    methodStrip: 'Cópia preservando texto/vetores',
    methodRaster: 'Cópia visual (páginas renderizadas)',
  },
  en: {
    title: 'Unlock PDF',
    hero: 'Remove PDF protection and generate a new unlocked copy.',
    dropTitle: 'Drag and drop the PDF here',
    dropHint: 'or select a PDF file from your device',
    browse: 'Select PDF file',
    formats: 'PDF',
    dropActive: 'Drop the PDF here',
    invalidFile: 'Please upload a valid PDF file.',
    emptyFile: 'The file is empty.',
    tooLarge: 'File exceeds the 100 MB limit.',
    analyzing: 'Analyzing PDF...',
    unlocking: 'Unlocking PDF...',
    success: 'PDF unlocked successfully',
    download: 'Download unlocked PDF',
    again: 'Unlock another PDF',
    needPassword: 'This PDF is protected with an open password. Enter the password to generate an unlocked copy.',
    password: 'PDF password',
    unlock: 'Unlock',
    wrongPassword: 'Incorrect password. Try again.',
    corrupt: 'Could not read this PDF. The file may be corrupted.',
    unsupported: 'This protection could not be removed with the libraries available in the browser.',
    privacy: 'Local processing. We generate a new copy; your original stays intact on your device.',
    howTitle: 'How it works',
    how1: 'PDFs with permission restrictions (that open without a password) are rewritten without the restriction dictionary.',
    how2: 'PDFs with an open password require the legitimate password; then we generate a new unprotected copy.',
    how3: 'If encryption prevents a binary rewrite, the copy may be rebuilt visually page by page — we disclose when that happens.',
    methodStrip: 'Copy preserving text/vectors',
    methodRaster: 'Visual copy (rendered pages)',
  },
  es: {
    title: 'Desbloquear PDF',
    hero: 'Quite la protección de su PDF y genere una nueva copia desbloqueada.',
    dropTitle: 'Arrastre y suelte el PDF aquí',
    dropHint: 'o seleccione un archivo PDF de su dispositivo',
    browse: 'Seleccionar archivo PDF',
    formats: 'PDF',
    dropActive: 'Suelte el PDF aquí',
    invalidFile: 'Envíe un archivo PDF válido.',
    emptyFile: 'El archivo está vacío.',
    tooLarge: 'El archivo supera el límite de 100 MB.',
    analyzing: 'Analizando PDF...',
    unlocking: 'Desbloqueando PDF...',
    success: 'PDF desbloqueado con éxito',
    download: 'Descargar PDF desbloqueado',
    again: 'Desbloquear otro PDF',
    needPassword: 'Este PDF está protegido con contraseña de apertura. Indique la clave para generar una copia desbloqueada.',
    password: 'Contraseña del PDF',
    unlock: 'Desbloquear',
    wrongPassword: 'Contraseña incorrecta. Inténtelo de nuevo.',
    corrupt: 'No se pudo leer este PDF. El archivo puede estar corrupto.',
    unsupported: 'No fue posible quitar esta protección con las bibliotecas disponibles en el navegador.',
    privacy: 'Procesamiento local. Generamos una copia nueva; el original permanece intacto en su dispositivo.',
    howTitle: 'Cómo funciona',
    how1: 'Los PDF con restricciones de permiso (que se abren sin contraseña) se reescriben sin el diccionario de restricciones.',
    how2: 'Los PDF con contraseña de apertura requieren la clave legítima; luego generamos una copia sin protección.',
    how3: 'Si el cifrado impide la reescritura binaria, la copia puede reconstruirse visualmente página a página — lo indicamos cuando ocurre.',
    methodStrip: 'Copia preservando texto/vectores',
    methodRaster: 'Copia visual (páginas renderizadas)',
  },
};

export default function UnlockPdfSuiteTool({
  lang,
  onClose,
}: {
  lang: LanguageType;
  onClose: () => void;
  showHeader?: boolean;
}) {
  const t = copy[lang];
  const [busy, setBusy] = useState(false);
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
    setFile(f);
    try {
      const res = await unlockPdfFile(f, pwd);
      applyResult(res);
    } catch {
      setError(t.corrupt);
    } finally {
      setBusy(false);
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
    <div className="p-5 md:p-6 space-y-6">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-rose-500 text-white flex items-center justify-center shrink-0">
          <FileKey2 size={20} aria-hidden />
        </div>
        <div>
          <h2 className="text-lg font-black text-slate-900 tracking-tight">{t.title}</h2>
          <p className="text-[12px] text-slate-500 font-medium leading-relaxed mt-1">{t.hero}</p>
        </div>
      </div>

      {!outputUrl && !needPassword && !busy && (
        <DocumentToolDropzone
          lang={lang}
          accept="pdf"
          onFile={(f) => run(f)}
          labels={{
            dropTitle: t.dropTitle,
            dropHint: t.dropHint,
            browse: t.browse,
            formats: t.formats,
            dropActive: t.dropActive,
            invalidFile: t.invalidFile,
            emptyFile: t.emptyFile,
            tooLarge: t.tooLarge,
          }}
        />
      )}

      {busy && <ToolBusyState label={needPassword || password ? t.unlocking : t.analyzing} />}

      {needPassword && !busy && !outputUrl && (
        <form
          className="space-y-4 bg-slate-50 border border-slate-200 rounded-2xl p-5"
          onSubmit={(e) => {
            e.preventDefault();
            if (file) run(file, password);
          }}
        >
          <div className="flex items-start gap-2 text-xs font-semibold text-slate-700">
            <Lock size={16} className="text-rose-500 shrink-0 mt-0.5" />
            <p>{t.needPassword}</p>
          </div>
          {file && <p className="text-[11px] font-bold text-slate-400 truncate">{file.name}</p>}
          <label className="block">
            <span className="text-[10px] font-bold uppercase tracking-wide text-slate-500">{t.password}</span>
            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full p-3 border border-slate-200 rounded-xl text-xs font-bold focus:ring-2 focus:ring-win-blue/20 focus:border-win-blue outline-none"
            />
          </label>
          {error && (
            <p role="alert" className="text-[11px] font-semibold text-rose-600 flex items-center gap-1.5">
              <AlertCircle size={12} /> {error}
            </p>
          )}
          <button type="submit" disabled={!password.trim()} className="w-full btn-primary py-3 text-xs font-black uppercase tracking-widest disabled:opacity-50">
            {t.unlock}
          </button>
          <button type="button" onClick={reset} className="w-full text-xs font-bold text-slate-500">
            {t.again}
          </button>
        </form>
      )}

      {error && !needPassword && !outputUrl && !busy && (
        <div role="alert" className="bg-rose-50 border border-rose-100 text-rose-700 rounded-xl px-4 py-3 text-xs font-semibold">
          {error}
          <button type="button" onClick={reset} className="block mt-2 text-win-blue font-bold">
            {t.again}
          </button>
        </div>
      )}

      {outputUrl && result?.status === 'unlocked' && (
        <div className="space-y-4 text-center py-4">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <ShieldCheck size={28} />
          </div>
          <h3 className="text-base font-black text-slate-900">{t.success}</h3>
          {result.method && (
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              {result.method === 'permissions-strip' ? t.methodStrip : t.methodRaster}
            </p>
          )}
          <button type="button" onClick={download} className="w-full btn-primary py-3.5 flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest">
            <Download size={16} /> {t.download}
          </button>
          <button type="button" onClick={reset} className="text-xs font-bold text-win-blue flex items-center justify-center gap-1.5 mx-auto">
            <RefreshCw size={12} /> {t.again}
          </button>
        </div>
      )}

      <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 space-y-2">
        <h3 className="text-xs font-black text-slate-800 uppercase tracking-tight">{t.howTitle}</h3>
        <ul className="text-[11px] text-slate-600 font-medium space-y-1.5 list-disc pl-4 leading-relaxed">
          <li>{t.how1}</li>
          <li>{t.how2}</li>
          <li>{t.how3}</li>
        </ul>
        <p className="text-[10px] text-emerald-800 font-semibold pt-1">{t.privacy}</p>
      </div>
    </div>
  );
}
