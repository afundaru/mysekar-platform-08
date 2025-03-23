
import React from 'react';
import { ArrowLeft, Bell, Settings } from 'lucide-react';

interface PengaduanHeaderProps {
  title: string;
  showBackButton?: boolean;
  onBackClick?: () => void;
}

const PengaduanHeader: React.FC<PengaduanHeaderProps> = ({ 
  title, 
  showBackButton = false, 
  onBackClick 
}) => {
  return (
    <header className="bg-white px-4 py-3 flex justify-between items-center shadow-sm">
      <div className="flex items-center">
        {showBackButton && (
          <button 
            onClick={onBackClick}
            className="mr-2 rounded-full p-1 hover:bg-gray-100"
            aria-label="Kembali"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
        )}
        <h1 className="text-lg font-semibold">{title}</h1>
      </div>
      <div className="flex items-center space-x-4">
        <button className="text-gray-600" aria-label="Notifikasi">
          <Bell className="h-5 w-5" />
        </button>
        <button className="text-gray-600" aria-label="Pengaturan">
          <Settings className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
};

export default PengaduanHeader;
