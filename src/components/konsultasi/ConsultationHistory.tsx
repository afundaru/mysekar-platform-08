
import React from 'react';

interface HistoryItemProps {
  title: string;
  status: 'Selesai' | 'Dalam Proses';
  date: string;
}

const HistoryItem: React.FC<HistoryItemProps> = ({ title, status, date }) => {
  const getStatusStyle = () => {
    return status === 'Selesai' 
      ? 'bg-blue-100 text-blue-600' 
      : 'bg-yellow-100 text-yellow-600';
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-sm font-medium">{title}</h3>
        <span className={`text-xs ${getStatusStyle()} px-2 py-1 rounded`}>
          {status}
        </span>
      </div>
      <p className="text-xs text-gray-500 mb-2">{date}</p>
      <button className="text-teal text-sm">Lihat Detail</button>
    </div>
  );
};

const ConsultationHistory: React.FC = () => {
  const historyItems = [
    {
      id: 1,
      title: 'Masalah PHK Sepihak',
      status: 'Selesai' as const,
      date: '20 Jan 2025',
    },
    {
      id: 2,
      title: 'Konsultasi Hak Cuti',
      status: 'Dalam Proses' as const,
      date: '18 Jan 2025',
    },
  ];

  return (
    <section className="px-4 py-6">
      <h2 className="text-lg font-semibold mb-4">Riwayat Konsultasi</h2>
      <div className="space-y-4">
        {historyItems.map((item) => (
          <HistoryItem
            key={item.id}
            title={item.title}
            status={item.status}
            date={item.date}
          />
        ))}
      </div>
    </section>
  );
};

export default ConsultationHistory;
