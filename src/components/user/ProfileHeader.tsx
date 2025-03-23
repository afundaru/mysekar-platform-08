
import React from 'react';
import { BadgeCheck } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import ProfileAvatar from './ProfileAvatar';

interface ProfileHeaderProps {
  user: any;
  avatarUrl: string | null;
  setAvatarUrl: (url: string | null) => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user, avatarUrl, setAvatarUrl }) => {
  const memberData = user?.user_metadata || {};
  
  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="flex items-center">
          <ProfileAvatar 
            user={user} 
            avatarUrl={avatarUrl} 
            setAvatarUrl={setAvatarUrl} 
          />
          <div>
            <h3 className="text-lg font-semibold">{memberData?.full_name || 'Nama Lengkap'}</h3>
            <p className="text-sm text-gray-500 flex items-center">
              <BadgeCheck className="h-4 w-4 text-teal mr-1" />
              Anggota Aktif
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileHeader;
