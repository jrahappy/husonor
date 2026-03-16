import type { ExamTemplate } from '../types/template';
import { cardiacEchoTemplate } from './cardiac-echo';
import { obstetricMorphologyTemplate } from './obstetric-morphology';
import { renalUltrasoundTemplate } from './renal-ultrasound';
import { shoulderUltrasoundTemplate } from './shoulder-ultrasound';
import { vascularDvtTemplate } from './vascular-dvt';

export const templateRegistry: Record<string, ExamTemplate> = {
  cardiac_echo: cardiacEchoTemplate,
  obstetric_morphology: obstetricMorphologyTemplate,
  renal_ultrasound: renalUltrasoundTemplate,
  shoulder_ultrasound: shoulderUltrasoundTemplate,
  vascular_dvt: vascularDvtTemplate,
};

export const getTemplate = (id: string): ExamTemplate | undefined =>
  templateRegistry[id];

export const getAllTemplates = (): ExamTemplate[] =>
  Object.values(templateRegistry);

export const getTemplatesByCategory = (category: string): ExamTemplate[] =>
  Object.values(templateRegistry).filter((t) => t.category === category);
