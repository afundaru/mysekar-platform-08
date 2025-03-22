
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, MessageSquare, Plus, Megaphone, User } from 'lucide-react';

const DashboardBottomNavigation: React.FC = () => {
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 w-full bg-white border-t border-gray-200 px-4 py-2">
      <div className="flex justify-around items-center">
        <button 
          className="flex flex-col items-center text-teal"
          onClick={() => navigate('/dashboard')}
        >
          <Home className="h-5 w-5" />
          <span className="text-xs mt-1">Beranda</span>
        </button>
        <button className="flex flex-col items-center text-gray-400">
          <MessageSquare className="h-5 w-5" />
          <span className="text-xs mt-1">Forum</span>
        </button>
        <div className="relative -top-5">
          <button className="bg-primary-blue w-14 h-14 rounded-full flex items-center justify-center shadow-lg">
            <Plus className="h-6 w-6 text-white" />
          </button>
        </div>
        <button className="flex flex-col items-center text-gray-400">
          <Megaphone className="h-5 w-5" />
          <span className="text-xs mt-1">Pengumuman</span>
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

export default DashboardBottomNavigation;
