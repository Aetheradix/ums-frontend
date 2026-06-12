import React from 'react';
import './Sidebar.css';

export interface SidebarItem {
  label: string;
  icon?: string;
  slug?: string;
  path?: string;
}

export interface SidebarProps {
  headerTitle: string;
  headerSubtitle?: string;
  headerIcon?: string;
  items: SidebarItem[];
  activeIndex: number;
  onItemClick: (index: number) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  headerTitle,
  headerSubtitle,
  headerIcon = 'user',
  items,
  activeIndex,
  onItemClick,
}) => {
  const getIcon = (iconName?: string) => {
    if (!iconName) return 'file';

    const iconMap: Record<string, string> = {
      person_add: 'user-plus',
      assignment: 'file-edit',
      manage_accounts: 'user',
      users: 'user',
      employee: 'user',
      employees: 'user',
      settings: 'cog',
      department: 'building',
      designation: 'id-card',
    };

    return iconMap[iconName] || iconName;
  };

  return (
    <aside className="app-sidebar-container">
      <div className="app-sidebar-header">
        <span className="app-sidebar-header-icon">
          <i className={`pi pi-${getIcon(headerIcon)}`} />
        </span>

        <div className="app-sidebar-header-text">
          <h3>{headerTitle}</h3>
          {headerSubtitle && <p>{headerSubtitle}</p>}
        </div>
      </div>

      <nav className="app-sidebar-menu" aria-label={headerTitle}>
        {items.map((item, idx) => {
          const isActive = idx === activeIndex;

          return (
            <button
              key={item.slug || item.path || item.label || idx}
              type="button"
              className={`app-sidebar-item ${isActive ? 'active' : ''}`}
              onClick={() => onItemClick(idx)}
              aria-current={isActive ? 'page' : undefined}
            >
              <i className={`pi pi-${getIcon(item.icon)} app-sidebar-icon`} />

              <span className="app-sidebar-label">{item.label}</span>

              {isActive && (
                <i className="pi pi-chevron-right app-sidebar-arrow" />
              )}
            </button>
          );
        })}
      </nav>

      <div className="app-sidebar-help-box">
        <span className="app-sidebar-help-icon">
          <i className="pi pi-headphones" />
        </span>

        <div className="app-sidebar-help-text">
          <strong>Need Help?</strong>
          <span>Visit Help Center</span>
        </div>

        <i className="pi pi-angle-right app-sidebar-help-arrow" />
      </div>
    </aside>
  );
};

export default Sidebar;
