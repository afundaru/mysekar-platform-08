
import React from 'react';
import { Home, MessageSquare, Flag, Gavel, UserCircle } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const BottomNavigation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const isActive = (path: string) => {
    return location.pathname === path ? 'text-teal' : 'text-gray-600';
  };
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white p-2 border-t flex justify-around items-center z-10">
      <button onClick={() => navigate('/')} className={`flex flex-col items-center ${isActive('/')} hover:text-teal p-1`}>
        <Home className="h-6 w-6" />
        <span className="text-xs">Beranda</span>
      </button>
      <button onClick={() => navigate('/forum')} className={`flex flex-col items-center ${isActive('/forum')} hover:text-teal p-1`}>
        <MessageSquare className="h-6 w-6" />
        <span className="text-xs">Forum</span>
      </button>
      <button onClick={() => navigate('/pengaduan')} className={`flex flex-col items-center ${isActive('/pengaduan')} hover:text-teal p-1`}>
        <Flag className="h-6 w-6" />
        <span className="text-xs">Pengaduan</span>
      </button>
      <button onClick={() => navigate('/konsultasi')} className={`flex flex-col items-center ${isActive('/konsultasi')} hover:text-teal p-1`}>
        <Gavel className="h-6 w-6" />
        <span className="text-xs">Konsultasi</span>
      </button>
      <button onClick={() => navigate('/profile')} className={`flex flex-col items-center ${isActive('/profile')} hover:text-teal p-1`}>
        <UserCircle className="h-6 w-6" />
        <span className="text-xs">Profil</span>
      </button>
    </div>
  );
};

export default BottomNavigation;
