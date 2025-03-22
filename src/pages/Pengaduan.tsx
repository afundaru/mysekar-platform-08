
import React, { useState } from 'react';
import { Bell, Plus, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import PengaduanBottomNavigation from '../components/pengaduan/PengaduanBottomNavigation';

const categories = ["Upah", "PHK", "Pelecehan", "Kondisi Kerja", "Lainnya"];

const reports = [
  {
    id: 1,
    title: "Gaji belum dibayarkan selama 2 bulan",
    category: "Upah",
    status: "Pending",
    date: "2025-03-20",
  },
  {
    id: 2,
    title: "PHK sepihak tanpa pesangon",
    category: "PHK",
    status: "Dalam Tinjauan",
    date: "2025-03-18",
  },
];

const Pengaduan: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>(categories[0]);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    console.log({
      category: selectedCategory,
      title,
      description,
      file,
      isAnonymous
    });
    // Reset form after submission
    setTitle("");
    setDescription("");
    setFile(null);
    setIsAnonymous(false);
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
            <span className="text-sm">Unggah Bukti</span>
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
          >
            Kirim Pengaduan
          </Button>
        </div>
      </div>

      {/* Status Pengaduan */}
      <div className="p-4">
        <h2 className="font-semibold text-lg mb-2">Riwayat Pengaduan</h2>
        {reports.map((report) => (
          <Card key={report.id} className="p-4 mb-4">
            <h3 className="font-semibold">{report.title}</h3>
            <p className="text-sm text-gray-600">{report.category} - {report.date}</p>
            <span className={`text-sm font-semibold ${
              report.status === "Pending" ? "text-yellow-500" : "text-green-500"
            }`}>
              {report.status}
            </span>
          </Card>
        ))}
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
