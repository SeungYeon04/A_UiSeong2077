import React from 'react';
import { useGameStore } from '../../stores/useGameStore';

const ConnectionStatus: React.FC = () => {
  const { isConnected } = useGameStore();

  return (
    <div className="absolute top-4 left-4 z-10">
      <div
        className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium ${
          isConnected
            ? 'bg-green-100 text-green-800 border border-green-200'
            : 'bg-red-100 text-red-800 border border-red-200'
        }`}
      >
        <div
          className={`w-2 h-2 rounded-full ${
            isConnected ? 'bg-green-500' : 'bg-red-500'
          }`}
        />
        <span>{isConnected ? '백엔드 연결됨' : '백엔드 연결 안됨'}</span>
      </div>
    </div>
  );
};

export default ConnectionStatus;
