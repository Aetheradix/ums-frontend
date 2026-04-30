import { masterUrls } from 'features/master/urls';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Tabs } from 'shared/new-components';
import WorkspaceLayout from 'shared/components/workspace-layout/WorkspaceLayout';

export default function MainLayout({ children }: React.PropsWithChildren) {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(-1);

  // Sync tab index with current route
  useEffect(() => {
    const path = location.pathname;
    if (path.startsWith(masterUrls.subjectCategory.root)) setActiveIndex(0);
    else if (path.startsWith(masterUrls.officeType.root)) setActiveIndex(1);
    else if (path.startsWith(masterUrls.department.root)) setActiveIndex(2);
    else if (path.startsWith(masterUrls.designation.root)) setActiveIndex(3);
    else setActiveIndex(-1);
  }, [location.pathname]);

  const handleTabChange = (e: { index: number }) => {
    setActiveIndex(e.index);
    switch (e.index) {
      case 0:
        navigate(masterUrls.subjectCategory.root);
        break;
      case 1:
        navigate(masterUrls.officeType.root);
        break;
      case 2:
        navigate(masterUrls.department.root);
        break;
      case 3:
        navigate(masterUrls.designation.root);
        break;
    }
  };

  return (
    <WorkspaceLayout>
      {/* Sub-Navigation for Master Modules */}
      {activeIndex >= 0 && (
        <div className="bg-white w-full dark-theme:bg-slate-900">
          <div className="max-w-[1320px] mx-auto px-6 pt-3">
            <Tabs
              activeIndex={activeIndex}
              onTabChange={handleTabChange}
              tabs={[
                { title: 'Subject Category', content: null },
                { title: 'Office Type', content: null },
                { title: 'Department', content: null },
                { title: 'Designation', content: null },
              ]}
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
