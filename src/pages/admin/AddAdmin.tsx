
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { AlertCircle, CheckCircle2 } from "lucide-react";

const AddAdmin: React.FC = () => {
  const { user, checkIsAdmin } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Check admin status on load
  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!user) return;
      
      try {
        console.log("Memeriksa status admin untuk user:", user.id);
        setError(null);
        const isUserAdmin = await checkIsAdmin();
        setIsAdmin(isUserAdmin);
        console.log("Status admin:", isUserAdmin);
      } catch (err) {
        console.error('Error checking admin status:', err);
        setError('Gagal memeriksa status admin');
      } finally {
        setCheckingStatus(false);
      }
    };
    
    checkAdminStatus();
  }, [user, checkIsAdmin]);

  const makeAdmin = async () => {
    if (!user) {
      toast.error('Anda harus login terlebih dahulu');
      return;
    }
    
    setLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      console.log("Menambahkan user sebagai admin:", user.id);
      
      // Cek apakah sudah ada admin di sistem
      const { data: existingAdmins, error: checkError } = await supabase
        .from('user_roles')
        .select('id')
        .eq('role', 'admin');
      
      if (checkError) {
        console.error("Error checking existing admins:", checkError);
        setError(`Gagal memeriksa admin yang ada: ${checkError.message}`);
        toast.error(`Gagal memeriksa admin yang ada: ${checkError.message}`);
        setLoading(false);
        return;
      }
      
      console.log("Existing admins check:", existingAdmins);
      
      // Jika belum ada admin atau pengguna sudah admin, buat pengguna saat ini sebagai admin
      const { error: insertError } = await supabase
        .from('user_roles')
        .insert({ 
          user_id: user.id,
          role: 'admin'
        });
      
      if (insertError) {
        console.error("Error adding admin:", insertError);
        // Jika error karena unique constraint, berarti user sudah admin
        if (insertError.code === '23505') { // Unique violation code
          setSuccess('Anda sudah menjadi admin');
          toast.info('Anda sudah menjadi admin');
          setIsAdmin(true);
        } else {
          setError(`Gagal menambahkan admin: ${insertError.message}`);
          toast.error(`Gagal menambahkan admin: ${insertError.message}`);
        }
      } else {
        setSuccess('Anda berhasil menjadi admin!');
        toast.success('Anda berhasil menjadi admin!');
        setIsAdmin(true);
        // Update auth context
        await checkIsAdmin();
      }
    } catch (err: any) {
      console.error('Error making admin:', err);
      setError(`Terjadi kesalahan: ${err.message || 'Unknown error'}`);
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
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md flex items-start">
              <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
              <p>{error}</p>
            </div>
          )}
          
          {success && (
            <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md flex items-start">
              <CheckCircle2 className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
              <p>{success}</p>
            </div>
          )}
          
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
