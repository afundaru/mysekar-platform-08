import React, { useRef, useState } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Camera, ImageIcon } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";

interface ProfileAvatarProps {
  user: any;
  avatarUrl: string | null;
  setAvatarUrl: (url: string | null) => void;
}

const ProfileAvatar: React.FC<ProfileAvatarProps> = ({ user, avatarUrl, setAvatarUrl }) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user) return;
    
    setUploading(true);
    setError(null);
    
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${fileName}`;
      
      if (file.size > 5 * 1024 * 1024) {
        throw new Error('File too large. Maximum size is 5MB.');
      }
      
      const { error: uploadError, data } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);
        
      if (uploadError) throw uploadError;
      
      const { data: publicUrlData } = supabase.storage.from('avatars').getPublicUrl(filePath);
      
      const { error: updateError } = await supabase.auth.updateUser({
        data: { avatar_url: publicUrlData.publicUrl }
      });
      
      if (updateError) throw updateError;
      
      setAvatarUrl(publicUrlData.publicUrl);
      toast.success("Foto profil berhasil diperbarui");
    } catch (error: any) {
      console.error('Error uploading avatar:', error);
      setError(error.message || "Gagal mengunggah foto profil");
      toast.error(error.message || "Gagal mengunggah foto profil");
    } finally {
      setUploading(false);
    }
  };
  
  const handleGalleryClick = () => {
    fileInputRef.current?.click();
  };
  
  const handleCameraClick = () => {
    cameraInputRef.current?.click();
  };
  
  const fallbackAvatarUrl = "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg";
  
  if (!user) {
    return (
      <div className="relative mr-4">
        <Skeleton className="h-16 w-16 rounded-full" />
      </div>
    );
  }
  
  const memberData = user?.user_metadata || {};
  const userInitial = memberData?.full_name?.charAt(0) || user?.email?.charAt(0) || 'U';
  
  return (
    <div className="relative mr-4">
      <Avatar className="h-16 w-16">
        {avatarUrl ? (
          <AvatarImage 
            src={avatarUrl} 
            alt="Profile" 
            onError={(e) => {
              e.currentTarget.src = fallbackAvatarUrl;
            }}
          />
        ) : (
          <AvatarImage src={fallbackAvatarUrl} alt="Profile" />
        )}
        <AvatarFallback>{userInitial}</AvatarFallback>
      </Avatar>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            size="icon" 
            variant="ghost" 
            className="absolute -bottom-2 -right-2 h-7 w-7 rounded-full bg-teal hover:bg-teal-600"
            disabled={uploading}
          >
            {uploading ? (
              <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              <Camera className="h-3.5 w-3.5 text-white" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center">
          <DropdownMenuItem onClick={handleGalleryClick}>
            <ImageIcon className="mr-2 h-4 w-4" />
            <span>Pilih dari Galeri</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleCameraClick}>
            <Camera className="mr-2 h-4 w-4" />
            <span>Ambil Foto</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange}
        accept="image/*" 
        className="hidden" 
      />
      <input 
        type="file" 
        ref={cameraInputRef} 
        onChange={handleFileChange}
        accept="image/*" 
        capture="user" 
        className="hidden" 
      />
      
      {error && (
        <div className="absolute -bottom-10 left-0 right-0 p-1 bg-red-100 text-red-700 rounded-md text-xs">
          {error}
        </div>
      )}
    </div>
  );
};

export default ProfileAvatar;
