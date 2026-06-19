import { Route, Routes } from 'react-router';
import Create from './pages/Create';

export default function CollegeProfile() {
  return (
    <Routes>
      <Route index element={<Create />} />
    </Routes>
  );
}
