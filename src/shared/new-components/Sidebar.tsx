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
  headerIcon = 'shield',
  items,
  activeIndex,
  onItemClick,
}) => {
  const getIcon = (iconName?: string) => {
    if (!iconName) return 'file';
    if (iconName === 'person_add') return 'user-plus';
    if (iconName === 'assignment') return 'file-edit';
    return iconName;
  };

  return (
    <aside className="app-sidebar-container">
      <div className="app-sidebar-header">
        <i className={`pi pi-${headerIcon} app-sidebar-header-icon`} />
        <div className="app-sidebar-header-text">
          <h3>{headerTitle}</h3>
          {headerSubtitle && <p>{headerSubtitle}</p>}
        </div>
      </div>
      <nav className="app-sidebar-menu">
        {items.map((item, idx) => {
          const isActive = idx === activeIndex;
          return (
            <button
              key={item.slug || idx}
              className={`app-sidebar-item ${isActive ? 'active' : ''}`}
              onClick={() => onItemClick(idx)}
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
    </aside>
  );
};

export default Sidebar;
