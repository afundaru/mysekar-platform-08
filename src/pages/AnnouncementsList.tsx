
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';
import { ArrowLeft } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface Announcement {
  id: string;
  title: string;
  description: string;
  date: string;
  image_url: string;
}

const AnnouncementsList: React.FC = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const { data, error } = await supabase
          .from('announcements')
          .select('*')
          .order('date', { ascending: false });
        
        if (error) {
          throw error;
        }
        
        if (data) {
          const formattedAnnouncements = data.map(item => ({
            ...item,
            date: format(new Date(item.date), 'dd MMMM yyyy')
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
    <div className="min-h-screen bg-gray-50">
      {/* Status Bar - Fixed at the top */}
      <div className="bg-teal h-6"></div>
      
      <main className="container mx-auto max-w-3xl px-4 py-6">
        <Link to="/" className="flex items-center text-teal mb-4">
          <ArrowLeft size={20} className="mr-1" />
          <span>Kembali ke Beranda</span>
        </Link>
        
        <h1 className="text-2xl font-bold mb-6">Pengumuman & Berita</h1>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3, 4].map((_, index) => (
              <div key={index} className="flex gap-4">
                <Skeleton className="h-24 w-24 flex-shrink-0" />
                <div className="space-y-2 flex-grow">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/4" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="p-6 bg-red-50 rounded-lg text-red-500">
            <p>Error: {error}</p>
          </div>
        ) : announcements.length === 0 ? (
          <div className="p-6 bg-gray-100 rounded-lg text-gray-500">
            Belum ada pengumuman.
          </div>
        ) : (
          <div className="space-y-4">
            {announcements.map((announcement) => (
              <Link 
                key={announcement.id} 
                to={`/announcements/${announcement.id}`}
                className="flex gap-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-md">
                  <img 
                    src={announcement.image_url || "https://storage.googleapis.com/uxpilot-auth.appspot.com/1eb5f89883-b2d151dfc455b7061a56.png"} 
                    alt={announcement.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h2 className="font-semibold">{announcement.title}</h2>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                    {announcement.description || "No description available"}
                  </p>
                  <p className="text-xs text-gray-400 mt-2">{announcement.date}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default AnnouncementsList;
