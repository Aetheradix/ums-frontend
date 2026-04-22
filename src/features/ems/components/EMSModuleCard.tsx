
import styles from '../styles/ems.module.css';

interface EMSModuleCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  colorClass: 'purple' | 'blue' | 'orange' | 'pink' | 'green' | 'red' | 'yellow';
  value?: string | number;
  valueLabel?: string;
  onClick?: () => void;
}

export default function EMSModuleCard({
  title,
  description,
  icon,
  colorClass,
  value,
  valueLabel,
  onClick,
}: EMSModuleCardProps) {
  return (
    <div className={styles.moduleCard} onClick={onClick}>
      <div className={styles.moduleArrow}>
        <i className="pi pi-arrow-up-right" style={{ fontSize: '0.875rem' }}></i>
      </div>
      <div className={`${styles.moduleIconWrapper} ${styles[colorClass]}`}>
        {icon}
      </div>
      <h3 className={styles.moduleTitle}>{title}</h3>
      <p className={styles.moduleDesc}>{description}</p>
      
      {(value !== undefined || valueLabel) && (
        <div className={styles.moduleFooter}>
          {value !== undefined && <span className={styles.moduleFooterValue}>{value}</span>}
          {valueLabel && <span className={styles.moduleFooterLabel}>{valueLabel}</span>}
        </div>
      )}
    </div>
  );
}
