import type { ToolRichContent } from '../types';
import { privacyFaq, defaultCta } from '../helpers';

export const GERADOR_CARTAO_TESTE_CONTENT: Record<'en' | 'pt' | 'es', ToolRichContent> = {
  en: {
    title: 'Test Credit Card Number Generator (Luhn) | PDFWINDOWS',
    description:
      'Generate Luhn-valid test card numbers for Visa, Mastercard and Amex, with CVV and expiry, to test payment forms locally.',
    keywords: 'test credit card generator, luhn valid card number, fake card for testing, payment form test card, dummy card number',
    h1: 'Test Credit Card Generator — For Testing Only',
    intro:
      'The PDFWINDOWS Test Card Generator creates fictitious card numbers that pass the Luhn checksum, for Visa, Mastercard and American Express, complete with a CVV and a future expiry date, entirely in your browser. These numbers are for exercising payment forms and validation logic only: they are not real cards, are not linked to any account and hold no funds. Use them to test masks, brand detection and client-side validation without touching real card data.',
    toolName: 'Test Card Generator',
    benefits: [
      'Numbers pass the Luhn checksum used by validators',
      'Visa, Mastercard and American Express brands',
      'Includes CVV and a future expiry date',
      'Runs 100% in the browser — nothing is uploaded',
      'No registration, API key or rate limits',
    ],
    useCases: [
      {
        title: 'Checkout form QA',
        body: 'QA engineers test card-entry forms that validate the number with the Luhn algorithm and detect the brand from its prefix. Generating fresh values each run exercises the success path without ever handling a real card.',
      },
      {
        title: 'Brand detection tests',
        body: 'Developers verify that their UI shows the right brand logo and applies the correct grouping for Visa, Mastercard and Amex numbers.',
      },
      {
        title: 'Input mask and grouping',
        body: 'Frontend teams confirm that card masks group digits correctly, including the 4-6-5 layout that American Express uses.',
      },
      {
        title: 'Validation unit tests',
        body: 'Engineers add generated numbers to fixtures to assert that a Luhn validator accepts them and rejects numbers with a bad check digit.',
      },
      {
        title: 'Demo and documentation screenshots',
        body: 'Teams fill checkout screenshots with synthetic card numbers instead of blurring a real one, producing cleaner visuals.',
      },
    ],
    howItWorks: [
      'Pick a card brand.',
      'Click Generate to create a Luhn-valid number.',
      'Copy the number, CVV and expiry into your test form.',
      'Repeat as needed — each click yields a different card.',
    ],
    tips: [
      'These are not real cards — never attempt a real purchase with them.',
      'For sandbox transactions, use the specific test numbers your payment gateway documents; those trigger simulated approvals and declines.',
      'A Luhn-valid number only passes the checksum; it will not be authorized by a real acquirer.',
      'Keep synthetic card data in environment-specific fixtures, never in production tables.',
      'Combine with the CPF and phone generators to build complete synthetic checkout personas.',
      'Rotate values between runs to catch hardcoded assumptions in your tests.',
    ],
    sections: [
      {
        id: 'what-this-is',
        heading: 'What this generator is for',
        level: 2,
        paragraphs: [
          'Payment forms typically run two client-side checks before contacting a gateway: they detect the brand from the leading digits and verify the number with the Luhn checksum. This tool produces numbers that satisfy both so you can exercise those code paths.',
          'The numbers are fictitious and hold no funds. They are meant for form and validation testing, not for real or even sandbox transactions, which usually require gateway-specific test numbers.',
        ],
      },
      {
        id: 'luhn-explained',
        heading: 'How the Luhn checksum works',
        level: 2,
        paragraphs: [
          'The Luhn algorithm doubles every second digit from the right, subtracts nine from any result above nine, sums all the digits and checks that the total is a multiple of ten. It catches most single-digit typos and simple transpositions.',
          'The generator builds a brand prefix, fills random digits and computes the final check digit so the whole number satisfies Luhn, exactly like a real card number’s structure.',
          'Because Luhn is only a checksum, passing it says nothing about whether a card exists or has funds — that is decided by the issuer during authorization.',
        ],
      },
      {
        id: 'sandbox-vs-format',
        heading: 'Format tests versus sandbox transactions',
        level: 2,
        paragraphs: [
          'Use these numbers when you are testing the form itself: masks, brand icons, and client-side validation. They are perfect for that and require no setup.',
          'When you need to test an actual charge in a payment sandbox, switch to the specific test cards your provider documents, since those are wired to return simulated approvals, declines and 3-D Secure flows.',
        ],
      },
      {
        id: 'privacy',
        heading: 'Privacy and safety',
        level: 2,
        paragraphs: [
          'Never paste real card numbers into shared test spreadsheets or tickets. Synthetic numbers keep your test data realistic while eliminating the risk of exposing real cardholder data.',
          'Because generation is local, the numbers never reach a third-party API or external log, and nothing is stored by PDFWINDOWS.',
          'Treat even synthetic card fixtures with care and remove them from any environment that could be mistaken for production, and avoid logging full card numbers even when they are fictitious so your habits stay safe for real data.',
        ],
      },
    ],
    faq: [
      ...privacyFaq('en'),
      {
        q: 'Can I buy anything with these numbers?',
        a: 'No. They are fictitious, hold no funds and only satisfy the Luhn checksum for form testing.',
      },
      {
        q: 'Will they work in my payment sandbox?',
        a: 'Not necessarily. Sandboxes usually require provider-specific test cards. Use these for form and validation testing.',
      },
      {
        q: 'Are the CVV and expiry real?',
        a: 'No. They are random, valid-format values so your form’s CVV and expiry fields can be exercised.',
      },
      {
        q: 'Is anything uploaded?',
        a: 'No. Generation runs in your browser and nothing is sent to a server.',
      },
    ],
    relatedTools: ['/validar-cpf-cnpj', '/gerador-cpf', '/gerador-telefone', '/limpador-codigo'],
    cta: defaultCta('en', 'Test Card Generator'),
  },
  pt: {
    title: 'Gerador de Cartão de Crédito para Testes (Luhn) | PDFWINDOWS',
    description:
      'Gere números de cartão válidos por Luhn (Visa, Mastercard, Amex), com CVV e validade, para testar formulários de pagamento localmente.',
    keywords: 'gerador cartao credito teste, numero cartao luhn valido, cartao fake teste, cartao teste formulario pagamento, numero cartao ficticio',
    h1: 'Gerador de Cartão (Teste) — Apenas para Testes',
    intro:
      'O Gerador de Cartão de Teste do PDFWINDOWS cria números de cartão fictícios que passam no checksum de Luhn, para Visa, Mastercard e American Express, com CVV e uma validade futura, inteiramente no navegador. Esses números servem apenas para exercitar formulários de pagamento e lógica de validação: não são cartões reais, não estão ligados a nenhuma conta e não têm fundos. Use para testar máscaras, detecção de bandeira e validação client-side sem tocar em dados reais de cartão.',
    toolName: 'Gerador de Cartão (Teste)',
    benefits: [
      'Números passam no checksum de Luhn usado por validadores',
      'Bandeiras Visa, Mastercard e American Express',
      'Inclui CVV e uma data de validade futura',
      'Roda 100% no navegador — nada é enviado',
      'Sem cadastro, chave de API ou limites',
    ],
    useCases: [
      {
        title: 'QA de formulário de checkout',
        body: 'Times de QA testam formulários de cartão que validam o número com o algoritmo de Luhn e detectam a bandeira pelo prefixo. Gerar valores novos a cada execução exercita o caminho de sucesso sem nunca manipular um cartão real.',
      },
      {
        title: 'Testes de detecção de bandeira',
        body: 'Desenvolvedores verificam se a UI mostra o logo correto e aplica o agrupamento certo para números Visa, Mastercard e Amex.',
      },
      {
        title: 'Máscara e agrupamento de input',
        body: 'Times frontend confirmam que máscaras de cartão agrupam os dígitos corretamente, inclusive o layout 4-6-5 que a American Express usa.',
      },
      {
        title: 'Testes unitários de validação',
        body: 'Engenheiros adicionam números gerados a fixtures para garantir que um validador de Luhn os aceita e rejeita números com dígito verificador errado.',
      },
      {
        title: 'Screenshots de demo e documentação',
        body: 'Times preenchem screenshots de checkout com números de cartão sintéticos em vez de borrar um real, gerando imagens mais limpas.',
      },
    ],
    howItWorks: [
      'Escolha uma bandeira.',
      'Clique em Gerar para criar um número válido por Luhn.',
      'Copie o número, CVV e validade para o formulário de teste.',
      'Repita conforme necessário — cada clique gera um cartão diferente.',
    ],
    tips: [
      'Estes não são cartões reais — nunca tente uma compra real com eles.',
      'Para transações em sandbox, use os números de teste específicos que seu gateway documenta; eles disparam aprovações e recusas simuladas.',
      'Um número válido por Luhn apenas passa no checksum; não será autorizado por uma adquirente real.',
      'Mantenha dados de cartão sintéticos em fixtures específicas de ambiente, nunca em tabelas de produção.',
      'Combine com os geradores de CPF e telefone para montar personas de checkout sintéticas completas.',
      'Rotacione valores entre execuções para detectar suposições hardcoded nos testes.',
    ],
    sections: [
      {
        id: 'para-que-serve',
        heading: 'Para que serve este gerador',
        level: 2,
        paragraphs: [
          'Formulários de pagamento costumam rodar duas checagens client-side antes de contatar um gateway: detectam a bandeira pelos primeiros dígitos e verificam o número com o checksum de Luhn. Esta ferramenta produz números que satisfazem ambos para você exercitar esses caminhos de código.',
          'Os números são fictícios e não têm fundos. Servem para testar formulário e validação, não para transações reais ou mesmo de sandbox, que geralmente exigem números de teste específicos do gateway.',
        ],
      },
      {
        id: 'luhn-explicado',
        heading: 'Como funciona o checksum de Luhn',
        level: 2,
        paragraphs: [
          'O algoritmo de Luhn dobra cada segundo dígito da direita para a esquerda, subtrai nove de qualquer resultado acima de nove, soma todos os dígitos e verifica se o total é múltiplo de dez. Ele detecta a maioria dos erros de digitação de um dígito e transposições simples.',
          'O gerador monta um prefixo de bandeira, preenche dígitos aleatórios e calcula o dígito verificador final para o número inteiro satisfazer o Luhn, exatamente como a estrutura de um número de cartão real.',
          'Como o Luhn é apenas um checksum, passar nele não diz nada sobre um cartão existir ou ter fundos — isso é decidido pelo emissor durante a autorização.',
        ],
      },
      {
        id: 'sandbox-vs-formato',
        heading: 'Testes de formato versus transações de sandbox',
        level: 2,
        paragraphs: [
          'Use estes números quando estiver testando o próprio formulário: máscaras, ícones de bandeira e validação client-side. São perfeitos para isso e não exigem configuração.',
          'Quando precisar testar uma cobrança de verdade em um sandbox de pagamento, troque pelos cartões de teste específicos que seu provedor documenta, pois eles são ligados para retornar aprovações, recusas e fluxos 3-D Secure simulados.',
        ],
      },
      {
        id: 'privacidade',
        heading: 'Privacidade e segurança',
        level: 2,
        paragraphs: [
          'Nunca cole números de cartão reais em planilhas de teste compartilhadas ou tickets. Números sintéticos mantêm seus dados de teste realistas eliminando o risco de expor dados reais de portador.',
          'Como a geração é local, os números nunca chegam a uma API de terceiros nem a logs externos, e nada é armazenado pelo PDFWINDOWS.',
          'Trate até fixtures de cartão sintéticas com cuidado e remova-as de qualquer ambiente que possa ser confundido com produção.',
        ],
      },
    ],
    faq: [
      ...privacyFaq('pt'),
      {
        q: 'Dá para comprar algo com esses números?',
        a: 'Não. São fictícios, sem fundos e apenas satisfazem o checksum de Luhn para testar formulários.',
      },
      {
        q: 'Eles funcionam no meu sandbox de pagamento?',
        a: 'Não necessariamente. Sandboxes geralmente exigem cartões de teste específicos do provedor. Use estes para testar formulário e validação.',
      },
      {
        q: 'O CVV e a validade são reais?',
        a: 'Não. São valores aleatórios com formato válido para os campos de CVV e validade do seu formulário serem exercitados.',
      },
      {
        q: 'Algo é enviado?',
        a: 'Não. A geração roda no seu navegador e nada é enviado a um servidor.',
      },
    ],
    relatedTools: ['/validar-cpf-cnpj', '/gerador-cpf', '/gerador-telefone', '/limpador-codigo'],
    cta: defaultCta('pt', 'Gerador de Cartão (Teste)'),
  },
  es: {
    title: 'Generador de Tarjeta de Crédito para Pruebas (Luhn) | PDFWINDOWS',
    description:
      'Genera números de tarjeta válidos por Luhn (Visa, Mastercard, Amex), con CVV y vencimiento, para probar formularios de pago localmente.',
    keywords: 'generador tarjeta credito prueba, numero tarjeta luhn valido, tarjeta fake prueba, tarjeta prueba formulario pago, numero tarjeta ficticio',
    h1: 'Generador de Tarjeta (Prueba) — Solo para Pruebas',
    intro:
      'El Generador de Tarjeta de Prueba de PDFWINDOWS crea números de tarjeta ficticios que pasan el checksum de Luhn, para Visa, Mastercard y American Express, con CVV y una fecha de vencimiento futura, enteramente en el navegador. Estos números sirven solo para ejercitar formularios de pago y lógica de validación: no son tarjetas reales, no están vinculados a ninguna cuenta y no tienen fondos. Úsalos para probar máscaras, detección de marca y validación client-side sin tocar datos reales de tarjeta.',
    toolName: 'Generador de Tarjeta (Prueba)',
    benefits: [
      'Números pasan el checksum de Luhn usado por validadores',
      'Marcas Visa, Mastercard y American Express',
      'Incluye CVV y una fecha de vencimiento futura',
      'Funciona 100% en el navegador — nada se sube',
      'Sin registro, clave de API ni límites',
    ],
    useCases: [
      {
        title: 'QA de formulario de checkout',
        body: 'Los equipos de QA prueban formularios de tarjeta que validan el número con el algoritmo de Luhn y detectan la marca por el prefijo. Generar valores nuevos en cada ejecución ejercita el camino de éxito sin manipular nunca una tarjeta real.',
      },
      {
        title: 'Pruebas de detección de marca',
        body: 'Los desarrolladores verifican que la UI muestra el logo correcto y aplica la agrupación correcta para números Visa, Mastercard y Amex.',
      },
      {
        title: 'Máscara y agrupación de entrada',
        body: 'Los equipos frontend confirman que las máscaras de tarjeta agrupan los dígitos correctamente, incluido el diseño 4-6-5 que usa American Express.',
      },
      {
        title: 'Pruebas unitarias de validación',
        body: 'Los ingenieros agregan números generados a fixtures para asegurar que un validador de Luhn los acepta y rechaza números con dígito verificador incorrecto.',
      },
      {
        title: 'Capturas de demo y documentación',
        body: 'Los equipos rellenan capturas de checkout con números de tarjeta sintéticos en lugar de difuminar uno real, produciendo imágenes más limpias.',
      },
    ],
    howItWorks: [
      'Elige una marca.',
      'Haz clic en Generar para crear un número válido por Luhn.',
      'Copia el número, CVV y vencimiento en tu formulario de prueba.',
      'Repite según necesidad — cada clic genera una tarjeta diferente.',
    ],
    tips: [
      'Estas no son tarjetas reales — nunca intentes una compra real con ellas.',
      'Para transacciones en sandbox, usa los números de prueba específicos que documenta tu gateway; disparan aprobaciones y rechazos simulados.',
      'Un número válido por Luhn solo pasa el checksum; no será autorizado por un adquirente real.',
      'Mantén los datos de tarjeta sintéticos en fixtures específicas de entorno, nunca en tablas de producción.',
      'Combina con los generadores de CPF y teléfono para construir personas de checkout sintéticas completas.',
      'Rota valores entre ejecuciones para detectar suposiciones hardcoded en las pruebas.',
    ],
    sections: [
      {
        id: 'para-que-sirve',
        heading: 'Para qué sirve este generador',
        level: 2,
        paragraphs: [
          'Los formularios de pago suelen ejecutar dos comprobaciones client-side antes de contactar un gateway: detectan la marca por los primeros dígitos y verifican el número con el checksum de Luhn. Esta herramienta produce números que satisfacen ambos para que ejercites esas rutas de código.',
          'Los números son ficticios y no tienen fondos. Están pensados para probar formulario y validación, no para transacciones reales ni siquiera de sandbox, que suelen requerir números de prueba específicos del gateway.',
        ],
      },
      {
        id: 'luhn-explicado',
        heading: 'Cómo funciona el checksum de Luhn',
        level: 2,
        paragraphs: [
          'El algoritmo de Luhn duplica cada segundo dígito de derecha a izquierda, resta nueve de cualquier resultado mayor que nueve, suma todos los dígitos y verifica que el total sea múltiplo de diez. Detecta la mayoría de errores de tipeo de un dígito y transposiciones simples.',
          'El generador arma un prefijo de marca, rellena dígitos aleatorios y calcula el dígito verificador final para que el número entero satisfaga Luhn, exactamente como la estructura de un número de tarjeta real.',
          'Como Luhn es solo un checksum, pasarlo no dice nada sobre si una tarjeta existe o tiene fondos — eso lo decide el emisor durante la autorización.',
        ],
      },
      {
        id: 'sandbox-vs-formato',
        heading: 'Pruebas de formato versus transacciones de sandbox',
        level: 2,
        paragraphs: [
          'Usa estos números cuando pruebas el formulario en sí: máscaras, iconos de marca y validación client-side. Son perfectos para eso y no requieren configuración.',
          'Cuando necesites probar un cargo real en un sandbox de pago, cambia a las tarjetas de prueba específicas que documenta tu proveedor, ya que están conectadas para devolver aprobaciones, rechazos y flujos 3-D Secure simulados.',
        ],
      },
      {
        id: 'privacidad',
        heading: 'Privacidad y seguridad',
        level: 2,
        paragraphs: [
          'Nunca pegues números de tarjeta reales en hojas de prueba compartidas o tickets. Los números sintéticos mantienen tus datos de prueba realistas eliminando el riesgo de exponer datos reales de titular.',
          'Como la generación es local, los números nunca llegan a una API de terceros ni a logs externos, y nada es almacenado por PDFWINDOWS.',
          'Trata incluso las fixtures de tarjeta sintéticas con cuidado y elimínalas de cualquier entorno que pueda confundirse con producción.',
        ],
      },
    ],
    faq: [
      ...privacyFaq('es'),
      {
        q: '¿Puedo comprar algo con estos números?',
        a: 'No. Son ficticios, no tienen fondos y solo satisfacen el checksum de Luhn para probar formularios.',
      },
      {
        q: '¿Funcionan en mi sandbox de pago?',
        a: 'No necesariamente. Los sandboxes suelen requerir tarjetas de prueba específicas del proveedor. Usa estas para probar formulario y validación.',
      },
      {
        q: '¿El CVV y el vencimiento son reales?',
        a: 'No. Son valores aleatorios con formato válido para que los campos de CVV y vencimiento de tu formulario se ejerciten.',
      },
      {
        q: '¿Se sube algo?',
        a: 'No. La generación corre en tu navegador y nada se envía a un servidor.',
      },
    ],
    relatedTools: ['/validar-cpf-cnpj', '/gerador-cpf', '/gerador-telefone', '/limpador-codigo'],
    cta: defaultCta('es', 'Generador de Tarjeta (Prueba)'),
  },
};
