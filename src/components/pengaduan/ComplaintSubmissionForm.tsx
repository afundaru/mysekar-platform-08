
import React, { useState } from 'react';
import { Plus, Upload, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const categories = ["Upah", "PHK", "Pelecehan", "Kondisi Kerja", "Lainnya"];

interface ComplaintSubmissionFormProps {
  userId: string | undefined;
  onComplaintSubmitted: () => void;
}

const ComplaintSubmissionForm: React.FC<ComplaintSubmissionFormProps> = ({
  userId,
  onComplaintSubmitted
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(categories[0]);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!userId) {
      toast.error("Anda harus login terlebih dahulu");
      return;
    }

    if (!title || !description) {
      toast.error("Judul dan deskripsi pengaduan wajib diisi");
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Insert complaint record
      const { data: complaintData, error: complaintError } = await supabase
        .from('complaints')
        .insert({
          user_id: userId,
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
        const filePath = `${userId}/${complaintData.id}/${Math.random().toString(36).substring(2)}.${fileExt}`;
        
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

      toast.success("Pengaduan berhasil dikirim");
      
      // Reset form
      setTitle("");
      setDescription("");
      setFile(null);
      setIsAnonymous(false);
      
      // Notify parent component to refresh complaints list
      onComplaintSubmitted();
      
    } catch (error) {
      console.error('Error submitting complaint:', error);
      toast.error("Gagal mengirim pengaduan");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
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
  );
};

export default ComplaintSubmissionForm;
