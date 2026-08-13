import { computeHashes, formatBytes } from './hash';
import { detectFormat, extensionOf } from './detectFormat';
import type { AnalysisResult, AnalysisStage, DetectedFormat } from './types';
import { analyzePdf } from './analyzers/pdfAnalyzer';
import { analyzeDocx } from './analyzers/docxAnalyzer';
import { analyzeXlsx } from './analyzers/xlsxAnalyzer';
import { analyzePptx } from './analyzers/pptxAnalyzer';
import { analyzeImage } from './analyzers/imageAnalyzer';
import { analyzeCsv, analyzeTxt, analyzeZip, analyzeGeneric } from './analyzers/textZipGeneric';

export type ProgressCallback = (stage: AnalysisStage, message: string) => void;

const STAGE_MESSAGES: Record<AnalysisStage, string> = {
  detecting: 'Detectando tipo real do arquivo...',
  hashing: 'Calculando hashes...',
  structure: 'Analisando estrutura...',
  metadata: 'Extraindo metadados...',
  content: 'Analisando conteúdo...',
  embedded: 'Verificando informações incorporadas...',
  finalizing: 'Finalizando Raio X...',
};

export { formatBytes, STAGE_MESSAGES };

export async function analyzeFile(file: File, onProgress?: ProgressCallback): Promise<AnalysisResult> {
  const report = (stage: AnalysisStage, custom?: string) => {
    onProgress?.(stage, custom || STAGE_MESSAGES[stage]);
  };

  report('detecting');
  const buffer = await file.arrayBuffer();
  const detected = detectFormat(buffer, file.name, file.type || '');
  const ext = extensionOf(file.name);
  const declaredExtFormat = extToFormat(ext);
  const inconsistency =
    declaredExtFormat !== 'unknown' &&
    detected.format !== 'unknown' &&
    declaredExtFormat !== detected.format &&
    !(declaredExtFormat === 'jpeg' && (ext === 'jpg' || ext === 'jpeg') && detected.format === 'jpeg');

  const identification = {
    name: file.name,
    extension: ext || '(nenhuma)',
    browserMime: file.type || 'Não disponível no arquivo.',
    detectedFormat: detected.format,
    detectedMime: detected.mime,
    magicSignature: detected.signature,
    inconsistency,
    inconsistencyNote: inconsistency
      ? `Extensão declarada: ${ext.toUpperCase()}. Tipo real detectado: ${detected.format.toUpperCase()}. Possível inconsistência encontrada.`
      : undefined,
    container: detected.container,
  };

  report('hashing');
  const hashes = await computeHashes(buffer);

  const stageBridge = (msg: string) => {
    if (/metadad/i.test(msg)) report('metadata', msg);
    else if (/conteúdo|content|planilha|texto/i.test(msg)) report('content', msg);
    else if (/incorporad|embedded/i.test(msg)) report('embedded', msg);
    else if (/finaliz/i.test(msg)) report('finalizing', msg);
    else report('structure', msg);
  };

  let result: AnalysisResult;
  switch (detected.format) {
    case 'pdf':
      result = await analyzePdf(buffer, identification, hashes, stageBridge);
      break;
    case 'docx':
      result = await analyzeDocx(buffer, identification, hashes, stageBridge);
      break;
    case 'xlsx':
      result = await analyzeXlsx(buffer, identification, hashes, stageBridge);
      break;
    case 'pptx':
      result = await analyzePptx(buffer, identification, hashes, stageBridge);
      break;
    case 'jpeg':
    case 'png':
    case 'webp':
    case 'gif':
      result = await analyzeImage(buffer, identification, hashes, stageBridge);
      break;
    case 'csv':
      result = await analyzeCsv(buffer, identification, hashes, stageBridge);
      break;
    case 'txt':
      result = await analyzeTxt(buffer, identification, hashes, stageBridge);
      break;
    case 'zip':
      result = await analyzeZip(buffer, identification, hashes, stageBridge);
      break;
    default:
      result = await analyzeGeneric(buffer, identification, hashes, stageBridge);
  }

  report('finalizing');
  result.stageNotes.push(`Análise concluída em ${new Date().toISOString()}`);
  if (identification.inconsistencyNote) {
    result.hidden.unshift({
      severity: 'attention',
      label: 'Possível inconsistência de tipo',
      detail: identification.inconsistencyNote,
      origin: 'magic bytes vs extensão',
    });
  }
  return result;
}

function extToFormat(ext: string): DetectedFormat {
  const map: Record<string, DetectedFormat> = {
    pdf: 'pdf',
    docx: 'docx',
    xlsx: 'xlsx',
    pptx: 'pptx',
    jpg: 'jpeg',
    jpeg: 'jpeg',
    png: 'png',
    webp: 'webp',
    gif: 'gif',
    csv: 'csv',
    txt: 'txt',
    zip: 'zip',
  };
  return map[ext] || 'unknown';
}
