import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Layout from './Layout/Layout';
import { ErrorBoundary } from './components/ErrorBoundary';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Github = lazy(() => import('./pages/Github'));

import NotFound from './pages/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorBoundary><NotFound /></ErrorBoundary>,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'github',
        element: <Github />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);

export default router;