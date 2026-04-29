import React from 'react';
import { useNavigate } from 'react-router-dom';
import './../../menu/components/ServicesGrid.css';
import Tile from '../../../../shared/components/Tiles/Tile';

interface SubMenuGridProps {
  items: Menu.MenuItem[];
}

const SubMenuGrid: React.FC<SubMenuGridProps> = ({ items }) => {
  const navigate = useNavigate();

  return (
    <div className="db-services-grid">
      {items.map((item, index) => (
        <Tile
          key={index}
          title={item.label}
          icon={item.icon}
          colorScheme={item.colorScheme}
          description={item.description}
          badge={item.badge}
          badgeColor={item.badgeColor}
          onClick={item.path ? () => navigate(item.path!) : undefined}
        />
      ))}
    </div>
  );
};

export default SubMenuGrid;
