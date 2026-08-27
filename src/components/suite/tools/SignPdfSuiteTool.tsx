import { useCallback, useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react';
import { Download, RefreshCw, AlertCircle, Eraser, Trash2, ChevronLeft, ChevronRight, PenLine } from 'lucide-react';
import type { PDFDocumentProxy } from 'pdfjs-dist';
import type { LanguageType } from '../../../types';
import { inputClass } from '../shared';
import {
  applySignatureStamps,
  canvasToPngBytes,
  composeSignatureStamp,
  formatStampDate,
  placementFromPointer,
  signatureMetaLines,
  todayIsoDate,
  type SignaturePlacement,
} from '../../../engines/signPdf';
import { loadPdfJS } from '../../../utils/pdfjsLoader';
import {
  DocumentToolDropzone,
  ToolBusyState,
  SuiteWorkspaceShell,
  SUITE_UPLOAD_SUBTITLE,
} from '../DocumentToolDropzone';

type Point = { x: number; y: number };
type Stroke = { color: string; width: number; points: Point[] };

const PEN_COLORS = ['#0f172a', '#1d4ed8'] as const;
const PAD_HEIGHT = 176;

const copy: Record<LanguageType, Record<string, string>> = {
  pt: {
    title: 'Assinatura PDF',
    dropTitle: 'Solte o PDF aqui',
    orText: 'ou',
    browse: 'Escolher arquivo',
    formats: 'PDF',
    dropActive: 'Solte o PDF aqui',
    invalidFile: 'Envie um arquivo PDF válido.',
    emptyFile: 'O arquivo está vazio.',
    tooLarge: 'Arquivo acima do limite de 100 MB.',
    padHint: 'Escreva a assinatura neste campo com o mouse ou o dedo.',
    includeName: 'Incluir nome',
    includeLocation: 'Incluir local',
    includeDate: 'Incluir data',
    namePh: 'Nome completo',
    locationPh: 'Cidade, estado',
    dateLabel: 'Data',
    clearPad: 'Limpar traço',
    undoStroke: 'Desfazer traço',
    color: 'Cor da caneta',
    loading: 'Abrindo PDF…',
    applying: 'Aplicando assinatura…',
    placeHint: 'Clique para soltar o campo, ou arraste para dimensionar. A mesma assinatura pode ir em várias páginas.',
    pageOf: 'Página {page} de {total}',
    undoPlace: 'Desfazer campo',
    clearPage: 'Limpar página',
    fields: '{n} campos',
    apply: 'Assinar PDF',
    downloadPng: 'Baixar assinatura em PNG',
    success: 'PDF assinado pronto',
    download: 'Baixar PDF assinado',
    again: 'Outra assinatura',
    needInk: 'Escreva a assinatura no campo antes de continuar.',
    needPlace: 'Clique ou arraste na página para posicionar o campo de assinatura.',
    corrupt: 'Não foi possível ler este PDF. Se estiver protegido, use Desbloquear PDF.',
    privacy: 'Processamento local. Isto é um carimbo visual da sua escrita — não é certificado digital (ICP-Brasil).',
    addPdf: 'Colocar a assinatura em um PDF',
    preview: 'Prévia do campo',
  },
  en: {
    title: 'Sign PDF',
    dropTitle: 'Drop the PDF here',
    orText: 'or',
    browse: 'Choose file',
    formats: 'PDF',
    dropActive: 'Drop the PDF here',
    invalidFile: 'Please upload a valid PDF file.',
    emptyFile: 'The file is empty.',
    tooLarge: 'File exceeds the 100 MB limit.',
    padHint: 'Write your signature in this field with the mouse or your finger.',
    includeName: 'Include name',
    includeLocation: 'Include location',
    includeDate: 'Include date',
    namePh: 'Full name',
    locationPh: 'City, region',
    dateLabel: 'Date',
    clearPad: 'Clear ink',
    undoStroke: 'Undo stroke',
    color: 'Pen color',
    loading: 'Opening PDF…',
    applying: 'Applying signature…',
    placeHint: 'Click to drop the field, or drag to size it. The same signature can go on several pages.',
    pageOf: 'Page {page} of {total}',
    undoPlace: 'Undo field',
    clearPage: 'Clear page',
    fields: '{n} fields',
    apply: 'Sign PDF',
    downloadPng: 'Download signature PNG',
    success: 'Signed PDF ready',
    download: 'Download signed PDF',
    again: 'Another signature',
    needInk: 'Write the signature in the field before continuing.',
    needPlace: 'Click or drag on the page to place the signature field.',
    corrupt: 'Could not read this PDF. If it is locked, use Unlock PDF first.',
    privacy: 'Local processing. This is a visual stamp of your handwriting — not a digital certificate.',
    addPdf: 'Place the signature on a PDF',
    preview: 'Field preview',
  },
  es: {
    title: 'Firma PDF',
    dropTitle: 'Suelte el PDF aquí',
    orText: 'o',
    browse: 'Elegir archivo',
    formats: 'PDF',
    dropActive: 'Suelte el PDF aquí',
    invalidFile: 'Envíe un archivo PDF válido.',
    emptyFile: 'El archivo está vacío.',
    tooLarge: 'El archivo supera el límite de 100 MB.',
    padHint: 'Escriba la firma en este campo con el ratón o el dedo.',
    includeName: 'Incluir nombre',
    includeLocation: 'Incluir lugar',
    includeDate: 'Incluir fecha',
    namePh: 'Nombre completo',
    locationPh: 'Ciudad, región',
    dateLabel: 'Fecha',
    clearPad: 'Borrar trazo',
    undoStroke: 'Deshacer trazo',
    color: 'Color de la pluma',
    loading: 'Abriendo PDF…',
    applying: 'Aplicando firma…',
    placeHint: 'Haga clic para soltar el campo, o arrastre para dimensionarlo. La misma firma puede ir en varias páginas.',
    pageOf: 'Página {page} de {total}',
    undoPlace: 'Deshacer campo',
    clearPage: 'Limpiar página',
    fields: '{n} campos',
    apply: 'Firmar PDF',
    downloadPng: 'Descargar firma en PNG',
    success: 'PDF firmado listo',
    download: 'Descargar PDF firmado',
    again: 'Otra firma',
    needInk: 'Escriba la firma en el campo antes de continuar.',
    needPlace: 'Haga clic o arrastre en la página para colocar el campo de firma.',
    corrupt: 'No se pudo leer este PDF. Si está protegido, use Desbloquear PDF.',
    privacy: 'Procesamiento local. Es un sello visual de su escritura — no es un certificado digital.',
    addPdf: 'Colocar la firma en un PDF',
    preview: 'Vista previa del campo',
  },
};

const META_LABELS: Record<LanguageType, { name: string; location: string; date: string }> = {
  pt: { name: 'Nome', location: 'Local', date: 'Data' },
  en: { name: 'Name', location: 'Location', date: 'Date' },
  es: { name: 'Nombre', location: 'Lugar', date: 'Fecha' },
};

function drawStrokes(ctx: CanvasRenderingContext2D, strokes: Stroke[], scale: number) {
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  for (const stroke of strokes) {
    if (stroke.points.length === 0) continue;
    ctx.strokeStyle = stroke.color;
    ctx.lineWidth = stroke.width * scale;
    ctx.beginPath();
    ctx.moveTo(stroke.points[0].x * scale, stroke.points[0].y * scale);
    for (let i = 1; i < stroke.points.length; i++) {
      ctx.lineTo(stroke.points[i].x * scale, stroke.points[i].y * scale);
    }
    if (stroke.points.length === 1) {
      ctx.lineTo(stroke.points[0].x * scale + 0.1, stroke.points[0].y * scale);
    }
    ctx.stroke();
  }
}

function strokesToInkCanvas(strokes: Stroke[], cssW: number, cssH: number, scale = 2): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = Math.max(1, Math.round(cssW * scale));
  canvas.height = Math.max(1, Math.round(cssH * scale));
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('CANVAS');
  drawStrokes(ctx, strokes, scale);
  return canvas;
}

function triggerDownload(url: string, name: string) {
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  a.rel = 'noopener';
  document.body.appendChild(a);
  a.click();
  a.remove();
}

export default function SignPdfSuiteTool({
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
  const padRef = useRef<HTMLCanvasElement>(null);
  const pageRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLCanvasElement>(null);
  const stampRef = useRef<HTMLCanvasElement | null>(null);
  const drawingRef = useRef(false);
  const dragRef = useRef<{ x0: number; y0: number; x1: number; y1: number } | null>(null);

  const [busy, setBusy] = useState<'load' | 'apply' | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [pageIndex, setPageIndex] = useState(0);
  const [placements, setPlacements] = useState<SignaturePlacement[]>([]);
  const [drag, setDrag] = useState<{ x0: number; y0: number; x1: number; y1: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [outputName, setOutputName] = useState<string | null>(null);
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [pen, setPen] = useState<(typeof PEN_COLORS)[number]>(PEN_COLORS[0]);
  const [includeName, setIncludeName] = useState(true);
  const [includeLocation, setIncludeLocation] = useState(true);
  const [includeDate, setIncludeDate] = useState(true);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [dateIso, setDateIso] = useState(todayIsoDate);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const pdfRef = useRef<PDFDocumentProxy | null>(null);

  const hasInk = strokes.some((stroke) => stroke.points.length > 0);
  const metaLines = signatureMetaLines(
    {
      name,
      location,
      date: formatStampDate(dateIso, lang),
      includeName,
      includeLocation,
      includeDate,
    },
    META_LABELS[lang]
  );

  const paintPad = useCallback(() => {
    const canvas = padRef.current;
    if (!canvas) return;
    const wrap = canvas.parentElement;
    const cssW = Math.max(240, wrap?.clientWidth || 480);
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = Math.round(cssW * dpr);
    canvas.height = Math.round(PAD_HEIGHT * dpr);
    canvas.style.width = `${cssW}px`;
    canvas.style.height = `${PAD_HEIGHT}px`;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawStrokes(ctx, strokes, dpr);
  }, [strokes]);

  useEffect(() => {
    paintPad();
  }, [paintPad]);

  useEffect(() => {
    const wrap = padRef.current?.parentElement;
    if (!wrap || typeof ResizeObserver === 'undefined') return;
    const observer = new ResizeObserver(() => paintPad());
    observer.observe(wrap);
    return () => observer.disconnect();
  }, [paintPad]);

  const buildStamp = useCallback((): HTMLCanvasElement => {
    const canvas = padRef.current;
    const cssW = canvas ? parseFloat(canvas.style.width) || canvas.clientWidth : 480;
    const ink = strokesToInkCanvas(strokes, cssW, PAD_HEIGHT, 2);
    return composeSignatureStamp(ink, metaLines);
  }, [metaLines, strokes]);

  useEffect(() => {
    if (!hasInk) {
      stampRef.current = null;
      setPreviewUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return null;
      });
      return;
    }
    try {
      const stamp = buildStamp();
      stampRef.current = stamp;
      stamp.toBlob((blob) => {
        if (!blob) return;
        setPreviewUrl((prev) => {
          if (prev) URL.revokeObjectURL(prev);
          return URL.createObjectURL(blob);
        });
      }, 'image/png');
    } catch {
      stampRef.current = null;
    }
  }, [buildStamp, hasInk]);

  const startOver = async () => {
    if (outputUrl) URL.revokeObjectURL(outputUrl);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    await pdfRef.current?.destroy?.();
    pdfRef.current = null;
    stampRef.current = null;
    setFile(null);
    setPageCount(0);
    setPageIndex(0);
    setPlacements([]);
    setDrag(null);
    setError(null);
    setOutputUrl(null);
    setOutputName(null);
    setBusy(null);
    setStrokes([]);
    setName('');
    setLocation('');
    setDateIso(todayIsoDate());
    setIncludeName(true);
    setIncludeLocation(true);
    setIncludeDate(true);
    setPreviewUrl(null);
  };

  useEffect(() => {
    return () => {
      if (outputUrl) URL.revokeObjectURL(outputUrl);
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      void pdfRef.current?.destroy?.();
    };
  }, []);

  const paintPage = async (index: number) => {
    const pdf = pdfRef.current;
    const canvas = pageRef.current;
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

  const drawOverlay = (index: number, draft = drag) => {
    const overlay = overlayRef.current;
    if (!overlay) return;
    const ctx = overlay.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, overlay.width, overlay.height);

    const drawBox = (x: number, y: number, w: number, h: number) => {
      const stamp = stampRef.current;
      if (stamp) {
        ctx.drawImage(stamp, x, y, w, h);
      } else {
        ctx.fillStyle = 'rgba(255,255,255,0.86)';
        ctx.fillRect(x, y, w, h);
      }
      ctx.strokeStyle = '#2563eb';
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 4]);
      ctx.strokeRect(x + 1, y + 1, Math.max(1, w - 2), Math.max(1, h - 2));
      ctx.setLineDash([]);
    };

    for (const item of placements.filter((p) => p.pageIndex === index)) {
      drawBox(item.x * overlay.width, item.y * overlay.height, item.w * overlay.width, item.h * overlay.height);
    }
    if (draft) {
      const aspect = stampRef.current ? stampRef.current.width / stampRef.current.height : 2.2;
      const next = placementFromPointer(draft.x0, draft.y0, draft.x1, draft.y1, overlay.width, overlay.height, index, aspect);
      drawBox(next.x * overlay.width, next.y * overlay.height, next.w * overlay.width, next.h * overlay.height);
    }
  };

  useEffect(() => {
    if (!file || !pdfRef.current || outputUrl || busy) return;
    void paintPage(pageIndex);
  }, [pageIndex, file, placements, outputUrl, busy, previewUrl]);

  useEffect(() => {
    drawOverlay(pageIndex, drag);
  }, [drag, pageIndex, placements, previewUrl]);

  const loadFile = async (next: File) => {
    setError(null);
    if (outputUrl) URL.revokeObjectURL(outputUrl);
    await pdfRef.current?.destroy?.();
    pdfRef.current = null;
    setOutputUrl(null);
    setOutputName(null);
    setPlacements([]);
    setDrag(null);
    setBusy('load');
    setFile(next);
    try {
      const pdfjs = await loadPdfJS();
      const buf = await next.arrayBuffer();
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

  const padPos = (e: ReactPointerEvent<HTMLCanvasElement>) => {
    const canvas = padRef.current!;
    const rect = canvas.getBoundingClientRect();
    return {
      x: ((e.clientX - rect.left) / rect.width) * (parseFloat(canvas.style.width) || rect.width),
      y: ((e.clientY - rect.top) / rect.height) * PAD_HEIGHT,
    };
  };

  const onPadDown = (e: ReactPointerEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    drawingRef.current = true;
    const p = padPos(e);
    setStrokes((prev) => [...prev, { color: pen, width: 2.4, points: [p] }]);
  };

  const onPadMove = (e: ReactPointerEvent<HTMLCanvasElement>) => {
    if (!drawingRef.current) return;
    const p = padPos(e);
    setStrokes((prev) => {
      if (prev.length === 0) return prev;
      const copyStrokes = prev.slice();
      const last = copyStrokes[copyStrokes.length - 1];
      copyStrokes[copyStrokes.length - 1] = { ...last, points: [...last.points, p] };
      return copyStrokes;
    });
  };

  const onPadUp = () => {
    drawingRef.current = false;
  };

  const overlayPos = (e: ReactPointerEvent<HTMLCanvasElement>) => {
    const canvas = overlayRef.current!;
    const rect = canvas.getBoundingClientRect();
    return {
      x: ((e.clientX - rect.left) / rect.width) * canvas.width,
      y: ((e.clientY - rect.top) / rect.height) * canvas.height,
    };
  };

  const onPlaceDown = (e: ReactPointerEvent<HTMLCanvasElement>) => {
    if (!hasInk) {
      setError(t.needInk);
      return;
    }
    e.currentTarget.setPointerCapture(e.pointerId);
    const p = overlayPos(e);
    const next = { x0: p.x, y0: p.y, x1: p.x, y1: p.y };
    dragRef.current = next;
    setDrag(next);
  };

  const onPlaceMove = (e: ReactPointerEvent<HTMLCanvasElement>) => {
    if (!dragRef.current) return;
    const p = overlayPos(e);
    const next = { ...dragRef.current, x1: p.x, y1: p.y };
    dragRef.current = next;
    setDrag(next);
  };

  const onPlaceUp = () => {
    const draft = dragRef.current;
    const overlay = overlayRef.current;
    dragRef.current = null;
    setDrag(null);
    if (!draft || !overlay) return;
    const aspect = stampRef.current ? stampRef.current.width / stampRef.current.height : 2.2;
    const placed = placementFromPointer(
      draft.x0,
      draft.y0,
      draft.x1,
      draft.y1,
      overlay.width,
      overlay.height,
      pageIndex,
      aspect
    );
    setPlacements((prev) => [...prev, placed]);
    setError(null);
  };

  const apply = async () => {
    if (!file) return;
    if (!hasInk) {
      setError(t.needInk);
      return;
    }
    if (placements.length < 1) {
      setError(t.needPlace);
      return;
    }
    setBusy('apply');
    setError(null);
    try {
      const stamp = buildStamp();
      const png = await canvasToPngBytes(stamp);
      const res = await applySignatureStamps(file, png, placements);
      if (outputUrl) URL.revokeObjectURL(outputUrl);
      setOutputUrl(URL.createObjectURL(res.blob));
      setOutputName(res.fileName);
    } catch {
      setError(t.corrupt);
    } finally {
      setBusy(null);
    }
  };

  const downloadPng = async () => {
    if (!hasInk) {
      setError(t.needInk);
      return;
    }
    try {
      const stamp = buildStamp();
      const png = await canvasToPngBytes(stamp);
      const blob = new Blob([png], { type: 'image/png' });
      const url = URL.createObjectURL(blob);
      triggerDownload(url, 'assinatura.png');
      setTimeout(() => URL.revokeObjectURL(url), 2000);
      setError(null);
    } catch {
      setError(t.needInk);
    }
  };

  const downloadPdf = () => {
    if (!outputUrl || !outputName) return;
    triggerDownload(outputUrl, outputName);
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
        {busy && <ToolBusyState label={busy === 'load' ? t.loading : t.applying} />}

        {error && !busy && (
          <div
            role="alert"
            className="bg-rose-50 border border-rose-100 text-rose-700 rounded-xl px-4 py-3 text-xs font-semibold flex items-start gap-2"
          >
            <AlertCircle size={14} className="mt-0.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {!outputUrl && !busy && (
          <div className="space-y-4">
            <p className="text-[11px] font-semibold text-slate-500">{t.padHint}</p>
            <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
              <canvas
                ref={padRef}
                className="block w-full touch-none cursor-crosshair"
                style={{ height: PAD_HEIGHT }}
                onPointerDown={onPadDown}
                onPointerMove={onPadMove}
                onPointerUp={onPadUp}
                onPointerCancel={onPadUp}
              />
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">{t.color}</span>
              {PEN_COLORS.map((color) => (
                <button
                  key={color}
                  type="button"
                  aria-label={t.color}
                  aria-pressed={pen === color}
                  className={`h-7 w-7 rounded-full border ${
                    pen === color ? 'ring-2 ring-win-blue ring-offset-2 border-slate-700' : 'border-slate-200'
                  }`}
                  style={{ background: color }}
                  onClick={() => setPen(color)}
                />
              ))}
              <button
                type="button"
                className="btn-secondary text-[11px] py-2 px-3 disabled:opacity-40 inline-flex items-center gap-1"
                disabled={strokes.length === 0}
                onClick={() => setStrokes((prev) => prev.slice(0, -1))}
              >
                <Eraser size={12} /> {t.undoStroke}
              </button>
              <button
                type="button"
                className="btn-secondary text-[11px] py-2 px-3 disabled:opacity-40 inline-flex items-center gap-1"
                disabled={strokes.length === 0}
                onClick={() => setStrokes([])}
              >
                <Trash2 size={12} /> {t.clearPad}
              </button>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <label className="flex flex-col gap-1.5 text-[11px] font-semibold text-slate-600">
                <span className="inline-flex items-center gap-2">
                  <input type="checkbox" checked={includeName} onChange={(e) => setIncludeName(e.target.checked)} />
                  {t.includeName}
                </span>
                <input
                  className={inputClass}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t.namePh}
                  disabled={!includeName}
                />
              </label>
              <label className="flex flex-col gap-1.5 text-[11px] font-semibold text-slate-600">
                <span className="inline-flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={includeLocation}
                    onChange={(e) => setIncludeLocation(e.target.checked)}
                  />
                  {t.includeLocation}
                </span>
                <input
                  className={inputClass}
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder={t.locationPh}
                  disabled={!includeLocation}
                />
              </label>
              <label className="flex flex-col gap-1.5 text-[11px] font-semibold text-slate-600">
                <span className="inline-flex items-center gap-2">
                  <input type="checkbox" checked={includeDate} onChange={(e) => setIncludeDate(e.target.checked)} />
                  {t.includeDate}
                </span>
                <input
                  type="date"
                  className={inputClass}
                  value={dateIso}
                  onChange={(e) => setDateIso(e.target.value)}
                  disabled={!includeDate}
                  aria-label={t.dateLabel}
                />
              </label>
            </div>

            {previewUrl ? (
              <div className="rounded-xl border border-slate-100 bg-slate-50 px-3 py-3">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400 mb-2">{t.preview}</p>
                <img src={previewUrl} alt="" className="max-h-28 mx-auto object-contain" />
              </div>
            ) : null}

            <button
              type="button"
              className="w-full btn-secondary py-3 inline-flex items-center justify-center gap-2"
              onClick={() => void downloadPng()}
            >
              <Download size={15} /> {t.downloadPng}
            </button>
          </div>
        )}

        {!file && !busy && !outputUrl && (
          <div className="space-y-2">
            <p className="text-[11px] font-semibold text-slate-500">{t.addPdf}</p>
            <DocumentToolDropzone
              lang={lang}
              accept="pdf"
              onFile={(next) => void loadFile(next)}
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
          </div>
        )}

        {file && pageCount > 0 && !outputUrl && !busy && (
          <div className="space-y-4">
            <p className="text-[11px] font-semibold text-slate-500">{t.placeHint}</p>
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
              <canvas ref={pageRef} className="block w-full h-auto" />
              <canvas
                ref={overlayRef}
                className="absolute inset-0 w-full h-full cursor-crosshair"
                onPointerDown={onPlaceDown}
                onPointerMove={onPlaceMove}
                onPointerUp={onPlaceUp}
                onPointerCancel={() => {
                  dragRef.current = null;
                  setDrag(null);
                }}
              />
            </div>

            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-[11px] font-semibold text-slate-400">
                {t.fields.replace('{n}', String(placements.length))}
              </span>
              <button
                type="button"
                className="btn-secondary text-[11px] py-2 px-3 disabled:opacity-40 inline-flex items-center gap-1"
                disabled={placements.length === 0}
                onClick={() => setPlacements((prev) => prev.slice(0, -1))}
              >
                <Eraser size={12} /> {t.undoPlace}
              </button>
              <button
                type="button"
                className="btn-secondary text-[11px] py-2 px-3 disabled:opacity-40 inline-flex items-center gap-1"
                disabled={!placements.some((p) => p.pageIndex === pageIndex)}
                onClick={() => setPlacements((prev) => prev.filter((p) => p.pageIndex !== pageIndex))}
              >
                <Trash2 size={12} /> {t.clearPage}
              </button>
            </div>

            <button type="button" className="w-full btn-primary py-3.5 inline-flex items-center justify-center gap-2" onClick={() => void apply()}>
              <PenLine size={16} /> {t.apply}
            </button>
          </div>
        )}

        {outputUrl && (
          <div className="space-y-4 text-center py-4">
            <h3 className="text-base font-semibold text-slate-900">{t.success}</h3>
            <button
              type="button"
              onClick={downloadPdf}
              className="w-full btn-primary py-3.5 flex items-center justify-center gap-2"
            >
              <Download size={16} /> {t.download}
            </button>
            {outputName ? <p className="text-[10px] font-semibold text-slate-400 truncate">{outputName}</p> : null}
            <button
              type="button"
              onClick={() => void startOver()}
              className="text-xs font-semibold text-win-blue flex items-center justify-center gap-1.5 mx-auto"
            >
              <RefreshCw size={12} /> {t.again}
            </button>
          </div>
        )}

        {!outputUrl && !busy && (hasInk || file) && (
          <button type="button" onClick={() => void startOver()} className="w-full text-xs font-semibold text-slate-500">
            {t.again}
          </button>
        )}
        <p className="text-[10px] font-semibold text-emerald-700/80 text-center">{t.privacy}</p>
      </div>
    </SuiteWorkspaceShell>
  );
}
