
import React from 'react';
import { Home, MessageSquare, Flag, Gavel, UserCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BottomNavigation: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white p-2 border-t flex justify-around items-center z-10">
      <button 
        onClick={() => navigate('/')} 
        className="flex flex-col items-center text-gray-600 hover:text-teal p-1"
        type="button"
      >
        <Home className="h-6 w-6" />
        <span className="text-xs">Beranda</span>
      </button>
      <button 
        onClick={() => navigate('/forum')} 
        className="flex flex-col items-center text-gray-600 hover:text-teal p-1"
        type="button"
      >
        <MessageSquare className="h-6 w-6" />
        <span className="text-xs">Forum</span>
      </button>
      <button 
        onClick={() => navigate('/pengaduan')} 
        className="flex flex-col items-center text-gray-600 hover:text-teal p-1"
        type="button"
      >
        <Flag className="h-6 w-6" />
        <span className="text-xs">Pengaduan</span>
      </button>
      <button 
        onClick={() => navigate('/konsultasi')} 
        className="flex flex-col items-center text-gray-600 hover:text-teal p-1"
        type="button"
      >
        <Gavel className="h-6 w-6" />
        <span className="text-xs">Konsultasi</span>
      </button>
      <button 
        onClick={() => navigate('/profile')} 
        className="flex flex-col items-center text-gray-600 hover:text-teal p-1"
        type="button"
      >
        <UserCircle className="h-6 w-6" />
        <span className="text-xs">Profil</span>
      </button>
    </div>
  );
};

export default BottomNavigation;
