
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  console.log("ProtectedRoute state:", { 
    hasUser: !!user, 
    userEmail: user?.email || 'none',
    loading, 
    path: location.pathname 
  });

  // If still loading, show nothing or a loading indicator
  if (loading) {
    return (
      <div className="flex justify-center items-center h-16 my-4">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-teal"></div>
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!user) {
    console.log("User not authenticated, redirecting to login");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If authenticated, render the protected content
  console.log("User authenticated, rendering protected content");
  return <>{children}</>;
};

export default ProtectedRoute;
