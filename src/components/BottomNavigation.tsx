
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Bell, Bot, User } from 'lucide-react';

const BottomNavigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 w-full bg-white border-t border-gray-200 px-4 py-2">
      <div className="flex justify-around items-center">
        <button 
          className={`flex flex-col items-center ${location.pathname === '/' ? 'text-teal' : 'text-gray-400'}`}
          onClick={() => navigate('/')}
        >
          <Home className="h-5 w-5" />
          <span className="text-xs mt-1">Beranda</span>
        </button>
        <button className="flex flex-col items-center text-gray-400">
          <Bell className="h-5 w-5" />
          <span className="text-xs mt-1">Pengumuman</span>
        </button>
        <button className="flex flex-col items-center text-gray-400">
          <Bot className="h-5 w-5" />
          <span className="text-xs mt-1">Konsultasi</span>
        </button>
        <button 
          className={`flex flex-col items-center ${location.pathname === '/login' ? 'text-teal' : 'text-gray-400'}`}
          onClick={() => navigate('/login')}
        >
          <User className="h-5 w-5" />
          <span className="text-xs mt-1">Masuk</span>
        </button>
      </div>
    </nav>
  );
};

export default BottomNavigation;
