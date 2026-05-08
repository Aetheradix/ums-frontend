import { Route, Routes } from 'react-router';
import {
  SchemeTypeList,
  SchemeTypeCreate,
  SchemeTypeEdit,
  SchemeCategoryList,
  SchemeCategoryCreate,
  SchemeCategoryEdit,
} from './pages';
import SchemeList from './pages/scheme/List';
import SchemeCreate from './pages/scheme/Create';
import SchemeEdit from './pages/scheme/Edit';

export default function Scheme() {
  return (
    <Routes>
      <Route path="scheme/*">
        <Route index element={<SchemeList />} />
        <Route path="create" element={<SchemeCreate />} />
        <Route path="edit/:id" element={<SchemeEdit />} />
      </Route>

      <Route path="scheme-type/*">
        <Route index element={<SchemeTypeList />} />
        <Route path="create" element={<SchemeTypeCreate />} />
        <Route path="edit/:id" element={<SchemeTypeEdit />} />
      </Route>

      <Route path="scheme-category/*">
        <Route index element={<SchemeCategoryList />} />
        <Route path="create" element={<SchemeCategoryCreate />} />
        <Route path="edit/:id" element={<SchemeCategoryEdit />} />
      </Route>
    </Routes>
  );
}
