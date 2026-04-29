import { useState } from 'react';
import styles from '../styles/ems.module.css';

interface LoginPageProps {
  onLogin: () => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);

  const handleLogin = () => {
    // Add real auth logic here if needed
    onLogin();
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginGrid} />
      <div className={styles.loginGlow} />

      <div className={styles.loginCard}>
        {/* Logo */}
        <div className={styles.loginLogo}>
          <div className={styles.loginLogoIcon}>N</div>
          <div>
            <div className={styles.loginLogoText}>UMS ERP</div>
            <div className={styles.loginLogoSub}>Enterprise Workspace OS</div>
          </div>
        </div>

        <h1 className={styles.loginTitle}>Welcome back</h1>
        <p className={styles.loginSubtitle}>Sign in to your enterprise workspace</p>

        {/* Email */}
        <label className={styles.loginLabel}>Email address</label>
        <input
          className={styles.loginInput}
          type="email"
          placeholder="alex.lin@ums.edu"
          value={email}
          onChange={e => setEmail(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleLogin()}
        />

        {/* Password */}
        <label className={styles.loginLabel}>Password</label>
        <input
          className={styles.loginInput}
          type="password"
          placeholder="••••••••••••"
          value={password}
          onChange={e => setPassword(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleLogin()}
        />

        {/* Row */}
        <div className={styles.loginRow}>
          <label className={styles.loginRemember}>
            <input
              type="checkbox"
              checked={remember}
              onChange={e => setRemember(e.target.checked)}
            />
            Keep me signed in
          </label>
          <span className={styles.loginForgot}>Forgot password?</span>
        </div>

        <button className={styles.loginBtn} onClick={handleLogin}>
          Sign in to workspace
        </button>

        <div className={styles.loginDivider}>or</div>

        <button className={styles.loginSso} onClick={handleLogin}>
          Continue with UMS SSO
        </button>

        <div style={{ textAlign: 'center' }}>
          <span className={styles.loginBadge}>
            <span className={styles.loginBadgeDot} />
            256-bit encrypted · SOC 2 Type II certified
          </span>
        </div>
      </div>
    </div>
  );
}
