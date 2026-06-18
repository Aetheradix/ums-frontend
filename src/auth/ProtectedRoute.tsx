import React, { useEffect } from 'react';
import { useAuth } from './useAuth';
import { UniversityLoader } from 'shared/components/progress';

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { authenticated, isLoading, login } = useAuth();

  useEffect(() => {
    if (!isLoading && authenticated === false) {
      login();
    }
  }, [isLoading, authenticated, login]);

  if (isLoading) {
    return <UniversityLoader text="Verifying session..." />;
  }

  if (authenticated === true) {
    return <>{children}</>;
  }

  return null;
};
