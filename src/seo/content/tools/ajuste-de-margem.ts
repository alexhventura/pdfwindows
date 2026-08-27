import type { ToolRichContent } from '../types';
import { privacyFaq, defaultCta } from '../helpers';

export const AJUSTE_DE_MARGEM_CONTENT: Record<'en' | 'pt' | 'es', ToolRichContent> = {
  en: {
    title: 'Margin Adjust — Crop Photo of a Sheet | PDFWINDOWS',
    description:
      'Crop the table around a photographed page in your browser. Drag four corners, straighten perspective, and download the sheet — free, local, no upload.',
    keywords:
      'crop document photo, four corner crop, perspective correction, scan sheet photo, remove table background, margin adjust, document flatten browser',
    h1: 'Margin Adjust — Four-Corner Sheet Crop',
    intro:
      'A phone photo of a contract, exam, receipt, or homework almost always includes the desk, floor, or fingers around the paper. Those extra pixels make OCR worse, look unprofessional in a PDF pack, and leak room context you never meant to share. PDFWINDOWS Margin Adjust lets you place four handles on the sheet corners and warp the quadrilateral into a flat rectangular page — entirely in the browser, with no upload. Drag each corner until it sits on the paper edge, crop, then download PNG or JPG for Image OCR, Image to PDF, or archive. Handles stay visible while you drag, so crumpled or slightly folded sheets still map cleanly.',
    toolName: 'Margin Adjust',
    benefits: [
      'Interactive four-corner handles on the live photo',
      'Perspective warp that flattens a skewed sheet',
      'Crops desk, floor, and background outside the page',
      'Local processing — photos never leave the device',
      'PNG or JPG download ready for OCR or PDF',
      'Works with common phone and scanner camera shots',
    ],
    useCases: [
      {
        title: 'Homework and exam photos for school portals',
        body: 'Students photograph worksheets on a kitchen table. Placing corners on the page removes the tablecloth and produces a clean rectangle that portals accept as a scan.',
      },
      {
        title: 'Receipt packs for expense reports',
        body: 'Finance teams snap crumpled receipts on a desk. Cropping to the four edges keeps merchant names readable and drops the surrounding counter clutter before PDF compilation.',
      },
      {
        title: 'Contract pages signed on location',
        body: 'Field staff photograph wet-ink signature pages. Aligning corners hides hotel carpets and coffee cups while keeping the legal text in a rectangular frame.',
      },
      {
        title: 'Whiteboard-adjacent printouts',
        body: 'Office photos of printed agendas often include monitors and keyboards. Four-point crop isolates the sheet so OCR and sharing stay on the document, not the room.',
      },
      {
        title: 'Archive digitization without a flatbed',
        body: 'When a scanner is unavailable, a phone photo plus corner warp approximates a flat scan for local OCR and Image to PDF workflows.',
      },
    ],
    howItWorks: [
      'Upload a JPG, PNG, or WEBP photo of the sheet.',
      'Drag the four numbered handles onto the paper corners.',
      'Crop to warp the quadrilateral into a rectangle and drop the surroundings.',
      'Download PNG or JPG, or go back and nudge the corners.',
    ],
    tips: [
      'Shoot from above with even light so edges stay visible.',
      'Place handles on the paper, not on shadows of the table.',
      'Order is top-left, top-right, bottom-right, bottom-left.',
      'If the result looks stretched, pull the short-edge handles inward.',
      'Run Image OCR after cropping for cleaner text recognition.',
      'Keep the original photo until you confirm the crop.',
    ],
    sections: [
      {
        id: 'why-four-corners',
        heading: 'Why four corners beat a rectangular marquee',
        level: 2,
        paragraphs: [
          'A normal crop box assumes the page is already aligned with the camera. Phone photos almost never are: the far edge is narrower, and the sheet sits as a trapezoid inside the frame. Cutting a rectangle either keeps desk pixels or chops text. Four-corner warp maps that trapezoid onto a rectangle using a homography, which is the same idea used by document-scanner apps — without sending the photo to a cloud service.',
          'PDFWINDOWS runs the warp in your browser. Each destination pixel samples the original photo along the perspective mapping, so the text plane straightens while pixels outside the quadrilateral are discarded and filled as a clean page background.',
        ],
      },
      {
        id: 'privacy-and-local',
        heading: 'Local photos, no document-scanner account',
        level: 2,
        paragraphs: [
          'Consumer scanner apps often upload images for “enhancement.” Homework, medical forms, and contracts do not belong on someone else’s GPU queue. Margin Adjust decodes the file, keeps ImageData in memory, and produces a new download. Closing the tab drops the buffers.',
          'Use the same privacy model as the rest of PDFWINDOWS: process locally, then continue to Image Filters, Image OCR, or Image to PDF without a second upload.',
        ],
      },
      {
        id: 'after-crop-workflow',
        heading: 'What to do after the sheet is aligned',
        level: 2,
        paragraphs: [
          'A flattened page is a starting point. Image Filters can lift contrast on faded pencil. Image OCR turns the crop into searchable text. Image to PDF stacks several cropped sheets into one packet. Resize if an email gateway caps attachment dimensions.',
        ],
        bullets: [
          'Image Filters — boost contrast after crop',
          'Image OCR — read text from the aligned page',
          'Image to PDF — assemble cropped sheets',
          'Image Resize — shrink for portal upload limits',
        ],
      },
    ],
    faq: [
      ...privacyFaq('en'),
      {
        q: 'Does this auto-detect the paper edges?',
        a: 'No. You place the four corners yourself so you control what counts as the sheet — useful when edges are low-contrast or another paper sits nearby.',
      },
      {
        q: 'Will handwriting stay readable?',
        a: 'Warp preserves the pixels inside the quadrilateral. Heavy perspective or blur from the original photo can still limit OCR; shoot as square-on as you can.',
      },
      {
        q: 'What image types are supported?',
        a: 'JPG, PNG, and WEBP photos from phones and cameras. Very large files are scaled down on the long edge so the browser stays responsive.',
      },
    ],
    relatedTools: ['/image-ocr', '/image-to-pdf', '/image-filters', '/image-resize'],
    cta: defaultCta('en', 'Margin Adjust'),
  },
  pt: {
    title: 'Ajuste de Margem — Cortar Foto de Folha | PDFWINDOWS',
    description:
        'Recorte a mesa ao redor de uma folha fotografada no navegador. Ajuste as 4 pontas, alinhe a perspectiva e baixe a página — grátis, local e sem upload.',
    keywords:
      'cortar foto de folha, ajustar margem, quatro pontas, correção de perspectiva, recortar mesa, digitalizar folha celular, crop documento',
    h1: 'Ajuste de Margem — Corte pelas Quatro Pontas',
    intro:
      'A foto de um contrato, prova, recibo ou lição quase sempre inclui a mesa, o chão ou os dedos em volta do papel. Esses pixels extras pioram o OCR, deixam o PDF pouco profissional e mostram o ambiente que você não queria compartilhar. O Ajuste de Margem do PDFWINDOWS coloca quatro alças nos cantos da folha e deforma o quadrilátero numa página retangular — só no navegador, sem upload. Arraste cada ponta até a borda do papel, corte e baixe PNG ou JPG para OCR de Imagem, Imagem para PDF ou arquivo.',
    toolName: 'Ajuste de Margem',
    benefits: [
      'Alças interativas nas quatro pontas da foto',
      'Correção de perspectiva que endireita a folha',
      'Remove mesa, chão e fundo fora da página',
      'Processamento local — a foto não sai do aparelho',
      'Download em PNG ou JPG pronto para OCR ou PDF',
      'Funciona com fotos de celular e câmera',
    ],
    useCases: [
      {
        title: 'Lições e provas para portais escolares',
        body: 'Alunos fotografam a folha na mesa da cozinha. Encaixar as pontas no papel tira a toalha e gera um retângulo que o portal aceita como scan.',
      },
      {
        title: 'Pacotes de recibos para reembolso',
        body: 'Equipes financeiras fotografam cupons amassados. Cortar nas quatro bordas mantém o nome do estabelecimento e tira a bagunça do balcão antes do PDF.',
      },
      {
        title: 'Contratos assinados em campo',
        body: 'Equipes fotografam a página com assinatura. Alinhar as pontas esconde tapete e xícara e deixa o texto jurídico num quadro retangular.',
      },
      {
        title: 'Impressos fotografados na mesa do escritório',
        body: 'Fotos de pautas impressas incluem monitor e teclado. O corte de quatro pontos isola a folha para OCR e envio sem mostrar a sala.',
      },
      {
        title: 'Digitalização sem scanner de mesa',
        body: 'Quando não há scanner, a foto do celular mais o ajuste de pontas aproxima um scan plano para OCR local e Imagem para PDF.',
      },
    ],
    howItWorks: [
      'Envie uma foto JPG, PNG ou WEBP da folha.',
      'Arraste as quatro alças numeradas até os cantos do papel.',
      'Corte para alinhar o quadrilátero e remover o entorno.',
      'Baixe PNG ou JPG, ou volte e ajuste as pontas.',
    ],
    tips: [
      'Fotografe de cima com luz uniforme para ver as bordas.',
      'Coloque as alças no papel, não na sombra da mesa.',
      'A ordem é canto superior esquerdo, direito, inferior direito e inferior esquerdo.',
      'Se o resultado esticar, aproxime as alças do lado mais curto.',
      'Rode o OCR de Imagem depois do corte para reconhecer melhor o texto.',
      'Guarde a foto original até confirmar o recorte.',
    ],
    sections: [
      {
        id: 'why-four-corners',
        heading: 'Por que quatro pontas vencem o recorte retangular',
        level: 2,
        paragraphs: [
          'Um recorte retangular comum assume que a folha já está alinhada com a câmera. Na foto de celular isso quase nunca acontece: a borda mais longe fica estreita e o papel vira um trapézio no quadro. Cortar um retângulo ou deixa mesa ou corta texto. O ajuste pelas quatro pontas mapeia esse trapézio num retângulo com uma homografia — a mesma ideia dos apps de scanner, sem enviar a foto para a nuvem.',
          'O PDFWINDOWS faz o mapeamento no navegador. Cada pixel da página de destino busca a foto original na perspectiva correspondente. O plano do texto endireita e o que ficou fora do quadrilátero some, com fundo de página limpo.',
        ],
      },
      {
        id: 'privacy-and-local',
        heading: 'Foto local, sem conta de scanner',
        level: 2,
        paragraphs: [
          'Muitos apps de scanner enviam a imagem para “melhorar” na nuvem. Lição, ficha médica e contrato não deveriam ir para a fila de GPU de terceiros. O Ajuste de Margem decodifica o arquivo, mantém os pixels na memória e gera um download novo. Fechar a aba descarta os dados.',
          'É o mesmo modelo do restante do PDFWINDOWS: processe localmente e siga para Filtros de Imagem, OCR de Imagem ou Imagem para PDF sem um segundo envio.',
        ],
      },
      {
        id: 'after-crop-workflow',
        heading: 'O que fazer depois que a folha está alinhada',
        level: 2,
        paragraphs: [
          'A página achatada é o ponto de partida. Filtros de Imagem aumentam o contraste de lápis fraco. OCR de Imagem transforma o recorte em texto pesquisável. Imagem para PDF empilha várias folhas cortadas num pacote. Redimensione se o portal limitar o tamanho do anexo.',
        ],
        bullets: [
          'Filtros de Imagem — contraste depois do corte',
          'OCR de Imagem — ler o texto da página alinhada',
          'Imagem para PDF — juntar folhas recortadas',
          'Redimensionar Imagem — reduzir para o limite do portal',
        ],
      },
    ],
    faq: [
      ...privacyFaq('pt'),
      {
        q: 'O recorte detecta a borda do papel sozinho?',
        a: 'Não. Você posiciona as quatro pontas para decidir o que é a folha — útil quando a borda tem pouco contraste ou há outro papel por perto.',
      },
      {
        q: 'A letra manuscrita continua legível?',
        a: 'O mapeamento preserva os pixels dentro do quadrilátero. Perspectiva forte ou foto tremida ainda prejudica o OCR; fotografe o mais de frente possível.',
      },
      {
        q: 'Quais formatos de imagem entram?',
        a: 'Fotos JPG, PNG e WEBP de celular e câmera. Arquivos muito grandes são reduzidos no lado maior para o navegador continuar fluido.',
      },
    ],
    relatedTools: ['/image-ocr', '/image-to-pdf', '/image-filters', '/image-resize'],
    cta: defaultCta('pt', 'Ajuste de Margem'),
  },
  es: {
    title: 'Ajuste de Margen — Recortar Foto de una Hoja | PDFWINDOWS',
    description:
      'Recorte la mesa alrededor de una hoja fotografiada en el navegador. Ajuste las 4 puntas, enderece la perspectiva y descargue la página — gratis y local.',
    keywords:
      'recortar foto de hoja, ajuste de margen, cuatro esquinas, corrección de perspectiva, quitar mesa, escanear hoja móvil, crop documento',
    h1: 'Ajuste de Margen — Recorte por Cuatro Esquinas',
    intro:
      'La foto de un contrato, examen, recibo o tarea casi siempre incluye la mesa, el suelo o los dedos alrededor del papel. Esos píxeles de más empeoran el OCR, afean el PDF y muestran un entorno que no quería compartir. El Ajuste de Margen de PDFWINDOWS coloca cuatro controladores en las esquinas de la hoja y deforma el cuadrilátero en una página rectangular — solo en el navegador, sin subida. Arrastre cada punta hasta el borde del papel, recorte y descargue PNG o JPG para OCR de Imagen, Imagen a PDF o archivo.',
    toolName: 'Ajuste de Margen',
    benefits: [
      'Controladores interactivos en las cuatro puntas de la foto',
      'Corrección de perspectiva que endereza la hoja',
      'Quita mesa, suelo y fondo fuera de la página',
      'Procesamiento local — la foto no sale del dispositivo',
      'Descarga PNG o JPG lista para OCR o PDF',
      'Funciona con fotos de móvil y cámara',
    ],
    useCases: [
      {
        title: 'Tareas y exámenes para portales escolares',
        body: 'Los alumnos fotografían la hoja en la mesa de la cocina. Encajar las puntas en el papel quita el mantel y genera un rectángulo que el portal acepta como escaneo.',
      },
      {
        title: 'Lotes de recibos para reembolso',
        body: 'Finanzas fotografía tickets arrugados. Recortar en los cuatro bordes mantiene el comercio y quita el mostrador antes del PDF.',
      },
      {
        title: 'Contratos firmados en campo',
        body: 'El equipo fotografía la página con firma. Alinear las puntas esconde la alfombra y la taza y deja el texto legal en un marco rectangular.',
      },
      {
        title: 'Impresos fotografiados en el escritorio',
        body: 'Fotos de agendas impresas incluyen monitor y teclado. El recorte de cuatro puntos aísla la hoja para OCR y envío sin mostrar la sala.',
      },
      {
        title: 'Digitalización sin escáner plano',
        body: 'Sin escáner, la foto del móvil más el ajuste de puntas se acerca a un escaneo plano para OCR local e Imagen a PDF.',
      },
    ],
    howItWorks: [
      'Suba una foto JPG, PNG o WEBP de la hoja.',
      'Arrastre los cuatro controladores numerados hasta las esquinas del papel.',
      'Recorte para alinear el cuadrilátero y quitar el entorno.',
      'Descargue PNG o JPG, o vuelva y ajuste las puntas.',
    ],
    tips: [
      'Fotografie desde arriba con luz uniforme para ver los bordes.',
      'Ponga los controladores en el papel, no en la sombra de la mesa.',
      'El orden es esquina superior izquierda, derecha, inferior derecha e inferior izquierda.',
      'Si el resultado se estira, acerque los controladores del lado más corto.',
      'Ejecute OCR de Imagen después del recorte para leer mejor el texto.',
      'Conserve la foto original hasta confirmar el recorte.',
    ],
    sections: [
      {
        id: 'why-four-corners',
        heading: 'Por qué cuatro puntas ganan al recorte rectangular',
        level: 2,
        paragraphs: [
          'Un recorte rectangular asume que la hoja ya está alineada con la cámara. En la foto de móvil casi nunca ocurre: el borde lejano se estrecha y el papel es un trapecio en el encuadre. Cortar un rectángulo deja mesa o corta texto. El ajuste por cuatro puntas mapea ese trapecio a un rectángulo con una homografía — la misma idea de las apps de escáner, sin enviar la foto a la nube.',
          'PDFWINDOWS hace el mapeo en el navegador. Cada píxel de la página de destino toma la foto original en la perspectiva correspondiente. El plano del texto se endereza y lo que queda fuera del cuadrilátero desaparece, con fondo de página limpio.',
        ],
      },
      {
        id: 'privacy-and-local',
        heading: 'Foto local, sin cuenta de escáner',
        level: 2,
        paragraphs: [
          'Muchas apps de escáner suben la imagen para “mejorarla” en la nube. Tarea, ficha médica y contrato no deberían ir a la cola de GPU de terceros. El Ajuste de Margen decodifica el archivo, mantiene los píxeles en memoria y genera una descarga nueva. Cerrar la pestaña descarta los datos.',
          'Es el mismo modelo del resto de PDFWINDOWS: procese en local y siga a Filtros de Imagen, OCR de Imagen o Imagen a PDF sin una segunda subida.',
        ],
      },
      {
        id: 'after-crop-workflow',
        heading: 'Qué hacer cuando la hoja ya está alineada',
        level: 2,
        paragraphs: [
          'La página aplanada es el punto de partida. Filtros de Imagen suben el contraste del lápiz débil. OCR de Imagen convierte el recorte en texto buscable. Imagen a PDF apila varias hojas recortadas en un paquete. Redimensione si el portal limita el tamaño del adjunto.',
        ],
        bullets: [
          'Filtros de Imagen — contraste después del recorte',
          'OCR de Imagen — leer el texto de la página alineada',
          'Imagen a PDF — juntar hojas recortadas',
          'Redimensionar Imagen — reducir para el límite del portal',
        ],
      },
    ],
    faq: [
      ...privacyFaq('es'),
      {
        q: '¿El recorte detecta solo el borde del papel?',
        a: 'No. Usted coloca las cuatro puntas para decidir qué es la hoja — útil cuando el borde tiene poco contraste o hay otro papel cerca.',
      },
      {
        q: '¿La letra manuscrita sigue legible?',
        a: 'El mapeo conserva los píxeles dentro del cuadrilátero. Una perspectiva fuerte o una foto movida aún limita el OCR; fotografíe lo más de frente posible.',
      },
      {
        q: '¿Qué tipos de imagen se aceptan?',
        a: 'Fotos JPG, PNG y WEBP de móvil y cámara. Los archivos muy grandes se reducen en el lado mayor para que el navegador siga fluido.',
      },
    ],
    relatedTools: ['/image-ocr', '/image-to-pdf', '/image-filters', '/image-resize'],
    cta: defaultCta('es', 'Ajuste de Margen'),
  },
};
