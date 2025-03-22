
import React from 'react';
import { Bot, MessageSquare } from 'lucide-react';

const ConsultationOptions: React.FC = () => {
  return (
    <section className="px-4 py-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm text-center">
          <Bot className="h-12 w-12 text-teal mx-auto mb-3" />
          <h3 className="text-sm font-medium">Chatbot AI Hukum</h3>
          <p className="text-xs text-gray-500 mt-1">Jawaban cepat 24/7</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm text-center">
          <MessageSquare className="h-12 w-12 text-teal mx-auto mb-3" />
          <h3 className="text-sm font-medium">Live Chat Konsultan</h3>
          <p className="text-xs text-gray-500 mt-1">Konsultasi dengan ahli</p>
        </div>
      </div>
    </section>
  );
};

export default ConsultationOptions;
