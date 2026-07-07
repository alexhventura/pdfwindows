import type { GeneratedFile } from '../types';
import {
  transformImageNatively,
  convertImagesToPDF,
  renderPdfPagesToImages,
  extractTextFromPDF,
  mergeMultiplePDFs,
  splitPDFPages,
  rotatePDFPages,
  addPasswordProtectionToPDF,
  convertCSVToJSON,
  convertJSONToCSV,
  convertXMLToJSON,
  convertTXTToPDF,
  performOCR,
  addWatermarkToPDF,
  applyImageFilters,
  compressPDFLocal,
  watermarkSettingsFromOptions,
} from '../utils/converterEngine';
import { renderPdfThumbnailUrl } from '../utils/pdfThumbnail';
import { buildSearchablePdfFromFile } from '../engines/pdfOcr';
import { getToolStubMessage } from '../toolRegistry';
import { baseName, createProgressRunner } from './progress';

export interface RunToolsContext {
  files: import('../types').FileState[];
  selectedOperation: import('../types').OperationType;
  options: import('../types').ConverterState['options'];
  lang?: import('../types').LanguageType;
  onProgress?: (percent: number) => void;
  signal?: AbortSignal;
}

export type ToolHandler = (ctx: RunToolsContext) => Promise<GeneratedFile[]>;

async function runImgToImg(ctx: RunToolsContext): Promise<GeneratedFile[]> {
  const { files, options } = ctx;
  const { outputs, tick, guardAbort, finish } = createProgressRunner(ctx);

  for (const fs of files) {
    guardAbort();
    const outBlob = await transformImageNatively(
      fs.file,
      options.targetImageFormat,
      options.imageQuality,
      options.imageWidth,
      options.imageHeight,
      options.keepAspectRatio
    );
    outputs.push({
      name: `${baseName(fs.name, fs.name)}_processed.${options.targetImageFormat}`,
      url: URL.createObjectURL(outBlob),
      size: outBlob.size,
      sourceFileId: fs.id,
    });
    tick();
  }
  finish();
  return outputs;
}

async function runImgToPdf(ctx: RunToolsContext): Promise<GeneratedFile[]> {
  const { files, options } = ctx;
  const { outputs, tick, finish } = createProgressRunner(ctx);
  const layoutOpts = {
    orientation: options.pdfOrientation,
    margins: options.pdfMargins,
    positioning: options.pdfPositioning,
  };
  const pdfBlob = await convertImagesToPDF(
    files.map((f) => f.file),
    layoutOpts
  );
  outputs.push({
    name: `${baseName(files[0].name, 'images')}_gallery.pdf`,
    url: URL.createObjectURL(pdfBlob),
    size: pdfBlob.size,
    sourceFileId: files[0]?.id,
  });
  tick();
  finish();
  return outputs;
}

async function runImgResize(ctx: RunToolsContext): Promise<GeneratedFile[]> {
  const { files, options } = ctx;
  const { outputs, tick, guardAbort, finish } = createProgressRunner(ctx);

  for (const fs of files) {
    guardAbort();
    const currExt = (fs.extension === 'jpg' ? 'jpeg' : fs.extension) as
      | 'webp'
      | 'jpeg'
      | 'png'
      | 'gif'
      | 'bmp'
      | 'ico'
      | 'tiff';
    const outBlob = await transformImageNatively(
      fs.file,
      currExt,
      options.imageQuality,
      options.imageWidth,
      options.imageHeight,
      options.keepAspectRatio
    );
    outputs.push({
      name: `${baseName(fs.name, fs.name)}_compressed.${fs.extension}`,
      url: URL.createObjectURL(outBlob),
      size: outBlob.size,
      sourceFileId: fs.id,
    });
    tick();
  }
  finish();
  return outputs;
}

async function runPdfToImg(ctx: RunToolsContext): Promise<GeneratedFile[]> {
  const { files } = ctx;
  const { outputs, tick, finish } = createProgressRunner(ctx);
  const p = files[0];
  const pageBlobs = await renderPdfPagesToImages(p.file);
  const rawBase = baseName(p.name, 'pdf');
  pageBlobs.forEach((blob, idx) => {
    outputs.push({
      name: `${rawBase}_page_${idx + 1}.png`,
      url: URL.createObjectURL(blob),
      size: blob.size,
      sourceFileId: p.id,
      previewUrl: URL.createObjectURL(blob),
    });
  });
  tick();
  finish();
  return outputs;
}

async function runPdfTxt(ctx: RunToolsContext): Promise<GeneratedFile[]> {
  const { files, options } = ctx;
  const { outputs, tick, finish } = createProgressRunner(ctx);
  const rawBase = baseName(files[0].name, 'pdf');
  const outBlob = await extractTextFromPDF(files[0].file, options.ocrLanguage);
  outputs.push({
    name: `${rawBase}_extracted_text.txt`,
    url: URL.createObjectURL(outBlob),
    size: outBlob.size,
  });
  tick();
  finish();
  return outputs;
}

async function runPdfMerge(ctx: RunToolsContext): Promise<GeneratedFile[]> {
  const { files } = ctx;
  const { outputs, tick, finish } = createProgressRunner(ctx);
  const rawBase = baseName(files[0].name, 'pdf');
  const mergedBlob = await mergeMultiplePDFs(files.map((f) => f.file));
  outputs.push(
    await attachPdfPreview({
      name: `${rawBase}_merged_bundle.pdf`,
      url: URL.createObjectURL(mergedBlob),
      size: mergedBlob.size,
      sourceFileId: files[0]?.id,
    })
  );
  tick();
  finish();
  return outputs;
}

async function runPdfSplit(ctx: RunToolsContext): Promise<GeneratedFile[]> {
  const { files, options } = ctx;
  const { outputs, tick, finish } = createProgressRunner(ctx);
  const rawBase = baseName(files[0].name, 'pdf');
  const from = options.splitFromPage || 1;
  const to = options.splitToPage || 1;
  const splitBlob = await splitPDFPages(files[0].file, from, to);
  outputs.push(
    await attachPdfPreview({
      name: `${rawBase}_sliced_${from}_to_${to}.pdf`,
      url: URL.createObjectURL(splitBlob),
      size: splitBlob.size,
      sourceFileId: files[0].id,
    })
  );
  tick();
  finish();
  return outputs;
}

async function runPdfPassword(ctx: RunToolsContext): Promise<GeneratedFile[]> {
  const { files, options } = ctx;
  const { outputs, tick, finish } = createProgressRunner(ctx);
  const rawBase = baseName(files[0].name, 'pdf');
  if (!options.pdfPassword?.trim()) throw new Error('PASSWORD_REQUIRED');
  const lockedBlob = await addPasswordProtectionToPDF(files[0].file, options.pdfPassword);
  outputs.push(
    await attachPdfPreview({
      name: `${rawBase}_protected.pdf`,
      url: URL.createObjectURL(lockedBlob),
      size: lockedBlob.size,
      sourceFileId: files[0].id,
    })
  );
  tick();
  finish();
  return outputs;
}

async function runImgOcr(ctx: RunToolsContext): Promise<GeneratedFile[]> {
  const { files, options } = ctx;
  const { outputs, tick, guardAbort, finish } = createProgressRunner(ctx);

  for (const fs of files) {
    guardAbort();
    const outBlob = await performOCR(fs.file, options.ocrLanguage);
    outputs.push({
      name: `${baseName(fs.name, fs.name)}_ocr_extract.txt`,
      url: URL.createObjectURL(outBlob),
      size: outBlob.size,
      sourceFileId: fs.id,
    });
    tick();
  }
  finish();
  return outputs;
}

async function runPdfOcr(ctx: RunToolsContext): Promise<GeneratedFile[]> {
  const { files, options, onProgress, signal, lang } = ctx;
  const rawBase = baseName(files[0].name, 'pdf');

  try {
    const outBlob = await buildSearchablePdfFromFile(
      files[0].file,
      options.ocrLanguage,
      ({ page, total }) => onProgress?.(Math.round((page / total) * 100)),
      signal
    );
    onProgress?.(100);
    return [
      await attachPdfPreview({
        name: `${rawBase}_searchable.pdf`,
        url: URL.createObjectURL(outBlob),
        size: outBlob.size,
        sourceFileId: files[0].id,
      }),
    ];
  } catch (err) {
    if (err instanceof DOMException && err.name === 'AbortError') throw err;
    console.error('PDF OCR failed:', err);
    throw err instanceof Error ? err : new Error(String(err));
  }
}

async function attachPdfPreview(output: GeneratedFile): Promise<GeneratedFile> {
  try {
    const response = await fetch(output.url);
    const blob = await response.blob();
    const previewUrl = await renderPdfThumbnailUrl(blob);
    return { ...output, previewUrl };
  } catch {
    return output;
  }
}

async function runPdfWatermark(ctx: RunToolsContext): Promise<GeneratedFile[]> {
  const { files, options } = ctx;
  const { outputs, tick, guardAbort, finish } = createProgressRunner(ctx);
  const settings = watermarkSettingsFromOptions(options);

  for (const fs of files) {
    guardAbort();
    const outBlob = await addWatermarkToPDF(fs.file, settings);
    const entry: GeneratedFile = {
      name: `${baseName(fs.name, fs.name)}_watermarked.pdf`,
      url: URL.createObjectURL(outBlob),
      size: outBlob.size,
      sourceFileId: fs.id,
    };
    outputs.push(await attachPdfPreview(entry));
    tick();
  }
  finish();
  return outputs;
}

async function runImgFilter(ctx: RunToolsContext): Promise<GeneratedFile[]> {
  const { files, options } = ctx;
  const { outputs, tick, guardAbort, finish } = createProgressRunner(ctx);

  for (const fs of files) {
    guardAbort();
    const outBlob = await applyImageFilters(fs.file, {
      brightness: options.filterBrightness,
      contrast: options.filterContrast,
      grayscale: options.filterGrayscale,
    });
    outputs.push({
      name: `${baseName(fs.name, fs.name)}_edited.jpg`,
      url: URL.createObjectURL(outBlob),
      size: outBlob.size,
      sourceFileId: fs.id,
    });
    tick();
  }
  finish();
  return outputs;
}

async function runPdfCompress(ctx: RunToolsContext): Promise<GeneratedFile[]> {
  const { files } = ctx;
  const { outputs, tick, guardAbort, finish } = createProgressRunner(ctx);

  for (const fs of files) {
    guardAbort();
    const outBlob = await compressPDFLocal(fs.file);
    const entry: GeneratedFile = {
      name: `${baseName(fs.name, fs.name)}_optimized.pdf`,
      url: URL.createObjectURL(outBlob),
      size: outBlob.size,
      sourceFileId: fs.id,
    };
    outputs.push(await attachPdfPreview(entry));
    tick();
  }
  finish();
  return outputs;
}

async function runPdfRotate(ctx: RunToolsContext): Promise<GeneratedFile[]> {
  const { files, options } = ctx;
  const { outputs, tick, finish } = createProgressRunner(ctx);
  const rawBase = baseName(files[0].name, 'pdf');
  const rotatedBlob = await rotatePDFPages(files[0].file, options.rotateAngle);
  const entry: GeneratedFile = {
    name: `${rawBase}_rotated_${options.rotateAngle}deg.pdf`,
    url: URL.createObjectURL(rotatedBlob),
    size: rotatedBlob.size,
    sourceFileId: files[0].id,
  };
  outputs.push(await attachPdfPreview(entry));
  tick();
  finish();
  return outputs;
}

async function runCsvJson(ctx: RunToolsContext): Promise<GeneratedFile[]> {
  const { files } = ctx;
  const { outputs, tick, guardAbort, finish } = createProgressRunner(ctx);
  guardAbort();
  const rawBase = baseName(files[0].name, 'data');
  const outBlob = await convertCSVToJSON(files[0].file);
  outputs.push({
    name: `${rawBase}_processed.json`,
    url: URL.createObjectURL(outBlob),
    size: outBlob.size,
  });
  tick();
  finish();
  return outputs;
}

async function runJsonToCsv(ctx: RunToolsContext): Promise<GeneratedFile[]> {
  const { files } = ctx;
  const { outputs, tick, guardAbort, finish } = createProgressRunner(ctx);
  guardAbort();
  const rawBase = baseName(files[0].name, 'data');
  const outBlob = await convertJSONToCSV(files[0].file);
  outputs.push({
    name: `${rawBase}_processed.csv`,
    url: URL.createObjectURL(outBlob),
    size: outBlob.size,
  });
  tick();
  finish();
  return outputs;
}

async function runXmlJson(ctx: RunToolsContext): Promise<GeneratedFile[]> {
  const { files } = ctx;
  const { outputs, tick, guardAbort, finish } = createProgressRunner(ctx);
  guardAbort();
  const rawBase = baseName(files[0].name, 'data');
  const outBlob = await convertXMLToJSON(files[0].file);
  outputs.push({
    name: `${rawBase}_xml.json`,
    url: URL.createObjectURL(outBlob),
    size: outBlob.size,
  });
  tick();
  finish();
  return outputs;
}

async function runTxtToPdf(ctx: RunToolsContext): Promise<GeneratedFile[]> {
  const { files, options } = ctx;
  const { outputs, tick, guardAbort, finish } = createProgressRunner(ctx);
  guardAbort();
  const rawBase = baseName(files[0].name, 'txt');
  const layoutOpts = {
    orientation: options.pdfOrientation,
    margins: options.pdfMargins,
    positioning: options.pdfPositioning,
  };
  const outBlob = await convertTXTToPDF(files[0].file, layoutOpts);
  outputs.push({
    name: `${rawBase}_written.pdf`,
    url: URL.createObjectURL(outBlob),
    size: outBlob.size,
  });
  tick();
  finish();
  return outputs;
}

async function runPdfOcrStub(ctx: RunToolsContext): Promise<GeneratedFile[]> {
  throw new Error(getToolStubMessage('pdf-ocr', ctx.lang ?? 'en'));
}

/** Primary modular handlers (registry-ready operations). */
export const TOOL_HANDLERS: Partial<Record<import('../types').OperationType, ToolHandler>> = {
  'img-to-img': runImgToImg,
  'img-to-pdf': runImgToPdf,
  'img-resize': runImgResize,
  'pdf-to-img': runPdfToImg,
  'pdf-txt': runPdfTxt,
  'pdf-merge': runPdfMerge,
  'pdf-split': runPdfSplit,
  'pdf-password': runPdfPassword,
  'img-ocr': runImgOcr,
  'pdf-ocr': runPdfOcr,
  'pdf-watermark': runPdfWatermark,
  'img-filter': runImgFilter,
  'pdf-compress': runPdfCompress,
  'pdf-rotate': runPdfRotate,
  'csv-json': runCsvJson,
  'json-to-csv': runJsonToCsv,
  'xml-json': runXmlJson,
  'txt-to-pdf': runTxtToPdf,
};

/** Legacy snapshot used only when a modular handler throws (stability fallback). */
export const LEGACY_TOOL_HANDLERS: Partial<Record<import('../types').OperationType, ToolHandler>> = {
  ...TOOL_HANDLERS,
  'pdf-ocr': runPdfOcrStub,
};
