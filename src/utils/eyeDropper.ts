export interface EyeDropperResult {
  sRGBHex: string;
}

interface EyeDropperCtor {
  new (): { open: (options?: { signal?: AbortSignal }) => Promise<EyeDropperResult> };
}

export function isEyeDropperSupported(): boolean {
  return typeof window !== 'undefined' && 'EyeDropper' in window;
}

/**
 * Opens the native browser eyedropper (Chromium / recent Firefox).
 * Uses AbortSignal when supported so hung picks can be cancelled on unmount.
 */
export async function openEyeDropper(signal?: AbortSignal): Promise<EyeDropperResult> {
  if (!isEyeDropperSupported()) {
    throw new Error('EyeDropper not supported');
  }
  const EyeDropperClass = (window as unknown as { EyeDropper: EyeDropperCtor }).EyeDropper;
  const dropper = new EyeDropperClass();
  try {
    return await dropper.open(signal ? { signal } : undefined);
  } catch (err) {
    if (signal?.aborted) {
      throw new DOMException('Eyedropper aborted', 'AbortError');
    }
    throw err;
  }
}
