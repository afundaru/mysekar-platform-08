
import React from 'react';
import { useForm } from 'react-hook-form';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { 
  Form, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface CreateDiscussionForm {
  title: string;
  category: string;
  content: string;
}

interface NewDiscussionDialogProps {
  categories: string[];
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: CreateDiscussionForm) => void;
}

const NewDiscussionDialog: React.FC<NewDiscussionDialogProps> = ({
  categories,
  isOpen,
  onOpenChange,
  onSubmit
}) => {
  const form = useForm<CreateDiscussionForm>({
    defaultValues: {
      title: '',
      category: 'Ketenagakerjaan',
      content: ''
    }
  });

  return (
    <>
      {/* Floating Button */}
      <button 
        className="fixed bottom-20 right-6 bg-teal text-white p-3 rounded-full shadow-lg"
        onClick={() => onOpenChange(true)}
      >
        <Plus size={24} />
      </button>
      
      {/* New Discussion Dialog */}
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Buat Diskusi Baru</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Judul</FormLabel>
                    <FormControl>
                      <Input placeholder="Masukkan judul diskusi" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kategori</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih kategori" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.filter(cat => cat !== "Semua Diskusi").map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Isi Diskusi</FormLabel>
                    <FormControl>
                      <Input placeholder="Tuliskan isi diskusi Anda" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                  Batal
                </Button>
                <Button type="submit">Simpan</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NewDiscussionDialog;
