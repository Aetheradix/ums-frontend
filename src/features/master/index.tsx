import { Route, Routes } from 'react-router';
import SubjectCategory from './course/subject-category';

export default function Master() {
  return (
    <Routes>
      <Route path="subject-category/*" element={<SubjectCategory />} />
    </Routes>
  );
}
