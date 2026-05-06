import { Route, Routes } from 'react-router-dom';
import CourseTenure from './course-tenure';

export default function Course() {
  return (
    <Routes>
      <Route path="course-tenure/*" element={<CourseTenure />} />
    </Routes>
  );
}
