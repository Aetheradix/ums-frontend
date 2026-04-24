import { Card } from 'shared/components/panels';
import styles from '../styles/ems.module.css';
import { ArrowUpRight } from 'lucide-react';

interface EMSModuleCardProps {
  title: string;
  icon: React.ReactNode;
  colorClass: 'purple' | 'blue' | 'orange' | 'pink' | 'green' | 'red' | 'yellow' | 'grey';
  onClick?: () => void;
}

export default function EMSModuleCard({
  title,
  icon,
  colorClass,
  onClick,
}: EMSModuleCardProps) {
  return (
    <Card
      className={styles.moduleCard}
      onClose={undefined} // optional
    >
      <div onClick={onClick} className={styles.moduleCardContent}>
        <div className={styles.moduleArrow}>
          <ArrowUpRight size={18} />
        </div>

        <div className={`${styles.moduleIconWrapper} ${styles[colorClass]}`}>
          {icon}
        </div>

        <h3 className={styles.moduleTitle}>{title}</h3>
      </div>
    </Card>
  );
}