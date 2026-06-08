import { Route, Routes } from 'react-router';
import CollegeRegistration from './college-registration';

export default function AffiliationManagementSystem() {
  return (
    <Routes>
      <Route path="college-registration/*" element={<CollegeRegistration />} />
    </Routes>
  );
}
