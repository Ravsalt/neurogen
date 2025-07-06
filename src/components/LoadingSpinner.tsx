import React from 'react';

const LoadingSpinner: React.FC = () => (
  <div className="flex items-center justify-center min-h-[200px] animate-fadeIn">
    <div className="inline-block w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
    <span className="sr-only">Loading...</span>
  </div>
);

export default LoadingSpinner;
