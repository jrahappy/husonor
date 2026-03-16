import { useState } from 'react';
import type { TemplateSection } from '../../types/template';
import type { FormValues } from '../../types/report';
import { FieldRenderer } from './fields/FieldRenderer';

interface Props {
  section: TemplateSection;
  values: FormValues;
  onFieldChange: (fieldId: string, value: string | number | boolean | null) => void;
}

export function FormSection({ section, values, onFieldChange }: Props) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="border-b border-gray-100">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2.5 flex items-center justify-between hover:bg-gray-50 transition-colors"
      >
        <span className="text-sm font-semibold text-gray-700">
          {section.title}
          {section.titleKo && (
            <span className="text-xs text-gray-400 ml-2 font-normal">{section.titleKo}</span>
          )}
        </span>
        <svg
          className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="px-4 pb-3 space-y-2">
          {section.fields.map((field) => {
            if (field.type === 'checkbox') {
              return (
                <div key={field.id}>
                  <FieldRenderer
                    field={field}
                    value={values[field.id] ?? null}
                    onChange={(v) => onFieldChange(field.id, v)}
                  />
                </div>
              );
            }

            return (
              <div key={field.id} className="flex items-center gap-3">
                <label className="text-sm text-gray-600 w-40 shrink-0 text-right">
                  {field.label}
                </label>
                <div className="flex-1">
                  <FieldRenderer
                    field={field}
                    value={values[field.id] ?? null}
                    onChange={(v) => onFieldChange(field.id, v)}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
