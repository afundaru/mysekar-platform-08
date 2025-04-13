
import React from 'react';
import { Home, Megaphone, Bot, User } from 'lucide-react';

const BottomNavigation: React.FC = () => {
  return (
    <nav className="fixed bottom-0 w-full bg-secondary border-t border-gray-800 px-4 py-2 z-10 animate-slide-up">
      <div className="flex justify-around items-center">
        <button className="flex flex-col items-center text-primary">
          <Home size={24} />
          <span className="text-xs mt-1 font-medium">Beranda</span>
        </button>
        <button className="flex flex-col items-center text-white hover:text-primary transition-colors duration-200">
          <Megaphone size={24} />
          <span className="text-xs mt-1">Pengumuman</span>
        </button>
        <button className="flex flex-col items-center text-white hover:text-primary transition-colors duration-200">
          <Bot size={24} />
          <span className="text-xs mt-1">Konsultasi</span>
        </button>
        <button className="flex flex-col items-center text-white hover:text-primary transition-colors duration-200">
          <User size={24} />
          <span className="text-xs mt-1">Masuk</span>
        </button>
      </div>
    </nav>
  );
};

export default BottomNavigation;
