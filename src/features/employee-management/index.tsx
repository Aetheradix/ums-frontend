import Settings from 'features/master/employee/settings';
import { Route, Routes } from 'react-router-dom';
import ManageEmployees from './manage-employees';
import QuickOnboarding from './quick-onboarding';
import { OnboardingForm } from './full-onboarding';

export default function EmployeeManagement() {
  return (
    <Routes>
      <Route path="manage-employees/*" element={<ManageEmployees />} />
      <Route path="quick-onboarding/*" element={<QuickOnboarding />} />
      <Route path="full-onboarding/*" element={<OnboardingForm />} />
      <Route path="settings/*" element={<Settings />} />
    </Routes>
  );
}
