
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload } from 'lucide-react';
import { Form, FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface ComplaintFormValues {
  title: string;
  category: string;
  description: string;
}

const ComplaintForm: React.FC = () => {
  const form = useForm<ComplaintFormValues>({
    defaultValues: {
      title: '',
      category: '',
      description: ''
    }
  });

  const onSubmit = (data: ComplaintFormValues) => {
    console.log('Form submitted:', data);
    toast.success('Pengaduan berhasil dikirim');
    form.reset();
  };

  return (
    <section className="p-4 bg-white rounded-t-xl">
      <h2 className="text-lg font-semibold mb-4">Formulir Pengaduan</h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-sm text-gray-600">Judul Pengaduan</FormLabel>
                <FormControl>
                  <Input placeholder="Masukkan judul pengaduan" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-sm text-gray-600">Kategori</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih Kategori" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="gaji">Gaji</SelectItem>
                    <SelectItem value="phk">PHK</SelectItem>
                    <SelectItem value="pelecehan">Pelecehan</SelectItem>
                    <SelectItem value="lainnya">Lainnya</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-sm text-gray-600">Deskripsi Masalah</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Jelaskan detail masalah Anda" 
                    className="h-32"
                    {...field} 
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="space-y-2">
            <Label className="text-sm text-gray-600">Upload Bukti</Label>
            <div className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50 transition-colors">
              <Upload className="mx-auto h-6 w-6 text-gray-400" />
              <p className="text-sm text-gray-500 mt-2">Klik untuk upload atau drag & drop file</p>
            </div>
          </div>

          <Button type="submit" className="w-full bg-teal text-white py-3 rounded-lg font-medium">
            Kirim Pengaduan
          </Button>
        </form>
      </Form>
    </section>
  );
};

export default ComplaintForm;
