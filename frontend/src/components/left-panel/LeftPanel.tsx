import { TemplateSelector } from './TemplateSelector';
import { MeasurementForm } from './MeasurementForm';

export function LeftPanel() {
  return (
    <div className="flex flex-col h-full bg-white">
      <TemplateSelector />
      <MeasurementForm />
    </div>
  );
}
