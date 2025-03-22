
import React, { useState } from 'react';
import { Send, Paperclip, Check, User, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

interface Consultant {
  id: number;
  name: string;
  status: 'Online' | 'Offline';
  expertise: string;
  image?: string;
}

interface Message {
  text: string;
  sender: 'user' | 'consultant';
  status: 'Sent' | 'Delivered' | 'Read';
  file?: File | null;
  timestamp: Date;
}

const LiveChat: React.FC = () => {
  const navigate = useNavigate();
  const [selectedConsultant, setSelectedConsultant] = useState<Consultant | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const consultants: Consultant[] = [
    { 
      id: 1, 
      name: "Budi Prakoso, S.H.", 
      status: "Online", 
      expertise: "Spesialis Hukum Ketenagakerjaan",
      image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg"
    },
    { 
      id: 2, 
      name: "Diana Putri, S.H.", 
      status: "Offline", 
      expertise: "Hukum Perburuhan",
      image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg"
    },
  ];

  const sendMessage = () => {
    if (message.trim() || file) {
      const newMessage: Message = {
        text: message,
        sender: 'user',
        status: 'Sent',
        file: file,
        timestamp: new Date(),
      };
      
      setMessages([...messages, newMessage]);
      setMessage('');
      setFile(null);
      
      // Simulate message being read after 2 seconds
      setTimeout(() => {
        setMessages((prev) => 
          prev.map((msg, i) => 
            i === prev.length - 1 ? { ...msg, status: 'Read' } : msg
          )
        );
      }, 2000);
      
      // Simulate consultant response after 3 seconds
      if (selectedConsultant && selectedConsultant.status === 'Online') {
        setTimeout(() => {
          const responseMessage: Message = {
            text: "Terima kasih atas pertanyaan Anda. Saya akan membantu sesuai dengan keahlian saya di bidang hukum ketenagakerjaan.",
            sender: 'consultant',
            status: 'Read',
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, responseMessage]);
        }, 3000);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-2 p-4 bg-white border-b">
        {selectedConsultant && (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setSelectedConsultant(null)}
            className="mr-1"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        )}
        <h2 className="text-lg font-semibold">
          {selectedConsultant ? selectedConsultant.name : 'Pilih Konsultan'}
        </h2>
        {selectedConsultant && (
          <span className={`ml-2 text-sm ${selectedConsultant.status === 'Online' ? 'text-green-500' : 'text-gray-400'}`}>
            {selectedConsultant.status}
          </span>
        )}
      </div>
      
      {!selectedConsultant ? (
        // Consultant Selection Screen
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <h3 className="text-base font-medium text-gray-700">Pilih konsultan untuk memulai percakapan:</h3>
          {consultants.map((consultant) => (
            <Card 
              key={consultant.id} 
              className="p-4 cursor-pointer hover:bg-gray-50"
              onClick={() => consultant.status === 'Online' && setSelectedConsultant(consultant)}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  {consultant.image ? (
                    <img 
                      src={consultant.image} 
                      alt={consultant.name}
                      className="h-12 w-12 rounded-full object-cover" 
                    />
                  ) : (
                    <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                      <User className="h-6 w-6 text-gray-500" />
                    </div>
                  )}
                  <div>
                    <h3 className="font-medium">{consultant.name}</h3>
                    <p className="text-sm text-gray-600">{consultant.expertise}</p>
                    <span className={`text-sm ${consultant.status === 'Online' ? 'text-green-500' : 'text-gray-400'}`}>
                      {consultant.status}
                    </span>
                  </div>
                </div>
                <Button
                  variant={consultant.status === 'Online' ? 'default' : 'secondary'}
                  disabled={consultant.status !== 'Online'}
                  onClick={() => setSelectedConsultant(consultant)}
                  className={consultant.status === 'Online' ? 'bg-teal hover:bg-teal/90' : ''}
                >
                  {consultant.status === 'Online' ? 'Mulai Chat' : 'Tidak Tersedia'}
                </Button>
              </div>
            </Card>
          ))}
          <Button 
            variant="outline" 
            className="w-full mt-4"
            onClick={() => navigate('/konsultasi-hukum')}
          >
            Kembali ke Menu Konsultasi
          </Button>
        </div>
      ) : (
        // Chat Screen
        <>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <div className="text-center text-gray-500 py-8">
                <p>Belum ada pesan. Mulai percakapan dengan {selectedConsultant.name}</p>
              </div>
            )}
            
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'consultant' && (
                  <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center mr-2 self-end">
                    {selectedConsultant.image ? (
                      <img 
                        src={selectedConsultant.image} 
                        alt={selectedConsultant.name}
                        className="h-8 w-8 rounded-full object-cover" 
                      />
                    ) : (
                      <User className="h-4 w-4 text-gray-500" />
                    )}
                  </div>
                )}
                
                <div 
                  className={`max-w-[75%] rounded-lg px-4 py-2 shadow-sm ${
                    msg.sender === 'user' 
                      ? 'bg-teal text-white rounded-tr-none' 
                      : 'bg-gray-100 text-gray-800 rounded-tl-none'
                  }`}
                >
                  {msg.text && <p className="text-sm">{msg.text}</p>}
                  {msg.file && (
                    <div className="text-xs mt-1 flex items-center gap-1">
                      <Paperclip className="h-3 w-3" />
                      <span>{msg.file.name}</span>
                    </div>
                  )}
                  <div className="text-xs mt-1 flex justify-end items-center gap-1">
                    {formatTime(msg.timestamp)}
                    {msg.sender === 'user' && (
                      <>
                        {msg.status === 'Read' && (
                          <Check className="h-3 w-3 text-blue-400" />
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Message Input */}
          <div className="p-3 bg-white border-t flex items-center gap-2">
            <label className="cursor-pointer p-2 rounded-full hover:bg-gray-100">
              <Paperclip className="h-5 w-5 text-gray-500" />
              <input 
                type="file" 
                className="hidden" 
                onChange={(e) => e.target.files && setFile(e.target.files[0])} 
              />
            </label>
            <input
              type="text"
              placeholder="Ketik pesan..."
              className="flex-1 bg-gray-100 p-2 rounded-full text-sm border-none focus:ring-1 focus:ring-teal focus:outline-none"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <Button 
              size="icon" 
              onClick={sendMessage}
              className="bg-teal hover:bg-teal/90 rounded-full h-10 w-10"
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default LiveChat;
