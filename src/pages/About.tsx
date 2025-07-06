import { FiGithub, FiCode, FiZap } from 'react-icons/fi';

const About = () => {
  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
          About Neurogen
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          A fun experiment in AI-powered image generation
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
        <div className="flex items-center mb-4">
          <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg mr-4">
            <FiZap className="text-indigo-600 dark:text-indigo-400 text-xl" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">The Project</h2>
        </div>
        <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
          Neurogen is a personal project I built to explore the capabilities of AI image generation. 
          It's currently in beta and serves as a playground for experimenting with different AI models 
          and their creative potential.
        </p>
        <div className="bg-indigo-50 dark:bg-gray-700/50 p-4 rounded-lg border-l-4 border-indigo-500">
          <p className="text-indigo-700 dark:text-indigo-300 italic">
            "The best way to predict the future is to implement it." — Alan Kay
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center mb-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg mr-4">
              <FiCode className="text-blue-600 dark:text-blue-400 text-xl" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Tech Stack</h2>
          </div>
          <ul className="space-y-2 text-gray-600 dark:text-gray-300">
            <li>• React + TypeScript</li>
            <li>• Tailwind CSS</li>
            <li>• React Router</li>
            <li>• Vite</li>
          </ul>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center mb-4">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg mr-4">
              <FiGithub className="text-purple-600 dark:text-purple-400 text-xl" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Credits</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Special thanks to Pollinations for providing the AI models that power this application.
          </p>
          <a
            href="https://github.com/pollinations"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            <FiGithub className="mr-1.5" />
            Pollinations on GitHub
          </a>
        </div>
      </div>

      <div className="text-center mt-12">
        <p className="text-gray-500 dark:text-gray-400 mb-4">
          Built with ❤️ by ravsalt
        </p>
        <a
          href="https://github.com/ravsalt/neurogen"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-6 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
        >
          <FiGithub className="mr-2" />
          View on GitHub
        </a>
      </div>
    </main>
  );
};

export default About;
