import { Route, Routes } from 'react-router-dom';
import Role from './role';
export default function Location() {
  return (
    <Routes>
      <Route path="roles/*" element={<Role />} />
    </Routes>
  );
}
