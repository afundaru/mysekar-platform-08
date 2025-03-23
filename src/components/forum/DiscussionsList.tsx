
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import DiscussionItem from './DiscussionItem';

interface ForumDiscussion {
  id: string;
  title: string;
  category: string;
  content?: string;
  created_at: string;
  user_id: string;
  author?: string;
  likes?: number;
  comments?: number;
  is_liked?: boolean;
}

interface DiscussionsListProps {
  discussions: ForumDiscussion[];
  loading: boolean;
  formatRelativeTime: (dateString: string) => string;
  handleLike: (discussionId: string, isLiked: boolean) => void;
}

const DiscussionsList: React.FC<DiscussionsListProps> = ({
  discussions,
  loading,
  formatRelativeTime,
  handleLike
}) => {
  if (loading) {
    return (
      <>
        {Array(3).fill(0).map((_, i) => (
          <div key={i} className="bg-white p-4 rounded-lg shadow-sm mb-4">
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2 mb-4" />
            <div className="flex justify-between">
              <Skeleton className="h-4 w-16" />
              <div className="flex gap-4">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-4 w-12" />
              </div>
            </div>
          </div>
        ))}
      </>
    );
  }

  if (discussions.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        Tidak ada diskusi untuk kategori ini
      </div>
    );
  }

  return (
    <>
      {discussions.map((disc) => (
        <DiscussionItem
          key={disc.id}
          id={disc.id}
          title={disc.title}
          category={disc.category}
          author={disc.author || 'Anonym'}
          likes={disc.likes || 0}
          comments={disc.comments || 0}
          isLiked={disc.is_liked || false}
          formattedTime={formatRelativeTime(disc.created_at)}
          onLike={handleLike}
        />
      ))}
    </>
  );
};

export default DiscussionsList;
