import React, { memo } from 'react';

const AspectRatioButtons = memo(({ 
    currentWidth, 
    currentHeight,
    onSquareClick,
    onLandscapeClick,
    onWideClick,
    disabled
  }: { 
    currentWidth: number;
    currentHeight: number;
    onSquareClick: () => void;
    onLandscapeClick: () => void;
    onWideClick: () => void;
    disabled: boolean;
  }) => (
    <div className="flex items-center space-x-2">
      <button 
        onClick={onSquareClick}
        className={`flex-1 py-1.5 text-sm rounded-md transition-colors ${
          currentWidth === 512 ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-200' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
        }`}
        disabled={disabled}
      >
        1:1
      </button>
      <button 
        onClick={onLandscapeClick}
        className={`flex-1 py-1.5 text-sm rounded-md transition-colors ${
          currentWidth === 768 && currentHeight === 512 ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-200' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
        }`}
        disabled={disabled}
      >
        3:2
      </button>
      <button 
        onClick={onWideClick}
        className={`flex-1 py-1.5 text-sm rounded-md transition-colors ${
          currentWidth === 1024 && currentHeight === 576 ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-200' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
        }`}
        disabled={disabled}
      >
        16:9
      </button>
    </div>
  ));

  export default AspectRatioButtons;