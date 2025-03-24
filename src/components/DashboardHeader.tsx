
import React, { useEffect } from 'react';
import { Bell, Settings } from 'lucide-react';
import { 
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { DropdownWrapper } from '@/components/ui/dropdown-wrapper';
import SignOutButton from './auth/SignOutButton';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const DashboardHeader: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    console.log("DashboardHeader rendering with user:", !!user);
  }, [user]);
  
  // Get avatar URL from user metadata
  const avatarUrl = user?.user_metadata?.avatar_url || "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg";
  
  const handleProfileClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/profile');
  };
  
  return (
    <header className="bg-white px-4 py-3 flex justify-between items-center shadow-sm">
      {/* Left side with profile */}
      <div 
        className="flex items-center space-x-3 cursor-pointer" 
        onClick={handleProfileClick}
      >
        <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden">
          <img 
            src={avatarUrl}
            alt="Profile" 
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback if image fails to load
              (e.target as HTMLImageElement).src = "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg";
            }}
          />
        </div>
        <div>
          <h2 className="text-sm font-semibold">{user?.email?.split('@')[0] || 'Pengguna'}</h2>
          <span className="text-xs text-teal">Anggota Aktif</span>
        </div>
      </div>
      
      {/* Right side with notifications and settings */}
      <div className="flex items-center space-x-4">
        <button className="text-gray-600 relative">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 bg-red-500 w-2 h-2 rounded-full"></span>
        </button>
        
        {/* Settings dropdown */}
        <DropdownWrapper 
          trigger={
            <button className="focus:outline-none">
              <Settings className="h-5 w-5 text-gray-600" />
            </button>
          }
          align="end"
          className="bg-white"
        >
          <DropdownMenuItem onClick={() => navigate('/profile')}>
            Pengaturan Profil
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <SignOutButton variant="ghost" showIcon={true} className="w-full justify-start p-0 h-auto font-normal" />
          </DropdownMenuItem>
        </DropdownWrapper>
      </div>
    </header>
  );
};

export default DashboardHeader;
