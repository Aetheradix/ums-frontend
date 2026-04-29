import React from 'react';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

  return (
    <div className="submenu-header-section">
      {/* Breadcrumb */}
      <nav className="submenu-breadcrumb">
        <span
          className="submenu-breadcrumb-link"
          onClick={() => navigate(homeUrls.menu.root)}
        >
          Home
        </span>
        <span className="submenu-breadcrumb-sep">&rsaquo;</span>
        {category && (
          <>
            <span className="submenu-breadcrumb-text">{category}</span>
            <span className="submenu-breadcrumb-sep">&rsaquo;</span>
          </>
        )}
        <span className="submenu-breadcrumb-current">{serviceTitle}</span>
      </nav>

      {/* Welcome heading */}
      <div className="submenu-welcome">
        <h1>
          Welcome, <span className="db-name-highlight">Alex Lin</span>
        </h1>
        <p>Select a submodule to manage your workspace.</p>
      </div>
    </div>
  );
};

export default SubMenuHeader;
