import React from 'react';
import GameDialog from './GameDialog';
import GameStatus from './GameStatus';
import GameHeader from './GameHeader';
import ConnectionStatus from './ConnectionStatus';

interface GameLayoutProps {
  children?: React.ReactNode;
}

const GameLayout: React.FC<GameLayoutProps> = ({ children }) => {
  return (
    <div className="relative flex flex-col lg:flex-row h-screen bg-gray-100">
      {/* 게임 헤더 */}
      <GameHeader />

      {/* 연결 상태 표시 */}
      <ConnectionStatus />

      {/* 왼쪽 패널 - 대화 및 상호작용 영역 */}
      <div className="flex-1 flex flex-col min-h-0">
        <GameDialog />
      </div>

      {/* 오른쪽 패널 - 상태 및 정보 영역 */}
      <div className="w-full lg:w-80 bg-white shadow-lg order-first lg:order-last">
        <GameStatus />
      </div>
    </div>
  );
};

export default GameLayout;
