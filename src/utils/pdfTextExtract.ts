import type { PDFPageProxy } from 'pdfjs-dist';
import { loadPdfJS } from './pdfjsLoader';
import { createLocalOcrWorker } from './tesseractLoader';
import { sanitizePdfText } from './pdfTextSanitizer';
import { textToDocxBlob } from './textToDocx';
import {
  buildTextFromPdfContentItems,
  countMeaningfulChars,
  MIN_MEANINGFUL_TEXT_CHARS,
} from './pdfTextLayerParse';
import {
  OCR_MAX_PAGES,
  adaptiveOcrScale,
  canvasToOcrJpegBlob,
  renderPdfPageForOcr,
  yieldToUi,
} from './ocrPageRender';

export const PDF_TEXT_EXTRACT_MAX_PAGES = OCR_MAX_PAGES;
export type PdfTextExportFormat = 'txt' | 'docx';

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

export type ExtractProgress = { page: number; total: number; phase: 'text' | 'ocr' };

/**
 * Hybrid extract: use the text layer when a page has enough characters;
 * OCR only the pages that need it (much faster on mixed / mostly-digital PDFs).
 */
async function extractHybridPdfText(
  arrayBuffer: ArrayBuffer,
  maxPages: number,
  language: string,
  onProgress?: (p: ExtractProgress) => void
): Promise<{ text: string; pagesRead: number; totalPages: number; method: 'text-layer' | 'ocr' | 'hybrid' }> {
  const pdfjsLib = await loadPdfJS();
  const data = clonePdfDataForPdfJs(arrayBuffer);
  const pdf = await pdfjsLib.getDocument({ data }).promise;
  const pagesRead = Math.min(pdf.numPages, maxPages);
  const scale = adaptiveOcrScale(pagesRead);
  const blocks: string[] = [];
  let usedOcr = false;
  let usedText = false;
  let worker: Awaited<ReturnType<typeof createLocalOcrWorker>> | null = null;

  try {
    for (let i = 1; i <= pagesRead; i++) {
      onProgress?.({ page: i, total: pagesRead, phase: 'text' });
      const page = await pdf.getPage(i);
      const pageText = await extractPageTextFromTextLayer(page);
      let body = pageText;
      const meaningful = countMeaningfulChars(pageText);

      if (meaningful < MIN_MEANINGFUL_TEXT_CHARS) {
        onProgress?.({ page: i, total: pagesRead, phase: 'ocr' });
        if (!worker) {
          worker = await createLocalOcrWorker(language);
          await worker.setParameters({
            tessedit_pageseg_mode: '6',
            preserve_interword_spaces: '1',
            user_defined_dpi: String(Math.round(72 * scale)),
          });
        }
        const { canvas } = await renderPdfPageForOcr(page, scale);
        const jpeg = await canvasToOcrJpegBlob(canvas);
        const {
          data: { text },
        } = await worker.recognize(jpeg);
        body = text?.trim() ?? '';
        usedOcr = true;
        canvas.width = 0;
        canvas.height = 0;
      } else {
        usedText = true;
      }

      if (body) {
        blocks.push(pagesRead > 1 ? `--- Página ${i} ---\n${body}` : body);
      }
      await yieldToUi();
    }
  } finally {
    if (worker) await worker.terminate();
  }

  const method: 'text-layer' | 'ocr' | 'hybrid' =
    usedOcr && usedText ? 'hybrid' : usedOcr ? 'ocr' : 'text-layer';

  return {
    text: blocks.join('\n\n'),
    pagesRead,
    totalPages: pdf.numPages,
    method,
  };
}

function buildOutputHeader(
  file: File,
  method: 'text-layer' | 'ocr' | 'hybrid',
  pagesRead: number,
  totalPages: number
): string {
  const methodLabel =
    method === 'text-layer'
      ? 'Camada de texto (PDF.js)'
      : method === 'hybrid'
        ? 'Híbrido (texto + OCR local nas páginas escaneadas)'
        : 'OCR local (documento escaneado)';
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

export interface ExtractedPdfText {
  text: string;
  method: 'text-layer' | 'ocr' | 'hybrid';
  pagesRead: number;
  totalPages: number;
}

/**
 * Extrai texto legível de PDFs digitais (getTextContent) ou escaneados (OCR).
 * Nunca decodifica o binário do PDF como string.
 */
export async function extractPdfTextContent(
  file: File,
  ocrLanguage: string = 'por',
  onProgress?: (p: ExtractProgress) => void
): Promise<ExtractedPdfText> {
  const arrayBuffer = await readFileAsArrayBuffer(file);
  const maxPages = PDF_TEXT_EXTRACT_MAX_PAGES;

  const { text: bodyRaw, pagesRead, totalPages, method } = await extractHybridPdfText(
    arrayBuffer,
    maxPages,
    ocrLanguage,
    onProgress
  );

  let body = bodyRaw;
  if (!body.trim()) {
    body =
      'Não foi possível extrair texto legível deste PDF. O documento pode estar vazio, protegido ou usar um formato não suportado.';
  }

  const header = buildOutputHeader(file, method, pagesRead, totalPages);
  const text = header + sanitizePdfText(body.trim());
  return { text, method, pagesRead, totalPages };
}

/**
 * Extrai texto e exporta como TXT ou DOCX (Word), 100% local no navegador.
 */
export async function extractTextFromPDF(
  file: File,
  ocrLanguage: string = 'por',
  exportFormat: PdfTextExportFormat = 'txt',
  onProgress?: (p: ExtractProgress) => void
): Promise<Blob> {
  const { text } = await extractPdfTextContent(file, ocrLanguage, onProgress);

  if (exportFormat === 'docx') {
    return textToDocxBlob(text, `${file.name.replace(/\.pdf$/i, '')} — texto`);
  }

  return new Blob([text], { type: 'text/plain;charset=utf-8' });
}
