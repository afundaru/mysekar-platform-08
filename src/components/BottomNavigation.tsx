
import React from 'react';
import { Home, MessageSquare, Flag, Gavel, UserCircle } from 'lucide-react';

const BottomNavigation: React.FC = () => {
  // Use standard anchor tags instead of react-router hooks
  return (
    <div className="bg-white p-2 border-t flex justify-around items-center">
      <a href="/" className="flex flex-col items-center text-gray-600 hover:text-teal p-1">
        <Home className="h-6 w-6" />
        <span className="text-xs">Beranda</span>
      </a>
      <a href="/forum" className="flex flex-col items-center text-gray-600 hover:text-teal p-1">
        <MessageSquare className="h-6 w-6" />
        <span className="text-xs">Forum</span>
      </a>
      <a href="/pengaduan" className="flex flex-col items-center text-gray-600 hover:text-teal p-1">
        <Flag className="h-6 w-6" />
        <span className="text-xs">Pengaduan</span>
      </a>
      <a href="/konsultasi" className="flex flex-col items-center text-gray-600 hover:text-teal p-1">
        <Gavel className="h-6 w-6" />
        <span className="text-xs">Konsultasi</span>
      </a>
      <a href="/profile" className="flex flex-col items-center text-gray-600 hover:text-teal p-1">
        <UserCircle className="h-6 w-6" />
        <span className="text-xs">Profil</span>
      </a>
    </div>
  );
};

export default BottomNavigation;
