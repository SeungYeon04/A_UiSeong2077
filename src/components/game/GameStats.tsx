import React from 'react';

interface GameStatsProps {
  money: number;
  location: string;
  mood: string;
}

const GameStats: React.FC<GameStatsProps> = ({ money, location, mood }) => {
  return (
    <div className="mb-6 space-y-3 text-gray-400">
      <div className="text-sm">
        <span className="font-medium">소지금: </span>
        <span className="text-white">{money}</span>
      </div>

      <div className="text-sm text-gray-400">
        <span className="font-medium">현재 위치: </span>
        <span className="text-white">{location}</span>
      </div>

      <div className="text-sm text-gray-400">
        <span className="font-medium">현재 기분: </span>
        <span className="text-white">{mood}</span>
      </div>
    </div>
  );
};

export default GameStats;
