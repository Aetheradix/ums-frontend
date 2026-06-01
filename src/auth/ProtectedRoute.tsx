import React, { useEffect } from 'react';
import { useAuth } from './useAuth';

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
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-zinc-950">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm font-semibold text-slate-500 dark:text-zinc-400">
            Verifying session...
          </p>
        </div>
      </div>
    );
  }

  if (authenticated === true) {
    return <>{children}</>;
  }

  return null;
};
