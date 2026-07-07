import type { ToolRichContent } from '../types';
import { privacyFaq, defaultCta } from '../helpers';

export const PDF_OCR_CONTENT: Record<'en' | 'pt' | 'es', ToolRichContent> = {
  en: {
    title: 'PDF OCR Online Offline | PDFWINDOWS',
    description:
      'Extract searchable text from scanned PDFs in your browser with local OCR. Turn image-only pages into editable, copyable content — no cloud upload, full privacy.',
    keywords:
      'pdf ocr, scanned pdf to text, offline ocr pdf, searchable pdf browser, recognize text pdf free',
    h1: 'PDF OCR — Searchable Text',
    intro:
      'A scanned contract looks like a PDF but behaves like a stack of photographs: you cannot search for a clause, copy a paragraph, or paste figures into a spreadsheet. Optical Character Recognition rebuilds a text layer from those page images so standard readers regain find-and-select behavior. Cloud OCR services demand that you upload entire documents — unacceptable when pages contain medical histories, unreleased filings, or personal identifiers. PDFWINDOWS runs OCR locally in your browser, processing each page on your device and returning extracted text or a searchable PDF without transmitting bytes to conversion servers.',
    toolName: 'PDF OCR',
    benefits: [
      'OCR runs entirely in your browser',
      'Multilingual recognition for mixed-language documents',
      'Ideal for digitized archives and mobile photo scans',
      'No account, queue, or email delivery step',
      'Pairs with extract-text and compress for full workflows',
    ],
    useCases: [
      {
        title: 'Digitizing paper archives',
        body:
          'Libraries, law offices, and municipal records departments scan decades of paper into image-only PDFs. OCR converts those batches into searchable files so staff can locate names, dates, and case numbers without manually flipping through thousands of pages.',
      },
      {
        title: 'Invoice and receipt processing',
        body:
          'Accounts payable teams receive vendor PDFs that are really phone photos of receipts. Local OCR pulls line items and totals into text you can paste into ERP systems, while keeping supplier pricing off third-party OCR logs.',
      },
      {
        title: 'Academic and research workflows',
        body:
          'Researchers quote passages from scanned journals and historical sources. OCR lets them copy citations accurately instead of retyping, and keeps unpublished manuscript scans private on the laptop that captured them.',
      },
      {
        title: 'Accessibility and screen readers',
        body:
          'Image-only PDFs fail accessibility audits because assistive technology cannot read pixels as words. Adding a text layer through browser OCR improves compliance for internal handouts and customer-facing documentation.',
      },
      {
        title: 'Multilingual correspondence',
        body:
          'Immigration packets, international contracts, and support tickets often mix languages on scanned forms. OCR with multilingual support extracts text from each section so translators and reviewers can work from selectable content rather than screenshots.',
      },
    ],
    howItWorks: [
      'Upload a scanned or image-based PDF to the OCR tool.',
      'Select PDF OCR from the processing menu.',
      'The browser analyzes each page and recognizes characters locally.',
      'Download extracted text or a searchable PDF output.',
    ],
    tips: [
      'Higher scan resolution improves recognition — 300 DPI is a practical target for small text.',
      'Straighten skewed pages with rotate before OCR for better line detection.',
      'Clean smudges and creases at scan time; OCR cannot infer letters hidden under stains.',
      'For native text PDFs, use Extract Text instead — OCR is slower and unnecessary when a text layer already exists.',
      'Compress after OCR if the searchable output is large and destined for email.',
      'Verify critical numbers and names manually — OCR can confuse similar characters like 0/O and 1/l.',
    ],
    sections: [
      {
        id: 'ocr-vs-extract',
        heading: 'OCR versus extracting existing text',
        level: 2,
        paragraphs: [
          'Not every PDF needs OCR. Files exported from Word, Excel, or InDesign already embed selectable text. Running OCR on them wastes time and may introduce errors. OCR targets pages that are fundamentally images: flatbed scans, phone photos, and fax captures.',
          'If you can highlight a sentence in your reader without selecting a whole-page image box, the file likely has a text layer already. Use Extract Text for those documents and reserve OCR for true scans.',
        ],
      },
      {
        id: 'how-local-ocr-works',
        heading: 'How local OCR processes a page',
        level: 2,
        paragraphs: [
          'OCR engines segment each page into lines and glyphs, then match shapes against trained character models. Language hints steer the model toward expected alphabets and dictionaries. Because PDFWINDOWS executes this in the browser, each page image is decoded in memory, processed, and discarded — nothing is persisted on remote disks.',
          'Processing time scales with page count and resolution. A twenty-page scan on a modern laptop typically finishes in minutes rather than the upload-plus-queue cycle of cloud services.',
        ],
        bullets: [
          'Page segmentation — locate text blocks and reading order.',
          'Character recognition — map glyphs to Unicode characters.',
          'Output assembly — build plain text or embed a hidden text layer in PDF.',
        ],
      },
      {
        id: 'accuracy-factors',
        heading: 'What affects OCR accuracy',
        level: 2,
        paragraphs: [
          'Crisp black text on white paper OCRs well. Handwriting, decorative fonts, low contrast, and heavy JPEG compression degrade results. Tables and multi-column layouts may need manual cleanup after extraction because reading order is harder to infer than on single-column letters.',
        ],
      },
      {
        id: 'ocr-workflow',
        heading: 'Building a scan-to-search workflow',
        level: 2,
        paragraphs: [
          'A practical pipeline starts with capture: scan or photograph pages as straight and bright as possible. Rotate misaligned pages, run OCR, then compress if file size matters. Password-protect the finished searchable PDF before sharing externally. Extract Text can pull the recognized content into a plain file for editing in Word or code editors.',
        ],
        bullets: [
          'Rotate — fix orientation before recognition.',
          'OCR — add searchable text to image pages.',
          'Compress — shrink the output for attachments.',
          'Extract Text — export recognized content as plain text.',
        ],
      },
    ],
    faq: [
      ...privacyFaq('en'),
      {
        q: 'Does OCR work on handwritten notes?',
        a: 'Handwriting recognition is far less reliable than printed text. Expect partial results and plan manual correction for cursive or messy notes.',
      },
      {
        q: 'Will OCR preserve the original page images?',
        a: 'Depending on output mode, you may get a searchable PDF that keeps the visual scan underneath an invisible text layer, or plain extracted text only. Choose based on whether recipients need the original appearance.',
      },
      {
        q: 'Which languages are supported?',
        a: 'Common Latin-alphabet languages and several others are supported through multilingual models. Mixed-language pages work best when the dominant language is clear.',
      },
      {
        q: 'Can I OCR password-protected PDFs?',
        a: 'The source must be decryptable in your browser. Enter the password first so page images can be read for recognition.',
      },
      {
        q: 'How is this different from Image OCR?',
        a: 'PDF OCR handles multi-page documents in one file. Image OCR targets single image files such as JPG or PNG captures.',
      },
    ],
    relatedTools: ['/pdf-extract-text', '/image-ocr', '/pdf-rotate'],
    cta: defaultCta('en', 'PDF OCR'),
  },
  pt: {
    title: 'OCR de PDF Online Offline | PDFWINDOWS',
    description:
      'Extraia texto pesquisável de PDFs digitalizados no navegador com OCR local. Transforme páginas só-imagem em conteúdo editável.',
    keywords:
      'ocr pdf, pdf digitalizado para texto, ocr offline pdf, reconhecer texto pdf navegador, pdf pesquisável gratis',
    h1: 'OCR de PDF — Texto Pesquisável',
    intro:
      'Um contrato escaneado parece PDF mas se comporta como pilha de fotos: não dá para buscar cláusulas, copiar parágrafos ou colar números em planilhas. O reconhecimento óptico de caracteres reconstrói uma camada de texto a partir das imagens para que leitores voltem a ter busca e seleção. Serviços de OCR na nuvem exigem enviar o documento inteiro — inaceitável quando há histórico médico, processos não públicos ou dados pessoais. O PDFWINDOWS executa OCR localmente no navegador, processa cada página no dispositivo e devolve texto extraído ou PDF pesquisável sem transmitir bytes a servidores.',
    toolName: 'OCR de PDF',
    benefits: [
      'OCR no dispositivo — conteúdo escaneado nunca é enviado',
      'Reconhecimento multilíngue para documentos mistos',
      'Ideal para arquivos digitalizados e fotos de celular',
      'Sem conta, fila ou entrega por e-mail',
      'Combina com extrair texto e comprimir em fluxos completos',
    ],
    useCases: [
      {
        title: 'Digitalização de arquivos em papel',
        body:
          'Bibliotecas, escritórios de advocacia e prefeituras escaneiam décadas de papel em PDFs só-imagem. OCR transforma lotes em arquivos pesquisáveis para localizar nomes, datas e números de processo sem folhear milhares de páginas manualmente.',
      },
      {
        title: 'Processamento de faturas e recibos',
        body:
          'Contas a pagar recebem PDFs que são fotos de recibos. OCR local extrai itens e totais para colar em ERPs, mantendo preços de fornecedores fora de logs de OCR de terceiros.',
      },
      {
        title: 'Fluxos acadêmicos e de pesquisa',
        body:
          'Pesquisadores citam trechos de periódicos e fontes históricas escaneadas. OCR permite copiar citações com precisão em vez de redigitar, mantendo manuscritos não publicados privados no notebook.',
      },
      {
        title: 'Acessibilidade e leitores de tela',
        body:
          'PDFs só-imagem reprovam em auditorias de acessibilidade porque tecnologia assistiva não lê pixels como palavras. Adicionar camada de texto via OCR no navegador melhora conformidade em materiais internos e para clientes.',
      },
      {
        title: 'Correspondência multilíngue',
        body:
          'Pacotes de imigração, contratos internacionais e tickets de suporte misturam idiomas em formulários escaneados. OCR multilíngue extrai texto de cada seção para tradutores trabalharem com conteúdo selecionável, não capturas de tela.',
      },
    ],
    howItWorks: [
      'Envie um PDF escaneado ou baseado em imagem à ferramenta OCR.',
      'Selecione OCR de PDF no menu de processamento.',
      'O navegador analisa cada página e reconhece caracteres localmente.',
      'Baixe texto extraído ou PDF pesquisável.',
    ],
    tips: [
      'Resolução maior melhora reconhecimento — 300 DPI é meta prática para texto pequeno.',
      'Endireite páginas tortas com rotacionar antes do OCR.',
      'Limpe manchas na digitalização; OCR não infere letras sob sujeira.',
      'Em PDFs com texto nativo, use Extrair Texto — OCR é mais lento e desnecessário.',
      'Comprima após OCR se o resultado for grande para e-mail.',
      'Confira números e nomes críticos manualmente — OCR confunde 0/O e 1/l.',
    ],
    sections: [
      {
        id: 'ocr-vs-extract',
        heading: 'OCR versus extrair texto existente',
        level: 2,
        paragraphs: [
          'Nem todo PDF precisa de OCR. Arquivos exportados de Word, Excel ou InDesign já têm texto selecionável. Rodar OCR neles desperdiça tempo e pode introduzir erros. OCR é para páginas que são imagens: scans de mesa, fotos de celular e fax.',
          'Se você destaca uma frase no leitor sem selecionar a página inteira como imagem, provavelmente já há camada de texto. Use Extrair Texto nesses casos e reserve OCR para scans verdadeiros.',
        ],
      },
      {
        id: 'how-local-ocr-works',
        heading: 'Como o OCR local processa uma página',
        level: 2,
        paragraphs: [
          'Motores OCR segmentam cada página em linhas e glifos e comparam formas a modelos treinados. Dicas de idioma orientam o modelo. Como o PDFWINDOWS executa no navegador, cada imagem é decodificada na memória, processada e descartada — nada persiste em discos remotos.',
          'O tempo escala com páginas e resolução. Um scan de vinte páginas em notebook moderno costuma terminar em minutos, sem fila de upload na nuvem.',
        ],
        bullets: [
          'Segmentação — localizar blocos de texto e ordem de leitura.',
          'Reconhecimento — mapear glifos para caracteres Unicode.',
          'Montagem — gerar texto puro ou camada oculta no PDF.',
        ],
      },
      {
        id: 'accuracy-factors',
        heading: 'O que afeta a precisão do OCR',
        level: 2,
        paragraphs: [
          'Texto preto nítido em papel branco funciona bem. Caligrafia, fontes decorativas, baixo contraste e JPEG pesado pioram resultados. Tabelas e colunas múltiplas podem exigir limpeza manual porque a ordem de leitura é mais difícil de inferir.',
          'Documentos bilíngues com notas de rodapé em fonte menor exigem revisão humana após OCR — números de artigo e citações legais são os campos que mais falham e devem ser conferidos página a página antes de arquivar.',
        ],
      },
      {
        id: 'ocr-workflow',
        heading: 'Montando fluxo de scan para busca',
        level: 2,
        paragraphs: [
          'Pipeline prático: capture páginas retas e claras; rotacione desalinhamentos; rode OCR; comprima se tamanho importar; proteja com senha antes de compartilhar. Extrair Texto pode exportar conteúdo reconhecido para Word ou editores.',
          'Em contratos digitalizados de décadas passadas, a qualidade do papel e manchas de tinta reduzem a confiança do OCR. Processe localmente amostras de cada lote e ajuste DPI de digitalização antes de indexar milhares de páginas — sem enviar o acervo inteiro a um serviço de reconhecimento remoto.',
        ],
        bullets: [
          'Rotacionar — corrigir orientação antes do reconhecimento.',
          'OCR — adicionar texto pesquisável a páginas imagem.',
          'Comprimir — reduzir saída para anexos.',
          'Extrair Texto — exportar como texto puro.',
        ],
      },
    ],
    faq: [
      ...privacyFaq('pt'),
      {
        q: 'OCR funciona em notas manuscritas?',
        a: 'Reconhecimento de caligrafia é bem menos confiável que texto impresso. Espere resultados parciais e correção manual para cursiva ou rabiscos.',
      },
      {
        q: 'O OCR preserva as imagens originais das páginas?',
        a: 'Conforme o modo de saída, você pode obter PDF pesquisável com scan visual sob camada de texto invisível, ou só texto extraído. Escolha se destinatários precisam da aparência original.',
      },
      {
        q: 'Quais idiomas são suportados?',
        a: 'Idiomas comuns em alfabeto latino e vários outros via modelos multilíngues. Páginas mistas funcionam melhor quando o idioma dominante é claro.',
      },
      {
        q: 'Posso fazer OCR em PDFs com senha?',
        a: 'A origem precisa ser descriptografável no navegador. Informe a senha primeiro para ler as imagens das páginas.',
      },
      {
        q: 'Qual a diferença para OCR de Imagem?',
        a: 'OCR de PDF trata documentos multipágina em um arquivo. OCR de Imagem foca arquivos JPG ou PNG isolados.',
      },
    ],
    relatedTools: ['/pdf-extract-text', '/image-ocr', '/pdf-rotate'],
    cta: defaultCta('pt', 'OCR de PDF'),
  },
  es: {
    title: 'OCR PDF en Línea Gratis | PDFWINDOWS',
    description:
      'Extraiga texto buscable de PDF escaneados en el navegador con OCR local. Convierta páginas solo-imagen en contenido editable — sin subida, privacidad total.',
    keywords:
      'ocr pdf, pdf escaneado a texto, ocr offline pdf, reconocer texto pdf navegador, pdf buscable gratis',
    h1: 'OCR de PDF — Texto Buscable',
    intro:
      'Un contrato escaneado parece PDF pero se comporta como una pila de fotos: no puede buscar cláusulas, copiar párrafos ni pegar cifras en hojas de cálculo. El reconocimiento óptico de caracteres reconstruye una capa de texto desde las imágenes para que los lectores recuperen búsqueda y selección. Los servicios OCR en la nube exigen subir el documento entero — inaceptable cuando hay historiales médicos, expedientes no públicos o datos personales. PDFWINDOWS ejecuta OCR localmente en su navegador, procesa cada página en el dispositivo y devuelve texto extraído o PDF buscable sin transmitir bytes a servidores.',
    toolName: 'OCR de PDF',
    benefits: [
      'OCR en el dispositivo — el contenido escaneado nunca se sube',
      'Reconocimiento multilingüe para documentos mixtos',
      'Ideal para archivos digitalizados y fotos de móvil',
      'Sin cuenta, cola ni entrega por correo',
      'Combina con extraer texto y comprimir en flujos completos',
    ],
    useCases: [
      {
        title: 'Digitalización de archivos en papel',
        body:
          'Bibliotecas, bufetes y administraciones escanean décadas de papel en PDF solo-imagen. OCR convierte lotes en archivos buscables para localizar nombres, fechas y números de expediente sin hojear miles de páginas manualmente.',
      },
      {
        title: 'Procesamiento de facturas y recibos',
        body:
          'Cuentas por pagar reciben PDF que son fotos de recibos. OCR local extrae partidas y totales para pegar en ERP, manteniendo precios de proveedores fuera de registros OCR de terceros.',
      },
      {
        title: 'Flujos académicos e investigación',
        body:
          'Investigadores citan pasajes de revistas y fuentes históricas escaneadas. OCR permite copiar citas con precisión en lugar de reescribir, manteniendo manuscritos no publicados privados en el portátil.',
      },
      {
        title: 'Accesibilidad y lectores de pantalla',
        body:
          'Los PDF solo-imagen fallan auditorías de accesibilidad porque la tecnología asistiva no lee píxeles como palabras. Añadir capa de texto vía OCR en el navegador mejora el cumplimiento en materiales internos y para clientes.',
      },
      {
        title: 'Correspondencia multilingüe',
        body:
          'Paquetes de inmigración, contratos internacionales y tickets de soporte mezclan idiomas en formularios escaneados. OCR multilingüe extrae texto de cada sección para que traductores trabajen con contenido seleccionable, no capturas.',
      },
    ],
    howItWorks: [
      'Suba un PDF escaneado o basado en imagen a la herramienta OCR.',
      'Seleccione OCR de PDF en el menú de procesamiento.',
      'El navegador analiza cada página y reconoce caracteres localmente.',
      'Descargue texto extraído o PDF buscable.',
    ],
    tips: [
      'Mayor resolución mejora el reconocimiento — 300 DPI es meta práctica para texto pequeño.',
      'Enderece páginas torcidas con rotar antes del OCR.',
      'Limpie manchas al escanear; OCR no infiere letras bajo suciedad.',
      'En PDF con texto nativo, use Extraer Texto — OCR es más lento e innecesario.',
      'Comprima tras OCR si el resultado es grande para correo.',
      'Verifique números y nombres críticos manualmente — OCR confunde 0/O y 1/l.',
    ],
    sections: [
      {
        id: 'ocr-vs-extract',
        heading: 'OCR frente a extraer texto existente',
        level: 2,
        paragraphs: [
          'No todo PDF necesita OCR. Archivos exportados de Word, Excel o InDesign ya tienen texto seleccionable. Ejecutar OCR en ellos desperdicia tiempo y puede introducir errores. OCR es para páginas que son imágenes: escaneos de mesa, fotos de móvil y fax.',
          'Si puede resaltar una frase en el lector sin seleccionar la página entera como imagen, probablemente ya hay capa de texto. Use Extraer Texto en esos casos y reserve OCR para escaneos verdaderos.',
        ],
      },
      {
        id: 'how-local-ocr-works',
        heading: 'Cómo el OCR local procesa una página',
        level: 2,
        paragraphs: [
          'Los motores OCR segmentan cada página en líneas y glifos y comparan formas con modelos entrenados. Las pistas de idioma orientan el modelo. Al ejecutarse en el navegador, cada imagen se decodifica en memoria, procesa y descarta — nada persiste en discos remotos.',
          'El tiempo escala con páginas y resolución. Un escaneo de veinte páginas en portátil moderno suele terminar en minutos, sin cola de subida en la nube.',
        ],
        bullets: [
          'Segmentación — localizar bloques de texto y orden de lectura.',
          'Reconocimiento — mapear glifos a caracteres Unicode.',
          'Montaje — generar texto plano o capa oculta en PDF.',
        ],
      },
      {
        id: 'accuracy-factors',
        heading: 'Qué afecta la precisión del OCR',
        level: 2,
        paragraphs: [
          'Texto negro nítido en papel blanco funciona bien. Caligrafía, fuentes decorativas, bajo contraste y JPEG pesado empeoran resultados. Tablas y columnas múltiples pueden requerir limpieza manual porque el orden de lectura es más difícil de inferir.',
        ],
      },
      {
        id: 'ocr-workflow',
        heading: 'Construir un flujo de escaneo a búsqueda',
        level: 2,
        paragraphs: [
          'Pipeline práctico: capture páginas rectas y claras; rote desalineaciones; ejecute OCR; comprima si importa el tamaño; proteja con contraseña antes de compartir. Extraer Texto puede exportar contenido reconocido a Word o editores.',
          'En contratos escaneados de décadas pasadas, la calidad del papel y manchas de tinta reducen la confianza del OCR. Procese localmente muestras de cada lote y ajuste DPI de escaneo antes de indexar miles de páginas — sin enviar el archivo entero a un servicio de reconocimiento remoto.',
        ],
        bullets: [
          'Rotar — corregir orientación antes del reconocimiento.',
          'OCR — añadir texto buscable a páginas imagen.',
          'Comprimir — reducir salida para adjuntos.',
          'Extraer Texto — exportar como texto plano.',
        ],
      },
    ],
    faq: [
      ...privacyFaq('es'),
      {
        q: '¿Funciona OCR en notas manuscritas?',
        a: 'El reconocimiento de caligrafía es mucho menos fiable que texto impreso. Espere resultados parciales y corrección manual para cursiva o garabatos.',
      },
      {
        q: '¿El OCR conserva las imágenes originales de las páginas?',
        a: 'Según el modo de salida, puede obtener PDF buscable con escaneo visual bajo capa de texto invisible, o solo texto extraído. Elija si los destinatarios necesitan la apariencia original.',
      },
      {
        q: '¿Qué idiomas se admiten?',
        a: 'Idiomas comunes en alfabeto latino y varios más vía modelos multilingües. Páginas mixtas funcionan mejor cuando el idioma dominante es claro.',
      },
      {
        q: '¿Puedo hacer OCR en PDF con contraseña?',
        a: 'El origen debe poder descifrarse en el navegador. Introduzca la contraseña primero para leer las imágenes de las páginas.',
      },
      {
        q: '¿En qué se diferencia de OCR de Imagen?',
        a: 'OCR de PDF trata documentos multipágina en un archivo. OCR de Imagen se centra en archivos JPG o PNG sueltos.',
      },
    ],
    relatedTools: ['/pdf-extract-text', '/image-ocr', '/pdf-rotate'],
    cta: defaultCta('es', 'OCR de PDF'),
  },
};
