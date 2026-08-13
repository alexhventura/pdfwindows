import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react';
import { Download, RefreshCw, AlertCircle, Eraser, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import type { PDFDocumentProxy } from 'pdfjs-dist';
import type { LanguageType } from '../../../types';
import { applyPdfRedactions, type RedactionRect } from '../../../engines/redactPdf';
import { loadPdfJS } from '../../../utils/pdfjsLoader';
import {
  DocumentToolDropzone,
  ToolBusyState,
  SuiteWorkspaceShell,
  SUITE_UPLOAD_SUBTITLE,
} from '../DocumentToolDropzone';

const copy: Record<LanguageType, Record<string, string>> = {
  pt: {
    title: 'Redação PDF',
    dropTitle: 'Solte seus arquivos aqui',
    orText: 'ou',
    browse: 'Escolher arquivos',
    formats: 'PDF',
    dropActive: 'Solte o arquivo aqui',
    invalidFile: 'Envie um arquivo PDF válido.',
    emptyFile: 'O arquivo está vazio.',
    tooLarge: 'Arquivo acima do limite de 100 MB.',
    loading: 'Carregando PDF...',
    applying: 'Aplicando redações...',
    hint: 'Arraste na página para cobrir trechos sensíveis com preto.',
    pageOf: 'Página {page} de {total}',
    undo: 'Desfazer última',
    clearPage: 'Limpar página',
    apply: 'Gerar PDF redigido',
    success: 'PDF redigido pronto',
    download: 'Baixar PDF redigido',
    again: 'Redigir outro PDF',
    needRects: 'Desenhe pelo menos uma área de redação.',
    corrupt: 'Não foi possível ler este PDF.',
    privacy: 'Processamento local. Cobertura visual opaca — revise antes de compartilhar.',
    rects: '{n} áreas',
  },
  en: {
    title: 'Redact PDF',
    dropTitle: 'Drop your files here',
    orText: 'or',
    browse: 'Choose files',
    formats: 'PDF',
    dropActive: 'Drop the file here',
    invalidFile: 'Please upload a valid PDF file.',
    emptyFile: 'The file is empty.',
    tooLarge: 'File exceeds the 100 MB limit.',
    loading: 'Loading PDF...',
    applying: 'Applying redactions...',
    hint: 'Drag on the page to cover sensitive areas with black.',
    pageOf: 'Page {page} of {total}',
    undo: 'Undo last',
    clearPage: 'Clear page',
    apply: 'Generate redacted PDF',
    success: 'Redacted PDF ready',
    download: 'Download redacted PDF',
    again: 'Redact another PDF',
    needRects: 'Draw at least one redaction area.',
    corrupt: 'Could not read this PDF.',
    privacy: 'Local processing. Opaque visual cover — review before sharing.',
    rects: '{n} areas',
  },
  es: {
    title: 'Redacción PDF',
    dropTitle: 'Suelta tus archivos aquí',
    orText: 'o',
    browse: 'Elegir archivos',
    formats: 'PDF',
    dropActive: 'Suelte el archivo aquí',
    invalidFile: 'Envíe un archivo PDF válido.',
    emptyFile: 'El archivo está vacío.',
    tooLarge: 'El archivo supera el límite de 100 MB.',
    loading: 'Cargando PDF...',
    applying: 'Aplicando redacciones...',
    hint: 'Arrastre en la página para cubrir datos sensibles con negro.',
    pageOf: 'Página {page} de {total}',
    undo: 'Deshacer última',
    clearPage: 'Limpiar página',
    apply: 'Generar PDF redactado',
    success: 'PDF redactado listo',
    download: 'Descargar PDF redactado',
    again: 'Redactar otro PDF',
    needRects: 'Dibuje al menos un área de redacción.',
    corrupt: 'No se pudo leer este PDF.',
    privacy: 'Procesamiento local. Cobertura visual opaca — revise antes de compartir.',
    rects: '{n} áreas',
  },
};

type DragState = { x0: number; y0: number; x1: number; y1: number } | null;

export default function RedactPdfSuiteTool({
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
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLCanvasElement>(null);
  const [busy, setBusy] = useState<'load' | 'apply' | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [pageIndex, setPageIndex] = useState(0);
  const [rects, setRects] = useState<RedactionRect[]>([]);
  const [drag, setDrag] = useState<DragState>(null);
  const [error, setError] = useState<string | null>(null);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [outputName, setOutputName] = useState<string | null>(null);
  const pdfRef = useRef<PDFDocumentProxy | null>(null);

  const startOver = async () => {
    if (outputUrl) URL.revokeObjectURL(outputUrl);
    await pdfRef.current?.destroy?.();
    pdfRef.current = null;
    setFile(null);
    setPageCount(0);
    setPageIndex(0);
    setRects([]);
    setDrag(null);
    setError(null);
    setOutputUrl(null);
    setOutputName(null);
    setBusy(null);
  };

  useEffect(() => {
    return () => {
      if (outputUrl) URL.revokeObjectURL(outputUrl);
      void pdfRef.current?.destroy?.();
    };
  }, []);

  const paintPage = async (index: number) => {
    const pdf = pdfRef.current;
    const canvas = canvasRef.current;
    const overlay = overlayRef.current;
    if (!pdf || !canvas || !overlay) return;

    const page = await pdf.getPage(index + 1);
    const base = page.getViewport({ scale: 1 });
    const maxW = Math.min(720, canvas.parentElement?.clientWidth || 720);
    const scale = maxW / base.width;
    const viewport = page.getViewport({ scale });

    canvas.width = Math.max(1, Math.floor(viewport.width));
    canvas.height = Math.max(1, Math.floor(viewport.height));
    overlay.width = canvas.width;
    overlay.height = canvas.height;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    await page.render({ canvasContext: ctx, viewport, canvas }).promise;
    drawOverlay(index);
  };

  const drawOverlay = (index: number, draft: DragState = drag) => {
    const overlay = overlayRef.current;
    if (!overlay) return;
    const ctx = overlay.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, overlay.width, overlay.height);
    ctx.fillStyle = 'rgba(0,0,0,0.92)';

    const pageRects = rects.filter((r) => r.pageIndex === index);
    for (const r of pageRects) {
      ctx.fillRect(r.x * overlay.width, r.y * overlay.height, r.w * overlay.width, r.h * overlay.height);
    }
    if (draft) {
      const x = Math.min(draft.x0, draft.x1);
      const y = Math.min(draft.y0, draft.y1);
      const w = Math.abs(draft.x1 - draft.x0);
      const h = Math.abs(draft.y1 - draft.y0);
      ctx.fillRect(x, y, w, h);
    }
  };

  useEffect(() => {
    if (!file || !pdfRef.current || outputUrl || busy) return;
    void paintPage(pageIndex);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- paint when page/rects change
  }, [pageIndex, file, rects, outputUrl, busy]);

  useEffect(() => {
    drawOverlay(pageIndex, drag);
  }, [drag, pageIndex, rects]);

  const loadFile = async (f: File) => {
    await startOver();
    setBusy('load');
    setFile(f);
    try {
      const pdfjs = await loadPdfJS();
      const buf = await f.arrayBuffer();
      const pdf = await pdfjs.getDocument({ data: buf.slice(0) }).promise;
      pdfRef.current = pdf;
      setPageCount(pdf.numPages);
      setPageIndex(0);
    } catch {
      setError(t.corrupt);
      setFile(null);
    } finally {
      setBusy(null);
    }
  };

  const pointerPos = (e: ReactPointerEvent<HTMLCanvasElement>) => {
    const canvas = overlayRef.current!;
    const rect = canvas.getBoundingClientRect();
    return {
      x: ((e.clientX - rect.left) / rect.width) * canvas.width,
      y: ((e.clientY - rect.top) / rect.height) * canvas.height,
    };
  };

  const onPointerDown = (e: ReactPointerEvent<HTMLCanvasElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    const p = pointerPos(e);
    setDrag({ x0: p.x, y0: p.y, x1: p.x, y1: p.y });
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLCanvasElement>) => {
    if (!drag) return;
    const p = pointerPos(e);
    setDrag({ ...drag, x1: p.x, y1: p.y });
  };

  const onPointerUp = () => {
    if (!drag || !overlayRef.current) {
      setDrag(null);
      return;
    }
    const { width, height } = overlayRef.current;
    const x = Math.min(drag.x0, drag.x1) / width;
    const y = Math.min(drag.y0, drag.y1) / height;
    const w = Math.abs(drag.x1 - drag.x0) / width;
    const h = Math.abs(drag.y1 - drag.y0) / height;
    setDrag(null);
    if (w < 0.01 || h < 0.01) return;
    setRects((prev) => [...prev, { pageIndex, x, y, w, h }]);
  };

  const apply = async () => {
    if (!file) return;
    if (rects.length < 1) {
      setError(t.needRects);
      return;
    }
    setBusy('apply');
    setError(null);
    try {
      const res = await applyPdfRedactions(file, rects);
      if (outputUrl) URL.revokeObjectURL(outputUrl);
      setOutputUrl(URL.createObjectURL(res.blob));
      setOutputName(res.fileName);
    } catch {
      setError(t.corrupt);
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
    <SuiteWorkspaceShell
      title={t.title}
      subtitle={SUITE_UPLOAD_SUBTITLE[lang]}
      showHeader={showHeader}
      onClose={onClose}
      closeLabel={closeLabel}
    >
      <div className="space-y-6">
        {!file && !busy && !outputUrl && (
          <DocumentToolDropzone
            lang={lang}
            accept="pdf"
            onFile={loadFile}
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

        {busy && <ToolBusyState label={busy === 'load' ? t.loading : t.applying} />}

        {error && !busy && (
          <div role="alert" className="bg-rose-50 border border-rose-100 text-rose-700 rounded-xl px-4 py-3 text-xs font-semibold flex items-start gap-2">
            <AlertCircle size={14} className="mt-0.5 shrink-0" />
            <div>
              {error}
              {!file && (
                <button type="button" onClick={() => void startOver()} className="block mt-2 text-win-blue">
                  {t.again}
                </button>
              )}
            </div>
          </div>
        )}

        {file && pageCount > 0 && !outputUrl && !busy && (
          <div className="space-y-4">
            <p className="text-[11px] font-semibold text-slate-500">{t.hint}</p>

            <div className="flex items-center justify-between gap-2">
              <button
                type="button"
                className="btn-secondary py-2 px-3 disabled:opacity-40"
                disabled={pageIndex <= 0}
                onClick={() => setPageIndex((i) => Math.max(0, i - 1))}
                aria-label="prev"
              >
                <ChevronLeft size={16} />
              </button>
              <p className="text-xs font-semibold text-slate-700">
                {t.pageOf.replace('{page}', String(pageIndex + 1)).replace('{total}', String(pageCount))}
              </p>
              <button
                type="button"
                className="btn-secondary py-2 px-3 disabled:opacity-40"
                disabled={pageIndex >= pageCount - 1}
                onClick={() => setPageIndex((i) => Math.min(pageCount - 1, i + 1))}
                aria-label="next"
              >
                <ChevronRight size={16} />
              </button>
            </div>

            <div className="relative mx-auto max-w-[720px] border border-slate-200 rounded-xl overflow-hidden bg-slate-100 touch-none">
              <canvas ref={canvasRef} className="block w-full h-auto" />
              <canvas
                ref={overlayRef}
                className="absolute inset-0 w-full h-full cursor-crosshair"
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerCancel={() => setDrag(null)}
              />
            </div>

            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-[11px] font-semibold text-slate-400">
                {t.rects.replace('{n}', String(rects.length))}
              </span>
              <button
                type="button"
                className="btn-secondary text-[11px] py-2 px-3 disabled:opacity-40 inline-flex items-center gap-1"
                disabled={rects.length === 0}
                onClick={() => setRects((prev) => prev.slice(0, -1))}
              >
                <Eraser size={12} /> {t.undo}
              </button>
              <button
                type="button"
                className="btn-secondary text-[11px] py-2 px-3 disabled:opacity-40 inline-flex items-center gap-1"
                disabled={!rects.some((r) => r.pageIndex === pageIndex)}
                onClick={() => setRects((prev) => prev.filter((r) => r.pageIndex !== pageIndex))}
              >
                <Trash2 size={12} /> {t.clearPage}
              </button>
            </div>

            <button type="button" className="w-full btn-primary py-3.5" onClick={() => void apply()}>
              {t.apply}
            </button>
            <button type="button" onClick={() => void startOver()} className="w-full text-xs font-semibold text-slate-500">
              {t.again}
            </button>
            <p className="text-[10px] font-semibold text-emerald-700/80 text-center">{t.privacy}</p>
          </div>
        )}

        {outputUrl && (
          <div className="space-y-4 text-center py-4">
            <h3 className="text-base font-semibold text-slate-900">{t.success}</h3>
            <button type="button" onClick={download} className="w-full btn-primary py-3.5 flex items-center justify-center gap-2">
              <Download size={16} /> {t.download}
            </button>
            {outputName && <p className="text-[10px] font-semibold text-slate-400 truncate">{outputName}</p>}
            <button
              type="button"
              onClick={() => void startOver()}
              className="text-xs font-semibold text-win-blue flex items-center justify-center gap-1.5 mx-auto"
            >
              <RefreshCw size={12} /> {t.again}
            </button>
          </div>
        )}
      </div>
    </SuiteWorkspaceShell>
  );
}
