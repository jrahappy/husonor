import { useEffect } from 'react';
import { useReportStore } from '../../stores/useReportStore';
import { useTemplateStore } from '../../stores/useTemplateStore';
import { useFormStore } from '../../stores/useFormStore';
import type { FormValues } from '../../types/report';

interface Props {
  onSwitchToReport: () => void;
}

export function SavedReportsList({ onSwitchToReport }: Props) {
  const savedReports = useReportStore((s) => s.savedReports);
  const isLoading = useReportStore((s) => s.isLoading);
  const error = useReportStore((s) => s.error);
  const fetchSavedReports = useReportStore((s) => s.fetchSavedReports);
  const loadSavedReport = useReportStore((s) => s.loadSavedReport);
  const deleteSavedReport = useReportStore((s) => s.deleteSavedReport);
  const selectTemplate = useTemplateStore((s) => s.selectTemplate);
  const setAllValues = useFormStore((s) => s.setAllValues);

  useEffect(() => {
    fetchSavedReports();
  }, [fetchSavedReports]);

  const handleLoad = async (id: number, templateId: string) => {
    try {
      const detail = await loadSavedReport(id);
      selectTemplate(templateId);
      requestAnimationFrame(() => {
        setAllValues(detail.form_values as FormValues);
        onSwitchToReport();
      });
    } catch {
      alert('Failed to load report.');
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Delete this saved report?')) return;
    try {
      await deleteSavedReport(id);
    } catch {
      alert('Failed to delete report.');
    }
  };

  if (isLoading) {
    return <div className="p-6 text-sm text-gray-400">Loading...</div>;
  }

  if (error) {
    return <div className="p-6 text-sm text-red-500">{error}</div>;
  }

  if (savedReports.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">
        No saved reports yet.
      </div>
    );
  }

  return (
    <div className="p-4 space-y-2">
      {savedReports.map((r) => (
        <div
          key={r.id}
          className="flex items-center justify-between p-3 border border-gray-200 rounded-md hover:bg-gray-50"
        >
          <div className="min-w-0 flex-1">
            <div className="text-sm font-medium text-gray-800 truncate">
              {r.template_name}
            </div>
            <div className="text-xs text-gray-500">
              {r.patient_id || '(no patient ID)'}
              {' \u00b7 '}
              {new Date(r.created_at).toLocaleDateString()}
            </div>
          </div>
          <div className="flex gap-2 ml-3 shrink-0">
            <button
              onClick={() => handleLoad(r.id, r.template_id)}
              className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Load
            </button>
            <button
              onClick={() => handleDelete(r.id)}
              className="px-3 py-1 text-xs border border-gray-300 text-gray-600 rounded hover:bg-gray-100 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
