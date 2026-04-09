import { Route, Routes } from 'react-router';
import Master from './master';

export default function Features() {
  return (
    <Routes>
      <Route path="master/*" element={<Master />} />
    </Routes>
  );
}
