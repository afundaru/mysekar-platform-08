
import React, { Suspense, lazy, useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import DashboardHeader from '@/components/DashboardHeader';
import MembershipCard from '@/components/MembershipCard';
import { Skeleton } from "@/components/ui/skeleton";
import BottomNavigation from '@/components/BottomNavigation';
import { useAuth } from '@/contexts/AuthContext';

// Lazy load UserProfile component
const UserProfile = lazy(() => import('@/components/user/UserProfile'));

// Error fallback component with proper typing
const ErrorFallback = ({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) => {
  console.error("Error in Profile component:", error);
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
  <div className="p-4 space-y-6">
    <Skeleton className="h-24 w-full rounded-md" />
    <Skeleton className="h-48 w-full rounded-md" />
    <Skeleton className="h-48 w-full rounded-md" />
  </div>
);

const Profile = () => {
  const auth = useAuth();
  
  useEffect(() => {
    console.log("Profile page mounted, auth state:", {
      hasUser: !!auth.user,
      isLoading: auth.loading,
      userEmail: auth.user?.email || 'none'
    });
  }, [auth.user, auth.loading]);
  
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
        <BottomNavigation />
      </ErrorBoundary>
    </div>
  );
};

export default Profile;
