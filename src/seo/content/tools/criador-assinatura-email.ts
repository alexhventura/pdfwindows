import type { ToolRichContent } from '../types';
import { privacyFaq, defaultCta } from '../helpers';

export const CRIADOR_ASSINATURA_EMAIL_CONTENT: Record<'en' | 'pt' | 'es', ToolRichContent> = {
  en: {
    title: 'Email Signature Creator (Free, Local) | PDFWINDOWS',
    description:
      'Create a professional email signature with photo, logo and four templates, then download it as a PNG, JPG or WEBP image — all in your browser.',
    keywords: 'email signature generator, create email signature, professional signature with logo, email signature with photo, signature image maker',
    h1: 'Email Signature Creator',
    intro:
      'The PDFWINDOWS Email Signature Creator turns your details into a polished signature image you can drop into Gmail, Outlook or any mail client. Pick one of four templates, set a background and accent color, add a photo and logo, fill in your contacts, and download the result as a high-resolution PNG, JPG or WEBP. Everything happens in your browser: your photo, logo and data never leave your device, and the live preview is rendered from the exact same source used to export the file, so what you see is precisely what you download.',
    toolName: 'Email Signature Creator',
    benefits: [
      'Four distinct, professional templates',
      'Photo, logo and transparent-background support',
      'Live preview that matches the exported image exactly',
      'High-resolution export in PNG, JPG or WEBP',
      '100% local — nothing is uploaded',
    ],
    useCases: [
      {
        title: 'A consistent company signature',
        body: 'Teams create a shared signature style — same template, accent color and logo — so every employee’s email looks consistent. Because the tool is free and local, you can standardize signatures across a whole company without a subscription or sending anyone’s photo to a server.',
      },
      {
        title: 'Freelancers and consultants',
        body: 'Independent professionals build a signature with a prominent photo to add a personal, trustworthy touch to client emails, then export a crisp PNG to paste into their mail client.',
      },
      {
        title: 'Transparent-background logos',
        body: 'Designers export a PNG with a transparent background so the signature blends into any email theme, light or dark, without an ugly white box around it.',
      },
      {
        title: 'Quick rebrands and updates',
        body: 'When a role, phone number or brand color changes, regenerate the signature in seconds instead of editing an image by hand.',
      },
      {
        title: 'Agencies preparing client assets',
        body: 'Agencies produce signature images for multiple clients quickly, switching templates and colors without touching a heavy graphics editor.',
      },
    ],
    howItWorks: [
      'Choose a background (or transparent) and an accent color.',
      'Pick one of the four templates.',
      'Fill in your details and add a photo and logo.',
      'Download the signature as PNG, JPG or WEBP.',
    ],
    tips: [
      'Use a PNG with a transparent background so the signature looks good on any email theme.',
      'Keep the logo simple; small marks read better than detailed images at signature size.',
      'A square photo works best — the templates crop it into a circle automatically.',
      'Leave optional fields blank and the layout will close the gap instead of showing an empty space.',
      'Paste the image into your mail client’s signature editor and, if it asks, add your name and links as alt text.',
      'Prefer web-safe wording; the exported image keeps your exact text, so double-check spelling before downloading.',
    ],
    sections: [
      {
        id: 'templates',
        heading: 'Four templates for different styles',
        level: 2,
        paragraphs: [
          'The Classic template places a round photo on the left with your details on the right, separated by a thin accent line — a timeless, professional look. The Corporate template leads with your name and puts the logo in a prominent position above a divider and a single row of contacts.',
          'The Photo Spotlight template centers a larger photo above your name and contacts for a personal, elegant feel that suits consultants and independent professionals. The Modern template uses an asymmetric layout with a colored side panel for the photo and room for an optional tagline.',
          'All four templates read from the same data, so switching between them never erases what you typed — the tool simply rearranges your details into the new layout.',
        ],
      },
      {
        id: 'preview-parity',
        heading: 'What you see is what you download',
        level: 2,
        paragraphs: [
          'A common frustration with signature makers is that the preview looks different from the exported file. This tool avoids that entirely by rendering the preview and the downloaded image from a single source: the signature is built once as a vector graphic, shown live in the preview and rasterized to your chosen format for export.',
          'Because export uses the same source at a higher resolution, the downloaded PNG is sharp on high-density screens while remaining pixel-faithful to the preview.',
          'That parity means you can fine-tune colors, text and images with confidence, knowing the final image will match exactly.',
        ],
      },
      {
        id: 'photos-logos',
        heading: 'Photos, logos and transparency',
        level: 2,
        paragraphs: [
          'Add a photo and a logo from your device in common formats. Images are processed entirely in the browser and downscaled in memory so a large upload does not bog things down, and the templates handle sizing, cropping and shape automatically.',
          'PNG export preserves transparency, which is ideal for logos and for signatures meant to sit on colored or dark email backgrounds. JPG and WEBP are also available when you want a smaller opaque file.',
        ],
      },
      {
        id: 'privacy',
        heading: 'Private by design',
        level: 2,
        paragraphs: [
          'Your name, contacts, photo and logo never leave your browser. There is no upload, no account and no storage — the data lives only in the current session and is cleared when you close or refresh the page.',
          'That makes the tool safe to use with a personal photo or an unreleased brand logo, because nothing is transmitted to a server or retained anywhere.',
        ],
      },
    ],
    faq: [
      ...privacyFaq('en'),
      {
        q: 'Are my photo and data uploaded?',
        a: 'No. Everything is processed in your browser. Your photo, logo and details are never sent to a server.',
      },
      {
        q: 'Can I get a transparent background?',
        a: 'Yes. Choose the transparent background and export as PNG, which preserves transparency.',
      },
      {
        q: 'Which formats can I download?',
        a: 'PNG (the default, with transparency), JPG and WEBP, all generated locally at high resolution.',
      },
      {
        q: 'Will the download look like the preview?',
        a: 'Yes. The preview and the exported image are rendered from the same source, so they match exactly.',
      },
    ],
    relatedTools: ['/capturador-de-cores', '/image-resize', '/image-converter', '/estudio-documentos'],
    cta: defaultCta('en', 'Email Signature Creator'),
  },
  pt: {
    title: 'Criador de Assinatura de E-mail (Grátis e Local) | PDFWINDOWS',
    description:
      'Crie uma assinatura de e-mail profissional com foto, logo e quatro modelos, e baixe como imagem PNG, JPG ou WEBP — tudo no navegador.',
    keywords: 'assinatura de email, criar assinatura de email, assinatura profissional com logo, assinatura com foto, gerador de assinatura imagem',
    h1: 'Criador de Assinatura de E-mail',
    intro:
      'O Criador de Assinatura de E-mail do PDFWINDOWS transforma seus dados em uma imagem de assinatura elegante para usar no Gmail, Outlook ou qualquer cliente de e-mail. Escolha um entre quatro modelos, defina cor de fundo e de destaque, adicione foto e logo, preencha seus contatos e baixe o resultado como um PNG, JPG ou WEBP em alta resolução. Tudo acontece no navegador: sua foto, logo e dados nunca saem do dispositivo, e a pré-visualização é gerada exatamente da mesma fonte usada para exportar o arquivo, então o que você vê é precisamente o que você baixa.',
    toolName: 'Criador de Assinatura de E-mail',
    benefits: [
      'Quatro modelos profissionais e distintos',
      'Suporte a foto, logo e fundo transparente',
      'Preview idêntico à imagem exportada',
      'Exportação em alta resolução em PNG, JPG ou WEBP',
      '100% local — nada é enviado',
    ],
    useCases: [
      {
        title: 'Uma assinatura de empresa consistente',
        body: 'Times criam um padrão de assinatura — mesmo modelo, cor de destaque e logo — para o e-mail de cada colaborador ficar consistente. Como a ferramenta é grátis e local, dá para padronizar as assinaturas de toda a empresa sem assinatura paga nem enviar a foto de ninguém a um servidor.',
      },
      {
        title: 'Freelancers e consultores',
        body: 'Profissionais autônomos montam uma assinatura com foto em destaque para dar um toque pessoal e confiável aos e-mails de clientes, e exportam um PNG nítido para colar no cliente de e-mail.',
      },
      {
        title: 'Logos com fundo transparente',
        body: 'Designers exportam um PNG com fundo transparente para a assinatura se integrar a qualquer tema de e-mail, claro ou escuro, sem uma caixa branca ao redor.',
      },
      {
        title: 'Rebrands e atualizações rápidas',
        body: 'Quando muda o cargo, o telefone ou a cor da marca, regenere a assinatura em segundos em vez de editar uma imagem à mão.',
      },
      {
        title: 'Agências preparando materiais de clientes',
        body: 'Agências produzem imagens de assinatura para vários clientes rapidamente, trocando modelos e cores sem abrir um editor gráfico pesado.',
      },
    ],
    howItWorks: [
      'Escolha um fundo (ou transparente) e uma cor de destaque.',
      'Escolha um dos quatro modelos.',
      'Preencha seus dados e adicione foto e logo.',
      'Baixe a assinatura como PNG, JPG ou WEBP.',
    ],
    tips: [
      'Use um PNG com fundo transparente para a assinatura ficar boa em qualquer tema de e-mail.',
      'Mantenha o logo simples; marcas pequenas ficam melhores do que imagens detalhadas no tamanho de assinatura.',
      'Uma foto quadrada funciona melhor — os modelos recortam em círculo automaticamente.',
      'Deixe campos opcionais em branco e o layout fecha o espaço em vez de mostrar uma área vazia.',
      'Cole a imagem no editor de assinatura do seu cliente de e-mail e, se pedir, adicione seu nome e links como texto alternativo.',
      'A imagem exportada mantém seu texto exato, então revise a ortografia antes de baixar.',
    ],
    sections: [
      {
        id: 'modelos',
        heading: 'Quatro modelos para estilos diferentes',
        level: 2,
        paragraphs: [
          'O modelo Clássico coloca uma foto redonda à esquerda com seus dados à direita, separados por uma linha fina de destaque — um visual atemporal e profissional. O modelo Corporativo começa pelo seu nome e coloca o logo em posição de destaque acima de uma linha divisória e de uma única fila de contatos.',
          'O modelo Foto em Destaque centraliza uma foto maior acima do nome e dos contatos, para um clima pessoal e elegante que combina com consultores e profissionais autônomos. O modelo Moderno usa um layout assimétrico com um painel lateral colorido para a foto e espaço para uma frase opcional.',
          'Todos os quatro modelos leem os mesmos dados, então trocar de modelo nunca apaga o que você digitou — a ferramenta apenas reorganiza seus dados no novo layout.',
        ],
      },
      {
        id: 'paridade-preview',
        heading: 'O que você vê é o que você baixa',
        level: 2,
        paragraphs: [
          'Uma frustração comum com geradores de assinatura é o preview ficar diferente do arquivo exportado. Esta ferramenta evita isso por completo gerando o preview e a imagem baixada da mesma fonte: a assinatura é construída uma vez como um gráfico vetorial, exibida ao vivo no preview e rasterizada no formato escolhido na exportação.',
          'Como a exportação usa a mesma fonte em resolução maior, o PNG baixado fica nítido em telas de alta densidade, mantendo-se fiel pixel a pixel ao preview.',
          'Essa paridade permite ajustar cores, texto e imagens com confiança, sabendo que a imagem final vai corresponder exatamente.',
        ],
      },
      {
        id: 'fotos-logos',
        heading: 'Fotos, logos e transparência',
        level: 2,
        paragraphs: [
          'Adicione foto e logo do seu dispositivo em formatos comuns. As imagens são processadas inteiramente no navegador e reduzidas em memória para um upload grande não travar nada, e os modelos cuidam de tamanho, recorte e formato automaticamente.',
          'A exportação em PNG preserva transparência, ideal para logos e para assinaturas que ficarão sobre fundos de e-mail coloridos ou escuros. JPG e WEBP também estão disponíveis quando você quer um arquivo opaco menor.',
        ],
      },
      {
        id: 'privacidade',
        heading: 'Privado por design',
        level: 2,
        paragraphs: [
          'Seu nome, contatos, foto e logo nunca saem do navegador. Não há upload, conta nem armazenamento — os dados existem apenas na sessão atual e são apagados ao fechar ou atualizar a página.',
          'Isso torna a ferramenta segura para usar com uma foto pessoal ou um logo de marca ainda não lançado, porque nada é transmitido a um servidor nem retido em lugar algum.',
        ],
      },
    ],
    faq: [
      ...privacyFaq('pt'),
      {
        q: 'Minha foto e meus dados são enviados?',
        a: 'Não. Tudo é processado no seu navegador. Sua foto, logo e dados nunca são enviados a um servidor.',
      },
      {
        q: 'Consigo fundo transparente?',
        a: 'Sim. Escolha o fundo transparente e exporte como PNG, que preserva a transparência.',
      },
      {
        q: 'Quais formatos posso baixar?',
        a: 'PNG (padrão, com transparência), JPG e WEBP, todos gerados localmente em alta resolução.',
      },
      {
        q: 'A imagem baixada vai parecer com o preview?',
        a: 'Sim. O preview e a imagem exportada são gerados da mesma fonte, então correspondem exatamente.',
      },
    ],
    relatedTools: ['/capturador-de-cores', '/image-resize', '/image-converter', '/estudio-documentos'],
    cta: defaultCta('pt', 'Criador de Assinatura de E-mail'),
  },
  es: {
    title: 'Creador de Firma de Correo (Gratis y Local) | PDFWINDOWS',
    description:
      'Crea una firma de correo profesional con foto, logo y cuatro plantillas, y descárgala como imagen PNG, JPG o WEBP — todo en el navegador.',
    keywords: 'firma de correo, crear firma de correo, firma profesional con logo, firma con foto, generador de firma imagen',
    h1: 'Creador de Firma de Correo',
    intro:
      'El Creador de Firma de Correo de PDFWINDOWS convierte tus datos en una imagen de firma elegante para usar en Gmail, Outlook o cualquier cliente de correo. Elige una de cuatro plantillas, define color de fondo y de acento, agrega foto y logo, completa tus contactos y descarga el resultado como un PNG, JPG o WEBP en alta resolución. Todo ocurre en el navegador: tu foto, logo y datos nunca salen del dispositivo, y la vista previa se genera exactamente de la misma fuente que exporta el archivo, así que lo que ves es precisamente lo que descargas.',
    toolName: 'Creador de Firma de Correo',
    benefits: [
      'Cuatro plantillas profesionales y distintas',
      'Soporte para foto, logo y fondo transparente',
      'Vista previa idéntica a la imagen exportada',
      'Exportación en alta resolución en PNG, JPG o WEBP',
      '100% local — nada se sube',
    ],
    useCases: [
      {
        title: 'Una firma de empresa consistente',
        body: 'Los equipos crean un estándar de firma — misma plantilla, color de acento y logo — para que el correo de cada empleado se vea consistente. Como la herramienta es gratis y local, puedes estandarizar las firmas de toda la empresa sin suscripción ni enviar la foto de nadie a un servidor.',
      },
      {
        title: 'Freelancers y consultores',
        body: 'Los profesionales independientes arman una firma con foto destacada para dar un toque personal y confiable a los correos de clientes, y exportan un PNG nítido para pegar en su cliente de correo.',
      },
      {
        title: 'Logos con fondo transparente',
        body: 'Los diseñadores exportan un PNG con fondo transparente para que la firma se integre a cualquier tema de correo, claro u oscuro, sin una caja blanca alrededor.',
      },
      {
        title: 'Rebrands y actualizaciones rápidas',
        body: 'Cuando cambia el cargo, el teléfono o el color de marca, regenera la firma en segundos en lugar de editar una imagen a mano.',
      },
      {
        title: 'Agencias preparando materiales de clientes',
        body: 'Las agencias producen imágenes de firma para varios clientes rápidamente, cambiando plantillas y colores sin abrir un editor gráfico pesado.',
      },
    ],
    howItWorks: [
      'Elige un fondo (o transparente) y un color de acento.',
      'Elige una de las cuatro plantillas.',
      'Completa tus datos y agrega foto y logo.',
      'Descarga la firma como PNG, JPG o WEBP.',
    ],
    tips: [
      'Usa un PNG con fondo transparente para que la firma se vea bien en cualquier tema de correo.',
      'Mantén el logo simple; las marcas pequeñas se leen mejor que imágenes detalladas a tamaño de firma.',
      'Una foto cuadrada funciona mejor — las plantillas la recortan en círculo automáticamente.',
      'Deja campos opcionales en blanco y el diseño cerrará el hueco en lugar de mostrar un espacio vacío.',
      'Pega la imagen en el editor de firma de tu cliente de correo y, si lo pide, agrega tu nombre y enlaces como texto alternativo.',
      'La imagen exportada mantiene tu texto exacto, así que revisa la ortografía antes de descargar.',
    ],
    sections: [
      {
        id: 'plantillas',
        heading: 'Cuatro plantillas para estilos diferentes',
        level: 2,
        paragraphs: [
          'La plantilla Clásica coloca una foto redonda a la izquierda con tus datos a la derecha, separados por una línea fina de acento — un aspecto atemporal y profesional. La plantilla Corporativa comienza por tu nombre y pone el logo en posición destacada sobre una línea divisoria y una única fila de contactos.',
          'La plantilla Foto Destacada centra una foto más grande sobre el nombre y los contactos, para un aire personal y elegante que combina con consultores y profesionales independientes. La plantilla Moderna usa un diseño asimétrico con un panel lateral de color para la foto y espacio para una frase opcional.',
          'Las cuatro plantillas leen los mismos datos, así que cambiar de plantilla nunca borra lo que escribiste — la herramienta solo reorganiza tus datos en el nuevo diseño.',
        ],
      },
      {
        id: 'paridad-preview',
        heading: 'Lo que ves es lo que descargas',
        level: 2,
        paragraphs: [
          'Una frustración común con los creadores de firmas es que la vista previa se ve distinta al archivo exportado. Esta herramienta lo evita por completo generando la vista previa y la imagen descargada de la misma fuente: la firma se construye una vez como un gráfico vectorial, se muestra en vivo en la vista previa y se rasteriza al formato elegido al exportar.',
          'Como la exportación usa la misma fuente en mayor resolución, el PNG descargado es nítido en pantallas de alta densidad y se mantiene fiel píxel a píxel a la vista previa.',
          'Esa paridad permite ajustar colores, texto e imágenes con confianza, sabiendo que la imagen final coincidirá exactamente.',
        ],
      },
      {
        id: 'fotos-logos',
        heading: 'Fotos, logos y transparencia',
        level: 2,
        paragraphs: [
          'Agrega foto y logo desde tu dispositivo en formatos comunes. Las imágenes se procesan enteramente en el navegador y se reducen en memoria para que una subida grande no ralentice nada, y las plantillas manejan tamaño, recorte y forma automáticamente.',
          'La exportación en PNG preserva la transparencia, ideal para logos y para firmas que quedarán sobre fondos de correo de color u oscuros. JPG y WEBP también están disponibles cuando quieres un archivo opaco más pequeño.',
        ],
      },
      {
        id: 'privacidad',
        heading: 'Privado por diseño',
        level: 2,
        paragraphs: [
          'Tu nombre, contactos, foto y logo nunca salen del navegador. No hay subida, cuenta ni almacenamiento — los datos existen solo en la sesión actual y se borran al cerrar o actualizar la página.',
          'Eso hace que la herramienta sea segura para usar con una foto personal o un logo de marca aún no lanzado, porque nada se transmite a un servidor ni se retiene en ningún lugar.',
        ],
      },
    ],
    faq: [
      ...privacyFaq('es'),
      {
        q: '¿Mi foto y mis datos se suben?',
        a: 'No. Todo se procesa en tu navegador. Tu foto, logo y datos nunca se envían a un servidor.',
      },
      {
        q: '¿Puedo obtener fondo transparente?',
        a: 'Sí. Elige el fondo transparente y exporta como PNG, que preserva la transparencia.',
      },
      {
        q: '¿Qué formatos puedo descargar?',
        a: 'PNG (por defecto, con transparencia), JPG y WEBP, todos generados localmente en alta resolución.',
      },
      {
        q: '¿La imagen descargada se verá como la vista previa?',
        a: 'Sí. La vista previa y la imagen exportada se generan de la misma fuente, así que coinciden exactamente.',
      },
    ],
    relatedTools: ['/capturador-de-cores', '/image-resize', '/image-converter', '/estudio-documentos'],
    cta: defaultCta('es', 'Creador de Firma de Correo'),
  },
};
