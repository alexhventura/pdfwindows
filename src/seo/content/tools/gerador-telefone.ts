import type { ToolRichContent } from '../types';
import { privacyFaq, defaultCta } from '../helpers';

export const GERADOR_TELEFONE_CONTENT: Record<'en' | 'pt' | 'es', ToolRichContent> = {
  en: {
    title: 'Brazilian Phone Number Generator for Testing | PDFWINDOWS',
    description:
      'Generate Brazilian mobile numbers with a valid area code for QA and development, entirely in your browser.',
    keywords: 'phone number generator test, brazil mobile test number, fake phone qa, ddd valid test, whatsapp test number',
    h1: 'Phone Number Generator — For Testing Only',
    intro:
      'The PDFWINDOWS Phone Number Generator creates Brazilian mobile numbers with a valid area code (DDD) and the nine-digit mobile pattern, entirely in your browser. It exists so developers and QA engineers can fill forms, fixtures and demos without using anyone’s real phone number. The numbers are fictitious and are not assigned to a subscriber. Use them to verify input masks, exercise validators and build realistic test personas while keeping real contact data out of your test environment.',
    toolName: 'Phone Number Generator',
    benefits: [
      'Uses real Brazilian area codes (DDD) for realism',
      'Mobile pattern with the leading 9 and eight digits',
      'One-click generation and clipboard copy',
      'Runs 100% in the browser — nothing is uploaded',
      'No registration, API key or rate limits',
    ],
    useCases: [
      {
        title: 'Signup and OTP form QA',
        body: 'QA engineers test sign-up flows that capture and mask a phone number. Generating fresh values each run avoids reusing real contact data and keeps staging databases clean, while OTP steps are mocked so no message is ever sent.',
      },
      {
        title: 'Phone mask verification',
        body: 'Frontend teams confirm that phone masks such as (00) 90000-0000 format generated values correctly across browsers, including paste and autofill.',
      },
      {
        title: 'Validator unit tests',
        body: 'Developers add generated numbers to fixtures to assert that validators accept the correct DDD and length and reject malformed input.',
      },
      {
        title: 'Demo screenshots and tutorials',
        body: 'Documentation and marketing teams populate screenshots with synthetic phone numbers instead of redacting real ones, producing cleaner visuals.',
      },
      {
        title: 'Seeding CRM and support demos',
        body: 'Sales engineers fill CRM or helpdesk demos with realistic contact rows that never expose a real customer’s number.',
      },
    ],
    howItWorks: [
      'Open the Phone Number Generator.',
      'Click Generate to create a new number with a valid DDD.',
      'Copy the value to your clipboard or test form.',
      'Repeat as needed — each click yields a different number.',
    ],
    tips: [
      'Never send real messages or calls to generated numbers, and never use them to impersonate a business.',
      'A valid area code does not mean the number is assigned — treat it as fictitious test data only.',
      'Mock OTP and SMS gateways in automated tests so no traffic leaves your environment.',
      'Keep synthetic numbers in environment-specific fixtures, not production contact tables.',
      'Pair with the CPF and RG generators to build complete synthetic personas.',
      'Rotate values between runs to catch hardcoded assumptions in your tests.',
    ],
    sections: [
      {
        id: 'brazilian-format',
        heading: 'The Brazilian mobile number format',
        level: 2,
        paragraphs: [
          'A Brazilian mobile number is written as an area code (DDD) in parentheses followed by a nine-digit subscriber number that starts with 9, for example (11) 9XXXX-XXXX. Landlines use eight digits and do not start with 9.',
          'The generator picks a real, in-use DDD and builds a nine-digit mobile number so masks and validators treat it as a realistic Brazilian cell phone.',
        ],
      },
      {
        id: 'why-valid-ddd',
        heading: 'Why a valid area code matters for tests',
        level: 2,
        paragraphs: [
          'Many validators check that the DDD belongs to the official list before accepting a number. Using an invalid area code would make otherwise correct test data fail for the wrong reason.',
          'By drawing from real DDDs, the generator ensures your positive test cases exercise the success path, while you can still hand-craft invalid values to test rejection logic.',
          'For end-to-end tests, always mock the SMS or call provider so generated numbers never trigger real messages.',
        ],
      },
      {
        id: 'privacy-for-qa',
        heading: 'Privacy benefits for QA teams',
        level: 2,
        paragraphs: [
          'Phone numbers are personal data. Copying real numbers into shared spreadsheets creates avoidable exposure and risks accidental messages to real people.',
          'Synthetic generation keeps data realistic and, because it runs locally, values never reach a third-party fake-data API or external log.',
        ],
      },
      {
        id: 'integration-testing',
        heading: 'Building realistic contact personas',
        level: 2,
        paragraphs: [
          'Combine the Phone Number Generator with the CPF, RG and CNPJ generators and the CSV and JSON tools to assemble complete synthetic contacts for fixtures and demos.',
          'Keep every field of a persona consistent so screenshots and QA sessions feel authentic without real data.',
          'Support teams can reproduce customer-reported issues using synthetic contacts that mirror production shapes without handling a real subscriber’s number.',
          'When automating end-to-end suites, generate a fresh number for each test run and assert on the formatted output your application stores, so flaky data never masks a real regression in your validation or masking logic.',
        ],
      },
    ],
    faq: [
      ...privacyFaq('en'),
      {
        q: 'Do generated numbers belong to anyone?',
        a: 'No. They use a valid area code for realism but are fictitious and are not assigned to a subscriber.',
      },
      {
        q: 'Will an SMS be sent to these numbers?',
        a: 'Not by this tool. Always mock SMS and call providers in tests so no message is delivered to a real person.',
      },
      {
        q: 'Can I use these numbers in production?',
        a: 'No. Use them only in development, staging and QA environments for software testing.',
      },
      {
        q: 'Does the tool store generated numbers?',
        a: 'No. They exist only in your browser session. Nothing is uploaded or logged by PDFWINDOWS.',
      },
    ],
    relatedTools: ['/gerador-cpf', '/gerador-cnpj', '/gerador-rg', '/limpador-codigo'],
    cta: defaultCta('en', 'Phone Number Generator'),
  },
  pt: {
    title: 'Gerador de Telefone para Testes de Software | PDFWINDOWS',
    description:
      'Gere números de celular brasileiros com DDD válido para QA e desenvolvimento, inteiramente no navegador.',
    keywords: 'gerador telefone teste, numero celular teste, telefone fake qa, ddd valido teste, numero whatsapp teste',
    h1: 'Gerador de Telefone — Apenas para Testes',
    intro:
      'O Gerador de Telefone do PDFWINDOWS cria números de celular brasileiros com DDD válido e o padrão de nove dígitos, inteiramente no navegador. Ele existe para desenvolvedores e times de QA preencherem formulários, fixtures e demos sem usar o número real de ninguém. Os números são fictícios e não estão atribuídos a um assinante. Use para verificar máscaras de input, exercitar validadores e construir personas de teste realistas mantendo dados de contato reais fora do ambiente.',
    toolName: 'Gerador de Telefone',
    benefits: [
      'Usa DDDs brasileiros reais para dar realismo',
      'Padrão de celular com o 9 inicial e oito dígitos',
      'Geração e cópia para a área de transferência em um clique',
      'Roda 100% no navegador — nada é enviado',
      'Sem cadastro, chave de API ou limites',
    ],
    useCases: [
      {
        title: 'QA de cadastro e de OTP',
        body: 'Times de QA testam fluxos de cadastro que capturam e mascaram telefone. Gerar valores novos a cada execução evita reutilizar dados reais de contato e mantém o staging limpo, enquanto etapas de OTP são mockadas para nenhuma mensagem ser enviada.',
      },
      {
        title: 'Verificação de máscara de telefone',
        body: 'Times frontend confirmam que máscaras como (00) 90000-0000 formatam valores gerados corretamente em todos os navegadores, inclusive ao colar e no autofill.',
      },
      {
        title: 'Testes unitários de validador',
        body: 'Desenvolvedores adicionam números gerados a fixtures para garantir que validadores aceitam DDD e tamanho corretos e rejeitam entradas malformadas.',
      },
      {
        title: 'Screenshots de demo e tutoriais',
        body: 'Times de documentação e marketing preenchem screenshots com telefones sintéticos em vez de redigir números reais, gerando imagens mais limpas.',
      },
      {
        title: 'Populando demos de CRM e suporte',
        body: 'Engenheiros de vendas preenchem demos de CRM ou helpdesk com linhas de contato realistas que nunca expõem o número de um cliente real.',
      },
    ],
    howItWorks: [
      'Abra o Gerador de Telefone.',
      'Clique em Gerar para criar um número com DDD válido.',
      'Copie o valor para a área de transferência ou formulário de teste.',
      'Repita conforme necessário — cada clique gera um número diferente.',
    ],
    tips: [
      'Nunca envie mensagens ou ligações reais para números gerados nem os use para se passar por uma empresa.',
      'Um DDD válido não significa número atribuído — trate como dado de teste fictício apenas.',
      'Mocke gateways de OTP e SMS nos testes automatizados para nenhum tráfego sair do ambiente.',
      'Mantenha números sintéticos em fixtures específicas de ambiente, não em tabelas de contato de produção.',
      'Combine com os geradores de CPF e RG para montar personas sintéticas completas.',
      'Rotacione valores entre execuções para detectar suposições hardcoded nos testes.',
    ],
    sections: [
      {
        id: 'formato-brasileiro',
        heading: 'O formato do número de celular brasileiro',
        level: 2,
        paragraphs: [
          'Um celular brasileiro é escrito como DDD entre parênteses seguido de um número de nove dígitos que começa com 9, por exemplo (11) 9XXXX-XXXX. Fixos usam oito dígitos e não começam com 9.',
          'O gerador escolhe um DDD real e em uso e monta um número de nove dígitos para máscaras e validadores tratarem como um celular brasileiro realista.',
        ],
      },
      {
        id: 'por-que-ddd-valido',
        heading: 'Por que um DDD válido importa nos testes',
        level: 2,
        paragraphs: [
          'Muitos validadores checam se o DDD pertence à lista oficial antes de aceitar um número. Usar um DDD inválido faria dados de teste corretos falharem pelo motivo errado.',
          'Ao sortear de DDDs reais, o gerador garante que seus casos de teste positivos exercitem o caminho de sucesso, enquanto você ainda pode criar valores inválidos à mão para testar a lógica de rejeição.',
          'Para testes end-to-end, sempre mocke o provedor de SMS ou de chamadas para números gerados nunca dispararem mensagens reais.',
        ],
      },
      {
        id: 'privacidade-qa',
        heading: 'Benefícios de privacidade para times de QA',
        level: 2,
        paragraphs: [
          'Telefones são dados pessoais. Copiar números reais em planilhas compartilhadas cria exposição evitável e risco de mensagens acidentais a pessoas reais.',
          'A geração sintética mantém os dados realistas e, por rodar localmente, os valores nunca chegam a uma API de dados falsos de terceiros nem a logs externos.',
        ],
      },
      {
        id: 'testes-integracao',
        heading: 'Construindo personas de contato realistas',
        level: 2,
        paragraphs: [
          'Combine o Gerador de Telefone com os geradores de CPF, RG e CNPJ e as ferramentas de CSV e JSON para montar contatos sintéticos completos para fixtures e demos.',
          'Mantenha cada campo de uma persona consistente para que screenshots e sessões de QA pareçam autênticos sem dados reais.',
          'Times de suporte podem reproduzir problemas relatados por clientes usando contatos sintéticos que espelham o formato de produção sem manipular o número de um assinante real.',
        ],
      },
    ],
    faq: [
      ...privacyFaq('pt'),
      {
        q: 'Os números gerados pertencem a alguém?',
        a: 'Não. Usam um DDD válido para realismo, mas são fictícios e não estão atribuídos a um assinante.',
      },
      {
        q: 'Um SMS será enviado para esses números?',
        a: 'Não por esta ferramenta. Sempre mocke provedores de SMS e chamadas nos testes para nenhuma mensagem chegar a uma pessoa real.',
      },
      {
        q: 'Posso usar esses números em produção?',
        a: 'Não. Use apenas em ambientes de desenvolvimento, homologação e QA para testes de software.',
      },
      {
        q: 'A ferramenta armazena os números gerados?',
        a: 'Não. Eles existem apenas na sessão do navegador. Nada é enviado ou registrado pelo PDFWINDOWS.',
      },
    ],
    relatedTools: ['/gerador-cpf', '/gerador-cnpj', '/gerador-rg', '/limpador-codigo'],
    cta: defaultCta('pt', 'Gerador de Telefone'),
  },
  es: {
    title: 'Generador de Teléfono para Pruebas de Software | PDFWINDOWS',
    description:
      'Genera números de móvil brasileños con DDD válido para QA y desarrollo, enteramente en el navegador.',
    keywords: 'generador telefono prueba, numero movil prueba, telefono fake qa, ddd valido prueba, numero whatsapp prueba',
    h1: 'Generador de Teléfono — Solo para Pruebas',
    intro:
      'El Generador de Teléfono de PDFWINDOWS crea números de móvil brasileños con DDD válido y el patrón de nueve dígitos, enteramente en el navegador. Existe para que desarrolladores y equipos de QA rellenen formularios, fixtures y demos sin usar el número real de nadie. Los números son ficticios y no están asignados a un abonado. Úselos para verificar máscaras de entrada, ejercitar validadores y construir personas de prueba realistas manteniendo datos de contacto reales fuera del entorno.',
    toolName: 'Generador de Teléfono',
    benefits: [
      'Usa DDDs brasileños reales para dar realismo',
      'Patrón de móvil con el 9 inicial y ocho dígitos',
      'Generación y copia al portapapeles en un clic',
      'Funciona 100% en el navegador — nada se sube',
      'Sin registro, clave de API ni límites',
    ],
    useCases: [
      {
        title: 'QA de registro y de OTP',
        body: 'Los equipos de QA prueban flujos de registro que capturan y enmascaran un teléfono. Generar valores nuevos en cada ejecución evita reutilizar datos reales de contacto y mantiene staging limpio, mientras los pasos de OTP se simulan para que no se envíe ningún mensaje.',
      },
      {
        title: 'Verificación de máscara de teléfono',
        body: 'Los equipos frontend confirman que máscaras como (00) 90000-0000 formatean los valores generados correctamente en todos los navegadores, incluido pegar y autocompletar.',
      },
      {
        title: 'Pruebas unitarias de validador',
        body: 'Los desarrolladores agregan números generados a fixtures para asegurar que los validadores aceptan el DDD y la longitud correctos y rechazan entradas malformadas.',
      },
      {
        title: 'Capturas de demo y tutoriales',
        body: 'Los equipos de documentación y marketing rellenan capturas con teléfonos sintéticos en lugar de redactar números reales, produciendo imágenes más limpias.',
      },
      {
        title: 'Poblando demos de CRM y soporte',
        body: 'Los ingenieros de ventas rellenan demos de CRM o helpdesk con filas de contacto realistas que nunca exponen el número de un cliente real.',
      },
    ],
    howItWorks: [
      'Abra el Generador de Teléfono.',
      'Haga clic en Generar para crear un número con DDD válido.',
      'Copie el valor al portapapeles o formulario de prueba.',
      'Repita según necesidad — cada clic genera un número diferente.',
    ],
    tips: [
      'Nunca envíe mensajes o llamadas reales a números generados ni los use para hacerse pasar por una empresa.',
      'Un DDD válido no significa número asignado — trátelo como dato de prueba ficticio solamente.',
      'Simule gateways de OTP y SMS en las pruebas automatizadas para que no salga tráfico del entorno.',
      'Mantenga los números sintéticos en fixtures específicas de entorno, no en tablas de contacto de producción.',
      'Combine con los generadores de CPF y RG para construir personas sintéticas completas.',
      'Rote valores entre ejecuciones para detectar suposiciones hardcoded en las pruebas.',
    ],
    sections: [
      {
        id: 'formato-brasileno',
        heading: 'El formato del número de móvil brasileño',
        level: 2,
        paragraphs: [
          'Un móvil brasileño se escribe como DDD entre paréntesis seguido de un número de nueve dígitos que comienza con 9, por ejemplo (11) 9XXXX-XXXX. Los fijos usan ocho dígitos y no comienzan con 9.',
          'El generador elige un DDD real y en uso y arma un número de nueve dígitos para que máscaras y validadores lo traten como un móvil brasileño realista.',
        ],
      },
      {
        id: 'por-que-ddd-valido',
        heading: 'Por qué un DDD válido importa en las pruebas',
        level: 2,
        paragraphs: [
          'Muchos validadores comprueban que el DDD pertenece a la lista oficial antes de aceptar un número. Usar un DDD inválido haría que datos de prueba correctos fallaran por el motivo equivocado.',
          'Al tomar de DDDs reales, el generador asegura que sus casos de prueba positivos ejerciten el camino de éxito, mientras usted aún puede crear valores inválidos a mano para probar la lógica de rechazo.',
          'Para pruebas end-to-end, simule siempre el proveedor de SMS o llamadas para que los números generados nunca disparen mensajes reales.',
        ],
      },
      {
        id: 'privacidad-qa',
        heading: 'Beneficios de privacidad para equipos de QA',
        level: 2,
        paragraphs: [
          'Los teléfonos son datos personales. Copiar números reales en hojas compartidas crea exposición evitable y riesgo de mensajes accidentales a personas reales.',
          'La generación sintética mantiene los datos realistas y, al correr localmente, los valores nunca llegan a una API de datos falsos de terceros ni a logs externos.',
        ],
      },
      {
        id: 'pruebas-integracion',
        heading: 'Construyendo personas de contacto realistas',
        level: 2,
        paragraphs: [
          'Combine el Generador de Teléfono con los generadores de CPF, RG y CNPJ y las herramientas de CSV y JSON para armar contactos sintéticos completos para fixtures y demos.',
          'Mantenga cada campo de una persona consistente para que capturas y sesiones de QA se sientan auténticas sin datos reales.',
          'Los equipos de soporte pueden reproducir problemas reportados por clientes usando contactos sintéticos que reflejan las formas de producción sin manipular el número de un abonado real.',
        ],
      },
    ],
    faq: [
      ...privacyFaq('es'),
      {
        q: '¿Los números generados pertenecen a alguien?',
        a: 'No. Usan un DDD válido para realismo, pero son ficticios y no están asignados a un abonado.',
      },
      {
        q: '¿Se enviará un SMS a estos números?',
        a: 'No por esta herramienta. Simule siempre proveedores de SMS y llamadas en las pruebas para que no llegue ningún mensaje a una persona real.',
      },
      {
        q: '¿Puedo usar estos números en producción?',
        a: 'No. Úselos solo en entornos de desarrollo, staging y QA para pruebas de software.',
      },
      {
        q: '¿La herramienta almacena los números generados?',
        a: 'No. Existen solo en la sesión del navegador. Nada se sube ni registra por PDFWINDOWS.',
      },
    ],
    relatedTools: ['/gerador-cpf', '/gerador-cnpj', '/gerador-rg', '/limpador-codigo'],
    cta: defaultCta('es', 'Generador de Teléfono'),
  },
};
