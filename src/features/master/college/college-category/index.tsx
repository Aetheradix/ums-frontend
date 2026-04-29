import { Route, Routes } from 'react-router';
import Create from './pages/Create';
import Edit from './pages/Edit';
import List from './pages/List';

export default function CollegeCategory() {
  return (
    <Routes>
      <Route path="/*" element={<List />}>
        <Route path="create" element={<Create />} />
        <Route path=":id/edit" element={<Edit />} />
      </Route>
    </Routes>
  );
}
