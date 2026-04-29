import React from 'react';
import '../styles/menu.css';

const WelcomeBanner: React.FC = () => {
  return (
    <section className="db-welcome-banner">
      <div className="db-sso-notice">
        <span className="db-sso-icon">
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
          </svg>
        </span>
        Logged in via UMS SSO - session expires in 86 days
      </div>

      <div className="db-welcome-content">
        <div className="db-welcome-text">
          <h1>
            Welcome, <span className="db-name-highlight">Alex Lin</span>
          </h1>
          <p>
            Your unified workspace. Every service, every record — one tile away.
          </p>
        </div>

        <div className="db-welcome-actions">
          <button className="db-btn db-btn-outline">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
              <polyline points="16 6 12 2 8 6"></polyline>
              <line x1="12" y1="2" x2="12" y2="15"></line>
            </svg>
            Export
          </button>
          <button className="db-btn db-btn-filled">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            New record
          </button>
        </div>
      </div>
    </section>
  );
};

export default WelcomeBanner;
