import React from 'react';

interface GameStatsProps {
  money: number;
  location: string;
  mood: string;
}

const GameStats: React.FC<GameStatsProps> = ({ money, location, mood }) => {
  return (
    <div className="mb-6 space-y-3">
      <div className="text-sm">
        <span className="font-medium text-gray-700">소지금: </span>
        <span className="text-gray-900">{money}</span>
      </div>

      <div className="text-sm">
        <span className="font-medium text-gray-700">현재 위치: </span>
        <span className="text-gray-900">{location}</span>
      </div>

      <div className="text-sm">
        <span className="font-medium text-gray-700">현재 기분: </span>
        <span className="text-gray-900">{mood}</span>
      </div>
    </div>
  );
};

export default GameStats;
