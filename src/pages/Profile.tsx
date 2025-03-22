
import React from 'react';
import UserProfile from '@/components/user/UserProfile';
import DashboardBottomNavigation from '@/components/DashboardBottomNavigation';

const Profile: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Status Bar */}
      <div className="bg-teal h-6"></div>
      
      {/* Main Content */}
      <main className="p-4 pb-20">
        <UserProfile />
      </main>
      
      {/* Bottom Navigation */}
      <DashboardBottomNavigation />
    </div>
  );
};

export default Profile;
