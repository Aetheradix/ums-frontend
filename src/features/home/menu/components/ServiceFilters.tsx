import React from 'react';
import '../styles/menu.css';

const filters = [
  { label: 'Favourite', active: true, icon: true },
  { label: 'All', active: false },
  { label: 'Academics', active: false },
  { label: 'HR', active: false },
  { label: 'Finance', active: false },
  { label: 'Operation', active: false },
];

const ServiceFilters: React.FC = () => (
  <div>
    <div className="service-filters-header">
      <h2 className="service-filters-title">All Services</h2>
      <a href="#" className="service-filters-link">
        Customized Tiles
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </a>
    </div>

    <div className="service-filter-tabs">
      {filters.map(filter => (
        <button
          key={filter.label}
          className={`service-filter-tab${filter.active ? ' active' : ''}`}
        >
          {filter.icon && (
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          )}
          {filter.label}
        </button>
      ))}
    </div>
  </div>
);

export default ServiceFilters;
