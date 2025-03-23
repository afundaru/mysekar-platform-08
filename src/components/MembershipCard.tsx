
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from '@/contexts/AuthContext';
import { ErrorBoundary } from 'react-error-boundary';

const ErrorFallback = ({ error }) => (
  <div className="p-4 text-red-500 text-sm">
    <p>Failed to load membership card: {error.message}</p>
  </div>
);

const MembershipCardContent = () => {
  const { user } = useAuth();
  
  // Fallback if user data is not available
  if (!user) {
    return (
      <Card className="bg-gradient-to-r from-blue-600 to-teal-500 text-white shadow-xl w-full max-w-md mx-auto opacity-70">
        <CardContent className="p-6">
          <div className="text-center py-4">
            <p>Loading membership data...</p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  const memberData = user?.user_metadata || {};

  return (
    <Card className="bg-gradient-to-r from-blue-600 to-teal-500 text-white shadow-xl w-full max-w-md mx-auto">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold">KARTU ANGGOTA</h3>
            <p className="text-sm opacity-90">Serikat Pekerja Bank Raya</p>
          </div>
          <img 
            src="/lovable-uploads/893cf75c-75df-49e4-b588-9adbfecfcd45.png" 
            alt="Bank Raya Logo" 
            className="h-12 w-auto"
            onError={(e) => {
              // Fallback if image fails to load
              console.error('Failed to load logo image');
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>
        
        <div className="mt-6 mb-4">
          <h4 className="text-lg font-bold">{memberData?.full_name || 'Nama Anggota'}</h4>
          <p className="text-sm opacity-90">PN: {memberData?.pn_number || '000000'}</p>
          <p className="text-sm opacity-90">{user?.email || 'email@bankraya.co.id'}</p>
        </div>
        
        <div className="flex justify-between items-end mt-6">
          <div>
            <p className="text-xs opacity-80">Berlaku hingga</p>
            <p className="font-medium">Desember 2025</p>
          </div>
          <div className="text-right">
            <p className="text-xs opacity-80">Nomor Anggota</p>
            <p className="font-medium">SP-BR-{memberData?.pn_number || '000000'}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const MembershipCard: React.FC = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <MembershipCardContent />
    </ErrorBoundary>
  );
};

export default MembershipCard;
