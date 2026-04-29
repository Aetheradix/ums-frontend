import React from 'react';
import FooterBar from './components/FooterBar';
import FooterNav from './components/FooterNav';
import Header from './components/Header';
import ServiceFilters from './components/ServiceFilters';
import ServicesGrid from './components/ServicesGrid';
import TopBar from './components/TopBar';
import WelcomeBanner from './components/WelcomeBanner';
import './styles/dashboard.css';

const DashboardPage: React.FC = () => {
  return (
    <div className="ums-dashboard">
      <TopBar />
      <Header />
      
      <main className="db-main-content">
        <div className="dashboard-container">
          <WelcomeBanner />
          <ServiceFilters />
          <ServicesGrid />
        </div>
      </main>

      <FooterNav />
      <FooterBar />
    </div>
  );
};

export default DashboardPage;
