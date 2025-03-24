
import React, { useEffect, useState, useCallback, memo } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const { user, loading, checkIsAdmin } = useAuth();
  const location = useLocation();
  const [checking, setChecking] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);
  const [networkError, setNetworkError] = useState(false);

  const verifyAdminStatus = useCallback(async () => {
    if (!user) {
      setChecking(false);
      return;
    }

    try {
      console.log("Checking admin status for user:", user.id, "at path:", location.pathname);
      
      // Use the optimized checkIsAdmin function from AuthContext
      const isAdmin = await checkIsAdmin();
      setHasAccess(isAdmin);
      setNetworkError(false);
      setChecking(false);
      
      console.log('Admin status check result:', isAdmin);
    } catch (err) {
      console.error('Exception checking admin status:', err);
      
      if (import.meta.env.DEV) {
        // In development, allow access even when Supabase fails
        setHasAccess(true);
        setNetworkError(true);
        toast.warning('Mode pengembangan: Akses admin diberikan secara default');
      } else {
        setHasAccess(false);
        setNetworkError(true);
        toast.error('Terjadi kesalahan saat memeriksa status admin');
      }
      setChecking(false);
    }
  }, [user, location.pathname, checkIsAdmin]);

  useEffect(() => {
    // Add a short delay to avoid immediate checking which might cause UI freezing
    const timer = setTimeout(() => {
      if (!loading) {
        verifyAdminStatus();
      }
    }, 100);
    
    return () => clearTimeout(timer);
  }, [loading, verifyAdminStatus]);

  // Add event listeners for online/offline status
  useEffect(() => {
    const handleOnline = () => {
      console.log('App is online, refreshing admin status');
      setNetworkError(false);
      verifyAdminStatus();
    };

    const handleOffline = () => {
      console.log('App is offline');
      setNetworkError(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [verifyAdminStatus]);

  if (loading || checking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal"></div>
      </div>
    );
  }

  if (!user) {
    toast.error("Anda harus login terlebih dahulu");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (networkError && import.meta.env.DEV) {
    toast.warning("Mode pengembangan: Menggunakan status admin sementara");
  } else if (networkError) {
    toast.warning("Mode offline: Menggunakan status admin terakhir yang diketahui");
  }

  if (!hasAccess) {
    toast.error("Anda tidak memiliki akses ke halaman admin");
    return <Navigate to="/dashboard" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default memo(AdminRoute);
