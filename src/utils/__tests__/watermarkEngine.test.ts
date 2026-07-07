import { describe, expect, it } from 'vitest';
import {
  detectContentBoundsFromImageData,
  getNormalizedAnchor,
  normalizedToCanvas,
  normalizedToPdf,
} from '../watermarkEngine';

function makeImageData(
  width: number,
  height: number,
  paint: (x: number, y: number) => [number, number, number, number]
): ImageData {
  const data = new Uint8ClampedArray(width * height * 4);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      const [r, g, b, a] = paint(x, y);
      data[i] = r;
      data[i + 1] = g;
      data[i + 2] = b;
      data[i + 3] = a;
    }
  }
  return { data, width, height, colorSpace: 'srgb', pixelFormat: 'rgba-unorm8' } as ImageData;
}

describe('watermarkEngine', () => {
  it('detects content bounds away from blank margins', () => {
    const imageData = makeImageData(100, 100, (x, y) => {
      const inContent = x >= 30 && x <= 70 && y >= 25 && y <= 75;
      return inContent ? [20, 20, 20, 255] : [255, 255, 255, 255];
    });

    const bounds = detectContentBoundsFromImageData(imageData);
    expect(bounds).not.toBeNull();
    expect(bounds!.left).toBeCloseTo(0.3, 1);
    expect(bounds!.right).toBeCloseTo(0.71, 1);
    expect(bounds!.top).toBeCloseTo(0.25, 1);
    expect(bounds!.bottom).toBeCloseTo(0.76, 1);
  });

  it('falls back to geometric center when bounds are too small', () => {
    const anchor = getNormalizedAnchor(null, true);
    expect(anchor).toEqual({ nx: 0.5, ny: 0.5 });
  });

  it('anchors on content center when smart positioning is enabled', () => {
    const bounds = { left: 0.2, top: 0.2, right: 0.8, bottom: 0.8 };
    const anchor = getNormalizedAnchor(bounds, true);
    expect(anchor).toEqual({ nx: 0.5, ny: 0.5 });
  });

  it('maps normalized coordinates consistently for canvas and pdf', () => {
    const canvas = normalizedToCanvas(0.5, 0.25, 800, 600);
    const pdf = normalizedToPdf(0.5, 0.25, 800, 600);
    expect(canvas).toEqual({ x: 400, y: 150 });
    expect(pdf).toEqual({ x: 400, y: 450 });
  });
});
