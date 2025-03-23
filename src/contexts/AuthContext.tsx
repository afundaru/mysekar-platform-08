
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

  // Function to check admin status
  const checkIsAdmin = useCallback(async (): Promise<boolean> => {
    if (!user) return false;
    
    try {
      // Add timeout for the request
      const timeoutPromise = new Promise<{data: null, error: Error}>((_, reject) => {
        setTimeout(() => reject(new Error('Request timeout')), 10000);
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
        return false;
      }
      
      const isUserAdmin = !!data;
      setIsAdmin(isUserAdmin);
      setUserRole(isUserAdmin ? 'admin' : 'user');
      return isUserAdmin;
    } catch (error) {
      console.error('Error checking admin status:', error);
      // Don't change existing state on error
      return isAdmin; // Return current state
    }
  }, [user, isAdmin]);

  useEffect(() => {
    // Set up auth state listener
    const setupAuth = async () => {
      try {
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          async (event, currentSession) => {
            // Enhanced logging for auth events
            console.log('Auth event:', event);
            
            setSession(currentSession);
            setUser(currentSession?.user ?? null);
            
            if (currentSession?.user) {
              try {
                await checkIsAdmin();
              } catch (e) {
                console.error('Failed to check admin status after auth change:', e);
                // Set default role
                setUserRole('user');
              }
            } else {
              setIsAdmin(false);
              setUserRole(null);
            }
            
            setLoading(false);
          }
        );

        // Check for existing session
        const { data: { session: currentSession } } = await supabase.auth.getSession();
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        if (currentSession?.user) {
          try {
            await checkIsAdmin();
          } catch (e) {
            console.error('Failed to check admin status on initial load:', e);
            // Set default role
            setUserRole('user');
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
      // Clear any cached data after sign out
      toast.success('Berhasil keluar dari sistem');
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error('Gagal keluar dari sistem');
    }
  };

  // Memoized function to validate email domain
  const isValidEmail = useCallback((email: string): boolean => {
    return email.endsWith('@bankraya.co.id');
  }, []);

  // Memoized context value
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
    // Render an error state rather than crashing the app
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

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Create the useAuth hook with null-check
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
