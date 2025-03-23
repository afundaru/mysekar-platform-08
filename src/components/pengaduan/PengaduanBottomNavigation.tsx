
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, MessageSquare, FilePen, Bot, User } from 'lucide-react';

const PengaduanBottomNavigation: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 w-full bg-white border-t border-gray-200 px-4 py-2">
      <div className="flex justify-around items-center">
        <Link 
          to="/dashboard"
          className="flex flex-col items-center text-gray-400"
        >
          <Home className="h-5 w-5" />
          <span className="text-xs mt-1">Beranda</span>
        </Link>
        <Link 
          to="/forum"
          className="flex flex-col items-center text-gray-400"
        >
          <MessageSquare className="h-5 w-5" />
          <span className="text-xs mt-1">Forum</span>
        </Link>
        <Link 
          to="/pengaduan"
          className="flex flex-col items-center text-teal"
        >
          <FilePen className="h-5 w-5" />
          <span className="text-xs mt-1">Pengaduan</span>
        </Link>
        <Link 
          to="/konsultasi"
          className="flex flex-col items-center text-gray-400"
        >
          <Bot className="h-5 w-5" />
          <span className="text-xs mt-1">Konsultasi</span>
        </Link>
        <Link 
          to="/profile"
          className="flex flex-col items-center text-gray-400"
        >
          <User className="h-5 w-5" />
          <span className="text-xs mt-1">Profil</span>
        </Link>
      </div>
    </nav>
  );
};

export default PengaduanBottomNavigation;
