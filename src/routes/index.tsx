import { createBrowserRouter, Navigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Index from '../pages/Index';
import Statistics from '../pages/Statistics';
import Settings from '../pages/Settings';
import LandingPage from '../pages/auth/LandingPage';
import SecureRoute from '../components/security/SecureRoute';
import ErrorPage from '../pages/ErrorPage';

export const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <ErrorPage />,
    children: [
      {
        path: '*',
        element: <Navigate to="/landing" replace />,
      },
      {
        path: 'landing',
        element: <LandingPage />,
      },
      {
        path: 'auth',
        element: <Navigate to="/landing" replace />,
      },
      {
        element: <Layout />,
        children: [
          {
            path: 'home',
            element: (
              <SecureRoute>
                <Index />
              </SecureRoute>
            ),
          },
          {
            path: 'statistics',
            element: (
              <SecureRoute>
                <Statistics />
              </SecureRoute>
            ),
          },
          {
            path: 'settings',
            element: (
              <SecureRoute>
                <Settings />
              </SecureRoute>
            ),
          },
        ],
      },
    ],
  },
]);