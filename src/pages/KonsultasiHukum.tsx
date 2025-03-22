
import React from 'react';
import ConsultationHeader from '@/components/konsultasi/ConsultationHeader';
import ConsultationOptions from '@/components/konsultasi/ConsultationOptions';
import AvailableConsultants from '@/components/konsultasi/AvailableConsultants';
import ConsultationHistory from '@/components/konsultasi/ConsultationHistory';
import KonsultasiBottomNavigation from '@/components/konsultasi/KonsultasiBottomNavigation';

const KonsultasiHukum: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Status Bar */}
      <div className="bg-teal h-6"></div>
      
      {/* Header */}
      <ConsultationHeader />
      
      {/* Main Content */}
      <main className="pb-20">
        <ConsultationOptions />
        <AvailableConsultants />
        <ConsultationHistory />
      </main>
      
      {/* Bottom Navigation */}
      <KonsultasiBottomNavigation />
    </div>
  );
};

export default KonsultasiHukum;
