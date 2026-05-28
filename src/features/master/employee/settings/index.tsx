import { Route, Routes } from 'react-router-dom';
import ActionOption from './action-option';
import ActionOptionReason from './action-option-reason';
import DocumentOption from './document-option';
import NatureOfEmployment from './nature-of-employment';
import TravelPurpose from './travel-purpose';

export default function Settings() {
  return (
    <Routes>
      <Route path="nature-of-employment" element={<NatureOfEmployment />} />
      <Route path="document-option" element={<DocumentOption />} />
      <Route path="action-option" element={<ActionOption />} />
      <Route path="action-option-reason" element={<ActionOptionReason />} />
      <Route path="travel-purpose" element={<TravelPurpose />} />
    </Routes>
  );
}
