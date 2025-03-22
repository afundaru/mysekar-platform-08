
import React from 'react';
import { Bell, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import SignOutButton from './auth/SignOutButton';
import { useAuth } from '@/contexts/AuthContext';

const DashboardHeader: React.FC = () => {
  const { user } = useAuth();
  const avatarUrl = user?.user_metadata?.avatar_url || "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg";
  
  return (
    <header className="bg-white px-4 py-3 flex justify-between items-center shadow-sm">
      <Link to="/profile" className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden">
          <img 
            src={avatarUrl}
            alt="Profile" 
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h2 className="text-sm font-semibold">{user?.email?.split('@')[0] || 'Pengguna'}</h2>
          <span className="text-xs text-teal">Anggota Aktif</span>
        </div>
      </Link>
      <div className="flex items-center space-x-4">
        <button className="text-gray-600 relative">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 bg-red-500 w-2 h-2 rounded-full"></span>
        </button>
        <DropdownMenu>
          <DropdownMenuTrigger className="focus:outline-none">
            <Settings className="h-5 w-5 text-gray-600" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <Link to="/profile">
              <DropdownMenuItem>
                Pengaturan Profil
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <SignOutButton variant="ghost" showIcon={true} className="w-full justify-start p-0 h-auto font-normal" />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default DashboardHeader;
