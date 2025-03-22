
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Form state
  const [fullName, setFullName] = useState('');
  const [pnNumber, setPnNumber] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Form validation
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!fullName) newErrors.fullName = 'Nama lengkap harus diisi';
    if (!pnNumber) newErrors.pnNumber = 'Nomor PN harus diisi';
    if (!email) newErrors.email = 'Email harus diisi';
    else if (!email.endsWith('@bankraya.co.id')) newErrors.email = 'Email harus menggunakan domain @bankraya.co.id';
    if (!phone) newErrors.phone = 'Nomor HP harus diisi';
    if (!password) newErrors.password = 'Password harus diisi';
    else if (password.length < 8) newErrors.password = 'Password minimal 8 karakter';
    if (password !== confirmPassword) newErrors.confirmPassword = 'Konfirmasi password tidak sesuai';
    if (!agreed) newErrors.agreed = 'Anda harus menyetujui syarat dan ketentuan';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            pn_number: pnNumber,
            phone_number: phone
          }
        }
      });
      
      if (error) throw error;
      
      toast.success('Pendaftaran berhasil!');
      navigate('/otp-verification');
    } catch (error: any) {
      console.error('Error during registration:', error);
      toast.error(error.message || 'Terjadi kesalahan saat mendaftar');
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
        
        <h1 className="text-2xl font-bold text-center mb-8">Daftar</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullname" className="text-sm text-gray-600">Nama Lengkap</Label>
            <Input 
              id="fullname"
              type="text" 
              placeholder="Masukkan nama lengkap" 
              className="w-full px-4 py-3 rounded-lg"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="pn" className="text-sm text-gray-600">Nomor PN Bank Raya</Label>
            <Input 
              id="pn"
              type="text" 
              placeholder="Masukkan nomor PN" 
              className="w-full px-4 py-3 rounded-lg"
              value={pnNumber}
              onChange={(e) => setPnNumber(e.target.value)}
            />
            {errors.pnNumber && <p className="text-red-500 text-xs mt-1">{errors.pnNumber}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm text-gray-600">Email</Label>
            <Input 
              id="email"
              type="email" 
              placeholder="Masukkan email @bankraya.co.id" 
              className="w-full px-4 py-3 rounded-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm text-gray-600">Nomor HP</Label>
            <Input 
              id="phone"
              type="tel" 
              placeholder="Masukkan nomor HP" 
              className="w-full px-4 py-3 rounded-lg"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm text-gray-600">Password</Label>
            <div className="relative">
              <Input 
                id="password"
                type={showPassword ? "text" : "password"} 
                placeholder="Min. 8 karakter" 
                className="w-full px-4 py-3 rounded-lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
          
          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-sm text-gray-600">Konfirmasi Password</Label>
            <div className="relative">
              <Input 
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"} 
                placeholder="Ulangi password" 
                className="w-full px-4 py-3 rounded-lg"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button 
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
          </div>
          
          <div className="flex items-start space-x-3">
            <Checkbox 
              id="terms" 
              checked={agreed}
              onCheckedChange={(checked) => setAgreed(checked as boolean)}
              className="mt-1"
            />
            <Label htmlFor="terms" className="text-sm text-gray-600">
              Saya setuju dengan <Link to="/terms" className="text-teal cursor-pointer">Syarat & Ketentuan</Link>
            </Label>
          </div>
          {errors.agreed && <p className="text-red-500 text-xs mt-1">{errors.agreed}</p>}
          
          <Button 
            type="submit" 
            className="w-full bg-teal text-white py-3 rounded-lg font-medium hover:bg-[#006666] transition-colors"
            disabled={!agreed || loading}
          >
            {loading ? 'Memproses...' : 'Daftar'}
          </Button>
        </form>
        
        <div className="mt-6 text-center">
          <span className="text-sm text-gray-500">Sudah punya akun? </span>
          <Link to="/login" className="text-sm text-teal font-medium cursor-pointer">Masuk</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
