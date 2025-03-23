
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const HeroBanner: React.FC = () => {
  const navigate = useNavigate();

  const handleJoinNow = () => {
    navigate('/register');
  };

  return (
    <section className="relative h-[320px] md:h-[400px] overflow-hidden animate-fade-in">
      <img 
        className="w-full h-full object-cover transform scale-100 hover:scale-105 transition-transform duration-700 ease-in-out" 
        src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80" 
        alt="Professional workers in a modern industrial setting" 
      />
      <div className="absolute inset-0 hero-gradient"></div>
      <div className="absolute bottom-0 left-0 p-6 text-white">
        <h1 className="text-2xl md:text-3xl font-bold mb-2 animate-slide-up">Salam Solidaritas!</h1>
        <p className="text-sm md:text-base mb-4 animate-slide-up animate-delay-100">Platform digital terpadu untuk anggota serikat pekerja</p>
        <Button 
          onClick={handleJoinNow}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full hover:bg-opacity-90 transition-all duration-300 shadow-md hover:shadow-lg animate-slide-up animate-delay-200 transform hover:-translate-y-1"
        >
          Gabung Sekarang
        </Button>
      </div>
    </section>
  );
};

export default HeroBanner;
