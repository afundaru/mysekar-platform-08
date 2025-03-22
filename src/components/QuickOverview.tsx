
import React, { useState } from 'react';
import { CreditCard, FileCheck } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import MembershipCard from './MembershipCard';

const QuickOverview: React.FC = () => {
  const [showMembershipCard, setShowMembershipCard] = useState(false);

  return (
    <section className="p-4">
      <div className="grid grid-cols-2 gap-4">
        <div 
          className="bg-teal p-4 rounded-lg text-white cursor-pointer transition-transform hover:scale-105 active:scale-95"
          onClick={() => setShowMembershipCard(true)}
        >
          <CreditCard className="h-6 w-6 mb-2" />
          <h3 className="text-sm font-medium">Status Keanggotaan</h3>
          <p className="text-xs mt-1">Aktif hingga Des 2025</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <FileCheck className="h-6 w-6 mb-2 text-teal" />
          <h3 className="text-sm font-medium">Pengaduan Aktif</h3>
          <p className="text-xs text-gray-500 mt-1">2 dalam proses</p>
        </div>
      </div>

      <Dialog open={showMembershipCard} onOpenChange={setShowMembershipCard}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Kartu Anggota Digital</DialogTitle>
          </DialogHeader>
          <MembershipCard />
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default QuickOverview;
