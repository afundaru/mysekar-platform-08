
import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '@/components/auth/AuthLayout';

const RegistrationSuccess: React.FC = () => {
  const navigate = useNavigate();

  const handleGoToDashboard = () => {
    navigate('/login');
  };

  return (
    <AuthLayout title="">
      <div className="text-center">
        <div className="mb-8">
          <CheckCircle className="h-24 w-24 text-teal mx-auto" />
        </div>
        
        <h1 className="text-2xl font-bold mb-4">Pendaftaran Berhasil</h1>
        <p className="text-gray-600 mb-4">Silahkan verifikasi email @bankraya.co.id Anda untuk melanjutkan</p>
        <p className="text-gray-500 mb-8 text-sm">Kami telah mengirimkan email verifikasi ke alamat email yang Anda daftarkan</p>
        
        <Button 
          onClick={handleGoToDashboard}
          className="w-full bg-teal text-white py-3 rounded-lg font-medium hover:bg-[#006666] transition-colors"
        >
          Masuk ke Akun
        </Button>
      </div>
    </AuthLayout>
  );
};

export default RegistrationSuccess;
