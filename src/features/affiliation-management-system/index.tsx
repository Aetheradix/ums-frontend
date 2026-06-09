import { Route, Routes } from 'react-router';
import CollegeRegistration from './college-registration';
import Settings from './settings';

export default function AffiliationManagementSystem() {
  return (
    <Routes>
      <Route path="college-registration/*" element={<CollegeRegistration />} />
      <Route path="settings/*" element={<Settings />} />
    </Routes>
  );
}
