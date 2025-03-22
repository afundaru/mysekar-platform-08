
import React, { useState } from 'react';
import { ArrowLeft, Send, Paperclip } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useNavigate } from 'react-router-dom';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'consultant';
  timestamp: Date;
}

const LiveChat: React.FC = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Selamat datang di layanan konsultasi hukum. Saya Budi Prakoso, saya akan membantu menjawab pertanyaan Anda mengenai masalah ketenagakerjaan.',
      sender: 'consultant',
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
      
      // Simulate consultant response
      setTimeout(() => {
        const consultantMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: "Baik, terima kasih atas pertanyaan Anda. Mohon beri saya waktu sebentar untuk menyiapkan informasi yang tepat untuk kasus Anda.",
          sender: 'consultant',
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, consultantMessage]);
      }, 1500);
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
        <Avatar className="h-10 w-10 mr-3">
          <AvatarImage src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg" alt="Budi Prakoso" />
          <AvatarFallback>BP</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-base font-semibold">Budi Prakoso, S.H.</h1>
          <div className="flex items-center">
            <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            <span className="text-xs text-green-500">Online</span>
          </div>
        </div>
      </header>

      {/* Chat Area */}
      <div className="flex-1 p-4 overflow-auto">
        <div className="space-y-4">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.sender === 'consultant' && (
                <Avatar className="h-8 w-8 mr-2 mt-1">
                  <AvatarImage src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg" alt="Budi Prakoso" />
                  <AvatarFallback>BP</AvatarFallback>
                </Avatar>
              )}
              <Card 
                className={`p-3 max-w-[75%] ${
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
          <Button variant="outline" className="p-2">
            <Paperclip className="h-5 w-5" />
          </Button>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ketik pesan Anda..."
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

export default LiveChat;
