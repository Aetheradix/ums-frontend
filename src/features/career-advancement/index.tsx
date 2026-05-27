import { Route, Routes } from 'react-router-dom';
import EmployeeSelfAssessment from './employee-self-assessment';
import PerformanceAppraisalSystem from './performance-appraisal-system';
import SessionsManagement from './sessions-management';

export default function CareerAdvancement() {
  return (
    <Routes>
      <Route
        path="employee-self-assessment/*"
        element={<EmployeeSelfAssessment />}
      />
      <Route path="sessions-management/*" element={<SessionsManagement />} />
      <Route
        path="performance-appraisal-system/*"
        element={<PerformanceAppraisalSystem />}
      />
    </Routes>
  );
}
