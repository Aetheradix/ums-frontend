import React from 'react';
import './ServicesGrid.css';
import Tile from '../../../shared/components/Tiles/Tile';
import { servicesData } from '../data/servicesData';

const ServicesGrid: React.FC = () => {
  return (
    <div className="db-services-grid">
      {servicesData.map((service, index) => (
        <Tile 
          key={index}
          title={service.title}
          icon={service.icon}
          iconBg={service.iconBg}
          iconColor={service.iconColor}
        />
      ))}
    </div>
  );
};

export default ServicesGrid;
