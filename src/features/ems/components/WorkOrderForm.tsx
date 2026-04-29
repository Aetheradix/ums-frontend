import { useState } from 'react';
import {
  Bell, HelpCircle, Search,
  LayoutDashboard, Package, ClipboardList,
  Truck, CheckCircle, LogOut, ChevronLeft,
} from 'lucide-react';
import { SubmoduleData, getModuleGroup } from '../constant';
import styles from '../styles/ems.module.css';

interface WorkOrderFormProps {
  tileId: string | null;
  subIndex: number | null;
  onBack: () => void;
  onLogout: () => void;
}

type FormTab = 'Active Orders' | 'Completed' | 'Add New Operation' | 'Archived';
type SidebarItem = 'Overview' | 'Inventory' | 'Work Orders' | 'Logistics' | 'Quality Control';

const sidebarItems: { label: SidebarItem; icon: React.ReactNode }[] = [
  { label: 'Overview',       icon: <LayoutDashboard size={13} /> },
  { label: 'Inventory',      icon: <Package size={13} /> },
  { label: 'Work Orders',    icon: <ClipboardList size={13} /> },
  { label: 'Logistics',      icon: <Truck size={13} /> },
  { label: 'Quality Control',icon: <CheckCircle size={13} /> },
];

const formTabs: FormTab[] = ['Active Orders', 'Completed', 'Add New Operation', 'Archived'];

export default function WorkOrderForm({
  tileId,
  subIndex,
  onBack,
  onLogout,
}: WorkOrderFormProps) {
  const [activeTab, setActiveTab] = useState<FormTab>('Add New Operation');
  const [activeSidebar, setActiveSidebar] = useState<SidebarItem>('Work Orders');

  const group = getModuleGroup(tileId);
  const submodules = SubmoduleData[group];
  const sub = subIndex !== null ? submodules[subIndex] : submodules[0];

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

      {/* Form Page Layout */}
      <div className={styles.formPage}>
        {/* Sidebar */}
        <aside className={styles.formSidebar}>
          <div className={styles.sidebarBrand}>
            <div className={styles.sidebarBrandIcon}>⚙</div>
            <div>
              <div className={styles.sidebarBrandText}>{group}</div>
              <div className={styles.sidebarBrandSub}>Submodule v2.4</div>
            </div>
          </div>

          <nav className={styles.sidebarNav}>
            {sidebarItems.map(({ label, icon }) => (
              <div
                key={label}
                className={`${styles.sidebarItem} ${activeSidebar === label ? styles.sidebarActive : ''}`}
                onClick={() => setActiveSidebar(label)}
              >
                {icon}
                {label}
              </div>
            ))}
          </nav>

          <div className={styles.sidebarBottom}>
            <div className={styles.sidebarItem} onClick={onBack}>
              <ChevronLeft size={13} />
              Back
            </div>
            <div className={styles.sidebarItem} onClick={onLogout}>
              <LogOut size={13} />
              Logout
            </div>
          </div>
        </aside>

        {/* Main Form Content */}
        <div className={styles.formContent}>
          {/* Form Top Bar */}
          <div className={styles.formTopBar}>
            <div className={styles.formTopBarBrand}>Enterprise Unified OS</div>
            <div className={styles.formTopBarRight}>
              <div className={styles.formTopBarNav}>
                {['Dashboard', 'Analytics', 'Reports', 'Settings'].map(n => (
                  <span key={n}>{n}</span>
                ))}
              </div>
              <div className={styles.formSearch}>
                <Search size={11} />
                Global search...
              </div>
              <button className={styles.iconBtn}><Bell size={13} /></button>
              <button className={styles.iconBtn}><HelpCircle size={13} /></button>
              <div className={styles.userAvatar} style={{ width: 28, height: 28, fontSize: 10 }}>AL</div>
            </div>
          </div>

          {/* Breadcrumb */}
          <div className={styles.formBreadcrumb}>
            <span>{group}</span>
            <span className={styles.formBreadcrumbArrow}>›</span>
            <span>Work Orders</span>
            <span className={styles.formBreadcrumbArrow}>›</span>
            <span className={styles.formBreadcrumbActive}>New Operation</span>
          </div>

          {/* Body */}
          <div className={styles.formBody}>
            <h2 className={styles.formPageTitle}>Work Orders</h2>

            {/* Tabs */}
            <div className={styles.formTabs}>
              {formTabs.map(tab => (
                <div
                  key={tab}
                  className={`${styles.formTab} ${activeTab === tab ? styles.formTabActive : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </div>
              ))}
            </div>

            {/* General Information */}
            <div className={styles.formSection}>
              <div className={styles.formSectionTitle}>
                <span className={styles.formSectionDot} />
                General Information
              </div>

              <div className={`${styles.formRow} ${styles.cols2}`}>
                <div className={styles.formField}>
                  <label>Operation ID</label>
                  <input placeholder="OP-2024-XXXX" />
                </div>
                <div className={styles.formField}>
                  <label>Operation Name</label>
                  <input placeholder="Enter descriptive name" />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formField}>
                  <label>Description</label>
                  <textarea
                    rows={3}
                    placeholder="Provide a brief overview of the operational objectives..."
                  />
                </div>
              </div>

              <div className={`${styles.formRow} ${styles.cols2}`}>
                <div className={styles.formField}>
                  <label>Start Date</label>
                  <input type="date" />
                </div>
                <div className={styles.formField}>
                  <label>End Date</label>
                  <input type="date" />
                </div>
              </div>
            </div>

            {/* Logistics Details */}
            <div className={styles.formSection}>
              <div className={styles.formSectionTitle}>
                <span className={`${styles.formSectionDot} ${styles.dotTeal}`} />
                Logistics Details
              </div>

              <div className={`${styles.formRow} ${styles.cols3}`}>
                <div className={styles.formField}>
                  <label>Operation Status</label>
                  <select>
                    <option>Draft</option>
                    <option>Active</option>
                    <option>Completed</option>
                    <option>Archived</option>
                  </select>
                </div>
                <div className={styles.formField}>
                  <label>Priority Level</label>
                  <select>
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                    <option>Critical</option>
                  </select>
                </div>
                <div className={styles.formField}>
                  <label>Target Units</label>
                  <input defaultValue="100" />
                </div>
              </div>

              <div className={`${styles.formRow} ${styles.cols2}`}>
                <div className={styles.formField}>
                  <label>Origin Facility</label>
                  <input placeholder="Select facility hub" />
                </div>
                <div className={styles.formField}>
                  <label>Destination Point</label>
                  <input placeholder="Select delivery endpoint" />
                </div>
              </div>

              <div className={`${styles.formRow} ${styles.cols3}`}>
                <div className={styles.formField}>
                  <label>Tolerance Margin (%)</label>
                  <input placeholder="5" />
                </div>
                <div className={styles.formField}>
                  <label>Inspection Frequency</label>
                  <input placeholder="Daily" />
                </div>
                <div className={styles.formField}>
                  <label>QC Lead Specialist</label>
                  <input placeholder="Assign specialist" />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className={styles.formActions}>
              <button className={styles.btnCancel} onClick={onBack}>Cancel</button>
              <button className={styles.btnCreate}>Create Operation</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
