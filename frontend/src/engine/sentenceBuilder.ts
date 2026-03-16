import type { FieldDefinition, SelectFieldDef, CheckboxFieldDef } from '../types/template';
import type { FormValues } from '../types/report';

/**
 * 템플릿 문자열의 플레이스홀더를 실제 값으로 치환하여 문장을 생성합니다.
 *
 * 지원하는 플레이스홀더 문법:
 * - {{fieldId}}               → 필드 값 그대로 대입
 * - {{fieldId:normal:A|B}}    → 정상범위이면 A, 아니면 B
 * - {{fieldId:sentence}}      → select 옵션의 sentenceFragment
 * - {{fieldId:checked}}       → checkbox의 checkedSentence
 * - {{?fieldId:내용}}          → 값이 있을 때만 포함
 */
export function interpolateSentence(
  pattern: string,
  values: FormValues,
  fieldDefs: Map<string, FieldDefinition>,
): string {
  let result = pattern;

  // 1. 조건부 블록: {{?fieldId:content}}
  // 중첩된 플레이스홀더를 포함할 수 있으므로 반복 처리
  result = result.replace(
    /\{\{\?(\w+):((?:[^{}]|\{\{[^}]*\}\})*)\}\}/g,
    (_match, fieldId: string, content: string) => {
      const value = values[fieldId];
      if (value === null || value === undefined || value === '' || value === false) {
        return '';
      }
      return content;
    },
  );

  // 2. 정상범위 조건: {{fieldId:normal:textNormal|textAbnormal}}
  result = result.replace(
    /\{\{(\w+):normal:([^|]*)\|([^}]*)\}\}/g,
    (_match, fieldId: string, normalText: string, abnormalText: string) => {
      const value = values[fieldId];
      const field = fieldDefs.get(fieldId);
      if (field?.type === 'number' && field.normalRange && value != null && value !== '') {
        const numValue = Number(value);
        const { min, max } = field.normalRange;
        const isNormal =
          (min === undefined || numValue >= min) &&
          (max === undefined || numValue <= max);
        return isNormal ? normalText : abnormalText;
      }
      return '';
    },
  );

  // 3. select sentenceFragment: {{fieldId:sentence}}
  result = result.replace(
    /\{\{(\w+):sentence\}\}/g,
    (_match, fieldId: string) => {
      const value = values[fieldId] as string;
      const field = fieldDefs.get(fieldId);
      if (field?.type === 'select') {
        const selectField = field as SelectFieldDef;
        const option = selectField.options.find((o) => o.value === value);
        return option?.sentenceFragment ?? '';
      }
      return '';
    },
  );

  // 4. checkbox checkedSentence: {{fieldId:checked}}
  result = result.replace(
    /\{\{(\w+):checked\}\}/g,
    (_match, fieldId: string) => {
      const value = values[fieldId] as boolean;
      const field = fieldDefs.get(fieldId);
      if (field?.type === 'checkbox' && value) {
        const checkboxField = field as CheckboxFieldDef;
        return checkboxField.checkedSentence ?? '';
      }
      return '';
    },
  );

  // 5. 값 직접 대입: {{fieldId}}
  result = result.replace(
    /\{\{(\w+)\}\}/g,
    (_match, fieldId: string) => {
      const value = values[fieldId];
      if (value === null || value === undefined || value === '') return '___';
      return String(value);
    },
  );

  // 6. 정리: 이중 공백, 마침표 앞 쉼표 등 제거
  result = result.replace(/\s{2,}/g, ' ');
  result = result.replace(/,\s*\./g, '.');
  result = result.replace(/\.\s*\./g, '.');
  result = result.trim();

  return result;
}
