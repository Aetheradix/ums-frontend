import { Navigate, Route, Routes } from 'react-router-dom';
import PerformanceAcademic from './performance-academic';
import PerformanceApplication from './performance-application';

export default function PerformanceAppraisalSystemRoutes() {
  return (
    <Routes>
      <Route path="application/*" element={<PerformanceApplication />} />
      <Route path="academic/*" element={<PerformanceAcademic />} />
      <Route path="*" element={<Navigate to="application" replace />} />
    </Routes>
  );
}
