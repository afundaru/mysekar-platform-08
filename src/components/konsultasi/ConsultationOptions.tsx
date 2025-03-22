
import React from 'react';
import { MessageSquare, BookOpen, FileText, ScrollText } from 'lucide-react';

interface ConsultationOptionsProps {
  onStartChat?: () => void;
}

const ConsultationOptions: React.FC<ConsultationOptionsProps> = ({ onStartChat }) => {
  const options = [
    {
      id: 1,
      title: 'Live Chat',
      description: 'Konsultasi langsung dengan konsultan',
      icon: <MessageSquare className="w-6 h-6 text-teal" />,
      action: onStartChat
    },
    {
      id: 2,
      title: 'Panduan Hukum',
      description: 'Dasar-dasar hukum ketenagakerjaan',
      icon: <BookOpen className="w-6 h-6 text-teal" />
    },
    {
      id: 3,
      title: 'Template Dokumen',
      description: 'Contoh surat perjanjian dan dokumen legal',
      icon: <FileText className="w-6 h-6 text-teal" />
    },
    {
      id: 4,
      title: 'Jadwal Konsultasi',
      description: 'Buat jadwal pertemuan dengan konsultan',
      icon: <ScrollText className="w-6 h-6 text-teal" />
    }
  ];

  return (
    <section className="px-4 py-6">
      <h2 className="text-lg font-semibold mb-4">Layanan Konsultasi</h2>
      <div className="grid grid-cols-2 gap-4">
        {options.map((option) => (
          <div 
            key={option.id} 
            className="bg-white p-4 rounded-lg shadow-sm flex flex-col items-center text-center cursor-pointer hover:bg-gray-50"
            onClick={option.action}
          >
            <div className="mb-2">{option.icon}</div>
            <h3 className="font-medium text-sm">{option.title}</h3>
            <p className="text-xs text-gray-500 mt-1">{option.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ConsultationOptions;
