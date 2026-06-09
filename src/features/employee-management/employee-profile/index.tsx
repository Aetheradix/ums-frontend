import { Route, Routes } from 'react-router-dom';
import ProfileView from './components/ProfileView';

export default function EmployeeProfile() {
  return (
    <Routes>
      <Route path="/" element={<ProfileView />} />
      <Route path="/:id" element={<ProfileView />} />
    </Routes>
  );
}
