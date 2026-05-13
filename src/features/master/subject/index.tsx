import { Route, Routes } from 'react-router-dom';
import ProgrammeModeOfEducation from './programme-mode-of-education';
import SubjectCategory from './subject-category';
import SubjectModule from './subjects';

export default function Subject() {
  return (
    <Routes>
      <Route
        path="programme-mode-of-education/*"
        element={<ProgrammeModeOfEducation />}
      />
      <Route path="subjects/*" element={<SubjectModule />} />

      <Route path="subject-category/*" element={<SubjectCategory />} />
    </Routes>
  );
}
