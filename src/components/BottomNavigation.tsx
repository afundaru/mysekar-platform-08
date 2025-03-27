
import React from 'react';
import { Home, MessageSquare, Flag, Gavel, UserCircle } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const BottomNavigation: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path ? 'text-teal' : 'text-gray-600';
  };
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white p-2 border-t flex justify-around items-center z-10" aria-label="Main Navigation">
      <Link 
        to="/" 
        className={`flex flex-col items-center hover:text-teal p-1 ${isActive('/')}`}
        aria-label="Go to Home page"
      >
        <Home className="h-6 w-6" aria-hidden="true" />
        <span className="text-xs">Beranda</span>
      </Link>
      <Link 
        to="/forum" 
        className={`flex flex-col items-center hover:text-teal p-1 ${isActive('/forum')}`}
        aria-label="Go to Forum page"
      >
        <MessageSquare className="h-6 w-6" aria-hidden="true" />
        <span className="text-xs">Forum</span>
      </Link>
      <Link 
        to="/pengaduan" 
        className={`flex flex-col items-center hover:text-teal p-1 ${isActive('/pengaduan')}`}
        aria-label="Go to Pengaduan page"
      >
        <Flag className="h-6 w-6" aria-hidden="true" />
        <span className="text-xs">Pengaduan</span>
      </Link>
      <Link 
        to="/konsultasi" 
        className={`flex flex-col items-center hover:text-teal p-1 ${isActive('/konsultasi')}`}
        aria-label="Go to Konsultasi page"
      >
        <Gavel className="h-6 w-6" aria-hidden="true" />
        <span className="text-xs">Konsultasi</span>
      </Link>
      <Link 
        to="/profile" 
        className={`flex flex-col items-center hover:text-teal p-1 ${isActive('/profile')}`}
        aria-label="Go to Profile page"
      >
        <UserCircle className="h-6 w-6" aria-hidden="true" />
        <span className="text-xs">Profil</span>
      </Link>
    </nav>
  );
};

export default BottomNavigation;
