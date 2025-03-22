
import React, { useState, useEffect } from 'react';
import { MessageSquare, Bell, Search, Plus, ThumbsUp, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { 
  Form, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { useForm } from 'react-hook-form';
import DashboardBottomNavigation from '@/components/DashboardBottomNavigation';

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
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const form = useForm<CreateDiscussionForm>({
    defaultValues: {
      title: '',
      category: 'Ketenagakerjaan',
      content: ''
    }
  });

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

  // Format date to relative time (e.g., "2 hours ago")
  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) {
      return 'baru saja';
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} menit lalu`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} jam lalu`;
    } else if (diffInSeconds < 604800) {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} hari lalu`;
    } else {
      return date.toLocaleDateString('id-ID');
    }
  };

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
      form.reset();
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

      {/* Kategori Forum */}
      <div className="flex overflow-x-auto px-4 py-3 bg-white shadow-sm">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`px-4 py-1.5 mx-1 rounded-full text-sm whitespace-nowrap ${
              selectedCategory === cat 
                ? "bg-teal text-white" 
                : "bg-gray-100 text-gray-600"
            }`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* List Diskusi */}
      <div className="flex-1 overflow-y-auto p-4 pb-20">
        {loading ? (
          // Loading skeletons
          Array(3).fill(0).map((_, i) => (
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
          ))
        ) : filteredDiscussions.length > 0 ? (
          filteredDiscussions.map((disc) => (
            <div key={disc.id} className="bg-white p-4 rounded-lg shadow-sm mb-4">
              <h2 className="font-semibold text-lg">{disc.title}</h2>
              <p className="text-sm text-gray-600 mt-1">{disc.category} - {disc.author}</p>
              <div className="flex justify-between mt-3 text-gray-500 text-sm">
                <span>{formatRelativeTime(disc.created_at)}</span>
                <div className="flex gap-4">
                  <button 
                    className="flex items-center gap-1"
                    onClick={() => handleLike(disc.id, disc.is_liked || false)}
                  >
                    <ThumbsUp 
                      className={`h-4 w-4 ${disc.is_liked ? 'text-teal fill-teal' : ''}`} 
                    /> 
                    {disc.likes || 0}
                  </button>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="h-4 w-4" /> {disc.comments || 0}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            Tidak ada diskusi untuk kategori ini
          </div>
        )}
      </div>

      {/* Floating Button */}
      <button 
        className="fixed bottom-20 right-6 bg-teal text-white p-3 rounded-full shadow-lg"
        onClick={() => setShowNewDiscussionDialog(true)}
      >
        <Plus size={24} />
      </button>
      
      {/* New Discussion Dialog */}
      <Dialog open={showNewDiscussionDialog} onOpenChange={setShowNewDiscussionDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Buat Diskusi Baru</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleCreateDiscussion)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Judul</FormLabel>
                    <FormControl>
                      <Input placeholder="Masukkan judul diskusi" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kategori</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih kategori" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.filter(cat => cat !== "Semua Diskusi").map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Isi Diskusi</FormLabel>
                    <FormControl>
                      <Input placeholder="Tuliskan isi diskusi Anda" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setShowNewDiscussionDialog(false)}>
                  Batal
                </Button>
                <Button type="submit">Simpan</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      {/* Bottom Navigation */}
      <DashboardBottomNavigation />
    </div>
  );
};

export default ForumDiskusi;
