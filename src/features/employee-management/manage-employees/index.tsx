import { Route, Routes } from 'react-router-dom';
import List from './pages/List';
import ViewProfile from './pages/ViewProfile';

export default function ManageEmployees() {
  return (
    <Routes>
      <Route path="/" element={<List />} />
      <Route path="/:id" element={<ViewProfile />} />
    </Routes>
  );
}
