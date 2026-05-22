import { Route, Routes } from 'react-router-dom';
import EmployeeSelfAssessment from './employee-self-assessment';

export default function CareerAdvancement() {
  return (
    <Routes>
      <Route
        path="employee-self-assessment/*"
        element={<EmployeeSelfAssessment />}
      />
    </Routes>
  );
}
