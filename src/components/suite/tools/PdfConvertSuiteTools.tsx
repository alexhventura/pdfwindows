import { useState } from 'react';
import type { LanguageType } from '../../../types';
import { ConvertOnceSuiteTool, trilingual } from './ConvertOnceSuiteTool';
import { addPageNumbers, pageNumberWords, repairPdf, toArchivalPdf, type PageNumberFormatId, type PageNumberAlign, type PageNumberBand } from '../../../engines/pdfToolkit';
import { htmlFileToPdf, officeToPdf, pdfToExcel, pdfToWord, pptxToPdf, buildPptxFromImages } from '../../../engines/officeBridge';
import { rasterizePdfPagesPng } from '../../../utils/pdfRaster';
import { inputClass } from '../shared';

type Props = { lang: LanguageType; onClose: () => void; showHeader?: boolean };

export function RepairPdfSuiteTool(props: Props) {
  return (
    <ConvertOnceSuiteTool
      {...props}
      accept="pdf"
      convert={(file) => repairPdf(file)}
      copy={trilingual(
        ['Reparar PDF', 'Repair PDF', 'Reparar PDF'],
        'PDF',
        ['Envie um PDF.', 'Upload a PDF.', 'Envíe un PDF.'],
        ['Reparar e baixar', 'Repair and download', 'Reparar y descargar'],
        [
          'Tenta reconstruir as páginas num PDF novo. Não recupera ficheiro irremediavelmente corrompido.',
          'Rebuilds pages into a new PDF. It cannot recover a file that is beyond repair.',
          'Reconstruye las páginas en un PDF nuevo. No recupera un archivo irrecuperable.',
        ]
      )}
    />
  );
}

export function PdfaSuiteTool(props: Props) {
  return (
    <ConvertOnceSuiteTool
      {...props}
      accept="pdf"
      convert={(file) => toArchivalPdf(file)}
      copy={trilingual(
        ['PDF para arquivo (PDF/A)', 'PDF to archival copy', 'PDF a copia de archivo'],
        'PDF',
        ['Envie um PDF.', 'Upload a PDF.', 'Envíe un PDF.'],
        ['Gerar cópia de arquivo', 'Generate archival copy', 'Generar copia de archivo'],
        [
          'Gera uma cópia sem cifra, com metadados. Não é um PDF/A certificado ISO — falta perfil ICC de impressão.',
          'Writes an unencrypted copy with metadata. This is not a certified ISO PDF/A — no printer ICC profile is embedded.',
          'Genera una copia sin cifrado, con metadatos. No es un PDF/A certificado ISO: falta el perfil ICC.',
        ]
      )}
    />
  );
}

export function PdfToWordSuiteTool(props: Props) {
  return (
    <ConvertOnceSuiteTool
      {...props}
      accept="pdf"
      convert={pdfToWord}
      copy={trilingual(
        ['PDF para Word', 'PDF to Word', 'PDF a Word'],
        'PDF',
        ['Envie um PDF.', 'Upload a PDF.', 'Envíe un PDF.'],
        ['Converter para DOCX', 'Convert to DOCX', 'Convertir a DOCX'],
        [
          'Extrai o texto e gera DOCX. Tabelas, fontes e imagens da página original não são reproduzidas fielmente.',
          'Extracts text and writes DOCX. Tables, fonts, and original page images are not reproduced faithfully.',
          'Extrae el texto y genera DOCX. Tablas, fuentes e imágenes de la página original no se reproducen fielmente.',
        ]
      )}
    />
  );
}

export function WordToPdfSuiteTool(props: Props) {
  return (
    <ConvertOnceSuiteTool
      {...props}
      accept="docx"
      convert={officeToPdf}
      copy={trilingual(
        ['Word para PDF', 'Word to PDF', 'Word a PDF'],
        'DOCX',
        ['Envie um DOCX.', 'Upload a DOCX file.', 'Envíe un DOCX.'],
        ['Converter para PDF', 'Convert to PDF', 'Convertir a PDF'],
        [
          'Usa o texto do DOCX. Arquivos .doc antigos: salve como .docx no Word e envie de novo.',
          'Uses DOCX text. Legacy .doc files: save as .docx in Word and upload again.',
          'Usa el texto del DOCX. Archivos .doc antiguos: guarde como .docx y súbalo de nuevo.',
        ]
      )}
    />
  );
}

export function ExcelToPdfSuiteTool(props: Props) {
  return (
    <ConvertOnceSuiteTool
      {...props}
      accept="xlsx"
      convert={officeToPdf}
      copy={trilingual(
        ['Excel para PDF', 'Excel to PDF', 'Excel a PDF'],
        'XLSX • CSV',
        ['Envie uma planilha.', 'Upload a spreadsheet.', 'Envíe una hoja.'],
        ['Converter para PDF', 'Convert to PDF', 'Convertir a PDF'],
        [
          'Lê células e pagina o texto. Gráficos e formatação condicional não entram no PDF.',
          'Reads cells and paginates the text. Charts and conditional formatting are not included.',
          'Lee celdas y pagina el texto. Gráficos y formato condicional no entran en el PDF.',
        ]
      )}
    />
  );
}

export function HtmlToPdfSuiteTool(props: Props) {
  return (
    <ConvertOnceSuiteTool
      {...props}
      accept="html"
      convert={htmlFileToPdf}
      copy={trilingual(
        ['HTML para PDF', 'HTML to PDF', 'HTML a PDF'],
        'HTML • HTM',
        ['Envie um arquivo HTML.', 'Upload an HTML file.', 'Envíe un archivo HTML.'],
        ['Converter para PDF', 'Convert to PDF', 'Convertir a PDF'],
        [
          'Converte o arquivo HTML local. Não busca URLs da internet (CORS e política: o conteúdo fica no aparelho).',
          'Converts a local HTML file. It does not fetch internet URLs (CORS and policy: content stays on the device).',
          'Convierte el archivo HTML local. No descarga URLs de internet (CORS y política: el contenido queda en el aparato).',
        ]
      )}
    />
  );
}

export function PptxToPdfSuiteTool(props: Props) {
  return (
    <ConvertOnceSuiteTool
      {...props}
      accept="pptx"
      convert={pptxToPdf}
      copy={trilingual(
        ['PowerPoint para PDF', 'PowerPoint to PDF', 'PowerPoint a PDF'],
        'PPTX',
        ['Envie um PPTX.', 'Upload a PPTX file.', 'Envíe un PPTX.'],
        ['Converter para PDF', 'Convert to PDF', 'Convertir a PDF'],
        [
          'Extrai o texto dos slides. Animações, notas do orador e o layout original não são reproduzidos.',
          'Extracts slide text. Animations, speaker notes, and original layout are not reproduced.',
          'Extrae el texto de las diapositivas. Animaciones, notas y el diseño original no se reproducen.',
        ]
      )}
    />
  );
}

export function PdfToExcelSuiteTool(props: Props) {
  return (
    <ConvertOnceSuiteTool
      {...props}
      accept="pdf"
      convert={pdfToExcel}
      copy={trilingual(
        ['PDF para Excel', 'PDF to Excel', 'PDF a Excel'],
        'PDF',
        ['Envie um PDF.', 'Upload a PDF.', 'Envíe un PDF.'],
        ['Converter para XLSX', 'Convert to XLSX', 'Convertir a XLSX'],
        [
          'Tenta separar colunas pelo espaço no texto. Tabelas desenhadas como imagem precisam de OCR primeiro.',
          'Tries to split columns from text spacing. Tables drawn as images need OCR first.',
          'Intenta separar columnas por el espacio del texto. Las tablas en imagen necesitan OCR primero.',
        ]
      )}
    />
  );
}

export function PdfToPptxSuiteTool(props: Props) {
  return (
    <ConvertOnceSuiteTool
      {...props}
      accept="pdf"
      convert={async (file) => {
        const pngs = await rasterizePdfPagesPng(file, { maxPages: 40, scale: 1.35 });
        const blob = await buildPptxFromImages(
          pngs.map((bytes, i) => ({ name: `slide${i + 1}.png`, bytes })),
          file.name
        );
        return { blob, fileName: `${file.name.replace(/\.pdf$/i, '')}.pptx` };
      }}
      copy={trilingual(
        ['PDF para PowerPoint', 'PDF to PowerPoint', 'PDF a PowerPoint'],
        'PDF',
        ['Envie um PDF.', 'Upload a PDF.', 'Envíe un PDF.'],
        ['Converter para PPTX', 'Convert to PPTX', 'Convertir a PPTX'],
        [
          'Cada página vira um slide com a imagem da página (até 40). Não gera objetos editáveis do PowerPoint.',
          'Each page becomes a slide with a page image (up to 40). It does not create editable PowerPoint shapes.',
          'Cada página se vuelve una diapositiva con la imagen (hasta 40). No genera objetos editables de PowerPoint.',
        ]
      )}
    />
  );
}

export function PageNumbersSuiteTool({ lang, onClose, showHeader }: Props) {
  const words = pageNumberWords(lang);
  const [band, setBand] = useState<PageNumberBand>('footer');
  const [align, setAlign] = useState<PageNumberAlign>('center');
  const [format, setFormat] = useState<PageNumberFormatId>('n-total');
  const [startAt, setStartAt] = useState(1);
  const [skipFirst, setSkipFirst] = useState(false);

  return (
    <ConvertOnceSuiteTool
      lang={lang}
      onClose={onClose}
      showHeader={showHeader}
      accept="pdf"
      convert={(file) =>
        addPageNumbers(file, {
          band,
          align,
          format,
          startAt,
          skipFirst,
          fontSize: 11,
          margin: 28,
          color: '#334155',
          ...words,
        })
      }
      extras={
        <div className="grid gap-3 sm:grid-cols-2 text-[11px] font-semibold text-slate-600">
          <label className="space-y-1">
            {lang === 'pt' ? 'Posição' : lang === 'es' ? 'Posición' : 'Position'}
            <select className={inputClass} value={band} onChange={(e) => setBand(e.target.value as PageNumberBand)}>
              <option value="footer">{lang === 'en' ? 'Footer' : 'Rodapé / pie'}</option>
              <option value="header">{lang === 'en' ? 'Header' : 'Cabeçalho / encabezado'}</option>
            </select>
          </label>
          <label className="space-y-1">
            {lang === 'pt' ? 'Alinhamento' : lang === 'es' ? 'Alineación' : 'Alignment'}
            <select className={inputClass} value={align} onChange={(e) => setAlign(e.target.value as PageNumberAlign)}>
              <option value="left">{lang === 'en' ? 'Left' : 'Esquerda'}</option>
              <option value="center">{lang === 'en' ? 'Center' : 'Centro'}</option>
              <option value="right">{lang === 'en' ? 'Right' : 'Direita'}</option>
            </select>
          </label>
          <label className="space-y-1">
            {lang === 'pt' ? 'Formato' : lang === 'es' ? 'Formato' : 'Format'}
            <select className={inputClass} value={format} onChange={(e) => setFormat(e.target.value as PageNumberFormatId)}>
              <option value="n">1</option>
              <option value="n-total">1 / N</option>
              <option value="page-n">{words.pageWord} 1</option>
              <option value="page-n-total">
                {words.pageWord} 1 {words.ofWord} N
              </option>
            </select>
          </label>
          <label className="space-y-1">
            {lang === 'pt' ? 'Começar em' : lang === 'es' ? 'Empezar en' : 'Start at'}
            <input
              className={inputClass}
              type="number"
              min={1}
              value={startAt}
              onChange={(e) => setStartAt(Math.max(1, Number(e.target.value) || 1))}
            />
          </label>
          <label className="inline-flex items-center gap-2 sm:col-span-2">
            <input type="checkbox" checked={skipFirst} onChange={(e) => setSkipFirst(e.target.checked)} />
            {lang === 'pt' ? 'Não numerar a primeira página (capa)' : lang === 'es' ? 'No numerar la primera página' : 'Skip the first page (cover)'}
          </label>
        </div>
      }
      copy={trilingual(
        ['Numerador de páginas', 'Page numbers', 'Números de página'],
        'PDF',
        ['Envie um PDF.', 'Upload a PDF.', 'Envíe un PDF.'],
        ['Aplicar números', 'Apply numbers', 'Aplicar números'],
        [
          'Os números são desenhados na página. Não usa campos automáticos do Word. A capa pode ficar sem número.',
          'Numbers are drawn onto the page. This does not use Word automatic fields. The cover can stay unnumbered.',
          'Los números se dibujan en la página. No usa campos automáticos de Word. La portada puede quedar sin número.',
        ]
      )}
    />
  );
}
