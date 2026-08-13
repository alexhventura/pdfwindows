/** Canonical File X-Ray analysis model — analyzers fill only what they can prove. */

export type FieldOrigin = string;

export interface SourcedValue<T = string> {
  value: T;
  origin: FieldOrigin;
  estimated?: boolean;
}

export type AnalysisStage =
  | 'detecting'
  | 'hashing'
  | 'structure'
  | 'metadata'
  | 'content'
  | 'embedded'
  | 'finalizing';

export type DetectedFormat =
  | 'pdf'
  | 'docx'
  | 'xlsx'
  | 'pptx'
  | 'jpeg'
  | 'png'
  | 'webp'
  | 'gif'
  | 'csv'
  | 'txt'
  | 'zip'
  | 'unknown';

export interface FileIdentification {
  name: string;
  extension: string;
  browserMime: string;
  detectedFormat: DetectedFormat;
  detectedMime: string;
  magicSignature: string;
  inconsistency: boolean;
  inconsistencyNote?: string;
  container?: string;
  formatVersion?: SourcedValue;
}

export interface HashInfo {
  sha256: string;
  sha1?: string;
  md5?: string;
}

export interface AuthorshipInfo {
  author?: SourcedValue;
  lastAuthor?: SourcedValue;
  creator?: SourcedValue;
  producer?: SourcedValue;
  company?: SourcedValue;
  application?: SourcedValue;
  applicationVersion?: SourcedValue;
}

export interface DatesInfo {
  created?: SourcedValue;
  modified?: SourcedValue;
  contentCreated?: SourcedValue;
  contentModified?: SourcedValue;
  other: Array<{ label: string; value: string; origin: FieldOrigin }>;
}

export interface StatisticsInfo {
  pages?: SourcedValue<number>;
  words?: SourcedValue<number>;
  characters?: SourcedValue<number>;
  charactersNoSpaces?: SourcedValue<number>;
  images?: SourcedValue<number>;
  fonts?: SourcedValue<number>;
  sheets?: SourcedValue<number>;
  rows?: SourcedValue<number>;
  columns?: SourcedValue<number>;
  cellsFilled?: SourcedValue<number>;
  formulas?: SourcedValue<number>;
  slides?: SourcedValue<number>;
  width?: SourcedValue<number>;
  height?: SourcedValue<number>;
  durationSeconds?: SourcedValue<number>;
  entries?: SourcedValue<number>;
  custom: Array<{ label: string; value: string | number; origin: FieldOrigin; estimated?: boolean }>;
}

export interface FontEntry {
  name: string;
  internalName?: string;
  embedded?: boolean;
  subset?: boolean;
  type?: string;
  weightStyle?: string;
  occurrences?: number;
  pages?: number[];
  origin: FieldOrigin;
}

export interface SecurityInfo {
  encrypted?: boolean;
  openPassword?: boolean;
  permissions?: Array<{ label: string; status: string; origin: FieldOrigin }>;
  notes: string[];
}

export interface MetadataEntry {
  key: string;
  value: string;
  origin: FieldOrigin;
}

export interface StructureEntry {
  label: string;
  value: string | number;
  origin: FieldOrigin;
}

export interface EmbeddedItem {
  name: string;
  kind: string;
  size?: number;
  origin: FieldOrigin;
}

export interface HiddenFinding {
  severity: 'info' | 'attention';
  label: string;
  detail: string;
  origin: FieldOrigin;
}

export interface ContentStats {
  textPreview?: string;
  pagesWithText?: number;
  pagesWithoutText?: number;
  sheets?: Array<{
    name: string;
    hidden?: boolean;
    veryHidden?: boolean;
    rows?: number;
    cols?: number;
    formulas?: number;
    origin: FieldOrigin;
  }>;
  formulaBreakdown?: Array<{ fn: string; count: number }>;
  links?: number;
  comments?: number;
  tables?: number;
  notes: string[];
}

export interface ImageExtras {
  dpi?: SourcedValue<number>;
  colorSpace?: SourcedValue;
  bitDepth?: SourcedValue<number>;
  compression?: SourcedValue;
  exif: MetadataEntry[];
  gps?: {
    latitude: number;
    longitude: number;
    altitude?: number;
    origin: FieldOrigin;
  };
}

export interface AnalysisResult {
  analyzedAt: string;
  stageNotes: string[];
  identification: FileIdentification;
  fileSizeBytes: number;
  hashes: HashInfo;
  authorship: AuthorshipInfo;
  dates: DatesInfo;
  statistics: StatisticsInfo;
  fonts: FontEntry[];
  metadata: MetadataEntry[];
  security: SecurityInfo;
  structure: StructureEntry[];
  content: ContentStats;
  embedded: EmbeddedItem[];
  hidden: HiddenFinding[];
  image?: ImageExtras;
  advanced: MetadataEntry[];
  supportLevel: 'full' | 'partial' | 'basic';
}

export function emptyResult(partial: Pick<AnalysisResult, 'identification' | 'fileSizeBytes' | 'hashes' | 'supportLevel'>): AnalysisResult {
  return {
    analyzedAt: new Date().toISOString(),
    stageNotes: [],
    identification: partial.identification,
    fileSizeBytes: partial.fileSizeBytes,
    hashes: partial.hashes,
    authorship: {},
    dates: { other: [] },
    statistics: { custom: [] },
    fonts: [],
    metadata: [],
    security: { notes: [] },
    structure: [],
    content: { notes: [] },
    embedded: [],
    hidden: [],
    advanced: [],
    supportLevel: partial.supportLevel,
  };
}

export function sv<T>(value: T, origin: FieldOrigin, estimated = false): SourcedValue<T> {
  return { value, origin, estimated: estimated || undefined };
}

export function unavailable(): string {
  return 'Não disponível no arquivo.';
}
