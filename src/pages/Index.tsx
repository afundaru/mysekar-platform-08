
import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import HeroBanner from '@/components/HeroBanner';
import AnnouncementSection from '@/components/AnnouncementSection';
import QuickAccess from '@/components/QuickAccess';
import Statistics from '@/components/Statistics';
import BottomNavigation from '@/components/BottomNavigation';

const Index: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    
    return () => clearInterval(timer);
  }, []);
  
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
      {/* Status Bar - Fixed at the top with context */}
      <div className="bg-teal h-6 flex items-center justify-between px-4">
        <span className="text-xs text-white font-medium" role="status">MySEKAR</span>
        <span className="text-xs text-white" role="status">
          {currentTime.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
      
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <main className="pb-20" role="main" aria-label="Home Page Content">
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
