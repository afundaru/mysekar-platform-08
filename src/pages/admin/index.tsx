
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import AdminApp from "./AdminApp";
import AdminRoute from "@/components/auth/AdminRoute";

// Error fallback component
const ErrorFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center">
      <h2 className="text-2xl font-bold text-red-500 mb-4">Terjadi Kesalahan</h2>
      <p className="text-gray-600 mb-6">
        Maaf, terjadi kesalahan saat memuat panel admin. Silakan coba refresh halaman ini.
      </p>
      <button 
        onClick={() => window.location.reload()}
        className="px-4 py-2 bg-teal text-white rounded-md hover:bg-teal/90 transition-colors"
      >
        Refresh Halaman
      </button>
    </div>
  </div>
);

// Loading fallback
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal"></div>
  </div>
);

const Admin = () => {
  // Add console.log to help debug
  console.log("Admin component rendered");
  
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
