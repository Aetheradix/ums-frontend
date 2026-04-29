import React from 'react';
import WelcomeBanner from '../components/WelcomeBanner';
import ServiceFilters from '../components/ServiceFilters';
import ServicesGrid from '../components/ServicesGrid';
import '../styles/menu.css';

const MenuPage: React.FC = () => {
  return (
    <div className="db-main-content">
      <div className="dashboard-container">
        <WelcomeBanner />
        <ServiceFilters />
        <ServicesGrid />
      </div>
    </div>
  );
};

export default MenuPage;
