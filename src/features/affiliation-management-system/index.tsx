import { Route, Routes } from 'react-router';
import CollegeRegistration from './college-registration';
import CollegeRegistrationApproval from './college-registration-approval';

export default function AffiliationManagementSystem() {
  return (
    <Routes>
      <Route
        path="college-registration-form/*"
        element={<CollegeRegistration />}
      />
      <Route
        path="college-registration-approval/*"
        element={<CollegeRegistrationApproval />}
      />
    </Routes>
  );
}
