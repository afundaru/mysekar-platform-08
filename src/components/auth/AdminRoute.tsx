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
        const isAdmin = !!data;
        setHasAccess(isAdmin);
        
        sessionStorage.setItem(cacheKey, JSON.stringify({
          status: isAdmin,
          timestamp: Date.now()
        }));
        
        console.log('Admin status check result:', isAdmin, data);
      }
    } catch (err) {
      console.error('Exception checking admin status:', err);
      setHasAccess(false);
    } finally {
      setChecking(false);
    }
  }, [user, location.pathname]);

  useEffect(() => {
    if (!loading) {
      verifyAdminStatus();
    }
  }, [loading, verifyAdminStatus]);

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

  if (!hasAccess) {
    toast.error("Anda tidak memiliki akses ke halaman admin");
    return <Navigate to="/dashboard" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default memo(AdminRoute);
