
import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import PengaduanBottomNavigation from '../components/pengaduan/PengaduanBottomNavigation';
import PengaduanPageHeader from '../components/pengaduan/PengaduanPageHeader';
import ComplaintSubmissionForm from '../components/pengaduan/ComplaintSubmissionForm';
import ComplaintsList from '../components/pengaduan/ComplaintsList';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface Complaint {
  id: string;
  title: string;
  category: string;
  status: string;
  created_at: string;
}

const Pengaduan: React.FC = () => {
  const { user } = useAuth();
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    fetchComplaints();
  }, [user]);

  const fetchComplaints = async () => {
    if (!user) return;

    try {
      setIsLoading(true);
      setLoadError(null);
      
      const { data, error } = await supabase
        .from('complaints')
        .select('id, title, category, status, created_at')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching complaints:', error);
        setLoadError("Gagal memuat data pengaduan");
      } else {
        setComplaints(data || []);
      }
    } catch (error) {
      console.error('Error in fetchComplaints:', error);
      setLoadError("Gagal memuat data pengaduan");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-20">
      <PengaduanPageHeader />
      
      {/* Form Pengaduan */}
      <div className="p-4 bg-white shadow-md mt-2">
        <h2 className="font-semibold text-lg mb-2">Buat Pengaduan Baru</h2>
        
        {loadError && (
          <Alert variant="destructive" className="mb-4">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{loadError}</AlertDescription>
          </Alert>
        )}
        
        <ComplaintSubmissionForm 
          userId={user?.id}
          onComplaintSubmitted={fetchComplaints}
        />
      </div>

      {/* Status Pengaduan */}
      <div className="p-4">
        <ComplaintsList 
          complaints={complaints}
          isLoading={isLoading}
          loadError={loadError}
          onRetry={fetchComplaints}
        />
      </div>

      {/* Floating Button */}
      <Button 
        className="fixed bottom-20 right-6 bg-teal hover:bg-teal/90 rounded-full h-14 w-14 p-0"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <Plus size={24} />
      </Button>
      
      <PengaduanBottomNavigation />
    </div>
  );
};

export default Pengaduan;
