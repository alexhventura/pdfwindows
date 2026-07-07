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
    pt: 'Extraia texto de PDFs no navegador. Copie conteúdo de relatórios e contratos localmente, sem enviar arquivos a servidores — rápido, grátis e privado.',
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
    en: 'Convert plain text to PDF in your browser. Format notes, logs, or scripts locally and download a print-ready document — free, fast, no upload.',
    es: 'Convierte texto plano a PDF en el navegador. Formatea notas, logs o scripts localmente y descarga un documento listo para imprimir — gratis y sin subir.',
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
};

export function applyMetaDescriptionOverride(
  path: string,
  lang: LanguageType,
  description: string
): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return META_DESCRIPTION_OVERRIDES[normalized]?.[lang] ?? description;
}
