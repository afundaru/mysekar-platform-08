
import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const { user, loading, isAdmin, checkIsAdmin } = useAuth();
  const location = useLocation();
  const [checking, setChecking] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    const verifyAdminStatus = async () => {
      if (user) {
        const isUserAdmin = await checkIsAdmin();
        setHasAccess(isUserAdmin);
      }
      setChecking(false);
    };

    if (!loading) {
      verifyAdminStatus();
    }
  }, [user, loading, checkIsAdmin]);

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
  if (!isAdmin) {
    toast.error("Anda tidak memiliki akses ke halaman admin");
    return <Navigate to="/dashboard" state={{ from: location }} replace />;
  }

  // Jika admin, izinkan akses
  return <>{children}</>;
};

export default AdminRoute;
