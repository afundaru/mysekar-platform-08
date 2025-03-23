
import React from 'react';
import { Home, FileText, MessageSquare, User } from 'lucide-react';
import { 
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem
} from '@/components/ui/navigation-menu';

const DashboardBottomNavigation: React.FC = () => {
  const currentPath = window.location.pathname;
  
  const isActive = (path: string) => {
    return currentPath === path ? 'text-teal' : 'text-gray-500';
  };
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-3">
      <NavigationMenu className="max-w-full mx-auto">
        <NavigationMenuList className="justify-around w-full">
          <NavigationMenuItem>
            <a href="/dashboard" className={`flex flex-col items-center ${isActive('/dashboard')}`}>
              <Home className="h-5 w-5" />
              <span className="text-xs mt-1">Beranda</span>
            </a>
          </NavigationMenuItem>
          
          <NavigationMenuItem>
            <a href="/pengaduan" className={`flex flex-col items-center ${isActive('/pengaduan')}`}>
              <FileText className="h-5 w-5" />
              <span className="text-xs mt-1">Pengaduan</span>
            </a>
          </NavigationMenuItem>
          
          <NavigationMenuItem>
            <a href="/konsultasi" className={`flex flex-col items-center ${isActive('/konsultasi')}`}>
              <MessageSquare className="h-5 w-5" />
              <span className="text-xs mt-1">Konsultasi</span>
            </a>
          </NavigationMenuItem>
          
          <NavigationMenuItem>
            <a href="/profile" className={`flex flex-col items-center ${isActive('/profile')}`}>
              <User className="h-5 w-5" />
              <span className="text-xs mt-1">Profil</span>
            </a>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default DashboardBottomNavigation;
