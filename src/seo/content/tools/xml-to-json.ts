import type { ToolRichContent } from '../types';
import { privacyFaq, defaultCta } from '../helpers';

export const XML_TO_JSON_CONTENT: Record<'en' | 'pt' | 'es', ToolRichContent> = {
  en: {
    title: 'XML to JSON Online Offline | PDFWINDOWS',
    description:
      'Convert XML documents to JSON in your browser. Parse enterprise feeds and config files locally — no upload, private transformation.',
    keywords:
      'xml to json, convert xml offline, xml parser browser, enterprise xml json free, xml json converter local',
    h1: 'XML to JSON',
    intro:
      'Legacy integrations, government filings, and enterprise middleware still ship XML — while modern APIs, JavaScript clients, and serverless functions expect JSON. Manual rewriting is slow, and cloud XML parsers create another copy of payloads that may include account numbers, health identifiers, or signed contract terms. PDFWINDOWS converts XML to JSON entirely in your browser: load a file or paste markup, parse the tree locally, and export JSON you can feed to fetch handlers, test harnesses, or CSV flattening tools without routing sensitive XML through third-party infrastructure. Repeated elements, attributes, and namespace prefixes are preserved in a predictable object shape you can inspect before wiring production integrations.',
    toolName: 'XML to JSON',
    benefits: [
      'Transform XML element trees into JSON objects',
      'Parse locally — markup never uploaded to conversion servers',
      'Quick inspection of nested enterprise feeds',
      'No installation or API credentials required',
      'Chain with JSON to CSV for spreadsheet analysis',
    ],
    useCases: [
      {
        title: 'API migration and adapter layers',
        body:
          'Teams wrapping SOAP or XML-RPC backends behind REST gateways need JSON samples for contract tests. Local conversion lets engineers explore element shapes from staging responses without posting those responses to public parser sites.',
      },
      {
        title: 'Configuration and build manifests',
        body:
          'Older deployment tools emit XML configs; modern CI scripts read JSON. Converting manifests on a secure workstation keeps internal hostnames and credential placeholders out of SaaS transformation logs.',
      },
      {
        title: 'Government and standards submissions',
        body:
          'Regulatory XML schemas arrive as large nested documents. Developers convert snippets to JSON for validation scripts and documentation generators while full filings stay on compliant machines.',
      },
      {
        title: 'RSS, SVG, and structured content inspection',
        body:
          'Content teams inspect feed XML and icon sprite definitions by converting to JSON for pretty-printing in editors. Browser-side parsing avoids leaking unpublished feed URLs or CDN paths.',
      },
      {
        title: 'Debugging integration payloads',
        body:
          'Support engineers paste failing XML request bodies from logs into the converter to compare structure against expected JSON mocks, accelerating root-cause analysis without desktop XML tools.',
      },
    ],
    howItWorks: [
      'Upload an .xml file or paste XML markup into the input area.',
      'Select XML to JSON conversion.',
      'The browser parses elements, attributes, and text nodes.',
      'Review the generated JSON structure in the output panel.',
      'Copy or download the .json result for downstream use.',
    ],
    tips: [
      'Well-formed XML is required — fix unclosed tags before converting.',
      'Attributes typically map to property keys alongside child elements — verify naming.',
      'Repeated sibling elements may become arrays — check array wrapping rules.',
      'Large XML files can be memory-heavy — trim test fixtures to relevant subtrees.',
      'Namespaces may appear in key names — strip or alias in post-processing if needed.',
      'Validate JSON output against your consumer schema before production deployment.',
      'Extract the SOAP Body or root business element first when envelopes add noisy wrapper nodes.',
      'Pretty-print XML in an editor when debugging namespace or attribute mapping issues.',
      'Keep a backup of the original XML until you validate JSON against your API schema.',
    ],
    sections: [
      {
        id: 'xml-json-mapping',
        heading: 'How XML elements become JSON properties',
        level: 2,
        paragraphs: [
          'XML is hierarchical: elements nest inside parents, attributes decorate tags, and text nodes carry values. JSON represents the same tree as nested objects and arrays. Converters walk the DOM and emit keys for tag names, often merging attributes into the same object as child content.',
          'Repeated elements with the same tag name usually collapse into JSON arrays so consumers can iterate predictably.',
        ],
      },
      {
        id: 'attributes-text',
        heading: 'Attributes, text nodes, and mixed content',
        level: 2,
        paragraphs: [
          'Mixed content — text interleaved with child elements — is the hardest case. Parsers may represent text in a dedicated property such as _text or #text. Inspect output when converting documents with inline formatting.',
        ],
        bullets: [
          'Attributes — often prefixed or nested under @ keys',
          'Single text child — may flatten to a string value',
          'Mixed content — may need manual cleanup after conversion',
        ],
      },
      {
        id: 'privacy-xml',
        heading: 'Sensitive XML stays local',
        level: 2,
        paragraphs: [
          'Enterprise XML frequently encodes PII, financial instruments, and authentication assertions. Uploading those files to online converters violates data-handling policies. PDFWINDOWS parses XML in browser memory only — no retention, no server-side schema logging.',
          'That is especially relevant for SAML metadata, HL7-style test fixtures, and signed contract XML where even attributes carry identifiers. Local parsing lets integration engineers preview structure before code changes without opening a vendor DPA.',
        ],
      },
      {
        id: 'xml-pipeline',
        heading: 'XML in a JSON-first toolchain',
        level: 2,
        paragraphs: [
          'Convert XML to JSON, then flatten to CSV for business users or format with Code Cleaner for readable diffs. When sources are already tabular, CSV to JSON may be simpler — use XML to JSON when the upstream system only speaks markup.',
        ],
        bullets: [
          'JSON to CSV — spreadsheet views of converted data',
          'CSV to JSON — alternate path from tabular exports',
          'Code Cleaner — beautify JSON output for reviews',
        ],
      },
    ],
    faq: [
      ...privacyFaq('en'),
      {
        q: 'Does the converter validate against XSD schemas?',
        a: 'No. It parses well-formed XML structurally. Schema validation is a separate step in your integration pipeline.',
      },
      {
        q: 'How are XML namespaces handled?',
        a: 'Namespace prefixes often appear in JSON keys. You may need to normalize keys in a follow-up script.',
      },
      {
        q: 'Can I convert JSON back to XML?',
        a: 'This tool is one-way XML to JSON. Round-trip XML generation requires dedicated serializers not covered here.',
      },
      {
        q: 'What about very large enterprise files?',
        a: 'Browser memory is the limit. Extract subtrees for development or split files at logical boundaries.',
      },
      {
        q: 'Is CDATA preserved?',
        a: 'CDATA sections typically become string values in JSON. Special characters should survive as Unicode text.',
      },
    ],
    relatedTools: ['/json-to-csv', '/csv-to-json', '/limpador-codigo'],
    cta: defaultCta('en', 'XML to JSON'),
  },
  pt: {
    title: 'XML para JSON Online Offline | PDFWINDOWS',
    description:
      'Converta documentos XML em JSON no navegador. Analise feeds corporativos e configs localmente — sem upload, transformação privada.',
    keywords:
      'xml para json, converter xml offline, parser xml navegador, xml json corporativo gratis, conversor xml json local',
    h1: 'XML para JSON',
    intro:
      'Integrações legadas, declarações governamentais e middleware corporativo ainda entregam XML — enquanto APIs modernas, clientes JavaScript e funções serverless esperam JSON. Reescrever manualmente é lento, e parsers XML na nuvem criam outra cópia de payloads que podem incluir números de conta, identificadores de saúde ou termos contratuais assinados. O PDFWINDOWS converte XML para JSON inteiramente no navegador: carregue arquivo ou cole markup, analise a árvore localmente e exporte JSON para handlers fetch, harnesses de teste ou ferramentas de achatamento CSV sem rotear XML sensível por infraestrutura de terceiros.',
    toolName: 'XML para JSON',
    benefits: [
      'Transforme árvores de elementos XML em objetos JSON',
      'Análise local — markup nunca enviado a servidores de conversão',
      'Inspeção rápida de feeds corporativos aninhados',
      'Sem instalação ou credenciais de API',
      'Encadeie com JSON para CSV para análise em planilha',
    ],
    useCases: [
      {
        title: 'Migração de API e camadas adaptadoras',
        body:
          'Equipes que envolvem backends SOAP ou XML-RPC em gateways REST precisam de amostras JSON para testes de contrato. Conversão local permite explorar formas de elementos de respostas de staging sem postar essas respostas em sites públicos de parser.',
      },
      {
        title: 'Configuração e manifests de build',
        body:
          'Ferramentas de deploy antigas emitem configs XML; scripts CI modernos leem JSON. Converter manifests em estação segura mantém hostnames internos e placeholders de credencial fora de logs SaaS de transformação.',
      },
      {
        title: 'Submissões governamentais e de padrões',
        body:
          'Schemas XML regulatórios chegam como documentos aninhados grandes. Desenvolvedores convertem trechos para JSON em scripts de validação e geradores de documentação enquanto declarações completas permanecem em máquinas conformes.',
      },
      {
        title: 'Inspeção de RSS, SVG e conteúdo estruturado',
        body:
          'Equipes de conteúdo inspecionam XML de feeds e definições de sprites convertendo para JSON para pretty-print em editores. Parsing no navegador evita vazar URLs de feeds não publicados ou caminhos de CDN.',
      },
      {
        title: 'Debug de payloads de integração',
        body:
          'Engenheiros de suporte colam corpos XML com falha de logs no conversor para comparar estrutura com mocks JSON esperados, acelerando análise de causa raiz sem ferramentas XML desktop.',
      },
    ],
    howItWorks: [
      'Envie arquivo .xml ou cole markup XML na área de entrada.',
      'Selecione conversão XML para JSON.',
      'O navegador analisa elementos, atributos e nós de texto.',
      'Revise a estrutura JSON gerada no painel de saída.',
      'Copie ou baixe o resultado .json para uso posterior.',
    ],
    tips: [
      'XML bem formado é obrigatório — corrija tags não fechadas antes de converter.',
      'Atributos costumam mapear para chaves de propriedade junto com elementos filhos — verifique nomes.',
      'Elementos irmãos repetidos podem virar arrays — confira regras de envolvimento.',
      'Arquivos XML grandes podem consumir muita memória — corte fixtures de teste para subárvores relevantes.',
      'Namespaces podem aparecer em nomes de chave — remova ou alias em pós-processamento se necessário.',
      'Valide saída JSON contra schema do consumidor antes de deploy em produção.',
    ],
    sections: [
      {
        id: 'mapeamento-xml-json',
        heading: 'Como elementos XML viram propriedades JSON',
        level: 2,
        paragraphs: [
          'XML é hierárquico: elementos aninham dentro de pais, atributos decoram tags e nós de texto carregam valores. JSON representa a mesma árvore como objetos e arrays aninhados. Conversores percorrem o DOM e emitem chaves para nomes de tag, frequentemente fundindo atributos no mesmo objeto que conteúdo filho.',
          'Elementos repetidos com o mesmo nome de tag costumam colapsar em arrays JSON para iteração previsível.',
        ],
      },
      {
        id: 'atributos-texto',
        heading: 'Atributos, nós de texto e conteúdo misto',
        level: 2,
        paragraphs: [
          'Conteúdo misto — texto intercalado com elementos filhos — é o caso mais difícil. Parsers podem representar texto em propriedade dedicada como _text ou #text. Inspecione saída ao converter documentos com formatação inline.',
        ],
        bullets: [
          'Atributos — frequentemente prefixados ou sob chaves @',
          'Filho de texto único — pode achatar para valor string',
          'Conteúdo misto — pode exigir limpeza manual após conversão',
        ],
      },
      {
        id: 'privacidade-xml',
        heading: 'XML sensível permanece local',
        level: 2,
        paragraphs: [
          'XML corporativo frequentemente codifica PII, instrumentos financeiros e asserções de autenticação. Enviar esses arquivos a conversores online viola políticas de tratamento de dados. O PDFWINDOWS analisa XML apenas na memória do navegador — sem retenção, sem log de schema no servidor.',
        ],
      },
      {
        id: 'pipeline-xml',
        heading: 'XML em toolchain JSON-first',
        level: 2,
        paragraphs: [
          'Converta XML para JSON, depois achate para CSV para usuários de negócio ou formate com Limpador de Código para diffs legíveis. Quando fontes já são tabulares, CSV para JSON pode ser mais simples — use XML para JSON quando o sistema upstream só fala markup.',
        ],
        bullets: [
          'JSON para CSV — visões em planilha de dados convertidos',
          'CSV para JSON — caminho alternativo a partir de exports tabulares',
          'Limpador de Código — embelezar saída JSON para revisões',
        ],
      },
    ],
    faq: [
      ...privacyFaq('pt'),
      {
        q: 'O conversor valida contra schemas XSD?',
        a: 'Não. Analisa XML bem formado estruturalmente. Validação de schema é etapa separada no seu pipeline de integração.',
      },
      {
        q: 'Como namespaces XML são tratados?',
        a: 'Prefixos de namespace costumam aparecer em chaves JSON. Pode ser necessário normalizar chaves em script posterior.',
      },
      {
        q: 'Posso converter JSON de volta para XML?',
        a: 'Esta ferramenta é XML para JSON em uma via. Geração XML de ida e volta exige serializadores dedicados não cobertos aqui.',
      },
      {
        q: 'E arquivos corporativos muito grandes?',
        a: 'Memória do navegador é o limite. Extraia subárvores para desenvolvimento ou divida arquivos em limites lógicos.',
      },
      {
        q: 'CDATA é preservado?',
        a: 'Seções CDATA tipicamente viram valores string em JSON. Caracteres especiais devem sobreviver como texto Unicode.',
      },
    ],
    relatedTools: ['/json-to-csv', '/csv-to-json', '/limpador-codigo'],
    cta: defaultCta('pt', 'XML para JSON'),
  },
  es: {
    title: 'XML a JSON Online Offline | PDFWINDOWS',
    description:
      'Convierta documentos XML a JSON en su navegador. Analice feeds corporativos y configs localmente — sin subida, transformación privada.',
    keywords:
      'xml a json, convertir xml offline, parser xml navegador, xml json corporativo gratis, conversor xml json local',
    h1: 'XML a JSON',
    intro:
      'Integraciones heredadas, declaraciones gubernamentales y middleware empresarial aún entregan XML — mientras APIs modernas, clientes JavaScript y funciones serverless esperan JSON. Reescribir manualmente es lento, y los parsers XML en la nube crean otra copia de payloads que pueden incluir números de cuenta, identificadores de salud o términos contractuales firmados. PDFWINDOWS convierte XML a JSON completamente en su navegador: cargue archivo o pegue markup, analice el árbol localmente y exporte JSON para handlers fetch, harnesses de prueba o herramientas de aplanado CSV sin enrutar XML sensible por infraestructura de terceros.',
    toolName: 'XML a JSON',
    benefits: [
      'Transforme árboles de elementos XML en objetos JSON',
      'Análisis local — markup nunca enviado a servidores de conversión',
      'Inspección rápida de feeds corporativos anidados',
      'Sin instalación ni credenciales API',
      'Encadene con JSON a CSV para análisis en hoja',
    ],
    useCases: [
      {
        title: 'Migración de API y capas adaptadoras',
        body:
          'Equipos que envuelven backends SOAP o XML-RPC detrás de gateways REST necesitan muestras JSON para pruebas de contrato. La conversión local permite explorar formas de elementos de respuestas de staging sin publicar esas respuestas en sitios públicos de parser.',
      },
      {
        title: 'Configuración y manifiestos de build',
        body:
          'Herramientas de despliegue antiguas emiten configs XML; scripts CI modernos leen JSON. Convertir manifiestos en estación segura mantiene hostnames internos y placeholders de credencial fuera de registros SaaS de transformación.',
      },
      {
        title: 'Presentaciones gubernamentales y de estándares',
        body:
          'Esquemas XML regulatorios llegan como documentos anidados grandes. Desarrolladores convierten fragmentos a JSON para scripts de validación y generadores de documentación mientras presentaciones completas permanecen en máquinas conformes.',
      },
      {
        title: 'Inspección de RSS, SVG y contenido estructurado',
        body:
          'Equipos de contenido inspeccionan XML de feeds y definiciones de sprites convirtiendo a JSON para pretty-print en editores. El análisis en navegador evita filtrar URLs de feeds no publicados o rutas CDN.',
      },
      {
        title: 'Depuración de payloads de integración',
        body:
          'Ingenieros de soporte pegan cuerpos XML fallidos de logs en el conversor para comparar estructura con mocks JSON esperados, acelerando análisis de causa raíz sin herramientas XML de escritorio.',
      },
    ],
    howItWorks: [
      'Suba archivo .xml o pegue markup XML en el área de entrada.',
      'Seleccione conversión XML a JSON.',
      'El navegador analiza elementos, atributos y nodos de texto.',
      'Revise la estructura JSON generada en el panel de salida.',
      'Copie o descargue el resultado .json para uso posterior.',
    ],
    tips: [
      'Se requiere XML bien formado — corrija etiquetas sin cerrar antes de convertir.',
      'Los atributos suelen mapear a claves de propiedad junto con elementos hijos — verifique nombres.',
      'Elementos hermanos repetidos pueden volverse arrays — confirme reglas de envoltura.',
      'Archivos XML grandes pueden consumir mucha memoria — recorte fixtures de prueba a subárboles relevantes.',
      'Los namespaces pueden aparecer en nombres de clave — elimine o alias en posprocesamiento si hace falta.',
      'Valide salida JSON contra esquema del consumidor antes de despliegue en producción.',
    ],
    sections: [
      {
        id: 'mapeo-xml-json',
        heading: 'Cómo elementos XML se vuelven propiedades JSON',
        level: 2,
        paragraphs: [
          'XML es jerárquico: elementos anidan dentro de padres, atributos decoran etiquetas y nodos de texto llevan valores. JSON representa el mismo árbol como objetos y arrays anidados. Los conversores recorren el DOM y emiten claves para nombres de etiqueta, frecuentemente fusionando atributos en el mismo objeto que contenido hijo.',
          'Elementos repetidos con el mismo nombre de etiqueta suelen colapsar en arrays JSON para iteración predecible.',
        ],
      },
      {
        id: 'atributos-texto',
        heading: 'Atributos, nodos de texto y contenido mixto',
        level: 2,
        paragraphs: [
          'Contenido mixto — texto intercalado con elementos hijos — es el caso más difícil. Los parsers pueden representar texto en propiedad dedicada como _text o #text. Inspeccione salida al convertir documentos con formato inline.',
        ],
        bullets: [
          'Atributos — frecuentemente prefijados o bajo claves @',
          'Hijo de texto único — puede aplanarse a valor string',
          'Contenido mixto — puede requerir limpieza manual tras conversión',
        ],
      },
      {
        id: 'privacidad-xml',
        heading: 'XML sensible permanece local',
        level: 2,
        paragraphs: [
          'XML empresarial frecuentemente codifica PII, instrumentos financieros y aserciones de autenticación. Subir esos archivos a conversores en línea viola políticas de manejo de datos. PDFWINDOWS analiza XML solo en memoria del navegador — sin retención, sin registro de esquema en servidor.',
        ],
      },
      {
        id: 'pipeline-xml',
        heading: 'XML en toolchain JSON-first',
        level: 2,
        paragraphs: [
          'Convierta XML a JSON, luego aplane a CSV para usuarios de negocio o formatee con Limpiador de Código para diffs legibles. Cuando fuentes ya son tabulares, CSV a JSON puede ser más simple — use XML a JSON cuando el sistema upstream solo habla markup.',
        ],
        bullets: [
          'JSON a CSV — vistas en hoja de datos convertidos',
          'CSV a JSON — ruta alternativa desde exports tabulares',
          'Limpiador de Código — embellecer salida JSON para revisiones',
        ],
      },
    ],
    faq: [
      ...privacyFaq('es'),
      {
        q: '¿El conversor valida contra esquemas XSD?',
        a: 'No. Analiza XML bien formado estructuralmente. La validación de esquema es paso separado en su pipeline de integración.',
      },
      {
        q: '¿Cómo se manejan namespaces XML?',
        a: 'Los prefijos de namespace suelen aparecer en claves JSON. Puede necesitar normalizar claves en script posterior.',
      },
      {
        q: '¿Puedo convertir JSON de vuelta a XML?',
        a: 'Esta herramienta es XML a JSON en un sentido. La generación XML de ida y vuelta requiere serializadores dedicados no cubiertos aquí.',
      },
      {
        q: '¿Y archivos corporativos muy grandes?',
        a: 'La memoria del navegador es el límite. Extraiga subárboles para desarrollo o divida archivos en límites lógicos.',
      },
      {
        q: '¿Se preserva CDATA?',
        a: 'Las secciones CDATA típicamente se vuelven valores string en JSON. Caracteres especiales deben sobrevivir como texto Unicode.',
      },
    ],
    relatedTools: ['/json-to-csv', '/csv-to-json', '/limpador-codigo'],
    cta: defaultCta('es', 'XML a JSON'),
  },
};
