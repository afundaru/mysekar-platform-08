
import React from 'react';
import { FilePen, History } from 'lucide-react';

interface QuickActionsProps {
  onNewComplaint: () => void;
  onHistory: () => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({ onNewComplaint, onHistory }) => {
  return (
    <section className="grid grid-cols-2 gap-4 p-4">
      <button 
        className="bg-teal text-white p-4 rounded-lg flex flex-col items-center"
        onClick={onNewComplaint}
      >
        <FilePen className="h-6 w-6 mb-2" />
        <span className="text-sm">Buat Pengaduan Baru</span>
      </button>
      <button 
        className="bg-primary-blue text-white p-4 rounded-lg flex flex-col items-center"
        onClick={onHistory}
      >
        <History className="h-6 w-6 mb-2" />
        <span className="text-sm">Riwayat Pengaduan</span>
      </button>
    </section>
  );
};

export default QuickActions;
