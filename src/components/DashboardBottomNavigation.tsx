
import React from 'react';
import { Home, FileText, MessageSquare, User } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const DashboardBottomNavigation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const isActive = (path: string) => {
    return location.pathname === path ? 'text-teal' : 'text-gray-500';
  };
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-3 z-10">
      <div className="max-w-full mx-auto">
        <div className="flex justify-around w-full">
          <button 
            onClick={() => navigate('/dashboard')} 
            className={`flex flex-col items-center ${isActive('/dashboard')}`}
            type="button"
          >
            <Home className="h-5 w-5" />
            <span className="text-xs mt-1">Beranda</span>
          </button>
          
          <button 
            onClick={() => navigate('/pengaduan')} 
            className={`flex flex-col items-center ${isActive('/pengaduan')}`}
            type="button"
          >
            <FileText className="h-5 w-5" />
            <span className="text-xs mt-1">Pengaduan</span>
          </button>
          
          <button 
            onClick={() => navigate('/konsultasi')} 
            className={`flex flex-col items-center ${isActive('/konsultasi')}`}
            type="button"
          >
            <MessageSquare className="h-5 w-5" />
            <span className="text-xs mt-1">Konsultasi</span>
          </button>
          
          <button 
            onClick={() => navigate('/profile')} 
            className={`flex flex-col items-center ${isActive('/profile')}`}
            type="button"
          >
            <User className="h-5 w-5" />
            <span className="text-xs mt-1">Profil</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardBottomNavigation;
