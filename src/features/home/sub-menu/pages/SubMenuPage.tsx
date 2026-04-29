import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import SubMenuHeader from '../components/SubMenuHeader';
import SubMenuGrid from '../components/SubMenuGrid';
import { menuConfig } from '../../../../config/menu-routes';
import '../styles/subMenu.css';
import { homeUrls } from '../../urls';

const SubMenuPage: React.FC = () => {
  const { moduleId } = useParams<{ moduleId: string }>();

  const service = menuConfig.find(s => s.slug === moduleId);

  if (!service || !service.children) {
    return <Navigate to={homeUrls.menu.root} replace />;
  }

  return (
    <div className="db-main-content">
      <div className="dashboard-container">
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
