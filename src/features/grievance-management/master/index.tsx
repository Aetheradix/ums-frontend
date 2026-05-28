import { Route, Routes } from 'react-router';
import CategoryToUserMapping from './category-to-user';
import GrievanceCategory from './grievance-category';

export default function Master() {
  return (
    <Routes>
      <Route path="grievance-category/*" element={<GrievanceCategory />} />
      <Route
        path="category-to-user-mapping/*"
        element={<CategoryToUserMapping />}
      />
    </Routes>
  );
}
