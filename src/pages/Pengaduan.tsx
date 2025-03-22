
import React, { useState, useEffect } from 'react';
import { Bell, Plus, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import PengaduanBottomNavigation from '../components/pengaduan/PengaduanBottomNavigation';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

const categories = ["Upah", "PHK", "Pelecehan", "Kondisi Kerja", "Lainnya"];

interface Complaint {
  id: string;
  title: string;
  category: string;
  status: string;
  created_at: string;
}

const Pengaduan: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState<string>(categories[0]);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchComplaints();
  }, [user]);

  const fetchComplaints = async () => {
    if (!user) return;

    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('complaints')
        .select('id, title, category, status, created_at')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching complaints:', error);
        toast({
          title: "Error",
          description: "Gagal memuat data pengaduan",
          variant: "destructive"
        });
      } else {
        setComplaints(data || []);
      }
    } catch (error) {
      console.error('Error in fetchComplaints:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!user) {
      toast({
        title: "Error",
        description: "Anda harus login terlebih dahulu",
        variant: "destructive"
      });
      return;
    }

    if (!title || !description) {
      toast({
        title: "Error",
        description: "Judul dan deskripsi pengaduan wajib diisi",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Insert complaint record
      const { data: complaintData, error: complaintError } = await supabase
        .from('complaints')
        .insert({
          user_id: user.id,
          title,
          description,
          category: selectedCategory,
          is_anonymous: isAnonymous,
        })
        .select('id')
        .single();

      if (complaintError) {
        throw complaintError;
      }

      // Upload file if provided
      if (file && complaintData?.id) {
        const fileExt = file.name.split('.').pop();
        const filePath = `${user.id}/${complaintData.id}/${Math.random().toString(36).substring(2)}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('complaint_attachments')
          .upload(filePath, file);

        if (uploadError) {
          console.error('Error uploading file:', uploadError);
          // Continue with successful complaint submission even if file upload fails
        } else {
          // Save attachment record
          const { error: attachmentError } = await supabase
            .from('complaint_attachments')
            .insert({
              complaint_id: complaintData.id,
              file_path: filePath,
              file_name: file.name,
              file_type: file.type,
              file_size: file.size,
            });

          if (attachmentError) {
            console.error('Error saving attachment record:', attachmentError);
          }
        }
      }

      toast({
        title: "Sukses",
        description: "Pengaduan berhasil dikirim",
      });
      
      // Reset form
      setTitle("");
      setDescription("");
      setFile(null);
      setIsAnonymous(false);
      
      // Refresh complaints list
      fetchComplaints();
      
    } catch (error) {
      console.error('Error submitting complaint:', error);
      toast({
        title: "Error",
        description: "Gagal mengirim pengaduan",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-20">
      {/* Status Bar */}
      <div className="bg-teal h-6"></div>
      
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-3 bg-white shadow-md">
        <h1 className="text-lg font-bold">Pengaduan dan Tindak Lanjut</h1>
        <Bell className="text-gray-600 h-5 w-5" />
      </div>

      {/* Form Pengaduan */}
      <div className="p-4 bg-white shadow-md mt-2">
        <h2 className="font-semibold text-lg mb-2">Buat Pengaduan Baru</h2>
        <div className="space-y-3">
          <Select onValueChange={setSelectedCategory} defaultValue={selectedCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Pilih Kategori" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Input
            type="text"
            placeholder="Judul Pengaduan"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          
          <Textarea
            placeholder="Deskripsi Pengaduan"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="min-h-[100px]"
          />
          
          <label className="flex items-center gap-2 cursor-pointer p-2 border rounded hover:bg-gray-50">
            <Upload className="h-4 w-4" />
            <span className="text-sm">{file ? file.name : "Unggah Bukti"}</span>
            <input type="file" className="hidden" onChange={handleFileChange} />
          </label>
          
          <div className="flex items-center gap-2">
            <Checkbox 
              id="anonymous" 
              checked={isAnonymous} 
              onCheckedChange={() => setIsAnonymous(!isAnonymous)} 
            />
            <Label htmlFor="anonymous" className="text-sm">Laporkan secara anonim</Label>
          </div>
          
          <Button 
            className="w-full bg-teal hover:bg-teal/90" 
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Mengirim...
              </>
            ) : (
              "Kirim Pengaduan"
            )}
          </Button>
        </div>
      </div>

      {/* Status Pengaduan */}
      <div className="p-4">
        <h2 className="font-semibold text-lg mb-2">Riwayat Pengaduan</h2>
        
        {isLoading ? (
          <div className="flex justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-teal" />
          </div>
        ) : complaints.length > 0 ? (
          complaints.map((complaint) => (
            <Card key={complaint.id} className="p-4 mb-4">
              <h3 className="font-semibold">{complaint.title}</h3>
              <p className="text-sm text-gray-600">{complaint.category} - {formatDate(complaint.created_at)}</p>
              <span className={`text-sm font-semibold ${
                complaint.status === "Pending" ? "text-yellow-500" : 
                complaint.status === "Ditolak" ? "text-red-500" : "text-green-500"
              }`}>
                {complaint.status}
              </span>
            </Card>
          ))
        ) : (
          <Card className="p-4 text-center text-gray-500">
            Belum ada pengaduan yang diajukan
          </Card>
        )}
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
