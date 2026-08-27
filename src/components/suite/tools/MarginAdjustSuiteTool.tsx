import { useCallback, useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react';
import { Download } from 'lucide-react';
import type { LanguageType } from '../../../types';
import {
  defaultSheetCorners,
  warpPerspective,
  type Point,
  type Quad,
  type Raster,
} from '../../../engines/perspectiveCrop';
import {
  DocumentToolDropzone,
  ToolBusyState,
  SuiteWorkspaceShell,
  SUITE_UPLOAD_SUBTITLE,
} from '../DocumentToolDropzone';

const HANDLE_COLORS = ['#ea580c', '#2563eb', '#0f766e', '#7c3aed'];
const MAX_BYTES = 40 * 1024 * 1024;

const copy: Record<LanguageType, Record<string, string>> = {
  pt: {
    title: 'Ajuste de Margem',
    dropTitle: 'Solte a foto da folha aqui',
    orText: 'ou',
    browse: 'Escolher imagem',
    formats: 'JPG • PNG • WEBP',
    dropActive: 'Solte a imagem aqui',
    invalidFile: 'Envie uma imagem JPG, PNG ou WEBP.',
    emptyFile: 'O arquivo está vazio.',
    tooLarge: 'Arquivo acima do limite de 40 MB.',
    hint: 'Alinhe o centro de cada cruz com o canto da folha. O que ficar fora do quadrilátero será cortado.',
    crop: 'Cortar folha',
    opening: 'Abrindo imagem…',
    cropping: 'Alinhando a página…',
    result: 'Página alinhada',
    downloadPng: 'Baixar PNG',
    downloadJpg: 'Baixar JPG',
    adjustAgain: 'Ajustar pontas',
    another: 'Outra foto',
    decodeError: 'Não foi possível abrir esta imagem.',
    warpError: 'Não foi possível cortar. Reposicione as pontas e tente de novo.',
    privacy: 'Processamento 100% local no navegador. Sua foto não é enviada a servidores.',
    corner: 'Canto',
  },
  en: {
    title: 'Margin Adjust',
    dropTitle: 'Drop the photo of the sheet here',
    orText: 'or',
    browse: 'Choose image',
    formats: 'JPG • PNG • WEBP',
    dropActive: 'Drop the image here',
    invalidFile: 'Please upload a JPG, PNG, or WEBP image.',
    emptyFile: 'The file is empty.',
    tooLarge: 'File exceeds the 40 MB limit.',
    hint: 'Line up the center of each cross with a sheet corner. Everything outside the quadrilateral is cropped away.',
    crop: 'Crop sheet',
    opening: 'Opening image…',
    cropping: 'Straightening the page…',
    result: 'Aligned page',
    downloadPng: 'Download PNG',
    downloadJpg: 'Download JPG',
    adjustAgain: 'Adjust corners',
    another: 'Another photo',
    decodeError: 'Could not open this image.',
    warpError: 'Could not crop. Reposition the corners and try again.',
    privacy: '100% local processing in your browser. Your photo is never uploaded.',
    corner: 'Corner',
  },
  es: {
    title: 'Ajuste de Margen',
    dropTitle: 'Suelte la foto de la hoja aquí',
    orText: 'o',
    browse: 'Elegir imagen',
    formats: 'JPG • PNG • WEBP',
    dropActive: 'Suelte la imagen aquí',
    invalidFile: 'Envíe una imagen JPG, PNG o WEBP.',
    emptyFile: 'El archivo está vacío.',
    tooLarge: 'Archivo por encima del límite de 40 MB.',
    hint: 'Alinee el centro de cada cruz con la esquina de la hoja. Lo que quede fuera del cuadrilátero se recorta.',
    crop: 'Recortar hoja',
    opening: 'Abriendo imagen…',
    cropping: 'Alineando la página…',
    result: 'Página alineada',
    downloadPng: 'Descargar PNG',
    downloadJpg: 'Descargar JPG',
    adjustAgain: 'Ajustar puntas',
    another: 'Otra foto',
    decodeError: 'No se pudo abrir esta imagen.',
    warpError: 'No se pudo recortar. Reposicione las puntas e inténtelo de nuevo.',
    privacy: 'Procesamiento 100% local en el navegador. Su foto no se envía a servidores.',
    corner: 'Esquina',
  },
};

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function contentBox(img: HTMLImageElement) {
  const rect = img.getBoundingClientRect();
  const nw = img.naturalWidth || 1;
  const nh = img.naturalHeight || 1;
  const scale = Math.min(rect.width / nw, rect.height / nh);
  const width = nw * scale;
  const height = nh * scale;
  return {
    left: rect.left + (rect.width - width) / 2,
    top: rect.top + (rect.height - height) / 2,
    width,
    height,
  };
}

async function fileToRaster(file: File): Promise<{ raster: Raster; previewUrl: string }> {
  const bitmap = await createImageBitmap(file);
  const canvas = document.createElement('canvas');
  canvas.width = bitmap.width;
  canvas.height = bitmap.height;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) {
    bitmap.close();
    throw new Error('canvas');
  }
  ctx.drawImage(bitmap, 0, 0);
  bitmap.close();
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((next) => (next ? resolve(next) : reject(new Error('blob'))), 'image/jpeg', 0.92);
  });
  return {
    raster: { data: imageData.data, width: imageData.width, height: imageData.height },
    previewUrl: URL.createObjectURL(blob),
  };
}

function rasterToBlob(raster: Raster, type: 'image/png' | 'image/jpeg', quality?: number): Promise<Blob> {
  const canvas = document.createElement('canvas');
  canvas.width = raster.width;
  canvas.height = raster.height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return Promise.reject(new Error('canvas'));
  ctx.putImageData(
    new ImageData(new Uint8ClampedArray(raster.data), raster.width, raster.height),
    0,
    0
  );
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error('blob'))), type, quality);
  });
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1500);
}

function stem(name: string) {
  return name.replace(/\.[^.]+$/, '') || 'folha';
}

function CrosshairArms() {
  return (
    <>
      <line x1="28" y1="3" x2="28" y2="19" />
      <line x1="28" y1="37" x2="28" y2="53" />
      <line x1="3" y1="28" x2="19" y2="28" />
      <line x1="37" y1="28" x2="53" y2="28" />
    </>
  );
}

/** Open translucent crosshair — the paper corner stays visible at the intersection. */
function CornerCrosshair({
  x,
  y,
  color,
  label,
  active,
  onPointerDown,
}: {
  x: number;
  y: number;
  color: string;
  label: string;
  active: boolean;
  onPointerDown: (e: ReactPointerEvent<HTMLButtonElement>) => void;
  key?: string | number;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      className="absolute z-10 h-14 w-14 -translate-x-1/2 -translate-y-1/2 touch-none bg-transparent p-0 cursor-grab active:cursor-grabbing focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-sky-500"
      style={{ left: x, top: y }}
      onPointerDown={onPointerDown}
    >
      <svg viewBox="0 0 56 56" className="h-full w-full overflow-visible pointer-events-none" aria-hidden>
        <g stroke="#fff" strokeWidth="3.25" strokeLinecap="round" opacity="0.42">
          <CrosshairArms />
        </g>
        <g stroke={color} strokeWidth="1.65" strokeLinecap="round" opacity={active ? 0.92 : 0.68}>
          <CrosshairArms />
        </g>
      </svg>
    </button>
  );
}

export default function MarginAdjustSuiteTool({
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
  const imgRef = useRef<HTMLImageElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const dragIndex = useRef<number | null>(null);
  const previewUrlRef = useRef<string | null>(null);
  const rasterRef = useRef<Raster | null>(null);

  const [fileName, setFileName] = useState<string | null>(null);
  const [raster, setRaster] = useState<Raster | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [corners, setCorners] = useState<Quad | null>(null);
  const [handles, setHandles] = useState<Point[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [activeHandle, setActiveHandle] = useState<number | null>(null);
  const resultRaster = useRef<Raster | null>(null);
  rasterRef.current = raster;

  const revokePreview = () => {
    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
      previewUrlRef.current = null;
    }
  };

  const resetPhoto = () => {
    revokePreview();
    if (resultUrl) URL.revokeObjectURL(resultUrl);
    setFileName(null);
    setRaster(null);
    setPreviewUrl(null);
    setCorners(null);
    setHandles([]);
    setBusy(false);
    setError(null);
    setResultUrl(null);
    resultRaster.current = null;
  };

  useEffect(() => () => {
    revokePreview();
  }, []);

  useEffect(() => {
    return () => {
      if (resultUrl) URL.revokeObjectURL(resultUrl);
    };
  }, [resultUrl]);

  const syncHandles = useCallback(() => {
    const img = imgRef.current;
    const stage = stageRef.current;
    if (!img || !stage || !corners || !raster) return;
    const box = contentBox(img);
    const stageBox = stage.getBoundingClientRect();
    setHandles(
      corners.map((corner) => ({
        x: box.left - stageBox.left + (corner.x / raster.width) * box.width,
        y: box.top - stageBox.top + (corner.y / raster.height) * box.height,
      }))
    );
  }, [corners, raster]);

  useEffect(() => {
    syncHandles();
    window.addEventListener('resize', syncHandles);
    return () => window.removeEventListener('resize', syncHandles);
  }, [syncHandles]);

  const onFile = async (file: File) => {
    setError(null);
    setBusy(true);
    try {
      const decoded = await fileToRaster(file);
      revokePreview();
      if (resultUrl) URL.revokeObjectURL(resultUrl);
      previewUrlRef.current = decoded.previewUrl;
      setFileName(file.name);
      setRaster(decoded.raster);
      setPreviewUrl(decoded.previewUrl);
      setCorners(defaultSheetCorners(decoded.raster.width, decoded.raster.height));
      setResultUrl(null);
      resultRaster.current = null;
    } catch {
      setError(t.decodeError);
    } finally {
      setBusy(false);
    }
  };

  const moveCorner = (index: number, clientX: number, clientY: number) => {
    const img = imgRef.current;
    const current = rasterRef.current;
    if (!img || !current) return;
    const box = contentBox(img);
    if (box.width < 1 || box.height < 1) return;
    const x = ((clientX - box.left) / box.width) * current.width;
    const y = ((clientY - box.top) / box.height) * current.height;
    setCorners((prev) => {
      if (!prev) return prev;
      const next: Quad = [prev[0], prev[1], prev[2], prev[3]];
      next[index] = {
        x: clamp(x, 0, current.width),
        y: clamp(y, 0, current.height),
      };
      return next;
    });
  };

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (dragIndex.current == null) return;
      e.preventDefault();
      moveCorner(dragIndex.current, e.clientX, e.clientY);
    };
    const onUp = () => {
      dragIndex.current = null;
      setActiveHandle(null);
    };
    window.addEventListener('pointermove', onMove, { passive: false });
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
    };
  }, []);

  const crop = async () => {
    if (!raster || !corners) return;
    setBusy(true);
    setError(null);
    await new Promise((resolve) => window.setTimeout(resolve, 40));
    try {
      const warped = warpPerspective(raster, corners);
      if (!warped) {
        setError(t.warpError);
        return;
      }
      resultRaster.current = warped;
      const blob = await rasterToBlob(warped, 'image/jpeg', 0.92);
      if (resultUrl) URL.revokeObjectURL(resultUrl);
      setResultUrl(URL.createObjectURL(blob));
    } catch {
      setError(t.warpError);
    } finally {
      setBusy(false);
    }
  };

  const download = async (type: 'image/png' | 'image/jpeg') => {
    const out = resultRaster.current;
    if (!out) return;
    const blob = await rasterToBlob(out, type, type === 'image/jpeg' ? 0.92 : undefined);
    const ext = type === 'image/png' ? 'png' : 'jpg';
    downloadBlob(blob, `${stem(fileName || 'folha')}-ajustada.${ext}`);
  };

  const polygon = handles.map((p) => `${p.x},${p.y}`).join(' ');

  return (
    <SuiteWorkspaceShell
      title={t.title}
      subtitle={SUITE_UPLOAD_SUBTITLE[lang]}
      showHeader={showHeader}
      onClose={onClose}
      closeLabel={closeLabel}
    >
      <div className="space-y-6">
        {!previewUrl && !busy && (
          <DocumentToolDropzone
            lang={lang}
            accept="image"
            maxBytes={MAX_BYTES}
            onFile={onFile}
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

        {busy && !previewUrl && <ToolBusyState label={t.opening} />}

        {error && (
          <div role="alert" className="bg-rose-50 border border-rose-100 text-rose-700 rounded-xl px-4 py-3 text-xs font-semibold">
            {error}
          </div>
        )}

        {previewUrl && !resultUrl && corners && (
          <div className="space-y-4">
            {fileName && <p className="text-[11px] font-semibold text-slate-400 truncate">{fileName}</p>}
            <p className="text-sm text-slate-600 font-medium text-center">{t.hint}</p>
            <div ref={stageRef} className="relative mx-auto w-full select-none touch-none">
              <img
                ref={imgRef}
                src={previewUrl}
                alt=""
                className="w-full h-auto max-h-[min(70vh,720px)] object-contain rounded-xl bg-slate-100"
                onLoad={syncHandles}
                draggable={false}
              />
              {handles.length === 4 && (
                <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden>
                  <polygon
                    points={polygon}
                    fill="rgba(37, 99, 235, 0.06)"
                    stroke="#ea580c"
                    strokeWidth="1.5"
                    strokeOpacity="0.7"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
              {handles.map((handle, index) => (
                <CornerCrosshair
                  key={index}
                  x={handle.x}
                  y={handle.y}
                  color={HANDLE_COLORS[index]}
                  label={`${t.corner} ${index + 1}`}
                  active={activeHandle === index}
                  onPointerDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    e.currentTarget.setPointerCapture(e.pointerId);
                    dragIndex.current = index;
                    setActiveHandle(index);
                  }}
                />
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <button type="button" onClick={crop} disabled={busy} className="flex-1 btn-primary py-3.5 font-semibold disabled:opacity-60">
                {busy ? t.cropping : t.crop}
              </button>
              <button type="button" onClick={resetPhoto} disabled={busy} className="sm:w-auto btn-secondary py-3 px-5 font-semibold disabled:opacity-60">
                {t.another}
              </button>
            </div>
          </div>
        )}

        {resultUrl && !busy && (
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-800 text-center">{t.result}</h3>
            <img src={resultUrl} alt={t.result} className="mx-auto max-h-[min(70vh,720px)] w-auto max-w-full rounded-xl shadow-md bg-white" />
            <div className="flex flex-col sm:flex-row gap-2">
              <button type="button" onClick={() => download('image/jpeg')} className="flex-1 btn-primary py-3.5 font-semibold inline-flex items-center justify-center gap-2">
                <Download size={16} /> {t.downloadJpg}
              </button>
              <button type="button" onClick={() => download('image/png')} className="flex-1 btn-secondary py-3.5 font-semibold">
                {t.downloadPng}
              </button>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <button
                type="button"
                onClick={() => {
                  if (resultUrl) URL.revokeObjectURL(resultUrl);
                  setResultUrl(null);
                  resultRaster.current = null;
                }}
                className="flex-1 btn-secondary py-3 font-semibold"
              >
                {t.adjustAgain}
              </button>
              <button type="button" onClick={resetPhoto} className="flex-1 btn-secondary py-3 font-semibold">
                {t.another}
              </button>
            </div>
          </div>
        )}

        <p className="text-[10px] font-semibold text-emerald-700/80 text-center">{t.privacy}</p>
      </div>
    </SuiteWorkspaceShell>
  );
}
