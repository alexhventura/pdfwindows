import exifr from 'exifr';
import type { AnalysisResult, FileIdentification, HashInfo } from '../types';
import { emptyResult, sv } from '../types';

export async function analyzeImage(
  buffer: ArrayBuffer,
  identification: FileIdentification,
  hashes: HashInfo,
  onStage?: (msg: string) => void,
): Promise<AnalysisResult> {
  const result = emptyResult({
    identification,
    fileSizeBytes: buffer.byteLength,
    hashes,
    supportLevel: identification.detectedFormat === 'jpeg' ? 'full' : 'partial',
  });

  result.image = { exif: [] };

  onStage?.('Analisando estrutura...');
  const dims = await readImageDimensions(buffer, identification.detectedFormat);
  if (dims) {
    result.statistics.width = sv(dims.width, dims.origin);
    result.statistics.height = sv(dims.height, dims.origin);
    result.statistics.custom.push({
      label: 'Proporção',
      value: (dims.width / dims.height).toFixed(4),
      origin: dims.origin,
    });
  }

  onStage?.('Extraindo metadados...');
  try {
    const parsed = await exifr.parse(buffer, {
      gps: true,
      exif: true,
      iptc: true,
      icc: false,
      jfif: true,
      ihdr: true,
      mergeOutput: true,
      reviveValues: true,
      sanitize: false,
    });

    if (parsed && typeof parsed === 'object') {
      const skip = new Set(['thumbnail', 'Thumbnail', 'image', 'Image']);
      for (const [key, val] of Object.entries(parsed)) {
        if (val == null || val === '' || skip.has(key)) continue;
        if (typeof val === 'object' && !(val instanceof Date)) {
          if (key.toLowerCase().includes('gps')) continue;
          result.advanced.push({
            key,
            value: JSON.stringify(val).slice(0, 500),
            origin: `${identification.detectedFormat.toUpperCase()} / EXIF`,
          });
          continue;
        }
        const str = val instanceof Date ? val.toISOString() : String(val);
        result.image.exif.push({
          key,
          value: str,
          origin: `${identification.detectedFormat.toUpperCase()} / EXIF / ${key}`,
        });
        result.metadata.push({
          key,
          value: str,
          origin: `${identification.detectedFormat.toUpperCase()} / EXIF / ${key}`,
        });
      }

      if (parsed.Make) {
        result.authorship.producer = sv(String(parsed.Make), 'EXIF / Make');
      }
      if (parsed.Model) {
        result.statistics.custom.push({
          label: 'Modelo',
          value: String(parsed.Model),
          origin: 'EXIF / Model',
        });
      }
      if (parsed.Software) {
        result.authorship.application = sv(String(parsed.Software), 'EXIF / Software');
        result.hidden.push({
          severity: 'info',
          label: 'Software utilizado identificado',
          detail: String(parsed.Software),
          origin: 'EXIF / Software',
        });
      }
      if (parsed.Artist) {
        result.authorship.author = sv(String(parsed.Artist), 'EXIF / Artist');
        result.hidden.push({
          severity: 'info',
          label: 'Autor identificado',
          detail: String(parsed.Artist),
          origin: 'EXIF / Artist',
        });
      }
      if (parsed.DateTimeOriginal instanceof Date) {
        result.dates.contentCreated = sv(parsed.DateTimeOriginal.toISOString(), 'EXIF / DateTimeOriginal');
      } else if (typeof parsed.DateTimeOriginal === 'string') {
        result.dates.contentCreated = sv(parsed.DateTimeOriginal, 'EXIF / DateTimeOriginal');
      }
      if (parsed.ModifyDate instanceof Date) {
        result.dates.modified = sv(parsed.ModifyDate.toISOString(), 'EXIF / ModifyDate');
      }
      if (typeof parsed.XResolution === 'number') {
        result.image.dpi = sv(parsed.XResolution, 'EXIF / XResolution');
      }
      if (parsed.ColorSpace != null) {
        result.image.colorSpace = sv(String(parsed.ColorSpace), 'EXIF / ColorSpace');
      }

      const lat = typeof parsed.latitude === 'number' ? parsed.latitude : undefined;
      const lon = typeof parsed.longitude === 'number' ? parsed.longitude : undefined;
      if (lat != null && lon != null) {
        result.image.gps = {
          latitude: lat,
          longitude: lon,
          altitude: typeof parsed.altitude === 'number' ? parsed.altitude : undefined,
          origin: `${identification.detectedFormat.toUpperCase()} / EXIF / GPS`,
        };
        result.hidden.push({
          severity: 'attention',
          label: 'Dados de localização encontrados',
          detail: `${lat.toFixed(6)}, ${lon.toFixed(6)}`,
          origin: `${identification.detectedFormat.toUpperCase()} / EXIF / GPS`,
        });
        result.statistics.custom.push({
          label: 'GPS',
          value: 'Encontrado',
          origin: 'EXIF / GPS',
        });
      }

      if (result.image.exif.length) {
        result.hidden.push({
          severity: 'info',
          label: 'Dados EXIF encontrados',
          detail: `${result.image.exif.length} campos`,
          origin: 'EXIF',
        });
        result.statistics.custom.push({
          label: 'EXIF',
          value: 'Disponível',
          origin: 'exifr',
        });
      }
    }
  } catch (e) {
    result.content.notes.push(`EXIF: ${(e as Error).message}`);
  }

  if (!result.image.exif.length) {
    result.statistics.custom.push({
      label: 'EXIF',
      value: 'Não disponível no arquivo.',
      origin: 'exifr',
    });
  }

  return result;
}

async function readImageDimensions(
  buffer: ArrayBuffer,
  format: string,
): Promise<{ width: number; height: number; origin: string } | null> {
  const u8 = new Uint8Array(buffer);
  if (format === 'png' && u8.length > 24) {
    const width = readU32(u8, 16);
    const height = readU32(u8, 20);
    return { width, height, origin: 'PNG / IHDR' };
  }
  if (format === 'gif' && u8.length > 10) {
    const width = u8[6] | (u8[7] << 8);
    const height = u8[8] | (u8[9] << 8);
    return { width, height, origin: 'GIF / Logical Screen Descriptor' };
  }
  if (format === 'jpeg') {
    // SOF0/2 scan
    let i = 2;
    while (i < u8.length - 8) {
      if (u8[i] !== 0xff) {
        i += 1;
        continue;
      }
      const marker = u8[i + 1];
      if (marker === 0xc0 || marker === 0xc2) {
        const height = (u8[i + 5] << 8) | u8[i + 6];
        const width = (u8[i + 7] << 8) | u8[i + 8];
        return { width, height, origin: 'JPEG / SOF' };
      }
      const len = (u8[i + 2] << 8) | u8[i + 3];
      i += 2 + len;
    }
  }
  if (format === 'webp' && u8.length > 30) {
    // VP8X or VP8
    if (String.fromCharCode(...u8.slice(12, 16)) === 'VP8X') {
      const width = 1 + u8[24] + (u8[25] << 8) + (u8[26] << 16);
      const height = 1 + u8[27] + (u8[28] << 8) + (u8[29] << 16);
      return { width, height, origin: 'WEBP / VP8X' };
    }
  }

  // DOM fallback
  try {
    const blob = new Blob([buffer]);
    const url = URL.createObjectURL(blob);
    const dims = await new Promise<{ width: number; height: number } | null>((resolve) => {
      const img = new Image();
      img.onload = () => {
        resolve({ width: img.naturalWidth, height: img.naturalHeight });
        URL.revokeObjectURL(url);
      };
      img.onerror = () => {
        URL.revokeObjectURL(url);
        resolve(null);
      };
      img.src = url;
    });
    if (dims) return { ...dims, origin: 'Browser / Image decode' };
  } catch {
    /* ignore */
  }
  return null;
}

function readU32(u8: Uint8Array, offset: number): number {
  return ((u8[offset] << 24) | (u8[offset + 1] << 16) | (u8[offset + 2] << 8) | u8[offset + 3]) >>> 0;
}
