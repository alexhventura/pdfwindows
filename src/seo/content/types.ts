import type { LanguageType } from '../../types';
import type { FaqItem } from '../toolCatalog';

export interface ContentSection {
  id: string;
  heading: string;
  level: 2 | 3;
  paragraphs: string[];
  bullets?: string[];
}

export interface UseCase {
  title: string;
  body: string;
}

export interface ToolRichContent {
  title: string;
  description: string;
  keywords: string;
  h1: string;
  intro: string;
  toolName: string;
  benefits: string[];
  useCases: UseCase[];
  howItWorks: string[];
  tips: string[];
  sections: ContentSection[];
  faq: FaqItem[];
  relatedTools: string[];
  cta: {
    heading: string;
    body: string;
    buttonLabel: string;
  };
}

export type ToolContentRegistry = Record<string, Record<LanguageType, ToolRichContent>>;

export function wordCount(text: string): number {
  return text.split(/\s+/).filter(Boolean).length;
}

export function countRichContentWords(content: ToolRichContent): number {
  const chunks: string[] = [
    content.intro,
    ...content.benefits,
    ...content.useCases.flatMap((u) => [u.title, u.body]),
    ...content.howItWorks,
    ...content.tips,
    ...content.sections.flatMap((s) => [...s.paragraphs, ...(s.bullets ?? [])]),
    ...content.faq.flatMap((f) => [f.q, f.a]),
    content.cta.heading,
    content.cta.body,
  ];
  return wordCount(chunks.join(' '));
}
