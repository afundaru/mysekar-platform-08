
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import HeroBanner from '@/components/HeroBanner';
import AnnouncementSection from '@/components/AnnouncementSection';
import QuickAccess from '@/components/QuickAccess';
import Statistics from '@/components/Statistics';
import BottomNavigation from '@/components/BottomNavigation';

const Index: React.FC = () => {
  // Add subtle animation on initial load
  useEffect(() => {
    document.body.classList.add('overflow-x-hidden');
    
    return () => {
      document.body.classList.remove('overflow-x-hidden');
    };
  }, []);

  return (
    <div className="min-h-screen bg-bg-dark">
      {/* Status Bar - Fixed at the top */}
      <div className="bg-primary h-6"></div>
      
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <main className="pb-20">
        <HeroBanner />
        <AnnouncementSection />
        <QuickAccess />
        <Statistics />
      </main>
      
      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default Index;
