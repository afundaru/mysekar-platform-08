
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';

export interface Announcement {
  id: string;
  title: string;
  description?: string;
  image_url?: string;
  date: string;
  created_at: string;
  updated_at?: string;
  created_by?: string;
}

export interface AnnouncementInput {
  title: string;
  description?: string;
  image_url?: string;
}

export const announcementService = {
  /**
   * Fetch recent announcements
   */
  async getRecentAnnouncements(limit: number = 3): Promise<{ data: Announcement[] | null; error: Error | null }> {
    try {
      const { data, error } = await supabase
        .from('announcements')
        .select('id, title, date, image_url, description, created_at')
        .order('date', { ascending: false })
        .limit(limit);
      
      if (error) {
        throw error;
      }
      
      if (data) {
        const formattedAnnouncements = data.map(item => ({
          ...item,
          date: format(new Date(item.date), 'dd MMM yyyy')
        }));
        return { data: formattedAnnouncements, error: null };
      }
      
      return { data: [], error: null };
    } catch (err: any) {
      console.error('Error fetching announcements:', err);
      return { data: null, error: err };
    }
  },

  /**
   * Fetch all announcements
   */
  async getAllAnnouncements(): Promise<{ data: Announcement[] | null; error: Error | null }> {
    try {
      const { data, error } = await supabase
        .from('announcements')
        .select('*')
        .order('date', { ascending: false });
      
      if (error) throw error;
      
      return { data, error: null };
    } catch (error: any) {
      console.error('Error fetching all announcements:', error);
      return { data: null, error };
    }
  },

  /**
   * Create a new announcement
   */
  async createAnnouncement(announcement: AnnouncementInput, userId?: string): Promise<{ success: boolean; error: Error | null; id?: string }> {
    try {
      const { data, error } = await supabase
        .from('announcements')
        .insert({
          title: announcement.title,
          description: announcement.description,
          image_url: announcement.image_url,
          created_by: userId
        })
        .select('id')
        .single();
        
      if (error) throw error;
      
      return { success: true, error: null, id: data?.id };
    } catch (error: any) {
      console.error('Error saving announcement:', error);
      return { success: false, error };
    }
  },

  /**
   * Update an existing announcement
   */
  async updateAnnouncement(id: string, announcement: AnnouncementInput): Promise<{ success: boolean; error: Error | null }> {
    try {
      const { error } = await supabase
        .from('announcements')
        .update({
          title: announcement.title,
          description: announcement.description,
          image_url: announcement.image_url,
          updated_at: new Date().toISOString()
        })
        .eq('id', id);
        
      if (error) throw error;
      
      return { success: true, error: null };
    } catch (error: any) {
      console.error('Error updating announcement:', error);
      return { success: false, error };
    }
  },

  /**
   * Delete an announcement
   */
  async deleteAnnouncement(id: string): Promise<{ success: boolean; error: Error | null }> {
    try {
      const { error } = await supabase
        .from('announcements')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      return { success: true, error: null };
    } catch (error: any) {
      console.error('Error deleting announcement:', error);
      return { success: false, error };
    }
  }
};
