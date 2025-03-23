
import React, { useState } from 'react';
import { Plus, Upload, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Alert, AlertDescription } from '@/components/ui/alert';

const categories = ["Upah", "PHK", "Pelecehan", "Kondisi Kerja", "Lainnya"];

interface ComplaintSubmissionFormProps {
  onSubmitSuccess: () => void;
}

const ComplaintSubmissionForm: React.FC<ComplaintSubmissionFormProps> = ({
  onSubmitSuccess
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(categories[0]);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      // Check file size (limit to 5MB)
      if (selectedFile.size > 5 * 1024 * 1024) {
        toast.error("Ukuran file terlalu besar (maksimal 5MB)");
        return;
      }
      
      setFile(selectedFile);
    }
  };

  const handleSubmit = async () => {
    if (!title || !description) {
      toast.error("Judul dan deskripsi pengaduan wajib diisi");
      return;
    }

    setError(null);
    setIsSubmitting(true);
    
    try {
      // Get user ID from session
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) {
        throw new Error('Sesi pengguna tidak ditemukan. Silakan masuk kembali.');
      }
      
      const userId = sessionData.session?.user.id;
      if (!userId) {
        toast.error("Anda harus login terlebih dahulu");
        setError("Silakan login terlebih dahulu untuk mengirim pengaduan");
        return;
      }

      // Insert complaint record
      const { data: complaintData, error: complaintError } = await supabase
        .from('complaints')
        .insert({
          user_id: userId,
          title,
          description,
          category: selectedCategory,
          is_anonymous: isAnonymous,
          status: 'pending' // Default status for new complaints
        })
        .select('id')
        .single();

      if (complaintError) {
        console.error('Error submitting complaint:', complaintError);
        throw complaintError;
      }

      // Upload file if provided
      if (file && complaintData?.id) {
        const fileExt = file.name.split('.').pop();
        const filePath = `${userId}/${complaintData.id}/${Math.random().toString(36).substring(2)}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('complaint_attachments')
          .upload(filePath, file);

        if (uploadError) {
          console.error('Error uploading file:', uploadError);
          // Continue with successful complaint submission even if file upload fails
          toast.warning("Berhasil mengirim pengaduan, namun gagal mengunggah file");
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

      // Reset form
      setTitle("");
      setDescription("");
      setFile(null);
      setIsAnonymous(false);
      
      // Notify parent component to refresh complaints list
      onSubmitSuccess();
      
    } catch (err: any) {
      console.error('Error submitting complaint:', err);
      setError(err.message || "Gagal mengirim pengaduan. Silakan coba lagi nanti.");
      toast.error("Gagal mengirim pengaduan");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4 space-y-4">
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      <Select onValueChange={setSelectedCategory} defaultValue={selectedCategory}>
        <SelectTrigger className="w-full">
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
        className="min-h-[150px]"
      />
      
      <div className="border border-dashed border-gray-300 rounded-lg p-4">
        <label className="flex flex-col items-center gap-2 cursor-pointer">
          <Upload className="h-6 w-6 text-gray-400" />
          <span className="text-sm font-medium text-gray-700">
            {file ? file.name : "Unggah Bukti Pendukung"}
          </span>
          <span className="text-xs text-gray-500">
            {file ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : "Maksimal 5MB"}
          </span>
          <input type="file" className="hidden" onChange={handleFileChange} />
        </label>
      </div>
      
      <div className="flex items-center gap-2">
        <Checkbox 
          id="anonymous" 
          checked={isAnonymous} 
          onCheckedChange={(checked) => setIsAnonymous(checked === true)} 
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
  );
};

export default ComplaintSubmissionForm;
