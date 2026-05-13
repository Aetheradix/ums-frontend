import { Route, Routes } from 'react-router-dom';
import ProgrammeModeOfEducation from './programme-mode-of-education';
import SubjectCategory from './subject-category';

export default function Subject() {
  return (
    <Routes>
      <Route
        path="programme-mode-of-education/*"
        element={<ProgrammeModeOfEducation />}
      />
      <Route path="subject-category/*" element={<SubjectCategory />} />
    </Routes>
  );
}
