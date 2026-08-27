import { buildLocalToolArticle } from '../localToolArticle';

const how3 = {
  pdf: {
    pt: ['Envie o PDF.', 'Ajuste as opções na tela.', 'Baixe a cópia nova. O original permanece no disco.'],
    en: ['Upload the PDF.', 'Set the on-screen options.', 'Download the new copy. The original stays on disk.'],
    es: ['Suba el PDF.', 'Ajuste las opciones en pantalla.', 'Descargue la copia nueva. El original permanece en disco.'],
  },
};

export const PAGE_NUMBERS_CONTENT = buildLocalToolArticle(
  ['/organizar-paginas-pdf', '/pdf-watermark', '/assinatura-pdf', '/pdf-rotate'],
  {
    pt: {
      toolName: 'Numerador de páginas',
      title: 'Numerador de Páginas PDF | PDFWINDOWS',
      description:
        'Numere páginas de PDF no navegador. Cabeçalho ou rodapé, pule a capa e baixe uma cópia — grátis, local e sem upload.',
      keywords: 'numerador pdf, números de página pdf, rodapé pdf, paginar pdf online, numerar pdf local',
      h1: 'Numerador de páginas',
      promise:
        'Contratos, apostilas e atas pedem número visível no rodapé ou no cabeçalho. O Numerador de páginas desenha o rótulo em cada folha do PDF com Helvetica, alinhamento à esquerda, centro ou direita, formatos 1, 1/N ou Pagina 1 de N, e opção de não marcar a capa. O trabalho corre na aba: você envia o arquivo, escolhe a faixa e baixa uma cópia com sufixo, sem fila na nuvem.',
      limit:
        'Os números são tinta desenhada na página, não campos automáticos do Word nem rótulos vivos do InDesign. Quem abrir o PDF num editor avançado não “atualiza” a numeração se inserir folhas depois. Caracteres acentuados no prefixo são sanitizados para WinAnsi. Se o PDF estiver cifrado, desbloqueie antes.',
      workflow:
        'Envie o PDF, escolha cabeçalho ou rodapé, alinhamento, formato e o número inicial. Marque pular a primeira página quando a capa não deve contar. Gere a cópia e abra no leitor para conferir margens em páginas estreitas ou paisagem. Depois você pode organizar, comprimir ou proteger o pacote.',
      extraFaq: [
        { q: 'Os números são campos automáticos do Word?', a: 'Não. São desenhados na página do PDF e não se atualizam sozinhos se você inserir folhas depois.' },
        { q: 'Posso pular a capa?', a: 'Sim. A opção de não numerar a primeira página deixa a capa limpa e começa a contar na folha seguinte.' },
      ],
      cases: [
        { title: 'Apostila escolar', body: 'A secretaria numera o material do bimestre no rodapé central, pula a capa ilustrada e arquiva a cópia localmente.' },
        { title: 'Contrato com anexos', body: 'Jurídico marca 1/N em todas as folhas depois da capa para o protocolo interno conferir se faltou página.' },
        { title: 'Ata de reunião', body: 'O texto curto ganha “Pagina N” no cabeçalho direito sem abrir um editor desktop só para isso.' },
        { title: 'Processo administrativo', body: 'Pacotes de 40 páginas recebem numeração contínua a partir de 1, ainda que a capa fique sem número.' },
        { title: 'Versão para impressão', body: 'Antes de mandar à gráfica, a equipe confere o rodapé em páginas paisagem e gera de novo se a margem ficar justa.' },
      ],
      tips: [
        'Pule a capa quando ela já tem identidade visual.',
        'Use 1/N se o destinatário precisa saber o total.',
        'Desbloqueie PDFs cifrados antes de numerar.',
        'Confira páginas estreitas: o texto usa margem fixa.',
        'O original não é sobrescrito; archive a cópia com nome claro.',
        'Depois da numeração, comprima se o ficheiro for por e-mail.',
      ],
      how: how3.pdf.pt,
    },
    en: {
      toolName: 'Page numbers',
      title: 'PDF Page Numbers Online | PDFWINDOWS',
      description:
        'Add page numbers to a PDF in your browser. Header or footer, skip the cover, download a copy — free, local, no upload.',
      keywords: 'pdf page numbers, add page numbers pdf, footer pdf pagination, number pdf pages local',
      h1: 'Page numbers',
      promise:
        'Contracts, course packs, and minutes still need a visible number in the footer or header. Page numbers draws the label on each PDF sheet with Helvetica, left/center/right alignment, formats 1, 1/N, or Page 1 of N, and an option to leave the cover unnumbered. The work stays in the tab: upload the file, pick the band, and download a suffixed copy with no cloud queue.',
      limit:
        'The numbers are ink drawn on the page, not Word automatic fields or live InDesign labels. Opening the PDF in an advanced editor will not “refresh” numbering if you insert sheets later. Accented prefixes are sanitized for WinAnsi. Unlock encrypted PDFs first.',
      workflow:
        'Upload the PDF, choose header or footer, alignment, format, and the starting number. Skip the first page when the cover should stay clean. Generate the copy and open it in your reader to check margins on narrow or landscape pages. Then organize, compress, or protect the packet.',
      extraFaq: [
        { q: 'Are these Word automatic fields?', a: 'No. They are drawn onto the PDF page and will not update themselves if you insert sheets later.' },
        { q: 'Can I skip the cover?', a: 'Yes. The skip-first-page option leaves the cover clean and starts counting on the next sheet.' },
      ],
      cases: [
        { title: 'School booklet', body: 'Admin numbers the term pack in a centered footer, skips the illustrated cover, and archives the copy locally.' },
        { title: 'Contract with annexes', body: 'Legal stamps 1/N on every sheet after the cover so intake can see if a page is missing.' },
        { title: 'Meeting minutes', body: 'A short record gets “Page N” in the right header without opening a desktop editor just for that.' },
        { title: 'Admin packet', body: 'A 40-page file gets continuous numbering from 1, even if the cover stays unnumbered.' },
        { title: 'Print check', body: 'Before sending to a print shop, the team checks the footer on landscape pages and regenerates if the margin is tight.' },
      ],
      tips: [
        'Skip the cover when it already has a visual identity.',
        'Use 1/N when the recipient needs to know the total.',
        'Unlock encrypted PDFs before numbering.',
        'Check narrow pages: the text uses a fixed margin.',
        'The original is not overwritten; archive the copy with a clear name.',
        'After numbering, compress if the file will go by email.',
      ],
      how: how3.pdf.en,
    },
    es: {
      toolName: 'Números de página',
      title: 'Números de Página PDF | PDFWINDOWS',
      description:
        'Numere páginas de un PDF en el navegador. Encabezado o pie, salte la portada y descargue — gratis, local y sin subida.',
      keywords: 'numeros de pagina pdf, numerar pdf, pie de pagina pdf, paginar pdf local',
      h1: 'Números de página',
      promise:
        'Contratos, apuntes y actas piden un número visible en el pie o el encabezado. Números de página dibuja la etiqueta en cada hoja del PDF con Helvetica, alineación izquierda, centro o derecha, formatos 1, 1/N o Pagina 1 de N, y la opción de no marcar la portada. El trabajo queda en la pestaña: suba el archivo, elija la franja y descargue una copia con sufijo, sin cola en la nube.',
      limit:
        'Los números son tinta dibujada en la página, no campos automáticos de Word ni rótulos vivos de InDesign. Quien abra el PDF en un editor avanzado no “actualizará” la numeración si inserta hojas después. Los prefijos con acento se sanitizan para WinAnsi. Desbloquee PDFs cifrados antes.',
      workflow:
        'Suba el PDF, elija encabezado o pie, alineación, formato y el número inicial. Salte la primera página cuando la portada no deba contar. Genere la copia y ábrala en el lector para revisar márgenes en páginas estrechas o apaisadas. Luego organice, comprima o proteja el paquete.',
      extraFaq: [
        { q: '¿Son campos automáticos de Word?', a: 'No. Se dibujan en la página del PDF y no se actualizan solos si inserta hojas después.' },
        { q: '¿Puedo saltar la portada?', a: 'Sí. La opción de no numerar la primera página deja la portada limpia y empieza a contar en la hoja siguiente.' },
      ],
      cases: [
        { title: 'Apunte escolar', body: 'La secretaría numera el material del bimestre en el pie central, salta la portada ilustrada y archiva la copia en local.' },
        { title: 'Contrato con anexos', body: 'Jurídico marca 1/N en todas las hojas después de la portada para que el protocolo vea si faltó una página.' },
        { title: 'Acta de reunión', body: 'El texto corto gana “Pagina N” en el encabezado derecho sin abrir un editor de escritorio solo para eso.' },
        { title: 'Expediente administrativo', body: 'Paquetes de 40 páginas reciben numeración continua desde 1, aunque la portada quede sin número.' },
        { title: 'Versión para imprenta', body: 'Antes de enviar a imprenta, el equipo revisa el pie en páginas apaisadas y genera de nuevo si el margen queda justo.' },
      ],
      tips: [
        'Salte la portada cuando ya tiene identidad visual.',
        'Use 1/N si el destinatario necesita saber el total.',
        'Desbloquee PDFs cifrados antes de numerar.',
        'Revise páginas estrechas: el texto usa un margen fijo.',
        'El original no se sobrescribe; archive la copia con un nombre claro.',
        'Después de numerar, comprima si el archivo irá por correo.',
      ],
      how: how3.pdf.es,
    },
  }
);

export const CROP_PDF_CONTENT = buildLocalToolArticle(
  ['/redacao-pdf', '/ajuste-de-margem', '/organizar-paginas-pdf', '/pdf-to-image'],
  {
    pt: {
      toolName: 'Recortar PDF',
      title: 'Recortar PDF Online | PDFWINDOWS',
      description:
        'Recorte margens de um PDF no navegador. Desenhe a área, aplique numa página ou em todas — grátis, local e sem upload.',
      keywords: 'recortar pdf, crop pdf, cortar margem pdf, trim pdf, recorte de pagina pdf',
      h1: 'Recortar PDF',
      promise:
        'Scans e exportações trazem margem suja, cabeçalho de portal ou borda preta do scanner. Recortar PDF deixa você desenhar a área visível na prévia, aplicar só nesta folha ou em todas, e baixar uma cópia com crop box ajustada. O ficheiro original permanece no disco. Útil quando o destinatário precisa ver só o miolo da página.',
      limit:
        'O recorte define a caixa visível (crop box). Alguns leitores e ferramentas ainda podem revelar conteúdo fora dessa caixa. Não é redação: dados fora da área podem continuar no ficheiro. Para esconder informação sensível, use Redação PDF. Áreas pequenas demais são rejeitadas.',
      workflow:
        'Envie o PDF, navegue até a página, arraste o retângulo, decida se vale para todas as folhas e gere a cópia. Confira no leitor em zoom 100%. Se a foto inclui mesa, use Ajuste de Margem na imagem antes de montar o PDF.',
      extraFaq: [
        { q: 'O recorte apaga o conteúdo fora da caixa?', a: 'Define a caixa visível. Alguns leitores ainda podem revelar conteúdo fora do crop box. Use Redação para cobrir dados.' },
        { q: 'Posso recortar só uma página?', a: 'Sim. Desmarque a opção de aplicar em todas as páginas para afetar só a folha atual.' },
      ],
      cases: [
        { title: 'Scan com borda preta', body: 'O scanner deixou uma faixa. O recorte nas quatro margens limpa o miolo para arquivo interno.' },
        { title: 'Cabeçalho de portal', body: 'A exportação trouxe um banner. Recortar todas as páginas remove a faixa sem reeditar no Word.' },
        { title: 'Uma página de anexo', body: 'Só a folha 3 tem margem extra; as outras ficam intactas.' },
        { title: 'Antes de OCR', body: 'Reduzir a área visível ajuda o OCR a ignorar sujeira nas bordas.' },
        { title: 'Pacote para cliente', body: 'A equipe recorta o rascunho interno e envia só a área do formulário.' },
      ],
      tips: [
        'Área pequena demais é rejeitada de propósito.',
        'Recorte não substitui redação de dados sensíveis.',
        'Confira o crop box no leitor depois do download.',
        'Para foto de folha com mesa, use Ajuste de Margem.',
        'Desbloqueie o PDF se a prévia não abrir.',
        'O original permanece; nomeie a cópia recortada.',
      ],
      how: how3.pdf.pt,
    },
    en: {
      toolName: 'Crop PDF',
      title: 'Crop PDF Online | PDFWINDOWS',
      description:
        'Crop PDF margins in your browser. Draw the area, apply to one page or all pages — free, local, and no upload.',
      keywords: 'crop pdf, pdf margins, trim pdf page, crop box pdf, cut pdf borders local',
      h1: 'Crop PDF',
      promise:
        'Scans and exports arrive with dirty margins, a portal header, or a scanner black edge. Crop PDF lets you draw the visible area on the preview, apply it to this sheet or every page, and download a copy with an adjusted crop box. The original file stays on disk. Useful when the recipient only needs the inner content.',
      limit:
        'Crop sets the visible crop box. Some readers and tools can still reveal content outside that box. This is not redaction: data outside the area may remain in the file. To hide sensitive information, use Redact PDF. Areas that are too small are rejected.',
      workflow:
        'Upload the PDF, go to the page, drag the rectangle, decide whether it applies to all sheets, and generate the copy. Check it in your reader at 100% zoom. If a photo includes the desk, use Margin Adjust on the image before building the PDF.',
      extraFaq: [
        { q: 'Does crop delete content outside the box?', a: 'It sets the visible box. Some readers can still reveal content outside the crop box. Use Redact to cover data.' },
        { q: 'Can I crop only one page?', a: 'Yes. Uncheck apply-to-all to affect only the current sheet.' },
      ],
      cases: [
        { title: 'Scan with a black edge', body: 'The scanner left a strip. Cropping the four margins cleans the inner page for the archive.' },
        { title: 'Portal header', body: 'The export included a banner. Cropping all pages removes the strip without re-editing in Word.' },
        { title: 'One annex page', body: 'Only sheet 3 has extra margin; the others stay untouched.' },
        { title: 'Before OCR', body: 'Reducing the visible area helps OCR ignore dirt on the edges.' },
        { title: 'Client packet', body: 'The team crops an internal draft and sends only the form area.' },
      ],
      tips: [
        'Areas that are too small are rejected on purpose.',
        'Crop does not replace redaction of sensitive data.',
        'Check the crop box in a reader after download.',
        'For a photo of a sheet on a desk, use Margin Adjust.',
        'Unlock the PDF if the preview will not open.',
        'The original remains; name the cropped copy clearly.',
      ],
      how: how3.pdf.en,
    },
    es: {
      toolName: 'Recortar PDF',
      title: 'Recortar PDF en el navegador | PDFWINDOWS',
      description:
        'Recorte márgenes de un PDF en el navegador. Dibuje el área y aplique a una página o a todas — gratis y local.',
      keywords: 'recortar pdf, recortar margenes pdf, crop pdf, recorte de pagina',
      h1: 'Recortar PDF',
      promise:
        'Los escaneos y exportaciones traen margen sucio, encabezado de portal o borde negro del escáner. Recortar PDF le deja dibujar el área visible en la vista previa, aplicarla a esta hoja o a todas, y descargar una copia con crop box ajustada. El original permanece en disco. Útil cuando el destinatario solo necesita el interior de la página.',
      limit:
        'El recorte define la caja visible (crop box). Algunos lectores y herramientas aún pueden revelar contenido fuera de esa caja. No es redacción: los datos fuera del área pueden seguir en el archivo. Para ocultar información sensible, use Redacción PDF. Las áreas demasiado pequeñas se rechazan.',
      workflow:
        'Suba el PDF, vaya a la página, arrastre el rectángulo, decida si vale para todas las hojas y genere la copia. Revísela en el lector al 100%. Si la foto incluye la mesa, use Ajuste de Margen en la imagen antes de armar el PDF.',
      extraFaq: [
        { q: '¿El recorte borra el contenido fuera de la caja?', a: 'Define la caja visible. Algunos lectores aún pueden revelar contenido fuera del crop box. Use Redacción para cubrir datos.' },
        { q: '¿Puedo recortar solo una página?', a: 'Sí. Desmarque aplicar a todas las páginas para afectar solo la hoja actual.' },
      ],
      cases: [
        { title: 'Escaneo con borde negro', body: 'El escáner dejó una franja. Recortar los cuatro márgenes limpia el interior para archivo interno.' },
        { title: 'Encabezado de portal', body: 'La exportación trajo un banner. Recortar todas las páginas quita la franja sin reeditar en Word.' },
        { title: 'Una página de anexo', body: 'Solo la hoja 3 tiene margen extra; las demás quedan intactas.' },
        { title: 'Antes del OCR', body: 'Reducir el área visible ayuda al OCR a ignorar suciedad en los bordes.' },
        { title: 'Paquete para el cliente', body: 'El equipo recorta el borrador interno y envía solo el área del formulario.' },
      ],
      tips: [
        'Un área demasiado pequeña se rechaza a propósito.',
        'El recorte no sustituye la redacción de datos sensibles.',
        'Revise el crop box en el lector después de descargar.',
        'Para foto de hoja con mesa, use Ajuste de Margen.',
        'Desbloquee el PDF si la vista previa no abre.',
        'El original permanece; nombre la copia recortada.',
      ],
      how: how3.pdf.es,
    },
  }
);

export const COMPARE_PDF_CONTENT = buildLocalToolArticle(
  ['/pdf-extract-text', '/redacao-pdf', '/organizar-paginas-pdf', '/pdf-ocr'],
  {
    pt: {
      toolName: 'Comparar PDF',
      title: 'Comparar PDF Online | PDFWINDOWS',
      description:
        'Compare o texto de dois PDFs no navegador. Veja linhas adicionadas e removidas — grátis, local e sem upload.',
      keywords: 'comparar pdf, diff pdf, diferenças pdf, comparar documentos pdf local',
      h1: 'Comparar PDF',
      promise:
        'Duas versões do mesmo contrato ou relatório pedem um lado a lado rápido. Comparar PDF extrai o texto de A e B e marca linhas só à esquerda, só à direita ou iguais. O trabalho fica na aba: nenhum dos ficheiros sobe. Serve para revisão interna quando o layout importa menos do que o parágrafo que mudou.',
      limit:
        'Isto não é um diff visual de layout, imagens ou fontes. PDFs só com scan precisam de OCR antes. A comparação é heurística por linha, não um algoritmo de merge profissional. Tabelas complexas podem quebrar em linhas soltas.',
      workflow:
        'Envie o PDF A e o PDF B, rode a comparação e leia o painel. Linhas vermelhas saíram, verdes entraram. Se um ficheiro não tiver texto, use OCR de PDF e volte. Depois você pode redigir a versão que vai circular.',
      extraFaq: [
        { q: 'Funciona em PDF escaneado?', a: 'Só com texto extraível. Rode OCR de PDF antes se for imagem.' },
        { q: 'Isto mostra mudanças de layout?', a: 'Não. Compara o texto extraído, não a arte da página.' },
      ],
      cases: [
        { title: 'Revisão de contrato', body: 'Jurídico cola a minuta de ontem e a de hoje e vê cláusulas que sumiram.' },
        { title: 'Relatório mensal', body: 'Finanças confere se a nota de rodapé nova entrou na versão enviada ao conselho.' },
        { title: 'Política interna', body: 'RH compara o PDF publicado com o rascunho e lista parágrafos alterados.' },
        { title: 'Antes de redigir', body: 'A equipe vê o que mudou e só então cobre trechos que não podem sair.' },
        { title: 'Arquivo de versões', body: 'Dois anexos de e-mail viram um diff local sem pasta na nuvem.' },
      ],
      tips: [
        'Rode OCR se a extração falhar.',
        'Compare textos na mesma língua e ordem de páginas.',
        'Isto não substitui um revisor humano em cláusulas críticas.',
        'Desbloqueie PDFs cifrados antes.',
        'O original de cada lado permanece no disco.',
        'Use Extrair texto se quiser o TXT completo de um só ficheiro.',
      ],
      how: [
        'Envie o PDF A e o PDF B.',
        'Compare o texto extraído.',
        'Revise as linhas marcadas. Nada é enviado.',
      ],
    },
    en: {
      toolName: 'Compare PDF',
      title: 'Compare PDF Online | PDFWINDOWS',
      description:
        'Compare text from two PDFs in your browser. Spot added and removed lines — free, local, and no upload.',
      keywords: 'compare pdf, pdf diff, document comparison, compare pdf versions local',
      h1: 'Compare PDF',
      promise:
        'Two versions of the same contract or report need a fast side-by-side. Compare PDF extracts text from A and B and marks lines only on the left, only on the right, or the same. The work stays in the tab: neither file is uploaded. It is for internal review when layout matters less than the paragraph that changed.',
      limit:
        'This is not a visual layout, image, or font diff. Image-only scans need OCR first. The comparison is a line heuristic, not a professional merge algorithm. Complex tables may break into loose lines.',
      workflow:
        'Upload PDF A and PDF B, run the comparison, and read the panel. Red lines left, green lines arrived. If a file has no text, run PDF OCR and come back. Then you can redact the version that will circulate.',
      extraFaq: [
        { q: 'Does it work on a scanned PDF?', a: 'Only with extractable text. Run PDF OCR first if it is an image.' },
        { q: 'Does this show layout changes?', a: 'No. It compares extracted text, not page art.' },
      ],
      cases: [
        { title: 'Contract review', body: 'Legal drops yesterday’s draft and today’s and sees clauses that disappeared.' },
        { title: 'Monthly report', body: 'Finance checks whether a new footnote made it into the board copy.' },
        { title: 'Internal policy', body: 'HR compares the published PDF with the draft and lists changed paragraphs.' },
        { title: 'Before redaction', body: 'The team sees what changed and only then covers passages that cannot leave.' },
        { title: 'Version archive', body: 'Two email attachments become a local diff without a cloud folder.' },
      ],
      tips: [
        'Run OCR if extraction fails.',
        'Compare text in the same language and page order.',
        'This does not replace a human reviewer on critical clauses.',
        'Unlock encrypted PDFs first.',
        'Each original stays on disk.',
        'Use Extract Text if you want the full TXT of one file.',
      ],
      how: ['Upload PDF A and PDF B.', 'Compare the extracted text.', 'Review the marked lines. Nothing is uploaded.'],
    },
    es: {
      toolName: 'Comparar PDF',
      title: 'Comparar PDF en el navegador | PDFWINDOWS',
      description:
        'Compare el texto de dos PDF en el navegador. Vea líneas añadidas y quitadas — gratis, local y sin subida.',
      keywords: 'comparar pdf, diferencias pdf, diff pdf, comparar versiones pdf',
      h1: 'Comparar PDF',
      promise:
        'Dos versiones del mismo contrato o informe piden un lado a lado rápido. Comparar PDF extrae el texto de A y B y marca líneas solo a la izquierda, solo a la derecha o iguales. El trabajo queda en la pestaña: ninguno de los archivos se sube. Sirve para revisión interna cuando el diseño importa menos que el párrafo que cambió.',
      limit:
        'Esto no es un diff visual de diseño, imágenes o fuentes. Los PDF solo escaneados necesitan OCR antes. La comparación es heurística por línea, no un algoritmo profesional de merge. Las tablas complejas pueden romperse en líneas sueltas.',
      workflow:
        'Suba el PDF A y el PDF B, ejecute la comparación y lea el panel. Las líneas rojas salieron, las verdes entraron. Si un archivo no tiene texto, use OCR de PDF y vuelva. Luego puede redactar la versión que circulará.',
      extraFaq: [
        { q: '¿Funciona en un PDF escaneado?', a: 'Solo con texto extraíble. Ejecute OCR de PDF antes si es imagen.' },
        { q: '¿Esto muestra cambios de diseño?', a: 'No. Compara el texto extraído, no el arte de la página.' },
      ],
      cases: [
        { title: 'Revisión de contrato', body: 'Jurídico suelta la minuta de ayer y la de hoy y ve cláusulas que desaparecieron.' },
        { title: 'Informe mensual', body: 'Finanzas comprueba si la nota al pie nueva entró en la versión del consejo.' },
        { title: 'Política interna', body: 'RR. HH. compara el PDF publicado con el borrador y lista párrafos cambiados.' },
        { title: 'Antes de redactar', body: 'El equipo ve qué cambió y solo entonces cubre trechos que no pueden salir.' },
        { title: 'Archivo de versiones', body: 'Dos adjuntos de correo se vuelven un diff local sin carpeta en la nube.' },
      ],
      tips: [
        'Ejecute OCR si la extracción falla.',
        'Compare textos en el mismo idioma y orden de páginas.',
        'Esto no sustituye a un revisor humano en cláusulas críticas.',
        'Desbloquee PDFs cifrados antes.',
        'El original de cada lado permanece en disco.',
        'Use Extraer texto si quiere el TXT completo de un solo archivo.',
      ],
      how: ['Suba el PDF A y el PDF B.', 'Compare el texto extraído.', 'Revise las líneas marcadas. Nada se envía.'],
    },
  }
);

