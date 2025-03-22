
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

const Register: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Registration logic would go here
    console.log('Registration submitted');
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
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="pn" className="text-sm text-gray-600">Nomor PN Bank Raya</Label>
            <Input 
              id="pn"
              type="text" 
              placeholder="Masukkan nomor PN" 
              className="w-full px-4 py-3 rounded-lg"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm text-gray-600">Email</Label>
            <Input 
              id="email"
              type="email" 
              placeholder="Masukkan email @bankraya.co.id" 
              className="w-full px-4 py-3 rounded-lg"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm text-gray-600">Nomor HP</Label>
            <Input 
              id="phone"
              type="tel" 
              placeholder="Masukkan nomor HP" 
              className="w-full px-4 py-3 rounded-lg"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm text-gray-600">Password</Label>
            <div className="relative">
              <Input 
                id="password"
                type={showPassword ? "text" : "password"} 
                placeholder="Min. 8 karakter" 
                className="w-full px-4 py-3 rounded-lg"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-sm text-gray-600">Konfirmasi Password</Label>
            <div className="relative">
              <Input 
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"} 
                placeholder="Ulangi password" 
                className="w-full px-4 py-3 rounded-lg"
              />
              <button 
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
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
          
          <Button 
            type="submit" 
            className="w-full bg-teal text-white py-3 rounded-lg font-medium hover:bg-[#006666] transition-colors"
            disabled={!agreed}
          >
            Daftar
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
