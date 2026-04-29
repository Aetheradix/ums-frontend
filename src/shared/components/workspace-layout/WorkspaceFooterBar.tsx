import React from 'react';
import './WorkspaceLayout.css';

const FooterBar: React.FC = () => {
  return (
    <footer className="db-footer-bar">
      <div className="dashboard-container db-footer-bar-inner">
        <div className="db-footer-copy">
          © 2026 UMS Systems – Enterprise Operating System
        </div>
        <div className="db-footer-links">
          <span>Privacy</span>
          <span>Terms</span>
          <span>Status</span>
        </div>
      </div>
    </footer>
  );
};

export default FooterBar;
