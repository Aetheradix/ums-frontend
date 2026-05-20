import { Route, Routes } from 'react-router-dom';
import NatureOfEmployment from './nature-of-employment';
import OrganizationUnit from './organization-unit';

export default function Settings() {
  return (
    <Routes>
      <Route path="nature-of-employment" element={<NatureOfEmployment />} />
      <Route path="organization-unit" element={<OrganizationUnit />} />
    </Routes>
  );
}
