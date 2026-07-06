import type { ToolRichContent } from '../types';
import { privacyFaq, defaultCta } from '../helpers';

export const LIMPADOR_CODIGO_CONTENT: Record<'en' | 'pt' | 'es', ToolRichContent> = {
  en: {
    title: 'Code Formatter & Minifier Online Offline | PDFWINDOWS',
    description:
      'Format or minify HTML, CSS, and JavaScript locally in your browser. Prettier-powered, no upload, perfect for snippets and configs.',
    keywords:
      'code formatter online, minify js offline, prettier local, format html css, code cleaner browser, beautify javascript',
    h1: 'Code Cleaner — Format & Minify Locally',
    intro:
      'PDFWINDOWS Code Cleaner formats messy HTML, CSS, and JavaScript or compresses production-ready assets — all without pasting proprietary source code into remote SaaS formatters. Powered by Prettier running in your browser, the tool beautifies snippets for readability or minifies them to reduce payload size. Ideal for developers reviewing pull request diffs, students learning web structure, and DevOps engineers tidying configuration fragments before committing to internal repositories. Output appears instantly beside your input so you can compare line-by-line without saving temporary files to disk.',
    toolName: 'Code Cleaner',
    benefits: [
      'Format or minify HTML, CSS, and JavaScript',
      'Prettier engine bundled for consistent style',
      'Instant side-by-side input and output',
      'Instant side-by-side input and output',
      'No account, API key, or rate limits',
      'Great for snippets, configs, and email templates',
    ],
    useCases: [
      {
        title: 'Pull request cleanup',
        body: 'Paste minified third-party embed code, format it to readable structure, then review security implications before merging.',
      },
      {
        title: 'Email HTML templates',
        body: 'Marketing developers beautify table-based email HTML locally so client data in template variables is not sent to external formatters.',
      },
      {
        title: 'Production asset minification',
        body: 'Minify small inline script blocks or style snippets for landing pages when you do not want to spin up a full build pipeline.',
      },
      {
        title: 'Learning and teaching web fundamentals',
        body: 'Instructors format student submissions in the classroom to discuss indentation, nesting, and semantic structure without installing IDE plugins.',
      },
      {
        title: 'JSON-adjacent config tidying',
        body: 'After converting CSV to JSON elsewhere in PDFWINDOWS, paste related HTML or JS config fragments here for consistent formatting before deployment.',
      },
    ],
    howItWorks: [
      'Paste your HTML, CSS, or JavaScript into the input area.',
      'Select the language and choose format (beautify) or minify mode.',
      'Click process to transform the code locally.',
      'Copy the output to your editor, clipboard, or build pipeline.',
    ],
    tips: [
      'Format mode adds indentation — use it for reading; minify mode removes whitespace for production.',
      'Very large files may slow the browser tab — split huge bundles into smaller chunks.',
      'Minified output is hard to debug — keep a formatted copy in version control.',
      'HTML with template placeholders may need manual fixes after formatting.',
      'Pair with XML to JSON when cleaning data layer files alongside presentation code.',
      'Always scan third-party minified scripts for security before reformatting and committing.',
      'Copy formatted output back to your IDE with one click instead of saving temporary files that might contain API keys.',
    ],
    sections: [
      {
        id: 'why-local-formatting',
        heading: 'Why format code locally?',
        level: 2,
        paragraphs: [
          'Online beautifiers often store pasted code on servers for analytics, training datasets, or breach exposure. When your snippet contains API keys, internal URLs, or customer PII embedded in HTML templates, that risk is unacceptable. PDFWINDOWS runs Prettier client-side so bytes never traverse the network.',
          'Local formatting also works on airplanes, secure networks, and air-gapped machines once the app is loaded.',
          'Consultants reviewing client WordPress themes on-site can beautify minified theme files without pasting proprietary PHP or JavaScript into public formatter websites that index pasted content for search engines.',
        ],
      },
      {
        id: 'format-vs-minify',
        heading: 'Format versus minify modes',
        level: 2,
        paragraphs: [
          'Format mode expands code with consistent indentation and line breaks, optimized for human review. Minify mode removes non-essential whitespace and comments to shrink file size for HTTP delivery.',
          'Use format when debugging or teaching; use minify for final embed snippets where byte count affects page load metrics.',
        ],
        bullets: [
          'Format — readable indentation, preserved semantics',
          'Minify — smaller output, harder to read',
          'HTML — table email templates and landing fragments',
          'CSS — design token files and inline style blocks',
          'JavaScript — widget embeds and small utilities',
        ],
      },
      {
        id: 'prettier-engine',
        heading: 'Prettier engine in the browser',
        level: 2,
        paragraphs: [
          'Prettier is the de facto standard for opinionated JavaScript and web formatting. Bundling it inside PDFWINDOWS means you get the same output style teams expect from CI pipelines — without checking code into a repo just to run the formatter.',
          'Opinionated rules reduce bike-shedding: there is one correct indentation outcome, which speeds up code review.',
        ],
      },
      {
        id: 'security-hygiene',
        heading: 'Security hygiene for pasted code',
        level: 2,
        paragraphs: [
          'Formatting does not sanitize malicious code. If you beautify an obfuscated script from an untrusted source, read the output carefully before execution. The tool is for presentation, not security auditing.',
          'For production deployments, combine formatted review with your normal linting, testing, and dependency scanning workflow.',
          'Teams working under strict IP policies appreciate that proprietary algorithms pasted for formatting never appear in vendor logs or support tickets.',
        ],
      },
    ],
    faq: [
      ...privacyFaq('en'),
      {
        q: 'Which languages are supported?',
        a: 'The tool supports HTML, CSS, and JavaScript formatting and minification. Use dedicated converters for JSON, CSV, or XML data formats.',
      },
      {
        q: 'Is my code uploaded when I format?',
        a: 'No. Prettier runs entirely in your browser memory. Code is never transmitted to PDFWINDOWS servers.',
      },
      {
        q: 'Can I format TypeScript or JSX?',
        a: 'JavaScript mode handles many JSX patterns. Complex TypeScript may require full project context best served by local IDE tooling.',
      },
      {
        q: 'Does minify obfuscate variable names?',
        a: 'Minify mode removes whitespace and comments. It does not perform advanced obfuscation like dedicated manglers in webpack or terser.',
      },
      {
        q: 'Is there a file size limit?',
        a: 'There is no server limit because nothing is uploaded. Very large pastes are constrained only by browser memory.',
      },
    ],
    relatedTools: ['/csv-to-json', '/json-to-csv', '/xml-to-json', '/gerador-cpf'],
    cta: defaultCta('en', 'Code Cleaner'),
  },
  pt: {
    title: 'Formatador e Minificador de Código Online Offline | PDFWINDOWS',
    description:
      'Formate ou minifique HTML, CSS e JavaScript localmente no navegador. Com Prettier, sem upload, ideal para snippets e configs.',
    keywords:
      'formatar codigo online, minificar js offline, prettier local, formatar html css, limpador codigo navegador, beautify javascript',
    h1: 'Limpador de Código — Formatar e Minificar Localmente',
    intro:
      'O Limpador de Código do PDFWINDOWS formata HTML, CSS e JavaScript bagunçados ou comprime assets prontos para produção — tudo sem colar código proprietário em formatadores SaaS remotos. Com Prettier rodando no navegador, a ferramenta embeleza snippets para leitura ou minifica para reduzir tamanho. Ideal para desenvolvedores revisando PRs, estudantes aprendendo estrutura web e engenheiros DevOps organizando fragmentos de configuração antes de commitar. A saída aparece instantaneamente ao lado da entrada para comparar linha a linha sem salvar arquivos temporários no disco.',
    toolName: 'Limpador de Código',
    benefits: [
      'Formate ou minifique HTML, CSS e JavaScript',
      'Motor Prettier integrado para estilo consistente',
      'Código-fonte nunca sai do navegador',
      'Entrada e saída instantâneas lado a lado',
      'Sem conta, API key ou limites de taxa',
      'Ótimo para snippets, configs e templates de e-mail',
    ],
    useCases: [
      {
        title: 'Limpeza de pull request',
        body: 'Cole código minificado de terceiros, formate para estrutura legível e revise implicações de segurança antes do merge.',
      },
      {
        title: 'Templates HTML de e-mail',
        body: 'Desenvolvedores de marketing embelezam HTML de e-mail localmente para dados de clientes em variáveis não irem a formatadores externos.',
      },
      {
        title: 'Minificação de assets de produção',
        body: 'Minifique blocos inline de script ou estilo em landing pages sem subir um pipeline de build completo.',
      },
      {
        title: 'Ensino de fundamentos web',
        body: 'Instrutores formatam entregas de alunos em sala para discutir indentação, aninhamento e estrutura semântica.',
      },
      {
        title: 'Organização de configs adjacentes a JSON',
        body: 'Após converter CSV para JSON no PDFWINDOWS, cole fragmentos HTML ou JS relacionados aqui para formatação consistente.',
      },
    ],
    howItWorks: [
      'Cole HTML, CSS ou JavaScript na área de entrada.',
      'Selecione a linguagem e escolha formatar (embelezar) ou minificar.',
      'Clique em processar para transformar o código localmente.',
      'Copie a saída para o editor, área de transferência ou pipeline.',
    ],
    tips: [
      'Modo formatar adiciona indentação — use para leitura; minificar remove espaços para produção.',
      'Arquivos muito grandes podem deixar a aba lenta — divida bundles enormes em partes.',
      'Saída minificada é difícil de debugar — mantenha cópia formatada no controle de versão.',
      'HTML com placeholders de template pode precisar ajustes manuais após formatação.',
      'Combine com XML para JSON ao limpar arquivos de dados junto com código de apresentação.',
      'Sempre analise scripts minificados de terceiros antes de reformatar e commitar.',
      'Copie a saída formatada de volta ao IDE com um clique em vez de salvar arquivos temporários que podem conter chaves de API.',
      'Use modo formatar antes de code review e minificar apenas na etapa final de deploy.',
    ],
    sections: [
      {
        id: 'por-que-formatar-local',
        heading: 'Por que formatar código localmente?',
        level: 2,
        paragraphs: [
          'Embelezadores online frequentemente armazenam código colado em servidores para analytics, datasets ou exposição em vazamentos. Quando o snippet contém chaves de API, URLs internas ou PII em templates HTML, esse risco é inaceitável. O PDFWINDOWS executa Prettier no cliente para bytes nunca trafegarem na rede.',
          'Formatação local também funciona em aviões, redes seguras e máquinas isoladas após carregar o app.',
          'Consultores que revisam temas WordPress no cliente podem embelezar arquivos minificados sem colar PHP ou JavaScript proprietário em sites públicos de formatação que indexam conteúdo colado para mecanismos de busca.',
        ],
      },
      {
        id: 'formatar-vs-minificar',
        heading: 'Modos formatar versus minificar',
        level: 2,
        paragraphs: [
          'Modo formatar expande código com indentação e quebras consistentes, otimizado para revisão humana. Modo minificar remove espaços e comentários não essenciais para reduzir tamanho na entrega HTTP.',
          'Use formatar ao debugar ou ensinar; use minificar em snippets finais onde bytes afetam métricas de carregamento.',
        ],
        bullets: [
          'Formatar — indentação legível, semântica preservada',
          'Minificar — saída menor, difícil de ler',
          'HTML — templates de e-mail e fragmentos de landing',
          'CSS — arquivos de tokens e blocos inline',
          'JavaScript — embeds de widget e utilitários pequenos',
        ],
      },
      {
        id: 'motor-prettier',
        heading: 'Motor Prettier no navegador',
        level: 2,
        paragraphs: [
          'Prettier é o padrão de fato para formatação opinativa de JavaScript e web. Integrá-lo ao PDFWINDOWS entrega o mesmo estilo que times esperam de pipelines CI — sem commitar código só para rodar o formatador.',
          'Regras opinativas reduzem discussões: há um resultado de indentação correto, acelerando code review.',
        ],
      },
      {
        id: 'higiene-seguranca',
        heading: 'Higiene de segurança para código colado',
        level: 2,
        paragraphs: [
          'Formatação não sanitiza código malicioso. Se embelezar script ofuscado de fonte não confiável, leia a saída com cuidado antes de executar. A ferramenta é para apresentação, não auditoria de segurança.',
          'Para deploy em produção, combine revisão formatada com lint, testes e varredura de dependências habituais.',
          'Equipes sob políticas rígidas de PI valorizam que algoritmos proprietários colados para formatação nunca aparecem em logs ou tickets de suporte de fornecedores.',
        ],
      },
    ],
    faq: [
      ...privacyFaq('pt'),
      {
        q: 'Quais linguagens são suportadas?',
        a: 'A ferramenta suporta formatação e minificação de HTML, CSS e JavaScript. Use conversores dedicados para JSON, CSV ou XML.',
      },
      {
        q: 'Meu código é enviado ao formatar?',
        a: 'Não. O Prettier roda inteiramente na memória do navegador. Código nunca é transmitido a servidores PDFWINDOWS.',
      },
      {
        q: 'Posso formatar TypeScript ou JSX?',
        a: 'O modo JavaScript trata muitos padrões JSX. TypeScript complexo pode exigir contexto de projeto em IDE local.',
      },
      {
        q: 'Minificar ofusca nomes de variáveis?',
        a: 'Modo minificar remove espaços e comentários. Não faz ofuscação avançada como manglers do webpack ou terser.',
      },
      {
        q: 'Há limite de tamanho de arquivo?',
        a: 'Não há limite de servidor porque nada é enviado. Colagens enormes dependem apenas da memória do navegador.',
      },
    ],
    relatedTools: ['/csv-to-json', '/json-to-csv', '/xml-to-json', '/gerador-cpf'],
    cta: defaultCta('pt', 'Limpador de Código'),
  },
  es: {
    title: 'Formateador y Minificador de Código Online Offline | PDFWINDOWS',
    description:
      'Formatee o minifique HTML, CSS y JavaScript localmente en el navegador. Con Prettier, sin subida, ideal para snippets y configs.',
    keywords:
      'formatear codigo online, minificar js offline, prettier local, formatear html css, limpiador codigo navegador, beautify javascript',
    h1: 'Limpiador de Código — Formatear y Minificar Localmente',
    intro:
      'El Limpiador de Código de PDFWINDOWS formatea HTML, CSS y JavaScript desordenados o comprime assets listos para producción — todo sin pegar código propietario en formateadores SaaS remotos. Con Prettier ejecutándose en el navegador, la herramienta embellece snippets para lectura o minifica para reducir tamaño. Ideal para desarrolladores revisando PRs, estudiantes aprendiendo estructura web e ingenieros DevOps ordenando fragmentos de configuración antes de commitear. La salida aparece al instante junto a la entrada para comparar línea a línea sin guardar archivos temporales en disco.',
    toolName: 'Limpiador de Código',
    benefits: [
      'Formatee o minifique HTML, CSS y JavaScript',
      'Motor Prettier integrado para estilo consistente',
      'Código fuente nunca sale del navegador',
      'Entrada y salida instantáneas lado a lado',
      'Sin cuenta, API key ni límites de tasa',
      'Ideal para snippets, configs y plantillas de correo',
    ],
    useCases: [
      {
        title: 'Limpieza de pull request',
        body: 'Pegue código minificado de terceros, formatee a estructura legible y revise implicaciones de seguridad antes del merge.',
      },
      {
        title: 'Plantillas HTML de correo',
        body: 'Desarrolladores de marketing embellecen HTML de correo localmente para que datos de clientes en variables no vayan a formateadores externos.',
      },
      {
        title: 'Minificación de assets de producción',
        body: 'Minifique bloques inline de script o estilo en landing pages sin levantar un pipeline de build completo.',
      },
      {
        title: 'Enseñanza de fundamentos web',
        body: 'Instructores formatean entregas de alumnos en clase para discutir indentación, anidamiento y estructura semántica.',
      },
      {
        title: 'Orden de configs adyacentes a JSON',
        body: 'Tras convertir CSV a JSON en PDFWINDOWS, pegue fragmentos HTML o JS relacionados aquí para formateo consistente.',
      },
    ],
    howItWorks: [
      'Pegue HTML, CSS o JavaScript en el área de entrada.',
      'Seleccione el lenguaje y elija formatear (embellecer) o minificar.',
      'Haga clic en procesar para transformar el código localmente.',
      'Copie la salida al editor, portapapeles o pipeline.',
    ],
    tips: [
      'Modo formatear añade indentación — úselo para lectura; minificar quita espacios para producción.',
      'Archivos muy grandes pueden ralentizar la pestaña — divida bundles enormes en partes.',
      'Salida minificada es difícil de depurar — mantenga copia formateada en control de versiones.',
      'HTML con placeholders de plantilla puede necesitar ajustes manuales tras formatear.',
      'Combine con XML a JSON al limpiar archivos de datos junto con código de presentación.',
      'Siempre analice scripts minificados de terceros antes de reformatear y commitear.',
      'Copie la salida formateada de vuelta al IDE con un clic en lugar de guardar archivos temporales que pueden contener claves API.',
      'Use modo formatear antes del code review y minificar solo en la etapa final de deploy.',
    ],
    sections: [
      {
        id: 'por-que-formatear-local',
        heading: '¿Por qué formatear código localmente?',
        level: 2,
        paragraphs: [
          'Embellecedores online frecuentemente almacenan código pegado en servidores para analytics, datasets o exposición en filtraciones. Cuando el snippet contiene claves API, URLs internas o PII en plantillas HTML, ese riesgo es inaceptable. PDFWINDOWS ejecuta Prettier en el cliente para que bytes nunca transiten la red.',
          'Formateo local también funciona en aviones, redes seguras y máquinas aisladas tras cargar la app.',
          'Consultores que revisan temas WordPress in situ pueden embellecer archivos minificados sin pegar PHP o JavaScript propietario en sitios públicos de formateo que indexan contenido pegado para motores de búsqueda.',
        ],
      },
      {
        id: 'formatear-vs-minificar',
        heading: 'Modos formatear versus minificar',
        level: 2,
        paragraphs: [
          'Modo formatear expande código con indentación y saltos consistentes, optimizado para revisión humana. Modo minificar quita espacios y comentarios no esenciales para reducir tamaño en entrega HTTP.',
          'Use formatear al depurar o enseñar; use minificar en snippets finales donde bytes afectan métricas de carga.',
        ],
        bullets: [
          'Formatear — indentación legible, semántica preservada',
          'Minificar — salida menor, difícil de leer',
          'HTML — plantillas de correo y fragmentos de landing',
          'CSS — archivos de tokens y bloques inline',
          'JavaScript — embeds de widget y utilidades pequeñas',
        ],
      },
      {
        id: 'motor-prettier',
        heading: 'Motor Prettier en el navegador',
        level: 2,
        paragraphs: [
          'Prettier es el estándar de facto para formateo opinativo de JavaScript y web. Integrarlo en PDFWINDOWS entrega el mismo estilo que equipos esperan de pipelines CI — sin commitear código solo para ejecutar el formateador.',
          'Reglas opinativas reducen discusiones: hay un resultado de indentación correcto, acelerando code review.',
        ],
      },
      {
        id: 'higiene-seguridad',
        heading: 'Higiene de seguridad para código pegado',
        level: 2,
        paragraphs: [
          'Formatear no sanitiza código malicioso. Si embellece script ofuscado de fuente no confiable, lea la salida con cuidado antes de ejecutar. La herramienta es para presentación, no auditoría de seguridad.',
          'Para deploy en producción, combine revisión formateada con lint, pruebas y escaneo de dependencias habituales.',
          'Equipos bajo políticas estrictas de PI valoran que algoritmos propietarios pegados para formatear nunca aparecen en logs o tickets de soporte de proveedores.',
        ],
      },
    ],
    faq: [
      ...privacyFaq('es'),
      {
        q: '¿Qué lenguajes se soportan?',
        a: 'La herramienta soporta formateo y minificación de HTML, CSS y JavaScript. Use conversores dedicados para JSON, CSV o XML.',
      },
      {
        q: '¿Se sube mi código al formatear?',
        a: 'No. Prettier corre enteramente en memoria del navegador. El código nunca se transmite a servidores PDFWINDOWS.',
      },
      {
        q: '¿Puedo formatear TypeScript o JSX?',
        a: 'El modo JavaScript maneja muchos patrones JSX. TypeScript complejo puede requerir contexto de proyecto en IDE local.',
      },
      {
        q: '¿Minificar ofusca nombres de variables?',
        a: 'Modo minificar quita espacios y comentarios. No hace ofuscación avanzada como manglers de webpack o terser.',
      },
      {
        q: '¿Hay límite de tamaño de archivo?',
        a: 'No hay límite de servidor porque nada se sube. Pegados enormes dependen solo de la memoria del navegador.',
      },
    ],
    relatedTools: ['/csv-to-json', '/json-to-csv', '/xml-to-json', '/gerador-cpf'],
    cta: defaultCta('es', 'Limpiador de Código'),
  },
};
