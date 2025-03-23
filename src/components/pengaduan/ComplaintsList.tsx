
import React from 'react';
import { Loader2, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

interface Complaint {
  id: string;
  title: string;
  category: string;
  status: string;
  created_at: string;
}

interface ComplaintsListProps {
  complaints: Complaint[];
  isLoading: boolean;
  loadError: string | null;
  onRetry: () => void;
}

const ComplaintsList: React.FC<ComplaintsListProps> = ({
  complaints,
  isLoading,
  loadError,
  onRetry
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  return (
    <div>
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
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{loadError}</AlertDescription>
        </Alert>
      )}
      
      {isLoading ? (
        <div className="flex justify-center p-8">
          <Loader2 className="h-8 w-8 animate-spin text-teal" />
        </div>
      ) : complaints.length > 0 ? (
        complaints.map((complaint) => (
          <Card key={complaint.id} className="p-4 mb-4">
            <h3 className="font-semibold">{complaint.title}</h3>
            <p className="text-sm text-gray-600">{complaint.category} - {formatDate(complaint.created_at)}</p>
            <span className={`text-sm font-semibold ${
              complaint.status === "Pending" ? "text-yellow-500" : 
              complaint.status === "Ditolak" ? "text-red-500" : "text-green-500"
            }`}>
              {complaint.status}
            </span>
          </Card>
        ))
      ) : (
        <Card className="p-4 text-center text-gray-500">
          {loadError ? "Gagal memuat data pengaduan" : "Belum ada pengaduan yang diajukan"}
        </Card>
      )}
    </div>
  );
};

export default ComplaintsList;
