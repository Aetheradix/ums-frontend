import { menuConfig } from 'config/menu-routes';
import React, { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import WorkspaceLayout from 'shared/components/workspace-layout/WorkspaceLayout';
import { Tabs } from 'shared/new-components';
import './MainLayout.css';

export default function MainLayout({ children }: React.PropsWithChildren) {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract master tabs dynamically based on current route
  const masterTabs = useMemo(() => {
    function getTabsForPath(items: any[], currentPath: string): any[] {
      for (const item of items) {
        if (item.children) {
          if (
            item.children.some(
              (child: any) =>
                child.path &&
                (currentPath.startsWith(child.path) ||
                  child.path.startsWith(currentPath))
            )
          ) {
            return item.children;
          }
          const found = getTabsForPath(item.children, currentPath);
          if (found.length > 0) return found;
        }
      }
      return [];
    }

    const matchedTabs = getTabsForPath(menuConfig, location.pathname);
    if (matchedTabs.length > 0) return matchedTabs;

    const masterData = menuConfig.find(item => item.slug === 'master-data');
    return masterData?.children || [];
  }, [location.pathname]);

  // Sync active index based on current path
  const activeIndex = useMemo(() => {
    const path = location.pathname;
    return masterTabs.findIndex(
      tab =>
        tab.path && (path.startsWith(tab.path) || tab.path.startsWith(path))
    );
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
          <div className="max-w-[1320px] mx-auto px-6">
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
