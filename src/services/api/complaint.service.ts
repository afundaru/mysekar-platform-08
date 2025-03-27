
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface Complaint {
  id: string;
  title: string;
  description: string;
  category: string;
  status: string;
  created_at: string;
  updated_at?: string;
  user_id: string;
  is_anonymous: boolean;
}

export interface ComplaintAttachment {
  id: string;
  complaint_id: string;
  file_path: string;
  file_name: string;
  file_type: string;
  file_size: number;
  created_at: string;
}

export interface ComplaintSubmission {
  title: string;
  description: string;
  category: string;
  is_anonymous: boolean;
}

export const complaintsService = {
  /**
   * Fetch all complaints for the current user
   */
  async getComplaints(): Promise<{ data: Complaint[] | null; error: Error | null }> {
    try {
      // Check for an active session first
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) {
        console.error('Session error:', sessionError);
        throw new Error('Sesi pengguna tidak ditemukan. Silakan masuk kembali.');
      }
      
      if (!sessionData.session?.user.id) {
        throw new Error('Silakan login terlebih dahulu.');
      }
      
      const userId = sessionData.session.user.id;
      
      const { data, error: complaintsError } = await supabase
        .from('complaints')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
      
      if (complaintsError) {
        console.error('Error fetching complaints:', complaintsError);
        throw complaintsError;
      }
      
      return { data, error: null };
    } catch (error: any) {
      console.error('Error in getComplaints:', error);
      return { data: null, error };
    }
  },

  /**
   * Submit a new complaint
   */
  async submitComplaint(submission: ComplaintSubmission, file?: File | null): Promise<{ success: boolean; error: Error | null; complaintId?: string }> {
    try {
      // Get user ID from session
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) {
        throw new Error('Sesi pengguna tidak ditemukan. Silakan masuk kembali.');
      }
      
      const userId = sessionData.session?.user.id;
      if (!userId) {
        throw new Error("Anda harus login terlebih dahulu");
      }

      // Insert complaint record
      const { data: insertedData, error: complaintError } = await supabase
        .from('complaints')
        .insert({
          user_id: userId,
          title: submission.title,
          description: submission.description,
          category: submission.category,
          is_anonymous: submission.is_anonymous,
          status: 'pending' // Default status for new complaints
        })
        .select('id')
        .single();

      if (complaintError) {
        console.error('Error submitting complaint:', complaintError);
        throw complaintError;
      }

      // Upload file if provided
      if (file && insertedData?.id) {
        const fileExt = file.name.split('.').pop();
        const filePath = `${userId}/${insertedData.id}/${Math.random().toString(36).substring(2)}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('complaint_attachments')
          .upload(filePath, file);

        if (uploadError) {
          console.error('Error uploading file:', uploadError);
          // Continue with successful complaint submission even if file upload fails
          toast.warning("Berhasil mengirim pengaduan, namun gagal mengunggah file");
        } else {
          // Save attachment record
          const { error: attachmentError } = await supabase
            .from('complaint_attachments')
            .insert({
              complaint_id: insertedData.id,
              file_path: filePath,
              file_name: file.name,
              file_type: file.type,
              file_size: file.size,
            });

          if (attachmentError) {
            console.error('Error saving attachment record:', attachmentError);
          }
        }
      }

      return { success: true, error: null, complaintId: insertedData?.id };
    } catch (err: any) {
      console.error('Error submitting complaint:', err);
      return { success: false, error: err };
    }
  },

  /**
   * Get active complaints count
   */
  async getActiveComplaintsCount(userId: string): Promise<number> {
    try {
      const { count, error } = await supabase
        .from('complaints')
        .select('*', { count: 'exact' })
        .eq('user_id', userId)
        .in('status', ['pending', 'in_progress', 'Pending', 'Diproses'])
        .limit(1);
      
      if (error) {
        console.error('Error fetching active complaints:', error);
        return 0;
      }
      
      return count || 0;
    } catch (err) {
      console.error('Error in getActiveComplaintsCount:', err);
      return 0;
    }
  }
};
