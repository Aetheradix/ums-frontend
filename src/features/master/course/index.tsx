import { Route, Routes } from 'react-router-dom';
import CourseExamType from './course-exam-type';
import CourseModeOfEducation from './course-mode-of-education';
import CourseStream from './course-stream';

export default function Course() {
  return (
    <Routes>
      <Route path="course-stream/*" element={<CourseStream />} />
      <Route path="course-exam-type/*" element={<CourseExamType />} />
      <Route
        path="course-mode-of-education/*"
        element={<CourseModeOfEducation />}
      />
    </Routes>
  );
}
