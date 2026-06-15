import React, { useEffect, useState, useRef } from 'react';
import { WaffleMenu } from 'shared/new-components';
import { useAuth } from 'auth';
import './WorkspaceHeader.css';

const Header: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');

    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);

      /* ui changes update starts - 11/05/2026 */
      document.body.classList.add('dark');
      /* ui changes update ends - 11/05/2026 */
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => {
      const newMode = !prev;

      if (newMode) {
        /* ui changes update starts - 11/05/2026 */
        document.body.classList.add('dark');
        /* ui changes update ends - 11/05/2026 */

        localStorage.setItem('theme', 'dark');
      } else {
        /* ui changes update starts - 11/05/2026 */
        document.body.classList.remove('dark');
        /* ui changes update ends - 11/05/2026 */

        localStorage.setItem('theme', 'light');
      }

      return newMode;
    });
  };

  const username = user?.profile?.name || user?.profile?.sub || 'User';
  const email = user?.profile?.email || 'No email provided';
  const firstName = user?.profile?.given_name || '';
  const lastName = user?.profile?.family_name || '';
  const fullName =
    firstName || lastName ? `${firstName} ${lastName}`.trim() : '';

  const initials =
    username
      .split(' ')
      .map((n: string) => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase() || 'U';

  return (
    <header className="ws-header">
      <div className="ws-header-inner">
        {/* Logo */}
        <div className="ws-logo-section">
          <div className="ws-logo-box">N</div>

          <div className="ws-logo-text">
            <span className="ws-logo-title">UMS ERP</span>

            <span className="ws-logo-subtitle">Workspace OS</span>
          </div>
        </div>

        {/* Search */}
        <div className="ws-search-section">
          <div className="ws-search-container">
            <i className="pi pi-search ws-search-icon" />

            <input
              type="text"
              className="ws-search-input"
              placeholder="Search Services, records, people..."
            />
          </div>
        </div>

        {/* Actions */}
        <div className="ws-header-actions">
          <div className="ws-action-icons">
            {/* Dark Mode Toggle */}
            <div
              className="ws-icon-btn"
              onClick={toggleDarkMode}
              title="Toggle Dark Mode"
            >
              <i className={`pi ${isDarkMode ? 'pi-sun' : 'pi-moon'}`} />
            </div>

            {/* Help */}
            <div className="ws-icon-btn">
              <i className="pi pi-question-circle" />
            </div>

            {/* Notification */}
            <div className="ws-notif-btn">
              <i className="pi pi-bell" />

              <span className="ws-badge">1</span>
            </div>

            <WaffleMenu isDarkMode={isDarkMode} />
          </div>

          {/* User Profile */}
          <div className="relative" ref={dropdownRef}>
            <div
              className="ws-user-profile"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <div className="ws-avatar">{initials}</div>

              <span className="ws-username">{username}</span>

              <i
                className={`pi pi-chevron-${dropdownOpen ? 'up' : 'down'} text-[10px] text-slate-500`}
              />
            </div>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="ws-profile-dropdown">
                <div className="ws-dropdown-header">
                  <p className="text-xs text-slate-400 dark:text-zinc-500 font-bold">
                    Signed in as
                  </p>
                  <p className="text-sm font-semibold text-slate-800 dark:text-zinc-200 truncate">
                    {username}
                  </p>
                  {fullName && (
                    <p className="text-xs text-slate-600 dark:text-zinc-300 truncate mt-0.5 font-medium">
                      {fullName}
                    </p>
                  )}
                  <p className="text-xs text-slate-500 dark:text-zinc-400 truncate mt-0.5">
                    {email}
                  </p>
                </div>

                <button onClick={logout} className="ws-dropdown-item-danger">
                  <i className="pi pi-sign-out text-sm" />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
