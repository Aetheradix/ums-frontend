import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { menuConfig } from '../../../../config/menu-routes';
import { homeUrls } from '../../urls';
import SubMenuGrid from '../components/SubMenuGrid';
import SubMenuHeader from '../components/SubMenuHeader';
import '../styles/subMenu.css';

const SubMenuPage: React.FC = () => {
  const { moduleId } = useParams<{ moduleId: string }>();
  const service = menuConfig.find(s => s.slug === moduleId);

  if (!service || !service.children) {
    return <Navigate to={homeUrls.menu.root} replace />;
  }

  return (
    <div className="submenu-page">
      <div className="submenu-page-container">
        <SubMenuHeader
          serviceTitle={service.label}
          category={service.category}
        />
        <SubMenuGrid items={service.children} />
      </div>
    </div>
  );
};

export default SubMenuPage;
