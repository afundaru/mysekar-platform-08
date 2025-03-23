
import React, { Suspense } from 'react';
import UserProfile from '@/components/user/UserProfile';
import DashboardBottomNavigation from '@/components/DashboardBottomNavigation';
import { ErrorBoundary } from 'react-error-boundary';
import DashboardHeader from '@/components/DashboardHeader';
import MembershipCard from '@/components/MembershipCard';
import { BrowserRouter } from 'react-router-dom';

// Error fallback component
const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div className="p-4 text-center">
      <h3 className="text-xl font-bold text-red-500 mb-4">Something went wrong</h3>
      <p className="text-sm text-gray-600 mb-4">{error.message}</p>
      <button
        onClick={resetErrorBoundary}
        className="px-4 py-2 bg-teal text-white rounded-md hover:bg-teal-600 transition-colors"
      >
        Try again
      </button>
    </div>
  );
};

// Loading fallback
const LoadingFallback = () => (
  <div className="p-4 flex justify-center">
    <div className="w-8 h-8 border-4 border-teal border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const Profile = () => {
  // The issue is that we're using useNavigate in UserProfile but it's not within a Router context
  // We need to ensure Router context is available
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Status Bar */}
      <div className="bg-teal h-6"></div>
      
      {/* Header */}
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <DashboardHeader />
      </ErrorBoundary>
      
      {/* Main Content */}
      <main className="p-4 pb-20">
        <ErrorBoundary 
          FallbackComponent={ErrorFallback}
          onReset={() => window.location.reload()}
        >
          <Suspense fallback={<LoadingFallback />}>
            <UserProfile />
          </Suspense>
        </ErrorBoundary>
        
        {/* Membership Card */}
        <div className="mt-6">
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Suspense fallback={<LoadingFallback />}>
              <MembershipCard />
            </Suspense>
          </ErrorBoundary>
        </div>
      </main>
      
      {/* Bottom Navigation */}
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <DashboardBottomNavigation />
      </ErrorBoundary>
    </div>
  );
};

export default Profile;
