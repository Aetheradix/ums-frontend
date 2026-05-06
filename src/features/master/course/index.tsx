import { Route, Routes } from 'react-router-dom';
import CourseDepartment from './course-department';
import CourseTenure from './course-tenure';

export default function Course() {
  return (
    <Routes>
      <Route path="course-tenure/*" element={<CourseTenure />} />
      <Route path="course-department/*" element={<CourseDepartment />} />
    </Routes>
  );
}
