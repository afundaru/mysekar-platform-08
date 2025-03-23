
import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const [checking, setChecking] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    const verifyAdminStatus = async () => {
      if (!user) {
        setChecking(false);
        return;
      }

      try {
        // Langsung periksa ke database untuk status admin terbaru
        const { data, error } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id)
          .eq('role', 'admin')
          .maybeSingle();
        
        if (error) {
          console.error('Error checking admin status:', error);
          toast.error('Gagal memeriksa status admin: ' + error.message);
          setHasAccess(false);
        } else {
          setHasAccess(!!data); // true jika data ditemukan, false jika tidak
        }
      } catch (err) {
        console.error('Exception checking admin status:', err);
        setHasAccess(false);
      } finally {
        setChecking(false);
      }
    };

    if (!loading) {
      verifyAdminStatus();
    }
  }, [user, loading]);

  // Jika masih loading atau sedang memeriksa status admin, tampilkan loading
  if (loading || checking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal"></div>
      </div>
    );
  }

  // Jika belum login, redirect ke halaman login
  if (!user) {
    toast.error("Anda harus login terlebih dahulu");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Jika bukan admin, redirect ke dashboard dengan pesan error
  if (!hasAccess) {
    toast.error("Anda tidak memiliki akses ke halaman admin");
    return <Navigate to="/dashboard" state={{ from: location }} replace />;
  }

  // Jika admin, izinkan akses
  return <>{children}</>;
};

export default AdminRoute;
