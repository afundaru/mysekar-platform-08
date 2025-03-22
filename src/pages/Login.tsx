
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, Mail } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Check if user is already logged in
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        navigate('/dashboard');
      }
    };
    
    checkSession();
  }, [navigate]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!email) newErrors.email = 'Email harus diisi';
    if (!password) newErrors.password = 'Password harus diisi';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Status Bar */}
      <div className="bg-teal h-6"></div>

      <div className="px-6 py-8">
        <div className="flex justify-center mb-8">
          <h1 className="text-2xl font-bold text-teal">MySEKAR</h1>
        </div>
        
        <h1 className="text-2xl font-bold text-center mb-8">Masuk</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm text-gray-600">Email</Label>
            <div className="relative">
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
        
        <div className="mt-6 text-center">
          <span className="text-sm text-gray-500">Belum punya akun? </span>
          <Link to="/register" className="text-sm text-teal font-medium cursor-pointer">Daftar</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
