import React, { memo } from 'react';

const PromptInput = memo(({ 
  value, 
  onChange, 
  onClear, 
  disabled 
}: { 
  value: string; 
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void; 
  onClear: () => void; 
  disabled: boolean;
}) => (
  <div className="relative">
    <textarea
      id="prompt"
      value={value}
      onChange={onChange}
      rows={3}
      placeholder="A beautiful sunset over the ocean, digital art, vibrant colors"
      className="w-full px-4 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700/50 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400 transition-colors resize-y min-h-[100px]"
      disabled={disabled}
      aria-describedby="prompt-help"
    />
    {value && (
      <button
        type="button"
        onClick={onClear}
        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
        aria-label="Clear prompt"
        disabled={disabled}
      >
        ✕
      </button>
    )}
  </div>
));

export default PromptInput;