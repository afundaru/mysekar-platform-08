
import React from 'react';
import { Bell, Settings } from 'lucide-react';
import ConsultationOptions from '@/components/konsultasi/ConsultationOptions';
import AvailableConsultants from '@/components/konsultasi/AvailableConsultants';
import ConsultationHistory from '@/components/konsultasi/ConsultationHistory';
import KonsultasiBottomNavigation from '@/components/konsultasi/KonsultasiBottomNavigation';

const KonsultasiHukum: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 pb-20">
      {/* Status Bar */}
      <div className="bg-teal h-6"></div>
      
      {/* Header */}
      <header className="bg-white px-4 py-3 flex justify-between items-center shadow-sm">
        <div className="flex items-center">
          <h1 className="text-lg font-semibold">Konsultasi Hukum</h1>
        </div>
        <div className="flex items-center space-x-4">
          <button className="text-gray-600">
            <Bell className="h-5 w-5" />
          </button>
          <button className="text-gray-600">
            <Settings className="h-5 w-5" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="pb-20">
        {/* Consultation Options */}
        <ConsultationOptions />

        {/* Available Consultants */}
        <AvailableConsultants />

        {/* Consultation History */}
        <ConsultationHistory />
      </main>

      {/* Bottom Navigation */}
      <KonsultasiBottomNavigation />
    </div>
  );
};

export default KonsultasiHukum;
