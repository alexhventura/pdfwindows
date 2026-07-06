import type { LanguageType, OperationType } from '../types';
import { localizedPath, stripLocalePrefix } from '../i18n/routes';

export type SuiteToolId =
  | 'document-studio'
  | 'color-picker'
  | 'report-gen'
  | 'qr-gen'
  | 'cpf-gen'
  | 'code-clean';

export interface FaqItem {
  q: string;
  a: string;
}

export interface ToolPageCopy {
  title: string;
  description: string;
  keywords: string;
  h1: string;
  intro: string;
  benefits: string[];
  howItWorks: string[];
  faq: FaqItem[];
}

export interface ToolPageDefinition {
  path: string;
  kind: 'converter' | 'suite' | 'home' | 'hub';
  operation?: OperationType;
  suiteId?: SuiteToolId;
  copy: Record<LanguageType, ToolPageCopy>;
}

const privacyFaq = (lang: LanguageType): FaqItem[] => {
  if (lang === 'pt') {
    return [
      {
        q: 'Meus arquivos são enviados para algum servidor?',
        a: 'Não. Todo o processamento ocorre no seu navegador. Os arquivos permanecem no seu dispositivo.',
      },
      {
        q: 'Preciso criar conta?',
        a: 'Não. O PDFWINDOWS funciona sem cadastro e sem upload obrigatório.',
      },
    ];
  }
  if (lang === 'es') {
    return [
      {
        q: '¿Se suben mis archivos a un servidor?',
        a: 'No. Todo el procesamiento ocurre en su navegador. Los archivos permanecen en su dispositivo.',
      },
      {
        q: '¿Necesito crear una cuenta?',
        a: 'No. PDFWINDOWS funciona sin registro y sin subida obligatoria.',
      },
    ];
  }
  return [
    {
      q: 'Are my files uploaded to a server?',
      a: 'No. All processing runs in your browser. Files stay on your device.',
    },
    {
      q: 'Do I need an account?',
      a: 'No. PDFWINDOWS works without signup or mandatory uploads.',
    },
  ];
};

function page(
  path: string,
  kind: ToolPageDefinition['kind'],
  operation: OperationType | undefined,
  suiteId: SuiteToolId | undefined,
  copy: Record<LanguageType, ToolPageCopy>
): ToolPageDefinition {
  return { path, kind, operation, suiteId, copy };
}

export const TOOL_PAGES: ToolPageDefinition[] = [
  page('/pdf-merge', 'converter', 'pdf-merge', undefined, {
    pt: {
      title: 'Mesclar PDF Online Grátis e Offline | PDFWINDOWS',
      description:
        'Una arquivos PDF diretamente no navegador. Sem upload, sem servidores.',
      keywords: 'mesclar pdf, juntar pdf, combinar pdf offline, merge pdf gratis',
      h1: 'Mesclar PDF Online',
      intro:
        'Combine vários PDFs em um único documento sem enviar arquivos para a nuvem. Ideal para contratos, relatórios e pacotes de documentos.',
      benefits: [
        'Sem limite de servidores externos',
        'Ordem dos arquivos controlada por você',
      ],
      howItWorks: [
        'Envie dois ou mais arquivos PDF.',
        'Selecione a operação de mesclagem.',
        'Processe e baixe o PDF unificado localmente.',
      ],
      faq: [
        ...privacyFaq('pt'),
        {
          q: 'Quantos PDFs posso mesclar?',
          a: 'Você pode adicionar vários arquivos PDF na fila antes de processar.',
        },
      ],
    },
    en: {
      title: 'Merge PDF Online Free & Offline | PDFWINDOWS',
      description:
        'Combine PDF files directly in your browser. No upload, no servers.',
      keywords: 'merge pdf, combine pdf offline, join pdf free, local pdf merge',
      h1: 'Merge PDF Online',
      intro:
        'Combine multiple PDFs into one document without cloud uploads. Perfect for contracts, reports, and document bundles.',
      benefits: [
        'No external server dependency',
        'You control file order',
      ],
      howItWorks: [
        'Upload two or more PDF files.',
        'Select the merge operation.',
        'Process and download the merged PDF locally.',
      ],
      faq: [
        ...privacyFaq('en'),
        {
          q: 'How many PDFs can I merge?',
          a: 'Add multiple PDFs to the queue before processing.',
        },
      ],
    },
    es: {
      title: 'Unir PDF Online Gratis y Offline | PDFWINDOWS',
      description:
        'Una archivos PDF directamente en el navegador. Sin subida, sin servidores.',
      keywords: 'unir pdf, combinar pdf offline, juntar pdf gratis',
      h1: 'Unir PDF Online',
      intro:
        'Combine varios PDF en un solo documento sin subir archivos a la nube. Ideal para contratos e informes.',
      benefits: [
        'Sin dependencia de servidores externos',
        'Usted controla el orden de archivos',
      ],
      howItWorks: [
        'Suba dos o más archivos PDF.',
        'Seleccione la operación de unión.',
        'Procese y descargue el PDF unificado localmente.',
      ],
      faq: [...privacyFaq('es')],
    },
  }),
  page('/pdf-compress', 'converter', 'pdf-compress', undefined, {
    pt: {
      title: 'Comprimir PDF Online Grátis e Offline | PDFWINDOWS',
      description: 'Reduza o tamanho de PDFs no navegador. Rápido e gratuito.',
      keywords: 'comprimir pdf, reduzir tamanho pdf, pdf menor offline',
      h1: 'Comprimir PDF — Processamento Local',
      intro: 'Diminua o peso dos seus PDFs mantendo qualidade útil para envio por e-mail e armazenamento.',
      benefits: ['Sem upload para servidores', 'Ideal para arquivos confidenciais', 'Resultado imediato no navegador'],
      howItWorks: ['Envie um ou mais PDFs.', 'Escolha comprimir.', 'Baixe a versão otimizada.'],
      faq: privacyFaq('pt'),
    },
    en: {
      title: 'Compress PDF Online Free & Offline | PDFWINDOWS',
      description: 'Reduce PDF file size in your browser. Fast and free.',
      keywords: 'compress pdf, reduce pdf size, offline pdf compressor',
      h1: 'Compress PDF — Local Processing',
      intro: 'Shrink PDF file size while keeping usable quality for email and storage.',
      benefits: ['No server uploads', 'Great for confidential files', 'Instant browser results'],
      howItWorks: ['Upload one or more PDFs.', 'Select compress.', 'Download the optimized file.'],
      faq: privacyFaq('en'),
    },
    es: {
      title: 'Comprimir PDF Online Gratis y Offline | PDFWINDOWS',
      description: 'Reduzca el tamaño de PDF en el navegador. Rápido y gratuito.',
      keywords: 'comprimir pdf, reducir pdf, pdf offline',
      h1: 'Comprimir PDF — Procesamiento Local',
      intro: 'Reduzca el peso de sus PDF manteniendo calidad útil para correo y almacenamiento.',
      benefits: ['Sin subida a servidores', 'Ideal para archivos confidenciales', 'Resultado inmediato'],
      howItWorks: ['Suba uno o más PDF.', 'Elija comprimir.', 'Descargue el archivo optimizado.'],
      faq: privacyFaq('es'),
    },
  }),
  page('/pdf-password', 'converter', 'pdf-password', undefined, {
    pt: {
      title: 'Proteger PDF com Senha Online e Offline | PDFWINDOWS',
      description:
        'Adicione criptografia real ao PDF no navegador. Senha definida por você, sem envio de arquivos.',
      keywords: 'proteger pdf senha, criptografar pdf, pdf com senha offline',
      h1: 'Proteger PDF com Senha',
      intro: 'Aplique criptografia compatível com leitores modernos antes de compartilhar documentos sensíveis.',
      benefits: ['Criptografia real no arquivo final', 'Senha apenas na memória local', 'Compatível com Adobe e Chrome'],
      howItWorks: ['Envie um PDF.', 'Defina a senha no modal seguro.', 'Exporte o PDF protegido.'],
      faq: privacyFaq('pt'),
    },
    en: {
      title: 'Password Protect PDF Online & Offline | PDFWINDOWS',
      description: 'Add real PDF encryption in your browser. Your password stays local; files are never uploaded.',
      keywords: 'password protect pdf, encrypt pdf offline, secure pdf',
      h1: 'Password Protect PDF',
      intro: 'Apply encryption compatible with modern readers before sharing sensitive documents.',
      benefits: ['Real encryption in output file', 'Password kept in local memory only', 'Works with Adobe and Chrome'],
      howItWorks: ['Upload a PDF.', 'Set password in the secure modal.', 'Export the protected PDF.'],
      faq: privacyFaq('en'),
    },
    es: {
      title: 'Proteger PDF con Contraseña Online y Offline | PDFWINDOWS',
      description: 'Añada cifrado real al PDF en el navegador. Su contraseña permanece local.',
      keywords: 'proteger pdf contraseña, cifrar pdf offline',
      h1: 'Proteger PDF con Contraseña',
      intro: 'Aplique cifrado compatible con lectores modernos antes de compartir documentos sensibles.',
      benefits: ['Cifrado real en el archivo', 'Contraseña solo en memoria local', 'Compatible con Adobe y Chrome'],
      howItWorks: ['Suba un PDF.', 'Defina la contraseña.', 'Exporte el PDF protegido.'],
      faq: privacyFaq('es'),
    },
  }),
  page('/pdf-ocr', 'converter', 'pdf-ocr', undefined, {
    pt: {
      title: 'OCR de PDF Online Offline | PDFWINDOWS',
      description: 'Extraia texto de PDF digitalizado no navegador com OCR local.',
      keywords: 'ocr pdf, pdf para texto, reconhecer texto pdf offline',
      h1: 'OCR de PDF — Texto Pesquisável',
      intro: 'Transforme páginas digitalizadas em texto editável sem enviar documentos para servidores.',
      benefits: ['OCR no dispositivo', 'Suporte multilíngue', 'Ideal para arquivos confidenciais'],
      howItWorks: ['Envie um PDF digitalizado.', 'Selecione OCR de PDF.', 'Baixe o texto extraído.'],
      faq: privacyFaq('pt'),
    },
    en: {
      title: 'PDF OCR Online Offline | PDFWINDOWS',
      description: 'Extract text from scanned PDFs in your browser with local OCR.',
      keywords: 'pdf ocr, scanned pdf to text, offline ocr',
      h1: 'PDF OCR — Searchable Text',
      intro: 'Turn scanned pages into editable text without uploading documents to servers.',
      benefits: ['On-device OCR', 'Multilingual support', 'Great for confidential files'],
      howItWorks: ['Upload a scanned PDF.', 'Select PDF OCR.', 'Download extracted text.'],
      faq: privacyFaq('en'),
    },
    es: {
      title: 'OCR de PDF Online Offline | PDFWINDOWS',
      description: 'Extraiga texto de PDF escaneado en el navegador con OCR local.',
      keywords: 'ocr pdf, pdf a texto, ocr offline',
      h1: 'OCR de PDF — Texto Buscable',
      intro: 'Convierta páginas escaneadas en texto editable sin subir documentos.',
      benefits: ['OCR en el dispositivo', 'Soporte multilingüe', 'Ideal para archivos confidenciales'],
      howItWorks: ['Suba un PDF escaneado.', 'Seleccione OCR de PDF.', 'Descargue el texto.'],
      faq: privacyFaq('es'),
    },
  }),
  page('/pdf-split', 'converter', 'pdf-split', undefined, {
    pt: {
      title: 'Dividir PDF Online Grátis e Offline | PDFWINDOWS',
      description: 'Separe páginas de PDF no navegador. Rápido e gratuito.',
      keywords: 'dividir pdf, separar paginas pdf, split pdf offline',
      h1: 'Dividir PDF por Páginas',
      intro: 'Extraia intervalos de páginas com controle total no seu dispositivo.',
      benefits: ['Seleção de intervalo flexível', 'Processamento instantâneo', 'Zero envio para nuvem'],
      howItWorks: ['Envie um PDF.', 'Defina páginas inicial e final.', 'Baixe o novo arquivo.'],
      faq: privacyFaq('pt'),
    },
    en: {
      title: 'Split PDF Online Free & Offline | PDFWINDOWS',
      description: 'Split PDF pages in your browser. Fast and free.',
      keywords: 'split pdf, extract pdf pages, offline pdf split',
      h1: 'Split PDF by Pages',
      intro: 'Extract page ranges with full control on your device.',
      benefits: ['Flexible page range', 'Instant processing', 'Zero cloud upload'],
      howItWorks: ['Upload a PDF.', 'Set start and end pages.', 'Download the new file.'],
      faq: privacyFaq('en'),
    },
    es: {
      title: 'Dividir PDF Online Gratis y Offline | PDFWINDOWS',
      description: 'Separe páginas de PDF en el navegador. Rápido y gratuito.',
      keywords: 'dividir pdf, separar paginas pdf',
      h1: 'Dividir PDF por Páginas',
      intro: 'Extraiga rangos de páginas con control total en su dispositivo.',
      benefits: ['Rango flexible', 'Procesamiento instantáneo', 'Sin nube'],
      howItWorks: ['Suba un PDF.', 'Defina páginas.', 'Descargue el archivo.'],
      faq: privacyFaq('es'),
    },
  }),
  page('/pdf-rotate', 'converter', 'pdf-rotate', undefined, {
    pt: {
      title: 'Rotacionar PDF Online Offline | PDFWINDOWS',
      description: 'Gire páginas de PDF no navegador. Rápido e gratuito.',
      keywords: 'rotacionar pdf, girar pdf, rotate pdf offline',
      h1: 'Rotacionar PDF',
      intro: 'Corrija orientação de páginas digitalizadas ou exportadas incorretamente.',
      benefits: ['Ângulos 90°, 180° e 270°', 'Sem instalação', 'Gratuito'],
      howItWorks: ['Envie o PDF.', 'Escolha o ângulo.', 'Processe e baixe.'],
      faq: privacyFaq('pt'),
    },
    en: {
      title: 'Rotate PDF Online Offline | PDFWINDOWS',
      description: 'Rotate PDF pages in your browser. Fast and free.',
      keywords: 'rotate pdf, turn pdf pages, offline rotate',
      h1: 'Rotate PDF',
      intro: 'Fix orientation of scanned or mis-exported pages.',
      benefits: ['90°, 180°, 270° angles', 'No installation', 'Free to use'],
      howItWorks: ['Upload PDF.', 'Pick angle.', 'Process and download.'],
      faq: privacyFaq('en'),
    },
    es: {
      title: 'Rotar PDF Online Offline | PDFWINDOWS',
      description: 'Gire páginas de PDF en el navegador.',
      keywords: 'rotar pdf, girar pdf offline',
      h1: 'Rotar PDF',
      intro: 'Corrija la orientación de páginas escaneadas.',
      benefits: ['Ángulos 90°, 180° y 270°', 'Sin instalación', 'Gratis'],
      howItWorks: ['Suba el PDF.', 'Elija ángulo.', 'Procese y descargue.'],
      faq: privacyFaq('es'),
    },
  }),
  page('/pdf-watermark', 'converter', 'pdf-watermark', undefined, {
    pt: {
      title: 'Marca d\'Água em PDF Online Offline | PDFWINDOWS',
      description: 'Adicione marca d\'água em PDF localmente. Texto ou imagem, sem upload.',
      keywords: 'marca dagua pdf, watermark pdf offline',
      h1: 'Marca d\'Água em PDF',
      intro: 'Proteja rascunhos e documentos internos com marca d\'água personalizada.',
      benefits: ['Texto ou imagem', 'Preview local', 'Exportação imediata'],
      howItWorks: ['Envie PDFs.', 'Configure a marca.', 'Exporte o resultado.'],
      faq: privacyFaq('pt'),
    },
    en: {
      title: 'PDF Watermark Online Offline | PDFWINDOWS',
      description: 'Add watermarks to PDF locally. Text or image, no upload.',
      keywords: 'pdf watermark, stamp pdf offline',
      h1: 'PDF Watermark',
      intro: 'Protect drafts and internal docs with custom watermarks.',
      benefits: ['Text or image', 'Local preview', 'Instant export'],
      howItWorks: ['Upload PDFs.', 'Configure watermark.', 'Export result.'],
      faq: privacyFaq('en'),
    },
    es: {
      title: 'Marca de Agua en PDF Online Offline | PDFWINDOWS',
      description: 'Añada marca de agua en PDF localmente.',
      keywords: 'marca de agua pdf, watermark pdf',
      h1: 'Marca de Agua en PDF',
      intro: 'Proteja borradores con marcas personalizadas.',
      benefits: ['Texto o imagen', 'Vista previa local', 'Exportación inmediata'],
      howItWorks: ['Suba PDF.', 'Configure marca.', 'Exporte.'],
      faq: privacyFaq('es'),
    },
  }),
  page('/pdf-to-image', 'converter', 'pdf-to-img', undefined, {
    pt: {
      title: 'PDF para Imagem Online Offline | PDFWINDOWS',
      description: 'Converta páginas PDF em imagens no navegador. JPG ou PNG de alta qualidade.',
      keywords: 'pdf para imagem, pdf para jpg, pdf para png offline',
      h1: 'Converter PDF para Imagem',
      intro: 'Exporte páginas como imagens de alta qualidade sem serviços na nuvem.',
      benefits: ['Múltiplas páginas', 'Qualidade controlada', 'Sem cadastro'],
      howItWorks: ['Envie um PDF.', 'Selecione PDF para imagem.', 'Baixe as imagens.'],
      faq: privacyFaq('pt'),
    },
    en: {
      title: 'PDF to Image Online Offline | PDFWINDOWS',
      description: 'Convert PDF pages to images in your browser. Local JPG/PNG export.',
      keywords: 'pdf to image, pdf to jpg, pdf to png offline',
      h1: 'Convert PDF to Image',
      intro: 'Export pages as high-quality images without cloud services.',
      benefits: ['Multiple pages', 'Controlled quality', 'No signup'],
      howItWorks: ['Upload a PDF.', 'Select PDF to image.', 'Download images.'],
      faq: privacyFaq('en'),
    },
    es: {
      title: 'PDF a Imagen Online Offline | PDFWINDOWS',
      description: 'Convierta páginas PDF a imágenes en el navegador.',
      keywords: 'pdf a imagen, pdf a jpg offline',
      h1: 'Convertir PDF a Imagen',
      intro: 'Exporte páginas como imágenes sin servicios en la nube.',
      benefits: ['Varias páginas', 'Calidad controlada', 'Sin registro'],
      howItWorks: ['Suba un PDF.', 'Seleccione PDF a imagen.', 'Descargue.'],
      faq: privacyFaq('es'),
    },
  }),
  page('/pdf-extract-text', 'converter', 'pdf-txt', undefined, {
    pt: {
      title: 'Extrair Texto de PDF Online Offline | PDFWINDOWS',
      description: 'Extraia texto de PDF no navegador. Rápido, gratuito e sem upload.',
      keywords: 'extrair texto pdf, pdf para txt, copiar texto pdf',
      h1: 'Extrair Texto de PDF',
      intro: 'Obtenha conteúdo textual de PDFs nativos diretamente no dispositivo.',
      benefits: ['Sem cadastro', 'Processamento local', 'Exportação imediata'],
      howItWorks: ['Envie um PDF com texto.', 'Selecione extrair texto.', 'Baixe o resultado.'],
      faq: privacyFaq('pt'),
    },
    en: {
      title: 'Extract Text from PDF Online Offline | PDFWINDOWS',
      description: 'Extract PDF text in your browser. Fast, free, no upload.',
      keywords: 'extract text pdf, pdf to txt, copy pdf text',
      h1: 'Extract Text from PDF',
      intro: 'Get text content from native PDFs directly on your device.',
      benefits: ['No signup', 'Local processing', 'Instant export'],
      howItWorks: ['Upload a text-based PDF.', 'Select extract text.', 'Download output.'],
      faq: privacyFaq('en'),
    },
    es: {
      title: 'Extraer Texto de PDF Online Offline | PDFWINDOWS',
      description: 'Extraiga texto de PDF en el navegador.',
      keywords: 'extraer texto pdf, pdf a txt',
      h1: 'Extraer Texto de PDF',
      intro: 'Obtenga contenido textual de PDF nativos en su dispositivo.',
      benefits: ['Sin registro', 'Procesamiento local', 'Exportación inmediata'],
      howItWorks: ['Suba un PDF.', 'Seleccione extraer texto.', 'Descargue.'],
      faq: privacyFaq('es'),
    },
  }),
  page('/image-converter', 'converter', 'img-to-img', undefined, {
    pt: {
      title: 'Conversor de Imagens Online Offline | PDFWINDOWS',
      description: 'Converta JPG, PNG, WEBP e mais no navegador. Rápido e gratuito.',
      keywords: 'converter imagem, jpg para png, webp offline',
      h1: 'Conversor de Imagens',
      intro: 'Altere formato, qualidade e dimensões com processamento local.',
      benefits: ['Vários formatos', 'Controle de qualidade', 'Exportação rápida'],
      howItWorks: ['Envie imagens.', 'Escolha formato de saída.', 'Processe e baixe.'],
      faq: privacyFaq('pt'),
    },
    en: {
      title: 'Image Converter Online Offline | PDFWINDOWS',
      description: 'Convert JPG, PNG, WEBP and more in your browser. Fast and free.',
      keywords: 'image converter, jpg to png, webp offline',
      h1: 'Image Converter',
      intro: 'Change format, quality, and dimensions with local processing.',
      benefits: ['Multiple formats', 'Quality control', 'Fast export'],
      howItWorks: ['Upload images.', 'Pick output format.', 'Process and download.'],
      faq: privacyFaq('en'),
    },
    es: {
      title: 'Conversor de Imágenes Online Offline | PDFWINDOWS',
      description: 'Convierta JPG, PNG, WEBP y más en el navegador.',
      keywords: 'convertir imagen, jpg a png offline',
      h1: 'Conversor de Imágenes',
      intro: 'Cambie formato y calidad con procesamiento local.',
      benefits: ['Varios formatos', 'Control de calidad', 'Exportación rápida'],
      howItWorks: ['Suba imágenes.', 'Elija formato.', 'Procese y descargue.'],
      faq: privacyFaq('es'),
    },
  }),
  page('/image-to-pdf', 'converter', 'img-to-pdf', undefined, {
    pt: {
      title: 'Imagem para PDF Online Offline | PDFWINDOWS',
      description: 'Crie PDF a partir de imagens no navegador. Sem upload, gratuito.',
      keywords: 'imagem para pdf, jpg para pdf, foto para pdf offline',
      h1: 'Converter Imagem para PDF',
      intro: 'Monte documentos PDF a partir de fotos e scans localmente.',
      benefits: ['Várias imagens em um PDF', 'Layout profissional', 'Exportação rápida'],
      howItWorks: ['Envie imagens.', 'Selecione imagem para PDF.', 'Baixe o PDF.'],
      faq: privacyFaq('pt'),
    },
    en: {
      title: 'Image to PDF Online Offline | PDFWINDOWS',
      description: 'Create PDF from images in your browser. No upload, free.',
      keywords: 'image to pdf, jpg to pdf offline',
      h1: 'Convert Image to PDF',
      intro: 'Build PDF documents from photos and scans locally.',
      benefits: ['Multiple images in one PDF', 'Professional layout', 'Fast export'],
      howItWorks: ['Upload images.', 'Select image to PDF.', 'Download PDF.'],
      faq: privacyFaq('en'),
    },
    es: {
      title: 'Imagen a PDF Online Offline | PDFWINDOWS',
      description: 'Cree PDF desde imágenes en el navegador.',
      keywords: 'imagen a pdf, jpg a pdf offline',
      h1: 'Convertir Imagen a PDF',
      intro: 'Cree PDF desde fotos y escaneos localmente.',
      benefits: ['Varias imágenes en un PDF', 'Diseño profesional', 'Exportación rápida'],
      howItWorks: ['Suba imágenes.', 'Seleccione imagen a PDF.', 'Descargue.'],
      faq: privacyFaq('es'),
    },
  }),
  page('/image-resize', 'converter', 'img-resize', undefined, {
    pt: {
      title: 'Redimensionar Imagem Online Offline | PDFWINDOWS',
      description: 'Redimensione e comprima imagens no navegador.',
      keywords: 'redimensionar imagem, comprimir imagem offline',
      h1: 'Redimensionar Imagem',
      intro: 'Ajuste pixels e qualidade sem enviar arquivos para servidores.',
      benefits: ['Proporção bloqueada opcional', 'Compressão inteligente', 'Processamento local'],
      howItWorks: ['Envie imagens.', 'Defina tamanho e qualidade.', 'Baixe o resultado.'],
      faq: privacyFaq('pt'),
    },
    en: {
      title: 'Resize Image Online Offline | PDFWINDOWS',
      description: 'Resize and compress images in your browser.',
      keywords: 'resize image, compress image offline',
      h1: 'Resize Image',
      intro: 'Adjust pixels and quality without uploading files to servers.',
      benefits: ['Optional aspect lock', 'Smart compression', 'Local processing'],
      howItWorks: ['Upload images.', 'Set size and quality.', 'Download output.'],
      faq: privacyFaq('en'),
    },
    es: {
      title: 'Redimensionar Imagen Online Offline | PDFWINDOWS',
      description: 'Redimensione imágenes en el navegador.',
      keywords: 'redimensionar imagen offline',
      h1: 'Redimensionar Imagen',
      intro: 'Ajuste píxeles y calidad sin subir archivos.',
      benefits: ['Proporción opcional', 'Compresión inteligente', 'Procesamiento local'],
      howItWorks: ['Suba imágenes.', 'Defina tamaño.', 'Descargue.'],
      faq: privacyFaq('es'),
    },
  }),
  page('/image-ocr', 'converter', 'img-ocr', undefined, {
    pt: {
      title: 'OCR de Imagem Online Offline | PDFWINDOWS',
      description: 'Extraia texto de imagens com OCR local no navegador.',
      keywords: 'ocr imagem, foto para texto, tesseract offline',
      h1: 'OCR de Imagem',
      intro: 'Digitalize texto de fotos, prints e documentos escaneados.',
      benefits: ['OCR no dispositivo', 'Múltiplos idiomas', 'Sem nuvem'],
      howItWorks: ['Envie uma imagem.', 'Selecione OCR.', 'Copie ou exporte o texto.'],
      faq: privacyFaq('pt'),
    },
    en: {
      title: 'Image OCR Online Offline | PDFWINDOWS',
      description: 'Extract text from images with local OCR in your browser.',
      keywords: 'image ocr, photo to text, offline ocr',
      h1: 'Image OCR',
      intro: 'Digitize text from photos and scans.',
      benefits: ['On-device OCR', 'Multiple languages', 'No cloud'],
      howItWorks: ['Upload an image.', 'Select OCR.', 'Copy or export text.'],
      faq: privacyFaq('en'),
    },
    es: {
      title: 'OCR de Imagen Online Offline | PDFWINDOWS',
      description: 'Extraiga texto de imágenes con OCR local.',
      keywords: 'ocr imagen, foto a texto',
      h1: 'OCR de Imagen',
      intro: 'Digitalice texto de fotos con precisión.',
      benefits: ['OCR en dispositivo', 'Varios idiomas', 'Sin nube'],
      howItWorks: ['Suba imagen.', 'Seleccione OCR.', 'Exporte texto.'],
      faq: privacyFaq('es'),
    },
  }),
  page('/image-filters', 'converter', 'img-filter', undefined, {
    pt: {
      title: 'Filtros de Imagem Online Offline | PDFWINDOWS',
      description: 'Ajuste brilho, contraste e escala de cinza localmente.',
      keywords: 'filtro imagem, brilho contraste imagem offline',
      h1: 'Filtros de Imagem',
      intro: 'Edite imagens com ajustes rápidos sem upload.',
      benefits: ['Preview instantâneo', 'Controles precisos', 'Gratuito'],
      howItWorks: ['Envie imagens.', 'Ajuste filtros.', 'Baixe o resultado.'],
      faq: privacyFaq('pt'),
    },
    en: {
      title: 'Image Filters Online Offline | PDFWINDOWS',
      description: 'Adjust brightness, contrast, and grayscale locally.',
      keywords: 'image filters, brightness contrast offline',
      h1: 'Image Filters',
      intro: 'Edit images with quick adjustments without upload.',
      benefits: ['Instant preview', 'Precise controls', 'Free to use'],
      howItWorks: ['Upload images.', 'Adjust filters.', 'Download output.'],
      faq: privacyFaq('en'),
    },
    es: {
      title: 'Filtros de Imagen Online Offline | PDFWINDOWS',
      description: 'Ajuste brillo y contraste localmente.',
      keywords: 'filtros imagen offline',
      h1: 'Filtros de Imagen',
      intro: 'Edite imágenes sin subir archivos.',
      benefits: ['Vista previa instantánea', 'Controles precisos', 'Gratis'],
      howItWorks: ['Suba imágenes.', 'Ajuste filtros.', 'Descargue.'],
      faq: privacyFaq('es'),
    },
  }),
  page('/csv-to-json', 'converter', 'csv-json', undefined, {
    pt: {
      title: 'CSV para JSON Online Offline | PDFWINDOWS',
      description: 'Converta CSV em JSON no navegador. Rápido e gratuito.',
      keywords: 'csv para json, converter csv offline',
      h1: 'CSV para JSON',
      intro: 'Transforme planilhas em JSON estruturado localmente.',
      benefits: ['Parsing seguro', 'Sem servidor', 'Exportação rápida'],
      howItWorks: ['Envie um CSV.', 'Selecione conversão.', 'Baixe o JSON.'],
      faq: privacyFaq('pt'),
    },
    en: {
      title: 'CSV to JSON Online Offline | PDFWINDOWS',
      description: 'Convert CSV to JSON in your browser. Fast and free.',
      keywords: 'csv to json, convert csv offline',
      h1: 'CSV to JSON',
      intro: 'Turn spreadsheets into structured JSON locally.',
      benefits: ['Safe parsing', 'No server', 'Fast export'],
      howItWorks: ['Upload CSV.', 'Select conversion.', 'Download JSON.'],
      faq: privacyFaq('en'),
    },
    es: {
      title: 'CSV a JSON Online Offline | PDFWINDOWS',
      description: 'Convierta CSV a JSON en el navegador.',
      keywords: 'csv a json offline',
      h1: 'CSV a JSON',
      intro: 'Transforme hojas de cálculo en JSON localmente.',
      benefits: ['Análisis seguro', 'Sin servidor', 'Exportación rápida'],
      howItWorks: ['Suba CSV.', 'Seleccione conversión.', 'Descargue JSON.'],
      faq: privacyFaq('es'),
    },
  }),
  page('/json-to-csv', 'converter', 'json-to-csv', undefined, {
    pt: {
      title: 'JSON para CSV Online Offline | PDFWINDOWS',
      description: 'Converta JSON em CSV no navegador.',
      keywords: 'json para csv, converter json offline',
      h1: 'JSON para CSV',
      intro: 'Gere planilhas compatíveis a partir de dados JSON.',
      benefits: ['Ideal para análise', 'Processamento local', 'Sem cadastro'],
      howItWorks: ['Envie JSON.', 'Converta.', 'Baixe CSV.'],
      faq: privacyFaq('pt'),
    },
    en: {
      title: 'JSON to CSV Online Offline | PDFWINDOWS',
      description: 'Convert JSON to CSV in your browser.',
      keywords: 'json to csv offline',
      h1: 'JSON to CSV',
      intro: 'Generate spreadsheet-friendly CSV from JSON data.',
      benefits: ['Great for analysis', 'Local processing', 'No signup'],
      howItWorks: ['Upload JSON.', 'Convert.', 'Download CSV.'],
      faq: privacyFaq('en'),
    },
    es: {
      title: 'JSON a CSV Online Offline | PDFWINDOWS',
      description: 'Convierta JSON a CSV en el navegador.',
      keywords: 'json a csv offline',
      h1: 'JSON a CSV',
      intro: 'Genere CSV desde datos JSON.',
      benefits: ['Ideal para análisis', 'Procesamiento local', 'Sin registro'],
      howItWorks: ['Suba JSON.', 'Convierta.', 'Descargue CSV.'],
      faq: privacyFaq('es'),
    },
  }),
  page('/xml-to-json', 'converter', 'xml-json', undefined, {
    pt: {
      title: 'XML para JSON Online Offline | PDFWINDOWS',
      description: 'Converta XML em JSON localmente no navegador.',
      keywords: 'xml para json, converter xml offline',
      h1: 'XML para JSON',
      intro: 'Estruture dados XML para APIs e integrações sem upload.',
      benefits: ['Conversão rápida', 'Sem instalação', 'Gratuito'],
      howItWorks: ['Envie XML.', 'Converta.', 'Baixe JSON.'],
      faq: privacyFaq('pt'),
    },
    en: {
      title: 'XML to JSON Online Offline | PDFWINDOWS',
      description: 'Convert XML to JSON locally in your browser.',
      keywords: 'xml to json offline',
      h1: 'XML to JSON',
      intro: 'Structure XML data for APIs without uploads.',
      benefits: ['Fast conversion', 'No install', 'Free to use'],
      howItWorks: ['Upload XML.', 'Convert.', 'Download JSON.'],
      faq: privacyFaq('en'),
    },
    es: {
      title: 'XML a JSON Online Offline | PDFWINDOWS',
      description: 'Convierta XML a JSON localmente.',
      keywords: 'xml a json offline',
      h1: 'XML a JSON',
      intro: 'Estructure XML para APIs sin subir archivos.',
      benefits: ['Conversión rápida', 'Sin instalación', 'Gratis'],
      howItWorks: ['Suba XML.', 'Convierta.', 'Descargue JSON.'],
      faq: privacyFaq('es'),
    },
  }),
  page('/txt-to-pdf', 'converter', 'txt-to-pdf', undefined, {
    pt: {
      title: 'TXT para PDF Online Offline | PDFWINDOWS',
      description: 'Converta arquivos de texto em PDF no navegador.',
      keywords: 'txt para pdf, texto para pdf offline',
      h1: 'TXT para PDF',
      intro: 'Gere PDFs legíveis a partir de arquivos .txt localmente.',
      benefits: ['Layout limpo', 'Processamento instantâneo', 'Sem nuvem'],
      howItWorks: ['Envie um .txt.', 'Selecione conversão.', 'Baixe o PDF.'],
      faq: privacyFaq('pt'),
    },
    en: {
      title: 'TXT to PDF Online Offline | PDFWINDOWS',
      description: 'Convert text files to PDF in your browser.',
      keywords: 'txt to pdf offline',
      h1: 'TXT to PDF',
      intro: 'Create readable PDFs from .txt files locally.',
      benefits: ['Clean layout', 'Instant processing', 'No cloud'],
      howItWorks: ['Upload .txt.', 'Select conversion.', 'Download PDF.'],
      faq: privacyFaq('en'),
    },
    es: {
      title: 'TXT a PDF Online Offline | PDFWINDOWS',
      description: 'Convierta texto a PDF en el navegador.',
      keywords: 'txt a pdf offline',
      h1: 'TXT a PDF',
      intro: 'Cree PDF desde archivos .txt localmente.',
      benefits: ['Diseño limpio', 'Procesamiento instantáneo', 'Sin nube'],
      howItWorks: ['Suba .txt.', 'Convierta.', 'Descargue PDF.'],
      faq: privacyFaq('es'),
    },
  }),
  page('/estudio-documentos', 'suite', undefined, 'document-studio', {
    pt: {
      title: 'Estúdio de Documentos Online Offline | PDFWINDOWS',
      description:
        'Crie documentos profissionais com modelos, editor estruturado e exportação PDF local.',
      keywords: 'estudio documentos, gerador documento pdf, templates offline',
      h1: 'Estúdio de Documentos',
      intro: 'Editor estruturado com pré-visualização ao vivo e exportação PDF.',
      benefits: ['Modelos profissionais', 'Smart Fill local', 'Rascunhos opcionais no dispositivo'],
      howItWorks: ['Escolha um modelo.', 'Preencha os campos.', 'Exporte o PDF.'],
      faq: privacyFaq('pt'),
    },
    en: {
      title: 'Document Studio Online Offline | PDFWINDOWS',
      description: 'Create professional documents with templates and PDF export.',
      keywords: 'document studio, pdf template editor offline',
      h1: 'Document Studio',
      intro: 'Structured editor with live preview and PDF export.',
      benefits: ['Professional templates', 'Local Smart Fill', 'Optional on-device drafts'],
      howItWorks: ['Pick a template.', 'Fill fields.', 'Export PDF.'],
      faq: privacyFaq('en'),
    },
    es: {
      title: 'Estudio de Documentos Online Offline | PDFWINDOWS',
      description: 'Cree documentos profesionales con plantillas y exportación PDF local.',
      keywords: 'estudio documentos, plantillas pdf offline',
      h1: 'Estudio de Documentos',
      intro: 'Editor estructurado con vista previa en vivo y exportación PDF local.',
      benefits: ['Plantillas profesionales', 'Smart Fill local', 'Borradores opcionales'],
      howItWorks: ['Elija plantilla.', 'Complete campos.', 'Exporte PDF.'],
      faq: privacyFaq('es'),
    },
  }),
  page('/capturador-de-cores', 'suite', undefined, 'color-picker', {
    pt: {
      title: 'Capturador de Cores Online — HEX e RGB | PDFWINDOWS',
      description:
        'Capture cores de imagens ou da tela com conta-gotas. Descubra códigos HEX, RGB e HSL',
      keywords:
        'capturar cor online, descobrir código HEX, color picker, conta-gotas online, extrair cor da imagem',
      h1: 'Capturador de Cores',
      intro:
        'Extraia códigos de cores de imagens ou da sua tela em tempo real. HEX, RGB e HSL — totalmente local.',
      benefits: [
        'Captura por imagem ou tela (EyeDropper)',
        'Paleta dominante automática',
        'Histórico local e exportação',
        'Sem upload nem servidor',
      ],
      howItWorks: [
        'Escolha imagem ou tela.',
        'Clique no pixel desejado.',
        'Copie HEX ou RGB.',
      ],
      faq: privacyFaq('pt'),
    },
    en: {
      title: 'Online Color Picker — HEX & RGB | PDFWINDOWS',
      description:
        'Pick colors from images or your screen. Get HEX, RGB, and HSL codes',
      keywords:
        'color picker online, hex code finder, eyedropper tool, extract color from image, offline color picker',
      h1: 'Color Picker',
      intro: 'Extract color codes from images or your screen in real time. HEX, RGB, and HSL — fully local.',
      benefits: [
        'Image or screen capture (EyeDropper)',
        'Automatic dominant palette',
        'Local history and export',
        'No upload or server',
      ],
      howItWorks: ['Choose image or screen.', 'Click the pixel.', 'Copy HEX or RGB.'],
      faq: privacyFaq('en'),
    },
    es: {
      title: 'Capturador de Colores Online — HEX y RGB | PDFWINDOWS',
      description:
        'Captura colores de imágenes o pantalla. Códigos HEX, RGB y HSL',
      keywords:
        'capturar color online, código HEX, color picker, cuentagotas online, extraer color imagen',
      h1: 'Capturador de Colores',
      intro: 'Extrae códigos de color de imágenes o pantalla en tiempo real. HEX, RGB y HSL — totalmente local.',
      benefits: [
        'Captura por imagen o pantalla',
        'Paleta dominante automática',
        'Historial local y exportación',
        'Sin subida ni servidor',
      ],
      howItWorks: ['Elija imagen o pantalla.', 'Haga clic en el píxel.', 'Copie HEX o RGB.'],
      faq: privacyFaq('es'),
    },
  }),
  page('/gerador-relatorios', 'suite', undefined, 'report-gen', {
    pt: {
      title: 'Gerador de Relatórios e Recibos Online Offline | PDFWINDOWS',
      description: 'Monte relatórios e recibos com seções ou itens e exporte PDF localmente.',
      keywords: 'gerador relatorio pdf, gerador recibo, relatorio offline',
      h1: 'Gerador de Relatórios',
      intro: 'Relatórios profissionais e recibos com itens — tudo em um workspace, exportação PDF local.',
      benefits: ['Relatórios com seções', 'Recibos com totais automáticos', 'PDF imediato'],
      howItWorks: ['Escolha relatório ou recibo.', 'Preencha os campos.', 'Baixe o PDF.'],
      faq: privacyFaq('pt'),
    },
    en: {
      title: 'Report & Receipt Generator Online Offline | PDFWINDOWS',
      description: 'Build reports and receipts with local PDF export.',
      keywords: 'report generator pdf, receipt generator offline',
      h1: 'Report Generator',
      intro: 'Professional reports and receipts in one workspace PDF export.',
      benefits: ['Report sections', 'Receipt line items', 'Instant PDF'],
      howItWorks: ['Choose report or receipt.', 'Fill the form.', 'Download PDF.'],
      faq: privacyFaq('en'),
    },
    es: {
      title: 'Generador de Informes y Recibos Online Offline | PDFWINDOWS',
      description: 'Cree informes y recibos con exportación PDF local.',
      keywords: 'generador informes pdf, generador recibos offline',
      h1: 'Generador de Informes',
      intro: 'Informes y recibos en un solo workspace con exportación PDF local.',
      benefits: ['Secciones de informe', 'Recibos con totales', 'PDF inmediato'],
      howItWorks: ['Elija informe o recibo.', 'Complete campos.', 'Descargue PDF.'],
      faq: privacyFaq('es'),
    },
  }),
  page('/gerador-qr-code', 'suite', undefined, 'qr-gen', {
    pt: {
      title: 'Gerador de QR Code Online Offline | PDFWINDOWS',
      description: 'Crie QR Codes de links e textos localmente, sem upload.',
      keywords: 'gerador qr code, qr code offline',
      h1: 'Gerador de QR Code',
      intro: 'Gere QR Codes de alta qualidade diretamente no navegador.',
      benefits: ['PNG pronto para uso', 'Sem cadastro', 'Alta resolução'],
      howItWorks: ['Insira link ou texto.', 'Gere o QR.', 'Baixe a imagem.'],
      faq: privacyFaq('pt'),
    },
    en: {
      title: 'QR Code Generator Online Offline | PDFWINDOWS',
      description: 'Create QR codes for links and text locally, no upload.',
      keywords: 'qr code generator offline',
      h1: 'QR Code Generator',
      intro: 'Generate high-quality QR codes directly in your browser.',
      benefits: ['Ready-to-use PNG', 'No signup', 'High resolution'],
      howItWorks: ['Enter link or text.', 'Generate QR.', 'Download image.'],
      faq: privacyFaq('en'),
    },
    es: {
      title: 'Generador de Código QR Online Offline | PDFWINDOWS',
      description: 'Cree códigos QR localmente sin subir datos.',
      keywords: 'generador qr offline',
      h1: 'Generador de Código QR',
      intro: 'Genere códigos QR de alta calidad en el navegador.',
      benefits: ['PNG listo', 'Sin registro', 'Alta resolución'],
      howItWorks: ['Inserte enlace o texto.', 'Genere QR.', 'Descargue imagen.'],
      faq: privacyFaq('es'),
    },
  }),
  page('/gerador-cpf', 'suite', undefined, 'cpf-gen', {
    pt: {
      title: 'Gerador de CPF para Testes | PDFWINDOWS',
      description: 'Gere CPFs válidos apenas para testes de software. Uso local e educacional.',
      keywords: 'gerador cpf teste, cpf valido teste sistema',
      h1: 'Gerador de CPF para Testes',
      intro: 'Ferramenta exclusiva para desenvolvedores testarem validações de formulário.',
      benefits: ['Algoritmo válido', 'Uso local', 'Aviso legal claro'],
      howItWorks: ['Abra a ferramenta.', 'Clique em gerar.', 'Copie o CPF de teste.'],
      faq: privacyFaq('pt'),
    },
    en: {
      title: 'CPF Generator for Testing | PDFWINDOWS',
      description: 'Generate valid-format CPF numbers for software testing only.',
      keywords: 'cpf generator test, brazil cpf test',
      h1: 'CPF Generator for Tests',
      intro: 'For developers testing form validation only — not for real identities.',
      benefits: ['Valid algorithm', 'Local use', 'Clear legal notice'],
      howItWorks: ['Open tool.', 'Click generate.', 'Copy test CPF.'],
      faq: privacyFaq('en'),
    },
    es: {
      title: 'Generador de CPF para Pruebas | PDFWINDOWS',
      description: 'Genere CPF válidos solo para pruebas de software.',
      keywords: 'generador cpf prueba',
      h1: 'Generador de CPF para Pruebas',
      intro: 'Para desarrolladores que prueban validaciones de formulario.',
      benefits: ['Algoritmo válido', 'Uso local', 'Aviso legal claro'],
      howItWorks: ['Abra la herramienta.', 'Genere.', 'Copie el CPF.'],
      faq: privacyFaq('es'),
    },
  }),
  page('/limpador-codigo', 'suite', undefined, 'code-clean', {
    pt: {
      title: 'Formatador de Código Online Offline | PDFWINDOWS',
      description: 'Formate ou minifique HTML, CSS e JS localmente no navegador.',
      keywords: 'formatar codigo, minificar js offline, prettier local',
      h1: 'Limpador e Formatador de Código',
      intro: 'Organize código web sem enviar projetos para servidores externos.',
      benefits: ['HTML, CSS e JS', 'Modo minificar', 'Prettier local'],
      howItWorks: ['Cole o código.', 'Escolha linguagem e modo.', 'Processe o resultado.'],
      faq: privacyFaq('pt'),
    },
    en: {
      title: 'Code Formatter Online Offline | PDFWINDOWS',
      description: 'Format or minify HTML, CSS, and JS locally in your browser.',
      keywords: 'code formatter, minify js offline',
      h1: 'Code Cleaner & Formatter',
      intro: 'Organize web code without sending projects to external servers.',
      benefits: ['HTML, CSS, JS', 'Minify mode', 'Local Prettier'],
      howItWorks: ['Paste code.', 'Pick language and mode.', 'Process output.'],
      faq: privacyFaq('en'),
    },
    es: {
      title: 'Formateador de Código Online Offline | PDFWINDOWS',
      description: 'Formatee o minifique HTML, CSS y JS localmente.',
      keywords: 'formatear codigo offline',
      h1: 'Limpiador de Código',
      intro: 'Organice código web sin subir proyectos.',
      benefits: ['HTML, CSS y JS', 'Modo minificar', 'Prettier local'],
      howItWorks: ['Pegue código.', 'Elija modo.', 'Procese.'],
      faq: privacyFaq('es'),
    },
  }),
];

export const HOME_COPY: Record<LanguageType, ToolPageCopy> = {
  pt: {
    title: 'PDFWINDOWS — Ferramentas PDF e Imagem',
    description:
      'Plataforma profissional de PDF, imagem e produtividade. Ferramentas no navegador, sem cadastro.',
    keywords: 'pdf offline, converter pdf, ferramentas pdf gratis',
    h1: 'Ferramentas PDF e Imagem',
    intro:
      'PDFWINDOWS é uma plataforma SaaS offline-first para converter, proteger e criar documentos sem enviar arquivos para servidores.',
    benefits: [

      'Dezenas de ferramentas em páginas dedicadas',
      'Ideal para uso profissional e pessoal',
      'Preparado para SEO e crescimento orgânico',
    ],
    howItWorks: [
      'Escolha a ferramenta no catálogo.',
      'Processe localmente no navegador.',
      'Baixe o resultado imediatamente.',
    ],
    faq: [
      ...privacyFaq('pt'),
      {
        q: 'Preciso instalar algo?',
        a: 'Não. Funciona diretamente no navegador moderno (Chrome, Edge, Firefox).',
      },
    ],
  },
  en: {
    title: 'PDFWINDOWS',
    description:
      'Professional PDF, image, and productivity platform. Browser tools, no signup required.',
    keywords: 'offline pdf tools, pdf converter, pdf editor',
    h1: 'PDF & Image Tools',
    intro:
      'PDFWINDOWS is an offline-first SaaS platform to convert, protect, and create documents without uploading files to servers.',
    benefits: [

      'Dozens of tools on dedicated pages',
      'Great for professional and personal use',
      'Built for SEO and organic growth',
    ],
    howItWorks: ['Pick a tool from the catalog.', 'Process locally in your browser.', 'Download results instantly.'],
    faq: [
      ...privacyFaq('en'),
      {
        q: 'Do I need to install anything?',
        a: 'No. It runs in modern browsers (Chrome, Edge, Firefox).',
      },
    ],
  },
  es: {
    title: 'PDFWINDOWS — Herramientas PDF e Imagen',
    description:
      'Plataforma profesional de PDF, imagen y productividad. Herramientas en el navegador, sin registro.',
    keywords: 'pdf offline, convertir pdf, herramientas pdf gratis',
    h1: 'Herramientas PDF e Imagen',
    intro:
      'PDFWINDOWS es una plataforma offline-first para convertir, proteger y crear documentos sin subir archivos.',
    benefits: [

      'Docenas de herramientas en páginas dedicadas',
      'Ideal para uso profesional y personal',
      'Preparado para SEO y crecimiento orgánico',
    ],
    howItWorks: ['Elija la herramienta.', 'Procese en el navegador.', 'Descargue al instante.'],
    faq: [
      ...privacyFaq('es'),
      {
        q: '¿Debo instalar algo?',
        a: 'No. Funciona en navegadores modernos (Chrome, Edge, Firefox).',
      },
    ],
  },
};

export function getToolPageByPath(path: string): ToolPageDefinition | undefined {
  const normalized = stripLocalePrefix(path.startsWith('/') ? path : `/${path}`);
  return TOOL_PAGES.find((p) => p.path === normalized);
}

export function getAllPublicPaths(): string[] {
  const barePaths = ['/', '/ferramentas', '/conversor', ...TOOL_PAGES.map((p) => p.path)];
  const locales: LanguageType[] = ['en', 'pt', 'es'];
  return locales.flatMap((lang) => barePaths.map((p) => localizedPath(lang, p)));
}
