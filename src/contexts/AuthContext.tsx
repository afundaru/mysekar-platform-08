
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session, User, AuthError } from '@supabase/supabase-js';
import { useToast } from '@/components/ui/use-toast';

type AuthContextType = {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<{
    error: AuthError | null;
    data: { session: Session | null };
  }>;
  signUp: (email: string, password: string, phone: string, pnNumber: string, fullName: string) => Promise<{
    error: AuthError | null;
    data: { session: Session | null };
  }>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth state changed:', event, session);
        setSession(session);
        setUser(session?.user ?? null);

        if (event === 'SIGNED_IN') {
          toast({
            title: 'Berhasil masuk',
            description: 'Selamat datang kembali!',
          });
        } else if (event === 'SIGNED_OUT') {
          toast({
            title: 'Berhasil keluar',
            description: 'Sampai jumpa kembali!',
          });
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    const response = await supabase.auth.signInWithPassword({ email, password });
    setIsLoading(false);
    return {
      error: response.error,
      data: { session: response.data.session }
    };
  };

  const signUp = async (
    email: string, 
    password: string, 
    phone: string, 
    pnNumber: string, 
    fullName: string
  ) => {
    setIsLoading(true);
    const response = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          phone_number: phone,
          pn_number: pnNumber,
          full_name: fullName,
        }
      }
    });
    setIsLoading(false);
    return {
      error: response.error,
      data: { session: response.data.session }
    };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isLoading,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
