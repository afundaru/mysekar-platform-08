
import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { User, ArrowLeft, Mail, Phone, UserRound, BadgeCheck, Edit, Camera, Image as ImageIcon } from 'lucide-react';
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import ProfileEditForm from './ProfileEditForm';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

const UserProfile: React.FC = () => {
  const { user } = useAuth();
  const [editing, setEditing] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  
  const memberData = user?.user_metadata || {};

  // Function to handle going back to dashboard
  const handleGoBack = () => {
    console.log("Navigating back to dashboard");
    try {
      window.location.href = '/dashboard';
    } catch (error) {
      console.error("Navigation error:", error);
      window.location.href = '/dashboard';
    }
  };
  
  // Function to handle file selection
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user) return;
    
    setUploading(true);
    setError(null);
    
    try {
      // Generate a unique file name
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${fileName}`;
      
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        throw new Error('File too large. Maximum size is 5MB.');
      }
      
      // Upload the file to Supabase Storage
      const { error: uploadError, data } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);
        
      if (uploadError) throw uploadError;
      
      // Get the public URL
      const { data: publicUrlData } = supabase.storage.from('avatars').getPublicUrl(filePath);
      
      // Update user metadata with avatar URL
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
  
  // Function to trigger file input click
  const handleGalleryClick = () => {
    fileInputRef.current?.click();
  };
  
  // Function to trigger camera input click
  const handleCameraClick = () => {
    cameraInputRef.current?.click();
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
  
  if (editing) {
    return <ProfileEditForm onCancel={() => setEditing(false)} />;
  }
  
  // Fallback avatar URL
  const fallbackAvatarUrl = "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg";
  
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
      
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex items-center">
            <div className="relative mr-4">
              <Avatar className="h-16 w-16">
                {avatarUrl ? (
                  <AvatarImage 
                    src={avatarUrl} 
                    alt="Profile" 
                    onError={(e) => {
                      // Fallback if image fails to load
                      e.currentTarget.src = fallbackAvatarUrl;
                    }}
                  />
                ) : (
                  <AvatarImage src={fallbackAvatarUrl} alt="Profile" />
                )}
                <AvatarFallback>{memberData?.full_name?.charAt(0) || user?.email?.charAt(0) || 'U'}</AvatarFallback>
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
            </div>
            <div>
              <h3 className="text-lg font-semibold">{memberData?.full_name || 'Nama Lengkap'}</h3>
              <p className="text-sm text-gray-500 flex items-center">
                <BadgeCheck className="h-4 w-4 text-teal mr-1" />
                Anggota Aktif
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-base font-semibold">Informasi Pribadi</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex items-center text-sm text-gray-500 mb-1">
              <UserRound className="h-4 w-4 mr-2" />
              <Label>PN Bank Raya</Label>
            </div>
            <p className="font-medium">{memberData?.pn_number || '-'}</p>
          </div>
          
          <div>
            <div className="flex items-center text-sm text-gray-500 mb-1">
              <Mail className="h-4 w-4 mr-2" />
              <Label>Email</Label>
            </div>
            <p className="font-medium">{user?.email || '-'}</p>
          </div>
          
          <div>
            <div className="flex items-center text-sm text-gray-500 mb-1">
              <Phone className="h-4 w-4 mr-2" />
              <Label>Nomor Telepon</Label>
            </div>
            <p className="font-medium">{memberData?.phone_number || '-'}</p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">Informasi Keanggotaan</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex items-center text-sm text-gray-500 mb-1">
              <Label>Status Keanggotaan</Label>
            </div>
            <p className="font-medium">Aktif</p>
          </div>
          
          <div>
            <div className="flex items-center text-sm text-gray-500 mb-1">
              <Label>Nomor Anggota</Label>
            </div>
            <p className="font-medium">SP-BR-{memberData?.pn_number || '000000'}</p>
          </div>
          
          <div>
            <div className="flex items-center text-sm text-gray-500 mb-1">
              <Label>Bergabung Sejak</Label>
            </div>
            <p className="font-medium">Januari 2023</p>
          </div>
          
          <div>
            <div className="flex items-center text-sm text-gray-500 mb-1">
              <Label>Berlaku Hingga</Label>
            </div>
            <p className="font-medium">Desember 2025</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfile;
