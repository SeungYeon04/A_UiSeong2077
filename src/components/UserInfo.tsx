import React from 'react';
import { useUserStore } from '../stores/useUserStore';

const UserInfo: React.FC = () => {
  const { user } = useUserStore();

  if (!user) return null;

  return (
    <div className="flex items-center gap-3">
      <img
        src={user.picture}
        alt={user.name}
        className="w-8 h-8 rounded-full"
      />
      <div className="text-sm">
        <div className="font-medium">{user.name}</div>
        <div className="text-gray-400">{user.email}</div>
      </div>
    </div>
  );
};

export default UserInfo;
