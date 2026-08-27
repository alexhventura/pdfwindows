export type Point = { x: number; y: number };
/** Top-left, top-right, bottom-right, bottom-left. */
export type Quad = [Point, Point, Point, Point];

export interface Raster {
  data: Uint8ClampedArray;
  width: number;
  height: number;
}

const WHITE = [255, 255, 255, 255] as const;

export function distance(a: Point, b: Point): number {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.hypot(dx, dy);
}

export function defaultSheetCorners(width: number, height: number, insetRatio = 0.08): Quad {
  const ix = Math.max(8, width * insetRatio);
  const iy = Math.max(8, height * insetRatio);
  return [
    { x: ix, y: iy },
    { x: width - ix, y: iy },
    { x: width - ix, y: height - iy },
    { x: ix, y: height - iy },
  ];
}

export function computeOutputSize(corners: Quad, maxSide = 3200): { width: number; height: number } {
  const [tl, tr, br, bl] = corners;
  let width = Math.round(Math.max(distance(tl, tr), distance(bl, br)));
  let height = Math.round(Math.max(distance(tl, bl), distance(tr, br)));
  width = Math.max(32, width);
  height = Math.max(32, height);
  const longest = Math.max(width, height);
  if (longest > maxSide) {
    const scale = maxSide / longest;
    width = Math.max(32, Math.round(width * scale));
    height = Math.max(32, Math.round(height * scale));
  }
  return { width, height };
}

/** 3x3 homography (row-major, h[8] = 1) mapping `from` → `to`. */
export function computeHomography(from: Quad, to: Quad): number[] | null {
  const A: number[][] = [];
  const b: number[] = [];

  for (let i = 0; i < 4; i++) {
    const { x, y } = from[i];
    const { x: u, y: v } = to[i];
    A.push([x, y, 1, 0, 0, 0, -x * u, -y * u]);
    b.push(u);
    A.push([0, 0, 0, x, y, 1, -x * v, -y * v]);
    b.push(v);
  }

  const h = solveLinearSystem(A, b);
  if (!h) return null;
  return [...h, 1];
}

export function applyHomography(h: number[], x: number, y: number): Point {
  const w = h[6] * x + h[7] * y + h[8];
  if (Math.abs(w) < 1e-12) return { x: 0, y: 0 };
  return {
    x: (h[0] * x + h[1] * y + h[2]) / w,
    y: (h[3] * x + h[4] * y + h[5]) / w,
  };
}

export function warpPerspective(source: Raster, corners: Quad, maxSide = 3200): Raster | null {
  const size = computeOutputSize(corners, maxSide);
  const dest: Quad = [
    { x: 0, y: 0 },
    { x: size.width, y: 0 },
    { x: size.width, y: size.height },
    { x: 0, y: size.height },
  ];
  const h = computeHomography(dest, corners);
  if (!h) return null;

  const out = new Uint8ClampedArray(size.width * size.height * 4);
  const src = source.data;
  const sw = source.width;
  const sh = source.height;

  for (let y = 0; y < size.height; y++) {
    for (let x = 0; x < size.width; x++) {
      const mapped = applyHomography(h, x + 0.5, y + 0.5);
      writeBilinear(out, (y * size.width + x) * 4, src, sw, sh, mapped.x, mapped.y);
    }
  }

  return { data: out, width: size.width, height: size.height };
}

function writeBilinear(
  dest: Uint8ClampedArray,
  di: number,
  src: Uint8ClampedArray,
  sw: number,
  sh: number,
  sx: number,
  sy: number
) {
  if (sx < 0 || sy < 0 || sx >= sw - 1 || sy >= sh - 1) {
    if (sx < -0.5 || sy < -0.5 || sx > sw - 0.5 || sy > sh - 0.5) {
      dest[di] = WHITE[0];
      dest[di + 1] = WHITE[1];
      dest[di + 2] = WHITE[2];
      dest[di + 3] = WHITE[3];
      return;
    }
  }

  const x0 = Math.floor(sx);
  const y0 = Math.floor(sy);
  const x1 = Math.min(sw - 1, x0 + 1);
  const y1 = Math.min(sh - 1, Math.max(0, y0 + 1));
  const fx = sx - x0;
  const fy = sy - y0;
  const cx0 = Math.min(sw - 1, Math.max(0, x0));
  const cy0 = Math.min(sh - 1, Math.max(0, y0));

  const i00 = (cy0 * sw + cx0) * 4;
  const i10 = (cy0 * sw + x1) * 4;
  const i01 = (y1 * sw + cx0) * 4;
  const i11 = (y1 * sw + x1) * 4;

  for (let c = 0; c < 4; c++) {
    const top = src[i00 + c] * (1 - fx) + src[i10 + c] * fx;
    const bot = src[i01 + c] * (1 - fx) + src[i11 + c] * fx;
    dest[di + c] = top * (1 - fy) + bot * fy;
  }
}

function solveLinearSystem(A: number[][], b: number[]): number[] | null {
  const n = b.length;
  const M = A.map((row, i) => [...row, b[i]]);

  for (let col = 0; col < n; col++) {
    let pivot = col;
    for (let r = col + 1; r < n; r++) {
      if (Math.abs(M[r][col]) > Math.abs(M[pivot][col])) pivot = r;
    }
    if (Math.abs(M[pivot][col]) < 1e-10) return null;
    [M[col], M[pivot]] = [M[pivot], M[col]];
    const div = M[col][col];
    for (let c = col; c <= n; c++) M[col][c] /= div;
    for (let r = 0; r < n; r++) {
      if (r === col) continue;
      const f = M[r][col];
      if (f === 0) continue;
      for (let c = col; c <= n; c++) M[r][c] -= f * M[col][c];
    }
  }

  return M.map((row) => row[n]);
}
