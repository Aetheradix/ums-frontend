import { Route, Routes } from 'react-router';
import CategoryToList from './pages/CategoryToList';

export default function CategoryToUserMapping() {
  return (
    <Routes>
      <>
        <Route path="/*" element={<CategoryToList />}></Route>
      </>
    </Routes>
  );
}
