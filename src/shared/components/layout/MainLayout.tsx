import React, { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Tabs } from 'shared/new-components';
import WorkspaceLayout from 'shared/components/workspace-layout/WorkspaceLayout';
import { menuConfig } from 'config/menu-routes';
import './MainLayout.css';

export default function MainLayout({ children }: React.PropsWithChildren) {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract master tabs from configuration
  const masterTabs = useMemo(() => {
    const masterData = menuConfig.find(item => item.slug === 'master-data');
    return masterData?.children || [];
  }, []);

  // Sync active index based on current path
  const activeIndex = useMemo(() => {
    const path = location.pathname;
    return masterTabs.findIndex(tab => path.startsWith(tab.path || ''));
  }, [location.pathname, masterTabs]);

  const handleTabChange = (e: { index: number }) => {
    const targetTab = masterTabs[e.index];
    if (targetTab?.path) {
      navigate(targetTab.path);
    }
  };

  return (
    <WorkspaceLayout>
      {/* Sub-Navigation for Master Modules */}
      {activeIndex >= 0 && (
        <div className="main-layout-nav">
          <div className="max-w-[1320px] mx-auto px-6 pt-3">
            <Tabs
              activeIndex={activeIndex}
              onTabChange={handleTabChange}
              tabs={masterTabs.map(tab => ({
                title: tab.label,
                content: null,
              }))}
            />
          </div>
        </div>
      )}

      {/* Main Page Content */}
      <div className="main-layout-content">
        <div className="max-w-[1320px] mx-auto px-6 py-6 pb-16">{children}</div>
      </div>
    </WorkspaceLayout>
  );
}
