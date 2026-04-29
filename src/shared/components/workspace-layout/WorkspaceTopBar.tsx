import React from 'react';
import './WorkspaceLayout.css';

const TopBar: React.FC = () => {
  return (
    <div className="db-topbar">
      <div className="dashboard-container db-topbar-inner">
        <div className="db-topbar-left">
          <span>UMS Enterprises</span>
        </div>
        <div className="db-topbar-right">
          <span>Help Center</span>
          <span className="db-dot">·</span>
          <span>Status</span>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
