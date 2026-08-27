import type { ToolRichContent } from '../types';
import { privacyFaq, defaultCta } from '../helpers';

export const TXT_TO_PDF_CONTENT: Record<'en' | 'pt' | 'es', ToolRichContent> = {
  en: {
    title: 'Document Converter Online Offline | PDFWINDOWS',
    description:
      'Convert Word, PDF, TXT, and Excel in your browser. Identify the extension, pick a target format, and download locally — free, private, and no upload.',
    keywords:
      'document converter, word to pdf offline, excel to csv browser, txt to pdf local, convert docx html rtf odt',
    h1: 'Document Converter',
    intro:
      'Teams still bounce the same file through Word, PDF, spreadsheets, and plain text because each system demands a different container. Cloud converters solve that by copying the whole document to someone else’s server — a bad trade for contracts, payroll sheets, and meeting notes. PDFWINDOWS Document Converter stays in the browser: upload a file, read the extension, list the output formats that can actually be produced locally, then download the result. Word OOXML packages, PDFs with a text layer, UTF-8 text, OpenDocument, RTF, HTML, and Excel workbooks, and PowerPoint PPTX decks are identified up front so you choose a destination instead of guessing which single-purpose tool to open.',
    toolName: 'Document Converter',
    benefits: [
      'Identifies the uploaded extension before listing conversion targets',
      'Word, PDF, TXT, and Excel routes in one local workspace',
      'No mandatory upload — bytes stay on the device',
      'Grouped destinations: Word, universal documents, web, data, and images',
      'Works offline after the page loads',
    ],
    useCases: [
      {
        title: 'Turn a Word draft into a shareable PDF',
        body:
          'Legal and operations teams receive .docx edits that portals only accept as PDF. Local conversion extracts the document text and paginates it without sending the draft to a third-party renderer.',
      },
      {
        title: 'Export spreadsheet rows for scripts',
        body:
          'Finance exports an .xlsx that a local script expects as CSV or JSON. The converter reads sheet cells in the browser so account numbers never hit an online parsing API.',
      },
      {
        title: 'Recover text from a digital PDF',
        body:
          'When a PDF already has a text layer, you can export TXT, DOCX, HTML, or RTF for editing. Scanned image-only PDFs should go through PDF OCR first — this tool will not invent text that is not in the file.',
      },
      {
        title: 'Package plain notes for email',
        body:
          'Shift logs and README drafts still arrive as .txt. Converting to PDF or DOCX locally produces a fixed attachment without pasting internal hostnames into a cloud “text to PDF” form.',
      },
      {
        title: 'Hand off HTML copies of internal memos',
        body:
          'Some wikis and ticketing tools prefer HTML. The converter wraps extracted paragraphs in a simple page you can archive or paste, still generated on-device.',
      },
    ],
    howItWorks: [
      'Upload a Word, PDF, TXT, Excel, PowerPoint, ODT, RTF, or HTML file.',
      'The tool identifies the extension and document family.',
      'Choose an available output format from the grouped list.',
      'Conversion runs locally in the browser.',
      'Download the generated file (or a ZIP of page images).',
    ],
    tips: [
      'Save legacy .doc files as .docx in Word or LibreOffice before converting — binary OLE files cannot be decoded here.',
      'Macros in .docm are not executed; saving as .docx drops VBA rather than preserving it.',
      'Layout, headers, floating images, and exact fonts are not reproduced — this is a content conversion, not a print replica.',
      'UTF-8 source files keep accents; re-save legacy ANSI logs before generating PDF.',
      'Use PDF OCR when a PDF has no extractable text layer.',
      'Pair the output with Protect PDF if the converted file will leave your network.',
      'For designed letters and contracts, use Document Studio instead of round-tripping extracted text.',
      'Large workbooks may produce long HTML tables — split sheets if the browser slows down.',
      'JPEG and PNG exports rasterize pages; they are snapshots, not editable typography.',
    ],
    sections: [
      {
        id: 'identify-then-convert',
        heading: 'Identify the extension, then pick a real destination',
        level: 2,
        paragraphs: [
          'The converter does not assume every file is TXT. A .docx package, a PDF, a CSV, and an .xlsx workbook expose different internals, so the destination list changes after identification. Two Liberation-style Word files can still be converted independently; the UI never hides a target just because the display name looks familiar.',
          'Targets that Microsoft Word can write on the desktop — binary .doc, Works .wps, XPS, or single-file MHTML — are omitted when the browser cannot produce a valid file. Showing a fake .doc download would be worse than listing fewer honest options.',
        ],
      },
      {
        id: 'word-pdf-txt-excel',
        heading: 'What Word, PDF, text, and Excel can become',
        level: 2,
        paragraphs: [
          'Word OOXML (.docx, .dotx, .docm, .dotm) yields PDF, TXT, RTF, ODT, HTML, XML, and page images. PDF with a text layer yields the same family of editable outputs plus JPEG/PNG page renders. Plain text still becomes PDF, Word, HTML, RTF, and ODT. Spreadsheets become CSV, JSON, HTML tables, TXT, and PDF text tables. PowerPoint PPTX yields PDF, TXT, HTML, and page images from slide text — not a visual clone of the deck.',
          'Image exports go through a local page render. If the source is not already PDF, the tool paginates extracted text first, then rasterizes. That is useful for previews and tickets, not for pixel-perfect brand layouts.',
        ],
        bullets: [
          'Word — content from word/document.xml, not a full layout engine',
          'PDF — text layer only unless you run OCR separately',
          'Excel — cell values from the workbook, formulas are not recalculated',
          'PowerPoint — slide text only, not a visual clone of the deck',
        ],
      },
      {
        id: 'privacy-local-docs',
        heading: 'Why local document conversion protects sensitive files',
        level: 2,
        paragraphs: [
          'Contracts, salary workbooks, and incident notes are exactly the files people paste into random online converters. PDFWINDOWS never needs those bytes on a server: parsing, pagination, and packaging happen in the current browser session. Close the tab and the working copies disappear with it.',
        ],
      },
      {
        id: 'document-converter-workflow',
        heading: 'Where Document Converter sits in your workflow',
        level: 2,
        paragraphs: [
          'Typical path: identify fonts or inspect a file with File X-Ray, convert here to the format a portal accepts, then merge, watermark, or password-protect. Extract Text remains the dedicated PDF OCR-aware extractor when you need searchable reconstruction of scans.',
        ],
        bullets: [
          'PDF Extract Text — hybrid text layer plus OCR for scans',
          'Merge PDF — combine converted PDFs into one packet',
          'Protect PDF — add an open password before external sharing',
        ],
      },
    ],
    faq: [
      ...privacyFaq('en'),
      {
        q: 'Does this still convert TXT to PDF?',
        a: 'Yes. Plain text remains a first-class source. After upload you will see PDF among the destinations, along with Word, HTML, RTF, and other formats the browser can generate.',
      },
      {
        q: 'Can I convert old .doc files?',
        a: 'Not directly. Binary Word 97–2003 files are not OOXML. Save as .docx in Word or LibreOffice, then convert.',
      },
      {
        q: 'Will tables and images from Word look identical?',
        a: 'No. The converter reconstructs textual content. Use a desktop word processor when you need a visual facsimile.',
      },
      {
        q: 'How are Excel formulas handled?',
        a: 'Cached cell values are exported. Formulas are not executed in the browser.',
      },
      {
        q: 'Why are .wps or .xps missing?',
        a: 'Those formats need desktop applications this site does not run. Only destinations that can be produced locally are listed.',
      },
    ],
    relatedTools: ['/pdf-extract-text', '/pdf-merge', '/pdf-password', '/pdf-para-word', '/word-para-pdf'],
    cta: defaultCta('en', 'Document Converter'),
  },
  pt: {
    title: 'Conversor de Documento Online Offline | PDFWINDOWS',
    description:
      'Converta Word, PDF, TXT e Excel no navegador. Identifique a extensão, escolha o destino e baixe o arquivo localmente — grátis, privado e sem upload.',
    keywords:
      'conversor de documento, word para pdf offline, excel para csv navegador, txt para pdf local, converter docx html rtf odt',
    h1: 'Conversor de Documento',
    intro:
      'Equipes ainda fazem o mesmo arquivo circular entre Word, PDF, planilha e texto puro porque cada sistema exige um recipiente diferente. Conversores na nuvem resolvem isso copiando o documento inteiro para o servidor de outra pessoa — um mau negócio para contratos, folhas de pagamento e atas. O Conversor de Documento do PDFWINDOWS permanece no navegador: envie o arquivo, leia a extensão, liste os formatos de saída que de fato podem ser gerados localmente e baixe o resultado. Pacotes Word OOXML, PDFs com camada de texto, texto UTF-8, OpenDocument, RTF, HTML e pastas Excel e decks PowerPoint PPTX são identificados na hora para você escolher o destino em vez de adivinhar qual ferramenta de propósito único abrir.',
    toolName: 'Conversor de Documento',
    benefits: [
      'Identifica a extensão enviada antes de listar destinos',
      'Rotas de Word, PDF, TXT e Excel no mesmo espaço local',
      'Sem upload obrigatório — os bytes ficam no dispositivo',
      'Destinos agrupados: Word, documentos universais, web, dados e imagens',
      'Funciona offline depois que a página carrega',
    ],
    useCases: [
      {
        title: 'Transformar rascunho Word em PDF compartilhável',
        body:
          'Jurídico e operações recebem edições .docx que portais só aceitam como PDF. A conversão local extrai o texto e pagina sem enviar o rascunho a um renderizador de terceiros.',
      },
      {
        title: 'Exportar linhas de planilha para scripts',
        body:
          'Finanças exporta um .xlsx que um script local espera como CSV ou JSON. O conversor lê células no navegador para que números de conta não passem por API de parsing online.',
      },
      {
        title: 'Recuperar texto de PDF digital',
        body:
          'Quando o PDF já tem camada de texto, você exporta TXT, DOCX, HTML ou RTF para editar. PDFs só-imagem devem passar antes pelo OCR de PDF — esta ferramenta não inventa texto que não está no arquivo.',
      },
      {
        title: 'Empacotar notas simples para e-mail',
        body:
          'Logs de turno e rascunhos README ainda chegam como .txt. Converter para PDF ou DOCX localmente produz anexo fixo sem colar hostnames internos em um formulário “texto para PDF” na nuvem.',
      },
      {
        title: 'Entregar cópias HTML de memorandos internos',
        body:
          'Algumas wikis e sistemas de ticket preferem HTML. O conversor envolve parágrafos extraídos em uma página simples que você arquiva ou cola, ainda gerada no dispositivo.',
      },
    ],
    howItWorks: [
      'Envie um arquivo Word, PDF, TXT, Excel, PowerPoint, ODT, RTF ou HTML.',
      'A ferramenta identifica a extensão e a família do documento.',
      'Escolha um formato de saída disponível na lista agrupada.',
      'A conversão roda localmente no navegador.',
      'Baixe o arquivo gerado (ou um ZIP de imagens de página).',
    ],
    tips: [
      'Salve arquivos .doc antigos como .docx no Word ou LibreOffice antes de converter — OLE binário não é decodificado aqui.',
      'Macros em .docm não são executadas; salvar como .docx remove VBA em vez de preservá-lo.',
      'Layout, cabeçalhos, imagens flutuantes e fontes exatas não são reproduzidos — é conversão de conteúdo, não réplica de impressão.',
      'Arquivos UTF-8 mantêm acentos; salve de novo logs ANSI legados antes de gerar PDF.',
      'Use OCR de PDF quando o PDF não tiver camada de texto extraível.',
      'Combine a saída com Proteger PDF se o arquivo convertido sair da sua rede.',
      'Para cartas e contratos diagramados, use o Estúdio de Documentos em vez de reconstruir texto extraído.',
      'Pastas grandes podem gerar tabelas HTML longas — divida planilhas se o navegador ficar lento.',
      'Exportações JPEG e PNG rasterizam páginas; são snapshots, não tipografia editável.',
    ],
    sections: [
      {
        id: 'identificar-depois-converter',
        heading: 'Identifique a extensão e então escolha um destino real',
        level: 2,
        paragraphs: [
          'O conversor não assume que todo arquivo é TXT. Um pacote .docx, um PDF, um CSV e uma pasta .xlsx expõem internos diferentes, então a lista de destinos muda depois da identificação. Dois arquivos Word com o mesmo nome de família ainda são convertidos à parte; a interface não esconde um destino só porque o rótulo parece familiar.',
          'Destinos que o Microsoft Word grava no desktop — .doc binário, Works .wps, XPS ou MHTML de arquivo único — são omitidos quando o navegador não consegue produzir um arquivo válido. Mostrar um falso download .doc seria pior do que listar menos opções honestas.',
        ],
      },
      {
        id: 'word-pdf-txt-excel',
        heading: 'O que Word, PDF, texto e Excel podem virar',
        level: 2,
        paragraphs: [
          'Word OOXML (.docx, .dotx, .docm, .dotm) gera PDF, TXT, RTF, ODT, HTML, XML e imagens de página. PDF com camada de texto gera a mesma família editável mais JPEG/PNG. Texto puro ainda vira PDF, Word, HTML, RTF e ODT. Planilhas viram CSV, JSON, tabelas HTML, TXT e PDF de texto. PowerPoint PPTX gera PDF, TXT, HTML e imagens a partir do texto dos slides — não é um clone visual do deck.',
          'Exportações de imagem passam por renderização local de página. Se a origem ainda não é PDF, a ferramenta pagina o texto extraído e depois rasteriza. Serve para prévia e tickets, não para layout de marca pixel a pixel.',
        ],
        bullets: [
          'Word — conteúdo de word/document.xml, não um motor de layout completo',
          'PDF — só camada de texto, salvo se você rodar OCR à parte',
          'Excel — valores das células; fórmulas não são recalculadas',
          'PowerPoint — só o texto dos slides, não um clone visual do deck',
        ],
      },
      {
        id: 'privacidade-docs-local',
        heading: 'Por que converter documentos localmente protege arquivos sensíveis',
        level: 2,
        paragraphs: [
          'Contratos, planilhas de salário e notas de incidente são exatamente os arquivos que as pessoas colam em conversores online aleatórios. O PDFWINDOWS não precisa desses bytes em servidor: leitura, paginação e empacotamento acontecem na sessão atual do navegador. Feche a aba e as cópias de trabalho desaparecem com ela.',
        ],
      },
      {
        id: 'fluxo-conversor-documento',
        heading: 'Onde o Conversor de Documento entra no fluxo',
        level: 2,
        paragraphs: [
          'Caminho típico: identificar fontes ou inspecionar com Raio X de Arquivo, converter aqui para o formato que o portal aceita, depois mesclar, marcar com marca d\'água ou proteger com senha. Extrair Texto continua sendo o extrator dedicado com OCR quando você precisa reconstruir digitalizações pesquisáveis.',
        ],
        bullets: [
          'Extrair Texto de PDF — camada de texto híbrida mais OCR para scans',
          'Mesclar PDF — juntar PDFs convertidos em um pacote',
          'Proteger PDF — senha de abertura antes de compartilhar fora',
        ],
      },
    ],
    faq: [
      ...privacyFaq('pt'),
      {
        q: 'Ainda converte TXT para PDF?',
        a: 'Sim. Texto puro continua sendo origem de primeira classe. Depois do envio você verá PDF entre os destinos, junto com Word, HTML, RTF e outros formatos que o navegador consegue gerar.',
      },
      {
        q: 'Posso converter arquivos .doc antigos?',
        a: 'Não diretamente. Word 97–2003 binário não é OOXML. Salve como .docx no Word ou LibreOffice e então converta.',
      },
      {
        q: 'Tabelas e imagens do Word ficam idênticas?',
        a: 'Não. O conversor reconstrói o conteúdo textual. Use um processador de texto no desktop quando precisar de fac-símile visual.',
      },
      {
        q: 'Como as fórmulas do Excel são tratadas?',
        a: 'Valores em cache das células são exportados. Fórmulas não são executadas no navegador.',
      },
      {
        q: 'Por que .wps ou .xps não aparecem?',
        a: 'Esses formatos exigem aplicativos desktop que este site não executa. Só entram destinos que dá para produzir localmente.',
      },
    ],
    relatedTools: ['/pdf-extract-text', '/pdf-merge', '/pdf-password', '/pdf-para-word', '/word-para-pdf'],
    cta: defaultCta('pt', 'Conversor de Documento'),
  },
  es: {
    title: 'Convertir Documentos Online Offline | PDFWINDOWS',
    description:
      'Convierta Word, PDF, TXT y Excel en el navegador. Identifique la extensión, elija el destino y descargue localmente — gratis, privado y sin subida.',
    keywords:
      'conversor de documento, word a pdf offline, excel a csv navegador, txt a pdf local, convertir docx html rtf odt',
    h1: 'Conversor de Documento',
    intro:
      'Los equipos siguen haciendo circular el mismo archivo entre Word, PDF, hoja de cálculo y texto plano porque cada sistema exige un contenedor distinto. Los conversores en la nube lo resuelven copiando el documento entero al servidor de otra persona — un mal negocio para contratos, nóminas y actas. El Conversor de Documento de PDFWINDOWS permanece en el navegador: suba el archivo, lea la extensión, liste los formatos de salida que realmente se pueden generar en local y descargue el resultado. Paquetes Word OOXML, PDF con capa de texto, texto UTF-8, OpenDocument, RTF, HTML y libros Excel y presentaciones PowerPoint PPTX se identifican al instante para que elija el destino en lugar de adivinar qué herramienta de un solo propósito abrir.',
    toolName: 'Conversor de Documento',
    benefits: [
      'Identifica la extensión subida antes de listar destinos',
      'Rutas de Word, PDF, TXT y Excel en el mismo espacio local',
      'Sin subida obligatoria — los bytes se quedan en el dispositivo',
      'Destinos agrupados: Word, documentos universales, web, datos e imágenes',
      'Funciona sin conexión después de cargar la página',
    ],
    useCases: [
      {
        title: 'Convertir un borrador Word en PDF compartible',
        body:
          'Jurídico y operaciones reciben ediciones .docx que los portales solo aceptan como PDF. La conversión local extrae el texto y pagina sin enviar el borrador a un renderizador de terceros.',
      },
      {
        title: 'Exportar filas de hoja para scripts',
        body:
          'Finanzas exporta un .xlsx que un script local espera como CSV o JSON. El conversor lee celdas en el navegador para que los números de cuenta no pasen por una API de parsing en línea.',
      },
      {
        title: 'Recuperar texto de un PDF digital',
        body:
          'Cuando el PDF ya tiene capa de texto, puede exportar TXT, DOCX, HTML o RTF para editar. Los PDF solo-imagen deben pasar antes por OCR de PDF — esta herramienta no inventa texto que no está en el archivo.',
      },
      {
        title: 'Empaquetar notas simples para correo',
        body:
          'Registros de turno y borradores README siguen llegando como .txt. Convertir a PDF o DOCX en local produce un adjunto fijo sin pegar hostnames internos en un formulario “texto a PDF” en la nube.',
      },
      {
        title: 'Entregar copias HTML de memorandos internos',
        body:
          'Algunas wikis y sistemas de tickets prefieren HTML. El conversor envuelve párrafos extraídos en una página simple que archiva o pega, aún generada en el dispositivo.',
      },
    ],
    howItWorks: [
      'Suba un archivo Word, PDF, TXT, Excel, PowerPoint, ODT, RTF o HTML.',
      'La herramienta identifica la extensión y la familia del documento.',
      'Elija un formato de salida disponible en la lista agrupada.',
      'La conversión se ejecuta localmente en el navegador.',
      'Descargue el archivo generado (o un ZIP de imágenes de página).',
    ],
    tips: [
      'Guarde archivos .doc antiguos como .docx en Word o LibreOffice antes de convertir — el OLE binario no se descifra aquí.',
      'Las macros en .docm no se ejecutan; guardar como .docx elimina VBA en lugar de conservarlo.',
      'Diseño, encabezados, imágenes flotantes y fuentes exactas no se reproducen — es conversión de contenido, no réplica de impresión.',
      'Los archivos UTF-8 conservan acentos; vuelva a guardar logs ANSI heredados antes de generar PDF.',
      'Use OCR de PDF cuando el PDF no tenga capa de texto extraíble.',
      'Combine la salida con Proteger PDF si el archivo convertido sale de su red.',
      'Para cartas y contratos maquetados, use Estudio de Documentos en lugar de reconstruir texto extraído.',
      'Libros grandes pueden generar tablas HTML largas — divida hojas si el navegador se ralentiza.',
      'Las exportaciones JPEG y PNG rasterizan páginas; son instantáneas, no tipografía editable.',
    ],
    sections: [
      {
        id: 'identificar-luego-convertir',
        heading: 'Identifique la extensión y luego elija un destino real',
        level: 2,
        paragraphs: [
          'El conversor no asume que todo archivo es TXT. Un paquete .docx, un PDF, un CSV y un libro .xlsx exponen internos distintos, así que la lista de destinos cambia después de la identificación. Dos archivos Word con el mismo nombre de familia se convierten por separado; la interfaz no oculta un destino solo porque la etiqueta parece familiar.',
          'Destinos que Microsoft Word escribe en el escritorio — .doc binario, Works .wps, XPS o MHTML de un solo archivo — se omiten cuando el navegador no puede producir un archivo válido. Mostrar una falsa descarga .doc sería peor que listar menos opciones honestas.',
        ],
      },
      {
        id: 'word-pdf-txt-excel',
        heading: 'En qué pueden convertirse Word, PDF, texto y Excel',
        level: 2,
        paragraphs: [
          'Word OOXML (.docx, .dotx, .docm, .dotm) genera PDF, TXT, RTF, ODT, HTML, XML e imágenes de página. Un PDF con capa de texto genera la misma familia editable más JPEG/PNG. El texto plano sigue convirtiéndose en PDF, Word, HTML, RTF y ODT. Las hojas se vuelven CSV, JSON, tablas HTML, TXT y PDF de texto. PowerPoint PPTX genera PDF, TXT, HTML e imágenes a partir del texto de las diapositivas — no es un clon visual del deck.',
          'Las exportaciones de imagen pasan por un render local de página. Si el origen aún no es PDF, la herramienta pagina el texto extraído y luego rasteriza. Sirve para vista previa y tickets, no para un diseño de marca píxel a píxel.',
        ],
        bullets: [
          'Word — contenido de word/document.xml, no un motor de maquetación completo',
          'PDF — solo capa de texto, salvo que ejecute OCR aparte',
          'Excel — valores de celdas; las fórmulas no se recalculan',
          'PowerPoint — solo el texto de las diapositivas, no un clon visual del deck',
        ],
      },
      {
        id: 'privacidad-docs-local',
        heading: 'Por qué convertir documentos en local protege archivos sensibles',
        level: 2,
        paragraphs: [
          'Contratos, hojas de salarios y notas de incidente son exactamente los archivos que la gente pega en conversores en línea aleatorios. PDFWINDOWS no necesita esos bytes en un servidor: lectura, paginación y empaquetado ocurren en la sesión actual del navegador. Cierre la pestaña y las copias de trabajo desaparecen con ella.',
        ],
      },
      {
        id: 'flujo-conversor-documento',
        heading: 'Dónde entra el Conversor de Documento en el flujo',
        level: 2,
        paragraphs: [
          'Ruta típica: identificar fuentes o inspeccionar con Rayos X de Archivo, convertir aquí al formato que el portal acepta, luego unir, marcar con marca de agua o proteger con contraseña. Extraer Texto sigue siendo el extractor dedicado con OCR cuando necesita reconstruir escaneos buscables.',
        ],
        bullets: [
          'Extraer Texto de PDF — capa de texto híbrida más OCR para escaneos',
          'Unir PDF — juntar PDF convertidos en un paquete',
          'Proteger PDF — contraseña de apertura antes de compartir fuera',
        ],
      },
    ],
    faq: [
      ...privacyFaq('es'),
      {
        q: '¿Sigue convirtiendo TXT a PDF?',
        a: 'Sí. El texto plano sigue siendo un origen de primer nivel. Tras subir el archivo verá PDF entre los destinos, junto con Word, HTML, RTF y otros formatos que el navegador puede generar.',
      },
      {
        q: '¿Puedo convertir archivos .doc antiguos?',
        a: 'No de forma directa. Word 97–2003 binario no es OOXML. Guarde como .docx en Word o LibreOffice y luego convierta.',
      },
      {
        q: '¿Las tablas e imágenes de Word quedan idénticas?',
        a: 'No. El conversor reconstruye el contenido textual. Use un procesador de texto de escritorio cuando necesite un facsímil visual.',
      },
      {
        q: '¿Cómo se tratan las fórmulas de Excel?',
        a: 'Se exportan los valores en caché de las celdas. Las fórmulas no se ejecutan en el navegador.',
      },
      {
        q: '¿Por qué no aparecen .wps o .xps?',
        a: 'Esos formatos requieren aplicaciones de escritorio que este sitio no ejecuta. Solo se listan destinos que se pueden producir en local.',
      },
    ],
    relatedTools: ['/pdf-extract-text', '/pdf-merge', '/pdf-password', '/pdf-para-word', '/word-para-pdf'],
    cta: defaultCta('es', 'Conversor de Documento'),
  },
};
