import { Link, useLocation } from 'react-router-dom';
import { FiGithub } from 'react-icons/fi';

interface NavLink {
  name: string;
  path: string;
  external?: boolean;
}

export default function Header() {
  const location = useLocation();
  
  const navLinks: NavLink[] = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'GitHub', path: 'https://github.com/ravsalt/neurogen', external: true },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <Link to="/" className="flex items-center space-x-2 group">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 text-white font-bold">
              N
            </span>
            <span className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Neurogen
            </span>
          </Link>

          <nav className="flex items-center space-x-2">
            {navLinks.map(({ path, name, external }) => (
              external ? (
                <a
                  key={path}
                  href={path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors"
                  aria-label={name}
                >
                  <FiGithub className="w-5 h-5" />
                </a>
              ) : (
                <Link
                  key={path}
                  to={path}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    location.pathname === path
                      ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30'
                      : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                  }`}
                >
                  {name}
                </Link>
              )
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}