
import styles from '../styles/ems.module.css';
import EMSModuleCard from './EMSModuleCard';
import { 
  Megaphone, 
  CheckSquare, 
  CalendarDays, 
  Landmark, 
  GraduationCap, 
  FileText, 
  Users, 
  FileSignature, 
  LayoutDashboard, 
  UserCircle,
  TrendingUp,
  TrendingDown
} from 'lucide-react';

export default function EMSDashboard() {
  return (
    <div className={styles.dashboardContainer}>
      {/* Hero Section */}
      <div className={styles.heroSection}>
        <div className={styles.heroBadge}>
          <i className="pi pi-bolt mr-2 text-yellow-500"></i>
          Logged in via SSO - Session expires in 86 days
        </div>
        <h1 className={styles.heroTitle}>Welcome, Mark Lopez!</h1>
        <p className={styles.heroSubtitle}>Your unified university workspace. Every service, every record — one click away.</p>
      </div>

      {/* Stats Section */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statTitle}>Current Term Units</div>
          <div className={styles.statValue}>15.0</div>
          <div className={`${styles.statChange} ${styles.positive}`}>
            <TrendingUp size={16} className="inline mr-1" />
            +3.0 vs last term
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statTitle}>Open Tasks</div>
          <div className={styles.statValue}>2</div>
          <div className={`${styles.statChange} ${styles.negative}`}>
            <TrendingDown size={16} className="inline mr-1" />
            Action required
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statTitle}>Account Balance</div>
          <div className={styles.statValue}>$0.00</div>
          <div className={`${styles.statChange} ${styles.positive}`}>
            <CheckSquare size={16} className="inline mr-1" />
            Fully paid
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statTitle}>Academic Standing</div>
          <div className={styles.statValue}>Good</div>
          <div className={`${styles.statChange} ${styles.positive}`}>
            <GraduationCap size={16} className="inline mr-1" />
            Dean's List
          </div>
        </div>
      </div>

      {/* Modules Section */}
      <div>
        <div className="flex justify-content-between align-items-end mb-4">
          <div>
            <h2 className={styles.modulesSectionTitle}>University Services</h2>
            <p className={styles.modulesSectionSubtitle}>Access your academic, financial, and personal information.</p>
          </div>
          <button className="p-button p-component p-button-text p-button-sm">
            <span className="p-button-label">Customize View</span>
          </button>
        </div>

        <div className={styles.modulesGrid}>
          <EMSModuleCard
            title="Communication"
            description="Messages, announcements, and university alerts."
            icon={<Megaphone size={24} />}
            colorClass="purple"
            value="0"
            valueLabel="New"
          />
          <EMSModuleCard
            title="Tasks"
            description="To-dos, holds, and required actions."
            icon={<CheckSquare size={24} />}
            colorClass="red"
            value="2"
            valueLabel="To Dos"
          />
          <EMSModuleCard
            title="Manage Classes"
            description="Class search, enroll, drop, and view schedule."
            icon={<CalendarDays size={24} />}
            colorClass="blue"
            value="5"
            valueLabel="Enrolled"
          />
          <EMSModuleCard
            title="Finances"
            description="Account balance, payments, and billing statements."
            icon={<Landmark size={24} />}
            colorClass="green"
            value="$0"
            valueLabel="Due"
          />
          <EMSModuleCard
            title="Financial Aid"
            description="View awards, accept/decline loans, and status."
            icon={<GraduationCap size={24} />}
            colorClass="yellow"
            value="2024"
            valueLabel="Year"
          />
          <EMSModuleCard
            title="Academic Records"
            description="Grades, transcripts, and degree progress."
            icon={<FileText size={24} />}
            colorClass="purple"
            value="3.8"
            valueLabel="GPA"
          />
          <EMSModuleCard
            title="Advising"
            description="Schedule appointments and view planner."
            icon={<Users size={24} />}
            colorClass="blue"
          />
          <EMSModuleCard
            title="Admissions"
            description="Application status and required documents."
            icon={<FileSignature size={24} />}
            colorClass="pink"
          />
          <EMSModuleCard
            title="Student Center"
            description="Centralized view of your academic profile."
            icon={<LayoutDashboard size={24} />}
            colorClass="orange"
          />
          <EMSModuleCard
            title="Personal Information"
            description="Contact details, emergency contacts, and demographics."
            icon={<UserCircle size={24} />}
            colorClass="purple"
          />
        </div>
      </div>
    </div>
  );
}
