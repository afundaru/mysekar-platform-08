
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

interface MembershipInfoProps {
  user: any;
}

const MembershipInfo: React.FC<MembershipInfoProps> = ({ user }) => {
  const memberData = user?.user_metadata || {};
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-semibold">Informasi Keanggotaan</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex items-center text-sm text-gray-500 mb-1">
            <Label>Status Keanggotaan</Label>
          </div>
          <p className="font-medium">Aktif</p>
        </div>
        
        <div>
          <div className="flex items-center text-sm text-gray-500 mb-1">
            <Label>Nomor Anggota</Label>
          </div>
          <p className="font-medium">SP-BR-{memberData?.pn_number || '000000'}</p>
        </div>
        
        <div>
          <div className="flex items-center text-sm text-gray-500 mb-1">
            <Label>Bergabung Sejak</Label>
          </div>
          <p className="font-medium">Januari 2023</p>
        </div>
        
        <div>
          <div className="flex items-center text-sm text-gray-500 mb-1">
            <Label>Berlaku Hingga</Label>
          </div>
          <p className="font-medium">Desember 2025</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default MembershipInfo;
