import { Route, Routes } from 'react-router';
import List from './pages/List';

export default function UserRoleMapping() {
  return (
    <Routes>
      <Route index element={<List />} />
    </Routes>
  );
}
