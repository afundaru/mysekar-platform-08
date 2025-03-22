
import React from 'react';

const ConsultantCard: React.FC<{
  name: string;
  specialty: string;
  image: string;
  isOnline: boolean;
}> = ({ name, specialty, image, isOnline }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <img src={image} alt={name} className="w-12 h-12 rounded-full" />
        <div>
          <h3 className="text-sm font-medium">{name}</h3>
          <p className="text-xs text-gray-500">{specialty}</p>
        </div>
      </div>
      <div className="flex items-center">
        <span 
          className={`inline-block w-2 h-2 ${isOnline ? 'bg-green-500' : 'bg-gray-400'} rounded-full mr-2`}
        ></span>
        <span 
          className={`text-xs ${isOnline ? 'text-green-500' : 'text-gray-400'}`}
        >
          {isOnline ? 'Online' : 'Offline'}
        </span>
      </div>
    </div>
  );
};

const AvailableConsultants: React.FC = () => {
  const consultants = [
    {
      id: 1,
      name: 'Budi Prakoso, S.H.',
      specialty: 'Spesialis Hukum Ketenagakerjaan',
      image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg',
      isOnline: true,
    },
    {
      id: 2,
      name: 'Diana Putri, S.H.',
      specialty: 'Hukum Perburuhan',
      image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg',
      isOnline: false,
    },
  ];

  return (
    <section className="px-4 py-6 bg-[#F5F5F5]">
      <h2 className="text-lg font-semibold mb-4">Konsultan Tersedia</h2>
      <div className="space-y-4">
        {consultants.map((consultant) => (
          <ConsultantCard
            key={consultant.id}
            name={consultant.name}
            specialty={consultant.specialty}
            image={consultant.image}
            isOnline={consultant.isOnline}
          />
        ))}
      </div>
    </section>
  );
};

export default AvailableConsultants;
