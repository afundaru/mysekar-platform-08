
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { ArrowLeft, Mail, Phone, User as UserIcon, Save } from 'lucide-react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface ProfileEditFormProps {
  onCancel: () => void;
}

const ProfileEditForm: React.FC<ProfileEditFormProps> = ({ onCancel }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  
  const memberData = user?.user_metadata;
  
  const [formData, setFormData] = useState({
    full_name: memberData?.full_name || '',
    pn_number: memberData?.pn_number || '',
    phone_number: memberData?.phone_number || '',
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          full_name: formData.full_name,
          pn_number: formData.pn_number,
          phone_number: formData.phone_number,
        }
      });
      
      if (error) throw error;
      
      toast.success("Profil berhasil diperbarui");
      onCancel();
    } catch (error) {
      toast.error("Gagal memperbarui profil");
      console.error("Error updating profile:", error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={onCancel}
          className="mr-2"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h2 className="text-xl font-bold">Edit Profil</h2>
      </div>
      
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold">Informasi Pribadi</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="full_name" className="flex items-center text-sm text-gray-500">
                <UserIcon className="h-4 w-4 mr-2" />
                Nama Lengkap
              </Label>
              <Input
                id="full_name"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                placeholder="Nama Lengkap"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="pn_number" className="flex items-center text-sm text-gray-500">
                <UserIcon className="h-4 w-4 mr-2" />
                Nomor Pegawai
              </Label>
              <Input
                id="pn_number"
                name="pn_number"
                value={formData.pn_number}
                onChange={handleChange}
                placeholder="Nomor Pegawai"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center text-sm text-gray-500">
                <Mail className="h-4 w-4 mr-2" />
                Email
              </Label>
              <Input
                id="email"
                value={user?.email || ''}
                disabled
                className="bg-gray-100"
              />
              <p className="text-xs text-gray-500">Email tidak dapat diubah</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone_number" className="flex items-center text-sm text-gray-500">
                <Phone className="h-4 w-4 mr-2" />
                Nomor Telepon
              </Label>
              <Input
                id="phone_number"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                placeholder="Nomor Telepon"
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onCancel} type="button">
              Batal
            </Button>
            <Button type="submit" disabled={loading} className="bg-teal hover:bg-teal-600">
              {loading ? 'Menyimpan...' : 'Simpan Perubahan'}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default ProfileEditForm;
