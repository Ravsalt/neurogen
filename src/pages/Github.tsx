import { useEffect } from 'react';

const Github = () => {
  useEffect(() => {
    window.location.href = 'https://github.com/ravsalt/neurogen';
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          Redirecting to GitHub...
        </h1>
      </div>
    </div>
  );
};

export default Github;
