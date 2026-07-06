import { describe, expect, it } from 'vitest';
import { mapClickToCanvasPixel } from '../screenColorPick';

describe('mapClickToCanvasPixel', () => {
  it('maps clicks with object-fit contain letterboxing', () => {
    const rect = { left: 100, top: 50, width: 400, height: 200 };
    const mapped = mapClickToCanvasPixel(200, 100, rect, 400, 130);
    expect(mapped).toEqual({ x: 150, y: 40 });
  });

  it('returns null for clicks outside the visible image area', () => {
    const rect = { left: 0, top: 0, width: 200, height: 200 };
    const mapped = mapClickToCanvasPixel(200, 100, rect, 5, 5);
    expect(mapped).toBeNull();
  });
});
