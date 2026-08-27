import type { ToolRichContent } from '../types';
import { privacyFaq, defaultCta } from '../helpers';

export const ASSINATURA_PDF_CONTENT: Record<'en' | 'pt' | 'es', ToolRichContent> = {
  en: {
    title: 'Sign PDF — Draw a Signature Field | PDFWINDOWS',
    description:
      'Draw your signature on screen, add name, location, and date, then place the field on a PDF. Free, local in the browser — visual stamp, no upload.',
    keywords:
      'sign pdf online, draw signature, signature field, name location date stamp, handwritten signature pdf, sign document browser, visual signature no certificate',
    h1: 'Sign PDF — Handwritten Field with Name, Place, and Date',
    intro:
      'A contract, delivery note, or school form often still needs a wet-ink look: someone writes their name, optionally adds where they signed, and dates the act. Cloud “e-sign” products upload the whole PDF, then lock you into an account. PDFWINDOWS Sign PDF keeps the file on the device. You draw in a signature field with the mouse or finger, choose whether to print name, location, and date under the ink, drop that card onto one or more pages, and download a new PDF. It is a visual stamp of your handwriting — not a qualified digital certificate — so reviewers can still see who marked the page without sending the document to a signing SaaS.',
    toolName: 'Sign PDF',
    benefits: [
      'Draw the signature in the browser with mouse or touch',
      'Optional name, location, and date printed with the ink',
      'Place one or more fields by clicking or dragging on the page',
      'Download a signed PDF or just the signature PNG',
      'Local processing — the file is never uploaded',
      'Works after the page loads, even offline',
    ],
    useCases: [
      {
        title: 'Internal approval on a PDF memo',
        body:
          'A manager receives a PDF briefing and needs a visible sign-off. Drawing on the last page with name and today’s date produces a copy they can archive without creating a DocuSign envelope.',
      },
      {
        title: 'Proof of delivery printed in the field',
        body:
          'Drivers photograph or carry a PDF packing list. A finger-drawn mark plus city and date on the device is enough for operations to see who accepted the load.',
      },
      {
        title: 'School permission slips',
        body:
          'Guardians sign a scanned form at home. Adding the printed name under the handwriting reduces “whose scribble is this?” when the school files the PDF.',
      },
      {
        title: 'Hand back a vendor quote',
        body:
          'Procurement marks “approved” on a PDF quote. Location and date next to the ink show when and where the stamp was made, still generated locally.',
      },
      {
        title: 'Reuse the same ink on several pages',
        body:
          'Initials or a full signature can be dropped on page 1 and page 12 of the same file. The tool keeps one drawing and lets you place extra fields without redrawing.',
      },
    ],
    howItWorks: [
      'Write your signature in the on-screen field.',
      'Optionally fill name, location, and date so they print under the ink.',
      'Upload the PDF you want to mark.',
      'Click to drop a field, or drag to size it, on each page that needs a stamp.',
      'Download the signed PDF, or export the signature card as PNG.',
    ],
    tips: [
      'Sign slowly on a trackpad; use a finger or stylus on a tablet for cleaner ink.',
      'Empty name or location boxes are omitted even if the checkbox is on.',
      'Date defaults to today and can be changed before you place the field.',
      'This stamp does not replace ICP-Brasil, PAdES, or other certificate signatures.',
      'Unlock a password-protected PDF first if the file will not open.',
      'Review the overlay on every page before downloading — the original file stays untouched.',
      'Export PNG if you need the same card in a slide or Word document.',
      'Blue ink is available when a form asks for a non-black pen.',
    ],
    sections: [
      {
        id: 'visual-not-certificate',
        heading: 'A handwriting stamp, not a digital certificate',
        level: 2,
        paragraphs: [
          'Qualified electronic signatures bind a cryptographic key to a person through a certificate authority. That flow needs identity proofing, a keystore, and often a paid vendor. Many everyday PDFs only need a visible mark: the same role a pen plays on paper. Sign PDF draws your strokes into an image, optionally types name, place, and date under a thin rule, and embeds that PNG on the page you choose.',
          'Anyone who opens the download can still copy, screenshot, or crop the stamp. Treat it like ink on a scan — useful for internal packets and informal approvals, not as a substitute for a legally required digital signature when the statute demands a certificate.',
        ],
      },
      {
        id: 'name-place-date',
        heading: 'Name, location, and date travel with the ink',
        level: 2,
        paragraphs: [
          'A scribble alone is hard to file. Checking “include name” prints the typed identity under the drawing so clerks can search or read it. Location is the city or site where you claim to have signed. Date uses the calendar control and formats for Portuguese, English, or Spanish depending on the site language. Unchecked boxes, or empty text, simply drop that line so the card stays small.',
          'The composed card has a light border so it reads as a signature field rather than floating pixels. You can still download that card as PNG if the next step is a slide, an email, or a Word header instead of this PDF.',
        ],
      },
      {
        id: 'place-on-pages',
        heading: 'Place the field without sending the PDF away',
        level: 2,
        paragraphs: [
          'After the drawing exists, upload the PDF. Thumbnails stay in memory. Click once to drop a default-size card, or drag a rectangle when the form has a printed “sign here” box of a different size. Repeat on other pages; undo removes the last field. Generate writes a new file named with _assinado so the original on disk is not overwritten.',
          'Processing never leaves the tab. Closing the browser discards the strokes, the PDF bytes, and the preview. Pair with Unlock PDF if encryption blocks opening, or with Organize PDF Pages if you need to drop a cover before signing.',
        ],
      },
    ],
    faq: [
      ...privacyFaq('en'),
      {
        q: 'Is this a legally qualified electronic signature?',
        a: 'No. It is a visual handwriting stamp with optional name, location, and date. It does not use a digital certificate such as ICP-Brasil or PAdES.',
      },
      {
        q: 'Can I add name, location, and date under the drawing?',
        a: 'Yes. Each line is optional. Empty fields are skipped. The date control defaults to today and can be edited.',
      },
      {
        q: 'Do I have to upload a PDF?',
        a: 'No. You can draw the field and download a PNG. Upload a PDF only when you want to place that card on pages.',
      },
    ],
    relatedTools: ['/redacao-pdf', '/pdf-watermark', '/desbloquear-pdf', '/organizar-paginas-pdf'],
    cta: defaultCta('en', 'Sign PDF'),
  },
  pt: {
    title: 'Assinatura PDF — Campo escrito na tela | PDFWINDOWS',
    description:
      'Desenhe a assinatura na tela, junte nome, local e data, e coloque o campo no PDF. Grátis no navegador — carimbo visual, sem upload.',
    keywords:
      'assinar pdf, desenhar assinatura, campo de assinatura, nome local data, assinatura manuscrita pdf, assinar documento navegador, carimbo visual sem certificado',
    h1: 'Assinatura PDF — Campo manuscrito com nome, local e data',
    intro:
      'Contrato, canhoto de entrega ou ficha escolar ainda pedem cara de tinta: alguém escreve o nome, às vezes registra o lugar e data o ato. Serviços de “e-sign” na nuvem enviam o PDF inteiro e prendem você a uma conta. A Assinatura PDF do PDFWINDOWS mantém o arquivo no aparelho. Você escreve no campo com o mouse ou o dedo, escolhe se o carimbo leva nome, local e data sob o traço, solta esse cartão em uma ou mais páginas e baixa um PDF novo. É um carimbo visual da sua escrita — não é certificado digital — para o revisor ver quem marcou a folha sem mandar o documento a uma plataforma de assinatura.',
    toolName: 'Assinatura PDF',
    benefits: [
      'Desenhe a assinatura no navegador com mouse ou toque',
      'Nome, local e data opcionais impressos junto com o traço',
      'Posicione um ou vários campos clicando ou arrastando na página',
      'Baixe o PDF assinado ou só o PNG da assinatura',
      'Processamento local — o arquivo não é enviado',
      'Funciona depois que a página carrega, inclusive offline',
    ],
    useCases: [
      {
        title: 'Aprovação interna em um memorando PDF',
        body:
          'A gestão recebe um briefing em PDF e precisa de um visto visível. Desenhar na última página com nome e a data de hoje gera uma cópia para arquivo, sem abrir envelope em serviço de assinatura.',
      },
      {
        title: 'Comprovante de entrega no campo',
        body:
          'Motoristas levam a lista de volumes em PDF. Um traço com o dedo, cidade e data no aparelho basta para a operação ver quem recebeu a carga.',
      },
      {
        title: 'Autorização escolar',
        body:
          'Responsáveis assinam a ficha digitalizada em casa. O nome datilografado sob a letra reduz a dúvida de “de quem é esse rabisco” na secretaria.',
      },
      {
        title: 'Devolver um orçamento de fornecedor',
        body:
          'Compras marcam “aprovado” no PDF. Local e data ao lado da tinta mostram quando e onde o carimbo foi feito, ainda gerado no navegador.',
      },
      {
        title: 'O mesmo traço em várias páginas',
        body:
          'Iniciais ou a assinatura completa podem ir na página 1 e na 12 do mesmo arquivo. A ferramenta guarda um desenho e deixa soltar campos extras sem redesenhar.',
      },
    ],
    howItWorks: [
      'Escreva a assinatura no campo da tela.',
      'Se quiser, preencha nome, local e data para saírem sob o traço.',
      'Envie o PDF que precisa do visto.',
      'Clique para soltar o campo, ou arraste para o tamanho, em cada página.',
      'Baixe o PDF assinado, ou exporte o cartão em PNG.',
    ],
    tips: [
      'Assine devagar no trackpad; no tablet, use o dedo ou a caneta.',
      'Nome ou local vazios são omitidos mesmo com a caixa marcada.',
      'A data começa no dia de hoje e pode ser alterada antes de posicionar o campo.',
      'Este carimbo não substitui ICP-Brasil, PAdES nem outra assinatura com certificado.',
      'Se o PDF não abrir, use Desbloquear PDF antes.',
      'Revise o overlay em cada página antes de baixar — o original no disco não é sobrescrito.',
      'Exporte PNG se o próximo passo for um slide ou um documento Word.',
      'Há tinta azul quando o formulário pede caneta que não seja preta.',
    ],
    sections: [
      {
        id: 'visual-not-certificate',
        heading: 'Carimbo de escrita, não certificado digital',
        level: 2,
        paragraphs: [
          'A assinatura eletrônica qualificada amarra uma chave criptográfica à pessoa por uma autoridade certificadora. Esse fluxo exige prova de identidade, cofre de chave e, muitas vezes, um fornecedor pago. Boa parte dos PDFs do dia a dia só precisa de uma marca visível — o papel da caneta no papel. A Assinatura PDF transforma seus traços em imagem, opcionalmente escreve nome, lugar e data sob um filete, e incorpora esse PNG na página que você escolher.',
          'Quem abrir o download ainda pode copiar, capturar ou recortar o carimbo. Trate como tinta num scan: útil em pacotes internos e vistos informais, não como substituto da assinatura digital quando a norma exige certificado.',
        ],
      },
      {
        id: 'name-place-date',
        heading: 'Nome, local e data viajam com o traço',
        level: 2,
        paragraphs: [
          'Só o rabisco é difícil de arquivar. Marcar “incluir nome” imprime a identidade digitada sob o desenho para a equipe ler ou buscar. Local é a cidade ou o sítio onde você declara ter assinado. A data usa o calendário e formata em português, inglês ou espanhol conforme o idioma do site. Caixas desmarcadas, ou texto vazio, simplesmente tiram a linha para o cartão ficar compacto.',
          'O cartão composto tem borda clara para parecer um campo de assinatura, não pixels soltos. Você ainda pode baixar esse cartão em PNG se o próximo passo for um slide, um e-mail ou um cabeçalho no Word, e não este PDF.',
        ],
      },
      {
        id: 'place-on-pages',
        heading: 'Posicione o campo sem enviar o PDF embora',
        level: 2,
        paragraphs: [
          'Com o desenho pronto, envie o PDF. As páginas ficam na memória. Um clique solta um cartão no tamanho padrão; arrastar um retângulo serve quando o formulário já tem um “assine aqui” de outro tamanho. Repita em outras páginas; desfazer tira o último campo. Gerar grava um arquivo novo com o sufixo _assinado, sem sobrescrever o original no disco.',
          'O processamento não sai da aba. Fechar o navegador descarta traços, bytes do PDF e a prévia. Use Desbloquear PDF se a criptografia impedir a abertura, ou Organizar Páginas PDF se precisar tirar uma capa antes do visto.',
        ],
      },
    ],
    faq: [
      ...privacyFaq('pt'),
      {
        q: 'Isto é assinatura eletrônica qualificada?',
        a: 'Não. É um carimbo visual da sua escrita, com nome, local e data opcionais. Não usa certificado digital como ICP-Brasil ou PAdES.',
      },
      {
        q: 'Posso colocar nome, local e data junto com o traço?',
        a: 'Sim. Cada linha é opcional. Campos vazios são ignorados. A data começa no dia de hoje e pode ser editada.',
      },
      {
        q: 'Preciso enviar um PDF?',
        a: 'Não. Você pode desenhar o campo e baixar um PNG. Envie um PDF só quando quiser posicionar esse cartão nas páginas.',
      },
    ],
    relatedTools: ['/redacao-pdf', '/pdf-watermark', '/desbloquear-pdf', '/organizar-paginas-pdf'],
    cta: defaultCta('pt', 'Assinatura PDF'),
  },
  es: {
    title: 'Firma PDF — Campo escrito en pantalla | PDFWINDOWS',
    description:
      'Dibuje la firma en pantalla, sume nombre, lugar y fecha, y coloque el campo en el PDF. Gratis en el navegador — sello visual, sin subida.',
    keywords:
      'firmar pdf, dibujar firma, campo de firma, nombre lugar fecha, firma manuscrita pdf, firmar documento navegador, sello visual sin certificado',
    h1: 'Firma PDF — Campo manuscrito con nombre, lugar y fecha',
    intro:
      'Un contrato, un albarán o una ficha escolar todavía piden aspecto de tinta: alguien escribe el nombre, a veces anota el lugar y fecha el acto. Los servicios de “e-sign” en la nube suben el PDF entero y lo atan a una cuenta. Firma PDF de PDFWINDOWS deja el archivo en el aparato. Usted escribe en el campo con el ratón o el dedo, elige si el sello lleva nombre, lugar y fecha bajo el trazo, suelta esa tarjeta en una o más páginas y descarga un PDF nuevo. Es un sello visual de su escritura — no un certificado digital — para que quien revise vea quién marcó la hoja sin enviar el documento a una plataforma de firma.',
    toolName: 'Firma PDF',
    benefits: [
      'Dibuje la firma en el navegador con ratón o toque',
      'Nombre, lugar y fecha opcionales impresos con el trazo',
      'Coloque uno o varios campos con clic o arrastre en la página',
      'Descargue el PDF firmado o solo el PNG de la firma',
      'Procesamiento local — el archivo no se envía',
      'Funciona cuando la página ya cargó, también sin conexión',
    ],
    useCases: [
      {
        title: 'Aprobación interna de un memorando PDF',
        body:
          'La dirección recibe un briefing en PDF y necesita un visto visible. Dibujar en la última página con nombre y la fecha de hoy genera una copia para archivo, sin abrir un sobre en un servicio de firma.',
      },
      {
        title: 'Prueba de entrega en campo',
        body:
          'Los conductores llevan la lista de bultos en PDF. Un trazo con el dedo, ciudad y fecha en el aparato basta para que operaciones vea quién recibió la carga.',
      },
      {
        title: 'Autorización escolar',
        body:
          'Los tutores firman la ficha escaneada en casa. El nombre escrito bajo la letra reduce la duda de “de quién es este garabato” en secretaría.',
      },
      {
        title: 'Devolver un presupuesto de proveedor',
        body:
          'Compras marca “aprobado” en el PDF. Lugar y fecha junto a la tinta muestran cuándo y dónde se hizo el sello, aún generado en el navegador.',
      },
      {
        title: 'El mismo trazo en varias páginas',
        body:
          'Iniciales o la firma completa pueden ir en la página 1 y en la 12 del mismo archivo. La herramienta guarda un dibujo y deja soltar campos extra sin redibujar.',
      },
    ],
    howItWorks: [
      'Escriba la firma en el campo de la pantalla.',
      'Si quiere, rellene nombre, lugar y fecha para que salgan bajo el trazo.',
      'Suba el PDF que necesita el visto.',
      'Haga clic para soltar el campo, o arrastre el tamaño, en cada página.',
      'Descargue el PDF firmado, o exporte la tarjeta en PNG.',
    ],
    tips: [
      'Firme despacio en el trackpad; en la tableta use el dedo o el lápiz.',
      'Nombre o lugar vacíos se omiten aunque la casilla esté marcada.',
      'La fecha empieza en el día de hoy y se puede cambiar antes de colocar el campo.',
      'Este sello no sustituye ICP-Brasil, PAdES ni otra firma con certificado.',
      'Si el PDF no abre, use Desbloquear PDF antes.',
      'Revise la superposición en cada página antes de descargar — el original en disco no se sobrescribe.',
      'Exporte PNG si el siguiente paso es una diapositiva o un documento Word.',
      'Hay tinta azul cuando el formulario pide un bolígrafo que no sea negro.',
    ],
    sections: [
      {
        id: 'visual-not-certificate',
        heading: 'Sello de escritura, no certificado digital',
        level: 2,
        paragraphs: [
          'La firma electrónica cualificada ata una clave criptográfica a la persona mediante una autoridad de certificación. Ese flujo exige prueba de identidad, almacén de claves y, a menudo, un proveedor de pago. Buena parte de los PDF cotidianos solo necesita una marca visible — el papel del bolígrafo en el papel. Firma PDF convierte sus trazos en imagen, opcionalmente escribe nombre, lugar y fecha bajo una raya, e incrusta ese PNG en la página que usted elija.',
          'Quien abra la descarga aún puede copiar, capturar o recortar el sello. Trátelo como tinta en un escaneo: útil en paquetes internos y vistos informales, no como sustituto de la firma digital cuando la norma exige certificado.',
        ],
      },
      {
        id: 'name-place-date',
        heading: 'Nombre, lugar y fecha viajan con el trazo',
        level: 2,
        paragraphs: [
          'Solo el garabato es difícil de archivar. Marcar “incluir nombre” imprime la identidad mecanografiada bajo el dibujo para que el equipo la lea o la busque. El lugar es la ciudad o el sitio donde declara haber firmado. La fecha usa el calendario y se formatea en portugués, inglés o español según el idioma del sitio. Casillas desmarcadas, o texto vacío, simplemente quitan la línea para que la tarjeta quede compacta.',
          'La tarjeta compuesta tiene borde claro para parecer un campo de firma, no píxeles sueltos. Aún puede descargar esa tarjeta en PNG si el siguiente paso es una diapositiva, un correo o un encabezado de Word, y no este PDF.',
        ],
      },
      {
        id: 'place-on-pages',
        heading: 'Coloque el campo sin enviar el PDF fuera',
        level: 2,
        paragraphs: [
          'Con el dibujo listo, suba el PDF. Las páginas quedan en memoria. Un clic suelta una tarjeta de tamaño estándar; arrastrar un rectángulo sirve cuando el formulario ya tiene un “firme aquí” de otro tamaño. Repita en otras páginas; deshacer quita el último campo. Generar guarda un archivo nuevo con el sufijo _assinado, sin sobrescribir el original en disco.',
          'El procesamiento no sale de la pestaña. Cerrar el navegador descarta trazos, bytes del PDF y la vista previa. Use Desbloquear PDF si el cifrado impide abrir, u Organizar Páginas PDF si necesita quitar una portada antes del visto.',
        ],
      },
    ],
    faq: [
      ...privacyFaq('es'),
      {
        q: '¿Esto es una firma electrónica cualificada?',
        a: 'No. Es un sello visual de su escritura, con nombre, lugar y fecha opcionales. No usa un certificado digital como ICP-Brasil o PAdES.',
      },
      {
        q: '¿Puedo poner nombre, lugar y fecha junto al trazo?',
        a: 'Sí. Cada línea es opcional. Los campos vacíos se omiten. La fecha empieza en el día de hoy y se puede editar.',
      },
      {
        q: '¿Tengo que subir un PDF?',
        a: 'No. Puede dibujar el campo y descargar un PNG. Suba un PDF solo cuando quiera colocar esa tarjeta en las páginas.',
      },
    ],
    relatedTools: ['/redacao-pdf', '/pdf-watermark', '/desbloquear-pdf', '/organizar-paginas-pdf'],
    cta: defaultCta('es', 'Firma PDF'),
  },
};
