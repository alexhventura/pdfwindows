import type { PDFPageProxy } from 'pdfjs-dist';
import { createWorker } from 'tesseract.js';
import { loadPdfJS } from './pdfjsLoader';
import { sanitizePdfText } from './pdfTextSanitizer';
import {
  buildTextFromPdfContentItems,
  countMeaningfulChars,
  MIN_MEANINGFUL_TEXT_CHARS,
} from './pdfTextLayerParse';

export const PDF_TEXT_EXTRACT_MAX_PAGES = 30;

/**
 * PDF.js pode transferir o buffer para o worker (detach). Sempre passar uma cópia
 * própria para getDocument para não invalidar buffers reutilizados no pipeline.
 */
function clonePdfDataForPdfJs(source: ArrayBuffer): Uint8Array {
  return new Uint8Array(source).slice();
}

function readFileAsArrayBuffer(file: File): Promise<ArrayBuffer> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as ArrayBuffer);
    reader.onerror = () => reject(reader.error);
    reader.readAsArrayBuffer(file);
  });
}

export async function extractPageTextFromTextLayer(page: PDFPageProxy): Promise<string> {
  const content = await page.getTextContent();
  return buildTextFromPdfContentItems(content.items as Parameters<typeof buildTextFromPdfContentItems>[0]);
}

async function extractTextLayerFromPdf(
  arrayBuffer: ArrayBuffer,
  maxPages: number
): Promise<{ text: string; pagesRead: number; totalPages: number }> {
  const pdfjsLib = await loadPdfJS();
  const data = clonePdfDataForPdfJs(arrayBuffer);
  const pdf = await pdfjsLib.getDocument({ data }).promise;
  const pagesRead = Math.min(pdf.numPages, maxPages);
  const blocks: string[] = [];

  for (let i = 1; i <= pagesRead; i++) {
    const page = await pdf.getPage(i);
    const pageText = await extractPageTextFromTextLayer(page);
    if (!pageText) continue;
    blocks.push(pagesRead > 1 ? `--- Página ${i} ---\n${pageText}` : pageText);
  }

  return { text: blocks.join('\n\n'), pagesRead, totalPages: pdf.numPages };
}

async function extractTextViaOcr(
  arrayBuffer: ArrayBuffer,
  maxPages: number,
  language: string
): Promise<string> {
  const pdfjsLib = await loadPdfJS();
  const data = clonePdfDataForPdfJs(arrayBuffer);
  const pdf = await pdfjsLib.getDocument({ data }).promise;
  const total = Math.min(pdf.numPages, maxPages);
  const worker = await createWorker(language);
  const blocks: string[] = [];

  try {
    for (let i = 1; i <= total; i++) {
      const page = await pdf.getPage(i);
      const viewport = page.getViewport({ scale: 2 });
      const canvas = document.createElement('canvas');
      canvas.width = Math.floor(viewport.width);
      canvas.height = Math.floor(viewport.height);
      const ctx = canvas.getContext('2d');
      if (!ctx) continue;

      await page.render({ canvasContext: ctx, viewport, canvas }).promise;
      const {
        data: { text },
      } = await worker.recognize(canvas);
      const trimmed = text?.trim() ?? '';
      if (trimmed) {
        blocks.push(total > 1 ? `--- Página ${i} ---\n${trimmed}` : trimmed);
      }
    }
  } finally {
    await worker.terminate();
  }

  return blocks.join('\n\n');
}

function buildOutputHeader(
  file: File,
  method: 'text-layer' | 'ocr',
  pagesRead: number,
  totalPages: number
): string {
  const methodLabel =
    method === 'text-layer' ? 'Camada de texto (PDF.js)' : 'OCR local (documento escaneado)';
  const pageNote =
    totalPages > pagesRead
      ? `\nPáginas processadas: ${pagesRead} de ${totalPages}`
      : `\nPáginas: ${pagesRead}`;

  return [
    '--- PDF WINDOWS — EXTRAÇÃO DE TEXTO ---',
    `Arquivo: ${file.name}`,
    `Método: ${methodLabel}`,
    `Data: ${new Date().toLocaleString()}`,
    pageNote,
    '----------------------------------------',
    '',
  ].join('\n');
}

/**
 * Extrai texto legível de PDFs digitais (getTextContent) ou escaneados (OCR).
 * Nunca decodifica o binário do PDF como string.
 */
export async function extractTextFromPDF(
  file: File,
  ocrLanguage: string = 'por+eng'
): Promise<Blob> {
  const arrayBuffer = await readFileAsArrayBuffer(file);
  const maxPages = PDF_TEXT_EXTRACT_MAX_PAGES;

  const { text: layerText, pagesRead, totalPages } = await extractTextLayerFromPdf(
    arrayBuffer,
    maxPages
  );

  const meaningful = countMeaningfulChars(layerText);
  let body: string;
  let method: 'text-layer' | 'ocr';

  if (meaningful >= MIN_MEANINGFUL_TEXT_CHARS) {
    body = layerText;
    method = 'text-layer';
  } else {
    body = await extractTextViaOcr(arrayBuffer, maxPages, ocrLanguage);
    method = 'ocr';
    if (!body.trim()) {
      body =
        'Não foi possível extrair texto legível deste PDF. O documento pode estar vazio, protegido ou usar um formato não suportado.';
    }
  }

  const header = buildOutputHeader(file, method, pagesRead, totalPages);
  const output = header + sanitizePdfText(body.trim());

  return new Blob([output], { type: 'text/plain;charset=utf-8' });
}
