
import React, { useState } from 'react';
import PengaduanHeader from '../components/pengaduan/PengaduanHeader';
import QuickActions from '../components/pengaduan/QuickActions';
import ComplaintForm from '../components/pengaduan/ComplaintForm';
import ComplaintHistory from '../components/pengaduan/ComplaintHistory';
import PengaduanBottomNavigation from '../components/pengaduan/PengaduanBottomNavigation';

const Pengaduan: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'form' | 'history'>('form');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Status Bar */}
      <div className="bg-teal h-6"></div>
      
      <PengaduanHeader />
      
      <main className="pb-20">
        <QuickActions 
          onNewComplaint={() => setActiveSection('form')} 
          onHistory={() => setActiveSection('history')} 
        />
        
        {activeSection === 'form' ? (
          <ComplaintForm />
        ) : (
          <ComplaintHistory />
        )}
      </main>
      
      <PengaduanBottomNavigation />
    </div>
  );
};

export default Pengaduan;
