import { useState } from 'react';
import { Download, RefreshCw, Unlock, ShieldCheck, AlertCircle } from 'lucide-react';
import type { LanguageType } from '../../../types';
import {
  analyzeRestrictions,
  removeDocumentRestrictions,
  type RestrictionsAnalysis,
} from '../../../engines/removeRestrictions';
import { DocumentToolDropzone, ToolBusyState } from '../DocumentToolDropzone';

const copy: Record<LanguageType, Record<string, string>> = {
  pt: {
    title: 'Remover Restrições',
    hero: 'Remova restrições de edição, cópia e impressão de seus documentos.',
    dropTitle: 'Arraste seu PDF ou DOCX aqui',
    dropHint: 'ou selecione um arquivo do seu dispositivo',
    browse: 'Selecionar arquivo',
    formats: 'PDF • DOCX',
    dropActive: 'Solte o arquivo aqui',
    invalidFile: 'Envie um arquivo PDF ou DOCX válido.',
    emptyFile: 'O arquivo está vazio.',
    tooLarge: 'Arquivo acima do limite de 100 MB.',
    analyzing: 'Analisando documento...',
    processing: 'Removendo restrições...',
    found: 'Restrições encontradas',
    editing: 'Edição',
    printing: 'Impressão',
    copying: 'Cópia',
    annotating: 'Comentários/anotações',
    blocked: 'bloqueada',
    allowed: 'permitida',
    unknown: 'não determinada',
    remove: 'Remover restrições',
    success: 'Documento desbloqueado',
    download: 'Baixar documento',
    again: 'Processar outro documento',
    none: 'Nenhuma restrição removível foi encontrada neste documento.',
    fail: 'Não foi possível remover esta proteção deste documento.',
    needPassword:
      'Este PDF exige senha de abertura. Use a ferramenta Desbloquear PDF e informe a senha.',
    notSupported: 'O mecanismo de proteção deste arquivo não é suportado no navegador.',
    privacy:
      'Uma nova cópia é gerada localmente. O arquivo original não é sobrescrito nem enviado a servidores.',
    howTitle: 'O que esta ferramenta remove',
    how1: 'Restrições de permissão em PDFs que abrem normalmente (edição, cópia, impressão).',
    how2: 'Proteção estrutural de edição em DOCX armazenada no próprio arquivo (settings.xml).',
    how3: 'Não remove permissões externas (OneDrive, SharePoint, conta ou sistema operacional).',
    errorGeneric: 'Falha ao processar o documento.',
  },
  en: {
    title: 'Remove Restrictions',
    hero: 'Remove editing, copying, and printing restrictions from your documents.',
    dropTitle: 'Drag your PDF or DOCX here',
    dropHint: 'or select a file from your device',
    browse: 'Select file',
    formats: 'PDF • DOCX',
    dropActive: 'Drop the file here',
    invalidFile: 'Please upload a valid PDF or DOCX file.',
    emptyFile: 'The file is empty.',
    tooLarge: 'File exceeds the 100 MB limit.',
    analyzing: 'Analyzing document...',
    processing: 'Removing restrictions...',
    found: 'Restrictions found',
    editing: 'Editing',
    printing: 'Printing',
    copying: 'Copying',
    annotating: 'Comments/annotations',
    blocked: 'blocked',
    allowed: 'allowed',
    unknown: 'unknown',
    remove: 'Remove restrictions',
    success: 'Document unlocked',
    download: 'Download document',
    again: 'Process another document',
    none: 'No removable restrictions were found in this document.',
    fail: 'This protection could not be removed from this document.',
    needPassword: 'This PDF requires an open password. Use Unlock PDF and enter the password.',
    notSupported: 'This file’s protection mechanism is not supported in the browser.',
    privacy: 'A new copy is generated locally. The original is never overwritten or uploaded.',
    howTitle: 'What this tool removes',
    how1: 'Permission restrictions on PDFs that open normally (edit, copy, print).',
    how2: 'Structural edit protection in DOCX stored inside the file (settings.xml).',
    how3: 'Does not remove external permissions (OneDrive, SharePoint, account, or OS).',
    errorGeneric: 'Failed to process the document.',
  },
  es: {
    title: 'Quitar Restricciones',
    hero: 'Quite restricciones de edición, copia e impresión de sus documentos.',
    dropTitle: 'Arrastre su PDF o DOCX aquí',
    dropHint: 'o seleccione un archivo de su dispositivo',
    browse: 'Seleccionar archivo',
    formats: 'PDF • DOCX',
    dropActive: 'Suelte el archivo aquí',
    invalidFile: 'Envíe un archivo PDF o DOCX válido.',
    emptyFile: 'El archivo está vacío.',
    tooLarge: 'El archivo supera el límite de 100 MB.',
    analyzing: 'Analizando documento...',
    processing: 'Quitando restricciones...',
    found: 'Restricciones encontradas',
    editing: 'Edición',
    printing: 'Impresión',
    copying: 'Copia',
    annotating: 'Comentarios/anotaciones',
    blocked: 'bloqueada',
    allowed: 'permitida',
    unknown: 'no determinada',
    remove: 'Quitar restricciones',
    success: 'Documento desbloqueado',
    download: 'Descargar documento',
    again: 'Procesar otro documento',
    none: 'No se encontraron restricciones removibles en este documento.',
    fail: 'No fue posible quitar esta protección de este documento.',
    needPassword: 'Este PDF requiere contraseña de apertura. Use Desbloquear PDF e indique la clave.',
    notSupported: 'El mecanismo de protección de este archivo no es compatible en el navegador.',
    privacy: 'Se genera una copia nueva localmente. El original no se sobrescribe ni se sube.',
    howTitle: 'Qué elimina esta herramienta',
    how1: 'Restricciones de permiso en PDF que se abren con normalidad (edición, copia, impresión).',
    how2: 'Protección estructural de edición en DOCX almacenada en el archivo (settings.xml).',
    how3: 'No elimina permisos externos (OneDrive, SharePoint, cuenta o sistema operativo).',
    errorGeneric: 'Error al procesar el documento.',
  },
};

function flagLabel(v: 'blocked' | 'allowed' | 'unknown', t: Record<string, string>) {
  if (v === 'blocked') return t.blocked;
  if (v === 'allowed') return t.allowed;
  return t.unknown;
}

export default function RemoveRestrictionsSuiteTool({
  lang,
  onClose,
}: {
  lang: LanguageType;
  onClose: () => void;
  showHeader?: boolean;
}) {
  const t = copy[lang];
  const [busy, setBusy] = useState<'analyze' | 'process' | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [analysis, setAnalysis] = useState<RestrictionsAnalysis | null>(null);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [outputName, setOutputName] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const reset = () => {
    if (outputUrl) URL.revokeObjectURL(outputUrl);
    setFile(null);
    setAnalysis(null);
    setOutputUrl(null);
    setOutputName(null);
    setMessage(null);
    setError(null);
    onClose();
  };

  const onSelect = async (f: File) => {
    setBusy('analyze');
    setError(null);
    setMessage(null);
    setAnalysis(null);
    if (outputUrl) URL.revokeObjectURL(outputUrl);
    setOutputUrl(null);
    setFile(f);
    try {
      const a = await analyzeRestrictions(f);
      setAnalysis(a);
      if (a.reason === 'no-restrictions') setMessage(t.none);
      if (a.reason === 'needs-open-password') setMessage(t.needPassword);
      if (a.reason === 'password-protected-structure' || a.reason === 'not-supported') setMessage(t.notSupported);
    } catch {
      setError(t.errorGeneric);
    } finally {
      setBusy(null);
    }
  };

  const process = async () => {
    if (!file) return;
    setBusy('process');
    setError(null);
    try {
      const res = await removeDocumentRestrictions(file);
      setAnalysis(res.analysis);
      if (!res.output) {
        if (res.analysis.reason === 'no-restrictions') setMessage(t.none);
        else if (res.analysis.reason === 'needs-open-password') setMessage(t.needPassword);
        else setMessage(t.fail);
        return;
      }
      if (outputUrl) URL.revokeObjectURL(outputUrl);
      setOutputUrl(URL.createObjectURL(res.output));
      setOutputName(res.outputName || 'unlocked');
      setMessage(null);
    } catch {
      setError(t.errorGeneric);
    } finally {
      setBusy(null);
    }
  };

  const download = () => {
    if (!outputUrl || !outputName) return;
    const a = document.createElement('a');
    a.href = outputUrl;
    a.download = outputName;
    a.click();
  };

  return (
    <div className="p-5 md:p-6 space-y-6">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center shrink-0">
          <Unlock size={20} aria-hidden />
        </div>
        <div>
          <h2 className="text-lg font-black text-slate-900 tracking-tight">{t.title}</h2>
          <p className="text-[12px] text-slate-500 font-medium leading-relaxed mt-1">{t.hero}</p>
        </div>
      </div>

      {!analysis && !busy && !outputUrl && (
        <DocumentToolDropzone
          lang={lang}
          accept="pdf-docx"
          onFile={onSelect}
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

      {busy && <ToolBusyState label={busy === 'analyze' ? t.analyzing : t.processing} />}

      {error && (
        <div role="alert" className="bg-rose-50 border border-rose-100 text-rose-700 rounded-xl px-4 py-3 text-xs font-semibold flex gap-2">
          <AlertCircle size={14} className="shrink-0 mt-0.5" />
          <div>
            {error}
            <button type="button" onClick={reset} className="block mt-2 text-win-blue font-bold">
              {t.again}
            </button>
          </div>
        </div>
      )}

      {analysis && !busy && !outputUrl && (
        <div className="space-y-4">
          {file && <p className="text-[11px] font-bold text-slate-400 truncate">{file.name}</p>}
          <h3 className="text-sm font-black text-slate-800 uppercase tracking-tight">{t.found}</h3>
          <ul className="bg-slate-50 border border-slate-200 rounded-2xl divide-y divide-slate-100 text-xs font-semibold text-slate-700">
            <li className="px-4 py-3 flex justify-between gap-2">
              <span>{t.editing}</span>
              <span>{flagLabel(analysis.restrictions.editing, t)}</span>
            </li>
            {analysis.format === 'pdf' && (
              <>
                <li className="px-4 py-3 flex justify-between gap-2">
                  <span>{t.printing}</span>
                  <span>{flagLabel(analysis.restrictions.printing, t)}</span>
                </li>
                <li className="px-4 py-3 flex justify-between gap-2">
                  <span>{t.copying}</span>
                  <span>{flagLabel(analysis.restrictions.copying, t)}</span>
                </li>
                <li className="px-4 py-3 flex justify-between gap-2">
                  <span>{t.annotating}</span>
                  <span>{flagLabel(analysis.restrictions.annotating, t)}</span>
                </li>
              </>
            )}
          </ul>
          {message && (
            <p role="status" className="text-xs font-semibold text-amber-800 bg-amber-50 border border-amber-100 rounded-xl px-4 py-3">
              {message}
            </p>
          )}
          {analysis.removable && (
            <button type="button" onClick={process} className="w-full btn-primary py-3 text-xs font-black uppercase tracking-widest">
              {t.remove}
            </button>
          )}
          <button type="button" onClick={reset} className="w-full py-3 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 flex items-center justify-center gap-2">
            <RefreshCw size={14} /> {t.again}
          </button>
        </div>
      )}

      {outputUrl && (
        <div className="space-y-4 text-center py-4">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <ShieldCheck size={28} />
          </div>
          <h3 className="text-base font-black text-slate-900">{t.success}</h3>
          <button type="button" onClick={download} className="w-full btn-primary py-3.5 flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest">
            <Download size={16} /> {t.download}
          </button>
          <button type="button" onClick={reset} className="text-xs font-bold text-win-blue">
            {t.again}
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
