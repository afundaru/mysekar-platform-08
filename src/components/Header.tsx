
import * as React from 'react';
import { Bell, User } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white px-4 py-3 flex justify-between items-center shadow-sm animate-slide-down">
      <div className="flex items-center">
        <h1 className="text-xl font-bold text-teal">MySEKAR</h1>
      </div>
      <div className="flex items-center space-x-4">
        <button className="text-gray-600 hover:text-teal transition-colors duration-200">
          <Bell size={20} />
        </button>
        <button className="text-gray-600 hover:text-teal transition-colors duration-200">
          <User size={20} />
        </button>
      </div>
    </header>
  );
};

export default Header;
