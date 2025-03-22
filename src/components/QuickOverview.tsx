
import React from 'react';
import { CreditCard, FileCheck } from 'lucide-react';

const QuickOverview: React.FC = () => {
  return (
    <section className="p-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-teal p-4 rounded-lg text-white">
          <CreditCard className="h-6 w-6 mb-2" />
          <h3 className="text-sm font-medium">Status Keanggotaan</h3>
          <p className="text-xs mt-1">Aktif hingga Des 2025</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <FileCheck className="h-6 w-6 mb-2 text-teal" />
          <h3 className="text-sm font-medium">Pengaduan Aktif</h3>
          <p className="text-xs text-gray-500 mt-1">2 dalam proses</p>
        </div>
      </div>
    </section>
  );
};

export default QuickOverview;
