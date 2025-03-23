
import React, { useState, useRef } from 'react';
import { ArrowLeft, Send, Upload, FileText } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const AIConsultation: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [input, setInput] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [documentText, setDocumentText] = useState('');
  const [showDocumentInput, setShowDocumentInput] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Halo! Saya adalah AI asisten hukum. Apa yang bisa saya bantu terkait pertanyaan hukum ketenagakerjaan Anda? Anda juga dapat mengunggah dokumen hukum untuk dianalisis.',
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
          content: "Terima kasih atas pertanyaan Anda. Sebagai asisten hukum ketenagakerjaan, saya akan mencoba membantu. Perlu diingat bahwa saya memberikan informasi umum dan bukan nasihat hukum yang menggantikan konsultasi dengan pengacara. Berdasarkan pertanyaan Anda, berikut informasi yang dapat membantu...",
          sender: 'ai',
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, aiMessage]);
      }, 1000);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file type
    const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
    if (!validTypes.includes(file.type)) {
      toast({
        title: "Format tidak didukung",
        description: "Gunakan file PDF, DOCX, atau TXT.",
        variant: "destructive"
      });
      return;
    }

    // Check file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File terlalu besar",
        description: "Ukuran file maksimal 5MB.",
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);
    
    // Simulate file processing and analysis
    setTimeout(() => {
      setIsUploading(false);
      setShowDocumentInput(true);
      toast({
        title: "Dokumen diunggah",
        description: "Dokumen berhasil diunggah dan siap untuk dianalisis.",
      });
      
      // In a real app, you would send the file to your backend for processing
      // and then update the UI with the response
    }, 1500);
  };

  const handleDocumentAnalysis = () => {
    if (!documentText.trim()) {
      toast({
        title: "Input kosong",
        description: "Masukkan teks dokumen untuk dianalisis.",
        variant: "destructive"
      });
      return;
    }

    // Add user message about document analysis
    const userMessage: Message = {
      id: Date.now().toString(),
      content: `Analisis dokumen berikut:\n\n${documentText.substring(0, 100)}...`,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    
    // Simulate AI analysis response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "# Analisis Dokumen Hukum\n\n## Ringkasan\nDokumen ini merupakan perjanjian kerja yang mengatur hubungan antara pemberi kerja dan pekerja.\n\n## Poin Penting\n1. Masa percobaan selama 3 bulan\n2. Jam kerja 40 jam per minggu\n3. Hak cuti tahunan 12 hari\n4. Prosedur pengunduran diri memerlukan pemberitahuan 1 bulan\n\n## Catatan Khusus\nPerhatikan klausul non-kompetisi yang berlaku hingga 6 bulan setelah pemutusan hubungan kerja.",
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
      setShowDocumentInput(false);
      setDocumentText('');
    }, 2000);
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

      {/* Document Input Section */}
      {showDocumentInput && (
        <div className="p-4 bg-white m-4 rounded-lg shadow-sm">
          <h3 className="text-sm font-medium mb-2">Teks Dokumen untuk Dianalisis</h3>
          <Textarea
            value={documentText}
            onChange={(e) => setDocumentText(e.target.value)}
            placeholder="Tempel teks dokumen hukum di sini untuk dianalisis..."
            className="min-h-[120px] mb-3"
          />
          <div className="flex justify-end space-x-2">
            <Button 
              variant="outline" 
              onClick={() => setShowDocumentInput(false)}
            >
              Batal
            </Button>
            <Button 
              onClick={handleDocumentAnalysis}
              className="bg-teal hover:bg-teal/90 text-white"
            >
              Analisis Dokumen
            </Button>
          </div>
        </div>
      )}

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
                <p className="text-sm whitespace-pre-line">{message.content}</p>
                <p className="text-xs mt-1 opacity-70">
                  {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </p>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Upload Document Button */}
      <div className="bg-white px-4 py-2 border-t">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          className="hidden"
          accept=".pdf,.docx,.txt"
        />
        <Button 
          variant="outline"
          className="w-full mb-2 border-dashed border-gray-300"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
        >
          {isUploading ? (
            <span className="flex items-center">
              <FileText className="h-4 w-4 mr-2 animate-pulse" />
              Sedang Mengunggah...
            </span>
          ) : (
            <span className="flex items-center">
              <Upload className="h-4 w-4 mr-2" />
              Unggah Dokumen Hukum (.pdf, .docx, .txt)
            </span>
          )}
        </Button>
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
