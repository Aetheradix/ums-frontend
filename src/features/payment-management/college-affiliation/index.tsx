import { Route, Routes } from 'react-router';

import Receipt from './pages/Receipt';

export default function CollegeAffiliation() {
  return (
    <Routes>
      <Route path="receipt" element={<Receipt />} />
    </Routes>
  );
}
