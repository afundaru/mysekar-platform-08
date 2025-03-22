
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { User, ArrowLeft, Mail, Phone, UserRound, BadgeCheck, Edit } from 'lucide-react';
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import ProfileEditForm from './ProfileEditForm';
import { useNavigate } from 'react-router-dom';

const UserProfile: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  
  const memberData = user?.user_metadata;
  
  if (editing) {
    return <ProfileEditForm onCancel={() => setEditing(false)} />;
  }
  
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => navigate('/dashboard')}
          className="mr-2"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h2 className="text-xl font-bold">Profil Pengguna</h2>
        <Button 
          variant="ghost" 
          size="icon" 
          className="ml-auto"
          onClick={() => setEditing(true)}
        >
          <Edit className="h-5 w-5" />
        </Button>
      </div>
      
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex items-center">
            <Avatar className="h-16 w-16 mr-4">
              <AvatarImage src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg" alt="Profile" />
              <AvatarFallback>{memberData?.full_name?.charAt(0) || user?.email?.charAt(0) || 'U'}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-semibold">{memberData?.full_name || 'Nama Lengkap'}</h3>
              <p className="text-sm text-gray-500 flex items-center">
                <BadgeCheck className="h-4 w-4 text-teal mr-1" />
                Anggota Aktif
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-base font-semibold">Informasi Pribadi</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex items-center text-sm text-gray-500 mb-1">
              <UserRound className="h-4 w-4 mr-2" />
              <Label>Nomor Pegawai</Label>
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
    </div>
  );
};

export default UserProfile;
