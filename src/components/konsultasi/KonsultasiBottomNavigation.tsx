
import React from 'react';
import { Home, MessageSquare, FilePen, Bot, User } from 'lucide-react';

const KonsultasiBottomNavigation: React.FC = () => {
  const currentPath = window.location.pathname;
  
  const isActive = (path: string) => {
    return currentPath === path ? 'text-teal' : 'text-gray-400';
  };
  
  return (
    <nav className="fixed bottom-0 w-full bg-white border-t border-gray-200 px-4 py-2">
      <div className="flex justify-around items-center">
        <a 
          href="/dashboard"
          className={`flex flex-col items-center ${isActive('/dashboard')}`}
        >
          <Home className="h-5 w-5" />
          <span className="text-xs mt-1">Beranda</span>
        </a>
        <a 
          href="/forum"
          className={`flex flex-col items-center ${isActive('/forum')}`}
        >
          <MessageSquare className="h-5 w-5" />
          <span className="text-xs mt-1">Forum</span>
        </a>
        <a 
          href="/pengaduan"
          className={`flex flex-col items-center ${isActive('/pengaduan')}`}
        >
          <FilePen className="h-5 w-5" />
          <span className="text-xs mt-1">Pengaduan</span>
        </a>
        <a 
          href="/konsultasi"
          className={`flex flex-col items-center ${isActive('/konsultasi')}`}
        >
          <Bot className="h-5 w-5" />
          <span className="text-xs mt-1">Konsultasi</span>
        </a>
        <a 
          href="/profile"
          className={`flex flex-col items-center ${isActive('/profile')}`}
        >
          <User className="h-5 w-5" />
          <span className="text-xs mt-1">Profil</span>
        </a>
      </div>
    </nav>
  );
};

export default KonsultasiBottomNavigation;
