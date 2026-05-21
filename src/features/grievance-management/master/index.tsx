import { Route, Routes } from 'react-router';
import GrievanceCategory from './grievance-category';

export default function Master() {
  return (
    <Routes>
      <Route path="grievance-category/*" element={<GrievanceCategory />} />
    </Routes>
  );
}
