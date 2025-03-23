
import React from 'react';
import { Home, Bell, Bot, User } from 'lucide-react';

const BottomNavigation: React.FC = () => {
  // Get the current path to highlight the active link
  const currentPath = window.location.pathname;

  return (
    <nav className="fixed bottom-0 w-full bg-white border-t border-gray-200 px-4 py-2">
      <div className="flex justify-around items-center">
        <a 
          href="/" 
          className={`flex flex-col items-center ${currentPath === '/' ? 'text-teal' : 'text-gray-400'}`}
        >
          <Home className="h-5 w-5" />
          <span className="text-xs mt-1">Beranda</span>
        </a>
        <a 
          href="/announcements"
          className={`flex flex-col items-center ${currentPath === '/announcements' ? 'text-teal' : 'text-gray-400'}`}
        >
          <Bell className="h-5 w-5" />
          <span className="text-xs mt-1">Pengumuman</span>
        </a>
        <a 
          href="/konsultasi"
          className={`flex flex-col items-center ${currentPath === '/konsultasi' ? 'text-teal' : 'text-gray-400'}`}
        >
          <Bot className="h-5 w-5" />
          <span className="text-xs mt-1">Konsultasi</span>
        </a>
        <a 
          href="/login"
          className={`flex flex-col items-center ${currentPath === '/login' ? 'text-teal' : 'text-gray-400'}`}
        >
          <User className="h-5 w-5" />
          <span className="text-xs mt-1">Masuk</span>
        </a>
      </div>
    </nav>
  );
};

export default BottomNavigation;
