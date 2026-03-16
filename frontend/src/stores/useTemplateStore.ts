import { create } from 'zustand';
import type { ExamTemplate } from '../types/template';
import { getAllTemplates } from '../templates';

interface TemplateState {
  templates: ExamTemplate[];
  selectedTemplateId: string | null;
  selectedTemplate: ExamTemplate | null;
  selectTemplate: (id: string) => void;
}

export const useTemplateStore = create<TemplateState>((set, get) => ({
  templates: getAllTemplates(),
  selectedTemplateId: null,
  selectedTemplate: null,
  selectTemplate: (id: string) => {
    const template = get().templates.find((t) => t.id === id) ?? null;
    set({ selectedTemplateId: id, selectedTemplate: template });
  },
}));
