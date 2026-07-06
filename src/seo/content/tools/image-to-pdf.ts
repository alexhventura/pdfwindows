import type { ToolRichContent } from '../types';
import { privacyFaq, defaultCta } from '../helpers';

export const IMAGE_TO_PDF_CONTENT: Record<'en' | 'pt' | 'es', ToolRichContent> = {
  en: {
    title: 'Image to PDF Online Offline | PDFWINDOWS',
    description:
      'Create PDF documents from JPG, PNG, and other images in your browser. Combine multiple photos into one PDF with local, private processing.',
    keywords:
      'image to pdf, jpg to pdf, photo to pdf, combine images pdf offline, convert picture to pdf browser',
    h1: 'Convert Image to PDF',
    intro:
      'Turn photos, scans, screenshots, and illustrations into polished PDF documents without uploading files to the cloud. PDFWINDOWS Image to PDF runs entirely in your browser, making it perfect for expense receipts, signed forms photographed on a phone, design portfolios, and classroom handouts. Arrange multiple images into a single document, preserve page order, and download a shareable PDF in moments. Because processing stays on your device, sensitive IDs, medical paperwork, and confidential diagrams remain private from upload to download.',
    toolName: 'Image to PDF',
    benefits: [
      'Combine one or many images into a single PDF file',
      'Combine multiple images into one polished document',
      'Works with JPG, PNG, WEBP, and other common image types',
      'Fast results without installing Adobe or desktop utilities',
      'Free, unlimited use with no account required',
    ],
    useCases: [
      {
        title: 'Submit expense reports and receipts',
        body: 'Finance teams often require PDF attachments rather than loose photos. Photograph receipts on your phone, transfer them to your computer, and merge them into one organized PDF for reimbursement systems — all without exposing purchase details to third-party converters.',
      },
      {
        title: 'Archive scanned documents and notes',
        body: 'Whiteboard sessions, handwritten notes, and paper contracts captured as images can be compiled into a searchable PDF archive. Students, researchers, and legal assistants use this workflow to preserve originals while creating a single file that is easier to email and store.',
      },
      {
        title: 'Build visual portfolios and proposals',
        body: 'Designers and photographers can package selected work into a client-ready PDF. Each image becomes a page, creating a lightweight presentation that opens consistently on any device without specialized gallery software.',
      },
      {
        title: 'Share multi-page visual instructions',
        body: 'Product teams documenting assembly steps or IT departments publishing screenshot guides benefit from a single PDF instead of a zip of images. Recipients get one attachment with a clear page sequence.',
      },
      {
        title: 'Submit identity and compliance documentation',
        body:
          'HR onboarding and KYC flows often require PDF packets built from photographed IDs, utility bills, and signed declarations. Assembling those images locally into one PDF avoids uploading government-issued documents to unknown conversion servers while meeting portal upload requirements.',
      },
    ],
    howItWorks: [
      'Navigate to Image to PDF and select the images you want to include.',
      'Order files if the tool supports sequencing — first image becomes the first page.',
      'Choose conversion options such as page size or margins when available.',
      'Generate the PDF locally and review the preview in your browser.',
      'Download the finished document and share or archive it as needed.',
    ],
    tips: [
      'Crop photos before converting to remove distracting backgrounds around documents.',
      'For text-heavy scans, use higher-resolution source images so characters stay sharp on the PDF page.',
      'Keep a consistent orientation — rotate images first if pages appear sideways.',
      'Name downloaded PDFs descriptively so recipients understand the content immediately.',
      'Combine with Image Resize if file size must stay under email attachment limits.',
      'Use Image Converter first if sources are in uncommon formats like BMP or TIFF exports.',
    ],
    sections: [
      {
        id: 'why-pdf',
        heading: 'Why convert images to PDF?',
        level: 2,
        paragraphs: [
          'PDF is the universal format for document exchange. Unlike raw image files, a PDF presents pages in a fixed layout that looks the same on phones, tablets, and printers. Organizations, schools, and government portals frequently require PDF submissions because the format is harder to accidentally edit and easier to archive.',
          'When you have several related images — such as pages of a signed contract photographed individually — merging them into one PDF simplifies sharing, printing, and long-term storage compared to sending multiple attachments.',
        ],
      },
      {
        id: 'multi-image',
        heading: 'Combining multiple images into one document',
        level: 2,
        paragraphs: [
          'Multi-image PDF creation is essential for workflows that start on mobile cameras and end in formal submissions. Each image typically maps to one PDF page, preserving the visual order you define. This approach works well for batch-scanning receipts, chapter illustrations, or sequential UI mockups.',
          'If your source images have different dimensions, the converter scales them to fit standard page layouts while maintaining aspect ratio where possible. For critical alignment — such as forms — consider resizing images to uniform dimensions beforehand using the Image Resize tool.',
        ],
        bullets: [
          'Receipts and invoices for accounting',
          'Homework photos submitted to learning platforms',
          'ID and certificate scans for HR onboarding',
          'Screenshot walkthroughs for support documentation',
        ],
      },
      {
        id: 'privacy-local',
        heading: 'Local processing for sensitive visuals',
        level: 2,
        paragraphs: [
          'Images often contain personally identifiable information: faces, addresses, account numbers, and medical details. Uploading these to online converters creates unnecessary exposure. PDFWINDOWS keeps the entire image-to-PDF pipeline on your machine using browser-based PDF generation.',
          'Local processing also means you can work on air-gapped or compliance-restricted networks once the application is loaded, supporting industries that prohibit external file transfers.',
        ],
      },
      {
        id: 'image-pdf-workflow',
        heading: 'Image to PDF in a document workflow',
        level: 3,
        paragraphs: [
          'Image to PDF frequently follows capture and cleanup: convert formats with Image Converter, enhance scans with Image Filters, resize for consistency, then compile pages. After PDF creation, use Merge PDF to combine with cover letters, Compress PDF for email limits, or PDF Password for distribution control.',
        ],
        bullets: [
          'Image Resize — uniform page dimensions before PDF creation',
          'PDF Merge — add cover pages or append related PDFs',
          'PDF Compress — shrink image-heavy PDFs for sharing',
        ],
      },
    ],
    faq: [
      ...privacyFaq('en'),
      {
        q: 'How many images can I add to one PDF?',
        a: 'You can include multiple images in a single session. Each image typically becomes its own page, which is ideal for multi-page scans and photo collections.',
      },
      {
        q: 'What image formats are supported?',
        a: 'Common formats such as JPG, PNG, and WEBP are supported. Use the Image Converter first if you need to change an uncommon format before creating the PDF.',
      },
      {
        q: 'Will the PDF quality match my original photos?',
        a: 'Output quality depends on source resolution. High-resolution images produce sharp PDF pages; heavily compressed phone photos may look softer when printed large.',
      },
      {
        q: 'Can I use this for official document submissions?',
        a: 'Many institutions accept PDFs built from clear photos or scans. Always verify specific requirements — such as maximum file size or mandatory OCR text layers — with the receiving organization.',
      },
    ],
    relatedTools: ['/image-converter', '/image-resize', '/pdf-merge', '/txt-to-pdf'],
    cta: defaultCta('en', 'Image to PDF'),
  },
  pt: {
    title: 'Imagem para PDF Online Offline | PDFWINDOWS',
    description:
      'Crie PDFs a partir de JPG, PNG e outras imagens no navegador. Combine várias fotos em um PDF.',
    keywords:
      'imagem para pdf, jpg para pdf, foto para pdf, juntar imagens em pdf offline, converter foto em pdf',
    h1: 'Converter Imagem para PDF',
    intro:
      'Transforme fotos, scans, capturas de tela e ilustrações em documentos PDF sem enviar arquivos para a nuvem. O Imagem para PDF do PDFWINDOWS roda inteiramente no navegador — ideal para comprovantes, formulários assinados fotografados no celular, portfólios e materiais escolares. Organize várias imagens em um único documento, preserve a ordem das páginas e baixe um PDF compartilhável em instantes. Como o processamento fica no seu dispositivo, documentos de identidade, papéis médicos e diagramas confidenciais permanecem privados do início ao fim.',
    toolName: 'Imagem para PDF',
    benefits: [
      'Combine uma ou várias imagens em um único PDF',
      'Combine várias imagens em um documento profissional',
      'Compatível com JPG, PNG, WEBP e outros formatos comuns',
      'Resultado rápido sem instalar Adobe ou utilitários desktop',
      'Uso gratuito e ilimitado, sem conta',
    ],
    useCases: [
      {
        title: 'Enviar comprovantes e relatórios de despesas',
        body: 'Setores financeiros costumam exigir PDF em vez de fotos soltas. Fotografe recibos no celular, transfira para o computador e una tudo em um PDF organizado para sistemas de reembolso — sem expor detalhes de compra a conversores de terceiros.',
      },
      {
        title: 'Arquivar documentos escaneados e anotações',
        body: 'Quadros brancos, notas manuscritas e contratos em papel capturados como imagem podem virar um arquivo PDF único. Estudantes, pesquisadores e assistentes jurídicos preservam originais e facilitam envio por e-mail e armazenamento.',
      },
      {
        title: 'Montar portfólios e propostas visuais',
        body: 'Designers e fotógrafos empacotam trabalhos selecionados em PDF pronto para o cliente. Cada imagem vira uma página, criando apresentação leve que abre em qualquer dispositivo sem software de galeria especializado.',
      },
      {
        title: 'Compartilhar instruções visuais em várias páginas',
        body: 'Equipes de produto documentando montagem ou TI publicando guias com capturas se beneficiam de um PDF único em vez de um zip de imagens. O destinatário recebe um anexo com sequência clara de páginas.',
      },
      {
        title: 'Enviar documentação de identidade e compliance',
        body:
          'Onboarding de RH e fluxos KYC frequentemente exigem pacotes PDF montados a partir de documentos fotografados, contas de consumo e declarações assinadas. Montar essas imagens localmente em um PDF evita enviar documentos emitidos pelo governo a servidores de conversão desconhecidos enquanto atende requisitos de upload em portais.',
      },
    ],
    howItWorks: [
      'Acesse Imagem para PDF e selecione as imagens desejadas.',
      'Ordene os arquivos se a ferramenta permitir — a primeira imagem vira a primeira página.',
      'Escolha opções como tamanho de página ou margens quando disponíveis.',
      'Gere o PDF localmente e revise a pré-visualização no navegador.',
      'Baixe o documento final e compartilhe ou arquive conforme necessário.',
    ],
    tips: [
      'Recorte fotos antes de converter para remover fundos desnecessários ao redor de documentos.',
      'Em scans com muito texto, use imagens de maior resolução para manter caracteres nítidos na página PDF.',
      'Mantenha orientação consistente — gire imagens antes se as páginas aparecerem de lado.',
      'Nomeie PDFs baixados de forma descritiva para o destinatário entender o conteúdo.',
      'Combine com Redimensionar Imagem se o tamanho precisar ficar abaixo do limite de anexo.',
      'Use o Conversor de Imagens antes se as fontes estiverem em formatos incomuns como BMP ou exportações TIFF.',
    ],
    sections: [
      {
        id: 'porque-pdf',
        heading: 'Por que converter imagens em PDF?',
        level: 2,
        paragraphs: [
          'PDF é o formato universal de troca de documentos. Diferente de arquivos de imagem brutos, o PDF apresenta páginas em layout fixo que se parece igual em celulares, tablets e impressoras. Organizações, escolas e portais governamentais frequentemente exigem PDF porque o formato é mais difícil de editar por acidente e mais fácil de arquivar.',
          'Quando você tem várias imagens relacionadas — como páginas de um contrato assinado fotografadas separadamente — unir em um PDF simplifica compartilhamento, impressão e armazenamento de longo prazo.',
        ],
      },
      {
        id: 'multi-imagem',
        heading: 'Combinando várias imagens em um documento',
        level: 2,
        paragraphs: [
          'Criar PDF com múltiplas imagens é essencial para fluxos que começam na câmera do celular e terminam em envios formais. Cada imagem costuma virar uma página PDF na ordem definida — útil para lotes de recibos, ilustrações de capítulos ou mockups sequenciais de interface.',
          'Se as imagens têm dimensões diferentes, o conversor as ajusta ao layout padrão mantendo proporção quando possível. Para alinhamento crítico — como formulários — considere redimensionar antes com a ferramenta Redimensionar Imagem.',
        ],
        bullets: [
          'Recibos e notas fiscais para contabilidade',
          'Fotos de lição de casa em plataformas educacionais',
          'Scans de documentos para onboarding de RH',
          'Passo a passo com capturas para documentação de suporte',
        ],
      },
      {
        id: 'privacidade-local',
        heading: 'Processamento local para visuais sensíveis',
        level: 2,
        paragraphs: [
          'Imagens frequentemente contêm dados pessoais: rostos, endereços, números de conta e informações médicas. Enviar isso a conversores online cria exposição desnecessária. O PDFWINDOWS mantém todo o pipeline imagem-para-PDF na sua máquina com geração de PDF no navegador.',
          'O processamento local também permite trabalhar em redes restritas ou sem internet após carregar a aplicação, atendendo setores que proíbem transferência externa de arquivos.',
        ],
      },
      {
        id: 'fluxo-imagem-pdf',
        heading: 'Imagem para PDF no fluxo de documentos',
        level: 3,
        paragraphs: [
          'Imagem para PDF frequentemente segue captura e limpeza: converta formatos no Conversor de Imagens, melhore scans com Filtros de Imagem, redimensione para consistência e compile páginas. Após criar o PDF, use Mesclar PDF para combinar com cartas de apresentação, Comprimir PDF para limites de e-mail ou Senha PDF para controle de distribuição.',
        ],
        bullets: [
          'Redimensionar Imagem — dimensões uniformes de página antes do PDF',
          'Mesclar PDF — adicione capas ou anexe PDFs relacionados',
          'Comprimir PDF — reduza PDFs pesados em imagem para compartilhar',
        ],
      },
    ],
    faq: [
      ...privacyFaq('pt'),
      {
        q: 'Quantas imagens posso colocar em um PDF?',
        a: 'Você pode incluir várias imagens na mesma sessão. Cada imagem normalmente vira uma página — ideal para scans multipágina e coleções de fotos.',
      },
      {
        q: 'Quais formatos de imagem são suportados?',
        a: 'Formatos comuns como JPG, PNG e WEBP são suportados. Use o Conversor de Imagens antes se precisar alterar um formato incomum.',
      },
      {
        q: 'A qualidade do PDF será igual às fotos originais?',
        a: 'A qualidade depende da resolução de origem. Imagens em alta resolução geram páginas nítidas; fotos muito comprimidas podem parecer mais suaves ao imprimir em tamanho grande.',
      },
      {
        q: 'Posso usar para envios oficiais de documentos?',
        a: 'Muitas instituições aceitam PDFs feitos de fotos ou scans claros. Confirme requisitos específicos — tamanho máximo, camada de texto OCR — com a organização receptora.',
      },
    ],
    relatedTools: ['/image-converter', '/image-resize', '/pdf-merge', '/txt-to-pdf'],
    cta: defaultCta('pt', 'Imagem para PDF'),
  },
  es: {
    title: 'Imagen a PDF Online Offline | PDFWINDOWS',
    description:
      'Cree documentos PDF desde JPG, PNG y otras imágenes en su navegador. Combine varias fotos en un PDF.',
    keywords:
      'imagen a pdf, jpg a pdf, foto a pdf, unir imágenes pdf offline, convertir foto a pdf navegador',
    h1: 'Convertir Imagen a PDF',
    intro:
      'Convierta fotos, escaneos, capturas de pantalla e ilustraciones en documentos PDF pulidos sin subir archivos a la nube. Imagen a PDF de PDFWINDOWS se ejecuta completamente en su navegador, ideal para recibos de gastos, formularios firmados fotografiados con el móvil, portafolios de diseño y material escolar. Organice varias imágenes en un solo documento, preserve el orden de páginas y descargue un PDF compartible en instantes. Como el procesamiento permanece en su dispositivo, identificaciones, documentación médica y diagramas confidenciales se mantienen privados de principio a fin.',
    toolName: 'Imagen a PDF',
    benefits: [
      'Combine una o muchas imágenes en un solo archivo PDF',
      'Combine varias imágenes en un documento profesional',
      'Compatible con JPG, PNG, WEBP y otros tipos comunes',
      'Resultados rápidos sin instalar Adobe ni utilidades de escritorio',
      'Uso gratuito e ilimitado sin cuenta',
    ],
    useCases: [
      {
        title: 'Enviar informes de gastos y recibos',
        body: 'Los equipos financieros suelen exigir adjuntos PDF en lugar de fotos sueltas. Fotografíe recibos con el móvil, transfiéralos al ordenador y únalos en un PDF organizado para sistemas de reembolso — sin exponer detalles de compra a conversores de terceros.',
      },
      {
        title: 'Archivar documentos escaneados y notas',
        body: 'Sesiones en pizarra, notas manuscritas y contratos en papel capturados como imágenes pueden compilarse en un archivo PDF único. Estudiantes, investigadores y asistentes legales preservan originales y facilitan el envío por correo y el almacenamiento.',
      },
      {
        title: 'Crear portafolios visuales y propuestas',
        body: 'Diseñadores y fotógrafos empaquetan trabajos seleccionados en un PDF listo para el cliente. Cada imagen se convierte en página, creando una presentación ligera que se abre en cualquier dispositivo sin software de galería especializado.',
      },
      {
        title: 'Compartir instrucciones visuales multipágina',
        body: 'Equipos de producto que documentan montaje o departamentos de TI que publican guías con capturas se benefician de un PDF único en lugar de un zip de imágenes. Los destinatarios reciben un adjunto con secuencia clara de páginas.',
      },
      {
        title: 'Enviar documentación de identidad y cumplimiento',
        body:
          'La incorporación de RR. HH. y flujos KYC frecuentemente exigen paquetes PDF construidos a partir de identificaciones fotografiadas, facturas de servicios y declaraciones firmadas. Ensamblar esas imágenes localmente en un PDF evita subir documentos emitidos por el gobierno a servidores de conversión desconocidos mientras cumple requisitos de carga en portales.',
      },
    ],
    howItWorks: [
      'Vaya a Imagen a PDF y seleccione las imágenes que desea incluir.',
      'Ordene los archivos si la herramienta lo permite — la primera imagen será la primera página.',
      'Elija opciones como tamaño de página o márgenes cuando estén disponibles.',
      'Genere el PDF localmente y revise la vista previa en su navegador.',
      'Descargue el documento final y compártalo o archívelo según necesite.',
    ],
    tips: [
      'Recorte fotos antes de convertir para eliminar fondos innecesarios alrededor de documentos.',
      'En escaneos con mucho texto, use imágenes de mayor resolución para mantener caracteres nítidos en la página PDF.',
      'Mantenga orientación consistente — rote imágenes antes si las páginas aparecen de lado.',
      'Nombre los PDF descargados de forma descriptiva para que los destinatarios entiendan el contenido.',
      'Combine con Redimensionar Imagen si el tamaño debe quedar bajo el límite de adjuntos.',
      'Use el Conversor de Imágenes primero si las fuentes están en formatos poco comunes como BMP o exportaciones TIFF.',
    ],
    sections: [
      {
        id: 'por-que-pdf',
        heading: '¿Por qué convertir imágenes a PDF?',
        level: 2,
        paragraphs: [
          'PDF es el formato universal de intercambio de documentos. A diferencia de archivos de imagen sin procesar, un PDF presenta páginas en diseño fijo que se ve igual en móviles, tablets e impresoras. Organizaciones, escuelas y portales gubernamentales frecuentemente exigen PDF porque el formato es más difícil de editar accidentalmente y más fácil de archivar.',
          'Cuando tiene varias imágenes relacionadas — como páginas de un contrato firmado fotografiadas individualmente — unirlas en un PDF simplifica compartir, imprimir y almacenamiento a largo plazo.',
        ],
      },
      {
        id: 'multi-imagen',
        heading: 'Combinar varias imágenes en un documento',
        level: 2,
        paragraphs: [
          'Crear PDF con múltiples imágenes es esencial para flujos que empiezan en cámaras móviles y terminan en envíos formales. Cada imagen suele mapearse a una página PDF en el orden definido — útil para lotes de recibos, ilustraciones de capítulos o mockups secuenciales de interfaz.',
          'Si las imágenes tienen dimensiones distintas, el conversor las escala al diseño estándar manteniendo proporción cuando es posible. Para alineación crítica — como formularios — considere redimensionar antes con la herramienta Redimensionar Imagen.',
        ],
        bullets: [
          'Recibos y facturas para contabilidad',
          'Fotos de tareas en plataformas educativas',
          'Escaneos de identificación para incorporación de RR. HH.',
          'Tutoriales con capturas para documentación de soporte',
        ],
      },
      {
        id: 'privacidad-local',
        heading: 'Procesamiento local para visuales sensibles',
        level: 2,
        paragraphs: [
          'Las imágenes a menudo contienen información personal identificable: rostros, direcciones, números de cuenta y datos médicos. Subirlas a conversores en línea crea exposición innecesaria. PDFWINDOWS mantiene todo el flujo imagen-a-PDF en su equipo usando generación PDF basada en navegador.',
          'El procesamiento local también permite trabajar en redes restringidas o sin conexión una vez cargada la aplicación, apoyando industrias que prohíben transferencias externas de archivos.',
        ],
      },
      {
        id: 'flujo-imagen-pdf',
        heading: 'Imagen a PDF en el flujo de documentos',
        level: 3,
        paragraphs: [
          'Imagen a PDF frecuentemente sigue captura y limpieza: convierta formatos con Conversor de Imágenes, mejore escaneos con Filtros de Imagen, redimensione para consistencia y compile páginas. Tras crear el PDF, use Unir PDF para combinar con cartas de presentación, Comprimir PDF para límites de correo o Contraseña PDF para control de distribución.',
        ],
        bullets: [
          'Redimensionar Imagen — dimensiones uniformes de página antes del PDF',
          'Unir PDF — añada portadas o adjunte PDFs relacionados',
          'Comprimir PDF — reduzca PDFs pesados en imagen para compartir',
        ],
      },
    ],
    faq: [
      ...privacyFaq('es'),
      {
        q: '¿Cuántas imágenes puedo añadir a un PDF?',
        a: 'Puede incluir varias imágenes en una sola sesión. Cada imagen normalmente se convierte en su propia página — ideal para escaneos multipágina y colecciones de fotos.',
      },
      {
        q: '¿Qué formatos de imagen son compatibles?',
        a: 'Formatos comunes como JPG, PNG y WEBP son compatibles. Use el Conversor de Imágenes primero si necesita cambiar un formato poco común.',
      },
      {
        q: '¿La calidad del PDF coincidirá con mis fotos originales?',
        a: 'La calidad de salida depende de la resolución de origen. Imágenes de alta resolución producen páginas nítidas; fotos muy comprimidas pueden verse más suaves al imprimir en grande.',
      },
      {
        q: '¿Puedo usarlo para envíos oficiales de documentos?',
        a: 'Muchas instituciones aceptan PDFs creados a partir de fotos o escaneos claros. Verifique requisitos específicos — tamaño máximo, capa de texto OCR — con la organización receptora.',
      },
    ],
    relatedTools: ['/image-converter', '/image-resize', '/pdf-merge', '/txt-to-pdf'],
    cta: defaultCta('es', 'Imagen a PDF'),
  },
};
