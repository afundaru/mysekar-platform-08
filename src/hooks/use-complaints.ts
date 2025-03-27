
import { useState, useEffect } from 'react';
import { complaintsService, Complaint } from '@/services/api/complaint.service';
import { useNavigate } from 'react-router-dom';

export const useComplaints = () => {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const navigate = useNavigate();

  // Monitor online status
  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Fetch complaints whenever online status changes
  useEffect(() => {
    if (!isOffline) {
      fetchComplaints();
    }
  }, [isOffline]);

  const fetchComplaints = async () => {
    // If offline, don't try to fetch
    if (isOffline) {
      setError('Anda sedang offline. Silakan periksa koneksi internet Anda.');
      setIsLoading(false);
      return;
    }
    
    // If we're refreshing, don't show the full loading state again
    if (!isRefreshing) {
      setIsLoading(true);
    } else {
      setIsRefreshing(true);
    }
    setError(null);
    
    try {
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Waktu permintaan habis. Periksa koneksi internet Anda.')), 15000)
      );
      
      try {
        const result = await Promise.race([
          complaintsService.getComplaints(),
          timeoutPromise
        ]) as any;
        
        if (result.error) {
          throw result.error;
        }
        
        setComplaints(result.data || []);
      } catch (fetchError: any) {
        // If this is a network error, mark as offline
        if (fetchError.message?.includes('Failed to fetch') || 
            fetchError.message?.includes('NetworkError') ||
            fetchError.message?.includes('Network request failed') || 
            fetchError.message?.includes('Network timeout') ||
            fetchError.message?.includes('Waktu permintaan habis')) {
          setIsOffline(true);
          throw new Error('Tidak dapat terhubung ke server. Periksa koneksi internet Anda.');
        }
        throw fetchError;
      }
    } catch (err: any) {
      console.error('Error fetching complaints:', err);
      setError(err?.message || 'Gagal memuat data pengaduan. Silakan coba lagi nanti.');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  const submitComplaint = async (
    complaintData: {
      title: string;
      description: string;
      category: string;
      is_anonymous: boolean;
    }, 
    file: File | null
  ) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await complaintsService.submitComplaint(complaintData, file);
      
      if (!result.success) {
        throw result.error || new Error('Gagal mengirim pengaduan');
      }
      
      await fetchComplaints();
      return { success: true, error: null };
    } catch (err: any) {
      console.error('Error submitting complaint:', err);
      setError(err?.message || 'Gagal mengirim pengaduan. Silakan coba lagi nanti.');
      return { success: false, error: err };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    complaints,
    isLoading,
    error,
    isRefreshing,
    isOffline,
    fetchComplaints,
    submitComplaint
  };
};
