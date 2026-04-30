import React from 'react';
import Breadcrumb from 'shared/new-components/Breadcrumb';
import { homeUrls } from '../../urls';
import '../styles/subMenu.css';

interface SubMenuHeaderProps {
  serviceTitle: string;
  category?: string;
}

const SubMenuHeader: React.FC<SubMenuHeaderProps> = ({
  serviceTitle,
  category,
}) => {
  return (
    <div className="submenu-header">
      <Breadcrumb
        items={[
          { label: 'Home', to: homeUrls.menu.root },
          ...(category ? [{ label: category }] : []),
          { label: serviceTitle },
        ]}
      />

      <div className="submenu-welcome">
        <h1>
          Welcome, <span className="submenu-name">Alex Lin</span>
        </h1>
        <p>Select a submodule to manage your workspace.</p>
      </div>
    </div>
  );
};

export default SubMenuHeader;
