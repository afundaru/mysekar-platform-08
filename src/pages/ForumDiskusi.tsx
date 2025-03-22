
import React, { useState } from 'react';
import { MessageSquare, Bell, Search, Plus, ThumbsUp, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DashboardBottomNavigation from '@/components/DashboardBottomNavigation';

const categories = [
  "Semua Diskusi", 
  "Ketenagakerjaan", 
  "Hukum & Regulasi", 
  "Pengalaman Kerja", 
  "Saran & Masukan"
];

const discussions = [
  {
    id: 1,
    title: "Bagaimana cara mengajukan PHK yang adil?",
    category: "Hukum & Regulasi",
    author: "Rudi Hartono",
    time: "2 jam lalu",
    likes: 12,
    comments: 5,
  },
  {
    id: 2,
    title: "Berapa standar kenaikan gaji tiap tahun?",
    category: "Ketenagakerjaan",
    author: "Siti Aisyah",
    time: "5 jam lalu",
    likes: 20,
    comments: 8,
  },
  {
    id: 3,
    title: "Pengalaman menghadapi konflik di tempat kerja",
    category: "Pengalaman Kerja",
    author: "Ahmad Fauzi",
    time: "1 hari lalu",
    likes: 15,
    comments: 10,
  },
  {
    id: 4,
    title: "Usulan fasilitas tambahan di kantor cabang",
    category: "Saran & Masukan",
    author: "Dewi Anggraini",
    time: "2 hari lalu",
    likes: 8,
    comments: 3,
  },
];

const ForumDiskusi: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("Semua Diskusi");
  const navigate = useNavigate();

  const filteredDiscussions = selectedCategory === "Semua Diskusi" 
    ? discussions
    : discussions.filter(disc => disc.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Status Bar */}
      <div className="bg-teal h-6"></div>
      
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-3 bg-white shadow-sm">
        <div className="flex items-center">
          <button 
            className="mr-2"
            onClick={() => navigate('/dashboard')}
          >
            <MessageSquare className="h-6 w-6 text-teal" />
          </button>
          <h1 className="text-lg font-bold">Forum Diskusi</h1>
        </div>
        <div className="flex gap-4">
          <Search className="text-gray-600 h-5 w-5" />
          <Bell className="text-gray-600 h-5 w-5" />
        </div>
      </div>

      {/* Kategori Forum */}
      <div className="flex overflow-x-auto px-4 py-3 bg-white shadow-sm">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`px-4 py-1.5 mx-1 rounded-full text-sm whitespace-nowrap ${
              selectedCategory === cat 
                ? "bg-teal text-white" 
                : "bg-gray-100 text-gray-600"
            }`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* List Diskusi */}
      <div className="flex-1 overflow-y-auto p-4 pb-20">
        {filteredDiscussions.length > 0 ? (
          filteredDiscussions.map((disc) => (
            <div key={disc.id} className="bg-white p-4 rounded-lg shadow-sm mb-4">
              <h2 className="font-semibold text-lg">{disc.title}</h2>
              <p className="text-sm text-gray-600 mt-1">{disc.category} - {disc.author}</p>
              <div className="flex justify-between mt-3 text-gray-500 text-sm">
                <span>{disc.time}</span>
                <div className="flex gap-4">
                  <span className="flex items-center gap-1">
                    <ThumbsUp className="h-4 w-4" /> {disc.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="h-4 w-4" /> {disc.comments}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            Tidak ada diskusi untuk kategori ini
          </div>
        )}
      </div>

      {/* Floating Button */}
      <button className="fixed bottom-20 right-6 bg-teal text-white p-3 rounded-full shadow-lg">
        <Plus size={24} />
      </button>
      
      {/* Bottom Navigation */}
      <DashboardBottomNavigation />
    </div>
  );
};

export default ForumDiskusi;
