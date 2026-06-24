import { Route, Routes } from 'react-router-dom';
import ViewProfile from './components/ViewProfile';
import List from './pages/List';
import Edit from './pages/Edit';

export default function ManageEmployees() {
  return (
    <Routes>
      <Route path="/" element={<List />} />
      <Route path="/:id" element={<ViewProfile />} />
      <Route path="/:id/edit" element={<Edit />} />
    </Routes>
  );
}
