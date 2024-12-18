import { Navigate } from 'react-router-dom';
import { hasPassword } from '@/lib/security/passwordManager';

interface SecureRouteProps {
  children: React.ReactNode;
}

const SecureRoute = ({ children }: SecureRouteProps) => {
  const isAuthenticated = sessionStorage.getItem('isAuthenticated');
  const hasSetPassword = hasPassword();

  if (!hasSetPassword) {
    return <Navigate to="/landing" />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" />;
  }

  return <>{children}</>;
};

export default SecureRoute;