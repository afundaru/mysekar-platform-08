
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

const OtpVerification: React.FC = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  
  // Initialize refs array
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 6);
  }, []);

  // Handle countdown for resend OTP
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setResendDisabled(false);
    }
  }, [countdown]);

  const handleChange = (index: number, value: string) => {
    // Only allow numbers
    if (value && !/^\d*$/.test(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value.slice(0, 1); // Take only the first character
    setOtp(newOtp);
    
    // Auto-focus next input after entering a digit
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    // Navigate backward on backspace if current field is empty
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const otpValue = otp.join('');
    if (otpValue.length !== 6) {
      toast.error('Kode OTP harus 6 digit');
      return;
    }
    
    setLoading(true);
    
    try {
      // In a real production app, you would verify the OTP with your backend
      // For simplicity in this demo, we'll simulate a successful verification
      toast.success('Verifikasi OTP berhasil!');
      navigate('/registration-success');
    } catch (error: any) {
      console.error('Error during OTP verification:', error);
      toast.error(error.message || 'Kode OTP tidak valid');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setResendDisabled(true);
    setCountdown(60); // Disable for 60 seconds
    
    try {
      // Note: In a real app, you would need to store the user's email in state or context
      // For this example, we're just showing the UI flow
      toast.success('Kode OTP baru telah dikirim ke email Anda');
    } catch (error: any) {
      console.error('Error resending OTP:', error);
      toast.error(error.message || 'Gagal mengirim ulang kode OTP');
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
        
        <h1 className="text-2xl font-bold text-center mb-4">Verifikasi OTP</h1>
        <p className="text-center text-gray-600 text-sm mb-8">
          Masukkan kode OTP yang dikirim ke email Anda
        </p>
        
        <div className="flex justify-center space-x-3 mb-6">
          {[0, 1, 2, 3, 4, 5].map((index) => (
            <Input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              value={otp[index]}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-12 text-center text-xl"
              maxLength={1}
              inputMode="numeric"
              autoComplete="one-time-code"
            />
          ))}
        </div>
        
        <Button 
          onClick={handleVerify} 
          className="w-full bg-teal text-white py-3 rounded-lg font-medium hover:bg-[#006666] transition-colors mb-4"
          disabled={otp.some(digit => !digit) || loading}
        >
          {loading ? 'Memproses...' : 'Verifikasi'}
        </Button>
        
        <div className="text-center">
          <Button 
            variant="link" 
            onClick={handleResendOtp} 
            className="text-sm text-teal"
            disabled={resendDisabled}
          >
            {resendDisabled 
              ? `Kirim Ulang OTP (${countdown}s)` 
              : 'Kirim Ulang OTP'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OtpVerification;
