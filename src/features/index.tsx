import { ProtectedRoute } from 'auth';
import { Navigate, Route, Routes } from 'react-router-dom';
import MainLayout from 'shared/components/layout/MainLayout';
import CareerAdvancement from './career-advancement';
import Home from './home';
import { LandingPage } from './landing/LandingPage';
import Master from './master';
import Sis from './sis';

export default function Features() {
  return (
    <Routes>
      <Route path="landing" element={<LandingPage />} />
      <Route path="public/*" element={<div>Public Page Placeholder</div>} />
      <Route
        path="callback"
        element={
          <div className="flex items-center justify-center min-h-screen">
            <p>Completing sign-in...</p>
          </div>
        }
      />
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <Routes>
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
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
