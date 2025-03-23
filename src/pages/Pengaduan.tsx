
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import PengaduanHeader from '@/components/pengaduan/PengaduanHeader';
import QuickActions from '@/components/pengaduan/QuickActions';
import ComplaintsList from '@/components/pengaduan/ComplaintsList';
import PengaduanBottomNavigation from '@/components/pengaduan/PengaduanBottomNavigation';
import ComplaintSubmissionForm from '@/components/pengaduan/ComplaintSubmissionForm';
import ComplaintHistory from '@/components/pengaduan/ComplaintHistory';
import { Loader2 } from 'lucide-react';

const Pengaduan: React.FC = () => {
  const [complaints, setComplaints] = useState<any[]>([]);
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

      {currentView === 'list' && (
        <>
          <QuickActions 
            onNewComplaint={handleNewComplaint} 
            onHistory={handleViewHistory} 
          />
          
          {isLoading ? (
            <div className="flex justify-center items-center py-10">
              <Loader2 className="h-8 w-8 animate-spin text-teal" />
              <span className="ml-2 text-gray-600">Memuat data...</span>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded-lg mx-4 my-6 p-4 text-center">
              <p className="text-red-600">{error}</p>
              <button 
                className="mt-2 px-4 py-2 bg-teal text-white rounded-lg"
                onClick={fetchComplaints}
              >
                Coba Lagi
              </button>
            </div>
          ) : complaints.length === 0 ? (
            <div className="bg-white shadow rounded-lg mx-4 my-6 p-4 text-center">
              <p className="text-gray-600">Belum ada pengaduan yang dibuat.</p>
              <button 
                className="mt-2 px-4 py-2 bg-teal text-white rounded-lg"
                onClick={handleNewComplaint}
              >
                Buat Pengaduan Baru
              </button>
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
      )}

      {currentView === 'form' && (
        <ComplaintSubmissionForm onSubmitSuccess={handleComplaintSubmitted} />
      )}

      {currentView === 'history' && (
        <ComplaintHistory complaints={complaints} isLoading={isLoading} error={error} onRetry={fetchComplaints} />
      )}

      <PengaduanBottomNavigation />
    </div>
  );
};

export default Pengaduan;
