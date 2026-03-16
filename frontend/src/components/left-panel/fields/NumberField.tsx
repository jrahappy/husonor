import type { NumberFieldDef } from '../../../types/template';

interface Props {
  field: NumberFieldDef;
  value: number | null;
  onChange: (value: number | null) => void;
}

export function NumberField({ field, value, onChange }: Props) {
  const isAbnormal =
    field.normalRange &&
    value != null &&
    ((field.normalRange.min !== undefined && value < field.normalRange.min) ||
      (field.normalRange.max !== undefined && value > field.normalRange.max));

  return (
    <div className="flex items-center gap-2">
      <input
        type="number"
        value={value ?? ''}
        onChange={(e) => {
          const v = e.target.value;
          onChange(v === '' ? null : Number(v));
        }}
        step={field.step}
        placeholder={field.placeholder ?? field.label}
        className={`w-24 px-2 py-1 border rounded text-sm text-right
          ${isAbnormal ? 'border-red-400 bg-red-50 text-red-700' : 'border-gray-300'}
          focus:outline-none focus:ring-1 focus:ring-blue-500`}
      />
      {field.unit && (
        <span className="text-xs text-gray-500 w-12">{field.unit}</span>
      )}
      {field.normalRange && (
        <span className="text-xs text-gray-400">
          ({field.normalRange.min ?? ''}~{field.normalRange.max ?? ''})
        </span>
      )}
    </div>
  );
}
