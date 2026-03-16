import { useTemplateStore } from '../../stores/useTemplateStore';
import { useFormStore } from '../../stores/useFormStore';
import { FormSection } from './FormSection';

export function MeasurementForm() {
  const template = useTemplateStore((s) => s.selectedTemplate);
  const values = useFormStore((s) => s.values);
  const setFieldValue = useFormStore((s) => s.setFieldValue);
  const resetForm = useFormStore((s) => s.resetForm);

  if (!template) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-400 text-sm p-8">
        좌측 상단에서 검사 종류를 선택하세요.
      </div>
    );
  }

  const sortedSections = [...template.sections].sort((a, b) => a.order - b.order);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto">
        {sortedSections.map((section) => (
          <FormSection
            key={section.id}
            section={section}
            values={values}
            onFieldChange={setFieldValue}
          />
        ))}
      </div>

      <div className="p-3 border-t border-gray-200 bg-gray-50 shrink-0">
        <button
          onClick={resetForm}
          className="px-4 py-1.5 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-100 transition-colors"
        >
          초기화
        </button>
      </div>
    </div>
  );
}
