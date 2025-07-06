import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { FiImage, FiDownload, FiRefreshCw, FiUpload, FiChevronDown, FiChevronUp, FiInfo, FiSettings } from 'react-icons/fi';
import PromptInput from '../components/home/PromptInput';
import ImagePreview from '../components/home/ImagePreview';
import SeedControls from '../components/home/SeedControls';
import AspectRatioButtons from '../components/home/AspectRatioButtons';
import LoadingAnimation from '../components/home/LoadingAnimation';
import debounce from '../utils/debounce';

const Home = () => {
  // State for prompt and image
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Advanced settings state
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [settings, setSettings] = useState({
    model: 'flux',
    width: 512,
    height: 512,
    seed: Math.floor(Math.random() * 1000000).toString(),
    transparent: false,
    nologo: true,
  });

  // Define the settings type for better type safety
  type SettingsType = typeof settings;

  // Memoize settings change handler to prevent unnecessary re-renders
  const handleSettingsChange = useCallback((updates: Partial<SettingsType> | ((prev: SettingsType) => Partial<SettingsType>)) => {
    setSettings((prev: SettingsType) => {
      const updatesObject = typeof updates === 'function' ? updates(prev) : updates;
      // Create a new settings object only if there are actual changes
      const newSettings = { ...prev, ...updatesObject };
      // Check if any values have actually changed to prevent unnecessary re-renders
      if (Object.keys(updatesObject).every(key => newSettings[key as keyof SettingsType] === prev[key as keyof SettingsType])) {
        return prev;
      }
      return newSettings;
    });
  }, []);

  // Memoize toggle function
  const toggleAdvanced = useCallback(() => {
    setShowAdvanced(prev => !prev);
  }, []);
  
  // Memoize prompt handlers
  const handlePromptChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
  }, []);
  
  const clearPrompt = useCallback(() => {
    setPrompt('');
  }, []);
  
  // Memoize model change handler
  const handleModelChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    handleSettingsChange({ model: e.target.value });
  }, [handleSettingsChange]);
  
  // Memoize dimension handlers
  const setSquareAspect = useCallback(() => {
    handleSettingsChange({ width: 512, height: 512 });
  }, [handleSettingsChange]);
  
  const setLandscapeAspect = useCallback(() => {
    handleSettingsChange({ width: 768, height: 512 });
  }, [handleSettingsChange]);
  
  const setWideAspect = useCallback(() => {
    handleSettingsChange({ width: 1024, height: 576 });
  }, [handleSettingsChange]);
  
  // Memoize seed handlers
  const generateRandomSeed = useCallback(() => {
    handleSettingsChange({ seed: Math.floor(Math.random() * 1000000).toString() });
  }, [handleSettingsChange]);
  
  const copySeedToClipboard = useCallback(() => {
    navigator.clipboard.writeText(settings.seed);
  }, [settings.seed]);
  
  const handleSeedChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    handleSettingsChange({ seed: e.target.value });
  }, [handleSettingsChange]);
  
  // Memoize dimension change handlers
  // Debounce applied to prevent excessive re-renders during slider drag
  const debouncedHandleWidthChange = useMemo(
    () => debounce((value: number) => handleSettingsChange({ width: value || 512 }), 100),
    [handleSettingsChange]
  );

  const handleWidthChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedHandleWidthChange(parseInt(e.target.value));
  }, [debouncedHandleWidthChange]);
  
  const debouncedHandleHeightChange = useMemo(
    () => debounce((value: number) => handleSettingsChange({ height: value || 512 }), 100),
    [handleSettingsChange]
  );

  const handleHeightChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedHandleHeightChange(parseInt(e.target.value));
  }, [debouncedHandleHeightChange]);
  
  // Memoize toggle handlers
  const toggleTransparent = useCallback(() => {
    handleSettingsChange(prev => ({ transparent: !prev.transparent }));
  }, [handleSettingsChange]);
  
  const toggleNoLogo = useCallback(() => {
    handleSettingsChange(prev => ({ nologo: !prev.nologo }));
  }, [handleSettingsChange]);

  const [referenceImage, setReferenceImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Memoize the image URL generation to prevent unnecessary recalculations
  const generateImageUrl = useCallback((promptText: string) => {
    if (!promptText.trim()) return '';

    const { model, transparent, nologo, width, height, seed } = settings;
    const params = new URLSearchParams({
        width: width.toString(),
        height: height.toString(),
        seed: seed,
    });

    if (model !== 'flux') params.set('model', model);
    if (transparent) params.set('transparent', 'true');
    if (nologo) params.set('nologo', 'true');
    if (model === 'kontext' && referenceImage) {
        params.set('image', referenceImage);
    }

    const query = params.toString();
    return `https://image.pollinations.ai/prompt/${encodeURIComponent(promptText)}${query ? '?' + query : ''}`;
  }, [settings, referenceImage]);

  // Show loading with a small delay to prevent flicker on quick generations
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isGenerating) {
      timer = setTimeout(() => setShowLoading(true), 300);
    } else {
      setShowLoading(false);
    }
    return () => clearTimeout(timer);
  }, [isGenerating]);

  // Memoize the submit handler to prevent unnecessary re-renders
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!prompt.trim()) {
      setError('Please enter a prompt');
      return;
    }
    
    if (isGenerating) return;
    
    setIsGenerating(true);
    setError(null);
    
    try {
      const imageUrl = generateImageUrl(prompt);
      const img = new Image();
      
      img.onload = () => {
        setGeneratedImage(imageUrl);
        setIsGenerating(false);
      };
      
      img.onerror = () => {
        console.error('Error loading generated image');
        setError('Failed to load the generated image. Please try again.');
        setIsGenerating(false);
      };
      
      img.src = imageUrl;
      
    } catch (err) {
      console.error('Error generating image:', err);
      setError('Failed to generate image. Please try again.');
      setIsGenerating(false);
    }
  }, [prompt, isGenerating, generateImageUrl]);

  const handleDownload = useCallback(async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!generatedImage) return;

    try {
      const response = await fetch(generatedImage);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      const extension = settings.model === 'gptimage' && settings.transparent ? 'png' : 'jpg';
      link.download = `generated-${Date.now()}.${extension}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url); // Clean up the object URL

    } catch (error) {
      console.error('Error downloading image:', error);
      // Optionally, show an error message to the user
    }
  }, [generatedImage, settings.model, settings.transparent]);

  // Memoize file change handler
  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setReferenceImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setReferenceImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <LoadingAnimation isVisible={showLoading} />
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-6 sm:py-8 max-w-5xl">
          <div className="text-center mb-8 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          AI Image Generator
        </h1>
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Transform your ideas into stunning visuals with our AI-powered image generator. No watermarks, no limits.
        </p>
      </div>

      <div className="grid gap-6">
        <ImagePreview 
          imageUrl={generatedImage} 
          prompt={prompt} 
          isLoading={isGenerating} 
        />
      </div>

      <div className="bg-transparent dark:bg-transparent backdrop-blur-sm rounded-xl border border-gray-200/30 dark:border-gray-700/50 p-6 mb-8 transition-all duration-200 hover:shadow-2xl hover:-translate-y-0.5">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Describe what you want to create
              <span className="ml-1 text-xs text-gray-500">(required)</span>
            </label>
            <div className="relative">
              <PromptInput 
                value={prompt}
                onChange={handlePromptChange}
                onClear={clearPrompt}
                disabled={isGenerating}
              />
              <p id="prompt-help" className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Be descriptive for better results (e.g., "portrait of a cyberpunk cat, neon lights, 4k, detailed fur")
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Model Selection */}
            <div>
              <label htmlFor="model" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                AI Model
              </label>
              <div className="relative">
                <select
                  id="model"
                  value={settings.model}
                  onChange={handleModelChange}
                  className="w-full appearance-none bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white py-2.5 px-4 pr-8 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors cursor-pointer"
                  disabled={isGenerating}
                >
                  <option value="flux">Flux (Balanced)</option>
                  <option value="kontext">Kontext (Image-to-Image)</option>
                  <option value="gptimage">GPT-Image (High Quality)</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Image Size */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Size: {settings.width}×{settings.height}px
              </label>
              <AspectRatioButtons 
                currentWidth={settings.width}
                currentHeight={settings.height}
                onSquareClick={setSquareAspect}
                onLandscapeClick={setLandscapeAspect}
                onWideClick={setWideAspect}
                disabled={isGenerating}
              />
            </div>

            {/* Advanced Toggle */}
            <div className="flex items-end">
              <button
                type="button"
                onClick={toggleAdvanced}
                className="w-full flex items-center justify-center px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
              >
                {showAdvanced ? (
                  <>
                    <FiChevronUp className="mr-2" /> Hide Advanced
                  </>
                ) : (
                  <>
                    <FiChevronDown className="mr-2" /> Show Advanced
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Reference Image Upload (shown only for Kontext model) */}
          {settings.model === 'kontext' && (
            <div 
              className={`border-2 border-dashed rounded-lg p-6 text-center transition-all duration-200 ${
                isDragging 
                  ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 scale-[1.01]' 
                  : 'border-gray-300 dark:border-gray-600 hover:border-indigo-400 dark:hover:border-indigo-500'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <input
                type="file"
                id="reference-image"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
                disabled={isGenerating}
              />
              <label
                htmlFor="reference-image"
                className="cursor-pointer flex flex-col items-center justify-center space-y-3"
              >
                <div className={`p-3 rounded-full ${
                  referenceImage 
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' 
                    : 'bg-indigo-100 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400'
                }`}>
                  <FiUpload className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                    {referenceImage ? 'Reference Image Uploaded' : 'Upload a Reference Image'}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {referenceImage 
                      ? 'Click to change or drag a new image' 
                      : 'Drag & drop an image here, or click to browse'}
                  </p>
                </div>
                {referenceImage && (
                  <div className="mt-2 w-24 h-24 overflow-hidden rounded-lg border-2 border-gray-200 dark:border-gray-600 group relative">
                    <img 
                      src={referenceImage} 
                      alt="Reference" 
                      className="w-full h-full object-cover group-hover:opacity-75 transition-opacity"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-white text-xs font-medium bg-black bg-opacity-60 px-2 py-1 rounded">
                        Change
                      </span>
                    </div>
                  </div>
                )}
              </label>
            </div>
          )}

          {/* Advanced Settings */}
          <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
            showAdvanced ? 'max-h-96 opacity-100 mb-4' : 'max-h-0 opacity-0'
          }`}>
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Advanced Settings</h3>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-200">
                  <FiSettings className="mr-1.5 h-3.5 w-3.5" />
                  Customize
                </span>
              </div>
              
              <div className="space-y-6">
                {/* Seed Control */}
                <SeedControls 
                  seed={settings.seed}
                  onSeedChange={handleSeedChange}
                  onRandomize={generateRandomSeed}
                  onCopy={copySeedToClipboard}
                  disabled={isGenerating}
                />

              {/* Image Size Controls */}
                <div className="bg-white/80 dark:bg-gray-800/60 p-4 rounded-lg border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Image Size</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="width" className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                        Width: {settings.width}px
                      </label>
                      <input
                        id="width"
                        type="range"
                        min="256"
                        max="1024"
                        step="64"
                        value={settings.width}
                        onChange={handleWidthChange}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                        disabled={isGenerating}
                      />
                    </div>
                    <div>
                      <label htmlFor="height" className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                        Height: {settings.height}px
                      </label>
                      <input
                        id="height"
                        type="range"
                        min="256"
                        max="1024"
                        step="64"
                        value={settings.height}
                        onChange={handleHeightChange}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                        disabled={isGenerating}
                      />
                    </div>
                  </div>
                </div>

                {/* Transparent Background (only for GPT-Image) */}
                {settings.model === 'gptimage' && (
                  <div className="bg-white/80 dark:bg-gray-800/60 p-4 rounded-lg border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Transparent Background
                        </label>
                        <button
                          type="button"
                          className={`${settings.transparent ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-700'} relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
                          role="switch"
                          aria-checked={settings.transparent}
                          onClick={toggleTransparent}
                          disabled={settings.model !== 'gptimage'}
                        >
                          <span className="sr-only">Toggle transparent background</span>
                          <span
                            aria-hidden="true"
                            className={`${settings.transparent ? 'translate-x-5' : 'translate-x-0'} pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                          />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <label htmlFor="nologo" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Remove Watermark
                          </label>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            For registered referrers/tokens only
                          </p>
                        </div>
                        <button
                          type="button"
                          className={`${settings.nologo ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-700'} relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
                          role="switch"
                          aria-checked={settings.nologo}
                          onClick={toggleNoLogo}
                        >
                          <span className="sr-only">Toggle watermark removal</span>
                          <span
                            aria-hidden="true"
                            className={`${settings.nologo ? 'translate-x-5' : 'translate-x-0'} pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Help Tips */}
                <div className="bg-blue-50/80 dark:bg-blue-900/40 border border-blue-100/50 dark:border-blue-800/50 rounded-lg p-4 backdrop-blur-sm">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <FiInfo className="h-5 w-5 text-blue-400" />
                    </div>
                    <div className="ml-3">
                      <h4 className="text-sm font-medium text-blue-800 dark:text-blue-200">Pro Tips</h4>
                      <ul className="mt-1 text-xs text-blue-700 dark:text-blue-300 space-y-1 list-disc list-inside">
                        <li>Use seeds to recreate the same image with slight variations</li>
                        <li>Larger images take longer to generate but have more detail</li>
                        <li>The Kontext model works best with reference images</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="submit"
              disabled={isGenerating || !prompt.trim()}
              className={`flex-1 flex items-center justify-center px-6 py-3 rounded-lg font-medium text-white transition-colors ${
                isGenerating || !prompt.trim()
                  ? 'bg-indigo-400 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700'
              }`}
            >
              {isGenerating ? (
                <>
                  <FiRefreshCw className="animate-spin mr-2" />
                  Generating...
                </>
              ) : (
                <>
                  <FiImage className="mr-2" />
                  Generate Image
                </>
              )}
            </button>
              
            {generatedImage && (
              <button
                type="button"
                onClick={handleDownload}
                className="flex-1 flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
              >
                <FiDownload className="mr-2" />
                Download
              </button>
            )}
          </div>
          
          {error && (
            <div className="mt-3 p-3 text-sm text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-900/20 rounded-lg">
              {error}
            </div>
          )}
        </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
