import { Route, Routes } from 'react-router';
import SubjectCategory from './course/subject-category';
import OfficeType from './faculty/office-type';
import Department from './faculty/department';
import Location from './location';

export default function Master() {
  return (
    <Routes>
      <Route path="location/*" element={<Location />} />
      <Route path="subject-category/*" element={<SubjectCategory />} />
      <Route path="office-type/*" element={<OfficeType />} />
      <Route path="department/*" element={<Department />} />
    </Routes>
  );
}
