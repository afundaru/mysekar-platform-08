
import React, { useState, useEffect } from 'react';
import { MessageSquare, FilePen } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

interface ComplaintActivity {
  id: string;
  title: string;
  status: string;
  created_at: string;
}

// Define the ActivityItem component first
const ActivityItem: React.FC<{ 
  icon: React.ReactNode; 
  title: string;
  time: string;
  description: string;
  onClick?: () => void;
}> = ({ icon, title, time, description, onClick }) => {
  return (
    <div 
      className="bg-white p-4 rounded-lg shadow cursor-pointer hover:shadow-md transition-shadow"
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-3">
          <div className="text-teal">{icon}</div>
          <span className="text-sm font-medium">{title}</span>
        </div>
        <span className="text-xs text-gray-500">{time}</span>
      </div>
      <p className="text-sm">{description}</p>
    </div>
  );
};

const RecentActivities: React.FC = () => {
  const [recentComplaints, setRecentComplaints] = useState<ComplaintActivity[]>([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecentComplaints = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('complaints')
          .select('id, title, status, created_at')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(2);

        if (error) {
          console.error('Error fetching recent complaints:', error);
        } else if (data) {
          setRecentComplaints(data);
        }
      } catch (err) {
        console.error('Error in fetchRecentComplaints:', err);
      }
    };

    fetchRecentComplaints();
  }, [user]);

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.round(diffMs / (1000 * 60));
    const diffHours = Math.round(diffMs / (1000 * 60 * 60));
    const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 60) {
      return `${diffMins} menit lalu`;
    } else if (diffHours < 24) {
      return `${diffHours} jam lalu`;
    } else {
      return `${diffDays} hari lalu`;
    }
  };

  const handleComplaintClick = (id: string) => {
    navigate('/pengaduan');
  };

  const handleForumClick = () => {
    navigate('/forum-diskusi');
  };

  return (
    <section className="px-4 py-6 bg-[#F5F5F5]">
      <h2 className="text-lg font-semibold mb-4">Aktivitas Terbaru</h2>
      <div className="space-y-4">
        <ActivityItem 
          icon={<MessageSquare className="h-5 w-5" />} 
          title="Forum Diskusi" 
          time="5 menit lalu"
          description='Diskusi baru: "Peraturan Kerja 2025"'
          onClick={handleForumClick}
        />

        {recentComplaints.length > 0 ? (
          recentComplaints.map((complaint) => (
            <ActivityItem 
              key={complaint.id}
              icon={<FilePen className="h-5 w-5" />} 
              title="Status Pengaduan" 
              time={formatTimeAgo(complaint.created_at)}
              description={`${complaint.title} - Status: ${complaint.status}`}
              onClick={() => handleComplaintClick(complaint.id)}
            />
          ))
        ) : (
          <ActivityItem 
            icon={<FilePen className="h-5 w-5" />} 
            title="Status Pengaduan" 
            time="Belum ada aktivitas"
            description="Anda belum memiliki pengaduan aktif"
            onClick={() => navigate('/pengaduan')}
          />
        )}
      </div>
    </section>
  );
};

export default RecentActivities;
