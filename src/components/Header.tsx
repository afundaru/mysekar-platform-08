
import * as React from 'react';
import { Bell, User } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-secondary px-4 py-3 flex justify-between items-center shadow-md animate-slide-down">
      <div className="flex items-center">
        <h1 className="font-montserrat font-bold text-2xl text-primary">MySEKAR</h1>
      </div>
      <div className="flex items-center space-x-4">
        <button className="text-white hover:text-primary transition-colors duration-200">
          <Bell size={24} />
        </button>
        <button className="text-white hover:text-primary transition-colors duration-200">
          <User size={24} />
        </button>
      </div>
    </header>
  );
};

export default Header;
