
import * as React from 'react';

const HeroBanner: React.FC = () => {
  const handleButtonClick = () => {
    console.log('Join button clicked');
  };

  return (
    <section className="relative h-[280px] overflow-hidden animate-fade-in">
      <img 
        className="w-full h-full object-cover transform scale-100 hover:scale-105 transition-transform duration-700 ease-in-out" 
        src="/lovable-uploads/b072f082-c7c7-4c53-8af4-803f834650b5.png" 
        alt="Solidaritas pekerja kantoran dalam demonstrasi" 
      />
      <div className="absolute inset-0 hero-gradient"></div>
      <div className="absolute bottom-0 left-0 p-6 text-white">
        <h1 className="text-2xl font-bold mb-2 animate-slide-up">Salam Solidaritas!</h1>
        <p className="text-sm mb-4 animate-slide-up animate-delay-100">Platform digital terpadu untuk anggota serikat pekerja</p>
        <button 
          onClick={handleButtonClick}
          className="sekar-button-primary animate-slide-up animate-delay-200 transform hover:-translate-y-1">
          Gabung Sekarang
        </button>
      </div>
    </section>
  );
};

export default HeroBanner;
