
import React from 'react';
import { Home, MessageSquare, FilePen, Bot, User } from 'lucide-react';
import { Link } from 'react-router-dom';

// Create a simpler version that doesn't depend on Router context
const PengaduanBottomNavigation: React.FC = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 w-full bg-white border-t border-gray-200 px-4 py-2 z-10" aria-label="Pengaduan Navigation">
      <div className="flex justify-around items-center">
        <Link 
          to="/dashboard"
          className="flex flex-col items-center text-gray-400 hover:text-teal"
          aria-label="Go to Dashboard"
        >
          <Home className="h-5 w-5" aria-hidden="true" />
          <span className="text-xs mt-1">Beranda</span>
        </Link>
        <Link 
          to="/forum"
          className="flex flex-col items-center text-gray-400 hover:text-teal"
          aria-label="Go to Forum"
        >
          <MessageSquare className="h-5 w-5" aria-hidden="true" />
          <span className="text-xs mt-1">Forum</span>
        </Link>
        <Link 
          to="/pengaduan"
          className="flex flex-col items-center text-teal"
          aria-label="Go to Pengaduan"
        >
          <FilePen className="h-5 w-5" aria-hidden="true" />
          <span className="text-xs mt-1">Pengaduan</span>
        </Link>
        <Link 
          to="/konsultasi"
          className="flex flex-col items-center text-gray-400 hover:text-teal"
          aria-label="Go to Konsultasi"
        >
          <Bot className="h-5 w-5" aria-hidden="true" />
          <span className="text-xs mt-1">Konsultasi</span>
        </Link>
        <Link 
          to="/profile"
          className="flex flex-col items-center text-gray-400 hover:text-teal"
          aria-label="Go to Profile"
        >
          <User className="h-5 w-5" aria-hidden="true" />
          <span className="text-xs mt-1">Profil</span>
        </Link>
      </div>
    </nav>
  );
};

export default PengaduanBottomNavigation;
