
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserRound, Mail, Phone } from 'lucide-react';
import { Label } from "@/components/ui/label";

interface PersonalInfoProps {
  user: any;
}

const PersonalInfo: React.FC<PersonalInfoProps> = ({ user }) => {
  const memberData = user?.user_metadata || {};
  
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-base font-semibold">Informasi Pribadi</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex items-center text-sm text-gray-500 mb-1">
            <UserRound className="h-4 w-4 mr-2" />
            <Label>PN Bank Raya</Label>
          </div>
          <p className="font-medium">{memberData?.pn_number || '-'}</p>
        </div>
        
        <div>
          <div className="flex items-center text-sm text-gray-500 mb-1">
            <Mail className="h-4 w-4 mr-2" />
            <Label>Email</Label>
          </div>
          <p className="font-medium">{user?.email || '-'}</p>
        </div>
        
        <div>
          <div className="flex items-center text-sm text-gray-500 mb-1">
            <Phone className="h-4 w-4 mr-2" />
            <Label>Nomor Telepon</Label>
          </div>
          <p className="font-medium">{memberData?.phone_number || '-'}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalInfo;
