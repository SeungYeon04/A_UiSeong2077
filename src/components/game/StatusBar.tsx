import React from 'react';

interface StatusBarProps {
  type: 'life' | 'mental';
  value: number;
  maxValue: number;
}

const StatusBar: React.FC<StatusBarProps> = ({ type, value, maxValue }) => {
  const getIcon = () => {
    if (type === 'life') {
      return (
        <svg
          className="w-5 h-5 text-red-500"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
            clipRule="evenodd"
          />
        </svg>
      );
    } else {
      return (
        <svg
          className="w-5 h-5 text-blue-500"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }
  };

  const getLabel = () => {
    return type === 'life' ? '생명력' : '정신력';
  };

  return (
    <div className="flex items-center mb-3 text-white" >
      <div className="flex items-center mr-3">
        {getIcon()}
        <span className="ml-2 text-sm font-medium">
          {getLabel()}
        </span>
      </div>
      <div className="flex space-x-1">
        {Array.from({ length: maxValue }, (_, index) => (
          <div
            key={index}
            className={`w-4 h-4 rounded-full ${
              index < value
                ? type === 'life'
                  ? 'bg-red-500'
                  : 'bg-blue-500'
                : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default StatusBar;
