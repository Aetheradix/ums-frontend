import React from 'react';
import '../styles/dashboard.css';
import ServiceCard from './ServiceCard';

const ServicesGrid: React.FC = () => {
  const services = [
    { 
      title: 'Student Information System', 
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>,
      iconBg: '#eff6ff', 
      iconColor: '#3b82f6' 
    },
    { 
      title: 'Faculty Portal', 
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>,
      iconBg: '#f5f3ff', 
      iconColor: '#8b5cf6' 
    },
    { 
      title: 'Registrar / Admin Dashboard', 
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line></svg>,
      iconBg: '#f8fafc', 
      iconColor: '#64748b' 
    },
    { 
      title: 'Curriculog — Curriculum Governance', 
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>,
      iconBg: '#f0fdf4', 
      iconColor: '#22c55e' 
    },
    { 
      title: 'Competency Tracking', 
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 6c-3.18 0-5.97 1.91-7.14 4.65"></path><path d="M4.65 13.35c1.17 2.74 3.96 4.65 7.14 4.65"></path><path d="M15 12h-3V9"></path></svg>,
      iconBg: '#fff7ed', 
      iconColor: '#f97316' 
    },
    { 
      title: 'Career Gateway', 
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>,
      iconBg: '#fef2f2', 
      iconColor: '#ef4444' 
    },
    { 
      title: 'ICON – Research Compliance', 
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><rect x="9" y="10" width="6" height="4" rx="1"></rect></svg>,
      iconBg: '#fff7ed', 
      iconColor: '#ea580c' 
    },
    { 
      title: 'Disability Center', 
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="7" r="4"></circle><path d="M12 11v6m0 0l-3 3m3-3l3 3m-9-3h12"></path></svg>,
      iconBg: '#fff1f2', 
      iconColor: '#e11d48' 
    },
    { 
      title: 'Student ID & Campus Allowance', 
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"></rect><circle cx="9" cy="10" r="2"></circle><line x1="15" y1="8" x2="19" y2="8"></line><line x1="15" y1="12" x2="19" y2="12"></line><line x1="7" y1="16" x2="17" y2="16"></line></svg>,
      iconBg: '#eff6ff', 
      iconColor: '#2563eb' 
    },
    { 
      title: 'University Queue – Virtual Queuing', 
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"></rect><path d="M16 2v4"></path><path d="M8 2v4"></path><path d="M3 10h18"></path></svg>,
      iconBg: '#f5f3ff', 
      iconColor: '#7c3aed' 
    },
    { 
      title: 'FIXIT — Facility Management', 
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>,
      iconBg: '#f8fafc', 
      iconColor: '#334155' 
    },
    { 
      title: 'Scholarship & Grants', 
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="5"></circle><path d="M12 13v9l3-3 3 3v-9"></path></svg>,
      iconBg: '#f0fdf4', 
      iconColor: '#16a34a' 
    },
  ];

  return (
    <div className="db-services-grid">
      {services.map((service, index) => (
        <ServiceCard 
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
