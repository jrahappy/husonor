// === Field Types ===

export type FieldType = 'number' | 'select' | 'checkbox' | 'text';

export interface NormalRange {
  min?: number;
  max?: number;
  unit: string;
}

export interface BaseField {
  id: string;
  label: string;
  labelKo?: string;
  type: FieldType;
  required?: boolean;
  tooltip?: string;
}

export interface NumberFieldDef extends BaseField {
  type: 'number';
  unit: string;
  precision?: number;
  normalRange?: NormalRange;
  step?: number;
  placeholder?: string;
}

export interface SelectOption {
  value: string;
  label: string;
  sentenceFragment?: string;
}

export interface SelectFieldDef extends BaseField {
  type: 'select';
  options: SelectOption[];
  defaultValue?: string;
}

export interface CheckboxFieldDef extends BaseField {
  type: 'checkbox';
  defaultValue?: boolean;
  checkedSentence?: string;
  uncheckedSentence?: string;
}

export interface TextFieldDef extends BaseField {
  type: 'text';
  placeholder?: string;
  maxLength?: number;
}

export type FieldDefinition =
  | NumberFieldDef
  | SelectFieldDef
  | CheckboxFieldDef
  | TextFieldDef;

// === Sentence Pattern ===

export interface SentencePattern {
  template: string;
  builderId?: string;
  defaultSentence?: string;
  abnormalConclusion?: string;
}

// === Section & Template ===

export interface TemplateSection {
  id: string;
  title: string;
  titleKo?: string;
  fields: FieldDefinition[];
  sentencePattern: SentencePattern;
  order: number;
  omitWhenEmpty?: boolean;
}

export type ExamCategory =
  | 'cardiac'
  | 'abdominal'
  | 'obstetric'
  | 'musculoskeletal'
  | 'vascular'
  | 'renal';

export interface ExamTemplate {
  id: string;
  name: string;
  nameKo?: string;
  category: ExamCategory;
  version: string;
  sections: TemplateSection[];
  reportHeader?: string;
  findingsIntro?: string;
  conclusionPattern?: SentencePattern;
}
