import type { ToolRichContent } from '../types';
import { privacyFaq, defaultCta } from '../helpers';

export const PDF_ROTATE_CONTENT: Record<'en' | 'pt' | 'es', ToolRichContent> = {
  en: {
    title: 'Rotate PDF Online Offline | PDFWINDOWS',
    description:
      'Rotate PDF pages 90°, 180°, or 270° in your browser. Fix sideways scans and mis-exported documents locally — no upload, instant download.',
    keywords:
      'rotate pdf, turn pdf pages, fix sideways pdf, rotate pdf offline, pdf orientation browser free',
    h1: 'Rotate PDF',
    intro:
      'Nothing slows down a review meeting faster than a PDF where every page is sideways. Scanners default to portrait while you fed landscape forms; phone cameras capture receipts at odd angles; and legacy export tools occasionally bake in a 90-degree rotation flag that your reader ignores. Cloud rotators fix orientation only after copying the file off your machine. PDFWINDOWS rotates pages inside the browser: pick 90°, 180°, or 270°, apply to the whole document or selected pages, and download a correctly oriented PDF that stays on your device from upload to save. Correcting orientation before OCR or text extraction materially improves downstream accuracy on scanned packets.',
    toolName: 'Rotate PDF',
    benefits: [
      '90°, 180°, and 270° rotation without desktop software',
      'Fix batch scans before merge, OCR, or compress steps',
      'No cloud transfer of confidential page content',
      'Instant processing for typical office PDFs',
      'Preserves page quality — rotation is not recompression',
    ],
    useCases: [
      {
        title: 'Correcting flatbed and feeder scans',
        body:
          'Office scanners sometimes output landscape pages with portrait metadata, or vice versa. Rotating locally before emailing a contract prevents recipients from fighting zoom and twist controls on every page.',
      },
      {
        title: 'Mobile document photography',
        body:
          'Employees photograph whiteboards, delivery slips, and signed forms with phones held at angles. Rotating the assembled PDF straightens content for OCR, printing, and archival without re-shooting.',
      },
      {
        title: 'Preparing files for print and bindery',
        body:
          'Print shops expect consistent orientation. Rotate exhibit pages and appendix scans so facing pages align before sending a single PDF to the copier or perfect-binding workflow.',
      },
      {
        title: 'Legal and discovery review',
        body:
          'Depositions and exhibits arrive mixed: some pages upright, some scanned from bound volumes on their side. Review teams rotate batches locally so annotation tools and full-text search panes display text right-side up.',
      },
      {
        title: 'Downstream tool preparation',
        body:
          'OCR accuracy drops on skewed text lines, and watermarks look unprofessional on sideways pages. Rotate first in a local pipeline so merge, OCR, compress, and watermark steps see predictable page geometry.',
      },
    ],
    howItWorks: [
      'Upload the PDF with misoriented pages.',
      'Choose rotation angle: 90°, 180°, or 270°.',
      'Apply to all pages or the selection supported by the tool.',
      'Process locally and download the rotated PDF.',
    ],
    tips: [
      'Rotate before OCR — recognition engines assume horizontal text baselines.',
      'After rotating individual source files, merge them for a unified right-side-up packet.',
      '180° fixes upside-down scans; 90° and 270° swap portrait and landscape.',
      'Rotation does not crop margins — white borders from scanning remain unless you trim elsewhere.',
      'Verify the output on page 1 and a middle page before deleting originals.',
      'Password-protected PDFs must be unlocked before the browser can rewrite page objects.',
      'When only appendix pages are sideways, split the appendix, rotate it, and merge back instead of rotating the entire contract.',
    ],
    sections: [
      {
        id: 'rotation-mechanics',
        heading: 'How PDF rotation works technically',
        level: 2,
        paragraphs: [
          'PDF pages store a rotation value in their page dictionary. Viewers interpret that flag when drawing content. Rotating with PDFWINDOWS updates those values and transforms page content so text and images appear upright when opened in Adobe Reader, Chrome, or mobile apps.',
          'Because this is a structural transform rather than a screenshot, vector text stays sharp and file size changes minimally. You are not re-encoding JPEGs unless the tool also rasterizes — pure rotation is lightweight.',
        ],
      },
      {
        id: 'all-pages-vs-some',
        heading: 'Whole document versus selective rotation',
        level: 2,
        paragraphs: [
          'Homogeneous problems — every page scanned sideways the same way — call for a single angle on the full file. Mixed orientation, common in compiled exhibits, may require splitting the PDF, rotating each section separately, and merging back together.',
        ],
        bullets: [
          'Uniform scans — one angle on entire document.',
          'Mixed exhibits — split, rotate sections, merge again.',
          'Single wrong page — extract range, rotate, replace in merge workflow.',
        ],
      },
      {
        id: 'rotate-in-workflow',
        heading: 'Where rotation fits in PDF workflows',
        level: 2,
        paragraphs: [
          'Think of rotation as hygiene before substantive processing. A typical intake pipeline: scan or import photos to PDF, rotate upright, run OCR, compress for email, optionally password-protect. Skipping rotation forces every downstream consumer to compensate manually.',
          'Insurance adjusters reviewing claim photos embedded in PDF reports rotate entire packets before annotation tools align stamps correctly — a thirty-second local fix versus rejected uploads to carrier portals.',
        ],
        bullets: [
          'Merge — combine already-oriented sources.',
          'Split — isolate sections that need different angles.',
          'Compress — shrink after orientation is final.',
        ],
      },
      {
        id: 'quality-notes',
        heading: 'Quality and metadata after rotation',
        level: 2,
        paragraphs: [
          'Rotating does not remove annotations, form fields, or signatures already on the page — they rotate with the content. Bookmarks may still point to correct page numbers though viewer thumbnails will update to reflect new orientation.',
          'Government intake portals and mortgage underwriters reject packages when signature pages appear upside down relative to OCR templates. Fix orientation locally, verify visually at 100% zoom, then compress and upload — identity scans never pass through third-party rotation servers.',
        ],
      },
    ],
    faq: [
      ...privacyFaq('en'),
      {
        q: 'Can I rotate only some pages?',
        a: 'When the tool supports page selection, apply rotation to that subset. Otherwise split the file, rotate the extracted range, and merge pieces back in the desired order.',
      },
      {
        q: 'Will rotation reduce text sharpness?',
        a: 'No. Pure rotation adjusts page orientation metadata and transforms without re-rasterizing vector content. Embedded images rotate as part of the page object.',
      },
      {
        q: 'What is the difference between 90° and 270°?',
        a: 'Both turn portrait to landscape or the reverse, but in opposite directions. If one looks upside down relative to your intent, use the other right angle or add 180°.',
      },
      {
        q: 'Does rotation change page size?',
        a: 'The media box dimensions may swap width and height for 90° and 270° turns. Printed output should match the new orientation — verify print preview before bulk printing.',
      },
      {
        q: 'Can I undo rotation?',
        a: 'Keep the original file until you confirm the output. Applying the opposite angle on a copy recovers orientation if you still have the source.',
      },
    ],
    relatedTools: ['/pdf-split', '/pdf-merge', '/pdf-ocr'],
    cta: defaultCta('en', 'Rotate PDF'),
  },
  pt: {
    title: 'Rotacionar PDF Online Offline | PDFWINDOWS',
    description:
      'Gire páginas de PDF em 90°, 180° ou 270° no navegador. Corrija scans de lado e exportações erradas localmente — sem upload, download imediato.',
    keywords:
      'rotacionar pdf, girar paginas pdf, corrigir pdf de lado, rotate pdf offline, orientacao pdf navegador',
    h1: 'Rotacionar PDF',
    intro:
      'Nada atrasa uma reunião de revisão como PDF com todas as páginas de lado. Scanners gravam retrato quando você alimentou formulários paisagem; celulares fotografam recibos em ângulos estranhos; exportadores antigos às vezes gravam rotação que o leitor ignora. Rotacionadores na nuvem só corrigem depois de copiar o arquivo. O PDFWINDOWS gira páginas no navegador: escolha 90°, 180° ou 270°, aplique ao documento inteiro ou à seleção, e baixe PDF na orientação certa sem sair do dispositivo. Corrigir orientação antes de OCR ou extração de texto melhora materialmente a precisão em pacotes digitalizados.',
    toolName: 'Rotacionar PDF',
    benefits: [
      'Rotação 90°, 180° e 270° sem software desktop',
      'Corrija lotes de scan antes de mesclar, OCR ou comprimir',
      'Sem transferência na nuvem de conteúdo confidencial',
      'Processamento instantâneo para PDFs de escritório',
      'Preserva qualidade — rotação não é recompressão',
    ],
    useCases: [
      {
        title: 'Corrigir scans de mesa e alimentador',
        body:
          'Scanners às vezes geram páginas paisagem com metadados retrato, ou o contrário. Rotacionar localmente antes de enviar contrato evita que destinatários lutem com zoom e giro em cada página.',
      },
      {
        title: 'Fotografia de documentos no celular',
        body:
          'Colaboradores fotografam quadros, comprovantes e formulários assinados em ângulos. Rotacionar o PDF montado endireita conteúdo para OCR, impressão e arquivo sem refotografar.',
      },
      {
        title: 'Preparar arquivos para impressão',
        body:
          'Gráficas esperam orientação consistente. Rotacione páginas de anexos e apêndices escaneados para que folhas opostas alinhem antes de enviar um PDF à copiadora ou encadernação.',
      },
      {
        title: 'Revisão jurídica e discovery',
        body:
          'Depoimentos e anexos chegam mistos: algumas páginas certas, outras escaneadas de volume de lado. Equipes rotacionam lotes localmente para ferramentas de anotação e busca exibirem texto em pé.',
      },
      {
        title: 'Preparação para ferramentas posteriores',
        body:
          'Precisão de OCR cai em linhas tortas e marcas d\'água ficam ruins em páginas de lado. Rotacione primeiro no pipeline local para mesclar, OCR, comprimir e marcar d\'água verem geometria previsível.',
      },
    ],
    howItWorks: [
      'Envie o PDF com páginas mal orientadas.',
      'Escolha o ângulo: 90°, 180° ou 270°.',
      'Aplique a todas as páginas ou à seleção suportada.',
      'Processe localmente e baixe o PDF rotacionado.',
    ],
    tips: [
      'Rotacione antes do OCR — motores assumem linhas de texto horizontais.',
      'Após rotacionar arquivos de origem, mescle para um pacote unificado em pé.',
      '180° corrige scans de cabeça para baixo; 90° e 270° trocam retrato e paisagem.',
      'Rotação não corta margens — bordas brancas do scan permanecem.',
      'Verifique saída na página 1 e uma do meio antes de apagar originais.',
      'PDFs com senha precisam ser desbloqueados para reescrever objetos de página.',
      'Quando só anexos estão de lado, divida o anexo, rotacione e mescle de volta em vez de girar o contrato inteiro.',
    ],
    sections: [
      {
        id: 'rotation-mechanics',
        heading: 'Como a rotação de PDF funciona tecnicamente',
        level: 2,
        paragraphs: [
          'Páginas PDF armazenam valor de rotação no dicionário da página. Leitores interpretam essa flag ao desenhar conteúdo. Rotacionar com PDFWINDOWS atualiza valores e transforma conteúdo para texto e imagens aparecerem em pé no Adobe Reader, Chrome ou apps móveis.',
          'Por ser transformação estrutural e não captura de tela, texto vetorial permanece nítido e o tamanho muda pouco. Você não recodifica JPEGs — rotação pura é leve.',
        ],
      },
      {
        id: 'all-pages-vs-some',
        heading: 'Documento inteiro versus rotação seletiva',
        level: 2,
        paragraphs: [
          'Problemas uniformes — todas as páginas de lado igual — pedem um ângulo no arquivo todo. Orientação mista, comum em anexos compilados, pode exigir dividir PDF, rotacionar cada trecho e mesclar de volta.',
        ],
        bullets: [
          'Scans uniformes — um ângulo no documento inteiro.',
          'Anexos mistos — dividir, rotacionar seções, mesclar.',
          'Página errada isolada — extrair intervalo, rotacionar, substituir na mesclagem.',
        ],
      },
      {
        id: 'rotate-in-workflow',
        heading: 'Onde a rotação entra em fluxos de PDF',
        level: 2,
        paragraphs: [
          'Trate rotação como higiene antes do processamento substantivo. Pipeline típico: scan ou fotos em PDF, rotacionar em pé, OCR, comprimir para e-mail, opcionalmente senha. Pular rotação obriga cada consumidor a compensar manualmente.',
          'Peritos de seguros revisam fotos de sinistro embutidas em PDF e rotacionam pacotes inteiros antes de ferramentas de anotação alinharem carimbos — correção local de segundos versus upload rejeitado em portais de seguradoras.',
          'Em contratos com anexos paisagem, rotacione só o anexo e mescle de volta para não girar dezenas de páginas de cláusulas já corretas.',
        ],
        bullets: [
          'Mesclar — combine fontes já orientadas.',
          'Dividir — isole seções que precisam de ângulos diferentes.',
          'Comprimir — reduza depois que orientação estiver final.',
        ],
      },
      {
        id: 'quality-notes',
        heading: 'Qualidade e metadados após rotação',
        level: 2,
        paragraphs: [
          'Rotação não remove anotações, campos de formulário ou assinaturas — eles giram com o conteúdo. Marcadores ainda apontam para números de página corretos embora miniaturas reflitam nova orientação.',
          'Portais governamentais e analistas de crédito rejeitam pacotes quando páginas de assinatura aparecem invertidas em relação a modelos OCR. Corrija orientação localmente, verifique em zoom 100% e depois comprima e envie — scans de identidade nunca passam por servidores de rotação de terceiros.',
        ],
      },
    ],
    faq: [
      ...privacyFaq('pt'),
      {
        q: 'Posso rotacionar só algumas páginas?',
        a: 'Quando a ferramenta suporta seleção, aplique àquele subconjunto. Caso contrário, divida o arquivo, rotacione o intervalo extraído e mescle as partes na ordem desejada.',
      },
      {
        q: 'A rotação reduz nitidez do texto?',
        a: 'Não. Rotação pura ajusta metadados de orientação e transforma sem rasterizar vetor. Imagens embutidas giram com o objeto de página.',
      },
      {
        q: 'Qual a diferença entre 90° e 270°?',
        a: 'Ambos trocam retrato por paisagem ou o inverso, em direções opostas. Se um parecer de cabeça para baixo, use o outro ângulo reto ou some 180°.',
      },
      {
        q: 'A rotação muda o tamanho da página?',
        a: 'Dimensões da media box podem trocar largura e altura em giros de 90° e 270°. Confira visualização de impressão antes de imprimir em massa.',
      },
      {
        q: 'Posso desfazer a rotação?',
        a: 'Guarde o original até confirmar a saída. Aplicar o ângulo oposto numa cópia recupera orientação se ainda tiver a fonte.',
      },
    ],
    relatedTools: ['/pdf-split', '/pdf-merge', '/pdf-ocr'],
    cta: defaultCta('pt', 'Rotacionar PDF'),
  },
  es: {
    title: 'Rotar PDF Online Offline | PDFWINDOWS',
    description:
      'Gire páginas de PDF 90°, 180° o 270° en el navegador. Corrija escaneos de lado y exportaciones erróneas localmente — sin subida, descarga inmediata.',
    keywords:
      'rotar pdf, girar paginas pdf, corregir pdf de lado, rotate pdf offline, orientacion pdf navegador',
    h1: 'Rotar PDF',
    intro:
      'Nada frena una reunión de revisión como un PDF con todas las páginas de lado. Los escáneres guardan retrato cuando alimentó formularios apaisados; los móviles fotografan recibos en ángulos raros; exportadores antiguos a veces graban rotación que el lector ignora. Los rotadores en la nube solo corrigen tras copiar el archivo. PDFWINDOWS gira páginas en el navegador: elija 90°, 180° o 270°, aplique al documento entero o a la selección, y descargue PDF con orientación correcta sin salir del dispositivo. Corregir orientación antes de OCR o extracción de texto mejora materialmente la precisión en paquetes escaneados.',
    toolName: 'Rotar PDF',
    benefits: [
      'Rotación 90°, 180° y 270° sin software de escritorio',
      'Corrija lotes escaneados antes de unir, OCR o comprimir',
      'Sin transferencia en la nube de contenido confidencial',
      'Procesamiento instantáneo para PDF de oficina',
      'Preserva calidad — rotar no es recomprimir',
    ],
    useCases: [
      {
        title: 'Corregir escaneos de mesa y alimentador',
        body:
          'Los escáneres a veces generan páginas apaisadas con metadatos verticales, o al revés. Rotar localmente antes de enviar contrato evita que destinatarios luchen con zoom y giro en cada página.',
      },
      {
        title: 'Fotografía de documentos con móvil',
        body:
          'Empleados fotografían pizarras, albaranes y formularios firmados en ángulos. Rotar el PDF ensamblado endereza contenido para OCR, impresión y archivo sin volver a fotografiar.',
      },
      {
        title: 'Preparar archivos para impresión',
        body:
          'Las imprentas esperan orientación consistente. Rote páginas de anexos y apéndices escaneados para que hojas opuestas alineen antes de enviar un PDF a copiadora o encuadernación.',
      },
      {
        title: 'Revisión legal y discovery',
        body:
          'Deposiciones y anexos llegan mixtos: algunas páginas derechas, otras escaneadas de volumen de lado. Equipos rotan lotes localmente para que anotaciones y búsqueda muestren texto en posición vertical.',
      },
      {
        title: 'Preparación para herramientas posteriores',
        body:
          'La precisión OCR baja en líneas inclinadas y las marcas de agua quedan mal en páginas de lado. Rote primero en el pipeline local para que unir, OCR, comprimir y marca de agua vean geometría predecible.',
      },
    ],
    howItWorks: [
      'Suba el PDF con páginas mal orientadas.',
      'Elija ángulo: 90°, 180° o 270°.',
      'Aplique a todas las páginas o a la selección soportada.',
      'Procese localmente y descargue el PDF rotado.',
    ],
    tips: [
      'Rote antes del OCR — los motores asumen líneas de texto horizontales.',
      'Tras rotar archivos de origen, una para un paquete unificado derecho.',
      '180° corrige escaneos invertidos; 90° y 270° intercambian vertical y apaisado.',
      'Rotar no recorta márgenes — bordes blancos del escaneo permanecen.',
      'Verifique salida en página 1 y una del medio antes de borrar originales.',
      'PDF con contraseña deben desbloquearse para reescribir objetos de página.',
      'Cuando solo anexos están de lado, divida el anexo, rote y una de nuevo en lugar de girar todo el contrato.',
    ],
    sections: [
      {
        id: 'rotation-mechanics',
        heading: 'Cómo funciona técnicamente la rotación PDF',
        level: 2,
        paragraphs: [
          'Las páginas PDF almacenan valor de rotación en el diccionario de página. Los lectores interpretan esa bandera al dibujar contenido. Rotar con PDFWINDOWS actualiza valores y transforma contenido para que texto e imágenes aparezcan derechos en Adobe Reader, Chrome o apps móviles.',
          'Al ser transformación estructural y no captura, el texto vectorial permanece nítido y el tamaño cambia poco. No recodifica JPEG — rotación pura es ligera.',
        ],
      },
      {
        id: 'all-pages-vs-some',
        heading: 'Documento entero frente a rotación selectiva',
        level: 2,
        paragraphs: [
          'Problemas uniformes — todas las páginas de lado igual — piden un ángulo en todo el archivo. Orientación mixta, común en anexos compilados, puede exigir dividir PDF, rotar cada tramo y unir de nuevo.',
        ],
        bullets: [
          'Escaneos uniformes — un ángulo en todo el documento.',
          'Anexos mixtos — dividir, rotar secciones, unir.',
          'Página errónea aislada — extraer rango, rotar, reemplazar al unir.',
        ],
      },
      {
        id: 'rotate-in-workflow',
        heading: 'Dónde encaja la rotación en flujos PDF',
        level: 2,
        paragraphs: [
          'Trate la rotación como higiene antes del procesamiento sustantivo. Pipeline típico: escaneo o fotos a PDF, rotar derecho, OCR, comprimir para correo, opcionalmente contraseña. Saltar rotación obliga a cada consumidor a compensar manualmente.',
          'Peritos de seguros revisan fotos de siniestro en PDF y rotan paquetes enteros antes de que herramientas de anotación alineen sellos — corrección local de segundos frente a subida rechazada en portales de aseguradoras.',
          'En contratos con anexos apaisados, rote solo el anexo y una de nuevo para no girar decenas de páginas de cláusulas ya correctas.',
        ],
        bullets: [
          'Unir — combine fuentes ya orientadas.',
          'Dividir — aísle secciones que necesitan ángulos distintos.',
          'Comprimir — reduzca cuando la orientación sea final.',
        ],
      },
      {
        id: 'quality-notes',
        heading: 'Calidad y metadatos tras rotar',
        level: 2,
        paragraphs: [
          'Rotar no elimina anotaciones, campos de formulario ni firmas — giran con el contenido. Los marcadores siguen apuntando a números de página correctos aunque miniaturas reflejen nueva orientación.',
          'Portales gubernamentales y analistas hipotecarios rechazan paquetes cuando páginas de firma aparecen invertidas respecto a plantillas OCR. Corrija orientación localmente, verifique al 100% de zoom y luego comprima y suba — escaneos de identidad nunca pasan por servidores de rotación de terceros.',
        ],
      },
    ],
    faq: [
      ...privacyFaq('es'),
      {
        q: '¿Puedo rotar solo algunas páginas?',
        a: 'Cuando la herramienta admite selección, aplique a ese subconjunto. Si no, divida el archivo, rote el rango extraído y una las partes en el orden deseado.',
      },
      {
        q: '¿La rotación reduce nitidez del texto?',
        a: 'No. Rotación pura ajusta metadatos de orientación y transforma sin rasterizar vector. Las imágenes incrustadas giran con el objeto de página.',
      },
      {
        q: '¿Cuál es la diferencia entre 90° y 270°?',
        a: 'Ambos cambian vertical por apaisado o al revés, en direcciones opuestas. Si uno queda invertido, use el otro ángulo recto o sume 180°.',
      },
      {
        q: '¿La rotación cambia el tamaño de página?',
        a: 'Las dimensiones de media box pueden intercambiar ancho y alto en giros de 90° y 270°. Verifique vista previa de impresión antes de imprimir en masa.',
      },
      {
        q: '¿Puedo deshacer la rotación?',
        a: 'Guarde el original hasta confirmar la salida. Aplicar el ángulo opuesto en una copia recupera orientación si aún tiene la fuente.',
      },
    ],
    relatedTools: ['/pdf-split', '/pdf-merge', '/pdf-ocr'],
    cta: defaultCta('es', 'Rotar PDF'),
  },
};
