import type { ReactNode } from 'react';

export interface ProfileInfoItemProps {
  label: string;
  value?: string | number | null;
}

function ProfileInfoItem({ label, value }: ProfileInfoItemProps) {
  return (
    <div className="profile-info-item">
      <span className="profile-info-item-label">{label}</span>
      <strong className="profile-info-item-value">{value || 'N/A'}</strong>
    </div>
  );
}

interface ProfileInfoCardProps {
  icon: string;
  title: string;
  items: ProfileInfoItemProps[];
  /** Optional slot for custom content below the info grid */
  children?: ReactNode;
}

export default function ProfileInfoCard({
  icon,
  title,
  items,
  children,
}: ProfileInfoCardProps) {
  return (
    <section className="profile-info-card">
      <div className="profile-info-card-title">
        <span>
          <i className={`pi pi-${icon}`} />
        </span>
        <h4>{title}</h4>
      </div>

      <div className="profile-info-grid">
        {items.map((item, i) => (
          <ProfileInfoItem key={i} label={item.label} value={item.value} />
        ))}
      </div>

      {children}
    </section>
  );
}
