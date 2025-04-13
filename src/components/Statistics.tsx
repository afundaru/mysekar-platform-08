
import React from 'react';

interface StatItemProps {
  value: string;
  label: string;
  delay: string;
}

const StatItem: React.FC<StatItemProps> = ({ value, label, delay }) => {
  return (
    <div className={`sekar-card text-center animate-slide-up ${delay}`}>
      <div className="text-primary text-xl font-bold">{value}</div>
      <div className="text-xs text-text-secondary">{label}</div>
    </div>
  );
};

const Statistics: React.FC = () => {
  return (
    <section className="px-4 py-6 animate-fade-in">
      <h2 className="text-lg font-semibold mb-4">Statistik</h2>
      <div className="grid grid-cols-3 gap-4">
        <StatItem value="1,234" label="Anggota Aktif" delay="animate-delay-100" />
        <StatItem value="856" label="Kasus Selesai" delay="animate-delay-200" />
        <StatItem value="432" label="Forum Aktif" delay="animate-delay-300" />
      </div>
    </section>
  );
};

export default Statistics;
