
import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useNavigate } from "react-router-dom";
import { Suspense } from "react";
import AdminApp from "./AdminApp";
import AdminRoute from "@/components/auth/AdminRoute";

// Error fallback component
const ErrorFallback = ({ error, resetErrorBoundary }) => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-red-500 mb-4">Terjadi Kesalahan</h2>
        <p className="text-gray-600 mb-6">
          {error.message || "Maaf, terjadi kesalahan saat memuat panel admin. Silakan coba refresh halaman ini."}
        </p>
        <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-teal text-white rounded-md hover:bg-teal/90 transition-colors"
          >
            Refresh Halaman
          </button>
          <button 
            onClick={() => {
              resetErrorBoundary();
              navigate('/dashboard');
            }}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
          >
            Kembali ke Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

// Loading fallback
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal"></div>
  </div>
);

const Admin = () => {
  console.log("Admin component rendered - non-lazy version");
  
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<LoadingFallback />}>
        <AdminRoute>
          <AdminApp />
        </AdminRoute>
      </Suspense>
    </ErrorBoundary>
  );
};

export default Admin;
