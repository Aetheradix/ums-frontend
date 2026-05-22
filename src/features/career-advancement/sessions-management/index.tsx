import { Route, Routes } from 'react-router';
import SessionsManagementPage from './pages/SessionsManagementPage';

export default function SessionsManagement() {
  return (
    <Routes>
      <Route index element={<SessionsManagementPage />} />
      <Route path="*" element={<SessionsManagementPage />} />
    </Routes>
  );
}
