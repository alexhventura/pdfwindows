import { useCallback, useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react';
import { AlertCircle, Camera, ChevronLeft, ChevronRight, Download, RefreshCw, Trash2 } from 'lucide-react';
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
import { sanitizePdfText } from '../../../utils/pdfTextSanitizer';

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

export function EditPdfSuiteTool({ lang, onClose, showHeader }: Props) {
  const preview = usePdfPreview();
  const [file, setFile] = useState<File | null>(null);
  const [mode, setMode] = useState<'text' | 'rect' | 'image'>('text');
  const [ops, setOps] = useState<PdfEditOp[]>([]);
  const [text, setText] = useState('');
  const [busy, setBusy] = useState(false);
  const imageBytes = useRef<Uint8Array | null>(null);
  const [out, setOut] = useState<{ url: string; name: string } | null>(null);

  useEffect(() => {
    if (file && preview.pageCount) void preview.paint();
  }, [file, preview.pageCount, preview.pageIndex, ops]);

  useEffect(() => {
    const overlay = preview.overlayRef.current;
    if (!overlay || overlay.width < 2) return;
    const ctx = overlay.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, overlay.width, overlay.height);
    ctx.strokeStyle = '#2563eb';
    for (const op of ops.filter((item) => item.pageIndex === preview.pageIndex)) {
      ctx.strokeRect(op.x * overlay.width, op.y * overlay.height, op.w * overlay.width, op.h * overlay.height);
      if (op.kind === 'text' && op.text) {
        ctx.fillStyle = '#0f172a';
        ctx.font = '12px sans-serif';
        ctx.fillText(op.text, op.x * overlay.width + 4, op.y * overlay.height + 14);
      }
    }
  }, [ops, preview.pageIndex, preview.paintTick]);

  const modeLabel = (id: 'text' | 'rect' | 'image') => {
    if (lang === 'pt') return id === 'text' ? 'Texto' : id === 'rect' ? 'Retângulo' : 'Imagem';
    if (lang === 'es') return id === 'text' ? 'Texto' : id === 'rect' ? 'Rectángulo' : 'Imagen';
    return id === 'text' ? 'Text' : id === 'rect' ? 'Rectangle' : 'Image';
  };

  return (
    <SuiteWorkspaceShell
      title={lang === 'pt' ? 'Editar PDF' : lang === 'es' ? 'Editar PDF' : 'Edit PDF'}
      subtitle={SUITE_UPLOAD_SUBTITLE[lang]}
      showHeader={showHeader}
      onClose={onClose}
      closeLabel={closeLbl(lang)}
    >
      {!file && <DocumentToolDropzone lang={lang} accept="pdf" onFile={(f) => { setFile(f); void preview.load(f); }} labels={pdfDropLabels(lang, 'PDF')} />}
      {file && !out && (
        <div className="space-y-3">
          <p className="text-[11px] text-slate-500">
            {lang === 'pt'
              ? 'Adiciona texto, retângulo ou imagem por cima. Não edita o texto original da página.'
              : 'Adds text, a rectangle, or an image on top. It does not edit the original page text.'}
          </p>
          <div className="flex flex-wrap gap-2">
            {(['text', 'rect', 'image'] as const).map((id) => (
              <button
                key={id}
                type="button"
                className={`btn-secondary py-2 px-3 text-[11px] ${mode === id ? 'ring-2 ring-win-blue' : ''}`}
                onClick={() => setMode(id)}
              >
                {modeLabel(id)}
              </button>
            ))}
          </div>
          {mode === 'text' && (
            <input
              className={inputClass}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={lang === 'pt' ? 'Texto a inserir' : 'Text to stamp'}
            />
          )}
          {mode === 'image' && (
            <input
              type="file"
              accept="image/png,image/jpeg"
              onChange={async (e) => {
                const img = e.target.files?.[0];
                if (!img) return;
                imageBytes.current = new Uint8Array(await img.arrayBuffer());
              }}
            />
          )}
          {preview.pageCount > 0 && (
            <PageNav
              pageIndex={preview.pageIndex}
              pageCount={preview.pageCount}
              onPrev={() => preview.setPageIndex((i) => i - 1)}
              onNext={() => preview.setPageIndex((i) => i + 1)}
            />
          )}
          <div className="relative mx-auto max-w-[720px] border rounded-xl overflow-hidden">
            <canvas ref={preview.pageRef} className="block w-full" />
            <canvas
              ref={preview.overlayRef}
              className="absolute inset-0 w-full h-full cursor-crosshair"
              onClick={(e) => {
                const c = preview.overlayRef.current;
                if (!c) return;
                const b = c.getBoundingClientRect();
                const x = (e.clientX - b.left) / b.width;
                const y = (e.clientY - b.top) / b.height;
                const op: PdfEditOp = {
                  kind: mode,
                  pageIndex: preview.pageIndex,
                  x: Math.max(0, x - 0.12),
                  y: Math.max(0, y - 0.03),
                  w: mode === 'rect' ? 0.24 : 0.28,
                  h: mode === 'text' ? 0.06 : 0.16,
                  text: sanitizePdfText(text),
                  png: mode === 'image' ? imageBytes.current || undefined : undefined,
                };
                setOps((prev) => [...prev, op]);
              }}
            />
          </div>
          <button type="button" className="btn-secondary text-[11px]" onClick={() => setOps((prev) => prev.slice(0, -1))}>
            {lang === 'pt' ? 'Desfazer' : 'Undo'}
          </button>
          <button
            type="button"
            className="w-full btn-primary py-3.5"
            disabled={busy || ops.length === 0}
            onClick={async () => {
              if (!file) return;
              setBusy(true);
              try {
                const res = await applyPdfEdits(file, ops);
                if (out) URL.revokeObjectURL(out.url);
                setOut({ url: URL.createObjectURL(res.blob), name: res.fileName });
              } finally {
                setBusy(false);
              }
            }}
          >
            {lang === 'pt' ? 'Gerar PDF editado' : 'Generate edited PDF'}
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
            setOps([]);
          }}
        />
      )}
    </SuiteWorkspaceShell>
  );
}
