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
        q: 'Meus arquivos estão seguros?',
        a: 'Sim. Todo o processamento acontece no seu navegador. Seus arquivos nunca são enviados para servidores.',
      },
      {
        q: 'Meus arquivos saem do meu computador?',
        a: 'Não. Seus arquivos permanecem no seu dispositivo do início ao fim do processamento.',
      },
      {
        q: 'Posso usar o PDFWINDOWS gratuitamente?',
        a: 'Sim. Todas as ferramentas são gratuitas e não exigem cadastro.',
      },
    ];
  }
  if (lang === 'es') {
    return [
      {
        q: '¿Mis archivos están seguros?',
        a: 'Sí. Todo el procesamiento ocurre en su navegador. Sus archivos nunca se suben a servidores.',
      },
      {
        q: '¿Mis archivos salen de mi computadora?',
        a: 'No. Sus archivos permanecen en su dispositivo de principio a fin.',
      },
      {
        q: '¿Puedo usar PDFWINDOWS gratis?',
        a: 'Sí. Todas las herramientas son gratuitas y no requieren registro.',
      },
    ];
  }
  return [
    {
      q: 'Are my files secure?',
      a: 'Yes. All processing happens in your browser. Your files are never uploaded to our servers.',
    },
    {
      q: 'Do my files leave my computer?',
      a: 'No. Your files stay on your device from start to finish.',
    },
    {
      q: 'Can I use PDFWINDOWS for free?',
      a: 'Yes. Every tool is free to use with no account required.',
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
      title: 'Mesclar PDFs Online Grátis | PDFWINDOWS',
      description:
        'Combine vários PDFs em um único arquivo diretamente no navegador. Rápido, seguro e sem upload.',
      keywords: 'mesclar pdf, juntar pdf, combinar pdf, merge pdf gratis, unir arquivos pdf',
      h1: 'Mesclar PDFs',
      intro:
        'Una contratos, relatórios e documentos em um único PDF. Arraste, organize a ordem e baixe o resultado na hora — tudo no seu computador.',
      benefits: [
        'Combine quantos PDFs precisar',
        'Defina a ordem dos arquivos',
        'Processamento instantâneo no navegador',
      ],
      howItWorks: [
        'Escolha dois ou mais arquivos PDF.',
        'Organize a ordem dos documentos.',
        'Baixe o PDF unificado.',
      ],
      faq: [
        ...privacyFaq('pt'),
        {
          q: 'Quantos PDFs posso mesclar de uma vez?',
          a: 'Você pode adicionar vários arquivos à fila e mesclá-los em um único documento.',
        },
      ],
    },
    en: {
      title: 'Merge PDFs Online Free | PDFWINDOWS',
      description:
        'Combine multiple PDFs into one file right in your browser. Fast, secure, and no upload required.',
      keywords: 'merge pdf, combine pdf, join pdf files, merge pdfs online free',
      h1: 'Merge PDFs',
      intro:
        'Combine contracts, reports, and documents into a single PDF. Drag, reorder, and download instantly — all on your computer.',
      benefits: [
        'Merge as many PDFs as you need',
        'Reorder files before combining',
        'Instant processing in your browser',
      ],
      howItWorks: [
        'Choose two or more PDF files.',
        'Arrange the document order.',
        'Download your merged PDF.',
      ],
      faq: [
        ...privacyFaq('en'),
        {
          q: 'How many PDFs can I merge at once?',
          a: 'Add as many files as you need to the queue and combine them into one document.',
        },
      ],
    },
    es: {
      title: 'Unir PDF Online Gratis | PDFWINDOWS',
      description:
        'Combine varios PDF en un solo archivo directamente en el navegador. Rápido, seguro y sin subida.',
      keywords: 'unir pdf, combinar pdf, juntar pdf, unir archivos pdf gratis',
      h1: 'Unir PDF',
      intro:
        'Una contratos, informes y documentos en un solo PDF. Arrastre, ordene y descargue al instante — todo en su computadora.',
      benefits: [
        'Combine todos los PDF que necesite',
        'Defina el orden de los archivos',
        'Procesamiento instantáneo en el navegador',
      ],
      howItWorks: [
        'Elija dos o más archivos PDF.',
        'Organice el orden de los documentos.',
        'Descargue el PDF unificado.',
      ],
      faq: [
        ...privacyFaq('es'),
        {
          q: '¿Cuántos PDF puedo unir a la vez?',
          a: 'Puede agregar varios archivos a la cola y combinarlos en un solo documento.',
        },
      ],
    },
  }),
  page('/pdf-compress', 'converter', 'pdf-compress', undefined, {
    pt: {
      title: 'Comprimir PDF Online Grátis | PDFWINDOWS',
      description:
        'Reduza o tamanho do seu PDF sem perder qualidade útil. Rápido, seguro e direto no navegador.',
      keywords: 'comprimir pdf, reduzir tamanho pdf, pdf menor, otimizar pdf',
      h1: 'Comprimir PDF',
      intro:
        'Diminua o peso dos seus PDFs para enviar por e-mail ou economizar espaço. Seus arquivos permanecem no seu computador.',
      benefits: [
        'Redução inteligente de tamanho',
        'Ideal para arquivos confidenciais',
        'Resultado pronto em segundos',
      ],
      howItWorks: [
        'Escolha um ou mais arquivos PDF.',
        'Inicie a compressão.',
        'Baixe o arquivo otimizado.',
      ],
      faq: [
        ...privacyFaq('pt'),
        {
          q: 'A compressão reduz a qualidade do PDF?',
          a: 'O algoritmo equilibra tamanho e legibilidade, mantendo qualidade adequada para leitura e impressão.',
        },
      ],
    },
    en: {
      title: 'Compress PDF Online Free | PDFWINDOWS',
      description:
        'Reduce your PDF file size without sacrificing usable quality. Fast, secure, and runs in your browser.',
      keywords: 'compress pdf, reduce pdf size, shrink pdf, optimize pdf file',
      h1: 'Compress PDF',
      intro:
        'Shrink PDFs for email attachments or storage. Your files stay on your computer throughout the process.',
      benefits: [
        'Smart size reduction',
        'Safe for confidential documents',
        'Results ready in seconds',
      ],
      howItWorks: [
        'Choose one or more PDF files.',
        'Start compression.',
        'Download your optimized file.',
      ],
      faq: [
        ...privacyFaq('en'),
        {
          q: 'Will compression reduce PDF quality?',
          a: 'The algorithm balances file size and readability, keeping quality suitable for viewing and printing.',
        },
      ],
    },
    es: {
      title: 'Comprimir PDF Online Gratis | PDFWINDOWS',
      description:
        'Reduzca el tamaño de su PDF sin perder calidad útil. Rápido, seguro y directo en el navegador.',
      keywords: 'comprimir pdf, reducir tamaño pdf, pdf más pequeño, optimizar pdf',
      h1: 'Comprimir PDF',
      intro:
        'Reduzca el peso de sus PDF para enviar por correo o ahorrar espacio. Sus archivos permanecen en su computadora.',
      benefits: [
        'Reducción inteligente de tamaño',
        'Ideal para archivos confidenciales',
        'Resultado listo en segundos',
      ],
      howItWorks: [
        'Elija uno o más archivos PDF.',
        'Inicie la compresión.',
        'Descargue el archivo optimizado.',
      ],
      faq: [
        ...privacyFaq('es'),
        {
          q: '¿La compresión reduce la calidad del PDF?',
          a: 'El algoritmo equilibra tamaño y legibilidad, manteniendo calidad adecuada para lectura e impresión.',
        },
      ],
    },
  }),
  page('/pdf-password', 'converter', 'pdf-password', undefined, {
    pt: {
      title: 'Proteger PDF com Senha Online | PDFWINDOWS',
      description:
        'Adicione senha e criptografia ao seu PDF no navegador. Seguro, rápido e sem enviar arquivos.',
      keywords: 'proteger pdf, pdf com senha, criptografar pdf, bloquear pdf',
      h1: 'Proteger PDF',
      intro:
        'Proteja documentos sensíveis com criptografia real antes de compartilhar. A senha é definida por você e nunca sai do seu dispositivo.',
      benefits: [
        'Criptografia compatível com leitores de PDF',
        'Senha definida apenas por você',
        'Compatível com Adobe, Chrome e outros',
      ],
      howItWorks: [
        'Escolha o arquivo PDF.',
        'Defina a senha de proteção.',
        'Baixe o PDF protegido.',
      ],
      faq: [
        ...privacyFaq('pt'),
        {
          q: 'O PDF protegido abre em qualquer leitor?',
          a: 'Sim. O arquivo usa criptografia padrão compatível com Adobe Acrobat, Chrome e a maioria dos leitores de PDF.',
        },
      ],
    },
    en: {
      title: 'Protect PDF with Password Online | PDFWINDOWS',
      description:
        'Add password protection and encryption to your PDF in the browser. Secure, fast, and no file upload.',
      keywords: 'protect pdf, password protect pdf, encrypt pdf, lock pdf',
      h1: 'Protect PDF',
      intro:
        'Secure sensitive documents with real encryption before sharing. You set the password — it never leaves your device.',
      benefits: [
        'Encryption compatible with PDF readers',
        'Password known only to you',
        'Works with Adobe, Chrome, and more',
      ],
      howItWorks: [
        'Choose your PDF file.',
        'Set your protection password.',
        'Download your protected PDF.',
      ],
      faq: [
        ...privacyFaq('en'),
        {
          q: 'Will the protected PDF open in any reader?',
          a: 'Yes. The file uses standard encryption compatible with Adobe Acrobat, Chrome, and most PDF readers.',
        },
      ],
    },
    es: {
      title: 'Proteger PDF con Contraseña Online | PDFWINDOWS',
      description:
        'Añada contraseña y cifrado a su PDF en el navegador. Seguro, rápido y sin subir archivos.',
      keywords: 'proteger pdf, pdf con contraseña, cifrar pdf, bloquear pdf',
      h1: 'Proteger PDF',
      intro:
        'Proteja documentos sensibles con cifrado real antes de compartir. Usted define la contraseña — nunca sale de su dispositivo.',
      benefits: [
        'Cifrado compatible con lectores de PDF',
        'Contraseña definida solo por usted',
        'Compatible con Adobe, Chrome y otros',
      ],
      howItWorks: [
        'Elija el archivo PDF.',
        'Defina la contraseña de protección.',
        'Descargue el PDF protegido.',
      ],
      faq: [
        ...privacyFaq('es'),
        {
          q: '¿El PDF protegido abre en cualquier lector?',
          a: 'Sí. El archivo usa cifrado estándar compatible con Adobe Acrobat, Chrome y la mayoría de lectores de PDF.',
        },
      ],
    },
  }),
  page('/pdf-ocr', 'converter', 'pdf-ocr', undefined, {
    pt: {
      title: 'OCR de PDF Online Grátis | PDFWINDOWS',
      description:
        'Extraia texto pesquisável de PDFs digitalizados no navegador. OCR local, rápido e privado.',
      keywords: 'ocr pdf, pdf para texto, reconhecer texto pdf, pdf digitalizado',
      h1: 'OCR de PDF',
      intro:
        'Transforme páginas digitalizadas em texto editável e pesquisável. Ideal para documentos confidenciais que não podem sair do seu computador.',
      benefits: [
        'OCR processado no seu dispositivo',
        'Suporte a múltiplos idiomas',
        'Sem envio de documentos para servidores',
      ],
      howItWorks: [
        'Escolha o PDF digitalizado.',
        'Inicie o reconhecimento de texto.',
        'Baixe ou copie o texto extraído.',
      ],
      faq: [
        ...privacyFaq('pt'),
        {
          q: 'Quais idiomas o OCR suporta?',
          a: 'O OCR reconhece texto em diversos idiomas, incluindo português, inglês e espanhol.',
        },
      ],
    },
    en: {
      title: 'PDF OCR Online Free | PDFWINDOWS',
      description:
        'Extract searchable text from scanned PDFs in your browser. Local OCR — fast and private.',
      keywords: 'pdf ocr, scanned pdf to text, ocr pdf online, recognize text pdf',
      h1: 'PDF OCR',
      intro:
        'Turn scanned pages into editable, searchable text. Perfect for confidential documents that cannot leave your computer.',
      benefits: [
        'OCR processed on your device',
        'Multiple language support',
        'No documents sent to servers',
      ],
      howItWorks: [
        'Choose your scanned PDF.',
        'Start text recognition.',
        'Download or copy the extracted text.',
      ],
      faq: [
        ...privacyFaq('en'),
        {
          q: 'What languages does OCR support?',
          a: 'OCR recognizes text in multiple languages, including English, Portuguese, and Spanish.',
        },
      ],
    },
    es: {
      title: 'OCR de PDF Online Gratis | PDFWINDOWS',
      description:
        'Extraiga texto buscable de PDF escaneados en el navegador. OCR local, rápido y privado.',
      keywords: 'ocr pdf, pdf a texto, reconocer texto pdf, pdf escaneado',
      h1: 'OCR de PDF',
      intro:
        'Convierta páginas escaneadas en texto editable y buscable. Ideal para documentos confidenciales que no pueden salir de su computadora.',
      benefits: [
        'OCR procesado en su dispositivo',
        'Soporte para múltiples idiomas',
        'Sin envío de documentos a servidores',
      ],
      howItWorks: [
        'Elija el PDF escaneado.',
        'Inicie el reconocimiento de texto.',
        'Descargue o copie el texto extraído.',
      ],
      faq: [
        ...privacyFaq('es'),
        {
          q: '¿Qué idiomas admite el OCR?',
          a: 'El OCR reconoce texto en varios idiomas, incluidos español, inglés y portugués.',
        },
      ],
    },
  }),
  page('/pdf-split', 'converter', 'pdf-split', undefined, {
    pt: {
      title: 'Dividir PDF Online Grátis | PDFWINDOWS',
      description:
        'Separe páginas ou extraia trechos do seu PDF no navegador. Rápido, seguro e sem upload.',
      keywords: 'dividir pdf, separar paginas pdf, extrair paginas pdf, split pdf',
      h1: 'Dividir PDF',
      intro:
        'Extraia páginas específicas ou intervalos de um PDF grande. Controle total sobre o que manter — tudo no seu dispositivo.',
      benefits: [
        'Selecione intervalos de páginas',
        'Extraia apenas o que precisa',
        'Processamento instantâneo',
      ],
      howItWorks: [
        'Escolha o arquivo PDF.',
        'Defina as páginas inicial e final.',
        'Baixe o novo arquivo.',
      ],
      faq: [
        ...privacyFaq('pt'),
        {
          q: 'Posso extrair páginas individuais?',
          a: 'Sim. Defina o mesmo número nas páginas inicial e final para extrair uma única página.',
        },
      ],
    },
    en: {
      title: 'Split PDF Online Free | PDFWINDOWS',
      description:
        'Separate pages or extract sections from your PDF in the browser. Fast, secure, and no upload.',
      keywords: 'split pdf, extract pages pdf, separate pdf pages, extract pdf pages',
      h1: 'Split PDF',
      intro:
        'Extract specific pages or ranges from a large PDF. Full control over what to keep — all on your device.',
      benefits: [
        'Select page ranges',
        'Extract only what you need',
        'Instant processing',
      ],
      howItWorks: [
        'Choose your PDF file.',
        'Set the start and end pages.',
        'Download your new file.',
      ],
      faq: [
        ...privacyFaq('en'),
        {
          q: 'Can I extract individual pages?',
          a: 'Yes. Set the same number for start and end page to extract a single page.',
        },
      ],
    },
    es: {
      title: 'Dividir PDF Online Gratis | PDFWINDOWS',
      description:
        'Separe páginas o extraiga secciones de su PDF en el navegador. Rápido, seguro y sin subida.',
      keywords: 'dividir pdf, separar paginas pdf, extraer paginas pdf, dividir archivo pdf',
      h1: 'Dividir PDF',
      intro:
        'Extraiga páginas específicas o rangos de un PDF grande. Control total sobre lo que conservar — todo en su dispositivo.',
      benefits: [
        'Seleccione rangos de páginas',
        'Extraiga solo lo que necesita',
        'Procesamiento instantáneo',
      ],
      howItWorks: [
        'Elija el archivo PDF.',
        'Defina las páginas inicial y final.',
        'Descargue el nuevo archivo.',
      ],
      faq: [
        ...privacyFaq('es'),
        {
          q: '¿Puedo extraer páginas individuales?',
          a: 'Sí. Defina el mismo número en las páginas inicial y final para extraer una sola página.',
        },
      ],
    },
  }),
  page('/pdf-rotate', 'converter', 'pdf-rotate', undefined, {
    pt: {
      title: 'Girar PDF Online Grátis | PDFWINDOWS',
      description:
        'Gire páginas do seu PDF no navegador. Corrija orientação em segundos — sem upload.',
      keywords: 'girar pdf, rotacionar pdf, rotate pdf, corrigir orientação pdf',
      h1: 'Girar PDF',
      intro:
        'Corrija páginas digitalizadas de cabeça para baixo ou com orientação errada. Rápido e direto no seu computador.',
      benefits: [
        'Ângulos de 90°, 180° e 270°',
        'Sem instalação necessária',
        'Gratuito e ilimitado',
      ],
      howItWorks: [
        'Escolha o arquivo PDF.',
        'Selecione o ângulo de rotação.',
        'Baixe o PDF corrigido.',
      ],
      faq: [
        ...privacyFaq('pt'),
        {
          q: 'Posso girar páginas individuais?',
          a: 'A rotação é aplicada a todas as páginas do documento de uma vez.',
        },
      ],
    },
    en: {
      title: 'Rotate PDF Online Free | PDFWINDOWS',
      description:
        'Rotate PDF pages in your browser. Fix orientation in seconds — no upload required.',
      keywords: 'rotate pdf, turn pdf pages, fix pdf orientation, rotate pdf online',
      h1: 'Rotate PDF',
      intro:
        'Fix upside-down or misaligned scanned pages. Fast and simple — right on your computer.',
      benefits: [
        '90°, 180°, and 270° rotation',
        'No installation required',
        'Free and unlimited',
      ],
      howItWorks: [
        'Choose your PDF file.',
        'Select the rotation angle.',
        'Download your corrected PDF.',
      ],
      faq: [
        ...privacyFaq('en'),
        {
          q: 'Can I rotate individual pages?',
          a: 'Rotation is applied to all pages in the document at once.',
        },
      ],
    },
    es: {
      title: 'Girar PDF Online Gratis | PDFWINDOWS',
      description:
        'Gire páginas de su PDF en el navegador. Corrija la orientación en segundos — sin subida.',
      keywords: 'girar pdf, rotar pdf, corregir orientación pdf, girar páginas pdf',
      h1: 'Girar PDF',
      intro:
        'Corrija páginas escaneadas al revés o con orientación incorrecta. Rápido y directo en su computadora.',
      benefits: [
        'Ángulos de 90°, 180° y 270°',
        'Sin instalación necesaria',
        'Gratis e ilimitado',
      ],
      howItWorks: [
        'Elija el archivo PDF.',
        'Seleccione el ángulo de rotación.',
        'Descargue el PDF corregido.',
      ],
      faq: [
        ...privacyFaq('es'),
        {
          q: '¿Puedo girar páginas individuales?',
          a: 'La rotación se aplica a todas las páginas del documento a la vez.',
        },
      ],
    },
  }),
  page('/pdf-watermark', 'converter', 'pdf-watermark', undefined, {
    pt: {
      title: 'Marca d\'Água em PDF Online | PDFWINDOWS',
      description:
        'Adicione marca d\'água de texto ou imagem ao seu PDF no navegador. Rápido, seguro e sem upload.',
      keywords: 'marca dagua pdf, watermark pdf, carimbo pdf, proteger rascunho pdf',
      h1: 'Marca d\'Água em PDF',
      intro:
        'Proteja rascunhos e documentos internos com marcas d\'água personalizadas. Visualize o resultado antes de baixar.',
      benefits: [
        'Marca d\'água de texto ou imagem',
        'Pré-visualização em tempo real',
        'Exportação imediata',
      ],
      howItWorks: [
        'Escolha o arquivo PDF.',
        'Configure a marca d\'água.',
        'Baixe o PDF com a marca aplicada.',
      ],
      faq: [
        ...privacyFaq('pt'),
        {
          q: 'Posso usar uma imagem como marca d\'água?',
          a: 'Sim. Você pode adicionar marca d\'água de texto ou carregar uma imagem personalizada.',
        },
      ],
    },
    en: {
      title: 'Add Watermark to PDF Online | PDFWINDOWS',
      description:
        'Add text or image watermarks to your PDF in the browser. Fast, secure, and no upload.',
      keywords: 'pdf watermark, add watermark pdf, stamp pdf, watermark pdf online',
      h1: 'Watermark PDF',
      intro:
        'Protect drafts and internal documents with custom watermarks. Preview the result before downloading.',
      benefits: [
        'Text or image watermarks',
        'Real-time preview',
        'Instant export',
      ],
      howItWorks: [
        'Choose your PDF file.',
        'Configure the watermark.',
        'Download your watermarked PDF.',
      ],
      faq: [
        ...privacyFaq('en'),
        {
          q: 'Can I use an image as a watermark?',
          a: 'Yes. Add a text watermark or upload a custom image.',
        },
      ],
    },
    es: {
      title: 'Marca de Agua en PDF Online | PDFWINDOWS',
      description:
        'Añada marca de agua de texto o imagen a su PDF en el navegador. Rápido, seguro y sin subida.',
      keywords: 'marca de agua pdf, watermark pdf, sellar pdf, proteger borrador pdf',
      h1: 'Marca de Agua en PDF',
      intro:
        'Proteja borradores y documentos internos con marcas de agua personalizadas. Vea el resultado antes de descargar.',
      benefits: [
        'Marca de agua de texto o imagen',
        'Vista previa en tiempo real',
        'Exportación inmediata',
      ],
      howItWorks: [
        'Elija el archivo PDF.',
        'Configure la marca de agua.',
        'Descargue el PDF con la marca aplicada.',
      ],
      faq: [
        ...privacyFaq('es'),
        {
          q: '¿Puedo usar una imagen como marca de agua?',
          a: 'Sí. Puede añadir marca de agua de texto o cargar una imagen personalizada.',
        },
      ],
    },
  }),
  page('/pdf-to-image', 'converter', 'pdf-to-img', undefined, {
    pt: {
      title: 'Converter PDF para Imagem Online | PDFWINDOWS',
      description:
        'Converta páginas PDF em imagens JPG ou PNG de alta qualidade no navegador. Rápido e sem upload.',
      keywords: 'pdf para imagem, pdf para jpg, pdf para png, converter pdf imagem',
      h1: 'Converter PDF para Imagem',
      intro:
        'Exporte cada página do seu PDF como imagem de alta qualidade. Ideal para apresentações, redes sociais e arquivamento visual.',
      benefits: [
        'Exporte múltiplas páginas',
        'Qualidade ajustável',
        'Sem cadastro necessário',
      ],
      howItWorks: [
        'Escolha o arquivo PDF.',
        'Selecione o formato de imagem.',
        'Baixe as imagens geradas.',
      ],
      faq: [
        ...privacyFaq('pt'),
        {
          q: 'Quais formatos de imagem são suportados?',
          a: 'Você pode exportar páginas em JPG ou PNG, com qualidade ajustável.',
        },
      ],
    },
    en: {
      title: 'Convert PDF to Image Online | PDFWINDOWS',
      description:
        'Convert PDF pages to high-quality JPG or PNG images in your browser. Fast and no upload.',
      keywords: 'pdf to image, pdf to jpg, pdf to png, convert pdf to image',
      h1: 'Convert PDF to Image',
      intro:
        'Export each page of your PDF as a high-quality image. Perfect for presentations, social media, and visual archiving.',
      benefits: [
        'Export multiple pages',
        'Adjustable quality',
        'No account required',
      ],
      howItWorks: [
        'Choose your PDF file.',
        'Select the image format.',
        'Download the generated images.',
      ],
      faq: [
        ...privacyFaq('en'),
        {
          q: 'What image formats are supported?',
          a: 'Export pages as JPG or PNG with adjustable quality settings.',
        },
      ],
    },
    es: {
      title: 'Convertir PDF a Imagen Online | PDFWINDOWS',
      description:
        'Convierta páginas PDF a imágenes JPG o PNG de alta calidad en el navegador. Rápido y sin subida.',
      keywords: 'pdf a imagen, pdf a jpg, pdf a png, convertir pdf imagen',
      h1: 'Convertir PDF a Imagen',
      intro:
        'Exporte cada página de su PDF como imagen de alta calidad. Ideal para presentaciones, redes sociales y archivo visual.',
      benefits: [
        'Exporte múltiples páginas',
        'Calidad ajustable',
        'Sin registro necesario',
      ],
      howItWorks: [
        'Elija el archivo PDF.',
        'Seleccione el formato de imagen.',
        'Descargue las imágenes generadas.',
      ],
      faq: [
        ...privacyFaq('es'),
        {
          q: '¿Qué formatos de imagen se admiten?',
          a: 'Puede exportar páginas en JPG o PNG, con calidad ajustable.',
        },
      ],
    },
  }),
  page('/pdf-extract-text', 'converter', 'pdf-txt', undefined, {
    pt: {
      title: 'Extrair Texto de PDF Online | PDFWINDOWS',
      description:
        'Extraia o conteúdo textual de PDFs nativos no navegador. Rápido, gratuito e sem upload.',
      keywords: 'extrair texto pdf, pdf para txt, copiar texto pdf, texto de pdf',
      h1: 'Extrair Texto de PDF',
      intro:
        'Obtenha o texto de PDFs com conteúdo nativo — contratos, artigos e relatórios. Processamento instantâneo no seu dispositivo.',
      benefits: [
        'Extração rápida de texto nativo',
        'Sem cadastro necessário',
        'Arquivo permanece no seu computador',
      ],
      howItWorks: [
        'Escolha o arquivo PDF.',
        'Inicie a extração de texto.',
        'Baixe ou copie o resultado.',
      ],
      faq: [
        ...privacyFaq('pt'),
        {
          q: 'Funciona com PDFs digitalizados?',
          a: 'Esta ferramenta extrai texto de PDFs nativos. Para documentos digitalizados, use a ferramenta de OCR de PDF.',
        },
      ],
    },
    en: {
      title: 'Extract Text from PDF Online | PDFWINDOWS',
      description:
        'Extract text content from native PDFs in your browser. Fast, free, and no upload.',
      keywords: 'extract text from pdf, pdf to text, copy pdf text, pdf text extractor',
      h1: 'Extract Text from PDF',
      intro:
        'Get text from PDFs with native content — contracts, articles, and reports. Instant processing on your device.',
      benefits: [
        'Fast native text extraction',
        'No account required',
        'File stays on your computer',
      ],
      howItWorks: [
        'Choose your PDF file.',
        'Start text extraction.',
        'Download or copy the result.',
      ],
      faq: [
        ...privacyFaq('en'),
        {
          q: 'Does it work with scanned PDFs?',
          a: 'This tool extracts text from native PDFs. For scanned documents, use the PDF OCR tool.',
        },
      ],
    },
    es: {
      title: 'Extraer Texto de PDF Online | PDFWINDOWS',
      description:
        'Extraiga el contenido textual de PDF nativos en el navegador. Rápido, gratis y sin subida.',
      keywords: 'extraer texto pdf, pdf a texto, copiar texto pdf, texto de pdf',
      h1: 'Extraer Texto de PDF',
      intro:
        'Obtenga el texto de PDF con contenido nativo — contratos, artículos e informes. Procesamiento instantáneo en su dispositivo.',
      benefits: [
        'Extracción rápida de texto nativo',
        'Sin registro necesario',
        'El archivo permanece en su computadora',
      ],
      howItWorks: [
        'Elija el archivo PDF.',
        'Inicie la extracción de texto.',
        'Descargue o copie el resultado.',
      ],
      faq: [
        ...privacyFaq('es'),
        {
          q: '¿Funciona con PDF escaneados?',
          a: 'Esta herramienta extrae texto de PDF nativos. Para documentos escaneados, use la herramienta de OCR de PDF.',
        },
      ],
    },
  }),
  page('/image-converter', 'converter', 'img-to-img', undefined, {
    pt: {
      title: 'Conversor de Imagens Online Grátis | PDFWINDOWS',
      description:
        'Converta entre JPG, PNG, WEBP e outros formatos no navegador. Rápido, seguro e sem upload.',
      keywords: 'converter imagem, jpg para png, png para jpg, webp converter',
      h1: 'Conversor de Imagens',
      intro:
        'Altere o formato, qualidade e dimensões das suas imagens com processamento local. Suporte aos formatos mais usados.',
      benefits: [
        'Vários formatos suportados',
        'Controle de qualidade',
        'Exportação rápida',
      ],
      howItWorks: [
        'Escolha suas imagens.',
        'Selecione o formato de saída.',
        'Baixe os arquivos convertidos.',
      ],
      faq: [
        ...privacyFaq('pt'),
        {
          q: 'Quais formatos de imagem são suportados?',
          a: 'Você pode converter entre JPG, PNG, WEBP e outros formatos populares.',
        },
      ],
    },
    en: {
      title: 'Image Converter Online Free | PDFWINDOWS',
      description:
        'Convert between JPG, PNG, WEBP, and more in your browser. Fast, secure, and no upload.',
      keywords: 'image converter, jpg to png, png to jpg, webp converter online',
      h1: 'Image Converter',
      intro:
        'Change format, quality, and dimensions with local processing. Support for the most common image formats.',
      benefits: [
        'Multiple formats supported',
        'Quality control',
        'Fast export',
      ],
      howItWorks: [
        'Choose your images.',
        'Select the output format.',
        'Download the converted files.',
      ],
      faq: [
        ...privacyFaq('en'),
        {
          q: 'What image formats are supported?',
          a: 'Convert between JPG, PNG, WEBP, and other popular formats.',
        },
      ],
    },
    es: {
      title: 'Conversor de Imágenes Online Gratis | PDFWINDOWS',
      description:
        'Convierta entre JPG, PNG, WEBP y más formatos en el navegador. Rápido, seguro y sin subida.',
      keywords: 'convertir imagen, jpg a png, png a jpg, conversor webp',
      h1: 'Conversor de Imágenes',
      intro:
        'Cambie formato, calidad y dimensiones con procesamiento local. Soporte para los formatos más usados.',
      benefits: [
        'Varios formatos admitidos',
        'Control de calidad',
        'Exportación rápida',
      ],
      howItWorks: [
        'Elija sus imágenes.',
        'Seleccione el formato de salida.',
        'Descargue los archivos convertidos.',
      ],
      faq: [
        ...privacyFaq('es'),
        {
          q: '¿Qué formatos de imagen se admiten?',
          a: 'Puede convertir entre JPG, PNG, WEBP y otros formatos populares.',
        },
      ],
    },
  }),
  page('/image-to-pdf', 'converter', 'img-to-pdf', undefined, {
    pt: {
      title: 'Converter Imagem para PDF Online | PDFWINDOWS',
      description:
        'Crie PDFs a partir de imagens JPG, PNG e outros formatos no navegador. Rápido e sem upload.',
      keywords: 'imagem para pdf, jpg para pdf, foto para pdf, converter imagem pdf',
      h1: 'Converter Imagem para PDF',
      intro:
        'Transforme fotos, scans e imagens em documentos PDF profissionais. Combine várias imagens em um único arquivo.',
      benefits: [
        'Várias imagens em um PDF',
        'Layout profissional',
        'Exportação rápida',
      ],
      howItWorks: [
        'Escolha suas imagens.',
        'Organize a ordem dos arquivos.',
        'Baixe o PDF gerado.',
      ],
      faq: [
        ...privacyFaq('pt'),
        {
          q: 'Posso combinar várias imagens em um PDF?',
          a: 'Sim. Adicione quantas imagens precisar e elas serão organizadas em um único documento PDF.',
        },
      ],
    },
    en: {
      title: 'Convert Image to PDF Online | PDFWINDOWS',
      description:
        'Create PDFs from JPG, PNG, and other images in your browser. Fast and no upload.',
      keywords: 'image to pdf, jpg to pdf, photo to pdf, convert image to pdf',
      h1: 'Convert Image to PDF',
      intro:
        'Turn photos, scans, and images into professional PDF documents. Combine multiple images into one file.',
      benefits: [
        'Multiple images in one PDF',
        'Professional layout',
        'Fast export',
      ],
      howItWorks: [
        'Choose your images.',
        'Arrange the file order.',
        'Download your generated PDF.',
      ],
      faq: [
        ...privacyFaq('en'),
        {
          q: 'Can I combine multiple images into one PDF?',
          a: 'Yes. Add as many images as you need and they will be arranged in a single PDF document.',
        },
      ],
    },
    es: {
      title: 'Convertir Imagen a PDF Online | PDFWINDOWS',
      description:
        'Cree PDF a partir de imágenes JPG, PNG y otros formatos en el navegador. Rápido y sin subida.',
      keywords: 'imagen a pdf, jpg a pdf, foto a pdf, convertir imagen pdf',
      h1: 'Convertir Imagen a PDF',
      intro:
        'Transforme fotos, escaneos e imágenes en documentos PDF profesionales. Combine varias imágenes en un solo archivo.',
      benefits: [
        'Varias imágenes en un PDF',
        'Diseño profesional',
        'Exportación rápida',
      ],
      howItWorks: [
        'Elija sus imágenes.',
        'Organice el orden de los archivos.',
        'Descargue el PDF generado.',
      ],
      faq: [
        ...privacyFaq('es'),
        {
          q: '¿Puedo combinar varias imágenes en un PDF?',
          a: 'Sí. Agregue todas las imágenes que necesite y se organizarán en un solo documento PDF.',
        },
      ],
    },
  }),
  page('/image-resize', 'converter', 'img-resize', undefined, {
    pt: {
      title: 'Redimensionar Imagem Online Grátis | PDFWINDOWS',
      description:
        'Redimensione e comprima imagens no navegador. Ajuste tamanho e qualidade sem upload.',
      keywords: 'redimensionar imagem, comprimir imagem, alterar tamanho imagem',
      h1: 'Redimensionar Imagem',
      intro:
        'Ajuste dimensões e qualidade das suas imagens para web, e-mail ou impressão. Tudo processado no seu dispositivo.',
      benefits: [
        'Bloqueio de proporção opcional',
        'Compressão inteligente',
        'Processamento instantâneo',
      ],
      howItWorks: [
        'Escolha suas imagens.',
        'Defina tamanho e qualidade.',
        'Baixe o resultado.',
      ],
      faq: [
        ...privacyFaq('pt'),
        {
          q: 'Posso manter a proporção da imagem?',
          a: 'Sim. Ative o bloqueio de proporção para redimensionar sem distorcer a imagem.',
        },
      ],
    },
    en: {
      title: 'Resize Image Online Free | PDFWINDOWS',
      description:
        'Resize and compress images in your browser. Adjust size and quality with no upload.',
      keywords: 'resize image, compress image, change image size online',
      h1: 'Resize Image',
      intro:
        'Adjust image dimensions and quality for web, email, or print. All processing happens on your device.',
      benefits: [
        'Optional aspect ratio lock',
        'Smart compression',
        'Instant processing',
      ],
      howItWorks: [
        'Choose your images.',
        'Set size and quality.',
        'Download the result.',
      ],
      faq: [
        ...privacyFaq('en'),
        {
          q: 'Can I maintain the image aspect ratio?',
          a: 'Yes. Enable aspect ratio lock to resize without distorting the image.',
        },
      ],
    },
    es: {
      title: 'Redimensionar Imagen Online Gratis | PDFWINDOWS',
      description:
        'Redimensione y comprima imágenes en el navegador. Ajuste tamaño y calidad sin subida.',
      keywords: 'redimensionar imagen, comprimir imagen, cambiar tamaño imagen',
      h1: 'Redimensionar Imagen',
      intro:
        'Ajuste dimensiones y calidad de sus imágenes para web, correo o impresión. Todo se procesa en su dispositivo.',
      benefits: [
        'Bloqueo de proporción opcional',
        'Compresión inteligente',
        'Procesamiento instantáneo',
      ],
      howItWorks: [
        'Elija sus imágenes.',
        'Defina tamaño y calidad.',
        'Descargue el resultado.',
      ],
      faq: [
        ...privacyFaq('es'),
        {
          q: '¿Puedo mantener la proporción de la imagen?',
          a: 'Sí. Active el bloqueo de proporción para redimensionar sin distorsionar la imagen.',
        },
      ],
    },
  }),
  page('/image-ocr', 'converter', 'img-ocr', undefined, {
    pt: {
      title: 'OCR de Imagem Online Grátis | PDFWINDOWS',
      description:
        'Extraia texto de fotos e imagens com OCR no navegador. Rápido, privado e sem upload.',
      keywords: 'ocr imagem, foto para texto, reconhecer texto imagem, digitalizar texto',
      h1: 'OCR de Imagem',
      intro:
        'Digitalize texto de fotos, prints e documentos escaneados. O reconhecimento acontece inteiramente no seu dispositivo.',
      benefits: [
        'OCR processado no seu dispositivo',
        'Suporte a múltiplos idiomas',
        'Sem envio de imagens para servidores',
      ],
      howItWorks: [
        'Escolha a imagem.',
        'Inicie o reconhecimento de texto.',
        'Copie ou baixe o texto extraído.',
      ],
      faq: [
        ...privacyFaq('pt'),
        {
          q: 'Quais idiomas o OCR reconhece?',
          a: 'O OCR suporta português, inglês, espanhol e diversos outros idiomas.',
        },
      ],
    },
    en: {
      title: 'Image OCR Online Free | PDFWINDOWS',
      description:
        'Extract text from photos and images with OCR in your browser. Fast, private, and no upload.',
      keywords: 'image ocr, photo to text, recognize text image, scan text from image',
      h1: 'Image OCR',
      intro:
        'Digitize text from photos, screenshots, and scanned documents. Recognition happens entirely on your device.',
      benefits: [
        'OCR processed on your device',
        'Multiple language support',
        'No images sent to servers',
      ],
      howItWorks: [
        'Choose your image.',
        'Start text recognition.',
        'Copy or download the extracted text.',
      ],
      faq: [
        ...privacyFaq('en'),
        {
          q: 'What languages does OCR recognize?',
          a: 'OCR supports English, Portuguese, Spanish, and many other languages.',
        },
      ],
    },
    es: {
      title: 'OCR de Imagen Online Gratis | PDFWINDOWS',
      description:
        'Extraiga texto de fotos e imágenes con OCR en el navegador. Rápido, privado y sin subida.',
      keywords: 'ocr imagen, foto a texto, reconocer texto imagen, digitalizar texto',
      h1: 'OCR de Imagen',
      intro:
        'Digitalice texto de fotos, capturas y documentos escaneados. El reconocimiento ocurre completamente en su dispositivo.',
      benefits: [
        'OCR procesado en su dispositivo',
        'Soporte para múltiples idiomas',
        'Sin envío de imágenes a servidores',
      ],
      howItWorks: [
        'Elija la imagen.',
        'Inicie el reconocimiento de texto.',
        'Copie o descargue el texto extraído.',
      ],
      faq: [
        ...privacyFaq('es'),
        {
          q: '¿Qué idiomas reconoce el OCR?',
          a: 'El OCR admite español, inglés, portugués y muchos otros idiomas.',
        },
      ],
    },
  }),
  page('/image-filters', 'converter', 'img-filter', undefined, {
    pt: {
      title: 'Filtros de Imagem Online Grátis | PDFWINDOWS',
      description:
        'Ajuste brilho, contraste e escala de cinza nas suas imagens no navegador. Rápido e sem upload.',
      keywords: 'filtro imagem, brilho contraste imagem, escala de cinza, editar imagem',
      h1: 'Filtros de Imagem',
      intro:
        'Aplique ajustes rápidos de brilho, contraste e escala de cinza com pré-visualização em tempo real.',
      benefits: [
        'Pré-visualização instantânea',
        'Controles precisos',
        'Gratuito e sem cadastro',
      ],
      howItWorks: [
        'Escolha suas imagens.',
        'Ajuste brilho, contraste ou escala de cinza.',
        'Baixe a imagem editada.',
      ],
      faq: [
        ...privacyFaq('pt'),
        {
          q: 'Quais ajustes estão disponíveis?',
          a: 'Você pode ajustar brilho, contraste e converter para escala de cinza.',
        },
      ],
    },
    en: {
      title: 'Image Filters Online Free | PDFWINDOWS',
      description:
        'Adjust brightness, contrast, and grayscale on your images in the browser. Fast and no upload.',
      keywords: 'image filters, brightness contrast, grayscale image, edit image online',
      h1: 'Image Filters',
      intro:
        'Apply quick brightness, contrast, and grayscale adjustments with real-time preview.',
      benefits: [
        'Instant preview',
        'Precise controls',
        'Free with no account',
      ],
      howItWorks: [
        'Choose your images.',
        'Adjust brightness, contrast, or grayscale.',
        'Download the edited image.',
      ],
      faq: [
        ...privacyFaq('en'),
        {
          q: 'What adjustments are available?',
          a: 'Adjust brightness, contrast, and convert to grayscale.',
        },
      ],
    },
    es: {
      title: 'Filtros de Imagen Online Gratis | PDFWINDOWS',
      description:
        'Ajuste brillo, contraste y escala de grises en sus imágenes en el navegador. Rápido y sin subida.',
      keywords: 'filtros imagen, brillo contraste imagen, escala de grises, editar imagen',
      h1: 'Filtros de Imagen',
      intro:
        'Aplique ajustes rápidos de brillo, contraste y escala de grises con vista previa en tiempo real.',
      benefits: [
        'Vista previa instantánea',
        'Controles precisos',
        'Gratis y sin registro',
      ],
      howItWorks: [
        'Elija sus imágenes.',
        'Ajuste brillo, contraste o escala de grises.',
        'Descargue la imagen editada.',
      ],
      faq: [
        ...privacyFaq('es'),
        {
          q: '¿Qué ajustes están disponibles?',
          a: 'Puede ajustar brillo, contraste y convertir a escala de grises.',
        },
      ],
    },
  }),
  page('/csv-to-json', 'converter', 'csv-json', undefined, {
    pt: {
      title: 'Converter CSV para JSON Online | PDFWINDOWS',
      description:
        'Transforme planilhas CSV em JSON estruturado no navegador. Rápido, seguro e sem upload.',
      keywords: 'csv para json, converter csv, planilha para json, csv json online',
      h1: 'CSV para JSON',
      intro:
        'Converta dados de planilhas em JSON pronto para APIs e integrações. Seus arquivos permanecem no seu computador.',
      benefits: [
        'Conversão segura e precisa',
        'Sem envio para servidores',
        'Exportação imediata',
      ],
      howItWorks: [
        'Escolha o arquivo CSV.',
        'Inicie a conversão.',
        'Baixe o JSON gerado.',
      ],
      faq: [
        ...privacyFaq('pt'),
        {
          q: 'Arquivos CSV grandes são suportados?',
          a: 'Sim. O processamento acontece no seu navegador, sem limite de servidor.',
        },
      ],
    },
    en: {
      title: 'Convert CSV to JSON Online | PDFWINDOWS',
      description:
        'Transform CSV spreadsheets into structured JSON in your browser. Fast, secure, and no upload.',
      keywords: 'csv to json, convert csv, spreadsheet to json, csv json converter',
      h1: 'CSV to JSON',
      intro:
        'Convert spreadsheet data into JSON ready for APIs and integrations. Your files stay on your computer.',
      benefits: [
        'Safe and accurate conversion',
        'No server uploads',
        'Instant export',
      ],
      howItWorks: [
        'Choose your CSV file.',
        'Start the conversion.',
        'Download the generated JSON.',
      ],
      faq: [
        ...privacyFaq('en'),
        {
          q: 'Are large CSV files supported?',
          a: 'Yes. Processing happens in your browser with no server-side limits.',
        },
      ],
    },
    es: {
      title: 'Convertir CSV a JSON Online | PDFWINDOWS',
      description:
        'Transforme hojas de cálculo CSV en JSON estructurado en el navegador. Rápido, seguro y sin subida.',
      keywords: 'csv a json, convertir csv, hoja de cálculo a json, csv json online',
      h1: 'CSV a JSON',
      intro:
        'Convierta datos de hojas de cálculo en JSON listo para APIs e integraciones. Sus archivos permanecen en su computadora.',
      benefits: [
        'Conversión segura y precisa',
        'Sin envío a servidores',
        'Exportación inmediata',
      ],
      howItWorks: [
        'Elija el archivo CSV.',
        'Inicie la conversión.',
        'Descargue el JSON generado.',
      ],
      faq: [
        ...privacyFaq('es'),
        {
          q: '¿Se admiten archivos CSV grandes?',
          a: 'Sí. El procesamiento ocurre en su navegador, sin límites de servidor.',
        },
      ],
    },
  }),
  page('/json-to-csv', 'converter', 'json-to-csv', undefined, {
    pt: {
      title: 'Converter JSON para CSV Online | PDFWINDOWS',
      description:
        'Gere planilhas CSV a partir de dados JSON no navegador. Rápido, seguro e sem upload.',
      keywords: 'json para csv, converter json, json para planilha, json csv online',
      h1: 'JSON para CSV',
      intro:
        'Transforme dados JSON em planilhas CSV compatíveis com Excel e Google Sheets. Processamento local e instantâneo.',
      benefits: [
        'Ideal para análise de dados',
        'Processamento no seu dispositivo',
        'Sem cadastro necessário',
      ],
      howItWorks: [
        'Escolha o arquivo JSON.',
        'Inicie a conversão.',
        'Baixe o CSV gerado.',
      ],
      faq: [
        ...privacyFaq('pt'),
        {
          q: 'JSON aninhado é suportado?',
          a: 'Sim. Estruturas JSON aninhadas são convertidas em colunas planas no CSV.',
        },
      ],
    },
    en: {
      title: 'Convert JSON to CSV Online | PDFWINDOWS',
      description:
        'Generate CSV spreadsheets from JSON data in your browser. Fast, secure, and no upload.',
      keywords: 'json to csv, convert json, json to spreadsheet, json csv converter',
      h1: 'JSON to CSV',
      intro:
        'Turn JSON data into CSV spreadsheets compatible with Excel and Google Sheets. Local, instant processing.',
      benefits: [
        'Great for data analysis',
        'Processing on your device',
        'No account required',
      ],
      howItWorks: [
        'Choose your JSON file.',
        'Start the conversion.',
        'Download the generated CSV.',
      ],
      faq: [
        ...privacyFaq('en'),
        {
          q: 'Is nested JSON supported?',
          a: 'Yes. Nested JSON structures are flattened into CSV columns.',
        },
      ],
    },
    es: {
      title: 'Convertir JSON a CSV Online | PDFWINDOWS',
      description:
        'Genere hojas de cálculo CSV a partir de datos JSON en el navegador. Rápido, seguro y sin subida.',
      keywords: 'json a csv, convertir json, json a hoja de cálculo, json csv online',
      h1: 'JSON a CSV',
      intro:
        'Transforme datos JSON en hojas de cálculo CSV compatibles con Excel y Google Sheets. Procesamiento local e instantáneo.',
      benefits: [
        'Ideal para análisis de datos',
        'Procesamiento en su dispositivo',
        'Sin registro necesario',
      ],
      howItWorks: [
        'Elija el archivo JSON.',
        'Inicie la conversión.',
        'Descargue el CSV generado.',
      ],
      faq: [
        ...privacyFaq('es'),
        {
          q: '¿Se admite JSON anidado?',
          a: 'Sí. Las estructuras JSON anidadas se convierten en columnas planas en el CSV.',
        },
      ],
    },
  }),
  page('/xml-to-json', 'converter', 'xml-json', undefined, {
    pt: {
      title: 'Converter XML para JSON Online | PDFWINDOWS',
      description:
        'Transforme dados XML em JSON estruturado no navegador. Rápido, seguro e sem upload.',
      keywords: 'xml para json, converter xml, xml json online, transformar xml',
      h1: 'XML para JSON',
      intro:
        'Converta XML em JSON pronto para APIs e integrações. Ideal para desenvolvedores que precisam de dados estruturados.',
      benefits: [
        'Conversão rápida e precisa',
        'Sem instalação necessária',
        'Gratuito e ilimitado',
      ],
      howItWorks: [
        'Escolha o arquivo XML.',
        'Inicie a conversão.',
        'Baixe o JSON gerado.',
      ],
      faq: [
        ...privacyFaq('pt'),
        {
          q: 'XML complexo com atributos é suportado?',
          a: 'Sim. A ferramenta converte estruturas XML complexas, incluindo atributos e elementos aninhados.',
        },
      ],
    },
    en: {
      title: 'Convert XML to JSON Online | PDFWINDOWS',
      description:
        'Transform XML data into structured JSON in your browser. Fast, secure, and no upload.',
      keywords: 'xml to json, convert xml, xml json converter, transform xml',
      h1: 'XML to JSON',
      intro:
        'Convert XML to JSON ready for APIs and integrations. Ideal for developers who need structured data.',
      benefits: [
        'Fast and accurate conversion',
        'No installation required',
        'Free and unlimited',
      ],
      howItWorks: [
        'Choose your XML file.',
        'Start the conversion.',
        'Download the generated JSON.',
      ],
      faq: [
        ...privacyFaq('en'),
        {
          q: 'Is complex XML with attributes supported?',
          a: 'Yes. The tool converts complex XML structures, including attributes and nested elements.',
        },
      ],
    },
    es: {
      title: 'Convertir XML a JSON Online | PDFWINDOWS',
      description:
        'Transforme datos XML en JSON estructurado en el navegador. Rápido, seguro y sin subida.',
      keywords: 'xml a json, convertir xml, xml json online, transformar xml',
      h1: 'XML a JSON',
      intro:
        'Convierta XML en JSON listo para APIs e integraciones. Ideal para desarrolladores que necesitan datos estructurados.',
      benefits: [
        'Conversión rápida y precisa',
        'Sin instalación necesaria',
        'Gratis e ilimitado',
      ],
      howItWorks: [
        'Elija el archivo XML.',
        'Inicie la conversión.',
        'Descargue el JSON generado.',
      ],
      faq: [
        ...privacyFaq('es'),
        {
          q: '¿Se admite XML complejo con atributos?',
          a: 'Sí. La herramienta convierte estructuras XML complejas, incluidos atributos y elementos anidados.',
        },
      ],
    },
  }),
  page('/txt-to-pdf', 'converter', 'txt-to-pdf', undefined, {
    pt: {
      title: 'Converter TXT para PDF Online | PDFWINDOWS',
      description:
        'Transforme arquivos de texto em PDF legíveis no navegador. Rápido, seguro e sem upload.',
      keywords: 'txt para pdf, texto para pdf, converter txt, arquivo texto pdf',
      h1: 'Converter TXT para PDF',
      intro:
        'Gere PDFs com layout limpo a partir de arquivos .txt. Ideal para documentos, notas e relatórios de texto.',
      benefits: [
        'Layout limpo e profissional',
        'Processamento instantâneo',
        'Arquivo permanece no seu computador',
      ],
      howItWorks: [
        'Escolha o arquivo .txt.',
        'Inicie a conversão.',
        'Baixe o PDF gerado.',
      ],
      faq: [
        ...privacyFaq('pt'),
        {
          q: 'Posso personalizar a formatação do PDF?',
          a: 'O PDF é gerado com layout limpo e legível. Para formatação avançada, use o Estúdio de Documentos.',
        },
      ],
    },
    en: {
      title: 'Convert TXT to PDF Online | PDFWINDOWS',
      description:
        'Turn text files into readable PDFs in your browser. Fast, secure, and no upload.',
      keywords: 'txt to pdf, text to pdf, convert txt, text file to pdf',
      h1: 'Convert TXT to PDF',
      intro:
        'Generate clean-layout PDFs from .txt files. Perfect for documents, notes, and text reports.',
      benefits: [
        'Clean, professional layout',
        'Instant processing',
        'File stays on your computer',
      ],
      howItWorks: [
        'Choose your .txt file.',
        'Start the conversion.',
        'Download your generated PDF.',
      ],
      faq: [
        ...privacyFaq('en'),
        {
          q: 'Can I customize the PDF formatting?',
          a: 'The PDF is generated with a clean, readable layout. For advanced formatting, use Document Studio.',
        },
      ],
    },
    es: {
      title: 'Convertir TXT a PDF Online | PDFWINDOWS',
      description:
        'Transforme archivos de texto en PDF legibles en el navegador. Rápido, seguro y sin subida.',
      keywords: 'txt a pdf, texto a pdf, convertir txt, archivo texto pdf',
      h1: 'Convertir TXT a PDF',
      intro:
        'Genere PDF con diseño limpio a partir de archivos .txt. Ideal para documentos, notas e informes de texto.',
      benefits: [
        'Diseño limpio y profesional',
        'Procesamiento instantáneo',
        'El archivo permanece en su computadora',
      ],
      howItWorks: [
        'Elija el archivo .txt.',
        'Inicie la conversión.',
        'Descargue el PDF generado.',
      ],
      faq: [
        ...privacyFaq('es'),
        {
          q: '¿Puedo personalizar el formato del PDF?',
          a: 'El PDF se genera con un diseño limpio y legible. Para formato avanzado, use el Estudio de Documentos.',
        },
      ],
    },
  }),
  page('/estudio-documentos', 'suite', undefined, 'document-studio', {
    pt: {
      title: 'Estúdio de Documentos Online | PDFWINDOWS',
      description:
        'Crie documentos profissionais com modelos prontos e exporte em PDF. Rápido, seguro e sem upload.',
      keywords: 'estudio documentos, criar documento pdf, modelos pdf, gerador documento',
      h1: 'Estúdio de Documentos',
      intro:
        'Editor estruturado com modelos profissionais, pré-visualização ao vivo e exportação em PDF. Tudo no seu navegador.',
      benefits: [
        'Modelos profissionais prontos',
        'Pré-visualização em tempo real',
        'Exportação em PDF instantânea',
      ],
      howItWorks: [
        'Escolha um modelo.',
        'Preencha os campos do documento.',
        'Baixe o PDF finalizado.',
      ],
      faq: [
        ...privacyFaq('pt'),
        {
          q: 'Quais tipos de documentos posso criar?',
          a: 'O estúdio oferece modelos para contratos, propostas, cartas e outros documentos profissionais.',
        },
      ],
    },
    en: {
      title: 'Document Studio Online | PDFWINDOWS',
      description:
        'Create professional documents with ready-made templates and export to PDF. Fast, secure, and no upload.',
      keywords: 'document studio, create pdf document, pdf templates, document generator',
      h1: 'Document Studio',
      intro:
        'Structured editor with professional templates, live preview, and PDF export. All in your browser.',
      benefits: [
        'Ready-made professional templates',
        'Real-time preview',
        'Instant PDF export',
      ],
      howItWorks: [
        'Choose a template.',
        'Fill in the document fields.',
        'Download your finished PDF.',
      ],
      faq: [
        ...privacyFaq('en'),
        {
          q: 'What types of documents can I create?',
          a: 'The studio offers templates for contracts, proposals, letters, and other professional documents.',
        },
      ],
    },
    es: {
      title: 'Estudio de Documentos Online | PDFWINDOWS',
      description:
        'Cree documentos profesionales con plantillas listas y exporte a PDF. Rápido, seguro y sin subida.',
      keywords: 'estudio documentos, crear documento pdf, plantillas pdf, generador documento',
      h1: 'Estudio de Documentos',
      intro:
        'Editor estructurado con plantillas profesionales, vista previa en vivo y exportación a PDF. Todo en su navegador.',
      benefits: [
        'Plantillas profesionales listas',
        'Vista previa en tiempo real',
        'Exportación a PDF instantánea',
      ],
      howItWorks: [
        'Elija una plantilla.',
        'Complete los campos del documento.',
        'Descargue el PDF finalizado.',
      ],
      faq: [
        ...privacyFaq('es'),
        {
          q: '¿Qué tipos de documentos puedo crear?',
          a: 'El estudio ofrece plantillas para contratos, propuestas, cartas y otros documentos profesionales.',
        },
      ],
    },
  }),
  page('/capturador-de-cores', 'suite', undefined, 'color-picker', {
    pt: {
      title: 'Capturador de Cores Online — HEX e RGB | PDFWINDOWS',
      description:
        'Capture cores de imagens ou da tela com conta-gotas. Obtenha códigos HEX, RGB e HSL instantaneamente.',
      keywords:
        'capturar cor online, código hex, color picker, conta-gotas, extrair cor imagem',
      h1: 'Capturador de Cores',
      intro:
        'Extraia códigos de cor de imagens ou da sua tela em tempo real. HEX, RGB e HSL — processamento totalmente local.',
      benefits: [
        'Captura por imagem ou tela',
        'Paleta de cores dominante automática',
        'Histórico local e exportação',
      ],
      howItWorks: [
        'Escolha uma imagem ou use a tela.',
        'Clique no pixel desejado.',
        'Copie o código HEX ou RGB.',
      ],
      faq: [
        ...privacyFaq('pt'),
        {
          q: 'Funciona com a ferramenta conta-gotas do navegador?',
          a: 'Sim. Em navegadores compatíveis, você pode capturar cores diretamente de qualquer ponto da tela.',
        },
      ],
    },
    en: {
      title: 'Color Picker Online — HEX & RGB | PDFWINDOWS',
      description:
        'Pick colors from images or your screen with the eyedropper. Get HEX, RGB, and HSL codes instantly.',
      keywords:
        'color picker online, hex code, eyedropper tool, extract color from image',
      h1: 'Color Picker',
      intro:
        'Extract color codes from images or your screen in real time. HEX, RGB, and HSL — fully local processing.',
      benefits: [
        'Image or screen capture',
        'Automatic dominant color palette',
        'Local history and export',
      ],
      howItWorks: [
        'Choose an image or use your screen.',
        'Click the desired pixel.',
        'Copy the HEX or RGB code.',
      ],
      faq: [
        ...privacyFaq('en'),
        {
          q: 'Does it work with the browser eyedropper?',
          a: 'Yes. On supported browsers, you can capture colors from any point on your screen.',
        },
      ],
    },
    es: {
      title: 'Capturador de Colores Online — HEX y RGB | PDFWINDOWS',
      description:
        'Capture colores de imágenes o pantalla con el cuentagotas. Obtenga códigos HEX, RGB y HSL al instante.',
      keywords:
        'capturar color online, código hex, color picker, cuentagotas, extraer color imagen',
      h1: 'Capturador de Colores',
      intro:
        'Extraiga códigos de color de imágenes o pantalla en tiempo real. HEX, RGB y HSL — procesamiento totalmente local.',
      benefits: [
        'Captura por imagen o pantalla',
        'Paleta de colores dominante automática',
        'Historial local y exportación',
      ],
      howItWorks: [
        'Elija una imagen o use la pantalla.',
        'Haga clic en el píxel deseado.',
        'Copie el código HEX o RGB.',
      ],
      faq: [
        ...privacyFaq('es'),
        {
          q: '¿Funciona con el cuentagotas del navegador?',
          a: 'Sí. En navegadores compatibles, puede capturar colores de cualquier punto de la pantalla.',
        },
      ],
    },
  }),
  page('/gerador-relatorios', 'suite', undefined, 'report-gen', {
    pt: {
      title: 'Gerador de Relatórios e Recibos Online | PDFWINDOWS',
      description:
        'Crie relatórios profissionais e recibos com itens e exporte em PDF. Rápido, seguro e sem upload.',
      keywords: 'gerador relatorio pdf, gerador recibo, criar recibo, relatório pdf online',
      h1: 'Gerador de Relatórios',
      intro:
        'Monte relatórios com seções e recibos com itens e totais automáticos. Exporte tudo em PDF profissional.',
      benefits: [
        'Relatórios com seções organizadas',
        'Recibos com cálculo automático de totais',
        'Exportação em PDF instantânea',
      ],
      howItWorks: [
        'Escolha relatório ou recibo.',
        'Preencha os campos e itens.',
        'Baixe o PDF finalizado.',
      ],
      faq: [
        ...privacyFaq('pt'),
        {
          q: 'Posso criar recibos com múltiplos itens?',
          a: 'Sim. Adicione quantos itens precisar e os totais são calculados automaticamente.',
        },
      ],
    },
    en: {
      title: 'Report & Receipt Generator Online | PDFWINDOWS',
      description:
        'Create professional reports and receipts with line items and export to PDF. Fast, secure, and no upload.',
      keywords: 'report generator pdf, receipt generator, create receipt, pdf report online',
      h1: 'Report Generator',
      intro:
        'Build reports with sections and receipts with line items and automatic totals. Export everything as a professional PDF.',
      benefits: [
        'Reports with organized sections',
        'Receipts with automatic total calculation',
        'Instant PDF export',
      ],
      howItWorks: [
        'Choose report or receipt.',
        'Fill in fields and line items.',
        'Download your finished PDF.',
      ],
      faq: [
        ...privacyFaq('en'),
        {
          q: 'Can I create receipts with multiple line items?',
          a: 'Yes. Add as many items as you need and totals are calculated automatically.',
        },
      ],
    },
    es: {
      title: 'Generador de Informes y Recibos Online | PDFWINDOWS',
      description:
        'Cree informes profesionales y recibos con ítems y exporte a PDF. Rápido, seguro y sin subida.',
      keywords: 'generador informes pdf, generador recibos, crear recibo, informe pdf online',
      h1: 'Generador de Informes',
      intro:
        'Cree informes con secciones y recibos con ítems y totales automáticos. Exporte todo en PDF profesional.',
      benefits: [
        'Informes con secciones organizadas',
        'Recibos con cálculo automático de totales',
        'Exportación a PDF instantánea',
      ],
      howItWorks: [
        'Elija informe o recibo.',
        'Complete los campos e ítems.',
        'Descargue el PDF finalizado.',
      ],
      faq: [
        ...privacyFaq('es'),
        {
          q: '¿Puedo crear recibos con múltiples ítems?',
          a: 'Sí. Agregue todos los ítems que necesite y los totales se calculan automáticamente.',
        },
      ],
    },
  }),
  page('/gerador-qr-code', 'suite', undefined, 'qr-gen', {
    pt: {
      title: 'Gerador de QR Code Online Grátis | PDFWINDOWS',
      description:
        'Crie QR Codes de links, textos e URLs no navegador. Alta resolução, sem upload e sem cadastro.',
      keywords: 'gerador qr code, criar qr code, qr code gratis, gerar qr code online',
      h1: 'Gerador de QR Code',
      intro:
        'Gere QR Codes de alta qualidade para links, textos e URLs. Baixe em PNG pronto para impressão ou compartilhamento.',
      benefits: [
        'PNG pronto para uso',
        'Alta resolução',
        'Sem cadastro necessário',
      ],
      howItWorks: [
        'Insira o link ou texto.',
        'Gere o QR Code.',
        'Baixe a imagem PNG.',
      ],
      faq: [
        ...privacyFaq('pt'),
        {
          q: 'O que posso codificar em um QR Code?',
          a: 'Links, URLs, textos, números de telefone e qualquer conteúdo de texto.',
        },
      ],
    },
    en: {
      title: 'QR Code Generator Online Free | PDFWINDOWS',
      description:
        'Create QR codes for links, text, and URLs in your browser. High resolution, no upload, no account.',
      keywords: 'qr code generator, create qr code, free qr code, generate qr code online',
      h1: 'QR Code Generator',
      intro:
        'Generate high-quality QR codes for links, text, and URLs. Download as print-ready PNG.',
      benefits: [
        'Ready-to-use PNG',
        'High resolution output',
        'No account required',
      ],
      howItWorks: [
        'Enter your link or text.',
        'Generate the QR code.',
        'Download the PNG image.',
      ],
      faq: [
        ...privacyFaq('en'),
        {
          q: 'What can I encode in a QR code?',
          a: 'Links, URLs, text, phone numbers, and any text-based content.',
        },
      ],
    },
    es: {
      title: 'Generador de Código QR Online Gratis | PDFWINDOWS',
      description:
        'Cree códigos QR de enlaces, textos y URLs en el navegador. Alta resolución, sin subida y sin registro.',
      keywords: 'generador qr, crear codigo qr, qr gratis, generar qr online',
      h1: 'Generador de Código QR',
      intro:
        'Genere códigos QR de alta calidad para enlaces, textos y URLs. Descargue en PNG listo para imprimir o compartir.',
      benefits: [
        'PNG listo para usar',
        'Alta resolución',
        'Sin registro necesario',
      ],
      howItWorks: [
        'Inserte el enlace o texto.',
        'Genere el código QR.',
        'Descargue la imagen PNG.',
      ],
      faq: [
        ...privacyFaq('es'),
        {
          q: '¿Qué puedo codificar en un código QR?',
          a: 'Enlaces, URLs, textos, números de teléfono y cualquier contenido de texto.',
        },
      ],
    },
  }),
  page('/gerador-cpf', 'suite', undefined, 'cpf-gen', {
    pt: {
      title: 'Gerador de CPF para Testes | PDFWINDOWS',
      description:
        'Gere CPFs com formato válido para testes de software. Exclusivo para desenvolvedores — uso educacional.',
      keywords: 'gerador cpf teste, cpf valido teste, cpf para desenvolvimento, testar validação cpf',
      h1: 'Gerador de CPF para Testes',
      intro:
        'Ferramenta para desenvolvedores testarem validações de formulário. Os números gerados não correspondem a pessoas reais.',
      benefits: [
        'Algoritmo de validação correto',
        'Processamento local',
        'Aviso legal claro',
      ],
      howItWorks: [
        'Abra a ferramenta.',
        'Clique em gerar.',
        'Copie o CPF de teste.',
      ],
      faq: [
        ...privacyFaq('pt'),
        {
          q: 'Posso usar esses CPFs em cadastros reais?',
          a: 'Não. Os CPFs gerados são apenas para testes de software e não correspondem a pessoas reais.',
        },
      ],
    },
    en: {
      title: 'CPF Generator for Testing | PDFWINDOWS',
      description:
        'Generate valid-format CPF numbers for software testing. For developers only — educational use.',
      keywords: 'cpf generator test, brazil cpf test, cpf validation test, test cpf number',
      h1: 'CPF Generator for Testing',
      intro:
        'Tool for developers testing form validation. Generated numbers do not correspond to real individuals.',
      benefits: [
        'Correct validation algorithm',
        'Local processing',
        'Clear legal notice',
      ],
      howItWorks: [
        'Open the tool.',
        'Click generate.',
        'Copy the test CPF.',
      ],
      faq: [
        ...privacyFaq('en'),
        {
          q: 'Can I use these CPFs for real registrations?',
          a: 'No. Generated CPFs are for software testing only and do not correspond to real individuals.',
        },
      ],
    },
    es: {
      title: 'Generador de CPF para Pruebas | PDFWINDOWS',
      description:
        'Genere CPF con formato válido para pruebas de software. Exclusivo para desarrolladores — uso educativo.',
      keywords: 'generador cpf prueba, cpf valido prueba, cpf para desarrollo, probar validación cpf',
      h1: 'Generador de CPF para Pruebas',
      intro:
        'Herramienta para desarrolladores que prueban validaciones de formulario. Los números generados no corresponden a personas reales.',
      benefits: [
        'Algoritmo de validación correcto',
        'Procesamiento local',
        'Aviso legal claro',
      ],
      howItWorks: [
        'Abra la herramienta.',
        'Haga clic en generar.',
        'Copie el CPF de prueba.',
      ],
      faq: [
        ...privacyFaq('es'),
        {
          q: '¿Puedo usar estos CPF en registros reales?',
          a: 'No. Los CPF generados son solo para pruebas de software y no corresponden a personas reales.',
        },
      ],
    },
  }),
  page('/limpador-codigo', 'suite', undefined, 'code-clean', {
    pt: {
      title: 'Formatador de Código Online Grátis | PDFWINDOWS',
      description:
        'Formate ou minifique HTML, CSS e JavaScript no navegador. Rápido, seguro e sem enviar código.',
      keywords: 'formatar codigo, minificar js, prettify html, formatador codigo online',
      h1: 'Formatador de Código',
      intro:
        'Organize e limpe código web com formatação automática ou minificação. Seu código nunca sai do navegador.',
      benefits: [
        'Suporte a HTML, CSS e JavaScript',
        'Modo formatar e minificar',
        'Processamento instantâneo',
      ],
      howItWorks: [
        'Cole o código.',
        'Escolha a linguagem e o modo.',
        'Copie ou baixe o resultado.',
      ],
      faq: [
        ...privacyFaq('pt'),
        {
          q: 'Quais linguagens são suportadas?',
          a: 'HTML, CSS e JavaScript — com opções de formatação e minificação para cada uma.',
        },
      ],
    },
    en: {
      title: 'Code Formatter Online Free | PDFWINDOWS',
      description:
        'Format or minify HTML, CSS, and JavaScript in your browser. Fast, secure, and no code upload.',
      keywords: 'code formatter, minify js, prettify html, format code online',
      h1: 'Code Formatter',
      intro:
        'Organize and clean web code with automatic formatting or minification. Your code never leaves the browser.',
      benefits: [
        'HTML, CSS, and JavaScript support',
        'Format and minify modes',
        'Instant processing',
      ],
      howItWorks: [
        'Paste your code.',
        'Choose language and mode.',
        'Copy or download the result.',
      ],
      faq: [
        ...privacyFaq('en'),
        {
          q: 'What languages are supported?',
          a: 'HTML, CSS, and JavaScript — with formatting and minification options for each.',
        },
      ],
    },
    es: {
      title: 'Formateador de Código Online Gratis | PDFWINDOWS',
      description:
        'Formatee o minifique HTML, CSS y JavaScript en el navegador. Rápido, seguro y sin enviar código.',
      keywords: 'formatear codigo, minificar js, prettify html, formateador codigo online',
      h1: 'Formateador de Código',
      intro:
        'Organice y limpie código web con formato automático o minificación. Su código nunca sale del navegador.',
      benefits: [
        'Soporte para HTML, CSS y JavaScript',
        'Modo formatear y minificar',
        'Procesamiento instantáneo',
      ],
      howItWorks: [
        'Pegue el código.',
        'Elija el idioma y el modo.',
        'Copie o descargue el resultado.',
      ],
      faq: [
        ...privacyFaq('es'),
        {
          q: '¿Qué lenguajes se admiten?',
          a: 'HTML, CSS y JavaScript — con opciones de formato y minificación para cada uno.',
        },
      ],
    },
  }),
];

export const HOME_COPY: Record<LanguageType, ToolPageCopy> = {
  pt: {
    title: 'PDFWINDOWS — Ferramentas PDF Grátis e Seguras',
    description:
      'Ferramentas profissionais de PDF e imagem no navegador. Rápido, seguro e privado — seus arquivos nunca saem do seu computador.',
    keywords: 'ferramentas pdf gratis, mesclar pdf, comprimir pdf, converter pdf, proteger pdf',
    h1: 'Ferramentas PDF e Imagem',
    intro:
      'Converta, edite e proteja seus documentos com ferramentas rápidas e seguras. Tudo funciona diretamente no navegador — sem cadastro, sem upload e sem instalação.',
    benefits: [
      'Processamento rápido no navegador',
      'Seus arquivos ficam no seu dispositivo',
      'Gratuito e sem criar conta',
    ],
    howItWorks: [
      'Escolha uma ferramenta no catálogo.',
      'Selecione seus arquivos e configure as opções.',
      'Baixe o resultado na hora.',
    ],
    faq: [
      ...privacyFaq('pt'),
      {
        q: 'Preciso instalar algum programa?',
        a: 'Não. Basta abrir no navegador — Chrome, Edge ou Firefox.',
      },
    ],
  },
  en: {
    title: 'PDFWINDOWS — Free & Secure PDF Tools',
    description:
      'Professional PDF and image tools that run in your browser. Fast, secure, and private — your files never leave your computer.',
    keywords: 'free pdf tools, merge pdf, compress pdf, convert pdf, protect pdf',
    h1: 'PDF & Image Tools',
    intro:
      'Convert, edit, and protect your documents with fast, secure tools. Everything runs right in your browser — no signup, no upload, no installation.',
    benefits: [
      'Fast processing in your browser',
      'Your files stay on your device',
      'Free with no account required',
    ],
    howItWorks: [
      'Choose a tool from the catalog.',
      'Select your files and adjust the settings.',
      'Download your result instantly.',
    ],
    faq: [
      ...privacyFaq('en'),
      {
        q: 'Do I need to install anything?',
        a: 'No. Just open it in your browser — Chrome, Edge, or Firefox.',
      },
    ],
  },
  es: {
    title: 'PDFWINDOWS — Herramientas PDF Gratis y Seguras',
    description:
      'Herramientas profesionales de PDF e imagen en el navegador. Rápido, seguro y privado — sus archivos nunca salen de su computadora.',
    keywords: 'herramientas pdf gratis, unir pdf, comprimir pdf, convertir pdf, proteger pdf',
    h1: 'Herramientas PDF e Imagen',
    intro:
      'Convierta, edite y proteja sus documentos con herramientas rápidas y seguras. Todo funciona en el navegador — sin registro, sin subida y sin instalación.',
    benefits: [
      'Procesamiento rápido en el navegador',
      'Sus archivos permanecen en su dispositivo',
      'Gratis y sin crear cuenta',
    ],
    howItWorks: [
      'Elija una herramienta del catálogo.',
      'Seleccione sus archivos y configure las opciones.',
      'Descargue el resultado al instante.',
    ],
    faq: [
      ...privacyFaq('es'),
      {
        q: '¿Necesito instalar algún programa?',
        a: 'No. Solo ábralo en el navegador — Chrome, Edge o Firefox.',
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
