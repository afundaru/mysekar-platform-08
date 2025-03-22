
import React from 'react';
import Header from '@/components/DashboardHeader';
import QuickOverview from '@/components/QuickOverview';
import MainNavigation from '@/components/MainNavigation';
import RecentActivities from '@/components/RecentActivities';
import DashboardBottomNavigation from '@/components/DashboardBottomNavigation';

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Status Bar */}
      <div className="bg-teal h-6"></div>
      
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <main className="pb-20">
        <QuickOverview />
        <MainNavigation />
        <RecentActivities />
      </main>
      
      {/* Bottom Navigation */}
      <DashboardBottomNavigation />
    </div>
  );
};

export default Dashboard;
