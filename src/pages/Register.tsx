
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '@/components/auth/AuthLayout';
import RegisterForm from '@/components/auth/RegisterForm';

const Register: React.FC = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate('/registration-success');
  };

  const footerContent = (
    <>
      <span className="text-sm text-gray-500">Sudah punya akun? </span>
      <Link to="/login" className="text-sm text-teal font-medium cursor-pointer">Masuk</Link>
    </>
  );

  return (
    <AuthLayout title="Daftar" footer={footerContent}>
      <RegisterForm onSuccess={handleSuccess} />
    </AuthLayout>
  );
};

export default Register;
