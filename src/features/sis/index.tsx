import { Route, Routes } from 'react-router-dom';
import StudentAdditionalInformation from './student-additional-information';
import StudentApplicationForm from './student-application-form';

export default function Sis() {
  return (
    <Routes>
      <Route
        path="student-additional-information/*"
        element={<StudentAdditionalInformation />}
      />
      <Route
        path="student-application-form/*"
        element={<StudentApplicationForm />}
      />
    </Routes>
  );
}
