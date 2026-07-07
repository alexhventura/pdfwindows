import { useEffect, useRef, useState, memo } from 'react';
import { loadPdfJS } from '../utils/pdfjsLoader';
import {
  bakeWatermarkImageForPdf,
  detectContentBoundsFromImageData,
  drawWatermarksOnCanvas,
  watermarkSettingsFromOptions,
  type WatermarkImageSource,
  type NormalizedBounds,
} from '../utils/watermarkEngine';
import type { ConverterState } from '../types';
import { translations } from '../utils/translations';

const PREVIEW_MAX_WIDTH = 520;
const DEBOUNCE_MS = 120;

interface WatermarkPreviewProps {
  file: File;
  options: ConverterState['options'];
  lang: 'pt' | 'en' | 'es';
}

function useDebouncedValue<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = window.setTimeout(() => setDebounced(value), delay);
    return () => window.clearTimeout(id);
  }, [value, delay]);
  return debounced;
}

export const WatermarkPreview = memo(function WatermarkPreview({
  file,
  options,
  lang,
}: WatermarkPreviewProps) {
  const t = translations[lang];
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [pageCount, setPageCount] = useState(1);
  const [pageIndex, setPageIndex] = useState(1);
  const [loading, setLoading] = useState(true);
  const renderToken = useRef(0);

  const settings = watermarkSettingsFromOptions(options);
  const debouncedSettings = useDebouncedValue(settings, DEBOUNCE_MS);
  const debouncedPage = useDebouncedValue(pageIndex, DEBOUNCE_MS);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const pdfjs = await loadPdfJS();
      const data = new Uint8Array(await file.arrayBuffer()).slice();
      const pdf = await pdfjs.getDocument({ data }).promise;
      if (!cancelled) setPageCount(pdf.numPages);
    })().catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, [file]);

  useEffect(() => {
    const token = ++renderToken.current;
    let cancelled = false;

    (async () => {
      setLoading(true);
      const pdfjs = await loadPdfJS();
      const data = new Uint8Array(await file.arrayBuffer()).slice();
      const pdf = await pdfjs.getDocument({ data }).promise;
      const page = await pdf.getPage(Math.min(debouncedPage, pdf.numPages));
      const baseViewport = page.getViewport({ scale: 1 });
      const scale = PREVIEW_MAX_WIDTH / baseViewport.width;
      const viewport = page.getViewport({ scale });

      const offscreen = document.createElement('canvas');
      offscreen.width = viewport.width;
      offscreen.height = viewport.height;
      const baseCtx = offscreen.getContext('2d');
      if (!baseCtx) return;

      await page.render({ canvasContext: baseCtx, viewport, canvas: offscreen }).promise;
      const imageData = baseCtx.getImageData(0, 0, offscreen.width, offscreen.height);
      const detected = detectContentBoundsFromImageData(imageData);

      let imageSource: WatermarkImageSource | null = null;
      if (debouncedSettings.image) {
        const baked = await bakeWatermarkImageForPdf(
          debouncedSettings.image,
          debouncedSettings.scale,
          debouncedSettings.rotation
        );
        const stamp = await createImageBitmap(new Blob([baked.bytes], { type: 'image/png' }));
        imageSource = {
          drawWidth: baked.width,
          drawHeight: baked.height,
          drawOnCanvas(ctx, cx, cy, _rotationDeg, opacity) {
            ctx.save();
            ctx.globalAlpha = opacity;
            ctx.drawImage(stamp, cx - baked.width / 2, cy - baked.height / 2, baked.width, baked.height);
            ctx.restore();
          },
        };
      }

      if (cancelled || token !== renderToken.current) return;

      drawWatermarksOnCanvas(baseCtx, offscreen.width, offscreen.height, debouncedSettings, detected, imageSource);

      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = offscreen.width;
        canvas.height = offscreen.height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(offscreen, 0, 0);
      }

      setLoading(false);
    })().catch(() => {
      if (!cancelled) setLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, [file, debouncedSettings, debouncedPage]);

  const hasWatermark = Boolean(settings.text || settings.image);

  return (
    <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
      <div className="flex items-center justify-between gap-2 px-3 py-2 border-b border-slate-100 bg-slate-50/80">
        <span className="text-[10px] font-extrabold uppercase tracking-wide text-slate-500">{t.watermarkPreviewTitle}</span>
        {pageCount > 1 && (
          <label className="flex items-center gap-1.5 text-[10px] font-semibold text-slate-500">
            {t.watermarkPreviewPage}
            <select
              value={pageIndex}
              onChange={(e) => setPageIndex(Number(e.target.value))}
              className="rounded border border-slate-200 bg-white px-1.5 py-0.5 text-[10px]"
            >
              {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </label>
        )}
      </div>
      <div className="relative bg-slate-100 flex items-center justify-center min-h-[200px] max-h-[min(70vh,520px)] p-3">
        {!hasWatermark && (
          <p className="absolute inset-0 flex items-center justify-center text-[10px] font-semibold text-slate-400 px-4 text-center pointer-events-none">
            {t.watermarkPreviewEmpty}
          </p>
        )}
        {loading && hasWatermark && (
          <p className="absolute text-[10px] font-semibold text-slate-400 animate-pulse">{t.watermarkPreviewLoading}</p>
        )}
        <canvas
          ref={canvasRef}
          className="max-w-full max-h-[min(68vh,500px)] w-auto h-auto object-contain rounded shadow-sm bg-white"
          aria-label={t.watermarkPreviewTitle}
        />
      </div>
      {settings.smartPosition && (
        <p className="px-3 py-1.5 text-[9px] text-slate-400 border-t border-slate-100">{t.watermarkSmartHint}</p>
      )}
    </div>
  );
});
