import { Route, Routes } from 'react-router';
import List from './pages/List';
import Receipt from './pages/Receipt';

export default function CollegeAffiliation() {
  return (
    <Routes>
      <Route index element={<List />} />
      <Route path=":id" element={<Receipt />} />
    </Routes>
  );
}
