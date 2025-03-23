
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import DashboardBottomNavigation from '@/components/DashboardBottomNavigation';
import ForumHeader from '@/components/forum/ForumHeader';
import ForumCategoryFilter from '@/components/forum/ForumCategoryFilter';
import DiscussionsList from '@/components/forum/DiscussionsList';
import NewDiscussionDialog from '@/components/forum/NewDiscussionDialog';
import { formatRelativeTime } from '@/utils/forum-utils';

const categories = [
  "Semua Diskusi", 
  "Ketenagakerjaan", 
  "Hukum & Regulasi", 
  "Pengalaman Kerja", 
  "Saran & Masukan"
];

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

interface CreateDiscussionForm {
  title: string;
  category: string;
  content: string;
}

const ForumDiskusi: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua Diskusi");
  const [discussions, setDiscussions] = useState<ForumDiscussion[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showNewDiscussionDialog, setShowNewDiscussionDialog] = useState<boolean>(false);
  const [profiles, setProfiles] = useState<Record<string, string>>({});
  const { user } = useAuth();
  
  // Fetch discussions from Supabase
  useEffect(() => {
    const fetchDiscussions = async () => {
      try {
        setLoading(true);
        
        // Query to get all discussions
        let query = supabase
          .from('forum_discussions')
          .select('*')
          .order('created_at', { ascending: false });
        
        // Filter by category if not "Semua Diskusi"
        if (selectedCategory !== "Semua Diskusi") {
          query = query.eq('category', selectedCategory);
        }
        
        const { data: discussionsData, error } = await query;
        
        if (error) {
          throw error;
        }

        if (!discussionsData) {
          setDiscussions([]);
          return;
        }

        // Get all user IDs
        const userIds = [...new Set(discussionsData.map(disc => disc.user_id))];
        
        // Fetch user profiles
        const { data: profilesData } = await supabase
          .from('profiles')
          .select('id, full_name')
          .in('id', userIds);
        
        const profileMap: Record<string, string> = {};
        profilesData?.forEach(profile => {
          profileMap[profile.id] = profile.full_name || 'Anonym';
        });
        
        setProfiles(profileMap);
        
        // Get likes for each discussion
        const discussionsWithCounts = await Promise.all(discussionsData.map(async discussion => {
          // Count likes
          const { count: likesCount } = await supabase
            .from('forum_likes')
            .select('*', { count: 'exact' })
            .eq('discussion_id', discussion.id);
          
          // Count comments
          const { count: commentsCount } = await supabase
            .from('forum_comments')
            .select('*', { count: 'exact' })
            .eq('discussion_id', discussion.id);
          
          // Check if current user has liked
          let isLiked = false;
          if (user) {
            const { data: likeData } = await supabase
              .from('forum_likes')
              .select('*')
              .eq('discussion_id', discussion.id)
              .eq('user_id', user.id)
              .single();
            
            isLiked = !!likeData;
          }
          
          return {
            ...discussion,
            author: profileMap[discussion.user_id] || 'Anonym',
            likes: likesCount || 0,
            comments: commentsCount || 0,
            is_liked: isLiked
          };
        }));
        
        setDiscussions(discussionsWithCounts);
      } catch (error) {
        console.error("Error fetching discussions:", error);
        toast.error("Gagal memuat diskusi");
      } finally {
        setLoading(false);
      }
    };
    
    fetchDiscussions();
  }, [selectedCategory, user]);

  // Handle like button click
  const handleLike = async (discussionId: string, isLiked: boolean) => {
    if (!user) {
      toast.error("Silakan login untuk menyukai diskusi");
      return;
    }
    
    try {
      if (isLiked) {
        // Remove like
        await supabase
          .from('forum_likes')
          .delete()
          .eq('discussion_id', discussionId)
          .eq('user_id', user.id);
      } else {
        // Add like
        await supabase
          .from('forum_likes')
          .insert({
            discussion_id: discussionId,
            user_id: user.id
          });
      }
      
      // Update UI
      setDiscussions(prevDiscussions => 
        prevDiscussions.map(disc => {
          if (disc.id === discussionId) {
            return {
              ...disc,
              likes: isLiked ? (disc.likes || 0) - 1 : (disc.likes || 0) + 1,
              is_liked: !isLiked
            };
          }
          return disc;
        })
      );
    } catch (error) {
      console.error("Error handling like:", error);
      toast.error("Gagal memproses like");
    }
  };

  // Create new discussion
  const handleCreateDiscussion = async (data: CreateDiscussionForm) => {
    if (!user) {
      toast.error("Silakan login untuk membuat diskusi");
      return;
    }
    
    try {
      const { error } = await supabase
        .from('forum_discussions')
        .insert({
          title: data.title,
          category: data.category,
          content: data.content,
          user_id: user.id
        });
      
      if (error) throw error;
      
      toast.success("Diskusi berhasil dibuat");
      setShowNewDiscussionDialog(false);
      
      // Refresh discussions
      setSelectedCategory(data.category);
    } catch (error) {
      console.error("Error creating discussion:", error);
      toast.error("Gagal membuat diskusi");
    }
  };

  const filteredDiscussions = selectedCategory === "Semua Diskusi" 
    ? discussions
    : discussions.filter(disc => disc.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <ForumHeader />
      
      <ForumCategoryFilter 
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      <div className="flex-1 overflow-y-auto p-4 pb-20">
        <DiscussionsList 
          discussions={filteredDiscussions}
          loading={loading}
          formatRelativeTime={formatRelativeTime}
          handleLike={handleLike}
        />
      </div>

      <NewDiscussionDialog 
        categories={categories}
        isOpen={showNewDiscussionDialog}
        onOpenChange={setShowNewDiscussionDialog}
        onSubmit={handleCreateDiscussion}
      />
      
      <DashboardBottomNavigation />
    </div>
  );
};

export default ForumDiskusi;
