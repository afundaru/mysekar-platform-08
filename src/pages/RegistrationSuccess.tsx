
import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const RegistrationSuccess: React.FC = () => {
  const navigate = useNavigate();

  const handleGoToDashboard = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Status Bar */}
      <div className="bg-teal h-6"></div>

      <div className="px-6 py-8 text-center">
        <div className="flex justify-center mb-8">
          <h1 className="text-2xl font-bold text-teal">MySEKAR</h1>
        </div>
        
        <div className="mb-8">
          <CheckCircle className="h-24 w-24 text-teal mx-auto" />
        </div>
        
        <h1 className="text-2xl font-bold mb-4">Pendaftaran Berhasil</h1>
        <p className="text-gray-600 mb-8">Akun Anda telah berhasil dibuat</p>
        
        <Button 
          onClick={handleGoToDashboard}
          className="w-full bg-teal text-white py-3 rounded-lg font-medium hover:bg-[#006666] transition-colors"
        >
          Masuk ke Dashboard
        </Button>
      </div>
    </div>
  );
};

export default RegistrationSuccess;
