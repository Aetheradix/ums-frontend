import { ArrowUpRight, Bell, ChevronLeft, Search } from 'lucide-react';
import { DashData, SubmoduleData, getModuleGroup } from '../constant';
import styles from '../styles/ems.module.css';

interface SubmoduleSelectionProps {
  tileId: string | null;
  onBack: () => void;
  onSubmoduleClick: (idx: number) => void;
}

const badgeClass: Record<string, string> = {
  green: styles.badgeGreen,
  blue:  styles.badgeBlue,
  amber: styles.badgeAmber,
  red:   styles.badgeRed,
};

const colorMap: Record<string, string> = {
  blue:   styles.icBlue,
  purple: styles.icPurple,
  grey:   styles.icGrey,
  green:  styles.icGreen,
  orange: styles.icOrange,
  red:    styles.icRed,
  pink:   styles.icPink,
  indigo: styles.icIndigo,
  teal:   styles.icTeal,
};

export default function SubmoduleSelection({
  tileId,
  onBack,
  onSubmoduleClick,
}: SubmoduleSelectionProps) {
  const tile = DashData.find(t => t.id === tileId);
  const group = getModuleGroup(tileId);
  const submodules = SubmoduleData[group];

  return (
    <div className={styles.dashboardContainer}>
      {/* Top Bar */}
      <div className={styles.topBar}>
        <div className={styles.topBarLeft}>
          <div className={styles.topBarLogo}><span>U</span></div>
          UMS Enterprises
        </div>
        <div className={styles.topBarRight}>
          <a href="#">Help Center</a>
          <span className={styles.dotSep}>·</span>
          <a href="#">Status</a>
        </div>
      </div>

      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerBrand}>
          <div className={styles.brandIcon}><span>N</span></div>
          <div className={styles.brandText}>
            <span className={styles.brandName}>UMS ERP</span>
            <span className={styles.brandSub}>Workspace OS</span>
          </div>
        </div>
        <div className={styles.searchBar}>
          <span className={styles.searchIcon}><Search size={13} /></span>
          <input placeholder="Search services, records, people ..." />
        </div>
        <div className={styles.headerActions}>
          <button className={styles.iconBtn} title="Notifications">
            <Bell size={15} />
          </button>
          <button className={styles.iconBtn} onClick={onBack} title="Back to Dashboard">
            <ChevronLeft size={15} />
          </button>
          <div className={styles.userPill}>
            <div className={styles.userAvatar}>AL</div>
            <span className={styles.userName}>Alex Lin</span>
          </div>
        </div>
      </div>

      {/* Sub Page Body */}
      <div className={styles.subPage}>
        {/* Sub Header */}
        <div className={styles.subHeader}>
          <div className={styles.subBreadcrumb}>
            <span className={styles.subBreadcrumbLink} onClick={onBack}>Home</span>
            <span className={styles.subBreadcrumbArrow}>›</span>
            <span className={styles.subBreadcrumbLink}>{group}</span>
            <span className={styles.subBreadcrumbArrow}>›</span>
            <span className={styles.subBreadcrumbCurrent}>{tile?.title}</span>
          </div>
          <div className={styles.subTitle}>Welcome, Alex Lin</div>
          <div className={styles.subSubtitle}>
            Select a submodule to manage your workspace.
          </div>
        </div>

        {/* Submodule Grid */}
        <div className={styles.subBody}>
          <div className={styles.subGrid}>
            {submodules.map((sub, idx) => (
              <div
                key={idx}
                className={styles.subCard}
                onClick={() => onSubmoduleClick(idx)}
              >
                <div className={styles.subCardArrow}>
                  <ArrowUpRight size={14} color="#d1d5db" strokeWidth={2} />
                </div>
                <div className={`${styles.subCardIcon} ${colorMap[sub.colorClass] ?? styles.icBlue}`}>
                  {sub.icon}
                </div>
                <div className={styles.subCardTitle}>{sub.title}</div>
                <div className={styles.subCardDesc}>{sub.desc}</div>
                <span className={`${styles.subCardBadge} ${badgeClass[sub.badgeVariant]}`}>
                  ● {sub.badge}
                </span>
              </div>
            ))}

            {/* Request Module card */}
            <div className={styles.subRequestCard}>
              <div className={styles.subRequestIcon}>+</div>
              <div className={styles.subRequestTitle}>Request Module</div>
              <div className={styles.subRequestDesc}>
                Don't see what you need? Contact system administration.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className={styles.footer}>
        <span className={styles.footerText}>© 2026 UMS Systems – Enterprise Operating System</span>
        <div className={styles.footerLinks}>
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Status</a>
        </div>
      </div>
    </div>
  );
}
