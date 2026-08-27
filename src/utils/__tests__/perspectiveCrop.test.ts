import { describe, expect, it } from 'vitest';
import {
  applyHomography,
  computeHomography,
  computeOutputSize,
  defaultSheetCorners,
  distance,
  warpPerspective,
  type Quad,
  type Raster,
} from '../../engines/perspectiveCrop';

function solidRaster(width: number, height: number, r: number, g: number, b: number): Raster {
  const data = new Uint8ClampedArray(width * height * 4);
  for (let i = 0; i < data.length; i += 4) {
    data[i] = r;
    data[i + 1] = g;
    data[i + 2] = b;
    data[i + 3] = 255;
  }
  return { data, width, height };
}

describe('perspectiveCrop', () => {
  it('places default corners inset from the photo edges', () => {
    const corners = defaultSheetCorners(1000, 800, 0.1);
    expect(corners[0]).toEqual({ x: 100, y: 80 });
    expect(corners[1]).toEqual({ x: 900, y: 80 });
    expect(corners[2]).toEqual({ x: 900, y: 720 });
    expect(corners[3]).toEqual({ x: 100, y: 720 });
  });

  it('uses the longest opposite edges as output size', () => {
    const corners: Quad = [
      { x: 0, y: 0 },
      { x: 200, y: 0 },
      { x: 180, y: 80 },
      { x: 10, y: 90 },
    ];
    const size = computeOutputSize(corners, 4000);
    expect(size.width).toBe(Math.round(Math.max(distance(corners[0], corners[1]), distance(corners[3], corners[2]))));
    expect(size.height).toBe(Math.round(Math.max(distance(corners[0], corners[3]), distance(corners[1], corners[2]))));
  });

  it('maps destination corners back to the sheet corners', () => {
    const src: Quad = [
      { x: 10, y: 20 },
      { x: 210, y: 15 },
      { x: 200, y: 140 },
      { x: 8, y: 130 },
    ];
    const dest: Quad = [
      { x: 0, y: 0 },
      { x: 400, y: 0 },
      { x: 400, y: 250 },
      { x: 0, y: 250 },
    ];
    const h = computeHomography(dest, src);
    expect(h).not.toBeNull();
    for (let i = 0; i < 4; i++) {
      const mapped = applyHomography(h!, dest[i].x, dest[i].y);
      expect(mapped.x).toBeCloseTo(src[i].x, 5);
      expect(mapped.y).toBeCloseTo(src[i].y, 5);
    }
  });

  it('keeps a rectangular crop of a solid image the same color', () => {
    const source = solidRaster(80, 60, 40, 80, 200);
    const corners: Quad = [
      { x: 0, y: 0 },
      { x: 80, y: 0 },
      { x: 80, y: 60 },
      { x: 0, y: 60 },
    ];
    const out = warpPerspective(source, corners);
    expect(out).not.toBeNull();
    expect(out!.width).toBe(80);
    expect(out!.height).toBe(60);
    expect(out!.data[0]).toBe(40);
    expect(out!.data[1]).toBe(80);
    expect(out!.data[2]).toBe(200);
    const last = (out!.width * out!.height - 1) * 4;
    expect(out!.data[last]).toBe(40);
  });
});
