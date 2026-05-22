import { Navigate, Route, Routes } from 'react-router-dom';
import MainLayout from 'shared/components/layout/MainLayout';
import Home from './home';
import Master from './master';
import Sis from './sis';
import CareerAdvancement from './career-advancement';

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
              <Route path="master/*" element={<Master />} />
              <Route path="sis/*" element={<Sis />} />
              <Route
                path="career-advancement/*"
                element={<CareerAdvancement />}
              />
            </Routes>
          </MainLayout>
        }
      />
    </Routes>
  );
}
