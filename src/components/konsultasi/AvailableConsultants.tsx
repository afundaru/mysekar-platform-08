
import React from 'react';
import { Card } from '@/components/ui/card';

interface Consultant {
  id: string;
  name: string;
  specialization: string;
  avatar: string;
  isOnline: boolean;
}

const consultantsList: Consultant[] = [
  {
    id: '1',
    name: 'Budi Prakoso, S.H.',
    specialization: 'Spesialis Hukum Ketenagakerjaan',
    avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg',
    isOnline: true,
  },
  {
    id: '2',
    name: 'Diana Putri, S.H.',
    specialization: 'Hukum Perburuhan',
    avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg',
    isOnline: false,
  }
];

const AvailableConsultants: React.FC = () => {
  return (
    <section className="px-4 py-6 bg-gray-50">
      <h2 className="text-lg font-semibold mb-4">Konsultan Tersedia</h2>
      <div className="space-y-4">
        {consultantsList.map(consultant => (
          <Card key={consultant.id} className="p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img 
                src={consultant.avatar} 
                alt={consultant.name} 
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="text-sm font-medium">{consultant.name}</h3>
                <p className="text-xs text-gray-500">{consultant.specialization}</p>
              </div>
            </div>
            <div className="flex items-center">
              <span className={`inline-block w-2 h-2 ${consultant.isOnline ? 'bg-green-500' : 'bg-gray-400'} rounded-full mr-2`}></span>
              <span className={`text-xs ${consultant.isOnline ? 'text-green-500' : 'text-gray-400'}`}>
                {consultant.isOnline ? 'Online' : 'Offline'}
              </span>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default AvailableConsultants;
