import React from 'react';
import './Tile.css';
import { Icon } from '../Icon/Icon';

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
            <svg
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="19" x2="19" y2="5" />
              <polyline points="9 5 19 5 19 15" />
            </svg>
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
          {description && <p className="db-card-description">{description}</p>}
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
