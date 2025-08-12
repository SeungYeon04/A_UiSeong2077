import React from 'react';
import { useGameStore } from '../../stores/useGameStore';

const GameChoices: React.FC = () => {
  const { currentChoices, makeChoice } = useGameStore();

  if (!currentChoices || currentChoices.length === 0) return null;

  return (
    <div className="mt-auto space-y-2 sm:space-y-3 md:space-y-4 p-2 sm:p-0">
      {currentChoices.map((choice, index) => (
        <button
          key={index}
          onClick={() => makeChoice(index)}
          className="w-full bg-white rounded-full py-2 sm:py-3 md:py-4 px-4 sm:px-6 text-sm sm:text-base md:text-lg font-medium text-gray-800 shadow-lg hover:shadow-xl transition-all duration-200 hover:bg-gray-50 border border-gray-200"
        >
          {choice}
        </button>
      ))}
    </div>
  );
};

export default GameChoices;
