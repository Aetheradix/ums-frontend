import { Route, Routes } from 'react-router-dom';
import ActionOption from './action-option';
import DocumentOption from './document-option';
import NatureOfEmployment from './nature-of-employment';
import OrganizationUnit from './organization-unit';

export default function Settings() {
  return (
    <Routes>
      <Route path="nature-of-employment" element={<NatureOfEmployment />} />
      <Route path="organization-unit" element={<OrganizationUnit />} />
      <Route path="document-option" element={<DocumentOption />} />
      <Route path="action-option" element={<ActionOption />} />
    </Routes>
  );
}
