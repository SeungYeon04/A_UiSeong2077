import React from 'react';
import { useGameStore } from '../../stores/useGameStore';

const Inventory: React.FC = () => {
  const { items } = useGameStore();

  return (
    <div className="mb-auto">
      <h4 className="text-sm font-medium text-white mb-3">인벤토리</h4>
      <div className="space-y-2">
        {items.length > 0 ? (
          items.map((item, index) => (
            <div
              key={index}
              className="bg-gray-100 rounded-lg p-2 text-sm text-gray-800"
            >
              • {item}
            </div>
          ))
        ) : (
          <div className="text-gray-500 text-sm italic">
            인벤토리가 비어있습니다
          </div>
        )}
      </div>
    </div>
  );
};

export default Inventory;
