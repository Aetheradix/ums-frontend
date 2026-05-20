import { Route, Routes } from 'react-router-dom';
import NatureOfEmployment from './nature-of-employment';

export default function Settings() {
  return (
    <Routes>
      <Route path="nature-of-employment" element={<NatureOfEmployment />} />
    </Routes>
  );
}
