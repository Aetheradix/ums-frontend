import { Route, Routes } from 'react-router';
import CollegeCategory from './college/college-category';
import CollegeType from './college/college-type';
import Department from './faculty/department';
import Designation from './faculty/designation';
import Faculty from './faculty/faculty';
import OfficeType from './faculty/office-type';
import Caste from './hr/caste';
import Qualification from './hr/qualification';
import Religion from './hr/religion';
import Location from './location';
import UserManagement from './user-management';
import Role from './user-management/role';

export default function Master() {
  return (
    <Routes>
      <Route path="location/*" element={<Location />} />
      <Route path="role/*" element={<Role />} />
      <Route path="user-management/*" element={<UserManagement />} />

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
    </Routes>
  );
}
