
import React from 'react';
import { Bell } from 'lucide-react';

const PengaduanPageHeader: React.FC = () => {
  return (
    <>
      {/* Status Bar */}
      <div className="bg-teal h-6"></div>
      
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-3 bg-white shadow-md">
        <h1 className="text-lg font-bold">Pengaduan dan Tindak Lanjut</h1>
        <Bell className="text-gray-600 h-5 w-5" />
      </div>
    </>
  );
};

export default PengaduanPageHeader;
