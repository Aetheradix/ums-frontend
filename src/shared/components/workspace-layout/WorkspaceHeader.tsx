import React, { useEffect, useState } from 'react';
import { WaffleMenu } from 'shared/new-components';
import './WorkspaceHeader.css';

const Header: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

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
          <div className="ws-user-profile">
            <div className="ws-avatar">AL</div>

            <span className="ws-username">Alex Lin</span>

            <i className="pi pi-chevron-down" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
