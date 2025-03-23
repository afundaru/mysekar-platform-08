
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import HeroBanner from '@/components/HeroBanner';
import AnnouncementSection from '@/components/AnnouncementSection';
import QuickAccess from '@/components/QuickAccess';
import Statistics from '@/components/Statistics';
import BottomNavigation from '@/components/BottomNavigation';

const Index: React.FC = () => {
  // Use imported useEffect hook directly
  useEffect(() => {
    // Add subtle animation on initial load
    document.body.classList.add('overflow-x-hidden');
    
    // Clean up function to remove the class when component unmounts
    return () => {
      document.body.classList.remove('overflow-x-hidden');
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Status Bar - Fixed at the top */}
      <div className="bg-teal h-6"></div>
      
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <main className="pb-20">
        <HeroBanner />
        <AnnouncementSection />
        <QuickAccess />
        <Statistics />
      </main>
      
      {/* Bottom Navigation - Wrapped in a div to ensure it's only rendered after routing context is available */}
      <BottomNavigation />
    </div>
  );
};

export default Index;
