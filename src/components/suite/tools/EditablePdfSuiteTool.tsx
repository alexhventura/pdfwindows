import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AlertCircle, ChevronLeft, ChevronRight, Download, RefreshCw } from 'lucide-react';
import type { PDFDocumentProxy } from 'pdfjs-dist';
import type { LanguageType } from '../../../types';
import {
  DocumentToolDropzone,
  ToolBusyState,
  SuiteWorkspaceShell,
  SUITE_UPLOAD_SUBTITLE,
} from '../DocumentToolDropzone';
import { loadPdfJS } from '../../../utils/pdfjsLoader';
import { extractFillableLayout, writeFillablePdf } from '../../../engines/makeFillablePdf';
import type { FillableSlot } from '../../../utils/pdfFillableDetect';

type Props = { lang: LanguageType; onClose: () => void; showHeader?: boolean };

function closeLabel(lang: LanguageType) {
  return lang === 'pt' ? 'Fechar' : lang === 'es' ? 'Cerrar' : 'Close';
}

function copy(lang: LanguageType) {
  if (lang === 'es') {
    return {
      title: 'PDF Editable',
      drop: 'PDF',
      intro: 'Haga clic en las cajas azules e introduzca el texto. Luego descargue el PDF para abrirlo en el ordenador y guardar.',
      run: 'Detectando campos…',
      download: 'Descargar PDF editable',
      again: 'Otro archivo',
      none: 'No se encontraron espacios para rellenar.',
      fail: 'No se pudo procesar este PDF.',
      saveFail: 'No se pudo generar el PDF editable.',
    };
  }
  if (lang === 'en') {
    return {
      title: 'Editable PDF',
      drop: 'PDF',
      intro: 'Click the blue boxes and type. Then download the PDF to open on your computer and save.',
      run: 'Finding fields…',
      download: 'Download fillable PDF',
      again: 'Another file',
      none: 'No fillable blanks were found.',
      fail: 'Could not process this PDF.',
      saveFail: 'Could not generate the fillable PDF.',
    };
  }
  return {
    title: 'PDF Editável',
    drop: 'PDF',
    intro: 'Clique nas caixas azuis e digite. Depois baixe o PDF para abrir no computador, conferir e salvar.',
    run: 'Localizando campos…',
    download: 'Baixar PDF editável',
    again: 'Outro arquivo',
    none: 'Não foram encontrados espaços para preencher.',
    fail: 'Não foi possível processar este PDF.',
    saveFail: 'Não foi possível gerar o PDF editável.',
  };
}

function dropLabels(lang: LanguageType, formats: string) {
  if (lang === 'pt') {
    return {
      dropTitle: 'Solte o arquivo aqui',
      orText: 'ou',
      browse: 'Escolher arquivo',
      formats,
      dropActive: 'Solte o arquivo aqui',
      invalidFile: 'Envie um arquivo PDF válido.',
      emptyFile: 'O arquivo está vazio.',
      tooLarge: 'Arquivo acima do limite de 100 MB.',
    };
  }
  if (lang === 'es') {
    return {
      dropTitle: 'Suelte el archivo aquí',
      orText: 'o',
      browse: 'Elegir archivo',
      formats,
      dropActive: 'Suelte el archivo aquí',
      invalidFile: 'Envíe un archivo PDF válido.',
      emptyFile: 'El archivo está vacío.',
      tooLarge: 'El archivo supera el límite de 100 MB.',
    };
  }
  return {
    dropTitle: 'Drop the file here',
    orText: 'or',
    browse: 'Choose file',
    formats,
    dropActive: 'Drop the file here',
    invalidFile: 'Please upload a valid PDF file.',
    emptyFile: 'The file is empty.',
    tooLarge: 'File exceeds the 100 MB limit.',
  };
}

export function EditablePdfSuiteTool({ lang, onClose, showHeader }: Props) {
  const t = copy(lang);
  const pageRef = useRef<HTMLCanvasElement>(null);
  const pdfRef = useRef<PDFDocumentProxy | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [pageIndex, setPageIndex] = useState(0);
  const [pages, setPages] = useState<Array<{ pageIndex: number; width: number; height: number }>>([]);
  const [slots, setSlots] = useState<FillableSlot[]>([]);
  const [values, setValues] = useState<Record<string, string>>({});
  const [out, setOut] = useState<{ url: string; name: string } | null>(null);
  const [paintTick, setPaintTick] = useState(0);

  const reset = () => {
    void pdfRef.current?.destroy?.();
    pdfRef.current = null;
    if (out) URL.revokeObjectURL(out.url);
    setFile(null);
    setBusy(false);
    setSaving(false);
    setError(null);
    setPageCount(0);
    setPageIndex(0);
    setPages([]);
    setSlots([]);
    setValues({});
    setOut(null);
  };

  const open = async (next: File) => {
    reset();
    setFile(next);
    setBusy(true);
    try {
      const pdfjs = await loadPdfJS();
      const pdf = await pdfjs.getDocument({ data: new Uint8Array(await next.arrayBuffer()).slice() }).promise;
      pdfRef.current = pdf;
      setPageCount(pdf.numPages);
      setPageIndex(0);
      const layout = await extractFillableLayout(next);
      setPages(layout.pages);
      setSlots(layout.slots);
    } catch {
      setError(t.fail);
    } finally {
      setBusy(false);
    }
  };

  const paint = useCallback(async () => {
    const pdf = pdfRef.current;
    const canvas = pageRef.current;
    if (!pdf || !canvas) return;
    const page = await pdf.getPage(pageIndex + 1);
    const base = page.getViewport({ scale: 1 });
    const maxW = Math.min(720, canvas.parentElement?.clientWidth || 720);
    const viewport = page.getViewport({ scale: maxW / base.width });
    const width = Math.max(1, Math.floor(viewport.width));
    const height = Math.max(1, Math.floor(viewport.height));
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, width, height);
    await page.render({ canvasContext: ctx, viewport, canvas }).promise;
    setPaintTick((tick) => tick + 1);
  }, [pageIndex]);

  useEffect(() => {
    if (file && pageCount) void paint();
  }, [file, pageCount, pageIndex, paint]);

  useEffect(() => () => {
    void pdfRef.current?.destroy?.();
  }, []);

  const pageMeta = pages.find((page) => page.pageIndex === pageIndex) ?? pages[0];
  const pageSlots = useMemo(
    () => slots.filter((slot) => slot.pageIndex === pageIndex),
    [slots, pageIndex]
  );

  const download = async () => {
    if (!file || slots.length === 0) return;
    setSaving(true);
    setError(null);
    try {
      const result = await writeFillablePdf(file, slots, values);
      if (out) URL.revokeObjectURL(out.url);
      const url = URL.createObjectURL(result.blob);
      setOut({ url, name: result.fileName });
      const a = document.createElement('a');
      a.href = url;
      a.download = result.fileName;
      a.click();
    } catch {
      setError(t.saveFail);
    } finally {
      setSaving(false);
    }
  };

  return (
    <SuiteWorkspaceShell
      title={t.title}
      subtitle={SUITE_UPLOAD_SUBTITLE[lang]}
      showHeader={showHeader}
      onClose={onClose}
      closeLabel={closeLabel(lang)}
    >
      <div className="space-y-4">
        {!file && !busy && !out && (
          <DocumentToolDropzone lang={lang} accept="pdf" onFile={(next) => void open(next)} labels={dropLabels(lang, t.drop)} />
        )}
        {busy && <ToolBusyState label={t.run} />}
        {error && (
          <p role="alert" className="bg-rose-50 border border-rose-100 text-rose-700 rounded-xl px-4 py-3 text-xs font-semibold flex items-start gap-2">
            <AlertCircle size={14} className="mt-0.5 shrink-0" />
            {error}
          </p>
        )}
        {file && !busy && pageCount > 0 && (
          <div className="space-y-3">
            <p className="text-[11px] text-slate-500 leading-relaxed">{t.intro}</p>
            {slots.length === 0 && (
              <p className="text-[11px] font-semibold text-amber-700 flex gap-2">
                <AlertCircle size={14} className="shrink-0" /> {t.none}
              </p>
            )}
            {pageCount > 1 && (
              <div className="flex items-center justify-between">
                <button type="button" className="btn-secondary px-3 py-2" disabled={pageIndex <= 0} onClick={() => setPageIndex((i) => i - 1)}>
                  <ChevronLeft size={16} />
                </button>
                <span className="text-xs font-semibold text-slate-600">
                  {pageIndex + 1}/{pageCount}
                </span>
                <button
                  type="button"
                  className="btn-secondary px-3 py-2"
                  disabled={pageIndex >= pageCount - 1}
                  onClick={() => setPageIndex((i) => i + 1)}
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
            <div className="relative mx-auto max-w-[720px] border rounded-xl overflow-hidden bg-white">
              <canvas ref={pageRef} className="block w-full" />
              {pageMeta &&
                paintTick > 0 &&
                pageSlots.map((slot) => {
                  const name = slot.name ?? '';
                  const left = (slot.x / pageMeta.width) * 100;
                  const top = ((pageMeta.height - slot.y - slot.h) / pageMeta.height) * 100;
                  const width = (slot.w / pageMeta.width) * 100;
                  const height = (slot.h / pageMeta.height) * 100;
                  if (slot.kind === 'checkbox') {
                    return (
                      <label
                        key={name}
                        className="absolute flex items-center justify-center"
                        style={{ left: `${left}%`, top: `${top}%`, width: `${width}%`, height: `${height}%` }}
                      >
                        <input
                          type="checkbox"
                          checked={values[name] === 'true'}
                          onChange={(e) => setValues((prev) => ({ ...prev, [name]: e.target.checked ? 'true' : '' }))}
                          className="w-[70%] h-[70%] accent-win-blue cursor-pointer"
                        />
                      </label>
                    );
                  }
                  return (
                    <input
                      key={name}
                      value={values[name] ?? ''}
                      onChange={(e) => setValues((prev) => ({ ...prev, [name]: e.target.value }))}
                      spellCheck={false}
                      aria-label={name}
                      className="absolute outline-none"
                      style={{
                        left: `${left}%`,
                        top: `${top}%`,
                        width: `${Math.max(width, 2)}%`,
                        height: `${Math.max(height, 1.6)}%`,
                        fontSize: '11px',
                        lineHeight: 1.1,
                        padding: '1px 3px',
                        margin: 0,
                        border: '1px solid #2563eb',
                        borderRadius: 2,
                        color: '#0f172a',
                        background: 'rgba(239,246,255,0.88)',
                        caretColor: '#2563eb',
                        fontFamily: 'Helvetica, Arial, sans-serif',
                        boxSizing: 'border-box',
                      }}
                    />
                  );
                })}
            </div>
            <button type="button" className="w-full btn-primary py-3.5 inline-flex items-center justify-center gap-2" disabled={saving || slots.length === 0} onClick={() => void download()}>
              <Download size={16} /> {saving ? '…' : t.download}
            </button>
            <button type="button" className="w-full text-xs font-semibold text-slate-500 inline-flex items-center justify-center gap-1" onClick={reset}>
              <RefreshCw size={12} /> {t.again}
            </button>
          </div>
        )}
        {out && (
          <p className="text-[10px] font-semibold text-slate-400 truncate text-center">{out.name}</p>
        )}
        <p className="text-[10px] font-semibold text-emerald-700/80 text-center">
          {lang === 'pt'
            ? 'Processamento 100% local. O original não é enviado nem sobrescrito.'
            : lang === 'es'
              ? 'Procesamiento 100% local. El original no se envía ni se sobrescribe.'
              : '100% local processing. The original is not uploaded or overwritten.'}
        </p>
      </div>
    </SuiteWorkspaceShell>
  );
}
