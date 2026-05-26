import { Route, Routes } from 'react-router';
import List from './pages/List';

export default function AparApplication() {
  return (
    <Routes>
      <Route index element={<List />} />
      <Route path="all" element={<List />} />
      <Route path="*" element={<List />} />
    </Routes>
  );
}
