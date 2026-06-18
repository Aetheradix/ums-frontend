import { Route, Routes } from 'react-router-dom';
import Create from './pages/Create';
import List from './pages/List';

export default function FullOnboarding() {
  return (
    <Routes>
      <Route path="" element={<List />} />
      <Route path="create" element={<Create />} />
    </Routes>
  );
}
