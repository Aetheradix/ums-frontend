import { Route, Routes } from 'react-router';
import CollegeCategory from './college/college-category';
import CollegeType from './college/college-type';
import SubjectCategory from './course/subject-category';
import OfficeType from './faculty/office-type';

export default function Master() {
  return (
    <Routes>
      <Route path="subject-category/*" element={<SubjectCategory />} />
      <Route path="office-type/*" element={<OfficeType />} />
      <Route path="college-category/*" element={<CollegeCategory />} />
      <Route path="college-type/*" element={<CollegeType />} />
    </Routes>
  );
}
