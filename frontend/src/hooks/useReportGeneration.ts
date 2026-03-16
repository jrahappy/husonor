import { useEffect } from 'react';
import { useTemplateStore } from '../stores/useTemplateStore';
import { useFormStore } from '../stores/useFormStore';
import { useReportStore } from '../stores/useReportStore';
import { generateReport } from '../engine/reportGenerator';
import { useDebounce } from './useDebounce';

export function useReportGeneration() {
  const template = useTemplateStore((s) => s.selectedTemplate);
  const values = useFormStore((s) => s.values);
  const setCurrentReport = useReportStore((s) => s.setCurrentReport);

  const debouncedValues = useDebounce(values, 300);

  useEffect(() => {
    if (!template) return;
    const report = generateReport(template, debouncedValues);
    setCurrentReport(report);
  }, [template, debouncedValues, setCurrentReport]);
}
