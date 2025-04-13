
import React from 'react';
import { Home, Megaphone, Bot, User, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const BottomNavigation: React.FC = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const handleAuthClick = () => {
    if (user) {
      signOut();
    } else {
      navigate('/auth');
    }
  };

  return (
    <nav className="fixed bottom-0 w-full bg-white border-t border-gray-200 px-4 py-2 z-10 animate-slide-up">
      <div className="flex justify-around items-center">
        <button 
          className="flex flex-col items-center text-teal"
          onClick={() => navigate('/')}
        >
          <Home size={20} />
          <span className="text-xs mt-1">Beranda</span>
        </button>
        <button className="flex flex-col items-center text-gray-400 hover:text-teal transition-colors duration-200">
          <Megaphone size={20} />
          <span className="text-xs mt-1">Pengumuman</span>
        </button>
        <button className="flex flex-col items-center text-gray-400 hover:text-teal transition-colors duration-200">
          <Bot size={20} />
          <span className="text-xs mt-1">Konsultasi</span>
        </button>
        <button 
          className="flex flex-col items-center text-gray-400 hover:text-teal transition-colors duration-200"
          onClick={handleAuthClick}
        >
          {user ? (
            <>
              <LogOut size={20} />
              <span className="text-xs mt-1">Keluar</span>
            </>
          ) : (
            <>
              <User size={20} />
              <span className="text-xs mt-1">Masuk</span>
            </>
          )}
        </button>
      </div>
    </nav>
  );
};

export default BottomNavigation;
