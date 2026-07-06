import type { ToolRichContent } from '../types';
import { privacyFaq, defaultCta } from '../helpers';

export const PDF_PASSWORD_CONTENT: Record<'en' | 'pt' | 'es', ToolRichContent> = {
  en: {
    title: 'Password Protect PDF Online & Offline | PDFWINDOWS',
    description:
      'Add real PDF encryption in your browser. Set a password locally before sharing sensitive documents — compatible with Adobe Reader and Chrome, with zero cloud upload.',
    keywords:
      'password protect pdf, encrypt pdf offline, secure pdf browser, pdf lock free, add password to pdf local',
    h1: 'Password Protect PDF',
    intro:
      'Sharing a confidential PDF over email or Slack without protection is an open invitation for forwarding, indexing, and accidental exposure. Real PDF encryption — not just a hidden folder on your desktop — requires writing an encryption dictionary into the file so standard readers demand a password before rendering pages. PDFWINDOWS applies that encryption entirely in your browser: you set the password in a local modal, the file is re-saved with industry-standard protection, and neither the document nor your passphrase ever touches our servers.',
    toolName: 'Password Protect PDF',
    benefits: [
      'Standard PDF encryption compatible with major readers',
      'Password stays in browser memory during processing only',
      'No account, no cloud storage of credentials',
      'Protect files before email, USB handoff, or shared drives',
      'Works offline after initial page load',
    ],
    useCases: [
      {
        title: 'HR and payroll distribution',
        body:
          'Payslips, termination letters, and benefits summaries contain identifiers that regulations treat as sensitive. Encrypt each PDF with an employee-specific or shared passphrase before attaching to email so casual mailbox access does not expose income data.',
      },
      {
        title: 'Legal client deliverables',
        body:
          'Law firms send drafts, settlement terms, and discovery subsets to clients who may forward attachments carelessly. Password protection adds a friction layer: recipients need the passphrase you provide through a separate channel, reducing drive-by disclosure.',
      },
      {
        title: 'Financial statements and tax documents',
        body:
          'Accountants exchange K-1s, bank statements, and loan packages during filing season. Encrypting locally means account numbers never sit unencrypted on a conversion server log — only the protected file you choose to send leaves your machine.',
      },
      {
        title: 'Healthcare and insurance forms',
        body:
          'Patient intake summaries and claim supporting documents fall under strict handling expectations. Browser-side encryption lets clinics password-protect outbound PDFs without violating policies that prohibit uploading PHI to unknown vendors.',
      },
      {
        title: 'Internal strategy and IP drafts',
        body:
          'Product roadmaps and M&A teasers leak easily when PDFs lack access control. Lock drafts before circulating to leadership or board members so lost laptops and shared links are less catastrophic.',
      },
    ],
    howItWorks: [
      'Upload the PDF you want to protect.',
      'Choose the password-protect operation and enter a strong passphrase in the secure dialog.',
      'The browser writes encryption metadata and re-saves the file locally.',
      'Download the protected PDF and share the password through a separate secure channel.',
    ],
    tips: [
      'Use long passphrases with mixed character types — short passwords are vulnerable to brute force.',
      'Transmit passwords via phone, SMS, or password manager share — not in the same email as the file.',
      'Keep an unencrypted master copy in a secure vault if you might edit the document later.',
      'Test opening the output in the same reader your recipients use before mass distribution.',
      'Encrypt after compress and watermark steps so you do not repeat work on the locked file.',
      'Document recovery procedures — lost passwords mean unrecoverable content with proper encryption.',
    ],
    sections: [
      {
        id: 'real-encryption',
        heading: 'Real encryption vs superficial locks',
        level: 2,
        paragraphs: [
          'Some tools only restrict editing or printing while leaving content readable. PDFWINDOWS applies password-based encryption that blocks viewing until the correct passphrase is supplied in compliant readers. The encrypted file is a new binary stream; unauthorized parties without the password cannot extract page text from the raw bytes under standard PDF security models.',
          'Encryption runs locally with libraries that implement PDF security handlers. Your password is used as key material during save and is not persisted to disk or transmitted over the network by PDFWINDOWS.',
        ],
      },
      {
        id: 'compatibility',
        heading: 'Reader compatibility and limitations',
        level: 2,
        paragraphs: [
          'Modern Adobe Acrobat, Adobe Reader, Chrome PDF viewer, and most enterprise readers open PDFWINDOWS-encrypted files when given the correct password. Very old or niche viewers may lack support for newer cipher suites — always verify with your audience\'s environment.',
        ],
        bullets: [
          'Recipients need a PDF reader, not a PDFWINDOWS account.',
          'Printing and copying may still be allowed depending on encryption flags applied.',
          'Screen readers and accessibility tools may require password entry before reading aloud.',
        ],
      },
      {
        id: 'password-hygiene',
        heading: 'Password hygiene for teams',
        level: 2,
        paragraphs: [
          'Organizational policy should define minimum password length, rotation for recurring sends, and approved out-of-band sharing methods. Avoid reusing payroll passwords across unrelated documents. For high-stakes bundles, consider unique passwords per recipient even when inconvenient.',
        ],
      },
      {
        id: 'protect-workflow',
        heading: 'Where password protection fits your workflow',
        level: 2,
        paragraphs: [
          'Typical sequence: merge related pages, compress for size, add a draft watermark, then encrypt for external send. Watermarks deter casual screenshots; encryption deters casual opening. Both can combine for layered document control without cloud services.',
        ],
        bullets: [
          'Watermark — mark drafts before encryption.',
          'Compress — shrink encrypted payloads for email limits.',
          'Merge — bundle sections into one protected deliverable.',
        ],
      },
      {
        id: 'encrypt-compliance',
        heading: 'Encryption for compliance-minded teams',
        level: 3,
        paragraphs: [
          'Regulations rarely mandate a specific PDF tool, but they do require reasonable safeguards for personal data. Client-side encryption lets you apply controls before data crosses jurisdictional boundaries. Document which files were encrypted, which passphrase channel was used, and retain unencrypted masters only in approved vaults.',
          'Audit trails stay simpler when encryption happens on managed endpoints: there is no third-party subprocessors list entry for a cloud PDF locker you briefly used during a deadline crunch.',
        ],
      },
    ],
    faq: [
      ...privacyFaq('en'),
      {
        q: 'Does PDFWINDOWS store my password?',
        a: 'No. The password exists only in browser memory while encryption runs. We do not log, transmit, or retain passphrases on any server.',
      },
      {
        q: 'Can I remove a password with this tool?',
        a: 'This tool adds encryption. Removing an existing password requires opening the file with the current password in a full editor — PDFWINDOWS focuses on protecting unencrypted inputs.',
      },
      {
        q: 'What if I forget the password?',
        a: 'Properly encrypted PDFs cannot be decrypted without the password. Store passphrases in a password manager or secure record before distributing files.',
      },
      {
        q: 'Will encryption increase file size?',
        a: 'Slightly, due to encryption overhead and metadata. The difference is usually negligible compared to image content.',
      },
      {
        q: 'Can I encrypt already-compressed PDFs?',
        a: 'Yes. Compression and encryption are independent operations. Encrypting after compressing is a common workflow for email-ready secure attachments.',
      },
    ],
    relatedTools: ['/pdf-watermark', '/pdf-merge', '/pdf-compress'],
    cta: defaultCta('en', 'Password Protect PDF'),
  },
  pt: {
    title: 'Proteger PDF com Senha Online e Offline | PDFWINDOWS',
    description:
      'Adicione criptografia real ao PDF no navegador. Defina senha localmente antes de compartilhar documentos sensíveis — compatível com Adobe Reader e Chrome, sem upload na nuvem.',
    keywords:
      'proteger pdf senha, criptografar pdf offline, pdf com senha navegador, bloquear pdf gratis, senha pdf local',
    h1: 'Proteger PDF com Senha',
    intro:
      'Compartilhar PDF confidencial por e-mail ou Slack sem proteção convida a encaminhamentos, indexação e exposição acidental. Criptografia real de PDF — não só uma pasta oculta — exige gravar um dicionário de criptografia no arquivo para leitores exigirem senha antes de renderizar páginas. O PDFWINDOWS aplica essa criptografia inteiramente no navegador: você define a senha em modal local, o arquivo é salvo com proteção padrão do setor, e nem o documento nem a passphrase passam pelos nossos servidores.',
    toolName: 'Proteger PDF com Senha',
    benefits: [
      'Criptografia PDF padrão compatível com leitores principais',
      'Senha fica só na memória do navegador durante o processamento',
      'Sem conta nem armazenamento de credenciais na nuvem',
      'Proteja antes de e-mail, pendrive ou drives compartilhados',
      'Funciona offline após carregar a página',
    ],
    useCases: [
      {
        title: 'Distribuição de RH e folha',
        body:
          'Holerites, cartas de desligamento e resumos de benefícios contêm identificadores sensíveis. Criptografe cada PDF com senha específica ou compartilhada antes do anexo para que acesso casual à caixa de entrada não exponha dados de renda.',
      },
      {
        title: 'Entregas a clientes jurídicos',
        body:
          'Escritórios enviam minutas, acordos e subconjuntos de discovery a clientes que encaminham anexos sem cuidado. Senha adiciona atrito: destinatários precisam da passphrase por canal separado, reduzindo divulgação casual.',
      },
      {
        title: 'Demonstrações financeiras e impostos',
        body:
          'Contadores trocam informes, extratos e pacotes de crédito na temporada fiscal. Criptografar localmente evita números de conta desprotegidos em logs de servidor de conversão — só o arquivo protegido que você enviar sai da máquina.',
      },
      {
        title: 'Formulários de saúde e seguros',
        body:
          'Resumos de admissão e documentos de sinistro têm expectativas rígidas de manuseio. Criptografia no navegador permite proteger PDFs de saída sem violar políticas que proíbem upload de PHI a fornecedores desconhecidos.',
      },
      {
        title: 'Rascunhos de estratégia e PI interna',
        body:
          'Roadmaps e teasers de M&A vazam facilmente sem controle de acesso. Bloqueie rascunhos antes de circular para liderança ou conselho para que notebooks perdidos e links compartilhados sejam menos catastróficos.',
      },
    ],
    howItWorks: [
      'Envie o PDF que deseja proteger.',
      'Escolha proteger com senha e informe passphrase forte no diálogo seguro.',
      'O navegador grava metadados de criptografia e salva o arquivo localmente.',
      'Baixe o PDF protegido e compartilhe a senha por canal seguro separado.',
    ],
    tips: [
      'Use passphrases longas com tipos de caractere variados — senhas curtas são vulneráveis a força bruta.',
      'Envie senhas por telefone, SMS ou compartilhamento de gerenciador — não no mesmo e-mail do arquivo.',
      'Guarde cópia mestre sem criptografia em cofre seguro se for editar depois.',
      'Teste abertura no mesmo leitor dos destinatários antes de distribuição em massa.',
      'Criptografe após comprimir e marcar d\'água para não repetir trabalho no arquivo bloqueado.',
      'Documente recuperação — senhas perdidas significam conteúdo irrecuperável com criptografia adequada.',
    ],
    sections: [
      {
        id: 'real-encryption',
        heading: 'Criptografia real vs bloqueios superficiais',
        level: 2,
        paragraphs: [
          'Algumas ferramentas só restringem edição ou impressão deixando conteúdo legível. O PDFWINDOWS aplica criptografia por senha que bloqueia visualização até a passphrase correta em leitores compatíveis. O arquivo criptografado é um novo fluxo binário; terceiros sem senha não extraem texto das páginas nos bytes brutos nos modelos de segurança PDF padrão.',
          'A criptografia roda localmente com bibliotecas que implementam handlers de segurança PDF. Sua senha é usada como material de chave no salvamento e não é persistida em disco nem transmitida pela rede pelo PDFWINDOWS.',
        ],
      },
      {
        id: 'compatibility',
        heading: 'Compatibilidade com leitores e limitações',
        level: 2,
        paragraphs: [
          'Adobe Acrobat, Adobe Reader, Chrome e a maioria dos leitores corporativos abrem arquivos criptografados pelo PDFWINDOWS com a senha correta. Visualizadores muito antigos podem não suportar conjuntos de cifra recentes — verifique no ambiente do seu público.',
        ],
        bullets: [
          'Destinatários precisam de leitor PDF, não de conta PDFWINDOWS.',
          'Impressão e cópia podem continuar permitidas conforme flags de criptografia.',
          'Leitores de tela podem exigir senha antes de ler em voz alta.',
        ],
      },
      {
        id: 'password-hygiene',
        heading: 'Higiene de senhas para equipes',
        level: 2,
        paragraphs: [
          'A política organizacional deve definir tamanho mínimo, rotação para envios recorrentes e métodos aprovados de compartilhamento fora de banda. Evite reutilizar senhas de folha em documentos não relacionados. Para pacotes críticos, considere senha única por destinatário mesmo quando inconveniente.',
        ],
      },
      {
        id: 'protect-workflow',
        heading: 'Onde a proteção por senha encaixa no fluxo',
        level: 2,
        paragraphs: [
          'Sequência típica: mesclar páginas relacionadas, comprimir, adicionar marca d\'água de rascunho e criptografar para envio externo. Marcas d\'água desencorajam screenshots casuais; criptografia desencoraja abertura casual. Ambas combinam controle em camadas sem serviços na nuvem.',
        ],
        bullets: [
          'Marca d\'água — marque rascunhos antes de criptografar.',
          'Comprimir — reduza payload criptografado para limites de e-mail.',
          'Mesclar — agrupe seções em uma entrega protegida.',
        ],
      },
      {
        id: 'encrypt-compliance',
        heading: 'Criptografia para equipes focadas em conformidade',
        level: 3,
        paragraphs: [
          'Regulamentos raramente exigem ferramenta PDF específica, mas pedem salvaguardas razoáveis para dados pessoais. Criptografia no cliente permite aplicar controles antes de dados cruzarem fronteiras jurisdicionais. Documente quais arquivos foram criptografados, qual canal de passphrase foi usado e retenha mestres sem criptografia só em cofres aprovados.',
          'Trilhas de auditoria ficam mais simples quando a criptografia ocorre em endpoints gerenciados: não há entrada de subprocessador terceiro para um locker PDF na nuvem usado às pressas no prazo.',
        ],
      },
    ],
    faq: [
      ...privacyFaq('pt'),
      {
        q: 'O PDFWINDOWS armazena minha senha?',
        a: 'Não. A senha existe só na memória do navegador durante a criptografia. Não registramos, transmitimos nem retemos passphrases em servidor.',
      },
      {
        q: 'Posso remover senha com esta ferramenta?',
        a: 'Esta ferramenta adiciona criptografia. Remover senha existente exige abrir o arquivo com a senha atual em editor completo — o PDFWINDOWS foca em proteger entradas sem criptografia.',
      },
      {
        q: 'E se eu esquecer a senha?',
        a: 'PDFs corretamente criptografados não são descriptografados sem a senha. Armazene passphrases em gerenciador ou registro seguro antes de distribuir.',
      },
      {
        q: 'A criptografia aumenta o tamanho do arquivo?',
        a: 'Levemente, por overhead de criptografia e metadados. A diferença costuma ser irrelevante frente ao conteúdo de imagem.',
      },
      {
        q: 'Posso criptografar PDFs já comprimidos?',
        a: 'Sim. Compressão e criptografia são operações independentes. Criptografar após comprimir é fluxo comum para anexos seguros prontos para e-mail.',
      },
    ],
    relatedTools: ['/pdf-watermark', '/pdf-merge', '/pdf-compress'],
    cta: defaultCta('pt', 'Proteger PDF com Senha'),
  },
  es: {
    title: 'Proteger PDF con Contraseña Online y Offline | PDFWINDOWS',
    description:
      'Añada cifrado PDF real en el navegador. Defina contraseña localmente antes de compartir documentos sensibles — compatible con Adobe Reader y Chrome, sin subida a la nube.',
    keywords:
      'proteger pdf contraseña, cifrar pdf offline, pdf seguro navegador, bloquear pdf gratis, contraseña pdf local',
    h1: 'Proteger PDF con Contraseña',
    intro:
      'Compartir un PDF confidencial por correo o Slack sin protección invita a reenvíos, indexación y exposición accidental. El cifrado PDF real — no solo una carpeta oculta — requiere escribir un diccionario de cifrado en el archivo para que los lectores exijan contraseña antes de renderizar páginas. PDFWINDOWS aplica ese cifrado enteramente en su navegador: usted define la contraseña en un modal local, el archivo se guarda con protección estándar del sector, y ni el documento ni la frase secreta tocan nuestros servidores.',
    toolName: 'Proteger PDF con Contraseña',
    benefits: [
      'Cifrado PDF estándar compatible con lectores principales',
      'La contraseña permanece solo en memoria del navegador al procesar',
      'Sin cuenta ni almacenamiento de credenciales en la nube',
      'Proteja antes de correo, USB o unidades compartidas',
      'Funciona sin conexión tras cargar la página',
    ],
    useCases: [
      {
        title: 'Distribución de RR. HH. y nóminas',
        body:
          'Recibos de sueldo, cartas de despido y resúmenes de beneficios contienen identificadores sensibles. Cifre cada PDF con contraseña específica o compartida antes del adjunto para que el acceso casual al buzón no exponga datos de ingresos.',
      },
      {
        title: 'Entregas a clientes legales',
        body:
          'Bufetes envían borradores, acuerdos y subconjuntos de discovery a clientes que reenvían adjuntos sin cuidado. La contraseña añade fricción: los destinatarios necesitan la frase por canal separado, reduciendo divulgación casual.',
      },
      {
        title: 'Estados financieros e impuestos',
        body:
          'Contadores intercambian formularios, extractos y paquetes de crédito en temporada fiscal. Cifrar localmente evita números de cuenta sin protección en registros de servidores de conversión — solo sale de su máquina el archivo protegido que elija enviar.',
      },
      {
        title: 'Formularios de salud y seguros',
        body:
          'Resúmenes de admisión y documentos de reclamación tienen expectativas estrictas de manejo. El cifrado en navegador permite proteger PDF salientes sin violar políticas que prohíben subir PHI a proveedores desconocidos.',
      },
      {
        title: 'Borradores de estrategia e IP interna',
        body:
          'Hojas de ruta y teasers de M&A filtran fácilmente sin control de acceso. Bloquee borradores antes de circular a liderazgo o junta para que portátiles perdidos y enlaces compartidos sean menos catastróficos.',
      },
    ],
    howItWorks: [
      'Suba el PDF que desea proteger.',
      'Elija proteger con contraseña e ingrese frase fuerte en el diálogo seguro.',
      'El navegador escribe metadatos de cifrado y guarda el archivo localmente.',
      'Descargue el PDF protegido y comparta la contraseña por canal seguro separado.',
    ],
    tips: [
      'Use frases largas con tipos de carácter variados — contraseñas cortas son vulnerables a fuerza bruta.',
      'Transmita contraseñas por teléfono, SMS o gestor de contraseñas — no en el mismo correo que el archivo.',
      'Guarde copia maestra sin cifrar en bóveda segura si editará después.',
      'Pruebe apertura en el mismo lector de sus destinatarios antes de distribución masiva.',
      'Cifre después de comprimir y marcar agua para no repetir trabajo en el archivo bloqueado.',
      'Documente recuperación — contraseñas perdidas significan contenido irrecuperable con cifrado adecuado.',
    ],
    sections: [
      {
        id: 'real-encryption',
        heading: 'Cifrado real frente a bloqueos superficiales',
        level: 2,
        paragraphs: [
          'Algunas herramientas solo restringen edición o impresión dejando contenido legible. PDFWINDOWS aplica cifrado por contraseña que bloquea visualización hasta la frase correcta en lectores compatibles. El archivo cifrado es un flujo binario nuevo; terceros sin contraseña no extraen texto de páginas de los bytes brutos en modelos de seguridad PDF estándar.',
          'El cifrado corre localmente con bibliotecas que implementan manejadores de seguridad PDF. Su contraseña se usa como material de clave al guardar y no se persiste en disco ni se transmite por red por PDFWINDOWS.',
        ],
      },
      {
        id: 'compatibility',
        heading: 'Compatibilidad con lectores y limitaciones',
        level: 2,
        paragraphs: [
          'Adobe Acrobat, Adobe Reader, Chrome y la mayoría de lectores empresariales abren archivos cifrados por PDFWINDOWS con la contraseña correcta. Visores muy antiguos pueden no soportar conjuntos de cifrado recientes — verifique en el entorno de su audiencia.',
        ],
        bullets: [
          'Los destinatarios necesitan lector PDF, no cuenta PDFWINDOWS.',
          'Impresión y copia pueden seguir permitidas según banderas de cifrado.',
          'Lectores de pantalla pueden exigir contraseña antes de leer en voz alta.',
        ],
      },
      {
        id: 'password-hygiene',
        heading: 'Higiene de contraseñas para equipos',
        level: 2,
        paragraphs: [
          'La política organizacional debe definir longitud mínima, rotación para envíos recurrentes y métodos aprobados de compartir fuera de banda. Evite reutilizar contraseñas de nómina en documentos no relacionados. Para paquetes críticos, considere contraseña única por destinatario aunque sea incómodo.',
        ],
      },
      {
        id: 'protect-workflow',
        heading: 'Dónde encaja la protección por contraseña',
        level: 2,
        paragraphs: [
          'Secuencia típica: unir páginas relacionadas, comprimir, añadir marca de agua de borrador y cifrar para envío externo. Las marcas desalientan capturas casuales; el cifrado desalienta apertura casual. Ambas combinan control en capas sin servicios en la nube.',
        ],
        bullets: [
          'Marca de agua — marque borradores antes de cifrar.',
          'Comprimir — reduzca carga cifrada para límites de correo.',
          'Unir — agrupe secciones en una entrega protegida.',
        ],
      },
      {
        id: 'encrypt-compliance',
        heading: 'Cifrado para equipos orientados al cumplimiento',
        level: 3,
        paragraphs: [
          'Las regulaciones rara vez exigen una herramienta PDF específica, pero sí salvaguardas razonables para datos personales. El cifrado en cliente permite aplicar controles antes de que datos crucen fronteras jurisdiccionales. Documente qué archivos se cifraron, qué canal de frase se usó y retenga maestros sin cifrar solo en bóvedas aprobadas.',
          'Las pistas de auditoría son más simples cuando el cifrado ocurre en endpoints gestionados: no hay entrada de subprocesador tercero por un locker PDF en la nube usado apurado ante un plazo.',
        ],
      },
    ],
    faq: [
      ...privacyFaq('es'),
      {
        q: '¿PDFWINDOWS guarda mi contraseña?',
        a: 'No. La contraseña existe solo en memoria del navegador mientras corre el cifrado. No registramos, transmitimos ni retenemos frases en servidor.',
      },
      {
        q: '¿Puedo quitar contraseña con esta herramienta?',
        a: 'Esta herramienta añade cifrado. Quitar contraseña existente requiere abrir el archivo con la contraseña actual en un editor completo — PDFWINDOWS se centra en proteger entradas sin cifrar.',
      },
      {
        q: '¿Qué pasa si olvido la contraseña?',
        a: 'Los PDF correctamente cifrados no se descifran sin contraseña. Guarde frases en gestor o registro seguro antes de distribuir.',
      },
      {
        q: '¿El cifrado aumenta el tamaño del archivo?',
        a: 'Ligeramente, por overhead de cifrado y metadatos. La diferencia suele ser irrelevante frente al contenido de imagen.',
      },
      {
        q: '¿Puedo cifrar PDF ya comprimidos?',
        a: 'Sí. Compresión y cifrado son operaciones independientes. Cifrar después de comprimir es flujo común para adjuntos seguros listos para correo.',
      },
    ],
    relatedTools: ['/pdf-watermark', '/pdf-merge', '/pdf-compress'],
    cta: defaultCta('es', 'Proteger PDF con Contraseña'),
  },
};
