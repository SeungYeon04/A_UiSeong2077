import React from 'react';
import { useGameStore } from '../../stores/useGameStore';
import { useUserStore } from '../../stores/useUserStore';
import StatusBar from '../game/StatusBar';
import PlayerInfo from '../game/PlayerInfo';
import GameStats from '../game/GameStats';
import Inventory from '../game/Inventory';

const GameStatus: React.FC = () => {
  const { user } = useUserStore();
  const { life, mental, money, location, mood } = useGameStore();

  return (
    <div className="h-full flex flex-col p-3 sm:p-4 md:p-6 overflow-y-auto">
      {/* 플레이어 정보 */}
      <PlayerInfo playerName={user?.name || '게스트'} />

      {/* 상태 바 */}
      <div className="mb-4 sm:mb-6">
        <StatusBar type="life" value={life} maxValue={4} />
        <StatusBar type="mental" value={mental} maxValue={3} />
      </div>

      {/* 게임 통계 */}
      <GameStats money={money} location={location} mood={mood} />

      {/* 인벤토리 */}
      <Inventory />
    </div>
  );
};

export default GameStatus;
