
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface RouteGuardProps {
  children: ReactNode;
  allowedRoles?: string[];
}

export const RouteGuard = ({ children, allowedRoles = [] }: RouteGuardProps) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const userRole = localStorage.getItem('userRole');

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && userRole && !allowedRoles.includes(userRole)) {
    // Redirect to a forbidden page or dashboard based on role
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
