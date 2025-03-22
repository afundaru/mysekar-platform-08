
import React from 'react';
import { MessageSquare, FilePen } from 'lucide-react';

const RecentActivities: React.FC = () => {
  return (
    <section className="px-4 py-6 bg-[#F5F5F5]">
      <h2 className="text-lg font-semibold mb-4">Aktivitas Terbaru</h2>
      <div className="space-y-4">
        <ActivityItem 
          icon={<MessageSquare className="h-5 w-5" />} 
          title="Forum Diskusi" 
          time="5 menit lalu"
          description="Diskusi baru: "Peraturan Kerja 2025""
        />
        <ActivityItem 
          icon={<FilePen className="h-5 w-5" />} 
          title="Status Pengaduan" 
          time="1 jam lalu"
          description="Pengaduan #123 sedang diproses"
        />
      </div>
    </section>
  );
};

const ActivityItem: React.FC<{ 
  icon: React.ReactNode; 
  title: string;
  time: string;
  description: string;
}> = ({ icon, title, time, description }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-3">
          <div className="text-teal">{icon}</div>
          <span className="text-sm font-medium">{title}</span>
        </div>
        <span className="text-xs text-gray-500">{time}</span>
      </div>
      <p className="text-sm">{description}</p>
    </div>
  );
};

export default RecentActivities;
