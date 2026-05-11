import { Route, Routes } from 'react-router';
import Department from './faculty/department';
import Designation from './faculty/designation';
import Faculty from './faculty/faculty';
import OfficeType from './faculty/office-type';
import Caste from './hr/caste';
import Qualification from './hr/qualification';
import Religion from './hr/religion';
import Location from './location';
import AcademicYear from './other/academic-year';
import DegreeLevel from './other/degree-level';
import Programme from './other/programme';
import Scheme from './schemes/scheme';
import SchemeType from './schemes/scheme-type';
import SchemeCategory from './schemes/scheme-category';
import Specialisation from './other/specialisation';
import Course from './course';
import CollegeCategory from './college/college-category';
import CollegeType from './college/college-type';

import GrantCategory from './grant/grant-category';
import GrantType from './grant/grant-type';

export default function Master() {
  return (
    <Routes>
      <Route path="location/*" element={<Location />} />
      <Route path="course/*" element={<Course />} />

      <Route path="faculty-management/*">
        <Route path="office-type/*" element={<OfficeType />} />
        <Route path="department/*" element={<Department />} />
        <Route path="designation/*" element={<Designation />} />
        <Route path="faculty/*" element={<Faculty />} />
      </Route>

      <Route path="hr/*">
        <Route path="caste/*" element={<Caste />} />
        <Route path="religion/*" element={<Religion />} />
        <Route path="qualification/*" element={<Qualification />} />
      </Route>

      <Route path="college/*">
        <Route path="college-type/*" element={<CollegeType />} />
        <Route path="college-category/*" element={<CollegeCategory />} />
      </Route>

      <Route path="other/*">
        <Route path="degree-level/*" element={<DegreeLevel />} />
        <Route path="academic-year/*" element={<AcademicYear />} />
        <Route path="programme/*" element={<Programme />} />
        <Route path="specialisation/*" element={<Specialisation />} />
      </Route>

      <Route path="grant/*">
        <Route path="grant-type/*" element={<GrantType />} />
        <Route path="grant-category/*" element={<GrantCategory />} />
      </Route>
      
      <Route path="schemes/*">
        <Route path="scheme/*" element={<Scheme />} />
        <Route path="scheme-type/*" element={<SchemeType />} />
        <Route path="scheme-category/*" element={<SchemeCategory />} />
      </Route>
    </Routes>
  );
}
