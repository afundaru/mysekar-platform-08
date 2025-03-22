
import React, { useState, useEffect } from 'react';
import { CreditCard, FileCheck } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import MembershipCard from './MembershipCard';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const QuickOverview: React.FC = () => {
  const [showMembershipCard, setShowMembershipCard] = useState(false);
  const [activeComplaints, setActiveComplaints] = useState<number>(0);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchActiveComplaints = async () => {
      if (!user) return;
      
      try {
        const { data, error, count } = await supabase
          .from('complaints')
          .select('*', { count: 'exact' })
          .eq('user_id', user.id)
          .in('status', ['Pending', 'Diproses'])
          .limit(1);

        if (error) {
          console.error('Error fetching active complaints:', error);
        } else {
          setActiveComplaints(count || 0);
        }
      } catch (err) {
        console.error('Error in fetchActiveComplaints:', err);
      }
    };

    fetchActiveComplaints();
  }, [user]);

  const handleComplaintsClick = () => {
    navigate('/pengaduan');
  };

  return (
    <section className="p-4">
      <div className="grid grid-cols-2 gap-4">
        <div 
          className="bg-teal p-4 rounded-lg text-white cursor-pointer transition-transform hover:scale-105 active:scale-95"
          onClick={() => setShowMembershipCard(true)}
        >
          <CreditCard className="h-6 w-6 mb-2" />
          <h3 className="text-sm font-medium">Status Keanggotaan</h3>
          <p className="text-xs mt-1">Aktif hingga Des 2025</p>
        </div>
        <div 
          className="bg-white p-4 rounded-lg shadow cursor-pointer transition-transform hover:scale-105 active:scale-95"
          onClick={handleComplaintsClick}
        >
          <FileCheck className="h-6 w-6 mb-2 text-teal" />
          <h3 className="text-sm font-medium">Pengaduan Aktif</h3>
          <p className="text-xs text-gray-500 mt-1">
            {activeComplaints > 0 
              ? `${activeComplaints} dalam proses` 
              : "Tidak ada pengaduan aktif"}
          </p>
        </div>
      </div>

      <Dialog open={showMembershipCard} onOpenChange={setShowMembershipCard}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Kartu Anggota Digital</DialogTitle>
          </DialogHeader>
          <MembershipCard />
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default QuickOverview;
