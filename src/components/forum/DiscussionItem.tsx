
import React from 'react';
import { ThumbsUp, MessageCircle } from 'lucide-react';

interface DiscussionItemProps {
  id: string;
  title: string;
  category: string;
  author: string;
  likes: number;
  comments: number;
  isLiked: boolean;
  formattedTime: string;
  onLike: (id: string, isLiked: boolean) => void;
}

const DiscussionItem: React.FC<DiscussionItemProps> = ({
  id,
  title,
  category,
  author,
  likes,
  comments,
  isLiked,
  formattedTime,
  onLike
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
      <h2 className="font-semibold text-lg">{title}</h2>
      <p className="text-sm text-gray-600 mt-1">{category} - {author}</p>
      <div className="flex justify-between mt-3 text-gray-500 text-sm">
        <span>{formattedTime}</span>
        <div className="flex gap-4">
          <button 
            className="flex items-center gap-1"
            onClick={() => onLike(id, isLiked)}
          >
            <ThumbsUp 
              className={`h-4 w-4 ${isLiked ? 'text-teal fill-teal' : ''}`} 
            /> 
            {likes || 0}
          </button>
          <span className="flex items-center gap-1">
            <MessageCircle className="h-4 w-4" /> {comments || 0}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DiscussionItem;
