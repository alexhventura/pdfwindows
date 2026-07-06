import type { ToolRichContent } from '../types';
import { privacyFaq, defaultCta } from '../helpers';

export const PDF_TO_IMAGE_CONTENT: Record<'en' | 'pt' | 'es', ToolRichContent> = {
  en: {
    title: 'PDF to Image Online Offline | PDFWINDOWS',
    description:
      'Convert PDF pages to JPG or PNG images in your browser. Export slides, scans, and diagrams locally with no cloud upload — private, fast, and free.',
    keywords:
      'pdf to image, pdf to jpg, pdf to png offline, export pdf pages as images, convert pdf browser free',
    h1: 'Convert PDF to Image',
    intro:
      'Sometimes you need pixels, not pages. Designers pull diagram crops from technical PDFs, teachers export slide thumbnails for LMS thumbnails, and support teams grab a single page as a PNG for chat or ticketing systems that reject attachments. Cloud converters upload your entire document — including confidential financials or unreleased product specs — just to rasterize a few pages. PDFWINDOWS renders PDF pages to images inside your browser: choose format and quality, process locally, and download one image per page or a bundled set without transmitting file contents to third-party servers.',
    toolName: 'PDF to Image',
    benefits: [
      'Export PDF pages as JPG or PNG without server upload',
      'Control output quality for web, print, or OCR prep',
      'Process multi-page documents in one local session',
      'Safe for confidential contracts and internal reports',
      'Works offline after the page loads',
    ],
    useCases: [
      {
        title: 'Slide and presentation thumbnails',
        body:
          'Instructional designers and sales enablement teams need preview images for intranet tiles, course catalogs, and CRM attachments. Converting PDF deck pages to JPG locally avoids exposing unreleased pitch content to random online rasterizers.',
      },
      {
        title: 'Extracting diagrams and figures',
        body:
          'Engineering PDFs embed schematics that must be pasted into Word, Confluence, or bug trackers. Exporting the relevant page as a high-resolution PNG preserves line clarity better than screenshotting a viewer window on a mismatched zoom level.',
      },
      {
        title: 'Social and marketing asset prep',
        body:
          'Marketing copies a product spec table or hero graphic from a print-ready PDF for a blog post. Local conversion keeps embargoed creative and pricing tables off social-media scheduling tools that only accept raster uploads.',
      },
      {
        title: 'Archival page snapshots',
        body:
          'Records teams sometimes freeze individual pages — signed signature pages, notarized forms — as standalone images for case systems that do not ingest PDF. Browser export creates dated PNG evidence without a full document upload pipeline.',
      },
      {
        title: 'OCR and image editing prep',
        body:
          'When a PDF tool chain needs per-page image treatment, export pages first, run Image Filters or Image OCR on problem sheets, then rebuild with Image to PDF. Keeping rasterization local protects scan content through the whole pipeline.',
      },
    ],
    howItWorks: [
      'Upload the PDF you want to convert.',
      'Select PDF to Image from the tool menu.',
      'Choose output format and quality settings if available.',
      'Process locally; the browser renders each page to raster images.',
      'Download images individually or as a batch export.',
    ],
    tips: [
      'Use PNG for diagrams and text-heavy pages; JPG for photo-rich slides.',
      'Higher DPI or quality settings increase file size — match the destination use case.',
      'Rotate misaligned source PDFs before export so images are upright.',
      'For a single page range, split the PDF first to avoid exporting unused pages.',
      'Compare a zoomed export against the source PDF before deleting originals.',
      'Chain with Image Resize if exported files exceed email or portal limits.',
    ],
    sections: [
      {
        id: 'raster-vs-vector',
        heading: 'Raster export versus copying vector PDF content',
        level: 2,
        paragraphs: [
          'PDFs can contain sharp vector text and infinite-zoom line art. Exporting to JPG or PNG flattens each page into a fixed pixel grid — which is what most web and chat platforms require, but you lose selectable text unless you run OCR afterward.',
          'Choose resolution with the end viewer in mind. A 1080p-wide JPG suffices for Slack previews; a 300 DPI PNG may be appropriate when the image will be reprinted or re-OCRed.',
        ],
      },
      {
        id: 'format-choice',
        heading: 'Choosing JPG or PNG output',
        level: 2,
        paragraphs: [
          'PNG uses lossless compression — edges stay crisp on charts, UI screenshots, and scanned forms. JPG applies lossy compression that shrinks photo-heavy pages dramatically but can introduce artifacts around small type.',
        ],
        bullets: [
          'PNG — diagrams, screenshots, pages with flat color blocks',
          'JPG — photography slides, marketing brochures, gradient backgrounds',
          'Test both if unsure — file size and clarity trade off per page',
        ],
      },
      {
        id: 'privacy-local-render',
        heading: 'Why local PDF rendering protects sensitive files',
        level: 2,
        paragraphs: [
          'Online PDF-to-image services receive the full binary file, often process it on shared infrastructure, and may retain copies for debugging or analytics. PDFWINDOWS decodes pages in browser memory and writes images directly to your download folder — no account, no retention policy written by a vendor.',
          'That matters for HR packets, patient education PDFs, and M&A dataroom excerpts where even page count can be sensitive metadata.',
        ],
      },
      {
        id: 'pdf-image-workflow',
        heading: 'PDF to image in a larger workflow',
        level: 2,
        paragraphs: [
          'Export is rarely the last step. Teams rasterize, edit in Image Filters, OCR with Image OCR, and compile back via Image to PDF. Compress the rebuilt PDF for distribution, or watermark stamped drafts before external send.',
          'E-commerce teams export spec-sheet PDFs as PNG for marketplace listings where only raster uploads are allowed. Local conversion keeps wholesale pricing tables and supplier SKUs off image-converter logs while still producing web-ready assets.',
        ],
        bullets: [
          'Image Filters — fix contrast on exported scan pages',
          'Image OCR — recover text from rasterized sheets',
          'Image to PDF — rebuild a document after per-page edits',
        ],
      },
    ],
    faq: [
      ...privacyFaq('en'),
      {
        q: 'Will every page become a separate image?',
        a: 'Yes — each PDF page typically exports as its own JPG or PNG file. Multi-page documents produce multiple downloads unless your session bundles them into an archive format.',
      },
      {
        q: 'Does conversion reduce text quality?',
        a: 'Rasterization fixes resolution. Small text may look soft at low quality settings; increase output resolution for archival or re-print use.',
      },
      {
        q: 'Can I convert password-protected PDFs?',
        a: 'The browser must decrypt the file first. Enter the password so pages can be rendered; processing stays local.',
      },
      {
        q: 'Are transparent backgrounds supported?',
        a: 'Standard PDF pages have opaque backgrounds. PNG exports preserve page appearance as rendered; true transparency depends on source content.',
      },
      {
        q: 'How is this different from screenshotting?',
        a: 'Direct rendering uses the PDF engine at chosen resolution instead of your screen pixels, producing cleaner edges and consistent sizing across pages.',
      },
    ],
    relatedTools: ['/image-to-pdf', '/pdf-split', '/image-resize'],
    cta: defaultCta('en', 'PDF to Image'),
  },
  pt: {
    title: 'PDF para Imagem Online Offline | PDFWINDOWS',
    description:
      'Converta páginas PDF em JPG ou PNG no navegador. Exporte slides, scans e diagramas localmente sem upload — privado, rápido e gratuito.',
    keywords:
      'pdf para imagem, pdf para jpg, pdf para png offline, exportar paginas pdf, converter pdf navegador gratis',
    h1: 'Converter PDF para Imagem',
    intro:
      'Às vezes você precisa de pixels, não de páginas. Designers extraem diagramas de PDFs técnicos, professores exportam miniaturas de slides para LMS e equipes de suporte capturam uma página como PNG para chats que rejeitam anexos PDF. Conversores na nuvem enviam o documento inteiro — incluindo financeiros confidenciais ou specs não lançadas — só para rasterizar algumas páginas. O PDFWINDOWS renderiza páginas PDF em imagens no navegador: escolha formato e qualidade, processe localmente e baixe uma imagem por página sem transmitir conteúdo a servidores de terceiros.',
    toolName: 'PDF para Imagem',
    benefits: [
      'Exporte páginas PDF como JPG ou PNG sem upload',
      'Controle qualidade de saída para web, impressão ou OCR',
      'Processe documentos multipágina em uma sessão local',
      'Seguro para contratos confidenciais e relatórios internos',
      'Funciona offline após carregar a página',
    ],
    useCases: [
      {
        title: 'Miniaturas de slides e apresentações',
        body:
          'Designers instrucionais e vendas precisam de imagens de preview para intranet, catálogos de curso e CRM. Converter páginas de deck em JPG localmente evita expor pitches não lançados a rasterizadores online aleatórios.',
      },
      {
        title: 'Extrair diagramas e figuras',
        body:
          'PDFs de engenharia embutem esquemas que devem ir para Word, Confluence ou trackers de bug. Exportar a página relevante em PNG de alta resolução preserva linhas melhor que capturar a tela do leitor em zoom errado.',
      },
      {
        title: 'Preparar assets para marketing',
        body:
          'Marketing copia tabela de spec ou gráfico hero de PDF pronto para impressão em post de blog. Conversão local mantém criativo sob embargo e tabelas de preço fora de ferramentas de agendamento que só aceitam raster.',
      },
      {
        title: 'Snapshots de página para arquivo',
        body:
          'Equipes de registro às vezes congelam páginas individuais — assinaturas, formulários autenticados — como imagens para sistemas que não ingerem PDF. Export no navegador cria evidência PNG datada sem pipeline de upload do documento completo.',
      },
      {
        title: 'Preparação para OCR e edição de imagem',
        body:
          'Quando o fluxo precisa tratar imagem por página, exporte primeiro, rode Filtros de Imagem ou OCR de Imagem nas folhas problemáticas e remonte com Imagem para PDF. Manter rasterização local protege conteúdo de scan em todo o pipeline.',
      },
    ],
    howItWorks: [
      'Envie o PDF que deseja converter.',
      'Selecione PDF para Imagem no menu de ferramentas.',
      'Escolha formato e configurações de qualidade se disponíveis.',
      'Processe localmente; o navegador renderiza cada página em imagens raster.',
      'Baixe imagens individualmente ou em lote.',
    ],
    tips: [
      'Use PNG para diagramas e páginas com muito texto; JPG para slides com fotos.',
      'DPI ou qualidade maior aumenta tamanho — alinhe ao caso de uso final.',
      'Rotacione PDFs desalinhados antes da exportação para imagens em pé.',
      'Para intervalo específico, divida o PDF antes para não exportar páginas extras.',
      'Compare export ampliado com o PDF fonte antes de apagar originais.',
      'Encadeie com Redimensionar Imagem se arquivos excederem limites de e-mail.',
    ],
    sections: [
      {
        id: 'raster-vs-vetor',
        heading: 'Exportação raster versus copiar conteúdo vetorial',
        level: 2,
        paragraphs: [
          'PDFs podem ter texto vetorial nítido e arte com zoom infinito. Exportar para JPG ou PNG achata cada página em grade fixa de pixels — o que a maioria das plataformas web exige, mas você perde texto selecionável até rodar OCR depois.',
          'Escolha resolução pensando no visualizador final. JPG 1080p basta para preview no Slack; PNG 300 DPI pode servir para reimpressão ou novo OCR.',
        ],
      },
      {
        id: 'escolha-formato',
        heading: 'Escolhendo saída JPG ou PNG',
        level: 2,
        paragraphs: [
          'PNG usa compressão sem perdas — bordas ficam nítidas em gráficos, capturas de UI e formulários escaneados. JPG aplica compressão com perdas que encolhe páginas com fotos mas pode criar artefatos em texto pequeno.',
        ],
        bullets: [
          'PNG — diagramas, capturas, páginas com blocos de cor plana',
          'JPG — slides com fotografia, brochuras, fundos com gradiente',
          'Teste ambos se em dúvida — tamanho e clareza variam por página',
        ],
      },
      {
        id: 'privacidade-render-local',
        heading: 'Por que renderizar PDF localmente protege arquivos sensíveis',
        level: 2,
        paragraphs: [
          'Serviços online de PDF para imagem recebem o binário completo, processam em infraestrutura compartilhada e podem reter cópias para debug ou analytics. O PDFWINDOWS decodifica páginas na memória do navegador e grava imagens na pasta de download — sem conta, sem política de retenção de terceiros.',
          'Isso importa para pacotes de RH, PDFs de educação ao paciente e trechos de dataroom de M&A onde até a contagem de páginas pode ser metadado sensível.',
        ],
      },
      {
        id: 'fluxo-pdf-imagem',
        heading: 'PDF para imagem em um fluxo maior',
        level: 2,
        paragraphs: [
          'Exportar raramente é o último passo. Equipes rasterizam, editam em Filtros de Imagem, fazem OCR com OCR de Imagem e recompõem via Imagem para PDF. Comprima o PDF reconstruído para distribuição ou marque rascunhos com marca d\'água antes do envio externo.',
          'E-commerces exportam fichas técnicas PDF como PNG para marketplaces que só aceitam raster. Conversão local mantém tabelas de preço atacado e SKUs de fornecedor fora de logs de conversores enquanto produz ativos prontos para web.',
        ],
        bullets: [
          'Filtros de Imagem — corrigir contraste em páginas exportadas',
          'OCR de Imagem — recuperar texto de folhas rasterizadas',
          'Imagem para PDF — remontar documento após edições por página',
        ],
      },
    ],
    faq: [
      ...privacyFaq('pt'),
      {
        q: 'Cada página vira uma imagem separada?',
        a: 'Sim — cada página PDF costuma exportar como JPG ou PNG próprio. Documentos multipágina geram vários downloads, salvo se a sessão agrupar em arquivo compactado.',
      },
      {
        q: 'A conversão reduz qualidade do texto?',
        a: 'Rasterização fixa resolução. Texto pequeno pode parecer suave em qualidade baixa; aumente resolução de saída para arquivo ou reimpressão.',
      },
      {
        q: 'Posso converter PDFs com senha?',
        a: 'O navegador precisa descriptografar primeiro. Informe a senha para renderizar páginas; o processamento permanece local.',
      },
      {
        q: 'Fundos transparentes são suportados?',
        a: 'Páginas PDF padrão têm fundo opaco. PNG exporta a aparência renderizada; transparência real depende do conteúdo fonte.',
      },
      {
        q: 'Qual a diferença para captura de tela?',
        a: 'Renderização direta usa o motor PDF na resolução escolhida em vez dos pixels da tela, produzindo bordas mais limpas e tamanho consistente entre páginas.',
      },
    ],
    relatedTools: ['/image-to-pdf', '/pdf-split', '/image-resize'],
    cta: defaultCta('pt', 'PDF para Imagem'),
  },
  es: {
    title: 'PDF a Imagen Online Offline | PDFWINDOWS',
    description:
      'Convierta páginas PDF a JPG o PNG en su navegador. Exporte diapositivas, escaneos y diagramas localmente sin subida — privado, rápido y gratuito.',
    keywords:
      'pdf a imagen, pdf a jpg, pdf a png offline, exportar paginas pdf, convertir pdf navegador gratis',
    h1: 'Convertir PDF a Imagen',
    intro:
      'A veces necesita píxeles, no páginas. Diseñadores extraen diagramas de PDFs técnicos, docentes exportan miniaturas de diapositivas para LMS y equipos de soporte capturan una página como PNG para chats que rechazan adjuntos PDF. Los conversores en la nube suben el documento entero — incluyendo finanzas confidenciales o especificaciones no publicadas — solo para rasterizar unas páginas. PDFWINDOWS renderiza páginas PDF a imágenes en su navegador: elija formato y calidad, procese localmente y descargue una imagen por página sin transmitir contenido a servidores de terceros.',
    toolName: 'PDF a Imagen',
    benefits: [
      'Exporte páginas PDF como JPG o PNG sin subida',
      'Controle calidad de salida para web, impresión u OCR',
      'Procese documentos multipágina en una sesión local',
      'Seguro para contratos confidenciales e informes internos',
      'Funciona sin conexión tras cargar la página',
    ],
    useCases: [
      {
        title: 'Miniaturas de diapositivas y presentaciones',
        body:
          'Diseñadores instruccionales y ventas necesitan imágenes de vista previa para intranet, catálogos de curso y CRM. Convertir páginas de deck a JPG localmente evita exponer pitches no publicados a rasterizadores en línea aleatorios.',
      },
      {
        title: 'Extraer diagramas y figuras',
        body:
          'Los PDF de ingeniería incrustan esquemas que deben ir a Word, Confluence o trackers de errores. Exportar la página relevante en PNG de alta resolución preserva líneas mejor que capturar la pantalla del lector con zoom incorrecto.',
      },
      {
        title: 'Preparar activos de marketing',
        body:
          'Marketing copia tabla de especificaciones o gráfico hero de PDF listo para impresión en entrada de blog. La conversión local mantiene creativo bajo embargo y tablas de precios fuera de herramientas de programación que solo aceptan raster.',
      },
      {
        title: 'Instantáneas de página para archivo',
        body:
          'Equipos de registros a veces congelan páginas individuales — firmas, formularios notariados — como imágenes para sistemas que no ingieren PDF. La exportación en navegador crea evidencia PNG fechada sin pipeline de subida del documento completo.',
      },
      {
        title: 'Preparación para OCR y edición de imagen',
        body:
          'Cuando el flujo necesita tratar imagen por página, exporte primero, ejecute Filtros de Imagen u OCR de Imagen en hojas problemáticas y recomponga con Imagen a PDF. Mantener rasterización local protege contenido escaneado en todo el pipeline.',
      },
    ],
    howItWorks: [
      'Suba el PDF que desea convertir.',
      'Seleccione PDF a Imagen en el menú de herramientas.',
      'Elija formato y ajustes de calidad si están disponibles.',
      'Procese localmente; el navegador renderiza cada página a imágenes raster.',
      'Descargue imágenes individualmente o en lote.',
    ],
    tips: [
      'Use PNG para diagramas y páginas con mucho texto; JPG para diapositivas con fotos.',
      'Mayor DPI o calidad aumenta tamaño — alinee al caso de uso final.',
      'Rote PDF desalineados antes de exportar para imágenes verticales.',
      'Para un rango específico, divida el PDF antes para no exportar páginas extra.',
      'Compare exportación ampliada con el PDF fuente antes de borrar originales.',
      'Encadene con Redimensionar Imagen si los archivos exceden límites de correo.',
    ],
    sections: [
      {
        id: 'raster-vs-vector',
        heading: 'Exportación raster frente a copiar contenido vectorial',
        level: 2,
        paragraphs: [
          'Los PDF pueden tener texto vectorial nítido y arte con zoom infinito. Exportar a JPG o PNG aplana cada página en una cuadrícula fija de píxeles — lo que la mayoría de plataformas web exigen, pero pierde texto seleccionable hasta ejecutar OCR después.',
          'Elija resolución pensando en el visor final. JPG 1080p basta para vista previa en Slack; PNG 300 DPI puede servir para reimpresión o nuevo OCR.',
        ],
      },
      {
        id: 'eleccion-formato',
        heading: 'Elegir salida JPG o PNG',
        level: 2,
        paragraphs: [
          'PNG usa compresión sin pérdidas — los bordes permanecen nítidos en gráficos, capturas de UI y formularios escaneados. JPG aplica compresión con pérdidas que reduce páginas con fotos pero puede introducir artefactos en texto pequeño.',
        ],
        bullets: [
          'PNG — diagramas, capturas, páginas con bloques de color plano',
          'JPG — diapositivas con fotografía, folletos, fondos con degradado',
          'Pruebe ambos si duda — tamaño y claridad varían por página',
        ],
      },
      {
        id: 'privacidad-render-local',
        heading: 'Por qué renderizar PDF localmente protege archivos sensibles',
        level: 2,
        paragraphs: [
          'Los servicios en línea de PDF a imagen reciben el binario completo, procesan en infraestructura compartida y pueden retener copias para depuración o analítica. PDFWINDOWS decodifica páginas en memoria del navegador y escribe imágenes en su carpeta de descarga — sin cuenta, sin política de retención de terceros.',
          'Eso importa para paquetes de RR. HH., PDF de educación al paciente y extractos de dataroom de M&A donde incluso el conteo de páginas puede ser metadato sensible.',
        ],
      },
      {
        id: 'flujo-pdf-imagen',
        heading: 'PDF a imagen en un flujo mayor',
        level: 2,
        paragraphs: [
          'Exportar rara vez es el último paso. Los equipos rasterizan, editan en Filtros de Imagen, ejecutan OCR con OCR de Imagen y recompilan vía Imagen a PDF. Comprima el PDF reconstruido para distribución o marque borradores con marca de agua antes del envío externo.',
          'Equipos de e-commerce exportan fichas técnicas PDF como PNG para marketplaces que solo aceptan raster. Conversión local mantiene tablas de precio mayorista y SKU de proveedor fuera de registros de convertidores mientras produce activos listos para web.',
        ],
        bullets: [
          'Filtros de Imagen — corregir contraste en páginas exportadas',
          'OCR de Imagen — recuperar texto de hojas rasterizadas',
          'Imagen a PDF — reensamblar documento tras ediciones por página',
        ],
      },
    ],
    faq: [
      ...privacyFaq('es'),
      {
        q: '¿Cada página se convierte en una imagen separada?',
        a: 'Sí — cada página PDF suele exportarse como JPG o PNG propio. Los documentos multipágina generan varias descargas, salvo que la sesión agrupe en archivo comprimido.',
      },
      {
        q: '¿La conversión reduce la calidad del texto?',
        a: 'La rasterización fija resolución. El texto pequeño puede verse suave en calidad baja; aumente resolución de salida para archivo o reimpresión.',
      },
      {
        q: '¿Puedo convertir PDF con contraseña?',
        a: 'El navegador debe descifrar primero. Introduzca la contraseña para renderizar páginas; el procesamiento permanece local.',
      },
      {
        q: '¿Se admiten fondos transparentes?',
        a: 'Las páginas PDF estándar tienen fondo opaco. PNG exporta la apariencia renderizada; transparencia real depende del contenido fuente.',
      },
      {
        q: '¿En qué se diferencia de una captura de pantalla?',
        a: 'El renderizado directo usa el motor PDF en la resolución elegida en lugar de los píxeles de pantalla, produciendo bordes más limpios y tamaño consistente entre páginas.',
      },
    ],
    relatedTools: ['/image-to-pdf', '/pdf-split', '/image-resize'],
    cta: defaultCta('es', 'PDF a Imagen'),
  },
};
