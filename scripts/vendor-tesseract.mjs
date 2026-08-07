/**
 * Vendors Tesseract.js worker, WASM core, and language packs into public/tesseract
 * so OCR never hits cdn.jsdelivr.net at runtime.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const outRoot = path.join(root, 'public', 'tesseract');
const outCore = path.join(outRoot, 'core');
const outLang = path.join(outRoot, 'lang');

const CORE_FILES = [
  'tesseract-core.wasm.js',
  'tesseract-core.wasm',
  'tesseract-core-simd.wasm.js',
  'tesseract-core-simd.wasm',
  'tesseract-core-lstm.wasm.js',
  'tesseract-core-lstm.wasm',
  'tesseract-core-simd-lstm.wasm.js',
  'tesseract-core-simd-lstm.wasm',
  'tesseract-core-relaxedsimd.wasm.js',
  'tesseract-core-relaxedsimd.wasm',
  'tesseract-core-relaxedsimd-lstm.wasm.js',
  'tesseract-core-relaxedsimd-lstm.wasm',
];

const LANGS = ['eng', 'por', 'spa'];

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function copyFile(src, dest) {
  ensureDir(path.dirname(dest));
  fs.copyFileSync(src, dest);
}

async function download(url, dest) {
  if (fs.existsSync(dest) && fs.statSync(dest).size > 1000) {
    console.log(`[vendor-tesseract] skip existing ${path.basename(dest)}`);
    return;
  }
  console.log(`[vendor-tesseract] downloading ${url}`);
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to download ${url}: ${res.status}`);
  }
  const buf = Buffer.from(await res.arrayBuffer());
  ensureDir(path.dirname(dest));
  fs.writeFileSync(dest, buf);
}

async function main() {
  ensureDir(outRoot);
  ensureDir(outCore);
  ensureDir(outLang);

  const workerSrc = path.join(root, 'node_modules', 'tesseract.js', 'dist', 'worker.min.js');
  if (!fs.existsSync(workerSrc)) {
    throw new Error('tesseract.js not installed (missing dist/worker.min.js)');
  }
  copyFile(workerSrc, path.join(outRoot, 'worker.min.js'));

  const coreDir = path.join(root, 'node_modules', 'tesseract.js-core');
  for (const file of CORE_FILES) {
    const src = path.join(coreDir, file);
    if (!fs.existsSync(src)) {
      console.warn(`[vendor-tesseract] missing core file: ${file}`);
      continue;
    }
    copyFile(src, path.join(outCore, file));
  }

  for (const lang of LANGS) {
    const url = `https://cdn.jsdelivr.net/npm/@tesseract.js-data/${lang}/4.0.0_best_int/${lang}.traineddata.gz`;
    await download(url, path.join(outLang, `${lang}.traineddata.gz`));
  }

  console.log('[vendor-tesseract] done → public/tesseract/');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
