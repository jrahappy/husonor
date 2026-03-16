import type { FieldDefinition } from '../../../types/template';
import { NumberField } from './NumberField';
import { SelectField } from './SelectField';
import { CheckboxField } from './CheckboxField';
import { TextField } from './TextField';

interface Props {
  field: FieldDefinition;
  value: string | number | boolean | null;
  onChange: (value: string | number | boolean | null) => void;
}

export function FieldRenderer({ field, value, onChange }: Props) {
  switch (field.type) {
    case 'number':
      return (
        <NumberField
          field={field}
          value={value as number | null}
          onChange={onChange}
        />
      );
    case 'select':
      return (
        <SelectField
          field={field}
          value={value as string | null}
          onChange={onChange}
        />
      );
    case 'checkbox':
      return (
        <CheckboxField
          field={field}
          value={(value as boolean) ?? false}
          onChange={onChange}
        />
      );
    case 'text':
      return (
        <TextField
          field={field}
          value={(value as string) ?? ''}
          onChange={onChange}
        />
      );
  }
}
