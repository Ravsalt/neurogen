import { memo } from 'react';

const LoadingAnimation = memo(({ isVisible }: { isVisible: boolean }) => {
  if (!isVisible) return null;
  
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-xl max-w-sm w-full mx-4">
        <div className="flex flex-col items-center">
          <div className="relative w-16 h-16 mb-4">
            <div className="absolute inset-0 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin"></div>
            <div className="absolute inset-2 rounded-full border-4 border-indigo-300 border-b-transparent animate-spin animation-delay-200"></div>
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Generating Image</h3>
          <p className="text-gray-600 dark:text-gray-300 text-center">This may take a moment. Please wait...</p>
        </div>
      </div>
    </div>
  );
});

export default LoadingAnimation;