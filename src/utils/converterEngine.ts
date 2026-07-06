import { PDFDocument, degrees } from 'pdf-lib';
import pica from 'pica';
import imageCompression from 'browser-image-compression';
import { loadPdfJS } from './pdfjsLoader';
import { rowsToCsv } from './csvSecurity';
import { sanitizePdfText } from './pdfTextSanitizer';

export { loadPdfJS } from './pdfjsLoader';

const picaInstance = pica();
export const PDF_RENDER_MAX_PAGES = 12;

/**
 * Cleanly read a File object as an ArrayBuffer
 */
const readFileAsArrayBuffer = (file: File): Promise<ArrayBuffer> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as ArrayBuffer);
    reader.onerror = () => reject(reader.error);
    reader.readAsArrayBuffer(file);
  });
};

/**
 * Cleanly read a File object as Text
 */
const readFileAsText = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsText(file);
  });
};

/**
 * Render PDF Pages to Separate Individual PNG Image Blobs
 */
export async function renderPdfPagesToImages(file: File): Promise<Blob[]> {
  const pdfjsLib = await loadPdfJS();
  const arrayBuffer = await readFileAsArrayBuffer(file);
  const data = new Uint8Array(arrayBuffer).slice();
  const pdfInstance = await pdfjsLib.getDocument({ data }).promise;
  const imageBlobs: Blob[] = [];

  const pageLimit = Math.min(pdfInstance.numPages, PDF_RENDER_MAX_PAGES);
  for (let i = 1; i <= pageLimit; i++) {
    const page = await pdfInstance.getPage(i);
    const viewport = page.getViewport({ scale: 2.0 }); // High-DPI upscale render
    
    const canvas = document.createElement('canvas');
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    
    const context = canvas.getContext('2d');
    if (context) {
      await page.render({ canvasContext: context, viewport, canvas }).promise;
      const b = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/png'));
      if (b) {
        imageBlobs.push(b);
      }
    }
  }
  return imageBlobs;
}

/**
 * Helper to convert any image format to standard JPEG blob via Browser Canvas APIs
 */
async function convertImageToJpegBlob(file: File): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Canvas creation failed'));
        return;
      }
      ctx.fillStyle = '#FFFFFF'; // Fill background with white in case of transparency
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      canvas.toBlob((blob) => {
        URL.revokeObjectURL(url);
        if (blob) resolve(blob);
        else reject(new Error('JPEG raster generation failed'));
      }, 'image/jpeg', 0.9);
    };
    img.onerror = (e) => reject(e);
    img.src = url;
  });
}

/**
 * Pure JavaScript BMP File Format encoder.
 */
function encodeBMP(imgData: ImageData): ArrayBuffer {
  const width = imgData.width;
  const height = imgData.height;
  const rawData = imgData.data;

  const rowBytes = Math.floor((width * 3 + 3) / 4) * 4;
  const pixelDataSize = rowBytes * height;
  const totalFileSize = 54 + pixelDataSize;

  const buffer = new ArrayBuffer(totalFileSize);
  const view = new DataView(buffer);

  view.setUint16(0, 0x424D, false); // BM
  view.setUint32(2, totalFileSize, true); // size
  view.setUint32(6, 0, true); // reserved
  view.setUint32(10, 54, true); // data offset

  view.setUint32(14, 40, true); // size of header
  view.setInt32(18, width, true); // width
  view.setInt32(22, height, true); // height
  view.setUint16(26, 1, true); // planes
  view.setUint16(28, 24, true); // bit count
  view.setUint32(30, 0, true); // no compression
  view.setUint32(34, pixelDataSize, true); // size of raw pixel data
  view.setInt32(38, 2835, true); // 72 DPI
  view.setInt32(42, 2835, true); // 72 DPI
  view.setUint32(46, 0, true); // colors in palette
  view.setUint32(50, 0, true); // important colors

  const uint8 = new Uint8Array(buffer, 54);
  let offset = 0;
  for (let y = height - 1; y >= 0; y--) {
    let rowStart = y * width * 4;
    for (let x = 0; x < width; x++) {
      let pixelIdx = rowStart + (x * 4);
      uint8[offset] = rawData[pixelIdx + 2];     // Blue
      uint8[offset + 1] = rawData[pixelIdx + 1]; // Green
      uint8[offset + 2] = rawData[pixelIdx];     // Red
      offset += 3;
    }
    const padding = rowBytes - (width * 3);
    for (let p = 0; p < padding; p++) {
      uint8[offset] = 0;
      offset++;
    }
  }

  return buffer;
}

/**
 * Robust Client Image Transform Engine using PICA and image-compression
 */
export async function transformImageNatively(
  file: File, 
  targetFormat: 'webp' | 'jpeg' | 'png' | 'gif' | 'bmp' | 'ico' | 'tiff',
  quality: number,
  forcedWidth: number,
  forcedHeight: number,
  keepAspect: boolean
): Promise<Blob> {
  // Use image-compression for quality optimization if applicable
  let processedFile: File | Blob = file;
  
  if (['jpeg', 'webp', 'png'].includes(targetFormat) && quality < 1.0) {
    try {
      processedFile = await imageCompression(file, {
        initialQuality: quality,
        alwaysKeepResolution: forcedWidth === 0 && forcedHeight === 0,
        fileType: `image/${targetFormat}` as any
      });
    } catch (e) {
      console.warn('Compression failed, using original', e);
    }
  }

  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(processedFile);
    const img = new Image();

    img.onload = async () => {
      let w = img.naturalWidth;
      let h = img.naturalHeight;

      if (forcedWidth > 0 && forcedHeight > 0) {
        if (keepAspect) {
          const ratio = Math.min(forcedWidth / w, forcedHeight / h);
          w = Math.round(w * ratio);
          h = Math.round(h * ratio);
        } else {
          w = forcedWidth;
          h = forcedHeight;
        }
      } else if (forcedWidth > 0) {
        const ratio = forcedWidth / w;
        w = forcedWidth;
        h = Math.round(h * ratio);
      } else if (forcedHeight > 0) {
        const ratio = forcedHeight / h;
        h = forcedHeight;
        w = Math.round(w * ratio);
      }

      const offscreenCanvas = document.createElement('canvas');
      offscreenCanvas.width = w;
      offscreenCanvas.height = h;

      try {
        await picaInstance.resize(img, offscreenCanvas, {
          unsharpAmount: 80,
          unsharpRadius: 0.6,
          unsharpThreshold: 2
        });

        // Maintain background white for safety in lossy JPEG representations
        if (targetFormat === 'jpeg') {
          const mainCanvas = document.createElement('canvas');
          mainCanvas.width = w;
          mainCanvas.height = h;
          const ctx = mainCanvas.getContext('2d');
          if (ctx) {
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(0, 0, w, h);
            ctx.drawImage(offscreenCanvas, 0, 0);
            mainCanvas.toBlob((b) => {
              URL.revokeObjectURL(url);
              if (b) resolve(b); else reject(new Error('JPEG output null'));
            }, 'image/jpeg', quality);
            return;
          }
        }

        if (targetFormat === 'bmp') {
          const ctx = offscreenCanvas.getContext('2d');
          if (ctx) {
            const imgData = ctx.getImageData(0, 0, w, h);
            const bmpBuffer = encodeBMP(imgData);
            URL.revokeObjectURL(url);
            resolve(new Blob([bmpBuffer], { type: 'image/bmp' }));
            return;
          }
        }

        offscreenCanvas.toBlob((b) => {
          URL.revokeObjectURL(url);
          if (b) {
            // Apply proper type for unusual extensions
            if (targetFormat === 'ico' || targetFormat === 'tiff') {
               resolve(new Blob([b], { type: `image/${targetFormat}` }));
            } else {
               resolve(b);
            }
          } else {
            reject(new Error('Resize output null'));
          }
        }, `image/${targetFormat === 'jpeg' ? 'jpeg' : targetFormat}`, quality);

      } catch (err) {
        URL.revokeObjectURL(url);
        reject(err);
      }
    };

    img.onerror = (e) => {
      URL.revokeObjectURL(url);
      reject(e);
    };

    img.src = url;
  });
}

export interface PdfLayoutOptions {
  orientation: 'portrait' | 'landscape';
  margins: 'none' | 'narrow' | 'standard';
  positioning: 'center' | 'fit' | 'original';
}

/**
 * Convert One or Multiple Images into a single combined PDF document
 */
export async function convertImagesToPDF(files: File[], layoutOptions?: PdfLayoutOptions): Promise<Blob> {
  const pdfDoc = await PDFDocument.create();
  
  let pageWidth = 595;
  let pageHeight = 842;
  
  if (layoutOptions?.orientation === 'landscape') {
    pageWidth = 842;
    pageHeight = 595;
  }

  let margin = 40;
  if (layoutOptions?.margins === 'none') {
    margin = 0;
  } else if (layoutOptions?.margins === 'narrow') {
    margin = 15;
  } else if (layoutOptions?.margins === 'standard') {
    margin = 40;
  }

  const safeWidth = pageWidth - 2 * margin;
  const safeHeight = pageHeight - 2 * margin;

  for (const file of files) {
    const arrayBuffer = await readFileAsArrayBuffer(file);
    const page = pdfDoc.addPage([pageWidth, pageHeight]);
    
    let embeddedImage;
    const uint8 = new Uint8Array(arrayBuffer);
    const isPng = file.type === 'image/png' || file.name.endsWith('.png');

    try {
      if (isPng) {
        embeddedImage = await pdfDoc.embedPng(uint8);
      } else {
        embeddedImage = await pdfDoc.embedJpg(uint8);
      }
    } catch (e) {
      const canvasBlob = await convertImageToJpegBlob(file);
      const canvasBuf = await canvasBlob.arrayBuffer();
      embeddedImage = await pdfDoc.embedJpg(new Uint8Array(canvasBuf));
    }

    const imgDims = embeddedImage.scale(1);
    let finalWidth = imgDims.width;
    let finalHeight = imgDims.height;
    const positioning = layoutOptions?.positioning || 'fit';

    if (positioning === 'fit') {
      const scaleFactor = Math.min(safeWidth / imgDims.width, safeHeight / imgDims.height);
      finalWidth = imgDims.width * scaleFactor;
      finalHeight = imgDims.height * scaleFactor;
    } else if (positioning === 'center') {
      const scaleFactor = Math.min(safeWidth / imgDims.width, safeHeight / imgDims.height, 1.0);
      finalWidth = imgDims.width * scaleFactor;
      finalHeight = imgDims.height * scaleFactor;
    }

    const x = margin + (safeWidth - finalWidth) / 2;
    const y = margin + (safeHeight - finalHeight) / 2;

    page.drawImage(embeddedImage, { x, y, width: finalWidth, height: finalHeight });
  }

  const pdfBytes = await pdfDoc.save();
  return new Blob([pdfBytes], { type: 'application/pdf' });
}

export { extractTextFromPDF, PDF_TEXT_EXTRACT_MAX_PAGES } from './pdfTextExtract';

/**
 * Merge multiple separate PDFs
 */
export async function mergeMultiplePDFs(files: File[]): Promise<Blob> {
  const destDoc = await PDFDocument.create();
  for (const file of files) {
    const arrayBuffer = await readFileAsArrayBuffer(file);
    const srcDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
    const indices = srcDoc.getPageIndices();
    const copiedPages = await destDoc.copyPages(srcDoc, indices);
    copiedPages.forEach((page) => destDoc.addPage(page));
  }
  const pdfBytes = await destDoc.save();
  return new Blob([pdfBytes], { type: 'application/pdf' });
}

/**
 * Slice specific interval of pages
 */
export async function splitPDFPages(file: File, fromPage: number, toPage: number): Promise<Blob> {
  const arrayBuffer = await readFileAsArrayBuffer(file);
  const srcDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
  const total = srcDoc.getPageCount();

  const start = Math.max(1, Math.min(fromPage, total)) - 1;
  const end = Math.max(1, Math.min(toPage, total)) - 1;

  const indicesToCopy = [];
  for (let i = Math.min(start, end); i <= Math.max(start, end); i++) indicesToCopy.push(i);

  const destDoc = await PDFDocument.create();
  const pages = await destDoc.copyPages(srcDoc, indicesToCopy);
  pages.forEach((p) => destDoc.addPage(p));

  const pdfBytes = await destDoc.save();
  return new Blob([pdfBytes], { type: 'application/pdf' });
}

/**
 * Rotate PDF pages
 */
export async function rotatePDFPages(file: File, angle: 90 | 180 | 270): Promise<Blob> {
  const arrayBuffer = await readFileAsArrayBuffer(file);
  const pdfDoc = await PDFDocument.load(arrayBuffer);
  const pages = pdfDoc.getPages();
  pages.forEach((page) => {
    const current = page.getRotation().angle;
    const nextAngle = (current + angle) % 360;
    page.setRotation(degrees(nextAngle));
  });
  const pdfBytes = await pdfDoc.save();
  return new Blob([pdfBytes], { type: 'application/pdf' });
}

/**
 * Apply standard PDF open-password encryption (AES-256). Output is a normal .pdf
 * compatible with Chrome, Adobe Acrobat, Edge, and other standard readers.
 */
export async function addPasswordProtectionToPDF(file: File, passwordText: string): Promise<Blob> {
  const { encryptPdfWithPassword } = await import('./pdfPasswordProtection');
  const arrayBuffer = await readFileAsArrayBuffer(file);
  return encryptPdfWithPassword(arrayBuffer, passwordText);
}

/**
 * CSV to JSON
 */
export async function convertCSVToJSON(file: File): Promise<Blob> {
  const text = await readFileAsText(file);
  const lines = text.split(/\r?\n/);
  if (lines.length === 0) return new Blob(['[]'], { type: 'application/json' });

  const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
  const result = lines.slice(1).filter(l => l.trim() !== '').map(line => {
    const row = line.split(',').map(c => c.trim().replace(/^"|"$/g, ''));
    const obj: any = {};
    headers.forEach((h, i) => obj[h] = row[i] || '');
    return obj;
  });
  return new Blob([JSON.stringify(result, null, 2)], { type: 'application/json' });
}

/**
 * JSON to CSV
 */
export async function convertJSONToCSV(file: File): Promise<Blob> {
  const text = await readFileAsText(file);
  const data = JSON.parse(text);
  const array = Array.isArray(data) ? data : [data];
  if (array.length === 0) return new Blob([''], { type: 'text/csv' });

  const keys = Object.keys(array[0] || {});
  const csv = rowsToCsv(keys, array as Record<string, unknown>[]);
  return new Blob([csv], { type: 'text/csv;charset=utf-8' });
}

/**
 * XML to JSON
 */
export async function convertXMLToJSON(file: File): Promise<Blob> {
  const text = await readFileAsText(file);
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(text, 'text/xml');
  const xmlToJson = (node: Node): any => {
    if (node.nodeType === 1) {
      const obj: any = {};
      const el = node as Element;
      if (el.hasChildNodes()) {
        for (let i = 0; i < el.childNodes.length; i++) {
          const child = el.childNodes.item(i);
          if (child.nodeType === 1) {
            const name = child.nodeName;
            if (obj[name] === undefined) obj[name] = xmlToJson(child);
            else {
              if (!Array.isArray(obj[name])) obj[name] = [obj[name]];
              obj[name].push(xmlToJson(child));
            }
          } else if (child.nodeType === 3) {
            const v = child.nodeValue?.trim();
            if (v) return v;
          }
        }
      }
      return obj;
    }
    return null;
  };
  const root = xmlDoc.documentElement;
  const result = root ? { [root.nodeName]: xmlToJson(root) } : {};
  return new Blob([JSON.stringify(result, null, 2)], { type: 'application/json' });
}

/**
 * OCR Engine: Image to Text using Tesseract worker
 */
export async function performOCR(file: File, language: string = 'por+eng'): Promise<Blob> {
  const { createWorker } = await import('tesseract.js');
  const worker = await createWorker(language);
  const imageUrl = URL.createObjectURL(file);
  const { data: { text } } = await worker.recognize(imageUrl);
  await worker.terminate();
  URL.revokeObjectURL(imageUrl);

  const header = `--- PDF WINDOWS OCR EXTRACTION ---\nSource: ${file.name}\nLanguage: ${language}\n----------------------------------\n\n`;
  return new Blob([header + text], { type: 'text/plain;charset=utf-8' });
}

/**
 * Watermark PDF
 */
export async function addWatermarkToPDF(file: File, text?: string, image?: File): Promise<Blob> {
  const arrayBuffer = await readFileAsArrayBuffer(file);
  const pdfDoc = await PDFDocument.load(arrayBuffer);
  const pages = pdfDoc.getPages();
  const { degrees, rgb } = await import('pdf-lib');

  let embeddedImage: any;
  if (image) {
    const buf = await readFileAsArrayBuffer(image);
    embeddedImage = image.type === 'image/png' ? await pdfDoc.embedPng(buf) : await pdfDoc.embedJpg(buf);
  }

  for (const page of pages) {
    const { width, height } = page.getSize();
    if (text) {
      page.drawText(sanitizePdfText(text), {
        x: 50,
        y: 50,
        size: 50,
        opacity: 0.3,
        rotate: degrees(45),
        color: rgb(0.5, 0.5, 0.5),
      });
    }
    if (embeddedImage) {
      const dims = embeddedImage.scale(0.5);
      page.drawImage(embeddedImage, { x: width/2 - dims.width/2, y: height/2 - dims.height/2, width: dims.width, height: dims.height, opacity: 0.2 });
    }
  }
  const pdfBytes = await pdfDoc.save();
  return new Blob([pdfBytes], { type: 'application/pdf' });
}

/**
 * Compress PDF
 */
export async function compressPDFLocal(file: File): Promise<Blob> {
  const arrayBuffer = await readFileAsArrayBuffer(file);
  const pdfDoc = await PDFDocument.load(arrayBuffer);
  const pdfBytes = await pdfDoc.save({ useObjectStreams: true });
  return new Blob([pdfBytes], { type: 'application/pdf' });
}

/**
 * TXT to PDF Conversion
 */
export async function convertTXTToPDF(file: File, layoutOptions?: PdfLayoutOptions): Promise<Blob> {
  const text = await readFileAsText(file);
  const lines = text.split(/\r?\n/);
  const pdfDoc = await PDFDocument.create();
  
  let pW = 595, pH = 842;
  if (layoutOptions?.orientation === 'landscape') { pW = 842; pH = 595; }
  const margin = 50;
  let page = pdfDoc.addPage([pW, pH]), y = pH - margin;
  for (const line of lines) {
    if (y < margin + 20) { page = pdfDoc.addPage([pW, pH]); y = pH - margin; }
    page.drawText(sanitizePdfText(line.slice(0, 80)), { x: margin, y, size: 10 });
    y -= 15;
  }
  const bytes = await pdfDoc.save();
  return new Blob([bytes], { type: 'application/pdf' });
}

/**
 * Image Editor: Basic Filter Operations
 */
export async function applyImageFilters(file: File, filters: { brightness: number, contrast: number, grayscale: boolean }): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width; canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return reject('No context');
      ctx.filter = `brightness(${filters.brightness}%) contrast(${filters.contrast}%) ${filters.grayscale ? 'grayscale(100%)' : ''}`;
      ctx.drawImage(img, 0, 0);
      canvas.toBlob((b) => { URL.revokeObjectURL(url); if (b) resolve(b); else reject('Filter failed'); }, 'image/jpeg', 0.9);
    };
    img.src = url;
  });
}
