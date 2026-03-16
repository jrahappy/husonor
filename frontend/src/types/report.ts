export interface FormValues {
  [fieldId: string]: string | number | boolean | null;
}

export interface ReportSection {
  sectionId: string;
  title: string;
  titleKo?: string;
  sentences: string;
  hasAbnormalFindings: boolean;
  abnormalFields: string[];
}

export interface GeneratedReport {
  templateId: string;
  templateName: string;
  header: string;
  findingsIntro: string;
  sections: ReportSection[];
  conclusion: string;
  generatedAt: string;
  rawValues: FormValues;
}

export interface SavedReport {
  id: string;
  patientId?: string;
  report: GeneratedReport;
  savedAt: string;
  notes?: string;
}
