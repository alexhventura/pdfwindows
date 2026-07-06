import type { LanguageType } from '../types';

export type DocFieldType = 'text' | 'textarea' | 'date' | 'number' | 'select' | 'line-items';

export interface DocFieldOption {
  value: string;
  label: Record<LanguageType, string>;
}

export interface DocFieldDefinition {
  id: string;
  type: DocFieldType;
  label: Record<LanguageType, string>;
  placeholder?: Record<LanguageType, string>;
  required?: boolean;
  options?: DocFieldOption[];
  smartFillKey?: string;
}

export interface DocSectionDefinition {
  id: string;
  title: Record<LanguageType, string>;
  fields: DocFieldDefinition[];
}

export type DocTemplateId =
  | 'simple-contract'
  | 'commercial-proposal'
  | 'professional-receipt'
  | 'declaration'
  | 'authorization'
  | 'liability'
  | 'custom';

export interface LineItemRow {
  id: string;
  description: string;
  unitPrice: string;
  quantity: string;
}

export interface DocFormValues {
  [fieldId: string]: string;
}

export interface DocTemplateDefinition {
  id: DocTemplateId;
  label: Record<LanguageType, string>;
  description: Record<LanguageType, string>;
  title: Record<LanguageType, string>;
  sections: DocSectionDefinition[];
  buildParagraphs: (values: DocFormValues, lang: LanguageType) => string[];
}

export interface SmartFillProfile {
  updatedAt: number;
  values: Record<string, string>;
  fieldUsage: Record<string, number>;
}

export interface DocumentDraft {
  templateId: DocTemplateId;
  values: DocFormValues;
  savedAt: number;
}
