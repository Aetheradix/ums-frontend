import { Route, Routes } from 'react-router';
import Master from './master';

export default function GrievanceManagement() {
  return (
    <Routes>
      <Route path="master/*" element={<Master />} />
    </Routes>
  );
}
