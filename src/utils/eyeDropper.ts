export interface EyeDropperResult {
  sRGBHex: string;
}

interface EyeDropperCtor {
  new (): { open: () => Promise<EyeDropperResult> };
}

export function isEyeDropperSupported(): boolean {
  return typeof window !== 'undefined' && 'EyeDropper' in window;
}

export async function openEyeDropper(): Promise<EyeDropperResult> {
  if (!isEyeDropperSupported()) {
    throw new Error('EyeDropper not supported');
  }
  const EyeDropperClass = (window as unknown as { EyeDropper: EyeDropperCtor }).EyeDropper;
  const dropper = new EyeDropperClass();
  return dropper.open();
}
