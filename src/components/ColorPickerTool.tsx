import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import {
  Copy,
  Check,
  Droplet,
  ImagePlus,
  Trash2,
  Monitor,
  Download,
  Pipette,
  X,
} from 'lucide-react';
import type { LanguageType } from '../types';
import {
  colorEntryFromRgb,
  hexToRgb,
  rgbToCss,
  rgbToHex,
  rgbToHsl,
  type RgbColor,
} from '../utils/colorFormat';
import { extractDominantColors } from '../utils/dominantColors';
import { isEyeDropperSupported, openEyeDropper } from '../utils/eyeDropper';

const HISTORY_KEY = 'pdfwindows-color-history';
const MAX_HISTORY = 12;
/** Cap canvas size to avoid main-thread freezes on large photos / screenshots */
const MAX_CANVAS_DIM = 1920;
const EYEDROPPER_TIMEOUT_MS = 45_000;

type CaptureMode = 'image' | 'screen';

interface ColorHistoryEntry {
  hex: string;
  rgb: string;
  hsl: string;
}

const copyT: Record<LanguageType, Record<string, string>> = {
  pt: {
    title: 'Capturador de Cores',
    hero: 'Extraia códigos de cores de imagens ou da sua tela em tempo real.',
    modeImage: 'Capturar da Imagem',
    modeScreen: 'Capturar da Tela',
    upload: 'Enviar imagem',
    uploadHint: 'Arraste uma imagem ou clique para selecionar — PNG, JPG ou WebP.',
    dropActive: 'Solte a imagem aqui',
    replace: 'Trocar imagem',
    closeImage: 'Fechar imagem',
    pickHint: 'Clique na imagem para capturar a cor do pixel.',
    screenTitle: 'Conta-gotas da tela',
    screenHint:
      'Use o conta-gotas do navegador para capturar qualquer pixel visível — inclusive fora desta página.',
    screenBtn: 'Capturar Cor da Tela',
    screenPicking: 'Selecione um pixel na tela…',
    screenUnsupported:
      'Seu navegador não suporta captura global de cores. Use Chrome ou Edge no desktop, ou capture pela imagem.',
    hex: 'HEX',
    rgb: 'RGB',
    hsl: 'HSL',
    copyHex: 'Copiar HEX',
    copyRgb: 'Copiar RGB',
    copied: 'Copiado!',
    history: 'Cores recentes',
    palette: 'Cores dominantes',
    exportPalette: 'Exportar paleta',
    clearHistory: 'Limpar',
    close: 'Fechar',
    offline: '100% local • sem upload • sem servidor',
  },
  en: {
    title: 'Color Picker',
    hero: 'Extract color codes from images or your screen in real time.',
    modeImage: 'From Image',
    modeScreen: 'From Screen',
    upload: 'Upload image',
    uploadHint: 'Drag an image here or click to browse — PNG, JPG, or WebP.',
    dropActive: 'Drop image here',
    replace: 'Replace image',
    closeImage: 'Close image',
    pickHint: 'Click on the image to capture the pixel color.',
    screenTitle: 'Screen eyedropper',
    screenHint:
      'Use the browser eyedropper to capture any visible pixel — even outside this page.',
    screenBtn: 'Pick Color from Screen',
    screenPicking: 'Pick a pixel on your screen…',
    screenUnsupported:
      'Your browser does not support global color picking. Use Chrome or Edge on desktop, or pick from an image.',
    hex: 'HEX',
    rgb: 'RGB',
    hsl: 'HSL',
    copyHex: 'Copy HEX',
    copyRgb: 'Copy RGB',
    copied: 'Copied!',
    history: 'Recent colors',
    palette: 'Dominant colors',
    exportPalette: 'Export palette',
    clearHistory: 'Clear',
    close: 'Close',
    offline: '100% local • no upload • no server',
  },
  es: {
    title: 'Capturador de Colores',
    hero: 'Extrae códigos de color de imágenes o de tu pantalla en tiempo real.',
    modeImage: 'Desde Imagen',
    modeScreen: 'Desde Pantalla',
    upload: 'Subir imagen',
    uploadHint: 'Arrastra una imagen o haz clic — PNG, JPG o WebP.',
    dropActive: 'Suelta la imagen aquí',
    replace: 'Cambiar imagen',
    closeImage: 'Cerrar imagen',
    pickHint: 'Haz clic en la imagen para capturar el color del píxel.',
    screenTitle: 'Cuentagotas de pantalla',
    screenHint:
      'Usa el cuentagotas del navegador para capturar cualquier píxel visible, incluso fuera de esta página.',
    screenBtn: 'Capturar Color de Pantalla',
    screenPicking: 'Selecciona un píxel en la pantalla…',
    screenUnsupported:
      'Tu navegador no admite captura global de colores. Usa Chrome o Edge en escritorio, o captura desde la imagen.',
    hex: 'HEX',
    rgb: 'RGB',
    hsl: 'HSL',
    copyHex: 'Copiar HEX',
    copyRgb: 'Copiar RGB',
    copied: '¡Copiado!',
    history: 'Colores recientes',
    palette: 'Colores dominantes',
    exportPalette: 'Exportar paleta',
    clearHistory: 'Limpiar',
    close: 'Cerrar',
    offline: '100% local • sin subida • sin servidor',
  },
};

function loadHistory(): ColorHistoryEntry[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as ColorHistoryEntry[];
    return Array.isArray(parsed) ? parsed.slice(0, MAX_HISTORY) : [];
  } catch {
    return [];
  }
}

function saveHistory(entries: ColorHistoryEntry[]) {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(entries.slice(0, MAX_HISTORY)));
}

function ColorResultPanel({
  t,
  color,
  copiedKey,
  onCopy,
}: {
  t: Record<string, string>;
  color: RgbColor;
  copiedKey: 'hex' | 'rgb' | null;
  onCopy: (key: 'hex' | 'rgb', value: string) => void;
}) {
  const hex = rgbToHex(color);
  const rgb = rgbToCss(color);
  const hsl = rgbToHsl(color);

  return (
    <div className="color-picker-result glass-card p-5 md:p-6">
      <div className="grid grid-cols-1 md:grid-cols-[minmax(0,140px)_1fr] gap-5 items-center">
        <div
          className="color-picker-swatch-large mx-auto w-full max-w-[140px] aspect-square rounded-2xl"
          style={{ backgroundColor: hex }}
        />
        <div className="space-y-4 min-w-0">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div className="color-picker-code-row">
              <span className="color-picker-code-label">{t.hex}</span>
              <code className="color-picker-code-value">{hex}</code>
            </div>
            <div className="color-picker-code-row">
              <span className="color-picker-code-label">{t.rgb}</span>
              <code className="color-picker-code-value">{rgb}</code>
            </div>
            <div className="color-picker-code-row">
              <span className="color-picker-code-label">{t.hsl}</span>
              <code className="color-picker-code-value text-[10px]">{hsl}</code>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <button type="button" className="color-picker-copy-btn" onClick={() => onCopy('hex', hex)}>
              {copiedKey === 'hex' ? <Check size={14} /> : <Copy size={14} />}
              {copiedKey === 'hex' ? t.copied : t.copyHex}
            </button>
            <button type="button" className="color-picker-copy-btn" onClick={() => onCopy('rgb', rgb)}>
              {copiedKey === 'rgb' ? <Check size={14} /> : <Copy size={14} />}
              {copiedKey === 'rgb' ? t.copied : t.copyRgb}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export const ColorPickerTool: React.FC<{
  lang: LanguageType;
  onClose?: () => void;
  showHeader?: boolean;
}> = ({ lang, onClose, showHeader = false }) => {
  const t = copyT[lang];
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  const eyeDropperOk = useMemo(() => isEyeDropperSupported(), []);

  const [mode, setMode] = useState<CaptureMode>('image');
  const [hasImage, setHasImage] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [color, setColor] = useState<RgbColor | null>(null);
  const [marker, setMarker] = useState<{ x: number; y: number } | null>(null);
  const [dominant, setDominant] = useState<RgbColor[]>([]);
  const [history, setHistory] = useState<ColorHistoryEntry[]>(loadHistory);
  const [copiedKey, setCopiedKey] = useState<'hex' | 'rgb' | null>(null);
  const [screenLoading, setScreenLoading] = useState(false);
  const screenPickAbortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    setHistory(loadHistory());
    return () => {
      screenPickAbortRef.current?.abort();
    };
  }, []);

  const applyColor = useCallback((picked: RgbColor, clearMarker = false) => {
    setColor(picked);
    if (clearMarker) setMarker(null);
    const entry = colorEntryFromRgb(picked);
    setHistory((prev) => {
      const next = [entry, ...prev.filter((e) => e.hex !== entry.hex)].slice(0, MAX_HISTORY);
      saveHistory(next);
      return next;
    });
  }, []);

  /** Pinta no canvas — só chamar quando o elemento canvas já está no DOM. */
  const paintImageToCanvas = useCallback((img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas || img.naturalWidth < 1 || img.naturalHeight < 1) return false;

    let w = img.naturalWidth;
    let h = img.naturalHeight;
    const scale = Math.min(1, MAX_CANVAS_DIM / Math.max(w, h));
    w = Math.round(w * scale);
    h = Math.round(h * scale);

    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return false;

    ctx.clearRect(0, 0, w, h);
    ctx.drawImage(img, 0, 0, w, h);
    setColor(null);
    setMarker(null);
    // Defer palette extraction so paint stays responsive on large images
    window.setTimeout(() => {
      const live = canvasRef.current;
      if (!live || live.width !== w || live.height !== h) return;
      setDominant(extractDominantColors(live, 5));
    }, 0);
    return true;
  }, []);

  /** Após hasImage=true o canvas monta; useLayoutEffect garante drawImage após o commit. */
  useLayoutEffect(() => {
    if (!hasImage) return;
    const img = imageRef.current;
    if (!img) return;
    paintImageToCanvas(img);
  }, [hasImage, paintImageToCanvas]);

  const clearImage = useCallback(() => {
    imageRef.current = null;
    setHasImage(false);
    setColor(null);
    setMarker(null);
    setDominant([]);
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
      canvas.width = 0;
      canvas.height = 0;
    }
  }, []);

  const handleFile = (file: File | undefined) => {
    if (!file || !file.type.startsWith('image/')) return;
    setMode('image');

    const url = URL.createObjectURL(file);
    const img = new Image();

    const finish = () => {
      URL.revokeObjectURL(url);
    };

    img.onload = () => {
      imageRef.current = img;
      if (canvasRef.current) {
        paintImageToCanvas(img);
        setHasImage(true);
      } else {
        setHasImage(true);
      }
      finish();
    };

    img.onerror = finish;
    img.src = url;
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || !hasImage) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = Math.floor((e.clientX - rect.left) * scaleX);
    const y = Math.floor((e.clientY - rect.top) * scaleY);

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const data = ctx.getImageData(x, y, 1, 1).data;
    const picked: RgbColor = { r: data[0], g: data[1], b: data[2] };
    applyColor(picked);
    setMarker({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const copyValue = async (key: 'hex' | 'rgb', value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedKey(key);
      window.setTimeout(() => setCopiedKey(null), 1600);
    } catch {
      /* ignore */
    }
  };

  const applyHistoryColor = (entry: ColorHistoryEntry) => {
    const m = entry.rgb.match(/(\d+)/g);
    if (!m || m.length < 3) return;
    applyColor({ r: Number(m[0]), g: Number(m[1]), b: Number(m[2]) }, true);
  };

  const pickFromScreen = async () => {
    if (!eyeDropperOk || screenLoading) return;
    screenPickAbortRef.current?.abort();
    const abort = new AbortController();
    screenPickAbortRef.current = abort;
    setScreenLoading(true);
    try {
      const result = await Promise.race([
        openEyeDropper(abort.signal),
        new Promise<never>((_, reject) => {
          window.setTimeout(() => {
            abort.abort();
            reject(new Error('EYEDROPPER_TIMEOUT'));
          }, EYEDROPPER_TIMEOUT_MS);
        }),
      ]);
      const picked = hexToRgb(result.sRGBHex);
      if ([picked.r, picked.g, picked.b].some((n) => Number.isNaN(n))) {
        throw new Error('INVALID_COLOR');
      }
      applyColor(picked, true);
      setMode('screen');
    } catch (err) {
      if (err instanceof Error && err.message !== 'EYEDROPPER_TIMEOUT' && err.message !== 'INVALID_COLOR') {
        /* user cancelled — ignore */
      }
    } finally {
      if (screenPickAbortRef.current === abort) {
        screenPickAbortRef.current = null;
      }
      setScreenLoading(false);
    }
  };

  const exportPaletteFile = (colors: RgbColor[]) => {
    if (colors.length === 0) return;
    const body = colors.map((c) => `${rgbToHex(c)} — ${rgbToCss(c)} — ${rgbToHsl(c)}`).join('\n');
    const blob = new Blob([body], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `paleta-pdfwindows-${new Date().toISOString().slice(0, 10)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const hex = color ? rgbToHex(color) : '';

  return (
    <div className="color-picker-root">
      <div className="color-picker-hero">
        {showHeader && onClose ? (
          <div className="flex items-start justify-between gap-3 mb-4">
            <div className="flex items-center gap-3 min-w-0">
              <span className="color-picker-hero-icon">
                <Droplet size={20} />
              </span>
              <div className="min-w-0">
                <h3 className="text-base font-semibold text-slate-900">{t.title}</h3>
                <p className="text-xs text-slate-500 font-medium mt-0.5">{t.hero}</p>
              </div>
            </div>
            <button type="button" onClick={onClose} className="color-picker-close-btn">
              {t.close}
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-3 mb-2">
              <span className="color-picker-hero-icon">
                <Droplet size={20} />
              </span>
              <h3 className="text-base md:text-lg font-semibold text-slate-900">{t.title}</h3>
            </div>
            <p className="text-xs md:text-sm text-slate-500 font-medium max-w-xl">{t.hero}</p>
          </>
        )}
        <p className="text-[10px] text-slate-400 font-semibold mt-3 tracking-wide">{t.offline}</p>
      </div>

      <div className="color-picker-mode-tabs" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={mode === 'image'}
          className={`color-picker-mode-tab ${mode === 'image' ? 'color-picker-mode-tab--active' : ''}`}
          onClick={() => setMode('image')}
        >
          <ImagePlus size={16} />
          {t.modeImage}
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={mode === 'screen'}
          className={`color-picker-mode-tab ${mode === 'screen' ? 'color-picker-mode-tab--active' : ''}`}
          onClick={() => setMode('screen')}
        >
          <Monitor size={16} />
          {t.modeScreen}
        </button>
      </div>

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          handleFile(e.target.files?.[0]);
          e.target.value = '';
        }}
      />

      <div className="color-picker-body p-4 md:p-6 space-y-5">
        {mode === 'image' && (
          <>
            {!hasImage ? (
              <div
                className={`premium-dropzone w-full py-16 md:py-24 flex flex-col items-center gap-3 cursor-pointer ${
                  dragOver ? 'upload-zone-active' : ''
                }`}
                onClick={() => fileRef.current?.click()}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragOver(false);
                  handleFile(e.dataTransfer.files?.[0]);
                }}
                onKeyDown={(e) => e.key === 'Enter' && fileRef.current?.click()}
                role="button"
                tabIndex={0}
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/15 to-orange-400/15 flex items-center justify-center text-blue-600 shadow-inner">
                  <ImagePlus size={32} />
                </div>
                <span className="text-sm font-semibold text-slate-800">
                  {dragOver ? t.dropActive : t.upload}
                </span>
                <span className="text-[11px] text-slate-500 max-w-sm text-center px-4">{t.uploadHint}</span>
              </div>
            ) : (
              <>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <button
                    type="button"
                    className="text-xs font-bold text-win-blue hover:underline"
                    onClick={() => fileRef.current?.click()}
                  >
                    {t.replace}
                  </button>
                  <span className="text-[10px] text-slate-400 font-medium">{t.pickHint}</span>
                </div>

                <div className="color-picker-stage checkerboard">
                  <button
                    type="button"
                    className="color-picker-close-image-float"
                    onClick={clearImage}
                    aria-label={t.closeImage}
                  >
                    <X size={14} />
                    <span className="hidden sm:inline">{t.closeImage}</span>
                  </button>
                  <canvas
                    ref={canvasRef}
                    className="color-picker-canvas"
                    onClick={handleCanvasClick}
                    role="img"
                    aria-label={t.title}
                  />
                  {marker && (
                    <span
                      className="color-picker-marker"
                      style={{ left: marker.x, top: marker.y, backgroundColor: hex }}
                    />
                  )}
                </div>

                {dominant.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                        {t.palette}
                      </p>
                      <button
                        type="button"
                        className="text-[10px] font-bold text-win-blue hover:underline flex items-center gap-1"
                        onClick={() => exportPaletteFile(dominant)}
                      >
                        <Download size={12} /> {t.exportPalette}
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {dominant.map((c) => {
                        const h = rgbToHex(c);
                        return (
                          <button
                            key={h}
                            type="button"
                            className="color-picker-swatch color-picker-swatch--palette"
                            style={{ backgroundColor: h }}
                            title={h}
                            onClick={() => applyColor(c, true)}
                          />
                        );
                      })}
                    </div>
                  </div>
                )}
              </>
            )}
          </>
        )}

        {mode === 'screen' && (
          <div className="color-picker-screen-panel glass-card p-6 md:p-10 text-center space-y-5">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-blue-500/15 to-orange-400/20 flex items-center justify-center text-blue-600">
              <Pipette size={32} />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-slate-900 mb-1">{t.screenTitle}</h4>
              <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">{t.screenHint}</p>
            </div>

            {eyeDropperOk ? (
              <button
                type="button"
                className="btn-primary px-8 py-3.5 text-sm inline-flex items-center gap-2 mx-auto"
                onClick={pickFromScreen}
                disabled={screenLoading}
              >
                <Monitor size={18} />
                {screenLoading ? t.screenPicking : t.screenBtn}
              </button>
            ) : (
              <p className="text-xs text-amber-800/90 bg-amber-50 border border-amber-200/80 rounded-xl px-4 py-3 max-w-md mx-auto font-medium">
                {t.screenUnsupported}
              </p>
            )}
          </div>
        )}

        {color && (
          <ColorResultPanel t={t} color={color} copiedKey={copiedKey} onCopy={copyValue} />
        )}

        {history.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">{t.history}</p>
              <button
                type="button"
                className="text-[10px] font-bold text-slate-400 hover:text-rose-500 flex items-center gap-1"
                onClick={() => {
                  saveHistory([]);
                  setHistory([]);
                }}
              >
                <Trash2 size={12} /> {t.clearHistory}
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {history.map((entry) => (
                <button
                  key={entry.hex}
                  type="button"
                  className="color-picker-swatch"
                  style={{ backgroundColor: entry.hex }}
                  title={`${entry.hex} — ${entry.rgb}`}
                  onClick={() => applyHistoryColor(entry)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
