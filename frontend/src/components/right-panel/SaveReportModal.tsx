import { useState } from 'react';
import { Modal } from '../common/Modal';
import { useReportStore } from '../../stores/useReportStore';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function SaveReportModal({ isOpen, onClose }: Props) {
  const [patientId, setPatientId] = useState('');
  const [notes, setNotes] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const saveCurrentReport = useReportStore((s) => s.saveCurrentReport);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await saveCurrentReport(patientId || undefined, notes || undefined);
      setPatientId('');
      setNotes('');
      onClose();
    } catch {
      alert('Failed to save report.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Save Report">
      <div className="space-y-4">
        <div>
          <label className="block text-sm text-gray-600 mb-1">Patient ID</label>
          <input
            type="text"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Optional"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
            placeholder="Optional notes..."
          />
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-3 py-1.5 text-xs border border-gray-300 text-gray-600 rounded hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-3 py-1.5 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {isSaving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </Modal>
  );
}
