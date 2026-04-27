import { Route, Routes } from 'react-router';
import SubjectCategory from './course/subject-category';
import OfficeType from './faculty/office-type';

export default function Master() {
  return (
    <Routes>
      <Route path="subject-category/*" element={<SubjectCategory />} />
      <Route path="office-type/*" element={<OfficeType />} />
    </Routes>
  );
}
