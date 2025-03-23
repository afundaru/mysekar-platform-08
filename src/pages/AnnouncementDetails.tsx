
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
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

const AnnouncementDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [announcement, setAnnouncement] = useState<Announcement | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnnouncementDetails = async () => {
      if (!id) return;

      try {
        const { data, error } = await supabase
          .from('announcements')
          .select('*')
          .eq('id', id)
          .single();
        
        if (error) {
          throw error;
        }
        
        if (data) {
          setAnnouncement({
            ...data,
            date: format(new Date(data.date), 'dd MMMM yyyy')
          });
        }
      } catch (err: any) {
        console.error('Error fetching announcement details:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncementDetails();
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Status Bar - Fixed at the top */}
      <div className="bg-teal h-6"></div>
      
      <main className="container mx-auto max-w-3xl px-4 py-6">
        <Link to="/" className="flex items-center text-teal mb-4">
          <ArrowLeft size={20} className="mr-1" />
          <span>Kembali ke Beranda</span>
        </Link>

        {loading ? (
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        ) : error ? (
          <div className="p-6 bg-red-50 rounded-lg text-red-500">
            <p>Error: {error}</p>
            <p className="mt-2">Pengumuman tidak ditemukan atau terjadi kesalahan.</p>
          </div>
        ) : announcement ? (
          <article className="bg-white p-6 rounded-lg shadow-sm">
            <h1 className="text-2xl font-bold mb-2">{announcement.title}</h1>
            <p className="text-gray-500 mb-4">{announcement.date}</p>
            
            {announcement.image_url && (
              <img 
                src={announcement.image_url} 
                alt={announcement.title} 
                className="w-full h-auto max-h-96 object-cover rounded-lg mb-6"
              />
            )}
            
            <div className="prose">
              <p>{announcement.description}</p>
            </div>
          </article>
        ) : (
          <div className="p-6 bg-gray-100 rounded-lg text-gray-500">
            Pengumuman tidak ditemukan.
          </div>
        )}
      </main>
    </div>
  );
};

export default AnnouncementDetails;
