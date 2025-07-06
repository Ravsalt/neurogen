import React, { memo } from 'react';
import { FiImage } from 'react-icons/fi';

const ImagePreview = memo(({ imageUrl, prompt, isLoading }: { imageUrl: string | null; prompt: string; isLoading: boolean }) => {
    // Show loading overlay when image is being generated
    const LoadingOverlay = () => (
      <div className="absolute inset-0 bg-black/50 dark:bg-black/60 backdrop-blur-sm rounded-lg flex items-center justify-center z-10 transition-opacity duration-300">
        <div className="text-center p-6 bg-white/90 dark:bg-gray-800/90 rounded-lg shadow-xl">
          <div className="flex justify-center mb-3">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-500"></div>
          </div>
          <p className="text-gray-700 dark:text-gray-200 font-medium">Generating your image...</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">This may take a moment</p>
        </div>
      </div>
    );

    return (
<div className="relative group bg-gray-50 dark:bg-gray-800/50 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 transition-shadow hover:shadow-md">
  {imageUrl ? (
    <div className="flex items-center justify-center p-2 bg-white dark:bg-gray-800 rounded-lg">
      <img
        src={imageUrl}
        alt={`AI generated: ${prompt}`}
        className="w-full max-h-[280px] object-contain rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm"
        loading="lazy"
      />
      {isLoading && <LoadingOverlay />}
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center p-6 min-h-[280px] border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-center">
      <FiImage className="w-16 h-16 text-gray-300 dark:text-gray-600 mb-4" />
      <p className="text-gray-500 dark:text-gray-400">
        {isLoading ? 'Generating your image...' : 'Your generated image will appear here'}
      </p>

      {isLoading && (
        <div className="mt-4 w-24 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div className="h-full bg-indigo-500 animate-pulse w-full rounded-full"></div>
        </div>
      )}
    </div>
  )}
</div>
    );
  });

  export default ImagePreview;