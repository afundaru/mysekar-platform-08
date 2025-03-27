
import React from 'react';
import { Loader2, RefreshCw, AlertCircle, WifiOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';

interface Complaint {
  id: string;
  title: string;
  category: string;
  status: string;
  created_at: string;
}

interface ComplaintsListProps {
  complaints: Complaint[];
  isLoading?: boolean;
  loadError?: string | null;
  onRetry?: () => void;
  isOffline?: boolean;
}

const ComplaintsList: React.FC<ComplaintsListProps> = ({
  complaints,
  isLoading = false,
  loadError = null,
  onRetry = () => {},
  isOffline = false
}) => {
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).format(date);
    } catch (error) {
      console.error('Error formatting date:', error);
      return dateString; // Return original string if formatting fails
    }
  };

  if (isLoading) {
    return (
      <div className="p-4 space-y-3">
        <div className="flex justify-between items-center mb-2">
          <h2 className="font-semibold text-lg">Riwayat Pengaduan</h2>
        </div>
        <Skeleton className="h-20 w-full mb-3" />
        <Skeleton className="h-20 w-full mb-3" />
        <Skeleton className="h-20 w-full" />
      </div>
    );
  }

  if (isOffline) {
    return (
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="font-semibold text-lg">Riwayat Pengaduan</h2>
        </div>
        <Card className="p-6 text-center">
          <WifiOff className="h-10 w-10 text-amber-500 mx-auto mb-3" />
          <p className="text-amber-700 font-medium mb-2">Anda sedang offline</p>
          <p className="text-gray-600 mb-4">Tidak dapat memuat data pengaduan. Periksa koneksi internet Anda.</p>
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

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="font-semibold text-lg">Riwayat Pengaduan</h2>
        {loadError && (
          <Button 
            size="sm" 
            variant="outline" 
            onClick={onRetry} 
            className="flex items-center gap-1"
          >
            <RefreshCw className="h-4 w-4" />
            Coba Lagi
          </Button>
        )}
      </div>
      
      {loadError && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{loadError}</AlertDescription>
        </Alert>
      )}
      
      {complaints.length > 0 ? (
        complaints.map((complaint) => (
          <Card key={complaint.id} className="p-4 mb-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">{complaint.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{complaint.category} - {formatDate(complaint.created_at)}</p>
              </div>
              <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                complaint.status === "pending" ? "bg-yellow-100 text-yellow-800" : 
                complaint.status === "ditolak" || complaint.status === "rejected" ? "bg-red-100 text-red-800" : 
                "bg-green-100 text-green-800"
              }`}>
                {complaint.status === "pending" ? "Menunggu" : 
                 complaint.status === "in_progress" ? "Diproses" :
                 complaint.status === "resolved" ? "Selesai" : 
                 complaint.status}
              </span>
            </div>
          </Card>
        ))
      ) : (
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
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
              />
            </svg>
            <p className="text-gray-600 mb-2">Belum ada pengaduan yang diajukan</p>
            <p className="text-sm text-gray-500">Anda dapat membuat pengaduan baru dengan menekan tombol di atas</p>
          </div>
        </Card>
      )}
    </div>
  );
};

export default ComplaintsList;
