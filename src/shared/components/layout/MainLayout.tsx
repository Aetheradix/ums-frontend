import { useMenu } from 'config/menu-routes';
import React, { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import WorkspaceLayout from 'shared/components/workspace-layout/WorkspaceLayout';
import { Sidebar, Tabs } from 'shared/new-components';
import './MainLayout.css';

export default function MainLayout({ children }: React.PropsWithChildren) {
  const menuConfig = useMenu();
  const location = useLocation();
  const navigate = useNavigate();

  // Extract active parent module and children dynamically based on current route
  const activeModuleInfo = useMemo(() => {
    function findParentAndChildren(
      items: any[],
      currentPath: string
    ): { parent: any; children: any[] } | null {
      for (const item of items) {
        if (item.children && item.children.length > 0) {
          const hasMatchingChild = item.children.some(
            (child: any) =>
              child.path &&
              (currentPath.startsWith(child.path) ||
                child.path.startsWith(currentPath))
          );
          if (hasMatchingChild) {
            return { parent: item, children: item.children };
          }
          const found = findParentAndChildren(item.children, currentPath);
          if (found) return found;
        }
      }
      return null;
    }
    return findParentAndChildren(menuConfig, location.pathname);
  }, [location.pathname]);

  const masterTabs = useMemo(() => {
    if (activeModuleInfo) return activeModuleInfo.children;
    const masterData = menuConfig.find(item => item.slug === 'master-data');
    return masterData?.children || [];
  }, [activeModuleInfo]);

  const navigationStyle = useMemo(() => {
    return activeModuleInfo?.parent?.navigationStyle || 'tabs';
  }, [activeModuleInfo]);

  const isSidebarMode = navigationStyle === 'sidebar';

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

  const handleSidebarItemClick = (index: number) => {
    handleTabChange({ index });
  };

  const sidebarIcon = useMemo(() => {
    const parentIcon = activeModuleInfo?.parent?.icon;
    if (typeof parentIcon === 'string') {
      if (parentIcon === 'grid_view') return 'th-large';
      return parentIcon;
    }
    return 'shield';
  }, [activeModuleInfo]);

  return (
    <WorkspaceLayout>
      {/* Sub-Navigation for Master Modules (Hidden for Sidebar mode) */}
      {!isSidebarMode && activeIndex >= 0 && (
        <div className="main-layout-nav">
          <div className="mx-auto px-6">
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
        {isSidebarMode ? (
          <div className="mx-auto px-6 py-6 pb-16 flex flex-col lg:flex-row gap-8">
            {/* Sidebar Navigation */}
            <Sidebar
              headerTitle={activeModuleInfo?.parent?.label || 'Navigation'}
              headerSubtitle={activeModuleInfo?.parent?.description || ''}
              headerIcon={sidebarIcon}
              items={masterTabs}
              activeIndex={activeIndex}
              onItemClick={handleSidebarItemClick}
            />

            {/* Sub-route Content */}
            <main className="sis-main-content-area">{children}</main>
          </div>
        ) : (
          <div className="mx-auto px-6 py-6 pb-16">{children}</div>
        )}
      </div>
    </WorkspaceLayout>
  );
}
