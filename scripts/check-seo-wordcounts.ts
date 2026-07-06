import { countRichContentWords } from '../src/seo/content/types';
import { PDF_OCR_CONTENT } from '../src/seo/content/tools/pdf-ocr';
import { PDF_WATERMARK_CONTENT } from '../src/seo/content/tools/pdf-watermark';
import { PDF_TO_IMAGE_CONTENT } from '../src/seo/content/tools/pdf-to-image';
import { PDF_EXTRACT_TEXT_CONTENT } from '../src/seo/content/tools/pdf-extract-text';
import { IMAGE_OCR_CONTENT } from '../src/seo/content/tools/image-ocr';
import { IMAGE_FILTERS_CONTENT } from '../src/seo/content/tools/image-filters';
import { CSV_TO_JSON_CONTENT } from '../src/seo/content/tools/csv-to-json';
import { JSON_TO_CSV_CONTENT } from '../src/seo/content/tools/json-to-csv';
import { XML_TO_JSON_CONTENT } from '../src/seo/content/tools/xml-to-json';
import { TXT_TO_PDF_CONTENT } from '../src/seo/content/tools/txt-to-pdf';
import { LIMPADOR_CODIGO_CONTENT } from '../src/seo/content/tools/limpador-codigo';
import { HOME_CONTENT, CONVERTER_CONTENT } from '../src/seo/content/tools/home';

const entries: Array<[string, Record<'en' | 'pt' | 'es', import('../src/seo/content/types').ToolRichContent>]> = [
  ['pdf-ocr', PDF_OCR_CONTENT],
  ['pdf-watermark', PDF_WATERMARK_CONTENT],
  ['pdf-to-image', PDF_TO_IMAGE_CONTENT],
  ['pdf-extract-text', PDF_EXTRACT_TEXT_CONTENT],
  ['image-ocr', IMAGE_OCR_CONTENT],
  ['image-filters', IMAGE_FILTERS_CONTENT],
  ['csv-to-json', CSV_TO_JSON_CONTENT],
  ['json-to-csv', JSON_TO_CSV_CONTENT],
  ['xml-to-json', XML_TO_JSON_CONTENT],
  ['txt-to-pdf', TXT_TO_PDF_CONTENT],
  ['limpador-codigo', LIMPADOR_CODIGO_CONTENT],
  ['home', HOME_CONTENT],
  ['converter', CONVERTER_CONTENT],
];

let bad = 0;
for (const [name, content] of entries) {
  for (const lang of ['en', 'pt', 'es'] as const) {
    const wc = countRichContentWords(content[lang]);
    const ok = wc >= 850 && wc <= 1100;
    console.log(ok ? 'OK' : 'BAD', name, lang, wc);
    if (!ok) bad++;
  }
}
process.exit(bad > 0 ? 1 : 0);
