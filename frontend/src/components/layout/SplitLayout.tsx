import { type ReactNode, useState, useCallback } from 'react';

interface SplitLayoutProps {
  left: ReactNode;
  right: ReactNode;
}

export function SplitLayout({ left, right }: SplitLayoutProps) {
  const [splitRatio, setSplitRatio] = useState(0.45);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = useCallback(() => {
    setIsDragging(true);

    const handleMouseMove = (e: MouseEvent) => {
      const container = document.getElementById('split-container');
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const ratio = (e.clientX - rect.left) / rect.width;
      setSplitRatio(Math.max(0.25, Math.min(0.75, ratio)));
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, []);

  return (
    <div
      id="split-container"
      className="flex flex-1 overflow-hidden"
      style={{ cursor: isDragging ? 'col-resize' : undefined }}
    >
      {/* Left Panel */}
      <div
        className="overflow-y-auto border-r border-gray-200"
        style={{ width: `${splitRatio * 100}%` }}
      >
        {left}
      </div>

      {/* Divider */}
      <div
        className="w-1 bg-gray-200 hover:bg-blue-400 cursor-col-resize transition-colors shrink-0"
        onMouseDown={handleMouseDown}
      />

      {/* Right Panel */}
      <div
        className="overflow-y-auto flex-1"
      >
        {right}
      </div>
    </div>
  );
}
