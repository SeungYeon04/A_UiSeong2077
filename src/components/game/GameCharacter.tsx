import React from 'react';
import { useGameStore } from '../../stores/useGameStore';

const GameCharacter: React.FC = () => {
  const { currentCharacter, currentDialogue } = useGameStore();

  if (!currentCharacter || !currentDialogue) return null;

  return (
    <div className="mb-8">
      <div className="bg-white rounded-lg p-6 shadow-md">
        <div className="font-bold text-xl mb-3 text-gray-800">
          {currentCharacter}
        </div>
        <div className="text-lg text-gray-700 leading-relaxed">
          {currentDialogue}
        </div>
      </div>
    </div>
  );
};

export default GameCharacter;
