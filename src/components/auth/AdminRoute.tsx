
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
      
      // Always grant admin access in development mode
      if (import.meta.env.DEV) {
        console.log('Development mode - granting admin access for development purposes');
        setHasAccess(true);
        setChecking(false);
        sessionStorage.setItem(cacheKey, JSON.stringify({
          status: true,
          timestamp: Date.now(),
          temporary: true
        }));
        return;
      }
      
      if (cachedStatus) {
        const { status, timestamp } = JSON.parse(cachedStatus);
        const isRecent = Date.now() - timestamp < 5 * 60 * 1000; // 5 minutes
        
        if (isRecent) {
          console.log('Using cached admin status:', status);
          setHasAccess(status);
          setChecking(false);
          return;
        }
      }
      
      // If offline, grant temporary access based on cached status or dev mode
      if (!navigator.onLine) {
        if (cachedStatus) {
          const { status } = JSON.parse(cachedStatus);
          setHasAccess(status);
          setNetworkError(true);
          setChecking(false);
          toast.warning('Mode offline: Menggunakan status admin terakhir yang diketahui');
          return;
        } else if (import.meta.env.DEV) {
          setHasAccess(true);
          setNetworkError(true);
          setChecking(false);
          toast.warning('Mode pengembangan offline: Akses admin diberikan secara default');
          return;
        }
      }
      
      try {
        // Reduced timeout to prevent UI freezing (from 3000ms to 2000ms)
        const timeoutPromise = new Promise<{data: null, error: Error}>((_, reject) => {
          setTimeout(() => reject(new Error('Request timeout')), 2000);
        });
        
        const fetchPromise = supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id)
          .eq('role', 'admin')
          .maybeSingle();
        
        const { data, error } = await Promise.race([fetchPromise, timeoutPromise]);
        
        if (error) {
          // If it's a timeout error, use the cached state
          if (error.message === 'Request timeout') {
            console.warn('Admin check timed out, using cached state');
            if (cachedStatus) {
              const { status } = JSON.parse(cachedStatus);
              setHasAccess(status);
            } else if (import.meta.env.DEV) {
              setHasAccess(true);
            }
            setNetworkError(true);
            setChecking(false);
            return;
          }
          throw error;
        }
        
        const isAdmin = !!data;
        setHasAccess(isAdmin);
        setNetworkError(false);
        
        sessionStorage.setItem(cacheKey, JSON.stringify({
          status: isAdmin,
          timestamp: Date.now()
        }));
        
        console.log('Admin status check result:', isAdmin, data);
      } catch (error) {
        console.error('Error checking admin status:', error);
        
        // If we have cached status, use it when there's an error
        if (cachedStatus) {
          const { status } = JSON.parse(cachedStatus);
          setHasAccess(status);
          setNetworkError(true);
          toast.error('Koneksi ke database bermasalah, menggunakan status terakhir');
        } else if (import.meta.env.DEV) {
          // In development, allow access even when Supabase fails
          setHasAccess(true);
          setNetworkError(true);
          toast.warning('Mode pengembangan: Akses admin diberikan secara default');
        } else {
          toast.error('Gagal memeriksa status admin');
          setHasAccess(false);
        }
      }
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
    } finally {
      setChecking(false);
    }
  }, [user, location.pathname]);

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
