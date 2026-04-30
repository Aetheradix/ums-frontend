import React from 'react';
import WorkspaceFooterBar from './WorkspaceFooterBar';
import WorkspaceFooterNav from './WorkspaceFooterNav';
import WorkspaceHeader from './WorkspaceHeader';
import WorkspaceTopBar from './WorkspaceTopBar';
import './WorkspaceLayout.css';

export const WorkspaceLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <div className="ws-root">
    <WorkspaceTopBar />
    <WorkspaceHeader />
    <main className="ws-main">{children}</main>
    <WorkspaceFooterNav />
    <WorkspaceFooterBar />
  </div>
);

export default WorkspaceLayout;
