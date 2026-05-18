import { Route, Routes } from 'react-router-dom';
import StudentAdditionalInformation from './student-additional-information';

export default function Sis() {
  return (
    <Routes>
      <Route
        path="student-additional-information/*"
        element={<StudentAdditionalInformation />}
      />
    </Routes>
  );
}
