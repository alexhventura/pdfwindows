import type { ToolRichContent } from '../types';
import { privacyFaq, defaultCta } from '../helpers';

export const IMAGE_RESIZE_CONTENT: Record<'en' | 'pt' | 'es', ToolRichContent> = {
  en: {
    title: 'Resize Image Online Offline | PDFWINDOWS',
    description:
      'Resize and compress images in your browser. Set exact pixel dimensions, lock aspect ratio, and download optimized files without uploading to any server.',
    keywords:
      'resize image, compress image offline, scale image browser, reduce image dimensions, image resizer free, local image resize',
    h1: 'Resize Image — Local Processing',
    intro:
      'Publishing, emailing, and uploading images often starts with one problem: the file is the wrong size. Camera photos arrive at thousands of pixels wide, while web forms, CMS fields, and attachment limits demand something smaller. Cloud resizers solve that by copying your files to their infrastructure — which is a poor trade when the image shows a patient chart, unreleased product, or signed ID. PDFWINDOWS resizes images entirely in your browser: set width and height, optionally lock aspect ratio, tune compression, and download the result without any network transfer of your originals.',
    toolName: 'Resize Image',
    benefits: [
      'Pixel-precise dimensions with optional aspect-ratio lock',
      'Compression controls to shrink file size after resizing',
      '100% local processing — no upload to conversion servers',
      'Works with JPG, PNG, WEBP, and other common formats',
      'Free, unlimited use with no account or watermarks',
    ],
    useCases: [
      {
        title: 'Meet website and CMS dimension requirements',
        body:
          'Marketing teams routinely export hero banners, thumbnails, and blog images at sizes dictated by WordPress themes, Shopify templates, or internal design systems. Resizing locally lets you hit exact pixel targets — 1200×630 for social cards, 800×600 for product grids — without sending campaign assets to third-party image hosts that may retain copies.',
      },
      {
        title: 'Fit email and chat attachment limits',
        body:
          'A single phone photo can exceed corporate SMTP caps or messaging app size restrictions. Downscaling dimensions and applying sensible compression often cuts megabytes to kilobytes while keeping faces and text readable. Local resizing means expense receipts, team photos, and confidential screenshots never traverse an external API.',
      },
      {
        title: 'Prepare uniform image sets for documents',
        body:
          'Before converting photos to PDF or assembling slide decks, inconsistent image dimensions create awkward layouts. Batch-resize a folder of scans and screenshots to the same width so pages align cleanly in Image to PDF, reports, and client deliverables — all on your machine.',
      },
      {
        title: 'Optimize mobile and field workflows',
        body:
          'Field inspectors, teachers, and healthcare staff capture images on phones that are far larger than portals accept. Resize on the tablet or laptop before upload to claims systems, learning platforms, or HR intake forms. Browser-based processing works once the page is loaded, even on restricted networks.',
      },
      {
        title: 'Archive and storage hygiene',
        body:
          'Long-term backups and shared drives accumulate oversized PNG and JPG files from years of screenshots. Resizing infrequently accessed reference images frees disk space on NAS volumes while preserving enough detail for future reference. Keep originals archived separately if you may need full resolution later.',
      },
    ],
    howItWorks: [
      'Open Resize Image and add one or more image files from your device.',
      'Enter target width, height, or a single dimension with aspect lock enabled.',
      'Adjust quality or compression settings when available to balance size and clarity.',
      'Preview the resized output in the browser before downloading.',
      'Download individual files or continue processing additional images in the same session.',
    ],
    tips: [
      'Enable aspect-ratio lock when scaling photos so subjects are not stretched or squashed.',
      'Resize before converting to PDF if page layouts need consistent image widths.',
      'For text-heavy screenshots, avoid aggressive downscaling — small fonts blur below certain pixel widths.',
      'PNG stays lossless but larger; JPG and WEBP shrink more for photo content.',
      'When both dimensions matter (avatars, icons), set exact pixels rather than percentage-only scaling.',
      'Keep a copy of full-resolution originals until you confirm the resized file meets your quality bar.',
    ],
    sections: [
      {
        id: 'dimensions-vs-file-size',
        heading: 'Understanding dimensions versus file size',
        level: 2,
        paragraphs: [
          'Image width and height in pixels determine how large an image appears on screen and in print at a given DPI. File size in megabytes depends on pixel count, color depth, and compression. Shrinking from 4000×3000 to 1200×900 removes most of the bytes because fewer pixels need storing — often a bigger win than tweaking quality sliders alone.',
          'Resizing is not the same as cropping. Resizing scales the entire frame; cropping removes edges. Use resize when you need the whole scene at a smaller footprint, and crop first if distracting margins around a document photo waste pixels.',
        ],
      },
      {
        id: 'aspect-ratio',
        heading: 'When to lock aspect ratio',
        level: 2,
        paragraphs: [
          'Aspect-ratio lock maintains proportional width and height so circles stay round and portraits do not look stretched. Enter one target dimension — width or height — and let the tool compute the other. This is the default workflow for photos, product shots, and social graphics.',
          'Unlock aspect ratio only when you deliberately need a fixed canvas size and are willing to accept distortion, or when combining with crop tools elsewhere. For logos and UI assets, prefer exact square or standard ratios defined in your design system.',
        ],
        bullets: [
          'Lock on — photos, portraits, landscape scenes',
          'Lock off — rare cases needing exact banner slots with acceptable stretch',
          'Set max width only — responsive web images that scale height automatically',
        ],
      },
      {
        id: 'quality-after-resize',
        heading: 'Compression after resizing',
        level: 2,
        paragraphs: [
          'After dimensions drop, additional quality compression can further reduce bytes for email and web delivery. A resized JPG at quality 80–85 often looks identical to the original on laptop screens while attaching easily. For diagrams and screenshots with fine lines, favor PNG or higher JPG quality to preserve edge sharpness.',
          'Repeatedly resizing and recompressing the same JPG introduces visible artifacts. Always work from the highest-quality source available, resize once to the target dimensions, then export.',
        ],
      },
      {
        id: 'resize-workflow',
        heading: 'Resize in a larger image workflow',
        level: 3,
        paragraphs: [
          'Resizing pairs naturally with other PDFWINDOWS image tools. Convert uncommon formats first with Image Converter, apply filters to improve scan contrast, run OCR on the resized page if text recognition struggles on huge camera photos, then bundle results into PDF.',
        ],
        bullets: [
          'Image Converter — standardize format before resize',
          'Image Filters — boost contrast on faint scans before downscaling',
          'Image to PDF — compile uniform-width images into one document',
        ],
      },
    ],
    faq: [
      ...privacyFaq('en'),
      {
        q: 'Can I resize multiple images at once?',
        a: 'Yes. Add several files in one session and apply the same dimension settings to each. This is useful when preparing a batch of product photos or receipt scans for a single upload form.',
      },
      {
        q: 'Will resizing reduce image quality?',
        a: 'Downscaling removes pixels, so extreme enlargement later is not possible without blur. Within reasonable targets for web and email, resized images look sharp. Upscaling beyond the original size cannot invent detail.',
      },
      {
        q: 'Should I resize or compress first?',
        a: 'Resize first to the target dimensions, then adjust compression. Shrinking pixel dimensions usually saves more space than quality tweaks alone on oversized camera photos.',
      },
      {
        q: 'Does resizing remove EXIF metadata?',
        a: 'Browser-based export may strip location and camera metadata depending on format and settings. If GPS or copyright tags must be preserved, verify the output or retain originals separately.',
      },
    ],
    relatedTools: ['/image-converter', '/image-to-pdf', '/image-filters', '/image-ocr'],
    cta: defaultCta('en', 'Resize Image'),
  },
  pt: {
    title: 'Redimensionar Imagem Online Offline | PDFWINDOWS',
    description:
      'Redimensione e comprima imagens no navegador. Defina pixels exatos, bloqueie proporção e baixe arquivos otimizados sem enviar a servidores.',
    keywords:
      'redimensionar imagem, comprimir imagem offline, escalar imagem navegador, reduzir dimensões imagem, redimensionador de imagem grátis',
    h1: 'Redimensionar Imagem — Processamento Local',
    intro:
      'Publicar, enviar por e-mail e fazer upload de imagens costuma começar com um problema: o arquivo está no tamanho errado. Fotos de câmera chegam com milhares de pixels de largura, enquanto formulários web, campos de CMS e limites de anexo exigem algo menor. Redimensionadores na nuvem resolvem isso copiando seus arquivos para infraestrutura de terceiros — um mau negócio quando a imagem mostra prontuário, produto não lançado ou documento assinado. O PDFWINDOWS redimensiona imagens inteiramente no navegador: defina largura e altura, bloqueie proporção se quiser, ajuste compressão e baixe o resultado sem transferir os originais pela rede.',
    toolName: 'Redimensionar Imagem',
    benefits: [
      'Dimensões precisas em pixels com bloqueio opcional de proporção',
      'Controles de compressão para reduzir tamanho após redimensionar',
      'Processamento 100% local — sem upload para servidores de conversão',
      'Compatível com JPG, PNG, WEBP e outros formatos comuns',
      'Uso gratuito e ilimitado, sem conta ou marcas d\'água',
    ],
    useCases: [
      {
        title: 'Atender requisitos de dimensão em sites e CMS',
        body:
          'Equipes de marketing exportam banners, miniaturas e imagens de blog nos tamanhos exigidos por temas WordPress, templates Shopify ou design systems internos. Redimensionar localmente permite atingir pixels exatos — 1200×630 para cards sociais, 800×600 para grades de produto — sem enviar assets de campanha a hosts de imagem que podem reter cópias.',
      },
      {
        title: 'Caber em limites de anexo de e-mail e chat',
        body:
          'Uma foto de celular pode ultrapassar limites de SMTP corporativo ou apps de mensagem. Reduzir dimensões e aplicar compressão sensata costuma levar megabytes a kilobytes mantendo rostos e texto legíveis. Redimensionar localmente significa que comprovantes, fotos de equipe e capturas confidenciais não passam por API externa.',
      },
      {
        title: 'Preparar conjuntos uniformes para documentos',
        body:
          'Antes de converter fotos em PDF ou montar apresentações, dimensões inconsistentes geram layouts estranhos. Redimensione em lote scans e capturas para a mesma largura para que páginas alinhem bem no Imagem para PDF, relatórios e entregas a clientes — tudo na sua máquina.',
      },
      {
        title: 'Otimizar fluxos móveis e em campo',
        body:
          'Inspetores, professores e profissionais de saúde capturam imagens no celular muito maiores que portais aceitam. Redimensione no tablet ou notebook antes de enviar a sistemas de sinistro, plataformas de ensino ou formulários de RH. O processamento no navegador funciona após carregar a página, mesmo em redes restritas.',
      },
      {
        title: 'Higiene de arquivo e armazenamento',
        body:
          'Backups e drives compartilhados acumulam PNG e JPG enormes de anos de capturas. Redimensionar imagens de referência pouco acessadas libera espaço em NAS preservando detalhe para consulta futura.',
      },
    ],
    howItWorks: [
      'Abra Redimensionar Imagem e adicione um ou mais arquivos do dispositivo.',
      'Informe largura, altura ou uma dimensão com bloqueio de proporção ativado.',
      'Ajuste qualidade ou compressão quando disponível para equilibrar tamanho e nitidez.',
      'Visualize o resultado redimensionado no navegador antes de baixar.',
      'Baixe arquivos individuais ou continue processando mais imagens na mesma sessão.',
    ],
    tips: [
      'Ative bloqueio de proporção ao escalar fotos para evitar esticar ou achatar sujeitos.',
      'Redimensione antes de converter para PDF se o layout precisar de larguras uniformes.',
      'Em capturas com muito texto, evite redução agressiva — fontes pequenas borram abaixo de certa largura.',
      'PNG permanece sem perda mas maior; JPG e WEBP encolhem mais para conteúdo fotográfico.',
      'Quando ambas dimensões importam (avatars, ícones), defina pixels exatos em vez de só percentual.',
      'Mantenha cópia em resolução total até confirmar que o redimensionado atende sua barra de qualidade.',
    ],
    sections: [
      {
        id: 'dimensoes-vs-tamanho',
        heading: 'Dimensões versus tamanho de arquivo',
        level: 2,
        paragraphs: [
          'Largura e altura em pixels definem o tamanho visual na tela e na impressão a um DPI dado. O tamanho em megabytes depende de contagem de pixels, profundidade de cor e compressão. Reduzir de 4000×3000 para 1200×900 remove a maior parte dos bytes porque menos pixels precisam ser armazenados — muitas vezes mais eficaz que só mexer no controle de qualidade.',
          'Redimensionar não é o mesmo que recortar. Redimensionar escala o quadro inteiro; recortar remove bordas. Use redimensionar quando precisar da cena completa em pegada menor, e recorte antes se margens ao redor de documento fotografado desperdiçam pixels.',
        ],
      },
      {
        id: 'proporcao',
        heading: 'Quando bloquear a proporção',
        level: 2,
        paragraphs: [
          'Bloquear proporção mantém largura e altura proporcionais para círculos continuarem redondos e retratos não parecerem esticados. Informe uma dimensão alvo — largura ou altura — e deixe a ferramenta calcular a outra. É o fluxo padrão para fotos, produtos e gráficos sociais.',
          'Desbloqueie proporção só quando precisar deliberadamente de tamanho fixo e aceitar distorção, ou ao combinar com recorte em outro lugar. Para logos e assets de UI, prefira quadrado exato ou proporções padrão do design system.',
        ],
        bullets: [
          'Bloqueio ligado — fotos, retratos, paisagens',
          'Bloqueio desligado — casos raros de banner fixo com esticamento aceitável',
          'Só largura máxima — imagens web responsivas que escalam altura automaticamente',
        ],
      },
      {
        id: 'qualidade-apos-redimensionar',
        heading: 'Compressão após redimensionar',
        level: 2,
        paragraphs: [
          'Após reduzir dimensões, compressão adicional pode diminuir ainda mais bytes para e-mail e web. Um JPG redimensionado em qualidade 80–85 costuma parecer idêntico ao original em telas de notebook enquanto anexa facilmente. Para diagramas e capturas com linhas finas, prefira PNG ou JPG com qualidade maior para preservar nitidez.',
          'Redimensionar e recomprimir o mesmo JPG várias vezes introduz artefatos visíveis. Trabalhe sempre da fonte de maior qualidade, redimensione uma vez para o alvo e exporte.',
        ],
      },
      {
        id: 'fluxo-redimensionar',
        heading: 'Redimensionar em um fluxo maior de imagens',
        level: 3,
        paragraphs: [
          'Redimensionar combina naturalmente com outras ferramentas de imagem do PDFWINDOWS. Converta formatos incomuns primeiro no Conversor de Imagens, aplique filtros para melhorar contraste de scan, rode OCR na página redimensionada se reconhecimento falhar em fotos enormes, depois compile em PDF.',
        ],
        bullets: [
          'Conversor de Imagens — padronize formato antes de redimensionar',
          'Filtros de Imagem — aumente contraste em scans fracos antes de reduzir',
          'Imagem para PDF — compile imagens de largura uniforme em um documento',
        ],
      },
    ],
    faq: [
      ...privacyFaq('pt'),
      {
        q: 'Posso redimensionar várias imagens de uma vez?',
        a: 'Sim. Adicione vários arquivos na mesma sessão e aplique as mesmas configurações de dimensão a cada um. Útil ao preparar lote de fotos de produto ou scans de recibo para um único formulário.',
      },
      {
        q: 'Redimensionar reduz a qualidade da imagem?',
        a: 'Reduzir escala remove pixels, então ampliar muito depois não é possível sem borrão. Em alvos razoáveis para web e e-mail, imagens redimensionadas ficam nítidas. Ampliar além do tamanho original não inventa detalhe.',
      },
      {
        q: 'Devo redimensionar ou comprimir primeiro?',
        a: 'Redimensione primeiro para as dimensões alvo, depois ajuste compressão. Reduzir pixels costuma economizar mais espaço que só mexer na qualidade em fotos de câmera oversized.',
      },
      {
        q: 'Redimensionar remove metadados EXIF?',
        a: 'Exportação no navegador pode remover localização e metadados de câmera conforme formato e configurações. Se tags GPS ou copyright devem ser preservadas, verifique a saída ou guarde originais separadamente.',
      },
    ],
    relatedTools: ['/image-converter', '/image-to-pdf', '/image-filters', '/image-ocr'],
    cta: defaultCta('pt', 'Redimensionar Imagem'),
  },
  es: {
    title: 'Redimensionar Imagen Online Offline | PDFWINDOWS',
    description:
      'Redimensione y comprima imágenes en su navegador. Defina píxeles exactos, bloquee la proporción y descargue archivos optimizados sin subirlos a servidores.',
    keywords:
      'redimensionar imagen, comprimir imagen offline, escalar imagen navegador, reducir dimensiones imagen, redimensionador de imagen gratis',
    h1: 'Redimensionar Imagen — Procesamiento Local',
    intro:
      'Publicar, enviar por correo y subir imágenes suele empezar con un problema: el archivo tiene el tamaño equivocado. Las fotos de cámara llegan con miles de píxeles de ancho, mientras formularios web, campos de CMS y límites de adjuntos exigen algo más pequeño. Los redimensionadores en la nube resuelven eso copiando sus archivos a infraestructura de terceros — un mal trato cuando la imagen muestra historial clínico, producto no publicado o documento firmado. PDFWINDOWS redimensiona imágenes completamente en su navegador: defina ancho y alto, bloquee la proporción si lo desea, ajuste compresión y descargue el resultado sin transferir los originales por la red.',
    toolName: 'Redimensionar Imagen',
    benefits: [
      'Dimensiones precisas en píxeles con bloqueo opcional de proporción',
      'Controles de compresión para reducir tamaño tras redimensionar',
      'Procesamiento 100% local — sin subida a servidores de conversión',
      'Compatible con JPG, PNG, WEBP y otros formatos comunes',
      'Uso gratuito e ilimitado sin cuenta ni marcas de agua',
    ],
    useCases: [
      {
        title: 'Cumplir requisitos de dimensión en sitios y CMS',
        body:
          'Los equipos de marketing exportan banners, miniaturas e imágenes de blog en tamaños dictados por temas WordPress, plantillas Shopify o sistemas de diseño internos. Redimensionar localmente permite alcanzar píxeles exactos — 1200×630 para tarjetas sociales, 800×600 para cuadrículas de producto — sin enviar activos de campaña a hosts de imagen que pueden retener copias.',
      },
      {
        title: 'Ajustarse a límites de adjuntos de correo y chat',
        body:
          'Una sola foto de móvil puede superar límites SMTP corporativos o restricciones de apps de mensajería. Reducir dimensiones y aplicar compresión sensata suele llevar megabytes a kilobytes manteniendo rostros y texto legibles. Redimensionar localmente significa que recibos, fotos de equipo y capturas confidenciales no atraviesan una API externa.',
      },
      {
        title: 'Preparar conjuntos uniformes para documentos',
        body:
          'Antes de convertir fotos a PDF o armar presentaciones, dimensiones inconsistentes crean diseños incómodos. Redimensione en lote escaneos y capturas al mismo ancho para que las páginas alineen bien en Imagen a PDF, informes y entregables al cliente — todo en su equipo.',
      },
      {
        title: 'Optimizar flujos móviles y de campo',
        body:
          'Inspectores, docentes y personal sanitario capturan imágenes en móviles mucho mayores de lo que aceptan los portales. Redimensione en tableta u ordenador portátil antes de subir a sistemas de reclamaciones, plataformas educativas o formularios de RR. HH. El procesamiento en navegador funciona tras cargar la página, incluso en redes restringidas.',
      },
      {
        title: 'Higiene de archivo y almacenamiento',
        body:
          'Copias de seguridad y unidades compartidas acumulan PNG y JPG enormes de años de capturas. Redimensionar imágenes de referencia poco consultadas libera espacio en NAS preservando detalle para consulta futura.',
      },
    ],
    howItWorks: [
      'Abra Redimensionar Imagen y agregue uno o más archivos desde su dispositivo.',
      'Introduzca ancho, alto o una dimensión con bloqueo de proporción activado.',
      'Ajuste calidad o compresión cuando esté disponible para equilibrar tamaño y nitidez.',
      'Previsualice el resultado redimensionado en el navegador antes de descargar.',
      'Descargue archivos individuales o continúe procesando más imágenes en la misma sesión.',
    ],
    tips: [
      'Active el bloqueo de proporción al escalar fotos para que los sujetos no se estiren ni aplasten.',
      'Redimensione antes de convertir a PDF si el diseño necesita anchos uniformes de imagen.',
      'En capturas con mucho texto, evite reducción agresiva — fuentes pequeñas se difuminan bajo cierto ancho.',
      'PNG permanece sin pérdida pero más grande; JPG y WEBP reducen más para contenido fotográfico.',
      'Cuando ambas dimensiones importan (avatares, iconos), defina píxeles exactos en lugar de solo porcentaje.',
      'Conserve copia en resolución completa hasta confirmar que el redimensionado cumple su estándar de calidad.',
    ],
    sections: [
      {
        id: 'dimensiones-vs-tamano',
        heading: 'Dimensiones versus tamaño de archivo',
        level: 2,
        paragraphs: [
          'El ancho y alto en píxeles determinan el tamaño visual en pantalla e impresión a un DPI dado. El tamaño en megabytes depende del conteo de píxeles, profundidad de color y compresión. Reducir de 4000×3000 a 1200×900 elimina la mayor parte de los bytes porque se almacenan menos píxeles — a menudo más efectivo que solo ajustar controles de calidad.',
          'Redimensionar no es lo mismo que recortar. Redimensionar escala el marco completo; recortar elimina bordes.',
        ],
      },
      {
        id: 'proporcion',
        heading: 'Cuándo bloquear la proporción',
        level: 2,
        paragraphs: [
          'Bloquear la proporción mantiene ancho y alto proporcionales para que círculos sigan redondos y retratos no parezcan estirados. Introduzca una dimensión objetivo — ancho o alto — y deje que la herramienta calcule la otra. Es el flujo predeterminado para fotos, productos y gráficos sociales.',
          'Desbloquee la proporción solo cuando necesite un tamaño fijo y acepte distorsión. Para logos y activos de UI, prefiera cuadrado exacto o proporciones estándar del sistema de diseño.',
        ],
        bullets: [
          'Bloqueo activado — fotos, retratos, paisajes',
          'Bloqueo desactivado — casos raros de banner fijo con estiramiento aceptable',
          'Solo ancho máximo — imágenes web responsivas que escalan alto automáticamente',
        ],
      },
      {
        id: 'calidad-tras-redimensionar',
        heading: 'Compresión tras redimensionar',
        level: 2,
        paragraphs: [
          'Tras reducir dimensiones, compresión adicional puede disminuir bytes para correo y web. Un JPG redimensionado en calidad 80–85 suele parecer idéntico al original en pantallas de portátil. Para diagramas y capturas con líneas finas, prefiera PNG o JPG con mayor calidad.',
          'Redimensionar y recomprimir el mismo JPG repetidamente introduce artefactos visibles. Trabaje siempre desde la fuente de mayor calidad, redimensione una vez al objetivo y exporte.',
        ],
      },
      {
        id: 'flujo-redimensionar',
        heading: 'Redimensionar en un flujo mayor de imágenes',
        level: 3,
        paragraphs: [
          'Redimensionar combina naturalmente con otras herramientas de imagen de PDFWINDOWS. Convierta formatos poco comunes primero con Conversor de Imágenes, aplique filtros para mejorar contraste de escaneo, ejecute OCR en la página redimensionada si el reconocimiento falla en fotos enormes, luego compile en PDF.',
        ],
        bullets: [
          'Conversor de Imágenes — estandarice formato antes de redimensionar',
          'Filtros de Imagen — aumente contraste en escaneos débiles antes de reducir',
          'Imagen a PDF — compile imágenes de ancho uniforme en un documento',
        ],
      },
    ],
    faq: [
      ...privacyFaq('es'),
      {
        q: '¿Puedo redimensionar varias imágenes a la vez?',
        a: 'Sí. Agregue varios archivos en una sesión y aplique las mismas configuraciones de dimensión a cada uno. Útil al preparar lote de fotos de producto o escaneos de recibo para un solo formulario.',
      },
      {
        q: '¿Redimensionar reduce la calidad de la imagen?',
        a: 'Reducir escala elimina píxeles, por lo que ampliar mucho después no es posible sin borrosidad. En objetivos razonables para web y correo, las imágenes redimensionadas se ven nítidas. Ampliar más allá del tamaño original no inventa detalle.',
      },
      {
        q: '¿Debo redimensionar o comprimir primero?',
        a: 'Redimensione primero a las dimensiones objetivo, luego ajuste compresión. Reducir píxeles suele ahorrar más espacio que solo ajustar calidad en fotos de cámara sobredimensionadas.',
      },
      {
        q: '¿Redimensionar elimina metadatos EXIF?',
        a: 'La exportación en navegador puede eliminar ubicación y metadatos de cámara según formato y configuración. Si deben preservarse etiquetas GPS o copyright, verifique la salida o guarde originales por separado.',
      },
    ],
    relatedTools: ['/image-converter', '/image-to-pdf', '/image-filters', '/image-ocr'],
    cta: defaultCta('es', 'Redimensionar Imagen'),
  },
};
