
import React from 'react';

const PengaduanHeader: React.FC = () => {
  return (
    <header className="bg-white px-4 py-3 flex justify-between items-center shadow-sm">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold">Pengaduan dan Tindak Lanjut</h1>
      </div>
      <div className="flex items-center space-x-4">
        <button className="text-gray-600">
          <i className="fa-regular fa-bell text-xl"></i>
        </button>
        <button className="text-gray-600">
          <i className="fa-solid fa-gear text-xl"></i>
        </button>
      </div>
    </header>
  );
};

export default PengaduanHeader;
