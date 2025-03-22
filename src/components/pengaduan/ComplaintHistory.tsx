
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface ComplaintCardProps {
  title: string;
  date: string;
  status: 'processing' | 'completed';
  onViewDetail: () => void;
}

const ComplaintCard: React.FC<ComplaintCardProps> = ({ title, date, status, onViewDetail }) => {
  return (
    <Card className="bg-white">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-medium">{title}</h3>
          <span className={`px-2 py-1 rounded-full text-xs ${
            status === 'processing' 
              ? 'bg-yellow-100 text-yellow-800' 
              : 'bg-green-100 text-green-800'
          }`}>
            {status === 'processing' ? 'Diproses' : 'Selesai'}
          </span>
        </div>
        <p className="text-sm text-gray-500 mb-2">{date}</p>
        <Button 
          variant="ghost" 
          className="text-primary-blue text-sm p-0 h-auto"
          onClick={onViewDetail}
        >
          Lihat Detail
        </Button>
      </CardContent>
    </Card>
  );
};

const ComplaintHistory: React.FC = () => {
  const handleViewDetail = (id: number) => {
    console.log(`Viewing detail for complaint ${id}`);
  };

  return (
    <section className="mt-4 px-4">
      <h2 className="text-lg font-semibold mb-4">Riwayat Pengaduan</h2>
      <div className="space-y-4">
        <ComplaintCard 
          title="Masalah Pembayaran Lembur"
          date="20 Jan 2025"
          status="processing"
          onViewDetail={() => handleViewDetail(1)}
        />
        
        <ComplaintCard 
          title="Pengajuan Cuti Ditolak"
          date="15 Jan 2025"
          status="completed"
          onViewDetail={() => handleViewDetail(2)}
        />
      </div>
    </section>
  );
};

export default ComplaintHistory;
