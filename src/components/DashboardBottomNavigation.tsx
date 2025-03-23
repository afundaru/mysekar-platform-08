
import React from 'react';
import { Home, FileText, MessageSquare, User } from 'lucide-react';

const DashboardBottomNavigation: React.FC = () => {
  const currentPath = window.location.pathname;
  
  const isActive = (path: string) => {
    return currentPath === path ? 'text-teal' : 'text-gray-500';
  };
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-3">
      <div className="max-w-full mx-auto">
        <div className="flex justify-around w-full">
          <a href="/dashboard" className={`flex flex-col items-center ${isActive('/dashboard')}`}>
            <Home className="h-5 w-5" />
            <span className="text-xs mt-1">Beranda</span>
          </a>
          
          <a href="/pengaduan" className={`flex flex-col items-center ${isActive('/pengaduan')}`}>
            <FileText className="h-5 w-5" />
            <span className="text-xs mt-1">Pengaduan</span>
          </a>
          
          <a href="/konsultasi" className={`flex flex-col items-center ${isActive('/konsultasi')}`}>
            <MessageSquare className="h-5 w-5" />
            <span className="text-xs mt-1">Konsultasi</span>
          </a>
          
          <a href="/profile" className={`flex flex-col items-center ${isActive('/profile')}`}>
            <User className="h-5 w-5" />
            <span className="text-xs mt-1">Profil</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default DashboardBottomNavigation;
