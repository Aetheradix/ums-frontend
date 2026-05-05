import { Route, Routes } from 'react-router-dom';
import Caste from './caste';
import Qualification from './qualification';
import Religion from './religion';

export default function HR() {
  return (
    <Routes>
      <Route path="caste/*" element={<Caste />} />
      <Route path="qualification/*" element={<Qualification />} />
      <Route path="religion/*" element={<Religion />} />
    </Routes>
  );
}
