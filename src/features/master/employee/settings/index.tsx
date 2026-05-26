import { Route, Routes } from 'react-router-dom';
import ActionOption from './action-option';
import NatureOfEmployment from './nature-of-employment';
import SeparationReasonType from './separation-reason-type';

export default function Settings() {
  return (
    <Routes>
      <Route path="nature-of-employment" element={<NatureOfEmployment />} />
      <Route path="action-option" element={<ActionOption />} />
      <Route path="separation-reason-type" element={<SeparationReasonType />} />
    </Routes>
  );
}
