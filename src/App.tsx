// import { Route, Routes } from 'react-router-dom';
// import MainLayout from 'shared/components/layout/MainLayout';
// import SubjectCategory from 'features/master/course/subject-category';
// import { EMSDashboard } from 'features/ems';
// import { Toast } from 'primereact/toast';
// import { useEffect, useRef } from 'react';
// import { ToastService } from 'services';

// function StudentsPlaceholder() {
//   return (
//     <div className="card">
//       <h2 className="text-2xl font-bold mb-4">Students Management</h2>
//       <p className="text-lg text-gray-700">This is a static placeholder for the Students module.</p>
//       <div className="surface-card p-4 shadow-2 border-round mt-4">
//         <p>You can start building your student registration tables and forms here.</p>
//       </div>
//     </div>
//   );
// }

// function SettingsPlaceholder() {
//   return (
//     <div className="card">
//       <h2 className="text-2xl font-bold mb-4">Settings</h2>
//       <p className="text-lg text-gray-700">System configuration and user preferences.</p>
//     </div>
//   );
// }

// export default function App() {
//   const toast = useRef<Toast>(null);

//   useEffect(() => {
//     ToastService.setToastRef(toast);
//   }, []);

//   return (
//     <>
//       <Toast ref={toast} className="white-toast" />
//       <Routes>
//         <Route path="public/*" element={<div>Public Page Placeholder</div>} />
//         <Route
//           path="/*"
//           element={
//             <MainLayout>
//               <Routes>
//                 <Route index element={<EMSDashboard />} />
//                 <Route path="students" element={<StudentsPlaceholder />} />
//                 <Route path="settings" element={<SettingsPlaceholder />} />
//                 <Route
//                   path="master/subject-category/*"
//                   element={<SubjectCategory />}
//                 />
//               </Routes>
//             </MainLayout>
//           }
//         />
//       </Routes>
//     </>
//   );
// }

import { EMSDashboard } from 'features/ems';
import LoginPage from 'features/ems/components/LoginPage';
import SubmoduleSelection from 'features/ems/components/SubmoduleSelection';
import WorkOrderForm from 'features/ems/components/WorkOrderForm';
import { useState } from 'react';


export type Page = 'login' | 'dashboard' | 'submodule' | 'form';

export interface AppState {
  page: Page;
  selectedTileId: string | null;
  selectedSubIndex: number | null;
}

export default function App() {
  const [appState, setAppState] = useState<AppState>({
    page: 'login',
    selectedTileId: null,
    selectedSubIndex: null,
  });

  const navigate = (updates: Partial<AppState>) => {
    setAppState(prev => ({ ...prev, ...updates }));
  };

  switch (appState.page) {
    case 'login':
      return <LoginPage onLogin={() => navigate({ page: 'dashboard' })} />;
    case 'dashboard':
      return (
        <EMSDashboard
          onTileClick={(id) => navigate({ page: 'submodule', selectedTileId: id })}
        />
      );
    case 'submodule':
      return (
        <SubmoduleSelection
          tileId={appState.selectedTileId}
          onBack={() => navigate({ page: 'dashboard' })}
          onSubmoduleClick={(idx) => navigate({ page: 'form', selectedSubIndex: idx })}
        />
      );
    case 'form':
      return (
        <WorkOrderForm
          tileId={appState.selectedTileId}
          subIndex={appState.selectedSubIndex}
          onBack={() => navigate({ page: 'submodule' })}
          onLogout={() => navigate({ page: 'login', selectedTileId: null, selectedSubIndex: null })}
        />
      );
    default:
      return <LoginPage onLogin={() => navigate({ page: 'dashboard' })} />;
  }
}
