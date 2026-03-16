import type { SelectFieldDef } from '../../../types/template';

interface Props {
  field: SelectFieldDef;
  value: string | null;
  onChange: (value: string) => void;
}

export function SelectField({ field, value, onChange }: Props) {
  return (
    <select
      value={value ?? field.defaultValue ?? ''}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-2 py-1 border border-gray-300 rounded text-sm
        focus:outline-none focus:ring-1 focus:ring-blue-500"
    >
      {field.options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
