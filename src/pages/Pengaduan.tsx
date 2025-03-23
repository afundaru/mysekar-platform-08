
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { AlertCircle, Loader2 } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import PengaduanHeader from '@/components/pengaduan/PengaduanHeader';
import QuickActions from '@/components/pengaduan/QuickActions';
import ComplaintsList from '@/components/pengaduan/ComplaintsList';
import PengaduanBottomNavigation from '@/components/pengaduan/PengaduanBottomNavigation';
import ComplaintSubmissionForm from '@/components/pengaduan/ComplaintSubmissionForm';
import ComplaintHistory from '@/components/pengaduan/ComplaintHistory';

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
  const navigate = useNavigate();

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Get user ID from session
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
      
      // Fetch complaints for the current user
      const { data, error: complaintsError } = await supabase
        .from('complaints')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
      
      if (complaintsError) {
        console.error('Error fetching complaints:', complaintsError);
        throw complaintsError;
      }
      
      setComplaints(data || []);
    } catch (err: any) {
      console.error('Error fetching complaints:', err);
      setError('Gagal memuat data pengaduan. Silakan coba lagi nanti.');
      toast.error('Gagal memuat data pengaduan');
    } finally {
      setIsLoading(false);
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
    if (currentView === 'list') {
      return (
        <>
          <QuickActions 
            onNewComplaint={handleNewComplaint} 
            onHistory={handleViewHistory} 
          />
          
          {isLoading ? (
            <div className="flex flex-col justify-center items-center py-10 px-4">
              <Loader2 className="h-8 w-8 animate-spin text-teal mb-2" />
              <span className="text-gray-600">Memuat data pengaduan...</span>
            </div>
          ) : error ? (
            <div className="p-4">
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
              <Button 
                variant="outline" 
                onClick={fetchComplaints}
                className="w-full mt-2"
              >
                Coba Lagi
              </Button>
            </div>
          ) : (
            <ComplaintsList 
              complaints={complaints} 
              isLoading={isLoading}
              loadError={error}
              onRetry={fetchComplaints}
            />
          )}
        </>
      );
    } else if (currentView === 'form') {
      return <ComplaintSubmissionForm onSubmitSuccess={handleComplaintSubmitted} />;
    } else {
      return (
        <ComplaintHistory 
          complaints={complaints} 
          isLoading={isLoading} 
          error={error} 
          onRetry={fetchComplaints} 
        />
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
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
