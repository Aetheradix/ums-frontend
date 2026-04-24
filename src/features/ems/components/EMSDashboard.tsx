import DashData from '../constant';
import styles from '../styles/ems.module.css';
import EMSModuleCard from './EMSModuleCard';
import {
  Download,
  Plus
} from 'lucide-react';

export default function EMSDashboard() {
  return (
    <div className={styles.dashboardContainer}>
      {/* Hero Section */}
      <div className={styles.heroSection}>
        <div className={styles.heroContent}>
            <div>
              <div className={styles.heroBadge}>
                <span className={styles.hashtag}>#</span>
                Logged in via UMS SSO - session expires in 86 days
              </div>
              <h1 className={styles.heroTitle}>Welcome, <span className={styles.highlightText}>Alex Lin</span></h1>
              <p className={styles.heroSubtitle}>Your unified workspace. Every service, every record — one tile away.</p>
            </div>
            <div className={styles.heroActions}>
              <button className={styles.secondaryButton}>
                <Download size={16} className="mr-2 inline" />
                Export
              </button>
              <button className={styles.primaryButton}>
                <Plus size={16} className="mr-2 inline" />
                New record
              </button>
            </div>
        </div>
      </div>

      {/* Modules Section */}
      <div className={styles.modulesSection}>
        <div className={styles.modulesHeader}>
          <h2 className={styles.modulesSectionTitle}>All Services</h2>
          <button className={styles.customizeButton}>
            Customized Tiles <span className="ml-1">→</span>
          </button>
        </div>

        <div className={styles.filtersContainer}>
          <button className={`${styles.filterPill} ${styles.active}`}>
            <i className="pi pi-star-fill mr-2" style={{ fontSize: '0.8rem' }}></i>
            Favourite
          </button>
          <button className={styles.filterPill}>All</button>
          <button className={styles.filterPill}>Academics</button>
          <button className={styles.filterPill}>HR</button>
          <button className={styles.filterPill}>Finance</button>
          <button className={styles.filterPill}>Operation</button>
        </div>

        <div className={styles.modulesGrid}>
          {DashData.map((module, index) => (
            <EMSModuleCard
              key={index}
              title={module.title}
              icon={module.icon}
              colorClass={module.colorClass as any}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
