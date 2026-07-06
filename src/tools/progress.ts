import type { GeneratedFile, OperationType } from '../types';

export interface ProgressContext {
  files: { length: number };
  selectedOperation: OperationType;
  onProgress?: (percent: number) => void;
  signal?: AbortSignal;
}

export function estimateSteps(op: OperationType, fileCount: number): number {
  const perFile: OperationType[] = [
    'img-to-img',
    'img-resize',
    'img-ocr',
    'img-filter',
    'pdf-watermark',
    'pdf-compress',
  ];
  if (perFile.includes(op)) return Math.max(1, fileCount);
  return 1;
}

export interface ProgressRunner {
  outputs: GeneratedFile[];
  tick: () => void;
  guardAbort: () => void;
  finish: () => void;
}

export function createProgressRunner(ctx: ProgressContext): ProgressRunner {
  const { files, selectedOperation, onProgress, signal } = ctx;
  const outputs: GeneratedFile[] = [];
  const totalSteps = estimateSteps(selectedOperation, files.length);
  let step = 0;

  const tick = () => {
    step += 1;
    onProgress?.(Math.min(100, Math.round((step / totalSteps) * 100)));
  };

  const guardAbort = () => {
    if (signal?.aborted) throw new DOMException('Aborted', 'AbortError');
  };

  const finish = () => {
    onProgress?.(100);
  };

  return { outputs, tick, guardAbort, finish };
}

export function baseName(fileName: string, fallback: string): string {
  return fileName.substring(0, fileName.lastIndexOf('.')) || fallback;
}
