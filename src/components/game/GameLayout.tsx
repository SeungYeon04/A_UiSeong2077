import React from 'react';
import GameDialog from './GameDialog';
import GameStatus from './GameStatus';
import GameHeader from './GameHeader';

interface GameLayoutProps {
  children?: React.ReactNode;
}

const GameLayout: React.FC<GameLayoutProps> = ({ children }) => {
  return (
    <div className="relative flex flex-col lg:flex-row h-screen bg-black">
      {/* 게임 헤더 */}
      <GameHeader />

      {/* 왼쪽 패널 - 대화 및 상호작용 영역 */}
      <div className="flex-1 flex flex-col min-h-0 bg-gradient-to-br from-yellow-500 to-yellow-600">
        <GameDialog />
      </div>

      {/* 오른쪽 패널 - 상태 및 정보 영역 */}
      <div className="w-full lg:w-80 bg-black shadow-2xl order-first lg:order-last border-l-4 border-yellow-400">
        <GameStatus />
      </div>
    </div>
  );
};

export default GameLayout;
