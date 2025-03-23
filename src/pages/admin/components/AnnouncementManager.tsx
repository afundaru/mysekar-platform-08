
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { AlertCircle, Pencil, Trash } from "lucide-react";
import { format } from "date-fns";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface Announcement {
  id: string;
  title: string;
  description: string;
  image_url: string;
  date: string;
  created_at: string;
}

const AnnouncementManager: React.FC = () => {
  const { user } = useAuth();
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('announcements')
        .select('*')
        .order('date', { ascending: false });
      
      if (error) throw error;
      
      setAnnouncements(data || []);
    } catch (error: any) {
      console.error('Error fetching announcements:', error);
      toast.error('Gagal memuat pengumuman');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setImageUrl("");
    setEditingId(null);
    setFormError(null);
  };

  const handleOpenEditForm = (announcement: Announcement) => {
    setEditingId(announcement.id);
    setTitle(announcement.title);
    setDescription(announcement.description || "");
    setImageUrl(announcement.image_url || "");
    setFormOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    
    if (!title.trim()) {
      setFormError("Judul tidak boleh kosong");
      return;
    }
    
    try {
      setSubmitting(true);
      
      if (editingId) {
        // Update existing announcement
        const { error } = await supabase
          .from('announcements')
          .update({
            title,
            description,
            image_url: imageUrl,
            updated_at: new Date().toISOString()
          })
          .eq('id', editingId);
          
        if (error) throw error;
        toast.success('Pengumuman berhasil diperbarui');
      } else {
        // Create new announcement
        const { error } = await supabase
          .from('announcements')
          .insert({
            title,
            description,
            image_url: imageUrl,
            created_by: user?.id
          });
          
        if (error) throw error;
        toast.success('Pengumuman berhasil ditambahkan');
      }
      
      // Reset form and fetch updated announcements
      resetForm();
      setFormOpen(false);
      await fetchAnnouncements();
    } catch (error: any) {
      console.error('Error saving announcement:', error);
      setFormError(error.message);
      toast.error('Gagal menyimpan pengumuman');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus pengumuman ini?')) {
      return;
    }
    
    try {
      const { error } = await supabase
        .from('announcements')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      toast.success('Pengumuman berhasil dihapus');
      setAnnouncements(announcements.filter(item => item.id !== id));
    } catch (error: any) {
      console.error('Error deleting announcement:', error);
      toast.error('Gagal menghapus pengumuman');
    }
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Kelola Pengumuman & Berita</h1>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Daftar Pengumuman</CardTitle>
          <Button 
            onClick={() => {
              resetForm();
              setFormOpen(true);
            }}
            className="bg-teal hover:bg-teal/90"
          >
            Tambah Pengumuman
          </Button>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-teal mx-auto"></div>
              <p className="mt-2 text-gray-500">Memuat data...</p>
            </div>
          ) : announcements.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>Belum ada pengumuman</p>
            </div>
          ) : (
            <div className="space-y-4">
              {announcements.map(announcement => (
                <div 
                  key={announcement.id} 
                  className="p-4 border rounded-lg flex justify-between items-start"
                >
                  <div>
                    <h3 className="font-medium">{announcement.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {format(new Date(announcement.date), 'dd MMMM yyyy')}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleOpenEditForm(announcement)}
                    >
                      <Pencil size={16} />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(announcement.id)}
                    >
                      <Trash size={16} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
      
      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {editingId ? "Edit Pengumuman" : "Tambah Pengumuman Baru"}
            </DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSubmit}>
            {formError && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{formError}</AlertDescription>
              </Alert>
            )}
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Judul Pengumuman</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Masukkan judul pengumuman"
                />
              </div>
              
              <div>
                <Label htmlFor="description">Deskripsi</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Masukkan deskripsi pengumuman"
                  rows={4}
                />
              </div>
              
              <div>
                <Label htmlFor="imageUrl">URL Gambar</Label>
                <Input
                  id="imageUrl"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="Masukkan URL gambar (opsional)"
                />
              </div>
            </div>
            
            <DialogFooter className="mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  resetForm();
                  setFormOpen(false);
                }}
                disabled={submitting}
              >
                Batal
              </Button>
              <Button 
                type="submit"
                className="bg-teal hover:bg-teal/90"
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <span className="mr-2">Menyimpan...</span>
                    <div className="animate-spin h-4 w-4 border-2 border-white rounded-full border-t-transparent"></div>
                  </>
                ) : editingId ? "Perbarui" : "Simpan"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AnnouncementManager;
