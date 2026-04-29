import { Route, Routes } from 'react-router-dom';
import Districts from './pages/Districts';
import Divisions from './pages/Divisions';

export default function Location() {
  return (
    <Routes>
      <Route path="districts" element={<Districts />} />
      <Route path="divisions" element={<Divisions />} />
    </Routes>
  );
}
