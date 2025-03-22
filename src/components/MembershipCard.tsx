
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from '@/contexts/AuthContext';

const MembershipCard: React.FC = () => {
  const { user } = useAuth();
  const memberData = user?.user_metadata;

  return (
    <Card className="bg-gradient-to-r from-blue-600 to-teal-500 text-white shadow-xl w-full max-w-md mx-auto">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold">KARTU ANGGOTA</h3>
            <p className="text-sm opacity-90">Serikat Pekerja Bank Raya</p>
          </div>
          <img 
            src="https://storage.googleapis.com/uxpilot-auth.appspot.com/43b1de23a9-bank-logo.png" 
            alt="Bank Raya Logo" 
            className="h-10 w-auto"
          />
        </div>
        
        <div className="mt-6 mb-4">
          <h4 className="text-lg font-bold">{memberData?.full_name || 'Nama Anggota'}</h4>
          <p className="text-sm opacity-90">PN: {memberData?.pn_number || '000000'}</p>
          <p className="text-sm opacity-90">{memberData?.email || 'email@bankraya.co.id'}</p>
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

export default MembershipCard;
