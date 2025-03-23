
import React from 'react';
import { Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

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
      <div className="p-4 space-y-3">
        <Skeleton className="h-20 w-full mb-3" />
        <Skeleton className="h-20 w-full mb-3" />
        <Skeleton className="h-20 w-full mb-3" />
        <Skeleton className="h-20 w-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <Card className="p-6 text-center">
          <AlertCircle className="h-10 w-10 text-red-500 mx-auto mb-3" />
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
          <div className="flex flex-col items-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-12 w-12 text-gray-400 mb-4" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1.5} 
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" 
              />
            </svg>
            <p className="text-gray-600 mb-2">Belum ada riwayat pengaduan.</p>
            <p className="text-sm text-gray-500">Pengaduan yang Anda ajukan akan muncul di sini.</p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="bg-white shadow rounded-lg overflow-hidden">
        {complaints.map((complaint) => (
          <div key={complaint.id} className="border-b border-gray-200 p-4 last:border-b-0 hover:bg-gray-50">
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
