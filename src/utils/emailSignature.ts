/**
 * Email signature generator — 100% client-side.
 *
 * The signature is built as a single SVG string that is used BOTH for the live
 * preview (rendered inline) and for raster export (drawn onto a canvas). This
 * guarantees the downloaded image is visually identical to the preview.
 *
 * No network, no storage — user data and images live only in memory.
 */

export type SignatureTemplateId = 'classic' | 'corporate' | 'spotlight' | 'modern';
export type SignatureExportFormat = 'png' | 'jpeg' | 'webp';

export interface SignatureData {
  name: string;
  role: string;
  company: string;
  phone: string;
  whatsapp: string;
  email: string;
  website: string;
  customText: string;
  photo?: string; // data URL
  logo?: string; // data URL
}

export interface SignatureAppearance {
  background: string; // hex, used when not transparent
  backgroundTransparent: boolean;
  accentColor: string; // hex
  template: SignatureTemplateId;
}

export interface BackgroundSwatch {
  id: string;
  label: { pt: string; en: string; es: string };
  value: string; // hex or 'transparent'
}

export const BACKGROUND_SWATCHES: BackgroundSwatch[] = [
  { id: 'transparent', label: { pt: 'Transparente', en: 'Transparent', es: 'Transparente' }, value: 'transparent' },
  { id: 'white', label: { pt: 'Branco', en: 'White', es: 'Blanco' }, value: '#ffffff' },
  { id: 'black', label: { pt: 'Preto', en: 'Black', es: 'Negro' }, value: '#111827' },
  { id: 'gray', label: { pt: 'Cinza', en: 'Gray', es: 'Gris' }, value: '#6b7280' },
  { id: 'lightgray', label: { pt: 'Cinza-claro', en: 'Light gray', es: 'Gris claro' }, value: '#f3f4f6' },
  { id: 'blue', label: { pt: 'Azul', en: 'Blue', es: 'Azul' }, value: '#2563eb' },
  { id: 'navy', label: { pt: 'Azul-marinho', en: 'Navy', es: 'Azul marino' }, value: '#1e293b' },
  { id: 'lightblue', label: { pt: 'Azul-claro', en: 'Light blue', es: 'Azul claro' }, value: '#e0f2fe' },
  { id: 'green', label: { pt: 'Verde', en: 'Green', es: 'Verde' }, value: '#16a34a' },
  { id: 'darkgreen', label: { pt: 'Verde-escuro', en: 'Dark green', es: 'Verde oscuro' }, value: '#14532d' },
  { id: 'red', label: { pt: 'Vermelho', en: 'Red', es: 'Rojo' }, value: '#dc2626' },
  { id: 'orange', label: { pt: 'Laranja', en: 'Orange', es: 'Naranja' }, value: '#ea580c' },
  { id: 'yellow', label: { pt: 'Amarelo', en: 'Yellow', es: 'Amarillo' }, value: '#facc15' },
  { id: 'purple', label: { pt: 'Roxo', en: 'Purple', es: 'Morado' }, value: '#7c3aed' },
  { id: 'pink', label: { pt: 'Rosa', en: 'Pink', es: 'Rosa' }, value: '#db2777' },
  { id: 'brown', label: { pt: 'Marrom', en: 'Brown', es: 'Marrón' }, value: '#78350f' },
];

export const ACCENT_SWATCHES: string[] = [
  '#2563eb',
  '#1e293b',
  '#0ea5e9',
  '#16a34a',
  '#dc2626',
  '#ea580c',
  '#facc15',
  '#7c3aed',
  '#db2777',
  '#0f766e',
  '#64748b',
  '#111827',
];

export const SIGNATURE_TEMPLATES: Array<{
  id: SignatureTemplateId;
  label: { pt: string; en: string; es: string };
}> = [
  { id: 'classic', label: { pt: 'Clássico', en: 'Classic', es: 'Clásico' } },
  { id: 'corporate', label: { pt: 'Corporativo', en: 'Corporate', es: 'Corporativo' } },
  { id: 'spotlight', label: { pt: 'Foto em destaque', en: 'Photo spotlight', es: 'Foto destacada' } },
  { id: 'modern', label: { pt: 'Moderno', en: 'Modern', es: 'Moderno' } },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

export function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Relative luminance (0..1) of a hex color. */
export function relativeLuminance(hex: string): number {
  const raw = hex.replace('#', '');
  const full = raw.length === 3 ? raw.split('').map((c) => c + c).join('') : raw;
  const v = Number.parseInt(full.padEnd(6, '0').slice(0, 6), 16);
  const toLin = (c: number) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  const r = toLin((v >> 16) & 255);
  const g = toLin((v >> 8) & 255);
  const b = toLin(v & 255);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** Chooses legible text colors for a background (or transparent → assume light). */
export function textColorsForBackground(appearance: SignatureAppearance): { text: string; muted: string } {
  const isLight = appearance.backgroundTransparent ? true : relativeLuminance(appearance.background) > 0.5;
  return isLight ? { text: '#111827', muted: '#6b7280' } : { text: '#f8fafc', muted: '#cbd5e1' };
}

/** Joins the present values with a middle dot separator. */
export function joinDot(...parts: Array<string | undefined>): string {
  return parts.map((p) => (p ?? '').trim()).filter(Boolean).join('  ·  ');
}

let measureCtx: CanvasRenderingContext2D | null = null;
function measure(text: string, font: string): number {
  if (typeof document === 'undefined') return text.length * 8;
  if (!measureCtx) measureCtx = document.createElement('canvas').getContext('2d');
  if (!measureCtx) return text.length * 8;
  measureCtx.font = font;
  return measureCtx.measureText(text).width;
}

/** Truncates text with an ellipsis so it fits within maxWidth at the given font. */
export function fitText(text: string, maxWidth: number, fontPx: number, weight = 400): string {
  const value = (text ?? '').trim();
  if (!value) return '';
  const font = `${weight} ${fontPx}px Arial, Helvetica, sans-serif`;
  if (measure(value, font) <= maxWidth) return value;
  let lo = 0;
  let hi = value.length;
  while (lo < hi) {
    const mid = Math.ceil((lo + hi) / 2);
    if (measure(value.slice(0, mid) + '…', font) <= maxWidth) lo = mid;
    else hi = mid - 1;
  }
  return value.slice(0, lo).trimEnd() + '…';
}

interface SvgResult {
  svg: string;
  width: number;
  height: number;
}

function textEl(
  x: number,
  y: number,
  content: string,
  opts: { size: number; weight?: number; fill: string; anchor?: 'start' | 'middle' | 'end'; italic?: boolean }
): string {
  if (!content) return '';
  const anchor = opts.anchor ?? 'start';
  const italic = opts.italic ? ' font-style="italic"' : '';
  return `<text x="${x}" y="${y}" font-family="Arial, Helvetica, sans-serif" font-size="${opts.size}" font-weight="${
    opts.weight ?? 400
  }" fill="${opts.fill}" text-anchor="${anchor}"${italic}>${escapeXml(content)}</text>`;
}

function photoCircle(href: string, cx: number, cy: number, r: number, stroke: string): string {
  const id = `pc${Math.round(cx)}_${Math.round(cy)}_${Math.round(r)}`;
  return `<defs><clipPath id="${id}"><circle cx="${cx}" cy="${cy}" r="${r}"/></clipPath></defs>` +
    `<image href="${href}" x="${cx - r}" y="${cy - r}" width="${r * 2}" height="${r * 2}" preserveAspectRatio="xMidYMid slice" clip-path="url(#${id})"/>` +
    `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${stroke}" stroke-width="2"/>`;
}

function logoBox(href: string, x: number, y: number, w: number, h: number): string {
  return `<image href="${href}" x="${x}" y="${y}" width="${w}" height="${h}" preserveAspectRatio="xMidYMid meet"/>`;
}

function renderTemplate(data: SignatureData, appearance: SignatureAppearance): { body: string; width: number; height: number } {
  const { text, muted } = textColorsForBackground(appearance);
  const accent = appearance.accentColor;
  const hasPhoto = Boolean(data.photo);
  const hasLogo = Boolean(data.logo);

  if (appearance.template === 'corporate') {
    const W = 720;
    const H = 176;
    const leftX = 40;
    const logoW = 150;
    const logoRight = W - 40;
    const textRight = hasLogo ? logoRight - logoW - 24 : logoRight;
    const nameMax = textRight - leftX;
    let body = '';
    body += textEl(leftX, 56, fitText(data.name || 'Nome Sobrenome', nameMax, 26, 700), { size: 26, weight: 700, fill: text });
    body += textEl(leftX, 82, fitText(joinDot(data.role, data.company), nameMax, 15), { size: 15, fill: muted });
    if (hasLogo) body += logoBox(data.logo as string, logoRight - logoW, 34, logoW, 64);
    body += `<line x1="${leftX}" y1="104" x2="${W - 40}" y2="104" stroke="${accent}" stroke-width="2"/>`;
    body += textEl(leftX, 136, fitText(joinDot(data.phone, data.whatsapp, data.email, data.website), W - 80, 14), {
      size: 14,
      fill: muted,
    });
    return { body, width: W, height: H };
  }

  if (appearance.template === 'spotlight') {
    const W = 460;
    const hasTop = hasPhoto;
    const H = hasTop ? 340 : 240;
    const cx = W / 2;
    let y = 60;
    let body = '';
    if (hasTop) {
      body += photoCircle(data.photo as string, cx, y + 44, 52, accent);
      y += 132;
    } else {
      y = 70;
    }
    body += textEl(cx, y, fitText(data.name || 'Nome Sobrenome', W - 60, 24, 700), { size: 24, weight: 700, fill: text, anchor: 'middle' });
    body += textEl(cx, y + 26, fitText(joinDot(data.role, data.company), W - 60, 14), { size: 14, fill: muted, anchor: 'middle' });
    body += `<line x1="${cx - 60}" y1="${y + 44}" x2="${cx + 60}" y2="${y + 44}" stroke="${accent}" stroke-width="2"/>`;
    body += textEl(cx, y + 72, fitText(joinDot(data.phone, data.whatsapp, data.email), W - 50, 13), { size: 13, fill: muted, anchor: 'middle' });
    body += textEl(cx, y + 92, fitText(data.website, W - 50, 13), { size: 13, fill: muted, anchor: 'middle' });
    return { body, width: W, height: H };
  }

  if (appearance.template === 'modern') {
    const W = 720;
    const H = 250;
    const panelW = 200;
    const textX = panelW + 30;
    const textMax = W - textX - 40;
    let body = '';
    body += `<rect x="0" y="0" width="${panelW}" height="${H}" fill="${accent}"/>`;
    if (hasPhoto) {
      body += photoCircle(data.photo as string, panelW / 2, H / 2, 64, '#ffffff');
    } else if (data.name) {
      const initials = data.name.trim().split(/\s+/).slice(0, 2).map((w) => w[0]?.toUpperCase() ?? '').join('');
      body += `<circle cx="${panelW / 2}" cy="${H / 2}" r="56" fill="rgba(255,255,255,0.18)"/>`;
      body += textEl(panelW / 2, H / 2 + 14, initials, { size: 40, weight: 700, fill: '#ffffff', anchor: 'middle' });
    }
    body += textEl(textX, 60, fitText(data.name || 'Nome Sobrenome', textMax, 25, 700), { size: 25, weight: 700, fill: text });
    body += textEl(textX, 86, fitText(data.role, textMax, 15), { size: 15, fill: muted });
    body += textEl(textX, 108, fitText(data.company, textMax, 15), { size: 15, fill: text });
    body += `<line x1="${textX}" y1="126" x2="${W - 40}" y2="126" stroke="${accent}" stroke-width="2"/>`;
    body += textEl(textX, 152, fitText(joinDot(data.phone, data.whatsapp), textMax, 13), { size: 13, fill: muted });
    body += textEl(textX, 172, fitText(joinDot(data.email, data.website), textMax, 13), { size: 13, fill: muted });
    if (data.customText) body += textEl(textX, 206, fitText(data.customText, textMax, 13), { size: 13, fill: muted, italic: true });
    return { body, width: W, height: H };
  }

  // classic (default)
  const W = 680;
  const H = 200;
  const textX = hasPhoto ? 200 : 40;
  const textMax = W - textX - 40;
  let body = '';
  if (hasPhoto) {
    body += photoCircle(data.photo as string, 100, 100, 60, accent);
    body += `<line x1="180" y1="42" x2="180" y2="158" stroke="${accent}" stroke-width="2"/>`;
  }
  body += textEl(textX, 66, fitText(data.name || 'Nome Sobrenome', textMax, 26, 700), { size: 26, weight: 700, fill: text });
  body += textEl(textX, 92, fitText(data.role, textMax, 15), { size: 15, fill: muted });
  body += textEl(textX, 114, fitText(data.company, textMax, 15), { size: 15, fill: text });
  body += `<line x1="${textX}" y1="132" x2="${W - 40}" y2="132" stroke="${accent}" stroke-width="2"/>`;
  body += textEl(textX, 158, fitText(joinDot(data.phone, data.whatsapp), textMax, 13), { size: 13, fill: muted });
  body += textEl(textX, 178, fitText(joinDot(data.email, data.website), textMax, 13), { size: 13, fill: muted });
  return { body, width: W, height: H };
}

export function buildSignatureSvg(
  data: SignatureData,
  appearance: SignatureAppearance,
  opts: { forExport?: boolean; scale?: number } = {}
): SvgResult {
  const { body, width, height } = renderTemplate(data, appearance);
  const scale = opts.scale ?? 1;
  const bg = appearance.backgroundTransparent
    ? ''
    : `<rect x="0" y="0" width="${width}" height="${height}" fill="${appearance.background}"/>`;
  const rootSize = opts.forExport
    ? `width="${width * scale}" height="${height * scale}"`
    : 'style="width:100%;height:auto;display:block"';
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" ${rootSize}>` +
    bg +
    body +
    '</svg>';
  return { svg, width, height };
}

// ---------------------------------------------------------------------------
// Export / rasterization
// ---------------------------------------------------------------------------

const MIME: Record<SignatureExportFormat, string> = {
  png: 'image/png',
  jpeg: 'image/jpeg',
  webp: 'image/webp',
};

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('IMAGE_LOAD_FAILED'));
    img.src = src;
  });
}

export async function rasterizeSignature(
  data: SignatureData,
  appearance: SignatureAppearance,
  format: SignatureExportFormat,
  scale = 3
): Promise<Blob> {
  const { svg, width, height } = buildSignatureSvg(data, appearance, { forExport: true, scale });
  const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  try {
    const img = await loadImage(url);
    const canvas = document.createElement('canvas');
    canvas.width = Math.round(width * scale);
    canvas.height = Math.round(height * scale);
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('NO_CANVAS');
    // JPEG and WEBP have no alpha here → paint an opaque white background.
    if (format !== 'png') {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    return await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (out) => (out ? resolve(out) : reject(new Error('EXPORT_FAILED'))),
        MIME[format],
        format === 'png' ? undefined : 0.92
      );
    });
  } finally {
    URL.revokeObjectURL(url);
  }
}

/**
 * Reads an image file and returns a downscaled PNG data URL (kept in memory only).
 * Normalizing to PNG preserves transparency (logos) and keeps canvas export clean.
 */
export async function fileToImageDataUrl(file: File, maxDim: number): Promise<string> {
  const url = URL.createObjectURL(file);
  try {
    const img = await loadImage(url);
    const iw = img.naturalWidth || maxDim;
    const ih = img.naturalHeight || maxDim;
    const ratio = Math.min(1, maxDim / Math.max(iw, ih));
    const w = Math.max(1, Math.round(iw * ratio));
    const h = Math.max(1, Math.round(ih * ratio));
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('NO_CANVAS');
    ctx.drawImage(img, 0, 0, w, h);
    return canvas.toDataURL('image/png');
  } finally {
    URL.revokeObjectURL(url);
  }
}
