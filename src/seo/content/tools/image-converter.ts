import type { ToolRichContent } from '../types';
import { privacyFaq, defaultCta } from '../helpers';

export const IMAGE_CONVERTER_CONTENT: Record<'en' | 'pt' | 'es', ToolRichContent> = {
  en: {
    title: 'Image Converter Online Offline | PDFWINDOWS',
    description:
      'Convert JPG, PNG, WEBP, GIF, and BMP images in your browser. No upload, no account — fast local format conversion with quality control.',
    keywords:
      'image converter, jpg to png, png to webp, convert image format offline, browser image converter, free image converter',
    h1: 'Image Converter',
    intro:
      'PDFWINDOWS Image Converter lets you change image formats entirely inside your browser. Whether you need to turn a PNG screenshot into a smaller JPG for email, convert legacy BMP files for modern apps, or export WEBP assets for broader compatibility, every conversion runs on your device. Files never leave your computer, which makes this tool ideal for confidential screenshots, client deliverables, and personal photos. Adjust output quality, preview results, and download converted images in seconds without installing desktop software or creating an account.',
    toolName: 'Image Converter',
    benefits: [
      'Supports popular formats including JPG, PNG, WEBP, GIF, and BMP',
      'All processing happens locally — no server upload required',
      'Fine-tune compression and quality before downloading',
      'Works on Windows, macOS, Linux, and mobile browsers',
      'Free to use with no registration or watermarks',
    ],
    useCases: [
      {
        title: 'Reduce file size for email and chat',
        body: 'Large PNG screenshots can exceed attachment limits. Converting to JPG with controlled quality often cuts file size dramatically while keeping text readable. Use this when sharing bug reports, design feedback, or quick captures with teammates who do not need lossless transparency.',
      },
      {
        title: 'Prepare images for websites and CMS uploads',
        body: 'Many content systems prefer WEBP or JPG for faster page loads. Convert source assets from camera RAW exports, design tools, or scanned PNGs into web-friendly formats before uploading to WordPress, Shopify, or internal portals — without sending originals to third-party conversion sites.',
      },
      {
        title: 'Migrate legacy assets to modern formats',
        body: 'Older projects may still store BMP or GIF files that modern pipelines handle poorly. Batch-convert archives locally so developers, marketers, and archivists can standardize on PNG or WEBP while preserving visual fidelity appropriate to each asset type.',
      },
      {
        title: 'Cross-platform compatibility for apps and documents',
        body: 'Some desktop tools and PDF workflows accept only specific image types. Convert icons, diagrams, and illustrations to the required format before embedding them in presentations, reports, or signature blocks, keeping sensitive visuals on your machine throughout the process.',
      },
      {
        title: 'Optimize social and marketing asset delivery',
        body:
          'Campaign teams export hero images, ad creatives, and email banners from design tools at uncompressed sizes. Converting to WEBP or optimized JPG locally before upload to ad platforms and ESPs reduces transfer time and keeps unreleased creative work off third-party conversion logs.',
      },
    ],
    howItWorks: [
      'Open the Image Converter page and add one or more image files from your device.',
      'Choose the target format — JPG, PNG, WEBP, GIF, or BMP — based on your downstream needs.',
      'Set quality or compression options when available to balance size and visual clarity.',
      'Preview the converted output in the browser to confirm colors and sharpness.',
      'Download the new files individually or process additional images in the same session.',
    ],
    tips: [
      'Use PNG when you need transparency; JPG is better for photos without alpha channels.',
      'WEBP typically offers the best size-to-quality ratio for web publishing.',
      'Avoid re-saving the same JPG multiple times — each pass can introduce visible artifacts.',
      'For text-heavy screenshots, slightly higher quality preserves small fonts better than aggressive compression.',
      'Keep originals archived before converting so you can re-export if requirements change.',
      'When batch converting, use consistent quality settings so a folder of assets looks uniform in the final deliverable.',
    ],
    sections: [
      {
        id: 'formats',
        heading: 'Supported image formats explained',
        level: 2,
        paragraphs: [
          'Different image formats excel in different scenarios. JPG uses lossy compression and is ideal for photographs and gradients where small file size matters more than pixel-perfect edges. PNG uses lossless compression and supports transparency, making it the default choice for UI mockups, logos, and diagrams with sharp lines.',
          'WEBP combines efficient compression with optional transparency, which is why major browsers and CDNs recommend it for performance. GIF remains useful for simple animations and legacy systems, while BMP provides uncompressed raster data for specialized workflows that require raw bitmap compatibility.',
        ],
        bullets: [
          'JPG — photos, social posts, email attachments',
          'PNG — screenshots, icons, graphics with transparency',
          'WEBP — modern websites and performance-sensitive delivery',
          'GIF — short animations and legacy compatibility',
          'BMP — uncompressed interchange in older pipelines',
        ],
      },
      {
        id: 'quality',
        heading: 'Choosing the right quality settings',
        level: 2,
        paragraphs: [
          'Quality sliders directly affect file size and perceived sharpness. A quality setting around 80–85 often yields excellent results for photos while keeping attachments lightweight. For images with fine text or thin UI lines, bump quality higher or stay on PNG to avoid blurry edges.',
          'When converting from PNG to JPG, remember that transparent areas are typically filled with a solid background color. If transparency matters, keep PNG or switch to WEBP instead of JPG.',
        ],
      },
      {
        id: 'privacy',
        heading: 'Why local conversion protects your files',
        level: 2,
        paragraphs: [
          'Cloud-based converters upload your images to remote servers, which may retain copies, scan content, or impose usage limits. PDFWINDOWS processes images with browser APIs on your hardware, so confidential scans, ID photos, and proprietary designs never traverse the network.',
          'Local conversion also works offline once the page is loaded, making it dependable on restricted corporate networks, airplanes, and field locations where external uploads are blocked or discouraged.',
        ],
      },
      {
        id: 'converter-workflow',
        heading: 'Image Converter in your media workflow',
        level: 3,
        paragraphs: [
          'Format conversion is often the first step before resize, filter, OCR, or PDF packaging. Standardize a batch to WEBP for the web, downscale with Image Resize, enhance scans with Image Filters, then compile deliverables with Image to PDF — all without leaving the browser.',
        ],
        bullets: [
          'Image Resize — match dimension requirements after format change',
          'Image Filters — improve contrast before OCR or PDF export',
          'Image to PDF — bundle converted images into one document',
        ],
      },
    ],
    faq: [
      ...privacyFaq('en'),
      {
        q: 'Which formats can I convert between?',
        a: 'You can convert among JPG, PNG, WEBP, GIF, and BMP. Pick the output format that matches your target application — for example WEBP for websites or PNG when transparency is required.',
      },
      {
        q: 'Will converting reduce image quality?',
        a: 'Lossy formats like JPG and WEBP may reduce quality depending on your settings. PNG and BMP conversions preserve more detail but produce larger files. Use the quality control to find the right balance.',
      },
      {
        q: 'Can I convert multiple images at once?',
        a: 'Yes. Add several files in one session and convert each to your chosen format. This is useful when standardizing a folder of assets for a project or website migration.',
      },
      {
        q: 'Does transparency survive conversion?',
        a: 'PNG and WEBP support transparency. JPG and BMP do not — transparent regions are replaced with a background color when converting to those formats.',
      },
    ],
    relatedTools: ['/image-resize', '/image-to-pdf', '/image-filters', '/pdf-to-image'],
    cta: defaultCta('en', 'Image Converter'),
  },
  pt: {
    title: 'Conversor de Imagens Online Offline | PDFWINDOWS',
    description:
      'Converta JPG, PNG, WEBP, GIF e BMP no navegador. Sem upload, sem cadastro — conversão local rápida com controle de qualidade.',
    keywords:
      'conversor de imagem, jpg para png, png para webp, converter imagem offline, conversor de imagem no navegador',
    h1: 'Conversor de Imagens',
    intro:
      'O Conversor de Imagens do PDFWINDOWS permite alterar formatos de imagem inteiramente no seu navegador. Seja para transformar um print PNG em JPG menor para e-mail, converter arquivos BMP antigos para apps modernos ou exportar WEBP com maior compatibilidade, toda conversão roda no seu dispositivo. Os arquivos nunca saem do computador, o que torna a ferramenta ideal para capturas confidenciais, entregas a clientes e fotos pessoais. Ajuste qualidade, visualize o resultado e baixe as imagens convertidas em segundos, sem instalar software ou criar conta.',
    toolName: 'Conversor de Imagens',
    benefits: [
      'Suporta JPG, PNG, WEBP, GIF e BMP',

      'Ajuste compressão e qualidade antes do download',
      'Funciona no Windows, macOS, Linux e navegadores móveis',
      'Gratuito, sem cadastro e sem marcas d\'água',
    ],
    useCases: [
      {
        title: 'Reduzir tamanho para e-mail e mensagens',
        body: 'Prints PNG grandes podem ultrapassar limites de anexo. Converter para JPG com qualidade controlada costuma reduzir muito o tamanho mantendo texto legível — útil para relatórios de bug, feedback de design ou capturas rápidas com a equipe.',
      },
      {
        title: 'Preparar imagens para sites e CMS',
        body: 'Muitos sistemas preferem WEBP ou JPG para carregamento mais rápido. Converta assets de câmera, ferramentas de design ou scans PNG para formatos web antes de subir no WordPress, Shopify ou portais internos, sem enviar originais a sites de terceiros.',
      },
      {
        title: 'Migrar arquivos legados para formatos modernos',
        body: 'Projetos antigos podem ter BMP ou GIF que pipelines atuais tratam mal. Converta arquivos localmente para padronizar em PNG ou WEBP, preservando fidelidade visual adequada a cada tipo de asset.',
      },
      {
        title: 'Compatibilidade entre plataformas',
        body: 'Algumas ferramentas e fluxos de PDF aceitam só certos formatos. Converta ícones, diagramas e ilustrações antes de embutir em apresentações, relatórios ou assinaturas, mantendo visuais sensíveis apenas na sua máquina.',
      },
      {
        title: 'Otimizar entrega de assets de marketing',
        body:
          'Equipes de campanha exportam imagens hero, criativos de anúncio e banners de e-mail de ferramentas de design em tamanhos sem compressão. Converter para WEBP ou JPG otimizado localmente antes de subir em plataformas de ads e ESPs reduz tempo de transferência e mantém trabalho criativo não lançado fora de logs de conversores de terceiros.',
      },
    ],
    howItWorks: [
      'Abra a página do Conversor de Imagens e adicione um ou mais arquivos do dispositivo.',
      'Escolha o formato de saída — JPG, PNG, WEBP, GIF ou BMP — conforme a necessidade.',
      'Defina qualidade ou compressão quando disponível para equilibrar tamanho e nitidez.',
      'Visualize o resultado no navegador para confirmar cores e definição.',
      'Baixe os novos arquivos ou processe mais imagens na mesma sessão.',
    ],
    tips: [
      'Use PNG quando precisar de transparência; JPG é melhor para fotos sem canal alpha.',
      'WEBP costuma oferecer a melhor relação tamanho/qualidade para publicação web.',
      'Evite re-salvar o mesmo JPG várias vezes — cada passagem pode gerar artefatos visíveis.',
      'Em capturas com muito texto, qualidade um pouco maior preserva fontes pequenas.',
      'Guarde os originais antes de converter para poder reexportar se os requisitos mudarem.',
      'Em conversão em lote, use configurações de qualidade consistentes para a pasta de assets parecer uniforme na entrega final.',
    ],
    sections: [
      {
        id: 'formatos',
        heading: 'Formatos suportados explicados',
        level: 2,
        paragraphs: [
          'Cada formato de imagem se destaca em cenários diferentes. JPG usa compressão com perda e é ideal para fotos e gradientes onde tamanho importa mais que bordas perfeitas. PNG usa compressão sem perda e suporta transparência — padrão para mockups, logos e diagramas com linhas nítidas.',
          'WEBP combina compressão eficiente com transparência opcional, recomendado por navegadores e CDNs. GIF ainda serve para animações simples e sistemas legados; BMP oferece bitmap sem compressão para fluxos especializados.',
        ],
        bullets: [
          'JPG — fotos, redes sociais, anexos de e-mail',
          'PNG — capturas de tela, ícones, gráficos com transparência',
          'WEBP — sites modernos e entrega com foco em performance',
          'GIF — animações curtas e compatibilidade legada',
          'BMP — interchange sem compressão em pipelines antigos',
        ],
      },
      {
        id: 'qualidade',
        heading: 'Como escolher a qualidade certa',
        level: 2,
        paragraphs: [
          'Controles de qualidade afetam tamanho e nitidez percebida. Entre 80–85 costuma dar ótimos resultados em fotos com arquivos leves. Para imagens com texto fino ou linhas de interface, aumente a qualidade ou mantenha PNG para evitar bordas borradas.',
          'Ao converter PNG para JPG, áreas transparentes viram cor de fundo sólida. Se transparência for essencial, mantenha PNG ou use WEBP em vez de JPG.',
        ],
      },
      {
        id: 'privacidade',
        heading: 'Por que converter localmente protege seus arquivos',
        level: 2,
        paragraphs: [
          'Conversores na nuvem enviam imagens a servidores remotos que podem reter cópias ou impor limites. O PDFWINDOWS processa com APIs do navegador no seu hardware — scans confidenciais, fotos de documento e designs proprietários não atravessam a rede.',
          'A conversão local também funciona offline após carregar a página, útil em redes corporativas restritas, voos e locais onde upload externo é bloqueado.',
        ],
      },
      {
        id: 'fluxo-conversor',
        heading: 'Conversor de Imagens no seu fluxo de mídia',
        level: 3,
        paragraphs: [
          'Conversão de formato costuma ser o primeiro passo antes de redimensionar, filtrar, OCR ou empacotar em PDF. Padronize um lote em WEBP para web, reduza com Redimensionar Imagem, melhore scans com Filtros de Imagem e compile entregas com Imagem para PDF — tudo sem sair do navegador.',
        ],
        bullets: [
          'Redimensionar Imagem — atenda requisitos de dimensão após mudar formato',
          'Filtros de Imagem — melhore contraste antes de OCR ou export PDF',
          'Imagem para PDF — una imagens convertidas em um documento',
        ],
      },
    ],
    faq: [
      ...privacyFaq('pt'),
      {
        q: 'Entre quais formatos posso converter?',
        a: 'Entre JPG, PNG, WEBP, GIF e BMP. Escolha o formato de saída conforme o destino — WEBP para sites ou PNG quando precisar de transparência.',
      },
      {
        q: 'A conversão reduz a qualidade da imagem?',
        a: 'Formatos com perda como JPG e WEBP podem reduzir qualidade conforme as configurações. PNG e BMP preservam mais detalhe com arquivos maiores. Use o controle de qualidade para equilibrar.',
      },
      {
        q: 'Posso converter várias imagens de uma vez?',
        a: 'Sim. Adicione vários arquivos na mesma sessão e converta cada um para o formato escolhido — ideal para padronizar pastas de um projeto ou migração de site.',
      },
      {
        q: 'A transparência é mantida na conversão?',
        a: 'PNG e WEBP suportam transparência. JPG e BMP não — regiões transparentes viram cor de fundo ao converter para esses formatos.',
      },
    ],
    relatedTools: ['/image-resize', '/image-to-pdf', '/image-filters', '/pdf-to-image'],
    cta: defaultCta('pt', 'Conversor de Imagens'),
  },
  es: {
    title: 'Conversor de Imágenes Online Offline | PDFWINDOWS',
    description:
      'Convierta JPG, PNG, WEBP, GIF y BMP en su navegador. Sin subida, sin cuenta — conversión local rápida con control de calidad.',
    keywords:
      'conversor de imágenes, jpg a png, png a webp, convertir imagen offline, conversor de imagen en navegador',
    h1: 'Conversor de Imágenes',
    intro:
      'El Conversor de Imágenes de PDFWINDOWS le permite cambiar formatos de imagen completamente en su navegador. Ya sea convertir una captura PNG en un JPG más pequeño para correo, transformar archivos BMP heredados para aplicaciones modernas o exportar WEBP con mayor compatibilidad, toda conversión se ejecuta en su dispositivo. Los archivos nunca salen de su equipo, ideal para capturas confidenciales, entregables de clientes y fotos personales. Ajuste calidad, previsualice resultados y descargue imágenes convertidas en segundos sin instalar software ni crear cuenta.',
    toolName: 'Conversor de Imágenes',
    benefits: [
      'Compatible con JPG, PNG, WEBP, GIF y BMP',
      'Procesamiento totalmente local — sin subida a servidores',
      'Ajuste compresión y calidad antes de descargar',
      'Funciona en Windows, macOS, Linux y navegadores móviles',
      'Gratis, sin registro y sin marcas de agua',
    ],
    useCases: [
      {
        title: 'Reducir tamaño para correo y chat',
        body: 'Las capturas PNG grandes pueden superar límites de adjuntos. Convertir a JPG con calidad controlada suele reducir mucho el tamaño manteniendo texto legible — útil para informes de errores, feedback de diseño o capturas rápidas con el equipo.',
      },
      {
        title: 'Preparar imágenes para sitios web y CMS',
        body: 'Muchos sistemas prefieren WEBP o JPG para cargas más rápidas. Convierta activos de cámara, herramientas de diseño o escaneos PNG a formatos web antes de subirlos a WordPress, Shopify o portales internos, sin enviar originales a sitios de terceros.',
      },
      {
        title: 'Migrar activos heredados a formatos modernos',
        body: 'Proyectos antiguos pueden tener BMP o GIF que los flujos actuales manejan mal. Convierta archivos localmente para estandarizar en PNG o WEBP, preservando fidelidad visual adecuada a cada tipo de activo.',
      },
      {
        title: 'Compatibilidad entre plataformas',
        body: 'Algunas herramientas y flujos PDF solo aceptan ciertos formatos. Convierta iconos, diagramas e ilustraciones antes de incrustarlos en presentaciones, informes o firmas, manteniendo visuales sensibles solo en su máquina.',
      },
      {
        title: 'Optimizar entrega de activos de marketing',
        body:
          'Los equipos de campaña exportan imágenes hero, creatividades de anuncio y banners de correo desde herramientas de diseño en tamaños sin comprimir. Convertir a WEBP o JPG optimizado localmente antes de subir a plataformas de ads y ESP reduce tiempo de transferencia y mantiene trabajo creativo no publicado fuera de logs de conversores de terceros.',
      },
    ],
    howItWorks: [
      'Abra la página del Conversor de Imágenes y agregue uno o más archivos desde su dispositivo.',
      'Elija el formato de salida — JPG, PNG, WEBP, GIF o BMP — según sus necesidades.',
      'Configure calidad o compresión cuando esté disponible para equilibrar tamaño y nitidez.',
      'Previsualice el resultado en el navegador para confirmar colores y definición.',
      'Descargue los nuevos archivos o procese más imágenes en la misma sesión.',
    ],
    tips: [
      'Use PNG cuando necesite transparencia; JPG es mejor para fotos sin canal alpha.',
      'WEBP suele ofrecer la mejor relación tamaño/calidad para publicación web.',
      'Evite volver a guardar el mismo JPG varias veces — cada paso puede introducir artefactos.',
      'En capturas con mucho texto, una calidad algo mayor preserva fuentes pequeñas.',
      'Conserve los originales antes de convertir para poder reexportar si cambian los requisitos.',
      'Al convertir en lote, use configuraciones de calidad consistentes para que una carpeta de activos se vea uniforme en la entrega final.',
    ],
    sections: [
      {
        id: 'formatos',
        heading: 'Formatos compatibles explicados',
        level: 2,
        paragraphs: [
          'Cada formato de imagen destaca en escenarios distintos. JPG usa compresión con pérdida, ideal para fotos y degradados donde el tamaño importa más que bordes perfectos. PNG usa compresión sin pérdida y admite transparencia — estándar para mockups, logos y diagramas con líneas nítidas.',
          'WEBP combina compresión eficiente con transparencia opcional, recomendado por navegadores y CDNs. GIF sigue sirviendo para animaciones simples y sistemas heredados; BMP ofrece mapa de bits sin comprimir para flujos especializados.',
        ],
        bullets: [
          'JPG — fotos, redes sociales, adjuntos de correo',
          'PNG — capturas de pantalla, iconos, gráficos con transparencia',
          'WEBP — sitios modernos y entrega orientada al rendimiento',
          'GIF — animaciones cortas y compatibilidad heredada',
          'BMP — intercambio sin compresión en pipelines antiguos',
        ],
      },
      {
        id: 'calidad',
        heading: 'Cómo elegir la calidad adecuada',
        level: 2,
        paragraphs: [
          'Los controles de calidad afectan tamaño y nitidez percibida. Entre 80–85 suele dar excelentes resultados en fotos con archivos ligeros. Para imágenes con texto fino o líneas de interfaz, suba la calidad o mantenga PNG para evitar bordes borrosos.',
          'Al convertir PNG a JPG, las áreas transparentes pasan a color de fondo sólido. Si la transparencia es esencial, mantenga PNG o use WEBP en lugar de JPG.',
        ],
      },
      {
        id: 'privacidad',
        heading: 'Por qué convertir localmente protege sus archivos',
        level: 2,
        paragraphs: [
          'Los conversores en la nube suben imágenes a servidores remotos que pueden retener copias o imponer límites. PDFWINDOWS procesa con APIs del navegador en su hardware — escaneos confidenciales, fotos de documentos y diseños propietarios no atraviesan la red.',
          'La conversión local también funciona sin conexión una vez cargada la página, útil en redes corporativas restringidas, vuelos y lugares donde la subida externa está bloqueada.',
        ],
      },
      {
        id: 'flujo-conversor',
        heading: 'Conversor de Imágenes en su flujo de medios',
        level: 3,
        paragraphs: [
          'La conversión de formato suele ser el primer paso antes de redimensionar, filtrar, OCR o empaquetar en PDF. Estandarice un lote en WEBP para web, reduzca con Redimensionar Imagen, mejore escaneos con Filtros de Imagen y compile entregables con Imagen a PDF — todo sin salir del navegador.',
        ],
        bullets: [
          'Redimensionar Imagen — cumpla requisitos de dimensión tras cambiar formato',
          'Filtros de Imagen — mejore contraste antes de OCR o export PDF',
          'Imagen a PDF — una imágenes convertidas en un documento',
        ],
      },
    ],
    faq: [
      ...privacyFaq('es'),
      {
        q: '¿Entre qué formatos puedo convertir?',
        a: 'Entre JPG, PNG, WEBP, GIF y BMP. Elija el formato de salida según el destino — WEBP para sitios web o PNG cuando necesite transparencia.',
      },
      {
        q: '¿La conversión reduce la calidad de la imagen?',
        a: 'Formatos con pérdida como JPG y WEBP pueden reducir calidad según la configuración. PNG y BMP preservan más detalle con archivos más grandes. Use el control de calidad para equilibrar.',
      },
      {
        q: '¿Puedo convertir varias imágenes a la vez?',
        a: 'Sí. Agregue varios archivos en la misma sesión y convierta cada uno al formato elegido — ideal para estandarizar carpetas de un proyecto o migración de sitio.',
      },
      {
        q: '¿Se mantiene la transparencia en la conversión?',
        a: 'PNG y WEBP admiten transparencia. JPG y BMP no — las regiones transparentes se reemplazan por color de fondo al convertir a esos formatos.',
      },
    ],
    relatedTools: ['/image-resize', '/image-to-pdf', '/image-filters', '/pdf-to-image'],
    cta: defaultCta('es', 'Conversor de Imágenes'),
  },
};
