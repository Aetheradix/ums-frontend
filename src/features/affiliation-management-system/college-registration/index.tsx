import { Route, Routes } from 'react-router';
import BulkUpload from './pages/BulkUpload';
import Create from './pages/Create';
import Update from './pages/Update';

export default function CollegeRegistration() {
  return (
    <Routes>
      <Route index element={<Create />} />
      <Route path="update" element={<Update />} />
      <Route path="bulk-upload" element={<BulkUpload />} />
    </Routes>
  );
}
