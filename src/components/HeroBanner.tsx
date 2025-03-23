
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const HeroBanner: React.FC = () => {
  const navigate = useNavigate();

  const handleJoinNow = () => {
    navigate('/register');
  };

  return (
    <section className="relative h-[320px] md:h-[480px] lg:h-[560px] overflow-hidden animate-fade-in">
      <img 
        className="w-full h-full object-cover transform scale-100 hover:scale-105 transition-transform duration-700 ease-in-out" 
        src="/lovable-uploads/df060fa2-45df-45d3-afbf-d30515f01ae2.png" 
        alt="Professional workers with raised fists and digital technology background" 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-teal/20"></div>
      <div className="absolute bottom-0 left-0 p-6 md:p-8 lg:p-10 text-white max-w-2xl">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 animate-slide-up">Salam Solidaritas!</h1>
        <p className="text-sm md:text-base lg:text-lg mb-4 md:mb-6 animate-slide-up animate-delay-100 max-w-lg">
          Platform digital terpadu untuk anggota serikat pekerja SEKAR. Bersama kita maju, bersatu dalam teknologi.
        </p>
        <Button 
          onClick={handleJoinNow}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 md:px-8 md:py-3 rounded-full hover:bg-opacity-90 transition-all duration-300 shadow-md hover:shadow-lg animate-slide-up animate-delay-200 transform hover:-translate-y-1"
        >
          Gabung Sekarang
        </Button>
      </div>
    </section>
  );
};

export default HeroBanner;
