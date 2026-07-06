import type { LanguageType } from '../types';
import type { DocFormValues, DocTemplateDefinition, DocTemplateId } from './types';

type L = LanguageType;

const BLANK = '__________';

function v(values: DocFormValues, key: string): string {
  return values[key]?.trim() || BLANK;
}

function localeDate(lang: L): string {
  const locale = lang === 'pt' ? 'pt-BR' : lang === 'es' ? 'es-ES' : 'en-US';
  return new Date().toLocaleDateString(locale, { day: '2-digit', month: 'long', year: 'numeric' });
}

function parseLineItems(raw: string | undefined): { description: string; qty: string; price: string }[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as { description?: string; quantity?: string; unitPrice?: string }[];
    if (!Array.isArray(parsed)) return [];
    return parsed.map((row) => ({
      description: row.description?.trim() || '—',
      qty: row.quantity?.trim() || '1',
      price: row.unitPrice?.trim() || '0',
    }));
  } catch {
    return [];
  }
}

function formatCurrency(value: string, lang: L): string {
  const n = parseFloat(value.replace(/\./g, '').replace(',', '.'));
  const amount = Number.isFinite(n) ? n : 0;
  const locale = lang === 'pt' ? 'pt-BR' : lang === 'es' ? 'es-ES' : 'en-US';
  return new Intl.NumberFormat(locale, { style: 'currency', currency: 'BRL' }).format(amount);
}

function lineItemsParagraphs(values: DocFormValues, lang: L): string[] {
  const rows = parseLineItems(values.lineItems);
  if (rows.length === 0) return [];
  const header =
    lang === 'pt'
      ? 'Itens / serviços:'
      : lang === 'es'
        ? 'Ítems / servicios:'
        : 'Items / services:';
  const lines = rows.map((row, i) => {
    const total = formatCurrency(String(parseFloat(row.price.replace(',', '.')) * (parseInt(row.qty, 10) || 0)), lang);
    return `${i + 1}. ${row.description} — ${row.qty} × ${formatCurrency(row.price, lang)} = ${total}`;
  });
  if (values.totalAmount?.trim()) {
    lines.push(
      lang === 'pt'
        ? `Total: ${formatCurrency(values.totalAmount, lang)}`
        : lang === 'es'
          ? `Total: ${formatCurrency(values.totalAmount, lang)}`
          : `Total: ${formatCurrency(values.totalAmount, lang)}`
    );
  }
  return [header, ...lines];
}

const partyFields = [
  {
    id: 'partyAName',
    type: 'text' as const,
    label: { pt: 'Nome / Razão social (Parte A)', en: 'Name / Company (Party A)', es: 'Nombre / Razón social (Parte A)' },
    placeholder: { pt: 'Ex.: João Silva ME', en: 'Ex.: Acme LLC', es: 'Ej.: Juan Pérez SL' },
    required: true,
    smartFillKey: 'partyAName',
  },
  {
    id: 'partyADoc',
    type: 'text' as const,
    label: { pt: 'CPF/CNPJ (Parte A)', en: 'Tax ID (Party A)', es: 'ID fiscal (Parte A)' },
    smartFillKey: 'partyADoc',
  },
  {
    id: 'partyBName',
    type: 'text' as const,
    label: { pt: 'Nome / Cliente (Parte B)', en: 'Name / Client (Party B)', es: 'Nombre / Cliente (Parte B)' },
    required: true,
    smartFillKey: 'partyBName',
  },
  {
    id: 'partyBDoc',
    type: 'text' as const,
    label: { pt: 'CPF/CNPJ (Parte B)', en: 'Tax ID (Party B)', es: 'ID fiscal (Parte B)' },
    smartFillKey: 'partyBDoc',
  },
];

const locationDateFields = [
  {
    id: 'city',
    type: 'text' as const,
    label: { pt: 'Cidade', en: 'City', es: 'Ciudad' },
    required: true,
    smartFillKey: 'city',
  },
  {
    id: 'documentDate',
    type: 'date' as const,
    label: { pt: 'Data do documento', en: 'Document date', es: 'Fecha del documento' },
    smartFillKey: 'documentDate',
  },
];

export const DOCUMENT_TEMPLATES: Record<DocTemplateId, DocTemplateDefinition> = {
  'simple-contract': {
    id: 'simple-contract',
    label: { pt: 'Contrato simples', en: 'Simple contract', es: 'Contrato simple' },
    description: {
      pt: 'Acordo bilateral para prestação de serviços com cláusulas essenciais.',
      en: 'Bilateral service agreement with essential clauses.',
      es: 'Acuerdo bilateral de servicios con cláusulas esenciales.',
    },
    title: { pt: 'CONTRATO SIMPLES DE PRESTAÇÃO DE SERVIÇOS', en: 'SIMPLE SERVICE CONTRACT', es: 'CONTRATO SIMPLE DE SERVICIOS' },
    sections: [
      { id: 'parties', title: { pt: 'Partes', en: 'Parties', es: 'Partes' }, fields: partyFields },
      {
        id: 'terms',
        title: { pt: 'Objeto e condições', en: 'Scope & terms', es: 'Objeto y condiciones' },
        fields: [
          {
            id: 'serviceScope',
            type: 'textarea',
            label: { pt: 'Descrição do serviço', en: 'Service description', es: 'Descripción del servicio' },
            required: true,
          },
          {
            id: 'contractValue',
            type: 'text',
            label: { pt: 'Valor acordado (R$)', en: 'Agreed value', es: 'Valor acordado' },
          },
          {
            id: 'paymentTerms',
            type: 'text',
            label: { pt: 'Condições de pagamento', en: 'Payment terms', es: 'Condiciones de pago' },
            placeholder: { pt: 'Ex.: 50% na assinatura, 50% na entrega', en: 'Ex.: 50% upfront, 50% on delivery', es: 'Ej.: 50% al firmar, 50% al entregar' },
          },
          {
            id: 'deadline',
            type: 'text',
            label: { pt: 'Prazo de execução', en: 'Delivery deadline', es: 'Plazo de ejecución' },
          },
        ],
      },
      { id: 'location', title: { pt: 'Local e data', en: 'Place & date', es: 'Lugar y fecha' }, fields: locationDateFields },
      {
        id: 'signature',
        title: { pt: 'Assinatura', en: 'Signature', es: 'Firma' },
        fields: [
          {
            id: 'signatoryName',
            type: 'text',
            label: { pt: 'Nome do signatário', en: 'Signatory name', es: 'Nombre del firmante' },
            smartFillKey: 'signatoryName',
          },
        ],
      },
    ],
    buildParagraphs: (values, lang) => {
      const date = values.documentDate || localeDate(lang);
      if (lang === 'pt') {
        return [
          `Pelo presente instrumento particular, ${v(values, 'partyAName')}, inscrito(a) sob ${v(values, 'partyADoc')}, doravante CONTRATANTE, e ${v(values, 'partyBName')}, documento ${v(values, 'partyBDoc')}, doravante CONTRATADO(A), acordam o seguinte:`,
          `1. OBJETO: ${v(values, 'serviceScope')}`,
          `2. VALOR: ${v(values, 'contractValue')}. Pagamento: ${v(values, 'paymentTerms')}.`,
          `3. PRAZO: ${v(values, 'deadline')}.`,
          '4. As partes declaram que o presente contrato reflete a vontade livre e informada de ambas, executado de boa-fé.',
          `${v(values, 'city')}, ${date}.`,
        ];
      }
      if (lang === 'es') {
        return [
          `Por el presente instrumento, ${v(values, 'partyAName')}, ID ${v(values, 'partyADoc')}, en adelante CONTRATANTE, y ${v(values, 'partyBName')}, ID ${v(values, 'partyBDoc')}, en adelante CONTRATADO, acuerdan:`,
          `1. OBJETO: ${v(values, 'serviceScope')}`,
          `2. VALOR: ${v(values, 'contractValue')}. Pago: ${v(values, 'paymentTerms')}.`,
          `3. PLAZO: ${v(values, 'deadline')}.`,
          '4. Las partes declaran actuar de buena fe.',
          `${v(values, 'city')}, ${date}.`,
        ];
      }
      return [
        `By this agreement, ${v(values, 'partyAName')}, ID ${v(values, 'partyADoc')}, ("Party A"), and ${v(values, 'partyBName')}, ID ${v(values, 'partyBDoc')}, ("Party B"), agree:`,
        `1. SCOPE: ${v(values, 'serviceScope')}`,
        `2. VALUE: ${v(values, 'contractValue')}. Payment: ${v(values, 'paymentTerms')}.`,
        `3. DEADLINE: ${v(values, 'deadline')}.`,
        '4. Both parties acknowledge this agreement is made in good faith.',
        `${v(values, 'city')}, ${date}.`,
      ];
    },
  },

  'commercial-proposal': {
    id: 'commercial-proposal',
    label: { pt: 'Proposta comercial', en: 'Commercial proposal', es: 'Propuesta comercial' },
    description: {
      pt: 'Proposta formal com escopo, investimento e validade.',
      en: 'Formal proposal with scope, pricing, and validity.',
      es: 'Propuesta formal con alcance, inversión y validez.',
    },
    title: { pt: 'PROPOSTA COMERCIAL', en: 'COMMERCIAL PROPOSAL', es: 'PROPUESTA COMERCIAL' },
    sections: [
      {
        id: 'issuer',
        title: { pt: 'Emissor', en: 'Issuer', es: 'Emisor' },
        fields: [
          {
            id: 'partyAName',
            type: 'text',
            label: { pt: 'Empresa / Profissional', en: 'Company / Professional', es: 'Empresa / Profesional' },
            required: true,
            smartFillKey: 'partyAName',
          },
          {
            id: 'partyADoc',
            type: 'text',
            label: { pt: 'CNPJ/CPF', en: 'Tax ID', es: 'ID fiscal' },
            smartFillKey: 'partyADoc',
          },
          {
            id: 'contactEmail',
            type: 'text',
            label: { pt: 'E-mail de contato', en: 'Contact email', es: 'Correo de contacto' },
            smartFillKey: 'contactEmail',
          },
        ],
      },
      {
        id: 'client',
        title: { pt: 'Cliente', en: 'Client', es: 'Cliente' },
        fields: [
          {
            id: 'partyBName',
            type: 'text',
            label: { pt: 'Nome do cliente', en: 'Client name', es: 'Nombre del cliente' },
            required: true,
            smartFillKey: 'partyBName',
          },
          {
            id: 'partyBDoc',
            type: 'text',
            label: { pt: 'Documento', en: 'ID document', es: 'Documento' },
            smartFillKey: 'partyBDoc',
          },
        ],
      },
      {
        id: 'proposal',
        title: { pt: 'Conteúdo da proposta', en: 'Proposal content', es: 'Contenido de la propuesta' },
        fields: [
          {
            id: 'serviceScope',
            type: 'textarea',
            label: { pt: 'Escopo e entregáveis', en: 'Scope & deliverables', es: 'Alcance y entregables' },
            required: true,
          },
          {
            id: 'contractValue',
            type: 'text',
            label: { pt: 'Investimento total', en: 'Total investment', es: 'Inversión total' },
            required: true,
          },
          {
            id: 'deadline',
            type: 'text',
            label: { pt: 'Prazo estimado', en: 'Estimated timeline', es: 'Plazo estimado' },
          },
          {
            id: 'validityDays',
            type: 'text',
            label: { pt: 'Validade (dias)', en: 'Validity (days)', es: 'Validez (días)' },
            placeholder: { pt: 'Ex.: 15', en: 'Ex.: 15', es: 'Ej.: 15' },
          },
        ],
      },
      { id: 'location', title: { pt: 'Local e data', en: 'Place & date', es: 'Lugar y fecha' }, fields: locationDateFields },
    ],
    buildParagraphs: (values, lang) => {
      const date = values.documentDate || localeDate(lang);
      const validity = v(values, 'validityDays');
      if (lang === 'pt') {
        return [
          `À atenção de ${v(values, 'partyBName')},`,
          `${v(values, 'partyAName')} apresenta proposta comercial conforme abaixo:`,
          `ESCOPO: ${v(values, 'serviceScope')}`,
          `INVESTIMENTO: ${v(values, 'contractValue')}. PRAZO: ${v(values, 'deadline')}.`,
          `Validade desta proposta: ${validity} dias a partir de ${date}.`,
          `Contato: ${v(values, 'contactEmail')}.`,
          `${v(values, 'city')}, ${date}.`,
        ];
      }
      if (lang === 'es') {
        return [
          `Atención: ${v(values, 'partyBName')}.`,
          `${v(values, 'partyAName')} presenta la siguiente propuesta comercial:`,
          `ALCANCE: ${v(values, 'serviceScope')}`,
          `INVERSIÓN: ${v(values, 'contractValue')}. PLAZO: ${v(values, 'deadline')}.`,
          `Validez: ${validity} días desde ${date}.`,
          `Contacto: ${v(values, 'contactEmail')}.`,
          `${v(values, 'city')}, ${date}.`,
        ];
      }
      return [
        `To ${v(values, 'partyBName')},`,
        `${v(values, 'partyAName')} submits the following commercial proposal:`,
        `SCOPE: ${v(values, 'serviceScope')}`,
        `INVESTMENT: ${v(values, 'contractValue')}. TIMELINE: ${v(values, 'deadline')}.`,
        `Proposal valid for ${validity} days from ${date}.`,
        `Contact: ${v(values, 'contactEmail')}.`,
        `${v(values, 'city')}, ${date}.`,
      ];
    },
  },

  'professional-receipt': {
    id: 'professional-receipt',
    label: { pt: 'Recibo profissional', en: 'Professional receipt', es: 'Recibo profesional' },
    description: {
      pt: 'Recibo detalhado com itens, totais e forma de pagamento.',
      en: 'Detailed receipt with line items, totals, and payment method.',
      es: 'Recibo detallado con ítems, totales y forma de pago.',
    },
    title: { pt: 'RECIBO', en: 'RECEIPT', es: 'RECIBO' },
    sections: [
      {
        id: 'issuer',
        title: { pt: 'Emissor', en: 'Issuer', es: 'Emisor' },
        fields: [
          {
            id: 'partyAName',
            type: 'text',
            label: { pt: 'Nome do emissor', en: 'Issuer name', es: 'Nombre del emisor' },
            required: true,
            smartFillKey: 'partyAName',
          },
          {
            id: 'partyADoc',
            type: 'text',
            label: { pt: 'CPF/CNPJ', en: 'Tax ID', es: 'ID fiscal' },
            smartFillKey: 'partyADoc',
          },
        ],
      },
      {
        id: 'client',
        title: { pt: 'Cliente', en: 'Client', es: 'Cliente' },
        fields: [
          {
            id: 'partyBName',
            type: 'text',
            label: { pt: 'Nome do cliente', en: 'Client name', es: 'Nombre del cliente' },
            required: true,
            smartFillKey: 'partyBName',
          },
          {
            id: 'partyBDoc',
            type: 'text',
            label: { pt: 'CPF/CNPJ do cliente', en: 'Client tax ID', es: 'ID fiscal del cliente' },
            smartFillKey: 'partyBDoc',
          },
        ],
      },
      {
        id: 'details',
        title: { pt: 'Serviço e itens', en: 'Service & items', es: 'Servicio e ítems' },
        fields: [
          {
            id: 'serviceScope',
            type: 'textarea',
            label: { pt: 'Descrição do serviço', en: 'Service description', es: 'Descripción del servicio' },
          },
          {
            id: 'lineItems',
            type: 'line-items',
            label: { pt: 'Itens', en: 'Line items', es: 'Ítems' },
          },
          {
            id: 'totalAmount',
            type: 'text',
            label: { pt: 'Total (R$)', en: 'Total amount', es: 'Total' },
          },
          {
            id: 'paymentTerms',
            type: 'text',
            label: { pt: 'Forma de pagamento', en: 'Payment method', es: 'Forma de pago' },
            smartFillKey: 'paymentTerms',
          },
          {
            id: 'notes',
            type: 'textarea',
            label: { pt: 'Observações', en: 'Notes', es: 'Observaciones' },
          },
        ],
      },
      { id: 'location', title: { pt: 'Local e data', en: 'Place & date', es: 'Lugar y fecha' }, fields: locationDateFields },
      {
        id: 'signature',
        title: { pt: 'Assinatura', en: 'Signature', es: 'Firma' },
        fields: [
          {
            id: 'signatoryName',
            type: 'text',
            label: { pt: 'Assinatura (texto)', en: 'Signature (text)', es: 'Firma (texto)' },
            smartFillKey: 'signatoryName',
          },
        ],
      },
    ],
    buildParagraphs: (values, lang) => {
      const date = values.documentDate || localeDate(lang);
      const intro =
        lang === 'pt'
          ? `Recebi de ${v(values, 'partyBName')}, documento ${v(values, 'partyBDoc')}, os valores abaixo descritos, dando plena quitação. Emissor: ${v(values, 'partyAName')} (${v(values, 'partyADoc')}).`
          : lang === 'es'
            ? `Recibí de ${v(values, 'partyBName')}, ID ${v(values, 'partyBDoc')}, los valores descritos, con plena conformidad. Emisor: ${v(values, 'partyAName')} (${v(values, 'partyADoc')}).`
            : `Received from ${v(values, 'partyBName')}, ID ${v(values, 'partyBDoc')}, the amounts below, with full discharge. Issuer: ${v(values, 'partyAName')} (${v(values, 'partyADoc')}).`;
      const paragraphs = [intro];
      if (values.serviceScope?.trim()) {
        paragraphs.push(values.serviceScope.trim());
      }
      paragraphs.push(...lineItemsParagraphs(values, lang));
      if (values.paymentTerms?.trim()) {
        paragraphs.push(
          lang === 'pt'
            ? `Forma de pagamento: ${values.paymentTerms}`
            : lang === 'es'
              ? `Forma de pago: ${values.paymentTerms}`
              : `Payment method: ${values.paymentTerms}`
        );
      }
      if (values.notes?.trim()) {
        paragraphs.push(
          lang === 'pt' ? `Observações: ${values.notes}` : lang === 'es' ? `Observaciones: ${values.notes}` : `Notes: ${values.notes}`
        );
      }
      paragraphs.push(`${v(values, 'city')}, ${date}.`);
      if (values.signatoryName?.trim()) {
        paragraphs.push(
          lang === 'pt'
            ? `Assinatura: ${values.signatoryName}`
            : lang === 'es'
              ? `Firma: ${values.signatoryName}`
              : `Signature: ${values.signatoryName}`
        );
      }
      return paragraphs;
    },
  },

  declaration: {
    id: 'declaration',
    label: { pt: 'Declaração', en: 'Declaration', es: 'Declaración' },
    description: {
      pt: 'Declaração formal para fins administrativos.',
      en: 'Formal declaration for administrative purposes.',
      es: 'Declaración formal para fines administrativos.',
    },
    title: { pt: 'DECLARAÇÃO', en: 'DECLARATION', es: 'DECLARACIÓN' },
    sections: [
      {
        id: 'declarant',
        title: { pt: 'Declarante', en: 'Declarant', es: 'Declarante' },
        fields: [
          {
            id: 'partyAName',
            type: 'text',
            label: { pt: 'Nome completo', en: 'Full name', es: 'Nombre completo' },
            required: true,
            smartFillKey: 'partyAName',
          },
          {
            id: 'partyADoc',
            type: 'text',
            label: { pt: 'Documento (RG/CPF/CNPJ)', en: 'ID document', es: 'Documento de identidad' },
            required: true,
            smartFillKey: 'partyADoc',
          },
        ],
      },
      {
        id: 'content',
        title: { pt: 'Conteúdo', en: 'Content', es: 'Contenido' },
        fields: [
          {
            id: 'serviceScope',
            type: 'textarea',
            label: { pt: 'Texto da declaração', en: 'Declaration text', es: 'Texto de la declaración' },
            required: true,
          },
          {
            id: 'purpose',
            type: 'text',
            label: { pt: 'Finalidade', en: 'Purpose', es: 'Finalidad' },
            placeholder: { pt: 'Ex.: fins de cadastro', en: 'Ex.: registration purposes', es: 'Ej.: fines de registro' },
          },
        ],
      },
      { id: 'location', title: { pt: 'Local e data', en: 'Place & date', es: 'Lugar y fecha' }, fields: locationDateFields },
    ],
    buildParagraphs: (values, lang) => {
      const date = values.documentDate || localeDate(lang);
      if (lang === 'pt') {
        return [
          `Eu, ${v(values, 'partyAName')}, portador(a) do documento ${v(values, 'partyADoc')}, declaro para os devidos fins (${v(values, 'purpose')}):`,
          v(values, 'serviceScope'),
          'Declaro serem verdadeiras as informações acima.',
          `${v(values, 'city')}, ${date}.`,
        ];
      }
      if (lang === 'es') {
        return [
          `Yo, ${v(values, 'partyAName')}, titular del documento ${v(values, 'partyADoc')}, declaro para los fines de ${v(values, 'purpose')}:`,
          v(values, 'serviceScope'),
          'Declaro que la información precedente es veraz.',
          `${v(values, 'city')}, ${date}.`,
        ];
      }
      return [
        `I, ${v(values, 'partyAName')}, holder of ID ${v(values, 'partyADoc')}, declare for ${v(values, 'purpose')}:`,
        v(values, 'serviceScope'),
        'I declare the above information to be true.',
        `${v(values, 'city')}, ${date}.`,
      ];
    },
  },

  authorization: {
    id: 'authorization',
    label: { pt: 'Autorização', en: 'Authorization', es: 'Autorización' },
    description: {
      pt: 'Termo de autorização para procedimentos administrativos.',
      en: 'Authorization for administrative procedures.',
      es: 'Autorización para trámites administrativos.',
    },
    title: { pt: 'TERMO DE AUTORIZAÇÃO', en: 'AUTHORIZATION', es: 'AUTORIZACIÓN' },
    sections: [
      {
        id: 'authorizer',
        title: { pt: 'Autorizante', en: 'Authorizer', es: 'Autorizante' },
        fields: [
          {
            id: 'partyAName',
            type: 'text',
            label: { pt: 'Nome completo', en: 'Full name', es: 'Nombre completo' },
            required: true,
            smartFillKey: 'partyAName',
          },
          {
            id: 'partyADoc',
            type: 'text',
            label: { pt: 'Documento', en: 'ID document', es: 'Documento' },
            smartFillKey: 'partyADoc',
          },
        ],
      },
      {
        id: 'authorized',
        title: { pt: 'Autorizado', en: 'Authorized party', es: 'Autorizado' },
        fields: [
          {
            id: 'partyBName',
            type: 'text',
            label: { pt: 'Nome do autorizado', en: 'Authorized name', es: 'Nombre del autorizado' },
            required: true,
            smartFillKey: 'partyBName',
          },
          {
            id: 'partyBDoc',
            type: 'text',
            label: { pt: 'Documento', en: 'ID document', es: 'Documento' },
            smartFillKey: 'partyBDoc',
          },
        ],
      },
      {
        id: 'scope',
        title: { pt: 'Escopo', en: 'Scope', es: 'Alcance' },
        fields: [
          {
            id: 'serviceScope',
            type: 'textarea',
            label: { pt: 'Procedimentos autorizados', en: 'Authorized procedures', es: 'Procedimientos autorizados' },
            required: true,
          },
          {
            id: 'deadline',
            type: 'text',
            label: { pt: 'Validade da autorização', en: 'Authorization validity', es: 'Validez de la autorización' },
          },
        ],
      },
      { id: 'location', title: { pt: 'Local e data', en: 'Place & date', es: 'Lugar y fecha' }, fields: locationDateFields },
    ],
    buildParagraphs: (values, lang) => {
      const date = values.documentDate || localeDate(lang);
      if (lang === 'pt') {
        return [
          `Eu, ${v(values, 'partyAName')}, documento ${v(values, 'partyADoc')}, autorizo ${v(values, 'partyBName')} (${v(values, 'partyBDoc')}) a realizar:`,
          v(values, 'serviceScope'),
          `Validade: ${v(values, 'deadline')}.`,
          'Assumo responsabilidade pelos atos autorizados dentro do escopo acima.',
          `${v(values, 'city')}, ${date}.`,
        ];
      }
      if (lang === 'es') {
        return [
          `Yo, ${v(values, 'partyAName')}, documento ${v(values, 'partyADoc')}, autorizo a ${v(values, 'partyBName')} (${v(values, 'partyBDoc')}) a realizar:`,
          v(values, 'serviceScope'),
          `Validez: ${v(values, 'deadline')}.`,
          'Asumo responsabilidad por los actos autorizados dentro del alcance indicado.',
          `${v(values, 'city')}, ${date}.`,
        ];
      }
      return [
        `I, ${v(values, 'partyAName')}, ID ${v(values, 'partyADoc')}, authorize ${v(values, 'partyBName')} (${v(values, 'partyBDoc')}) to perform:`,
        v(values, 'serviceScope'),
        `Valid until: ${v(values, 'deadline')}.`,
        'I assume responsibility for authorized acts within the scope above.',
        `${v(values, 'city')}, ${date}.`,
      ];
    },
  },

  liability: {
    id: 'liability',
    label: { pt: 'Termo de responsabilidade', en: 'Liability term', es: 'Término de responsabilidad' },
    description: {
      pt: 'Assunção formal de responsabilidade sobre informações e documentos.',
      en: 'Formal assumption of liability for information and documents.',
      es: 'Asunción formal de responsabilidad sobre información y documentos.',
    },
    title: { pt: 'TERMO DE RESPONSABILIDADE', en: 'LIABILITY TERM', es: 'TÉRMINO DE RESPONSABILIDAD' },
    sections: [
      {
        id: 'signatory',
        title: { pt: 'Signatário', en: 'Signatory', es: 'Firmante' },
        fields: [
          {
            id: 'partyAName',
            type: 'text',
            label: { pt: 'Nome completo', en: 'Full name', es: 'Nombre completo' },
            required: true,
            smartFillKey: 'partyAName',
          },
          {
            id: 'partyADoc',
            type: 'text',
            label: { pt: 'Documento', en: 'ID document', es: 'Documento' },
            smartFillKey: 'partyADoc',
          },
        ],
      },
      {
        id: 'content',
        title: { pt: 'Escopo da responsabilidade', en: 'Liability scope', es: 'Alcance de responsabilidad' },
        fields: [
          {
            id: 'serviceScope',
            type: 'textarea',
            label: { pt: 'Informações / documentos cobertos', en: 'Covered information / documents', es: 'Información / documentos cubiertos' },
            required: true,
          },
          {
            id: 'notes',
            type: 'textarea',
            label: { pt: 'Observações adicionais', en: 'Additional notes', es: 'Observaciones adicionales' },
          },
        ],
      },
      { id: 'location', title: { pt: 'Local e data', en: 'Place & date', es: 'Lugar y fecha' }, fields: locationDateFields },
    ],
    buildParagraphs: (values, lang) => {
      const date = values.documentDate || localeDate(lang);
      if (lang === 'pt') {
        return [
          `${v(values, 'partyAName')}, documento ${v(values, 'partyADoc')}, declara assumir integral responsabilidade pelas informações e documentos:`,
          v(values, 'serviceScope'),
          values.notes?.trim() ? `Observações: ${values.notes}` : '',
          'Isenta terceiros de uso indevido fora do escopo acordado, na medida permitida pela legislação aplicável.',
          `${v(values, 'city')}, ${date}.`,
        ].filter(Boolean);
      }
      if (lang === 'es') {
        return [
          `${v(values, 'partyAName')}, documento ${v(values, 'partyADoc')}, asume plena responsabilidad por la información y documentos:`,
          v(values, 'serviceScope'),
          values.notes?.trim() ? `Observaciones: ${values.notes}` : '',
          'Exime a terceros de uso indebido fuera del alcance acordado.',
          `${v(values, 'city')}, ${date}.`,
        ].filter(Boolean);
      }
      return [
        `${v(values, 'partyAName')}, ID ${v(values, 'partyADoc')}, assumes full liability for the following information and documents:`,
        v(values, 'serviceScope'),
        values.notes?.trim() ? `Notes: ${values.notes}` : '',
        'Third parties are released from misuse outside the agreed scope.',
        `${v(values, 'city')}, ${date}.`,
      ].filter(Boolean);
    },
  },

  custom: {
    id: 'custom',
    label: { pt: 'Estúdio de Documentos', en: 'Document Studio', es: 'Estudio de Documentos' },
    description: {
      pt: 'Modelo livre do Estúdio de Documentos com título e corpo editáveis.',
      en: 'Document Studio free-form template with editable title and body.',
      es: 'Modelo libre del Estudio de Documentos con título y cuerpo editables.',
    },
    title: { pt: 'DOCUMENTO', en: 'DOCUMENT', es: 'DOCUMENTO' },
    sections: [
      {
        id: 'meta',
        title: { pt: 'Metadados', en: 'Metadata', es: 'Metadatos' },
        fields: [
          {
            id: 'customTitle',
            type: 'text',
            label: { pt: 'Título do documento', en: 'Document title', es: 'Título del documento' },
            required: true,
          },
          {
            id: 'partyAName',
            type: 'text',
            label: { pt: 'Autor / Emissor', en: 'Author / Issuer', es: 'Autor / Emisor' },
            smartFillKey: 'partyAName',
          },
        ],
      },
      {
        id: 'body',
        title: { pt: 'Conteúdo', en: 'Content', es: 'Contenido' },
        fields: [
          {
            id: 'serviceScope',
            type: 'textarea',
            label: { pt: 'Corpo do documento', en: 'Document body', es: 'Cuerpo del documento' },
            required: true,
          },
        ],
      },
      { id: 'location', title: { pt: 'Local e data', en: 'Place & date', es: 'Lugar y fecha' }, fields: locationDateFields },
    ],
    buildParagraphs: (values, lang) => {
      const date = values.documentDate || localeDate(lang);
      const paragraphs = [v(values, 'serviceScope')];
      if (values.partyAName?.trim()) {
        paragraphs.push(
          lang === 'pt' ? `Emissor: ${values.partyAName}` : lang === 'es' ? `Emisor: ${values.partyAName}` : `Issuer: ${values.partyAName}`
        );
      }
      paragraphs.push(`${v(values, 'city')}, ${date}.`);
      return paragraphs;
    },
  },
};

export const TEMPLATE_LIST = Object.values(DOCUMENT_TEMPLATES);

export function getTemplateTitle(templateId: DocTemplateId, values: DocFormValues, lang: L): string {
  if (templateId === 'custom' && values.customTitle?.trim()) {
    return values.customTitle.trim().toUpperCase();
  }
  return DOCUMENT_TEMPLATES[templateId].title[lang];
}

export function buildDocumentPreview(templateId: DocTemplateId, values: DocFormValues, lang: L): string {
  const template = DOCUMENT_TEMPLATES[templateId];
  const title = getTemplateTitle(templateId, values, lang);
  const paragraphs = template.buildParagraphs(values, lang);
  return [title, '', ...paragraphs].join('\n\n');
}

export function collectSmartFillKeys(templateId: DocTemplateId): string[] {
  const template = DOCUMENT_TEMPLATES[templateId];
  const keys = new Set<string>();
  for (const section of template.sections) {
    for (const field of section.fields) {
      if (field.smartFillKey) keys.add(field.smartFillKey);
    }
  }
  return Array.from(keys);
}

export function getEmptyValues(templateId: DocTemplateId): DocFormValues {
  const values: DocFormValues = {};
  const today = new Date().toISOString().split('T')[0];
  for (const section of DOCUMENT_TEMPLATES[templateId].sections) {
    for (const field of section.fields) {
      if (field.type === 'date') values[field.id] = today;
      else if (field.type === 'line-items') values[field.id] = JSON.stringify([{ id: '1', description: '', unitPrice: '', quantity: '1' }]);
      else values[field.id] = '';
    }
  }
  return values;
}

export function validateDocument(templateId: DocTemplateId, values: DocFormValues, lang: L): string[] {
  const errors: string[] = [];
  const template = DOCUMENT_TEMPLATES[templateId];
  for (const section of template.sections) {
    for (const field of section.fields) {
      if (!field.required || field.type === 'line-items') continue;
      if (!values[field.id]?.trim()) {
        errors.push(field.label[lang]);
      }
    }
  }
  return errors;
}
