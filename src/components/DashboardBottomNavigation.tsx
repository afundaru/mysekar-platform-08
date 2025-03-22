
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, FileText, MessageSquare, User } from 'lucide-react';
import { 
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem
} from '@/components/ui/navigation-menu';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import SignOutButton from './auth/SignOutButton';

const DashboardBottomNavigation: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path ? 'text-teal' : 'text-gray-500';
  };
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-3">
      <NavigationMenu className="max-w-full mx-auto">
        <NavigationMenuList className="justify-around w-full">
          <NavigationMenuItem>
            <NavLink to="/dashboard" className={`flex flex-col items-center ${isActive('/dashboard')}`}>
              <Home className="h-5 w-5" />
              <span className="text-xs mt-1">Beranda</span>
            </NavLink>
          </NavigationMenuItem>
          
          <NavigationMenuItem>
            <NavLink to="/pengaduan" className={`flex flex-col items-center ${isActive('/pengaduan')}`}>
              <FileText className="h-5 w-5" />
              <span className="text-xs mt-1">Pengaduan</span>
            </NavLink>
          </NavigationMenuItem>
          
          <NavigationMenuItem>
            <NavLink to="/konsultasi-hukum" className={`flex flex-col items-center ${isActive('/konsultasi-hukum')}`}>
              <MessageSquare className="h-5 w-5" />
              <span className="text-xs mt-1">Konsultasi</span>
            </NavLink>
          </NavigationMenuItem>
          
          <NavigationMenuItem>
            <NavLink to="/profile" className={`flex flex-col items-center ${isActive('/profile')}`}>
              <User className="h-5 w-5" />
              <span className="text-xs mt-1">Profil</span>
            </NavLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default DashboardBottomNavigation;
