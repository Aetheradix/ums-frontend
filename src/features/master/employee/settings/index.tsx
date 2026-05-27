import { Route, Routes } from 'react-router-dom';
import ActionOption from './action-option';
import DocumentOption from './document-option';
import NatureOfEmployment from './nature-of-employment';
import SubjectSpecialization from './subject-specialization';

export default function Settings() {
  return (
    <Routes>
      <Route path="nature-of-employment" element={<NatureOfEmployment />} />
      <Route path="document-option" element={<DocumentOption />} />
      <Route path="action-option" element={<ActionOption />} />
      <Route
        path="subject-specialization"
        element={<SubjectSpecialization />}
      />
    </Routes>
  );
}
