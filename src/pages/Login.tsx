
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, Mail } from 'lucide-react';
import { Label } from '@/components/ui/label';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Login logic would go here
    console.log('Login attempt with:', email, password);
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
          </div>
          
          <div className="text-right">
            <Link to="/forgot-password" className="text-sm text-teal cursor-pointer">Lupa Password?</Link>
          </div>
          
          <Button type="submit" className="w-full bg-teal text-white py-3 rounded-lg font-medium hover:bg-[#006666] transition-colors">
            Masuk
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
