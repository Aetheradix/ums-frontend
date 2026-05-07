import { Route, Routes } from 'react-router-dom';
import Role from './role';
import User from './user';
import UserRoleMapping from './user-role-mapping';
// import RoleFeatureMapping from './roleFeatureMapping';

export default function Location() {
  return (
    <Routes>
      <Route path="roles/*" element={<Role />} />
      <Route path="users/*" element={<User />} />
      <Route path="userrolemappings/*" element={<UserRoleMapping />} />
      {/* <Route path="rolefeaturemappings/*" element={<RoleFeatureMapping />} /> */}
    </Routes>
  );
}
