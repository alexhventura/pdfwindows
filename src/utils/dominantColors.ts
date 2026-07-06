import type { RgbColor } from './colorFormat';

const SAMPLE = 72;
const BUCKET = 24;

function colorDistance(a: RgbColor, b: RgbColor): number {
  return (a.r - b.r) ** 2 + (a.g - b.g) ** 2 + (a.b - b.b) ** 2;
}

/** Extract up to `count` dominant colors from a canvas (local, downsampled). */
export function extractDominantColors(canvas: HTMLCanvasElement, count = 5): RgbColor[] {
  const sample = document.createElement('canvas');
  const aspect = canvas.width / canvas.height || 1;
  sample.width = aspect >= 1 ? SAMPLE : Math.round(SAMPLE * aspect);
  sample.height = aspect >= 1 ? Math.round(SAMPLE / aspect) : SAMPLE;

  const ctx = sample.getContext('2d', { willReadFrequently: true });
  if (!ctx) return [];

  ctx.drawImage(canvas, 0, 0, sample.width, sample.height);
  const { data } = ctx.getImageData(0, 0, sample.width, sample.height);

  const buckets = new Map<string, { color: RgbColor; n: number }>();

  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3] < 200) continue;
    const r = Math.min(255, Math.round(data[i] / BUCKET) * BUCKET);
    const g = Math.min(255, Math.round(data[i + 1] / BUCKET) * BUCKET);
    const b = Math.min(255, Math.round(data[i + 2] / BUCKET) * BUCKET);
    const key = `${r},${g},${b}`;
    const prev = buckets.get(key);
    if (prev) prev.n += 1;
    else buckets.set(key, { color: { r, g, b }, n: 1 });
  }

  const sorted = [...buckets.values()].sort((a, b) => b.n - a.n);
  const picked: RgbColor[] = [];

  for (const item of sorted) {
    if (picked.some((c) => colorDistance(c, item.color) < 2800)) continue;
    picked.push(item.color);
    if (picked.length >= count) break;
  }

  return picked;
}
