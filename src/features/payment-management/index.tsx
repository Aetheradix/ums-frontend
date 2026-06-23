import { Route, Routes } from 'react-router';
import CollegeAffiliation from './college-affiliation';

export default function PaymentManagement() {
  return (
    <Routes>
      <Route path="college-affiliation/*" element={<CollegeAffiliation />} />
    </Routes>
  );
}
