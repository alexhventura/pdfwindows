/** Client-side file intake limits (no network). */

export const MAX_FILE_BYTES = 100 * 1024 * 1024; // 100 MB per file
export const MAX_QUEUE_FILES = 25;
export const MAX_TOTAL_QUEUE_BYTES = 250 * 1024 * 1024;

export const ALLOWED_EXTENSIONS = new Set([
  'jpg',
  'jpeg',
  'png',
  'webp',
  'gif',
  'bmp',
  'tiff',
  'ico',
  'pdf',
  'csv',
  'json',
  'xml',
  'txt',
]);

export type FileValidationError =
  | 'UNSUPPORTED_TYPE'
  | 'FILE_TOO_LARGE'
  | 'QUEUE_TOO_MANY'
  | 'QUEUE_TOTAL_TOO_LARGE';

export function getFileExtension(name: string): string {
  return name.split('.').pop()?.toLowerCase() || '';
}

export function validateIncomingFile(
  file: File,
  queueSize: number,
  queueTotalBytes: number
): FileValidationError | null {
  const ext = getFileExtension(file.name);
  if (!ALLOWED_EXTENSIONS.has(ext)) {
    return 'UNSUPPORTED_TYPE';
  }
  if (file.size > MAX_FILE_BYTES) {
    return 'FILE_TOO_LARGE';
  }
  if (queueSize >= MAX_QUEUE_FILES) {
    return 'QUEUE_TOO_MANY';
  }
  if (queueTotalBytes + file.size > MAX_TOTAL_QUEUE_BYTES) {
    return 'QUEUE_TOTAL_TOO_LARGE';
  }
  return null;
}

export function validationErrorMessage(
  code: FileValidationError,
  lang: 'pt' | 'en' | 'es'
): string {
  const messages: Record<FileValidationError, Record<'pt' | 'en' | 'es', string>> = {
    UNSUPPORTED_TYPE: {
      pt: 'O arquivo selecionado não é suportado. Use PDF, imagens, CSV, JSON, XML ou TXT.',
      en: 'The selected file is not supported. Use PDF, images, CSV, JSON, XML, or TXT.',
      es: 'El archivo seleccionado no es compatible. Usa PDF, imágenes, CSV, JSON, XML o TXT.',
    },
    FILE_TOO_LARGE: {
      pt: `O arquivo excede o limite de ${MAX_FILE_BYTES / (1024 * 1024)} MB.`,
      en: `The file exceeds the maximum allowed size of ${MAX_FILE_BYTES / (1024 * 1024)} MB.`,
      es: `El archivo supera el tamaño máximo permitido de ${MAX_FILE_BYTES / (1024 * 1024)} MB.`,
    },
    QUEUE_TOO_MANY: {
      pt: `Selecione no máximo ${MAX_QUEUE_FILES} arquivos por vez.`,
      en: `Please select no more than ${MAX_QUEUE_FILES} files at a time.`,
      es: `Selecciona un máximo de ${MAX_QUEUE_FILES} archivos a la vez.`,
    },
    QUEUE_TOTAL_TOO_LARGE: {
      pt: 'O tamanho total dos arquivos excede o limite permitido.',
      en: 'The total file size exceeds the allowed limit.',
      es: 'El tamaño total de los archivos supera el límite permitido.',
    },
  };
  return messages[code][lang];
}
