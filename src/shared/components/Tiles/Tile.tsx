import React from 'react';
import { Icon } from '../Icon/Icon';
import './Tile.css';

interface TileProps {
  title: string;
  icon?: string | React.ReactNode;
  colorScheme?:
    | 'blue'
    | 'purple'
    | 'gray'
    | 'green'
    | 'orange'
    | 'red'
    | 'pink'
    | 'teal'
    | 'indigo'
    | 'amber';
  description?: string;
  badge?: string;
  badgeColor?: string;
  onClick?: () => void;
}

const Tile: React.FC<TileProps> = ({
  title,
  icon,
  colorScheme = 'gray',
  description,
  badge,
  badgeColor,
  onClick,
}) => {
  return (
    <div
      className="db-card-container"
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <div className="db-service-card">
        {/* Top corner action container */}
        <div className="db-card-corner-action">
          <div className="db-card-arrow">
            <i className="pi pi-arrow-up-right"></i>
          </div>
        </div>

        {/* Content area */}
        <div className="db-card-content">
          {icon && (
            <div className={`db-card-icon-box bg-${colorScheme}`}>
              {typeof icon === 'string' ? <Icon name={icon} /> : icon}
            </div>
          )}
          <div className="db-card-title">{title}</div>
          {description && (
            <p className="db-card-description line-clamp-2">{description}</p>
          )}
          {badge && (
            <div className="db-card-badge">
              <span
                className="db-card-badge-dot"
                style={{ backgroundColor: badgeColor || '#22c55e' }}
              />
              {badge}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tile;
