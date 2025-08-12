import React from 'react';
import { useGameStore } from '../../stores/useGameStore';

const GameNarrative: React.FC = () => {
  const { currentNarrative } = useGameStore();

  if (!currentNarrative) return null;

  return (
    <div className="mb-6">
      <div className="text-gray-600 text-lg leading-relaxed">
        {currentNarrative.split('\n').map((line, index) => (
          <p key={index} className="mb-2">
            {line}
          </p>
        ))}
      </div>
    </div>
  );
};

export default GameNarrative;
