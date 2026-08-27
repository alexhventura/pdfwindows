import type { ToolContentRegistry } from './types';

import { HOME_CONTENT, CONVERTER_CONTENT } from './home';
import { PDF_MERGE_CONTENT } from './tools/pdf-merge';
import { PDF_COMPRESS_CONTENT } from './tools/pdf-compress';
import { PDF_PASSWORD_CONTENT } from './tools/pdf-password';
import { PDF_OCR_CONTENT } from './tools/pdf-ocr';
import { PDF_SPLIT_CONTENT } from './tools/pdf-split';
import { PDF_ROTATE_CONTENT } from './tools/pdf-rotate';
import { PDF_WATERMARK_CONTENT } from './tools/pdf-watermark';
import { PDF_TO_IMAGE_CONTENT } from './tools/pdf-to-image';
import { PDF_EXTRACT_TEXT_CONTENT } from './tools/pdf-extract-text';
import { IMAGE_CONVERTER_CONTENT } from './tools/image-converter';
import { IMAGE_TO_PDF_CONTENT } from './tools/image-to-pdf';
import { IMAGE_RESIZE_CONTENT } from './tools/image-resize';
import { IMAGE_OCR_CONTENT } from './tools/image-ocr';
import { IMAGE_FILTERS_CONTENT } from './tools/image-filters';
import { CSV_TO_JSON_CONTENT } from './tools/csv-to-json';
import { JSON_TO_CSV_CONTENT } from './tools/json-to-csv';
import { XML_TO_JSON_CONTENT } from './tools/xml-to-json';
import { TXT_TO_PDF_CONTENT } from './tools/txt-to-pdf';
import { ESTUDIO_DOCUMENTOS_CONTENT } from './tools/estudio-documentos';
import { CAPTURADOR_CORES_CONTENT } from './tools/capturador-de-cores';
import { GERADOR_RELATORIOS_CONTENT } from './tools/gerador-relatorios';
import { GERADOR_QR_CODE_CONTENT } from './tools/gerador-qr-code';
import { GERADOR_CPF_CONTENT } from './tools/gerador-cpf';
import { LIMPADOR_CODIGO_CONTENT } from './tools/limpador-codigo';
import { IDENTIFICADOR_FONTES_CONTENT } from './tools/identificador-de-fontes';
import { REMOVER_RESTRICOES_CONTENT } from './tools/remover-restricoes';
import { DESBLOQUEAR_PDF_CONTENT } from './tools/desbloquear-pdf';
import { RAIO_X_ARQUIVO_CONTENT } from './tools/raio-x-de-arquivo';
import { ORGANIZAR_PAGINAS_PDF_CONTENT } from './tools/organizar-paginas-pdf';
import { REDACAO_PDF_CONTENT } from './tools/redacao-pdf';
import { AJUSTE_DE_MARGEM_CONTENT } from './tools/ajuste-de-margem';
import { ASSINATURA_PDF_CONTENT } from './tools/assinatura-pdf';
import {
  PAGE_NUMBERS_CONTENT,
  CROP_PDF_CONTENT,
  COMPARE_PDF_CONTENT,
} from './tools/pdf-parity';
import {
  EDIT_PDF_CONTENT,
  SCAN_TO_PDF_CONTENT,
  REPAIR_PDF_CONTENT,
  PDFA_CONTENT,
  PDF_FORMS_CONTENT,
  PDF_TO_PPTX_CONTENT,
  PPTX_TO_PDF_CONTENT,
  PDF_TO_EXCEL_CONTENT,
  PDF_TO_WORD_CONTENT,
  WORD_TO_PDF_CONTENT,
  EXCEL_TO_PDF_CONTENT,
  HTML_TO_PDF_CONTENT,
} from './tools/pdf-parity-rest';

export const RICH_CONTENT_REGISTRY: ToolContentRegistry = {
  '/': HOME_CONTENT,
  '/conversor': CONVERTER_CONTENT,
  '/pdf-merge': PDF_MERGE_CONTENT,
  '/pdf-compress': PDF_COMPRESS_CONTENT,
  '/pdf-password': PDF_PASSWORD_CONTENT,
  '/pdf-ocr': PDF_OCR_CONTENT,
  '/pdf-split': PDF_SPLIT_CONTENT,
  '/pdf-rotate': PDF_ROTATE_CONTENT,
  '/pdf-watermark': PDF_WATERMARK_CONTENT,
  '/pdf-to-image': PDF_TO_IMAGE_CONTENT,
  '/pdf-extract-text': PDF_EXTRACT_TEXT_CONTENT,
  '/image-converter': IMAGE_CONVERTER_CONTENT,
  '/image-to-pdf': IMAGE_TO_PDF_CONTENT,
  '/image-resize': IMAGE_RESIZE_CONTENT,
  '/image-ocr': IMAGE_OCR_CONTENT,
  '/image-filters': IMAGE_FILTERS_CONTENT,
  '/csv-to-json': CSV_TO_JSON_CONTENT,
  '/json-to-csv': JSON_TO_CSV_CONTENT,
  '/xml-to-json': XML_TO_JSON_CONTENT,
  '/txt-to-pdf': TXT_TO_PDF_CONTENT,
  '/estudio-documentos': ESTUDIO_DOCUMENTOS_CONTENT,
  '/capturador-de-cores': CAPTURADOR_CORES_CONTENT,
  '/gerador-relatorios': GERADOR_RELATORIOS_CONTENT,
  '/gerador-qr-code': GERADOR_QR_CODE_CONTENT,
  '/gerador-cpf': GERADOR_CPF_CONTENT,
  '/limpador-codigo': LIMPADOR_CODIGO_CONTENT,
  '/identificador-de-fontes': IDENTIFICADOR_FONTES_CONTENT,
  '/remover-restricoes': REMOVER_RESTRICOES_CONTENT,
  '/desbloquear-pdf': DESBLOQUEAR_PDF_CONTENT,
  '/raio-x-de-arquivo': RAIO_X_ARQUIVO_CONTENT,
  '/organizar-paginas-pdf': ORGANIZAR_PAGINAS_PDF_CONTENT,
  '/redacao-pdf': REDACAO_PDF_CONTENT,
  '/ajuste-de-margem': AJUSTE_DE_MARGEM_CONTENT,
  '/assinatura-pdf': ASSINATURA_PDF_CONTENT,
  '/numerador-de-paginas': PAGE_NUMBERS_CONTENT,
  '/recortar-pdf': CROP_PDF_CONTENT,
  '/comparar-pdf': COMPARE_PDF_CONTENT,
  '/editar-pdf': EDIT_PDF_CONTENT,
  '/escanear-para-pdf': SCAN_TO_PDF_CONTENT,
  '/reparar-pdf': REPAIR_PDF_CONTENT,
  '/pdf-para-pdfa': PDFA_CONTENT,
  '/formularios-pdf': PDF_FORMS_CONTENT,
  '/pdf-para-powerpoint': PDF_TO_PPTX_CONTENT,
  '/powerpoint-para-pdf': PPTX_TO_PDF_CONTENT,
  '/pdf-para-excel': PDF_TO_EXCEL_CONTENT,
  '/pdf-para-word': PDF_TO_WORD_CONTENT,
  '/word-para-pdf': WORD_TO_PDF_CONTENT,
  '/excel-para-pdf': EXCEL_TO_PDF_CONTENT,
  '/html-para-pdf': HTML_TO_PDF_CONTENT,
};

export function getRichContent(path: string, lang: import('../../types').LanguageType) {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return RICH_CONTENT_REGISTRY[normalized]?.[lang] ?? null;
}
