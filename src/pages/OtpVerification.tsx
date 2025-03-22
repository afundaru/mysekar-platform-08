
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const OtpVerification: React.FC = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  
  // Initialize refs array
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 6);
  }, []);

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

  const handleVerify = () => {
    const otpValue = otp.join('');
    console.log('Verifying OTP:', otpValue);
    // Verification logic would go here
  };

  const handleResendOtp = () => {
    console.log('Resending OTP');
    // Resend OTP logic would go here
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
          disabled={otp.some(digit => !digit)}
        >
          Verifikasi
        </Button>
        
        <div className="text-center">
          <Button 
            variant="link" 
            onClick={handleResendOtp} 
            className="text-sm text-teal"
          >
            Kirim Ulang OTP
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OtpVerification;
