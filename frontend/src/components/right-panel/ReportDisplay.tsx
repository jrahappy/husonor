import { useReportStore } from '../../stores/useReportStore';
import { useTemplateStore } from '../../stores/useTemplateStore';
import { useFormStore } from '../../stores/useFormStore';

export function ReportDisplay() {
  const report = useReportStore((s) => s.currentReport);
  const template = useTemplateStore((s) => s.selectedTemplate);
  const values = useFormStore((s) => s.values);

  if (!template) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">
        Select an examination type to generate a report.
      </div>
    );
  }

  if (!report || report.sections.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">
        Enter measurement values to auto-generate the report.
      </div>
    );
  }

  const clinicalHistory = (values['clinical_history'] as string) ?? '';
  const sonographer = (values['sonographer'] as string) ?? '';

  return (
    <div className="p-6 space-y-3 text-sm leading-relaxed text-gray-800">
      {/* Header */}
      <h2 className="text-base font-bold text-gray-900">
        {report.header}
      </h2>

      {/* Clinical History */}
      <p>
        <span className="font-bold">Clinical history: </span>
        {clinicalHistory || <span className="text-gray-400 italic">—</span>}
      </p>

      {/* Findings */}
      <div>
        <span className="font-bold">Findings: </span>
        {report.findingsIntro && (
          <span>{report.findingsIntro}</span>
        )}
      </div>

      {/* Section sentences */}
      {report.sections.map((section) => {
        if (!section.sentences) return null;
        return (
          <p
            key={section.sectionId}
            className={section.hasAbnormalFindings ? 'text-red-700' : ''}
          >
            {section.sentences}
          </p>
        );
      })}

      {/* Conclusion */}
      {report.conclusion && (
        <p className="font-bold mt-4">
          CONCLUSION: <span className="font-normal">{report.conclusion}</span>
        </p>
      )}

      {/* Sonographer */}
      <p className="mt-2">
        <span className="font-bold">Sonographer: </span>
        {sonographer || <span className="text-gray-400 italic">—</span>}
      </p>
    </div>
  );
}
