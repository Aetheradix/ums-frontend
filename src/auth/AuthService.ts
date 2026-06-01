import { UserManager, type UserManagerSettings } from 'oidc-client-ts';

const oidcConfig: UserManagerSettings = {
  authority: import.meta.env.VITE_AUTH_BASE || 'https://localhost:7221',
  client_id: import.meta.env.VITE_CLIENT_ID || 'spa-client',
  redirect_uri:
    import.meta.env.VITE_AUTHORIZE_REDIRECT ||
    'https://localhost:5200/callback',
  post_logout_redirect_uri:
    import.meta.env.VITE_POST_LOGOUT_URI || 'https://localhost:5200/',
  response_type: 'code',
  scope:
    import.meta.env.VITE_AUTHORIZE_SCOPE || 'openid profile offline_access',
  automaticSilentRenew: true,
  monitorSession: true,
};

export const userManager = new UserManager(oidcConfig);

export const AuthService = {
  signinRedirect: () => userManager.signinRedirect(),
  signoutRedirect: () => userManager.signoutRedirect(),
  signinRedirectCallback: () => userManager.signinRedirectCallback(),
  getUser: () => userManager.getUser(),
  isAuthenticated: async () => {
    const user = await userManager.getUser();
    return !!user && !user.expired;
  },
};
