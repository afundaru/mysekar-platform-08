
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { toast } from 'sonner';

interface SignOutButtonProps {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  showIcon?: boolean;
  className?: string;
}

const SignOutButton: React.FC<SignOutButtonProps> = ({ 
  variant = "default", 
  showIcon = true,
  className = ""
}) => {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success('Berhasil keluar');
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error('Gagal keluar. Silakan coba lagi.');
    }
  };

  return (
    <Button 
      variant={variant} 
      onClick={handleSignOut}
      className={className}
    >
      {showIcon && <LogOut className="h-4 w-4 mr-2" />}
      Keluar
    </Button>
  );
};

export default SignOutButton;
