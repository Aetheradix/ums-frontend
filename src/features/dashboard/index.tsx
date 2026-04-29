import React from 'react';
import { Route, Routes } from 'react-router';
import DashboardPage from './pages/DashboardPage';
import WorkspaceLayout from '../../shared/components/workspace-layout/WorkspaceLayout';

const DashboardRoutes: React.FC = () => {
  return (
    <WorkspaceLayout>
      <Routes>
        <Route path="/*" element={<DashboardPage />} />
      </Routes>
    </WorkspaceLayout>
  );
};

export default DashboardRoutes;
