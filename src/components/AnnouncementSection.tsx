
import React, { useEffect, useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

interface Announcement {
  id: string;
  title: string;
  date: string;
  image_url: string;
}

interface AnnouncementProps {
  announcement: Announcement;
}

const AnnouncementCard: React.FC<AnnouncementProps> = ({ announcement }) => {
  return (
    <Link to={`/announcements/${announcement.id}`} className="flex-none w-64 bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 animate-slide-up">
      <div className="overflow-hidden">
        <img 
          className="w-full h-32 object-cover rounded-t-lg transform scale-100 hover:scale-105 transition-transform duration-500 ease-in-out" 
          src={announcement.image_url || "https://storage.googleapis.com/uxpilot-auth.appspot.com/1eb5f89883-b2d151dfc455b7061a56.png"} 
          alt={announcement.title} 
        />
      </div>
      <div className="p-3">
        <h3 className="text-sm font-medium">{announcement.title}</h3>
        <p className="text-xs text-gray-500 mt-1">{announcement.date}</p>
      </div>
    </Link>
  );
};

const AnnouncementSection: React.FC = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const { data, error } = await supabase
          .from('announcements')
          .select('id, title, date, image_url')
          .order('date', { ascending: false })
          .limit(3);
        
        if (error) {
          throw error;
        }
        
        if (data) {
          const formattedAnnouncements = data.map(item => ({
            ...item,
            date: format(new Date(item.date), 'dd MMM yyyy')
          }));
          setAnnouncements(formattedAnnouncements);
        }
      } catch (err: any) {
        console.error('Error fetching announcements:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  return (
    <section className="px-4 py-6 animate-fade-in">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Pengumuman & Berita</h2>
        <Link to="/announcements" className="text-teal text-sm flex items-center hover:underline transition-all duration-200">
          Lihat Semua
          <ChevronRight size={16} className="ml-1" />
        </Link>
      </div>
      
      {loading ? (
        <div className="flex space-x-4 overflow-x-auto pb-4">
          {[1, 2, 3].map((_, index) => (
            <div key={index} className="flex-none w-64 h-48 bg-gray-100 animate-pulse rounded-lg"></div>
          ))}
        </div>
      ) : error ? (
        <div className="text-red-500 p-4 bg-red-50 rounded-lg">{error}</div>
      ) : announcements.length === 0 ? (
        <div className="text-gray-500 p-4 bg-gray-50 rounded-lg">Belum ada pengumuman</div>
      ) : (
        <div className="flex overflow-x-auto space-x-4 pb-4 scrollbar-none" id="announcement-slider">
          {announcements.map((announcement) => (
            <AnnouncementCard 
              key={announcement.id} 
              announcement={announcement}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default AnnouncementSection;
