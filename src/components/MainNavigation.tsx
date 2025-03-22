
import React from 'react';
import { MessageSquare, Megaphone, FilePen, Bot, MessageCircle, HelpCircle } from 'lucide-react';

const MainNavigation: React.FC = () => {
  return (
    <section className="px-4 py-6">
      <h2 className="text-lg font-semibold mb-4">Menu Utama</h2>
      <div className="grid grid-cols-3 gap-4">
        <NavItem icon={<MessageSquare className="h-6 w-6" />} label="Forum" />
        <NavItem icon={<Megaphone className="h-6 w-6" />} label="Pengumuman" />
        <NavItem icon={<FilePen className="h-6 w-6" />} label="Pengaduan" />
        <NavItem icon={<Bot className="h-6 w-6" />} label="Konsultasi" />
        <NavItem icon={<MessageCircle className="h-6 w-6" />} label="Live Chat" />
        <NavItem icon={<HelpCircle className="h-6 w-6" />} label="Bantuan" />
      </div>
    </section>
  );
};

const NavItem: React.FC<{ icon: React.ReactNode; label: string }> = ({ icon, label }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow text-center">
      <div className="text-teal mb-2 flex justify-center">{icon}</div>
      <h3 className="text-sm">{label}</h3>
    </div>
  );
};

export default MainNavigation;
