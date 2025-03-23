
import React from 'react';
import UserProfile from '@/components/user/UserProfile';
import DashboardBottomNavigation from '@/components/DashboardBottomNavigation';
import { ErrorBoundary } from 'react-error-boundary';
import DashboardHeader from '@/components/DashboardHeader';

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

const Profile: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Status Bar */}
      <div className="bg-teal h-6"></div>
      
      {/* Header */}
      <DashboardHeader />
      
      {/* Main Content */}
      <main className="p-4 pb-20">
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <UserProfile />
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
