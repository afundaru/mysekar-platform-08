
import { useState, useEffect } from 'react';
import { announcementService, Announcement } from '@/services/api/announcement.service';

export const useAnnouncements = (limit?: number) => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAnnouncements();
  }, [limit]);

  const fetchAnnouncements = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = limit 
        ? await announcementService.getRecentAnnouncements(limit)
        : await announcementService.getAllAnnouncements();
      
      if (error) {
        throw error;
      }
      
      setAnnouncements(data || []);
    } catch (err: any) {
      console.error('Error fetching announcements:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createAnnouncement = async (announcementData: {
    title: string;
    description?: string;
    image_url?: string;
  }, userId?: string) => {
    try {
      setLoading(true);
      const result = await announcementService.createAnnouncement(announcementData, userId);
      
      if (!result.success) {
        throw result.error || new Error('Failed to create announcement');
      }
      
      await fetchAnnouncements();
      return { success: true };
    } catch (error: any) {
      console.error('Error creating announcement:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const updateAnnouncement = async (id: string, announcementData: {
    title: string;
    description?: string;
    image_url?: string;
  }) => {
    try {
      setLoading(true);
      const result = await announcementService.updateAnnouncement(id, announcementData);
      
      if (!result.success) {
        throw result.error || new Error('Failed to update announcement');
      }
      
      await fetchAnnouncements();
      return { success: true };
    } catch (error: any) {
      console.error('Error updating announcement:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const deleteAnnouncement = async (id: string) => {
    try {
      setLoading(true);
      const result = await announcementService.deleteAnnouncement(id);
      
      if (!result.success) {
        throw result.error || new Error('Failed to delete announcement');
      }
      
      await fetchAnnouncements();
      return { success: true };
    } catch (error: any) {
      console.error('Error deleting announcement:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  return {
    announcements,
    loading,
    error,
    fetchAnnouncements,
    createAnnouncement,
    updateAnnouncement,
    deleteAnnouncement
  };
};
