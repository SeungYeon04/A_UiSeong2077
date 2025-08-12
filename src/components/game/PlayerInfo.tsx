import React from 'react';

interface PlayerInfoProps {
  playerName: string;
}

const PlayerInfo: React.FC<PlayerInfoProps> = ({ playerName }) => {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-800">
        플레이어: {playerName}
      </h3>
    </div>
  );
};

export default PlayerInfo;
