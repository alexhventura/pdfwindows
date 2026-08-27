import type { LanguageType, OperationType } from '../types';
import { parseLocaleFromPath, stripLocalePrefix } from '../i18n/routes';
import { getLocalizedPublicPath, resolveCanonicalPath } from './pathLocalization';
import { getPublicBarePaths, PUBLIC_LOCALES } from './publicBarePaths';

export type SuiteToolId =
  | 'document-studio'
  | 'color-picker'
  | 'report-gen'
  | 'qr-gen'
  | 'cpf-gen'
  | 'code-clean'
  | 'font-identifier'
  | 'remove-restrictions'
  | 'unlock-pdf'
  | 'file-xray'
  | 'organize-pdf'
  | 'redact-pdf'
  | 'document-converter'
  | 'margin-adjust'
  | 'sign-pdf'
  | 'page-numbers'
  | 'crop-pdf'
  | 'compare-pdf'
  | 'edit-pdf'
  | 'scan-to-pdf'
  | 'repair-pdf'
  | 'pdf-to-pdfa'
  | 'pdf-forms'
  | 'pdf-to-pptx'
  | 'pptx-to-pdf'
  | 'pdf-to-excel'
  | 'pdf-to-word'
  | 'word-to-pdf'
  | 'excel-to-pdf'
  | 'html-to-pdf';

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

function localSuitePage(
  path: string,
  suiteId: SuiteToolId,
  spec: {
    title: [string, string, string];
    description: [string, string, string];
    keywords: [string, string, string];
    h1: [string, string, string];
    intro: [string, string, string];
    benefits: Array<[string, string, string]>;
    how: Array<[string, string, string]>;
    faqQ: [string, string, string];
    faqA: [string, string, string];
  }
): ToolPageDefinition {
  const pack = (index: 0 | 1 | 2, lang: LanguageType): ToolPageCopy => ({
    title: spec.title[index],
    description: spec.description[index],
    keywords: spec.keywords[index],
    h1: spec.h1[index],
    intro: spec.intro[index],
    benefits: spec.benefits.map((row) => row[index]),
    howItWorks: spec.how.map((row) => row[index]),
    faq: [...privacyFaq(lang), { q: spec.faqQ[index], a: spec.faqA[index] }],
  });
  return page(path, 'suite', undefined, suiteId, {
    pt: pack(0, 'pt'),
    en: pack(1, 'en'),
    es: pack(2, 'es'),
  });
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
      keywords: 'extrair texto pdf, pdf para txt, pdf para word, pdf para docx, copiar texto pdf, texto de pdf',
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
  page('/txt-to-pdf', 'suite', undefined, 'document-converter', {
    pt: {
      title: 'Conversor de Documento Online | PDFWINDOWS',
      description:
        'Converta Word, PDF, TXT e Excel no navegador. Identifique a extensão, escolha o destino e baixe localmente — grátis e sem upload.',
      keywords: 'conversor de documento, word para pdf, excel para csv, txt para pdf, converter docx',
      h1: 'Conversor de Documento',
      intro:
        'Envie Word, PDF, texto ou planilha. O conversor identifica a extensão e lista os formatos de destino disponíveis para baixar no seu computador.',
      benefits: [
        'Identifica automaticamente o tipo do arquivo enviado',
        'Lista destinos compatíveis para Word, PDF, TXT e Excel',
        'Conversão local no navegador, sem upload',
      ],
      howItWorks: [
        'Envie um documento Word, PDF, TXT ou Excel.',
        'Confira a extensão identificada e escolha o formato de destino.',
        'Converta e baixe o arquivo gerado.',
      ],
      faq: [
        ...privacyFaq('pt'),
        {
          q: 'Quais formatos posso converter?',
          a: 'Word OOXML (.docx e aparentados), PDF, TXT, RTF, ODT, HTML, XLSX e CSV. Arquivos Word binários antigos (.doc) precisam ser salvos como .docx antes.',
        },
      ],
    },
    en: {
      title: 'Document Converter Online | PDFWINDOWS',
      description:
        'Convert Word, PDF, TXT, and Excel in your browser. Detect the extension, pick a target format, and download locally — free, no upload.',
      keywords: 'document converter, word to pdf, excel to csv, txt to pdf, convert docx browser',
      h1: 'Document Converter',
      intro:
        'Upload Word, PDF, text, or a spreadsheet. The converter identifies the extension and lists available output formats to download on your computer.',
      benefits: [
        'Automatically identifies the uploaded file type',
        'Lists compatible targets for Word, PDF, TXT, and Excel',
        'Local browser conversion with no upload',
      ],
      howItWorks: [
        'Upload a Word, PDF, TXT, or Excel document.',
        'Check the identified extension and choose the output format.',
        'Convert and download the generated file.',
      ],
      faq: [
        ...privacyFaq('en'),
        {
          q: 'Which formats can I convert?',
          a: 'Word OOXML (.docx and related), PDF, TXT, RTF, ODT, HTML, XLSX, and CSV. Legacy binary Word (.doc) files must be saved as .docx first.',
        },
      ],
    },
    es: {
      title: 'Convertir Documentos Online | PDFWINDOWS',
      description:
        'Convierta Word, PDF, TXT y Excel en el navegador. Identifique la extensión, elija el destino y descargue localmente — gratis y sin subida.',
      keywords: 'conversor de documento, word a pdf, excel a csv, txt a pdf, convertir docx',
      h1: 'Conversor de Documento',
      intro:
        'Envíe Word, PDF, texto o hoja de cálculo. El conversor identifica la extensión y lista los formatos de destino disponibles para descargar en su computadora.',
      benefits: [
        'Identifica automáticamente el tipo de archivo enviado',
        'Lista destinos compatibles para Word, PDF, TXT y Excel',
        'Conversión local en el navegador, sin subida',
      ],
      howItWorks: [
        'Envíe un documento Word, PDF, TXT o Excel.',
        'Confirme la extensión identificada y elija el formato de destino.',
        'Convierta y descargue el archivo generado.',
      ],
      faq: [
        ...privacyFaq('es'),
        {
          q: '¿Qué formatos puedo convertir?',
          a: 'Word OOXML (.docx y relacionados), PDF, TXT, RTF, ODT, HTML, XLSX y CSV. Los Word binarios antiguos (.doc) deben guardarse como .docx antes.',
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
  page('/identificador-de-fontes', 'suite', undefined, 'font-identifier', {
    pt: {
      title: 'Identificador de Fontes PDF e Word Grátis | PDFWINDOWS',
      description:
        'Identifique fontes em PDF e DOCX localmente no navegador. Correspondências diretas têm alta confiança; senão estimamos similaridade sem falsa certeza.',
      keywords:
        'identificar fonte, identificador de fontes, descobrir fonte de pdf, identificar fonte word, qual fonte do documento',
      h1: 'Identificador de Fontes',
      intro:
        'Descubra as fontes utilizadas em arquivos PDF e Word. Quando o arquivo declara a tipografia, mostramos identificação direta; caso contrário, estimamos similaridade com transparência.',
      benefits: [
        'Análise local de PDF e DOCX',
        'Distingue fonte identificada de estimativa',
        'Resultados por título, corpo e outros estilos',
      ],
      howItWorks: [
        'Envie um PDF ou DOCX.',
        'Aguarde a análise tipográfica local.',
        'Veja fontes identificadas ou estimadas por elemento.',
      ],
      faq: [
        ...privacyFaq('pt'),
        {
          q: 'A ferramenta sempre acerta a fonte com 100%?',
          a: 'Não. Só marcamos 100% quando a informação existe no documento. Sem isso, mostramos similaridade estimada.',
        },
      ],
    },
    en: {
      title: 'Font Identifier for PDF & Word Free | PDFWINDOWS',
      description:
        'Identify fonts in PDF and DOCX locally in your browser. Direct matches show high confidence; otherwise we estimate similarity without false certainty.',
      keywords:
        'identify font, font identifier, find pdf font, identify word document font, what font is used',
      h1: 'Font Identifier',
      intro:
        'Discover fonts used in PDF and Word files. When the file declares typography, we show direct identification; otherwise we estimate similarity transparently.',
      benefits: [
        'Local PDF and DOCX analysis',
        'Separates identified fonts from estimates',
        'Results by title, body, and other styles',
      ],
      howItWorks: [
        'Upload a PDF or DOCX.',
        'Wait for local typographic analysis.',
        'Review identified or estimated fonts by element.',
      ],
      faq: [
        ...privacyFaq('en'),
        {
          q: 'Does the tool always identify fonts with 100% certainty?',
          a: 'No. We only mark 100% when the document contains the information. Otherwise we show estimated similarity.',
        },
      ],
    },
    es: {
      title: 'Identificador de Fuentes PDF y Word Gratis | PDFWINDOWS',
      description:
        'Identifique fuentes en PDF y DOCX localmente en el navegador. Coincidencias directas tienen alta confianza; si no, estimamos similitud sin falsa certeza.',
      keywords:
        'identificar fuente, identificador de fuentes, descubrir fuente pdf, identificar fuente word, qué fuente usa el documento',
      h1: 'Identificador de Fuentes',
      intro:
        'Descubra las fuentes de archivos PDF y Word. Si el archivo declara la tipografía, mostramos identificación directa; si no, estimamos similitud con transparencia.',
      benefits: [
        'Análisis local de PDF y DOCX',
        'Separa fuentes identificadas de estimaciones',
        'Resultados por título, cuerpo y otros estilos',
      ],
      howItWorks: [
        'Envíe un PDF o DOCX.',
        'Espere el análisis tipográfico local.',
        'Revise fuentes identificadas o estimadas por elemento.',
      ],
      faq: [
        ...privacyFaq('es'),
        {
          q: '¿La herramienta siempre identifica la fuente al 100%?',
          a: 'No. Solo marcamos 100% cuando la información existe en el documento. Si no, mostramos similitud estimada.',
        },
      ],
    },
  }),
  page('/remover-restricoes', 'suite', undefined, 'remove-restrictions', {
    pt: {
      title: 'Remover Restrições de PDF e Word Grátis | PDFWINDOWS',
      description:
        'Remova restrições de edição, cópia e impressão de PDF e DOCX no navegador. Baixe uma nova cópia localmente—arquivos não saem do seu dispositivo.',
      keywords:
        'remover restrição pdf, desbloquear pdf edição, pdf não permite copiar, remover restrições word, desbloquear documento word',
      h1: 'Remover Restrições de PDF e Word',
      intro:
        'Remova restrições de edição, cópia e impressão de documentos que abrem normalmente, mas bloqueiam ações. Processamento local com nova cópia do arquivo.',
      benefits: [
        'PDF e DOCX no mesmo fluxo',
        'Mostra o que foi encontrado antes de processar',
        'Original intacto — só gera cópia nova',
      ],
      howItWorks: [
        'Envie o PDF ou DOCX.',
        'Revise as restrições detectadas.',
        'Baixe a cópia sem restrições removíveis.',
      ],
      faq: [
        ...privacyFaq('pt'),
        {
          q: 'Remove senha de abertura de PDF?',
          a: 'Não. Para senha de abertura use a ferramenta Desbloquear PDF. Esta página trata restrições de permissão e proteção estrutural de DOCX.',
        },
      ],
    },
    en: {
      title: 'Remove PDF & Word Restrictions Free | PDFWINDOWS',
      description:
        'Remove editing, copying, and printing restrictions from PDF and DOCX in your browser. Download a new copy locally—files never leave your device.',
      keywords:
        'remove pdf restrictions, unlock pdf editing, pdf cannot copy, remove word restrictions, unlock protected docx',
      h1: 'Remove PDF & Word Restrictions',
      intro:
        'Remove editing, copying, and printing restrictions from documents that open normally but block actions. Local processing with a new file copy.',
      benefits: [
        'PDF and DOCX in one flow',
        'Shows findings before processing',
        'Original untouched — only a new copy',
      ],
      howItWorks: [
        'Upload the PDF or DOCX.',
        'Review detected restrictions.',
        'Download the copy without removable restrictions.',
      ],
      faq: [
        ...privacyFaq('en'),
        {
          q: 'Does this remove a PDF open password?',
          a: 'No. Use Unlock PDF for open passwords. This page handles permission restrictions and DOCX structural protection.',
        },
      ],
    },
    es: {
      title: 'Quitar Restricciones de PDF y Word Gratis | PDFWINDOWS',
      description:
        'Quite restricciones de edición, copia e impresión de PDF y DOCX en el navegador. Descargue una copia nueva localmente—los archivos no salen de su dispositivo.',
      keywords:
        'quitar restricción pdf, desbloquear pdf edición, pdf no permite copiar, quitar restricciones word, desbloquear docx',
      h1: 'Quitar Restricciones de PDF y Word',
      intro:
        'Quite restricciones de edición, copia e impresión de documentos que se abren con normalidad pero bloquean acciones. Procesamiento local con una copia nueva.',
      benefits: [
        'PDF y DOCX en el mismo flujo',
        'Muestra hallazgos antes de procesar',
        'Original intacto — solo genera copia',
      ],
      howItWorks: [
        'Envíe el PDF o DOCX.',
        'Revise las restricciones detectadas.',
        'Descargue la copia sin restricciones removibles.',
      ],
      faq: [
        ...privacyFaq('es'),
        {
          q: '¿Quita la contraseña de apertura del PDF?',
          a: 'No. Para contraseña de apertura use Desbloquear PDF. Esta página trata restricciones de permiso y protección estructural de DOCX.',
        },
      ],
    },
  }),
  page('/desbloquear-pdf', 'suite', undefined, 'unlock-pdf', {
    pt: {
      title: 'Desbloquear PDF Online Grátis | PDFWINDOWS',
      description:
        'Desbloqueie um PDF protegido no navegador e baixe uma nova cópia. Informe a senha de abertura quando necessário—processamento local, sem upload na nuvem.',
      keywords:
        'desbloquear pdf, remover senha pdf, tirar senha do pdf, pdf protegido, pdf bloqueado, desbloquear pdf gratis',
      h1: 'Desbloquear PDF',
      intro:
        'Remova a proteção do seu PDF e gere uma nova cópia desbloqueada. Se houver senha de abertura, informe-a localmente — nada é enviado a servidores.',
      benefits: [
        'Fluxo simples: enviar → processar → baixar',
        'Suporte a restrições e senha de abertura',
        'Sempre gera nova cópia',
      ],
      howItWorks: [
        'Selecione o PDF protegido.',
        'Informe a senha se for solicitada.',
        'Baixe o PDF desbloqueado.',
      ],
      faq: [
        ...privacyFaq('pt'),
        {
          q: 'Funciona sem a senha?',
          a: 'Não removemos senhas de abertura sem a senha legítima. Sem senha, só tratamos restrições de permissão em arquivos que já abrem.',
        },
      ],
    },
    en: {
      title: 'Unlock PDF Online Free | PDFWINDOWS',
      description:
        'Unlock a protected PDF in your browser and download a new copy. Enter the open password when required—processing stays local with zero cloud upload.',
      keywords:
        'unlock pdf, remove pdf password, pdf protected, locked pdf, unlock pdf free, open password protected pdf',
      h1: 'Unlock PDF',
      intro:
        'Remove PDF protection and generate a new unlocked copy. If an open password is required, enter it locally — nothing is uploaded to servers.',
      benefits: [
        'Simple flow: upload → process → download',
        'Supports permission locks and open passwords',
        'Always generates a new copy',
      ],
      howItWorks: [
        'Select the protected PDF.',
        'Enter the password if prompted.',
        'Download the unlocked PDF.',
      ],
      faq: [
        ...privacyFaq('en'),
        {
          q: 'Does it work without the password?',
          a: 'We do not remove open passwords without the legitimate password. Without it, we only handle permission restrictions on files that already open.',
        },
      ],
    },
    es: {
      title: 'Desbloquear PDF Online Gratis | PDFWINDOWS',
      description:
        'Desbloquee un PDF protegido en el navegador y descargue una copia nueva. Indique la contraseña si hace falta—procesamiento local, sin subida a la nube.',
      keywords:
        'desbloquear pdf, quitar contraseña pdf, pdf protegido, pdf bloqueado, desbloquear pdf gratis',
      h1: 'Desbloquear PDF',
      intro:
        'Quite la protección de su PDF y genere una copia nueva desbloqueada. Si hay contraseña de apertura, indíquela localmente — nada se sube a servidores.',
      benefits: [
        'Flujo simple: enviar → procesar → descargar',
        'Soporta restricciones y contraseña de apertura',
        'Siempre genera una copia nueva',
      ],
      howItWorks: [
        'Seleccione el PDF protegido.',
        'Indique la contraseña si se solicita.',
        'Descargue el PDF desbloqueado.',
      ],
      faq: [
        ...privacyFaq('es'),
        {
          q: '¿Funciona sin la contraseña?',
          a: 'No quitamos contraseñas de apertura sin la clave legítima. Sin ella, solo tratamos restricciones de permiso en archivos que ya se abren.',
        },
      ],
    },
  }),
  page('/raio-x-de-arquivo', 'suite', undefined, 'file-xray', {
    pt: {
      title: 'Raio X de Arquivo Online Grátis | PDFWINDOWS',
      description:
        'Analise metadados, estrutura, hashes e EXIF de PDF, Word, Excel e imagens no navegador. Processamento 100% local—arquivos nunca saem do dispositivo.',
      keywords:
        'raio x de arquivo, analisar metadados, metadados pdf, metadados word, metadados excel, informações ocultas arquivo, EXIF, hash sha-256',
      h1: 'Raio X de Arquivo',
      intro:
        'Descubra dados técnicos, metadados, estrutura e informações adicionais presentes em seus arquivos. Análise local com origem identificável para cada dado.',
      benefits: [
        'PDF, Office, imagens, CSV, TXT e ZIP',
        'Hashes SHA-256 e origem de cada campo',
        'Relatório exportável em PDF, JSON ou TXT',
      ],
      howItWorks: [
        'Envie o arquivo para análise local.',
        'Acompanhe as etapas do Raio X.',
        'Explore o resumo, detalhes e exportação.',
      ],
      faq: [
        ...privacyFaq('pt'),
        {
          q: 'A ferramenta inventa metadados?',
          a: 'Não. Só mostramos o que está no arquivo. Quando algo não existe, informamos que não está disponível.',
        },
      ],
    },
    en: {
      title: 'File X-Ray Online Free | PDFWINDOWS',
      description:
        'Inspect metadata, structure, hashes, and EXIF for PDF, Word, Excel, and images in your browser. Fully local analysis—files never leave your device.',
      keywords:
        'file x-ray, analyze file metadata, pdf metadata, word metadata, excel metadata, hidden file info, EXIF, sha-256 hash',
      h1: 'File X-Ray',
      intro:
        'Discover technical data, metadata, structure, and additional information inside your files. Local analysis with identifiable provenance for every field.',
      benefits: [
        'PDF, Office, images, CSV, TXT, and ZIP',
        'SHA-256 hashes and field-level provenance',
        'Exportable PDF, JSON, or TXT reports',
      ],
      howItWorks: [
        'Upload a file for local analysis.',
        'Follow the X-Ray analysis stages.',
        'Explore summary, details, and export options.',
      ],
      faq: [
        ...privacyFaq('en'),
        {
          q: 'Does the tool invent metadata?',
          a: 'No. We only show what is present in the file. Missing fields are labeled as not available.',
        },
      ],
    },
    es: {
      title: 'Rayos X de Archivo Online Gratis | PDFWINDOWS',
      description:
        'Analice metadatos, estructura, hashes y EXIF de PDF, Word, Excel e imágenes en el navegador. Análisis 100% local—los archivos no salen de su dispositivo.',
      keywords:
        'rayos x de archivo, analizar metadatos, metadatos pdf, metadatos word, metadatos excel, información oculta archivo, EXIF, hash sha-256',
      h1: 'Rayos X de Archivo',
      intro:
        'Descubra datos técnicos, metadatos, estructura e información adicional de sus archivos. Análisis local con origen identificable para cada dato.',
      benefits: [
        'PDF, Office, imágenes, CSV, TXT y ZIP',
        'Hashes SHA-256 y origen de cada campo',
        'Informe exportable en PDF, JSON o TXT',
      ],
      howItWorks: [
        'Envíe el archivo para análisis local.',
        'Siga las etapas del Rayos X.',
        'Explore el resumen, detalles y exportación.',
      ],
      faq: [
        ...privacyFaq('es'),
        {
          q: '¿La herramienta inventa metadatos?',
          a: 'No. Solo mostramos lo que está en el archivo. Si falta un dato, indicamos que no está disponible.',
        },
      ],
    },
  }),
  page('/organizar-paginas-pdf', 'suite', undefined, 'organize-pdf', {
    pt: {
      title: 'Organizar Páginas PDF Online Grátis | PDFWINDOWS',
      description:
        'Exclua, reordene e extraia páginas PDF com miniaturas no navegador. Baixe uma nova cópia organizada localmente; sem upload, original intacto.',
      keywords:
        'organizar páginas pdf, excluir páginas pdf, reordenar pdf, extrair páginas pdf, organizar pdf gratis',
      h1: 'Organizar Páginas PDF',
      intro:
        'Reorganize seu PDF: exclua páginas indesejadas, altere a ordem e baixe uma cópia nova. Tudo no navegador, no seu dispositivo.',
      benefits: [
        'Excluir e reordenar páginas visualmente',
        'Pré-visualização por miniatura',
        'Sempre gera uma nova cópia local',
      ],
      howItWorks: [
        'Envie o PDF.',
        'Selecione, exclua ou reordene as páginas.',
        'Baixe o PDF organizado.',
      ],
      faq: [
        ...privacyFaq('pt'),
        {
          q: 'O arquivo original é alterado?',
          a: 'Não. Geramos uma cópia nova com a ordem escolhida. O original permanece intacto.',
        },
      ],
    },
    en: {
      title: 'Organize PDF Pages Online Free | PDFWINDOWS',
      description:
        'Delete, reorder, and extract PDF pages with thumbnails in your browser. Download a new organized copy locally; no cloud upload, original stays intact.',
      keywords:
        'organize pdf pages, delete pdf pages, reorder pdf, extract pdf pages, organize pdf free',
      h1: 'Organize PDF Pages',
      intro:
        'Reorganize your PDF: remove unwanted pages, change order, and download a new copy. Everything runs in your browser on your device.',
      benefits: [
        'Delete and reorder pages visually',
        'Thumbnail preview for each page',
        'Always generates a new local copy',
      ],
      howItWorks: [
        'Upload the PDF.',
        'Select, delete, or reorder pages.',
        'Download the organized PDF.',
      ],
      faq: [
        ...privacyFaq('en'),
        {
          q: 'Is the original file changed?',
          a: 'No. We generate a new copy with your chosen order. The original stays intact.',
        },
      ],
    },
    es: {
      title: 'Organizar Páginas PDF Online Gratis | PDFWINDOWS',
      description:
        'Elimine, reordene y extraiga páginas PDF con miniaturas en el navegador. Descargue una copia nueva organizada localmente; sin subida a la nube.',
      keywords:
        'organizar páginas pdf, eliminar páginas pdf, reordenar pdf, extraer páginas pdf, organizar pdf gratis',
      h1: 'Organizar Páginas PDF',
      intro:
        'Reorganice su PDF: elimine páginas, cambie el orden y descargue una copia nueva. Todo en el navegador, en su dispositivo.',
      benefits: [
        'Eliminar y reordenar páginas visualmente',
        'Miniaturas por página',
        'Siempre genera una copia local nueva',
      ],
      howItWorks: [
        'Suba el PDF.',
        'Seleccione, elimine o reordene páginas.',
        'Descargue el PDF organizado.',
      ],
      faq: [
        ...privacyFaq('es'),
        {
          q: '¿Se modifica el archivo original?',
          a: 'No. Generamos una copia nueva con el orden elegido. El original permanece intacto.',
        },
      ],
    },
  }),
  page('/redacao-pdf', 'suite', undefined, 'redact-pdf', {
    pt: {
      title: 'Redação PDF Online Grátis | PDFWINDOWS',
      description:
        'Tape CPF, valores e dados sensíveis em PDFs no navegador. Baixe uma nova cópia redigida localmente; revise as coberturas antes de compartilhar.',
      keywords:
        'redação pdf, ocultar dados pdf, blackout pdf, tapar cpf pdf, redação documento gratis',
      h1: 'Redação PDF',
      intro:
        'Cubra trechos sensíveis com preto antes de compartilhar. Desenhe as áreas na página e baixe uma cópia redigida — processamento 100% local.',
      benefits: [
        'Desenhe áreas de blackout por página',
        'Ideal antes de enviar a terceiros',
        'Cópia nova; original intacto',
      ],
      howItWorks: [
        'Envie o PDF.',
        'Arraste sobre os trechos a ocultar.',
        'Baixe o PDF redigido.',
      ],
      faq: [
        ...privacyFaq('pt'),
        {
          q: 'A redação remove o texto por baixo?',
          a: 'Aplicamos cobertura visual opaca na cópia. Revise o arquivo antes de compartilhar informações críticas.',
        },
      ],
    },
    en: {
      title: 'Redact PDF Online Free | PDFWINDOWS',
      description:
        'Black out IDs, amounts, and sensitive data in PDFs in your browser. Download a new redacted copy locally; review visual covers before sharing.',
      keywords:
        'redact pdf, blackout pdf, hide sensitive data pdf, pdf redaction free, cover text pdf',
      h1: 'Redact PDF',
      intro:
        'Cover sensitive regions with black before sharing. Draw areas on each page and download a redacted copy — 100% local processing.',
      benefits: [
        'Draw blackout areas per page',
        'Useful before sending to third parties',
        'New copy; original stays intact',
      ],
      howItWorks: [
        'Upload the PDF.',
        'Drag over areas to hide.',
        'Download the redacted PDF.',
      ],
      faq: [
        ...privacyFaq('en'),
        {
          q: 'Does redaction remove the underlying text?',
          a: 'We apply an opaque visual cover on the copy. Review the file before sharing critical information.',
        },
      ],
    },
    es: {
      title: 'Redacción PDF Online Gratis | PDFWINDOWS',
      description:
        'Tape identificaciones, importes y datos sensibles en PDFs en el navegador. Descargue una copia redactada localmente; revise cubiertas antes de compartir.',
      keywords:
        'redacción pdf, ocultar datos pdf, blackout pdf, tapar texto pdf, redacción documento gratis',
      h1: 'Redacción PDF',
      intro:
        'Cubra zonas sensibles con negro antes de compartir. Dibuje áreas en cada página y descargue una copia redactada — procesamiento 100% local.',
      benefits: [
        'Dibuje áreas de blackout por página',
        'Útil antes de enviar a terceros',
        'Copia nueva; original intacto',
      ],
      howItWorks: [
        'Suba el PDF.',
        'Arrastre sobre las zonas a ocultar.',
        'Descargue el PDF redactado.',
      ],
      faq: [
        ...privacyFaq('es'),
        {
          q: '¿La redacción elimina el texto de debajo?',
          a: 'Aplicamos una cobertura visual opaca en la copia. Revise el archivo antes de compartir información crítica.',
        },
      ],
    },
  }),
  page('/ajuste-de-margem', 'suite', undefined, 'margin-adjust', {
    pt: {
      title: 'Ajuste de Margem — Cortar Foto de Folha | PDFWINDOWS',
      description:
        'Recorte a mesa ao redor de uma folha fotografada no navegador. Ajuste as 4 pontas, alinhe a perspectiva e baixe a página — grátis, local e sem upload.',
      keywords:
        'cortar foto de folha, ajustar margem, quatro pontas, correção de perspectiva, recortar mesa, digitalizar folha',
      h1: 'Ajuste de Margem',
      intro:
        'Fotografe uma folha, marque as quatro pontas e corte o ambiente em volta. A página sai alinhada, localmente no navegador.',
      benefits: [
        'Quatro alças nos cantos da folha',
        'Remove mesa e fundo da foto',
        'Download PNG ou JPG sem upload',
      ],
      howItWorks: [
        'Envie a foto da folha.',
        'Arraste as quatro pontas até os cantos do papel.',
        'Corte e baixe a página alinhada.',
      ],
      faq: [
        ...privacyFaq('pt'),
        {
          q: 'O recorte acha a borda sozinho?',
          a: 'Não. Você posiciona as quatro pontas para controlar exatamente o que entra na página.',
        },
      ],
    },
    en: {
      title: 'Margin Adjust — Crop Photo of a Sheet | PDFWINDOWS',
      description:
        'Crop the table around a photographed page in your browser. Drag four corners, straighten perspective, and download the sheet — free, local, no upload.',
      keywords:
        'crop document photo, four corner crop, perspective correction, scan sheet photo, margin adjust',
      h1: 'Margin Adjust',
      intro:
        'Photograph a sheet, mark the four corners, and crop away the surroundings. The page comes out aligned, locally in your browser.',
      benefits: [
        'Four handles on the sheet corners',
        'Removes desk and photo background',
        'PNG or JPG download with no upload',
      ],
      howItWorks: [
        'Upload the photo of the sheet.',
        'Drag the four corners onto the paper edges.',
        'Crop and download the aligned page.',
      ],
      faq: [
        ...privacyFaq('en'),
        {
          q: 'Does it auto-detect the paper edge?',
          a: 'No. You place the four corners so you control exactly what is included on the page.',
        },
      ],
    },
    es: {
      title: 'Ajuste de Margen — Recortar Foto de una Hoja | PDFWINDOWS',
      description:
        'Recorte la mesa alrededor de una hoja fotografiada en el navegador. Ajuste las 4 puntas, enderece la perspectiva y descargue la página — gratis y local.',
      keywords:
        'recortar foto de hoja, ajuste de margen, cuatro esquinas, corrección de perspectiva, quitar mesa',
      h1: 'Ajuste de Margen',
      intro:
        'Fotografie una hoja, marque las cuatro puntas y recorte el entorno. La página sale alineada, en local en el navegador.',
      benefits: [
        'Cuatro controladores en las esquinas de la hoja',
        'Quita mesa y fondo de la foto',
        'Descarga PNG o JPG sin subida',
      ],
      howItWorks: [
        'Suba la foto de la hoja.',
        'Arrastre las cuatro puntas hasta los extremos del papel.',
        'Recorte y descargue la página alineada.',
      ],
      faq: [
        ...privacyFaq('es'),
        {
          q: '¿Detecta solo el borde del papel?',
          a: 'No. Usted coloca las cuatro puntas para controlar exactamente qué entra en la página.',
        },
      ],
    },
  }),
  page('/assinatura-pdf', 'suite', undefined, 'sign-pdf', {
    pt: {
      title: 'Assinatura PDF — Campo escrito na tela | PDFWINDOWS',
      description:
        'Desenhe a assinatura na tela, junte nome, local e data, e coloque o campo no PDF. Grátis no navegador — carimbo visual, sem upload.',
      keywords:
        'assinar pdf, desenhar assinatura, campo de assinatura, nome local data, assinatura manuscrita pdf',
      h1: 'Assinatura PDF',
      intro:
        'Escreva a assinatura na tela, opcionalmente junte nome, local e data, e solte o campo nas páginas do PDF — local no navegador.',
      benefits: [
        'Traço com mouse ou dedo',
        'Nome, local e data opcionais no mesmo campo',
        'PDF novo; o original permanece intacto',
      ],
      howItWorks: [
        'Desenhe a assinatura no campo da tela.',
        'Marque nome, local e data se quiser impressos junto.',
        'Envie o PDF, posicione o campo e baixe a cópia assinada.',
      ],
      faq: [
        ...privacyFaq('pt'),
        {
          q: 'Isto vale como certificado digital?',
          a: 'Não. É um carimbo visual da sua escrita. Não substitui ICP-Brasil nem outros certificados.',
        },
      ],
    },
    en: {
      title: 'Sign PDF — Draw a Signature Field | PDFWINDOWS',
      description:
        'Draw your signature on screen, add name, location, and date, then place the field on a PDF. Free, local in the browser — visual stamp, no upload.',
      keywords: 'sign pdf, draw signature, signature field, name location date, handwritten signature pdf',
      h1: 'Sign PDF',
      intro:
        'Write your signature on screen, optionally add name, location, and date, then drop the field onto PDF pages — locally in the browser.',
      benefits: [
        'Ink with mouse or finger',
        'Optional name, place, and date on the same field',
        'New PDF; the original stays intact',
      ],
      howItWorks: [
        'Draw the signature in the on-screen field.',
        'Include name, location, and date if you want them printed.',
        'Upload the PDF, place the field, and download the signed copy.',
      ],
      faq: [
        ...privacyFaq('en'),
        {
          q: 'Is this a digital certificate?',
          a: 'No. It is a visual stamp of your handwriting. It does not replace ICP-Brasil or other certificates.',
        },
      ],
    },
    es: {
      title: 'Firma PDF — Campo escrito en pantalla | PDFWINDOWS',
      description:
        'Dibuje la firma en pantalla, sume nombre, lugar y fecha, y coloque el campo en el PDF. Gratis en el navegador — sello visual, sin subida.',
      keywords: 'firmar pdf, dibujar firma, campo de firma, nombre lugar fecha, firma manuscrita pdf',
      h1: 'Firma PDF',
      intro:
        'Escriba la firma en pantalla, sume nombre, lugar y fecha si quiere, y suelte el campo en las páginas del PDF — en local en el navegador.',
      benefits: [
        'Trazo con ratón o dedo',
        'Nombre, lugar y fecha opcionales en el mismo campo',
        'PDF nuevo; el original permanece intacto',
      ],
      howItWorks: [
        'Dibuje la firma en el campo de la pantalla.',
        'Marque nombre, lugar y fecha si quiere imprimirlos juntos.',
        'Suba el PDF, coloque el campo y descargue la copia firmada.',
      ],
      faq: [
        ...privacyFaq('es'),
        {
          q: '¿Esto vale como certificado digital?',
          a: 'No. Es un sello visual de su escritura. No sustituye ICP-Brasil ni otros certificados.',
        },
      ],
    },
  }),
  localSuitePage('/numerador-de-paginas', 'page-numbers', {
    title: [
      'Numerador de Páginas PDF | PDFWINDOWS',
      'PDF Page Numbers Online | PDFWINDOWS',
      'Números de Página PDF | PDFWINDOWS',
    ],
    description: [
      'Numere páginas de PDF no navegador. Cabeçalho ou rodapé, pule a capa e baixe uma cópia — grátis, local e sem upload.',
      'Add page numbers to a PDF in your browser. Header or footer, skip the cover, download a copy — free, local, no upload.',
      'Numere páginas de un PDF en el navegador. Encabezado o pie, salte la portada y descargue — gratis, local y sin subida.',
    ],
    keywords: [
      'numerador pdf, números de página pdf, rodapé pdf, paginar pdf',
      'pdf page numbers, add page numbers pdf, footer pdf pagination',
      'numeros de pagina pdf, numerar pdf, pie de pagina pdf',
    ],
    h1: ['Numerador de páginas', 'Page numbers', 'Números de página'],
    intro: [
      'Desenhe números de página no PDF, no rodapé ou no cabeçalho, com opção de pular a capa — local no navegador.',
      'Stamp page numbers onto a PDF in the footer or header, with an option to skip the cover — locally in the browser.',
      'Dibuje números de página en el PDF, en el pie o el encabezado, con opción de saltar la portada — en local.',
    ],
    benefits: [
      ['Rodapé ou cabeçalho', 'Footer or header', 'Pie o encabezado'],
      ['Pule a primeira página', 'Skip the first page', 'Salte la primera página'],
      ['Cópia nova; original intacto', 'New copy; original intact', 'Copia nueva; original intacto'],
    ],
    how: [
      ['Envie o PDF.', 'Upload the PDF.', 'Suba el PDF.'],
      ['Escolha posição e formato.', 'Choose position and format.', 'Elija posición y formato.'],
      ['Baixe a cópia numerada.', 'Download the numbered copy.', 'Descargue la copia numerada.'],
    ],
    faqQ: [
      'Os números são campos automáticos do Word?',
      'Are these Word automatic fields?',
      '¿Son campos automáticos de Word?',
    ],
    faqA: [
      'Não. Os números são desenhados na página do PDF.',
      'No. The numbers are drawn onto the PDF page.',
      'No. Los números se dibujan en la página del PDF.',
    ],
  }),
  localSuitePage('/recortar-pdf', 'crop-pdf', {
    title: ['Recortar PDF Online | PDFWINDOWS', 'Crop PDF Online | PDFWINDOWS', 'Recortar PDF en el navegador | PDFWINDOWS'],
    description: [
      'Recorte margens de um PDF no navegador. Desenhe a área, aplique numa página ou em todas — grátis, local e sem upload.',
      'Crop PDF margins in your browser. Draw the area, apply to one page or all pages — free, local, and no upload.',
      'Recorte márgenes de un PDF en el navegador. Dibuje el área y aplique a una página o a todas — gratis y local.',
    ],
    keywords: ['recortar pdf, crop pdf, cortar margem pdf', 'crop pdf, pdf margins, trim pdf page', 'recortar pdf, recortar margenes pdf'],
    h1: ['Recortar PDF', 'Crop PDF', 'Recortar PDF'],
    intro: [
      'Desenhe a área visível na página e aplique o recorte nesta folha ou no documento inteiro — local no navegador.',
      'Draw the visible area on the page and apply the crop to this sheet or the whole document — locally in the browser.',
      'Dibuje el área visible y aplique el recorte a esta hoja o a todo el documento — en local en el navegador.',
    ],
    benefits: [
      ['Área desenhada na prévia', 'Area drawn on the preview', 'Área dibujada en la vista previa'],
      ['Uma página ou todas', 'One page or all pages', 'Una página o todas'],
      ['Cópia nova; original intacto', 'New copy; original intact', 'Copia nueva; original intacto'],
    ],
    how: [
      ['Envie o PDF.', 'Upload the PDF.', 'Suba el PDF.'],
      ['Arraste a área de recorte.', 'Drag the crop area.', 'Arrastre el área de recorte.'],
      ['Baixe o PDF recortado.', 'Download the cropped PDF.', 'Descargue el PDF recortado.'],
    ],
    faqQ: ['O recorte apaga o conteúdo fora da caixa?', 'Does crop delete content outside the box?', '¿El recorte borra el contenido fuera de la caja?'],
    faqA: [
      'Define a caixa de recorte visível. Alguns leitores ainda podem revelar conteúdo fora do crop box.',
      'It sets the visible crop box. Some readers can still reveal content outside the crop box.',
      'Define la caja de recorte visible. Algunos lectores aún pueden revelar contenido fuera del crop box.',
    ],
  }),
  localSuitePage('/comparar-pdf', 'compare-pdf', {
    title: ['Comparar PDF Online | PDFWINDOWS', 'Compare PDF Online | PDFWINDOWS', 'Comparar PDF en el navegador | PDFWINDOWS'],
    description: [
      'Compare o texto de dois PDFs no navegador. Veja linhas adicionadas e removidas — grátis, local e sem upload.',
      'Compare text from two PDFs in your browser. Spot added and removed lines — free, local, and no upload.',
      'Compare el texto de dos PDF en el navegador. Vea líneas añadidas y quitadas — gratis, local y sin subida.',
    ],
    keywords: ['comparar pdf, diff pdf, diferenças pdf', 'compare pdf, pdf diff, document comparison', 'comparar pdf, diferencias pdf'],
    h1: ['Comparar PDF', 'Compare PDF', 'Comparar PDF'],
    intro: [
      'Envie duas versões e compare o texto extraível linha a linha. Não é um diff visual de layout.',
      'Upload two versions and compare extractable text line by line. This is not a visual layout diff.',
      'Suba dos versiones y compare el texto extraíble línea a línea. No es un diff visual de diseño.',
    ],
    benefits: [
      ['Dois arquivos lado a lado', 'Two files side by side', 'Dos archivos lado a lado'],
      ['Linhas novas e removidas', 'Added and removed lines', 'Líneas nuevas y quitadas'],
      ['Processamento 100% local', '100% local processing', 'Procesamiento 100% local'],
    ],
    how: [
      ['Envie o PDF A e o PDF B.', 'Upload PDF A and PDF B.', 'Suba el PDF A y el PDF B.'],
      ['Compare o texto extraído.', 'Compare the extracted text.', 'Compare el texto extraído.'],
      ['Revise as linhas marcadas.', 'Review the marked lines.', 'Revise las líneas marcadas.'],
    ],
    faqQ: ['Funciona em PDF escaneado?', 'Does it work on a scanned PDF?', '¿Funciona en un PDF escaneado?'],
    faqA: [
      'Só se houver texto extraível. Rode OCR de PDF antes se for imagem.',
      'Only if there is extractable text. Run PDF OCR first if it is an image.',
      'Solo si hay texto extraíble. Ejecute OCR de PDF antes si es imagen.',
    ],
  }),
  localSuitePage('/editar-pdf', 'edit-pdf', {
    title: ['Editar PDF Online | PDFWINDOWS', 'Edit PDF Online | PDFWINDOWS', 'Editar PDF en el navegador | PDFWINDOWS'],
    description: [
      'Adicione texto, retângulo ou imagem num PDF no navegador. Carimbo visual por cima da página — grátis, local e sem upload.',
      'Add text, a rectangle, or an image to a PDF in your browser. Visual stamps on the page — free, local, no upload.',
      'Añada texto, rectángulo o imagen a un PDF en el navegador. Sellos visuales sobre la página — gratis y local.',
    ],
    keywords: ['editar pdf, adicionar texto pdf, carimbo pdf', 'edit pdf, add text to pdf, stamp pdf', 'editar pdf, añadir texto pdf'],
    h1: ['Editar PDF', 'Edit PDF', 'Editar PDF'],
    intro: [
      'Carimbe texto, retângulo ou imagem sobre a página. Não reescreve o texto original do PDF.',
      'Stamp text, a rectangle, or an image onto the page. It does not rewrite the original PDF text.',
      'Selle texto, un rectángulo o una imagen sobre la página. No reescribe el texto original del PDF.',
    ],
    benefits: [
      ['Texto, retângulo ou imagem', 'Text, rectangle, or image', 'Texto, rectángulo o imagen'],
      ['Clique para posicionar', 'Click to place', 'Clic para colocar'],
      ['Cópia nova; original intacto', 'New copy; original intact', 'Copia nueva; original intacto'],
    ],
    how: [
      ['Envie o PDF.', 'Upload the PDF.', 'Suba el PDF.'],
      ['Escolha o tipo e clique na página.', 'Choose the type and click the page.', 'Elija el tipo y pulse la página.'],
      ['Baixe o PDF editado.', 'Download the edited PDF.', 'Descargue el PDF editado.'],
    ],
    faqQ: ['Posso alterar o texto original da página?', 'Can I change the original page text?', '¿Puedo cambiar el texto original de la página?'],
    faqA: [
      'Não. Esta ferramenta adiciona conteúdo por cima. Para apagar dados visíveis, use Redação PDF.',
      'No. This tool adds content on top. To hide visible data, use Redact PDF.',
      'No. Esta herramienta añade contenido encima. Para ocultar datos, use Redacción PDF.',
    ],
  }),
  localSuitePage('/escanear-para-pdf', 'scan-to-pdf', {
    title: ['Escanear para PDF | PDFWINDOWS', 'Scan to PDF | PDFWINDOWS', 'Escanear a PDF | PDFWINDOWS'],
    description: [
      'Capture páginas com a câmera ou envie fotos e monte um PDF no navegador — grátis, local e sem upload.',
      'Capture pages with the camera or upload photos and build a PDF in your browser — free, local, no upload.',
      'Capture páginas con la cámara o suba fotos y arme un PDF en el navegador — gratis, local y sin subida.',
    ],
    keywords: ['escanear para pdf, camera pdf, foto para pdf', 'scan to pdf, camera to pdf, photos to pdf', 'escanear a pdf, camara pdf'],
    h1: ['Escanear para PDF', 'Scan to PDF', 'Escanear a PDF'],
    intro: [
      'Abra a câmera ou envie fotos da folha e gere um PDF. A imagem não sai do aparelho.',
      'Open the camera or upload photos of the sheet and generate a PDF. The image stays on the device.',
      'Abra la cámara o suba fotos de la hoja y genere un PDF. La imagen no sale del aparato.',
    ],
    benefits: [
      ['Câmera no aparelho', 'On-device camera', 'Cámara en el aparato'],
      ['Várias páginas em um PDF', 'Several pages in one PDF', 'Varias páginas en un PDF'],
      ['Combine com Ajuste de Margem', 'Pair with Margin Adjust', 'Combine con Ajuste de Margen'],
    ],
    how: [
      ['Abra a câmera ou envie fotos.', 'Open the camera or upload photos.', 'Abra la cámara o suba fotos.'],
      ['Capture cada página.', 'Capture each page.', 'Capture cada página.'],
      ['Gere e baixe o PDF.', 'Build and download the PDF.', 'Genere y descargue el PDF.'],
    ],
    faqQ: ['As fotos vão para um servidor?', 'Do the photos go to a server?', '¿Las fotos van a un servidor?'],
    faqA: [
      'Não. A câmera e as imagens ficam no navegador.',
      'No. The camera and images stay in the browser.',
      'No. La cámara y las imágenes quedan en el navegador.',
    ],
  }),
  localSuitePage('/reparar-pdf', 'repair-pdf', {
    title: ['Reparar PDF Online | PDFWINDOWS', 'Repair PDF Online | PDFWINDOWS', 'Reparar PDF en el navegador | PDFWINDOWS'],
    description: [
      'Tente reconstruir um PDF danificado no navegador. Cópia nova das páginas lidas — grátis, local e sem upload.',
      'Try rebuilding a damaged PDF in your browser. A new copy of readable pages — free, local, no upload.',
      'Intente reconstruir un PDF dañado en el navegador. Copia nueva de las páginas leídas — gratis y local.',
    ],
    keywords: ['reparar pdf, pdf corrompido, recuperar pdf', 'repair pdf, corrupt pdf, recover pdf', 'reparar pdf, pdf corrupto'],
    h1: ['Reparar PDF', 'Repair PDF', 'Reparar PDF'],
    intro: [
      'Copia as páginas que o leitor ainda consegue abrir para um PDF novo. Não é recuperação forense.',
      'Copies pages the reader can still open into a new PDF. This is not forensic recovery.',
      'Copia las páginas que el lector aún abre a un PDF nuevo. No es recuperación forense.',
    ],
    benefits: [
      ['Reconstrói páginas legíveis', 'Rebuilds readable pages', 'Reconstruye páginas legibles'],
      ['Cópia nova', 'New copy', 'Copia nueva'],
      ['Processamento local', 'Local processing', 'Procesamiento local'],
    ],
    how: [
      ['Envie o PDF.', 'Upload the PDF.', 'Suba el PDF.'],
      ['Aguarde a reconstrução.', 'Wait for the rebuild.', 'Espere la reconstrucción.'],
      ['Baixe a cópia.', 'Download the copy.', 'Descargue la copia.'],
    ],
    faqQ: ['Recupera arquivo totalmente corrompido?', 'Does it recover a fully corrupt file?', '¿Recupera un archivo totalmente corrupto?'],
    faqA: [
      'Não. Só reconstrói o que o leitor ainda consegue carregar.',
      'No. It only rebuilds what the reader can still load.',
      'No. Solo reconstruye lo que el lector aún puede cargar.',
    ],
  }),
  localSuitePage('/pdf-para-pdfa', 'pdf-to-pdfa', {
    title: ['PDF para arquivo (PDF/A) | PDFWINDOWS', 'PDF to archival copy | PDFWINDOWS', 'PDF a copia de archivo | PDFWINDOWS'],
    description: [
      'Gere uma cópia de arquivo do PDF no navegador, sem cifra. Não é PDF/A certificado ISO — grátis e local.',
      'Generate an archival PDF copy in your browser, unencrypted. Not a certified ISO PDF/A — free and local.',
      'Genere una copia de archivo del PDF en el navegador, sin cifrado. No es PDF/A ISO certificado — gratis y local.',
    ],
    keywords: ['pdf para pdfa, pdf arquivo, pdf/a', 'pdf to pdfa, archival pdf, pdf/a', 'pdf a pdfa, pdf archivo'],
    h1: ['PDF para arquivo (PDF/A)', 'PDF to archival copy', 'PDF a copia de archivo'],
    intro: [
      'Regrava o PDF sem cifra, com metadados. Não embute perfil ICC — não é PDF/A certificado.',
      'Rewrites the PDF without encryption, with metadata. No ICC profile — not a certified PDF/A.',
      'Reescribe el PDF sin cifrado, con metadatos. Sin perfil ICC — no es un PDF/A certificado.',
    ],
    benefits: [
      ['Cópia sem cifra', 'Unencrypted copy', 'Copia sin cifrado'],
      ['Metadados de arquivo', 'Archival metadata', 'Metadatos de archivo'],
      ['Processamento local', 'Local processing', 'Procesamiento local'],
    ],
    how: [
      ['Envie o PDF.', 'Upload the PDF.', 'Suba el PDF.'],
      ['Gere a cópia de arquivo.', 'Generate the archival copy.', 'Genere la copia de archivo.'],
      ['Baixe o resultado.', 'Download the result.', 'Descargue el resultado.'],
    ],
    faqQ: ['Isto é PDF/A-1b certificado?', 'Is this certified PDF/A-1b?', '¿Esto es PDF/A-1b certificado?'],
    faqA: [
      'Não. É uma cópia de arquivo inspirada no PDF/A, sem perfil ICC de impressão.',
      'No. It is an archival-inspired copy without a printer ICC profile.',
      'No. Es una copia de archivo inspirada en PDF/A, sin perfil ICC de impresión.',
    ],
  }),
  localSuitePage('/formularios-pdf', 'pdf-forms', {
    title: ['Formulários PDF Online | PDFWINDOWS', 'PDF Forms Online | PDFWINDOWS', 'Formularios PDF Online | PDFWINDOWS'],
    description: [
      'Preencha campos AcroForm e adicione caixas de texto no PDF, no navegador — grátis, local e sem upload.',
      'Fill AcroForm fields and add text boxes to a PDF in your browser — free, local, and no upload.',
      'Rellene campos AcroForm y añada cajas de texto a un PDF en el navegador — gratis, local y sin subida.',
    ],
    keywords: ['formularios pdf, preencher pdf, acroform', 'pdf forms, fill pdf, acroform', 'formularios pdf, rellenar pdf'],
    h1: ['Formulários PDF', 'PDF Forms', 'Formularios PDF'],
    intro: [
      'Preencha um AcroForm existente ou clique para adicionar campos de texto e caixas. Sem detecção visual automática.',
      'Fill an existing AcroForm or click to add text fields and checkboxes. No automatic visual detection.',
      'Rellene un AcroForm existente o pulse para añadir campos de texto y casillas. Sin detección visual automática.',
    ],
    benefits: [
      ['Lista campos existentes', 'Lists existing fields', 'Lista campos existentes'],
      ['Adiciona texto e caixa', 'Adds text and checkbox', 'Añade texto y casilla'],
      ['Cópia nova; original intacto', 'New copy; original intact', 'Copia nueva; original intacto'],
    ],
    how: [
      ['Envie o PDF.', 'Upload the PDF.', 'Suba el PDF.'],
      ['Preencha ou adicione campos.', 'Fill or add fields.', 'Rellene o añada campos.'],
      ['Baixe o PDF do formulário.', 'Download the form PDF.', 'Descargue el PDF del formulario.'],
    ],
    faqQ: ['Detecta campos desenhados só visualmente?', 'Does it detect visual-only fields?', '¿Detecta campos solo visuales?'],
    faqA: [
      'Não. Só lê AcroForm. XFA não é suportado.',
      'No. It only reads AcroForm. XFA is not supported.',
      'No. Solo lee AcroForm. XFA no es compatible.',
    ],
  }),
  localSuitePage('/pdf-para-powerpoint', 'pdf-to-pptx', {
    title: ['PDF para PowerPoint | PDFWINDOWS', 'PDF to PowerPoint | PDFWINDOWS', 'PDF a PowerPoint | PDFWINDOWS'],
    description: [
      'Cada página do PDF vira um slide com a imagem da página (até 40). Local no navegador — sem objetos editáveis.',
      'Each PDF page becomes a slide with a page image (up to 40). Local in the browser — not editable shapes.',
      'Cada página del PDF se vuelve una diapositiva con la imagen (hasta 40). Local — no objetos editables.',
    ],
    keywords: ['pdf para powerpoint, pdf para pptx', 'pdf to powerpoint, pdf to pptx', 'pdf a powerpoint, pdf a pptx'],
    h1: ['PDF para PowerPoint', 'PDF to PowerPoint', 'PDF a PowerPoint'],
    intro: [
      'Rasteriza cada página e monta um PPTX com a imagem no slide. Não gera formas editáveis do PowerPoint.',
      'Rasters each page and builds a PPTX with the image on the slide. It does not create editable PowerPoint shapes.',
      'Rasteriza cada página y arma un PPTX con la imagen en la diapositiva. No genera formas editables de PowerPoint.',
    ],
    benefits: [
      ['Um slide por página', 'One slide per page', 'Una diapositiva por página'],
      ['Até 40 páginas', 'Up to 40 pages', 'Hasta 40 páginas'],
      ['Processamento local', 'Local processing', 'Procesamiento local'],
    ],
    how: [
      ['Envie o PDF.', 'Upload the PDF.', 'Suba el PDF.'],
      ['Aguarde a rasterização.', 'Wait for rasterization.', 'Espere la rasterización.'],
      ['Baixe o PPTX.', 'Download the PPTX.', 'Descargue el PPTX.'],
    ],
    faqQ: ['Consigo editar o texto no PowerPoint?', 'Can I edit the text in PowerPoint?', '¿Puedo editar el texto en PowerPoint?'],
    faqA: [
      'Não. O slide contém a imagem da página, não caixas de texto.',
      'No. The slide contains the page image, not text boxes.',
      'No. La diapositiva contiene la imagen de la página, no cajas de texto.',
    ],
  }),
  localSuitePage('/powerpoint-para-pdf', 'pptx-to-pdf', {
    title: ['PowerPoint para PDF | PDFWINDOWS', 'PowerPoint to PDF | PDFWINDOWS', 'PowerPoint a PDF | PDFWINDOWS'],
    description: [
      'Converta PPTX em PDF no navegador a partir do texto dos slides. Animações e layout original não entram.',
      'Convert PPTX to PDF in your browser from slide text. Animations and original layout are not included.',
      'Convierta PPTX a PDF en el navegador a partir del texto de las diapositivas. Sin animaciones ni diseño original.',
    ],
    keywords: ['powerpoint para pdf, pptx para pdf', 'powerpoint to pdf, pptx to pdf', 'powerpoint a pdf, pptx a pdf'],
    h1: ['PowerPoint para PDF', 'PowerPoint to PDF', 'PowerPoint a PDF'],
    intro: [
      'Extrai o texto dos slides e pagina um PDF. Não reproduz animações, notas do orador nem o layout original.',
      'Extracts slide text and paginates a PDF. It does not reproduce animations, speaker notes, or original layout.',
      'Extrae el texto de las diapositivas y pagina un PDF. No reproduce animaciones, notas ni el diseño original.',
    ],
    benefits: [
      ['Texto dos slides', 'Slide text', 'Texto de las diapositivas'],
      ['PDF local', 'Local PDF', 'PDF local'],
      ['Sem upload', 'No upload', 'Sin subida'],
    ],
    how: [
      ['Envie o PPTX.', 'Upload the PPTX.', 'Suba el PPTX.'],
      ['Aguarde a extração do texto.', 'Wait for text extraction.', 'Espere la extracción del texto.'],
      ['Baixe o PDF.', 'Download the PDF.', 'Descargue el PDF.'],
    ],
    faqQ: ['Aceita .ppt antigo?', 'Does it accept legacy .ppt?', '¿Acepta .ppt antiguo?'],
    faqA: [
      'Não. Salve como .pptx no PowerPoint e envie de novo.',
      'No. Save as .pptx in PowerPoint and upload again.',
      'No. Guarde como .pptx en PowerPoint y súbalo de nuevo.',
    ],
  }),
  localSuitePage('/pdf-para-excel', 'pdf-to-excel', {
    title: ['PDF para Excel | PDFWINDOWS', 'PDF to Excel | PDFWINDOWS', 'PDF a Excel | PDFWINDOWS'],
    description: [
      'Extraia texto de um PDF para XLSX no navegador. Colunas heurísticas pelo espaço — tabelas em imagem pedem OCR.',
      'Extract PDF text to XLSX in your browser. Heuristic columns from spacing — image tables need OCR first.',
      'Extraiga texto de un PDF a XLSX en el navegador. Columnas heurísticas por espacio — tablas en imagen piden OCR.',
    ],
    keywords: ['pdf para excel, pdf para xlsx, tabela pdf', 'pdf to excel, pdf to xlsx, pdf table', 'pdf a excel, pdf a xlsx'],
    h1: ['PDF para Excel', 'PDF to Excel', 'PDF a Excel'],
    intro: [
      'Lê o texto do PDF e tenta separar colunas pelo espaço. Não reconstrói planilhas formatadas.',
      'Reads PDF text and tries to split columns by spacing. It does not rebuild formatted spreadsheets.',
      'Lee el texto del PDF e intenta separar columnas por el espacio. No reconstruye hojas formateadas.',
    ],
    benefits: [
      ['Saída XLSX', 'XLSX output', 'Salida XLSX'],
      ['Uma linha por trecho de texto', 'One row per text line', 'Una fila por tramo de texto'],
      ['Processamento local', 'Local processing', 'Procesamiento local'],
    ],
    how: [
      ['Envie o PDF.', 'Upload the PDF.', 'Suba el PDF.'],
      ['Aguarde a extração.', 'Wait for extraction.', 'Espere la extracción.'],
      ['Baixe o XLSX.', 'Download the XLSX.', 'Descargue el XLSX.'],
    ],
    faqQ: ['Tabelas desenhadas como imagem entram?', 'Do image-drawn tables come through?', '¿Entran las tablas dibujadas como imagen?'],
    faqA: [
      'Não até rodar OCR de PDF e gerar texto extraível.',
      'Not until you run PDF OCR and get extractable text.',
      'No hasta ejecutar OCR de PDF y obtener texto extraíble.',
    ],
  }),
  localSuitePage('/pdf-para-word', 'pdf-to-word', {
    title: ['PDF para Word | PDFWINDOWS', 'PDF to Word | PDFWINDOWS', 'PDF a Word | PDFWINDOWS'],
    description: [
      'Converta PDF em DOCX no navegador a partir do texto. Layout, fontes e imagens da página não são reproduzidos fielmente.',
      'Convert PDF to DOCX in your browser from the text layer. Layout, fonts, and page images are not reproduced faithfully.',
      'Convierta PDF a DOCX en el navegador a partir del texto. Diseño, fuentes e imágenes de la página no se reproducen fielmente.',
    ],
    keywords: ['pdf para word, pdf para docx', 'pdf to word, pdf to docx', 'pdf a word, pdf a docx'],
    h1: ['PDF para Word', 'PDF to Word', 'PDF a Word'],
    intro: [
      'Extrai o texto e gera um DOCX editável. Não é uma conversão visual quase 100% fiel.',
      'Extracts the text and writes an editable DOCX. This is not a nearly 100% visual conversion.',
      'Extrae el texto y genera un DOCX editable. No es una conversión visual casi 100% fiel.',
    ],
    benefits: [
      ['DOCX editável', 'Editable DOCX', 'DOCX editable'],
      ['Texto por página', 'Text per page', 'Texto por página'],
      ['Sem upload', 'No upload', 'Sin subida'],
    ],
    how: [
      ['Envie o PDF.', 'Upload the PDF.', 'Suba el PDF.'],
      ['Aguarde a extração do texto.', 'Wait for text extraction.', 'Espere la extracción del texto.'],
      ['Baixe o DOCX.', 'Download the DOCX.', 'Descargue el DOCX.'],
    ],
    faqQ: ['O Word sai igual ao PDF?', 'Does Word look like the PDF?', '¿El Word sale igual que el PDF?'],
    faqA: [
      'Não. Só o texto extraível. Use OCR se for scan.',
      'No. Only extractable text. Use OCR if it is a scan.',
      'No. Solo el texto extraíble. Use OCR si es un escaneo.',
    ],
  }),
  localSuitePage('/word-para-pdf', 'word-to-pdf', {
    title: ['Word para PDF | PDFWINDOWS', 'Word to PDF | PDFWINDOWS', 'Word a PDF | PDFWINDOWS'],
    description: [
      'Converta DOCX em PDF no navegador a partir do texto. Arquivos .doc antigos: salve como .docx antes.',
      'Convert DOCX to PDF in your browser from the text. Legacy .doc files: save as .docx first.',
      'Convierta DOCX a PDF en el navegador a partir del texto. Archivos .doc antiguos: guarde como .docx antes.',
    ],
    keywords: ['word para pdf, docx para pdf', 'word to pdf, docx to pdf', 'word a pdf, docx a pdf'],
    h1: ['Word para PDF', 'Word to PDF', 'Word a PDF'],
    intro: [
      'Lê o texto do DOCX e pagina um PDF. Layout complexo e macros não entram.',
      'Reads DOCX text and paginates a PDF. Complex layout and macros are not included.',
      'Lee el texto del DOCX y pagina un PDF. El diseño complejo y las macros no entran.',
    ],
    benefits: [
      ['DOCX para PDF local', 'DOCX to local PDF', 'DOCX a PDF local'],
      ['Sem macros', 'No macros', 'Sin macros'],
      ['Original intacto', 'Original intact', 'Original intacto'],
    ],
    how: [
      ['Envie o DOCX.', 'Upload the DOCX.', 'Suba el DOCX.'],
      ['Aguarde a paginação.', 'Wait for pagination.', 'Espere la paginación.'],
      ['Baixe o PDF.', 'Download the PDF.', 'Descargue el PDF.'],
    ],
    faqQ: ['Aceita .doc binário?', 'Does it accept binary .doc?', '¿Acepta .doc binario?'],
    faqA: [
      'Não. Salve como .docx no Word ou LibreOffice.',
      'No. Save as .docx in Word or LibreOffice.',
      'No. Guarde como .docx en Word o LibreOffice.',
    ],
  }),
  localSuitePage('/excel-para-pdf', 'excel-to-pdf', {
    title: ['Excel para PDF | PDFWINDOWS', 'Excel to PDF | PDFWINDOWS', 'Excel a PDF | PDFWINDOWS'],
    description: [
      'Converta XLSX ou CSV em PDF no navegador. Células viram texto paginado — gráficos não entram.',
      'Convert XLSX or CSV to PDF in your browser. Cells become paginated text — charts are not included.',
      'Convierta XLSX o CSV a PDF en el navegador. Las celdas se vuelven texto paginado — sin gráficos.',
    ],
    keywords: ['excel para pdf, xlsx para pdf, csv para pdf', 'excel to pdf, xlsx to pdf', 'excel a pdf, xlsx a pdf'],
    h1: ['Excel para PDF', 'Excel to PDF', 'Excel a PDF'],
    intro: [
      'Lê células da planilha e pagina o texto em PDF. Formatação condicional e gráficos não entram.',
      'Reads spreadsheet cells and paginates the text into a PDF. Conditional formatting and charts are not included.',
      'Lee celdas de la hoja y pagina el texto en PDF. El formato condicional y los gráficos no entran.',
    ],
    benefits: [
      ['XLSX e CSV', 'XLSX and CSV', 'XLSX y CSV'],
      ['PDF local', 'Local PDF', 'PDF local'],
      ['Sem recalcular fórmulas', 'No formula recalculation', 'Sin recalcular fórmulas'],
    ],
    how: [
      ['Envie a planilha.', 'Upload the spreadsheet.', 'Suba la hoja.'],
      ['Aguarde a leitura das células.', 'Wait for the cell read.', 'Espere la lectura de celdas.'],
      ['Baixe o PDF.', 'Download the PDF.', 'Descargue el PDF.'],
    ],
    faqQ: ['As fórmulas são recalculadas?', 'Are formulas recalculated?', '¿Se recalculan las fórmulas?'],
    faqA: [
      'Não. Entram os valores em cache da planilha.',
      'No. Cached cell values are used.',
      'No. Se usan los valores en caché de la hoja.',
    ],
  }),
  localSuitePage('/html-para-pdf', 'html-to-pdf', {
    title: ['HTML para PDF | PDFWINDOWS', 'HTML to PDF | PDFWINDOWS', 'HTML a PDF | PDFWINDOWS'],
    description: [
      'Converta um arquivo HTML local em PDF no navegador. Não busca URLs da internet — CORS e política de privacidade.',
      'Convert a local HTML file to PDF in your browser. It does not fetch internet URLs — CORS and privacy policy.',
      'Convierta un archivo HTML local a PDF en el navegador. No descarga URLs de internet — CORS y política de privacidad.',
    ],
    keywords: ['html para pdf, arquivo html pdf', 'html to pdf, html file to pdf', 'html a pdf, archivo html pdf'],
    h1: ['HTML para PDF', 'HTML to PDF', 'HTML a PDF'],
    intro: [
      'Envie um .html do seu computador. O texto da página vira PDF. Não copiamos URL da web.',
      'Upload an .html file from your computer. Page text becomes a PDF. We do not fetch a web URL.',
      'Suba un .html de su computadora. El texto de la página se vuelve PDF. No copiamos una URL de la web.',
    ],
    benefits: [
      ['Arquivo HTML local', 'Local HTML file', 'Archivo HTML local'],
      ['Sem proxy de URL', 'No URL proxy', 'Sin proxy de URL'],
      ['PDF no aparelho', 'PDF on the device', 'PDF en el aparato'],
    ],
    how: [
      ['Envie o arquivo HTML.', 'Upload the HTML file.', 'Suba el archivo HTML.'],
      ['Aguarde a conversão do texto.', 'Wait for the text conversion.', 'Espere la conversión del texto.'],
      ['Baixe o PDF.', 'Download the PDF.', 'Descargue el PDF.'],
    ],
    faqQ: ['Posso colar a URL de um site?', 'Can I paste a website URL?', '¿Puedo pegar la URL de un sitio?'],
    faqA: [
      'Não. Isso exigiria um proxy. Envie o arquivo HTML salvo no aparelho.',
      'No. That would need a proxy. Upload the HTML file saved on the device.',
      'No. Eso exigiría un proxy. Suba el archivo HTML guardado en el aparato.',
    ],
  }),
];

export const HOME_COPY: Record<LanguageType, ToolPageCopy> = {
  pt: {
    title: 'PDFWINDOWS — Ferramentas para PDF e Imagens',
    description:
      'Converta, edite, organize e proteja arquivos PDF e imagens diretamente no navegador. Seus arquivos permanecem no seu dispositivo, garantindo mais privacidade, segurança e velocidade.',
    keywords: 'ferramentas pdf gratis, mesclar pdf, comprimir pdf, converter pdf, proteger pdf',
    h1: 'Ferramentas para PDF e Imagens',
    intro:
      'Converta, edite, organize e proteja arquivos PDF e imagens diretamente no navegador. Seus arquivos permanecem no seu dispositivo, garantindo mais privacidade, segurança e velocidade.',
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
  const normalized = path.startsWith('/') ? path : `/${path}`;
  const lang = parseLocaleFromPath(normalized);
  const bare = stripLocalePrefix(normalized);
  const canonical = resolveCanonicalPath(normalized, lang ?? undefined) ?? bare;
  return TOOL_PAGES.find((p) => p.path === canonical);
}

export function getAllPublicPaths(): string[] {
  const barePaths = getPublicBarePaths();
  return PUBLIC_LOCALES.flatMap((lang) =>
    barePaths.map((bare) => getLocalizedPublicPath(lang as LanguageType, bare))
  );
}
