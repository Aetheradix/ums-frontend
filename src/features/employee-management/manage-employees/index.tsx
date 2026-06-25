import { Route, Routes } from 'react-router-dom';
import Edit from './pages/Edit';
import List from './pages/List';

export default function ManageEmployees() {
  return (
    <Routes>
      <Route path="/" element={<List />} />
      <Route path="/:id/edit" element={<Edit />} />
    </Routes>
  );
}
