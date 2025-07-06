import { FiGithub } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="bg-transparent dark:bg-gray-900 py-4 border-t border-gray-200 dark:border-gray-800 mt-12">
      <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          &copy; {new Date().getFullYear()} Neurogen
        </p>
        <a
          href="https://github.com/ravsalt/neurogen"
          className="mt-2 sm:mt-0 flex items-center text-sm text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FiGithub className="mr-1.5" />
          View on GitHub
        </a>
      </div>
    </footer>
  );
}