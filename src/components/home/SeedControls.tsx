import React, { memo } from 'react';
import { FiRefreshCw, FiCopy } from 'react-icons/fi';

const SeedControls = memo(({ 
    seed,
    onSeedChange,
    onRandomize,
    onCopy,
    disabled
  }: { 
    seed: string;
    onSeedChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onRandomize: () => void;
    onCopy: () => void;
    disabled: boolean;
  }) => (
    <div className="bg-white/80 dark:bg-gray-800/60 p-4 rounded-lg border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm">
      <div className="flex justify-between items-center mb-3">
        <div>
          <label htmlFor="seed" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Random Seed
          </label>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            Use the same seed for consistent results
          </p>
        </div>
        <div className="flex space-x-2">
          <button
            type="button"
            onClick={onRandomize}
            className="p-1.5 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-full transition-colors"
            title="Generate random seed"
            disabled={disabled}
          >
            <FiRefreshCw className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={onCopy}
            className="p-1.5 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-full transition-colors"
            title="Copy seed to clipboard"
            disabled={disabled}
          >
            <FiCopy className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="relative">
        <input
          type="text"
          id="seed"
          value={seed}
          onChange={onSeedChange}
          className="block w-full pl-3 pr-10 py-2.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:opacity-70 disabled:cursor-not-allowed"
          placeholder="Leave empty for random"
          disabled={disabled}
        />
        {!seed && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <span className="text-xs text-gray-400 dark:text-gray-500">Random</span>
          </div>
        )}
      </div>
    </div>
  ));

  export default SeedControls;