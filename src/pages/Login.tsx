
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, Mail } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import AuthLayout from '@/components/auth/AuthLayout';

const Login = () => {
  const navigate = useNavigate();
  const { isValidEmail } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Check if user is already logged in
  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        if (data.session) {
          navigate('/dashboard');
        }
      } catch (error) {
        console.error("Error checking session:", error);
      }
    };
    
    checkSession();
  }, [navigate]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!email) newErrors.email = 'Email harus diisi';
    else if (!isValidEmail(email)) newErrors.email = 'Email harus menggunakan domain @bankraya.co.id';
    if (!password) newErrors.password = 'Password harus diisi';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    
    // Clear the error when typing
    if (errors.email) {
      setErrors(prev => {
        const updated = { ...prev };
        delete updated.email;
        return updated;
      });
    }
    
    // Add validation error if email doesn't end with @bankraya.co.id
    if (value && !isValidEmail(value)) {
      setErrors(prev => ({
        ...prev,
        email: 'Email harus menggunakan domain @bankraya.co.id'
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    // Double check email domain
    if (!isValidEmail(email)) {
      setErrors(prev => ({
        ...prev,
        email: 'Email harus menggunakan domain @bankraya.co.id'
      }));
      toast.error('Email harus menggunakan domain @bankraya.co.id');
      return;
    }
    
    setLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) throw error;
      
      toast.success('Login berhasil!');
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Error during login:', error);
      toast.error(error.message || 'Email atau password salah');
    } finally {
      setLoading(false);
    }
  };

  const footerContent = (
    <>
      <span className="text-sm text-gray-500">Belum punya akun? </span>
      <Link to="/register" className="text-sm text-teal font-medium cursor-pointer">Daftar</Link>
    </>
  );

  return (
    <AuthLayout title="Masuk" footer={footerContent}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm text-gray-600">Email</Label>
          <div className="relative">
            <Input
              id="email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Masukkan email @bankraya.co.id"
              className="w-full px-4 py-3 rounded-lg border border-gray-200"
            />
            <Mail className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
          </div>
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm text-gray-600">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan password"
              className="w-full px-4 py-3 rounded-lg border border-gray-200"
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
          {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
        </div>
        
        <div className="text-right">
          <Link to="/forgot-password" className="text-sm text-teal cursor-pointer">Lupa Password?</Link>
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-teal text-white py-3 rounded-lg font-medium hover:bg-[#006666] transition-colors"
          disabled={loading}
        >
          {loading ? 'Memproses...' : 'Masuk'}
        </Button>
      </form>
    </AuthLayout>
  );
};

export default Login;
