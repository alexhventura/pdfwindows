import type { AnalysisResult, FileIdentification, HashInfo } from '../types';
import { emptyResult, sv } from '../types';

function detectDelimiter(sample: string): { delim: string; origin: string } {
  const lines = sample.split(/\r?\n/).filter(Boolean).slice(0, 20);
  const candidates = [',', ';', '\t', '|'];
  let best = ',';
  let bestScore = -1;
  for (const d of candidates) {
    const counts = lines.map((l) => (l.match(new RegExp(d === '|' ? '\\|' : d === '\t' ? '\\t' : d, 'g')) || []).length);
    if (counts.length === 0) continue;
    const avg = counts.reduce((a, b) => a + b, 0) / counts.length;
    const variance = counts.reduce((a, b) => a + (b - avg) ** 2, 0) / counts.length;
    const score = avg - variance;
    if (avg > 0 && score > bestScore) {
      bestScore = score;
      best = d;
    }
  }
  return { delim: best, origin: 'CSV / delimiter heuristic' };
}

function detectEncodingLabel(u8: Uint8Array): string {
  if (u8.length >= 3 && u8[0] === 0xef && u8[1] === 0xbb && u8[2] === 0xbf) return 'UTF-8 BOM';
  if (u8.length >= 2 && u8[0] === 0xff && u8[1] === 0xfe) return 'UTF-16 LE BOM';
  if (u8.length >= 2 && u8[0] === 0xfe && u8[1] === 0xff) return 'UTF-16 BE BOM';
  return 'UTF-8 (assumido)';
}

export async function analyzeCsv(
  buffer: ArrayBuffer,
  identification: FileIdentification,
  hashes: HashInfo,
  onStage?: (msg: string) => void,
): Promise<AnalysisResult> {
  const result = emptyResult({
    identification,
    fileSizeBytes: buffer.byteLength,
    hashes,
    supportLevel: 'full',
  });

  onStage?.('Analisando conteúdo...');
  const u8 = new Uint8Array(buffer);
  const encoding = detectEncodingLabel(u8);
  result.structure.push({ label: 'Encoding', value: encoding, origin: 'byte BOM / assumption' });
  if (encoding.includes('assumido')) {
    result.content.notes.push('Encoding estimado (sem BOM).');
  }

  const text = new TextDecoder('utf-8', { fatal: false }).decode(
    encoding === 'UTF-8 BOM' ? u8.slice(3) : u8,
  );
  const { delim, origin } = detectDelimiter(text.slice(0, 8000));
  result.structure.push({
    label: 'Delimitador',
    value: delim === '\t' ? 'TAB' : delim,
    origin,
  });

  const lines = text.split(/\r?\n/).filter((l, i, arr) => !(i === arr.length - 1 && l === ''));
  const records = lines.length > 0 ? lines.length - 1 : 0;
  const header = lines[0] || '';
  const cols = header ? header.split(delim).length : 0;
  let emptyCells = 0;
  let cells = 0;
  const typeHits = { number: 0, text: 0, empty: 0 };
  const sampleRows = lines.slice(1, Math.min(lines.length, 500));
  for (const row of sampleRows) {
    const parts = row.split(delim);
    for (const p of parts) {
      cells += 1;
      const t = p.trim();
      if (!t) {
        emptyCells += 1;
        typeHits.empty += 1;
      } else if (/^-?\d+([.,]\d+)?$/.test(t)) {
        typeHits.number += 1;
      } else {
        typeHits.text += 1;
      }
    }
  }

  // structural inconsistency: varying column counts
  let inconsistent = 0;
  for (const row of lines.slice(0, Math.min(lines.length, 200))) {
    if (row.split(delim).length !== cols) inconsistent += 1;
  }

  result.statistics.rows = sv(lines.length, 'CSV / lines');
  result.statistics.columns = sv(cols, 'CSV / header split');
  result.statistics.entries = sv(records, 'CSV / records (excl. header)', true);
  result.statistics.cellsFilled = sv(cells - emptyCells, 'CSV / sample cells', true);
  result.statistics.custom.push({ label: 'Cabeçalho', value: header.slice(0, 200) || 'Não disponível no arquivo.', origin: 'CSV / line 1' });
  result.statistics.custom.push({
    label: 'Tipos predominantes (amostra)',
    value: `texto=${typeHits.text}, número=${typeHits.number}, vazio=${typeHits.empty}`,
    origin: 'CSV / sample typing',
    estimated: true,
  });
  if (inconsistent) {
    result.hidden.push({
      severity: 'attention',
      label: 'Inconsistências estruturais',
      detail: `${inconsistent} linhas com número de colunas diferente do cabeçalho (amostra).`,
      origin: 'CSV / column count',
    });
  }

  return result;
}

export async function analyzeTxt(
  buffer: ArrayBuffer,
  identification: FileIdentification,
  hashes: HashInfo,
  onStage?: (msg: string) => void,
): Promise<AnalysisResult> {
  const result = emptyResult({
    identification,
    fileSizeBytes: buffer.byteLength,
    hashes,
    supportLevel: 'basic',
  });

  onStage?.('Analisando conteúdo...');
  const u8 = new Uint8Array(buffer);
  const encoding = detectEncodingLabel(u8);
  result.structure.push({ label: 'Encoding', value: encoding, origin: 'byte BOM / assumption' });
  const text = new TextDecoder('utf-8', { fatal: false }).decode(
    encoding === 'UTF-8 BOM' ? u8.slice(3) : u8,
  );
  const lines = text.split(/\r?\n/);
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  result.statistics.words = sv(words, 'TXT / whitespace split');
  result.statistics.characters = sv(text.length, 'TXT / length');
  result.statistics.charactersNoSpaces = sv(text.replace(/\s/g, '').length, 'TXT / length');
  result.statistics.custom.push({ label: 'Linhas', value: lines.length, origin: 'TXT / split' });
  result.content.textPreview = text.slice(0, 400);
  return result;
}

export async function analyzeZip(
  buffer: ArrayBuffer,
  identification: FileIdentification,
  hashes: HashInfo,
  onStage?: (msg: string) => void,
): Promise<AnalysisResult> {
  const JSZip = (await import('jszip')).default;
  const result = emptyResult({
    identification,
    fileSizeBytes: buffer.byteLength,
    hashes,
    supportLevel: 'partial',
  });

  onStage?.('Analisando estrutura...');
  const zip = await JSZip.loadAsync(buffer);
  const names = Object.keys(zip.files);
  let files = 0;
  let dirs = 0;
  let uncompressed = 0;
  const exts = new Map<string, number>();
  const hiddenNames: string[] = [];

  for (const name of names) {
    const entry = zip.files[name];
    if (entry.dir) {
      dirs += 1;
      continue;
    }
    files += 1;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const meta = entry as any;
    if (typeof meta._data?.uncompressedSize === 'number') {
      uncompressed += meta._data.uncompressedSize;
    }
    const base = name.split('/').pop() || name;
    if (base.startsWith('.') || name.includes('/.')) hiddenNames.push(name);
    const ext = (base.includes('.') ? base.split('.').pop() : '')?.toLowerCase() || '(sem)';
    exts.set(ext, (exts.get(ext) || 0) + 1);
    result.embedded.push({
      name,
      kind: 'zip-entry',
      size: typeof meta._data?.uncompressedSize === 'number' ? meta._data.uncompressedSize : undefined,
      origin: 'ZIP / entry',
    });
  }

  result.statistics.entries = sv(files, 'ZIP / files');
  result.structure.push({ label: 'Diretórios', value: dirs, origin: 'ZIP / entries' });
  result.structure.push({ label: 'Arquivos', value: files, origin: 'ZIP / entries' });
  result.structure.push({
    label: 'Tamanho compactado',
    value: buffer.byteLength,
    origin: 'file size',
  });
  if (uncompressed) {
    result.structure.push({ label: 'Tamanho descompactado', value: uncompressed, origin: 'ZIP / local headers' });
    result.statistics.custom.push({
      label: 'Taxa de compressão',
      value: `${((1 - buffer.byteLength / Math.max(uncompressed, 1)) * 100).toFixed(1)}%`,
      origin: 'calculated',
      estimated: true,
    });
  }
  result.statistics.custom.push({
    label: 'Extensões',
    value: [...exts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20)
      .map(([e, c]) => `${e}:${c}`)
      .join(', '),
    origin: 'ZIP / names',
  });
  if (hiddenNames.length) {
    result.hidden.push({
      severity: 'info',
      label: 'Arquivos ocultos (nome)',
      detail: `${hiddenNames.length} entradas com nome iniciando em '.'`,
      origin: 'ZIP / entry names',
    });
  }

  // Cap embedded listing in UI via advanced
  for (const n of names) {
    result.advanced.push({ key: n, value: zip.files[n].dir ? 'dir' : 'file', origin: 'ZIP / listing' });
  }

  return result;
}

export async function analyzeGeneric(
  buffer: ArrayBuffer,
  identification: FileIdentification,
  hashes: HashInfo,
  onStage?: (msg: string) => void,
): Promise<AnalysisResult> {
  onStage?.('Finalizando Raio X...');
  const result = emptyResult({
    identification,
    fileSizeBytes: buffer.byteLength,
    hashes,
    supportLevel: 'basic',
  });
  result.content.notes.push('Formato sem analisador especializado. Apenas identificação e hashes.');
  result.structure.push({
    label: 'Assinatura',
    value: identification.magicSignature,
    origin: 'magic bytes',
  });
  return result;
}
