
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, MessageSquare, FilePen, Bot, User } from 'lucide-react';

const KonsultasiBottomNavigation: React.FC = () => {
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 w-full bg-white border-t border-gray-200 px-4 py-2">
      <div className="flex justify-around items-center">
        <button 
          className="flex flex-col items-center text-gray-400"
          onClick={() => navigate('/dashboard')}
        >
          <Home className="h-5 w-5" />
          <span className="text-xs mt-1">Beranda</span>
        </button>
        <button className="flex flex-col items-center text-gray-400">
          <MessageSquare className="h-5 w-5" />
          <span className="text-xs mt-1">Forum</span>
        </button>
        <button className="flex flex-col items-center text-gray-400">
          <FilePen className="h-5 w-5" />
          <span className="text-xs mt-1">Pengaduan</span>
        </button>
        <button 
          className="flex flex-col items-center text-teal"
          onClick={() => navigate('/konsultasi-hukum')}
        >
          <Bot className="h-5 w-5" />
          <span className="text-xs mt-1">Konsultasi</span>
        </button>
        <button 
          className="flex flex-col items-center text-gray-400"
          onClick={() => navigate('/profile')}
        >
          <User className="h-5 w-5" />
          <span className="text-xs mt-1">Profil</span>
        </button>
      </div>
    </nav>
  );
};

export default KonsultasiBottomNavigation;
