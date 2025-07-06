import React from 'react';

const NotFound: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
      <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">Page not found</p>
      <a
        href="/"
        className="text-indigo-600 dark:text-indigo-400 hover:underline"
      >
        Go back home
      </a>
    </div>
  </div>
);

export default NotFound;