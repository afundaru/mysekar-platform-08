
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const AddAdmin: React.FC = () => {
  const { user, isAdmin, checkIsAdmin } = useAuth();
  const [loading, setLoading] = useState(false);

  const makeAdmin = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('add-admin', {
        body: { email: user.email },
      });

      if (error) {
        toast.error(`Gagal: ${error.message}`);
        return;
      }

      toast.success('Anda sekarang adalah admin!');
      await checkIsAdmin(); // Refresh status admin
    } catch (err) {
      console.error('Error adding admin:', err);
      toast.error('Terjadi kesalahan saat menambahkan admin');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Kelola Admin</h1>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Status Admin</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            {isAdmin 
              ? 'Anda memiliki akses admin. Anda dapat mengelola aplikasi dan pengguna lain.'
              : 'Anda tidak memiliki akses admin. Untuk menambahkan diri sebagai admin pertama, klik tombol di bawah.'}
          </p>
          
          {!isAdmin && (
            <Button
              onClick={makeAdmin}
              disabled={loading}
              className="bg-teal hover:bg-teal/90"
            >
              {loading ? 'Memproses...' : 'Jadikan Saya Admin Pertama'}
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AddAdmin;
