
import React from 'react';

const DashboardHeader: React.FC = () => {
  return (
    <header className="bg-white px-4 py-3 flex justify-between items-center shadow-sm">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden">
          <img 
            src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg" 
            alt="Profile" 
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h2 className="text-sm font-semibold">Sarah Amelia</h2>
          <span className="text-xs text-teal">Anggota Aktif</span>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <button className="text-gray-600 relative">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 bg-red-500 w-2 h-2 rounded-full"></span>
        </button>
        <button className="text-gray-600">
          <Settings className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
};

export default DashboardHeader;

// Import Lucide icons
import { Bell, Settings } from 'lucide-react';
