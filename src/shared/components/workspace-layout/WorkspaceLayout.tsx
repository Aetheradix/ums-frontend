import React from 'react';
import WorkspaceTopBar from './WorkspaceTopBar';
import WorkspaceHeader from './WorkspaceHeader';
import WorkspaceFooterNav from './WorkspaceFooterNav';
import WorkspaceFooterBar from './WorkspaceFooterBar';
import './WorkspaceLayout.css';

export const WorkspaceLayout: React.FC<{children: React.ReactNode}> = ({ children }) => {
  return (
    <div className="ums-workspace">
      <WorkspaceTopBar />
      <WorkspaceHeader />
      <main className="workspace-main-content">
        {children}
      </main>
      <WorkspaceFooterNav />
      <WorkspaceFooterBar />
    </div>
  );
};

export default WorkspaceLayout;
