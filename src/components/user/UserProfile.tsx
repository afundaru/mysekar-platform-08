
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { ArrowLeft, Edit } from 'lucide-react';
import { Button } from "@/components/ui/button";
import ProfileEditForm from './ProfileEditForm';
import { toast } from 'sonner';
import ProfileHeader from './ProfileHeader';
import PersonalInfo from './PersonalInfo';
import MembershipInfo from './MembershipInfo';
import { useNavigate, useLocation } from 'react-router-dom';

const UserProfile: React.FC = () => {
  console.log("UserProfile rendering");
  
  // Set up router hooks inside the component body
  const navigate = useNavigate();
  const location = useLocation();
  
  const { user, loading } = useAuth();
  const [editing, setEditing] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Function to handle going back to dashboard
  const handleGoBack = () => {
    console.log("Navigating back to dashboard");
    navigate('/dashboard');
  };
  
  // Load avatar URL from user metadata on component mount
  useEffect(() => {
    if (user?.user_metadata?.avatar_url) {
      setAvatarUrl(user.user_metadata.avatar_url);
    }
  }, [user]);
  
  // Handle offline state
  useEffect(() => {
    const handleOnlineStatus = () => {
      if (!navigator.onLine) {
        toast.warning("Anda sedang offline. Beberapa fitur mungkin tidak tersedia.");
      }
    };
    
    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOnlineStatus);
    
    return () => {
      window.removeEventListener('online', handleOnlineStatus);
      window.removeEventListener('offline', handleOnlineStatus);
    };
  }, []);

  console.log("UserProfile rendering state:", { 
    userExists: !!user, 
    loading, 
    editing,
    userEmail: user?.email || 'none'
  });
  
  // Separate the rendering logic based on state
  if (loading) {
    return (
      <div className="w-full max-w-md mx-auto p-4">
        <div className="flex justify-center items-center h-48">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal"></div>
          <p className="ml-2">Memuat data...</p>
        </div>
      </div>
    );
  }
  
  if (!user) {
    return (
      <div className="w-full max-w-md mx-auto p-4">
        <div className="flex flex-col justify-center items-center h-48">
          <p className="text-gray-500 mb-4">Sesi tidak valid atau Anda belum login</p>
          <Button onClick={() => navigate('/login')} className="bg-teal hover:bg-teal-600">
            Login
          </Button>
        </div>
      </div>
    );
  }
  
  if (editing) {
    return <ProfileEditForm onCancel={() => setEditing(false)} />;
  }
  
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={handleGoBack}
          className="mr-2"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h2 className="text-xl font-bold">Profil Anggota</h2>
        <Button 
          variant="ghost" 
          size="icon" 
          className="ml-auto"
          onClick={() => setEditing(true)}
        >
          <Edit className="h-5 w-5" />
        </Button>
      </div>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      <ProfileHeader 
        user={user} 
        avatarUrl={avatarUrl} 
        setAvatarUrl={setAvatarUrl} 
      />
      
      <PersonalInfo user={user} />
      
      <MembershipInfo user={user} />
    </div>
  );
};

export default UserProfile;
