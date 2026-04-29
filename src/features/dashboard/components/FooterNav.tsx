import React from 'react';
import '../styles/dashboard.css';

const FooterNav: React.FC = () => {
  const links = [
    'Home', 'Human Resources', 'Finance', 'Inventory', 'Sales', 
    'Procurement', 'Projects', 'Reports', 'Settings'
  ];

  return (
    <nav className="db-footer-nav">
      <div className="dashboard-container db-footer-nav-inner">
        {links.map((link, index) => (
          <React.Fragment key={link}>
            <a href="#" className="db-footer-link">{link}</a>
            {index < links.length - 1 && <span className="db-footer-sep"></span>}
          </React.Fragment>
        ))}
      </div>
    </nav>
  );
};

export default FooterNav;
