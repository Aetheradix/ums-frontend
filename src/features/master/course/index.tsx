import { Route, Routes } from 'react-router-dom';
import CourseDepartment from './course-department';
import CourseExamType from './course-exam-type';
import CourseLevel from './course-level';
import CourseMaster from './course-master';
import CourseModeOfEducation from './course-mode-of-education';
import CourseStream from './course-stream';
import CourseTenure from './course-tenure';

export default function Course() {
  return (
    <Routes>
      <Route path="course-tenure/*" element={<CourseTenure />} />
      <Route path="course-stream/*" element={<CourseStream />} />
      <Route path="course-department/*" element={<CourseDepartment />} />
      <Route path="course-exam-type/*" element={<CourseExamType />} />
      <Route
        path="course-mode-of-education/*"
        element={<CourseModeOfEducation />}
      />
      <Route path="course-level/*" element={<CourseLevel />} />
      <Route path="course-master/*" element={<CourseMaster />} />
    </Routes>
  );
}
