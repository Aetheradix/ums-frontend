import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthService } from './AuthService';

export const CallbackPage: React.FC = () => {
  const navigate = useNavigate();
  const processed = useRef(false);

  useEffect(() => {
    if (processed.current) return;
    processed.current = true;

    const processCallback = async () => {
      try {
        await AuthService.signinRedirectCallback();
        navigate('/home', { replace: true });
      } catch (error) {
        console.error('Error handling OIDC callback:', error);
        // Fallback check: if already authenticated, go to home; otherwise go to public
        const authenticated = await AuthService.isAuthenticated();
        if (authenticated) {
          navigate('/home', { replace: true });
        } else {
          navigate('/public', { replace: true });
        }
      }
    };

    processCallback();
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-zinc-950">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-sm font-semibold text-slate-500 dark:text-zinc-400">
          Completing sign-in...
        </p>
      </div>
    </div>
  );
};
