import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import WorkspaceLayout from '../../shared/components/workspace-layout/WorkspaceLayout';
import MenuPage from './menu/pages/MenuPage';
import SubMenuPage from './sub-menu/pages/SubMenuPage';

const HomeRoutes: React.FC = () => {
  return (
    <WorkspaceLayout>
      <Routes>
        <Route index element={<Navigate to="menu" replace />} />
        <Route path="menu" element={<MenuPage />} />
        <Route path="sub-menu/:slug" element={<SubMenuPage />} />
      </Routes>
    </WorkspaceLayout>
  );
};

export default HomeRoutes;
