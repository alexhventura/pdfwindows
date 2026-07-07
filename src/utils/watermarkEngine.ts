export interface NormalizedBounds {
  left: number;
  top: number;
  right: number;
  bottom: number;
}

export interface WatermarkSettings {
  text?: string;
  image?: File | null;
  opacity: number;
  rotation: number;
  scale: number;
  fontSize: number;
  color: string;
  repeat: boolean;
  spacing: number;
  smartPosition: boolean;
}

export const DEFAULT_WATERMARK_SETTINGS: WatermarkSettings = {
  text: '',
  image: null,
  opacity: 0.3,
  rotation: 45,
  scale: 1,
  fontSize: 48,
  color: '#808080',
  repeat: false,
  spacing: 180,
  smartPosition: true,
};

export function watermarkSettingsFromOptions(
  options: Pick<
    import('../types').ConverterState['options'],
    | 'watermarkText'
    | 'watermarkImage'
    | 'watermarkOpacity'
    | 'watermarkRotation'
    | 'watermarkScale'
    | 'watermarkFontSize'
    | 'watermarkColor'
    | 'watermarkRepeat'
    | 'watermarkSpacing'
    | 'watermarkSmartPosition'
  >
): WatermarkSettings {
  return {
    text: options.watermarkText?.trim() || undefined,
    image: options.watermarkImage ?? null,
    opacity: options.watermarkOpacity ?? DEFAULT_WATERMARK_SETTINGS.opacity,
    rotation: options.watermarkRotation ?? DEFAULT_WATERMARK_SETTINGS.rotation,
    scale: options.watermarkScale ?? DEFAULT_WATERMARK_SETTINGS.scale,
    fontSize: options.watermarkFontSize ?? DEFAULT_WATERMARK_SETTINGS.fontSize,
    color: options.watermarkColor ?? DEFAULT_WATERMARK_SETTINGS.color,
    repeat: options.watermarkRepeat ?? DEFAULT_WATERMARK_SETTINGS.repeat,
    spacing: options.watermarkSpacing ?? DEFAULT_WATERMARK_SETTINGS.spacing,
    smartPosition: options.watermarkSmartPosition ?? DEFAULT_WATERMARK_SETTINGS.smartPosition,
  };
}

/** Scan raster pixels and return the bounding box of non-blank content. */
export function detectContentBoundsFromImageData(
  imageData: ImageData,
  luminanceThreshold = 245,
  minCoverage = 0.05
): NormalizedBounds | null {
  const { width, height, data } = imageData;
  let minX = width;
  let minY = height;
  let maxX = 0;
  let maxY = 0;
  let found = false;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      const alpha = data[i + 3];
      if (alpha < 16) continue;
      const lum = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
      if (lum < luminanceThreshold) {
        found = true;
        if (x < minX) minX = x;
        if (y < minY) minY = y;
        if (x > maxX) maxX = x;
        if (y > maxY) maxY = y;
      }
    }
  }

  if (!found) return null;

  const bounds: NormalizedBounds = {
    left: minX / width,
    top: minY / height,
    right: (maxX + 1) / width,
    bottom: (maxY + 1) / height,
  };

  const coverageW = bounds.right - bounds.left;
  const coverageH = bounds.bottom - bounds.top;
  if (coverageW < minCoverage || coverageH < minCoverage) return null;

  return bounds;
}

export function getNormalizedAnchor(
  bounds: NormalizedBounds | null,
  smartPosition: boolean
): { nx: number; ny: number } {
  if (smartPosition && bounds) {
    return {
      nx: (bounds.left + bounds.right) / 2,
      ny: (bounds.top + bounds.bottom) / 2,
    };
  }
  return { nx: 0.5, ny: 0.5 };
}

export function normalizedToCanvas(nx: number, ny: number, width: number, height: number) {
  return { x: nx * width, y: ny * height };
}

/** PDF user space: origin bottom-left. */
export function normalizedToPdf(nx: number, ny: number, width: number, height: number) {
  return { x: nx * width, y: (1 - ny) * height };
}

function repeatAnchors(
  bounds: NormalizedBounds | null,
  smartPosition: boolean,
  repeat: boolean,
  spacingPx: number,
  width: number,
  height: number
): Array<{ nx: number; ny: number }> {
  const primary = getNormalizedAnchor(bounds, smartPosition);
  if (!repeat) return [primary];

  const region = smartPosition && bounds ? bounds : { left: 0.1, top: 0.1, right: 0.9, bottom: 0.9 };
  const regionW = (region.right - region.left) * width;
  const regionH = (region.bottom - region.top) * height;
  const cols = Math.max(1, Math.floor(regionW / spacingPx));
  const rows = Math.max(1, Math.floor(regionH / spacingPx));
  const anchors: Array<{ nx: number; ny: number }> = [];

  for (let row = 0; row <= rows; row++) {
    for (let col = 0; col <= cols; col++) {
      const nx = region.left + ((col + 0.5) / (cols + 1)) * (region.right - region.left);
      const ny = region.top + ((row + 0.5) / (rows + 1)) * (region.bottom - region.top);
      anchors.push({ nx, ny });
    }
  }

  return anchors;
}

export interface WatermarkImageSource {
  drawWidth: number;
  drawHeight: number;
  drawOnCanvas: (ctx: CanvasRenderingContext2D, cx: number, cy: number, rotationDeg: number, opacity: number) => void;
}

export async function loadWatermarkImageSource(
  file: File,
  scale: number
): Promise<WatermarkImageSource> {
  const url = URL.createObjectURL(file);
  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const el = new Image();
      el.onload = () => resolve(el);
      el.onerror = () => reject(new Error('Watermark image failed to load'));
      el.src = url;
    });

    const drawWidth = img.naturalWidth * scale * 0.5;
    const drawHeight = img.naturalHeight * scale * 0.5;

    return {
      drawWidth,
      drawHeight,
      drawOnCanvas(ctx, cx, cy, rotationDeg, opacity) {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate((rotationDeg * Math.PI) / 180);
        ctx.globalAlpha = opacity;
        ctx.drawImage(img, -drawWidth / 2, -drawHeight / 2, drawWidth, drawHeight);
        ctx.restore();
      },
    };
  } finally {
    URL.revokeObjectURL(url);
  }
}

export function drawTextWatermarkOnCanvas(
  ctx: CanvasRenderingContext2D,
  text: string,
  cx: number,
  cy: number,
  settings: WatermarkSettings
) {
  const size = settings.fontSize * settings.scale;
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate((settings.rotation * Math.PI) / 180);
  ctx.globalAlpha = settings.opacity;
  ctx.fillStyle = settings.color;
  ctx.font = `600 ${size}px Inter, system-ui, sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, 0, 0);
  ctx.restore();
}

export function drawWatermarksOnCanvas(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  settings: WatermarkSettings,
  bounds: NormalizedBounds | null,
  imageSource?: WatermarkImageSource | null
) {
  if (!settings.text && !imageSource) return;

  const anchors = repeatAnchors(
    bounds,
    settings.smartPosition,
    settings.repeat,
    settings.spacing,
    width,
    height
  );

  for (const { nx, ny } of anchors) {
    const { x, y } = normalizedToCanvas(nx, ny, width, height);
    if (settings.text) {
      drawTextWatermarkOnCanvas(ctx, settings.text, x, y, settings);
    }
    if (imageSource) {
      imageSource.drawOnCanvas(ctx, x, y, settings.rotation, settings.opacity);
    }
  }
}

export async function bakeTextWatermarkForPdf(
  text: string,
  settings: WatermarkSettings
): Promise<{ bytes: Uint8Array; width: number; height: number }> {
  const size = settings.fontSize * settings.scale;

  const measure = document.createElement('canvas');
  const mctx = measure.getContext('2d');
  if (!mctx) throw new Error('Canvas unavailable');
  mctx.font = `600 ${size}px Inter, system-ui, sans-serif`;
  const textWidth = mctx.measureText(text).width;
  const textHeight = size * 1.2;

  const rad = (settings.rotation * Math.PI) / 180;
  const cos = Math.abs(Math.cos(rad));
  const sin = Math.abs(Math.sin(rad));
  const boxW = textWidth * cos + textHeight * sin;
  const boxH = textWidth * sin + textHeight * cos;
  const pad = Math.ceil(size * 0.25);

  const canvas = document.createElement('canvas');
  canvas.width = Math.ceil(boxW + pad * 2);
  canvas.height = Math.ceil(boxH + pad * 2);
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas unavailable');

  drawTextWatermarkOnCanvas(ctx, text, canvas.width / 2, canvas.height / 2, {
    ...settings,
    opacity: 1,
  });

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('Text bake failed'))), 'image/png');
  });

  return {
    bytes: new Uint8Array(await blob.arrayBuffer()),
    width: canvas.width,
    height: canvas.height,
  };
}

export interface WatermarkStamp {
  pdfImage: unknown;
  drawWidth: number;
  drawHeight: number;
}

type PdfLibPage = {
  getSize: () => { width: number; height: number };
  drawImage: (image: unknown, opts: Record<string, unknown>) => void;
};

export async function applyWatermarksToPdfPage(
  page: PdfLibPage,
  settings: WatermarkSettings,
  bounds: NormalizedBounds | null,
  stamps: WatermarkStamp[]
) {
  if (stamps.length === 0) return;

  const { width, height } = page.getSize();

  const anchors = repeatAnchors(
    bounds,
    settings.smartPosition,
    settings.repeat,
    settings.spacing,
    width,
    height
  );

  for (const { nx, ny } of anchors) {
    const { x, y } = normalizedToPdf(nx, ny, width, height);

    for (const stamp of stamps) {
      page.drawImage(stamp.pdfImage, {
        x: x - stamp.drawWidth / 2,
        y: y - stamp.drawHeight / 2,
        width: stamp.drawWidth,
        height: stamp.drawHeight,
        opacity: settings.opacity,
      });
    }
  }
}

export async function bakeWatermarkImageForPdf(
  file: File,
  scale: number,
  rotation: number
): Promise<{ bytes: Uint8Array; width: number; height: number }> {
  const source = await loadWatermarkImageSource(file, scale);
  const pad = Math.ceil(Math.max(source.drawWidth, source.drawHeight) * 0.2);
  const canvas = document.createElement('canvas');
  canvas.width = Math.ceil(source.drawWidth + pad * 2);
  canvas.height = Math.ceil(source.drawHeight + pad * 2);
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas unavailable');
  source.drawOnCanvas(ctx, canvas.width / 2, canvas.height / 2, rotation, 1);

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('Bake failed'))), 'image/png');
  });

  return {
    bytes: new Uint8Array(await blob.arrayBuffer()),
    width: canvas.width,
    height: canvas.height,
  };
}
