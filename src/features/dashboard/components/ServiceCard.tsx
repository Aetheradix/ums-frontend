import React from 'react';
import '../styles/dashboard.css';

interface ServiceCardProps {
  title: string;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, icon, iconBg, iconColor }) => {
  return (
    <div className="db-card-container">
      <div className="db-service-card">
        {/* Top corner action container */}
        <div className="db-card-corner-action">
          <div className="db-card-arrow">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="19" x2="19" y2="5" />
              <polyline points="9 5 19 5 19 15" />
            </svg>
          </div>
        </div>

        {/* Content area */}
        <div className="db-card-content">
          <div className="db-card-icon-box" style={{ backgroundColor: iconBg, color: iconColor }}>
            {icon}
          </div>
          <div className="db-card-title">{title}</div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
