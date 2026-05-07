import React from 'react';
import WorkspaceFooterBar from './WorkspaceFooterBar';
// import WorkspaceFooterNav from './WorkspaceFooterNav';
import WorkspaceHeader from './WorkspaceHeader';
import './WorkspaceLayout.css';
import WorkspaceTopBar from './WorkspaceTopBar';

export const WorkspaceLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <div className="ws-root">
    <WorkspaceTopBar />
    <WorkspaceHeader />
    <main className="ws-main">{children}</main>
    {/* <WorkspaceFooterNav /> */}
    <WorkspaceFooterBar />
  </div>
);

export default WorkspaceLayout;
