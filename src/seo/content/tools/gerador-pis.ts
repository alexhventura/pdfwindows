import type { ToolRichContent } from '../types';
import { privacyFaq, defaultCta } from '../helpers';

export const GERADOR_PIS_CONTENT: Record<'en' | 'pt' | 'es', ToolRichContent> = {
  en: {
    title: 'PIS/PASEP Generator for Software Testing | PDFWINDOWS',
    description:
      'Generate valid-format PIS/PASEP numbers with a correct check digit for QA and development, locally in your browser.',
    keywords: 'pis pasep generator test, valid pis for development, fake pis qa, nis test number, pis check digit',
    h1: 'PIS/PASEP Generator — For Testing Only',
    intro:
      'The PDFWINDOWS PIS/PASEP Generator produces Brazilian social-integration numbers (also used as NIS/NIT) with a mathematically correct check digit, entirely in your browser. It exists so developers and QA engineers can test HR, payroll and benefits systems without copying real worker identifiers. No number is issued by any agency, and none corresponds to a real person. Use it to seed staging databases, verify input masks and exercise validators while keeping real personal data out of your test environment.',
    toolName: 'PIS/PASEP Generator',
    benefits: [
      'Correct modulo-eleven check digit',
      'One-click generation and clipboard copy',
      'Runs 100% in the browser — nothing is uploaded',
      'Ideal for HR and payroll form testing',
      'No registration, API key or rate limits',
    ],
    useCases: [
      {
        title: 'HR and payroll QA',
        body: 'QA engineers test employee-registration and payroll flows that capture and validate a PIS/PASEP number. Generating fresh values each run avoids reusing real worker data and keeps staging environments aligned with data-minimization practices.',
      },
      {
        title: 'Input mask verification',
        body: 'Frontend teams confirm that PIS masks (000.00000.00-0) format generated values consistently across browsers, including paste and autofill.',
      },
      {
        title: 'Validator unit tests',
        body: 'Developers add generated numbers to fixtures to assert that validators accept the correct format and reject tampered check digits.',
      },
      {
        title: 'Benefits-system demos',
        body: 'Product teams populate benefits or eSocial-style demos with synthetic PIS numbers so screenshots and presentations never expose a real worker identifier.',
      },
      {
        title: 'Teaching checksum algorithms',
        body: 'Instructors use PIS as an approachable example of weighted modulo-eleven validation in classroom exercises.',
      },
    ],
    howItWorks: [
      'Open the PIS/PASEP Generator and read the notice.',
      'Click Generate to create a new valid-format number.',
      'Copy the value to your clipboard or test form.',
      'Repeat as needed — each click yields a different number.',
    ],
    tips: [
      'Never present a generated PIS as a real worker identifier or use it for fraud.',
      'Format validity does not imply the number exists in official records — official lookups will reject it, which is expected.',
      'Keep synthetic numbers in environment-specific fixtures, never in production tables with real employees.',
      'Pair with the CPF and RG generators to build complete synthetic worker personas.',
      'Rotate values between runs to catch hardcoded assumptions in your tests.',
      'Document in your test plan that synthetic PIS numbers come from the PDFWINDOWS generator.',
    ],
    sections: [
      {
        id: 'what-is-pis',
        heading: 'What PIS/PASEP is',
        level: 2,
        paragraphs: [
          'PIS (for private-sector workers) and PASEP (for public-sector workers) are Brazilian social-integration program numbers, commonly surfaced as the NIS/NIT in social-security and benefits systems. The number has eleven digits, the last of which is a check digit.',
          'This generator builds ten random base digits and computes the eleventh so the result passes the standard validation used by HR and payroll software.',
        ],
      },
      {
        id: 'algorithm-explained',
        heading: 'How the check digit is computed',
        level: 2,
        paragraphs: [
          'The ten base digits are multiplied by the weights 3,2,9,8,7,6,5,4,3,2 and summed. The sum is taken modulo eleven; if the remainder is less than two the check digit is zero, otherwise it is eleven minus the remainder.',
          'Because the tool replicates this exact rule, its output passes client-side masks and standard validators, while official databases correctly treat it as non-existent.',
          'For automated end-to-end tests, mock or skip any official verification step and assert only that your own validation behaves as expected.',
        ],
      },
      {
        id: 'privacy-for-qa',
        heading: 'Privacy benefits for QA teams',
        level: 2,
        paragraphs: [
          'Worker identifiers are sensitive personal data. Copying real PIS numbers into shared spreadsheets creates avoidable exposure, while synthetic generators keep test data realistic without touching anyone’s identity.',
          'Because generation runs entirely in your browser, test values never reach a third-party fake-data API or external log.',
        ],
      },
      {
        id: 'integration-testing',
        heading: 'Building realistic worker personas',
        level: 2,
        paragraphs: [
          'Combine the PIS Generator with the CPF, RG and phone generators and the CSV and JSON tools to assemble complete synthetic employees for fixtures and demos.',
          'Keep every field of a persona consistent so screenshots and QA sessions feel authentic without real data.',
          'Support teams can reproduce payroll bugs using synthetic personas that mirror production shapes without handling a real worker’s identifier.',
          'When automating integration suites, generate a fresh PIS for each run and assert both that a valid number is accepted and that a number with a deliberately altered check digit is rejected, so your validation covers the happy path and the failure path in every build.',
        ],
      },
    ],
    faq: [
      ...privacyFaq('en'),
      {
        q: 'Is a generated PIS real?',
        a: 'No. It is valid for format checking only, is not issued by any agency, and does not belong to a real person.',
      },
      {
        q: 'Can I use these numbers in production?',
        a: 'No. Use them only in development, staging and QA environments for software testing.',
      },
      {
        q: 'Will my validator accept them?',
        a: 'If it checks the digit algorithm, yes. If it queries official databases, generated numbers will fail the existence check — which is expected.',
      },
      {
        q: 'Does the tool store generated numbers?',
        a: 'No. They exist only in your browser session. Nothing is uploaded or logged by PDFWINDOWS.',
      },
    ],
    relatedTools: ['/gerador-cpf', '/gerador-cnpj', '/validar-cpf-cnpj', '/limpador-codigo'],
    cta: defaultCta('en', 'PIS/PASEP Generator'),
  },
  pt: {
    title: 'Gerador de PIS/PASEP para Testes de Software | PDFWINDOWS',
    description:
      'Gere números de PIS/PASEP com formato válido e dígito verificador correto para QA e desenvolvimento, no navegador.',
    keywords: 'gerador pis pasep teste, pis valido desenvolvimento, pis fake qa, nis teste, pis digito verificador',
    h1: 'Gerador de PIS/PASEP — Apenas para Testes',
    intro:
      'O Gerador de PIS/PASEP do PDFWINDOWS produz números de integração social brasileiros (também usados como NIS/NIT) com dígito verificador matematicamente correto, inteiramente no navegador. Ele existe para desenvolvedores e times de QA testarem sistemas de RH, folha e benefícios sem copiar identificadores reais de trabalhadores. Nenhum número é emitido por órgão algum e nenhum corresponde a uma pessoa real. Use para popular bancos de staging, verificar máscaras de input e exercitar validadores mantendo dados pessoais reais fora do ambiente.',
    toolName: 'Gerador de PIS/PASEP',
    benefits: [
      'Dígito verificador módulo onze correto',
      'Geração e cópia para a área de transferência em um clique',
      'Roda 100% no navegador — nada é enviado',
      'Ideal para testar formulários de RH e folha',
      'Sem cadastro, chave de API ou limites',
    ],
    useCases: [
      {
        title: 'QA de RH e folha de pagamento',
        body: 'Times de QA testam fluxos de cadastro de funcionários e de folha que capturam e validam PIS/PASEP. Gerar valores novos a cada execução evita reutilizar dados reais e mantém o staging alinhado à minimização de dados.',
      },
      {
        title: 'Verificação de máscara de input',
        body: 'Times frontend confirmam que máscaras de PIS (000.00000.00-0) formatam valores gerados de forma consistente em todos os navegadores, inclusive ao colar e no autofill.',
      },
      {
        title: 'Testes unitários de validador',
        body: 'Desenvolvedores adicionam números gerados a fixtures para garantir que validadores aceitam o formato correto e rejeitam dígitos adulterados.',
      },
      {
        title: 'Demos de sistemas de benefícios',
        body: 'Times de produto populam demos de benefícios ou no estilo eSocial com PIS sintéticos para screenshots e apresentações nunca exporem um identificador real.',
      },
      {
        title: 'Ensino de algoritmos de checksum',
        body: 'Instrutores usam o PIS como exemplo acessível de validação ponderada módulo onze em exercícios.',
      },
    ],
    howItWorks: [
      'Abra o Gerador de PIS/PASEP e leia o aviso.',
      'Clique em Gerar para criar um novo número com formato válido.',
      'Copie o valor para a área de transferência ou formulário de teste.',
      'Repita conforme necessário — cada clique gera um número diferente.',
    ],
    tips: [
      'Nunca apresente um PIS gerado como identificador real de trabalhador nem o use para fraude.',
      'Formato válido não implica existência nos registros oficiais — consultas oficiais vão rejeitá-lo, o que é esperado.',
      'Mantenha números sintéticos em fixtures específicas de ambiente, nunca em tabelas de produção com funcionários reais.',
      'Combine com os geradores de CPF e RG para montar personas de trabalhador sintéticas completas.',
      'Rotacione valores entre execuções para detectar suposições hardcoded nos testes.',
      'Documente no plano de testes que os PIS sintéticos vêm do gerador PDFWINDOWS.',
    ],
    sections: [
      {
        id: 'o-que-e-pis',
        heading: 'O que é o PIS/PASEP',
        level: 2,
        paragraphs: [
          'O PIS (trabalhadores da iniciativa privada) e o PASEP (servidores públicos) são números do programa de integração social, comumente exibidos como NIS/NIT em sistemas de previdência e benefícios. O número tem onze dígitos, sendo o último o verificador.',
          'Este gerador cria dez dígitos base aleatórios e calcula o décimo primeiro para o resultado passar na validação padrão usada por softwares de RH e folha.',
        ],
      },
      {
        id: 'algoritmo-explicado',
        heading: 'Como o dígito verificador é calculado',
        level: 2,
        paragraphs: [
          'Os dez dígitos base são multiplicados pelos pesos 3,2,9,8,7,6,5,4,3,2 e somados. A soma é tomada módulo onze; se o resto for menor que dois, o dígito é zero; caso contrário, é onze menos o resto.',
          'Como a ferramenta replica exatamente essa regra, a saída passa em máscaras client-side e validadores padrão, enquanto bases oficiais a tratam corretamente como inexistente.',
          'Para testes end-to-end automatizados, mocke ou pule qualquer etapa de verificação oficial e garanta apenas que sua validação se comporta como esperado.',
        ],
      },
      {
        id: 'privacidade-qa',
        heading: 'Benefícios de privacidade para times de QA',
        level: 2,
        paragraphs: [
          'Identificadores de trabalhadores são dados pessoais sensíveis. Copiar PIS reais em planilhas compartilhadas cria exposição evitável, enquanto geradores sintéticos mantêm dados realistas sem tocar na identidade de ninguém.',
          'Como a geração roda inteiramente no navegador, os valores de teste nunca chegam a uma API de dados falsos de terceiros nem a logs externos.',
        ],
      },
      {
        id: 'testes-integracao',
        heading: 'Construindo personas de trabalhador realistas',
        level: 2,
        paragraphs: [
          'Combine o Gerador de PIS com os geradores de CPF, RG e telefone e as ferramentas de CSV e JSON para montar funcionários sintéticos completos para fixtures e demos.',
          'Mantenha cada campo de uma persona consistente para que screenshots e sessões de QA pareçam autênticos sem dados reais.',
          'Times de suporte podem reproduzir bugs de folha usando personas sintéticas que espelham o formato de produção sem manipular o identificador real de um trabalhador.',
        ],
      },
    ],
    faq: [
      ...privacyFaq('pt'),
      {
        q: 'Um PIS gerado é real?',
        a: 'Não. É válido apenas para verificação de formato, não é emitido por nenhum órgão e não pertence a uma pessoa real.',
      },
      {
        q: 'Posso usar esses números em produção?',
        a: 'Não. Use apenas em ambientes de desenvolvimento, homologação e QA para testes de software.',
      },
      {
        q: 'Meu validador vai aceitá-los?',
        a: 'Se verificar o algoritmo de dígitos, sim. Se consultar bases oficiais, os números gerados falharão na existência — o que é esperado.',
      },
      {
        q: 'A ferramenta armazena os números gerados?',
        a: 'Não. Eles existem apenas na sessão do navegador. Nada é enviado ou registrado pelo PDFWINDOWS.',
      },
    ],
    relatedTools: ['/gerador-cpf', '/gerador-cnpj', '/validar-cpf-cnpj', '/limpador-codigo'],
    cta: defaultCta('pt', 'Gerador de PIS/PASEP'),
  },
  es: {
    title: 'Generador de PIS/PASEP para Pruebas de Software | PDFWINDOWS',
    description:
      'Genera números de PIS/PASEP con formato válido y dígito verificador correcto para QA y desarrollo, en el navegador.',
    keywords: 'generador pis pasep prueba, pis valido desarrollo, pis fake qa, nis prueba, pis digito verificador',
    h1: 'Generador de PIS/PASEP — Solo para Pruebas',
    intro:
      'El Generador de PIS/PASEP de PDFWINDOWS produce números de integración social brasileños (también usados como NIS/NIT) con dígito verificador matemáticamente correcto, enteramente en el navegador. Existe para que desarrolladores y equipos de QA prueben sistemas de RR. HH., nómina y beneficios sin copiar identificadores reales de trabajadores. Ningún número es emitido por órgano alguno y ninguno corresponde a una persona real. Úselo para poblar bases de staging, verificar máscaras de entrada y ejercitar validadores manteniendo datos personales reales fuera del entorno.',
    toolName: 'Generador de PIS/PASEP',
    benefits: [
      'Dígito verificador módulo once correcto',
      'Generación y copia al portapapeles en un clic',
      'Funciona 100% en el navegador — nada se sube',
      'Ideal para probar formularios de RR. HH. y nómina',
      'Sin registro, clave de API ni límites',
    ],
    useCases: [
      {
        title: 'QA de RR. HH. y nómina',
        body: 'Los equipos de QA prueban flujos de registro de empleados y de nómina que capturan y validan PIS/PASEP. Generar valores nuevos en cada ejecución evita reutilizar datos reales y mantiene staging alineado con la minimización de datos.',
      },
      {
        title: 'Verificación de máscara de entrada',
        body: 'Los equipos frontend confirman que las máscaras de PIS (000.00000.00-0) formatean los valores generados de forma consistente en todos los navegadores, incluido pegar y autocompletar.',
      },
      {
        title: 'Pruebas unitarias de validador',
        body: 'Los desarrolladores agregan números generados a fixtures para asegurar que los validadores aceptan el formato correcto y rechazan dígitos alterados.',
      },
      {
        title: 'Demos de sistemas de beneficios',
        body: 'Los equipos de producto pueblan demos de beneficios con PIS sintéticos para que capturas y presentaciones nunca expongan un identificador real.',
      },
      {
        title: 'Enseñanza de algoritmos de checksum',
        body: 'Los instructores usan el PIS como ejemplo accesible de validación ponderada módulo once en ejercicios.',
      },
    ],
    howItWorks: [
      'Abra el Generador de PIS/PASEP y lea el aviso.',
      'Haga clic en Generar para crear un nuevo número con formato válido.',
      'Copie el valor al portapapeles o formulario de prueba.',
      'Repita según necesidad — cada clic genera un número diferente.',
    ],
    tips: [
      'Nunca presente un PIS generado como identificador real de trabajador ni lo use para fraude.',
      'Formato válido no implica existencia en los registros oficiales — las consultas oficiales lo rechazarán, lo cual es esperado.',
      'Mantenga los números sintéticos en fixtures específicas de entorno, nunca en tablas de producción con empleados reales.',
      'Combine con los generadores de CPF y RG para construir personas de trabajador sintéticas completas.',
      'Rote valores entre ejecuciones para detectar suposiciones hardcoded en las pruebas.',
      'Documente en el plan de pruebas que los PIS sintéticos vienen del generador PDFWINDOWS.',
    ],
    sections: [
      {
        id: 'que-es-pis',
        heading: 'Qué es el PIS/PASEP',
        level: 2,
        paragraphs: [
          'El PIS (trabajadores del sector privado) y el PASEP (servidores públicos) son números del programa de integración social, comúnmente mostrados como NIS/NIT en sistemas de seguridad social y beneficios. El número tiene once dígitos, siendo el último el verificador.',
          'Este generador crea diez dígitos base aleatorios y calcula el undécimo para que el resultado pase la validación estándar usada por software de RR. HH. y nómina.',
        ],
      },
      {
        id: 'algoritmo-explicado',
        heading: 'Cómo se calcula el dígito verificador',
        level: 2,
        paragraphs: [
          'Los diez dígitos base se multiplican por los pesos 3,2,9,8,7,6,5,4,3,2 y se suman. La suma se toma módulo once; si el resto es menor que dos, el dígito es cero; de lo contrario, es once menos el resto.',
          'Como la herramienta replica exactamente esa regla, la salida pasa máscaras client-side y validadores estándar, mientras las bases oficiales la tratan correctamente como inexistente.',
          'Para pruebas end-to-end automatizadas, simule u omita cualquier paso de verificación oficial y asegúrese solo de que su validación se comporta como se espera.',
        ],
      },
      {
        id: 'privacidad-qa',
        heading: 'Beneficios de privacidad para equipos de QA',
        level: 2,
        paragraphs: [
          'Los identificadores de trabajadores son datos personales sensibles. Copiar PIS reales en hojas compartidas crea exposición evitable, mientras que los generadores sintéticos mantienen datos realistas sin tocar la identidad de nadie.',
          'Como la generación corre enteramente en el navegador, los valores de prueba nunca llegan a una API de datos falsos de terceros ni a logs externos.',
        ],
      },
      {
        id: 'pruebas-integracion',
        heading: 'Construyendo personas de trabajador realistas',
        level: 2,
        paragraphs: [
          'Combine el Generador de PIS con los generadores de CPF, RG y teléfono y las herramientas de CSV y JSON para armar empleados sintéticos completos para fixtures y demos.',
          'Mantenga cada campo de una persona consistente para que capturas y sesiones de QA se sientan auténticas sin datos reales.',
          'Los equipos de soporte pueden reproducir errores de nómina usando personas sintéticas que reflejan las formas de producción sin manipular el identificador real de un trabajador.',
        ],
      },
    ],
    faq: [
      ...privacyFaq('es'),
      {
        q: '¿Un PIS generado es real?',
        a: 'No. Es válido solo para verificación de formato, no es emitido por ningún órgano y no pertenece a una persona real.',
      },
      {
        q: '¿Puedo usar estos números en producción?',
        a: 'No. Úselos solo en entornos de desarrollo, staging y QA para pruebas de software.',
      },
      {
        q: '¿Mi validador los aceptará?',
        a: 'Si verifica el algoritmo de dígitos, sí. Si consulta bases oficiales, los números generados fallarán en la existencia — lo cual es esperado.',
      },
      {
        q: '¿La herramienta almacena los números generados?',
        a: 'No. Existen solo en la sesión del navegador. Nada se sube ni registra por PDFWINDOWS.',
      },
    ],
    relatedTools: ['/gerador-cpf', '/gerador-cnpj', '/validar-cpf-cnpj', '/limpador-codigo'],
    cta: defaultCta('es', 'Generador de PIS/PASEP'),
  },
};
