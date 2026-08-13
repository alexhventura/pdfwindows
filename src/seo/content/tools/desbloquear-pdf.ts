import type { ToolRichContent } from '../types';
import { privacyFaq, defaultCta } from '../helpers';

export const DESBLOQUEAR_PDF_CONTENT: Record<'en' | 'pt' | 'es', ToolRichContent> = {
  en: {
    title: 'Unlock PDF Online Free | PDFWINDOWS',
    description:
      'Unlock a protected PDF in your browser and download a new copy. Enter the open password when required—processing stays local with zero cloud upload.',
    keywords:
      'unlock pdf, remove pdf password, open protected pdf, unlock pdf free, locked pdf, remove pdf protection',
    h1: 'Unlock PDF',
    intro:
      'Locked PDFs slow down editing, OCR, merging, and everyday sharing. PDFWINDOWS Unlock PDF helps you produce a new unprotected copy entirely in your browser. Permission-only locks — files that open but block print or copy — can often be rewritten locally without a passphrase. Files that require an open password ask for that password in a local dialog; the passphrase and PDF bytes stay in browser memory and are never uploaded to PDFWINDOWS servers. When encryption cannot be removed, we report failure honestly instead of claiming a false unlock. The download is always a new file so your original remains available for archival or legal hold.',
    toolName: 'Unlock PDF',
    benefits: [
      'Simple upload → unlock → download flow in the browser',
      'Password prompt when an open passphrase is legitimately required',
      'Clear status when unlock is impossible',
      'Always downloads a new file — original stays intact',
      'Handles permission restrictions on files that already open',
      'No account and no cloud retention of documents or passwords',
    ],
    useCases: [
      {
        title: 'Remove open passwords you know',
        body:
          'Create an unprotected working copy after entering the legitimate password for editing workflows, redlines, or internal archives where the passphrase was only needed in transit.',
      },
      {
        title: 'Strip permission locks',
        body:
          'Rewrite PDFs that open freely but carry print, copy, or modify restrictions that break downstream tools. Keep the restricted master if policy requires it.',
      },
      {
        title: 'Prepare files for internal tools',
        body:
          'Feed OCR, merge, compress, or e-sign pipelines that reject encrypted inputs. Unlock locally first so sensitive pages never sit on a vendor unlock queue.',
      },
      {
        title: 'Recover owned archives after staff turnover',
        body:
          'When a teammate leaves and shared passwords are documented, unlock departmental PDFs into a controlled store so operations continue without rediscovering forgotten encryption later.',
      },
      {
        title: 'Client deliverable rework',
        body:
          'Agencies often receive password-protected drafts from clients. With the provided passphrase, produce an editable unlocked copy for markup without uploading to an unknown third party.',
      },
    ],
    howItWorks: [
      'Select the PDF you are authorized to unlock.',
      'Enter the open password if the tool requests it.',
      'Wait for local unlocking and rewrite in the browser.',
      'Download the unlocked PDF copy to your device.',
      'Verify pages open in your usual reader before deleting the protected original.',
    ],
    tips: [
      'We never claim success if encryption could not be removed — read the status message carefully.',
      'When binary rewrite is not possible we rebuild pages locally (adaptive quality + searchable text when available) and disclose that method.',
      'Forgotten passwords cannot be recovered by this tool; store passphrases in a password manager.',
      'Use Remove Restrictions when the file already opens and you only need permission cleanup.',
      'Unlock before OCR or merge steps that fail on encrypted inputs.',
      'Re-apply Password Protect PDF later if the unlocked copy must be re-secured for external send.',
    ],
    sections: [
      {
        id: 'password-vs-permissions',
        heading: 'Open password versus permission restrictions',
        level: 2,
        paragraphs: [
          'An open password encrypts page content until the correct passphrase is supplied. Without it, compliant readers show a password dialog instead of pages. Unlock PDF requires that legitimate passphrase to produce a readable unprotected copy.',
          'Permission restrictions may allow viewing while blocking print, copy, or modify. Those flags can often be cleared locally even when no open password is set. Unlock PDF handles both cases with messaging that distinguishes “needs password” from “permission-only”.',
        ],
        bullets: [
          'Open password = content encrypted until unlocked',
          'Permission flags = viewable but action-limited',
          'Wrong tool choice wastes time — match the symptom',
        ],
      },
      {
        id: 'privacy',
        heading: 'Local processing and password handling',
        level: 2,
        paragraphs: [
          'Passwords and PDF bytes stay in browser memory during processing. PDFWINDOWS does not upload documents to unlock them and does not log passphrases on any server.',
          'Close the tab when finished if you share a workstation. Clear downloads according to your organization’s data-handling policy for unlocked copies that become more sensitive once protection is gone.',
        ],
      },
      {
        id: 'honest-limits',
        heading: 'What Unlock PDF will not do',
        level: 2,
        paragraphs: [
          'We do not crack, guess, or brute-force unknown passwords. Removing open encryption without the passphrase would be unauthorized access; this product is built for owners and authorized operators who already know the key.',
          'Some enterprise DRM wrappers and proprietary protection schemes sit outside standard PDF security handlers. When we cannot remove protection, the UI states that clearly so you can escalate to the issuer’s tools.',
        ],
      },
      {
        id: 'workflow-fit',
        heading: 'Where unlocking fits your PDF workflow',
        level: 2,
        paragraphs: [
          'Typical sequence for owned files: unlock → compress or OCR → edit or merge → optionally re-protect with a new password before external distribution. Doing unlock first prevents cascading failures in later steps.',
          'Pair Unlock PDF with Remove Restrictions when you are unsure whether the blocker is a password or a permission flag. Start with the tool that matches how the file behaves in your reader.',
        ],
        bullets: [
          'Cannot open pages → Unlock PDF with the known password',
          'Opens but cannot print/copy → Unlock PDF or Remove Restrictions',
          'Need fresh encryption afterward → Password Protect PDF',
        ],
      },
      {
        id: 'compliance-note',
        heading: 'Authorization and compliance notes',
        level: 3,
        paragraphs: [
          'Only unlock documents you own or are explicitly authorized to modify. Corporate records programs often require retaining an encrypted archival copy alongside any unlocked working file.',
          'Because processing is local in the browser, you avoid adding a cloud unlock vendor to your subprocessors list for routine internal unlocks — useful for privacy reviews and vendor risk questionnaires.',
        ],
      },
    ],
    faq: [
      ...privacyFaq('en'),
      {
        q: 'Can you unlock a PDF without the password?',
        a: 'No. Removing an open password requires the legitimate passphrase. Without it we only address permission restrictions on files that already open.',
      },
      {
        q: 'Does Unlock PDF upload my file or password?',
        a: 'No. Unlocking runs in your browser. Passwords and document bytes are not sent to PDFWINDOWS servers.',
      },
      {
        q: 'Will the unlocked file overwrite the original?',
        a: 'No. You download a new copy. Keep the protected original if your policy requires an unchanged archive.',
      },
      {
        q: 'What if unlock fails?',
        a: 'Wrong passwords, unsupported DRM, or damaged files can prevent unlock. The tool reports failure instead of producing a broken “success” download.',
      },
    ],
    relatedTools: ['/remover-restricoes', '/pdf-password', '/pdf-compress'],
    cta: defaultCta('en', 'Unlock PDF'),
  },
  pt: {
    title: 'Desbloquear PDF Online Grátis | PDFWINDOWS',
    description:
      'Desbloqueie um PDF protegido no navegador e baixe uma nova cópia. Informe a senha de abertura quando necessário—processamento local, sem upload na nuvem.',
    keywords:
      'desbloquear pdf, remover senha pdf, tirar senha do pdf, pdf protegido, pdf bloqueado, desbloquear pdf gratis',
    h1: 'Desbloquear PDF',
    intro:
      'PDFs bloqueados atrasam edição, OCR, mesclagem e compartilhamento do dia a dia. O Desbloquear PDF do PDFWINDOWS gera uma nova cópia sem proteção inteiramente no navegador. Bloqueios só de permissão — arquivos que abrem, mas impedem impressão ou cópia — costumam ser regravados localmente sem frase-senha. Arquivos com senha de abertura pedem essa senha em um diálogo local; a frase e os bytes do PDF ficam na memória do navegador e nunca são enviados aos servidores do PDFWINDOWS. Quando a criptografia não pode ser removida, reportamos a falha com honestidade em vez de alegar desbloqueio falso. O download é sempre um arquivo novo para o original permanecer disponível para arquivo ou retenção legal.',
    toolName: 'Desbloquear PDF',
    benefits: [
      'Fluxo simples enviar → desbloquear → baixar no navegador',
      'Campo de senha quando a frase de abertura for legítima',
      'Status claro quando não for possível desbloquear',
      'Sempre gera arquivo novo — original intacto',
      'Trata restrições de permissão em arquivos que já abrem',
      'Sem conta e sem retenção na nuvem de documentos ou senhas',
    ],
    useCases: [
      {
        title: 'Remover senha que você conhece',
        body:
          'Crie cópia de trabalho sem proteção após informar a senha legítima para edição, revisões ou arquivos internos em que a frase só era necessária no trânsito.',
      },
      {
        title: 'Tirar restrições de permissão',
        body:
          'Regrave PDFs que abrem livremente, mas carregam restrições de impressão, cópia ou modificação que quebram ferramentas seguintes. Mantenha o mestre restrito se a política exigir.',
      },
      {
        title: 'Preparar para outras ferramentas',
        body:
          'Alimente OCR, mesclagem, compressão ou assinatura que rejeitam entradas criptografadas. Desbloqueie localmente primeiro para páginas sensíveis não ficarem em fila de fornecedor.',
      },
      {
        title: 'Arquivos departamentais após turnover',
        body:
          'Quando um colega sai e as senhas compartilhadas estão documentadas, desbloqueie PDFs do time em um repositório controlado para a operação continuar sem redescobrir criptografia esquecida depois.',
      },
      {
        title: 'Retrabalho de entregas de clientes',
        body:
          'Agências frequentemente recebem rascunhos com senha. Com a frase fornecida, produza cópia desbloqueada para markup sem enviar a um terceiro desconhecido.',
      },
    ],
    howItWorks: [
      'Selecione o PDF que você está autorizado a desbloquear.',
      'Informe a senha de abertura se a ferramenta solicitar.',
      'Aguarde o desbloqueio e a regravação locais no navegador.',
      'Baixe a cópia desbloqueada para o seu dispositivo.',
      'Confirme que as páginas abrem no leitor habitual antes de excluir o original protegido.',
    ],
    tips: [
      'Nunca afirmamos sucesso se a criptografia não pôde ser removida — leia o status com atenção.',
      'Quando a regravação binária não for possível, reconstruímos páginas localmente (qualidade adaptativa + texto pesquisável quando houver) e divulgamos o método.',
      'Senhas esquecidas não são recuperáveis aqui; guarde frases em um gerenciador de senhas.',
      'Use Remover Restrições quando o arquivo já abre e você só precisa limpar permissões.',
      'Desbloqueie antes de OCR ou mesclagem que falham com entradas criptografadas.',
      'Reaplique Proteger PDF com Senha depois se a cópia desbloqueada precisar ser reprotegida para envio externo.',
    ],
    sections: [
      {
        id: 'password-vs-permissions',
        heading: 'Senha de abertura versus restrições de permissão',
        level: 2,
        paragraphs: [
          'A senha de abertura criptografa o conteúdo das páginas até a frase correta. Sem ela, leitores compatíveis mostram diálogo de senha em vez das páginas. O Desbloquear PDF exige essa frase legítima para gerar cópia legível sem proteção.',
          'Restrições de permissão podem permitir visualizar e ainda bloquear impressão, cópia ou modificação. Essas flags frequentemente podem ser limpas localmente mesmo sem senha de abertura. Tratamos os dois casos com mensagens que distinguem “precisa de senha” de “somente permissão”.',
        ],
        bullets: [
          'Senha de abertura = conteúdo criptografado até desbloquear',
          'Flags de permissão = visível, mas com ações limitadas',
          'Escolher a ferramenta certa evita perda de tempo',
        ],
      },
      {
        id: 'privacy',
        heading: 'Processamento local e tratamento de senha',
        level: 2,
        paragraphs: [
          'Senhas e bytes do PDF ficam na memória do navegador durante o processamento. O PDFWINDOWS não faz upload para desbloquear e não registra frases-senha em nenhum servidor.',
          'Feche a aba ao terminar se compartilhar a estação. Trate downloads desbloqueados conforme a política da organização — a cópia fica mais sensível depois que a proteção sai.',
        ],
      },
      {
        id: 'honest-limits',
        heading: 'O que o Desbloquear PDF não faz',
        level: 2,
        paragraphs: [
          'Não quebramos, adivinhamos nem forçamos senhas desconhecidas. Remover criptografia de abertura sem a frase seria acesso não autorizado; o produto é para donos e operadores autorizados que já conhecem a chave.',
          'Alguns wrappers DRM empresariais e esquemas proprietários ficam fora dos handlers padrão de segurança PDF. Quando não podemos remover a proteção, a interface deixa isso claro para você escalar às ferramentas do emissor.',
        ],
      },
      {
        id: 'workflow-fit',
        heading: 'Onde o desbloqueio entra no fluxo de PDF',
        level: 2,
        paragraphs: [
          'Sequência típica para arquivos próprios: desbloquear → comprimir ou OCR → editar ou mesclar → opcionalmente reproteger com senha nova antes da distribuição externa. Desbloquear primeiro evita falhas em cascata.',
          'Combine Desbloquear PDF com Remover Restrições quando não tiver certeza se o bloqueio é senha ou flag de permissão. Comece pela ferramenta que combina com o comportamento no seu leitor.',
        ],
        bullets: [
          'Não abre páginas → Desbloquear PDF com a senha conhecida',
          'Abre mas não imprime/copia → Desbloquear PDF ou Remover Restrições',
          'Precisa de criptografia nova depois → Proteger PDF com Senha',
        ],
      },
      {
        id: 'compliance-note',
        heading: 'Notas de autorização e conformidade',
        level: 3,
        paragraphs: [
          'Desbloqueie apenas documentos que você possui ou está explicitamente autorizado a modificar. Programas de registros corporativos frequentemente exigem manter cópia criptografada de arquivo junto à cópia de trabalho desbloqueada.',
          'Como o processamento é local no navegador, você evita adicionar um fornecedor de desbloqueio na nuvem à lista de subprocessadores para desbloqueios internos rotineiros — útil em revisões de privacidade e questionários de risco.',
        ],
      },
    ],
    faq: [
      ...privacyFaq('pt'),
      {
        q: 'Dá para desbloquear sem a senha?',
        a: 'Não. Remover senha de abertura exige a senha legítima. Sem ela, só tratamos restrições em arquivos que já abrem.',
      },
      {
        q: 'O Desbloquear PDF faz upload do arquivo ou da senha?',
        a: 'Não. O desbloqueio roda no navegador. Senhas e bytes do documento não são enviados aos servidores do PDFWINDOWS.',
      },
      {
        q: 'O arquivo desbloqueado sobrescreve o original?',
        a: 'Não. Você baixa uma nova cópia. Mantenha o original protegido se a política exigir arquivo inalterado.',
      },
      {
        q: 'E se o desbloqueio falhar?',
        a: 'Senha errada, DRM não suportado ou arquivo danificado podem impedir o desbloqueio. A ferramenta reporta falha em vez de gerar um download “bem-sucedido” quebrado.',
      },
    ],
    relatedTools: ['/remover-restricoes', '/pdf-password', '/pdf-compress'],
    cta: defaultCta('pt', 'Desbloquear PDF'),
  },
  es: {
    title: 'Desbloquear PDF Online Gratis | PDFWINDOWS',
    description:
      'Desbloquee un PDF protegido en el navegador y descargue una copia nueva. Indique la contraseña si hace falta—procesamiento local, sin subida a la nube.',
    keywords:
      'desbloquear pdf, quitar contraseña pdf, pdf protegido, pdf bloqueado, desbloquear pdf gratis',
    h1: 'Desbloquear PDF',
    intro:
      'Los PDF bloqueados retrasan la edición, el OCR, la unión y el uso compartido diario. Desbloquear PDF de PDFWINDOWS genera una copia nueva sin protección por completo en el navegador. Los bloqueos solo de permiso — archivos que abren pero impiden imprimir o copiar — suelen reescribirse localmente sin frase contraseña. Los archivos con contraseña de apertura piden esa clave en un diálogo local; la frase y los bytes del PDF permanecen en la memoria del navegador y nunca se envían a servidores de PDFWINDOWS. Cuando el cifrado no puede eliminarse, informamos el fallo con honestidad en lugar de afirmar un desbloqueo falso. La descarga siempre es un archivo nuevo para que el original siga disponible para archivo o retención legal.',
    toolName: 'Desbloquear PDF',
    benefits: [
      'Flujo simple enviar → desbloquear → descargar en el navegador',
      'Campo de contraseña cuando la frase de apertura es legítima',
      'Estado claro cuando no es posible desbloquear',
      'Siempre genera un archivo nuevo — original intacto',
      'Trata restricciones de permiso en archivos que ya se abren',
      'Sin cuenta y sin retención en la nube de documentos o contraseñas',
    ],
    useCases: [
      {
        title: 'Quitar una contraseña que conoce',
        body:
          'Cree una copia de trabajo sin protección tras indicar la clave legítima para edición, revisiones o archivos internos donde la frase solo era necesaria en tránsito.',
      },
      {
        title: 'Eliminar restricciones de permiso',
        body:
          'Reescriba PDF que abren libremente pero llevan restricciones de impresión, copia o modificación que rompen herramientas posteriores. Conserve el maestro restringido si la política lo exige.',
      },
      {
        title: 'Preparar para otras herramientas',
        body:
          'Alimente OCR, unión, compresión o firma que rechazan entradas cifradas. Desbloquee en local primero para que páginas sensibles no queden en una cola de proveedor.',
      },
      {
        title: 'Archivos departamentales tras rotación de personal',
        body:
          'Cuando un compañero se va y las contraseñas compartidas están documentadas, desbloquee PDF del equipo en un almacén controlado para que la operación continúe sin redescubrir cifrado olvidado después.',
      },
      {
        title: 'Retrabajo de entregas de clientes',
        body:
          'Las agencias suelen recibir borradores con contraseña. Con la frase facilitada, produzca una copia desbloqueada para markup sin subirla a un tercero desconocido.',
      },
    ],
    howItWorks: [
      'Seleccione el PDF que está autorizado a desbloquear.',
      'Indique la contraseña de apertura si la herramienta la solicita.',
      'Espere el desbloqueo y la reescritura locales en el navegador.',
      'Descargue la copia desbloqueada a su dispositivo.',
      'Verifique que las páginas abren en su lector habitual antes de eliminar el original protegido.',
    ],
    tips: [
      'Nunca afirmamos éxito si el cifrado no pudo eliminarse — lea el estado con atención.',
      'Cuando la reescritura binaria no sea posible, reconstruimos páginas en local (calidad adaptativa + texto buscable si existe) e indicamos el método.',
      'Las contraseñas olvidadas no se recuperan aquí; guarde frases en un gestor de contraseñas.',
      'Use Quitar Restricciones cuando el archivo ya se abre y solo necesita limpiar permisos.',
      'Desbloquee antes de OCR o unión que fallan con entradas cifradas.',
      'Vuelva a aplicar Proteger PDF con Contraseña después si la copia desbloqueada debe reasegurarse para envío externo.',
    ],
    sections: [
      {
        id: 'password-vs-permissions',
        heading: 'Contraseña de apertura versus restricciones de permiso',
        level: 2,
        paragraphs: [
          'La contraseña de apertura cifra el contenido de las páginas hasta la frase correcta. Sin ella, los lectores compatibles muestran un diálogo de contraseña en lugar de las páginas. Desbloquear PDF exige esa frase legítima para generar una copia legible sin protección.',
          'Las restricciones de permiso pueden permitir ver y aun así bloquear imprimir, copiar o modificar. Esas flags a menudo pueden limpiarse en local aunque no haya contraseña de apertura. Tratamos ambos casos con mensajes que distinguen “necesita contraseña” de “solo permiso”.',
        ],
        bullets: [
          'Contraseña de apertura = contenido cifrado hasta desbloquear',
          'Flags de permiso = visible pero con acciones limitadas',
          'Elegir la herramienta correcta evita perder tiempo',
        ],
      },
      {
        id: 'privacy',
        heading: 'Procesamiento local y manejo de contraseñas',
        level: 2,
        paragraphs: [
          'Las contraseñas y los bytes del PDF permanecen en la memoria del navegador durante el procesamiento. PDFWINDOWS no sube documentos para desbloquearlos y no registra frases contraseña en ningún servidor.',
          'Cierre la pestaña al terminar si comparte el puesto. Gestione las descargas desbloqueadas según la política de su organización — la copia se vuelve más sensible cuando desaparece la protección.',
        ],
      },
      {
        id: 'honest-limits',
        heading: 'Lo que Desbloquear PDF no hace',
        level: 2,
        paragraphs: [
          'No rompemos, adivinamos ni forzamos contraseñas desconocidas. Quitar el cifrado de apertura sin la frase sería acceso no autorizado; el producto es para propietarios y operadores autorizados que ya conocen la clave.',
          'Algunos wrappers DRM empresariales y esquemas propietarios quedan fuera de los handlers estándar de seguridad PDF. Cuando no podemos quitar la protección, la interfaz lo deja claro para que escale a las herramientas del emisor.',
        ],
      },
      {
        id: 'workflow-fit',
        heading: 'Dónde encaja el desbloqueo en su flujo de PDF',
        level: 2,
        paragraphs: [
          'Secuencia típica para archivos propios: desbloquear → comprimir u OCR → editar o unir → opcionalmente volver a proteger con una contraseña nueva antes de la distribución externa. Desbloquear primero evita fallos en cascada.',
          'Combine Desbloquear PDF con Quitar Restricciones cuando no esté seguro de si el bloqueo es contraseña o flag de permiso. Empiece por la herramienta que coincida con el comportamiento en su lector.',
        ],
        bullets: [
          'No abre páginas → Desbloquear PDF con la contraseña conocida',
          'Abre pero no imprime/copia → Desbloquear PDF o Quitar Restricciones',
          'Necesita cifrado nuevo después → Proteger PDF con Contraseña',
        ],
      },
      {
        id: 'compliance-note',
        heading: 'Notas de autorización y cumplimiento',
        level: 3,
        paragraphs: [
          'Desbloquee solo documentos que posea o esté explícitamente autorizado a modificar. Los programas de registros corporativos suelen exigir conservar una copia cifrada de archivo junto a cualquier copia de trabajo desbloqueada.',
          'Como el procesamiento es local en el navegador, evita añadir un proveedor de desbloqueo en la nube a su lista de subprocesadores para desbloqueos internos rutinarios — útil en revisiones de privacidad y cuestionarios de riesgo.',
        ],
      },
    ],
    faq: [
      ...privacyFaq('es'),
      {
        q: '¿Se puede desbloquear sin la contraseña?',
        a: 'No. Quitar la contraseña de apertura exige la clave legítima. Sin ella solo tratamos restricciones en archivos que ya se abren.',
      },
      {
        q: '¿Desbloquear PDF sube mi archivo o contraseña?',
        a: 'No. El desbloqueo se ejecuta en el navegador. Las contraseñas y los bytes del documento no se envían a servidores de PDFWINDOWS.',
      },
      {
        q: '¿El archivo desbloqueado sobrescribe el original?',
        a: 'No. Descarga una copia nueva. Conserve el original protegido si su política exige un archivo sin cambios.',
      },
      {
        q: '¿Y si el desbloqueo falla?',
        a: 'Contraseña incorrecta, DRM no compatible o archivo dañado pueden impedir el desbloqueo. La herramienta informa el fallo en lugar de producir una descarga “exitosa” rota.',
      },
    ],
    relatedTools: ['/remover-restricoes', '/pdf-password', '/pdf-compress'],
    cta: defaultCta('es', 'Desbloquear PDF'),
  },
};
