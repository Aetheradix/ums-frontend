import { Route, Routes } from 'react-router-dom';
import Role from './role';
import User from './user';
import UserRoleMapping from './user-role-mapping';
import RoleFeatureMapping from './role-feature-mapping';

export default function UserManagement() {
  return (
    <Routes>
      <Route path="roles/*" element={<Role />} />
      <Route path="users/*" element={<User />} />
      <Route path="user-role-mappings/*" element={<UserRoleMapping />} />
      <Route path="role-feature-mappings/*" element={<RoleFeatureMapping />} />
    </Routes>
  );
}
