
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { AlertCircle, CheckCircle2, WifiOff, RefreshCw } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const AddAdmin: React.FC = () => {
  const { user, checkIsAdmin } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [adminError, setAdminError] = useState<string | null>(null);

  // Listen for online/offline events
  useEffect(() => {
    const handleOnlineStatus = () => {
      setIsOffline(!navigator.onLine);
      if (navigator.onLine && error?.includes('Failed to fetch')) {
        // Retry checking admin status when back online
        checkAdminStatus();
        toast.success('Koneksi telah dipulihkan');
      }
    };

    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOnlineStatus);
    
    return () => {
      window.removeEventListener('online', handleOnlineStatus);
      window.removeEventListener('offline', handleOnlineStatus);
    };
  }, [error]);

  // Check admin status on load
  useEffect(() => {
    checkAdminStatus();
  }, [user]);

  const checkAdminStatus = async () => {
    if (!user) return;
    
    try {
      console.log("Memeriksa status admin untuk user:", user.id);
      setError(null);
      const isUserAdmin = await checkIsAdmin();
      setIsAdmin(isUserAdmin);
      console.log("Status admin:", isUserAdmin);
      setCheckingStatus(false);
    } catch (err: any) {
      console.error('Error checking admin status:', err);
      setError(`Gagal memeriksa status admin: ${err.message || 'Unknown error'}`);
      
      // Set default status in development mode
      if (import.meta.env.DEV) {
        setIsAdmin(true);
        console.log('Development mode - assuming admin access for development purposes');
      }
      setCheckingStatus(false);
    }
  };

  const makeAdmin = async () => {
    if (!user) {
      toast.error('Anda harus login terlebih dahulu');
      return;
    }
    
    if (isOffline) {
      toast.error('Tidak dapat menambahkan admin saat offline');
      return;
    }
    
    setLoading(true);
    setError(null);
    setSuccess(null);
    setAdminError(null);
    
    try {
      console.log("Menambahkan user sebagai admin:", user.id);
      
      // Call the Edge Function instead of direct DB access
      const { data, error } = await supabase.functions.invoke('add-admin', {
        body: { userId: user.id }
      });
      
      console.log("Response from add-admin function:", data, error);
      
      if (error) {
        throw new Error(`Gagal menambahkan admin: ${error.message}`);
      }
      
      if (data?.message) {
        setSuccess(data.message);
        toast.success(data.message);
        setIsAdmin(true);
        // Update auth context
        await checkIsAdmin();
      } else if (data?.error) {
        throw new Error(data.error);
      }
    } catch (err: any) {
      console.error('Error making admin:', err);
      setAdminError(`Terjadi kesalahan saat menambahkan admin: ${err.message || 'Unknown error'}`);
      toast.error('Terjadi kesalahan saat menambahkan admin');
      
      // Set fallback admin status in development
      if (import.meta.env.DEV) {
        setSuccess('Mode development: status admin diberikan (simulasi)');
        setIsAdmin(true);
      }
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
          {isOffline && (
            <div className="mb-4 p-3 bg-amber-100 text-amber-700 rounded-md flex items-start">
              <WifiOff className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
              <p>Anda sedang offline. Beberapa fitur mungkin tidak berfungsi.</p>
            </div>
          )}
          
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md flex items-start">
              <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <p>{error}</p>
                {error.includes('Failed to fetch') && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={checkAdminStatus} 
                    className="mt-2"
                    disabled={isOffline}
                  >
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Coba Lagi
                  </Button>
                )}
              </div>
            </div>
          )}
          
          {success && (
            <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md flex items-start">
              <CheckCircle2 className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
              <p>{success}</p>
            </div>
          )}
          
          {adminError && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {adminError}
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={makeAdmin} 
                  className="mt-2 ml-2"
                  disabled={isOffline || loading}
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Coba Lagi
                </Button>
              </AlertDescription>
            </Alert>
          )}
          
          <p className="mb-4">
            {isAdmin 
              ? 'Anda memiliki akses admin. Anda dapat mengelola aplikasi dan pengguna lain.'
              : 'Anda tidak memiliki akses admin. Untuk menambahkan diri sebagai admin pertama, klik tombol di bawah.'}
          </p>
          
          {!isAdmin && (
            <Button
              onClick={makeAdmin}
              disabled={loading || isOffline}
              className="bg-teal hover:bg-teal/90"
            >
              {loading ? (
                <>
                  <span className="mr-2">Memproses...</span>
                  <div className="animate-spin h-4 w-4 border-2 border-white rounded-full border-t-transparent"></div>
                </>
              ) : 'Jadikan Saya Admin'}
            </Button>
          )}
        </CardContent>
      </Card>

      {import.meta.env.DEV && (
        <div className="text-xs text-gray-500 mt-2 p-2 border border-gray-200 rounded-md">
          <p>Mode Pengembangan: Akses admin akan diberikan secara otomatis di lingkungan development.</p>
        </div>
      )}
    </div>
  );
};

export default AddAdmin;
