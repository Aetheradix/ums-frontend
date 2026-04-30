import React, { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Tabs } from 'shared/new-components';
import WorkspaceLayout from 'shared/components/workspace-layout/WorkspaceLayout';
import { menuConfig } from 'config/menu-routes';

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
        <div className="bg-white w-full dark-theme:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
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
      <div className="bg-slate-50 flex-1 min-h-[calc(100vh-140px)] dark-theme:bg-[#0f172a]">
        <div className="max-w-[1320px] mx-auto px-6 py-6 pb-16">{children}</div>
      </div>
    </WorkspaceLayout>
  );
}
