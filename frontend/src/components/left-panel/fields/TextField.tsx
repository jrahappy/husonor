import type { TextFieldDef } from '../../../types/template';

interface Props {
  field: TextFieldDef;
  value: string;
  onChange: (value: string) => void;
}

export function TextField({ field, value, onChange }: Props) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={field.placeholder}
      maxLength={field.maxLength}
      rows={3}
      className="w-full px-2 py-1 border border-gray-300 rounded text-sm resize-y
        focus:outline-none focus:ring-1 focus:ring-blue-500"
    />
  );
}
