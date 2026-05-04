import { Route, Routes } from 'react-router';
import Create from './pages/Create';
import Edit from './pages/Edit';
import List from './pages/List';

export default function CourseDepartment() {
  return (
    <Routes>
      <Route index element={<List />} />
      <Route path="create" element={<Create />} />
      <Route path="edit/:id" element={<Edit />} />
    </Routes>
  );
}
