import { buildLocalToolArticle } from '../localToolArticle';
import type { LanguageType } from '../../../types';
import type { LocalToolLangSpec } from '../localToolArticle';

const howPdf: Record<LanguageType, string[]> = {
  pt: ['Envie o PDF.', 'Ajuste as opções na tela.', 'Baixe a cópia nova. O original permanece no disco.'],
  en: ['Upload the PDF.', 'Set the on-screen options.', 'Download the new copy. The original stays on disk.'],
  es: ['Suba el PDF.', 'Ajuste las opciones en pantalla.', 'Descargue la copia nueva. El original permanece en disco.'],
};

const tips: Record<LanguageType, string[]> = {
  pt: [
    'O original no disco não é sobrescrito.',
    'Desbloqueie PDFs cifrados antes se a abertura falhar.',
    'Confira o download no leitor que você já usa.',
    'Feche a aba para descartar a cópia de trabalho.',
    'Encaixe OCR, organizar ou proteger conforme o próximo passo.',
    'Não envie o ficheiro a conversores na nuvem se a política da equipe proíbe.',
  ],
  en: [
    'The original on disk is not overwritten.',
    'Unlock encrypted PDFs first if opening fails.',
    'Check the download in the reader you already use.',
    'Close the tab to discard the working copy.',
    'Fit OCR, organize, or protect as the next step.',
    'Do not send the file to cloud converters if team policy forbids it.',
  ],
  es: [
    'El original en disco no se sobrescribe.',
    'Desbloquee PDFs cifrados antes si la apertura falla.',
    'Revise la descarga en el lector que ya usa.',
    'Cierre la pestaña para descartar la copia de trabajo.',
    'Encaje OCR, organizar o proteger según el siguiente paso.',
    'No envíe el archivo a conversiones en la nube si la política del equipo lo prohíbe.',
  ],
};

function lang(
  i: 0 | 1 | 2,
  row: {
    toolName: [string, string, string];
    title: [string, string, string];
    description: [string, string, string];
    keywords: [string, string, string];
    h1: [string, string, string];
    promise: [string, string, string];
    limit: [string, string, string];
    workflow: [string, string, string];
    faq: Array<[string, string, string]>;
    cases: Array<{ title: [string, string, string]; body: [string, string, string] }>;
    how?: Record<LanguageType, string[]>;
  }
): LocalToolLangSpec {
  const code: LanguageType = i === 0 ? 'pt' : i === 1 ? 'en' : 'es';
  return {
    toolName: row.toolName[i],
    title: row.title[i],
    description: row.description[i],
    keywords: row.keywords[i],
    h1: row.h1[i],
    promise: row.promise[i],
    limit: row.limit[i],
    workflow: row.workflow[i],
    extraFaq: [
      { q: row.faq[0][i], a: row.faq[1][i] },
      { q: row.faq[2][i], a: row.faq[3][i] },
    ],
    cases: row.cases.map((c) => ({ title: c.title[i], body: c.body[i] })),
    tips: tips[code],
    how: row.how ? row.how[code] : howPdf[code],
  };
}

function article(
  related: string[],
  row: Parameters<typeof lang>[1]
) {
  return buildLocalToolArticle(related, {
    pt: lang(0, row),
    en: lang(1, row),
    es: lang(2, row),
  });
}

export const EDIT_PDF_CONTENT = article(
  ['/pdf-watermark', '/assinatura-pdf', '/redacao-pdf', '/numerador-de-paginas'],
  {
    toolName: ['Editar PDF', 'Edit PDF', 'Editar PDF'],
    title: ['Editar PDF Online | PDFWINDOWS', 'Edit PDF Online | PDFWINDOWS', 'Editar PDF en el navegador | PDFWINDOWS'],
    description: [
      'Adicione texto, retângulo ou imagem num PDF no navegador. Carimbo visual por cima da página — grátis, local e sem upload.',
      'Add text, a rectangle, or an image to a PDF in your browser. Visual stamps on the page — free, local, no upload.',
      'Añada texto, rectángulo o imagen a un PDF en el navegador. Sellos visuales sobre la página — gratis y local.',
    ],
    keywords: [
      'editar pdf, adicionar texto pdf, carimbo pdf, anotar pdf local',
      'edit pdf, add text to pdf, stamp pdf, annotate pdf local',
      'editar pdf, añadir texto pdf, sello pdf, anotar pdf local',
    ],
    h1: ['Editar PDF', 'Edit PDF', 'Editar PDF'],
    promise: [
      'Muitas vezes só falta um carimbo: um conforme, uma seta, um logo. Editar PDF deixa clicar na prévia para soltar texto, retângulo ou imagem PNG/JPG sobre a página. O texto original da folha não é reescrito. Você gera uma cópia nova e confere no leitor antes de circular o pacote internamente ou com o cliente.',
      'Often you only need a stamp: approved, an arrow, a logo. Edit PDF lets you click the preview to drop text, a rectangle, or a PNG/JPG on the page. Original page text is not rewritten. You generate a new copy and check it in a reader before circulating the packet internally or with a client.',
      'A menudo solo falta un sello: un conforme, una flecha, un logo. Editar PDF deja pulsar la vista previa para soltar texto, rectángulo o imagen PNG/JPG sobre la página. El texto original no se reescribe. Genera una copia nueva y la revisa en el lector antes de circular el paquete.',
    ],
    limit: [
      'Isto não é um processador de texto dentro do PDF. Não seleciona parágrafos originais, não muda fontes embutidas e não reflow. Para esconder dados, use Redação. Para tinta manuscrita com nome e data, use Assinatura PDF. JPEG e PNG entram; outros formatos podem falhar no carimbo.',
      'This is not a word processor inside the PDF. It does not select original paragraphs, change embedded fonts, or reflow. To hide data, use Redact. For handwriting with name and date, use Sign PDF. JPEG and PNG work; other image formats may fail.',
      'Esto no es un procesador de texto dentro del PDF. No selecciona párrafos originales ni cambia fuentes incrustadas. Para ocultar datos, use Redacción. Para tinta manuscrita, use Firma PDF. Entran JPEG y PNG; otros formatos pueden fallar.',
    ],
    workflow: [
      'Envie o PDF, escolha texto, retângulo ou imagem, clique na página, desfaça se errou e gere a cópia. Navegue pelas folhas para carimbar anexos. Depois você pode numerar, marcar água ou proteger o pacote localmente.',
      'Upload the PDF, choose text, rectangle, or image, click the page, undo if you miss, and generate the copy. Move through sheets to stamp annexes. Then you can number, watermark, or protect the packet locally.',
      'Suba el PDF, elija texto, rectángulo o imagen, pulse la página, deshaga si falla y genere la copia. Navegue las hojas para sellar anexos. Luego puede numerar, marcar agua o proteger el paquete en local.',
    ],
    faq: [
      ['Posso alterar o texto original da página?', 'Can I change the original page text?', '¿Puedo cambiar el texto original de la página?'],
      ['Não. Esta ferramenta adiciona conteúdo por cima. Para cobrir dados, use Redação PDF.', 'No. This tool adds content on top. To cover data, use Redact PDF.', 'No. Esta herramienta añade contenido encima. Para cubrir datos, use Redacción PDF.'],
      ['Aceita JPEG além de PNG?', 'Does it accept JPEG as well as PNG?', '¿Acepta JPEG además de PNG?'],
      ['Sim. O carimbo de imagem lê PNG ou JPEG a partir dos bytes do ficheiro.', 'Yes. The image stamp reads PNG or JPEG from the file bytes.', 'Sí. El sello de imagen lee PNG o JPEG a partir de los bytes del archivo.'],
    ],
    cases: [
      { title: ['Carimbo conforme', 'Approved stamp', 'Sello conforme'], body: ['Operações escreve CONFORME na primeira página sem abrir o Acrobat.', 'Ops writes APPROVED on the first page without opening Acrobat.', 'Operaciones escribe CONFORME en la primera página sin abrir Acrobat.'] },
      { title: ['Logo no canto', 'Corner logo', 'Logo en la esquina'], body: ['O time solta o PNG da marca no rodapé do briefing.', 'The team drops the brand PNG on the briefing footer.', 'El equipo suelta el PNG de la marca en el pie del briefing.'] },
      { title: ['Caixa de destaque', 'Highlight box', 'Caja de destaque'], body: ['Um retângulo marca a cláusula que o cliente deve ler.', 'A rectangle marks the clause the client must read.', 'Un rectángulo marca la cláusula que el cliente debe leer.'] },
      { title: ['Nota em anexo', 'Note on an annex', 'Nota en un anexo'], body: ['Uma nota de texto aponta o valor na tabela escaneada.', 'A text note points at the amount on a scanned table.', 'Una nota de texto apunta el importe en la tabla escaneada.'] },
      { title: ['Várias páginas', 'Several pages', 'Varias páginas'], body: ['O mesmo tipo de carimbo vai na capa e no comprovante do fim.', 'The same stamp type goes on the cover and the receipt at the end.', 'El mismo tipo de sello va en la portada y en el comprobante del final.'] },
    ],
  }
);

export const SCAN_TO_PDF_CONTENT = article(
  ['/image-to-pdf', '/ajuste-de-margem', '/pdf-ocr', '/organizar-paginas-pdf'],
  {
    toolName: ['Escanear para PDF', 'Scan to PDF', 'Escanear a PDF'],
    title: ['Escanear para PDF | PDFWINDOWS', 'Scan to PDF | PDFWINDOWS', 'Escanear a PDF | PDFWINDOWS'],
    description: [
      'Capture páginas com a câmera ou envie fotos e monte um PDF no navegador — grátis, local e sem upload.',
      'Capture pages with the camera or upload photos and build a PDF in your browser — free, local, no upload.',
      'Capture páginas con la cámara o suba fotos y arme un PDF en el navegador — gratis, local y sin subida.',
    ],
    keywords: [
      'escanear para pdf, camera pdf, foto para pdf, digitalizar folha',
      'scan to pdf, camera to pdf, photos to pdf, digitize sheet',
      'escanear a pdf, camara pdf, foto a pdf, digitalizar hoja',
    ],
    h1: ['Escanear para PDF', 'Scan to PDF', 'Escanear a PDF'],
    promise: [
      'A câmera do telemóvel já substitui o scanner de mesa em muita operação de campo. Escanear para PDF abre o vídeo no navegador, captura cada folha como JPEG e empilha as páginas num PDF local. Também aceita fotos já guardadas. Nada vai a um serviço de scan na nuvem.',
      'A phone camera already replaces a desktop scanner in a lot of field work. Scan to PDF opens video in the browser, captures each sheet as JPEG, and stacks the pages into a local PDF. It also accepts photos already saved. Nothing goes to a cloud scan service.',
      'La cámara del teléfono ya sustituye al escáner de mesa en mucha operación de campo. Escanear a PDF abre el vídeo en el navegador, captura cada hoja como JPEG y apila las páginas en un PDF local. También acepta fotos ya guardadas. Nada va a un servicio de scan en la nube.',
    ],
    limit: [
      'Isto não envia o scan do telemóvel para o computador via servidor nosso: a câmera é a do próprio navegador. Qualidade depende da luz e do foco. Mesa ao redor da folha não é cortada sozinha — use Ajuste de Margem. Texto pesquisável exige OCR depois.',
      'This does not send a phone scan to the computer through our server: the camera is the browser’s own. Quality depends on light and focus. Desk around the sheet is not auto-cropped — use Margin Adjust. Searchable text needs OCR afterward.',
      'Esto no envía el scan del teléfono al computador por un servidor nuestro: la cámara es la del propio navegador. La calidad depende de la luz y el foco. La mesa alrededor de la hoja no se recorta sola — use Ajuste de Margen. El texto buscable exige OCR después.',
    ],
    workflow: [
      'Autorize a câmera, capture cada página, ou envie JPG/PNG já existentes. Gere o PDF, confira a ordem e, se precisar, recorte perspectiva e rode OCR para texto selecionável.',
      'Allow the camera, capture each page, or upload existing JPG/PNG files. Build the PDF, check the order, and if needed crop perspective and run OCR for selectable text.',
      'Autorice la cámara, capture cada página, o suba JPG/PNG ya existentes. Genere el PDF, revise el orden y, si hace falta, recorte perspectiva y ejecute OCR para texto seleccionable.',
    ],
    faq: [
      ['As fotos vão para um servidor?', 'Do the photos go to a server?', '¿Las fotos van a un servidor?'],
      ['Não. A câmera e as imagens ficam no navegador.', 'No. The camera and images stay in the browser.', 'No. La cámara y las imágenes quedan en el navegador.'],
      ['O PDF sai com texto pesquisável?', 'Is the PDF searchable?', '¿El PDF sale con texto buscable?'],
      ['Não automaticamente. Use OCR de PDF depois se precisar selecionar o texto.', 'Not automatically. Use PDF OCR afterward if you need to select the text.', 'No automáticamente. Use OCR de PDF después si necesita seleccionar el texto.'],
    ],
    cases: [
      { title: ['Canhoto no campo', 'Field receipt', 'Canhoto en campo'], body: ['O motorista fotografa o recibo e gera o PDF no telemóvel.', 'The driver photographs the receipt and builds the PDF on the phone.', 'El conductor fotografía el recibo y genera el PDF en el teléfono.'] },
      { title: ['Prova escolar', 'School test', 'Prueba escolar'], body: ['A docente captura cada folha e envia o PDF à secretaria.', 'The teacher captures each sheet and sends the PDF to admin.', 'La docente captura cada hoja y envía el PDF a secretaría.'] },
      { title: ['Contrato assinado em papel', 'Paper-signed contract', 'Contrato firmado en papel'], body: ['Depois da tinta, as páginas viram um PDF para arquivo.', 'After wet ink, the pages become a PDF for the archive.', 'Después de la tinta, las páginas se vuelven un PDF para archivo.'] },
      { title: ['Quadro branco', 'Whiteboard', 'Pizarra'], body: ['Fotos da reunião entram num único PDF de ata.', 'Meeting photos go into a single minutes PDF.', 'Las fotos de la reunión entran en un único PDF de acta.'] },
      { title: ['Lote de comprovantes', 'Batch of slips', 'Lote de comprobantes'], body: ['Vários JPG da pasta viram um pacote PDF na ordem da captura.', 'Several folder JPGs become a PDF packet in capture order.', 'Varios JPG de la carpeta se vuelven un paquete PDF en el orden de captura.'] },
    ],
    how: {
      pt: ['Abra a câmera ou envie fotos.', 'Capture cada página.', 'Gere e baixe o PDF no aparelho.'],
      en: ['Open the camera or upload photos.', 'Capture each page.', 'Build and download the PDF on the device.'],
      es: ['Abra la cámara o suba fotos.', 'Capture cada página.', 'Genere y descargue el PDF en el aparato.'],
    },
  }
);

export const REPAIR_PDF_CONTENT = article(
  ['/desbloquear-pdf', '/organizar-paginas-pdf', '/pdf-compress', '/pdf-merge'],
  {
    toolName: ['Reparar PDF', 'Repair PDF', 'Reparar PDF'],
    title: ['Reparar PDF Online | PDFWINDOWS', 'Repair PDF Online | PDFWINDOWS', 'Reparar PDF en el navegador | PDFWINDOWS'],
    description: [
      'Tente reconstruir um PDF danificado no navegador. Cópia nova das páginas lidas — grátis, local e sem upload.',
      'Try rebuilding a damaged PDF in your browser. A new copy of readable pages — free, local, no upload.',
      'Intente reconstruir un PDF dañado en el navegador. Copia nueva de las páginas leídas — gratis y local.',
    ],
    keywords: [
      'reparar pdf, pdf corrompido, recuperar pdf, consertar pdf local',
      'repair pdf, corrupt pdf, recover pdf, fix pdf local',
      'reparar pdf, pdf corrupto, recuperar pdf, arreglar pdf local',
    ],
    h1: ['Reparar PDF', 'Repair PDF', 'Reparar PDF'],
    promise: [
      'Downloads a meio e anexos truncados às vezes ainda abrem parcialmente. Reparar PDF tenta copiar as páginas que o leitor local consegue carregar para um documento novo, com título preservado quando existe. É um primeiro socorro no navegador, não um laboratório forense.',
      'Half-finished downloads and truncated attachments sometimes still open in part. Repair PDF tries to copy the pages the local reader can load into a new document, keeping the title when it exists. It is first aid in the browser, not a forensics lab.',
      'Las descargas a medias y los adjuntos truncados a veces aún abren en parte. Reparar PDF intenta copiar las páginas que el lector local puede cargar a un documento nuevo, con el título si existe. Es primeros auxilios en el navegador, no un laboratorio forense.',
    ],
    limit: [
      'Não recupera xref destruído, streams irrecuperáveis nem ficheiro que o pdf-lib recusa. Se o leitor da aba não abre, esta ferramenta também não milagra. Para senha, use Desbloquear PDF. Cópias regravadas podem perder anotações avançadas.',
      'It does not recover a destroyed xref, unrecoverable streams, or a file pdf-lib refuses. If the tab reader cannot open it, this tool will not magically either. For a password, use Unlock PDF. Rewritten copies may drop advanced annotations.',
      'No recupera un xref destruido, streams irrecuperables ni un archivo que pdf-lib rechaza. Si el lector de la pestaña no abre, esta herramienta tampoco hace milagros. Para una contraseña, use Desbloquear PDF. Las copias reescritas pueden perder anotaciones avanzadas.',
    ],
    workflow: [
      'Envie o PDF, aguarde a reconstrução e abra a cópia. Se falhar, o ficheiro pode estar além do que o navegador lê. Tente desbloquear se houver cifra, ou volte ao original no disco.',
      'Upload the PDF, wait for the rebuild, and open the copy. If it fails, the file may be beyond what the browser can read. Try unlock if it is encrypted, or go back to the original on disk.',
      'Suba el PDF, espere la reconstrucción y abra la copia. Si falla, el archivo puede estar más allá de lo que el navegador lee. Intente desbloquear si hay cifrado, o vuelva al original en disco.',
    ],
    faq: [
      ['Recupera arquivo totalmente corrompido?', 'Does it recover a fully corrupt file?', '¿Recupera un archivo totalmente corrupto?'],
      ['Não. Só reconstrói o que o leitor ainda consegue carregar.', 'No. It only rebuilds what the reader can still load.', 'No. Solo reconstruye lo que el lector aún puede cargar.'],
      ['Isto remove vírus de PDF?', 'Does this remove PDF malware?', '¿Esto quita malware de PDF?'],
      ['Não é um antivírus. Apenas regrava páginas num documento novo.', 'It is not an antivirus. It only rewrites pages into a new document.', 'No es un antivirus. Solo reescribe páginas en un documento nuevo.'],
    ],
    cases: [
      { title: ['Anexo truncado', 'Truncated attachment', 'Adjunto truncado'], body: ['O e-mail cortou o ficheiro; algumas páginas ainda abrem e saem na cópia.', 'Email clipped the file; some pages still open and come out in the copy.', 'El correo cortó el archivo; algunas páginas aún abren y salen en la copia.'] },
      { title: ['Download interrompido', 'Interrupted download', 'Descarga interrumpida'], body: ['A transferência parou; a reconstrução salva o que o leitor ainda entende.', 'The transfer stopped; rebuild saves what the reader still understands.', 'La transferencia paró; la reconstrucción salva lo que el lector aún entiende.'] },
      { title: ['Antes de mesclar', 'Before merge', 'Antes de unir'], body: ['Um dos PDFs da fila está instável; regrave-o antes do merge.', 'One PDF in the queue is unstable; rewrite it before merge.', 'Uno de los PDF de la cola está inestable; reescríbalo antes del merge.'] },
      { title: ['Arquivo antigo', 'Old archive', 'Archivo antiguo'], body: ['Um lote de 2014 abre com aviso; a cópia nova lê melhor em leitores atuais.', 'A 2014 batch opens with a warning; the new copy reads better in current readers.', 'Un lote de 2014 abre con aviso; la copia nueva lee mejor en lectores actuales.'] },
      { title: ['Depois de desbloquear', 'After unlock', 'Después de desbloquear'], body: ['A cifra saiu, mas o ficheiro ainda reclama; regravar páginas pode estabilizar.', 'Encryption is gone but the file still complains; rewriting pages can stabilize it.', 'El cifrado salió, pero el archivo aún se queja; reescribir páginas puede estabilizar.'] },
    ],
  }
);

export const PDFA_CONTENT = article(
  ['/pdf-compress', '/pdf-password', '/pdf-extract-text', '/organizar-paginas-pdf'],
  {
    toolName: ['PDF para arquivo (PDF/A)', 'PDF to archival copy', 'PDF a copia de archivo'],
    title: ['PDF para arquivo (PDF/A) | PDFWINDOWS', 'PDF to archival copy | PDFWINDOWS', 'PDF a copia de archivo | PDFWINDOWS'],
    description: [
      'Gere uma cópia de arquivo do PDF no navegador, sem cifra. Não é PDF/A certificado ISO — grátis e local.',
      'Generate an archival PDF copy in your browser, unencrypted. Not a certified ISO PDF/A — free and local.',
      'Genere una copia de archivo del PDF en el navegador, sin cifrado. No es PDF/A ISO certificado — gratis y local.',
    ],
    keywords: [
      'pdf para pdfa, pdf arquivo, pdf/a navegador, copia de arquivo pdf',
      'pdf to pdfa, archival pdf, pdf/a browser, archival copy pdf',
      'pdf a pdfa, pdf archivo, pdf/a navegador, copia de archivo',
    ],
    h1: ['PDF para arquivo (PDF/A)', 'PDF to archival copy', 'PDF a copia de archivo'],
    promise: [
      'Arquivos de longo prazo pedem um PDF sem cifra e com metadados mínimos. Esta ferramenta regrava as páginas num documento novo, define produtor e criador, e baixa uma cópia de arquivo. Serve para pastas internas quando o portal pede “PDF/A” mas você precisa ser honesto sobre o que o navegador consegue emitir.',
      'Long-term folders want a PDF without encryption and with minimal metadata. This tool rewrites the pages into a new document, sets producer and creator, and downloads an archival copy. It is for internal stores when a portal asks for “PDF/A” but you must be honest about what the browser can emit.',
      'Los archivos de largo plazo piden un PDF sin cifrado y con metadatos mínimos. Esta herramienta reescribe las páginas en un documento nuevo, define productor y creador, y descarga una copia de archivo. Sirve para carpetas internas cuando el portal pide “PDF/A” pero hay que ser honesto sobre lo que el navegador puede emitir.',
    ],
    limit: [
      'Não é um PDF/A-1b, PDF/A-2 ou PDF/A-3 certificado. Não embute perfil ICC de impressão, não valida contra o ISO e não remove todo o conteúdo não arquivável. Portais que validam com veraPDF podem rejeitar. Trate como cópia de arquivo inspirada, não como selo de conformidade.',
      'This is not a certified PDF/A-1b, PDF/A-2, or PDF/A-3. It does not embed a printer ICC profile, validate against ISO, or strip all non-archival content. Portals that validate with veraPDF may reject it. Treat it as an archival-inspired copy, not a conformance seal.',
      'No es un PDF/A-1b, PDF/A-2 o PDF/A-3 certificado. No incrusta perfil ICC de impresión, no valida contra ISO y no quita todo el contenido no archivable. Los portales que validan con veraPDF pueden rechazarlo. Trátelo como copia inspirada en archivo, no como sello de conformidad.',
    ],
    workflow: [
      'Desbloqueie se houver senha, envie o PDF, gere a cópia e teste no validador do destinatário se a conformidade for obrigatória. Se falhar, use um gerador PDF/A de desktop. Comprima só depois de o arquivo aceitar o pacote.',
      'Unlock if there is a password, upload the PDF, generate the copy, and test it in the recipient’s validator if conformance is required. If it fails, use a desktop PDF/A generator. Compress only after the archive accepts the packet.',
      'Desbloquee si hay contraseña, suba el PDF, genere la copia y pruébela en el validador del destinatario si la conformidad es obligatoria. Si falla, use un generador PDF/A de escritorio. Comprima solo después de que el archivo acepte el paquete.',
    ],
    faq: [
      ['Isto é PDF/A-1b certificado?', 'Is this certified PDF/A-1b?', '¿Esto es PDF/A-1b certificado?'],
      ['Não. É uma cópia de arquivo inspirada no PDF/A, sem perfil ICC de impressão.', 'No. It is an archival-inspired copy without a printer ICC profile.', 'No. Es una copia de archivo inspirada en PDF/A, sin perfil ICC de impresión.'],
      ['A cópia sai cifrada?', 'Is the copy encrypted?', '¿La copia sale cifrada?'],
      ['Não. A regravação gera um PDF sem senha de abertura.', 'No. The rewrite produces a PDF without an open password.', 'No. La reescritura genera un PDF sin contraseña de apertura.'],
    ],
    cases: [
      { title: ['Pasta de processo', 'Case folder', 'Carpeta de expediente'], body: ['O arquivo interno pede PDF sem cifra para leitura daqui a dez anos.', 'Internal records want an unencrypted PDF for reading in ten years.', 'El archivo interno pide PDF sin cifrado para lectura dentro de diez años.'] },
      { title: ['Portal que pede PDF/A', 'Portal that asks for PDF/A', 'Portal que pide PDF/A'], body: ['Tente a cópia local e, se o validador recusar, use o motor de desktop.', 'Try the local copy and, if the validator refuses, use a desktop engine.', 'Pruebe la copia local y, si el validador rechaza, use el motor de escritorio.'] },
      { title: ['Backup de contratos', 'Contract backup', 'Copia de contratos'], body: ['Finanças gera uma cópia sem senha para o NAS, distinto do original protegido.', 'Finance builds an unpassworded copy for the NAS, distinct from the protected original.', 'Finanzas genera una copia sin contraseña para el NAS, distinta del original protegido.'] },
      { title: ['Doação de acervo', 'Collection donation', 'Donación de acervo'], body: ['O museu quer PDFs simples; a regravação reduz surpresas de cifra.', 'The museum wants simple PDFs; rewriting reduces encryption surprises.', 'El museo quiere PDFs simples; la reescritura reduce sorpresas de cifrado.'] },
      { title: ['Antes de comprimir', 'Before compress', 'Antes de comprimir'], body: ['Arquive primeiro, comprima depois, para não misturar objetivos no mesmo passo.', 'Archive first, compress later, so you do not mix goals in one step.', 'Archive primero, comprima después, para no mezclar objetivos en el mismo paso.'] },
    ],
  }
);

export const PDF_FORMS_CONTENT = article(
  ['/assinatura-pdf', '/editar-pdf', '/redacao-pdf', '/desbloquear-pdf'],
  {
    toolName: ['Formulários PDF', 'PDF Forms', 'Formularios PDF'],
    title: ['Formulários PDF Online | PDFWINDOWS', 'PDF Forms Online | PDFWINDOWS', 'Formularios PDF Online | PDFWINDOWS'],
    description: [
      'Preencha campos AcroForm e adicione caixas de texto no PDF, no navegador — grátis, local e sem upload.',
      'Fill AcroForm fields and add text boxes to a PDF in your browser — free, local, and no upload.',
      'Rellene campos AcroForm y añada cajas de texto a un PDF en el navegador — gratis, local y sin subida.',
    ],
    keywords: [
      'formularios pdf, preencher pdf, acroform, campos pdf local',
      'pdf forms, fill pdf, acroform, pdf fields local',
      'formularios pdf, rellenar pdf, acroform, campos pdf local',
    ],
    h1: ['Formulários PDF', 'PDF Forms', 'Formularios PDF'],
    promise: [
      'Muitos PDFs oficiais já trazem AcroForm: nome, caixas e listas. Formulários PDF lista esses campos, deixa preencher na tela e, se o ficheiro não tiver campos, permite clicar para adicionar texto ou caixa. A cópia nova fica no aparelho, sem plataforma de formulários na nuvem.',
      'Many official PDFs already carry an AcroForm: name, boxes, and lists. PDF Forms lists those fields, lets you fill them on screen, and if the file has no fields, lets you click to add text or a checkbox. The new copy stays on the device, with no cloud forms platform.',
      'Muchos PDF oficiales ya traen AcroForm: nombre, casillas y listas. Formularios PDF lista esos campos, deja rellenarlos en pantalla y, si el archivo no tiene campos, permite pulsar para añadir texto o casilla. La copia nueva queda en el aparato, sin plataforma de formularios en la nube.',
    ],
    limit: [
      'Não detecta campos desenhados só visualmente nem XFA. Não há reconhecimento automático estilo Adobe. Listas e combos só aceitam valores compatíveis. Quem precisa de detecção mágica de linhas de formulário deve usar um editor desktop.',
      'It does not detect visual-only fields or XFA. There is no Adobe-style automatic recognition. Lists and combos only accept compatible values. Anyone who needs magic detection of form lines should use a desktop editor.',
      'No detecta campos dibujados solo visualmente ni XFA. No hay reconocimiento automático estilo Adobe. Las listas y combos solo aceptan valores compatibles. Quien necesita detección mágica de líneas de formulario debe usar un editor de escritorio.',
    ],
    workflow: [
      'Envie o PDF, preencha a lista de campos, clique para adicionar caixas se faltar AcroForm, e salve. Use Assinatura PDF se ainda precisar de tinta. Desbloqueie se a cifra impedir a leitura do formulário.',
      'Upload the PDF, fill the field list, click to add boxes if there is no AcroForm, and save. Use Sign PDF if you still need ink. Unlock if encryption blocks reading the form.',
      'Suba el PDF, rellene la lista de campos, pulse para añadir cajas si falta AcroForm, y guarde. Use Firma PDF si aún necesita tinta. Desbloquee si el cifrado impide leer el formulario.',
    ],
    faq: [
      ['Detecta campos desenhados só visualmente?', 'Does it detect visual-only fields?', '¿Detecta campos solo visuales?'],
      ['Não. Só lê AcroForm. XFA não é suportado.', 'No. It only reads AcroForm. XFA is not supported.', 'No. Solo lee AcroForm. XFA no es compatible.'],
      ['Posso adicionar um campo novo?', 'Can I add a new field?', '¿Puedo añadir un campo nuevo?'],
      ['Sim. Clique na página para soltar texto ou caixa de seleção.', 'Yes. Click the page to drop a text field or checkbox.', 'Sí. Pulse la página para soltar texto o casilla.'],
    ],
    cases: [
      { title: ['Ficha de cadastro', 'Intake form', 'Ficha de alta'], body: ['RH preenche nome e documentos num PDF da empresa sem upload.', 'HR fills name and IDs on a company PDF with no upload.', 'RR. HH. rellena nombre y documentos en un PDF de la empresa sin subida.'] },
      { title: ['Formulário sem campos', 'Form without fields', 'Formulario sin campos'], body: ['O scan só tem linhas; o time adiciona caixas de texto no lugar certo.', 'The scan only has lines; the team adds text boxes in the right place.', 'El escaneo solo tiene líneas; el equipo añade cajas de texto en el lugar correcto.'] },
      { title: ['Lista de opções', 'Option list', 'Lista de opciones'], body: ['Um combo AcroForm recebe o valor permitido na lista.', 'An AcroForm combo receives a value allowed in the list.', 'Un combo AcroForm recibe el valor permitido en la lista.'] },
      { title: ['Antes de assinar', 'Before signing', 'Antes de firmar'], body: ['Preencha os campos e depois use Assinatura PDF para o traço.', 'Fill the fields, then use Sign PDF for the ink.', 'Rellene los campos y luego use Firma PDF para el trazo.'] },
      { title: ['Cópia para arquivo', 'Archive copy', 'Copia para archivo'], body: ['A ficha preenchida baixa com sufixo e o modelo original permanece.', 'The filled sheet downloads with a suffix and the original template stays.', 'La ficha rellenada se descarga con sufijo y la plantilla original permanece.'] },
    ],
  }
);

export const PDF_TO_PPTX_CONTENT = article(
  ['/pdf-to-image', '/image-to-pdf', '/txt-to-pdf', '/powerpoint-para-pdf'],
  {
    toolName: ['PDF para PowerPoint', 'PDF to PowerPoint', 'PDF a PowerPoint'],
    title: ['PDF para PowerPoint | PDFWINDOWS', 'PDF to PowerPoint | PDFWINDOWS', 'PDF a PowerPoint | PDFWINDOWS'],
    description: [
      'Cada página do PDF vira um slide com a imagem da página (até 40). Local no navegador — sem objetos editáveis.',
      'Each PDF page becomes a slide with a page image (up to 40). Local in the browser — not editable shapes.',
      'Cada página del PDF se vuelve una diapositiva con la imagen (hasta 40). Local — no objetos editables.',
    ],
    keywords: [
      'pdf para powerpoint, pdf para pptx, slides pdf local',
      'pdf to powerpoint, pdf to pptx, pdf slides local',
      'pdf a powerpoint, pdf a pptx, diapositivas pdf local',
    ],
    h1: ['PDF para PowerPoint', 'PDF to PowerPoint', 'PDF a PowerPoint'],
    promise: [
      'Decks em PDF precisam voltar ao PowerPoint para uma reunião. Esta ferramenta rasteriza cada página (até 40) e monta um PPTX com a imagem no slide. O ficheiro não sobe. Serve para projetar o visual da página, não para reeditar bullets como objetos nativos.',
      'PDF decks need to return to PowerPoint for a meeting. This tool rasters each page (up to 40) and builds a PPTX with the image on the slide. The file is not uploaded. It is for projecting the page look, not for re-editing bullets as native objects.',
      'Los decks en PDF necesitan volver a PowerPoint para una reunión. Esta herramienta rasteriza cada página (hasta 40) y arma un PPTX con la imagen en la diapositiva. El archivo no se sube. Sirve para proyectar el visual de la página, no para reeditar viñetas como objetos nativos.',
    ],
    limit: [
      'Não gera caixas de texto, gráficos ou animações do PowerPoint. O slide contém um PNG da página. Há um teto de 40 páginas para não esgotar a memória da aba. Para texto editável, use PDF para Word no texto extraível.',
      'It does not create PowerPoint text boxes, charts, or animations. The slide holds a PNG of the page. There is a 40-page cap so the tab does not run out of memory. For editable text, use PDF to Word on extractable text.',
      'No genera cajas de texto, gráficos ni animaciones de PowerPoint. La diapositiva contiene un PNG de la página. Hay un tope de 40 páginas para no agotar la memoria de la pestaña. Para texto editable, use PDF a Word en texto extraíble.',
    ],
    workflow: [
      'Envie o PDF, aguarde a rasterização local e baixe o PPTX. Abra no PowerPoint para conferir o tamanho do slide. Se precisar de menos páginas, recorte o PDF com Organizar antes.',
      'Upload the PDF, wait for local rasterization, and download the PPTX. Open it in PowerPoint to check slide size. If you need fewer pages, trim the PDF with Organize first.',
      'Suba el PDF, espere la rasterización local y descargue el PPTX. Ábralo en PowerPoint para revisar el tamaño de la diapositiva. Si necesita menos páginas, recorte el PDF con Organizar antes.',
    ],
    faq: [
      ['Consigo editar o texto no PowerPoint?', 'Can I edit the text in PowerPoint?', '¿Puedo editar el texto en PowerPoint?'],
      ['Não. O slide contém a imagem da página, não caixas de texto.', 'No. The slide contains the page image, not text boxes.', 'No. La diapositiva contiene la imagen de la página, no cajas de texto.'],
      ['Há limite de páginas?', 'Is there a page limit?', '¿Hay límite de páginas?'],
      ['Sim. Até 40 páginas por conversão para proteger a memória do navegador.', 'Yes. Up to 40 pages per conversion to protect browser memory.', 'Sí. Hasta 40 páginas por conversión para proteger la memoria del navegador.'],
    ],
    cases: [
      { title: ['Pitch em PDF', 'Pitch as PDF', 'Pitch en PDF'], body: ['Vendas recebe o one-pager em PDF e precisa projetar em PPTX na hora.', 'Sales gets a one-pager PDF and needs to project it as PPTX immediately.', 'Ventas recibe el one-pager en PDF y necesita proyectarlo en PPTX al momento.'] },
      { title: ['Apostila', 'Course pack', 'Apunte'], body: ['A docente leva as páginas do PDF para um deck sem recriar o layout.', 'The teacher takes PDF pages into a deck without rebuilding the layout.', 'La docente lleva las páginas del PDF a un deck sin recrear el diseño.'] },
      { title: ['Ata visual', 'Visual minutes', 'Acta visual'], body: ['As folhas assinadas viram slides para a diretoria ver o carimbo.', 'Signed sheets become slides so the board can see the stamp.', 'Las hojas firmadas se vuelven diapositivas para que la dirección vea el sello.'] },
      { title: ['Limite de 40', '40-page cap', 'Tope de 40'], body: ['Um relatório longo é organizado antes para caber no teto da aba.', 'A long report is organized first so it fits the tab cap.', 'Un informe largo se organiza antes para caber en el tope de la pestaña.'] },
      { title: ['Volta para PDF', 'Back to PDF', 'Vuelta a PDF'], body: ['Se precisar de PDF de novo, use PowerPoint para PDF no texto, ou Imagem para PDF.', 'If you need PDF again, use PowerPoint to PDF on text, or Image to PDF.', 'Si necesita PDF otra vez, use PowerPoint a PDF en texto, o Imagen a PDF.'] },
    ],
  }
);

export const PPTX_TO_PDF_CONTENT = article(
  ['/txt-to-pdf', '/pdf-merge', '/pdf-compress', '/pdf-para-powerpoint'],
  {
    toolName: ['PowerPoint para PDF', 'PowerPoint to PDF', 'PowerPoint a PDF'],
    title: ['PowerPoint para PDF | PDFWINDOWS', 'PowerPoint to PDF | PDFWINDOWS', 'PowerPoint a PDF | PDFWINDOWS'],
    description: [
      'Converta PPTX em PDF no navegador a partir do texto dos slides. Animações e layout original não entram.',
      'Convert PPTX to PDF in your browser from slide text. Animations and original layout are not included.',
      'Convierta PPTX a PDF en el navegador a partir del texto de las diapositivas. Sin animaciones ni diseño original.',
    ],
    keywords: [
      'powerpoint para pdf, pptx para pdf, converter pptx local',
      'powerpoint to pdf, pptx to pdf, convert pptx local',
      'powerpoint a pdf, pptx a pdf, convertir pptx local',
    ],
    h1: ['PowerPoint para PDF', 'PowerPoint to PDF', 'PowerPoint a PDF'],
    promise: [
      'Um PPTX precisa virar PDF para protocolo ou e-mail. Esta ferramenta extrai o texto dos slides e pagina um PDF local. Não reproduz animações, notas do orador nem o layout original. É o caminho honesto quando o destinatário só precisa ler o conteúdo.',
      'A PPTX needs to become a PDF for filing or email. This tool extracts slide text and paginates a local PDF. It does not reproduce animations, speaker notes, or original layout. It is the honest path when the recipient only needs to read the content.',
      'Un PPTX necesita volverse PDF para protocolo o correo. Esta herramienta extrae el texto de las diapositivas y pagina un PDF local. No reproduce animaciones, notas del orador ni el diseño original. Es el camino honesto cuando el destinatario solo necesita leer el contenido.',
    ],
    limit: [
      'Arquivos .ppt binários não entram: salve como .pptx. Macros não executam. Imagens de fundo e SmartArt não são desenhados como no PowerPoint. Para um clone visual, exporte PDF no desktop.',
      'Binary .ppt files are not accepted: save as .pptx. Macros do not run. Background images and SmartArt are not drawn as in PowerPoint. For a visual clone, export PDF on the desktop.',
      'Los archivos .ppt binarios no entran: guarde como .pptx. Las macros no se ejecutan. Imágenes de fondo y SmartArt no se dibujan como en PowerPoint. Para un clon visual, exporte PDF en el escritorio.',
    ],
    workflow: [
      'Envie o PPTX, aguarde a extração e baixe o PDF. Se o deck for visual, use o PowerPoint desktop. Depois você pode mesclar, comprimir ou proteger o PDF localmente.',
      'Upload the PPTX, wait for extraction, and download the PDF. If the deck is visual, use desktop PowerPoint. Then you can merge, compress, or protect the PDF locally.',
      'Suba el PPTX, espere la extracción y descargue el PDF. Si el deck es visual, use PowerPoint de escritorio. Luego puede unir, comprimir o proteger el PDF en local.',
    ],
    faq: [
      ['Aceita .ppt antigo?', 'Does it accept legacy .ppt?', '¿Acepta .ppt antiguo?'],
      ['Não. Salve como .pptx no PowerPoint e envie de novo.', 'No. Save as .pptx in PowerPoint and upload again.', 'No. Guarde como .pptx en PowerPoint y súbalo de nuevo.'],
      ['As animações entram no PDF?', 'Do animations go into the PDF?', '¿Las animaciones entran en el PDF?'],
      ['Não. Só o texto extraído dos slides é paginado.', 'No. Only extracted slide text is paginated.', 'No. Solo el texto extraído de las diapositivas se pagina.'],
    ],
    cases: [
      { title: ['Protocolo de reunião', 'Meeting filing', 'Protocolo de reunión'], body: ['O deck interno vira PDF textual para o sistema de atas.', 'The internal deck becomes a text PDF for the minutes system.', 'El deck interno se vuelve PDF textual para el sistema de actas.'] },
      { title: ['E-mail sem PPTX', 'Email without PPTX', 'Correo sin PPTX'], body: ['O destinatário só abre PDF; o texto dos slides chega legível.', 'The recipient only opens PDF; slide text arrives readable.', 'El destinatario solo abre PDF; el texto de las diapositivas llega legible.'] },
      { title: ['Arquivo de versão', 'Version archive', 'Archivo de versión'], body: ['Uma cópia PDF do conteúdo, sem macros, fica no NAS.', 'A PDF copy of the content, without macros, sits on the NAS.', 'Una copia PDF del contenido, sin macros, queda en el NAS.'] },
      { title: ['Antes de mesclar', 'Before merge', 'Antes de unir'], body: ['Vários PPTX viram PDFs e depois um único pacote.', 'Several PPTX files become PDFs and then one packet.', 'Varios PPTX se vuelven PDF y luego un único paquete.'] },
      { title: ['Deck confidencial', 'Confidential deck', 'Deck confidencial'], body: ['O texto não passa por conversor online; a aba faz o PDF.', 'The text does not go through an online converter; the tab makes the PDF.', 'El texto no pasa por un conversor en línea; la pestaña hace el PDF.'] },
    ],
    how: {
      pt: ['Envie o PPTX.', 'Aguarde a extração do texto.', 'Baixe o PDF gerado localmente.'],
      en: ['Upload the PPTX.', 'Wait for text extraction.', 'Download the locally generated PDF.'],
      es: ['Suba el PPTX.', 'Espere la extracción del texto.', 'Descargue el PDF generado en local.'],
    },
  }
);

export const PDF_TO_EXCEL_CONTENT = article(
  ['/pdf-extract-text', '/csv-to-json', '/txt-to-pdf', '/pdf-ocr'],
  {
    toolName: ['PDF para Excel', 'PDF to Excel', 'PDF a Excel'],
    title: ['PDF para Excel | PDFWINDOWS', 'PDF to Excel | PDFWINDOWS', 'PDF a Excel | PDFWINDOWS'],
    description: [
      'Extraia texto de um PDF para XLSX no navegador. Colunas heurísticas pelo espaço — tabelas em imagem pedem OCR.',
      'Extract PDF text to XLSX in your browser. Heuristic columns from spacing — image tables need OCR first.',
      'Extraiga texto de un PDF a XLSX en el navegador. Columnas heurísticas por espacio — tablas en imagen piden OCR.',
    ],
    keywords: [
      'pdf para excel, pdf para xlsx, tabela pdf, extrair planilha pdf',
      'pdf to excel, pdf to xlsx, pdf table, extract spreadsheet pdf',
      'pdf a excel, pdf a xlsx, tabla pdf, extraer hoja pdf',
    ],
    h1: ['PDF para Excel', 'PDF to Excel', 'PDF a Excel'],
    promise: [
      'Relatórios em PDF escondem colunas que o time quer no Excel. PDF para Excel lê o texto extraível, tenta partir linhas por espaços largos ou tabulações e gera um XLSX local. Não recalcula fórmulas e não reconstrói a grelha visual da página.',
      'PDF reports hide columns the team wants in Excel. PDF to Excel reads extractable text, tries to split lines on wide spaces or tabs, and writes a local XLSX. It does not recalculate formulas or rebuild the visual grid of the page.',
      'Los informes en PDF esconden columnas que el equipo quiere en Excel. PDF a Excel lee el texto extraíble, intenta partir líneas por espacios anchos o tabulaciones y genera un XLSX local. No recalcula fórmulas ni reconstruye la cuadrícula visual de la página.',
    ],
    limit: [
      'Tabelas desenhadas como imagem precisam de OCR primeiro. Colunas desalinhadas geram células a mais ou a menos. Não há motor de tabela do Acrobat. Trate o XLSX como rascunho para limpeza manual.',
      'Tables drawn as images need OCR first. Misaligned columns produce extra or missing cells. There is no Acrobat table engine. Treat the XLSX as a draft for manual cleanup.',
      'Las tablas dibujadas como imagen necesitan OCR primero. Las columnas desalineadas generan celdas de más o de menos. No hay motor de tabla de Acrobat. Trate el XLSX como borrador para limpieza manual.',
    ],
    workflow: [
      'Se for scan, rode OCR. Envie o PDF, baixe o XLSX e abra no Excel para ajustar colunas. Use CSV para JSON se o próximo passo for um script.',
      'If it is a scan, run OCR. Upload the PDF, download the XLSX, and open it in Excel to fix columns. Use CSV to JSON if the next step is a script.',
      'Si es un escaneo, ejecute OCR. Suba el PDF, descargue el XLSX y ábralo en Excel para ajustar columnas. Use CSV a JSON si el siguiente paso es un script.',
    ],
    faq: [
      ['Tabelas desenhadas como imagem entram?', 'Do image-drawn tables come through?', '¿Entran las tablas dibujadas como imagen?'],
      ['Não até rodar OCR de PDF e gerar texto extraível.', 'Not until you run PDF OCR and get extractable text.', 'No hasta ejecutar OCR de PDF y obtener texto extraíble.'],
      ['As colunas saem perfeitas?', 'Do columns come out perfect?', '¿Las columnas salen perfectas?'],
      ['Não. A separação é heurística por espaço. Revise no Excel.', 'No. Splitting is a spacing heuristic. Review it in Excel.', 'No. La separación es heurística por espacio. Revísela en Excel.'],
    ],
    cases: [
      { title: ['Extrato em PDF', 'PDF statement', 'Extracto en PDF'], body: ['Tesouraria joga as linhas para XLSX e concilia no Excel.', 'Treasury dumps the lines to XLSX and reconciles in Excel.', 'Tesorería pasa las líneas a XLSX y concilia en Excel.'] },
      { title: ['Lista de preços', 'Price list', 'Lista de precios'], body: ['O catálogo em PDF vira rascunho de planilha para o comercial limpar.', 'The PDF catalog becomes a sheet draft for sales to clean.', 'El catálogo en PDF se vuelve borrador de hoja para que comercial limpie.'] },
      { title: ['Notas fiscais', 'Invoices', 'Facturas'], body: ['Vários totais em texto viram linhas; a validação fiscal continua humana.', 'Several totals in text become rows; tax validation stays human.', 'Varios totales en texto se vuelven filas; la validación fiscal sigue humana.'] },
      { title: ['Scan de tabela', 'Scanned table', 'Escaneo de tabla'], body: ['Sem OCR, a extração falha; com OCR, o XLSX nasce com texto.', 'Without OCR, extraction fails; with OCR, the XLSX is born with text.', 'Sin OCR, la extracción falla; con OCR, el XLSX nace con texto.'] },
      { title: ['Script depois', 'Script next', 'Script después'], body: ['O XLSX pode ir a CSV e JSON nas ferramentas de dados locais.', 'The XLSX can go to CSV and JSON in the local data tools.', 'El XLSX puede ir a CSV y JSON en las herramientas de datos locales.'] },
    ],
  }
);

export const PDF_TO_WORD_CONTENT = article(
  ['/pdf-extract-text', '/txt-to-pdf', '/pdf-ocr', '/word-para-pdf'],
  {
    toolName: ['PDF para Word', 'PDF to Word', 'PDF a Word'],
    title: ['PDF para Word | PDFWINDOWS', 'PDF to Word | PDFWINDOWS', 'PDF a Word | PDFWINDOWS'],
    description: [
      'Converta PDF em DOCX no navegador a partir do texto. Layout, fontes e imagens da página não são reproduzidos fielmente.',
      'Convert PDF to DOCX in your browser from the text layer. Layout, fonts, and page images are not reproduced faithfully.',
      'Convierta PDF a DOCX en el navegador a partir del texto. Diseño, fuentes e imágenes de la página no se reproducen fielmente.',
    ],
    keywords: [
      'pdf para word, pdf para docx, converter pdf word local',
      'pdf to word, pdf to docx, convert pdf word local',
      'pdf a word, pdf a docx, convertir pdf word local',
    ],
    h1: ['PDF para Word', 'PDF to Word', 'PDF a Word'],
    promise: [
      'Editar um PDF no Word costuma ser o pedido. PDF para Word extrai a camada de texto, marca as páginas e gera um DOCX local. Não promete 100% de fidelidade visual: tabelas, cabeçalhos flutuantes e imagens da folha original não são clonados como no Acrobat.',
      'Editing a PDF in Word is the usual ask. PDF to Word extracts the text layer, marks the pages, and writes a local DOCX. It does not promise 100% visual fidelity: tables, floating headers, and original page images are not cloned as in Acrobat.',
      'Editar un PDF en Word suele ser el pedido. PDF a Word extrae la capa de texto, marca las páginas y genera un DOCX local. No promete 100% de fidelidad visual: tablas, encabezados flotantes e imágenes de la hoja original no se clonan como en Acrobat.',
    ],
    limit: [
      'Scans sem texto exigem OCR primeiro. Layout complexo sai como parágrafos. Não há motor de reconstituição de estilos. Para um clone visual, use o Word desktop ou aceite PDF.',
      'Scans without text need OCR first. Complex layout comes out as paragraphs. There is no style-rebuild engine. For a visual clone, use desktop Word or keep PDF.',
      'Los escaneos sin texto exigen OCR primero. El diseño complejo sale como párrafos. No hay motor de reconstitución de estilos. Para un clon visual, use Word de escritorio o quédese con PDF.',
    ],
    workflow: [
      'Se for imagem, rode OCR. Envie o PDF, baixe o DOCX e limpe títulos no Word. O Conversor de Documento continua disponível para outros destinos a partir do mesmo texto.',
      'If it is an image, run OCR. Upload the PDF, download the DOCX, and clean headings in Word. Document Converter remains available for other destinations from the same text.',
      'Si es imagen, ejecute OCR. Suba el PDF, descargue el DOCX y limpie títulos en Word. El Conversor de Documento sigue disponible para otros destinos a partir del mismo texto.',
    ],
    faq: [
      ['O Word sai igual ao PDF?', 'Does Word look like the PDF?', '¿El Word sale igual que el PDF?'],
      ['Não. Só o texto extraível. Use OCR se for scan.', 'No. Only extractable text. Use OCR if it is a scan.', 'No. Solo el texto extraíble. Use OCR si es un escaneo.'],
      ['Isto é conversão 100% fiel?', 'Is this a 100% faithful conversion?', '¿Esto es una conversión 100% fiel?'],
      ['Não. A política do PDFWINDOWS é honesta: conteúdo textual, não fac-símile.', 'No. PDFWINDOWS policy is honest: textual content, not a facsimile.', 'No. La política de PDFWINDOWS es honesta: contenido textual, no facsímil.'],
    ],
    cases: [
      { title: ['Cláusula para editar', 'Clause to edit', 'Cláusula para editar'], body: ['Jurídico tira o texto do PDF e ajusta parágrafos no Word.', 'Legal pulls text from the PDF and adjusts paragraphs in Word.', 'Jurídico saca el texto del PDF y ajusta párrafos en Word.'] },
      { title: ['Manual legado', 'Legacy manual', 'Manual legado'], body: ['Um PDF antigo vira DOCX para a wiki interna.', 'An old PDF becomes DOCX for the internal wiki.', 'Un PDF antiguo se vuelve DOCX para la wiki interna.'] },
      { title: ['Scan de ofício', 'Scanned letter', 'Escaneo de oficio'], body: ['OCR primeiro, depois DOCX, senão o ficheiro nasce vazio.', 'OCR first, then DOCX, or the file is born empty.', 'OCR primero, luego DOCX, o el archivo nace vacío.'] },
      { title: ['Voltar a PDF', 'Back to PDF', 'Volver a PDF'], body: ['Depois de editar no Word, use Word para PDF para uma cópia textual.', 'After editing in Word, use Word to PDF for a textual copy.', 'Después de editar en Word, use Word a PDF para una copia textual.'] },
      { title: ['Sem upload de contrato', 'No contract upload', 'Sin subida de contrato'], body: ['O DOCX nasce na aba; o contrato não passa por conversor na nuvem.', 'The DOCX is born in the tab; the contract does not pass through a cloud converter.', 'El DOCX nace en la pestaña; el contrato no pasa por un conversor en la nube.'] },
    ],
  }
);

export const WORD_TO_PDF_CONTENT = article(
  ['/txt-to-pdf', '/pdf-merge', '/pdf-password', '/pdf-para-word'],
  {
    toolName: ['Word para PDF', 'Word to PDF', 'Word a PDF'],
    title: ['Word para PDF | PDFWINDOWS', 'Word to PDF | PDFWINDOWS', 'Word a PDF | PDFWINDOWS'],
    description: [
      'Converta DOCX em PDF no navegador a partir do texto. Arquivos .doc antigos: salve como .docx antes.',
      'Convert DOCX to PDF in your browser from the text. Legacy .doc files: save as .docx first.',
      'Convierta DOCX a PDF en el navegador a partir del texto. Archivos .doc antiguos: guarde como .docx antes.',
    ],
    keywords: [
      'word para pdf, docx para pdf, converter word local',
      'word to pdf, docx to pdf, convert word local',
      'word a pdf, docx a pdf, convertir word local',
    ],
    h1: ['Word para PDF', 'Word to PDF', 'Word a PDF'],
    promise: [
      'Portais ainda pedem PDF mesmo quando o rascunho está em DOCX. Word para PDF lê o texto do pacote OOXML e pagina um PDF no navegador. Macros não executam. Layout de carta timbrada não é clonado. O original permanece no disco.',
      'Portals still ask for PDF even when the draft is DOCX. Word to PDF reads text from the OOXML package and paginates a PDF in the browser. Macros do not run. Letterhead layout is not cloned. The original stays on disk.',
      'Los portales aún piden PDF aunque el borrador esté en DOCX. Word a PDF lee el texto del paquete OOXML y pagina un PDF en el navegador. Las macros no se ejecutan. El diseño de membrete no se clona. El original permanece en disco.',
    ],
    limit: [
      'Ficheiros .doc/.dot binários não são convertidos: salve como .docx. Imagens flutuantes, campos e notas de rodapé complexas saem como texto simples paginado. Para fac-símile, exporte PDF no Word desktop.',
      'Binary .doc/.dot files are not converted: save as .docx. Floating images, fields, and complex footnotes come out as paginated plain text. For a facsimile, export PDF in desktop Word.',
      'Los archivos .doc/.dot binarios no se convierten: guarde como .docx. Imágenes flotantes, campos y notas complejas salen como texto paginado. Para un facsímil, exporte PDF en Word de escritorio.',
    ],
    workflow: [
      'Salve .doc como .docx se precisar. Envie o DOCX, baixe o PDF e, se for sair da rede, proteja com senha. O Conversor de Documento oferece os mesmos destinos noutro ecrã.',
      'Save .doc as .docx if needed. Upload the DOCX, download the PDF, and if it will leave the network, protect it with a password. Document Converter offers the same destinations on another screen.',
      'Guarde .doc como .docx si hace falta. Suba el DOCX, descargue el PDF y, si sale de la red, protégelo con contraseña. El Conversor de Documento ofrece los mismos destinos en otra pantalla.',
    ],
    faq: [
      ['Aceita .doc binário?', 'Does it accept binary .doc?', '¿Acepta .doc binario?'],
      ['Não. Salve como .docx no Word ou LibreOffice.', 'No. Save as .docx in Word or LibreOffice.', 'No. Guarde como .docx en Word o LibreOffice.'],
      ['As macros do .docm correm?', 'Do .docm macros run?', '¿Las macros de .docm se ejecutan?'],
      ['Não. O navegador não executa VBA.', 'No. The browser does not execute VBA.', 'No. El navegador no ejecuta VBA.'],
    ],
    cases: [
      { title: ['Minuta para portal', 'Draft for a portal', 'Minuta para portal'], body: ['O jurídico gera PDF textual do DOCX sem mandar o contrato à nuvem.', 'Legal builds a text PDF from the DOCX without sending the contract to the cloud.', 'Jurídico genera PDF textual del DOCX sin mandar el contrato a la nube.'] },
      { title: ['Ofício interno', 'Internal letter', 'Oficio interno'], body: ['O texto da carta vira PDF para o protocolo da repartição.', 'The letter text becomes a PDF for the office filing system.', 'El texto de la carta se vuelve PDF para el protocolo de la oficina.'] },
      { title: ['Lote de relatórios', 'Report batch', 'Lote de informes'], body: ['Vários DOCX viram PDFs e depois um merge local.', 'Several DOCX files become PDFs and then a local merge.', 'Varios DOCX se vuelven PDF y luego un merge local.'] },
      { title: ['Word antigo', 'Legacy Word', 'Word antiguo'], body: ['O .doc de 2003 precisa ser .docx antes; a página explica o motivo.', 'A 2003 .doc must be .docx first; the page explains why.', 'El .doc de 2003 debe ser .docx antes; la página explica el motivo.'] },
      { title: ['Depois proteger', 'Then protect', 'Luego proteger'], body: ['O PDF textual recebe senha na ferramenta Proteger PDF.', 'The text PDF gets a password in Protect PDF.', 'El PDF textual recibe contraseña en Proteger PDF.'] },
    ],
    how: {
      pt: ['Envie o DOCX.', 'Aguarde a paginação do texto.', 'Baixe o PDF gerado localmente.'],
      en: ['Upload the DOCX.', 'Wait for the text to paginate.', 'Download the locally generated PDF.'],
      es: ['Suba el DOCX.', 'Espere la paginación del texto.', 'Descargue el PDF generado en local.'],
    },
  }
);

export const EXCEL_TO_PDF_CONTENT = article(
  ['/txt-to-pdf', '/csv-to-json', '/pdf-merge', '/pdf-para-excel'],
  {
    toolName: ['Excel para PDF', 'Excel to PDF', 'Excel a PDF'],
    title: ['Excel para PDF | PDFWINDOWS', 'Excel to PDF | PDFWINDOWS', 'Excel a PDF | PDFWINDOWS'],
    description: [
      'Converta XLSX ou CSV em PDF no navegador. Células viram texto paginado — gráficos não entram.',
      'Convert XLSX or CSV to PDF in your browser. Cells become paginated text — charts are not included.',
      'Convierta XLSX o CSV a PDF en el navegador. Las celdas se vuelven texto paginado — sin gráficos.',
    ],
    keywords: [
      'excel para pdf, xlsx para pdf, csv para pdf, planilha pdf local',
      'excel to pdf, xlsx to pdf, csv to pdf, spreadsheet pdf local',
      'excel a pdf, xlsx a pdf, csv a pdf, hoja pdf local',
    ],
    h1: ['Excel para PDF', 'Excel to PDF', 'Excel a PDF'],
    promise: [
      'Uma planilha precisa circular como PDF. Excel para PDF lê células de XLSX, XLSM ou CSV e pagina o texto. Gráficos, formatação condicional e macros não entram. Os valores em cache da folha é o que aparece, sem recalcular fórmulas no navegador.',
      'A sheet needs to circulate as PDF. Excel to PDF reads cells from XLSX, XLSM, or CSV and paginates the text. Charts, conditional formatting, and macros are not included. Cached cell values are what appear; formulas are not recalculated in the browser.',
      'Una hoja necesita circular como PDF. Excel a PDF lee celdas de XLSX, XLSM o CSV y pagina el texto. Gráficos, formato condicional y macros no entran. Los valores en caché de la hoja son lo que aparece; las fórmulas no se recalculan en el navegador.',
    ],
    limit: [
      'Não há motor de impressão do Excel. Colunas largas viram texto corrido. Folhas enormes podem deixar a aba lenta: recorte a região antes. Fórmulas não são executadas.',
      'There is no Excel print engine. Wide columns become running text. Huge sheets can slow the tab: trim the range first. Formulas are not executed.',
      'No hay motor de impresión de Excel. Las columnas anchas se vuelven texto corrido. Hojas enormes pueden dejar la pestaña lenta: recorte el rango antes. Las fórmulas no se ejecutan.',
    ],
    workflow: [
      'Envie XLSX ou CSV, aguarde a leitura e baixe o PDF. Se precisar de JSON, use as ferramentas de dados. Mescle vários PDFs se cada folha saiu separada noutro fluxo.',
      'Upload XLSX or CSV, wait for the read, and download the PDF. If you need JSON, use the data tools. Merge several PDFs if each sheet came out separately in another flow.',
      'Suba XLSX o CSV, espere la lectura y descargue el PDF. Si necesita JSON, use las herramientas de datos. Una varios PDF si cada hoja salió aparte en otro flujo.',
    ],
    faq: [
      ['As fórmulas são recalculadas?', 'Are formulas recalculated?', '¿Se recalculan las fórmulas?'],
      ['Não. Entram os valores em cache da planilha.', 'No. Cached cell values are used.', 'No. Se usan los valores en caché de la hoja.'],
      ['Gráficos entram no PDF?', 'Do charts go into the PDF?', '¿Los gráficos entran en el PDF?'],
      ['Não. Só o texto das células é paginado.', 'No. Only cell text is paginated.', 'No. Solo el texto de las celdas se pagina.'],
    ],
    cases: [
      { title: ['Folha de pagamento', 'Payroll sheet', 'Nómina'], body: ['RH gera um PDF textual da planilha sem mandar salários à nuvem.', 'HR builds a text PDF of the sheet without sending salaries to the cloud.', 'RR. HH. genera un PDF textual de la hoja sin mandar salarios a la nube.'] },
      { title: ['CSV de sistema', 'System CSV', 'CSV de sistema'], body: ['O export CSV vira PDF para quem só lê documento.', 'The CSV export becomes a PDF for people who only read documents.', 'El export CSV se vuelve PDF para quien solo lee documento.'] },
      { title: ['Orçamento', 'Budget', 'Presupuesto'], body: ['As células do XLSX saem paginadas para a reunião, sem gráficos.', 'XLSX cells come out paginated for the meeting, without charts.', 'Las celdas del XLSX salen paginadas para la reunión, sin gráficos.'] },
      { title: ['Antes de mesclar', 'Before merge', 'Antes de unir'], body: ['Várias planilhas viram PDFs e um único pacote local.', 'Several sheets become PDFs and one local packet.', 'Varias hojas se vuelven PDF y un único paquete local.'] },
      { title: ['Dados para script', 'Data for a script', 'Datos para script'], body: ['Se o destino for JSON, use CSV para JSON em vez deste PDF.', 'If the destination is JSON, use CSV to JSON instead of this PDF.', 'Si el destino es JSON, use CSV a JSON en lugar de este PDF.'] },
    ],
    how: {
      pt: ['Envie a planilha XLSX ou CSV.', 'Aguarde a leitura das células.', 'Baixe o PDF gerado localmente.'],
      en: ['Upload the XLSX or CSV spreadsheet.', 'Wait for the cells to be read.', 'Download the locally generated PDF.'],
      es: ['Suba la hoja XLSX o CSV.', 'Espere la lectura de las celdas.', 'Descargue el PDF generado en local.'],
    },
  }
);

export const HTML_TO_PDF_CONTENT = article(
  ['/txt-to-pdf', '/pdf-merge', '/image-to-pdf', '/pdf-extract-text'],
  {
    toolName: ['HTML para PDF', 'HTML to PDF', 'HTML a PDF'],
    title: ['HTML para PDF | PDFWINDOWS', 'HTML to PDF | PDFWINDOWS', 'HTML a PDF | PDFWINDOWS'],
    description: [
      'Converta um arquivo HTML local em PDF no navegador. Não busca URLs da internet — CORS e política de privacidade.',
      'Convert a local HTML file to PDF in your browser. It does not fetch internet URLs — CORS and privacy policy.',
      'Convierta un archivo HTML local a PDF en el navegador. No descarga URLs de internet — CORS y política de privacidad.',
    ],
    keywords: [
      'html para pdf, arquivo html pdf, converter html local',
      'html to pdf, html file to pdf, convert html local',
      'html a pdf, archivo html pdf, convertir html local',
    ],
    h1: ['HTML para PDF', 'HTML to PDF', 'HTML a PDF'],
    promise: [
      'Uma página HTML salva no computador precisa virar PDF. HTML para PDF lê o ficheiro .html/.htm, extrai o texto e pagina um PDF local. Não há campo de URL e não há proxy: copiar um site da internet quebraria CORS e a política de não enviar conteúdo a servidores nossos.',
      'An HTML page saved on the computer needs to become a PDF. HTML to PDF reads the .html/.htm file, extracts the text, and paginates a local PDF. There is no URL field and no proxy: fetching a live site would break CORS and the policy of not sending content to our servers.',
      'Una página HTML guardada en la computadora necesita volverse PDF. HTML a PDF lee el archivo .html/.htm, extrae el texto y pagina un PDF local. No hay campo de URL ni proxy: copiar un sitio de internet rompería CORS y la política de no enviar contenido a nuestros servidores.',
    ],
    limit: [
      'CSS complexo, JavaScript e imagens remotas não são renderizados como num motor de impressão headless. O resultado é o texto da página paginado. Para um print fiel, use a função imprimir do próprio navegador na página já aberta, ainda localmente.',
      'Complex CSS, JavaScript, and remote images are not rendered like a headless print engine. The result is paginated page text. For a faithful print, use the browser’s own print function on the page you already opened, still locally.',
      'CSS complejo, JavaScript e imágenes remotas no se renderizan como un motor de impresión headless. El resultado es el texto de la página paginado. Para una impresión fiel, use la función imprimir del propio navegador en la página ya abierta, aún en local.',
    ],
    workflow: [
      'Salve a página no disco (Ctrl+S), envie o HTML, baixe o PDF. Se precisar do visual da página, imprima para PDF no Chrome na origem. Depois mescle ou proteja o ficheiro localmente.',
      'Save the page to disk (Ctrl+S), upload the HTML, download the PDF. If you need the page look, print to PDF in Chrome at the origin. Then merge or protect the file locally.',
      'Guarde la página en disco (Ctrl+S), suba el HTML, descargue el PDF. Si necesita el visual de la página, imprima a PDF en Chrome en el origen. Luego una o proteja el archivo en local.',
    ],
    faq: [
      ['Posso colar a URL de um site?', 'Can I paste a website URL?', '¿Puedo pegar la URL de un sitio?'],
      ['Não. Isso exigiria um proxy. Envie o arquivo HTML salvo no aparelho.', 'No. That would need a proxy. Upload the HTML file saved on the device.', 'No. Eso exigiría un proxy. Suba el archivo HTML guardado en el aparato.'],
      ['O CSS da página entra?', 'Does page CSS come through?', '¿El CSS de la página entra?'],
      ['Não como um print headless. O PDF pagina o texto extraído do HTML.', 'Not as a headless print. The PDF paginates text extracted from the HTML.', 'No como un print headless. El PDF pagina el texto extraído del HTML.'],
    ],
    cases: [
      { title: ['Relatório HTML interno', 'Internal HTML report', 'Informe HTML interno'], body: ['O sistema exporta HTML; o time pagina PDF sem abrir um serviço de URL.', 'The system exports HTML; the team paginates PDF without opening a URL service.', 'El sistema exporta HTML; el equipo pagina PDF sin abrir un servicio de URL.'] },
      { title: ['E-mail salvo', 'Saved email', 'Correo guardado'], body: ['Um .htm da mensagem vira PDF para o processo.', 'An .htm of the message becomes a PDF for the case file.', 'Un .htm del mensaje se vuelve PDF para el expediente.'] },
      { title: ['Documentação local', 'Local docs', 'Documentación local'], body: ['Um README em HTML entra no pacote PDF da entrega.', 'An HTML README goes into the delivery PDF packet.', 'Un README en HTML entra en el paquete PDF de la entrega.'] },
      { title: ['Sem proxy', 'No proxy', 'Sin proxy'], body: ['A política impede buscar a URL; o ficheiro local é o caminho suportado.', 'Policy forbids fetching the URL; the local file is the supported path.', 'La política impide buscar la URL; el archivo local es el camino soportado.'] },
      { title: ['Depois mesclar', 'Then merge', 'Luego unir'], body: ['Vários HTML viram PDFs e um único documento no Mesclar PDF.', 'Several HTML files become PDFs and one document in Merge PDF.', 'Varios HTML se vuelven PDF y un único documento en Unir PDF.'] },
    ],
    how: {
      pt: ['Envie o arquivo HTML local.', 'Aguarde a conversão do texto.', 'Baixe o PDF. URLs da internet não são buscadas.'],
      en: ['Upload the local HTML file.', 'Wait for the text conversion.', 'Download the PDF. Internet URLs are not fetched.'],
      es: ['Suba el archivo HTML local.', 'Espere la conversión del texto.', 'Descargue el PDF. No se descargan URLs de internet.'],
    },
  }
);

