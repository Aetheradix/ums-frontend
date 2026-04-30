import React from 'react';
import { useNavigate } from 'react-router-dom';
import { menuConfig } from '../../../../config/menu-routes';
import Tile from '../../../../shared/components/Tiles/Tile';
import { homeUrls } from '../../urls';
import './ServicesGrid.css';

const ServicesGrid: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="db-services-grid">
      {menuConfig.map((service, index) => (
        <Tile
          key={index}
          title={service.label}
          icon={service.icon}
          colorScheme={service.colorScheme}
          onClick={() =>
            service.slug && navigate(homeUrls.subMenu.root(service.slug))
          }
        />
      ))}
    </div>
  );
};

export default ServicesGrid;
