import { Route, Routes } from 'react-router';
import AcademicYear from './academic/academic-year';
import Department from './faculty/department';
import Designation from './faculty/designation';
import OfficeType from './faculty/office-type';
import Caste from './hr/caste';
import Qualification from './hr/qualification';
import Religion from './hr/religion';
import Location from './location';

export default function Master() {
  return (
    <Routes>
      <Route path="location/*" element={<Location />} />

      <Route path="faculty-management/*">
        <Route path="office-type/*" element={<OfficeType />} />
        <Route path="department/*" element={<Department />} />
        <Route path="designation/*" element={<Designation />} />
      </Route>

      <Route path="hr/*">
        <Route path="caste/*" element={<Caste />} />
        <Route path="religion/*" element={<Religion />} />
        <Route path="qualification/*" element={<Qualification />} />
      </Route>

      <Route path="academic/*">
        <Route path="academic-year/*" element={<AcademicYear />} />
      </Route>
    </Routes>
  );
}
