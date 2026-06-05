import { Route, Routes } from 'react-router';
import Create from './pages/Create';

export default function CollegeRegistration() {
  return (
    <Routes>
      <Route index element={<Create />} />
      <Route path="create" element={<Create />} />
    </Routes>
  );
}
