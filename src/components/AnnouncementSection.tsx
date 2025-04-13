
import React from 'react';
import { ChevronRight } from 'lucide-react';

interface AnnouncementProps {
  image: string;
  title: string;
  date: string;
}

const AnnouncementCard: React.FC<AnnouncementProps> = ({ image, title, date }) => {
  return (
    <div className="flex-none w-64 sekar-card overflow-hidden hover:shadow-lg transition-shadow duration-300 animate-slide-up">
      <div className="overflow-hidden">
        <img 
          className="w-full h-32 object-cover rounded-t-2xl transform scale-100 hover:scale-105 transition-transform duration-500 ease-in-out" 
          src={image} 
          alt={title} 
        />
      </div>
      <div className="p-3">
        <h3 className="text-sm font-medium">{title}</h3>
        <p className="text-xs text-text-secondary mt-1">{date}</p>
      </div>
    </div>
  );
};

const AnnouncementSection: React.FC = () => {
  const announcements = [
    {
      image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/1eb5f89883-b2d151dfc455b7061a56.png",
      title: "Rapat Anggota Tahunan 2025",
      date: "23 Jan 2025"
    },
    {
      image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/f1045c5206-16fb513c7e82086a0945.png",
      title: "Update Kebijakan Kerja",
      date: "20 Jan 2025"
    },
    {
      image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/1eb5f89883-b2d151dfc455b7061a56.png",
      title: "Pelatihan Hak Pekerja",
      date: "15 Jan 2025"
    }
  ];

  return (
    <section className="px-4 py-6 animate-fade-in">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Pengumuman & Berita</h2>
        <button className="text-accent text-sm flex items-center hover:underline transition-all duration-200">
          Lihat Semua
          <ChevronRight size={16} className="ml-1" />
        </button>
      </div>
      <div className="flex overflow-x-auto space-x-4 pb-4 scrollbar-none" id="announcement-slider">
        {announcements.map((announcement, index) => (
          <AnnouncementCard 
            key={index} 
            image={announcement.image} 
            title={announcement.title} 
            date={announcement.date} 
          />
        ))}
      </div>
    </section>
  );
};

export default AnnouncementSection;
