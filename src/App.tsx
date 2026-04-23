import SubjectCategory from 'features/master/course/subject-category';
import OfficeType from 'features/master/faculty/office-type';
import { Toast } from 'primereact/toast';
import { useEffect, useRef } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastService } from 'services';
import MainLayout from 'shared/components/layout/MainLayout';

function DashboardFeatures() {
  return (
    <div className="card">
      <h2 className="text-2xl font-bold mb-4">Welcome to the Dashboard</h2>
      <p className="text-lg text-gray-700">
        You are successfully accessing the University Management System.
      </p>
      <div className="mt-4 grid">
        <div className="col-12 md:col-6 lg:col-4 p-3">
          <div className="surface-card p-4 shadow-2 border-round">
            <div className="text-900 font-medium mb-3">Total Students</div>
            <div className="text-3xl font-bold text-blue-600">1,248</div>
          </div>
        </div>
        <div className="col-12 md:col-6 lg:col-4 p-3">
          <div className="surface-card p-4 shadow-2 border-round">
            <div className="text-900 font-medium mb-3">Active Faculty</div>
            <div className="text-3xl font-bold text-green-600">84</div>
          </div>
        </div>
        <div className="col-12 md:col-6 lg:col-4 p-3">
          <div className="surface-card p-4 shadow-2 border-round">
            <div className="text-900 font-medium mb-3">Pending Reports</div>
            <div className="text-3xl font-bold text-orange-600">12</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StudentsPlaceholder() {
  return (
    <div className="card">
      <h2 className="text-2xl font-bold mb-4">Students Management</h2>
      <p className="text-lg text-gray-700">
        This is a static placeholder for the Students module.
      </p>
      <div className="surface-card p-4 shadow-2 border-round mt-4">
        <p>
          You can start building your student registration tables and forms
          here.
        </p>
      </div>
    </div>
  );
}

function SettingsPlaceholder() {
  return (
    <div className="card">
      <h2 className="text-2xl font-bold mb-4">Settings</h2>
      <p className="text-lg text-gray-700">
        System configuration and user preferences.
      </p>
    </div>
  );
}

export default function App() {
  const toast = useRef<Toast>(null);

  useEffect(() => {
    ToastService.setToastRef(toast);
  }, []);

  return (
    <>
      <Toast ref={toast} className="white-toast" />
      <Routes>
        <Route path="public/*" element={<div>Public Page Placeholder</div>} />
        <Route
          path="/*"
          element={
            <MainLayout>
              <Routes>
                <Route index element={<DashboardFeatures />} />
                <Route path="students" element={<StudentsPlaceholder />} />
                <Route path="settings" element={<SettingsPlaceholder />} />
                <Route
                  path="master/subject-category/*"
                  element={<SubjectCategory />}
                />
                <Route path="master/office-type/*" element={<OfficeType />} />
              </Routes>
            </MainLayout>
          }
        />
      </Routes>
    </>
  );
}
