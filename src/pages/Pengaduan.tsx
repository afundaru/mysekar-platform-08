
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { AlertCircle, Loader2, WifiOff } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import PengaduanHeader from '@/components/pengaduan/PengaduanHeader';
import QuickActions from '@/components/pengaduan/QuickActions';
import ComplaintsList from '@/components/pengaduan/ComplaintsList';
import PengaduanBottomNavigation from '@/components/pengaduan/PengaduanBottomNavigation';
import ComplaintSubmissionForm from '@/components/pengaduan/ComplaintSubmissionForm';
import ComplaintHistory from '@/components/pengaduan/ComplaintHistory';
import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';

interface Complaint {
  id: string;
  title: string;
  category: string;
  status: string;
  created_at: string;
  description: string;
}

const Pengaduan: React.FC = () => {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<'list' | 'form' | 'history'>('list');
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
      // Check for an active session first
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) {
        console.error('Session error:', sessionError);
        throw new Error('Sesi pengguna tidak ditemukan. Silakan masuk kembali.');
      }
      
      if (!sessionData.session?.user.id) {
        navigate('/login');
        return;
      }
      
      const userId = sessionData.session.user.id;
      
      // Fetch complaints with a timeout for better error handling
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Waktu permintaan habis. Periksa koneksi internet Anda.')), 15000)
      );
      
      try {
        const { data, error: complaintsError } = await Promise.race([
          supabase
            .from('complaints')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false }),
          timeoutPromise
        ]) as any;
        
        if (complaintsError) {
          console.error('Error fetching complaints:', complaintsError);
          throw complaintsError;
        }
        
        setComplaints(data || []);
      } catch (fetchError: any) {
        // If this is a network error, mark as offline
        if (fetchError.message?.includes('Failed to fetch') || 
            fetchError.message?.includes('NetworkError') ||
            fetchError.message?.includes('Network request failed') || 
            fetchError.message?.includes('Network timeout')) {
          setIsOffline(true);
          throw new Error('Tidak dapat terhubung ke server. Periksa koneksi internet Anda.');
        }
        throw fetchError;
      }
    } catch (err: any) {
      console.error('Error fetching complaints:', err);
      setError(err?.message || 'Gagal memuat data pengaduan. Silakan coba lagi nanti.');
      toast.error('Gagal memuat data pengaduan');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  const handleNewComplaint = () => {
    setCurrentView('form');
  };

  const handleViewHistory = () => {
    setCurrentView('history');
  };

  const handleBack = () => {
    setCurrentView('list');
  };

  const handleComplaintSubmitted = () => {
    setCurrentView('list');
    fetchComplaints();
    toast.success('Pengaduan berhasil dikirim');
  };

  const renderContent = () => {
    if (isOffline && currentView === 'list') {
      return (
        <div className="p-4">
          <Card className="p-6 mb-4 bg-amber-50 border-amber-200">
            <div className="flex flex-col items-center text-center">
              <WifiOff className="h-10 w-10 text-amber-500 mb-2" />
              <h3 className="text-lg font-semibold text-amber-700 mb-1">Mode Offline</h3>
              <p className="text-amber-600 mb-4">Anda sedang offline. Beberapa fitur mungkin tidak tersedia.</p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setIsOffline(false);
                  fetchComplaints();
                }}
                className="w-full md:w-auto"
              >
                Coba Lagi
              </Button>
            </div>
          </Card>
        </div>
      );
    }
    
    if (currentView === 'list') {
      return (
        <>
          <QuickActions 
            onNewComplaint={handleNewComplaint} 
            onHistory={handleViewHistory} 
          />
          
          {isLoading ? (
            <div className="p-4 space-y-3">
              <Skeleton className="h-12 w-full mb-4" />
              <Skeleton className="h-24 w-full mb-3" />
              <Skeleton className="h-24 w-full mb-3" />
              <Skeleton className="h-24 w-full" />
            </div>
          ) : error ? (
            <div className="p-4">
              <Card className="p-6 mb-4 bg-red-50 border-red-200">
                <div className="flex flex-col items-center text-center">
                  <AlertCircle className="h-10 w-10 text-red-500 mb-2" />
                  <h3 className="text-lg font-semibold text-red-700 mb-1">Error</h3>
                  <p className="text-red-600 mb-4">{error}</p>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setIsRefreshing(true);
                      fetchComplaints();
                    }}
                    className="w-full md:w-auto"
                    disabled={isRefreshing || isOffline}
                  >
                    {isRefreshing ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        Memuat ulang...
                      </>
                    ) : 'Coba Lagi'}
                  </Button>
                </div>
              </Card>
            </div>
          ) : (
            <ComplaintsList 
              complaints={complaints} 
              isLoading={isLoading}
              loadError={error}
              onRetry={fetchComplaints}
              isOffline={isOffline}
            />
          )}
        </>
      );
    } else if (currentView === 'form') {
      return (
        isOffline ? (
          <div className="p-4">
            <Card className="p-6 mb-4 bg-amber-50 border-amber-200">
              <div className="flex flex-col items-center text-center">
                <WifiOff className="h-10 w-10 text-amber-500 mb-2" />
                <h3 className="text-lg font-semibold text-amber-700 mb-1">Tidak Dapat Mengirim Pengaduan</h3>
                <p className="text-amber-600 mb-4">Anda sedang offline. Silakan coba lagi ketika terhubung ke internet.</p>
                <Button 
                  variant="outline" 
                  onClick={handleBack}
                  className="w-full md:w-auto"
                >
                  Kembali
                </Button>
              </div>
            </Card>
          </div>
        ) : (
          <ComplaintSubmissionForm onSubmitSuccess={handleComplaintSubmitted} />
        )
      );
    } else {
      return (
        <ComplaintHistory 
          complaints={complaints} 
          isLoading={isLoading} 
          error={error} 
          onRetry={fetchComplaints}
          isOffline={isOffline} 
        />
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <PengaduanHeader 
        title={
          currentView === 'list' 
            ? 'Pengaduan dan Tindak Lanjut' 
            : currentView === 'form' 
              ? 'Buat Pengaduan Baru' 
              : 'Riwayat Pengaduan'
        }
        showBackButton={currentView !== 'list'}
        onBackClick={handleBack}
      />

      {renderContent()}

      <PengaduanBottomNavigation />
    </div>
  );
};

export default Pengaduan;
