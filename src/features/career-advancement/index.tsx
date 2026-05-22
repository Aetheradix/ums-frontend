import { Route, Routes } from 'react-router';
import SessionsManagement from './sessions-management';

export default function CareerAdvancement() {
  return (
    <Routes>
      <Route path="sessions-management/*" element={<SessionsManagement />} />
    </Routes>
  );
}
