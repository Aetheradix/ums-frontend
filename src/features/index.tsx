import { Navigate, Route, Routes } from 'react-router-dom';
import MainLayout from 'shared/components/layout/MainLayout';
import Home from './home';
import Master from './master';
import Settings from './settings';
import Students from './students';

export default function Features() {
  return (
    <Routes>
      <Route path="public/*" element={<div>Public Page Placeholder</div>} />
      <Route path="home/*" element={<Home />} />
      <Route
        path="/*"
        element={
          <MainLayout>
            <Routes>
              <Route index element={<Navigate to={'/home'} />} />
              <Route path="students/*" element={<Students />} />
              <Route path="settings/*" element={<Settings />} />
              <Route path="master/*" element={<Master />} />
            </Routes>
          </MainLayout>
        }
      />
    </Routes>
  );
}
