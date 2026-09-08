import { useCallback, useEffect, useMemo, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react';
import {
  AlertCircle,
  Camera,
  ChevronLeft,
  ChevronRight,
  Download,
  Eraser,
  ImagePlus,
  MousePointerClick,
  RefreshCw,
  Trash2,
  Type,
  Undo2,
} from 'lucide-react';
import type { PDFDocumentProxy } from 'pdfjs-dist';
import type { LanguageType } from '../../../types';
import {
  DocumentToolDropzone,
  ToolBusyState,
  SuiteWorkspaceShell,
  SUITE_UPLOAD_SUBTITLE,
} from '../DocumentToolDropzone';
import { inputClass } from '../shared';
import { loadPdfJS } from '../../../utils/pdfjsLoader';
import { convertImagesToPDF } from '../../../utils/converterEngine';
import { extractPdfPages } from '../../../engines/documentConverter';
import {
  addPdfFormFields,
  applyPdfEdits,
  cropPdfPages,
  diffLines,
  fillPdfForm,
  listPdfFormFields,
  type FormFillValue,
  type NormalizedRect,
  type PdfEditOp,
} from '../../../engines/pdfToolkit';
import { extractEditableSpans, spanEditOps, type EditableSpan } from '../../../utils/pdfEditableText';

type Props = { lang: LanguageType; onClose: () => void; showHeader?: boolean };

function closeLbl(lang: LanguageType) {
  return lang === 'pt' ? 'Fechar' : lang === 'es' ? 'Cerrar' : 'Close';
}

function pdfDropLabels(lang: LanguageType, title: string) {
  if (lang === 'pt') {
    return {
      dropTitle: title,
      orText: 'ou',
      browse: 'Escolher arquivo',
      formats: 'PDF',
      dropActive: 'Solte o arquivo aqui',
      invalidFile: 'Envie um arquivo PDF válido.',
      emptyFile: 'O arquivo está vazio.',
      tooLarge: 'Arquivo acima do limite de 100 MB.',
    };
  }
  if (lang === 'es') {
    return {
      dropTitle: title,
      orText: 'o',
      browse: 'Elegir archivo',
      formats: 'PDF',
      dropActive: 'Suelte el archivo aquí',
      invalidFile: 'Envíe un archivo PDF válido.',
      emptyFile: 'El archivo está vacío.',
      tooLarge: 'El archivo supera el límite de 100 MB.',
    };
  }
  return {
    dropTitle: title,
    orText: 'or',
    browse: 'Choose file',
    formats: 'PDF',
    dropActive: 'Drop the file here',
    invalidFile: 'Please upload a valid PDF file.',
    emptyFile: 'The file is empty.',
    tooLarge: 'File exceeds the 100 MB limit.',
  };
}

function usePdfPreview() {
  const pageRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLCanvasElement>(null);
  const pdfRef = useRef<PDFDocumentProxy | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [pageIndex, setPageIndex] = useState(0);
  const [paintTick, setPaintTick] = useState(0);

  const load = useCallback(async (file: File) => {
    await pdfRef.current?.destroy?.();
    pdfRef.current = null;
    const pdfjs = await loadPdfJS();
    const pdf = await pdfjs.getDocument({ data: new Uint8Array(await file.arrayBuffer()).slice() }).promise;
    pdfRef.current = pdf;
    setPageCount(pdf.numPages);
    setPageIndex(0);
  }, []);

  const paint = useCallback(async () => {
    const pdf = pdfRef.current;
    const canvas = pageRef.current;
    const overlay = overlayRef.current;
    if (!pdf || !canvas) return;
    const page = await pdf.getPage(pageIndex + 1);
    const base = page.getViewport({ scale: 1 });
    const maxW = Math.min(720, canvas.parentElement?.clientWidth || 720);
    const viewport = page.getViewport({ scale: maxW / base.width });
    const width = Math.max(1, Math.floor(viewport.width));
    const height = Math.max(1, Math.floor(viewport.height));
    canvas.width = width;
    canvas.height = height;
    if (overlay) {
      overlay.width = width;
      overlay.height = height;
    }
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, width, height);
    await page.render({ canvasContext: ctx, viewport, canvas }).promise;
    setPaintTick((tick) => tick + 1);
  }, [pageIndex]);

  useEffect(() => () => {
    void pdfRef.current?.destroy?.();
  }, []);

  return { pageRef, overlayRef, pageCount, pageIndex, setPageIndex, load, paint, paintTick };
}

function PageNav({
  pageIndex,
  pageCount,
  onPrev,
  onNext,
}: {
  pageIndex: number;
  pageCount: number;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <button type="button" className="btn-secondary px-3 py-2" disabled={pageIndex <= 0} onClick={onPrev} aria-label="Previous page">
        <ChevronLeft size={16} />
      </button>
      <span className="text-xs font-semibold text-slate-600">
        {pageIndex + 1}/{pageCount}
      </span>
      <button
        type="button"
        className="btn-secondary px-3 py-2"
        disabled={pageIndex >= pageCount - 1}
        onClick={onNext}
        aria-label="Next page"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}

function DownloadReady({
  url,
  name,
  label,
  again,
  onAgain,
}: {
  url: string;
  name: string;
  label: string;
  again: string;
  onAgain: () => void;
}) {
  return (
    <div className="space-y-4 text-center">
      <button
        type="button"
        className="w-full btn-primary py-3.5 inline-flex items-center justify-center gap-2"
        onClick={() => {
          const a = document.createElement('a');
          a.href = url;
          a.download = name;
          a.click();
        }}
      >
        <Download size={16} /> {label}
      </button>
      <p className="text-[10px] font-semibold text-slate-400 truncate">{name}</p>
      <button type="button" className="text-xs font-semibold text-win-blue inline-flex items-center gap-1" onClick={onAgain}>
        <RefreshCw size={12} /> {again}
      </button>
    </div>
  );
}

export function CropPdfSuiteTool({ lang, onClose, showHeader }: Props) {
  const t = {
    pt: {
      title: 'Recortar PDF',
      hint: 'Arraste na página para definir a área visível. Aplique nesta página ou em todas.',
      apply: 'Recortar e baixar',
      all: 'Aplicar em todas as páginas',
      needRect: 'Desenhe a área de recorte.',
      small: 'A área de recorte é pequena demais.',
      again: 'Outro PDF',
      download: 'Baixar PDF recortado',
    },
    en: {
      title: 'Crop PDF',
      hint: 'Drag on the page to set the visible area. Apply to this page or all pages.',
      apply: 'Crop and download',
      all: 'Apply to all pages',
      needRect: 'Draw the crop area.',
      small: 'The crop area is too small.',
      again: 'Another PDF',
      download: 'Download cropped PDF',
    },
    es: {
      title: 'Recortar PDF',
      hint: 'Arrastre en la página para definir el área visible. Aplique en esta o en todas.',
      apply: 'Recortar y descargar',
      all: 'Aplicar a todas las páginas',
      needRect: 'Dibuje el área de recorte.',
      small: 'El área de recorte es demasiado pequeña.',
      again: 'Otro PDF',
      download: 'Descargar PDF recortado',
    },
  }[lang];
  const preview = usePdfPreview();
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rect, setRect] = useState<Omit<NormalizedRect, 'pageIndex'> | null>(null);
  const [drag, setDrag] = useState<{ x0: number; y0: number; x1: number; y1: number } | null>(null);
  const [all, setAll] = useState(true);
  const [out, setOut] = useState<{ url: string; name: string } | null>(null);

  useEffect(() => {
    if (file && preview.pageCount) void preview.paint();
  }, [file, preview.pageCount, preview.pageIndex]);

  useEffect(() => {
    const overlay = preview.overlayRef.current;
    if (!overlay || overlay.width < 2) return;
    const ctx = overlay.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, overlay.width, overlay.height);
    const box = drag
      ? {
          x: Math.min(drag.x0, drag.x1) / overlay.width,
          y: Math.min(drag.y0, drag.y1) / overlay.height,
          w: Math.abs(drag.x1 - drag.x0) / overlay.width,
          h: Math.abs(drag.y1 - drag.y0) / overlay.height,
        }
      : rect;
    if (!box || box.w < 0.01 || box.h < 0.01) return;
    ctx.fillStyle = 'rgba(15,23,42,0.4)';
    ctx.fillRect(0, 0, overlay.width, overlay.height);
    const x = box.x * overlay.width;
    const y = box.y * overlay.height;
    const w = box.w * overlay.width;
    const h = box.h * overlay.height;
    ctx.clearRect(x, y, w, h);
    ctx.strokeStyle = '#2563eb';
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, w, h);
  }, [rect, drag, preview.paintTick, preview.pageIndex]);

  const pos = (e: ReactPointerEvent<HTMLCanvasElement>) => {
    const c = preview.overlayRef.current!;
    const b = c.getBoundingClientRect();
    return {
      x: ((e.clientX - b.left) / b.width) * c.width,
      y: ((e.clientY - b.top) / b.height) * c.height,
    };
  };

  const startOver = () => {
    if (out) URL.revokeObjectURL(out.url);
    setFile(null);
    setRect(null);
    setDrag(null);
    setError(null);
    setOut(null);
  };

  return (
    <SuiteWorkspaceShell title={t.title} subtitle={SUITE_UPLOAD_SUBTITLE[lang]} showHeader={showHeader} onClose={onClose} closeLabel={closeLbl(lang)}>
      <div className="space-y-4">
        {!file && !out && (
          <DocumentToolDropzone
            lang={lang}
            accept="pdf"
            onFile={(next) => {
              setFile(next);
              setBusy(true);
              preview.load(next).catch(() => setError('PDF')).finally(() => setBusy(false));
            }}
            labels={pdfDropLabels(lang, t.title)}
          />
        )}
        {busy && <ToolBusyState label="…" />}
        {error && (
          <p role="alert" className="text-xs text-rose-700 font-semibold flex gap-2">
            <AlertCircle size={14} /> {error}
          </p>
        )}
        {file && preview.pageCount > 0 && !out && !busy && (
          <>
            <p className="text-[11px] font-semibold text-slate-500">{t.hint}</p>
            <PageNav
              pageIndex={preview.pageIndex}
              pageCount={preview.pageCount}
              onPrev={() => preview.setPageIndex((i) => i - 1)}
              onNext={() => preview.setPageIndex((i) => i + 1)}
            />
            <div className="relative mx-auto max-w-[720px] border rounded-xl overflow-hidden touch-none">
              <canvas ref={preview.pageRef} className="block w-full" />
              <canvas
                ref={preview.overlayRef}
                className="absolute inset-0 w-full h-full cursor-crosshair"
                onPointerDown={(e) => {
                  e.currentTarget.setPointerCapture(e.pointerId);
                  const p = pos(e);
                  setDrag({ x0: p.x, y0: p.y, x1: p.x, y1: p.y });
                }}
                onPointerMove={(e) => {
                  if (!drag) return;
                  const p = pos(e);
                  setDrag({ ...drag, x1: p.x, y1: p.y });
                }}
                onPointerUp={() => {
                  if (!drag || !preview.overlayRef.current) return;
                  const { width, height } = preview.overlayRef.current;
                  setRect({
                    x: Math.min(drag.x0, drag.x1) / width,
                    y: Math.min(drag.y0, drag.y1) / height,
                    w: Math.abs(drag.x1 - drag.x0) / width,
                    h: Math.abs(drag.y1 - drag.y0) / height,
                  });
                  setDrag(null);
                }}
              />
            </div>
            <label className="text-[11px] font-semibold inline-flex items-center gap-2">
              <input type="checkbox" checked={all} onChange={(e) => setAll(e.target.checked)} /> {t.all}
            </label>
            <button
              type="button"
              className="w-full btn-primary py-3.5"
              onClick={async () => {
                if (!file || !rect) {
                  setError(t.needRect);
                  return;
                }
                setBusy(true);
                setError(null);
                try {
                  const res = await cropPdfPages(file, rect, all ? 'all' : preview.pageIndex);
                  if (out) URL.revokeObjectURL(out.url);
                  setOut({ url: URL.createObjectURL(res.blob), name: res.fileName });
                } catch (err) {
                  setError(err instanceof Error && err.message === 'CROP_TOO_SMALL' ? t.small : t.needRect);
                } finally {
                  setBusy(false);
                }
              }}
            >
              {t.apply}
            </button>
          </>
        )}
        {out && <DownloadReady url={out.url} name={out.name} label={t.download} again={t.again} onAgain={startOver} />}
      </div>
    </SuiteWorkspaceShell>
  );
}

export function ComparePdfSuiteTool({ lang, onClose, showHeader }: Props) {
  const [a, setA] = useState<File | null>(null);
  const [b, setB] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [rows, setRows] = useState<Array<{ side: 'same' | 'left' | 'right'; text: string }>>([]);
  const [error, setError] = useState<string | null>(null);
  const title = lang === 'pt' ? 'Comparar PDF' : lang === 'es' ? 'Comparar PDF' : 'Compare PDF';
  const run = async () => {
    if (!a || !b) return;
    setBusy(true);
    setError(null);
    try {
      const left = (await extractPdfPages(a)).join('\n');
      const right = (await extractPdfPages(b)).join('\n');
      setRows(diffLines(left, right));
    } catch (err) {
      const code = err instanceof Error ? err.message : '';
      setError(
        code === 'PDF_NO_TEXT'
          ? lang === 'pt'
            ? 'Não foi possível ler o texto. Use OCR se for scan.'
            : 'Could not read text. Use OCR for scans.'
          : lang === 'pt'
            ? 'Não foi possível comparar estes PDFs.'
            : 'Could not compare these PDFs.'
      );
    } finally {
      setBusy(false);
    }
  };
  return (
    <SuiteWorkspaceShell title={title} subtitle={SUITE_UPLOAD_SUBTITLE[lang]} showHeader={showHeader} onClose={onClose} closeLabel={closeLbl(lang)}>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <DocumentToolDropzone lang={lang} accept="pdf" onFile={setA} labels={pdfDropLabels(lang, 'A')} />
          {a && <p className="text-[11px] font-semibold text-slate-600 truncate mt-2">{a.name}</p>}
        </div>
        <div>
          <DocumentToolDropzone lang={lang} accept="pdf" onFile={setB} labels={pdfDropLabels(lang, 'B')} />
          {b && <p className="text-[11px] font-semibold text-slate-600 truncate mt-2">{b.name}</p>}
        </div>
      </div>
      <p className="text-[11px] text-slate-500 mt-3">
        {lang === 'pt'
          ? 'Compara o texto extraível, linha a linha. Não é um diff visual de layout.'
          : 'Compares extractable text line by line. This is not a visual layout diff.'}
      </p>
      <button type="button" className="w-full btn-primary py-3 mt-4" disabled={!a || !b || busy} onClick={() => void run()}>
        {lang === 'pt' ? 'Comparar texto' : 'Compare text'}
      </button>
      {busy && <ToolBusyState label="…" />}
      {error && (
        <p role="alert" className="text-xs text-rose-700 mt-2 font-semibold">
          {error}
        </p>
      )}
      {rows.length > 0 && (
        <pre className="mt-4 max-h-96 overflow-auto text-[11px] leading-relaxed rounded-xl border p-3 bg-slate-50">
          {rows.map((row, i) => (
            <div key={i} className={row.side === 'left' ? 'bg-rose-50 text-rose-800' : row.side === 'right' ? 'bg-emerald-50 text-emerald-800' : 'text-slate-600'}>
              {row.side === 'left' ? '− ' : row.side === 'right' ? '+ ' : '  '}
              {row.text}
            </div>
          ))}
        </pre>
      )}
    </SuiteWorkspaceShell>
  );
}

export function ScanToPdfSuiteTool({ lang, onClose, showHeader }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [live, setLive] = useState(false);
  const [shots, setShots] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [out, setOut] = useState<{ url: string; name: string } | null>(null);

  const stop = useCallback(() => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    setLive(false);
  }, []);

  useEffect(() => () => stop(), [stop]);

  const startCam = async () => {
    try {
      const media = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      streamRef.current = media;
      setLive(true);
      if (videoRef.current) {
        videoRef.current.srcObject = media;
        await videoRef.current.play();
      }
    } catch {
      setError(lang === 'pt' ? 'Não foi possível abrir a câmera.' : 'Could not open the camera.');
    }
  };

  const snap = () => {
    const video = videoRef.current;
    if (!video || !video.videoWidth) return;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d')?.drawImage(video, 0, 0);
    canvas.toBlob((blob) => {
      if (!blob) return;
      setShots((prev) => [...prev, new File([blob], `scan-${prev.length + 1}.jpg`, { type: 'image/jpeg' })]);
    }, 'image/jpeg', 0.92);
  };

  return (
    <SuiteWorkspaceShell
      title={lang === 'pt' ? 'Escanear para PDF' : lang === 'es' ? 'Escanear a PDF' : 'Scan to PDF'}
      subtitle={SUITE_UPLOAD_SUBTITLE[lang]}
      showHeader={showHeader}
      onClose={onClose}
      closeLabel={closeLbl(lang)}
    >
      <p className="text-[11px] text-slate-500 mb-3">
        {lang === 'pt'
          ? 'A câmera fica no aparelho. Depois use Ajuste de Margem se a foto incluir a mesa.'
          : 'The camera stays on the device. Use Margin Adjust if the photo includes the desk.'}
      </p>
      <div className="flex flex-wrap gap-2 mb-3">
        <button type="button" className="btn-secondary py-2 px-3 inline-flex gap-1 items-center" onClick={() => void startCam()}>
          <Camera size={14} /> {lang === 'pt' ? 'Abrir câmera' : 'Open camera'}
        </button>
        {live && (
          <button type="button" className="btn-primary py-2 px-3" onClick={snap}>
            {lang === 'pt' ? 'Capturar página' : 'Capture page'}
          </button>
        )}
        {live && (
          <button type="button" className="btn-secondary py-2 px-3" onClick={stop}>
            {lang === 'pt' ? 'Fechar câmera' : 'Close camera'}
          </button>
        )}
      </div>
      <video ref={videoRef} autoPlay muted playsInline className="w-full rounded-xl bg-black max-h-64" />
      <div className="mt-4">
        <DocumentToolDropzone
          lang={lang}
          accept="image"
          onFile={(f) => setShots((prev) => [...prev, f])}
          labels={{
            dropTitle: lang === 'pt' ? 'Ou envie fotos' : 'Or upload photos',
            orText: lang === 'es' ? 'o' : lang === 'pt' ? 'ou' : 'or',
            browse: 'JPG PNG',
            formats: 'JPG • PNG • WEBP',
            dropActive: 'img',
            invalidFile: lang === 'pt' ? 'Envie uma imagem.' : 'Upload an image.',
            emptyFile: '0',
            tooLarge: '40MB',
          }}
        />
      </div>
      <p className="text-[11px] font-semibold text-slate-500 mt-3">
        {shots.length} {lang === 'pt' ? 'páginas' : 'pages'}
      </p>
      {shots.length > 0 && !out && (
        <button
          type="button"
          className="w-full btn-primary py-3.5 mt-3"
          disabled={busy}
          onClick={async () => {
            setBusy(true);
            setError(null);
            try {
              const pdf = await convertImagesToPDF(shots, { orientation: 'portrait', margins: 'narrow', positioning: 'fit' });
              if (out) URL.revokeObjectURL(out.url);
              setOut({ url: URL.createObjectURL(pdf), name: 'scan.pdf' });
              stop();
            } catch {
              setError(lang === 'pt' ? 'Não foi possível gerar o PDF.' : 'Could not build the PDF.');
            } finally {
              setBusy(false);
            }
          }}
        >
          {lang === 'pt' ? 'Gerar PDF' : 'Build PDF'}
        </button>
      )}
      {error && (
        <p role="alert" className="text-xs text-rose-700 mt-2 font-semibold">
          {error}
        </p>
      )}
      {shots.length > 0 && !out && (
        <button type="button" className="text-xs font-semibold text-slate-500 mt-2" onClick={() => setShots([])}>
          <Trash2 className="inline" size={12} /> {lang === 'pt' ? 'Limpar capturas' : 'Clear captures'}
        </button>
      )}
      {out && (
        <DownloadReady
          url={out.url}
          name={out.name}
          label={lang === 'pt' ? 'Baixar PDF' : 'Download PDF'}
          again={lang === 'pt' ? 'Outro scan' : 'Another scan'}
          onAgain={() => {
            URL.revokeObjectURL(out.url);
            setOut(null);
            setShots([]);
          }}
        />
      )}
    </SuiteWorkspaceShell>
  );
}

export function PdfFormsSuiteTool({ lang, onClose, showHeader }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [fields, setFields] = useState<Array<{ name: string; type: string; value: string }>>([]);
  const [values, setValues] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const preview = usePdfPreview();
  const [adding, setAdding] = useState<'text' | 'checkbox' | null>(null);
  const [pending, setPending] = useState<Array<{ name: string; type: 'text' | 'checkbox'; rect: NormalizedRect }>>([]);
  const [out, setOut] = useState<{ url: string; name: string } | null>(null);

  const open = async (f: File) => {
    setFile(f);
    setBusy(true);
    try {
      const listed = await listPdfFormFields(f);
      setFields(listed);
      setValues(Object.fromEntries(listed.map((item) => [item.name, item.value])));
      await preview.load(f);
    } catch {
      setError(lang === 'pt' ? 'Não foi possível ler este PDF.' : 'Could not read this PDF.');
    } finally {
      setBusy(false);
    }
  };

  useEffect(() => {
    if (file && preview.pageCount) void preview.paint();
  }, [file, preview.pageCount, preview.pageIndex]);

  useEffect(() => {
    const overlay = preview.overlayRef.current;
    if (!overlay || overlay.width < 2) return;
    const ctx = overlay.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, overlay.width, overlay.height);
    ctx.strokeStyle = '#2563eb';
    for (const item of pending.filter((field) => field.rect.pageIndex === preview.pageIndex)) {
      ctx.strokeRect(item.rect.x * overlay.width, item.rect.y * overlay.height, item.rect.w * overlay.width, item.rect.h * overlay.height);
    }
  }, [pending, preview.pageIndex, preview.paintTick]);

  return (
    <SuiteWorkspaceShell
      title={lang === 'pt' ? 'Formulários PDF' : lang === 'es' ? 'Formularios PDF' : 'PDF Forms'}
      subtitle={SUITE_UPLOAD_SUBTITLE[lang]}
      showHeader={showHeader}
      onClose={onClose}
      closeLabel={closeLbl(lang)}
    >
      {!file && <DocumentToolDropzone lang={lang} accept="pdf" onFile={(f) => void open(f)} labels={pdfDropLabels(lang, 'PDF')} />}
      {busy && <ToolBusyState label="…" />}
      {error && <p className="text-xs text-rose-700 font-semibold">{error}</p>}
      {file && !out && (
        <div className="space-y-4">
          <p className="text-[11px] text-slate-500">
            {lang === 'pt'
              ? 'Preenche AcroForm existente. Não detecta campos só visuais. XFA não é suportado.'
              : 'Fills an existing AcroForm. It does not detect visual-only fields. XFA is not supported.'}
          </p>
          {fields.length === 0 && (
            <p className="text-xs font-semibold text-slate-600">
              {lang === 'pt' ? 'Nenhum campo AcroForm. Adicione caixas abaixo.' : 'No AcroForm fields. Add boxes below.'}
            </p>
          )}
          <div className="space-y-2 max-h-56 overflow-auto">
            {fields.map((field) => (
              <label key={field.name} className="block text-[11px] font-semibold text-slate-600">
                {field.name} ({field.type})
                <input
                  className={`${inputClass} mt-1`}
                  value={values[field.name] ?? ''}
                  onChange={(e) => setValues((prev) => ({ ...prev, [field.name]: e.target.value }))}
                />
              </label>
            ))}
          </div>
          <div className="flex gap-2">
            <button type="button" className="btn-secondary py-2 px-3 text-[11px]" onClick={() => setAdding('text')}>
              {lang === 'pt' ? 'Adicionar texto' : 'Add text field'}
            </button>
            <button type="button" className="btn-secondary py-2 px-3 text-[11px]" onClick={() => setAdding('checkbox')}>
              {lang === 'pt' ? 'Adicionar caixa' : 'Add checkbox'}
            </button>
          </div>
          {preview.pageCount > 0 && (
            <>
              <PageNav
                pageIndex={preview.pageIndex}
                pageCount={preview.pageCount}
                onPrev={() => preview.setPageIndex((i) => i - 1)}
                onNext={() => preview.setPageIndex((i) => i + 1)}
              />
              <div className="relative mx-auto max-w-[720px] border rounded-xl overflow-hidden">
                <canvas ref={preview.pageRef} className="block w-full" />
                <canvas
                  ref={preview.overlayRef}
                  className="absolute inset-0 w-full h-full cursor-crosshair"
                  onClick={(e) => {
                    if (!adding || !preview.overlayRef.current) return;
                    const c = preview.overlayRef.current;
                    const b = c.getBoundingClientRect();
                    const x = (e.clientX - b.left) / b.width - 0.16;
                    const y = (e.clientY - b.top) / b.height - 0.025;
                    setPending((prev) => [
                      ...prev,
                      {
                        name: `${adding}_${prev.length + 1}`,
                        type: adding,
                        rect: {
                          pageIndex: preview.pageIndex,
                          x: Math.max(0, x),
                          y: Math.max(0, y),
                          w: 0.32,
                          h: adding === 'checkbox' ? 0.04 : 0.05,
                        },
                      },
                    ]);
                    setAdding(null);
                  }}
                />
              </div>
            </>
          )}
          <button
            type="button"
            className="w-full btn-primary py-3.5"
            onClick={async () => {
              if (!file) return;
              setBusy(true);
              try {
                let current = file;
                if (pending.length) {
                  const added = await addPdfFormFields(current, pending);
                  current = new File([added.blob], file.name, { type: 'application/pdf' });
                }
                const fills: FormFillValue[] = Object.entries(values).map(([name, value]) => ({
                  name,
                  value: String(value),
                  checked: value === 'true',
                }));
                const res = await fillPdfForm(current, fills, false);
                if (out) URL.revokeObjectURL(out.url);
                setOut({ url: URL.createObjectURL(res.blob), name: res.fileName });
              } catch {
                setError(lang === 'pt' ? 'Não foi possível salvar o formulário.' : 'Could not save the form.');
              } finally {
                setBusy(false);
              }
            }}
          >
            {lang === 'pt' ? 'Salvar PDF do formulário' : 'Save form PDF'}
          </button>
        </div>
      )}
      {out && (
        <DownloadReady
          url={out.url}
          name={out.name}
          label={lang === 'pt' ? 'Baixar PDF' : 'Download PDF'}
          again={lang === 'pt' ? 'Outro PDF' : 'Another PDF'}
          onAgain={() => {
            URL.revokeObjectURL(out.url);
            setOut(null);
            setFile(null);
            setPending([]);
            setFields([]);
          }}
        />
      )}
    </SuiteWorkspaceShell>
  );
}

type EditTool = 'select' | 'addText' | 'erase' | 'image';

interface AddedText {
  id: string;
  pageIndex: number;
  x: number;
  y: number;
  w: number;
  h: number;
  fontSize: number;
  text: string;
}

interface EraseRect {
  id: string;
  pageIndex: number;
  x: number;
  y: number;
  w: number;
  h: number;
}

interface AddedImage {
  id: string;
  pageIndex: number;
  x: number;
  y: number;
  w: number;
  h: number;
  png: Uint8Array;
}

function editPdfCopy(lang: LanguageType) {
  if (lang === 'pt') {
    return {
      title: 'Editar PDF',
      intro: 'Envie um PDF com texto selecionável e edite direto na página: clique em um texto para alterar, apague o que não quer ou acrescente texto novo. Depois escolha como salvar.',
      scanned: 'Este PDF não tem texto selecionável (parece digitalizado). Você ainda pode acrescentar texto, apagar áreas e inserir imagens por cima.',
      toolSelect: 'Editar texto',
      toolAdd: 'Acrescentar texto',
      toolErase: 'Apagar área',
      toolImage: 'Imagem',
      selectHint: 'Clique em um trecho para editar. Apague todo o texto do campo para remover aquele trecho do PDF.',
      addHint: 'Clique na página onde o novo texto deve começar e digite.',
      eraseHint: 'Arraste sobre a página para cobrir (apagar) uma área com branco.',
      imageHint: 'Escolha uma imagem e clique na página para posicioná-la.',
      newTextPlaceholder: 'Novo texto',
      undo: 'Desfazer última ação',
      reset: 'Recomeçar',
      changes: 'alteração(ões)',
      generate: 'Gerar PDF editado',
      nothing: 'Faça ao menos uma edição antes de gerar o PDF.',
      failed: 'Não foi possível gerar o PDF editado.',
      readFail: 'Não foi possível ler este PDF.',
      download: 'Baixar PDF editado',
      again: 'Outro PDF',
      loadingText: 'Lendo o texto do PDF…',
      fontNote: 'O texto editado ou acrescentado usa a fonte padrão Helvetica, então pode não ficar idêntico ao original.',
    };
  }
  if (lang === 'es') {
    return {
      title: 'Editar PDF',
      intro: 'Sube un PDF con texto seleccionable y edítalo directamente en la página: haz clic en un texto para cambiarlo, borra lo que no quieras o añade texto nuevo. Luego elige cómo guardar.',
      scanned: 'Este PDF no tiene texto seleccionable (parece escaneado). Aún puedes añadir texto, borrar áreas e insertar imágenes encima.',
      toolSelect: 'Editar texto',
      toolAdd: 'Añadir texto',
      toolErase: 'Borrar área',
      toolImage: 'Imagen',
      selectHint: 'Haz clic en un fragmento para editarlo. Borra todo el campo para eliminar ese texto del PDF.',
      addHint: 'Haz clic donde debe empezar el nuevo texto y escribe.',
      eraseHint: 'Arrastra sobre la página para cubrir (borrar) un área con blanco.',
      imageHint: 'Elige una imagen y haz clic en la página para colocarla.',
      newTextPlaceholder: 'Texto nuevo',
      undo: 'Deshacer última acción',
      reset: 'Reiniciar',
      changes: 'cambio(s)',
      generate: 'Generar PDF editado',
      nothing: 'Haz al menos una edición antes de generar el PDF.',
      failed: 'No se pudo generar el PDF editado.',
      readFail: 'No se pudo leer este PDF.',
      download: 'Descargar PDF editado',
      again: 'Otro PDF',
      loadingText: 'Leyendo el texto del PDF…',
      fontNote: 'El texto editado o añadido usa la fuente estándar Helvetica, por lo que puede no ser idéntico al original.',
    };
  }
  return {
    title: 'Edit PDF',
    intro: 'Upload a PDF with selectable text and edit it right on the page: click any text to change it, delete what you do not want, or add new text. Then choose how to save.',
    scanned: 'This PDF has no selectable text (it looks scanned). You can still add text, erase areas, and insert images on top.',
    toolSelect: 'Edit text',
    toolAdd: 'Add text',
    toolErase: 'Erase area',
    toolImage: 'Image',
    selectHint: 'Click a piece of text to edit it. Clear the whole field to remove that text from the PDF.',
    addHint: 'Click where the new text should start, then type.',
    eraseHint: 'Drag on the page to cover (erase) an area with white.',
    imageHint: 'Pick an image, then click the page to place it.',
    newTextPlaceholder: 'New text',
    undo: 'Undo last action',
    reset: 'Start over',
    changes: 'change(s)',
    generate: 'Generate edited PDF',
    nothing: 'Make at least one edit before generating the PDF.',
    failed: 'Could not generate the edited PDF.',
    readFail: 'Could not read this PDF.',
    download: 'Download edited PDF',
    again: 'Another PDF',
    loadingText: 'Reading the PDF text…',
    fontNote: 'Edited or added text uses the standard Helvetica font, so it may not look identical to the original.',
  };
}

export function EditPdfSuiteTool({ lang, onClose, showHeader }: Props) {
  const t = editPdfCopy(lang);
  const preview = usePdfPreview();
  const stageRef = useRef<HTMLDivElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [loadingSpans, setLoadingSpans] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tool, setTool] = useState<EditTool>('select');

  const [spans, setSpans] = useState<EditableSpan[]>([]);
  const [edits, setEdits] = useState<Record<string, string>>({});
  const [addedTexts, setAddedTexts] = useState<AddedText[]>([]);
  const [eraseRects, setEraseRects] = useState<EraseRect[]>([]);
  const [addedImages, setAddedImages] = useState<AddedImage[]>([]);
  const [history, setHistory] = useState<Array<'edit' | 'add' | 'erase' | 'image'>>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  const imageBytes = useRef<Uint8Array | null>(null);
  const [drag, setDrag] = useState<{ x0: number; y0: number; x1: number; y1: number } | null>(null);
  const [display, setDisplay] = useState<{ w: number; h: number }>({ w: 0, h: 0 });
  const [out, setOut] = useState<{ url: string; name: string } | null>(null);

  const open = useCallback(
    async (f: File) => {
      setFile(f);
      setError(null);
      setLoadingSpans(true);
      try {
        await preview.load(f);
      } catch {
        setError(t.readFail);
        setLoadingSpans(false);
        return;
      }
      try {
        const { spans: found } = await extractEditableSpans(f);
        setSpans(found);
      } catch {
        setSpans([]);
      } finally {
        setLoadingSpans(false);
      }
    },
    [preview, t.readFail]
  );

  useEffect(() => {
    if (file && preview.pageCount) void preview.paint();
  }, [file, preview.pageCount, preview.pageIndex]);

  useEffect(() => {
    const el = preview.pageRef.current;
    if (!el) return;
    const measure = () => setDisplay({ w: el.clientWidth, h: el.clientHeight });
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [file, preview.paintTick]);

  useEffect(() => {
    const overlay = preview.overlayRef.current;
    if (!overlay || overlay.width < 2) return;
    const ctx = overlay.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, overlay.width, overlay.height);
    const drawRect = (x: number, y: number, w: number, h: number, fill: string, stroke: string) => {
      ctx.fillStyle = fill;
      ctx.fillRect(x * overlay.width, y * overlay.height, w * overlay.width, h * overlay.height);
      ctx.strokeStyle = stroke;
      ctx.lineWidth = 1.5;
      ctx.strokeRect(x * overlay.width, y * overlay.height, w * overlay.width, h * overlay.height);
    };
    for (const r of eraseRects.filter((item) => item.pageIndex === preview.pageIndex)) {
      drawRect(r.x, r.y, r.w, r.h, 'rgba(255,255,255,0.92)', '#f43f5e');
    }
    for (const img of addedImages.filter((item) => item.pageIndex === preview.pageIndex)) {
      drawRect(img.x, img.y, img.w, img.h, 'rgba(37,99,235,0.08)', '#2563eb');
    }
    if (drag) {
      const x = Math.min(drag.x0, drag.x1);
      const y = Math.min(drag.y0, drag.y1);
      drawRect(x, y, Math.abs(drag.x1 - drag.x0), Math.abs(drag.y1 - drag.y0), 'rgba(244,63,94,0.15)', '#f43f5e');
    }
  }, [eraseRects, addedImages, drag, preview.pageIndex, preview.paintTick]);

  const pageSpans = useMemo(
    () => spans.filter((s) => s.pageIndex === preview.pageIndex),
    [spans, preview.pageIndex]
  );
  const pageAdded = useMemo(
    () => addedTexts.filter((a) => a.pageIndex === preview.pageIndex),
    [addedTexts, preview.pageIndex]
  );

  const changeCount =
    Object.keys(edits).filter((id) => {
      const span = spans.find((s) => s.id === id);
      return span && edits[id] !== span.str;
    }).length +
    addedTexts.filter((a) => a.text.trim()).length +
    eraseRects.length +
    addedImages.length;

  const normPointer = (e: ReactPointerEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const b = el.getBoundingClientRect();
    return { x: (e.clientX - b.left) / b.width, y: (e.clientY - b.top) / b.height };
  };

  const pushHistory = (kind: 'edit' | 'add' | 'erase' | 'image') => setHistory((prev) => [...prev, kind]);

  const undo = () => {
    const last = history[history.length - 1];
    if (!last) return;
    setHistory((prev) => prev.slice(0, -1));
    if (last === 'add') setAddedTexts((prev) => prev.slice(0, -1));
    else if (last === 'erase') setEraseRects((prev) => prev.slice(0, -1));
    else if (last === 'image') setAddedImages((prev) => prev.slice(0, -1));
  };

  const resetEdits = () => {
    setEdits({});
    setAddedTexts([]);
    setEraseRects([]);
    setAddedImages([]);
    setHistory([]);
    setEditingId(null);
  };

  const startOver = () => {
    if (out) URL.revokeObjectURL(out.url);
    setOut(null);
    setFile(null);
    setSpans([]);
    resetEdits();
    setTool('select');
    imageBytes.current = null;
  };

  const setSpanText = (span: EditableSpan, value: string) =>
    setEdits((prev) => {
      const next = { ...prev };
      if (value === span.str) delete next[span.id];
      else next[span.id] = value;
      return next;
    });

  const handleStageClick = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (tool === 'addText') {
      const p = normPointer(e);
      const id = `add-${Date.now()}`;
      setAddedTexts((prev) => [
        ...prev,
        { id, pageIndex: preview.pageIndex, x: Math.max(0, p.x), y: Math.max(0, p.y - 0.02), w: 0.4, h: 0.05, fontSize: 14, text: '' },
      ]);
      pushHistory('add');
      setEditingId(id);
    } else if (tool === 'image' && imageBytes.current) {
      const p = normPointer(e);
      setAddedImages((prev) => [
        ...prev,
        {
          id: `img-${Date.now()}`,
          pageIndex: preview.pageIndex,
          x: Math.max(0, p.x - 0.12),
          y: Math.max(0, p.y - 0.08),
          w: 0.24,
          h: 0.16,
          png: imageBytes.current as Uint8Array,
        },
      ]);
      pushHistory('image');
    }
  };

  const generate = async () => {
    if (!file) return;
    const ops: PdfEditOp[] = [];
    for (const span of spans) {
      const value = edits[span.id];
      if (value === undefined || value === span.str) continue;
      ops.push(...spanEditOps(span, value));
    }
    for (const r of eraseRects) {
      ops.push({ kind: 'erase', pageIndex: r.pageIndex, x: r.x, y: r.y, w: r.w, h: r.h, color: '#ffffff' });
    }
    for (const a of addedTexts) {
      if (!a.text.trim()) continue;
      ops.push({ kind: 'text', pageIndex: a.pageIndex, x: a.x, y: a.y, w: a.w, h: a.h, text: a.text, fontSize: a.fontSize });
    }
    for (const img of addedImages) {
      ops.push({ kind: 'image', pageIndex: img.pageIndex, x: img.x, y: img.y, w: img.w, h: img.h, png: img.png });
    }
    if (ops.length === 0) {
      setError(t.nothing);
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const res = await applyPdfEdits(file, ops);
      if (out) URL.revokeObjectURL(out.url);
      setOut({ url: URL.createObjectURL(res.blob), name: res.fileName });
    } catch {
      setError(t.failed);
    } finally {
      setBusy(false);
    }
  };

  const tools: Array<{ id: EditTool; label: string; icon: typeof Type }> = [
    { id: 'select', label: t.toolSelect, icon: MousePointerClick },
    { id: 'addText', label: t.toolAdd, icon: Type },
    { id: 'erase', label: t.toolErase, icon: Eraser },
    { id: 'image', label: t.toolImage, icon: ImagePlus },
  ];
  const hint =
    tool === 'select' ? t.selectHint : tool === 'addText' ? t.addHint : tool === 'erase' ? t.eraseHint : t.imageHint;
  const spansInteractive = tool === 'select';

  return (
    <SuiteWorkspaceShell
      title={t.title}
      subtitle={SUITE_UPLOAD_SUBTITLE[lang]}
      showHeader={showHeader}
      onClose={onClose}
      closeLabel={closeLbl(lang)}
    >
      {!file && <DocumentToolDropzone lang={lang} accept="pdf" onFile={(f) => void open(f)} labels={pdfDropLabels(lang, 'PDF')} />}
      {loadingSpans && <ToolBusyState label={t.loadingText} />}
      {file && !out && !loadingSpans && (
        <div className="space-y-3">
          <p className="text-[11px] text-slate-500">{t.intro}</p>
          {spans.length === 0 && (
            <p className="text-[11px] font-semibold text-amber-700 flex gap-2">
              <AlertCircle size={14} className="shrink-0" /> {t.scanned}
            </p>
          )}
          <div className="flex flex-wrap gap-2">
            {tools.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                className={`btn-secondary py-2 px-3 text-[11px] inline-flex items-center gap-1 ${tool === id ? 'ring-2 ring-win-blue' : ''}`}
                onClick={() => {
                  setTool(id);
                  setEditingId(null);
                }}
              >
                <Icon size={13} /> {label}
              </button>
            ))}
          </div>
          {tool === 'image' && (
            <input
              type="file"
              accept="image/png,image/jpeg"
              className="text-[11px]"
              onChange={async (e) => {
                const img = e.target.files?.[0];
                if (!img) return;
                imageBytes.current = new Uint8Array(await img.arrayBuffer());
              }}
            />
          )}
          <p className="text-[11px] font-semibold text-slate-500">{hint}</p>
          {preview.pageCount > 1 && (
            <PageNav
              pageIndex={preview.pageIndex}
              pageCount={preview.pageCount}
              onPrev={() => preview.setPageIndex((i) => i - 1)}
              onNext={() => preview.setPageIndex((i) => i + 1)}
            />
          )}
          <div
            ref={stageRef}
            className="relative mx-auto max-w-[720px] border rounded-xl overflow-hidden touch-none"
          >
            <canvas ref={preview.pageRef} className="block w-full" />
            {/* Editable original text spans */}
            {spansInteractive &&
              display.h > 0 &&
              pageSpans.map((span) => {
                const value = edits[span.id] ?? span.str;
                const dirty = span.id in edits && edits[span.id] !== span.str;
                const editing = editingId === span.id;
                const active = dirty || editing;
                const fpx = Math.max(6, span.h * display.h * 0.86);
                return (
                  <input
                    key={span.id}
                    value={value}
                    spellCheck={false}
                    onFocus={() => setEditingId(span.id)}
                    onChange={(e) => setSpanText(span, e.target.value)}
                    onBlur={() => setEditingId((cur) => (cur === span.id ? null : cur))}
                    className="absolute outline-none"
                    style={{
                      left: `${span.x * 100}%`,
                      top: `${span.y * 100}%`,
                      width: `${Math.max(span.w, 0.04) * 100}%`,
                      height: `${Math.max(span.h * 1.25, 0.02) * 100}%`,
                      fontSize: `${fpx}px`,
                      lineHeight: 1,
                      padding: 0,
                      margin: 0,
                      border: editing ? '1px solid #2563eb' : '1px solid transparent',
                      borderRadius: 2,
                      color: active ? '#0f172a' : 'transparent',
                      background: active ? '#ffffff' : 'transparent',
                      caretColor: '#2563eb',
                      fontFamily: 'Helvetica, Arial, sans-serif',
                      boxSizing: 'border-box',
                      whiteSpace: 'pre',
                      overflow: 'hidden',
                    }}
                  />
                );
              })}
            {/* Added text boxes */}
            {display.h > 0 &&
              pageAdded.map((item) => {
                const fpx = Math.max(8, (item.fontSize / 72) * display.h);
                return (
                  <input
                    key={item.id}
                    value={item.text}
                    autoFocus={editingId === item.id}
                    spellCheck={false}
                    placeholder={t.newTextPlaceholder}
                    onChange={(e) =>
                      setAddedTexts((prev) => prev.map((a) => (a.id === item.id ? { ...a, text: e.target.value } : a)))
                    }
                    className="absolute outline-none"
                    style={{
                      left: `${item.x * 100}%`,
                      top: `${item.y * 100}%`,
                      width: `${item.w * 100}%`,
                      fontSize: `${fpx}px`,
                      lineHeight: 1.1,
                      padding: '1px 2px',
                      border: '1px dashed #2563eb',
                      borderRadius: 2,
                      color: '#0f172a',
                      background: 'rgba(255,255,255,0.9)',
                      fontFamily: 'Helvetica, Arial, sans-serif',
                      boxSizing: 'border-box',
                      pointerEvents: tool === 'erase' ? 'none' : 'auto',
                    }}
                  />
                );
              })}
            {/* Interaction layer for add / erase / image */}
            {tool !== 'select' && (
              <div
                className="absolute inset-0"
                style={{ cursor: tool === 'erase' ? 'crosshair' : 'copy' }}
                onPointerDown={(e) => {
                  if (tool !== 'erase') return;
                  e.currentTarget.setPointerCapture(e.pointerId);
                  const p = normPointer(e);
                  setDrag({ x0: p.x, y0: p.y, x1: p.x, y1: p.y });
                }}
                onPointerMove={(e) => {
                  if (tool !== 'erase' || !drag) return;
                  const p = normPointer(e);
                  setDrag((d) => (d ? { ...d, x1: p.x, y1: p.y } : d));
                }}
                onPointerUp={() => {
                  if (tool === 'erase' && drag) {
                    const x = Math.min(drag.x0, drag.x1);
                    const y = Math.min(drag.y0, drag.y1);
                    const w = Math.abs(drag.x1 - drag.x0);
                    const h = Math.abs(drag.y1 - drag.y0);
                    setDrag(null);
                    if (w > 0.005 && h > 0.005) {
                      setEraseRects((prev) => [
                        ...prev,
                        { id: `erase-${Date.now()}`, pageIndex: preview.pageIndex, x, y, w, h },
                      ]);
                      pushHistory('erase');
                    }
                  }
                }}
                onClick={handleStageClick}
              />
            )}
            <canvas ref={preview.overlayRef} className="absolute inset-0 w-full h-full pointer-events-none" />
          </div>
          <p className="text-[10px] text-slate-400">{t.fontNote}</p>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              className="btn-secondary text-[11px] py-2 px-3 inline-flex items-center gap-1 disabled:opacity-40"
              disabled={history.length === 0}
              onClick={undo}
            >
              <Undo2 size={13} /> {t.undo}
            </button>
            <button
              type="button"
              className="btn-secondary text-[11px] py-2 px-3 inline-flex items-center gap-1 disabled:opacity-40"
              disabled={changeCount === 0}
              onClick={resetEdits}
            >
              <Trash2 size={13} /> {t.reset}
            </button>
            <span className="text-[11px] font-semibold text-slate-500">
              {changeCount} {t.changes}
            </span>
          </div>
          {error && (
            <p role="alert" className="text-xs text-rose-700 font-semibold flex gap-2">
              <AlertCircle size={14} /> {error}
            </p>
          )}
          <button type="button" className="w-full btn-primary py-3.5" disabled={busy || changeCount === 0} onClick={() => void generate()}>
            {t.generate}
          </button>
        </div>
      )}
      {out && (
        <DownloadReady url={out.url} name={out.name} label={t.download} again={t.again} onAgain={startOver} />
      )}
    </SuiteWorkspaceShell>
  );
}
