import type { ToolRichContent } from '../types';
import { privacyFaq, defaultCta } from '../helpers';

export const GERADOR_QR_CODE_CONTENT: Record<'en' | 'pt' | 'es', ToolRichContent> = {
  en: {
    title: 'QR Code Generator Online Offline | PDFWINDOWS',
    description:
      'Create high-quality QR codes for URLs, text, and contact data locally in your browser. Download PNG instantly — no upload.',
    keywords:
      'qr code generator offline, create qr code free, local qr generator, qr png download, qr code no upload',
    h1: 'QR Code Generator — Local PNG Export',
    intro:
      'PDFWINDOWS QR Code Generator turns links, plain text, phone numbers, and Wi-Fi credentials into scannable QR images without sending your data to remote encoding services. Generation runs entirely in the browser using standard QR algorithms, producing crisp PNG files ready for print collateral, presentation slides, packaging labels, and event signage. Because encoding is local, marketing campaigns with embargoed URLs and internal tools with staging links stay private until you choose to publish. You control every pixel of the exported image with no watermark or tracking redirect layer inserted by the platform.',
    toolName: 'QR Code Generator',
    benefits: [
      'Generate QR codes from URLs, text, and structured payloads',
      'High-resolution PNG download',
      'No server upload or tracking of encoded content',
      'Instant preview before download',
      'Works offline after page load',
      'No watermark on exported images',
    ],
    useCases: [
      {
        title: 'Event registration and check-in',
        body: 'Print QR codes on badges or posters linking to registration forms. Generate locally so unreleased event URLs are not logged on third-party QR SaaS platforms.',
      },
      {
        title: 'Restaurant menus and table ordering',
        body: 'Small businesses update menu PDF links seasonally. Create fresh QR PNG files and replace printed table tents without paying per-code fees.',
      },
      {
        title: 'Product packaging and manuals',
        body: 'Manufacturers embed support URLs or warranty registration links on labels. Local generation keeps pre-launch product URLs confidential.',
      },
      {
        title: 'Developer staging and QA',
        body: 'Engineers generate QR codes pointing to localhost tunnels or staging builds for mobile device testing without exposing URLs to external APIs.',
      },
      {
        title: 'Presentation and slide decks',
        body: 'Speakers add QR codes linking to resources. Download PNG and drop into PowerPoint or Google Slides with predictable sizing.',
      },
    ],
    howItWorks: [
      'Enter the URL, text, or payload you want encoded.',
      'Preview the QR code rendered in real time.',
      'Adjust size if the interface offers scaling options.',
      'Download the PNG file to your device.',
    ],
    tips: [
      'Test scan distance before mass printing — larger codes scan from farther away.',
      'Use HTTPS URLs for public campaigns so scanners show secure indicators.',
      'Keep quiet zone margin around the code; do not crop the PNG tightly.',
      'For dark backgrounds, verify contrast — some scanners struggle with inverted colors.',
      'Short URLs produce simpler QR patterns that scan faster on low-end cameras.',
      'Combine with Image Resize if you need specific pixel dimensions for print vendors.',
      'Print a test sheet at actual size before a large print run — camera autofocus varies more than designers expect in dim venues.',
    ],
    sections: [
      {
        id: 'local-qr-encoding',
        heading: 'Why local QR encoding matters',
        level: 2,
        paragraphs: [
          'Free QR generators often log every URL you encode for analytics or resale. PDFWINDOWS never receives your payload because encoding executes in JavaScript on your machine. That privacy guarantee matters for unreleased products, confidential intranet links, and personalized customer URLs.',
          'Local encoding also means instant results. There is no queue, no rate limit, and no account verification step blocking your workflow.',
          'Retail chains updating seasonal menu QR codes across hundreds of locations can batch-generate PNG files on a manager laptop without exposing unpublished URLs to analytics dashboards operated by third-party QR vendors.',
        ],
      },
      {
        id: 'payload-types',
        heading: 'What can you encode?',
        level: 2,
        paragraphs: [
          'The most common use is HTTPS URLs, but QR standards support plain text, telephone URIs, email actions, and Wi-Fi configuration strings. Choose the payload type that matches how your audience will interact with the code.',
        ],
        bullets: [
          'URLs — marketing landing pages, app store links, documentation',
          'Plain text — serial numbers, promo codes, short messages',
          'Contact cards — vCard-style payloads for networking events',
          'Wi-Fi — SSID and password for guest network onboarding',
        ],
      },
      {
        id: 'print-quality',
        heading: 'Print quality and scanning reliability',
        level: 2,
        paragraphs: [
          'QR readability depends on module size, contrast, and quiet zone margins. Export PNG at sufficient resolution for your print size — a code meant for a billboard needs more pixels than one on a business card.',
          'Always scan-test a printed proof before a full print run. Mobile cameras vary in autofocus quality, especially in low light.',
        ],
      },
      {
        id: 'workflow-tips',
        heading: 'Fitting QR codes into PDFWINDOWS workflows',
        level: 2,
        paragraphs: [
          'After downloading PNG, use Image to PDF to bundle multiple codes into a print sheet, or insert the image into Document Studio exports. Watermark tools can add branding around codes on marketing PDFs.',
          'For campaigns requiring password-protected destination documents, generate the QR locally, then protect the target PDF separately before distribution.',
          'Educational institutions use locally generated QR codes on syllabi and lab handouts so course URLs are not indexed by third-party generator analytics.',
        ],
      },
    ],
    faq: [
      ...privacyFaq('en'),
      {
        q: 'Are generated QR codes tracked by PDFWINDOWS?',
        a: 'No. Encoding happens locally. PDFWINDOWS does not log URLs or text you enter into the generator.',
      },
      {
        q: 'What file format is exported?',
        a: 'The tool exports PNG images suitable for web and print. Use Image Converter if you need JPG or WEBP.',
      },
      {
        q: 'Is there a limit on URL length?',
        a: 'Very long URLs produce denser QR patterns that are harder to scan. Use URL shorteners for extremely long links when possible.',
      },
      {
        q: 'Can QR codes expire?',
        a: 'The image itself does not expire. If you encode a URL, expiration depends on the destination server, not the QR file.',
      },
      {
        q: 'Do I need an app to scan?',
        a: 'Modern smartphone cameras include built-in QR scanning. Dedicated scanner apps are optional.',
      },
    ],
    relatedTools: ['/pdf-to-image', '/image-converter', '/estudio-documentos', '/gerador-relatorios'],
    cta: defaultCta('en', 'QR Code Generator'),
  },
  pt: {
    title: 'Gerador de QR Code Online Offline | PDFWINDOWS',
    description:
      'Crie QR Codes de alta qualidade para URLs, texto e dados de contato localmente no navegador. Baixe PNG na hora — sem upload.',
    keywords:
      'gerador qr code offline, criar qr code gratis, gerador qr local, baixar qr png, qr code sem upload',
    h1: 'Gerador de QR Code — Exportação PNG Local',
    intro:
      'O Gerador de QR Code do PDFWINDOWS transforma links, texto simples, telefones e credenciais Wi-Fi em imagens escaneáveis sem enviar dados para serviços remotos de codificação. A geração ocorre inteiramente no navegador com algoritmos QR padrão, produzindo PNG nítidos para material impresso, slides, embalagens e sinalização de eventos. Como a codificação é local, campanhas com URLs sob embargo e links de homologação permanecem privados até você publicar. Você controla cada pixel da imagem exportada sem marca d\'água ou camada de redirecionamento rastreado pela plataforma.',
    toolName: 'Gerador de QR Code',
    benefits: [
      'Gere QR Codes a partir de URLs, texto e payloads estruturados',
      'Download PNG em alta resolução',
      'Sem upload nem rastreamento do conteúdo codificado',
      'Pré-visualização instantânea antes do download',
      'Funciona offline após carregar a página',
      'Sem marca d\'água nas imagens exportadas',
    ],
    useCases: [
      {
        title: 'Inscrição e check-in em eventos',
        body: 'Imprima QR Codes em crachás ou cartazes com links de inscrição. Gere localmente para URLs não publicadas não serem registradas em SaaS de terceiros.',
      },
      {
        title: 'Cardápios e pedidos em mesa',
        body: 'Pequenos negócios atualizam links de cardápio sazonalmente. Crie PNG novos e troque displays de mesa sem taxa por código.',
      },
      {
        title: 'Embalagens e manuais de produto',
        body: 'Fabricantes inserem URLs de suporte ou garantia em rótulos. Geração local mantém URLs pré-lançamento confidenciais.',
      },
      {
        title: 'Homologação e QA de desenvolvedores',
        body: 'Engenheiros geram QR apontando para tunnels localhost ou builds de staging para testes mobile sem expor URLs em APIs externas.',
      },
      {
        title: 'Apresentações e slides',
        body: 'Palestrantes adicionam QR para recursos. Baixe PNG e insira em PowerPoint ou Google Slides com tamanho previsível.',
      },
    ],
    howItWorks: [
      'Insira a URL, texto ou payload que deseja codificar.',
      'Visualize o QR Code renderizado em tempo real.',
      'Ajuste o tamanho se a interface oferecer escala.',
      'Baixe o arquivo PNG para o dispositivo.',
    ],
    tips: [
      'Teste distância de leitura antes de imprimir em massa — códigos maiores leem de mais longe.',
      'Use URLs HTTPS em campanhas públicas para indicadores de segurança nos leitores.',
      'Mantenha margem de zona silenciosa; não corte o PNG rente ao código.',
      'Em fundos escuros, verifique contraste — alguns leitores falham com cores invertidas.',
      'URLs curtas produzem padrões QR mais simples e leitura mais rápida.',
      'Combine com Redimensionar Imagem se precisar de dimensões específicas para gráfica.',
      'Imprima uma folha de teste no tamanho real antes de tiragem grande — autofoco de câmeras varia mais do que designers esperam em ambientes escuros.',
    ],
    sections: [
      {
        id: 'codificacao-local',
        heading: 'Por que codificação QR local importa',
        level: 2,
        paragraphs: [
          'Geradores gratuitos frequentemente registram cada URL codificada para analytics ou revenda. O PDFWINDOWS nunca recebe seu payload porque a codificação executa em JavaScript na sua máquina. Essa garantia importa para produtos não lançados, links de intranet e URLs personalizadas de clientes.',
          'Codificação local também significa resultado instantâneo. Sem fila, limite de taxa ou verificação de conta bloqueando o fluxo.',
          'Redes de varejo que atualizam QR de cardápio sazonal em centenas de lojas podem gerar PNG em lote no notebook do gerente sem expor URLs não publicadas a dashboards de analytics de fornecedores QR de terceiros.',
        ],
      },
      {
        id: 'tipos-payload',
        heading: 'O que você pode codificar?',
        level: 2,
        paragraphs: [
          'O uso mais comum é URL HTTPS, mas padrões QR suportam texto, URIs de telefone, ações de e-mail e strings de configuração Wi-Fi. Escolha o tipo de payload conforme a interação da audiência.',
        ],
        bullets: [
          'URLs — landing pages, links de loja de apps, documentação',
          'Texto simples — números de série, códigos promocionais',
          'Cartões de contato — payloads estilo vCard para networking',
          'Wi-Fi — SSID e senha para redes de visitantes',
        ],
      },
      {
        id: 'qualidade-impressao',
        heading: 'Qualidade de impressão e confiabilidade de leitura',
        level: 2,
        paragraphs: [
          'Legibilidade QR depende de tamanho do módulo, contraste e margens da zona silenciosa. Exporte PNG com resolução suficiente para o tamanho de impressão — outdoor exige mais pixels que cartão de visita.',
          'Sempre teste um proof impresso antes de tiragem completa. Câmeras mobile variam em foco, especialmente com pouca luz.',
        ],
      },
      {
        id: 'fluxo-pdfwindows',
        heading: 'Integrando QR Codes ao fluxo PDFWINDOWS',
        level: 2,
        paragraphs: [
          'Após baixar PNG, use Imagem para PDF para montar folhas com vários códigos ou insira a imagem em exportações do Estúdio de Documentos. Ferramentas de marca d\'água adicionam branding em PDFs de marketing.',
          'Para campanhas com documentos protegidos por senha, gere o QR localmente e proteja o PDF de destino separadamente antes da distribuição.',
          'Instituições de ensino usam QR Codes gerados localmente em apostilas e handouts para que URLs de curso não sejam indexadas por analytics de geradores terceiros.',
        ],
      },
    ],
    faq: [
      ...privacyFaq('pt'),
      {
        q: 'Os QR Codes gerados são rastreados pelo PDFWINDOWS?',
        a: 'Não. A codificação é local. O PDFWINDOWS não registra URLs ou texto inserido no gerador.',
      },
      {
        q: 'Qual formato de arquivo é exportado?',
        a: 'A ferramenta exporta imagens PNG adequadas para web e impressão. Use Conversor de Imagens se precisar de JPG ou WEBP.',
      },
      {
        q: 'Há limite no tamanho da URL?',
        a: 'URLs muito longas produzem padrões QR mais densos e difíceis de ler. Use encurtadores para links extremamente longos quando possível.',
      },
      {
        q: 'QR Codes expiram?',
        a: 'A imagem em si não expira. Se codificar URL, expiração depende do servidor de destino, não do arquivo QR.',
      },
      {
        q: 'Preciso de app para ler?',
        a: 'Câmeras modernas de smartphone incluem leitura QR integrada. Apps dedicados são opcionais.',
      },
    ],
    relatedTools: ['/pdf-to-image', '/image-converter', '/estudio-documentos', '/gerador-relatorios'],
    cta: defaultCta('pt', 'Gerador de QR Code'),
  },
  es: {
    title: 'Generador de Código QR Online Offline | PDFWINDOWS',
    description:
      'Cree códigos QR de alta calidad para URLs, texto y datos de contacto localmente en el navegador. Descargue PNG al instante — sin subida.',
    keywords:
      'generador qr offline, crear codigo qr gratis, generador qr local, descargar qr png, qr sin subida',
    h1: 'Generador de Código QR — Exportación PNG Local',
    intro:
      'El Generador de Código QR de PDFWINDOWS convierte enlaces, texto plano, teléfonos y credenciales Wi-Fi en imágenes escaneables sin enviar datos a servicios remotos de codificación. La generación ocurre enteramente en el navegador con algoritmos QR estándar, produciendo PNG nítidos para material impreso, diapositivas, empaques y señalización de eventos. Como la codificación es local, campañas con URLs bajo embargo y enlaces de staging permanecen privados hasta que usted publique. Usted controla cada píxel de la imagen exportada sin marca de agua ni capa de redirección rastreada por la plataforma.',
    toolName: 'Generador de Código QR',
    benefits: [
      'Genere códigos QR desde URLs, texto y payloads estructurados',
      'Descarga PNG en alta resolución',
      'Sin subida ni rastreo del contenido codificado',
      'Vista previa instantánea antes de descargar',
      'Funciona offline tras cargar la página',
      'Sin marca de agua en imágenes exportadas',
    ],
    useCases: [
      {
        title: 'Inscripción y check-in en eventos',
        body: 'Imprima códigos QR en credenciales o carteles con enlaces de registro. Genere localmente para que URLs no publicadas no se registren en SaaS de terceros.',
      },
      {
        title: 'Menús y pedidos en mesa',
        body: 'Pequeños negocios actualizan enlaces de menú estacionalmente. Cree PNG nuevos y reemplace displays de mesa sin tarifa por código.',
      },
      {
        title: 'Empaques y manuales de producto',
        body: 'Fabricantes insertan URLs de soporte o garantía en etiquetas. Generación local mantiene URLs pre-lanzamiento confidenciales.',
      },
      {
        title: 'Staging y QA de desarrolladores',
        body: 'Ingenieros generan QR apuntando a tunnels localhost o builds de staging para pruebas móviles sin exponer URLs en APIs externas.',
      },
      {
        title: 'Presentaciones y diapositivas',
        body: 'Oradores añaden QR para recursos. Descargue PNG e inserte en PowerPoint o Google Slides con tamaño predecible.',
      },
    ],
    howItWorks: [
      'Inserte la URL, texto o payload que desea codificar.',
      'Visualice el código QR renderizado en tiempo real.',
      'Ajuste el tamaño si la interfaz ofrece escala.',
      'Descargue el archivo PNG a su dispositivo.',
    ],
    tips: [
      'Pruebe distancia de lectura antes de imprimir en masa — códigos más grandes leen desde más lejos.',
      'Use URLs HTTPS en campañas públicas para indicadores de seguridad en lectores.',
      'Mantenga margen de zona silenciosa; no recorte el PNG pegado al código.',
      'En fondos oscuros, verifique contraste — algunos lectores fallan con colores invertidos.',
      'URLs cortas producen patrones QR más simples y lectura más rápida.',
      'Combine con Redimensionar Imagen si necesita dimensiones específicas para imprenta.',
      'Imprima una hoja de prueba a tamaño real antes de tirada grande — el autofoco de cámaras varía más de lo que diseñadores esperan en ambientes oscuros.',
    ],
    sections: [
      {
        id: 'codificacion-local',
        heading: 'Por qué importa la codificación QR local',
        level: 2,
        paragraphs: [
          'Generadores gratuitos frecuentemente registran cada URL codificada para analytics o reventa. PDFWINDOWS nunca recibe su payload porque la codificación ejecuta en JavaScript en su máquina. Esa garantía importa para productos no lanzados, enlaces de intranet y URLs personalizadas de clientes.',
          'Codificación local también significa resultado instantáneo. Sin cola, límite de tasa ni verificación de cuenta bloqueando el flujo.',
          'Cadenas minoristas que actualizan QR de menú estacional en cientos de locales pueden generar PNG en lote en el portátil del gerente sin exponer URLs no publicadas a dashboards de analytics de proveedores QR de terceros.',
        ],
      },
      {
        id: 'tipos-payload',
        heading: '¿Qué puede codificar?',
        level: 2,
        paragraphs: [
          'El uso más común es URL HTTPS, pero estándares QR soportan texto, URIs de teléfono, acciones de correo y cadenas de configuración Wi-Fi. Elija el tipo de payload según la interacción de su audiencia.',
        ],
        bullets: [
          'URLs — landing pages, enlaces de tienda de apps, documentación',
          'Texto plano — números de serie, códigos promocionales',
          'Tarjetas de contacto — payloads estilo vCard para networking',
          'Wi-Fi — SSID y contraseña para redes de visitantes',
        ],
      },
      {
        id: 'calidad-impresion',
        heading: 'Calidad de impresión y fiabilidad de lectura',
        level: 2,
        paragraphs: [
          'Legibilidad QR depende de tamaño de módulo, contraste y márgenes de zona silenciosa. Exporte PNG con resolución suficiente para el tamaño de impresión — valla publicitaria exige más píxeles que tarjeta de visita.',
          'Siempre pruebe un proof impreso antes de tirada completa. Cámaras móviles varían en enfoque, especialmente con poca luz.',
        ],
      },
      {
        id: 'flujo-pdfwindows',
        heading: 'Integrando códigos QR al flujo PDFWINDOWS',
        level: 2,
        paragraphs: [
          'Tras descargar PNG, use Imagen a PDF para montar hojas con varios códigos o inserte la imagen en exportaciones del Estudio de Documentos. Herramientas de marca de agua añaden branding en PDFs de marketing.',
          'Para campañas con documentos protegidos por contraseña, genere el QR localmente y proteja el PDF de destino por separado antes de distribuir.',
          'Instituciones educativas usan códigos QR generados localmente en programas y guías para que URLs de curso no sean indexadas por analytics de generadores terceros.',
        ],
      },
    ],
    faq: [
      ...privacyFaq('es'),
      {
        q: '¿Los códigos QR generados son rastreados por PDFWINDOWS?',
        a: 'No. La codificación es local. PDFWINDOWS no registra URLs o texto insertado en el generador.',
      },
      {
        q: '¿Qué formato de archivo se exporta?',
        a: 'La herramienta exporta imágenes PNG adecuadas para web e impresión. Use Conversor de Imágenes si necesita JPG o WEBP.',
      },
      {
        q: '¿Hay límite en el tamaño de la URL?',
        a: 'URLs muy largas producen patrones QR más densos y difíciles de leer. Use acortadores para enlaces extremadamente largos cuando sea posible.',
      },
      {
        q: '¿Los códigos QR expiran?',
        a: 'La imagen en sí no expira. Si codifica URL, la expiración depende del servidor de destino, no del archivo QR.',
      },
      {
        q: '¿Necesito app para leer?',
        a: 'Cámaras modernas de smartphone incluyen lectura QR integrada. Apps dedicadas son opcionales.',
      },
    ],
    relatedTools: ['/pdf-to-image', '/image-converter', '/estudio-documentos', '/gerador-relatorios'],
    cta: defaultCta('es', 'Generador de Código QR'),
  },
};
