
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Bell, Bot, User } from 'lucide-react';

const BottomNavigation: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 w-full bg-white border-t border-gray-200 px-4 py-2">
      <div className="flex justify-around items-center">
        <Link 
          to="/" 
          className={`flex flex-col items-center ${location.pathname === '/' ? 'text-teal' : 'text-gray-400'}`}
        >
          <Home className="h-5 w-5" />
          <span className="text-xs mt-1">Beranda</span>
        </Link>
        <Link 
          to="/announcements"
          className="flex flex-col items-center text-gray-400"
        >
          <Bell className="h-5 w-5" />
          <span className="text-xs mt-1">Pengumuman</span>
        </Link>
        <Link 
          to="/konsultasi"
          className="flex flex-col items-center text-gray-400"
        >
          <Bot className="h-5 w-5" />
          <span className="text-xs mt-1">Konsultasi</span>
        </Link>
        <Link 
          to="/login"
          className={`flex flex-col items-center ${location.pathname === '/login' ? 'text-teal' : 'text-gray-400'}`}
        >
          <User className="h-5 w-5" />
          <span className="text-xs mt-1">Masuk</span>
        </Link>
      </div>
    </nav>
  );
};

export default BottomNavigation;
