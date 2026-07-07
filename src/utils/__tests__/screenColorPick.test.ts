import { afterEach, describe, expect, it, vi } from 'vitest';
import { mapClickToCanvasPixel, requestDisplayMediaForColorPick } from '../screenColorPick';

describe('requestDisplayMediaForColorPick', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('calls getDisplayMedia only (never getUserMedia)', async () => {
    const getUserMedia = vi.fn();
    const getDisplayMedia = vi.fn().mockResolvedValue({
      getVideoTracks: () => [{ stop: () => {} }],
    });

    vi.stubGlobal('navigator', {
      mediaDevices: { getUserMedia, getDisplayMedia },
    });

    const stream = await requestDisplayMediaForColorPick();

    expect(getDisplayMedia).toHaveBeenCalledOnce();
    expect(getDisplayMedia).toHaveBeenCalledWith(
      expect.objectContaining({
        audio: false,
        video: expect.objectContaining({ displaySurface: 'monitor' }),
      })
    );
    expect(getUserMedia).not.toHaveBeenCalled();
    expect(stream).toBeDefined();
  });
});

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
