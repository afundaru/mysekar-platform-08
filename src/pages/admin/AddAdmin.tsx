
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

const AddAdmin: React.FC = () => {
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);

  // Check admin status on load
  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id)
          .eq('role', 'admin')
          .maybeSingle();
          
        if (error) {
          console.error('Error checking admin status:', error);
          toast.error('Gagal memeriksa status admin');
        } else {
          setIsAdmin(!!data);
        }
      } catch (err) {
        console.error('Exception checking admin status:', err);
      } finally {
        setCheckingStatus(false);
      }
    };
    
    checkAdminStatus();
  }, [user]);

  const makeAdmin = async () => {
    if (!user) {
      toast.error('Anda harus login terlebih dahulu');
      return;
    }
    
    setLoading(true);
    try {
      // Cek apakah sudah ada admin di sistem
      const { data: existingAdmins, error: checkError } = await supabase
        .from('user_roles')
        .select('id')
        .eq('role', 'admin')
        .limit(1);
      
      if (checkError) {
        toast.error(`Gagal memeriksa admin yang ada: ${checkError.message}`);
        setLoading(false);
        return;
      }
      
      // Jika belum ada admin atau pengguna sudah admin, buat pengguna saat ini sebagai admin
      const { error: insertError } = await supabase
        .from('user_roles')
        .insert({ 
          user_id: user.id,
          role: 'admin'
        })
        .select()
        .single();
      
      if (insertError) {
        // Jika error karena unique constraint, berarti user sudah admin
        if (insertError.code === '23505') { // Unique violation code
          toast.info('Anda sudah menjadi admin');
          setIsAdmin(true);
        } else {
          toast.error(`Gagal menambahkan admin: ${insertError.message}`);
        }
      } else {
        toast.success('Anda berhasil menjadi admin!');
        setIsAdmin(true);
      }
    } catch (err) {
      console.error('Error making admin:', err);
      toast.error('Terjadi kesalahan saat menambahkan admin');
    } finally {
      setLoading(false);
    }
  };

  if (checkingStatus) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Kelola Admin</h1>
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal"></div>
        </div>
      </div>
    );
  }

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
              {loading ? 'Memproses...' : 'Jadikan Saya Admin'}
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AddAdmin;
