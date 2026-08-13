import type { ToolRichContent } from '../types';
import { privacyFaq, defaultCta } from '../helpers';

export const REMOVER_RESTRICOES_CONTENT: Record<'en' | 'pt' | 'es', ToolRichContent> = {
  en: {
    title: 'Remove PDF & Word Restrictions Free | PDFWINDOWS',
    description:
      'Remove editing, copying, and printing restrictions from PDF and DOCX in your browser. Download a new copy locally—files never leave your device.',
    keywords:
      'remove pdf restrictions, unlock pdf for editing, pdf cannot copy text, remove word restrictions, unlock protected docx',
    h1: 'Remove PDF & Word Restrictions',
    intro:
      'Some documents open normally yet still block editing, copying, or printing. Those friction points usually come from PDF owner-permission flags or from structural locks stored inside a DOCX package — not from a missing open password. PDFWINDOWS Remove Restrictions detects removable protections, explains what was found, and writes a new copy in your browser so the original stays untouched. Processing is local: bytes and any intermediate structures remain in browser memory and are not uploaded to PDFWINDOWS servers. When a mechanism is unsupported or password-based in a way this tool cannot clear, we say so plainly instead of faking a successful unlock.',
    toolName: 'Remove Restrictions',
    benefits: [
      'Detects restrictions before changing anything',
      'Supports PDF permission flags and DOCX documentProtection nodes',
      'Never overwrites the original file — always a new download',
      'Explains when protection cannot be removed',
      'Runs entirely in the browser with no account required',
      'Separates permission cleanup from open-password unlocking',
    ],
    useCases: [
      {
        title: 'Office document recovery',
        body:
          'Clear accidental “read-only recommended” or edit locks embedded in Word files you own so teams can revise contracts, proposals, and SOPs without hunting for the original author machine.',
      },
      {
        title: 'PDF permission cleanup',
        body:
          'Produce a working copy of a PDF that opens freely but forbids print or copy flags. Useful when internal tooling rejects restricted inputs even though content is already visible on screen.',
      },
      {
        title: 'Internal workflow unblocking',
        body:
          'Prepare owned documents for editors, OCR pipelines, or merge tools that refuse restricted PDFs. Keep the restricted master for archival policy and work from the cleaned copy.',
      },
      {
        title: 'Legacy template modernization',
        body:
          'Older Word templates often carry stale protection settings after years of copy-paste. Strip structural locks locally before migrating content into a new template library.',
      },
      {
        title: 'Print-shop and compliance handoffs',
        body:
          'When a vendor needs to print or extract text from a file you control, remove obsolete permission flags in-browser rather than emailing the document to an unknown unlock service.',
      },
    ],
    howItWorks: [
      'Upload a PDF or DOCX you own or are authorized to modify.',
      'Review the restriction summary shown before any rewrite.',
      'Confirm removal when the protection type is supported.',
      'Download the new unrestricted copy to your device.',
      'Keep the original if you need an audit trail of the locked version.',
    ],
    tips: [
      'Open-password PDFs belong in Unlock PDF, not this tool — if the viewer asks for a password before showing pages, switch tools.',
      'Cloud ACLs (SharePoint, OneDrive, Google Drive permissions) live outside the file and cannot be removed here.',
      'Always keep the original for audit trails and rollback.',
      'After cleanup, re-check print and copy behavior in the same reader your teammates use.',
      'If Word still feels locked, confirm you are opening the new download, not the cached original.',
      'Combine with Password Protect PDF only when you intentionally want fresh encryption after cleanup.',
    ],
    sections: [
      {
        id: 'what-we-remove',
        heading: 'What can be removed locally',
        level: 2,
        paragraphs: [
          'For PDF, we attempt to rewrite the file without owner-permission restrictions when the document does not require an open password. That covers common “cannot print / cannot copy / cannot modify” flags that still allow viewing.',
          'For DOCX, we strip documentProtection and writeProtection nodes from word/settings.xml when they are stored in the package without unsupported crypto providers. The result is a new OOXML package you can open in Word or compatible editors.',
        ],
        bullets: [
          'PDF permission dictionaries rewritten into a new file',
          'DOCX structural protection nodes removed when present',
          'Original bytes left unchanged on disk',
        ],
      },
      {
        id: 'limits',
        heading: 'Honest limitations',
        level: 2,
        paragraphs: [
          'If no removable restriction exists, we say so. If a password-based or unsupported mechanism is detected, we explain that the protection could not be removed instead of faking success.',
          'IRM, Azure Information Protection, and similar enterprise wrappers are outside ordinary PDF/DOCX package flags. Those controls require the issuing organization’s tools and credentials.',
        ],
      },
      {
        id: 'pdf-vs-docx',
        heading: 'PDF permissions versus Word package locks',
        level: 2,
        paragraphs: [
          'PDF permissions are often independent of an open password: you can read every page yet still be blocked from selecting text or sending the file to a printer. Cleaning those flags produces a freer working copy for legitimate owners.',
          'Word locks may be stored as XML settings that discourage editing without encrypting the whole package. Removing those nodes is appropriate when you authored the protection or have authorization to restore editability.',
        ],
      },
      {
        id: 'privacy-local',
        heading: 'Local processing and privacy',
        level: 2,
        paragraphs: [
          'All detection and rewriting happens in your browser. PDFWINDOWS does not upload documents to remove restrictions, and we do not retain copies after you close the tab.',
          'That design fits teams handling HR packs, customer contracts, or unreleased product PDFs that must not land in a third-party conversion queue.',
        ],
        bullets: [
          'No account required to process files',
          'No server-side queue or batch retention',
          'You choose what to download and where to store it',
        ],
      },
      {
        id: 'choose-tool',
        heading: 'When to use Remove Restrictions vs Unlock PDF',
        level: 3,
        paragraphs: [
          'Use Remove Restrictions when the file already opens and the problem is editing, copying, or printing. Use Unlock PDF when pages are encrypted behind an open password you know, or when you need a dedicated unlock path that prompts for that passphrase.',
          'Both tools emphasize local browser processing and honest failure messages. Choosing the right entry point saves time and avoids confusing “could not unlock” errors on permission-only files.',
        ],
      },
    ],
    faq: [
      ...privacyFaq('en'),
      {
        q: 'Will this unlock a PDF I cannot open?',
        a: 'No. Use Unlock PDF when the viewer asks for a password before showing pages. This page focuses on permission restrictions and DOCX structural protection.',
      },
      {
        q: 'Does Remove Restrictions overwrite my original?',
        a: 'No. Successful runs produce a new download. Keep the original if your process requires an unchanged archival copy.',
      },
      {
        q: 'Can it remove SharePoint or OneDrive “read only” links?',
        a: 'Those are cloud access controls, not flags inside the file. Change sharing settings in the cloud platform; this tool only alters removable in-file restrictions.',
      },
      {
        q: 'What if the tool says no removable restriction was found?',
        a: 'The file may already be unrestricted, or it may use a protection type we cannot clear. Read the status message and try Unlock PDF if an open password is involved.',
      },
    ],
    relatedTools: ['/desbloquear-pdf', '/pdf-password', '/pdf-compress'],
    cta: defaultCta('en', 'Remove Restrictions'),
  },
  pt: {
    title: 'Remover Restrições de PDF e Word Grátis | PDFWINDOWS',
    description:
      'Remova restrições de edição, cópia e impressão de PDF e DOCX no navegador. Baixe uma nova cópia localmente—arquivos não saem do seu dispositivo.',
    keywords:
      'remover restrição pdf, desbloquear pdf para edição, pdf não permite copiar, remover restrições word, documento word protegido',
    h1: 'Remover Restrições de PDF e Word',
    intro:
      'Alguns documentos abrem normalmente e ainda assim bloqueiam edição, cópia ou impressão. Esses atritos costumam vir de flags de permissão do proprietário em PDF ou de bloqueios estruturais dentro de um pacote DOCX — não de uma senha de abertura ausente. O Remover Restrições do PDFWINDOWS detecta proteções removíveis, explica o que foi encontrado e grava uma nova cópia no navegador para o original permanecer intacto. O processamento é local: bytes e estruturas intermediárias ficam na memória do navegador e não são enviados aos servidores do PDFWINDOWS. Quando o mecanismo não é suportado ou depende de senha de um modo que esta ferramenta não pode limpar, dizemos isso com clareza em vez de fingir sucesso.',
    toolName: 'Remover Restrições',
    benefits: [
      'Detecta restrições antes de alterar qualquer coisa',
      'Suporta permissões PDF e nós documentProtection do DOCX',
      'Nunca sobrescreve o original — sempre um novo download',
      'Explica quando a proteção não pode ser removida',
      'Roda inteiramente no navegador, sem conta',
      'Separa limpeza de permissões do desbloqueio com senha de abertura',
    ],
    useCases: [
      {
        title: 'Recuperação de documentos de escritório',
        body:
          'Limpe bloqueios de edição ou “somente leitura recomendada” embutidos em arquivos Word que você possui para as equipes revisarem contratos, propostas e POPs sem depender da máquina do autor original.',
      },
      {
        title: 'Limpeza de permissões PDF',
        body:
          'Gere cópia útil de PDF que abre livremente, mas impede impressão ou cópia. Útil quando ferramentas internas rejeitam entradas restritas mesmo com o conteúdo já visível na tela.',
      },
      {
        title: 'Desbloqueio de fluxo interno',
        body:
          'Prepare documentos próprios para editores, OCR ou mesclagem que recusam PDF restrito. Guarde o mestre restrito para política de arquivo e trabalhe na cópia limpa.',
      },
      {
        title: 'Modernização de modelos legados',
        body:
          'Modelos Word antigos frequentemente carregam proteções obsoletas após anos de copiar e colar. Remova bloqueios estruturais localmente antes de migrar conteúdo para uma nova biblioteca de templates.',
      },
      {
        title: 'Entrega a gráficas e conformidade',
        body:
          'Quando um fornecedor precisa imprimir ou extrair texto de um arquivo sob seu controle, remova flags obsoletas no navegador em vez de enviar o documento a um serviço de desbloqueio desconhecido.',
      },
    ],
    howItWorks: [
      'Envie um PDF ou DOCX que você possui ou está autorizado a modificar.',
      'Revise o resumo de restrições mostrado antes de qualquer regravação.',
      'Confirme a remoção quando o tipo de proteção for suportado.',
      'Baixe a nova cópia sem restrições removíveis.',
      'Mantenha o original se precisar de trilha de auditoria da versão bloqueada.',
    ],
    tips: [
      'PDF com senha de abertura pertence à ferramenta Desbloquear PDF — se o leitor pedir senha antes de mostrar páginas, troque de ferramenta.',
      'ACLs de nuvem (SharePoint, OneDrive, Google Drive) ficam fora do arquivo e não são removidas aqui.',
      'Sempre mantenha o original para auditoria e rollback.',
      'Depois da limpeza, reteste impressão e cópia no mesmo leitor que sua equipe usa.',
      'Se o Word ainda parecer bloqueado, confirme que está abrindo o novo download, não o original em cache.',
      'Combine com Proteger PDF com Senha só quando quiser criptografia nova após a limpeza.',
    ],
    sections: [
      {
        id: 'what-we-remove',
        heading: 'O que pode ser removido localmente',
        level: 2,
        paragraphs: [
          'Em PDF, tentamos regravar o arquivo sem restrições de permissão do proprietário quando não há senha de abertura. Isso cobre flags comuns de “não imprimir / não copiar / não modificar” que ainda permitem visualizar.',
          'Em DOCX, removemos nós de documentProtection e writeProtection em word/settings.xml quando estão armazenados no pacote sem provedores de criptografia não suportados. O resultado é um novo pacote OOXML abrível no Word ou editores compatíveis.',
        ],
        bullets: [
          'Dicionários de permissão PDF reescritos em arquivo novo',
          'Nós de proteção estrutural DOCX removidos quando presentes',
          'Bytes originais intactos no disco',
        ],
      },
      {
        id: 'limits',
        heading: 'Limitações honestas',
        level: 2,
        paragraphs: [
          'Se não houver restrição removível, informamos. Se houver mecanismo com senha não suportado, explicamos a falha em vez de fingir sucesso.',
          'IRM, Azure Information Protection e wrappers corporativos semelhantes estão fora das flags ordinárias de PDF/DOCX. Esses controles exigem ferramentas e credenciais da organização emissora.',
        ],
      },
      {
        id: 'pdf-vs-docx',
        heading: 'Permissões PDF versus bloqueios de pacote Word',
        level: 2,
        paragraphs: [
          'Permissões PDF costumam ser independentes da senha de abertura: você lê todas as páginas e ainda assim não seleciona texto nem imprime. Limpar essas flags gera uma cópia de trabalho mais livre para donos legítimos.',
          'Bloqueios do Word podem ficar em configurações XML que desencorajam edição sem criptografar o pacote inteiro. Remover esses nós é adequado quando você criou a proteção ou tem autorização para restaurar a editabilidade.',
        ],
      },
      {
        id: 'privacy-local',
        heading: 'Processamento local e privacidade',
        level: 2,
        paragraphs: [
          'Toda detecção e regravação acontece no seu navegador. O PDFWINDOWS não faz upload de documentos para remover restrições e não retém cópias depois que você fecha a aba.',
          'Esse desenho serve equipes que lidam com pacotes de RH, contratos de clientes ou PDFs de produto não lançados que não podem cair em filas de conversão de terceiros.',
        ],
        bullets: [
          'Sem conta para processar arquivos',
          'Sem fila ou retenção no servidor',
          'Você escolhe o que baixar e onde guardar',
        ],
      },
      {
        id: 'choose-tool',
        heading: 'Quando usar Remover Restrições vs Desbloquear PDF',
        level: 3,
        paragraphs: [
          'Use Remover Restrições quando o arquivo já abre e o problema é editar, copiar ou imprimir. Use Desbloquear PDF quando as páginas estão criptografadas atrás de uma senha de abertura que você conhece, ou quando precisa do fluxo dedicado que solicita essa frase.',
          'Ambas enfatizam processamento local no navegador e mensagens honestas de falha. Escolher a entrada certa economiza tempo e evita erros confusos de “não foi possível desbloquear” em arquivos só de permissão.',
        ],
      },
    ],
    faq: [
      ...privacyFaq('pt'),
      {
        q: 'Desbloqueia PDF que nem abre?',
        a: 'Não. Use Desbloquear PDF quando o leitor pedir senha antes de mostrar as páginas. Esta página trata restrições de permissão e proteção estrutural de DOCX.',
      },
      {
        q: 'Remover Restrições sobrescreve o original?',
        a: 'Não. Execuções bem-sucedidas geram um novo download. Mantenha o original se o processo exigir cópia arquivística inalterada.',
      },
      {
        q: 'Remove “somente leitura” do SharePoint ou OneDrive?',
        a: 'Esses são controles de acesso na nuvem, não flags dentro do arquivo. Ajuste o compartilhamento na plataforma; esta ferramenta só altera restrições removíveis no arquivo.',
      },
      {
        q: 'E se a ferramenta disser que não há restrição removível?',
        a: 'O arquivo já pode estar sem restrições, ou usa proteção que não podemos limpar. Leia a mensagem de status e tente Desbloquear PDF se houver senha de abertura.',
      },
    ],
    relatedTools: ['/desbloquear-pdf', '/pdf-password', '/pdf-compress'],
    cta: defaultCta('pt', 'Remover Restrições'),
  },
  es: {
    title: 'Quitar Restricciones de PDF y Word Gratis | PDFWINDOWS',
    description:
      'Quite restricciones de edición, copia e impresión de PDF y DOCX en el navegador. Descargue una copia nueva localmente—los archivos no salen de su dispositivo.',
    keywords:
      'quitar restricción pdf, desbloquear pdf edición, pdf no permite copiar, quitar restricciones word, documento word protegido',
    h1: 'Quitar Restricciones de PDF y Word',
    intro:
      'Algunos documentos se abren con normalidad y aun así bloquean edición, copia o impresión. Esa fricción suele venir de flags de permiso del propietario en PDF o de bloqueos estructurales dentro de un paquete DOCX — no de una contraseña de apertura ausente. Quitar Restricciones de PDFWINDOWS detecta protecciones removibles, explica lo encontrado y escribe una copia nueva en el navegador para que el original quede intacto. El procesamiento es local: los bytes y las estructuras intermedias permanecen en la memoria del navegador y no se envían a servidores de PDFWINDOWS. Cuando el mecanismo no es compatible o depende de una contraseña de un modo que esta herramienta no puede limpiar, lo decimos con claridad en lugar de fingir éxito.',
    toolName: 'Quitar Restricciones',
    benefits: [
      'Detecta restricciones antes de cambiar nada',
      'Soporta permisos PDF y nodos documentProtection de DOCX',
      'Nunca sobrescribe el original — siempre una descarga nueva',
      'Explica cuándo no se puede quitar la protección',
      'Se ejecuta por completo en el navegador, sin cuenta',
      'Separa la limpieza de permisos del desbloqueo con contraseña de apertura',
    ],
    useCases: [
      {
        title: 'Recuperación de documentos de oficina',
        body:
          'Limpie bloqueos de edición o “solo lectura recomendada” incrustados en Word de su propiedad para que los equipos revisen contratos, propuestas y POPs sin depender del equipo del autor original.',
      },
      {
        title: 'Limpieza de permisos PDF',
        body:
          'Genere una copia útil de un PDF que abre libremente pero impide imprimir o copiar. Útil cuando herramientas internas rechazan entradas restringidas aunque el contenido ya sea visible en pantalla.',
      },
      {
        title: 'Desbloqueo de flujos internos',
        body:
          'Prepare documentos propios para editores, OCR o unión que rechazan PDF restringidos. Conserve el maestro restringido para archivo y trabaje con la copia limpia.',
      },
      {
        title: 'Modernización de plantillas heredadas',
        body:
          'Las plantillas Word antiguas suelen arrastrar protecciones obsoletas tras años de copiar y pegar. Quite bloqueos estructurales en local antes de migrar contenido a una nueva biblioteca de plantillas.',
      },
      {
        title: 'Entrega a imprentas y cumplimiento',
        body:
          'Cuando un proveedor necesita imprimir o extraer texto de un archivo bajo su control, quite flags obsoletas en el navegador en lugar de enviar el documento a un servicio de desbloqueo desconocido.',
      },
    ],
    howItWorks: [
      'Envíe un PDF o DOCX que posea o esté autorizado a modificar.',
      'Revise el resumen de restricciones mostrado antes de cualquier reescritura.',
      'Confirme la eliminación cuando el tipo de protección sea compatible.',
      'Descargue la copia nueva sin restricciones removibles.',
      'Conserve el original si necesita una pista de auditoría de la versión bloqueada.',
    ],
    tips: [
      'Los PDF con contraseña de apertura corresponden a Desbloquear PDF — si el visor pide clave antes de mostrar páginas, cambie de herramienta.',
      'Los ACL de nube (SharePoint, OneDrive, Google Drive) no están en el archivo y no se eliminan aquí.',
      'Conserve siempre el original para auditoría y rollback.',
      'Tras la limpieza, vuelva a probar impresión y copia en el mismo lector que usa su equipo.',
      'Si Word sigue pareciendo bloqueado, confirme que abre la descarga nueva y no el original en caché.',
      'Combine con Proteger PDF con Contraseña solo cuando quiera cifrado nuevo tras la limpieza.',
    ],
    sections: [
      {
        id: 'what-we-remove',
        heading: 'Qué se puede quitar localmente',
        level: 2,
        paragraphs: [
          'En PDF, intentamos reescribir el archivo sin restricciones de permiso del propietario cuando no hay contraseña de apertura. Eso cubre flags comunes de “no imprimir / no copiar / no modificar” que aún permiten ver el contenido.',
          'En DOCX, eliminamos nodos documentProtection y writeProtection en word/settings.xml cuando están en el paquete sin proveedores de cifrado no compatibles. El resultado es un paquete OOXML nuevo abrible en Word o editores compatibles.',
        ],
        bullets: [
          'Diccionarios de permiso PDF reescritos en un archivo nuevo',
          'Nodos de protección estructural DOCX eliminados cuando existen',
          'Bytes originales intactos en disco',
        ],
      },
      {
        id: 'limits',
        heading: 'Limitaciones honestas',
        level: 2,
        paragraphs: [
          'Si no hay restricción removible, lo indicamos. Si hay un mecanismo no compatible o basado en contraseña, explicamos el fallo en lugar de fingir éxito.',
          'IRM, Azure Information Protection y wrappers empresariales similares quedan fuera de las flags ordinarias de PDF/DOCX. Esos controles requieren herramientas y credenciales de la organización emisora.',
        ],
      },
      {
        id: 'pdf-vs-docx',
        heading: 'Permisos PDF versus bloqueos del paquete Word',
        level: 2,
        paragraphs: [
          'Los permisos PDF suelen ser independientes de la contraseña de apertura: usted lee todas las páginas y aun así no selecciona texto ni imprime. Limpiar esas flags genera una copia de trabajo más libre para propietarios legítimos.',
          'Los bloqueos de Word pueden vivir en ajustes XML que desalientan la edición sin cifrar todo el paquete. Quitar esos nodos es adecuado cuando usted creó la protección o tiene autorización para restaurar la editabilidad.',
        ],
      },
      {
        id: 'privacy-local',
        heading: 'Procesamiento local y privacidad',
        level: 2,
        paragraphs: [
          'Toda detección y reescritura ocurre en su navegador. PDFWINDOWS no sube documentos para quitar restricciones y no retiene copias después de cerrar la pestaña.',
          'Ese diseño sirve a equipos que manejan packs de RR. HH., contratos de clientes o PDF de producto no lanzados que no pueden caer en colas de conversión de terceros.',
        ],
        bullets: [
          'Sin cuenta para procesar archivos',
          'Sin cola ni retención en servidor',
          'Usted elige qué descargar y dónde guardarlo',
        ],
      },
      {
        id: 'choose-tool',
        heading: 'Cuándo usar Quitar Restricciones vs Desbloquear PDF',
        level: 3,
        paragraphs: [
          'Use Quitar Restricciones cuando el archivo ya se abre y el problema es editar, copiar o imprimir. Use Desbloquear PDF cuando las páginas están cifradas tras una contraseña de apertura que conoce, o cuando necesita el flujo dedicado que solicita esa frase.',
          'Ambas herramientas enfatizan el procesamiento local en el navegador y mensajes de fallo honestos. Elegir la entrada correcta ahorra tiempo y evita errores confusos de “no se pudo desbloquear” en archivos solo de permiso.',
        ],
      },
    ],
    faq: [
      ...privacyFaq('es'),
      {
        q: '¿Desbloquea un PDF que ni siquiera abre?',
        a: 'No. Use Desbloquear PDF cuando el visor pida contraseña antes de mostrar páginas. Esta página trata restricciones de permiso y protección estructural de DOCX.',
      },
      {
        q: '¿Quitar Restricciones sobrescribe el original?',
        a: 'No. Las ejecuciones correctas generan una descarga nueva. Conserve el original si el proceso exige una copia de archivo sin cambios.',
      },
      {
        q: '¿Quita el “solo lectura” de SharePoint o OneDrive?',
        a: 'Esos son controles de acceso en la nube, no flags dentro del archivo. Ajuste el uso compartido en la plataforma; esta herramienta solo altera restricciones removibles en el archivo.',
      },
      {
        q: '¿Y si la herramienta dice que no hay restricción removible?',
        a: 'El archivo puede estar ya sin restricciones, o usa una protección que no podemos limpiar. Lea el mensaje de estado e intente Desbloquear PDF si hay contraseña de apertura.',
      },
    ],
    relatedTools: ['/desbloquear-pdf', '/pdf-password', '/pdf-compress'],
    cta: defaultCta('es', 'Quitar Restricciones'),
  },
};
