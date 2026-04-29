import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ServicesGrid.css';
import Tile from '../../../../shared/components/Tiles/Tile';
import { menuConfig } from '../../../../config/menu-routes';

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
            service.slug && navigate(`/home/sub-menu/${service.slug}`)
          }
        />
      ))}
    </div>
  );
};

export default ServicesGrid;
