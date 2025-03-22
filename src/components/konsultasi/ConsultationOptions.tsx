
import React from 'react';
import { Bot, MessageSquare } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

const ConsultationOptions: React.FC = () => {
  const navigate = useNavigate();

  const handleAIConsultation = () => {
    navigate('/konsultasi-hukum/ai');
  };

  const handleLiveConsultation = () => {
    navigate('/konsultasi-hukum/live');
  };

  return (
    <section className="px-4 py-6">
      <div className="grid grid-cols-2 gap-4">
        <Card 
          className="p-6 text-center cursor-pointer hover:shadow-md transition-shadow"
          onClick={handleAIConsultation}
        >
          <Bot className="text-teal h-8 w-8 mx-auto mb-3" />
          <h3 className="text-sm font-medium">Chatbot AI Hukum</h3>
          <p className="text-xs text-gray-500 mt-1">Jawaban cepat 24/7</p>
        </Card>
        <Card 
          className="p-6 text-center cursor-pointer hover:shadow-md transition-shadow"
          onClick={handleLiveConsultation}
        >
          <MessageSquare className="text-teal h-8 w-8 mx-auto mb-3" />
          <h3 className="text-sm font-medium">Live Chat Konsultan</h3>
          <p className="text-xs text-gray-500 mt-1">Konsultasi dengan ahli</p>
        </Card>
      </div>
    </section>
  );
};

export default ConsultationOptions;
