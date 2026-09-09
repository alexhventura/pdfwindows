import type { ToolRichContent } from '../types';
import { privacyFaq, defaultCta } from '../helpers';

export const VALIDAR_CPF_CNPJ_CONTENT: Record<'en' | 'pt' | 'es', ToolRichContent> = {
  en: {
    title: 'CPF and CNPJ Validator (Local) | PDFWINDOWS',
    description:
      'Validate CPF, CNPJ, PIS/PASEP and card numbers by check digit and Luhn, with automatic type detection, in your browser.',
    keywords: 'cpf cnpj validator, verify cpf online, check digit validator, luhn card checker, validate brazil document',
    h1: 'CPF and CNPJ Validator',
    intro:
      'The PDFWINDOWS Validator checks whether a CPF, CNPJ, PIS/PASEP or card number is well-formed, entirely in your browser. Paste a value and it detects the type from the number of digits, then verifies the check digit — or the Luhn checksum for cards — and shows an instant valid or invalid result. It is a quick way to confirm that a document number is internally consistent before you rely on it, without sending anything to a server.',
    toolName: 'Document Validator',
    benefits: [
      'Automatic type detection by digit count',
      'Checks CPF, CNPJ and PIS/PASEP check digits',
      'Checks card numbers with the Luhn algorithm',
      'Instant result — runs 100% in the browser',
      'No registration, API key or rate limits',
    ],
    useCases: [
      {
        title: 'Quick manual verification',
        body: 'Support and operations staff paste a customer-provided number to confirm it is well-formed before entering it into a system, catching typos early without exposing the value to any server.',
      },
      {
        title: 'Debugging failed submissions',
        body: 'Developers verify whether a value that a form rejected actually has a bad check digit or whether the bug is in their own validation code.',
      },
      {
        title: 'Cleaning imported data',
        body: 'Analysts spot-check numbers from a spreadsheet import to decide whether a batch needs correction before loading it into a database.',
      },
      {
        title: 'Teaching check-digit algorithms',
        body: 'Instructors demonstrate how CPF, CNPJ and Luhn checks accept correct numbers and reject tampered ones, using a live tool in class.',
      },
      {
        title: 'Validating generated test data',
        body: 'QA engineers confirm that numbers produced by the PDFWINDOWS generators pass validation exactly as expected before using them in fixtures.',
      },
    ],
    howItWorks: [
      'Paste or type a number into the field.',
      'The tool detects the type by its digit count.',
      'It checks the verification digit or Luhn checksum.',
      'Read the instant valid or invalid result.',
    ],
    tips: [
      'A valid result means the number is internally consistent, not that it exists in an official registry.',
      'Eleven digits are checked as a CPF and, if that fails, as a PIS/PASEP.',
      'Fourteen digits are checked as a CNPJ; thirteen to nineteen digits are checked with Luhn as a card.',
      'Formatting characters like dots, slashes and hyphens are ignored automatically.',
      'Pair with the generators to confirm your test data validates before committing fixtures.',
      'Never paste real sensitive numbers into untrusted tools — this one keeps everything local.',
    ],
    sections: [
      {
        id: 'what-it-checks',
        heading: 'What the validator actually checks',
        level: 2,
        paragraphs: [
          'Every one of these identifiers ends with one or more check digits computed from the preceding digits. The validator recomputes those digits and compares them to what you entered, which catches typos, transpositions and fabricated numbers.',
          'It does not contact any government or card network. A valid result means the number is mathematically consistent; confirming that it actually exists and is active requires an official lookup that this tool does not perform.',
        ],
      },
      {
        id: 'type-detection',
        heading: 'How type detection works',
        level: 2,
        paragraphs: [
          'The tool strips non-digit characters and looks at the length. Eleven digits are treated as a CPF first and, if the CPF check fails, as a PIS/PASEP, because both use eleven digits with different algorithms.',
          'Fourteen digits are treated as a CNPJ. Thirteen to nineteen digits are treated as a payment card and validated with the Luhn checksum, which is the same length range real card numbers occupy.',
          'This automatic detection means you can paste almost any of these identifiers without choosing a type first.',
        ],
      },
      {
        id: 'privacy',
        heading: 'Local and private by design',
        level: 2,
        paragraphs: [
          'Validation runs entirely in your browser. The number you paste never leaves your device, is never logged, and is not stored after you close the page.',
          'That makes the tool safe for checking sensitive identifiers, unlike online validators that transmit the value to a server to perform the check.',
        ],
      },
      {
        id: 'workflow',
        heading: 'Fitting into your workflow',
        level: 2,
        paragraphs: [
          'Use the validator alongside the PDFWINDOWS generators: generate a synthetic CPF, CNPJ or card, paste it here, and confirm it validates before dropping it into a fixture or demo.',
          'When a user reports that a form wrongly rejected their document, paste the value to determine whether the number is genuinely malformed or whether your validation logic has a bug.',
          'For data-cleaning tasks, quickly triage a handful of suspicious rows to decide whether a whole import needs reprocessing before it reaches your database.',
        ],
      },
    ],
    faq: [
      ...privacyFaq('en'),
      {
        q: 'Does a valid result mean the document exists?',
        a: 'No. It only means the check digit or Luhn checksum is correct. It does not query any official registry.',
      },
      {
        q: 'Which types are supported?',
        a: 'CPF, CNPJ and PIS/PASEP by check digit, and payment cards by the Luhn algorithm, detected automatically by length.',
      },
      {
        q: 'Do I need to remove dots and hyphens?',
        a: 'No. Formatting characters are ignored automatically before validation.',
      },
      {
        q: 'Is the number I paste sent anywhere?',
        a: 'No. Validation runs entirely in your browser and nothing is uploaded or logged.',
      },
    ],
    relatedTools: ['/gerador-cpf', '/gerador-cnpj', '/gerador-cartao-teste', '/limpador-codigo'],
    cta: defaultCta('en', 'Document Validator'),
  },
  pt: {
    title: 'Validador de CPF e CNPJ (Local) | PDFWINDOWS',
    description:
      'Valide CPF, CNPJ, PIS/PASEP e números de cartão por dígito verificador e Luhn, com detecção automática, no navegador.',
    keywords: 'validador cpf cnpj, verificar cpf online, validar digito verificador, checar cartao luhn, validar documento brasil',
    h1: 'Validador de CPF e CNPJ',
    intro:
      'O Validador do PDFWINDOWS verifica se um CPF, CNPJ, PIS/PASEP ou número de cartão está bem formado, inteiramente no navegador. Cole um valor e ele detecta o tipo pelo número de dígitos, depois confere o dígito verificador — ou o checksum de Luhn, para cartões — e mostra um resultado válido ou inválido na hora. É um jeito rápido de confirmar que um número de documento é internamente consistente antes de confiar nele, sem enviar nada a um servidor.',
    toolName: 'Validador de Documentos',
    benefits: [
      'Detecção automática do tipo pela quantidade de dígitos',
      'Confere dígitos verificadores de CPF, CNPJ e PIS/PASEP',
      'Confere números de cartão com o algoritmo de Luhn',
      'Resultado na hora — roda 100% no navegador',
      'Sem cadastro, chave de API ou limites',
    ],
    useCases: [
      {
        title: 'Verificação manual rápida',
        body: 'Equipes de suporte e operações colam um número informado pelo cliente para confirmar que está bem formado antes de inseri-lo em um sistema, pegando erros de digitação cedo sem expor o valor a nenhum servidor.',
      },
      {
        title: 'Depurar envios que falharam',
        body: 'Desenvolvedores verificam se um valor que um formulário rejeitou realmente tem dígito verificador errado ou se o bug está no próprio código de validação.',
      },
      {
        title: 'Limpar dados importados',
        body: 'Analistas conferem por amostragem números de uma planilha importada para decidir se um lote precisa de correção antes de carregar em um banco.',
      },
      {
        title: 'Ensino de algoritmos de dígito verificador',
        body: 'Instrutores demonstram como as checagens de CPF, CNPJ e Luhn aceitam números corretos e rejeitam adulterados, usando uma ferramenta ao vivo em aula.',
      },
      {
        title: 'Validar dados de teste gerados',
        body: 'Times de QA confirmam que os números produzidos pelos geradores do PDFWINDOWS passam na validação exatamente como esperado antes de usá-los em fixtures.',
      },
    ],
    howItWorks: [
      'Cole ou digite um número no campo.',
      'A ferramenta detecta o tipo pela quantidade de dígitos.',
      'Ela confere o dígito verificador ou o checksum de Luhn.',
      'Leia o resultado válido ou inválido na hora.',
    ],
    tips: [
      'Um resultado válido significa que o número é internamente consistente, não que existe em um registro oficial.',
      'Onze dígitos são checados como CPF e, se falhar, como PIS/PASEP.',
      'Quatorze dígitos são checados como CNPJ; de treze a dezenove dígitos são checados com Luhn como cartão.',
      'Caracteres de formatação como pontos, barras e hífens são ignorados automaticamente.',
      'Combine com os geradores para confirmar que seus dados de teste validam antes de comitar fixtures.',
      'Nunca cole números sensíveis reais em ferramentas não confiáveis — esta mantém tudo local.',
    ],
    sections: [
      {
        id: 'o-que-confere',
        heading: 'O que o validador realmente confere',
        level: 2,
        paragraphs: [
          'Cada um desses identificadores termina com um ou mais dígitos verificadores calculados a partir dos dígitos anteriores. O validador recalcula esses dígitos e os compara ao que você digitou, o que pega erros de digitação, transposições e números fabricados.',
          'Ele não contata nenhum órgão do governo ou rede de cartões. Um resultado válido significa que o número é matematicamente consistente; confirmar que ele realmente existe e está ativo exige uma consulta oficial que esta ferramenta não faz.',
        ],
      },
      {
        id: 'deteccao-tipo',
        heading: 'Como funciona a detecção de tipo',
        level: 2,
        paragraphs: [
          'A ferramenta remove caracteres não numéricos e olha o tamanho. Onze dígitos são tratados primeiro como CPF e, se a checagem de CPF falhar, como PIS/PASEP, porque ambos usam onze dígitos com algoritmos diferentes.',
          'Quatorze dígitos são tratados como CNPJ. De treze a dezenove dígitos são tratados como cartão de pagamento e validados com o checksum de Luhn, que é a mesma faixa de tamanho que números de cartão reais ocupam.',
          'Essa detecção automática permite colar quase qualquer um desses identificadores sem escolher um tipo antes.',
        ],
      },
      {
        id: 'privacidade',
        heading: 'Local e privado por design',
        level: 2,
        paragraphs: [
          'A validação roda inteiramente no navegador. O número que você cola nunca sai do dispositivo, nunca é registrado e não é armazenado depois que você fecha a página.',
          'Isso torna a ferramenta segura para checar identificadores sensíveis, ao contrário de validadores online que transmitem o valor a um servidor para fazer a checagem.',
        ],
      },
      {
        id: 'fluxo',
        heading: 'Encaixando no seu fluxo de trabalho',
        level: 2,
        paragraphs: [
          'Use o validador junto com os geradores do PDFWINDOWS: gere um CPF, CNPJ ou cartão sintético, cole aqui e confirme que valida antes de colocá-lo em uma fixture ou demo.',
          'Quando um usuário relatar que um formulário rejeitou o documento dele por engano, cole o valor para determinar se o número é genuinamente malformado ou se a sua lógica de validação tem um bug.',
          'Para tarefas de limpeza de dados, faça uma triagem rápida de algumas linhas suspeitas para decidir se uma importação inteira precisa ser reprocessada.',
        ],
      },
    ],
    faq: [
      ...privacyFaq('pt'),
      {
        q: 'Um resultado válido significa que o documento existe?',
        a: 'Não. Significa apenas que o dígito verificador ou o checksum de Luhn está correto. Não consulta nenhum registro oficial.',
      },
      {
        q: 'Quais tipos são suportados?',
        a: 'CPF, CNPJ e PIS/PASEP por dígito verificador, e cartões de pagamento pelo algoritmo de Luhn, detectados automaticamente pelo tamanho.',
      },
      {
        q: 'Preciso remover pontos e hífens?',
        a: 'Não. Caracteres de formatação são ignorados automaticamente antes da validação.',
      },
      {
        q: 'O número que eu colo é enviado a algum lugar?',
        a: 'Não. A validação roda inteiramente no navegador e nada é enviado ou registrado.',
      },
    ],
    relatedTools: ['/gerador-cpf', '/gerador-cnpj', '/gerador-cartao-teste', '/limpador-codigo'],
    cta: defaultCta('pt', 'Validador de Documentos'),
  },
  es: {
    title: 'Validador de CPF y CNPJ (Local) | PDFWINDOWS',
    description:
      'Valida CPF, CNPJ, PIS/PASEP y números de tarjeta por dígito verificador y Luhn, con detección automática, en el navegador.',
    keywords: 'validador cpf cnpj, verificar cpf en linea, validar digito verificador, comprobar tarjeta luhn, validar documento brasil',
    h1: 'Validador de CPF y CNPJ',
    intro:
      'El Validador de PDFWINDOWS comprueba si un CPF, CNPJ, PIS/PASEP o número de tarjeta está bien formado, enteramente en el navegador. Pega un valor y detecta el tipo por la cantidad de dígitos, luego verifica el dígito verificador — o el checksum de Luhn, para tarjetas — y muestra un resultado válido o inválido al instante. Es una forma rápida de confirmar que un número de documento es internamente consistente antes de confiar en él, sin enviar nada a un servidor.',
    toolName: 'Validador de Documentos',
    benefits: [
      'Detección automática del tipo por cantidad de dígitos',
      'Verifica dígitos de CPF, CNPJ y PIS/PASEP',
      'Verifica números de tarjeta con el algoritmo de Luhn',
      'Resultado al instante — funciona 100% en el navegador',
      'Sin registro, clave de API ni límites',
    ],
    useCases: [
      {
        title: 'Verificación manual rápida',
        body: 'El personal de soporte y operaciones pega un número proporcionado por el cliente para confirmar que está bien formado antes de ingresarlo en un sistema, detectando errores temprano sin exponer el valor a ningún servidor.',
      },
      {
        title: 'Depurar envíos fallidos',
        body: 'Los desarrolladores verifican si un valor que un formulario rechazó realmente tiene un dígito verificador incorrecto o si el error está en su propio código de validación.',
      },
      {
        title: 'Limpiar datos importados',
        body: 'Los analistas comprueban por muestreo números de una hoja importada para decidir si un lote necesita corrección antes de cargarlo en una base de datos.',
      },
      {
        title: 'Enseñanza de algoritmos de dígito verificador',
        body: 'Los instructores demuestran cómo las comprobaciones de CPF, CNPJ y Luhn aceptan números correctos y rechazan los alterados, usando una herramienta en vivo en clase.',
      },
      {
        title: 'Validar datos de prueba generados',
        body: 'Los equipos de QA confirman que los números producidos por los generadores de PDFWINDOWS pasan la validación exactamente como se espera antes de usarlos en fixtures.',
      },
    ],
    howItWorks: [
      'Pega o escribe un número en el campo.',
      'La herramienta detecta el tipo por su cantidad de dígitos.',
      'Verifica el dígito verificador o el checksum de Luhn.',
      'Lee el resultado válido o inválido al instante.',
    ],
    tips: [
      'Un resultado válido significa que el número es internamente consistente, no que exista en un registro oficial.',
      'Once dígitos se comprueban como CPF y, si falla, como PIS/PASEP.',
      'Catorce dígitos se comprueban como CNPJ; de trece a diecinueve dígitos se comprueban con Luhn como tarjeta.',
      'Los caracteres de formato como puntos, barras y guiones se ignoran automáticamente.',
      'Combina con los generadores para confirmar que tus datos de prueba validan antes de comitear fixtures.',
      'Nunca pegues números sensibles reales en herramientas no confiables — esta mantiene todo local.',
    ],
    sections: [
      {
        id: 'que-verifica',
        heading: 'Qué verifica realmente el validador',
        level: 2,
        paragraphs: [
          'Cada uno de estos identificadores termina con uno o más dígitos verificadores calculados a partir de los dígitos anteriores. El validador recalcula esos dígitos y los compara con lo que ingresaste, lo que detecta errores de tipeo, transposiciones y números fabricados.',
          'No contacta a ningún órgano gubernamental ni red de tarjetas. Un resultado válido significa que el número es matemáticamente consistente; confirmar que realmente existe y está activo requiere una consulta oficial que esta herramienta no realiza.',
        ],
      },
      {
        id: 'deteccion-tipo',
        heading: 'Cómo funciona la detección de tipo',
        level: 2,
        paragraphs: [
          'La herramienta elimina los caracteres no numéricos y mira la longitud. Once dígitos se tratan primero como CPF y, si la comprobación de CPF falla, como PIS/PASEP, porque ambos usan once dígitos con algoritmos diferentes.',
          'Catorce dígitos se tratan como CNPJ. De trece a diecinueve dígitos se tratan como tarjeta de pago y se validan con el checksum de Luhn, que es el mismo rango de longitud que ocupan los números de tarjeta reales.',
          'Esta detección automática te permite pegar casi cualquiera de estos identificadores sin elegir un tipo primero.',
        ],
      },
      {
        id: 'privacidad',
        heading: 'Local y privado por diseño',
        level: 2,
        paragraphs: [
          'La validación corre enteramente en el navegador. El número que pegas nunca sale de tu dispositivo, nunca se registra y no se almacena después de cerrar la página.',
          'Eso hace que la herramienta sea segura para comprobar identificadores sensibles, a diferencia de los validadores en línea que transmiten el valor a un servidor para hacer la comprobación.',
        ],
      },
      {
        id: 'flujo',
        heading: 'Encajando en tu flujo de trabajo',
        level: 2,
        paragraphs: [
          'Usa el validador junto con los generadores de PDFWINDOWS: genera un CPF, CNPJ o tarjeta sintética, pégalo aquí y confirma que valida antes de ponerlo en una fixture o demo.',
          'Cuando un usuario reporte que un formulario rechazó su documento por error, pega el valor para determinar si el número está genuinamente malformado o si tu lógica de validación tiene un bug.',
          'Para tareas de limpieza de datos, haz una triaje rápida de algunas filas sospechosas para decidir si una importación entera necesita reprocesarse.',
        ],
      },
    ],
    faq: [
      ...privacyFaq('es'),
      {
        q: '¿Un resultado válido significa que el documento existe?',
        a: 'No. Solo significa que el dígito verificador o el checksum de Luhn es correcto. No consulta ningún registro oficial.',
      },
      {
        q: '¿Qué tipos se admiten?',
        a: 'CPF, CNPJ y PIS/PASEP por dígito verificador, y tarjetas de pago por el algoritmo de Luhn, detectados automáticamente por longitud.',
      },
      {
        q: '¿Necesito quitar puntos y guiones?',
        a: 'No. Los caracteres de formato se ignoran automáticamente antes de la validación.',
      },
      {
        q: '¿El número que pego se envía a algún lugar?',
        a: 'No. La validación corre enteramente en el navegador y nada se sube ni registra.',
      },
    ],
    relatedTools: ['/gerador-cpf', '/gerador-cnpj', '/gerador-cartao-teste', '/limpador-codigo'],
    cta: defaultCta('es', 'Validador de Documentos'),
  },
};
