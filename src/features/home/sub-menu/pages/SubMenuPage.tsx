import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import SubMenuHeader from '../components/SubMenuHeader';
import SubMenuGrid from '../components/SubMenuGrid';
import { menuConfig } from '../../../../config/menu-routes';
import '../styles/subMenu.css';

const SubMenuPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const service = menuConfig.find(s => s.slug === slug);

  if (!service || !service.children) {
    return <Navigate to="/home/menu" replace />;
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
