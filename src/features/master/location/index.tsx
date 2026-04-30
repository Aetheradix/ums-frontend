import { Route, Routes } from 'react-router-dom';
import District from './district';
import Division from './division';
import State from './state';

export default function Location() {
  return (
    <Routes>
      <Route path="states/*" element={<State />} />
      <Route path="divisions/*" element={<Division />} />
      <Route path="districts/*" element={<District />} />
    </Routes>
  );
}
