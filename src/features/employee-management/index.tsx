import Settings from 'features/master/employee/settings';
import { Route, Routes } from 'react-router-dom';
import ManageEmployees from './manage-employees';
import EmployeeProfile from './employee-profile';
import QuickOnboarding from './quick-onboarding';

export default function EmployeeManagement() {
  return (
    <Routes>
      <Route path="manage-employees/*" element={<ManageEmployees />} />
      <Route path="employee-profile/*" element={<EmployeeProfile />} />
      <Route path="quick-onboarding/*" element={<QuickOnboarding />} />
      <Route path="settings/*" element={<Settings />} />
    </Routes>
  );
}
