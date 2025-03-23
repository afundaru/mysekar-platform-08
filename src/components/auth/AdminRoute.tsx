
import React, { useEffect, useState, useCallback, memo } from 'react';
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
  const [networkError, setNetworkError] = useState(false);

  const verifyAdminStatus = useCallback(async () => {
    if (!user) {
      setChecking(false);
      return;
    }

    try {
      console.log("Checking admin status for user:", user.id, "at path:", location.pathname);
      
      const cacheKey = `admin_status_${user.id}`;
      const cachedStatus = sessionStorage.getItem(cacheKey);
      
      if (cachedStatus) {
        const { status, timestamp } = JSON.parse(cachedStatus);
        const isRecent = Date.now() - timestamp < 5 * 60 * 1000;
        
        if (isRecent) {
          console.log('Using cached admin status:', status);
          setHasAccess(status);
          setChecking(false);
          return;
        }
      }
      
      // Offline fallback - if network is unavailable but we have a previous status
      if (!navigator.onLine && cachedStatus) {
        const { status } = JSON.parse(cachedStatus);
        console.log('Offline mode - using last known admin status:', status);
        setHasAccess(status);
        setChecking(false);
        setNetworkError(true);
        return;
      }
      
      // Use a try/catch for the database request
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .eq('role', 'admin')
        .maybeSingle();
      
      if (error) {
        console.error('Error checking admin status:', error);
        
        // If it's a network error and we have cached status, use it
        if (error.message?.includes('Failed to fetch') && cachedStatus) {
          const { status } = JSON.parse(cachedStatus);
          setHasAccess(status);
          setNetworkError(true);
          toast.error('Koneksi jaringan bermasalah, menggunakan status terakhir');
        } else {
          toast.error('Gagal memeriksa status admin: ' + error.message);
          setHasAccess(false);
        }
      } else {
        const isAdmin = !!data;
        setHasAccess(isAdmin);
        setNetworkError(false);
        
        sessionStorage.setItem(cacheKey, JSON.stringify({
          status: isAdmin,
          timestamp: Date.now()
        }));
        
        console.log('Admin status check result:', isAdmin, data);
      }
    } catch (err) {
      console.error('Exception checking admin status:', err);
      setHasAccess(false);
      setNetworkError(true);
      toast.error('Terjadi kesalahan saat memeriksa status admin');
    } finally {
      setChecking(false);
    }
  }, [user, location.pathname]);

  useEffect(() => {
    if (!loading) {
      verifyAdminStatus();
    }
  }, [loading, verifyAdminStatus]);

  // Add event listeners for online/offline status
  useEffect(() => {
    const handleOnline = () => {
      console.log('App is online, refreshing admin status');
      setNetworkError(false);
      verifyAdminStatus();
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', () => setNetworkError(true));

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', () => setNetworkError(true));
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

  if (networkError) {
    toast.warning("Mode offline: Menggunakan status admin terakhir yang diketahui");
  }

  if (!hasAccess) {
    toast.error("Anda tidak memiliki akses ke halaman admin");
    return <Navigate to="/dashboard" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default memo(AdminRoute);
