
import React, { useState } from 'react';
import ConsultationHeader from '@/components/konsultasi/ConsultationHeader';
import ConsultationOptions from '@/components/konsultasi/ConsultationOptions';
import AvailableConsultants from '@/components/konsultasi/AvailableConsultants';
import ConsultationHistory from '@/components/konsultasi/ConsultationHistory';
import KonsultasiBottomNavigation from '@/components/konsultasi/KonsultasiBottomNavigation';
import LiveChat from '@/components/konsultasi/LiveChat';

const KonsultasiHukum: React.FC = () => {
  const [activeView, setActiveView] = useState<'main' | 'chat'>('main');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Status Bar */}
      <div className="bg-teal h-6"></div>
      
      {activeView === 'main' ? (
        <>
          {/* Header */}
          <ConsultationHeader />
          
          {/* Main Content */}
          <main className="pb-20">
            <ConsultationOptions onStartChat={() => setActiveView('chat')} />
            <AvailableConsultants />
            <ConsultationHistory />
          </main>
          
          {/* Bottom Navigation */}
          <KonsultasiBottomNavigation />
        </>
      ) : (
        <div className="flex flex-col h-[calc(100vh-1.5rem)]">
          <LiveChat />
        </div>
      )}
    </div>
  );
};

export default KonsultasiHukum;
