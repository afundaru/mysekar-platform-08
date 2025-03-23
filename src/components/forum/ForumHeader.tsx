
import React from 'react';
import { MessageSquare, Bell, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ForumHeader: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <>
      {/* Status Bar */}
      <div className="bg-teal h-6"></div>
      
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-3 bg-white shadow-sm">
        <div className="flex items-center">
          <button 
            className="mr-2"
            onClick={() => navigate('/dashboard')}
          >
            <MessageSquare className="h-6 w-6 text-teal" />
          </button>
          <h1 className="text-lg font-bold">Forum Diskusi</h1>
        </div>
        <div className="flex gap-4">
          <Search className="text-gray-600 h-5 w-5" />
          <Bell className="text-gray-600 h-5 w-5" />
        </div>
      </div>
    </>
  );
};

export default ForumHeader;
