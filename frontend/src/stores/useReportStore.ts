import { create } from 'zustand';
import type { GeneratedReport } from '../types/report';
import type { ReportListItem, ReportDetail, ReportCreatePayload } from '../api/reportApi';
import { createReport, listReports, getReport, deleteReport } from '../api/reportApi';
import { reportToPlainText } from '../engine/reportFormatter';
import { useFormStore } from './useFormStore';

interface ReportState {
  currentReport: GeneratedReport | null;
  setCurrentReport: (report: GeneratedReport) => void;

  savedReports: ReportListItem[];
  isLoading: boolean;
  error: string | null;

  fetchSavedReports: (templateId?: string) => Promise<void>;
  saveCurrentReport: (patientId?: string, notes?: string) => Promise<void>;
  loadSavedReport: (id: number) => Promise<ReportDetail>;
  deleteSavedReport: (id: number) => Promise<void>;
}

export const useReportStore = create<ReportState>()((set, get) => ({
  currentReport: null,
  setCurrentReport: (report) => set({ currentReport: report }),

  savedReports: [],
  isLoading: false,
  error: null,

  fetchSavedReports: async (templateId) => {
    set({ isLoading: true, error: null });
    try {
      const reports = await listReports(templateId);
      set({ savedReports: reports, isLoading: false });
    } catch (e) {
      set({ error: (e as Error).message, isLoading: false });
    }
  },

  saveCurrentReport: async (patientId, notes) => {
    const current = get().currentReport;
    if (!current) return;

    const formValues = useFormStore.getState().values;
    const clinicalHistory = (formValues['clinical_history'] as string) ?? '';
    const sonographer = (formValues['sonographer'] as string) ?? '';
    const generatedText = reportToPlainText(current, clinicalHistory, sonographer);

    const payload: ReportCreatePayload = {
      template_id: current.templateId,
      template_name: current.templateName,
      patient_id: patientId,
      form_values: current.rawValues,
      generated_text: generatedText,
      conclusion: current.conclusion || undefined,
      notes,
    };

    await createReport(payload);
    await get().fetchSavedReports();
  },

  loadSavedReport: async (id) => {
    const detail = await getReport(id);
    return detail;
  },

  deleteSavedReport: async (id) => {
    await deleteReport(id);
    set((state) => ({
      savedReports: state.savedReports.filter((r) => r.id !== id),
    }));
  },
}));
