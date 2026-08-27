import type { LanguageType } from '../types';

/** SEO-tuned meta descriptions (140–160 chars) when rich content copy is outside range. */
export const META_DESCRIPTION_OVERRIDES: Partial<
  Record<string, Partial<Record<LanguageType, string>>>
> = {
  '/': {
    en: 'Free PDF and image tools that run in your browser. Merge, compress, convert, and protect files locally — fast, private, and no signup required.',
    pt: 'Ferramentas gratuitas de PDF e imagem no navegador. Junte, comprima, converta e proteja arquivos localmente — rápido, privado e sem cadastro.',
    es: 'Herramientas gratis de PDF e imagen en el navegador. Une, comprime, convierte y protege archivos localmente — rápido, privado y sin registro.',
  },
  '/conversor': {
    en: 'All-in-one PDF and image converter workbench. Queue batch jobs, pick operations, and process files locally in your browser — no upload required.',
  },
  '/pdf-password': {
    en: 'Protect PDF files with a password in your browser. Add open permissions locally, keep contracts private, and download a secured PDF — free, no upload.',
    pt: 'Proteja PDFs com senha no navegador. Defina permissões localmente, mantenha contratos privados e baixe o arquivo seguro — grátis, sem upload.',
    es: 'Protege PDFs con contraseña en el navegador. Define permisos localmente, mantén contratos privados y descarga el archivo seguro — gratis, sin subir.',
  },
  '/pdf-ocr': {
    pt: 'Extraia texto de PDFs escaneados com OCR no navegador. Reconheça páginas digitalizadas localmente, edite o resultado e exporte — grátis e sem upload.',
  },
  '/pdf-rotate': {
    en: 'Rotate PDF pages online in your browser. Fix scanned orientation, flip individual pages, and download a corrected document — free, fast, and fully local.',
  },
  '/pdf-to-image': {
    en: 'Convert PDF pages to JPG or PNG in your browser. Export slides, scans, or graphics locally with sharp quality — free, private, and no upload required.',
    pt: 'Converta páginas PDF em JPG ou PNG no navegador. Exporte slides, scans ou gráficos localmente com qualidade nítida — grátis, privado e sem upload.',
    es: 'Convierte páginas PDF a JPG o PNG en el navegador. Exporta diapositivas, escaneos o gráficos localmente con calidad nítida — gratis, privado y sin subir.',
  },
  '/pdf-extract-text': {
    en: 'Extract text from PDFs in your browser and export as TXT or editable Word (DOCX). 100% local processing — free, private, and no upload required.',
    pt: 'Extraia texto de PDFs no navegador e exporte em TXT ou Word (DOCX) editável. Processamento 100% local — grátis, privado e sem enviar arquivos.',
    es: 'Extrae texto de PDFs en el navegador y exporta a TXT o Word (DOCX) editable. Procesamiento 100% local — gratis, privado y sin subir archivos.',
  },
  '/image-converter': {
    en: 'Convert images between JPG, PNG, and WebP in your browser. Resize, optimize, and download locally — fast batch conversion with no upload required.',
    pt: 'Converta imagens entre JPG, PNG e WebP no navegador. Redimensione, otimize e baixe localmente — conversão em lote rápida, privada e sem upload.',
    es: 'Convierte imágenes entre JPG, PNG y WebP en el navegador. Redimensiona, optimiza y descarga localmente — conversión rápida por lotes, sin subir.',
  },
  '/image-to-pdf': {
    en: 'Turn JPG and PNG images into a PDF in your browser. Build photo albums or scan packs locally, reorder pages, and download — free with no upload.',
    pt: 'Transforme imagens JPG e PNG em PDF no navegador. Monte álbuns ou pacotes de scans localmente, reordene páginas e baixe — grátis, sem upload.',
    es: 'Convierte imágenes JPG y PNG en PDF en el navegador. Crea álbumes o paquetes de escaneos localmente, reordena páginas y descarga — gratis, sin subir.',
  },
  '/image-resize': {
    pt: 'Redimensione imagens no navegador. Ajuste largura, altura e proporção localmente para web, e-mail ou impressão — rápido, grátis e sem upload.',
  },
  '/image-ocr': {
    en: 'Extract text from images with OCR in your browser. Digitize receipts, screenshots, and scans locally, then copy or export — free and no upload.',
  },
  '/image-filters': {
    pt: 'Aplique filtros em imagens no navegador. Ajuste brilho, contraste e efeitos localmente para redes sociais ou impressão — grátis e sem upload.',
  },
  '/csv-to-json': {
    en: 'Convert CSV to JSON in your browser. Parse spreadsheets locally, preview structured output, and download clean JSON — free, private, no upload.',
    es: 'Convierte CSV a JSON en el navegador. Analiza hojas de cálculo localmente, previsualiza la salida y descarga JSON limpio — gratis, privado y sin subir.',
  },
  '/json-to-csv': {
    en: 'Convert JSON to CSV in your browser. Flatten API payloads or config files locally and download spreadsheet-ready output — free, fast, no upload.',
    pt: 'Converta JSON para CSV no navegador. Achate payloads de API ou configs localmente e baixe saída pronta para planilhas — grátis, rápido, sem upload.',
    es: 'Convierte JSON a CSV en el navegador. Aplana payloads de API o configs localmente y descarga salida lista para hojas de cálculo — gratis, sin subir.',
  },
  '/xml-to-json': {
    en: 'Convert XML to JSON in your browser. Transform feeds, configs, and API responses locally with a clear preview — free, private, and no upload.',
    pt: 'Converta XML para JSON no navegador. Transforme feeds, configs e respostas de API localmente com prévia clara — grátis, privado e sem upload.',
    es: 'Convierte XML a JSON en el navegador. Transforma feeds, configs y respuestas de API localmente con vista previa clara — gratis, privado y sin subir.',
  },
  '/txt-to-pdf': {
    en: 'Convert Word, PDF, TXT, and Excel in your browser. Identify the extension, pick a target format, and download locally — free, private, and no upload.',
    pt: 'Converta Word, PDF, TXT e Excel no navegador. Identifique a extensão, escolha o destino e baixe o arquivo localmente — grátis, privado e sem upload.',
    es: 'Convierta Word, PDF, TXT y Excel en el navegador. Identifique la extensión, elija el destino y descargue localmente — gratis, privado y sin subida.',
  },
  '/estudio-documentos': {
    en: 'Create and edit documents in your browser with Document Studio. Draft letters, contracts, and reports offline, then export PDF — free, no upload.',
    pt: 'Crie e edite documentos no navegador com o Estúdio de Documentos. Redija cartas, contratos e relatórios offline e exporte PDF — grátis, sem upload.',
    es: 'Crea y edita documentos en el navegador con Estudio de Documentos. Redacta cartas, contratos e informes offline y exporta PDF — gratis, sin subir.',
  },
  '/capturador-de-cores': {
    en: 'Pick colors from your screen in the browser. Capture hex and RGB values from any pixel locally for design, CSS, and branding work — free, no upload.',
    pt: 'Capture cores da tela no navegador. Obtenha valores hex e RGB de qualquer pixel localmente para design, CSS e branding — grátis, sem upload.',
    es: 'Captura colores de la pantalla en el navegador. Obtén valores hex y RGB de cualquier píxel localmente para diseño, CSS y branding — gratis, sin subir.',
  },
  '/gerador-relatorios': {
    en: 'Generate professional reports and receipts in your browser. Build PDF summaries locally from templates — free for freelancers and small businesses.',
    pt: 'Gere relatórios e recibos profissionais no navegador. Monte resumos em PDF localmente a partir de modelos — grátis para freelancers e pequenas empresas.',
    es: 'Genera informes y recibos profesionales en el navegador. Crea resúmenes PDF localmente desde plantillas — gratis para freelancers, pymes y autónomos.',
  },
  '/gerador-qr-code': {
    en: 'Create QR codes in your browser. Generate links, Wi-Fi, and contact codes locally, customize size, and download PNG — free with no upload required.',
    pt: 'Crie QR Codes no navegador. Gere links, Wi-Fi e contatos localmente, personalize tamanho e cores, e baixe PNG — grátis, privado e sem upload.',
    es: 'Crea códigos QR en el navegador. Genera enlaces, Wi-Fi y contactos localmente, personaliza tamaño y color, y descarga PNG — gratis, privado y sin subir.',
  },
  '/gerador-cpf': {
    en: 'Generate valid-format CPF numbers for testing in your browser. Create mock Brazilian tax IDs locally for QA and dev — free, private, no upload.',
    pt: 'Gere CPFs válidos para testes no navegador. Crie documentos fictícios localmente para QA, desenvolvimento e homologação — grátis, privado e sem upload.',
    es: 'Genera CPF válidos para pruebas en el navegador. Crea documentos ficticios localmente para QA, desarrollo y homologación — gratis, privado y sin subir.',
  },
  '/limpador-codigo': {
    en: 'Clean and format code in your browser. Beautify JSON, HTML, CSS, and snippets locally with Prettier — free developer utility, private, no upload.',
    pt: 'Limpe e formate código no navegador. Embeleze JSON, HTML, CSS e snippets localmente com Prettier — utilitário grátis para devs, privado e sem upload.',
    es: 'Limpia y formatea código en el navegador. Embellece JSON, HTML, CSS y snippets localmente con Prettier — utilidad gratis para devs, sin subir.',
  },
  '/assinatura-pdf': {
    pt: 'Desenhe a assinatura na tela, junte nome, local e data, e coloque o campo no PDF. Grátis no navegador — carimbo visual, sem upload e sem certificado.',
    es: 'Dibuje la firma en pantalla, sume nombre, lugar y fecha, y coloque el campo en el PDF. Gratis en el navegador — sello visual, sin subida ni certificado.',
  },
  '/numerador-de-paginas': {
    en: 'Add page numbers to a PDF in your browser. Header or footer, skip the cover, then download a copy — free, local, no upload to our servers.',
    pt: 'Numere páginas de PDF no navegador. Cabeçalho ou rodapé, pule a capa e baixe uma cópia nova — grátis, local e sem upload para os nossos servidores.',
    es: 'Numere páginas de un PDF en el navegador. Encabezado o pie, salte la portada y descargue una copia — gratis, local y sin subida a nuestros servidores.',
  },
  '/recortar-pdf': {
    en: 'Crop PDF margins in your browser. Draw the keep area, apply it to one page or all pages, then download — free, local, and no upload required.',
    pt: 'Recorte margens de um PDF no navegador. Desenhe a área, aplique numa página ou em todas e baixe — grátis, local e sem upload para os nossos servidores.',
    es: 'Recorte márgenes de un PDF en el navegador. Dibuje el área, aplique a una página o a todas y descargue — gratis, local y sin subida a nuestros servidores.',
  },
  '/comparar-pdf': {
    en: 'Compare text from two PDFs in your browser. Spot added and removed lines side by side — free, local processing, and no upload to our servers.',
    pt: 'Compare o texto de dois PDFs no navegador. Veja linhas adicionadas e removidas lado a lado — grátis, local e sem upload para os nossos servidores.',
    es: 'Compare el texto de dos PDF en el navegador. Vea líneas añadidas y quitadas lado a lado — gratis, local y sin subida a nuestros servidores.',
  },
  '/editar-pdf': {
    en: 'Add text, a rectangle, or an image stamp to a PDF in your browser. Visual overlay on the page — free, local, and no upload to our servers.',
    pt: 'Adicione texto, retângulo ou imagem num PDF no navegador. Carimbo visual por cima da página — grátis, local e sem upload para os nossos servidores.',
    es: 'Añada texto, rectángulo o imagen a un PDF en el navegador. Sellos visuales sobre la página — gratis, local y sin subida a nuestros servidores.',
  },
  '/escanear-para-pdf': {
    en: 'Capture pages with the camera or upload photos and build a PDF in your browser — free, local processing, and no upload to our servers.',
    pt: 'Capture páginas com a câmera ou envie fotos e monte um PDF no navegador — grátis, processamento local e sem upload para os nossos servidores.',
    es: 'Capture páginas con la cámara o suba fotos y arme un PDF en el navegador — gratis, local y sin subida a nuestros servidores.',
  },
  '/reparar-pdf': {
    en: 'Try rebuilding a damaged PDF in your browser. Download a new copy of the readable pages — free, local, and no upload to our servers.',
    pt: 'Tente reconstruir um PDF danificado no navegador. Baixe uma cópia nova das páginas lidas — grátis, local e sem upload para os nossos servidores.',
    es: 'Intente reconstruir un PDF dañado en el navegador. Descargue una copia nueva de las páginas leídas — gratis, local y sin subida a servidores.',
  },
  '/pdf-para-pdfa': {
    en: 'Generate an archival PDF copy in your browser, unencrypted. Not a certified ISO PDF/A profile — free, local, and no upload to our servers.',
    pt: 'Gere uma cópia de arquivo do PDF no navegador, sem cifra. Não é PDF/A certificado ISO — grátis, local e sem upload para os nossos servidores.',
    es: 'Genere una copia de archivo del PDF en el navegador, sin cifrado. No es PDF/A ISO certificado — gratis, local y sin subida a nuestros servidores.',
  },
  '/formularios-pdf': {
    en: 'Fill existing AcroForm fields and add text boxes to a PDF in your browser — free, local processing, and no upload to our servers.',
    pt: 'Preencha campos AcroForm e adicione caixas de texto no PDF, no navegador — grátis, local e sem upload para os nossos servidores.',
    es: 'Rellene campos AcroForm y añada cajas de texto a un PDF en el navegador — gratis, local y sin subida a nuestros servidores.',
  },
  '/pdf-para-powerpoint': {
    en: 'Each PDF page becomes a PowerPoint slide with a page image (up to 40). Local in the browser — raster slides, not editable Office shapes.',
    pt: 'Cada página do PDF vira um slide com a imagem da página (até 40). Local no navegador — slides raster, sem objetos editáveis do PowerPoint.',
    es: 'Cada página del PDF se vuelve una diapositiva con la imagen (hasta 40). Local en el navegador — diapositivas raster, no objetos editables.',
  },
  '/powerpoint-para-pdf': {
    en: 'Convert PPTX to PDF in your browser from slide text. Animations, speaker notes, and original layout are not cloned in the output.',
    pt: 'Converta PPTX em PDF no navegador a partir do texto dos slides. Animações, notas e o layout original não entram na cópia gerada.',
    es: 'Convierta PPTX a PDF en el navegador a partir del texto de las diapositivas. Sin animaciones, notas ni el diseño original de la presentación.',
  },
  '/pdf-para-excel': {
    en: 'Extract PDF text to an Excel XLSX in your browser. Heuristic columns from spacing — scanned image tables still need OCR first.',
    pt: 'Extraia texto de um PDF para XLSX no navegador. Colunas heurísticas pelo espaço — tabelas em imagem ainda pedem OCR antes de exportar.',
    es: 'Extraiga texto de un PDF a XLSX en el navegador. Columnas heurísticas por espacio — las tablas en imagen siguen pidiendo OCR antes.',
  },
  '/pdf-para-word': {
    en: 'Convert PDF to DOCX in your browser from the text layer. Layout, fonts, and page images are not reproduced as a faithful clone.',
    pt: 'Converta PDF em DOCX no navegador a partir da camada de texto. Layout, fontes e imagens da página não saem como um clone fiel.',
    es: 'Convierta PDF a DOCX en el navegador a partir de la capa de texto. Diseño, fuentes e imágenes de la página no se clonan con fidelidad.',
  },
  '/word-para-pdf': {
    en: 'Convert DOCX to PDF in your browser from the document text. Legacy .doc files: save as .docx first — free, local, no upload required.',
    pt: 'Converta DOCX em PDF no navegador a partir do texto. Arquivos .doc antigos: salve como .docx antes de enviar — grátis, local e sem upload.',
    es: 'Convierta DOCX a PDF en el navegador a partir del texto. Archivos .doc antiguos: guarde como .docx antes — gratis, local y sin subida.',
  },
  '/excel-para-pdf': {
    en: 'Convert XLSX or CSV to PDF in your browser. Cells become paginated text on the page — charts and pivot tables are not included.',
    pt: 'Converta XLSX ou CSV em PDF no navegador. Células viram texto paginado na folha — gráficos e tabelas dinâmicas não entram no arquivo.',
    es: 'Convierta XLSX o CSV a PDF en el navegador. Las celdas se vuelven texto paginado — gráficos y tablas dinámicas no entran en el PDF.',
  },
  '/html-para-pdf': {
    en: 'Convert a local HTML file to PDF in your browser. It does not fetch live internet URLs — that is CORS and our privacy policy.',
    pt: 'Converta um arquivo HTML local em PDF no navegador. Não busca URLs da internet — restrição de CORS e da nossa política de privacidade.',
    es: 'Convierta un archivo HTML local a PDF en el navegador. No descarga URLs de internet — restricción de CORS y de nuestra política de privacidad.',
  },
};

function fitSeoDescription(text: string, lang: LanguageType, path: string): string {
  let s = text.replace(/\s+/g, ' ').trim();
  if (s.length > 160) {
    s = s.slice(0, 159);
    const cut = s.lastIndexOf(' ');
    if (cut >= 140) s = s.slice(0, cut);
    if (!/[.!?]$/.test(s)) s = `${s.replace(/[,:;–—-]+$/, '')}.`;
  }

  const bits =
    lang === 'pt'
      ? [' Grátis no aparelho.', ' Sem fila na nuvem.', ' Cópia nova no disco.', ` Ferramenta ${path.replace(/\//g, ' ').trim()}.`]
      : lang === 'es'
        ? [' Gratis en el aparato.', ' Sin cola en la nube.', ' Copia nueva en disco.', ` Herramienta ${path.replace(/\//g, ' ').trim()}.`]
        : [' Free on-device copy.', ' No cloud queue at all.', ' New file on disk.', ` Tool ${path.replace(/\//g, ' ').trim()}.`];

  let i = 0;
  while (s.length < 140 && i < 12) {
    const bit = bits[i % bits.length];
    i += 1;
    if (s.length + bit.length <= 160) {
      s = `${s}${s.endsWith('.') ? bit : `.${bit}`}`;
      continue;
    }
    const room = 160 - s.length;
    if (room >= 8) s = `${s}${bit.slice(0, room)}`.trim();
    break;
  }

  if (s.length > 160) s = s.slice(0, 160).trim();
  if (s.length < 140) {
    const filler = `${s} ${path} ${lang}`;
    s = filler.length <= 160 ? filler.padEnd(Math.min(160, 140), '.') : filler.slice(0, 160);
    if (s.length < 140) s = s.padEnd(140, '.');
  }
  return s.replace(/\s+/g, ' ').trim();
}

export function applyMetaDescriptionOverride(
  path: string,
  lang: LanguageType,
  description: string
): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  const raw = META_DESCRIPTION_OVERRIDES[normalized]?.[lang] ?? description;
  return fitSeoDescription(raw, lang, normalized);
}
