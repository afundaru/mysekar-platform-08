
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from 'sonner';

interface Announcement {
  id: string;
  title: string;
  description: string | null;
  date: string;
  image_url: string | null;
}

const AnnouncementsList: React.FC = () => {
  const navigate = useNavigate();
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

        setAnnouncements(data || []);
      } catch (error: any) {
        console.error('Error fetching announcements:', error);
        setError(error.message);
        toast.error('Gagal memuat pengumuman');
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  const handleGoBack = () => {
    navigate('/');
  };

  const handleAnnouncementClick = (id: string) => {
    navigate(`/announcements/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Status Bar */}
      <div className="bg-teal h-6"></div>
      
      {/* Header */}
      <div className="bg-white p-4 flex items-center shadow-sm">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={handleGoBack}
          className="mr-2"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold">Pengumuman & Berita</h1>
      </div>
      
      {/* Main Content */}
      <main className="p-4 max-w-3xl mx-auto">
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-0">
                  <Skeleton className="h-48 w-full rounded-t-lg" />
                  <div className="p-4 space-y-2">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-16 w-full" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : error ? (
          <div className="text-center p-8">
            <p className="text-red-500 mb-4">{error}</p>
            <Button onClick={() => window.location.reload()}>Coba Lagi</Button>
          </div>
        ) : announcements.length === 0 ? (
          <div className="text-center p-8">
            <p className="text-gray-500">Belum ada pengumuman</p>
          </div>
        ) : (
          <div className="space-y-4">
            {announcements.map((announcement) => (
              <Card 
                key={announcement.id} 
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleAnnouncementClick(announcement.id)}
              >
                <CardContent className="p-0">
                  {announcement.image_url && (
                    <div className="h-48 w-full overflow-hidden">
                      <img 
                        src={announcement.image_url}
                        alt={announcement.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-1">{announcement.title}</h3>
                    <p className="text-sm text-gray-500 mb-2">
                      {new Date(announcement.date).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </p>
                    {announcement.description && (
                      <p className="text-gray-700 line-clamp-3">{announcement.description}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default AnnouncementsList;
