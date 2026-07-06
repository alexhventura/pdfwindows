import type { ToolRichContent } from '../types';
import { privacyFaq, defaultCta } from '../helpers';

export const PDF_COMPRESS_CONTENT: Record<'en' | 'pt' | 'es', ToolRichContent> = {
  en: {
    title: 'Compress PDF Online Free & Offline | PDFWINDOWS',
    description:
      'Reduce PDF file size in your browser without uploading to cloud servers. Shrink documents for email attachments while keeping readable quality — 100% local and private.',
    keywords:
      'compress pdf, reduce pdf size, shrink pdf offline, pdf compressor free, optimize pdf browser, smaller pdf email',
    h1: 'Compress PDF — Local Processing',
    intro:
      'Oversized PDFs block inboxes, bounce from portal upload limits, and waste mobile data. Traditional online compressors solve that by copying your file to their infrastructure — which is a poor trade when the document contains payroll, legal discovery, or unreleased designs. PDFWINDOWS compresses PDFs inside your browser: images are re-encoded, redundant streams trimmed, and the optimized file downloads directly to disk. You stay in control of the quality-versus-size balance without exposing document contents to a third party. Because nothing uploads, you can iterate — compress, review legibility at 100% zoom, and try again on a copy until the file fits your portal limit.',
    toolName: 'Compress PDF',
    benefits: [
      'No server upload — compression runs on your device',
      'Meaningful size reduction for image-heavy PDFs',
      'Instant results without queue or email delivery',
      'Safe for confidential and regulated documents',
      'Works after page load even without internet',
    ],
    useCases: [
      {
        title: 'Email attachment limits',
        body:
          'Corporate SMTP gateways often cap attachments at 10–25 MB. A single high-resolution scan or exported slide deck can exceed that quickly. Compressing locally lets you hit the limit while keeping text legible, without routing the message content through an external compression API.',
      },
      {
        title: 'Client portal uploads',
        body:
          'Insurance claims, mortgage applications, and government forms frequently enforce strict file size caps. When re-scanning is not an option, browser-based compression reduces megabytes while preserving enough detail for reviewers to read signatures and fine print.',
      },
      {
        title: 'Mobile sharing',
        body:
          'Field workers photograph site reports and merge them into PDFs that are too heavy for WhatsApp or mobile email. Compressing on the phone or tablet before sharing cuts transfer time and respects recipients on slow connections — all without uploading site photos to a cloud converter.',
      },
      {
        title: 'Archive and backup hygiene',
        body:
          'Long-term storage costs scale with bytes. Compressing infrequently accessed reference PDFs — old invoices, completed project files, training manuals — frees disk space on NAS drives and backup volumes while keeping documents openable in standard readers.',
      },
      {
        title: 'Web publishing and intranet',
        body:
          'Internal knowledge bases and public download pages load faster when PDF handouts are lean. Compress policy PDFs and product sheets locally before uploading to your CMS, so only the optimized version ever touches your hosting — not an intermediary compression service.',
      },
    ],
    howItWorks: [
      'Upload one or more PDF files to the compressor.',
      'Select the compress operation from the tool menu.',
      'The browser analyzes images and streams, then rebuilds a smaller PDF.',
      'Download the compressed file and compare size against the original.',
    ],
    tips: [
      'Compress after merging when you need one small file from multiple sources.',
      'Text-only PDFs shrink less than scan-heavy ones — expectations should match content type.',
      'Always open the output and zoom into small text before deleting the original.',
      'If quality is unacceptable, try compressing a copy exported at lower resolution from the source app.',
      'Password-protected PDFs must be unlocked before compression can read their streams.',
      'For maximum shrinkage on pure scans, consider OCR or image-to-PDF workflows only after reviewing quality needs.',
    ],
    sections: [
      {
        id: 'how-compression-works',
        heading: 'How browser PDF compression actually works',
        level: 2,
        paragraphs: [
          'PDF files bundle text, vector graphics, fonts, and raster images into a structured container. Most bloat comes from embedded photos and scanned pages stored as high-resolution bitmaps. Compression re-samples those images to a lower resolution or applies stronger JPEG-style encoding while leaving searchable text and vector lines largely untouched.',
          'Because processing happens locally, the algorithm can read every byte without network latency. Large files may take longer on low-end hardware, but you avoid upload time entirely — which often dominates cloud tools on asymmetric home broadband.',
        ],
      },
      {
        id: 'quality-tradeoffs',
        heading: 'Balancing file size and visual quality',
        level: 2,
        paragraphs: [
          'Aggressive compression saves more megabytes but can introduce blur or compression artifacts around diagrams and photos. Mild compression is usually invisible on body text and line art while still cutting 30–70% from scan-heavy documents.',
        ],
        bullets: [
          'Text and vector content compress efficiently with little visible change.',
          'Grayscale scans often shrink more than full-color photo pages.',
          'Repeated logos across slides may benefit from deduplication during rebuild.',
        ],
      },
      {
        id: 'when-not-to-compress',
        heading: 'When compression is the wrong first step',
        level: 2,
        paragraphs: [
          'Print-ready artwork, engineering drawings with fine hatching, and medical imaging PDFs may lose diagnostically or legally relevant detail when re-encoded. For those cases, split the file to share sections, or distribute via secure file transfer instead of forcing extreme compression.',
        ],
      },
      {
        id: 'compress-workflow',
        heading: 'Fitting compression into a larger PDF workflow',
        level: 2,
        paragraphs: [
          'Compression pairs naturally with merge and split. Merge departmental exports first, compress the unified report for email, or split a huge archive and compress each chapter separately for progressive download. Rotate misaligned scans before compressing so reviewers do not need to twist their screens.',
        ],
        bullets: [
          'Merge — combine sections before a single compress pass.',
          'Split — isolate heavy image chapters for targeted shrinking.',
          'Password protect — encrypt after you finalize the smaller file.',
        ],
      },
    ],
    faq: [
      ...privacyFaq('en'),
      {
        q: 'How much smaller will my PDF get?',
        a: 'Results vary widely. Image-heavy scans often drop 40–80% in size; text-only PDFs may shrink only slightly. The original encoding and resolution matter more than page count.',
      },
      {
        q: 'Will compressed PDFs still print clearly?',
        a: 'For office documents and typical scans, yes. For professional print production or fine art reproduction, compare a test print before discarding the original high-resolution file.',
      },
      {
        q: 'Does compression remove searchable text?',
        a: 'No. Text layers and OCR results remain searchable unless the source page was a flat image with no text layer to begin with.',
      },
      {
        q: 'Can I compress multiple PDFs in one batch?',
        a: 'You can queue several files and process them sequentially in the browser. Each output downloads separately so you can verify quality per file.',
      },
      {
        q: 'Is compression reversible?',
        a: 'No. Re-encoding images permanently discards some pixel data. Keep an uncompressed archive copy when you might need maximum quality later.',
      },
    ],
    relatedTools: ['/pdf-merge', '/pdf-password', '/pdf-to-image'],
    cta: defaultCta('en', 'Compress PDF'),
  },
  pt: {
    title: 'Comprimir PDF Online Grátis e Offline | PDFWINDOWS',
    description:
      'Reduza o tamanho de PDFs no navegador sem enviar para servidores na nuvem. Diminua documentos para anexos de e-mail mantendo qualidade legível — 100% local e privado.',
    keywords:
      'comprimir pdf, reduzir tamanho pdf, pdf menor offline, otimizar pdf navegador, diminuir pdf email',
    h1: 'Comprimir PDF — Processamento Local',
    intro:
      'PDFs grandes travam caixas de entrada, ultrapassam limites de upload em portais e consomem dados móveis. Compressores online tradicionais resolvem isso copiando seu arquivo para a infraestrutura deles — um mau negócio quando o documento contém folha de pagamento, processos jurídicos ou designs não lançados. O PDFWINDOWS comprime PDFs dentro do navegador: imagens são recodificadas, fluxos redundantes removidos e o arquivo otimizado baixa direto no disco. Você controla o equilíbrio entre qualidade e tamanho sem expor o conteúdo a terceiros. Como nada é enviado, você pode iterar — comprimir, revisar legibilidade em zoom 100% e tentar de novo em uma cópia até o arquivo caber no limite do portal.',
    toolName: 'Comprimir PDF',
    benefits: [
      'Sem upload — a compressão roda no seu dispositivo',
      'Redução significativa em PDFs com muitas imagens',
      'Resultado imediato sem fila ou entrega por e-mail',
      'Seguro para documentos confidenciais e regulados',
      'Funciona offline após carregar a página',
    ],
    useCases: [
      {
        title: 'Limites de anexo de e-mail',
        body:
          'Gateways corporativos costumam limitar anexos a 10–25 MB. Um único scan em alta resolução ou deck exportado pode ultrapassar isso rapidamente. Comprimir localmente ajuda a ficar dentro do limite mantendo texto legível, sem passar o conteúdo por API externa.',
      },
      {
        title: 'Upload em portais de clientes',
        body:
          'Sinistros de seguro, pedidos de hipoteca e formulários governamentais impõem tetos rígidos de tamanho. Quando reescanear não é opção, a compressão no navegador reduz megabytes preservando detalhe suficiente para ler assinaturas e letras miúdas.',
      },
      {
        title: 'Compartilhamento mobile',
        body:
          'Equipes de campo fotografam relatórios de obra e montam PDFs pesados demais para WhatsApp ou e-mail no celular. Comprimir no dispositivo antes de enviar reduz tempo de transferência e respeita conexões lentas — sem subir fotos do canteiro para conversor na nuvem.',
      },
      {
        title: 'Higiene de arquivo e backup',
        body:
          'Armazenamento de longo prazo escala com bytes. Comprimir PDFs de referência acessados raramente — faturas antigas, projetos concluídos, manuais — libera espaço em NAS e volumes de backup mantendo abertura em leitores padrão.',
      },
      {
        title: 'Publicação web e intranet',
        body:
          'Bases de conhecimento e páginas de download carregam mais rápido com PDFs enxutos. Comprima políticas e fichas de produto localmente antes de subir ao CMS, para que só a versão otimizada toque sua hospedagem — não um serviço intermediário.',
      },
    ],
    howItWorks: [
      'Envie um ou mais PDFs ao compressor.',
      'Selecione a operação de compressão no menu.',
      'O navegador analisa imagens e fluxos e reconstrói um PDF menor.',
      'Baixe o arquivo comprimido e compare o tamanho com o original.',
    ],
    tips: [
      'Comprima após mesclar quando precisar de um único arquivo pequeno.',
      'PDFs só-texto encolhem menos que scans — alinhe expectativas ao tipo de conteúdo.',
      'Abra o resultado e amplie textos pequenos antes de apagar o original.',
      'Se a qualidade for ruim, exporte uma cópia em resolução menor do app de origem e tente de novo.',
      'PDFs com senha precisam ser desbloqueados antes da compressão.',
      'Para máxima redução em scans puros, avalie OCR ou fluxos imagem-para-PDF só após definir necessidades de qualidade.',
    ],
    sections: [
      {
        id: 'how-compression-works',
        heading: 'Como a compressão de PDF no navegador funciona',
        level: 2,
        paragraphs: [
          'Arquivos PDF agrupam texto, gráficos vetoriais, fontes e imagens raster em um contêiner estruturado. A maior parte do peso vem de fotos embutidas e páginas digitalizadas em bitmap de alta resolução. A compressão reamostra essas imagens ou aplica codificação JPEG mais forte, deixando texto pesquisável e linhas vetoriais em grande parte intactos.',
          'Como o processamento é local, o algoritmo lê cada byte sem latência de rede. Arquivos grandes podem demorar em hardware modesto, mas você elimina o tempo de upload — que muitas vezes domina ferramentas na nuvem em banda larga assimétrica.',
        ],
      },
      {
        id: 'quality-tradeoffs',
        heading: 'Equilibrando tamanho e qualidade visual',
        level: 2,
        paragraphs: [
          'Compressão agressiva economiza mais megabytes, mas pode borrar diagramas e fotos. Compressão leve costuma ser invisível em texto corrido e arte linear enquanto corta 30–70% de documentos com muitos scans.',
        ],
        bullets: [
          'Texto e vetor comprimem bem com pouca mudança visível.',
          'Scans em escala de cinza costumam encolher mais que páginas coloridas.',
          'Logos repetidos em slides podem se beneficiar de deduplicação na reconstrução.',
        ],
      },
      {
        id: 'when-not-to-compress',
        heading: 'Quando compressão não é o primeiro passo',
        level: 2,
        paragraphs: [
          'Arte pronta para impressão, plantas com hachuras finas e PDFs de imagem médica podem perder detalhe relevante ao ser recodificados. Nesses casos, divida o arquivo para compartilhar partes ou use transferência segura em vez de forçar compressão extrema.',
        ],
      },
      {
        id: 'compress-workflow',
        heading: 'Encaixando compressão em um fluxo maior de PDF',
        level: 2,
        paragraphs: [
          'Compressão combina bem com mesclar e dividir. Mescle exportações departamentais, comprima o relatório unificado para e-mail, ou divida um arquivo enorme e comprima cada capítulo para download progressivo. Rotacione scans tortos antes de comprimir para facilitar a revisão.',
        ],
        bullets: [
          'Mesclar — combine seções antes de uma única passagem de compressão.',
          'Dividir — isole capítulos pesados em imagem para redução direcionada.',
          'Proteger com senha — criptografe depois de finalizar o arquivo menor.',
        ],
      },
    ],
    faq: [
      ...privacyFaq('pt'),
      {
        q: 'Quanto menor meu PDF ficará?',
        a: 'Varia muito. Scans com muita imagem costumam cair 40–80%; PDFs só-texto podem encolher pouco. A codificação e resolução originais importam mais que a contagem de páginas.',
      },
      {
        q: 'PDFs comprimidos ainda imprimem com clareza?',
        a: 'Para documentos de escritório e scans típicos, sim. Para impressão profissional ou reprodução artística, faça uma prova antes de descartar o arquivo em alta resolução.',
      },
      {
        q: 'A compressão remove texto pesquisável?',
        a: 'Não. Camadas de texto e resultados de OCR permanecem pesquisáveis, a menos que a página de origem fosse só imagem sem camada de texto.',
      },
      {
        q: 'Posso comprimir vários PDFs em lote?',
        a: 'Você pode enfileirar vários arquivos e processá-los em sequência no navegador. Cada saída baixa separadamente para você conferir a qualidade.',
      },
      {
        q: 'A compressão é reversível?',
        a: 'Não. Recodificar imagens descarta dados de pixel permanentemente. Guarde uma cópia sem compressão quando puder precisar de qualidade máxima depois.',
      },
    ],
    relatedTools: ['/pdf-merge', '/pdf-password', '/pdf-to-image'],
    cta: defaultCta('pt', 'Comprimir PDF'),
  },
  es: {
    title: 'Comprimir PDF Online Gratis y Offline | PDFWINDOWS',
    description:
      'Reduzca el tamaño de PDF en el navegador sin subir a servidores en la nube. Achique documentos para adjuntos de correo manteniendo calidad legible — 100% local y privado.',
    keywords:
      'comprimir pdf, reducir tamaño pdf, pdf más pequeño offline, optimizar pdf navegador, pdf email ligero',
    h1: 'Comprimir PDF — Procesamiento Local',
    intro:
      'Los PDF sobredimensionados bloquean bandejas de entrada, superan límites de subida en portales y gastan datos móviles. Los compresores online tradicionales copian su archivo a su infraestructura — un mal trato cuando el documento contiene nóminas, descubrimiento legal o diseños no publicados. PDFWINDOWS comprime PDF en su navegador: las imágenes se recodifican, los flujos redundantes se recortan y el archivo optimizado se descarga al disco. Usted controla el equilibrio calidad-tamaño sin exponer el contenido a terceros. Como nada se sube, puede iterar — comprimir, revisar legibilidad al 100% de zoom y repetir en una copia hasta que el archivo cumpla el límite del portal.',
    toolName: 'Comprimir PDF',
    benefits: [
      'Sin subida — la compresión corre en su dispositivo',
      'Reducción notable en PDF con muchas imágenes',
      'Resultados instantáneos sin cola ni entrega por correo',
      'Seguro para documentos confidenciales y regulados',
      'Funciona sin conexión tras cargar la página',
    ],
    useCases: [
      {
        title: 'Límites de adjuntos de correo',
        body:
          'Las pasarelas corporativas suelen limitar adjuntos a 10–25 MB. Un solo escaneo en alta resolución o presentación exportada puede superarlo rápido. Comprimir localmente ayuda a cumplir el límite manteniendo texto legible, sin pasar el contenido por una API externa.',
      },
      {
        title: 'Subidas a portales de clientes',
        body:
          'Reclamaciones de seguros, solicitudes hipotecarias y formularios gubernamentales imponen topes estrictos. Cuando reescanear no es opción, la compresión en el navegador reduce megabytes preservando detalle para leer firmas y letra pequeña.',
      },
      {
        title: 'Compartir desde móvil',
        body:
          'Equipos de campo fotografían informes de obra y crean PDF demasiado pesados para WhatsApp o correo móvil. Comprimir en el teléfono o tableta antes de compartir reduce tiempo de transferencia y respeta conexiones lentas — sin subir fotos del sitio a un convertidor en la nube.',
      },
      {
        title: 'Higiene de archivo y copias de seguridad',
        body:
          'El almacenamiento a largo plazo escala con bytes. Comprimir PDF de referencia poco consultados — facturas antiguas, proyectos cerrados, manuales — libera espacio en NAS y volúmenes de backup manteniendo apertura en lectores estándar.',
      },
      {
        title: 'Publicación web e intranet',
        body:
          'Las bases de conocimiento y páginas de descarga cargan más rápido con PDF livianos. Comprima políticas y fichas de producto localmente antes de subir al CMS, para que solo la versión optimizada toque su hosting — no un servicio intermedio.',
      },
    ],
    howItWorks: [
      'Suba uno o más archivos PDF al compresor.',
      'Seleccione la operación de compresión en el menú.',
      'El navegador analiza imágenes y flujos y reconstruye un PDF más pequeño.',
      'Descargue el archivo comprimido y compare el tamaño con el original.',
    ],
    tips: [
      'Comprima después de unir cuando necesite un solo archivo pequeño.',
      'Los PDF solo-texto se reducen menos que los escaneos — ajuste expectativas al tipo de contenido.',
      'Abra el resultado y amplíe texto pequeño antes de borrar el original.',
      'Si la calidad es mala, exporte una copia a menor resolución desde la app de origen e intente de nuevo.',
      'Los PDF con contraseña deben desbloquearse antes de comprimir.',
      'Para máxima reducción en escaneos puros, evalúe OCR o flujos imagen-a-PDF solo tras definir necesidades de calidad.',
    ],
    sections: [
      {
        id: 'how-compression-works',
        heading: 'Cómo funciona realmente la compresión de PDF en el navegador',
        level: 2,
        paragraphs: [
          'Los PDF agrupan texto, gráficos vectoriales, fuentes e imágenes raster en un contenedor estructurado. La mayor parte del peso proviene de fotos incrustadas y páginas escaneadas como mapas de bits de alta resolución. La compresión remuestrea esas imágenes o aplica codificación JPEG más fuerte, dejando texto buscable y líneas vectoriales en gran medida intactos.',
          'Al procesarse localmente, el algoritmo lee cada byte sin latencia de red. Archivos grandes pueden tardar en hardware modesto, pero elimina el tiempo de subida — que a menudo domina las herramientas en la nube con banda ancha asimétrica.',
        ],
      },
      {
        id: 'quality-tradeoffs',
        heading: 'Equilibrar tamaño de archivo y calidad visual',
        level: 2,
        paragraphs: [
          'La compresión agresiva ahorra más megabytes pero puede introducir desenfoque o artefactos en diagramas y fotos. La compresión suave suele ser invisible en texto corrido y arte lineal mientras recorta 30–70% de documentos con muchos escaneos.',
        ],
        bullets: [
          'Texto y vector se comprimen bien con poco cambio visible.',
          'Escaneos en escala de grises suelen reducirse más que páginas a color.',
          'Logos repetidos en diapositivas pueden beneficiarse de deduplicación al reconstruir.',
        ],
      },
      {
        id: 'when-not-to-compress',
        heading: 'Cuando la compresión no es el primer paso',
        level: 2,
        paragraphs: [
          'Arte listo para imprenta, planos con sombreado fino e imágenes médicas en PDF pueden perder detalle relevante al recodificarse. En esos casos, divida el archivo para compartir secciones o use transferencia segura en lugar de forzar compresión extrema.',
        ],
      },
      {
        id: 'compress-workflow',
        heading: 'Integrar compresión en un flujo PDF más amplio',
        level: 2,
        paragraphs: [
          'La compresión encaja con unir y dividir. Una exportaciones departamentales, comprima el informe unificado para correo, o divida un archivo enorme y comprima cada capítulo para descarga progresiva. Rote escaneos mal orientados antes de comprimir para facilitar la revisión.',
        ],
        bullets: [
          'Unir — combine secciones antes de una sola pasada de compresión.',
          'Dividir — aísle capítulos pesados en imagen para reducción dirigida.',
          'Proteger con contraseña — cifre después de finalizar el archivo más pequeño.',
        ],
      },
    ],
    faq: [
      ...privacyFaq('es'),
      {
        q: '¿Cuánto más pequeño quedará mi PDF?',
        a: 'Varía mucho. Escaneos con mucha imagen suelen bajar 40–80%; PDF solo-texto pueden reducirse poco. La codificación y resolución originales importan más que el número de páginas.',
      },
      {
        q: '¿Los PDF comprimidos siguen imprimiendo con claridad?',
        a: 'Para documentos de oficina y escaneos típicos, sí. Para impresión profesional o reproducción artística, haga una prueba antes de descartar el archivo en alta resolución.',
      },
      {
        q: '¿La compresión elimina texto buscable?',
        a: 'No. Las capas de texto y resultados OCR permanecen buscables, salvo que la página de origen fuera solo imagen sin capa de texto.',
      },
      {
        q: '¿Puedo comprimir varios PDF en lote?',
        a: 'Puede encolar varios archivos y procesarlos en secuencia en el navegador. Cada salida se descarga por separado para verificar calidad.',
      },
      {
        q: '¿La compresión es reversible?',
        a: 'No. Recodificar imágenes descarta datos de píxel permanentemente. Guarde una copia sin comprimir cuando pueda necesitar calidad máxima después.',
      },
    ],
    relatedTools: ['/pdf-merge', '/pdf-password', '/pdf-to-image'],
    cta: defaultCta('es', 'Comprimir PDF'),
  },
};
