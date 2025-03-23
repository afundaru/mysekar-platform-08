
import React, { Suspense } from 'react';
import { BrowserRouter as Router, useNavigate } from 'react-router-dom';
import UserProfile from '@/components/user/UserProfile';
import DashboardBottomNavigation from '@/components/DashboardBottomNavigation';
import { ErrorBoundary } from 'react-error-boundary';
import DashboardHeader from '@/components/DashboardHeader';
import MembershipCard from '@/components/MembershipCard';

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

// Separate component for the UserProfile to isolate routing issues
const UserProfileWithErrorBoundary = () => {
  return (
    <ErrorBoundary 
      FallbackComponent={ErrorFallback}
      onReset={() => window.location.reload()}
    >
      <Suspense fallback={<LoadingFallback />}>
        <UserProfile />
      </Suspense>
    </ErrorBoundary>
  );
};

const Profile: React.FC = () => {
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
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Suspense fallback={<LoadingFallback />}>
            <UserProfileWithErrorBoundary />
          </Suspense>
        </ErrorBoundary>
      </main>
      
      {/* Bottom Navigation */}
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <DashboardBottomNavigation />
      </ErrorBoundary>
    </div>
  );
};

export default Profile;
