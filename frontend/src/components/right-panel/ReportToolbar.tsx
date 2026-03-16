import { useState } from 'react';
import { useReportStore } from '../../stores/useReportStore';
import { useFormStore } from '../../stores/useFormStore';
import { reportToPlainText } from '../../engine/reportFormatter';
import { SaveReportModal } from './SaveReportModal';

export function ReportToolbar() {
  const report = useReportStore((s) => s.currentReport);
  const values = useFormStore((s) => s.values);
  const [showSaveModal, setShowSaveModal] = useState(false);

  const clinicalHistory = (values['clinical_history'] as string) ?? '';
  const sonographer = (values['sonographer'] as string) ?? '';

  const handleCopy = async () => {
    if (!report) return;
    const text = reportToPlainText(report, clinicalHistory, sonographer);
    try {
      await navigator.clipboard.writeText(text);
      alert('Copied to clipboard.');
    } catch {
      alert('Failed to copy.');
    }
  };

  const handleExport = () => {
    if (!report) return;
    const text = reportToPlainText(report, clinicalHistory, sonographer);
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `report_${report.templateId}_${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!report) return null;

  return (
    <>
      <div className="px-6 py-2 border-b border-gray-200 bg-gray-50 flex gap-2 shrink-0">
        <button
          onClick={handleCopy}
          className="px-3 py-1.5 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Copy
        </button>
        <button
          onClick={() => setShowSaveModal(true)}
          className="px-3 py-1.5 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Save
        </button>
        <button
          onClick={handleExport}
          className="px-3 py-1.5 text-xs border border-gray-300 text-gray-600 rounded hover:bg-gray-100 transition-colors"
        >
          Export (.txt)
        </button>
      </div>
      <SaveReportModal isOpen={showSaveModal} onClose={() => setShowSaveModal(false)} />
    </>
  );
}
