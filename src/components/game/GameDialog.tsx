import React from 'react';
import GameNarrative from './GameNarrative';
import GameCharacter from './GameCharacter';
import GameChoices from './GameChoices';

const GameDialog: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col p-3 sm:p-4 md:p-6 overflow-hidden">
      {/* 서사/상황 설명 */}
      <GameNarrative />

      {/* 캐릭터 대화 */}
      <GameCharacter />

      {/* 선택지 */}
      <GameChoices />
    </div>
  );
};

export default GameDialog;
