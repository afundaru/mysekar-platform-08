
import React, { useState } from 'react';
import { ArrowLeft, Send } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const AIConsultation: React.FC = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Halo! Saya adalah AI asisten hukum. Apa yang bisa saya bantu terkait pertanyaan hukum ketenagakerjaan Anda?',
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);

  const handleSend = () => {
    if (input.trim()) {
      // Add user message
      const userMessage: Message = {
        id: Date.now().toString(),
        content: input,
        sender: 'user',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, userMessage]);
      setInput('');
      
      // Simulate AI response
      setTimeout(() => {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: "Terima kasih atas pertanyaan Anda. Mohon tunggu sementara saya mencari informasi yang relevan tentang hukum ketenagakerjaan.",
          sender: 'ai',
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, aiMessage]);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Status Bar */}
      <div className="bg-teal h-6"></div>
      
      {/* Header */}
      <header className="bg-white px-4 py-3 flex items-center shadow-sm">
        <button 
          className="mr-4"
          onClick={() => navigate('/konsultasi-hukum')}
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-lg font-semibold">Chatbot AI Hukum</h1>
      </header>

      {/* Chat Area */}
      <div className="flex-1 p-4 overflow-auto">
        <div className="space-y-4">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <Card 
                className={`p-3 max-w-[80%] ${
                  message.sender === 'user' 
                    ? 'bg-teal text-white' 
                    : 'bg-white'
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <p className="text-xs mt-1 opacity-70">
                  {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </p>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-white p-4 border-t">
        <div className="flex space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ketik pertanyaan hukum Anda..."
            className="flex-1"
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <Button 
            onClick={handleSend}
            className="bg-teal hover:bg-teal/90"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AIConsultation;
