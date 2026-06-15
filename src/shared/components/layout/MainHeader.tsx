import { Avatar } from 'primereact/avatar';
import { InputText } from 'primereact/inputtext';
import { useAuth } from 'auth/useAuth';
import './MainHeader.css';

export default function MainHeader() {
  const { user } = useAuth();
  const firstName = user?.profile?.given_name || '';
  const lastName = user?.profile?.family_name || '';
  const userName =
    firstName || lastName
      ? `${firstName} ${lastName}`.trim()
      : user?.profile?.name || 'User';
  const initials =
    firstName && lastName
      ? `${firstName[0]}${lastName[0]}`.toUpperCase()
      : userName.substring(0, 2).toUpperCase();

  return (
    <div className="main-header">
      {/* Left Section */}
      <div className="main-header-left">
        <div className="main-header-logo">N</div>

        <div>
          <div className="main-header-title">UMS ERP</div>

          <div className="main-header-subtitle">Workspace OS</div>
        </div>
      </div>

      {/* Search */}
      <div className="main-header-search-wrapper">
        <div className="main-header-search-box">
          <i className="pi pi-search main-header-search-icon" />

          <InputText
            placeholder="Search Services, records, people..."
            className="main-header-search-input"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="main-header-right">
        <div className="main-header-actions">
          <i className="pi pi-question-circle main-header-action-icon" />

          <div className="main-header-notification">
            <i className="pi pi-bell main-header-action-icon" />

            <span className="main-header-badge">1</span>
          </div>

          <i className="pi pi-th-large main-header-action-icon" />
        </div>

        {/* User */}
        <div className="main-header-user">
          <Avatar
            label={initials}
            shape="circle"
            className="main-header-user-avatar"
          />

          <span className="main-header-user-name">{userName}</span>

          <i className="pi pi-chevron-down main-header-user-arrow" />
        </div>
      </div>
    </div>
  );
}
