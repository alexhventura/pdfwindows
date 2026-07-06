import type { ToolRichContent } from '../types';
import { privacyFaq, defaultCta } from '../helpers';

export const IMAGE_FILTERS_CONTENT: Record<'en' | 'pt' | 'es', ToolRichContent> = {
  en: {
    title: 'Image Filters Online Offline | PDFWINDOWS',
    description:
      'Adjust brightness, contrast, grayscale, and more in your browser. Edit images locally with instant preview — no upload, no account required.',
    keywords:
      'image filters, brightness contrast offline, grayscale image browser, edit image locally, photo adjustment free, image editor no upload',
    h1: 'Image Filters — Local Adjustments',
    intro:
      'A faint scan, an overexposed receipt photo, or a screenshot with washed-out text can fail OCR, printing, and client review — yet sending those files to online editors exposes confidential content to third-party servers. PDFWINDOWS Image Filters lets you tune brightness, contrast, grayscale, and related adjustments entirely in your browser with live preview. Every pixel stays on your device while you correct exposure problems, prepare documents for recognition, or create consistent black-and-white versions for archival PDFs.',
    toolName: 'Image Filters',
    benefits: [
      'Real-time preview as you adjust filter sliders',
      'Brightness, contrast, grayscale, and related controls',

      'Works with JPG, PNG, WEBP, and common raster formats',
      'Free unlimited edits with no watermarks',
    ],
    useCases: [
      {
        title: 'Improve scan and OCR readability',
        body:
          'Yellowed paper, pencil marks, and uneven lighting confuse optical character recognition. Boosting contrast and shifting brightness before OCR often recovers legible text from marginal phone photos of contracts and forms — without routing those documents through cloud editing APIs.',
      },
      {
        title: 'Fix overexposed receipt and invoice photos',
        body:
          'Flash glare and bright countertops blow out totals on expense photos. Dialing down brightness and increasing contrast can restore merchant names and amounts finance teams need for reimbursement — processed locally so purchase patterns stay private.',
      },
      {
        title: 'Create print-friendly grayscale versions',
        body:
          'Color ink is expensive and some formal submissions require black-and-white attachments. Convert color scans to grayscale with controlled contrast for fax-friendly output, legal filings, and internal print queues while keeping originals archived separately.',
      },
      {
        title: 'Standardize screenshot documentation',
        body:
          'Technical writers and support teams capture UI screenshots under different monitors and themes. Mild contrast adjustments make thin fonts and subtle borders visible in PDF guides and knowledge-base articles exported via Image to PDF.',
      },
      {
        title: 'Prepare assets for design handoff',
        body:
          'Product designers sometimes need quick tonal tweaks on mockup exports before sharing with developers. Local filters provide fast iteration on wireframe captures and placeholder imagery without opening heavyweight desktop suites or uploading unreleased screens.',
      },
    ],
    howItWorks: [
      'Open Image Filters and upload an image from your device.',
      'Adjust brightness, contrast, grayscale, or other available controls.',
      'Watch the preview update in real time as you move sliders.',
      'Reset or fine-tune until text and edges look correct.',
      'Download the filtered image for OCR, PDF conversion, or direct use.',
    ],
    tips: [
      'Small contrast boosts often help more than extreme brightness changes.',
      'Convert to grayscale before OCR on color-noisy document photos.',
      'Avoid crushing shadows — faint signatures may disappear at maximum contrast.',
      'Compare filtered output side by side with the original before deleting sources.',
      'Chain with Image Resize if the edited file is still too large for email.',
      'For batch consistency, note slider values and apply similar settings to related scans.',
    ],
    sections: [
      {
        id: 'brightness-contrast',
        heading: 'Brightness and contrast fundamentals',
        level: 2,
        paragraphs: [
          'Brightness shifts overall pixel luminance — useful when a photo looks too dark or washed out. Contrast stretches the difference between light and dark areas, making text pop against backgrounds. Together they correct many capture problems without retaking the photo.',
          'Aggressive contrast can clip highlights and shadows, turning subtle gray text into pure black or white blobs. Increase gradually and zoom into small fonts — especially on receipts and footnotes — to ensure characters remain distinct.',
        ],
      },
      {
        id: 'grayscale',
        heading: 'When to use grayscale conversion',
        level: 2,
        paragraphs: [
          'Grayscale removes color channels, which often reduces file size and eliminates color cast from indoor lighting. For document-centric images, grayscale plus contrast adjustment produces clean monochrome pages suitable for PDF archival and printing.',
          'Keep color originals when hue carries meaning — highlighted contract clauses, color-coded wiring diagrams, or medical imaging where channel information matters. Use grayscale as a derivative export, not a replacement for the master file.',
        ],
        bullets: [
          'Receipts and typed letters — grayscale often improves OCR',
          'Art and marketing photos — usually keep color',
          'Mixed documents — test both modes before batch processing',
        ],
      },
      {
        id: 'local-editing-privacy',
        heading: 'Why local image editing protects your data',
        level: 2,
        paragraphs: [
          'Online photo editors upload files to remote GPUs and may retain thumbnails for analytics or training. PDFWINDOWS applies filter math in browser canvas APIs on your hardware. ID scans, unreleased product shots, and patient paperwork never leave the machine during adjustment.',
          'Local editing also works offline after the page loads, supporting air-gapped workflows and corporate networks that block external image hosts.',
        ],
      },
      {
        id: 'filters-workflow',
        heading: 'Filters in a larger image pipeline',
        level: 3,
        paragraphs: [
          'Image Filters is typically a preprocessing step. Enhance a scan, run OCR on the result, resize for web upload, or bundle into PDF. For format changes before filtering, use Image Converter; for final delivery, Image to PDF or Image Resize.',
        ],
        bullets: [
          'Image OCR — recognize text after contrast fixes',
          'Image Resize — shrink enhanced scans for attachment limits',
          'Image to PDF — compile adjusted pages into one document',
        ],
      },
    ],
    faq: [
      ...privacyFaq('en'),
      {
        q: 'Will filters permanently damage my original file?',
        a: 'The tool exports a new image; your original file on disk is unchanged unless you overwrite it manually. Keep backups until you are satisfied with the filtered output.',
      },
      {
        q: 'Can I undo filter changes?',
        a: 'Reset sliders to return to the loaded image state in the session. To revert fully, reload the original file from your device.',
      },
      {
        q: 'Do filters support transparent PNGs?',
        a: 'Adjustments apply to visible pixels. Transparency is generally preserved on PNG exports, but extreme processing may affect semi-transparent edges — preview before downloading.',
      },
      {
        q: 'Is this a replacement for Photoshop?',
        a: 'No. Image Filters targets quick tonal corrections for documents and screenshots. Complex retouching, layers, and selective edits still belong in professional editing software.',
      },
    ],
    relatedTools: ['/image-ocr', '/image-converter', '/image-resize', '/capturador-de-cores'],
    cta: defaultCta('en', 'Image Filters'),
  },
  pt: {
    title: 'Filtros de Imagem Online Offline | PDFWINDOWS',
    description:
      'Ajuste brilho, contraste, escala de cinza e mais no navegador. Edite imagens localmente com preview instantâneo — sem upload nem cadastro.',
    keywords:
      'filtro imagem, brilho contraste offline, escala de cinza navegador, editar imagem localmente, ajuste de foto grátis',
    h1: 'Filtros de Imagem — Ajustes Locais',
    intro:
      'Scan fraco, foto de recibo estourada ou captura com texto apagado pode falhar em OCR, impressão e revisão do cliente — mas enviar esses arquivos a editores online expõe conteúdo confidencial a servidores de terceiros. Os Filtros de Imagem do PDFWINDOWS permitem ajustar brilho, contraste, escala de cinza e controles relacionados inteiramente no navegador com preview ao vivo. Cada pixel permanece no dispositivo enquanto você corrige exposição, prepara documentos para reconhecimento ou cria versões preto e branco consistentes para PDFs de arquivo.',
    toolName: 'Filtros de Imagem',
    benefits: [
      'Preview em tempo real ao mover os controles',
      'Brilho, contraste, escala de cinza e ajustes relacionados',

      'Funciona com JPG, PNG, WEBP e formatos raster comuns',
      'Edições gratuitas e ilimitadas sem marcas d\'água',
    ],
    useCases: [
      {
        title: 'Melhorar legibilidade de scan e OCR',
        body:
          'Papel amarelado, marcas de lápis e iluminação irregular confundem reconhecimento óptico. Aumentar contraste e ajustar brilho antes do OCR costuma recuperar texto legível de fotos marginais de contratos e formulários — sem rotear documentos por APIs de edição na nuvem.',
      },
      {
        title: 'Corrigir fotos estouradas de recibos e notas',
        body:
          'Reflexo de flash e bancadas claras estouram totais em fotos de despesas. Reduzir brilho e aumentar contraste pode restaurar nomes de estabelecimentos e valores que finanças precisam para reembolso — processado localmente para manter padrões de compra privados.',
      },
      {
        title: 'Criar versões em escala de cinza para impressão',
        body:
          'Tinta colorida é cara e alguns envios formais exigem anexos em preto e branco. Converta scans coloridos para escala de cinza com contraste controlado para fax, protocolos jurídicos e filas de impressão interna, guardando originais coloridos separadamente.',
      },
      {
        title: 'Padronizar documentação com capturas',
        body:
          'Redatores técnicos e suporte capturam telas em monitores e temas diferentes. Ajustes leves de contraste tornam fontes finas e bordas sutis visíveis em guias PDF e artigos de base de conhecimento exportados via Imagem para PDF.',
      },
      {
        title: 'Preparar assets para handoff de design',
        body:
          'Designers às vezes precisam de ajustes tonais rápidos em exports de mockup antes de compartilhar com desenvolvedores. Filtros locais permitem iterar em capturas de wireframe e placeholders sem abrir suites desktop pesadas ou enviar telas não lançadas.',
      },
    ],
    howItWorks: [
      'Abra Filtros de Imagem e envie uma imagem do dispositivo.',
      'Ajuste brilho, contraste, escala de cinza ou outros controles disponíveis.',
      'Veja o preview atualizar em tempo real ao mover os sliders.',
      'Redefina ou refine até texto e bordas parecerem corretos.',
      'Baixe a imagem filtrada para OCR, conversão PDF ou uso direto.',
    ],
    tips: [
      'Pequenos aumentos de contraste costumam ajudar mais que mudanças extremas de brilho.',
      'Converta para escala de cinza antes do OCR em fotos de documento com ruído de cor.',
      'Evite esmagar sombras — assinaturas fracas podem sumir em contraste máximo.',
      'Compare saída filtrada com o original antes de apagar fontes.',
      'Encadeie com Redimensionar Imagem se o arquivo editado ainda for grande demais para e-mail.',
      'Para consistência em lote, anote valores dos sliders e aplique configurações similares em scans relacionados.',
    ],
    sections: [
      {
        id: 'brilho-contraste',
        heading: 'Fundamentos de brilho e contraste',
        level: 2,
        paragraphs: [
          'Brilho desloca a luminância geral dos pixels — útil quando a foto parece escura ou estourada. Contraste amplia a diferença entre áreas claras e escuras, fazendo texto destacar do fundo. Juntos corrigem muitos problemas de captura sem refotografar.',
          'Contraste agressivo pode cortar realces e sombras, transformando texto cinza sutil em manchas pretas ou brancas. Aumente gradualmente e amplie fontes pequenas — especialmente em recibos e notas de rodapé — para garantir que caracteres permaneçam distintos.',
        ],
      },
      {
        id: 'escala-cinza',
        heading: 'Quando usar conversão em escala de cinza',
        level: 2,
        paragraphs: [
          'Escala de cinza remove canais de cor, o que frequentemente reduz tamanho de arquivo e elimina dominante de iluminação interna. Para imagens centradas em documento, escala de cinza mais contraste produz páginas monocromáticas limpas para arquivo PDF e impressão.',
          'Mantenha originais coloridos quando a cor carrega significado — cláusulas destacadas, diagramas codificados por cor ou imagens médicas onde canais importam. Use escala de cinza como export derivado, não substituto do arquivo mestre.',
        ],
        bullets: [
          'Recibos e cartas digitadas — escala de cinza costuma melhorar OCR',
          'Fotos de arte e marketing — geralmente mantenha cor',
          'Documentos mistos — teste ambos modos antes de processar em lote',
        ],
      },
      {
        id: 'privacidade-edicao-local',
        heading: 'Por que editar imagem localmente protege seus dados',
        level: 2,
        paragraphs: [
          'Editores de foto online enviam arquivos a GPUs remotas e podem reter miniaturas para analytics ou treinamento. O PDFWINDOWS aplica matemática de filtro em APIs canvas do navegador no seu hardware. Scans de documento, fotos de produto não lançado e papéis de paciente nunca saem da máquina durante o ajuste.',
          'Edição local também funciona offline após carregar a página, apoiando fluxos air-gapped e redes corporativas que bloqueiam hosts de imagem externos.',
        ],
      },
      {
        id: 'fluxo-filtros',
        heading: 'Filtros em um pipeline maior de imagens',
        level: 3,
        paragraphs: [
          'Filtros de Imagem costuma ser etapa de pré-processamento. Melhore um scan, rode OCR no resultado, redimensione para upload web ou compile em PDF. Para mudança de formato antes de filtrar, use Conversor de Imagens; para entrega final, Imagem para PDF ou Redimensionar Imagem.',
        ],
        bullets: [
          'OCR de Imagem — reconheça texto após correções de contraste',
          'Redimensionar Imagem — reduza scans melhorados para limites de anexo',
          'Imagem para PDF — compile páginas ajustadas em um documento',
        ],
      },
    ],
    faq: [
      ...privacyFaq('pt'),
      {
        q: 'Os filtros danificam permanentemente meu arquivo original?',
        a: 'A ferramenta exporta uma nova imagem; o arquivo original no disco não muda a menos que você o sobrescreva manualmente. Mantenha backups até ficar satisfeito com a saída filtrada.',
      },
      {
        q: 'Posso desfazer alterações de filtro?',
        a: 'Redefina os sliders para voltar ao estado da imagem carregada na sessão. Para reverter totalmente, recarregue o arquivo original do dispositivo.',
      },
      {
        q: 'Os filtros suportam PNG com transparência?',
        a: 'Ajustes aplicam-se a pixels visíveis. Transparência geralmente é preservada em export PNG, mas processamento extremo pode afetar bordas semitransparentes — visualize antes de baixar.',
      },
      {
        q: 'Isso substitui o Photoshop?',
        a: 'Não. Filtros de Imagem focam correções tonais rápidas para documentos e capturas. Retoque complexo, camadas e edição seletiva continuam em software profissional.',
      },
    ],
    relatedTools: ['/image-ocr', '/image-converter', '/image-resize', '/capturador-de-cores'],
    cta: defaultCta('pt', 'Filtros de Imagem'),
  },
  es: {
    title: 'Filtros de Imagen Online Offline | PDFWINDOWS',
    description:
      'Ajuste brillo, contraste, escala de grises y más en su navegador. Edite imágenes localmente con vista previa instantánea — sin subida ni registro.',
    keywords:
      'filtros imagen, brillo contraste offline, escala de grises navegador, editar imagen localmente, ajuste de foto gratis',
    h1: 'Filtros de Imagen — Ajustes Locales',
    intro:
      'Un escaneo débil, una foto de recibo sobreexpuesta o una captura con texto deslavado puede fallar en OCR, impresión y revisión del cliente — pero enviar esos archivos a editores en línea expone contenido confidencial a servidores de terceros. Filtros de Imagen de PDFWINDOWS le permite ajustar brillo, contraste, escala de grises y controles relacionados completamente en su navegador con vista previa en vivo. Cada píxel permanece en su dispositivo mientras corrige exposición, prepara documentos para reconocimiento o crea versiones en blanco y negro consistentes para PDFs de archivo.',
    toolName: 'Filtros de Imagen',
    benefits: [
      'Vista previa en tiempo real al mover los controles',
      'Brillo, contraste, escala de grises y ajustes relacionados',

      'Funciona con JPG, PNG, WEBP y formatos raster comunes',
      'Ediciones gratuitas e ilimitadas sin marcas de agua',
    ],
    useCases: [
      {
        title: 'Mejorar legibilidad de escaneo y OCR',
        body:
          'Papel amarillento, marcas de lápiz e iluminación desigual confunden el reconocimiento óptico. Aumentar contraste y ajustar brillo antes del OCR suele recuperar texto legible de fotos marginales de contratos y formularios — sin enrutar documentos por APIs de edición en la nube.',
      },
      {
        title: 'Corregir fotos sobreexpuestas de recibos y facturas',
        body:
          'El reflejo del flash y encimeras claras queman totales en fotos de gastos. Bajar brillo y aumentar contraste puede restaurar nombres de comercios e importes que finanzas necesita para reembolso — procesado localmente para mantener patrones de compra privados.',
      },
      {
        title: 'Crear versiones en escala de grises para impresión',
        body:
          'La tinta a color es cara y algunos envíos formales exigen adjuntos en blanco y negro. Convierta escaneos a color en escala de grises con contraste controlado para fax, presentaciones legales y colas de impresión interna, guardando originales a color por separado.',
      },
      {
        title: 'Estandarizar documentación con capturas',
        body:
          'Redactores técnicos y soporte capturan pantallas en monitores y temas distintos. Ajustes leves de contraste hacen visibles fuentes finas y bordes sutiles en guías PDF y artículos de base de conocimiento exportados vía Imagen a PDF.',
      },
      {
        title: 'Preparar activos para entrega de diseño',
        body:
          'Diseñadores a veces necesitan retoques tonales rápidos en exportaciones de mockup antes de compartir con desarrolladores. Filtros locales permiten iterar en capturas de wireframe y placeholders sin abrir suites de escritorio pesadas ni subir pantallas no publicadas.',
      },
    ],
    howItWorks: [
      'Abra Filtros de Imagen y suba una imagen desde su dispositivo.',
      'Ajuste brillo, contraste, escala de grises u otros controles disponibles.',
      'Observe la vista previa actualizarse en tiempo real al mover los deslizadores.',
      'Restablezca o refine hasta que texto y bordes se vean correctos.',
      'Descargue la imagen filtrada para OCR, conversión PDF o uso directo.',
    ],
    tips: [
      'Pequeños aumentos de contraste suelen ayudar más que cambios extremos de brillo.',
      'Convierta a escala de grises antes del OCR en fotos de documento con ruido de color.',
      'Evite aplastar sombras — firmas tenues pueden desaparecer con contraste máximo.',
      'Compare la salida filtrada con el original antes de borrar fuentes.',
      'Encadene con Redimensionar Imagen si el archivo editado sigue siendo demasiado grande para correo.',
      'Para consistencia en lote, anote valores de deslizadores y aplique configuraciones similares en escaneos relacionados.',
    ],
    sections: [
      {
        id: 'brillo-contraste',
        heading: 'Fundamentos de brillo y contraste',
        level: 2,
        paragraphs: [
          'El brillo desplaza la luminancia general de los píxeles — útil cuando la foto parece oscura o lavada. El contraste amplía la diferencia entre áreas claras y oscuras, haciendo que el texto destaque del fondo. Juntos corrigen muchos problemas de captura sin volver a fotografiar.',
          'El contraste agresivo puede recortar luces y sombras, convirtiendo texto gris sutil en manchas negras o blancas. Aumente gradualmente y amplíe fuentes pequeñas — especialmente en recibos y notas al pie — para asegurar que los caracteres permanezcan distintos.',
        ],
      },
      {
        id: 'escala-grises',
        heading: 'Cuándo usar conversión en escala de grises',
        level: 2,
        paragraphs: [
          'La escala de grises elimina canales de color, lo que frecuentemente reduce tamaño de archivo y elimina dominante de iluminación interior. Para imágenes centradas en documentos, escala de grises más contraste produce páginas monocromáticas limpias para archivo PDF e impresión.',
          'Mantenga originales a color cuando el tono lleva significado — cláusulas resaltadas, diagramas codificados por color o imágenes médicas donde los canales importan. Use escala de grises como exportación derivada, no sustituto del archivo maestro.',
        ],
        bullets: [
          'Recibos y cartas mecanografiadas — escala de grises suele mejorar OCR',
          'Fotos de arte y marketing — generalmente mantenga color',
          'Documentos mixtos — pruebe ambos modos antes de procesar en lote',
        ],
      },
      {
        id: 'privacidad-edicion-local',
        heading: 'Por qué editar imagen localmente protege sus datos',
        level: 2,
        paragraphs: [
          'Los editores de foto en línea suben archivos a GPUs remotas y pueden retener miniaturas para analítica o entrenamiento. PDFWINDOWS aplica matemática de filtro en APIs canvas del navegador en su hardware. Escaneos de identificación, fotos de producto no publicado y papeles de pacientes nunca salen del equipo durante el ajuste.',
          'La edición local también funciona sin conexión tras cargar la página, apoyando flujos air-gapped y redes corporativas que bloquean hosts de imagen externos.',
        ],
      },
      {
        id: 'flujo-filtros',
        heading: 'Filtros en un pipeline mayor de imágenes',
        level: 3,
        paragraphs: [
          'Filtros de Imagen suele ser paso de preprocesamiento. Mejore un escaneo, ejecute OCR en el resultado, redimensione para subida web o compile en PDF. Para cambio de formato antes de filtrar, use Conversor de Imágenes; para entrega final, Imagen a PDF o Redimensionar Imagen.',
        ],
        bullets: [
          'OCR de Imagen — reconozca texto tras correcciones de contraste',
          'Redimensionar Imagen — reduzca escaneos mejorados para límites de adjunto',
          'Imagen a PDF — compile páginas ajustadas en un documento',
        ],
      },
    ],
    faq: [
      ...privacyFaq('es'),
      {
        q: '¿Los filtros dañan permanentemente mi archivo original?',
        a: 'La herramienta exporta una imagen nueva; su archivo original en disco no cambia a menos que lo sobrescriba manualmente. Mantenga copias de seguridad hasta estar satisfecho con la salida filtrada.',
      },
      {
        q: '¿Puedo deshacer cambios de filtro?',
        a: 'Restablezca los deslizadores para volver al estado de la imagen cargada en la sesión. Para revertir totalmente, recargue el archivo original desde su dispositivo.',
      },
      {
        q: '¿Los filtros admiten PNG con transparencia?',
        a: 'Los ajustes se aplican a píxeles visibles. La transparencia generalmente se preserva en exportación PNG, pero procesamiento extremo puede afectar bordes semitransparentes — previsualice antes de descargar.',
      },
      {
        q: '¿Esto reemplaza a Photoshop?',
        a: 'No. Filtros de Imagen se enfoca en correcciones tonales rápidas para documentos y capturas. Retoque complejo, capas y edición selectiva siguen en software profesional.',
      },
    ],
    relatedTools: ['/image-ocr', '/image-converter', '/image-resize', '/capturador-de-cores'],
    cta: defaultCta('es', 'Filtros de Imagen'),
  },
};
