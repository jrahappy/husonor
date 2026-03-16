import type { CheckboxFieldDef } from '../../../types/template';

interface Props {
  field: CheckboxFieldDef;
  value: boolean;
  onChange: (value: boolean) => void;
}

export function CheckboxField({ field, value, onChange }: Props) {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        checked={value}
        onChange={(e) => onChange(e.target.checked)}
        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
      />
      <span className="text-sm text-gray-700">{field.labelKo}</span>
    </label>
  );
}
