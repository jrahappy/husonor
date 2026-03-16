import { useTemplateStore } from '../../stores/useTemplateStore';
import { useFormStore } from '../../stores/useFormStore';

export function TemplateSelector() {
  const { templates, selectedTemplateId, selectTemplate } = useTemplateStore();
  const resetForm = useFormStore((s) => s.resetForm);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    if (id) {
      resetForm();
      selectTemplate(id);
    }
  };

  return (
    <div className="p-4 border-b border-gray-200 bg-gray-50">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        검사 종류
      </label>
      <select
        value={selectedTemplateId ?? ''}
        onChange={handleChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
      >
        <option value="">검사를 선택하세요</option>
        {templates.map((t) => (
          <option key={t.id} value={t.id}>
            {t.nameKo}
          </option>
        ))}
      </select>
    </div>
  );
}
