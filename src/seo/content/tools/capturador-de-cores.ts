import type { ToolRichContent } from '../types';
import { privacyFaq, defaultCta } from '../helpers';

export const CAPTURADOR_CORES_CONTENT: Record<'en' | 'pt' | 'es', ToolRichContent> = {
  en: {
    title: 'Online Color Picker — HEX, RGB & HSL | PDFWINDOWS',
    description:
      'Pick colors from images or your screen with an eyedropper. Get HEX, RGB, and HSL codes instantly',
    keywords:
      'color picker online, hex code finder, eyedropper tool, extract color from image, offline color picker, dominant palette',
    h1: 'Color Picker — Image & Screen Capture',
    intro:
      'PDFWINDOWS Color Picker helps designers, developers, and marketers capture exact color values from any image or directly from the screen using the browser EyeDropper API. Extract HEX, RGB, and HSL codes in real time, build a dominant palette automatically, and keep a local history of recent picks — all without uploading files to external servers. Whether you are matching brand colors from a logo or sampling UI elements from a screenshot, the tool delivers precise values you can paste into CSS, Figma, or design systems immediately.',
    toolName: 'Color Picker',
    benefits: [
      'Pick colors from uploaded images or live screen pixels',
      'HEX, RGB, and HSL output with one-click copy',
      'Automatic dominant palette extraction from images',
      'Local history of recent color picks',
      'No image upload — processing stays in the browser',
      'Works with modern Chrome, Edge, and Firefox',
    ],
    useCases: [
      {
        title: 'Web development and CSS variables',
        body: 'Sample a color from a mockup screenshot and paste the HEX value directly into your stylesheet or Tailwind config without guessing from color wheels.',
      },
      {
        title: 'Brand guideline compliance',
        body: 'Marketing teams verify that social media graphics use approved palette values by sampling pixels from exported assets locally.',
      },
      {
        title: 'UI design handoff',
        body: 'Designers capture exact accent colors from prototype images to document tokens for developers without sharing source files on third-party pickers.',
      },
      {
        title: 'Print and packaging reference',
        body: 'Extract dominant palette clusters from product photography to brief print vendors with consistent color references.',
      },
      {
        title: 'Accessibility contrast checks',
        body: 'Sample foreground and background colors from interface screenshots, then test contrast ratios in your preferred accessibility tool.',
      },
    ],
    howItWorks: [
      'Choose image upload or screen capture mode depending on your source.',
      'Click the pixel you want — the tool displays HEX, RGB, and HSL instantly.',
      'Copy any format to clipboard or review the auto-generated dominant palette.',
      'Browse local history to reuse colors picked earlier in the session.',
    ],
    tips: [
      'Use screen capture for live UI elements; upload mode works best for logos and static assets.',
      'Dominant palette helps when you need a full theme extracted from a hero image.',
      'Copy HSL when adjusting lightness in code — it is easier to reason about than HEX.',
      'Zoom into high-resolution images before picking subtle gradient pixels.',
      'When working with brand palettes, document each captured code in an internal style guide so designers and developers stay visually consistent across digital and print channels.',
      'Clear history when switching client projects to avoid mixing brand palettes.',
      'Pair with Image Filters to preview how sampled colors look after brightness adjustments.',
    ],
    sections: [
      {
        id: 'why-local-color-picker',
        heading: 'Why use a local color picker?',
        level: 2,
        paragraphs: [
          'Many online color tools upload your images to remote servers for analysis. That is unacceptable when working with unreleased product shots, confidential brand assets, or client materials under NDA. PDFWINDOWS processes every pixel in your browser using Canvas APIs.',
          'The result is instant feedback and zero data exfiltration. Your images never leave RAM unless you explicitly download an export.',
          'Designers working under NDA on rebranding projects can sample competitor screenshots or internal mood boards without uploading those assets to color extraction services that retain files for machine learning training.',
        ],
      },
      {
        id: 'image-vs-screen',
        heading: 'Image upload versus screen capture',
        level: 2,
        paragraphs: [
          'Image mode lets you drop PNG, JPG, or WEBP files and click anywhere on the canvas. The magnifier-style precision helps when working with detailed illustrations or compressed photos.',
          'Screen mode leverages the native EyeDropper API available in Chromium browsers. You can sample any visible pixel on your monitor — including other applications — after granting one-time permission.',
        ],
      },
      {
        id: 'color-formats',
        heading: 'Understanding HEX, RGB, and HSL output',
        level: 2,
        paragraphs: [
          'HEX is the compact format most design tools expect (#2563eb). RGB expresses red, green, and blue channels for programmatic use. HSL represents hue, saturation, and lightness — ideal when theming because you can shift lightness without recalculating channels manually.',
        ],
        bullets: [
          'HEX — six-digit shorthand for web and mobile CSS',
          'RGB — channel values for canvas, SVG, and graphics APIs',
          'HSL — human-friendly adjustments for design systems',
        ],
      },
      {
        id: 'dominant-palette',
        heading: 'Dominant palette extraction',
        level: 2,
        paragraphs: [
          'Beyond single-pixel picks, the tool analyzes color frequency across your image to surface a dominant palette. This is useful when building landing pages, slide decks, or social templates that should echo photography already in your asset library.',
          'Palette swatches are clickable — selecting one copies the value just like a manual pick, so you can move quickly from exploration to implementation.',
          'When building accessible interfaces, sample both text and background colors from your mockup, then paste HSL values into design tokens so light and dark theme variants stay mathematically consistent.',
        ],
      },
    ],
    faq: [
      ...privacyFaq('en'),
      {
        q: 'Does screen capture work in every browser?',
        a: 'Screen capture requires the EyeDropper API, supported in Chromium-based browsers and recent Firefox. Image upload mode works broadly across modern browsers.',
      },
      {
        q: 'Are my images uploaded when I pick colors?',
        a: 'No. Images are read locally via File API and drawn to a canvas in memory. They are never transmitted to PDFWINDOWS servers.',
      },
      {
        q: 'Can I export the color history?',
        a: 'History persists for your current session in local storage patterns. You can copy individual values anytime from the history panel.',
      },
      {
        q: 'How accurate is the dominant palette?',
        a: 'The algorithm clusters frequent colors while ignoring near-white and near-black noise. It is tuned for UI and marketing imagery rather than scientific imaging.',
      },
      {
        q: 'Can I pick colors from PDFs?',
        a: 'Export PDF pages to images using PDFWINDOWS PDF to Image tool first, then upload the result here for precise sampling.',
      },
    ],
    relatedTools: ['/image-filters', '/image-converter', '/pdf-to-image', '/image-resize'],
    cta: defaultCta('en', 'Color Picker'),
  },
  pt: {
    title: 'Capturador de Cores Online — HEX, RGB e HSL | PDFWINDOWS',
    description:
      'Capture cores de imagens ou da tela com conta-gotas. Obtenha códigos HEX, RGB e HSL instantaneamente',
    keywords:
      'capturar cor online, descobrir código HEX, conta-gotas, extrair cor da imagem, color picker offline, paleta dominante',
    h1: 'Capturador de Cores — Imagem e Tela',
    intro:
      'O Capturador de Cores do PDFWINDOWS ajuda designers, desenvolvedores e profissionais de marketing a capturar valores exatos de qualquer imagem ou diretamente da tela usando a API EyeDropper do navegador. Extraia HEX, RGB e HSL em tempo real, gere paleta dominante automaticamente e mantenha histórico local — tudo sem enviar arquivos para servidores externos. Seja para igualar cores de marca em um logotipo ou amostrar elementos de interface em um print, a ferramenta entrega valores precisos para colar em CSS, Figma ou design systems.',
    toolName: 'Capturador de Cores',
    benefits: [
      'Captura por imagem enviada ou pixels da tela ao vivo',
      'Saída HEX, RGB e HSL com cópia em um clique',
      'Extração automática de paleta dominante',
      'Histórico local de cores recentes',
      'Sem upload de imagem — processamento no navegador',
      'Compatível com Chrome, Edge e Firefox modernos',
    ],
    useCases: [
      {
        title: 'Desenvolvimento web e variáveis CSS',
        body: 'Amostre uma cor de um mockup e cole o HEX diretamente na folha de estilos ou config Tailwind sem adivinhar no seletor.',
      },
      {
        title: 'Conformidade com manual de marca',
        body: 'Equipes de marketing verificam se artes sociais usam cores aprovadas amostrando pixels de arquivos exportados localmente.',
      },
      {
        title: 'Handoff de design de UI',
        body: 'Designers capturam cores de protótipos para documentar tokens sem compartilhar arquivos em pickers de terceiros.',
      },
      {
        title: 'Referência para impressão',
        body: 'Extraia clusters de paleta dominante de fotos de produto para briefar gráficas com referências consistentes.',
      },
      {
        title: 'Verificação de contraste',
        body: 'Amostre cores de primeiro plano e fundo em screenshots e teste contraste na ferramenta de acessibilidade preferida.',
      },
    ],
    howItWorks: [
      'Escolha modo imagem ou captura de tela conforme a fonte.',
      'Clique no pixel desejado — HEX, RGB e HSL aparecem na hora.',
      'Copie qualquer formato ou revise a paleta dominante gerada.',
      'Navegue no histórico local para reutilizar cores da sessão.',
    ],
    tips: [
      'Use captura de tela para UI ao vivo; upload funciona melhor para logos e assets estáticos.',
      'Paleta dominante ajuda quando precisa de tema completo a partir de uma imagem hero.',
      'Copie HSL ao ajustar luminosidade no código — é mais intuitivo que HEX.',
      'Amplie imagens em alta resolução antes de pegar pixels de gradientes sutis.',
      'Limpe o histórico ao trocar de projeto para não misturar paletas de clientes.',
      'Combine com Filtros de Imagem para ver como cores ficam após ajustes de brilho.',
      'Ao trabalhar com paletas de marca, documente cada código capturado em um guia interno para designers e desenvolvedores manterem consistência visual em todos os canais digitais e impressos da empresa.',
    ],
    sections: [
      {
        id: 'por-que-local',
        heading: 'Por que usar um capturador local?',
        level: 2,
        paragraphs: [
          'Muitas ferramentas online enviam imagens para servidores remotos. Isso é inaceitável com fotos não lançadas, assets confidenciais ou materiais sob NDA. O PDFWINDOWS processa cada pixel no navegador via Canvas.',
          'O resultado é feedback instantâneo e zero exfiltração de dados. Suas imagens nunca saem da RAM exceto se você baixar uma exportação.',
          'Designers sob NDA em projetos de rebranding podem amostrar screenshots ou mood boards internos sem enviar esses assets a serviços de extração de cor que retêm arquivos para treinamento de modelos.',
        ],
      },
      {
        id: 'imagem-vs-tela',
        heading: 'Upload de imagem versus captura de tela',
        level: 2,
        paragraphs: [
          'O modo imagem aceita PNG, JPG ou WEBP e permite clicar em qualquer ponto do canvas. A precisão ajuda em ilustrações detalhadas ou fotos comprimidas.',
          'O modo tela usa a API EyeDropper nativa em navegadores Chromium. Você pode amostrar qualquer pixel visível no monitor — inclusive de outros aplicativos — após permissão única.',
        ],
      },
      {
        id: 'formatos-cor',
        heading: 'Entendendo HEX, RGB e HSL',
        level: 2,
        paragraphs: [
          'HEX é o formato compacto que a maioria das ferramentas espera (#2563eb). RGB expressa canais vermelho, verde e azul para uso programático. HSL representa matiz, saturação e luminosidade — ideal para temas porque você ajusta luminosidade sem recalcular canais manualmente.',
        ],
        bullets: [
          'HEX — atalho de seis dígitos para CSS web e mobile',
          'RGB — valores de canal para canvas, SVG e APIs gráficas',
          'HSL — ajustes intuitivos para design systems',
        ],
      },
      {
        id: 'paleta-dominante',
        heading: 'Extração de paleta dominante',
        level: 2,
        paragraphs: [
          'Além de pixels isolados, a ferramenta analisa frequência de cores na imagem para exibir uma paleta dominante. Útil ao montar landing pages, slides ou templates sociais que devem ecoar a fotografia do acervo.',
          'Os swatches são clicáveis — selecionar um copia o valor como numa captura manual, acelerando a implementação.',
          'Ao construir interfaces acessíveis, amostre cores de texto e fundo no mockup e cole valores HSL em design tokens para variantes claro e escuro permanecerem matematicamente consistentes.',
        ],
      },
    ],
    faq: [
      ...privacyFaq('pt'),
      {
        q: 'A captura de tela funciona em todo navegador?',
        a: 'Captura de tela exige a API EyeDropper, suportada em Chromium e Firefox recente. O modo imagem funciona amplamente em navegadores modernos.',
      },
      {
        q: 'Minhas imagens são enviadas ao capturar cores?',
        a: 'Não. Imagens são lidas localmente via File API e desenhadas em canvas na memória. Nunca são transmitidas a servidores PDFWINDOWS.',
      },
      {
        q: 'Posso exportar o histórico de cores?',
        a: 'O histórico persiste na sessão atual. Você pode copiar valores individuais a qualquer momento no painel de histórico.',
      },
      {
        q: 'Quão precisa é a paleta dominante?',
        a: 'O algoritmo agrupa cores frequentes ignorando ruído quase branco ou preto. É ajustado para UI e marketing, não imagem científica.',
      },
      {
        q: 'Posso capturar cores de PDFs?',
        a: 'Exporte páginas PDF para imagem com a ferramenta PDF para Imagem do PDFWINDOWS e envie o resultado aqui.',
      },
    ],
    relatedTools: ['/image-filters', '/image-converter', '/pdf-to-image', '/image-resize'],
    cta: defaultCta('pt', 'Capturador de Cores'),
  },
  es: {
    title: 'Capturador de Colores Online — HEX, RGB y HSL | PDFWINDOWS',
    description:
      'Capture colores de imágenes o pantalla con cuentagotas. Obtenga códigos HEX, RGB y HSL al instante',
    keywords:
      'capturar color online, código HEX, cuentagotas, extraer color imagen, color picker offline, paleta dominante',
    h1: 'Capturador de Colores — Imagen y Pantalla',
    intro:
      'El Capturador de Colores de PDFWINDOWS ayuda a diseñadores, desarrolladores y marketers a capturar valores exactos de cualquier imagen o directamente de la pantalla usando la API EyeDropper del navegador. Extraiga HEX, RGB y HSL en tiempo real, genere paleta dominante automáticamente y mantenga historial local — todo sin subir archivos a servidores externos. Ya sea para igualar colores de marca en un logotipo o muestrear elementos de interfaz en una captura, la herramienta entrega valores precisos para pegar en CSS, Figma o design systems.',
    toolName: 'Capturador de Colores',
    benefits: [
      'Captura por imagen subida o píxeles de pantalla en vivo',
      'Salida HEX, RGB y HSL con copia en un clic',
      'Extracción automática de paleta dominante',
      'Historial local de colores recientes',
      'Sin subida de imagen — procesamiento en el navegador',
      'Compatible con Chrome, Edge y Firefox modernos',
    ],
    useCases: [
      {
        title: 'Desarrollo web y variables CSS',
        body: 'Muestree un color de un mockup y pegue el HEX directamente en la hoja de estilos o config Tailwind sin adivinar en el selector.',
      },
      {
        title: 'Cumplimiento de manual de marca',
        body: 'Equipos de marketing verifican si artes sociales usan colores aprobados muestreando píxeles de archivos exportados localmente.',
      },
      {
        title: 'Handoff de diseño UI',
        body: 'Diseñadores capturan colores de prototipos para documentar tokens sin compartir archivos en pickers de terceros.',
      },
      {
        title: 'Referencia para impresión',
        body: 'Extraiga clusters de paleta dominante de fotos de producto para informar imprentas con referencias consistentes.',
      },
      {
        title: 'Verificación de contraste',
        body: 'Muestree colores de primer plano y fondo en capturas y pruebe contraste en su herramienta de accesibilidad preferida.',
      },
    ],
    howItWorks: [
      'Elija modo imagen o captura de pantalla según la fuente.',
      'Haga clic en el píxel deseado — HEX, RGB y HSL aparecen al instante.',
      'Copie cualquier formato o revise la paleta dominante generada.',
      'Navegue el historial local para reutilizar colores de la sesión.',
    ],
    tips: [
      'Use captura de pantalla para UI en vivo; subida funciona mejor para logos y assets estáticos.',
      'Paleta dominante ayuda cuando necesita tema completo desde una imagen hero.',
      'Copie HSL al ajustar luminosidad en código — es más intuitivo que HEX.',
      'Amplíe imágenes en alta resolución antes de tomar píxeles de gradientes sutiles.',
      'Limpie el historial al cambiar de proyecto para no mezclar paletas de clientes.',
      'Combine con Filtros de Imagen para ver cómo quedan los colores tras ajustes de brillo.',
    ],
    sections: [
      {
        id: 'por-que-local',
        heading: '¿Por qué usar un capturador local?',
        level: 2,
        paragraphs: [
          'Muchas herramientas online suben imágenes a servidores remotos. Eso es inaceptable con fotos no publicadas, assets confidenciales o materiales bajo NDA. PDFWINDOWS procesa cada píxel en el navegador vía Canvas.',
          'El resultado es feedback instantáneo y cero exfiltración de datos. Sus imágenes nunca salen de la RAM salvo que descargue una exportación.',
          'Diseñadores bajo NDA en proyectos de rebranding pueden muestrear capturas o mood boards internos sin subir esos assets a servicios de extracción de color que retienen archivos para entrenamiento de modelos.',
        ],
      },
      {
        id: 'imagen-vs-pantalla',
        heading: 'Subida de imagen versus captura de pantalla',
        level: 2,
        paragraphs: [
          'El modo imagen acepta PNG, JPG o WEBP y permite clic en cualquier punto del canvas. La precisión ayuda en ilustraciones detalladas o fotos comprimidas.',
          'El modo pantalla usa la API EyeDropper nativa en navegadores Chromium. Puede muestrear cualquier píxel visible en el monitor — incluso de otras apps — tras permiso único.',
        ],
      },
      {
        id: 'formatos-color',
        heading: 'Entendiendo HEX, RGB y HSL',
        level: 2,
        paragraphs: [
          'HEX es el formato compacto que la mayoría de herramientas esperan (#2563eb). RGB expresa canales rojo, verde y azul para uso programático. HSL representa matiz, saturación y luminosidad — ideal para temas porque ajusta luminosidad sin recalcular canales manualmente.',
        ],
        bullets: [
          'HEX — atajo de seis dígitos para CSS web y mobile',
          'RGB — valores de canal para canvas, SVG y APIs gráficas',
          'HSL — ajustes intuitivos para design systems',
        ],
      },
      {
        id: 'paleta-dominante',
        heading: 'Extracción de paleta dominante',
        level: 2,
        paragraphs: [
          'Además de píxeles aislados, la herramienta analiza frecuencia de colores en la imagen para mostrar una paleta dominante. Útil al montar landing pages, slides o plantillas sociales que deben ecoar la fotografía del acervo.',
          'Los swatches son clicables — seleccionar uno copia el valor como en una captura manual, acelerando la implementación.',
          'Al construir interfaces accesibles, muestree colores de texto y fondo en el mockup y pegue valores HSL en design tokens para que variantes claro y oscuro permanezcan matemáticamente consistentes.',
        ],
      },
    ],
    faq: [
      ...privacyFaq('es'),
      {
        q: '¿La captura de pantalla funciona en todo navegador?',
        a: 'Captura de pantalla requiere la API EyeDropper, soportada en Chromium y Firefox reciente. El modo imagen funciona ampliamente en navegadores modernos.',
      },
      {
        q: '¿Se suben mis imágenes al capturar colores?',
        a: 'No. Las imágenes se leen localmente vía File API y se dibujan en canvas en memoria. Nunca se transmiten a servidores PDFWINDOWS.',
      },
      {
        q: '¿Puedo exportar el historial de colores?',
        a: 'El historial persiste en la sesión actual. Puede copiar valores individuales en cualquier momento en el panel de historial.',
      },
      {
        q: '¿Qué tan precisa es la paleta dominante?',
        a: 'El algoritmo agrupa colores frecuentes ignorando ruido casi blanco o negro. Está ajustado para UI y marketing, no imagen científica.',
      },
      {
        q: '¿Puedo capturar colores de PDFs?',
        a: 'Exporte páginas PDF a imagen con la herramienta PDF a Imagen de PDFWINDOWS y suba el resultado aquí.',
      },
    ],
    relatedTools: ['/image-filters', '/image-converter', '/pdf-to-image', '/image-resize'],
    cta: defaultCta('es', 'Capturador de Colores'),
  },
};
