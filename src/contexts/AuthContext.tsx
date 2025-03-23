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

// Create context with meaningful default values
const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  loading: true,
  userRole: null,
  isAdmin: false,
  signOut: async () => {},
  isValidEmail: () => false,
  checkIsAdmin: async () => false
});

// Export the AuthProvider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  console.log("AuthProvider rendering");
  
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<AppRole | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const checkIsAdmin = useCallback(async (): Promise<boolean> => {
    if (!user) return false;
    
    try {
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
        console.error('Error checking admin status:', error);
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
    let mounted = true; // Flag to track if component is mounted
    
    const setupAuth = async () => {
      if (!mounted) return;
      
      try {
        console.log("Setting up authentication...");
        setLoading(true);
        
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          async (event, currentSession) => {
            if (!mounted) return;
            
            console.log('Auth event:', event);
            
            setSession(currentSession);
            setUser(currentSession?.user ?? null);
            
            if (currentSession?.user) {
              setUserRole('user');
              
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

        try {
          const { data: { session: currentSession } } = await supabase.auth.getSession();
          
          if (!mounted) return;
          
          console.log('Initial session check:', { hasSession: !!currentSession });
          
          setSession(currentSession);
          setUser(currentSession?.user ?? null);
          
          if (currentSession?.user) {
            console.log('User found in session:', currentSession.user.email);
            setUserRole('user');
            
            try {
              await checkIsAdmin();
            } catch (e) {
              console.error('Failed to check admin status on initial load:', e);
            }
          } else {
            console.log('No user found in initial session');
          }
        } catch (e) {
          console.error('Error getting initial session:', e);
          if (mounted) {
            setError(e instanceof Error ? e : new Error('Unknown error getting session'));
          }
        } finally {
          if (mounted) {
            setLoading(false);
          }
        }
        
        return () => {
          subscription.unsubscribe();
        };
      } catch (e) {
        console.error('Error setting up auth:', e);
        if (mounted) {
          setLoading(false);
          setError(e instanceof Error ? e : new Error('Unknown error setting up auth'));
        }
      }
    };
    
    setupAuth();
    
    return () => {
      mounted = false; // Cleanup
    };
  }, [checkIsAdmin]);

  const signOut = async () => {
    try {
      setLoading(true);
      await supabase.auth.signOut();
      toast.success('Berhasil keluar dari sistem');
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error('Gagal keluar dari sistem');
    } finally {
      setLoading(false);
    }
  };

  const isValidEmail = useCallback((email: string): boolean => {
    return email.endsWith('@bankraya.co.id');
  }, []);

  const contextValue = useMemo(() => ({
    session,
    user,
    loading,
    userRole,
    isAdmin,
    signOut,
    isValidEmail,
    checkIsAdmin
  }), [session, user, loading, userRole, isAdmin, checkIsAdmin, isValidEmail]);

  console.log("AuthContext value:", { 
    hasUser: !!user, 
    userEmail: user?.email || 'none', 
    loading, 
    role: userRole 
  });

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
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    console.error("useAuth must be used within an AuthProvider");
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
