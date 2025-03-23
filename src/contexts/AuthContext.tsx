
import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

type AppRole = 'admin' | 'user';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  loading: boolean;
  userRole: AppRole | null;
  isAdmin: boolean;
  signOut: () => Promise<void>;
  isValidEmail: (email: string) => boolean;
  checkIsAdmin: () => Promise<boolean>;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType | null>(null);

// Export the AuthProvider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<AppRole | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Reduced timeout for admin check to prevent long waits
  const checkIsAdmin = useCallback(async (): Promise<boolean> => {
    if (!user) return false;
    
    try {
      // Reduce timeout to 5 seconds to avoid UI freezing for too long
      const timeoutPromise = new Promise<{data: null, error: Error}>((_, reject) => {
        setTimeout(() => reject(new Error('Request timeout')), 5000);
      });
      
      const fetchPromise = supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .eq('role', 'admin')
        .maybeSingle();
      
      const { data, error } = await Promise.race([fetchPromise, timeoutPromise]);
      
      if (error) {
        console.error('Error checking admin status:', error);
        // If it's a timeout error, use the cached state
        if (error.message === 'Request timeout') {
          console.warn('Admin check timed out, using cached state');
          return isAdmin;
        }
        return false;
      }
      
      const isUserAdmin = !!data;
      setIsAdmin(isUserAdmin);
      setUserRole(isUserAdmin ? 'admin' : 'user');
      return isUserAdmin;
    } catch (error) {
      console.error('Error checking admin status:', error);
      return isAdmin;
    }
  }, [user, isAdmin]);

  useEffect(() => {
    const setupAuth = async () => {
      try {
        // Set up the auth state change listener FIRST
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          async (event, currentSession) => {
            console.log('Auth event:', event);
            
            setSession(currentSession);
            setUser(currentSession?.user ?? null);
            
            if (currentSession?.user) {
              // Set a default user role immediately
              setUserRole('user');
              
              // Then check admin status in the background
              try {
                await checkIsAdmin();
              } catch (e) {
                console.error('Failed to check admin status after auth change:', e);
              }
            } else {
              setIsAdmin(false);
              setUserRole(null);
            }
            
            setLoading(false);
          }
        );

        // THEN check for any existing session
        const { data: { session: currentSession } } = await supabase.auth.getSession();
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        if (currentSession?.user) {
          // Set a default user role immediately
          setUserRole('user');
          
          // Then check admin status in the background
          try {
            await checkIsAdmin();
          } catch (e) {
            console.error('Failed to check admin status on initial load:', e);
          }
        }
        
        setLoading(false);
        
        return () => {
          subscription.unsubscribe();
        };
      } catch (e) {
        console.error('Error setting up auth:', e);
        setLoading(false);
        setError(e instanceof Error ? e : new Error('Unknown error setting up auth'));
      }
    };
    
    setupAuth();
  }, [checkIsAdmin]);

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      toast.success('Berhasil keluar dari sistem');
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error('Gagal keluar dari sistem');
    }
  };

  const isValidEmail = useCallback((email: string): boolean => {
    return email.endsWith('@bankraya.co.id');
  }, []);

  const value = useMemo(() => ({
    session,
    user,
    loading,
    userRole,
    isAdmin,
    signOut,
    isValidEmail,
    checkIsAdmin
  }), [session, user, loading, userRole, isAdmin, checkIsAdmin, isValidEmail]);

  if (error) {
    return (
      <div className="p-4 text-center">
        <h3 className="text-xl font-bold text-red-500 mb-4">Authentication Error</h3>
        <p className="text-sm text-gray-600 mb-4">{error.message}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-teal text-white rounded-md hover:bg-teal-600 transition-colors"
        >
          Reload
        </button>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
