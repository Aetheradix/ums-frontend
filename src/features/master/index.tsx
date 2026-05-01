import { Route, Routes } from 'react-router';
import SubjectCategory from './course/subject-category';
import Department from './faculty/department';
import Designation from './faculty/designation';
import OfficeType from './faculty/office-type';
import Location from './location';
import HR from './hr';

export default function Master() {
  return (
    <Routes>
      <Route path="location/*" element={<Location />} />
      <Route path="subject-category/*" element={<SubjectCategory />} />

      <Route path="faculty-management/*">
        <Route path="office-type/*" element={<OfficeType />} />
        <Route path="department/*" element={<Department />} />
        <Route path="designation/*" element={<Designation />} />
      </Route>
      <Route path="office-type/*" element={<OfficeType />} />
      <Route path="department/*" element={<Department />} />
      <Route path="designation/*" element={<Designation />} />
      <Route path="hr/*" element={<HR />} />
    </Routes>
  );
}
