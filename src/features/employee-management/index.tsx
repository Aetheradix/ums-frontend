import Settings from 'features/master/employee/settings';
import { Route, Routes } from 'react-router-dom';
import QuickOnboarding from './quick-onboarding';

export default function EmployeeManagement() {
  return (
    <Routes>
      <Route path="quick-onboarding/*" element={<QuickOnboarding />} />
      <Route path="settings/*" element={<Settings />} />
    </Routes>
  );
}
