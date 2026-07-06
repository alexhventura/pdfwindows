import type { ToolRichContent } from '../types';
import { privacyFaq, defaultCta } from '../helpers';

export const IMAGE_OCR_CONTENT: Record<'en' | 'pt' | 'es', ToolRichContent> = {
  en: {
    title: 'Image OCR Online Offline | PDFWINDOWS',
    description:
      'Extract text from photos and scans with local OCR in your browser. Digitize documents privately — no upload, no cloud recognition servers.',
    keywords:
      'image ocr, photo to text, extract text from image offline, tesseract browser, scan to text local, ocr without upload',
    h1: 'Image OCR — On-Device Text Recognition',
    intro:
      'Printed text trapped inside a photograph or scan is difficult to search, quote, or paste into spreadsheets. Cloud OCR services extract that text quickly — but they also receive your document images on remote servers, which is unacceptable for medical forms, legal exhibits, and internal memos photographed on a phone. PDFWINDOWS Image OCR runs recognition inside your browser using on-device engines, turning screenshots, receipts, whiteboard notes, and scanned pages into editable text you can copy or export without sending pixels to a third party.',
    toolName: 'Image OCR',
    benefits: [
      'Optical character recognition runs locally in the browser',
      'Supports multiple languages for international documents',
      'No cloud upload — sensitive scans stay on your device',
      'Copy extracted text or export for Word, email, and spreadsheets',
      'Free to use with no account or usage quotas',
    ],
    useCases: [
      {
        title: 'Digitize receipts and expense paperwork',
        body:
          'Finance teams photograph receipts on the road but need line items in reimbursement systems. OCR pulls merchant names, dates, and totals from phone photos so you can paste into spreadsheets or expense tools — without routing purchase history through an external recognition API.',
      },
      {
        title: 'Capture whiteboard and meeting notes',
        body:
          'Workshop sessions and classroom boards disappear when erased. A quick photo plus local OCR preserves decisions, diagrams labels, and action items as searchable text. Product managers and teachers reuse the content in meeting minutes, lesson plans, and ticket descriptions.',
      },
      {
        title: 'Extract text from scanned contracts and forms',
        body:
          'Signed agreements and government forms often arrive as image-only scans without a text layer. OCR recovers clauses, names, and reference numbers for quoting in email, comparison in diff tools, or indexing in document management — while keeping the original scan private on your machine.',
      },
      {
        title: 'Make book and article pages searchable',
        body:
          'Researchers photograph library pages or journal excerpts for citation work. Local OCR converts those captures into copyable paragraphs for footnotes and literature reviews, avoiding cloud services that might retain copyrighted material.',
      },
      {
        title: 'Support accessibility and translation prep',
        body:
          'Screen readers and translation workflows need plain text, not flat images. OCR on menu photos, signage, and printed handouts creates a text starting point for assistive tools or downstream translation — all without uploading personal or location-sensitive visuals.',
      },
    ],
    howItWorks: [
      'Open Image OCR and upload a photo, screenshot, or scan from your device.',
      'Select the recognition language that matches the document text.',
      'Start OCR; the browser analyzes pixels and builds a text result locally.',
      'Review the extracted text in the output panel and correct obvious errors.',
      'Copy to clipboard or export the text for use in other applications.',
    ],
    tips: [
      'Use straight, well-lit photos — skewed or blurry images reduce recognition accuracy.',
      'Crop to the text region before OCR to avoid background noise from desks or walls.',
      'For faint scans, run Image Filters to increase contrast before recognition.',
      'Match the OCR language setting to the document — mixed-language pages may need a second pass.',
      'Downscale extremely large camera photos with Resize Image if processing feels slow.',
      'Proofread numbers, codes, and names — OCR can confuse similar characters like 0/O and 1/l.',
    ],
    sections: [
      {
        id: 'how-ocr-works',
        heading: 'How browser OCR recognizes text',
        level: 2,
        paragraphs: [
          'Optical character recognition analyzes contrast patterns in an image to infer letters, numbers, and punctuation. The engine segments lines and words, compares shapes against trained models, and assembles a Unicode text stream. Because PDFWINDOWS runs this pipeline locally, your image bytes never leave the device — unlike SaaS OCR that uploads files to shared GPU farms.',
          'Accuracy depends on resolution, font clarity, and lighting. Typed documents and laser-printed pages typically score high. Handwriting, decorative fonts, and low-contrast thermal receipts are harder. Treat OCR output as a draft: quick for bulk capture, but verify critical fields manually.',
        ],
      },
      {
        id: 'language-support',
        heading: 'Choosing the right language model',
        level: 2,
        paragraphs: [
          'OCR engines load language-specific character sets and dictionaries. Selecting Portuguese for a Brazilian invoice or English for a US form improves word segmentation and diacritic recognition. Wrong language settings produce gibberish even when the image is sharp.',
          'Multilingual pages — such as passports or product labels — may require running OCR twice with different language packs or splitting the image into regions per language.',
        ],
        bullets: [
          'English — US and UK business documents',
          'Portuguese — Brazilian and European Portuguese forms',
          'Spanish — Latin American and Iberian paperwork',
        ],
      },
      {
        id: 'improve-accuracy',
        heading: 'Improving OCR accuracy before recognition',
        level: 2,
        paragraphs: [
          'Preprocessing often matters more than re-running OCR on a poor source. Increase contrast on yellowed scans, convert color noise to grayscale, and deskew pages that were photographed at an angle. PDFWINDOWS Image Filters and Resize Image help prepare files without leaving the local toolchain.',
          'For multi-column layouts, crop each column separately so the engine reads left-to-right in one stream. Tables may need row-by-row crops if columns align poorly in a single pass.',
        ],
      },
      {
        id: 'ocr-workflow',
        heading: 'OCR in a document workflow',
        level: 3,
        paragraphs: [
          'OCR is often a middle step: capture text from an image, edit in a word processor, then convert to PDF with TXT to PDF or combine with Image to PDF for archival. For PDF-native text extraction, use PDF Extract Text when the source is already a digital PDF.',
        ],
        bullets: [
          'Image Filters — boost contrast on faint scans',
          'Image to PDF — archive the original scan with OCR text alongside',
          'TXT to PDF — turn cleaned OCR output into a shareable document',
        ],
      },
    ],
    faq: [
      ...privacyFaq('en'),
      {
        q: 'Does OCR work on handwriting?',
        a: 'Handwriting recognition is limited compared to printed text. Neat block letters may work; cursive and messy notes often need manual correction. Use OCR on handwriting as a starting point, not a final transcript.',
      },
      {
        q: 'What image formats can I use?',
        a: 'Common formats such as JPG, PNG, and WEBP work well. Convert uncommon types with Image Converter first if the tool does not accept them directly.',
      },
      {
        q: 'How accurate is local browser OCR?',
        a: 'On clean printed documents, accuracy is often very high. Noisy photos, glare, and low resolution reduce quality. Always verify numbers, legal names, and serial codes before relying on output.',
      },
      {
        q: 'Can I OCR a photo of a screen?',
        a: 'Yes, though moiré patterns from photographing monitors can confuse recognition. Screenshots saved directly as PNG usually produce better results than camera photos of displays.',
      },
    ],
    relatedTools: ['/image-filters', '/image-resize', '/image-to-pdf', '/pdf-ocr'],
    cta: defaultCta('en', 'Image OCR'),
  },
  pt: {
    title: 'OCR de Imagem Online Offline | PDFWINDOWS',
    description:
      'Extraia texto de fotos e scans com OCR local no navegador. Digitalize documentos com privacidade — sem upload nem servidores de reconhecimento na nuvem.',
    keywords:
      'ocr imagem, foto para texto, extrair texto de imagem offline, tesseract navegador, scan para texto local',
    h1: 'OCR de Imagem — Reconhecimento no Dispositivo',
    intro:
      'Texto impresso preso em fotografia ou scan é difícil de buscar, citar ou colar em planilhas. Serviços de OCR na nuvem extraem esse texto rápido — mas também recebem suas imagens em servidores remotos, o que é inaceitável para formulários médicos, peças jurídicas e memorandos internos fotografados no celular. O OCR de Imagem do PDFWINDOWS roda reconhecimento no navegador com motores no dispositivo, transformando capturas, recibos, notas de quadro e páginas escaneadas em texto editável para copiar ou exportar sem enviar pixels a terceiros.',
    toolName: 'OCR de Imagem',
    benefits: [
      'Reconhecimento óptico de caracteres roda localmente no navegador',
      'Suporta vários idiomas para documentos internacionais',
      'Sem upload na nuvem — scans sensíveis ficam no dispositivo',
      'Copie texto extraído ou exporte para Word, e-mail e planilhas',
      'Gratuito, sem conta nem cotas de uso',
    ],
    useCases: [
      {
        title: 'Digitalizar recibos e papelada de despesas',
        body:
          'Equipes financeiras fotografam recibos em viagem mas precisam dos itens em sistemas de reembolso. OCR extrai nomes de estabelecimentos, datas e totais de fotos do celular para colar em planilhas ou ferramentas de despesas — sem rotear histórico de compras por API externa de reconhecimento.',
      },
      {
        title: 'Capturar notas de quadro e reuniões',
        body:
          'Sessões de workshop e aulas no quadro somem quando apagadas. Foto rápida mais OCR local preserva decisões, rótulos de diagramas e action items como texto pesquisável. Product managers e professores reutilizam em atas, planos de aula e descrições de tickets.',
      },
      {
        title: 'Extrair texto de contratos e formulários escaneados',
        body:
          'Acordos assinados e formulários governamentais chegam como scan só-imagem sem camada de texto. OCR recupera cláusulas, nomes e números de referência para citar em e-mail, comparar em diff ou indexar no GED — mantendo o scan original privado na máquina.',
      },
      {
        title: 'Tornar páginas de livros e artigos pesquisáveis',
        body:
          'Pesquisadores fotografam páginas de biblioteca ou trechos de periódicos para citação. OCR local converte capturas em parágrafos copiáveis para notas de rodapé e revisões bibliográficas, evitando serviços na nuvem que podem reter material com copyright.',
      },
      {
        title: 'Apoiar acessibilidade e preparação para tradução',
        body:
          'Leitores de tela e fluxos de tradução precisam de texto puro, não imagem plana. OCR em fotos de cardápio, placas e folhetos impressos cria ponto de partida para ferramentas assistivas ou tradução posterior — sem enviar visuais pessoais ou sensíveis à localização.',
      },
    ],
    howItWorks: [
      'Abra OCR de Imagem e envie foto, captura ou scan do dispositivo.',
      'Selecione o idioma de reconhecimento que corresponde ao texto do documento.',
      'Inicie o OCR; o navegador analisa pixels e monta o texto localmente.',
      'Revise o texto extraído no painel de saída e corrija erros óbvios.',
      'Copie para a área de transferência ou exporte para outros aplicativos.',
    ],
    tips: [
      'Use fotos retas e bem iluminadas — inclinação ou borrão reduzem precisão.',
      'Recorte a região de texto antes do OCR para evitar ruído de mesa ou parede.',
      'Em scans fracos, use Filtros de Imagem para aumentar contraste antes do reconhecimento.',
      'Combine idioma do OCR ao documento — páginas multilíngues podem precisar segunda passagem.',
      'Reduza fotos enormes de câmera com Redimensionar Imagem se o processamento ficar lento.',
      'Revise números, códigos e nomes — OCR confunde caracteres parecidos como 0/O e 1/l.',
    ],
    sections: [
      {
        id: 'como-ocr-funciona',
        heading: 'Como o OCR no navegador reconhece texto',
        level: 2,
        paragraphs: [
          'O reconhecimento óptico de caracteres analisa padrões de contraste na imagem para inferir letras, números e pontuação. O motor segmenta linhas e palavras, compara formas com modelos treinados e monta fluxo de texto Unicode. Como o PDFWINDOWS roda esse pipeline localmente, os bytes da imagem não saem do dispositivo — diferente de OCR SaaS que envia arquivos a farms de GPU compartilhadas.',
          'A precisão depende de resolução, clareza da fonte e iluminação. Documentos digitados e páginas impressas a laser costumam ter alta taxa de acerto. Escrita à mão, fontes decorativas e recibos térmicos de baixo contraste são mais difíceis. Trate a saída do OCR como rascunho: rápido para captura em massa, mas verifique campos críticos manualmente.',
        ],
      },
      {
        id: 'suporte-idiomas',
        heading: 'Escolhendo o modelo de idioma certo',
        level: 2,
        paragraphs: [
          'Motores de OCR carregam conjuntos de caracteres e dicionários por idioma. Selecionar português para nota fiscal brasileira ou inglês para formulário dos EUA melhora segmentação e reconhecimento de acentos. Idioma errado produz gibberish mesmo com imagem nítida.',
          'Páginas multilíngues — como passaportes ou rótulos de produto — podem exigir OCR duas vezes com pacotes de idioma diferentes ou dividir a imagem em regiões por idioma.',
        ],
        bullets: [
          'Inglês — documentos comerciais EUA e Reino Unido',
          'Português — formulários brasileiros e europeus',
          'Espanhol — papelada latino-americana e ibérica',
        ],
      },
      {
        id: 'melhorar-precisao',
        heading: 'Melhorar precisão do OCR antes do reconhecimento',
        level: 2,
        paragraphs: [
          'Pré-processamento costuma importar mais que rodar OCR de novo em fonte ruim. Aumente contraste em scans amarelados, converta ruído colorido para escala de cinza e endireite páginas fotografadas em ângulo. Filtros de Imagem e Redimensionar Imagem do PDFWINDOWS preparam arquivos sem sair da cadeia local.',
          'Em layouts multicolumna, recorte cada coluna separadamente para o motor ler da esquerda para direita em um fluxo. Tabelas podem precisar de recortes linha a linha se colunas alinham mal em passagem única.',
        ],
      },
      {
        id: 'fluxo-ocr',
        heading: 'OCR em um fluxo de documentos',
        level: 3,
        paragraphs: [
          'OCR costuma ser etapa intermediária: capturar texto da imagem, editar no processador de texto, depois converter para PDF com TXT para PDF ou combinar com Imagem para PDF para arquivo. Para extração de texto nativo em PDF, use Extrair Texto de PDF quando a fonte já for PDF digital.',
        ],
        bullets: [
          'Filtros de Imagem — aumente contraste em scans fracos',
          'Imagem para PDF — arquive o scan original com texto OCR ao lado',
          'TXT para PDF — transforme saída OCR limpa em documento compartilhável',
        ],
      },
    ],
    faq: [
      ...privacyFaq('pt'),
      {
        q: 'OCR funciona em escrita à mão?',
        a: 'Reconhecimento de manuscrito é limitado comparado a texto impresso. Letras de forma legíveis podem funcionar; cursiva e notas bagunçadas costumam precisar correção manual. Use OCR em manuscrito como ponto de partida, não transcrição final.',
      },
      {
        q: 'Quais formatos de imagem posso usar?',
        a: 'Formatos comuns como JPG, PNG e WEBP funcionam bem. Converta tipos incomuns no Conversor de Imagens primeiro se a ferramenta não aceitar diretamente.',
      },
      {
        q: 'Quão preciso é o OCR local no navegador?',
        a: 'Em documentos impressos limpos, a precisão costuma ser muito alta. Fotos ruidosas, reflexo e baixa resolução reduzem qualidade. Sempre verifique números, nomes legais e códigos seriais antes de confiar na saída.',
      },
      {
        q: 'Posso fazer OCR de foto de tela?',
        a: 'Sim, embora padrões moiré ao fotografar monitores possam confundir o reconhecimento. Capturas salvas diretamente como PNG costumam dar resultado melhor que fotos de câmera de telas.',
      },
    ],
    relatedTools: ['/image-filters', '/image-resize', '/image-to-pdf', '/pdf-ocr'],
    cta: defaultCta('pt', 'OCR de Imagem'),
  },
  es: {
    title: 'OCR de Imagen Online Offline | PDFWINDOWS',
    description:
      'Extraiga texto de fotos y escaneos con OCR local en su navegador. Digitalice documentos con privacidad — sin subida ni servidores de reconocimiento en la nube.',
    keywords:
      'ocr imagen, foto a texto, extraer texto de imagen offline, tesseract navegador, escaneo a texto local',
    h1: 'OCR de Imagen — Reconocimiento en el Dispositivo',
    intro:
      'El texto impreso atrapado en una fotografía o escaneo es difícil de buscar, citar o pegar en hojas de cálculo. Los servicios OCR en la nube extraen ese texto rápido — pero también reciben sus imágenes en servidores remotos, lo cual es inaceptable para formularios médicos, pruebas legales y memorandos internos fotografiados con el móvil. OCR de Imagen de PDFWINDOWS ejecuta reconocimiento dentro de su navegador con motores en el dispositivo, convirtiendo capturas, recibos, notas de pizarra y páginas escaneadas en texto editable para copiar o exportar sin enviar píxeles a terceros.',
    toolName: 'OCR de Imagen',
    benefits: [
      'El reconocimiento óptico de caracteres se ejecuta localmente en el navegador',
      'Admite varios idiomas para documentos internacionales',
      'Sin subida a la nube — escaneos sensibles permanecen en su dispositivo',
      'Copie texto extraído o expórtelo para Word, correo y hojas de cálculo',
      'Gratis, sin cuenta ni cuotas de uso',
    ],
    useCases: [
      {
        title: 'Digitalizar recibos y papeles de gastos',
        body:
          'Los equipos financieros fotografían recibos en ruta pero necesitan partidas en sistemas de reembolso. OCR extrae nombres de comercios, fechas y totales de fotos del móvil para pegar en hojas de cálculo o herramientas de gastos — sin enrutar historial de compras por API externa de reconocimiento.',
      },
      {
        title: 'Capturar notas de pizarra y reuniones',
        body:
          'Las sesiones de taller y clases en pizarra desaparecen al borrarlas. Una foto rápida más OCR local preserva decisiones, etiquetas de diagramas y tareas como texto buscable. Product managers y docentes reutilizan en actas, planes de clase y descripciones de tickets.',
      },
      {
        title: 'Extraer texto de contratos y formularios escaneados',
        body:
          'Acuerdos firmados y formularios gubernamentales llegan como escaneo solo-imagen sin capa de texto. OCR recupera cláusulas, nombres y números de referencia para citar en correo, comparar en diff o indexar en gestión documental — manteniendo el escaneo original privado en su equipo.',
      },
      {
        title: 'Hacer páginas de libros y artículos buscables',
        body:
          'Investigadores fotografían páginas de biblioteca o extractos de revistas para citación. OCR local convierte esas capturas en párrafos copiables para notas al pie y revisiones bibliográficas, evitando servicios en la nube que pueden retener material con copyright.',
      },
      {
        title: 'Apoyar accesibilidad y preparación para traducción',
        body:
          'Lectores de pantalla y flujos de traducción necesitan texto plano, no imagen plana. OCR en fotos de menús, señalización y folletos impresos crea punto de partida para herramientas asistivas o traducción posterior — sin subir visuales personales o sensibles a la ubicación.',
      },
    ],
    howItWorks: [
      'Abra OCR de Imagen y suba foto, captura o escaneo desde su dispositivo.',
      'Seleccione el idioma de reconocimiento que coincida con el texto del documento.',
      'Inicie OCR; el navegador analiza píxeles y construye el texto localmente.',
      'Revise el texto extraído en el panel de salida y corrija errores obvios.',
      'Copie al portapapeles o exporte el texto para otros aplicativos.',
    ],
    tips: [
      'Use fotos rectas y bien iluminadas — inclinación o desenfoque reducen precisión.',
      'Recorte la región de texto antes del OCR para evitar ruido de escritorio o pared.',
      'En escaneos débiles, use Filtros de Imagen para aumentar contraste antes del reconocimiento.',
      'Coincida el idioma del OCR con el documento — páginas multilingües pueden necesitar segunda pasada.',
      'Reduzca fotos enormes de cámara con Redimensionar Imagen si el procesamiento es lento.',
      'Revise números, códigos y nombres — OCR confunde caracteres similares como 0/O y 1/l.',
    ],
    sections: [
      {
        id: 'como-funciona-ocr',
        heading: 'Cómo el OCR en navegador reconoce texto',
        level: 2,
        paragraphs: [
          'El reconocimiento óptico de caracteres analiza patrones de contraste en la imagen para inferir letras, números y puntuación. El motor segmenta líneas y palabras, compara formas con modelos entrenados y ensambla flujo de texto Unicode. PDFWINDOWS ejecuta este pipeline localmente, por lo que los bytes de la imagen no salen del dispositivo.',
          'La precisión depende de resolución, claridad de fuente e iluminación. Documentos mecanografiados y páginas impresas láser suelen tener alta tasa de acierto. Trate la salida OCR como borrador y verifique campos críticos manualmente.',
        ],
      },
      {
        id: 'soporte-idiomas',
        heading: 'Elegir el modelo de idioma correcto',
        level: 2,
        paragraphs: [
          'Los motores OCR cargan conjuntos de caracteres y diccionarios por idioma. Seleccionar español para factura latinoamericana o inglés para formulario de EE. UU. mejora segmentación y reconocimiento de diacríticos. Configuración de idioma incorrecta produce texto sin sentido incluso con imagen nítida.',
          'Páginas multilingües — como pasaportes o etiquetas de producto — pueden requerir ejecutar OCR dos veces con paquetes de idioma distintos o dividir la imagen en regiones por idioma.',
        ],
        bullets: [
          'Inglés — documentos comerciales de EE. UU. y Reino Unido',
          'Portugués — formularios brasileños y europeos',
          'Español — papeles latinoamericanos e ibéricos',
        ],
      },
      {
        id: 'mejorar-precision',
        heading: 'Mejorar precisión del OCR antes del reconocimiento',
        level: 2,
        paragraphs: [
          'El preprocesamiento suele importar más que volver a ejecutar OCR en fuente pobre. Aumente contraste en escaneos amarillentos, convierta ruido de color a escala de grises y enderece páginas fotografiadas en ángulo. Filtros de Imagen y Redimensionar Imagen de PDFWINDOWS preparan archivos sin salir de la cadena local.',
          'En diseños multicolumna, recorte cada columna por separado para que el motor lea de izquierda a derecha en un flujo. Las tablas pueden necesitar recortes fila por fila si las columnas alinean mal en un solo paso.',
        ],
      },
      {
        id: 'flujo-ocr',
        heading: 'OCR en un flujo de documentos',
        level: 3,
        paragraphs: [
          'OCR suele ser paso intermedio: capturar texto de imagen, editar en procesador de texto, luego convertir a PDF con TXT a PDF o combinar con Imagen a PDF para archivo. Para extracción de texto nativo en PDF, use Extraer Texto de PDF cuando la fuente ya sea PDF digital.',
        ],
        bullets: [
          'Filtros de Imagen — aumente contraste en escaneos débiles',
          'Imagen a PDF — archive el escaneo original con texto OCR al lado',
          'TXT a PDF — convierta salida OCR limpia en documento compartible',
        ],
      },
    ],
    faq: [
      ...privacyFaq('es'),
      {
        q: '¿Funciona OCR en escritura a mano?',
        a: 'El reconocimiento de manuscrito es limitado comparado con texto impreso. Letras de imprenta legibles pueden funcionar; cursiva y notas desordenadas suelen necesitar corrección manual. Use OCR en manuscrito como punto de partida, no transcripción final.',
      },
      {
        q: '¿Qué formatos de imagen puedo usar?',
        a: 'Formatos comunes como JPG, PNG y WEBP funcionan bien. Convierta tipos poco comunes con Conversor de Imágenes primero si la herramienta no los acepta directamente.',
      },
      {
        q: '¿Qué tan preciso es el OCR local en navegador?',
        a: 'En documentos impresos limpios, la precisión suele ser muy alta. Fotos ruidosas, reflejos y baja resolución reducen calidad. Siempre verifique números, nombres legales y códigos seriales antes de confiar en la salida.',
      },
      {
        q: '¿Puedo hacer OCR de foto de pantalla?',
        a: 'Sí, aunque patrones moiré al fotografiar monitores pueden confundir el reconocimiento. Capturas guardadas directamente como PNG suelen dar mejor resultado que fotos de cámara de pantallas.',
      },
    ],
    relatedTools: ['/image-filters', '/image-resize', '/image-to-pdf', '/pdf-ocr'],
    cta: defaultCta('es', 'OCR de Imagen'),
  },
};
