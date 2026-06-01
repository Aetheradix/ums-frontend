import React, {
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from 'oidc-client-ts';
import { userManager } from './AuthService';
import { ApiService } from 'services';

export interface AuthContextProps {
  user: User | null;
  authenticated: boolean | null;
  isLoading: boolean;
  permissions: Record<string, string[]>;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [permissions, setPermissions] = useState<Record<string, string[]>>({});
  const mounted = useRef(false);
  const navigate = useNavigate();

  const loadPermissions = useCallback(async () => {
    try {
      const response = await ApiService.get<Record<string, string[]>>(
        'userManagement/users/my-permissions'
      );
      if (response && !response.error && response.data) {
        setPermissions(response.data);
      } else {
        setPermissions({});
      }
    } catch (error) {
      console.error('Failed to load permissions:', error);
      setPermissions({});
    }
  }, []);

  useEffect(() => {
    // Prevent StrictMode double execution
    if (mounted.current) return;
    mounted.current = true;

    const checkAuth = async () => {
      // 1. Handle OIDC redirect callback (code= in URL means Auth server redirected back)
      if (window.location.search.includes('code=')) {
        try {
          const callbackUser = await userManager.signinRedirectCallback();
          setUser(callbackUser);
          await loadPermissions();
          setAuthenticated(true);
          // Navigate to home after successful callback
          navigate('/home', { replace: true });
        } catch (err) {
          console.error('Auth callback failed:', err);
          setAuthenticated(false);
        } finally {
          setIsLoading(false);
        }
        return;
      }

      // 2. Check for an existing session (page refresh, returning user)
      try {
        const existingUser = await userManager.getUser();
        if (existingUser && !existingUser.expired) {
          setUser(existingUser);
          await loadPermissions();
          setAuthenticated(true);
        } else {
          setUser(null);
          setPermissions({});
          setAuthenticated(false);
        }
      } catch (error) {
        console.error('Error checking OIDC auth session:', error);
        setUser(null);
        setPermissions({});
        setAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();

    // Event listeners for token lifecycle
    const onUserLoaded = async (loadedUser: User) => {
      setUser(loadedUser);
      await loadPermissions();
      setAuthenticated(true);
    };

    const onUserUnloaded = () => {
      setUser(null);
      setPermissions({});
      setAuthenticated(false);
    };

    const onAccessTokenExpired = () => {
      setUser(null);
      setPermissions({});
      setAuthenticated(false);
    };

    const onSilentRenewError = (err: Error) => {
      console.error('Silent renew error:', err);
      setUser(null);
      setPermissions({});
      setAuthenticated(false);
    };

    userManager.events.addUserLoaded(onUserLoaded);
    userManager.events.addUserUnloaded(onUserUnloaded);
    userManager.events.addAccessTokenExpired(onAccessTokenExpired);
    userManager.events.addSilentRenewError(onSilentRenewError);

    return () => {
      userManager.events.removeUserLoaded(onUserLoaded);
      userManager.events.removeUserUnloaded(onUserUnloaded);
      userManager.events.removeAccessTokenExpired(onAccessTokenExpired);
      userManager.events.removeSilentRenewError(onSilentRenewError);
    };
  }, [loadPermissions]);

  const login = async () => {
    await userManager.signinRedirect();
  };

  const logout = async () => {
    await userManager.signoutRedirect();
  };

  return (
    <AuthContext.Provider
      value={{ user, authenticated, isLoading, permissions, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
