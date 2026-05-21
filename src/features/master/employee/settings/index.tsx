import { Route, Routes } from 'react-router-dom';
import ActionOption from './action-option';
import ActionOptionReason from './action-option-reason';
import NatureOfEmployment from './nature-of-employment';

export default function Settings() {
  return (
    <Routes>
      <Route path="nature-of-employment" element={<NatureOfEmployment />} />
      <Route path="action-option" element={<ActionOption />} />
      <Route path="action-option-reason" element={<ActionOptionReason />} />
    </Routes>
  );
}
