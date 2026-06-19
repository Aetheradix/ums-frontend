import { ProtectedRoute } from 'auth';
import { Navigate, Route, Routes } from 'react-router-dom';
import MainLayout from 'shared/components/layout/MainLayout';
import AdmissionPortal from './admission-portal';
import AffiliationManagementSystem from './affiliation-management-system';
import CareerAdvancement from './career-advancement';
import EmployeeManagement from './employee-management';
import Home from './home';
import Master from './master';
import Settings from './settings';
import Sis from './sis';

export default function Features() {
  return (
    <Routes>
      <Route path="public/*" element={<div>Public Page Placeholder</div>} />
      <Route
        path="callback"
        element={
          <div className="flex items-center justify-center min-h-screen">
            <p>Completing sign-in...</p>
          </div>
        }
      />
      <Route path="admission-portal/*" element={<AdmissionPortal />} />
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
                      <Route path="settings/*" element={<Settings />} />
                      <Route path="sis/*" element={<Sis />} />
                      <Route
                        path="affiliation-management-system/*"
                        element={<AffiliationManagementSystem />}
                      />
                      <Route
                        path="career-advancement/*"
                        element={<CareerAdvancement />}
                      />
                      <Route
                        path="employee-management/*"
                        element={<EmployeeManagement />}
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
