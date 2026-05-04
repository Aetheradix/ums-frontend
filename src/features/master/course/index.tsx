import { Route, Routes } from 'react-router-dom';
import CourseDepartment from './course-department';
import CourseExamType from './course-exam-type';
import CourseLevel from './course-level';

export default function Course() {
  return (
    <Routes>
      <Route path="course-department/*" element={<CourseDepartment />} />
      <Route path="course-exam-type/*" element={<CourseExamType />} />
      <Route path="course-level/*" element={<CourseLevel />} />
    </Routes>
  );
}
