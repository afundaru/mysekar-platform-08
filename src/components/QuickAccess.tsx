
import React from 'react';
import { FilePen, Bot } from 'lucide-react';

interface QuickAccessItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const QuickAccessItem: React.FC<QuickAccessItemProps> = ({ icon, title, description }) => {
  return (
    <div className="sekar-card hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 animate-slide-up">
      <div className="text-primary mb-2">{icon}</div>
      <h3 className="text-sm font-medium">{title}</h3>
      <p className="text-xs text-text-secondary mt-1">{description}</p>
    </div>
  );
};

const QuickAccess: React.FC = () => {
  return (
    <section className="px-4 py-6 bg-bg-dark animate-fade-in">
      <h2 className="text-lg font-semibold mb-4">Akses Cepat</h2>
      <div className="grid grid-cols-2 gap-4">
        <QuickAccessItem 
          icon={<FilePen size={24} />} 
          title="Buat Pengaduan" 
          description="Laporkan masalah Anda" 
        />
        <QuickAccessItem 
          icon={<Bot size={24} />} 
          title="Konsultasi AI" 
          description="Bantuan hukum cepat" 
        />
      </div>
    </section>
  );
};

export default QuickAccess;
