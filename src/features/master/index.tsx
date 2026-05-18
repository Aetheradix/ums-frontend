import { Route, Routes } from 'react-router';
import CollegeCategory from './college/college-category';
import CollegeType from './college/college-type';
import Department from './faculty/department';
import Designation from './faculty/designation';
import Faculty from './faculty/faculty';
import OfficeType from './faculty/office-type';
import EligibilityApplicationProcess from './grant/eligibility-application-process';
import GrantCategory from './grant/grant-category';
import GrantType from './grant/grant-type';
import Caste from './hr/caste';
import Post from './hr/post';
import Qualification from './hr/qualification';
import Religion from './hr/religion';
import Class from './hr/class';
import Section from './hr/section';
import DesignationHr from './hr/designation';
import DesignationType from './hr/designation-type';
import Location from './location';
import AcademicYear from './other/academic-year';
import DegreeLevel from './other/degree-level';
import Nationality from './other/nationality';
import Programme from './other/programme';
import Specialisation from './other/specialisation';
import Scheme from './schemes/scheme';
import SchemeCategory from './schemes/scheme-category';
import SchemeType from './schemes/scheme-type';
import Subject from './subject';
import UserManagement from './user-management';

export default function Master() {
  return (
    <Routes>
      <Route path="location/*" element={<Location />} />
      <Route path="subject/*" element={<Subject />} />
      <Route path="user-management/*" element={<UserManagement />} />

      <Route path="faculty-management/*">
        <Route path="office-type/*" element={<OfficeType />} />
        <Route path="department/*" element={<Department />} />
        <Route path="designation/*" element={<Designation />} />
        <Route path="faculty/*" element={<Faculty />} />
      </Route>

      <Route path="hr/*">
        <Route path="caste/*" element={<Caste />} />
        <Route path="post/*" element={<Post />} />
        <Route path="religion/*" element={<Religion />} />
        <Route path="qualification/*" element={<Qualification />} />
        <Route path="class/*" element={<Class />} />
        <Route path="section/*" element={<Section />} />
        <Route path="designation/*" element={<DesignationHr />} />
        <Route path="designation-type/*" element={<DesignationType />} />
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
        <Route path="nationality/*" element={<Nationality />} />
      </Route>

      <Route path="grant/*">
        <Route path="grant-type/*" element={<GrantType />} />
        <Route path="grant-category/*" element={<GrantCategory />} />
        <Route
          path="eligibility-application-process/*"
          element={<EligibilityApplicationProcess />}
        />
      </Route>

      <Route path="scheme/*">
        <Route path="schemes/*" element={<Scheme />} />
        <Route path="scheme-type/*" element={<SchemeType />} />
        <Route path="scheme-category/*" element={<SchemeCategory />} />
      </Route>
    </Routes>
  );
}
