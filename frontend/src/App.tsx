import { Header } from './components/layout/Header';
import { SplitLayout } from './components/layout/SplitLayout';
import { LeftPanel } from './components/left-panel/LeftPanel';
import { RightPanel } from './components/right-panel/RightPanel';
import { useReportGeneration } from './hooks/useReportGeneration';

function App() {
  useReportGeneration();

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Header />
      <SplitLayout
        left={<LeftPanel />}
        right={<RightPanel />}
      />
    </div>
  );
}

export default App;
