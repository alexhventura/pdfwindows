import type { ConverterState, OperationType } from '../types';

export function createDefaultConverterOptions(): ConverterState['options'] {
  return {
    targetImageFormat: 'webp',
    imageQuality: 0.85,
    imageWidth: 0,
    imageHeight: 0,
    keepAspectRatio: true,
    pdfPassword: '',
    splitFromPage: 1,
    splitToPage: 1,
    rotateAngle: 90,
    pdfOrientation: 'portrait',
    pdfMargins: 'standard',
    pdfPositioning: 'fit',
    ocrLanguage: 'por+eng',
    filterBrightness: 100,
    filterContrast: 100,
    filterGrayscale: false,
    watermarkText: '',
    watermarkImage: undefined,
    watermarkOpacity: 0.3,
    watermarkRotation: 45,
    watermarkScale: 1,
    watermarkFontSize: 48,
    watermarkColor: '#808080',
    watermarkRepeat: false,
    watermarkSpacing: 180,
    watermarkSmartPosition: true,
  };
}

export function createInitialConverterState(fixedOperation?: OperationType): ConverterState {
  return {
    files: [],
    selectedOperation: fixedOperation ?? '',
    isProcessing: false,
    progress: 0,
    timeLeft: 0,
    isCompleted: false,
    generatedFiles: [],
    options: createDefaultConverterOptions(),
  };
}
