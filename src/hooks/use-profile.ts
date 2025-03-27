
import { useState } from 'react';
import { userService, UserMetadata } from '@/services/api/user.service';
import { toast } from 'sonner';

export const useProfile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateProfile = async (userData: Partial<UserMetadata>) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { success, error } = await userService.updateProfile(userData);
      
      if (!success) {
        throw error || new Error('Failed to update profile');
      }
      
      toast.success("Profil berhasil diperbarui");
      return { success: true };
    } catch (err: any) {
      console.error("Error updating profile:", err);
      setError(err.message || 'Gagal memperbarui profil');
      toast.error(err.message || "Gagal memperbarui profil");
      return { success: false, error: err };
    } finally {
      setIsLoading(false);
    }
  };

  const uploadAvatar = async (file: File, userId: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { success, url, error } = await userService.uploadAvatar(file, userId);
      
      if (!success) {
        throw error || new Error('Failed to upload avatar');
      }
      
      toast.success("Foto profil berhasil diperbarui");
      return { success: true, url };
    } catch (err: any) {
      console.error('Error uploading avatar:', err);
      setError(err.message || 'Gagal mengunggah foto profil');
      toast.error(err.message || "Gagal mengunggah foto profil");
      return { success: false, error: err };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    updateProfile,
    uploadAvatar
  };
};
