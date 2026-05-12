import { Route, Routes } from 'react-router-dom';
import ProgrammeModeOfEducation from './programme-mode-of-education';

export default function Subject() {
  return (
    <Routes>
      <Route
        path="programme-mode-of-education/*"
        element={<ProgrammeModeOfEducation />}
      />
    </Routes>
  );
}
