
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ConsultationRecord {
  id: string;
  title: string;
  date: string;
  status: 'completed' | 'in_progress';
}

const historyRecords: ConsultationRecord[] = [
  {
    id: '1',
    title: 'Masalah PHK Sepihak',
    date: '20 Jan 2025',
    status: 'completed',
  },
  {
    id: '2',
    title: 'Konsultasi Hak Cuti',
    date: '18 Jan 2025',
    status: 'in_progress',
  }
];

const ConsultationHistory: React.FC = () => {
  return (
    <section className="px-4 py-6">
      <h2 className="text-lg font-semibold mb-4">Riwayat Konsultasi</h2>
      <div className="space-y-4">
        {historyRecords.map(record => (
          <Card key={record.id} className="p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-sm font-medium">{record.title}</h3>
              <span 
                className={`text-xs px-2 py-1 rounded ${
                  record.status === 'completed' 
                    ? 'bg-blue-100 text-blue-600' 
                    : 'bg-yellow-100 text-yellow-600'
                }`}
              >
                {record.status === 'completed' ? 'Selesai' : 'Dalam Proses'}
              </span>
            </div>
            <p className="text-xs text-gray-500 mb-2">{record.date}</p>
            <Button variant="link" className="text-teal p-0 h-auto">
              Lihat Detail
            </Button>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default ConsultationHistory;
