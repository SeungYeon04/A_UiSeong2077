import React from 'react';
import { useGameStore } from '../../stores/useGameStore';

const ConnectionStatus: React.FC = () => {
  const { isConnected } = useGameStore();

  return (
    <div className="absolute top-4 left-4 z-10">
      <div
        className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-bold border-2 ${
          isConnected
            ? 'bg-green-500 text-white border-green-300 shadow-lg'
            : 'bg-red-500 text-white border-red-300 shadow-lg'
        }`}
      >
        <div
          className={`w-3 h-3 rounded-full ${
            isConnected ? 'bg-green-300' : 'bg-red-300'
          }`}
        />
        <span>{isConnected ? '🟢 백엔드 연결됨' : '🔴 백엔드 연결 안됨'}</span>
      </div>
    </div>
  );
};

export default ConnectionStatus;
