// import { ArrowUpRight, Bell, CheckCircle2, Grid, HelpCircle, Search } from 'lucide-react';
// import { useState } from 'react';

// import styles from '../styles/ems.module.css';

// export default function EMSDashboard() {
//   const [activeTab, setActiveTab] = useState('Home');
//   const [activeFilter, setActiveFilter] = useState('Favourite');

//   const tabs = ['Home', 'Human Resources', 'Finance', 'Inventory', 'Sales', 'Procurement', 'Projects', 'Reports', 'Settings'];
//   const filters = ['Favourite', 'All', 'Academics', 'HR', 'Finance', 'Operation'];

//   return (
//     <div className={styles.dashboardContainer}>
//       {/* Top Bar */}
//       <div className={styles.topBar}>
//         <div className={styles.topBarLeft}>
//           <div className={styles.topBarLogo}><span>U</span></div>
//           UMS Enterprises
//         </div>
//         <div className={styles.topBarRight}>
//           <a href="#">Help Center</a>
//           <span className={styles.dotSep}>·</span>
//           <a href="#">Status</a>
//         </div>
//       </div>

//       {/* Header */}
//       <div className={styles.header}>
//         <div className={styles.headerBrand}>
//           <div className={styles.brandIcon}><span>N</span></div>
//           <div className={styles.brandText}>
//             <span className={styles.brandName}>UMS ERP</span>
//             <span className={styles.brandSub}>Workspace OS</span>
//           </div>
//         </div>
//         <div className={styles.searchBar}>
//           <span className={styles.searchIcon}>
//             <Search size={13} />
//           </span>
//           <input placeholder="Search Services, records, people ..." />
//         </div>
//         <div className={styles.headerActions}>
//           <button className={styles.iconBtn} title="Help">
//             <HelpCircle size={15} />
//           </button>
//           <button className={styles.iconBtn} title="Notifications">
//             <Bell size={15} />
//           </button>
//           <button className={styles.iconBtn} title="Apps">
//             <Grid size={15} />
//           </button>
//           <div className={styles.userPill}>
//             <div className={styles.userAvatar}>AL</div>
//             <span className={styles.userName}>Alex Lin</span>
//           </div>
//         </div>
//       </div>

//       {/* Nav Bar */}
//       <div className={styles.navBar}>
//         {tabs.map(tab => (
//           <div
//             key={tab}
//             className={`${styles.navItem} ${activeTab === tab ? styles.active : ''}`}
//             onClick={() => setActiveTab(tab)}
//           >
//             {tab}
//           </div>
//         ))}
//       </div>

//       {/* Main Content */}
//       <div className={styles.main}>
//         {/* Hero */}
//         <div className={styles.hero}>
//           <div className={styles.heroInner}>
//             <div>
//               <div className={styles.ssoBadge}>
//                 <CheckCircle2 size={12} strokeWidth={2.5} />
//                 Logged in via UMS SSO · session expires in 86 days
//               </div>
//               <div className={styles.heroTitle}>Welcome, <span className={styles.blue}>Alex Lin</span></div>
//               <div className={styles.heroSub}>Your unified workspace. Every service, every record — one tile away.</div>
//             </div>
//             <div className={styles.heroActions}>
//               <button className={styles.btnExport}>
//                 <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//                   <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
//                   <polyline points="17 8 12 3 7 8" />
//                   <line x1="12" y1="3" x2="12" y2="15" />
//                 </svg>
//                 Export
//               </button>
//               <button className={styles.btnNew}>
//                 <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
//                   <line x1="12" y1="5" x2="12" y2="19" />
//                   <line x1="5" y1="12" x2="19" y2="12" />
//                 </svg>
//                 New record
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Services Section */}
//         <div className={styles.servicesSection}>
//           <div className={styles.servicesHeader}>
//             <span className={styles.servicesTitle}>All Services</span>
//             <a href="#" className={styles.customizedLink}>
//               Customized Tiles
//               <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
//                 <path d="M5 12h14M12 5l7 7-7 7" />
//               </svg>
//             </a>
//           </div>

//           <div className={styles.filters}>
//             {filters.map((filter) => (
//               <button
//                 key={filter}
//                 className={`${styles.pill} ${activeFilter === filter ? styles.active : ''}`}
//                 onClick={() => setActiveFilter(filter)}
//               >
//                 {filter === 'Favourite' && (
//                   <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24" className="mr-1">
//                     <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
//                   </svg>
//                 )}
//                 {filter}
//               </button>
//             ))}
//           </div>

//           <div className={styles.grid}>
//             {DashData.map((module, index) => {
//               // Map constant colorClass to HTML provided color classes
//               const colorMap: any = {
//                 blue: styles.icBlue,
//                 purple: styles.icPurple,
//                 grey: styles.icGrey,
//                 green: styles.icGreen,
//                 orange: styles.icOrange,
//                 red: styles.icRed,
//                 pink: styles.icPink,
//                 indigo: styles.icIndigo,
//                 teal: styles.icTeal,
//                 yellow: styles.icOrange
//               };
//               const mappedColorClass = colorMap[module.colorClass] || styles.icBlue;

//               return (
//                 <div className={styles.card} key={index} onClick={module.onClick}>
//                   <div className={styles.cardArrow}>
//                     <ArrowUpRight size={14} color="#374151" strokeWidth={2} />
//                   </div>
//                   <div className={`${styles.cardIcon} ${mappedColorClass}`}>
//                     {module.icon}
//                   </div>
//                   <div className={styles.cardTitle}>{module.title}</div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>


//     </div>
//   );
// }


import { ArrowUpRight, Bell, CheckCircle2, Grid, HelpCircle, Search } from 'lucide-react';
import { useState } from 'react';
import { DashData, type ModuleGroup } from '../constant';
import styles from '../styles/ems.module.css';

interface EMSDashboardProps {
  onTileClick: (id: string) => void;
}

type FilterOption = 'Favourite' | 'All' | ModuleGroup;

export default function EMSDashboard({ onTileClick }: EMSDashboardProps) {
  const [activeTab, setActiveTab] = useState('Home');
  const [activeFilter, setActiveFilter] = useState<FilterOption>('Favourite');

  const tabs = [
    'Home', 'Human Resources', 'Finance', 'Events', 'Calender',
    'Academics',  'Projects', 'Help', 'Settings',
  ];

  const filters: FilterOption[] = ['Favourite', 'All', 'Academics', 'HR', 'Finance', 'Operation'];

  const filtered =
    activeFilter === 'Favourite' || activeFilter === 'All'
      ? DashData
      : DashData.filter(m => m.module === activeFilter);

  const colorMap: Record<string, string> = {
    blue: styles.icBlue,
    purple: styles.icPurple,
    grey: styles.icGrey,
    green: styles.icGreen,
    orange: styles.icOrange,
    red: styles.icRed,
    pink: styles.icPink,
    indigo: styles.icIndigo,
    teal: styles.icTeal,
  };

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
          <button className={styles.iconBtn} title="Help">
            <HelpCircle size={15} />
          </button>
          <button className={styles.iconBtn} title="Notifications">
            <Bell size={15} />
          </button>
          <button className={styles.iconBtn} title="Apps">
            <Grid size={15} />
          </button>
          <div className={styles.userPill}>
            <div className={styles.userAvatar}>AL</div>
            <span className={styles.userName}>Alex Lin</span>
          </div>
        </div>
      </div>

      {/* Nav Bar */}
      <div className={styles.navBar}>
        {tabs.map(tab => (
          <div
            key={tab}
            className={`${styles.navItem} ${activeTab === tab ? styles.active : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className={styles.main}>
        {/* Hero */}
        <div className={styles.hero}>
          <div className={styles.heroInner}>
            <div>
              <div className={styles.ssoBadge}>
                <CheckCircle2 size={12} strokeWidth={2.5} />
                Logged in via UMS SSO · session expires in 86 days
              </div>
              <div className={styles.heroTitle}>
                Welcome, <span className={styles.blue}>Alex Lin</span>
              </div>
              <div className={styles.heroSub}>
                Your unified workspace. Every service, every record — one tile away.
              </div>
            </div>
            <div className={styles.heroActions}>
              <button className={styles.btnExport}>
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
                Export
              </button>
              <button className={styles.btnNew}>
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                New record
              </button>
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div className={styles.servicesSection}>
          <div className={styles.servicesHeader}>
            <span className={styles.servicesTitle}>All Services</span>
            <a href="#" className={styles.customizedLink}>
              Customized Tiles
              <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          {/* Filter Pills */}
          <div className={styles.filters}>
            {filters.map(filter => (
              <button
                key={filter}
                className={`${styles.pill} ${activeFilter === filter ? styles.active : ''}`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter === 'Favourite' && (
                  <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                )}
                {filter}
              </button>
            ))}
          </div>

          {/* Tile Grid */}
          <div className={styles.grid}>
            {filtered.map((module, index) => (
              <div
                className={styles.card}
                key={index}
                onClick={() => onTileClick(module.id)}
              >
                <div className={styles.cardArrow}>
                  <ArrowUpRight size={14} color="#374151" strokeWidth={2} />
                </div>
                <div className={`${styles.cardIcon} ${colorMap[module.colorClass] ?? styles.icBlue}`}>
                  {module.icon}
                </div>
                <div className={styles.cardTitle}>{module.title}</div>
              </div>
            ))}
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
