
import { supabase } from '@/integrations/supabase/client';

export interface UserProfile {
  id: string;
  full_name?: string;
  pn_number?: string;
  phone_number?: string;
  created_at?: string;
  updated_at?: string;
}

export interface UserMetadata {
  full_name?: string;
  pn_number?: string;
  phone_number?: string;
  avatar_url?: string;
}

export const userService = {
  /**
   * Update user profile data
   */
  async updateProfile(userData: Partial<UserMetadata>): Promise<{ success: boolean; error: Error | null }> {
    try {
      const { error } = await supabase.auth.updateUser({
        data: userData
      });
      
      if (error) throw error;
      
      return { success: true, error: null };
    } catch (error: any) {
      console.error("Error updating profile:", error);
      return { success: false, error };
    }
  },

  /**
   * Upload a profile avatar image
   */
  async uploadAvatar(file: File, userId: string): Promise<{ success: boolean; url?: string; error: Error | null }> {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${userId}-${Math.random().toString(36).substring(2)}.${fileExt}`;
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
      
      return { success: true, url: publicUrlData.publicUrl, error: null };
    } catch (error: any) {
      console.error('Error uploading avatar:', error);
      return { success: false, error };
    }
  }
};
