import type { FieldDefinition, NumberFieldDef } from '../types/template';
import type { FormValues } from '../types/report';

export interface RangeCheckResult {
  fieldId: string;
  value: number;
  isNormal: boolean;
  deviation: 'below' | 'above' | 'normal';
  range: { min?: number; max?: number };
}

export function evaluateNormalRange(
  fieldId: string,
  value: number,
  field: NumberFieldDef,
): RangeCheckResult | null {
  if (!field.normalRange) return null;
  const { min, max } = field.normalRange;

  let deviation: 'below' | 'above' | 'normal' = 'normal';
  if (min !== undefined && value < min) deviation = 'below';
  if (max !== undefined && value > max) deviation = 'above';

  return {
    fieldId,
    value,
    isNormal: deviation === 'normal',
    deviation,
    range: { min, max },
  };
}

export function evaluateAllFields(
  values: FormValues,
  fields: FieldDefinition[],
): RangeCheckResult[] {
  const results: RangeCheckResult[] = [];
  for (const field of fields) {
    if (field.type === 'number' && field.normalRange) {
      const value = values[field.id];
      if (value != null && value !== '') {
        const result = evaluateNormalRange(field.id, Number(value), field);
        if (result) results.push(result);
      }
    }
  }
  return results;
}
