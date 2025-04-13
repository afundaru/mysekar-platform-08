
import * as React from 'react';
import { Bell, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Header: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <header className="bg-white px-4 py-3 flex justify-between items-center shadow-sm animate-slide-down">
      <div className="flex items-center">
        <h1 className="text-xl font-bold text-teal">MySEKAR</h1>
      </div>
      <div className="flex items-center space-x-4">
        <button className="text-gray-600 hover:text-teal transition-colors duration-200">
          <Bell size={20} />
        </button>
        <div className="flex items-center">
          {user && (
            <span className="text-sm font-medium mr-2 hidden md:block">
              {user.user_metadata.full_name || user.email}
            </span>
          )}
          <button className="text-gray-600 hover:text-teal transition-colors duration-200">
            <User size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
