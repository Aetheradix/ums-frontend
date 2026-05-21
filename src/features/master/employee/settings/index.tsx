import { Route, Routes } from 'react-router-dom';
import ActionOption from './action-option';
import NatureOfEmployment from './nature-of-employment';

export default function Settings() {
  return (
    <Routes>
      <Route path="nature-of-employment" element={<NatureOfEmployment />} />
      <Route path="action-option" element={<ActionOption />} />
    </Routes>
  );
}
