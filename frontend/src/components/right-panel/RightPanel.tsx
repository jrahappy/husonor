import { useState } from 'react';
import { ReportToolbar } from './ReportToolbar';
import { ReportDisplay } from './ReportDisplay';
import { SavedReportsList } from './SavedReportsList';

type Tab = 'report' | 'saved';

export function RightPanel() {
  const [activeTab, setActiveTab] = useState<Tab>('report');

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Tab header */}
      <div className="px-6 py-3 border-b border-gray-200 bg-gray-50 shrink-0 flex gap-4">
        <button
          onClick={() => setActiveTab('report')}
          className={`text-sm font-semibold pb-0.5 border-b-2 transition-colors ${
            activeTab === 'report'
              ? 'text-blue-600 border-blue-600'
              : 'text-gray-400 border-transparent hover:text-gray-600'
          }`}
        >
          Report
        </button>
        <button
          onClick={() => setActiveTab('saved')}
          className={`text-sm font-semibold pb-0.5 border-b-2 transition-colors ${
            activeTab === 'saved'
              ? 'text-blue-600 border-blue-600'
              : 'text-gray-400 border-transparent hover:text-gray-600'
          }`}
        >
          Saved
        </button>
      </div>

      {/* Tab content */}
      {activeTab === 'report' ? (
        <>
          <ReportToolbar />
          <div className="flex-1 overflow-y-auto">
            <ReportDisplay />
          </div>
        </>
      ) : (
        <div className="flex-1 overflow-y-auto">
          <SavedReportsList onSwitchToReport={() => setActiveTab('report')} />
        </div>
      )}
    </div>
  );
}
