
import React from 'react';
import { Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface ComplaintHistoryProps {
  complaints: any[];
  isLoading: boolean;
  error: string | null;
  onRetry: () => void;
}

const ComplaintHistory: React.FC<ComplaintHistoryProps> = ({ 
  complaints, 
  isLoading, 
  error,
  onRetry 
}) => {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-teal mb-2" />
        <p>Memuat riwayat pengaduan...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <Card className="p-4 text-center">
          <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-2" />
          <p className="text-red-600 mb-4">{error}</p>
          <Button 
            variant="outline"
            onClick={onRetry}
            className="mx-auto flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Coba Lagi
          </Button>
        </Card>
      </div>
    );
  }

  if (complaints.length === 0) {
    return (
      <div className="p-4">
        <Card className="p-6 text-center">
          <p className="text-gray-600 mb-2">Belum ada riwayat pengaduan.</p>
          <p className="text-sm text-gray-500">Pengaduan yang Anda ajukan akan muncul di sini.</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="bg-white shadow rounded-lg overflow-hidden">
        {complaints.map((complaint) => (
          <div key={complaint.id} className="border-b border-gray-200 p-4 last:border-b-0">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium">{complaint.title}</h3>
              <span className={`px-2 py-1 text-xs rounded ${
                complaint.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                complaint.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                complaint.status === 'resolved' ? 'bg-green-100 text-green-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {complaint.status === 'pending' ? 'Menunggu' :
                 complaint.status === 'in_progress' ? 'Diproses' :
                 complaint.status === 'resolved' ? 'Selesai' : 
                 complaint.status}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-1">{complaint.category}</p>
            <p className="text-xs text-gray-500">
              {new Date(complaint.created_at).toLocaleDateString('id-ID', { 
                day: 'numeric', 
                month: 'long', 
                year: 'numeric' 
              })}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComplaintHistory;
